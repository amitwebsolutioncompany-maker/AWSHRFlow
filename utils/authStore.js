const fs = require('fs');
const path = require('path');
const dns = require('dns').promises;
const { execFile } = require('child_process');
const { promisify } = require('util');
const { MongoClient } = require('mongodb');

const ENV_FILE = path.join(__dirname, '..', '.env.local');
const DB_NAME = 'AWSHRFlow';
const COLLECTION_NAME = 'app_auth';
const PASSWORD_KEY = 'app-password';
const DEFAULT_PASSWORD = 'awshrflow@3401';

let client = null;
let collection = null;
let lastInitError = null;
let isInitializing = false;
let initPromise = null;
let authMode = 'direct';
let connectedCandidate = '';

const execFileAsync = promisify(execFile);

function loadEnvFile() {
  if (!fs.existsSync(ENV_FILE)) {
    return;
  }

  const contents = fs.readFileSync(ENV_FILE, 'utf8');
  contents.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      return;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) {
      return;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    value = value.replace(/^['"]|['"]$/g, '');

    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  });
}

function envFlag(name) {
  return ['1', 'true', 'yes', 'on'].includes(String(process.env[name] || '').trim().toLowerCase());
}

function parseMongoSrvUri(mongoUri) {
  const match = String(mongoUri || '').match(/^mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)(?:\/([^?]*))?/i);
  if (!match) {
    return null;
  }

  return {
    username: match[1],
    password: match[2],
    host: match[3],
    databaseName: match[4] || DB_NAME
  };
}

async function buildConnectionCandidates(mongoUri) {
  const candidates = [mongoUri];
  const parsed = parseMongoSrvUri(mongoUri);
  if (!parsed) {
    return candidates;
  }

  try {
    const srvRecords = await dns.resolveSrv(`_mongodb._tcp.${parsed.host}`);
    if (!srvRecords.length) {
      return candidates;
    }

    const hostList = srvRecords
      .map((record) => `${record.name}:${record.port}`)
      .join(',');

    candidates.push(
      `mongodb://${parsed.username}:${parsed.password}@${hostList}/${parsed.databaseName}?tls=true&authSource=admin&retryWrites=true&w=majority`
    );
  } catch (error) {
    // Ignore DNS fallback failure; base URI remains available.
  }

  return candidates;
}

function shouldTryWorkerFallback(error) {
  const message = String(error?.message || error || '').toLowerCase();
  return message.includes('tlsv1_alert_internal_error')
    || message.includes('ssl routines')
    || message.includes('mongodb.net');
}

async function runWorker(action, payload = '') {
  const workerPath = path.join(__dirname, 'mongoAuthWorker.js');
  const { stdout } = await execFileAsync('node', [workerPath, action, payload], {
    cwd: path.join(__dirname, '..'),
    timeout: 15000
  });

  const parsed = JSON.parse(stdout || '{}');
  if (!parsed.ok) {
    throw new Error(parsed.error || 'Mongo auth worker failed.');
  }

  return parsed.result;
}

async function directInit() {
  loadEnvFile();
  const mongoUri = String(process.env.MONGO_URI || '').trim();
  if (!mongoUri) {
    throw new Error('MONGO_URI is missing in .env.local');
  }

  const candidates = await buildConnectionCandidates(mongoUri);
  let lastError = null;

  for (const candidate of candidates) {
    const nextClient = new MongoClient(candidate, {
      tls: true,
      retryWrites: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      tlsAllowInvalidCertificates: envFlag('MONGO_TLS_ALLOW_INVALID_CERTS'),
      tlsAllowInvalidHostnames: envFlag('MONGO_TLS_ALLOW_INVALID_HOSTNAMES')
    });

    try {
      await nextClient.connect();
      const db = nextClient.db(DB_NAME);
      const nextCollection = db.collection(COLLECTION_NAME);

      await nextCollection.updateOne(
        { _id: PASSWORD_KEY },
        {
          $setOnInsert: {
            password: DEFAULT_PASSWORD,
            createdAt: new Date()
          },
          $set: {
            updatedAt: new Date()
          }
        },
        { upsert: true }
      );

      client = nextClient;
      collection = nextCollection;
      connectedCandidate = candidate;
      return true;
    } catch (error) {
      lastError = error;
      await nextClient.close().catch(() => {});
    }
  }

  throw lastError || new Error('Unable to connect to MongoDB.');
}

async function init() {
  if (initPromise) {
    return initPromise;
  }

  isInitializing = true;
  initPromise = (async () => {
    try {
      await directInit();
      lastInitError = null;
      authMode = 'direct';
      return true;
    } catch (error) {
      if (shouldTryWorkerFallback(error)) {
        try {
          const workerResult = await runWorker('init');
          lastInitError = null;
          authMode = workerResult.mode || 'worker';
          connectedCandidate = workerResult.candidate || '';
          return true;
        } catch (workerError) {
          lastInitError = workerError;
          console.error('Mongo auth initialization failed:', error);
          console.error('Mongo auth worker fallback failed:', workerError);
          return false;
        }
      }

      lastInitError = error;
      console.error('Mongo auth initialization failed:', error);
      return false;
    } finally {
      isInitializing = false;
    }
  })();

  return initPromise;
}

function getStatus() {
  return {
    ready: Boolean(collection) || authMode === 'worker',
    initializing: isInitializing,
    mode: authMode,
    candidate: connectedCandidate,
    error: lastInitError ? lastInitError.message : ''
  };
}

async function verifyPassword(inputPassword) {
  if (authMode === 'worker' && !collection) {
    try {
      return await runWorker('verify', String(inputPassword || ''));
    } catch (error) {
      return {
        success: false,
        message: `Worker verification failed: ${error.message || error}`
      };
    }
  }

  if (!collection) {
    return {
      success: false,
      message: lastInitError ? `Database connection failed: ${lastInitError.message}` : 'Authentication database is not ready.'
    };
  }

  const passwordDoc = await collection.findOne({ _id: PASSWORD_KEY });
  if (!passwordDoc) {
    return {
      success: false,
      message: 'Password record was not found in MongoDB.'
    };
  }

  if (String(inputPassword || '') !== String(passwordDoc.password || '')) {
    return {
      success: false,
      message: 'Invalid password. App access denied.'
    };
  }

  return {
    success: true,
    message: 'Access granted.'
  };
}

module.exports = {
  init,
  getStatus,
  verifyPassword
};
