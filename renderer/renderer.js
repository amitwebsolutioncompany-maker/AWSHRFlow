let lastPayslipData = null;
let hrDocumentsApp = null;
let companyAssetState = {
  logoData: '',
  stampData: '',
  signatureData: ''
};
let employeeProfilePhotoData = '';
let editingEmployeeId = null;
let editingCompanyId = null;
const MAX_CUSTOM_FIELDS = 4;
let employeeCustomFieldsState = [];
let companyCustomFieldsState = [];

const state = {
  companies: [],
  employees: []
};

const employeeForm = document.getElementById('employeeForm');
const employeeList = document.getElementById('employeeList');
const employeeCountBadge = document.getElementById('employeeCountBadge');
const companyForm = document.getElementById('companyForm');
const companyList = document.getElementById('companyList');
const companyCountBadge = document.getElementById('companyCountBadge');
const payslipForm = document.getElementById('payslipForm');
const downloadBtn = document.getElementById('downloadPdfBtn');
const resetEmployeeBtn = document.getElementById('resetEmployeeBtn');
const resetCompanyBtn = document.getElementById('resetCompanyBtn');
const addEmployeeFieldBtn = document.getElementById('addEmployeeFieldBtn');
const addCompanyFieldBtn = document.getElementById('addCompanyFieldBtn');
const employeeCustomFieldsWrap = document.getElementById('employeeCustomFields');
const companyCustomFieldsWrap = document.getElementById('companyCustomFields');

const employeeFields = {
  empId: document.getElementById('empId'),
  name: document.getElementById('name'),
  employeeId: document.getElementById('employeeId'),
  designation: document.getElementById('designation'),
  department: document.getElementById('department'),
  company: document.getElementById('company'),
  doj: document.getElementById('doj'),
  location: document.getElementById('location'),
  bankName: document.getElementById('bankName'),
  accountNumber: document.getElementById('accountNumber'),
  ifsc: document.getElementById('ifsc'),
  pfNo: document.getElementById('pfNo'),
  pfUAN: document.getElementById('pfUAN'),
  esiNo: document.getElementById('esiNo'),
  pan: document.getElementById('pan'),
  basic: document.getElementById('basic'),
  hra: document.getElementById('hra'),
  specialAllowance: document.getElementById('specialAllowance'),
  mobileNumber: document.getElementById('mobileNumber'),
  email: document.getElementById('email'),
  address: document.getElementById('address'),
  aadhaar: document.getElementById('aadhaar'),
  employmentType: document.getElementById('employmentType'),
  reportingManager: document.getElementById('reportingManager'),
  bonus: document.getElementById('bonus'),
  ctc: document.getElementById('ctc'),
  emergencyContact: document.getElementById('emergencyContact'),
  profilePhoto: document.getElementById('profilePhoto')
};

const companyFields = {
  recordId: document.getElementById('companyRecordId'),
  code: document.getElementById('companyCode'),
  displayName: document.getElementById('companyDisplayName'),
  legalName: document.getElementById('companyLegalName'),
  address: document.getElementById('companyAddress'),
  city: document.getElementById('companyCity'),
  state: document.getElementById('companyState'),
  country: document.getElementById('companyCountry'),
  postalCode: document.getElementById('companyPostalCode'),
  phone: document.getElementById('companyPhone'),
  email: document.getElementById('companyEmail'),
  website: document.getElementById('companyWebsite'),
  contactPerson: document.getElementById('companyContactPerson'),
  hrName: document.getElementById('companyHrName'),
  directorName: document.getElementById('companyDirectorName'),
  cin: document.getElementById('companyCin'),
  gstin: document.getElementById('companyGstin'),
  pan: document.getElementById('companyPan'),
  tan: document.getElementById('companyTan'),
  pfRegistrationNo: document.getElementById('companyPfRegistrationNo'),
  esicRegistrationNo: document.getElementById('companyEsicRegistrationNo'),
  bankName: document.getElementById('companyBankName'),
  bankAccountNumber: document.getElementById('companyBankAccountNumber'),
  ifsc: document.getElementById('companyIfsc'),
  paymentMode: document.getElementById('companyPaymentMode'),
  defaultPfAmount: document.getElementById('defaultPfAmount'),
  defaultPtAmount: document.getElementById('defaultPtAmount'),
  defaultPfEnabled: document.getElementById('defaultPfEnabled'),
  defaultPtEnabled: document.getElementById('defaultPtEnabled'),
  logoData: document.getElementById('companyLogo'),
  stampData: document.getElementById('companyStamp'),
  signatureData: document.getElementById('companySignature'),
  payslipNote: document.getElementById('companyPayslipNote'),
  documentFooter: document.getElementById('companyDocumentFooter')
};

