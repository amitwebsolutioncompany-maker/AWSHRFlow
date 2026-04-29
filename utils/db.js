const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { app } = require('electron');

let db;

const DEFAULT_COMPANIES = [
  {
    code: 'nextview',
    displayName: 'Nextview Technologies (INDIA) Pvt Ltd',
    legalName: 'Nextview Technologies (INDIA) Pvt Ltd',
    address: `409-410 Maurya Atria,
Nr. Atithi Restaurant Cross Road,
Bodakdev, Ahmedabad-380054`,
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    postalCode: '380054',
    phone: '1800 270 0139, 9925149964',
    email: 'info@nexttechgroup.com',
    website: 'www.nexttechgroup.com',
    contactPerson: 'HR Department',
    hrName: 'HR Department',
    directorName: 'Authorized Signatory',
    logoData: '',
    stampData: '',
    signatureData: '',
    cin: '',
    gstin: '',
    pan: '',
    tan: '',
    pfRegistrationNo: '',
    esicRegistrationNo: '',
    bankName: '',
    bankAccountNumber: '',
    ifsc: '',
    paymentMode: 'Bank Transfer',
    defaultPfEnabled: 1,
    defaultPtEnabled: 1,
    defaultPfAmount: 1800,
    defaultPtAmount: 200,
    payslipNote: 'This is a computer-generated payslip and does not require a signature.',
    documentFooter: 'This document is system generated for official HR use.'
  },
  {
    code: '3view',
    displayName: '3 View Trade LLP',
    legalName: '3 View Trade LLP',
    address: `T F 3, Shakti Square,
Opp Management Enclave,
Nehru Park Road, Vastrapur,
Ahmedabad 380015`,
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    postalCode: '380015',
    phone: '9904310022',
    email: 'info@nexttechgroup.com',
    website: 'www.nexttechgroup.com',
    contactPerson: 'HR Department',
    hrName: 'HR Department',
    directorName: 'Authorized Signatory',
    logoData: '',
    stampData: '',
    signatureData: '',
    cin: '',
    gstin: '',
    pan: '',
    tan: '',
    pfRegistrationNo: '',
    esicRegistrationNo: '',
    bankName: '',
    bankAccountNumber: '',
    ifsc: '',
    paymentMode: 'Bank Transfer',
    defaultPfEnabled: 0,
    defaultPtEnabled: 0,
    defaultPfAmount: 0,
    defaultPtAmount: 0,
    payslipNote: 'This is a computer-generated payslip and does not require a signature.',
    documentFooter: 'This document is system generated for official HR use.'
  },
  {
    code: 'nexttech',
    displayName: "Next Tech IT'S Care",
    legalName: "Next Tech IT'S Care",
    address: `409-410 Maurya Atria,
Nr. Atithi Hotel,
Near Kasturi Tower,
Bodakdev, Ahmedabad-380054`,
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    postalCode: '380054',
    phone: '9033009558, 9510529827',
    email: 'info@nexttechgroup.com',
    website: 'www.nexttechgroup.com',
    contactPerson: 'HR Department',
    hrName: 'HR Department',
    directorName: 'Authorized Signatory',
    logoData: '',
    stampData: '',
    signatureData: '',
    cin: '',
    gstin: '',
    pan: '',
    tan: '',
    pfRegistrationNo: '',
    esicRegistrationNo: '',
    bankName: '',
    bankAccountNumber: '',
    ifsc: '',
    paymentMode: 'Bank Transfer',
    defaultPfEnabled: 0,
    defaultPtEnabled: 0,
    defaultPfAmount: 0,
    defaultPtAmount: 0,
    payslipNote: 'This is a computer-generated payslip and does not require a signature.',
    documentFooter: 'This document is system generated for official HR use.'
  }
];

