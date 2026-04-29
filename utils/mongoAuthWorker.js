const fs = require('fs');
const path = require('path');
const dns = require('dns').promises;
const { MongoClient } = require('mongodb');

const ENV_FILE = path.join(__dirname, '..', '.env.local');
const DB_NAME = 'AWSHRFlow';
const COLLECTION_NAME = 'app_auth';
const PASSWORD_KEY = 'app-password';
const DEFAULT_PASSWORD = 'awshrflow@3401';

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

    if (key) {
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
    // Ignore DNS fallback failure; base URI will still be attempted.
  }

  return candidates;
}

async function connectWithFallback(task) {
  loadEnvFile();
  const mongoUri = String(process.env.MONGO_URI || '').trim();
  if (!mongoUri) {
    throw new Error('MONGO_URI is missing in .env.local');
  }

  const candidates = await buildConnectionCandidates(mongoUri);
  let lastError = null;

  for (const candidate of candidates) {
    const client = new MongoClient(candidate, {
      tls: true,
      retryWrites: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      tlsAllowInvalidCertificates: envFlag('MONGO_TLS_ALLOW_INVALID_CERTS'),
      tlsAllowInvalidHostnames: envFlag('MONGO_TLS_ALLOW_INVALID_HOSTNAMES')
    });

    try {
      await client.connect();
      const collection = client.db(DB_NAME).collection(COLLECTION_NAME);
      return await task(collection, candidate);
    } catch (error) {
      lastError = error;
    } finally {
      await client.close().catch(() => {});
    }
  }

  throw lastError || new Error('Unable to connect to MongoDB.');
}

async function init() {
  return connectWithFallback(async (collection, candidate) => {
    await collection.updateOne(
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

    return {
      ready: true,
      mode: 'worker',
      candidate
    };
  });
}

async function verify(password) {
  return connectWithFallback(async (collection) => {
    const passwordDoc = await collection.findOne({ _id: PASSWORD_KEY });
    if (!passwordDoc) {
      return {
        success: false,
        message: 'Password record was not found in MongoDB.'
      };
    }

    if (String(password || '') !== String(passwordDoc.password || '')) {
      return {
        success: false,
        message: 'Invalid password. App access denied.'
      };
    }

    return {
      success: true,
      message: 'Access granted.'
    };
  });
}

async function main() {
  const action = process.argv[2];
  const payload = process.argv[3] || '';

  let result;
  if (action === 'init') {
    result = await init();
  } else if (action === 'verify') {
    result = await verify(payload);
  } else {
    throw new Error(`Unsupported action: ${action || 'none'}`);
  }

  process.stdout.write(JSON.stringify({ ok: true, result }));
}

main().catch((error) => {
  process.stdout.write(JSON.stringify({
    ok: false,
    error: error.message || String(error)
  }));
  process.exitCode = 1;
});
