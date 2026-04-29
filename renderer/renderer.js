let lastPayslipData = null;
let lastIdCardData = null;
let lastPolicyPdfData = null;
let hrDocumentsApp = null;
let companyAssetState = {
  logoData: '',
  stampData: '',
  signatureData: ''
};
let employeeProfilePhotoData = '';
let editingEmployeeId = null;
let editingCompanyId = null;
let editingPolicyId = null;
let selectedPolicyCompanyId = null;
const MAX_CUSTOM_FIELDS = 4;
let employeeCustomFieldsState = [];
let companyCustomFieldsState = [];

const state = {
  companies: [],
  employees: [],
  policies: []
};

const employeeForm = document.getElementById('employeeForm');
const employeeList = document.getElementById('employeeList');
const employeeCountBadge = document.getElementById('employeeCountBadge');
const companyForm = document.getElementById('companyForm');
const companyList = document.getElementById('companyList');
const companyCountBadge = document.getElementById('companyCountBadge');
const policyForm = document.getElementById('policyForm');
const policyCompanyList = document.getElementById('policyCompanyList');
const policyList = document.getElementById('policyList');
const policyCountBadge = document.getElementById('policyCountBadge');
const policySelectedCompanyTitle = document.getElementById('policySelectedCompanyTitle');
const policyPreview = document.getElementById('policyPreview');
const resetPolicyBtn = document.getElementById('resetPolicyBtn');
const downloadPolicyPdfBtn = document.getElementById('downloadPolicyPdfBtn');
const payslipForm = document.getElementById('payslipForm');
const downloadBtn = document.getElementById('downloadPdfBtn');
const idCardForm = document.getElementById('idCardForm');
const refreshIdCardBtn = document.getElementById('refreshIdCardBtn');
const downloadIdCardPdfBtn = document.getElementById('downloadIdCardPdfBtn');
const resetEmployeeBtn = document.getElementById('resetEmployeeBtn');
const resetCompanyBtn = document.getElementById('resetCompanyBtn');
const addEmployeeFieldBtn = document.getElementById('addEmployeeFieldBtn');
const addCompanyFieldBtn = document.getElementById('addCompanyFieldBtn');
const employeeCustomFieldsWrap = document.getElementById('employeeCustomFields');
const companyCustomFieldsWrap = document.getElementById('companyCustomFields');
const appAuthOverlay = document.getElementById('appAuthOverlay');
const appAuthForm = document.getElementById('appAuthForm');
const appPasswordInput = document.getElementById('appPasswordInput');
const appAuthMessage = document.getElementById('appAuthMessage');

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

const policyFields = {
  recordId: document.getElementById('policyRecordId'),
  companyId: document.getElementById('policyCompany'),
  policyType: document.getElementById('policyType'),
  policyCode: document.getElementById('policyCode'),
  title: document.getElementById('policyTitle'),
  version: document.getElementById('policyVersion'),
  effectiveDate: document.getElementById('policyEffectiveDate'),
  reviewDate: document.getElementById('policyReviewDate'),
  ownerDepartment: document.getElementById('policyOwnerDepartment'),
  approverName: document.getElementById('policyApproverName'),
  status: document.getElementById('policyStatus'),
  summary: document.getElementById('policySummary'),
  purpose: document.getElementById('policyPurpose'),
  scope: document.getElementById('policyScope'),
  applicability: document.getElementById('policyApplicability'),
  policyRules: document.getElementById('policyRules'),
  workflow: document.getElementById('policyWorkflow'),
  exceptions: document.getElementById('policyExceptions'),
  disciplinaryAction: document.getElementById('policyDisciplinaryAction')
};

const employeeSelect = document.getElementById('employeeSelect');
const idCardEmployeeSelect = document.getElementById('idCardEmployeeSelect');
const idCardTemplateStyle = document.getElementById('idCardTemplateStyle');
const idCardBackNote = document.getElementById('idCardBackNote');
const idCardPreviewTitle = document.getElementById('idCardPreviewTitle');
const idCardPreviewEmpty = document.getElementById('idCardPreviewEmpty');
const idCardPreviewShell = document.getElementById('idCardPreviewShell');
const idCardFrontPreview = document.getElementById('idCardFrontPreview');
const idCardBackPreview = document.getElementById('idCardBackPreview');
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
  pPrimaryAddress: document.getElementById('pPrimaryAddress'),
  pEmergencyContact: document.getElementById('pEmergencyContact'),
  pEmployeeDynamicFields: document.getElementById('pEmployeeDynamicFields'),
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

const searchableSelectRegistry = new Map();

function getSearchableSelectText(optionEl) {
  return optionEl ? String(optionEl.textContent || '').trim() : '';
}

function closeAllSearchableSelects(exceptSelect = null) {
  searchableSelectRegistry.forEach((instance, selectEl) => {
    if (selectEl !== exceptSelect) {
      instance.close();
    }
  });
}

function shouldEnhanceSearchableSelect(selectEl) {
  return selectEl instanceof HTMLSelectElement
    && !selectEl.multiple
    && Number(selectEl.size || 0) <= 1
    && !selectEl.closest('.searchable-select');
}