const COMPANY_COLUMNS = [
  ['code', 'TEXT UNIQUE'],
  ['displayName', 'TEXT'],
  ['legalName', 'TEXT'],
  ['address', 'TEXT'],
  ['city', 'TEXT'],
  ['state', 'TEXT'],
  ['country', 'TEXT'],
  ['postalCode', 'TEXT'],
  ['phone', 'TEXT'],
  ['email', 'TEXT'],
  ['website', 'TEXT'],
  ['contactPerson', 'TEXT'],
  ['hrName', 'TEXT'],
  ['directorName', 'TEXT'],
  ['logoData', 'TEXT'],
  ['stampData', 'TEXT'],
  ['signatureData', 'TEXT'],
  ['cin', 'TEXT'],
  ['gstin', 'TEXT'],
  ['pan', 'TEXT'],
  ['tan', 'TEXT'],
  ['pfRegistrationNo', 'TEXT'],
  ['esicRegistrationNo', 'TEXT'],
  ['bankName', 'TEXT'],
  ['bankAccountNumber', 'TEXT'],
  ['ifsc', 'TEXT'],
  ['paymentMode', 'TEXT'],
  ['defaultPfEnabled', 'INTEGER DEFAULT 0'],
  ['defaultPtEnabled', 'INTEGER DEFAULT 0'],
  ['defaultPfAmount', 'REAL DEFAULT 0'],
  ['defaultPtAmount', 'REAL DEFAULT 0'],
  ['payslipNote', 'TEXT'],
  ['documentFooter', 'TEXT'],
  ['customFields', 'TEXT'],
  ['createdAt', 'TEXT DEFAULT CURRENT_TIMESTAMP'],
  ['updatedAt', 'TEXT DEFAULT CURRENT_TIMESTAMP']
];

const EMPLOYEE_COLUMNS = [
  ['name', 'TEXT'],
  ['employeeId', 'TEXT'],
  ['designation', 'TEXT'],
  ['department', 'TEXT'],
  ['company', 'TEXT'],
  ['companyId', 'INTEGER'],
  ['doj', 'TEXT'],
  ['location', 'TEXT'],
  ['bankName', 'TEXT'],
  ['accountNumber', 'TEXT'],
  ['ifsc', 'TEXT'],
  ['pfNo', 'TEXT'],
  ['pfUAN', 'TEXT'],
  ['esiNo', 'TEXT'],
  ['pan', 'TEXT'],
  ['basic', 'REAL DEFAULT 0'],
  ['hra', 'REAL DEFAULT 0'],
  ['specialAllowance', 'REAL DEFAULT 0'],
  ['mobileNumber', 'TEXT'],
  ['email', 'TEXT'],
  ['address', 'TEXT'],
  ['aadhaar', 'TEXT'],
  ['employmentType', 'TEXT'],
  ['reportingManager', 'TEXT'],
  ['bonus', 'REAL DEFAULT 0'],
  ['ctc', 'REAL DEFAULT 0'],
  ['emergencyContact', 'TEXT'],
  ['profilePhoto', 'TEXT'],
  ['customFields', 'TEXT'],
  ['createdAt', 'TEXT DEFAULT CURRENT_TIMESTAMP'],
  ['updatedAt', 'TEXT DEFAULT CURRENT_TIMESTAMP']
];

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

async function ensureColumns(tableName, columns) {
  const tableInfo = await all(`PRAGMA table_info(${tableName})`);
  const existingColumns = new Set(tableInfo.map((column) => column.name));

  for (const [name, definition] of columns) {
    if (!existingColumns.has(name)) {
      const safeDefinition = definition
        .replace(/\s+UNIQUE\b/i, '')
        .replace(/\s+DEFAULT\s+CURRENT_TIMESTAMP\b/i, '');
      await run(`ALTER TABLE ${tableName} ADD COLUMN ${name} ${safeDefinition}`);
    }
  }
}

async function ensureIndexes() {
  await run('CREATE UNIQUE INDEX IF NOT EXISTS idx_companies_code_unique ON companies(code)');
}

async function seedDefaultCompanies() {
  const countRow = await get('SELECT COUNT(*) AS count FROM companies');
  if ((countRow?.count || 0) > 0) {
    return;
  }

  for (const company of DEFAULT_COMPANIES) {
    await run(
      `INSERT INTO companies (
        code, displayName, legalName, address, city, state, country, postalCode, phone,
        email, website, contactPerson, hrName, directorName, logoData, stampData,
        signatureData, cin, gstin, pan, tan, pfRegistrationNo, esicRegistrationNo,
        bankName, bankAccountNumber, ifsc, paymentMode, defaultPfEnabled,
        defaultPtEnabled, defaultPfAmount, defaultPtAmount, payslipNote, documentFooter
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )`,
      [
        company.code,
        company.displayName,
        company.legalName,
        company.address,
        company.city,
        company.state,
        company.country,
        company.postalCode,
        company.phone,
        company.email,
        company.website,
        company.contactPerson,
        company.hrName,
        company.directorName,
        company.logoData,
        company.stampData,
        company.signatureData,
        company.cin,
        company.gstin,
        company.pan,
        company.tan,
        company.pfRegistrationNo,
        company.esicRegistrationNo,
        company.bankName,
        company.bankAccountNumber,
        company.ifsc,
        company.paymentMode,
        company.defaultPfEnabled,
        company.defaultPtEnabled,
        company.defaultPfAmount,
        company.defaultPtAmount,
        company.payslipNote,
        company.documentFooter
      ]
    );
  }
}