const employeeSelect = document.getElementById('employeeSelect');
const pfCheck = document.getElementById('pfCheck');
const ptCheck = document.getElementById('ptCheck');
const pfStatus = document.getElementById('pfStatus');
const ptStatus = document.getElementById('ptStatus');

const payslipInputs = {
  monthSelect: document.getElementById('monthSelect'),
  yearSelect: document.getElementById('yearSelect'),
  attendance: document.getElementById('attendance'),
  extraAllowance: document.getElementById('extraAllowance'),
  tdsOverride: document.getElementById('tdsOverride')
};

const payslipPreviewEls = {
  container: document.getElementById('payslipPreview'),
  pCompanyName: document.getElementById('pCompanyName'),
  pMonthYear: document.getElementById('pMonthYear'),
  pName: document.getElementById('pName'),
  pEmpId: document.getElementById('pEmpId'),
  pDesig: document.getElementById('pDesig'),
  pDept: document.getElementById('pDept'),
  pDoj: document.getElementById('pDoj'),
  pLocation: document.getElementById('pLocation'),
  pContact: document.getElementById('pContact'),
  pPan: document.getElementById('pPan'),
  pPfNo: document.getElementById('pPfNo'),
  pUan: document.getElementById('pUan'),
  pEsi: document.getElementById('pEsi'),
  cName: document.getElementById('cName'),
  cAddress: document.getElementById('cAddress'),
  cPhone: document.getElementById('cPhone'),
  cEmail: document.getElementById('cEmail'),
  cWebsite: document.getElementById('cWebsite'),
  cGstin: document.getElementById('cGstin'),
  cPfReg: document.getElementById('cPfReg'),
  eBasicFull: document.getElementById('eBasicFull'),
  eBasicActual: document.getElementById('eBasicActual'),
  eHraFull: document.getElementById('eHraFull'),
  eHraActual: document.getElementById('eHraActual'),
  eSplFull: document.getElementById('eSplFull'),
  eSplActual: document.getElementById('eSplActual'),
  eExtraFull: document.getElementById('eExtraFull'),
  eExtraActual: document.getElementById('eExtraActual'),
  eTotalFull: document.getElementById('eTotalFull'),
  eTotalActual: document.getElementById('eTotalActual'),
  dPf: document.getElementById('dPf'),
  dPt: document.getElementById('dPt'),
  dTds: document.getElementById('dTds'),
  dTotal: document.getElementById('dTotal'),
  aTotal: document.getElementById('aTotal'),
  aPresent: document.getElementById('aPresent'),
  aAbsent: document.getElementById('aAbsent'),
  pBank: document.getElementById('pBank'),
  pAcc: document.getElementById('pAcc'),
  pIfsc: document.getElementById('pIfsc'),
  pPeriod: document.getElementById('pPeriod'),
  pPaymentMode: document.getElementById('pPaymentMode'),
  pNet: document.getElementById('pNet'),
  pDays: document.getElementById('pDays'),
  payslipNote: document.getElementById('payslipNote'),
  companyLogo: document.getElementById('previewCompanyLogo'),
  companyLogoWrap: document.getElementById('previewCompanyLogoWrap'),
  logoFallback: document.getElementById('previewLogoFallback')
};

function numberValue(value) {
  return Number(value) || 0;
}

function parseCustomFields(value) {
  try {
    const parsed = JSON.parse(value || '[]');
    return Array.isArray(parsed)
      ? parsed
          .slice(0, MAX_CUSTOM_FIELDS)
          .map((field) => ({
            label: String(field?.label || '').trim(),
            value: String(field?.value || '').trim()
          }))
      : [];
  } catch (error) {
    return [];
  }
}

function serializeCustomFields(fields) {
  return JSON.stringify(
    fields
      .map((field) => ({
        label: String(field?.label || '').trim(),
        value: String(field?.value || '').trim()
      }))
      .filter((field) => field.label || field.value)
      .slice(0, MAX_CUSTOM_FIELDS)
  );
}

function formatCurrency(value) {
  return `Rs. ${numberValue(value).toFixed(2)}`;
}

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getCompanyById(companyId) {
  return state.companies.find((company) => Number(company.id) === Number(companyId)) || null;
}

function getSelectedEmployee() {
  return state.employees.find((employee) => Number(employee.id) === Number(employeeSelect.value)) || null;
}

function buildCompanyOptions(selectEl, includePlaceholder = true) {
  selectEl.innerHTML = includePlaceholder ? '<option value="">Select Company</option>' : '';
  state.companies.forEach((company) => {
    const option = document.createElement('option');
    option.value = company.id;
    option.textContent = company.displayName || company.legalName || company.code;
    selectEl.appendChild(option);
  });
}

async function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function handleAssetUpload(inputEl, stateKey, holder) {
  const file = inputEl.files && inputEl.files[0];
  holder[stateKey] = file ? await readFileAsDataUrl(file) : '';
}