function buildSearchableSelect(selectEl) {
  if (!shouldEnhanceSearchableSelect(selectEl)) {
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'searchable-select';

  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.className = 'searchable-select-input';
  inputEl.autocomplete = 'off';
  inputEl.spellcheck = false;

  const toggleEl = document.createElement('button');
  toggleEl.type = 'button';
  toggleEl.className = 'searchable-select-toggle';
  toggleEl.setAttribute('aria-label', 'Toggle options');
  toggleEl.innerHTML = '&#9662;';

  const dropdownEl = document.createElement('div');
  dropdownEl.className = 'searchable-select-dropdown';

  const optionsEl = document.createElement('div');
  optionsEl.className = 'searchable-select-options';

  const emptyEl = document.createElement('div');
  emptyEl.className = 'searchable-select-empty';
  emptyEl.textContent = 'No matching options';

  dropdownEl.appendChild(optionsEl);
  dropdownEl.appendChild(emptyEl);

  const parent = selectEl.parentNode;
  parent.insertBefore(wrapper, selectEl);
  wrapper.appendChild(selectEl);
  wrapper.appendChild(inputEl);
  wrapper.appendChild(toggleEl);
  wrapper.appendChild(dropdownEl);
  selectEl.classList.add('native-select-hidden');

  let highlightedIndex = -1;

  function getOptions() {
    return Array.from(selectEl.options || []).map((optionEl) => ({
      value: optionEl.value,
      label: getSearchableSelectText(optionEl),
      disabled: optionEl.disabled,
      placeholder: optionEl.value === '',
      selected: optionEl.selected
    }));
  }

  function selectedOption() {
    return selectEl.options[selectEl.selectedIndex] || selectEl.options[0] || null;
  }

  function syncFromSelect() {
    const optionEl = selectedOption();
    const placeholderOption = Array.from(selectEl.options || []).find((item) => item.value === '');
    inputEl.value = optionEl && optionEl.value !== '' ? getSearchableSelectText(optionEl) : '';
    inputEl.placeholder = getSearchableSelectText(placeholderOption) || 'Type to search';
  }

  function optionButtons() {
    return Array.from(optionsEl.querySelectorAll('.searchable-select-option'));
  }

  function setHighlighted(index) {
    const buttons = optionButtons();
    highlightedIndex = buttons.length ? Math.max(0, Math.min(index, buttons.length - 1)) : -1;
    buttons.forEach((button, buttonIndex) => {
      button.classList.toggle('active', buttonIndex === highlightedIndex);
    });
    const activeButton = buttons[highlightedIndex];
    if (activeButton) {
      activeButton.scrollIntoView({ block: 'nearest' });
    }
  }

  function renderOptions(query = '') {
    const normalizedQuery = String(query || '').trim().toLowerCase();
    const options = getOptions().filter((option) => {
      if (!normalizedQuery) {
        return true;
      }
      return option.label.toLowerCase().includes(normalizedQuery);
    });

    optionsEl.innerHTML = '';
    options.forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'searchable-select-option';
      if (option.selected) {
        button.classList.add('selected');
      }
      button.disabled = option.disabled;
      button.dataset.value = option.value;
      button.textContent = option.label || (option.placeholder ? 'Select option' : 'Untitled option');
      button.addEventListener('mousedown', (event) => {
        event.preventDefault();
      });
      button.addEventListener('click', () => {
        const previousValue = selectEl.value;
        selectEl.value = option.value;
        syncFromSelect();
        close();
        if (previousValue !== selectEl.value) {
          selectEl.dispatchEvent(new Event('input', { bubbles: true }));
          selectEl.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      optionsEl.appendChild(button);
      if (option.selected && !normalizedQuery) {
        highlightedIndex = index;
      }
    });

    emptyEl.style.display = options.length ? 'none' : 'block';
    setHighlighted(options.length ? (highlightedIndex >= 0 ? highlightedIndex : 0) : -1);
  }

  function open() {
    closeAllSearchableSelects(selectEl);
    wrapper.classList.add('open');
    renderOptions('');
  }

  function close() {
    wrapper.classList.remove('open');
    highlightedIndex = -1;
    syncFromSelect();
  }

  inputEl.addEventListener('focus', () => {
    open();
    inputEl.select();
  });

  inputEl.addEventListener('input', () => {
    open();
    renderOptions(inputEl.value);
  });

  inputEl.addEventListener('keydown', (event) => {
    const buttons = optionButtons();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!wrapper.classList.contains('open')) {
        open();
      }
      setHighlighted(highlightedIndex + 1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted(highlightedIndex - 1);
      return;
    }

    if (event.key === 'Enter') {
      if (!wrapper.classList.contains('open')) {
        open();
        return;
      }
      event.preventDefault();
      const activeButton = buttons[highlightedIndex] || buttons[0];
      if (activeButton) {
        activeButton.click();
      }
      return;
    }

    if (event.key === 'Escape') {
      close();
    }
  });

  toggleEl.addEventListener('click', () => {
    if (wrapper.classList.contains('open')) {
      close();
    } else {
      open();
      inputEl.focus();
    }
  });

  selectEl.addEventListener('change', syncFromSelect);

  const optionObserver = new MutationObserver(() => {
    syncFromSelect();
    if (wrapper.classList.contains('open')) {
      renderOptions(inputEl.value);
    }
  });

  optionObserver.observe(selectEl, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['disabled', 'label', 'selected', 'value']
  });

  searchableSelectRegistry.set(selectEl, {
    close,
    refresh() {
      syncFromSelect();
      if (wrapper.classList.contains('open')) {
        renderOptions(inputEl.value);
      }
    }
  });

  syncFromSelect();
}

function refreshSearchableSelects(root = document) {
  Array.from(root.querySelectorAll('select')).forEach((selectEl) => {
    if (searchableSelectRegistry.has(selectEl)) {
      searchableSelectRegistry.get(selectEl).refresh();
      return;
    }
    buildSearchableSelect(selectEl);
  });
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('.searchable-select')) {
    closeAllSearchableSelects();
  }
});

const searchableSelectObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) {
        return;
      }
      if (node.matches && node.matches('select')) {
        refreshSearchableSelects(node.parentElement || document);
      } else if (node.querySelector) {
        refreshSearchableSelects(node);
      }
    });
  });
});

searchableSelectObserver.observe(document.body, { childList: true, subtree: true });
refreshSearchableSelects();

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

function buildCustomFieldsArray(rawValue) {
  return parseCustomFields(rawValue).filter((field) => field.label || field.value);
}

function buildDynamicFieldPreviewHtml(fields) {
  if (!fields.length) {
    return '<div class="dynamic-preview-empty">No additional employee fields added.</div>';
  }

  return fields
    .map((field) => `
      <div class="dynamic-preview-item">
        <strong>${escapeHtml(field.label || 'Custom Field')}</strong>
        <span>${escapeHtml(field.value || '-')}</span>
      </div>
    `)
    .join('');
}

function buildDynamicFieldPdfText(fields) {
  if (!fields.length) {
    return 'No additional employee fields added.';
  }

  return fields
    .map((field) => `${field.label || 'Custom Field'}: ${field.value || '-'}`)
    .join('\n');
}

function formatCurrency(value) {
  return `Rs. ${numberValue(value).toFixed(2)}`;
}