async function backfillEmployeeCompanyIds() {
  const companies = await all('SELECT id, code FROM companies');
  const companyMap = new Map(companies.map((company) => [company.code, company.id]));
  const employees = await all('SELECT id, company, companyId FROM employees');

  for (const employee of employees) {
    if (!employee.companyId && employee.company && companyMap.has(employee.company)) {
      await run(
        'UPDATE employees SET companyId = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
        [companyMap.get(employee.company), employee.id]
      );
    }
  }
}

async function initDatabase() {
  await run(`
    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT
    )
  `);

  await ensureColumns('companies', COMPANY_COLUMNS);
  await ensureColumns('employees', EMPLOYEE_COLUMNS);
  await seedDefaultCompanies();
  await backfillEmployeeCompanyIds();
  await ensureIndexes();
}

function init() {
  const dbPath = path.join(app.getPath('userData'), 'database.sqlite');

  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, async (err) => {
      if (err) {
        console.error('SQLite open error:', err.message);
        reject(err);
        return;
      }

      try {
        await initDatabase();
        console.log('SQLite connected:', dbPath);
        resolve();
      } catch (setupError) {
        console.error('SQLite setup error:', setupError.message);
        reject(setupError);
      }
    });
  });
}

function getCompanies() {
  return all('SELECT * FROM companies ORDER BY displayName COLLATE NOCASE');
}

function addCompany(company) {
  return run(
    `INSERT INTO companies (
      code, displayName, legalName, address, city, state, country, postalCode, phone,
      email, website, contactPerson, hrName, directorName, logoData, stampData,
      signatureData, cin, gstin, pan, tan, pfRegistrationNo, esicRegistrationNo,
      bankName, bankAccountNumber, ifsc, paymentMode, defaultPfEnabled, defaultPtEnabled,
      defaultPfAmount, defaultPtAmount, payslipNote, documentFooter, customFields, createdAt, updatedAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    )`,
    [
      company.code,
      company.displayName,
      company.legalName,
      company.address,
      company.city,
      company.state,
      company.country,
      company.postalCode,
      company.phone,
      company.email,
      company.website,
      company.contactPerson,
      company.hrName,
      company.directorName,
      company.logoData,
      company.stampData,
      company.signatureData,
      company.cin,
      company.gstin,
      company.pan,
      company.tan,
      company.pfRegistrationNo,
      company.esicRegistrationNo,
      company.bankName,
      company.bankAccountNumber,
      company.ifsc,
      company.paymentMode,
      company.defaultPfEnabled ? 1 : 0,
      company.defaultPtEnabled ? 1 : 0,
      company.defaultPfAmount || 0,
      company.defaultPtAmount || 0,
      company.payslipNote,
      company.documentFooter,
      company.customFields || '[]'
    ]
  ).then((result) => result.lastID);
}

function updateCompany(company) {
  return run(
    `UPDATE companies SET
      code = ?,
      displayName = ?,
      legalName = ?,
      address = ?,
      city = ?,
      state = ?,
      country = ?,
      postalCode = ?,
      phone = ?,
      email = ?,
      website = ?,
      contactPerson = ?,
      hrName = ?,
      directorName = ?,
      logoData = ?,
      stampData = ?,
      signatureData = ?,
      cin = ?,
      gstin = ?,
      pan = ?,
      tan = ?,
      pfRegistrationNo = ?,
      esicRegistrationNo = ?,
      bankName = ?,
      bankAccountNumber = ?,
      ifsc = ?,
      paymentMode = ?,
      defaultPfEnabled = ?,
      defaultPtEnabled = ?,
      defaultPfAmount = ?,
      defaultPtAmount = ?,
      payslipNote = ?,
      documentFooter = ?,
      customFields = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?`,
    [
      company.code,
      company.displayName,
      company.legalName,
      company.address,
      company.city,
      company.state,
      company.country,
      company.postalCode,
      company.phone,
      company.email,
      company.website,
      company.contactPerson,
      company.hrName,
      company.directorName,
      company.logoData,
      company.stampData,
      company.signatureData,
      company.cin,
      company.gstin,
      company.pan,
      company.tan,
      company.pfRegistrationNo,
      company.esicRegistrationNo,
      company.bankName,
      company.bankAccountNumber,
      company.ifsc,
      company.paymentMode,
      company.defaultPfEnabled ? 1 : 0,
      company.defaultPtEnabled ? 1 : 0,
      company.defaultPfAmount || 0,
      company.defaultPtAmount || 0,
      company.payslipNote,
      company.documentFooter,
      company.customFields || '[]',
      company.id
    ]
  );
}