function buildEmployeePayload() {
  const companyId = Number(employeeFields.company.value) || null;
  const company = getCompanyById(companyId);
  return {
    id: editingEmployeeId,
    name: employeeFields.name.value.trim(),
    employeeId: employeeFields.employeeId.value.trim(),
    designation: employeeFields.designation.value.trim(),
    department: employeeFields.department.value.trim(),
    companyId,
    company: company?.code || '',
    doj: employeeFields.doj.value,
    location: employeeFields.location.value.trim(),
    bankName: employeeFields.bankName.value.trim(),
    accountNumber: employeeFields.accountNumber.value.trim(),
    ifsc: employeeFields.ifsc.value.trim(),
    pfNo: employeeFields.pfNo.value.trim(),
    pfUAN: employeeFields.pfUAN.value.trim(),
    esiNo: employeeFields.esiNo.value.trim(),
    pan: employeeFields.pan.value.trim(),
    basic: numberValue(employeeFields.basic.value),
    hra: numberValue(employeeFields.hra.value),
    specialAllowance: numberValue(employeeFields.specialAllowance.value),
    mobileNumber: employeeFields.mobileNumber.value.trim(),
    email: employeeFields.email.value.trim(),
    address: employeeFields.address.value.trim(),
    aadhaar: employeeFields.aadhaar.value.trim(),
    employmentType: employeeFields.employmentType.value.trim() || 'Full Time',
    reportingManager: employeeFields.reportingManager.value.trim(),
    bonus: numberValue(employeeFields.bonus.value),
    ctc: numberValue(employeeFields.ctc.value),
    emergencyContact: employeeFields.emergencyContact.value.trim(),
    profilePhoto: employeeProfilePhotoData,
    customFields: serializeCustomFields(employeeCustomFieldsState)
  };
}

function recalculateEmployeeCtc() {
  const monthlyFixed = numberValue(employeeFields.basic.value) + numberValue(employeeFields.hra.value) + numberValue(employeeFields.specialAllowance.value);
  const annualVariableBonus = numberValue(employeeFields.bonus.value);
  employeeFields.ctc.value = monthlyFixed > 0 || annualVariableBonus > 0
    ? (monthlyFixed * 12 + annualVariableBonus).toFixed(2)
    : '';
}

function renderCustomFieldRows(container, stateRef, scope) {
  container.innerHTML = '';

  if (!stateRef.length) {
    container.innerHTML = `<div class="dynamic-hint">No extra ${scope} fields added yet.</div>`;
    return;
  }

  stateRef.forEach((field, index) => {
    const row = document.createElement('div');
    row.className = 'dynamic-field-item';
    row.innerHTML = `
      <input type="text" data-scope="${scope}" data-kind="label" data-index="${index}" value="${escapeHtml(field.label)}">
      <input type="text" data-scope="${scope}" data-kind="value" data-index="${index}" value="${escapeHtml(field.value)}">
      <button type="button" class="secondary-btn mini-btn" data-scope="${scope}" data-kind="remove" data-index="${index}">Remove</button>
    `;
    container.appendChild(row);
  });
}

function syncCustomFieldButtons() {
  addEmployeeFieldBtn.disabled = employeeCustomFieldsState.length >= MAX_CUSTOM_FIELDS;
  addCompanyFieldBtn.disabled = companyCustomFieldsState.length >= MAX_CUSTOM_FIELDS;
}

function renderAllCustomFields() {
  renderCustomFieldRows(employeeCustomFieldsWrap, employeeCustomFieldsState, 'employee');
  renderCustomFieldRows(companyCustomFieldsWrap, companyCustomFieldsState, 'company');
  syncCustomFieldButtons();
}

function addCustomField(scope) {
  const targetState = scope === 'employee' ? employeeCustomFieldsState : companyCustomFieldsState;
  if (targetState.length >= MAX_CUSTOM_FIELDS) {
    return;
  }
  targetState.push({ label: '', value: '' });
  renderAllCustomFields();
}