function buildEmployeeIdPrefix(companyCode) {
  return String(companyCode || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
}

function getInitials(value, fallback = 'ID') {
  const initials = String(value || '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  return initials || fallback;
}

function formatDisplayDate(value) {
  if (!value) {
    return '-';
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

const POLICY_TEMPLATE_MAP = {
  hr: {
    policyType: 'HR Policy',
    title: 'Human Resources Code of Conduct and Employment Standards Policy',
    codeSuffix: 'HR',
    summary: 'This master HR policy defines employment standards, workplace conduct, grievance handling, document governance, and employee responsibilities for all team members.',
    purpose: 'The purpose of this policy is to establish a professional, fair, compliant, and consistent framework governing employee lifecycle administration, behavioural expectations, confidentiality, workplace dignity, and HR decision-making.',
    scope: 'This policy applies to all permanent, probationary, contractual, trainee, consultant, and temporary personnel engaged with the company, unless a written exception is approved by management.',
    applicability: 'Employees are expected to comply with employment terms, reporting protocols, anti-harassment safeguards, data protection rules, document submission requirements, and official communication standards from joining through exit.',
    policyRules: '1. Every employee must maintain accurate personal, statutory, and bank records with HR.\n2. Professional conduct, anti-harassment norms, confidentiality, and conflict-of-interest reporting are mandatory.\n3. Misuse of company assets, systems, credentials, or client data is prohibited.\n4. All policy deviations must be approved in writing by HR and the business head.\n5. Employees must acknowledge updated policy versions as and when released.',
    workflow: 'HR drafts or revises the policy, departmental heads review operational impact, management approves the final version, HR communicates the release, and employee acknowledgements are recorded in the personnel file.',
    exceptions: 'Any exception requires a documented business rationale, HR recommendation, functional head approval, and final sign-off from management before implementation.',
    disciplinaryAction: 'Non-compliance may result in counselling, written warning, suspension of privileges, formal disciplinary inquiry, or separation action depending on severity and recurrence.'
  },
  attendance: {
    policyType: 'Attendance Policy',
    title: 'Attendance, Punctuality and Working Hours Policy',
    codeSuffix: 'ATT',
    summary: 'This policy governs working hours, shift adherence, biometric or system attendance, late marks, break discipline, and attendance correction controls.',
    purpose: 'The purpose of this policy is to ensure attendance consistency, workforce planning discipline, payroll accuracy, and client-service continuity across all departments.',
    scope: 'This policy covers all employees whose attendance is captured through biometric, mobile, web, roster, shift, or attendance regularization workflows.',
    applicability: 'Employees must record attendance daily, follow assigned shift timings, apply for regularization promptly, and maintain communication with reporting managers for unavoidable delays or absence.',
    policyRules: '1. Employees must mark in-time and out-time on every working day.\n2. Late arrival beyond the grace limit may attract late marks or salary impact as per approved rules.\n3. Attendance corrections must be submitted within two working days.\n4. Unreported absence may be treated as leave without pay.\n5. Repeated punctuality issues may trigger performance or disciplinary review.',
    workflow: 'Attendance is captured through the approved system, exceptions are raised by the employee, validated by the reporting manager, reviewed by HR/payroll, and locked before monthly payroll processing.',
    exceptions: 'Shift flexibility, field assignments, and client-location attendance exceptions must be documented and pre-approved by the reporting manager and HR.',
    disciplinaryAction: 'Habitual late coming, attendance manipulation, proxy marking, or unauthorized absence may lead to warning letters, salary deduction, or disciplinary escalation.'
  },
  leave: {
    policyType: 'Leave Policy',
    title: 'Leave, Holiday and Time-Off Policy',
    codeSuffix: 'LEV',
    summary: 'This policy covers leave categories, accrual logic, approval workflow, carry-forward conditions, blackout periods, and leave without pay controls.',
    purpose: 'The purpose of this policy is to provide structured time-off benefits while maintaining operational continuity, fairness, and manpower planning across the organization.',
    scope: 'This policy applies to all eligible employees and covers casual leave, sick leave, earned leave, optional holidays, unpaid leave, and special leave categories where applicable.',
    applicability: 'Employees must plan leave in advance wherever possible, submit requests through the approved workflow, and ensure work handover for extended absences.',
    policyRules: '1. Leave entitlement is governed by approved leave calendars and eligibility rules.\n2. Sick leave may require medical proof for extended absence.\n3. Leave without prior approval may be treated as unauthorized absence.\n4. Carry-forward and encashment are subject to company rules and local law.\n5. Business-critical or blackout periods may restrict discretionary leave approvals.',
    workflow: 'The employee submits leave, the manager reviews workload and coverage, HR validates balance and policy fit, and the final status is recorded for payroll and attendance sync.',
    exceptions: 'Emergency situations, bereavement, maternity-related cases, or statutory leave exceptions will be handled as per law and approved company benefits.',
    disciplinaryAction: 'False claims, leave abuse, non-disclosure of absence, or manipulation of leave records may attract deduction, warning, or formal disciplinary proceedings.'
  },
  salary: {
    policyType: 'Salary Policy',
    title: 'Compensation, Payroll and Salary Disbursement Policy',
    codeSuffix: 'SAL',
    summary: 'This policy defines compensation structure, payroll cut-off, salary disbursement timelines, reimbursement standards, and statutory deduction governance.',
    purpose: 'The purpose of this policy is to ensure transparent payroll administration, timely disbursement, statutory compliance, and consistent compensation handling across employee categories.',
    scope: 'This policy applies to all employees processed through the company payroll and includes salary components, deductions, incentives, arrears, recoveries, and final settlement principles.',
    applicability: 'Employees must ensure their attendance, bank details, declarations, and reimbursement submissions are accurate and submitted before payroll cut-off.',
    policyRules: '1. Salary is processed based on approved attendance and company payroll timelines.\n2. Statutory deductions such as PF, ESI, PT, TDS, and recoveries will be applied where applicable.\n3. Salary revisions become effective only after written approval.\n4. Incentives, bonus, and reimbursements are governed by separate approval rules.\n5. Unauthorized advances or payroll manipulation are strictly prohibited.',
    workflow: 'Attendance and inputs are frozen by payroll cut-off, payroll is processed by HR/finance, statutory validations are completed, management review is performed where required, and disbursement is released to bank accounts.',
    exceptions: 'Off-cycle payroll, retention adjustments, joining advances, or exceptional reimbursements require written approval from HR, finance, and business leadership.',
    disciplinaryAction: 'Submission of false reimbursement claims, falsified declarations, or payroll fraud may result in recovery, suspension of benefits, or termination.'
  },
  wfh: {
    policyType: 'WFH Policy',
    title: 'Work From Home and Remote Work Governance Policy',
    codeSuffix: 'WFH',
    summary: 'This policy outlines remote work eligibility, output expectations, connectivity norms, data security, availability requirements, and remote asset responsibility.',
    purpose: 'The purpose of this policy is to enable structured remote work while protecting productivity, client commitments, data security, and team collaboration standards.',
    scope: 'This policy applies to approved employees working fully remote, hybrid, or on a temporary work-from-home arrangement sanctioned by management.',
    applicability: 'Employees working remotely must remain reachable during approved work hours, use secure systems, maintain confidentiality, and deliver agreed outputs without service impact.',
    policyRules: '1. Work from home is not an entitlement and requires approval based on business suitability.\n2. Employees must maintain stable internet, proper workspace, and secure access to systems.\n3. Meeting participation, response timelines, and output reporting remain mandatory.\n4. Company devices and data must not be shared with unauthorized persons.\n5. Persistent performance or security concerns may lead to withdrawal of remote work approval.',
    workflow: 'The employee or manager raises a WFH request, the manager validates operational suitability, HR records approval terms, IT confirms access readiness, and periodic review is conducted.',
    exceptions: 'Medical, emergency, travel disruption, or client-approved remote exceptions may be considered case by case with limited-duration approval.',
    disciplinaryAction: 'Non-availability, repeated productivity concerns, unauthorized remote access practices, or data-security violations may lead to WFH cancellation or formal disciplinary action.'
  },
  discipline: {
    policyType: 'Discipline Policy',
    title: 'Workplace Discipline, Misconduct and Corrective Action Policy',
    codeSuffix: 'DIS',
    summary: 'This policy defines unacceptable conduct, investigation standards, corrective action steps, and disciplinary consequences for workplace violations.',
    purpose: 'The purpose of this policy is to maintain a respectful, secure, ethical, and legally compliant workplace by establishing clear standards and consequences for misconduct.',
    scope: 'This policy applies to all employees, contractors, trainees, and representatives acting on behalf of the company at office, client site, online, or during official events.',
    applicability: 'All personnel are expected to follow lawful instructions, maintain professional behaviour, safeguard company interests, and refrain from misconduct, insubordination, abuse, fraud, or harassment.',
    policyRules: '1. Theft, fraud, harassment, violence, data misuse, and serious insubordination are prohibited.\n2. Employees must cooperate with internal investigations and maintain confidentiality.\n3. Retaliation against complainants or witnesses is strictly prohibited.\n4. Progressive discipline may apply for minor misconduct; major misconduct may invite immediate action.\n5. Documentation of incidents and responses will be maintained by HR.',
    workflow: 'A complaint or incident is reported, a preliminary review is conducted, fact-finding or disciplinary inquiry is initiated if needed, management decides action, and closure is documented by HR.',
    exceptions: 'No exception is allowed for unlawful behaviour, harassment, fraud, violence, or deliberate data or financial misconduct.',
    disciplinaryAction: 'Depending on severity, action may include verbal warning, written warning, improvement plan, suspension, recovery, demotion, or termination of employment.'
  }
};

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

function getIdCardSelectedEmployee() {
  return state.employees.find((employee) => Number(employee.id) === Number(idCardEmployeeSelect.value)) || null;
}

function getPoliciesForSelectedCompany() {
  return state.policies.filter((policy) => Number(policy.companyId) === Number(selectedPolicyCompanyId));
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

async function syncEmployeeIdPreview(force = false) {
  const companyId = Number(employeeFields.company.value) || null;

  if (!companyId) {
    employeeFields.employeeId.value = '';
    employeeFields.employeeId.dataset.autoValue = '';
    return;
  }

  const currentValue = employeeFields.employeeId.value.trim();
  const lastAutoValue = employeeFields.employeeId.dataset.autoValue || '';
  const shouldRefresh = force || !currentValue || currentValue === lastAutoValue;

  if (!shouldRefresh) {
    return;
  }

  const nextEmployeeId = await window.api.getNextEmployeeId(companyId, editingEmployeeId);
  employeeFields.employeeId.value = nextEmployeeId || '';
  employeeFields.employeeId.dataset.autoValue = nextEmployeeId || '';
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

function getPolicyTemplateKeyByType(policyType) {
  const normalized = String(policyType || '').toLowerCase();
  if (normalized.includes('attendance')) return 'attendance';
  if (normalized.includes('leave')) return 'leave';
  if (normalized.includes('salary')) return 'salary';
  if (normalized.includes('wfh')) return 'wfh';
  if (normalized.includes('discipline')) return 'discipline';
  return 'hr';
}

function buildPolicyCode(company, templateKey) {
  const prefix = buildEmployeeIdPrefix(company?.code || company?.displayName || 'COMP');
  const suffix = POLICY_TEMPLATE_MAP[templateKey]?.codeSuffix || 'POL';
  return `${prefix}-${suffix}-01`;
}

function buildPolicyPayload() {
  const companyId = Number(policyFields.companyId.value) || null;
  const company = getCompanyById(companyId);
  const templateKey = getPolicyTemplateKeyByType(policyFields.policyType.value);
  return {
    id: editingPolicyId,
    companyId,
    policyType: policyFields.policyType.value,
    policyCode: policyFields.policyCode.value.trim() || buildPolicyCode(company, templateKey),
    title: policyFields.title.value.trim(),
    version: policyFields.version.value.trim() || '1.0',
    effectiveDate: policyFields.effectiveDate.value,
    reviewDate: policyFields.reviewDate.value,
    ownerDepartment: policyFields.ownerDepartment.value.trim() || 'Human Resources',
    approverName: policyFields.approverName.value.trim(),
    status: policyFields.status.value,
    summary: policyFields.summary.value.trim(),
    purpose: policyFields.purpose.value.trim(),
    scope: policyFields.scope.value.trim(),
    applicability: policyFields.applicability.value.trim(),
    policyRules: policyFields.policyRules.value.trim(),
    workflow: policyFields.workflow.value.trim(),
    exceptions: policyFields.exceptions.value.trim(),
    disciplinaryAction: policyFields.disciplinaryAction.value.trim()
  };
}

function resetEmployeeForm() {
  editingEmployeeId = null;
  employeeProfilePhotoData = '';
  employeeCustomFieldsState = [];
  employeeFields.employeeId.dataset.autoValue = '';
  employeeForm.reset();
  employeeFields.empId.value = '';
  employeeFields.employmentType.value = 'Full Time';
  employeeFields.ctc.value = '';
  buildCompanyOptions(employeeFields.company);
  renderAllCustomFields();
  syncEmployeeIdPreview(true);
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

function resetPolicyForm() {
  editingPolicyId = null;
  policyForm.reset();
  policyFields.recordId.value = '';
  buildCompanyOptions(policyFields.companyId);
  if (selectedPolicyCompanyId) {
    policyFields.companyId.value = String(selectedPolicyCompanyId);
  }
  policyFields.policyType.value = 'HR Policy';
  policyFields.version.value = '1.0';
  policyFields.status.value = 'Draft';
  policyFields.ownerDepartment.value = 'Human Resources';
  applyPolicyTemplate('hr');
}

function editEmployee(employee) {
  editingEmployeeId = employee.id;
  employeeProfilePhotoData = employee.profilePhoto || '';
  employeeFields.empId.value = employee.id || '';
  employeeFields.name.value = employee.name || '';
  employeeFields.employeeId.value = employee.employeeId || '';
  employeeFields.employeeId.dataset.autoValue = employee.employeeId || '';
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

function editPolicy(policy) {
  editingPolicyId = policy.id;
  selectedPolicyCompanyId = policy.companyId || selectedPolicyCompanyId;
  policyFields.recordId.value = policy.id || '';
  buildCompanyOptions(policyFields.companyId);
  policyFields.companyId.value = policy.companyId || '';
  policyFields.policyType.value = policy.policyType || 'HR Policy';
  policyFields.policyCode.value = policy.policyCode || '';
  policyFields.title.value = policy.title || '';
  policyFields.version.value = policy.version || '1.0';
  policyFields.effectiveDate.value = policy.effectiveDate || '';
  policyFields.reviewDate.value = policy.reviewDate || '';
  policyFields.ownerDepartment.value = policy.ownerDepartment || 'Human Resources';
  policyFields.approverName.value = policy.approverName || '';
  policyFields.status.value = policy.status || 'Draft';
  policyFields.summary.value = policy.summary || '';
  policyFields.purpose.value = policy.purpose || '';
  policyFields.scope.value = policy.scope || '';
  policyFields.applicability.value = policy.applicability || '';
  policyFields.policyRules.value = policy.policyRules || '';
  policyFields.workflow.value = policy.workflow || '';
  policyFields.exceptions.value = policy.exceptions || '';
  policyFields.disciplinaryAction.value = policy.disciplinaryAction || '';
  updatePolicyPreview();
}

function renderPolicyCompanyList() {
  policyCompanyList.innerHTML = '';

  if (!state.companies.length) {
    policyCompanyList.innerHTML = '<li class="empty-list">No companies available.</li>';
    return;
  }

  state.companies.forEach((company) => {
    const totalPolicies = state.policies.filter((policy) => Number(policy.companyId) === Number(company.id)).length;
    const li = document.createElement('li');
    if (Number(selectedPolicyCompanyId) === Number(company.id)) {
      li.classList.add('selected-policy-company');
    }
    li.innerHTML = `
      <div class="employee-card-copy">
        <strong>${escapeHtml(company.displayName || company.legalName || company.code)}</strong>
        <span>${escapeHtml(company.code || 'No code')} | ${totalPolicies} policies</span>
      </div>
    `;
    li.addEventListener('click', () => {
      selectedPolicyCompanyId = company.id;
      policyFields.companyId.value = String(company.id);
      renderPolicyCompanyList();
      renderPolicyList();
      updatePolicyPreview();
    });
    policyCompanyList.appendChild(li);
  });
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
        <span>${escapeHtml(employee.employeeId || 'ID pending')} | ${escapeHtml(employee.designation || 'Designation not set')}</span>
        <span>${escapeHtml(employee.department || 'Department not set')}</span>
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

function applyPolicyTemplate(templateKey) {
  const template = POLICY_TEMPLATE_MAP[templateKey];
  if (!template) {
    return;
  }

  const company = getCompanyById(Number(policyFields.companyId.value) || null);
  policyFields.policyType.value = template.policyType;
  policyFields.title.value = template.title;
  policyFields.policyCode.value = buildPolicyCode(company, templateKey);
  policyFields.summary.value = template.summary;
  policyFields.purpose.value = template.purpose;
  policyFields.scope.value = template.scope;
  policyFields.applicability.value = template.applicability;
  policyFields.policyRules.value = template.policyRules;
  policyFields.workflow.value = template.workflow;
  policyFields.exceptions.value = template.exceptions;
  policyFields.disciplinaryAction.value = template.disciplinaryAction;
  if (!policyFields.approverName.value.trim()) {
    policyFields.approverName.value = 'Chief Human Resources Officer';
  }
  updatePolicyPreview();
}

function buildPolicyPreviewHtml(policy, company) {
  const companyName = company?.displayName || company?.legalName || 'Selected Company';
  return `
    <div class="policy-preview-header">
      <div>
        <div class="policy-preview-eyebrow">${escapeHtml(policy.policyType || 'Policy')}</div>
        <h3>${escapeHtml(policy.title || 'Policy title will appear here')}</h3>
      </div>
      <div class="policy-preview-badge">${escapeHtml(policy.status || 'Draft')}</div>
    </div>
    <div class="policy-preview-meta">
      <span>${escapeHtml(companyName)}</span>
      <span>${escapeHtml(policy.policyCode || 'CODE')}</span>
      <span>Version ${escapeHtml(policy.version || '1.0')}</span>
    </div>
    <div class="policy-preview-section">
      <strong>Executive Summary</strong>
      <p>${escapeHtml(policy.summary || 'Add a concise executive summary for leadership and employee rollout.')}</p>
    </div>
    <div class="policy-preview-section">
      <strong>Purpose</strong>
      <p>${escapeHtml(policy.purpose || '-')}</p>
    </div>
    <div class="policy-preview-grid">
      <div><strong>Scope</strong><p>${escapeHtml(policy.scope || '-')}</p></div>
      <div><strong>Applicability</strong><p>${escapeHtml(policy.applicability || '-')}</p></div>
    </div>
    <div class="policy-preview-section">
      <strong>Key Rules</strong>
      <p class="preserve-lines">${escapeHtml(policy.policyRules || '-')}</p>
    </div>
    <div class="policy-preview-grid">
      <div><strong>Workflow</strong><p class="preserve-lines">${escapeHtml(policy.workflow || '-')}</p></div>
      <div><strong>Exceptions</strong><p>${escapeHtml(policy.exceptions || '-')}</p></div>
    </div>
    <div class="policy-preview-section">
      <strong>Disciplinary Action</strong>
      <p>${escapeHtml(policy.disciplinaryAction || '-')}</p>
    </div>
  `;
}

function buildPolicyPdfHtml(company, policies) {
  const previewBlocks = policies.map((policy) => `
    <section class="policy-pdf-section">
      ${buildPolicyPreviewHtml(policy, company)}
    </section>
  `).join('');
  const singlePolicyClass = policies.length <= 1 ? 'single-policy-pack' : 'multi-policy-pack';

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Company Policy Pack</title>
        <style>
          * { box-sizing: border-box; }
          @page { size: A4; margin: 8mm; }
          body { margin: 0; font-family: "Segoe UI", Arial, sans-serif; background: #ffffff; color: #0f172a; }
          .policy-pack { width: 100%; }
          .policy-pack-header {
            margin-bottom: 14px;
            padding: 16px 18px;
            border-radius: 18px;
            background: linear-gradient(135deg, #0f172a, #1d4ed8);
            color: #fff;
          }
          .policy-pack-header h1 { margin: 0 0 6px; font-size: 22px; }
          .policy-pack-header p { margin: 0; line-height: 1.4; font-size: 12px; }
          .policy-pdf-section {
            margin-bottom: 12px;
            padding: 14px;
            border-radius: 16px;
            background: #fff;
            border: 1px solid #dbe4f0;
            break-inside: avoid;
          }
          .policy-preview-header, .policy-preview-meta, .policy-preview-grid { display: grid; gap: 8px; }
          .policy-preview-header { grid-template-columns: 1fr auto; align-items: start; }
          .policy-preview-header h3 { margin: 2px 0 0; font-size: 18px; color: #0f172a; }
          .policy-preview-eyebrow, .policy-preview-card strong {
            font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: #9a6f16; font-weight: 800;
          }
          .policy-preview-badge {
            padding: 6px 10px; border-radius: 999px; background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em;
          }
          .policy-preview-meta { grid-template-columns: repeat(3, minmax(0,1fr)); }
          .policy-preview-meta span, .policy-preview-grid > div, .policy-preview-section {
            display: block; padding: 9px 11px; border-radius: 12px; background: #f8fafc; border: 1px solid #e2e8f0;
          }
          .policy-preview-card p, .policy-preview-meta span, .policy-pdf-section p { margin: 0; line-height: 1.4; font-size: 11px; color: #334155; white-space: pre-line; }
          .policy-preview-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
          .single-policy-pack .policy-pack-header { margin-bottom: 10px; }
          .single-policy-pack .policy-pdf-section { margin-bottom: 0; }
        </style>
      </head>
      <body class="${singlePolicyClass}">
        <div class="policy-pack">
          <div class="policy-pack-header">
            <h1>${escapeHtml(company?.displayName || company?.legalName || 'Company Policy Pack')}</h1>
            <p>Policy count: ${policies.length} | Generated from AWSHRFlow policy management workspace.</p>
          </div>
          ${previewBlocks}
        </div>
      </body>
    </html>
  `;
}

function updatePolicyPreview() {
  const company = getCompanyById(Number(policyFields.companyId.value) || null);
  const previewPayload = buildPolicyPayload();
  policyPreview.innerHTML = buildPolicyPreviewHtml(previewPayload, company);
}

function renderPolicyList() {
  policyList.innerHTML = '';
  const filteredPolicies = getPoliciesForSelectedCompany();
  const selectedCompany = getCompanyById(selectedPolicyCompanyId);
  policyCountBadge.textContent = `${filteredPolicies.length} Policies`;
  policySelectedCompanyTitle.textContent = selectedCompany
    ? `${selectedCompany.displayName || selectedCompany.legalName} Policies`
    : 'Policies for selected company';

  if (!filteredPolicies.length) {
    policyList.innerHTML = '<li class="empty-list">No policy records for this company yet.</li>';
    lastPolicyPdfData = selectedCompany
      ? {
          company: selectedCompany,
          policies: [],
          fileName: `${slugify(selectedCompany.displayName || selectedCompany.legalName || 'company')}_policy_pack.pdf`
        }
      : null;
    return;
  }

  filteredPolicies.forEach((policy) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="employee-card-copy">
        <strong>${escapeHtml(policy.title || 'Untitled Policy')}</strong>
        <span>${escapeHtml(policy.policyType || 'Policy')} | ${escapeHtml(policy.status || 'Draft')}</span>
        <span>${escapeHtml(policy.companyName || 'No company linked')} | ${escapeHtml(policy.policyCode || 'No code')}</span>
      </div>
    `;

    const actionWrap = document.createElement('div');
    actionWrap.className = 'list-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editPolicy(policy);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = async () => {
      await window.api.deletePolicy(policy.id);
      if (editingPolicyId === policy.id) {
        resetPolicyForm();
      }
      await refreshAllData();
    };

    actionWrap.appendChild(editBtn);
    actionWrap.appendChild(delBtn);
    li.appendChild(actionWrap);
    policyList.appendChild(li);
  });

  if (selectedCompany) {
    lastPolicyPdfData = {
      company: selectedCompany,
      policies: filteredPolicies,
      fileName: `${slugify(selectedCompany.displayName || selectedCompany.legalName || 'company')}_policy_pack.pdf`
    };
  }
}

function renderEmployeeSelectOptions() {
  employeeSelect.innerHTML = '';
  idCardEmployeeSelect.innerHTML = '';

  if (!state.employees.length) {
    employeeSelect.innerHTML = '<option value="">No employees found</option>';
    idCardEmployeeSelect.innerHTML = '<option value="">No employees found</option>';
    return;
  }

  state.employees.forEach((employee) => {
    const option = document.createElement('option');
    option.value = employee.id;
    option.textContent = `${employee.name} - ${employee.employeeId || 'No ID'}`;
    employeeSelect.appendChild(option);

    const idCardOption = option.cloneNode(true);
    idCardEmployeeSelect.appendChild(idCardOption);
  });

  employeeSelect.value = String(state.employees[0].id);
  idCardEmployeeSelect.value = String(state.employees[0].id);
  syncCompanyDrivenDeductions();
}

async function refreshAllData() {
  const [companies, employees, policies] = await Promise.all([
    window.api.getCompanies(),
    window.api.getEmployees(),
    window.api.getPolicies()
  ]);

  state.companies = companies;
  state.employees = employees;
  state.policies = policies;

  if (selectedPolicyCompanyId && !state.companies.some((company) => Number(company.id) === Number(selectedPolicyCompanyId))) {
    selectedPolicyCompanyId = null;
  }
  if (!selectedPolicyCompanyId && state.companies.length) {
    selectedPolicyCompanyId = state.companies[0].id;
  }

  buildCompanyOptions(employeeFields.company);
  buildCompanyOptions(policyFields.companyId);
  renderCompanyList();
  renderEmployeeList();
  renderPolicyCompanyList();
  renderPolicyList();
  renderEmployeeSelectOptions();
  await syncEmployeeIdPreview(!editingEmployeeId);
  await renderIdCardPreview(true);
  updatePolicyPreview();

  if (hrDocumentsApp) {
    await hrDocumentsApp.refreshData();
  }

  refreshSearchableSelects();
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

function getIdCardTheme(themeKey) {
  const themes = {
    'royal-blue': {
      shellClass: 'theme-royal-blue',
      accent: '#f5d47b',
      accentSoft: '#fde7b0',
      panel: 'linear-gradient(160deg, #102a6b 0%, #09142f 54%, #050914 100%)',
      backPanel: 'linear-gradient(160deg, #0a1738 0%, #0d214f 48%, #08101d 100%)'
    },
    'graphite-gold': {
      shellClass: 'theme-graphite-gold',
      accent: '#f0c86b',
      accentSoft: '#fff0c7',
      panel: 'linear-gradient(160deg, #20242d 0%, #12141a 55%, #07080c 100%)',
      backPanel: 'linear-gradient(160deg, #171a20 0%, #232833 52%, #0b0d11 100%)'
    },
    'emerald-dark': {
      shellClass: 'theme-emerald-dark',
      accent: '#83f0b6',
      accentSoft: '#d6ffe8',
      panel: 'linear-gradient(160deg, #0a503e 0%, #09261f 56%, #05100d 100%)',
      backPanel: 'linear-gradient(160deg, #082f26 0%, #0f5a48 48%, #07130f 100%)'
    }
  };

  return themes[themeKey] || themes['royal-blue'];
}

function buildIdCardMarkup(data, side) {
  const { employee, company, theme, backNote } = data;
  const companyName = company.displayName || company.legalName || 'Company Name';
  const companyAddress = company.address || `${company.city || ''} ${company.state || ''}`.trim() || 'Company address';
  const contactLine = employee.mobileNumber || employee.email || company.phone || '-';
  const emergencyLine = employee.emergencyContact || company.phone || company.email || '-';
  const signatureMarkup = company.signatureData
    ? `<div class="id-card-signature-box"><img src="${company.signatureData}" alt="Authorized Signature"></div>`
    : '<div class="id-card-sign-line"></div>';
  const companyLogoMarkup = company.logoData
    ? `<img src="${company.logoData}" alt="Company Logo">`
    : `<span>${escapeHtml(getInitials(companyName, 'CO'))}</span>`;
  const employeePhotoMarkup = employee.profilePhoto
    ? `<img src="${employee.profilePhoto}" alt="${escapeHtml(employee.name || 'Employee')}">`
    : `<span>${escapeHtml(getInitials(employee.name, 'EMP'))}</span>`;

  if (side === 'front') {
    return `
      <div class="id-card-face ${theme.shellClass}" style="--id-accent:${theme.accent};--id-accent-soft:${theme.accentSoft};--id-panel:${theme.panel};">
        <div class="id-card-front-header">
          <div class="id-card-logo">${companyLogoMarkup}</div>
          <div>
            <div class="id-card-company">${escapeHtml(companyName)}</div>
            <div class="id-card-company-subtitle">Official Employee Identity Card</div>
          </div>
        </div>
        <div class="id-card-front-body">
          <div class="id-card-photo">${employeePhotoMarkup}</div>
          <div class="id-card-front-copy">
            <div class="id-card-label">Employee Name</div>
            <h3>${escapeHtml(employee.name || '-')}</h3>
            <div class="id-card-role">${escapeHtml(employee.designation || 'Team Member')}</div>
            <div class="id-card-meta-grid">
              <div><span>Employee ID</span><strong>${escapeHtml(employee.employeeId || '-')}</strong></div>
              <div><span>Department</span><strong>${escapeHtml(employee.department || '-')}</strong></div>
              <div><span>Joining Date</span><strong>${escapeHtml(formatDisplayDate(employee.doj))}</strong></div>
              <div><span>Location</span><strong>${escapeHtml(employee.location || company.city || '-')}</strong></div>
            </div>
          </div>
        </div>
        <div class="id-card-front-footer">
          <div class="id-card-quick-copy">
            <div class="id-card-contact-chip">${escapeHtml(contactLine)}</div>
            <div class="id-card-contact-chip soft">${escapeHtml(employee.email || 'Email not available')}</div>
            <div class="id-card-address">${escapeHtml(companyAddress)}</div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="id-card-face ${theme.shellClass}" style="--id-accent:${theme.accent};--id-accent-soft:${theme.accentSoft};--id-panel:${theme.backPanel};">
      <div class="id-card-back-strip"></div>
      <div class="id-card-back-body">
        <div class="id-card-back-block">
          <div class="id-card-back-title">Verification Details</div>
          <div class="id-card-back-table">
            <div><span>ID</span><strong>${escapeHtml(employee.employeeId || '-')}</strong></div>
            <div><span>Blood Group</span><strong>${escapeHtml((parseCustomFields(employee.customFields).find((field) => /blood/i.test(field.label)) || {}).value || '-') }</strong></div>
            <div><span>Emergency</span><strong>${escapeHtml(employee.emergencyContact || '-')}</strong></div>
            <div><span>Email</span><strong>${escapeHtml(employee.email || company.email || '-')}</strong></div>
          </div>
        </div>
        <div class="id-card-back-block">
          <div class="id-card-back-title">Company Contact</div>
          <p>${escapeHtml(companyName)}</p>
          <p>${escapeHtml(companyAddress)}</p>
          <p>${escapeHtml(company.phone || '-')}${company.email ? ` | ${escapeHtml(company.email)}` : ''}</p>
        </div>
        <div class="id-card-back-block">
          <div class="id-card-back-title">Instructions</div>
          <p>${escapeHtml(backNote || 'This card is company property. If found, please return it to the HR department immediately.')}</p>
        </div>
      </div>
      <div class="id-card-back-footer">
        <div class="id-card-back-footer-copy">
          <div class="id-card-label">Emergency Contact</div>
          <strong>${escapeHtml(emergencyLine)}</strong>
        </div>
        <div class="id-card-signoff">
          ${signatureMarkup}
          <span>Authorized Signatory</span>
        </div>
      </div>
    </div>
  `;
}

function buildIdCardPdfHtml(data) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ID Card</title>
        <style>
          * { box-sizing: border-box; }
          @page {
            size: A4 landscape;
            margin: 8mm;
          }
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #eef2ff;
            color: #0f172a;
          }
          .sheet {
            padding: 6mm;
            display: grid;
            place-items: center;
          }
          .pdf-card-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8mm;
            align-items: stretch;
          }
          .pdf-card-grid .id-card-face {
            width: 83mm;
            height: 128mm;
          }
          ${buildIdCardPdfCss()}
        </style>
      </head>
      <body>
        <div class="sheet">
          <div class="pdf-card-grid">
            ${buildIdCardMarkup(data, 'front')}
            ${buildIdCardMarkup(data, 'back')}
          </div>
        </div>
      </body>
    </html>
  `;
}

function buildIdCardPdfCss() {
  return `
    .id-card-face {
      position: relative;
      display: flex;
      flex-direction: column;
      border-radius: 8mm;
      overflow: hidden;
      background: var(--id-panel);
      color: #ffffff;
      padding: 4.8mm;
      box-shadow: 0 4mm 9mm rgba(15, 23, 42, 0.18);
    }
    .id-card-face::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at top right, rgba(255,255,255,0.16), transparent 34%),
        linear-gradient(145deg, rgba(255,255,255,0.08), transparent 42%);
      pointer-events: none;
    }
    .id-card-front-header, .id-card-front-body, .id-card-front-footer, .id-card-back-body, .id-card-back-footer {
      position: relative;
      z-index: 1;
    }
    .id-card-front-header {
      display: grid;
      grid-template-columns: 12mm 1fr;
      gap: 2.6mm;
      align-items: center;
      margin-bottom: 3.4mm;
      flex: 0 0 auto;
    }
    .id-card-logo, .id-card-photo {
      display: grid;
      place-items: center;
      overflow: hidden;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.16);
    }
    .id-card-logo {
      width: 12mm;
      height: 12mm;
      border-radius: 3.2mm;
    }
    .id-card-photo {
      width: 24mm;
      height: 28mm;
      border-radius: 5mm;
      margin: 0 auto;
    }
    .id-card-logo img, .id-card-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .id-card-logo span, .id-card-photo span {
      font-weight: 800;
      color: var(--id-accent-soft);
    }
    .id-card-company {
      font-size: 4.8mm;
      font-weight: 800;
      line-height: 1.06;
    }
    .id-card-company-subtitle, .id-card-label, .id-card-meta-grid span, .id-card-back-title, .id-card-signoff span {
      font-size: 2.1mm;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.72);
    }
    .id-card-front-body {
      display: grid;
      gap: 2.8mm;
      margin-bottom: 3mm;
      flex: 1 1 auto;
      min-height: 0;
    }
    .id-card-front-copy h3 {
      margin: 0.8mm 0 1.2mm;
      font-size: 5.1mm;
      line-height: 1.04;
      overflow-wrap: anywhere;
    }
    .id-card-role {
      display: inline-flex;
      padding: 1.5mm 2.4mm;
      border-radius: 999px;
      background: rgba(255,255,255,0.1);
      color: var(--id-accent-soft);
      font-weight: 700;
      font-size: 2.35mm;
      margin-bottom: 2.6mm;
      max-width: 100%;
      overflow-wrap: anywhere;
    }
    .id-card-meta-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 2mm;
    }
    .id-card-meta-grid div, .id-card-back-table div, .id-card-back-block {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 3mm;
      padding: 2.1mm;
    }
    .id-card-meta-grid strong, .id-card-back-table strong {
      display: block;
      margin-top: 0.6mm;
      font-size: 2.7mm;
      line-height: 1.14;
      overflow-wrap: anywhere;
      color: #ffffff;
    }
    .id-card-front-footer, .id-card-back-footer {
      display: flex;
      justify-content: space-between;
      gap: 2.5mm;
      align-items: center;
      flex: 0 0 auto;
    }
    .id-card-quick-copy, .id-card-back-footer-copy {
      display: grid;
      gap: 1.4mm;
      min-width: 0;
      flex: 1 1 auto;
    }
    .id-card-contact-chip {
      display: inline-flex;
      padding: 1.4mm 2.3mm;
      border-radius: 999px;
      background: rgba(255,255,255,0.12);
      font-size: 2.25mm;
      font-weight: 700;
      margin-bottom: 0;
      max-width: 100%;
      overflow-wrap: anywhere;
    }
    .id-card-contact-chip.soft {
      background: rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.82);
    }
    .id-card-address, .id-card-back-block p {
      margin: 0;
      line-height: 1.24;
      font-size: 2.2mm;
      overflow-wrap: anywhere;
      color: rgba(255,255,255,0.84);
    }
    .id-card-back-strip {
      height: 3mm;
      margin: -4.8mm -4.8mm 3.2mm;
      background: linear-gradient(90deg, var(--id-accent), rgba(255,255,255,0.2));
    }
    .id-card-back-body {
      display: grid;
      gap: 2mm;
      margin-bottom: 3.2mm;
      flex: 1 1 auto;
      min-height: 0;
    }
    .id-card-back-table {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.8mm;
      margin-top: 1.8mm;
    }
    .id-card-signoff {
      display: grid;
      align-self: end;
      gap: 1.1mm;
      justify-items: end;
      flex: 0 0 auto;
    }
    .id-card-signature-box {
      width: 24mm;
      height: 8mm;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
    }
    .id-card-signature-box img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 0.6mm 0.8mm rgba(15,23,42,0.16));
    }
    .id-card-sign-line {
      width: 24mm;
      border-bottom: 1px solid rgba(255,255,255,0.56);
    }
  `;
}

async function renderIdCardPreview(silent = false) {
  const employee = getIdCardSelectedEmployee();

  if (!employee) {
    idCardPreviewShell.style.display = 'none';
    idCardPreviewEmpty.style.display = 'block';
    idCardPreviewTitle.textContent = 'Employee ID Card';
    lastIdCardData = null;
    if (!silent) {
      alert('Please select an employee for the ID card.');
    }
    return false;
  }

  const company = getCompanyById(employee.companyId);
  if (!company) {
    idCardPreviewShell.style.display = 'none';
    idCardPreviewEmpty.style.display = 'block';
    idCardPreviewTitle.textContent = 'Employee ID Card';
    lastIdCardData = null;
    if (!silent) {
      alert('Please link the employee to a company profile first.');
    }
    return false;
  }

  const theme = getIdCardTheme(idCardTemplateStyle.value);
  const previewData = {
    employee,
    company,
    theme,
    backNote: idCardBackNote.value.trim()
  };

  idCardFrontPreview.innerHTML = buildIdCardMarkup(previewData, 'front');
  idCardBackPreview.innerHTML = buildIdCardMarkup(previewData, 'back');
  idCardPreviewShell.style.display = 'grid';
  idCardPreviewEmpty.style.display = 'none';
  idCardPreviewTitle.textContent = `${employee.name || 'Employee'} ID Card`;

  lastIdCardData = {
    ...previewData,
    html: buildIdCardPdfHtml(previewData)
  };

  return true;
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

employeeFields.company.addEventListener('change', async () => {
  await syncEmployeeIdPreview(true);
});

employeeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await syncEmployeeIdPreview(true);
  const payload = buildEmployeePayload();

  if (!payload.name || !payload.companyId) {
    alert('Employee name and company are required.');
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

policyForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = buildPolicyPayload();

  if (!payload.companyId || !payload.title || !payload.policyType) {
    alert('Company, policy type, and policy title are required.');
    return;
  }

  if (editingPolicyId) {
    await window.api.updatePolicy(payload);
  } else {
    await window.api.addPolicy(payload);
  }

  resetPolicyForm();
  await refreshAllData();
});

resetEmployeeBtn.addEventListener('click', resetEmployeeForm);
resetCompanyBtn.addEventListener('click', resetCompanyForm);
resetPolicyBtn.addEventListener('click', resetPolicyForm);
addEmployeeFieldBtn.addEventListener('click', () => addCustomField('employee'));
addCompanyFieldBtn.addEventListener('click', () => addCustomField('company'));

document.querySelectorAll('[data-policy-template]').forEach((button) => {
  button.addEventListener('click', () => {
    applyPolicyTemplate(button.dataset.policyTemplate);
  });
});

policyFields.companyId.addEventListener('change', () => {
  selectedPolicyCompanyId = Number(policyFields.companyId.value) || null;
  renderPolicyCompanyList();
  renderPolicyList();
  updatePolicyPreview();
});

[
  policyFields.companyId,
  policyFields.policyType,
  policyFields.policyCode,
  policyFields.title,
  policyFields.version,
  policyFields.effectiveDate,
  policyFields.reviewDate,
  policyFields.ownerDepartment,
  policyFields.approverName,
  policyFields.status,
  policyFields.summary,
  policyFields.purpose,
  policyFields.scope,
  policyFields.applicability,
  policyFields.policyRules,
  policyFields.workflow,
  policyFields.exceptions,
  policyFields.disciplinaryAction
].forEach((field) => {
  field.addEventListener('input', updatePolicyPreview);
  field.addEventListener('change', updatePolicyPreview);
});

downloadPolicyPdfBtn.addEventListener('click', async () => {
  const selectedCompany = getCompanyById(selectedPolicyCompanyId);
  const savedPolicies = getPoliciesForSelectedCompany();

  if (selectedCompany && savedPolicies.length) {
    await window.api.generateHrDocumentPdf({
      html: buildPolicyPdfHtml(selectedCompany, savedPolicies),
      fileName: `${slugify(selectedCompany.displayName || selectedCompany.legalName || 'company')}_policy_pack.pdf`
    });
    return;
  }

  const draftCompany = getCompanyById(Number(policyFields.companyId.value) || null);
  const draftPolicy = buildPolicyPayload();
  if (!draftCompany || !draftPolicy.title) {
    alert('Please select a company and save at least one policy, or complete the current policy draft first.');
    return;
  }

  await window.api.generateHrDocumentPdf({
    html: buildPolicyPdfHtml(draftCompany, [draftPolicy]),
    fileName: `${slugify(draftCompany.displayName || draftCompany.legalName || 'company')}_${slugify(draftPolicy.title || 'policy')}.pdf`
  });
});

['basic', 'hra', 'specialAllowance', 'bonus'].forEach((fieldKey) => {
  employeeFields[fieldKey].addEventListener('input', recalculateEmployeeCtc);
  employeeFields[fieldKey].addEventListener('change', recalculateEmployeeCtc);
});

employeeSelect.addEventListener('change', syncCompanyDrivenDeductions);
pfCheck.addEventListener('change', updateDeductionStatus);
ptCheck.addEventListener('change', updateDeductionStatus);

idCardEmployeeSelect.addEventListener('change', async () => {
  await renderIdCardPreview(true);
});

idCardTemplateStyle.addEventListener('change', async () => {
  await renderIdCardPreview(true);
});

refreshIdCardBtn.addEventListener('click', async () => {
  await renderIdCardPreview();
});

idCardForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await renderIdCardPreview();
});

downloadIdCardPdfBtn.addEventListener('click', async () => {
  if (!lastIdCardData) {
    const built = await renderIdCardPreview(true);
    if (!built) {
      alert('Please build the ID card preview first.');
      return;
    }
  }

  await window.api.generateIdCardPdf({
    html: lastIdCardData.html,
    fileName: `${(lastIdCardData.employee.employeeId || 'EMPLOYEE').replace(/[^A-Z0-9_-]/gi, '_')}_ID_Card.pdf`
  });
});

payslipForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const employee = getSelectedEmployee();
  if (!employee) {
    alert('Please select an employee.');
    return;
  }

  const company = getCompanyById(employee.companyId);
  const employeeDynamicFields = buildCustomFieldsArray(employee.customFields);
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
  payslipPreviewEls.pPrimaryAddress.innerText = employee.address || employee.location || '-';
  payslipPreviewEls.pEmergencyContact.innerText = employee.emergencyContact || '-';
  payslipPreviewEls.pEmployeeDynamicFields.innerHTML = buildDynamicFieldPreviewHtml(employeeDynamicFields);
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
    extraAllowance,
    employeeDynamicFields
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
    extraAllowance,
    employeeDynamicFields
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
      EMPLOYEE_ADDRESS: employee.address || employee.location || '',
      EMERGENCY_CONTACT: employee.emergencyContact || '',
      EMPLOYEE_CUSTOM_FIELDS: buildDynamicFieldPdfText(employeeDynamicFields),
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

let appUnlocked = false;

function setAuthMessage(message, type = '') {
  appAuthMessage.textContent = message;
  appAuthMessage.className = `auth-message${type ? ` ${type}` : ''}`;
}

async function unlockApplication() {
  document.body.classList.remove('auth-locked');
  if (appAuthOverlay) {
    appAuthOverlay.style.display = 'none';
  }
  appUnlocked = true;
  await initializeApp();
}

async function initializeApp() {
  payslipInputs.yearSelect.value = new Date().getFullYear();
  payslipInputs.attendance.value = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  employeeFields.employmentType.value = 'Full Time';
  employeeFields.employeeId.readOnly = true;
  companyFields.country.value = 'India';
  companyFields.paymentMode.value = 'Bank Transfer';
  idCardBackNote.value = 'This card is company property. If found, please return it to the HR department immediately.';
  renderAllCustomFields();
  resetPolicyForm();
  await initHrDocuments();
  await refreshAllData();
}

async function initializeAuthGate() {
  document.body.classList.add('auth-locked');

  const status = await window.api.getAppAuthStatus();
  if (status.initializing) {
    setAuthMessage('Connecting to MongoDB authentication service...');
    const waitForStatus = async () => {
      const nextStatus = await window.api.getAppAuthStatus();
      if (nextStatus.initializing) {
        setTimeout(waitForStatus, 700);
        return;
      }
      if (!nextStatus.ready) {
        setAuthMessage(nextStatus.error || 'MongoDB authentication service is not ready.', 'error');
        return;
      }
      setAuthMessage('Enter password to unlock AWSHRFlow.');
      appPasswordInput.focus();
    };
    setTimeout(waitForStatus, 700);
    return;
  }

  if (!status.ready) {
    setAuthMessage(status.error || 'MongoDB authentication service is not ready.', 'error');
    return;
  }

  setAuthMessage('Enter password to unlock AWSHRFlow.');
  appPasswordInput.focus();
}

appAuthForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (appUnlocked) {
    return;
  }

  const password = appPasswordInput.value;
  if (!password) {
    setAuthMessage('Password is required.', 'error');
    return;
  }

  setAuthMessage('Verifying password...');
  const result = await window.api.verifyAppPassword(password);
  if (!result.success) {
    setAuthMessage(result.message || 'Password verification failed.', 'error');
    appPasswordInput.select();
    return;
  }

  setAuthMessage('Password verified. Opening app...', 'success');
  await unlockApplication();
});

initializeAuthGate();