async function deleteCompany(id) {
  await run('UPDATE employees SET companyId = NULL, company = "", updatedAt = CURRENT_TIMESTAMP WHERE companyId = ?', [id]);
  return run('DELETE FROM companies WHERE id = ?', [id]);
}

function getEmployees() {
  return all(
    `SELECT
      employees.*,
      companies.displayName AS companyName,
      companies.legalName AS companyLegalName,
      companies.address AS companyAddress,
      companies.phone AS companyPhone,
      companies.email AS companyEmail
    FROM employees
    LEFT JOIN companies ON companies.id = employees.companyId
    ORDER BY employees.name COLLATE NOCASE`
  );
}

function addEmployee(employee) {
  return run(
    `INSERT INTO employees (
      name, employeeId, designation, department, company, companyId, doj, location,
      bankName, accountNumber, ifsc, pfNo, pfUAN, esiNo, pan, basic, hra,
      specialAllowance, mobileNumber, email, address, aadhaar, employmentType,
      reportingManager, bonus, ctc, emergencyContact, profilePhoto, customFields, createdAt, updatedAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    )`,
    [
      employee.name,
      employee.employeeId,
      employee.designation,
      employee.department,
      employee.company || '',
      employee.companyId || null,
      employee.doj,
      employee.location,
      employee.bankName,
      employee.accountNumber,
      employee.ifsc,
      employee.pfNo,
      employee.pfUAN,
      employee.esiNo,
      employee.pan,
      employee.basic || 0,
      employee.hra || 0,
      employee.specialAllowance || 0,
      employee.mobileNumber,
      employee.email,
      employee.address,
      employee.aadhaar,
      employee.employmentType,
      employee.reportingManager,
      employee.bonus || 0,
      employee.ctc || 0,
      employee.emergencyContact,
      employee.profilePhoto || '',
      employee.customFields || '[]'
    ]
  ).then((result) => result.lastID);
}

function updateEmployee(employee) {
  return run(
    `UPDATE employees SET
      name = ?,
      employeeId = ?,
      designation = ?,
      department = ?,
      company = ?,
      companyId = ?,
      doj = ?,
      location = ?,
      bankName = ?,
      accountNumber = ?,
      ifsc = ?,
      pfNo = ?,
      pfUAN = ?,
      esiNo = ?,
      pan = ?,
      basic = ?,
      hra = ?,
      specialAllowance = ?,
      mobileNumber = ?,
      email = ?,
      address = ?,
      aadhaar = ?,
      employmentType = ?,
      reportingManager = ?,
      bonus = ?,
      ctc = ?,
      emergencyContact = ?,
      profilePhoto = ?,
      customFields = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?`,
    [
      employee.name,
      employee.employeeId,
      employee.designation,
      employee.department,
      employee.company || '',
      employee.companyId || null,
      employee.doj,
      employee.location,
      employee.bankName,
      employee.accountNumber,
      employee.ifsc,
      employee.pfNo,
      employee.pfUAN,
      employee.esiNo,
      employee.pan,
      employee.basic || 0,
      employee.hra || 0,
      employee.specialAllowance || 0,
      employee.mobileNumber,
      employee.email,
      employee.address,
      employee.aadhaar,
      employee.employmentType,
      employee.reportingManager,
      employee.bonus || 0,
      employee.ctc || 0,
      employee.emergencyContact,
      employee.profilePhoto || '',
      employee.customFields || '[]',
      employee.id
    ]
  );
}

function deleteEmployee(id) {
  return run('DELETE FROM employees WHERE id = ?', [id]);
}

module.exports = {
  init,
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
};