function buildCompanyPayload() {
  const code = slugify(companyFields.code.value || companyFields.displayName.value || companyFields.legalName.value);
  return {
    id: editingCompanyId,
    code,
    displayName: companyFields.displayName.value.trim(),
    legalName: companyFields.legalName.value.trim() || companyFields.displayName.value.trim(),
    address: companyFields.address.value.trim(),
    city: companyFields.city.value.trim(),
    state: companyFields.state.value.trim(),
    country: companyFields.country.value.trim(),
    postalCode: companyFields.postalCode.value.trim(),
    phone: companyFields.phone.value.trim(),
    email: companyFields.email.value.trim(),
    website: companyFields.website.value.trim(),
    contactPerson: companyFields.contactPerson.value.trim(),
    hrName: companyFields.hrName.value.trim(),
    directorName: companyFields.directorName.value.trim(),
    logoData: companyAssetState.logoData,
    stampData: companyAssetState.stampData,
    signatureData: companyAssetState.signatureData,
    cin: companyFields.cin.value.trim(),
    gstin: companyFields.gstin.value.trim(),
    pan: companyFields.pan.value.trim(),
    tan: companyFields.tan.value.trim(),
    pfRegistrationNo: companyFields.pfRegistrationNo.value.trim(),
    esicRegistrationNo: companyFields.esicRegistrationNo.value.trim(),
    bankName: companyFields.bankName.value.trim(),
    bankAccountNumber: companyFields.bankAccountNumber.value.trim(),
    ifsc: companyFields.ifsc.value.trim(),
    paymentMode: companyFields.paymentMode.value.trim() || 'Bank Transfer',
    defaultPfEnabled: companyFields.defaultPfEnabled.checked,
    defaultPtEnabled: companyFields.defaultPtEnabled.checked,
    defaultPfAmount: numberValue(companyFields.defaultPfAmount.value),
    defaultPtAmount: numberValue(companyFields.defaultPtAmount.value),
    payslipNote: companyFields.payslipNote.value.trim(),
    documentFooter: companyFields.documentFooter.value.trim(),
    customFields: serializeCustomFields(companyCustomFieldsState)
  };
}

function resetEmployeeForm() {
  editingEmployeeId = null;
  employeeProfilePhotoData = '';
  employeeCustomFieldsState = [];
  employeeForm.reset();
  employeeFields.empId.value = '';
  employeeFields.employmentType.value = 'Full Time';
  employeeFields.ctc.value = '';
  buildCompanyOptions(employeeFields.company);
  renderAllCustomFields();
}

function resetCompanyForm() {
  editingCompanyId = null;
  companyCustomFieldsState = [];
  companyAssetState = {
    logoData: '',
    stampData: '',
    signatureData: ''
  };
  companyForm.reset();
  companyFields.recordId.value = '';
  companyFields.country.value = 'India';
  companyFields.paymentMode.value = 'Bank Transfer';
  renderAllCustomFields();
}

function editEmployee(employee) {
  editingEmployeeId = employee.id;
  employeeProfilePhotoData = employee.profilePhoto || '';
  employeeFields.empId.value = employee.id || '';
  employeeFields.name.value = employee.name || '';
  employeeFields.employeeId.value = employee.employeeId || '';
  employeeFields.designation.value = employee.designation || '';
  employeeFields.department.value = employee.department || '';
  employeeFields.company.value = employee.companyId || '';
  employeeFields.doj.value = employee.doj || '';
  employeeFields.location.value = employee.location || '';
  employeeFields.bankName.value = employee.bankName || '';
  employeeFields.accountNumber.value = employee.accountNumber || '';
  employeeFields.ifsc.value = employee.ifsc || '';
  employeeFields.pfNo.value = employee.pfNo || '';
  employeeFields.pfUAN.value = employee.pfUAN || '';
  employeeFields.esiNo.value = employee.esiNo || '';
  employeeFields.pan.value = employee.pan || '';
  employeeFields.basic.value = employee.basic || '';
  employeeFields.hra.value = employee.hra || '';
  employeeFields.specialAllowance.value = employee.specialAllowance || '';
  employeeFields.mobileNumber.value = employee.mobileNumber || '';
  employeeFields.email.value = employee.email || '';
  employeeFields.address.value = employee.address || '';
  employeeFields.aadhaar.value = employee.aadhaar || '';
  employeeFields.employmentType.value = employee.employmentType || 'Full Time';
  employeeFields.reportingManager.value = employee.reportingManager || '';
  employeeFields.bonus.value = employee.bonus || '';
  employeeFields.ctc.value = employee.ctc || '';
  employeeFields.emergencyContact.value = employee.emergencyContact || '';
  employeeCustomFieldsState = parseCustomFields(employee.customFields);
  renderAllCustomFields();
  recalculateEmployeeCtc();
}

