(function () {
  const WORKSPACE_MODULES = [
    { id: 'employee-master', index: '01', title: 'Employee Master', linkedPage: 'employee', description: 'Single source of truth for employee identity, company mapping, payroll data, statutory IDs, and dynamic inputs.' },
    { id: 'recruitment', index: '02', title: 'Recruitment / Hiring', linkedPage: 'employee', description: 'Manage candidates, interview flow, and prefill new employee creation from hiring pipeline.' },
    { id: 'onboarding', index: '03', title: 'Onboarding', linkedPage: 'hr', description: 'Track joining checklist, document readiness, policy acceptance, and activation status.' },
    { id: 'attendance', index: '04', title: 'Attendance & Leave', linkedPage: 'payslip', description: 'Maintain present days, leave summary, late marks, and push attendance into payslip preparation.' },
    { id: 'payroll', index: '05', title: 'Payroll', linkedPage: 'payslip', description: 'Review salary structure, deductions, payment setup, and jump straight into payslip generation.' },
    { id: 'compliance', index: '06', title: 'Statutory Compliance', linkedPage: 'company', description: 'Validate PF, ESI, PT, TDS, and company registration readiness from live employee and company data.' },
    { id: 'hr-docs', index: '07', title: 'HR Documents', linkedPage: 'hr', description: 'Open the document workspace with the correct employee context and document flow.' },
    { id: 'appraisal', index: '08', title: 'Performance / Appraisal', linkedPage: 'hr', description: 'Store review cycle, rating, recommendation, and salary revision discussion for the selected employee.' },
    { id: 'exit', index: '09', title: 'Separation / Exit', linkedPage: 'hr', description: 'Track resignation, notice period, clearance, exit timing, and final settlement readiness.' },
    { id: 'reports', index: '10', title: 'Reports + Approvals + Alerts', linkedPage: 'workspace', description: 'See operational HR numbers, pending items, and management-level action summary in one place.' }
  ];

  const workspaceStore = {
    selectedModuleId: 'employee-master',
    selectedEmployeeId: '',
    recruitment: loadData('awshrflow.workspace.recruitment', []),
    onboarding: loadData('awshrflow.workspace.onboarding', {}),
    attendance: loadData('awshrflow.workspace.attendance', {}),
    appraisal: loadData('awshrflow.workspace.appraisal', {}),
    exits: loadData('awshrflow.workspace.exits', {})
  };

  function loadData(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getModuleCards() {
    return Array.from(document.querySelectorAll('#workspacePage .workspace-card'));
  }

  function ensureSelectedEmployee() {
    if (!workspaceStore.selectedEmployeeId && state.employees.length) {
      workspaceStore.selectedEmployeeId = String(state.employees[0].id);
    }
    if (workspaceStore.selectedEmployeeId && !state.employees.some((employee) => String(employee.id) === String(workspaceStore.selectedEmployeeId))) {
      workspaceStore.selectedEmployeeId = state.employees.length ? String(state.employees[0].id) : '';
    }
  }

  function getSelectedEmployee() {
    return state.employees.find((employee) => String(employee.id) === String(workspaceStore.selectedEmployeeId)) || null;
  }

  function getSelectedCompany() {
    const employee = getSelectedEmployee();
    return employee ? getCompanyById(employee.companyId) : null;
  }

  function openPage(page) {
    const btn = Array.from(document.querySelectorAll('.tab-btn')).find((item) => (item.getAttribute('onclick') || '').includes("'" + page + "'"));
    if (btn && typeof showPage === 'function') {
      showPage(page, btn);
    }
  }

  function ensureDetailShell() {
    const grid = document.querySelector('#workspacePage .workspace-grid');
    if (!grid) return null;

    let detailCard = document.getElementById('workspaceDetailCard');
    if (detailCard) return detailCard;

    detailCard = document.createElement('div');
    detailCard.id = 'workspaceDetailCard';
    detailCard.className = 'card workspace-detail-card';
    detailCard.innerHTML = `
      <div class="workspace-detail-top">
        <div>
          <div class="section-kicker" id="workspaceModuleIndex">01</div>
          <h2 id="workspaceModuleTitle">Employee Master</h2>
          <p id="workspaceModuleDescription" class="muted-copy workspace-copy"></p>
        </div>
        <div class="workspace-toolbar">
          <label for="workspaceEmployeeSelect">Employee Focus</label>
          <select id="workspaceEmployeeSelect"></select>
          <button type="button" class="secondary-btn mini-btn" id="workspaceOpenLinkedBtn">Open Linked Screen</button>
        </div>
      </div>
      <div id="workspaceInsightBar" class="workspace-insight-grid"></div>
      <div id="workspaceFeatureDeck" class="workspace-feature-deck"></div>
      <div id="workspaceModuleContent" class="workspace-module-content"></div>
    `;

    grid.appendChild(detailCard);
    return detailCard;
  }
  function getOnboardingRecord(employeeId) {
    return workspaceStore.onboarding[String(employeeId)] || {
      documents: false,
      policy: false,
      payroll: false,
      assets: false,
      induction: false
    };
  }

  function getAttendanceRecord(employeeId) {
    return workspaceStore.attendance[String(employeeId)] || {
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      presentDays: '',
      leaveDays: '',
      lateMarks: '',
      remarks: ''
    };
  }

  function getAppraisalRecord(employeeId) {
    return workspaceStore.appraisal[String(employeeId)] || {
      cycle: '',
      rating: '',
      increment: '',
      summary: ''
    };
  }

  function getExitRecord(employeeId) {
    return workspaceStore.exits[String(employeeId)] || {
      resignationDate: '',
      exitDate: '',
      noticePeriod: '30 days',
      clearanceStatus: 'Pending',
      reason: ''
    };
  }

  function percentage(part, whole) {
    if (!whole) return '0%';
    return `${Math.round((Number(part) / Number(whole)) * 100)}%`;
  }

  function collectWorkspaceMetrics() {
    const totalEmployees = state.employees.length;
    const totalCompanies = state.companies.length;
    const totalCandidates = workspaceStore.recruitment.length;
    const openCandidates = workspaceStore.recruitment.filter((item) => item.status !== 'Joined').length;
    const offerReleased = workspaceStore.recruitment.filter((item) => item.status === 'Offer Released').length;
    const onboardingRecords = Object.values(workspaceStore.onboarding);
    const completedOnboarding = onboardingRecords.filter((record) => Object.values(record).every(Boolean)).length;
    const attendanceRecords = Object.keys(workspaceStore.attendance).length;
    const appraisalRecords = Object.keys(workspaceStore.appraisal).length;
    const exitRecords = Object.values(workspaceStore.exits);
    const pendingExits = exitRecords.filter((item) => item.clearanceStatus !== 'Completed').length;
    const missingPan = state.employees.filter((item) => !item.pan).length;
    const missingBank = state.employees.filter((item) => !item.bankName || !item.accountNumber).length;
    const missingCompanyDocs = state.companies.filter((item) => !item.gstin || !item.pfRegistrationNo || !item.esicRegistrationNo).length;
    const policiesMapped = state.policies.length;

    return {
      totalEmployees,
      totalCompanies,
      totalCandidates,
      openCandidates,
      offerReleased,
      completedOnboarding,
      attendanceRecords,
      appraisalRecords,
      pendingExits,
      missingPan,
      missingBank,
      missingCompanyDocs,
      policiesMapped,
      onboardingCoverage: percentage(completedOnboarding, totalEmployees),
      documentCoverage: percentage(state.employees.filter((item) => item.email && item.mobileNumber && item.designation).length, totalEmployees)
    };
  }

  function renderHeroDashboard() {
    const heroMetaEl = document.getElementById('workspaceHeroMeta');
    const heroStatsEl = document.getElementById('workspaceHeroStats');
    const executionRailEl = document.getElementById('workspaceExecutionRail');
    const metrics = collectWorkspaceMetrics();
    const selectedEmployee = getSelectedEmployee();
    const selectedCompany = getSelectedCompany();

    if (heroMetaEl) {
      heroMetaEl.textContent = `Monitor ${metrics.totalEmployees} employees, ${metrics.totalCompanies} companies, ${metrics.totalCandidates} recruitment items, ${metrics.policiesMapped} policies, and every downstream HR action from one MNC-style live workspace. Current focus: ${selectedEmployee?.name || 'No employee selected'}${selectedCompany ? ` at ${selectedCompany.displayName || selectedCompany.legalName}` : ''}.`;
    }

    if (heroStatsEl) {
      heroStatsEl.innerHTML = `
        <div class="workspace-hero-stat"><span>Total Employees</span><strong>${metrics.totalEmployees}</strong></div>
        <div class="workspace-hero-stat"><span>Recruitment Pipeline</span><strong>${metrics.totalCandidates}</strong></div>
        <div class="workspace-hero-stat"><span>Onboarding Coverage</span><strong>${metrics.onboardingCoverage}</strong></div>
        <div class="workspace-hero-stat"><span>Policy Records</span><strong>${metrics.policiesMapped}</strong></div>
      `;
    }

    if (executionRailEl) {
      executionRailEl.innerHTML = `
        <div class="workspace-rail-card">
          <span>Executive Control</span>
          <strong>${metrics.documentCoverage} profile completeness</strong>
          <p>${metrics.missingPan} PAN gaps, ${metrics.missingBank} payroll readiness gaps, and ${metrics.missingCompanyDocs} company compliance setups still need attention.</p>
        </div>
        <div class="workspace-rail-card">
          <span>Hiring Pressure</span>
          <strong>${metrics.openCandidates} open candidates</strong>
          <p>${metrics.offerReleased} records are ready for conversion into employee onboarding and downstream HR documents.</p>
        </div>
        <div class="workspace-rail-card">
          <span>Operational Risk</span>
          <strong>${metrics.pendingExits} active exit cases</strong>
          <p>${metrics.attendanceRecords} attendance records and ${metrics.appraisalRecords} appraisal records are already feeding the connected workflow.</p>
        </div>
      `;
    }
  }

  function syncModuleCards() {
    const metrics = collectWorkspaceMetrics();
    const dynamicCopy = {
      'employee-master': {
        kicker: `${metrics.totalEmployees} employees`,
        description: `Live employee master with ${metrics.totalCompanies} mapped companies and ${metrics.documentCoverage} profile completeness.`,
        link: `Feeds: Payroll, HR Documents, Compliance, Appraisal, Exit`
      },
      recruitment: {
        kicker: `${metrics.openCandidates} open`,
        description: `${metrics.totalCandidates} total candidates in the pipeline with ${metrics.offerReleased} ready for employee conversion.`,
        link: 'Feeds: Onboarding, HR Documents, Employee Master'
      },
      onboarding: {
        kicker: `${metrics.onboardingCoverage} ready`,
        description: `${metrics.completedOnboarding} employees have full onboarding completion across documents, policy, payroll, assets, and induction.`,
        link: 'Feeds: Employee Master, HR Documents, Asset Tracking'
      },
      attendance: {
        kicker: `${metrics.attendanceRecords} tracked`,
        description: `Attendance and leave control is active for ${metrics.attendanceRecords} employee records and feeds payslip preparation.`,
        link: 'Feeds: Payroll, Reports, Manager Dashboard'
      },
      payroll: {
        kicker: `${metrics.missingBank} gaps`,
        description: `Payroll desk shows bank-readiness gaps and pay-processing dependencies before payslip generation.`,
        link: 'Feeds: Payslip, Compliance, Reports'
      },
      compliance: {
        kicker: `${metrics.missingCompanyDocs} risks`,
        description: `${metrics.missingPan} employee PAN gaps and ${metrics.missingCompanyDocs} company registration gaps need compliance closure.`,
        link: 'Feeds: Payroll, HR Documents, Audit Readiness'
      },
      'hr-docs': {
        kicker: `${metrics.totalEmployees} profiles`,
        description: `Dynamic HR documents can auto-fill from live employee and company masters for all active records.`,
        link: 'Feeds from: Employee, Company, Payroll, Appraisal, Exit'
      },
      appraisal: {
        kicker: `${metrics.appraisalRecords} reviews`,
        description: `${metrics.appraisalRecords} appraisal records are available to drive increment, promotion, and salary actions.`,
        link: 'Feeds: Payroll Revision, Promotion Letter, Reports'
      },
      exit: {
        kicker: `${metrics.pendingExits} active`,
        description: `${metrics.pendingExits} exit workflows still require clearance, document closure, or final settlement progression.`,
        link: 'Feeds: Payroll, HR Documents, Final Settlement'
      },
      reports: {
        kicker: `MNC view`,
        description: `A live management cockpit across headcount, hiring, onboarding, payroll readiness, and policy coverage.`,
        link: 'Feeds from all core HR modules'
      }
    };

    getModuleCards().forEach((card, index) => {
      const module = WORKSPACE_MODULES[index];
      const config = dynamicCopy[module?.id];
      if (!module || !config) return;
      const kicker = card.querySelector('.section-kicker');
      const description = card.querySelector('p');
      const link = card.querySelector('.workspace-link');
      if (kicker) kicker.textContent = config.kicker;
      if (description) description.textContent = config.description;
      if (link) link.textContent = config.link;
    });
  }

  function insightCards(module, employee, company) {
    const customCount = employee ? buildCustomFieldsArray(employee.customFields).length : 0;
    const pendingExits = Object.values(workspaceStore.exits).filter((item) => item.clearanceStatus !== 'Completed').length;
    const metrics = collectWorkspaceMetrics();
    switch (module.id) {
      case 'employee-master':
        return [
          { label: 'Employees', value: state.employees.length, detail: 'Master profiles active in the core HR system.' },
          { label: 'Companies', value: state.companies.length, detail: 'Business entities available for mapping and payroll.' },
          { label: 'Dynamic Inputs', value: customCount, detail: 'Selected employee custom fields ready for downstream automation.' }
        ];
      case 'recruitment':
        return [
          { label: 'Candidates', value: workspaceStore.recruitment.length, detail: 'Total live records under recruitment control.' },
          { label: 'Open', value: workspaceStore.recruitment.filter((item) => item.status !== 'Joined').length, detail: 'Candidates still moving through screening to offer.' },
          { label: 'Ready To Prefill', value: workspaceStore.recruitment.filter((item) => item.status === 'Offer Released').length, detail: 'Offer released profiles that can convert into employee records.' }
        ];
      case 'onboarding': {
        const record = employee ? getOnboardingRecord(employee.id) : null;
        return [
          { label: 'Employee', value: employee ? employee.name : 'None', detail: 'Current onboarding focus owner.' },
          { label: 'Checklist', value: record ? Object.values(record).filter(Boolean).length + '/5' : '0/5', detail: 'Documents, policy, payroll, assets, and induction progress.' },
          { label: 'Coverage', value: metrics.onboardingCoverage, detail: 'Enterprise onboarding completion percentage across all employees.' }
        ];
      }
      case 'attendance':
        return [
          { label: 'Employee', value: employee ? employee.name : 'None', detail: 'Attendance is maintained employee-wise for payroll sync.' },
          { label: 'Payslip Link', value: employee ? 'Ready' : 'Waiting', detail: 'Attendance can flow directly into salary calculation.' },
          { label: 'Manager', value: employee?.reportingManager || '-', detail: 'Operational owner for attendance follow-up.' }
        ];
      case 'payroll':
        return [
          { label: 'Gross Monthly', value: employee ? formatCurrency(numberValue(employee.basic) + numberValue(employee.hra) + numberValue(employee.specialAllowance)) : '-', detail: 'Selected employee monthly fixed gross pay.' },
          { label: 'CTC', value: employee ? formatCurrency(employee.ctc) : '-', detail: 'Current annualized compensation reference.' },
          { label: 'Payment Mode', value: company?.paymentMode || '-', detail: 'Company-level salary disbursement mechanism.' }
        ];
      case 'compliance':
        return [
          { label: 'Employee PAN', value: employee?.pan || 'Missing', detail: 'Tax identity readiness for the selected employee.' },
          { label: 'Company GSTIN', value: company?.gstin || 'Missing', detail: 'Indirect tax registration status for the linked company.' },
          { label: 'PF Registration', value: company?.pfRegistrationNo || 'Missing', detail: 'Statutory payroll registration benchmark.' }
        ];
      case 'hr-docs':
        return [
          { label: 'Employee', value: employee?.name || 'None', detail: 'Current subject for document drafting.' },
          { label: 'Profile', value: employee ? 'Ready' : 'Waiting', detail: 'Employee profile availability for auto-filled letters.' },
          { label: 'Company', value: company ? 'Ready' : 'Waiting', detail: 'Company data, branding, and signatures for templates.' }
        ];
      case 'appraisal':
        return [
          { label: 'Employee', value: employee?.name || 'None', detail: 'Current appraisal subject.' },
          { label: 'Role', value: employee?.designation || '-', detail: 'Present role benchmark for promotion or rating review.' },
          { label: 'Bonus', value: employee ? formatCurrency(employee.bonus) : '-', detail: 'Variable pay context for performance decisions.' }
        ];
      case 'exit':
        return [
          { label: 'Employee', value: employee?.name || 'None', detail: 'Current exit workflow subject.' },
          { label: 'Pending Exits', value: pendingExits, detail: 'Active clearances or separation workflows still open.' },
          { label: 'Notice', value: employee ? 'Trackable' : 'Waiting', detail: 'Notice obligations can be captured for final settlement.' }
        ];
      case 'reports':
        return [
          { label: 'Headcount', value: state.employees.length, detail: 'Active employee base across the live system.' },
          { label: 'Candidates', value: workspaceStore.recruitment.length, detail: 'Recruitment volume feeding the HR pipeline.' },
          { label: 'Pending Exits', value: pendingExits, detail: 'Separation queue still requiring closure.' }
        ];
      default:
        return [];
    }
  }

  function renderInsights(module, employee, company) {
    const bar = document.getElementById('workspaceInsightBar');
    if (!bar) return;
    bar.innerHTML = insightCards(module, employee, company).map(({ label, value, detail }) => `
      <div class="workspace-insight-card">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(String(value))}</strong>
        <small>${escapeHtml(detail || '')}</small>
      </div>
    `).join('');
  }

  function dynamicFieldHtml(employee) {
    const fields = employee ? buildCustomFieldsArray(employee.customFields) : [];
    if (!fields.length) {
      return '<div class="dynamic-preview-empty">No dynamic fields available for the selected employee.</div>';
    }
    return fields.map((field) => `
      <div class="dynamic-preview-item">
        <strong>${escapeHtml(field.label || 'Custom Field')}</strong>
        <span>${escapeHtml(field.value || '-')}</span>
      </div>
    `).join('');
  }

  function featureDeck(module, employee, company) {
    const policyCount = state.policies
      ? state.policies.filter((item) => Number(item.companyId) === Number(company?.id)).length
      : 0;

    const featuresByModule = {
      'employee-master': ['Auto employee ID', 'Company mapping', 'Profile photo', 'Dynamic fields', 'ID card ready', 'Payroll sync'],
      'recruitment': ['Candidate pipeline', 'Offer tracking', 'One-click prefill', 'Joining date capture', 'Stage dashboard', 'Conversion to employee'],
      onboarding: ['Checklist', 'Policy acceptance', 'Asset tracking', 'Document status', 'Activation readiness', 'HR docs jump'],
      attendance: ['Attendance save', 'Leave summary', 'Late marks', 'Remarks tracking', 'Payslip push', 'Month-wise control'],
      payroll: ['Gross snapshot', 'PT/PF defaults', 'Bank readiness', 'Payslip jump', 'CTC visibility', 'Company payment mode'],
      compliance: ['PAN/UAN check', 'GST/PF/ESIC readiness', 'Audit view', 'Company registrations', 'Statutory gaps', 'Compliance desk'],
      'hr-docs': ['20-font support', '5 design themes', 'Live editable copy', 'Brand images', 'Preview + PDF', 'Employee auto-fill'],
      appraisal: ['Review cycle', 'Rating capture', 'Increment proposal', 'Promotion support', 'Salary context', 'Letter trigger'],
      exit: ['Resignation tracker', 'Notice period', 'Clearance flow', 'Exit documents', 'Settlement support', 'Status summary'],
      reports: ['Headcount view', 'Pending alerts', 'Onboarding status', 'Recruitment totals', 'Exit load', 'Policy count ' + policyCount]
    };

    const sharedItems = featuresByModule[module.id] || ['Connected workflow', 'Operational visibility', 'Quick actions'];
    return `
      <div class="workspace-feature-hero">
        <strong>Preview + Action Layer</strong>
        <span>${escapeHtml(employee?.name || 'No employee selected')} | ${escapeHtml(company?.displayName || company?.legalName || 'No company selected')}</span>
      </div>
      ${sharedItems.map((item) => `<div class="workspace-feature-chip">${escapeHtml(item)}</div>`).join('')}
    `;
  }

  function renderFeatureDeck(module, employee, company) {
    const deck = document.getElementById('workspaceFeatureDeck');
    if (!deck) return;
    deck.innerHTML = featureDeck(module, employee, company);
  }

  function renderModuleContent(module, employee, company) {
    const container = document.getElementById('workspaceModuleContent');
    if (!container) return;
    const metrics = collectWorkspaceMetrics();

    if (module.id === 'employee-master') {
      container.innerHTML = employee ? `
        <div class="workspace-stack">
          <div class="workspace-summary-grid">
            <div class="workspace-summary-card"><span>Headcount</span><strong>${metrics.totalEmployees}</strong><p>All employee masters currently driving payroll, documents, and compliance.</p></div>
            <div class="workspace-summary-card"><span>Document Coverage</span><strong>${metrics.documentCoverage}</strong><p>Profiles with core communication data in place for MNC-style workflows.</p></div>
            <div class="workspace-summary-card"><span>Payroll Ready</span><strong>${metrics.totalEmployees - metrics.missingBank}</strong><p>Employees with bank details available for direct payroll operations.</p></div>
          </div>
          <div class="workspace-panel-grid">
            <div class="workspace-info-box">
              <h3>Selected Employee Profile</h3>
              <table class="workspace-table">
                <tr><td>Name</td><td>${escapeHtml(employee.name)}</td></tr>
                <tr><td>Employee ID</td><td>${escapeHtml(employee.employeeId || '-')}</td></tr>
                <tr><td>Designation</td><td>${escapeHtml(employee.designation || '-')}</td></tr>
                <tr><td>Department</td><td>${escapeHtml(employee.department || '-')}</td></tr>
                <tr><td>Company</td><td>${escapeHtml(company?.displayName || company?.legalName || '-')}</td></tr>
                <tr><td>Primary Address</td><td>${escapeHtml(employee.address || employee.location || '-')}</td></tr>
                <tr><td>Reporting Manager</td><td>${escapeHtml(employee.reportingManager || '-')}</td></tr>
                <tr><td>Email / Mobile</td><td>${escapeHtml(employee.email || '-') } | ${escapeHtml(employee.mobileNumber || '-')}</td></tr>
              </table>
            </div>
            <div class="workspace-info-box">
              <h3>Dynamic Employee Inputs</h3>
              <div class="dynamic-preview-list">${dynamicFieldHtml(employee)}</div>
              <div class="workspace-action-row"><button type="button" class="secondary-btn mini-btn" data-open-page="employee">Open Employee Editor</button><button type="button" class="secondary-btn mini-btn" data-open-page="hr">Open HR Docs</button></div>
            </div>
          </div>
        </div>
      ` : '<div class="dynamic-preview-empty">Create an employee first to unlock the master profile view.</div>';
      return;
    }

    if (module.id === 'recruitment') {
      container.innerHTML = `
        <div class="workspace-panel-grid">
          <div class="workspace-info-box">
            <h3>Add Candidate</h3>
            <div class="workspace-form-grid">
              <input id="workspaceCandidateName" placeholder="Candidate Name">
              <input id="workspaceCandidateRole" placeholder="Role / Designation">
              <input id="workspaceCandidateDepartment" placeholder="Department">
              <input id="workspaceCandidateJoining" type="date">
              <select id="workspaceCandidateStatus"><option>Screening</option><option>Interview Scheduled</option><option>Offer Released</option><option>Joined</option></select>
              <button type="button" class="primary-btn" data-workspace-action="save-candidate">Save Candidate</button>
            </div>
          </div>
          <div class="workspace-info-box">
            <h3>Recruitment Pipeline</h3>
            <div class="workspace-list-shell">${workspaceStore.recruitment.length ? workspaceStore.recruitment.map((candidate) => `
              <div class="workspace-list-item">
                <div><strong>${escapeHtml(candidate.name)}</strong><span>${escapeHtml(candidate.role)} | ${escapeHtml(candidate.department)} | ${escapeHtml(candidate.status)}</span></div>
                <div class="workspace-action-row"><button type="button" class="secondary-btn mini-btn" data-workspace-action="prefill-candidate" data-id="${candidate.id}">Prefill Employee</button><button type="button" class="secondary-btn mini-btn" data-workspace-action="delete-candidate" data-id="${candidate.id}">Delete</button></div>
              </div>
            `).join('') : '<div class="dynamic-preview-empty">No candidates added yet.</div>'}</div>
          </div>
        </div>
      `;
      return;
    }
    if (module.id === 'onboarding') {
      const record = employee ? getOnboardingRecord(employee.id) : null;
      container.innerHTML = employee ? `
        <div class="workspace-panel-grid">
          <div class="workspace-info-box">
            <h3>Joining Checklist for ${escapeHtml(employee.name)}</h3>
            <div class="workspace-check-grid">${['documents', 'policy', 'payroll', 'assets', 'induction'].map((key) => `
              <label class="workspace-check-item"><input type="checkbox" data-workspace-action="toggle-onboarding" data-key="${key}" ${record[key] ? 'checked' : ''}><span>${escapeHtml(key.charAt(0).toUpperCase() + key.slice(1))}</span></label>
            `).join('')}</div>
            <div class="workspace-action-row"><button type="button" class="secondary-btn mini-btn" data-open-page="hr">Open Joining Documents</button></div>
          </div>
          <div class="workspace-info-box"><h3>Onboarding Summary</h3><p>Company: ${escapeHtml(company?.displayName || company?.legalName || '-')}</p><p>Reporting Manager: ${escapeHtml(employee.reportingManager || '-')}</p><p>Status: ${Object.values(record).every(Boolean) ? 'Ready To Activate' : 'In Progress'}</p></div>
        </div>
      ` : '<div class="dynamic-preview-empty">Select an employee to manage onboarding.</div>';
      return;
    }

    if (module.id === 'attendance') {
      const record = employee ? getAttendanceRecord(employee.id) : null;
      container.innerHTML = employee ? `
        <div class="workspace-panel-grid">
          <div class="workspace-info-box">
            <h3>Attendance Input</h3>
            <div class="workspace-form-grid">
              <input id="workspaceAttendanceMonth" value="${escapeHtml(record.month)}" placeholder="Month">
              <input id="workspaceAttendanceYear" type="number" value="${escapeHtml(String(record.year))}" placeholder="Year">
              <input id="workspacePresentDays" type="number" value="${escapeHtml(record.presentDays)}" placeholder="Present Days">
              <input id="workspaceLeaveDays" type="number" value="${escapeHtml(record.leaveDays)}" placeholder="Leave Days">
              <input id="workspaceLateMarks" type="number" value="${escapeHtml(record.lateMarks)}" placeholder="Late Marks">
              <input id="workspaceAttendanceRemarks" value="${escapeHtml(record.remarks)}" placeholder="Remarks">
            </div>
            <div class="workspace-action-row"><button type="button" class="primary-btn" data-workspace-action="save-attendance">Save Attendance</button><button type="button" class="secondary-btn mini-btn" data-workspace-action="push-payslip">Apply To Payslip</button></div>
          </div>
          <div class="workspace-info-box"><h3>Attendance Summary</h3><p>Employee: ${escapeHtml(employee.name)}</p><p>Present Days: ${escapeHtml(record.presentDays || '-')}</p><p>Leave Days: ${escapeHtml(record.leaveDays || '-')}</p><p>Late Marks: ${escapeHtml(record.lateMarks || '-')}</p></div>
        </div>
      ` : '<div class="dynamic-preview-empty">Select an employee to work with attendance and leave.</div>';
      return;
    }

    if (module.id === 'payroll') {
      const grossMonthly = employee ? numberValue(employee.basic) + numberValue(employee.hra) + numberValue(employee.specialAllowance) : 0;
      container.innerHTML = employee ? `
        <div class="workspace-panel-grid">
          <div class="workspace-info-box">
            <h3>Payroll Snapshot</h3>
            <table class="workspace-table">
              <tr><td>Gross Monthly</td><td>${formatCurrency(grossMonthly)}</td></tr>
              <tr><td>Bonus</td><td>${formatCurrency(employee.bonus)}</td></tr>
              <tr><td>CTC</td><td>${formatCurrency(employee.ctc)}</td></tr>
              <tr><td>PF Default</td><td>${formatCurrency(company?.defaultPfAmount || 0)}</td></tr>
              <tr><td>PT Default</td><td>${formatCurrency(company?.defaultPtAmount || 0)}</td></tr>
            </table>
            <div class="workspace-action-row"><button type="button" class="primary-btn" data-open-page="payslip">Open Payslip Generator</button></div>
          </div>
          <div class="workspace-info-box"><h3>Payroll Link Status</h3><p>Employee: ${escapeHtml(employee.name)}</p><p>Company Payment Mode: ${escapeHtml(company?.paymentMode || '-')}</p><p>Bank Ready: ${escapeHtml(employee.bankName ? 'Yes' : 'No')}</p></div>
        </div>
      ` : '<div class="dynamic-preview-empty">Select an employee to see payroll details.</div>';
      return;
    }

    if (module.id === 'compliance') {
      container.innerHTML = employee ? `
        <div class="workspace-panel-grid">
          <div class="workspace-info-box"><h3>Employee Statutory Readiness</h3><table class="workspace-table"><tr><td>PAN</td><td>${escapeHtml(employee.pan || 'Missing')}</td></tr><tr><td>Aadhaar</td><td>${escapeHtml(employee.aadhaar || 'Missing')}</td></tr><tr><td>PF No</td><td>${escapeHtml(employee.pfNo || 'Missing')}</td></tr><tr><td>UAN</td><td>${escapeHtml(employee.pfUAN || 'Missing')}</td></tr><tr><td>ESIC</td><td>${escapeHtml(employee.esiNo || 'Missing')}</td></tr></table></div>
          <div class="workspace-info-box"><h3>Company Registrations</h3><table class="workspace-table"><tr><td>GSTIN</td><td>${escapeHtml(company?.gstin || 'Missing')}</td></tr><tr><td>PF Registration</td><td>${escapeHtml(company?.pfRegistrationNo || 'Missing')}</td></tr><tr><td>ESIC Registration</td><td>${escapeHtml(company?.esicRegistrationNo || 'Missing')}</td></tr><tr><td>TAN</td><td>${escapeHtml(company?.tan || 'Missing')}</td></tr></table></div>
        </div>
      ` : '<div class="dynamic-preview-empty">Select an employee to validate compliance readiness.</div>';
      return;
    }

    if (module.id === 'hr-docs') {
      container.innerHTML = employee ? `
        <div class="workspace-panel-grid">
          <div class="workspace-info-box"><h3>Document Trigger Desk</h3><div class="workspace-action-row wrap"><button type="button" class="secondary-btn mini-btn" data-open-page="hr">Offer / Appointment</button><button type="button" class="secondary-btn mini-btn" data-open-page="hr">Increment / Promotion</button><button type="button" class="secondary-btn mini-btn" data-open-page="hr">Exit / Relieving</button></div><p>Employee profile and company profile already linked with HR document templates.</p></div>
          <div class="workspace-info-box"><h3>Selected Employee Context</h3><p>${escapeHtml(employee.name)} | ${escapeHtml(employee.designation || '-')}</p><p>Company: ${escapeHtml(company?.displayName || company?.legalName || '-')}</p><p>Recommended next step: Open HR Documents tab and select this employee.</p></div>
        </div>
      ` : '<div class="dynamic-preview-empty">Select an employee to use document-driven actions.</div>';
      return;
    }
    if (module.id === 'appraisal') {
      const record = employee ? getAppraisalRecord(employee.id) : null;
      container.innerHTML = employee ? `
        <div class="workspace-panel-grid">
          <div class="workspace-info-box">
            <h3>Appraisal Entry</h3>
            <div class="workspace-form-grid">
              <input id="workspaceAppraisalCycle" value="${escapeHtml(record.cycle)}" placeholder="Cycle e.g. FY 2026">
              <input id="workspaceAppraisalRating" type="number" min="1" max="5" value="${escapeHtml(record.rating)}" placeholder="Rating 1-5">
              <input id="workspaceAppraisalIncrement" type="number" value="${escapeHtml(record.increment)}" placeholder="Recommended Increment Amount">
              <input id="workspaceAppraisalSummary" value="${escapeHtml(record.summary)}" placeholder="Performance summary">
            </div>
            <div class="workspace-action-row"><button type="button" class="primary-btn" data-workspace-action="save-appraisal">Save Review</button><button type="button" class="secondary-btn mini-btn" data-open-page="hr">Open Increment Letter</button></div>
          </div>
          <div class="workspace-info-box"><h3>Current Salary Context</h3><p>Employee: ${escapeHtml(employee.name)}</p><p>Current CTC: ${formatCurrency(employee.ctc)}</p><p>Current Bonus: ${formatCurrency(employee.bonus)}</p></div>
        </div>
      ` : '<div class="dynamic-preview-empty">Select an employee to save appraisal data.</div>';
      return;
    }

    if (module.id === 'exit') {
      const record = employee ? getExitRecord(employee.id) : null;
      container.innerHTML = employee ? `
        <div class="workspace-panel-grid">
          <div class="workspace-info-box">
            <h3>Exit Tracker</h3>
            <div class="workspace-form-grid">
              <input id="workspaceResignationDate" type="date" value="${escapeHtml(record.resignationDate)}">
              <input id="workspaceExitDate" type="date" value="${escapeHtml(record.exitDate)}">
              <input id="workspaceNoticePeriod" value="${escapeHtml(record.noticePeriod)}" placeholder="Notice Period">
              <select id="workspaceClearanceStatus">${['Pending', 'In Progress', 'Completed'].map((status) => `<option ${record.clearanceStatus === status ? 'selected' : ''}>${status}</option>`).join('')}</select>
              <input id="workspaceExitReason" value="${escapeHtml(record.reason)}" placeholder="Reason for exit">
            </div>
            <div class="workspace-action-row"><button type="button" class="primary-btn" data-workspace-action="save-exit">Save Exit</button><button type="button" class="secondary-btn mini-btn" data-open-page="hr">Open Exit Documents</button></div>
          </div>
          <div class="workspace-info-box"><h3>Exit Summary</h3><p>Employee: ${escapeHtml(employee.name)}</p><p>Designation: ${escapeHtml(employee.designation || '-')}</p><p>Clearance: ${escapeHtml(record.clearanceStatus)}</p></div>
        </div>
      ` : '<div class="dynamic-preview-empty">Select an employee to manage exit flow.</div>';
      return;
    }

    if (module.id === 'reports') {
      const onboardingDone = Object.values(workspaceStore.onboarding).filter((record) => Object.values(record).every(Boolean)).length;
      const missingPan = state.employees.filter((item) => !item.pan).length;
      const pendingExit = Object.values(workspaceStore.exits).filter((record) => record.clearanceStatus !== 'Completed').length;
      container.innerHTML = `
        <div class="workspace-stack">
          <div class="workspace-summary-grid">
            <div class="workspace-summary-card"><span>Total Employees</span><strong>${state.employees.length}</strong><p>Live headcount currently flowing through the HR system.</p></div>
            <div class="workspace-summary-card"><span>Completed Onboarding</span><strong>${onboardingDone}</strong><p>Employees fully activated across onboarding dependencies.</p></div>
            <div class="workspace-summary-card"><span>Policies Mapped</span><strong>${state.policies.length}</strong><p>Saved policy records available by company.</p></div>
          </div>
          <div class="workspace-dual-grid">
            <div class="workspace-info-box">
              <h3>Core HR Numbers</h3>
              <table class="workspace-table">
                <tr><td>Total Employees</td><td>${state.employees.length}</td></tr>
                <tr><td>Total Companies</td><td>${state.companies.length}</td></tr>
                <tr><td>Recruitment Pipeline</td><td>${workspaceStore.recruitment.length}</td></tr>
                <tr><td>Completed Onboarding</td><td>${onboardingDone}</td></tr>
                <tr><td>Attendance Records</td><td>${Object.keys(workspaceStore.attendance).length}</td></tr>
                <tr><td>Appraisal Records</td><td>${Object.keys(workspaceStore.appraisal).length}</td></tr>
              </table>
            </div>
            <div class="workspace-info-box">
              <h3>Management Exceptions</h3>
              <div class="workspace-alert-grid">
                <div class="workspace-alert-card"><span>Employees Missing PAN</span><strong>${missingPan}</strong><p>Statutory tax identity follow-up is still pending.</p></div>
                <div class="workspace-alert-card"><span>Pending Exits</span><strong>${pendingExit}</strong><p>Exit workflows requiring clearance or final settlement progression.</p></div>
                <div class="workspace-alert-card"><span>Bank Gaps</span><strong>${metrics.missingBank}</strong><p>Employees without complete bank data cannot be pushed cleanly into payroll.</p></div>
                <div class="workspace-alert-card"><span>Company Compliance Gaps</span><strong>${metrics.missingCompanyDocs}</strong><p>Registrations missing across GST, PF, or ESIC setup.</p></div>
              </div>
            </div>
          </div>
          <div class="workspace-timeline-grid">
            <div class="workspace-timeline-card"><span>Hiring To Join</span><strong>${metrics.offerReleased} ready to convert</strong><p>Offer released candidates can be turned into employee profiles and onboarding flows.</p></div>
            <div class="workspace-timeline-card"><span>Attendance To Payslip</span><strong>${metrics.attendanceRecords} synced records</strong><p>Attendance inputs are available for downstream salary processing and document reference.</p></div>
            <div class="workspace-timeline-card"><span>Appraisal To Letter</span><strong>${metrics.appraisalRecords} active reviews</strong><p>Salary revision and role-change letters can be triggered from current appraisal context.</p></div>
          </div>
        </div>
      `;
      return;
    }
  }

  function renderWorkspaceHub() {
    ensureSelectedEmployee();
    const module = WORKSPACE_MODULES.find((item) => item.id === workspaceStore.selectedModuleId) || WORKSPACE_MODULES[0];
    const employee = getSelectedEmployee();
    const company = getSelectedCompany();
    syncModuleCards();
    renderHeroDashboard();

    getModuleCards().forEach((card, index) => {
      const currentModule = WORKSPACE_MODULES[index];
      card.dataset.moduleId = currentModule.id;
      card.classList.toggle('selected', currentModule.id === module.id);
    });

    const titleEl = document.getElementById('workspaceModuleTitle');
    const indexEl = document.getElementById('workspaceModuleIndex');
    const descEl = document.getElementById('workspaceModuleDescription');
    const employeeSelectEl = document.getElementById('workspaceEmployeeSelect');

    if (titleEl) titleEl.textContent = module.title;
    if (indexEl) indexEl.textContent = module.index;
    if (descEl) descEl.textContent = module.description;
    if (employeeSelectEl) {
      employeeSelectEl.innerHTML = state.employees.length
        ? state.employees.map((item) => `<option value="${item.id}" ${String(item.id) === String(workspaceStore.selectedEmployeeId) ? 'selected' : ''}>${escapeHtml(item.name)} - ${escapeHtml(item.designation || 'No role')}</option>`).join('')
        : '<option value="">No employees available</option>';
    }

    renderInsights(module, employee, company);
    renderFeatureDeck(module, employee, company);
    renderModuleContent(module, employee, company);
  }

  function handleClick(event) {
    const actionButton = event.target.closest('[data-workspace-action]');
    const pageButton = event.target.closest('[data-open-page]');

    if (pageButton) {
      openPage(pageButton.dataset.openPage);
      return;
    }

    if (!actionButton) return;
    const employee = getSelectedEmployee();
    const action = actionButton.dataset.workspaceAction;

    if (action === 'save-candidate') {
      const candidate = {
        id: Date.now().toString(),
        name: document.getElementById('workspaceCandidateName')?.value.trim() || '',
        role: document.getElementById('workspaceCandidateRole')?.value.trim() || '',
        department: document.getElementById('workspaceCandidateDepartment')?.value.trim() || '',
        expectedJoining: document.getElementById('workspaceCandidateJoining')?.value || '',
        status: document.getElementById('workspaceCandidateStatus')?.value || 'Screening'
      };
      if (!candidate.name || !candidate.role) {
        alert('Candidate name and role are required.');
        return;
      }
      workspaceStore.recruitment.unshift(candidate);
      saveData('awshrflow.workspace.recruitment', workspaceStore.recruitment);
      renderWorkspaceHub();
      return;
    }

    if (action === 'delete-candidate') {
      workspaceStore.recruitment = workspaceStore.recruitment.filter((item) => item.id !== actionButton.dataset.id);
      saveData('awshrflow.workspace.recruitment', workspaceStore.recruitment);
      renderWorkspaceHub();
      return;
    }

    if (action === 'prefill-candidate') {
      const candidate = workspaceStore.recruitment.find((item) => item.id === actionButton.dataset.id);
      if (!candidate) return;
      employeeFields.name.value = candidate.name || '';
      employeeFields.designation.value = candidate.role || '';
      employeeFields.department.value = candidate.department || '';
      employeeFields.doj.value = candidate.expectedJoining || '';
      openPage('employee');
      return;
    }
    if (!employee) {
      alert('Please select an employee first.');
      return;
    }

    if (action === 'save-attendance') {
      workspaceStore.attendance[String(employee.id)] = {
        month: document.getElementById('workspaceAttendanceMonth')?.value || '',
        year: document.getElementById('workspaceAttendanceYear')?.value || '',
        presentDays: document.getElementById('workspacePresentDays')?.value || '',
        leaveDays: document.getElementById('workspaceLeaveDays')?.value || '',
        lateMarks: document.getElementById('workspaceLateMarks')?.value || '',
        remarks: document.getElementById('workspaceAttendanceRemarks')?.value || ''
      };
      saveData('awshrflow.workspace.attendance', workspaceStore.attendance);
      renderWorkspaceHub();
      return;
    }

    if (action === 'push-payslip') {
      const attendanceRecord = getAttendanceRecord(employee.id);
      payslipInputs.attendance.value = attendanceRecord.presentDays || payslipInputs.attendance.value;
      openPage('payslip');
      return;
    }

    if (action === 'save-appraisal') {
      workspaceStore.appraisal[String(employee.id)] = {
        cycle: document.getElementById('workspaceAppraisalCycle')?.value || '',
        rating: document.getElementById('workspaceAppraisalRating')?.value || '',
        increment: document.getElementById('workspaceAppraisalIncrement')?.value || '',
        summary: document.getElementById('workspaceAppraisalSummary')?.value || ''
      };
      saveData('awshrflow.workspace.appraisal', workspaceStore.appraisal);
      renderWorkspaceHub();
      return;
    }

    if (action === 'save-exit') {
      workspaceStore.exits[String(employee.id)] = {
        resignationDate: document.getElementById('workspaceResignationDate')?.value || '',
        exitDate: document.getElementById('workspaceExitDate')?.value || '',
        noticePeriod: document.getElementById('workspaceNoticePeriod')?.value || '',
        clearanceStatus: document.getElementById('workspaceClearanceStatus')?.value || 'Pending',
        reason: document.getElementById('workspaceExitReason')?.value || ''
      };
      saveData('awshrflow.workspace.exits', workspaceStore.exits);
      renderWorkspaceHub();
    }
  }

  function handleChange(event) {
    const employee = getSelectedEmployee();
    const toggle = event.target.closest('[data-workspace-action="toggle-onboarding"]');
    if (!toggle || !employee) return;

    const record = getOnboardingRecord(employee.id);
    record[toggle.dataset.key] = toggle.checked;
    workspaceStore.onboarding[String(employee.id)] = record;
    saveData('awshrflow.workspace.onboarding', workspaceStore.onboarding);
    renderWorkspaceHub();
  }

  function init() {
    const detailCard = ensureDetailShell();
    if (!detailCard) return;

    getModuleCards().forEach((card, index) => {
      const module = WORKSPACE_MODULES[index];
      if (!module) return;
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        workspaceStore.selectedModuleId = module.id;
        renderWorkspaceHub();
      });
    });

    detailCard.addEventListener('click', handleClick);
    detailCard.addEventListener('change', handleChange);

    const employeeSelectEl = document.getElementById('workspaceEmployeeSelect');
    if (employeeSelectEl) {
      employeeSelectEl.addEventListener('change', () => {
        workspaceStore.selectedEmployeeId = employeeSelectEl.value;
        renderWorkspaceHub();
      });
    }

    const linkedBtn = document.getElementById('workspaceOpenLinkedBtn');
    if (linkedBtn) {
      linkedBtn.addEventListener('click', () => {
        const module = WORKSPACE_MODULES.find((item) => item.id === workspaceStore.selectedModuleId) || WORKSPACE_MODULES[0];
        openPage(module.linkedPage);
      });
    }

    if (typeof refreshAllData === 'function') {
      const originalRefreshAllData = refreshAllData;
      refreshAllData = async function () {
        const result = await originalRefreshAllData.apply(this, arguments);
        renderWorkspaceHub();
        return result;
      };
    }

    renderWorkspaceHub();
  }

  init();
})();