function editCompany(company) {
  editingCompanyId = company.id;
  companyAssetState = {
    logoData: company.logoData || '',
    stampData: company.stampData || '',
    signatureData: company.signatureData || ''
  };
  companyFields.recordId.value = company.id || '';
  companyFields.code.value = company.code || '';
  companyFields.displayName.value = company.displayName || '';
  companyFields.legalName.value = company.legalName || '';
  companyFields.address.value = company.address || '';
  companyFields.city.value = company.city || '';
  companyFields.state.value = company.state || '';
  companyFields.country.value = company.country || 'India';
  companyFields.postalCode.value = company.postalCode || '';
  companyFields.phone.value = company.phone || '';
  companyFields.email.value = company.email || '';
  companyFields.website.value = company.website || '';
  companyFields.contactPerson.value = company.contactPerson || '';
  companyFields.hrName.value = company.hrName || '';
  companyFields.directorName.value = company.directorName || '';
  companyFields.cin.value = company.cin || '';
  companyFields.gstin.value = company.gstin || '';
  companyFields.pan.value = company.pan || '';
  companyFields.tan.value = company.tan || '';
  companyFields.pfRegistrationNo.value = company.pfRegistrationNo || '';
  companyFields.esicRegistrationNo.value = company.esicRegistrationNo || '';
  companyFields.bankName.value = company.bankName || '';
  companyFields.bankAccountNumber.value = company.bankAccountNumber || '';
  companyFields.ifsc.value = company.ifsc || '';
  companyFields.paymentMode.value = company.paymentMode || 'Bank Transfer';
  companyFields.defaultPfEnabled.checked = Boolean(company.defaultPfEnabled);
  companyFields.defaultPtEnabled.checked = Boolean(company.defaultPtEnabled);
  companyFields.defaultPfAmount.value = company.defaultPfAmount || '';
  companyFields.defaultPtAmount.value = company.defaultPtAmount || '';
  companyFields.payslipNote.value = company.payslipNote || '';
  companyFields.documentFooter.value = company.documentFooter || '';
  companyCustomFieldsState = parseCustomFields(company.customFields);
  renderAllCustomFields();
}

function renderEmployeeList() {
  employeeList.innerHTML = '';
  employeeCountBadge.textContent = `${state.employees.length} Employees`;

  if (!state.employees.length) {
    employeeList.innerHTML = '<li class="empty-list">No employee records yet.</li>';
    return;
  }

  state.employees.forEach((employee) => {
    const company = getCompanyById(employee.companyId);
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="employee-card-copy">
        <strong>${escapeHtml(employee.name || 'Unnamed Employee')}</strong>
        <span>${escapeHtml(employee.designation || 'Designation not set')} | ${escapeHtml(employee.department || 'Department not set')}</span>
        <span>${escapeHtml(company?.displayName || 'No company linked')}</span>
      </div>
    `;

    const actionWrap = document.createElement('div');
    actionWrap.className = 'list-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editEmployee(employee);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = async () => {
      await window.api.deleteEmployee(employee.id);
      await refreshAllData();
    };

    actionWrap.appendChild(editBtn);
    actionWrap.appendChild(delBtn);
    li.appendChild(actionWrap);
    employeeList.appendChild(li);
  });
}

function renderCompanyList() {
  companyList.innerHTML = '';
  companyCountBadge.textContent = `${state.companies.length} Companies`;

  if (!state.companies.length) {
    companyList.innerHTML = '<li class="empty-list">No company profiles yet.</li>';
    return;
  }

  state.companies.forEach((company) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="employee-card-copy">
        <strong>${escapeHtml(company.displayName || company.legalName || company.code)}</strong>
        <span>${escapeHtml(company.email || 'No email')} | ${escapeHtml(company.phone || 'No phone')}</span>
        <span>${escapeHtml(company.city || '')}${company.state ? `, ${escapeHtml(company.state)}` : ''}</span>
      </div>
    `;

    const actionWrap = document.createElement('div');
    actionWrap.className = 'list-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editCompany(company);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = async () => {
      await window.api.deleteCompany(company.id);
      if (editingCompanyId === company.id) {
        resetCompanyForm();
      }
      await refreshAllData();
    };

    actionWrap.appendChild(editBtn);
    actionWrap.appendChild(delBtn);
    li.appendChild(actionWrap);
    companyList.appendChild(li);
  });
}

function renderEmployeeSelectOptions() {
  employeeSelect.innerHTML = '';

  if (!state.employees.length) {
    employeeSelect.innerHTML = '<option value="">No employees found</option>';
    return;
  }

  state.employees.forEach((employee) => {
    const option = document.createElement('option');
    option.value = employee.id;
    option.textContent = `${employee.name} - ${employee.employeeId || 'No ID'}`;
    employeeSelect.appendChild(option);
  });

  employeeSelect.value = String(state.employees[0].id);
  syncCompanyDrivenDeductions();
}

async function refreshAllData() {
  const [companies, employees] = await Promise.all([
    window.api.getCompanies(),
    window.api.getEmployees()
  ]);

  state.companies = companies;
  state.employees = employees;

  buildCompanyOptions(employeeFields.company);
  renderCompanyList();
  renderEmployeeList();
  renderEmployeeSelectOptions();

  if (hrDocumentsApp) {
    await hrDocumentsApp.refreshData();
  }
}

function syncCompanyDrivenDeductions() {
  const employee = getSelectedEmployee();
  const company = employee ? getCompanyById(employee.companyId) : null;

  pfCheck.checked = Boolean(company?.defaultPfEnabled);
  ptCheck.checked = Boolean(company?.defaultPtEnabled);
  updateDeductionStatus();
}

function updateDeductionStatus() {
  pfStatus.textContent = `PF: ${pfCheck.checked ? 'YES' : 'NO'}`;
  ptStatus.textContent = `PT: ${ptCheck.checked ? 'YES' : 'NO'}`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

employeeCustomFieldsWrap.addEventListener('input', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.dataset.index) {
    return;
  }
  const index = Number(target.dataset.index);
  const kind = target.dataset.kind;
  if (!Number.isInteger(index) || !['label', 'value'].includes(kind)) {
    return;
  }
  employeeCustomFieldsState[index][kind] = target.value;
});

companyCustomFieldsWrap.addEventListener('input', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.dataset.index) {
    return;
  }
  const index = Number(target.dataset.index);
  const kind = target.dataset.kind;
  if (!Number.isInteger(index) || !['label', 'value'].includes(kind)) {
    return;
  }
  companyCustomFieldsState[index][kind] = target.value;
});

employeeCustomFieldsWrap.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-kind="remove"]');
  if (!button) {
    return;
  }
  employeeCustomFieldsState.splice(Number(button.dataset.index), 1);
  renderAllCustomFields();
});

companyCustomFieldsWrap.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-kind="remove"]');
  if (!button) {
    return;
  }
  companyCustomFieldsState.splice(Number(button.dataset.index), 1);
  renderAllCustomFields();
});

employeeFields.profilePhoto.addEventListener('change', async () => {
  const file = employeeFields.profilePhoto.files && employeeFields.profilePhoto.files[0];
  employeeProfilePhotoData = file ? await readFileAsDataUrl(file) : '';
});

companyFields.logoData.addEventListener('change', async () => {
  await handleAssetUpload(companyFields.logoData, 'logoData', companyAssetState);
});

companyFields.stampData.addEventListener('change', async () => {
  await handleAssetUpload(companyFields.stampData, 'stampData', companyAssetState);
});

companyFields.signatureData.addEventListener('change', async () => {
  await handleAssetUpload(companyFields.signatureData, 'signatureData', companyAssetState);
});

employeeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = buildEmployeePayload();

  if (!payload.name || !payload.employeeId) {
    alert('Employee name and employee ID are required.');
    return;
  }

  if (editingEmployeeId) {
    await window.api.updateEmployee(payload);
  } else {
    await window.api.addEmployee(payload);
  }

  resetEmployeeForm();
  await refreshAllData();
});

companyForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = buildCompanyPayload();

  if (!payload.code || !payload.displayName) {
    alert('Company code and display name are required.');
    return;
  }

  if (editingCompanyId) {
    await window.api.updateCompany(payload);
  } else {
    await window.api.addCompany(payload);
  }

  resetCompanyForm();
  await refreshAllData();
});

resetEmployeeBtn.addEventListener('click', resetEmployeeForm);
resetCompanyBtn.addEventListener('click', resetCompanyForm);
addEmployeeFieldBtn.addEventListener('click', () => addCustomField('employee'));
addCompanyFieldBtn.addEventListener('click', () => addCustomField('company'));

['basic', 'hra', 'specialAllowance', 'bonus'].forEach((fieldKey) => {
  employeeFields[fieldKey].addEventListener('input', recalculateEmployeeCtc);
  employeeFields[fieldKey].addEventListener('change', recalculateEmployeeCtc);
});

employeeSelect.addEventListener('change', syncCompanyDrivenDeductions);
pfCheck.addEventListener('change', updateDeductionStatus);
ptCheck.addEventListener('change', updateDeductionStatus);

payslipForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const employee = getSelectedEmployee();
  if (!employee) {
    alert('Please select an employee.');
    return;
  }

  const company = getCompanyById(employee.companyId);
  if (!company) {
    alert('Please link the employee to a company profile first.');
    return;
  }

  const month = numberValue(payslipInputs.monthSelect.value);
  const year = numberValue(payslipInputs.yearSelect.value);
  const presentDays = numberValue(payslipInputs.attendance.value);
  const totalDays = new Date(year, month, 0).getDate();
  const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' }).toUpperCase();
  const extraAllowance = numberValue(payslipInputs.extraAllowance.value);
  const tdsOverride = numberValue(payslipInputs.tdsOverride.value);

  const grossFull = numberValue(employee.basic) + numberValue(employee.hra) + numberValue(employee.specialAllowance) + extraAllowance;
  const earned = (grossFull / totalDays) * presentDays;
  const basicActual = (numberValue(employee.basic) / totalDays) * presentDays;
  const hraActual = (numberValue(employee.hra) / totalDays) * presentDays;
  const splActual = (numberValue(employee.specialAllowance) / totalDays) * presentDays;
  const extraActual = (extraAllowance / totalDays) * presentDays;

  const pf = pfCheck.checked ? numberValue(company.defaultPfAmount) : 0;
  const pt = ptCheck.checked ? numberValue(company.defaultPtAmount) : 0;
  let tds = tdsOverride;
  if (!tdsOverride) {
    const yearlySalary = earned * 12;
    if (yearlySalary > 1200000 || earned > 100000) {
      tds = earned * 0.1;
    }
  }

  const totalDed = pf + pt + tds;
  const net = earned - totalDed;

  payslipPreviewEls.container.style.display = 'block';
  payslipPreviewEls.pCompanyName.innerText = company.displayName || company.legalName || '';
  payslipPreviewEls.pMonthYear.innerText = `${monthName} ${year}`;
  payslipPreviewEls.pName.innerText = employee.name || '-';
  payslipPreviewEls.pEmpId.innerText = employee.employeeId || '-';
  payslipPreviewEls.pDesig.innerText = employee.designation || '-';
  payslipPreviewEls.pDept.innerText = employee.department || '-';
  payslipPreviewEls.pDoj.innerText = employee.doj || '-';
  payslipPreviewEls.pLocation.innerText = employee.location || '-';
  payslipPreviewEls.pContact.innerText = employee.mobileNumber || employee.email || '-';
  payslipPreviewEls.pPan.innerText = employee.pan || '-';
  payslipPreviewEls.pPfNo.innerText = employee.pfNo || '-';
  payslipPreviewEls.pUan.innerText = employee.pfUAN || '-';
  payslipPreviewEls.pEsi.innerText = employee.esiNo || '-';
  payslipPreviewEls.cName.innerText = company.legalName || company.displayName || '-';
  payslipPreviewEls.cAddress.innerText = company.address || '-';
  payslipPreviewEls.cPhone.innerText = company.phone || '-';
  payslipPreviewEls.cEmail.innerText = company.email || '-';
  payslipPreviewEls.cWebsite.innerText = company.website || '-';
  payslipPreviewEls.cGstin.innerText = company.gstin || '-';
  payslipPreviewEls.cPfReg.innerText = company.pfRegistrationNo || '-';
  payslipPreviewEls.eBasicFull.innerText = formatCurrency(employee.basic);
  payslipPreviewEls.eBasicActual.innerText = formatCurrency(basicActual);
  payslipPreviewEls.eHraFull.innerText = formatCurrency(employee.hra);
  payslipPreviewEls.eHraActual.innerText = formatCurrency(hraActual);
  payslipPreviewEls.eSplFull.innerText = formatCurrency(employee.specialAllowance);
  payslipPreviewEls.eSplActual.innerText = formatCurrency(splActual);
  payslipPreviewEls.eExtraFull.innerText = formatCurrency(extraAllowance);
  payslipPreviewEls.eExtraActual.innerText = formatCurrency(extraActual);
  payslipPreviewEls.eTotalFull.innerText = formatCurrency(grossFull);
  payslipPreviewEls.eTotalActual.innerText = formatCurrency(earned);
  payslipPreviewEls.dPf.innerText = formatCurrency(pf);
  payslipPreviewEls.dPt.innerText = formatCurrency(pt);
  payslipPreviewEls.dTds.innerText = formatCurrency(tds);
  payslipPreviewEls.dTotal.innerText = formatCurrency(totalDed);
  payslipPreviewEls.aTotal.innerText = `${totalDays} days`;
  payslipPreviewEls.aPresent.innerText = `${presentDays} days`;
  payslipPreviewEls.aAbsent.innerText = `${totalDays - presentDays} days`;
  payslipPreviewEls.pBank.innerText = employee.bankName || company.bankName || '-';
  payslipPreviewEls.pAcc.innerText = employee.accountNumber || company.bankAccountNumber || '-';
  payslipPreviewEls.pIfsc.innerText = employee.ifsc || company.ifsc || '-';
  payslipPreviewEls.pPeriod.innerText = `${monthName} ${year}`;
  payslipPreviewEls.pPaymentMode.innerText = company.paymentMode || 'Bank Transfer';
  payslipPreviewEls.pNet.innerText = net.toFixed(2);
  payslipPreviewEls.pDays.innerText = `${presentDays}/${totalDays} days`;
  payslipPreviewEls.payslipNote.innerText = company.payslipNote || 'This is a computer-generated payslip and does not require a signature.';

  if (company.logoData) {
    payslipPreviewEls.companyLogo.src = company.logoData;
    payslipPreviewEls.companyLogo.style.display = 'block';
    payslipPreviewEls.logoFallback.style.display = 'none';
  } else {
    payslipPreviewEls.companyLogo.removeAttribute('src');
    payslipPreviewEls.companyLogo.style.display = 'none';
    payslipPreviewEls.logoFallback.style.display = 'flex';
    payslipPreviewEls.logoFallback.textContent = (company.displayName || 'CO')
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('') || 'CO';
  }

  lastPayslipData = {
    employee,
    company,
    monthName,
    year,
    grossFull,
    earned,
    pf,
    pt,
    tds,
    totalDed,
    net,
    totalDays,
    presentDays,
    extraAllowance
  };
});

downloadBtn.addEventListener('click', async () => {
  if (!lastPayslipData) {
    alert('Please generate payslip preview first.');
    return;
  }

  const {
    employee,
    company,
    monthName,
    year,
    grossFull,
    earned,
    pf,
    pt,
    tds,
    totalDed,
    net,
    totalDays,
    presentDays,
    extraAllowance
  } = lastPayslipData;

  await window.api.generatePayslipPdf({
    employeeName: employee.name,
    month: monthName,
    year,
    templateData: {
      NAME: employee.name,
      EMPID: employee.employeeId,
      DESIGNATION: employee.designation,
      DEPARTMENT: employee.department,
      DOJ: employee.doj,
      LOCATION: employee.location,
      PAN: employee.pan,
      PF: employee.pfNo,
      UAN: employee.pfUAN,
      ESI: employee.esiNo,
      COMPANY_NAME: company.displayName || '',
      COMPANY_LEGAL_NAME: company.legalName || '',
      COMPANY_ADDRESS: company.address || '',
      COMPANY_PHONE: company.phone || '',
      COMPANY_EMAIL: company.email || '',
      COMPANY_WEBSITE: company.website || '',
      COMPANY_GSTIN: company.gstin || '',
      COMPANY_PF_REG: company.pfRegistrationNo || '',
      COMPANY_LOGO_DATA: company.logoData || '',
      BASIC: numberValue(employee.basic).toFixed(2),
      BASIC_A: ((numberValue(employee.basic) / totalDays) * presentDays).toFixed(2),
      HRA: numberValue(employee.hra).toFixed(2),
      HRA_A: ((numberValue(employee.hra) / totalDays) * presentDays).toFixed(2),
      SPL: numberValue(employee.specialAllowance).toFixed(2),
      SPL_A: ((numberValue(employee.specialAllowance) / totalDays) * presentDays).toFixed(2),
      EXTRA: extraAllowance.toFixed(2),
      EXTRA_A: ((extraAllowance / totalDays) * presentDays).toFixed(2),
      TOTAL_FULL: grossFull.toFixed(2),
      TOTAL_ACTUAL: earned.toFixed(2),
      PF_AMT: pf.toFixed(2),
      PT: pt.toFixed(2),
      TDS: tds.toFixed(2),
      DED_TOTAL: totalDed.toFixed(2),
      TOTAL_DAYS: `${totalDays} days`,
      PRESENT_DAYS: `${presentDays} days`,
      ABSENT_DAYS: `${totalDays - presentDays} days`,
      BANK: employee.bankName || company.bankName || '',
      ACCOUNT: employee.accountNumber || company.bankAccountNumber || '',
      IFSC: employee.ifsc || company.ifsc || '',
      MONTH_YEAR: `${monthName} ${year}`,
      NET: net.toFixed(2),
      NET_WORDS: convertNumberToWords(net),
      PAYMENT_MODE: company.paymentMode || 'Bank Transfer',
      PAYSLIP_NOTE: company.payslipNote || 'This is a computer-generated payslip and does not require a signature.'
    }
  });
});

function convertNumberToWords(amount) {
  amount = Math.floor(Number(amount));
  if (Number.isNaN(amount)) return '';

  const words = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function numToWords(num) {
    if (num < 20) return words[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ` ${words[num % 10]}` : '');
    if (num < 1000) return `${words[Math.floor(num / 100)]} Hundred${num % 100 ? ` ${numToWords(num % 100)}` : ''}`;
    if (num < 100000) return `${numToWords(Math.floor(num / 1000))} Thousand${num % 1000 ? ` ${numToWords(num % 1000)}` : ''}`;
    if (num < 10000000) return `${numToWords(Math.floor(num / 100000))} Lakh${num % 100000 ? ` ${numToWords(num % 100000)}` : ''}`;
    return `${numToWords(Math.floor(num / 10000000))} Crore${num % 10000000 ? ` ${numToWords(num % 10000000)}` : ''}`;
  }

  return `Rupees ${numToWords(amount)} Only`;
}

async function initHrDocuments() {
  hrDocumentsApp = window.hrDocumentsModule.createHrDocumentsModule({
    getEmployees: () => window.api.getEmployees(),
    getCompanies: () => window.api.getCompanies(),
    numberToWords: convertNumberToWords
  });
  await hrDocumentsApp.init();
}

async function initializeApp() {
  payslipInputs.yearSelect.value = new Date().getFullYear();
  payslipInputs.attendance.value = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  employeeFields.employmentType.value = 'Full Time';
  companyFields.country.value = 'India';
  companyFields.paymentMode.value = 'Bank Transfer';
  renderAllCustomFields();
  await initHrDocuments();
  await refreshAllData();
}

initializeApp();
