(function () {
  const HR_THEMES = [
    {
      id: 'executive',
      name: 'Executive Horizon',
      tone: 'Deep navy paneling with a formal boardroom look.',
      accent: '#1d4ed8',
      surface: '#eff6ff',
      ink: '#10213f'
    },
    {
      id: 'heritage',
      name: 'Heritage Gold',
      tone: 'Warm ivory paper with premium gold framing.',
      accent: '#b8891f',
      surface: '#fff9ec',
      ink: '#3f2c00'
    },
    {
      id: 'slate',
      name: 'Slate Authority',
      tone: 'Graphite lines and confident legal-document structure.',
      accent: '#334155',
      surface: '#f8fafc',
      ink: '#0f172a'
    },
    {
      id: 'emerald',
      name: 'Emerald Signature',
      tone: 'Contemporary green corporate stationery.',
      accent: '#0f766e',
      surface: '#f0fdfa',
      ink: '#0f2f2d'
    },
    {
      id: 'crimson',
      name: 'Crimson Counsel',
      tone: 'Formal maroon legal styling with bold subject treatment.',
      accent: '#9f1239',
      surface: '#fff7f8',
      ink: '#3f0d18'
    }
  ];

  const TOP_FONT_FAMILIES = [
    { value: 'Georgia, "Times New Roman", serif', label: 'Georgia' },
    { value: '"Times New Roman", Times, serif', label: 'Times New Roman' },
    { value: '"Garamond", serif', label: 'Garamond' },
    { value: '"Palatino Linotype", "Book Antiqua", Palatino, serif', label: 'Palatino' },
    { value: '"Baskerville", "Times New Roman", serif', label: 'Baskerville' },
    { value: '"Cambria", serif', label: 'Cambria' },
    { value: '"Didot", serif', label: 'Didot' },
    { value: '"Bodoni MT", serif', label: 'Bodoni MT' },
    { value: 'Arial, Helvetica, sans-serif', label: 'Arial' },
    { value: 'Helvetica, Arial, sans-serif', label: 'Helvetica' },
    { value: '"Trebuchet MS", sans-serif', label: 'Trebuchet MS' },
    { value: 'Verdana, Geneva, sans-serif', label: 'Verdana' },
    { value: '"Segoe UI", Tahoma, sans-serif', label: 'Segoe UI' },
    { value: '"Tahoma", Geneva, sans-serif', label: 'Tahoma' },
    { value: '"Gill Sans", "Gill Sans MT", sans-serif', label: 'Gill Sans' },
    { value: '"Century Gothic", sans-serif', label: 'Century Gothic' },
    { value: '"Franklin Gothic Medium", Arial, sans-serif', label: 'Franklin Gothic' },
    { value: '"Bookman Old Style", serif', label: 'Bookman Old Style' },
    { value: '"Lucida Sans", "Lucida Sans Unicode", sans-serif', label: 'Lucida Sans' },
    { value: '"Courier New", Courier, monospace', label: 'Courier New' }
  ];

  const FIELD_LIBRARY = {
    documentDate: { label: 'Document Date', type: 'date', group: 'Document' },
    effectiveDate: { label: 'Effective Date', type: 'date', group: 'Document' },
    employeeName: { label: 'Employee Name', type: 'text', group: 'Employee' },
    employeeId: { label: 'Employee ID', type: 'text', group: 'Employee' },
    profilePhoto: { label: 'Profile Photo', type: 'file', accept: 'image/*', group: 'Employee' },
    mobileNumber: { label: 'Mobile Number', type: 'text', group: 'Employee' },
    email: { label: 'Email', type: 'email', group: 'Employee' },
    address: { label: 'Address', type: 'textarea', group: 'Employee' },
    department: { label: 'Department', type: 'text', group: 'Job' },
    designation: { label: 'Current Designation', type: 'text', group: 'Job' },
    joiningDate: { label: 'Joining Date', type: 'date', group: 'Job' },
    confirmationDate: { label: 'Confirmation Date', type: 'date', group: 'Job' },
    workLocation: { label: 'Work Location', type: 'text', group: 'Job' },
    employmentType: { label: 'Employment Type', type: 'text', group: 'Job' },
    reportingManager: { label: 'Reporting Manager', type: 'text', group: 'Job' },
    salary: { label: 'Current Salary', type: 'number', group: 'Compensation' },
    bonus: { label: 'Bonus / Variable Pay', type: 'number', group: 'Compensation' },
    incrementAmount: { label: 'Increment Amount', type: 'number', group: 'Compensation' },
    revisedSalary: { label: 'Revised Salary', type: 'number', group: 'Compensation' },
    companyName: { label: 'Company Name', type: 'text', group: 'Company' },
    companyAddress: { label: 'Company Address', type: 'textarea', group: 'Company' },
    companyWebsite: { label: 'Company Website', type: 'text', group: 'Company' },
    companyEmail: { label: 'Company Email', type: 'email', group: 'Company' },
    companyPhone: { label: 'Company Phone', type: 'text', group: 'Company' },
    companyGstin: { label: 'Company GSTIN', type: 'text', group: 'Company' },
    companyPfRegistration: { label: 'Company PF Registration', type: 'text', group: 'Company' },
    companyEsicRegistration: { label: 'Company ESIC Registration', type: 'text', group: 'Company' },
    companyLogo: { label: 'Company Logo', type: 'file', accept: 'image/*', group: 'Company' },
    companyStamp: { label: 'Company Stamp', type: 'file', accept: 'image/*', group: 'Company' },
    companyPolicy: { label: 'Company Policy / Terms', type: 'textarea', group: 'Company' },
    salaryStructureNote: { label: 'Salary Structure Note', type: 'textarea', group: 'Compensation' },
    hrName: { label: 'HR Name', type: 'text', group: 'Approvals' },
    managerName: { label: 'Manager Name', type: 'text', group: 'Approvals' },
    directorName: { label: 'Director Name', type: 'text', group: 'Approvals' },
    signatureName: { label: 'Signature Name', type: 'text', group: 'Approvals' },
    hrSignature: { label: 'HR Signature', type: 'file', accept: 'image/*', group: 'Approvals' },
    directorSignature: { label: 'Director Signature', type: 'file', accept: 'image/*', group: 'Approvals' },
    warningReason: { label: 'Warning Reason', type: 'textarea', group: 'Document' },
    appreciationReason: { label: 'Appreciation Details', type: 'textarea', group: 'Document' },
    performancePeriod: { label: 'Performance Period', type: 'text', group: 'Document' },
    promotionDetails: { label: 'Promotion Details', type: 'textarea', group: 'Document' },
    newDesignation: { label: 'New Designation', type: 'text', group: 'Job' },
    newDepartment: { label: 'New Department', type: 'text', group: 'Job' },
    transferLocation: { label: 'Transfer Location', type: 'text', group: 'Document' },
    noticePeriod: { label: 'Notice Period', type: 'text', group: 'Document' },
    exitDate: { label: 'Exit Date', type: 'date', group: 'Document' },
    relievingDate: { label: 'Relieving Date', type: 'date', group: 'Document' },
    resignationDate: { label: 'Resignation Date', type: 'date', group: 'Document' },
    acceptanceDate: { label: 'Acceptance Date', type: 'date', group: 'Document' },
    experienceDuration: { label: 'Experience Duration', type: 'text', group: 'Document' },
    fAndFAmount: { label: 'F&F Amount', type: 'number', group: 'Settlement' },
    settlementDate: { label: 'Settlement Date', type: 'date', group: 'Settlement' },
    duesSummary: { label: 'Dues Summary', type: 'textarea', group: 'Settlement' },
    assetChecklist: { label: 'Assets / Clearances', type: 'textarea', group: 'Settlement' },
    remarks: { label: 'Additional Remarks', type: 'textarea', group: 'Document' },
    pan: { label: 'PAN', type: 'text', group: 'Employee' },
    aadhaar: { label: 'Aadhaar', type: 'text', group: 'Employee' },
    pfNumber: { label: 'PF Number', type: 'text', group: 'Employee' },
    esicNumber: { label: 'ESIC Number', type: 'text', group: 'Employee' },
    bankName: { label: 'Bank Name', type: 'text', group: 'Employee' },
    accountNumber: { label: 'Account Number', type: 'text', group: 'Employee' },
    templateSubject: { label: 'Template Subject', type: 'textarea', group: 'Template Copy' },
    templateSalutation: { label: 'Template Salutation', type: 'textarea', group: 'Template Copy' },
    templateParagraph1: { label: 'Template Paragraph 1', type: 'textarea', group: 'Template Copy' },
    templateParagraph2: { label: 'Template Paragraph 2', type: 'textarea', group: 'Template Copy' },
    templateParagraph3: { label: 'Template Paragraph 3', type: 'textarea', group: 'Template Copy' },
    templateBullets: { label: 'Template Bullet Points', type: 'textarea', group: 'Template Copy' },
    templateClosing: { label: 'Template Closing', type: 'textarea', group: 'Template Copy' },
    fontFamily: { label: 'Font Family', type: 'select', options: TOP_FONT_FAMILIES, group: 'Template Copy' }
  };

  const DOCUMENT_DEFINITIONS = [
    {
      id: 'offer-letter',
      name: 'Offer Letter',
      short: 'Employment offer with compensation and joining terms.',
      fields: ['documentDate', 'employeeName', 'employeeId', 'profilePhoto', 'designation', 'department', 'joiningDate', 'salary', 'bonus', 'employmentType', 'workLocation', 'reportingManager', 'companyName', 'companyAddress', 'companyPhone', 'companyEmail', 'companyLogo', 'hrName', 'directorName', 'directorSignature', 'companyStamp', 'noticePeriod', 'companyPolicy', 'salaryStructureNote', 'remarks'],
      build: (d, helpers) => ({
        subject: `Offer of Employment for the position of ${safeText(d.designation, 'the proposed role')}`,
        salutation: `Dear ${safeText(d.employeeName, 'Candidate')},`,
        paragraphs: [
          `We are pleased to offer you employment with ${safeText(d.companyName, 'the Company')} as ${safeText(d.designation, 'Employee')} in the ${safeText(d.department, 'assigned')} department. Your appointment is proposed to commence on ${helpers.date(d.joiningDate)} at our ${safeText(d.workLocation || d.companyAddress, 'designated office')} location, subject to completion of onboarding formalities and verification of credentials.`,
          `Your fixed gross monthly salary will be Rs. ${helpers.money(d.salary)}. In addition, an annual variable / bonus component of Rs. ${helpers.money(d.bonus)} may be payable subject to company policy, performance evaluation, payout approval, and applicable statutory deductions. You will report functionally to ${safeText(d.reportingManager || d.managerName || 'your reporting manager')}.`,
          safeText(d.companyPolicy, `This offer remains valid subject to your written acceptance and successful submission of all statutory, identity, banking, and employment documents required by the HR department. A notice period of ${safeText(d.noticePeriod, 'thirty days')} or salary in lieu thereof will apply after confirmation. Your employment will be governed by attendance policy, leave rules, confidentiality, code of conduct, information security standards, conflict of interest rules, and all internal management policies issued from time to time.`)
        ],
        tableTitle: 'Compensation Structure',
        tableRows: [
          ['Fixed Gross Monthly Salary', `Rs. ${helpers.money(d.salary)}`],
          ['Annual Fixed Compensation', `Rs. ${helpers.money(numericValue(d.salary) * 12)}`],
          ['Annual Variable / Bonus', `Rs. ${helpers.money(d.bonus)}`],
          ['Estimated Total CTC', `Rs. ${helpers.money((numericValue(d.salary) * 12) + numericValue(d.bonus))}`],
          ['Salary Structure Note', safeText(d.salaryStructureNote, 'Monthly salary is fixed gross pay. Bonus is a separate annual / performance-linked component and is not automatically added to monthly salary unless specifically mentioned in payroll payout.')]
        ],
        bullets: [
          'This offer is contingent upon background verification and document validation.',
          'Any material misrepresentation may lead to withdrawal of this offer without further liability.',
          'Compensation will be governed by applicable payroll, tax, and statutory deduction rules.'
        ],
        closing: `Kindly sign and return a copy of this letter as token of your acceptance. We look forward to welcoming you to ${safeText(d.companyName, 'the Company')}.`,
        signatureMode: 'director'
      })
    },
    {
      id: 'appointment-letter',
      name: 'Appointment Letter',
      short: 'Formal appointment after offer acceptance.',
      fields: ['documentDate', 'employeeName', 'employeeId', 'profilePhoto', 'designation', 'department', 'joiningDate', 'salary', 'bonus', 'employmentType', 'workLocation', 'reportingManager', 'companyName', 'companyAddress', 'companyPhone', 'companyEmail', 'companyLogo', 'hrName', 'directorName', 'directorSignature', 'companyStamp', 'noticePeriod', 'companyPolicy', 'salaryStructureNote', 'remarks'],
      build: (d, helpers) => ({
        subject: `Appointment Letter - ${safeText(d.designation, 'Employee Position')}`,
        salutation: `Dear ${safeText(d.employeeName, 'Employee')},`,
        paragraphs: [
          `With reference to your acceptance of our offer, we hereby appoint you as ${safeText(d.designation, 'Employee')} with ${safeText(d.companyName, 'the Company')} effective from ${helpers.date(d.joiningDate)}. You shall be posted in the ${safeText(d.department, 'assigned')} department at ${safeText(d.workLocation || d.companyAddress, 'the designated office')}.`,
          `Your fixed gross monthly compensation will be Rs. ${helpers.money(d.salary)} and the annual variable / bonus component, where applicable, will be Rs. ${helpers.money(d.bonus)} subject to company policy, performance, and approval. You shall be governed by the service rules, attendance standards, confidentiality expectations, information-security practices, and all lawful instructions issued by management from time to time.`,
          safeText(d.companyPolicy, `During the course of your employment, you will be expected to maintain the highest standards of integrity, professional conduct, and performance. Either side may terminate employment by serving ${safeText(d.noticePeriod, 'thirty days')} written notice or salary in lieu, subject to policy and legal requirements.`)
        ],
        tableTitle: 'Appointment Compensation Snapshot',
        tableRows: [
          ['Fixed Gross Monthly Salary', `Rs. ${helpers.money(d.salary)}`],
          ['Annual Fixed Compensation', `Rs. ${helpers.money(numericValue(d.salary) * 12)}`],
          ['Annual Variable / Bonus', `Rs. ${helpers.money(d.bonus)}`],
          ['Estimated Total CTC', `Rs. ${helpers.money((numericValue(d.salary) * 12) + numericValue(d.bonus))}`],
          ['Salary Structure Note', safeText(d.salaryStructureNote, 'Bonus is treated as a variable component and may not form part of monthly fixed salary unless separately approved.')]
        ],
        bullets: [
          'This appointment is personal to you and cannot be assigned or delegated.',
          'You are required to protect confidential data, trade practices, and client information at all times.',
          'You shall comply with statutory declarations and payroll documentation as requested by HR.'
        ],
        closing: 'Please sign the duplicate copy of this appointment letter in acknowledgment of the terms and conditions stated herein.',
        signatureMode: 'director'
      })
    },
    {
      id: 'joining-letter',
      name: 'Joining Letter',
      short: 'Employee joining confirmation and onboarding declaration.',
      fields: ['documentDate', 'employeeName', 'employeeId', 'designation', 'department', 'joiningDate', 'workLocation', 'companyName', 'companyAddress', 'companyLogo', 'hrName', 'managerName', 'remarks', 'address', 'mobileNumber', 'email'],
      build: (d, helpers) => ({
        subject: `Joining Confirmation - ${safeText(d.employeeName, 'Employee')}`,
        salutation: 'To Whom It May Concern,',
        paragraphs: [
          `This is to confirm that Mr./Ms. ${safeText(d.employeeName, 'Employee')} has formally joined ${safeText(d.companyName, 'the Company')} on ${helpers.date(d.joiningDate)} as ${safeText(d.designation, 'Employee')} in the ${safeText(d.department, 'assigned')} department.`,
          `At the time of joining, the employee has submitted the available identity, banking, and employment records required for onboarding and has been briefed on the Company's code of conduct, attendance discipline, reporting hierarchy, and workplace policies.`,
          `The employee will perform duties from ${safeText(d.workLocation || d.companyAddress, 'the designated office')} and will remain accountable to the departmental reporting structure communicated by management.`
        ],
        bullets: [
          `Employee contact number: ${safeText(d.mobileNumber, 'Not provided')}`,
          `Employee email address: ${safeText(d.email, 'Not provided')}`,
          `Residential address on record: ${safeText(d.address, 'Not provided')}`
        ],
        closing: 'This letter is issued for internal record and further administrative processing.',
        signatureMode: 'hr'
      })
    },
    {
      id: 'increment-letter',
      name: 'Increment Letter',
      short: 'Salary revision communication based on review.',
      fields: ['documentDate', 'effectiveDate', 'employeeName', 'employeeId', 'designation', 'department', 'salary', 'incrementAmount', 'revisedSalary', 'performancePeriod', 'companyName', 'companyAddress', 'companyLogo', 'hrName', 'managerName', 'directorName', 'directorSignature', 'companyStamp', 'remarks'],
      build: (d, helpers) => ({
        subject: 'Salary Increment Letter',
        salutation: `Dear ${safeText(d.employeeName, 'Employee')},`,
        paragraphs: [
          `Based on the review of your performance for ${safeText(d.performancePeriod, 'the relevant review period')}, management is pleased to inform you that your compensation has been revised with effect from ${helpers.date(d.effectiveDate)}.`,
          `Your present gross monthly salary of Rs. ${helpers.money(d.salary)} stands increased by Rs. ${helpers.money(d.incrementAmount)}, and your revised gross monthly salary will accordingly be Rs. ${helpers.money(d.revisedSalary || numericValue(d.salary) + numericValue(d.incrementAmount))}. This revision reflects the value of your contribution, role commitment, and conduct within the organization.`,
          `All other terms and conditions of your appointment shall remain unchanged and in full force. You are expected to continue delivering strong ownership, discipline, and professional excellence in your current responsibilities.`
        ],
        bullets: [
          'The increment will be reflected in payroll from the effective date stated above.',
          'This revision does not alter other benefits unless separately communicated.',
          'Management reserves the right to review compensation structures in line with business needs and policy.'
        ],
        closing: 'We appreciate your contribution and look forward to your continued success with the organization.',
        signatureMode: 'director'
      })
    },
    {
      id: 'promotion-letter',
      name: 'Promotion Letter',
      short: 'Role and designation advancement communication.',
      fields: ['documentDate', 'effectiveDate', 'employeeName', 'employeeId', 'designation', 'newDesignation', 'department', 'newDepartment', 'promotionDetails', 'revisedSalary', 'workLocation', 'companyName', 'companyAddress', 'companyLogo', 'hrName', 'managerName', 'directorName', 'directorSignature', 'companyStamp', 'remarks'],
      build: (d, helpers) => ({
        subject: 'Promotion and Role Enhancement',
        salutation: `Dear ${safeText(d.employeeName, 'Employee')},`,
        paragraphs: [
          `In recognition of your sustained performance and commitment, we are pleased to promote you from the role of ${safeText(d.designation, 'your current position')} to ${safeText(d.newDesignation, 'the promoted position')} with effect from ${helpers.date(d.effectiveDate)}.`,
          `Upon promotion, you will be aligned to the ${safeText(d.newDepartment || d.department, 'designated')} department and will continue to contribute from ${safeText(d.workLocation || d.companyAddress, 'the designated location')}. Your revised gross monthly salary shall be Rs. ${helpers.money(d.revisedSalary)}, and the role expectations will correspondingly expand in scope and accountability.`,
          safeText(d.promotionDetails, 'You are expected to lead by example, mentor team members where required, and uphold the standards of execution, collaboration, and integrity associated with this elevated responsibility.')
        ],
        bullets: [
          'Authority levels and functional responsibilities will be aligned with the promoted role.',
          'Any change in reporting structure will be communicated separately by business leadership.',
          'All other employment terms remain unchanged unless otherwise notified.'
        ],
        closing: 'Congratulations on your promotion. We wish you continued growth and success.',
        signatureMode: 'director'
      })
    },
    {
      id: 'confirmation-letter',
      name: 'Confirmation Letter',
      short: 'Confirmation of employment after probation or review.',
      fields: ['documentDate', 'confirmationDate', 'employeeName', 'employeeId', 'designation', 'department', 'joiningDate', 'salary', 'companyName', 'companyAddress', 'companyLogo', 'hrName', 'managerName', 'directorName', 'directorSignature', 'companyStamp', 'remarks'],
      build: (d, helpers) => ({
        subject: 'Confirmation of Employment',
        salutation: `Dear ${safeText(d.employeeName, 'Employee')},`,
        paragraphs: [
          `We are pleased to inform you that, based on the satisfactory review of your performance and conduct since your joining on ${helpers.date(d.joiningDate)}, your services are hereby confirmed with ${safeText(d.companyName, 'the Company')} with effect from ${helpers.date(d.confirmationDate)}.`,
          `You will continue in the role of ${safeText(d.designation, 'Employee')} within the ${safeText(d.department, 'assigned')} department at the approved compensation of Rs. ${helpers.money(d.salary)} per month, subject to statutory deductions and applicable policies.`,
          `We appreciate the professionalism and commitment demonstrated by you during the probationary period and expect the same standards to continue as a confirmed employee of the organization.`
        ],
        bullets: [
          'Your employment shall continue to be governed by existing service rules and company policy.',
          'Leave, attendance, confidentiality, and conduct obligations remain fully applicable.',
          'Any material policy breach may invite disciplinary action in accordance with company rules.'
        ],
        closing: 'Please acknowledge receipt of this letter for our records.',
        signatureMode: 'director'
      })
    },
    {
      id: 'warning-letter',
      name: 'Warning Letter',
      short: 'Formal disciplinary communication for misconduct or repeated issues.',
      fields: ['documentDate', 'employeeName', 'employeeId', 'designation', 'department', 'warningReason', 'managerName', 'hrName', 'companyName', 'companyAddress', 'companyLogo', 'companyStamp', 'remarks'],
      build: (d) => ({
        subject: 'Formal Warning Letter',
        salutation: `Dear ${safeText(d.employeeName, 'Employee')},`,
        paragraphs: [
          `This letter serves as a formal warning regarding the following matter: ${safeText(d.warningReason, 'conduct and performance concerns identified by management')}. The matter has been reviewed and is considered serious enough to require immediate corrective attention.`,
          `You are expected to comply with the standards of attendance, discipline, conduct, and professional responsibility laid down by ${safeText(d.companyName, 'the Company')}. Any repetition of the above issue, continued non-compliance, or failure to demonstrate measurable improvement may lead to stricter disciplinary action, including suspension or termination of employment.`,
          safeText(d.remarks, 'You are advised to treat this communication with utmost seriousness and take immediate corrective action in consultation with your reporting manager and HR department.')
        ],
        bullets: [
          `Reporting manager on record: ${safeText(d.managerName, 'Not specified')}`,
          `Issuing HR representative: ${safeText(d.hrName, 'HR Department')}`,
          'This warning shall form part of the employee personnel file.'
        ],
        closing: 'You are requested to acknowledge receipt of this warning letter immediately.',
        signatureMode: 'hr'
      })
    },
    {
      id: 'experience-letter',
      name: 'Experience Letter',
      short: 'Employment experience certification.',
      fields: ['documentDate', 'employeeName', 'employeeId', 'designation', 'department', 'joiningDate', 'exitDate', 'experienceDuration', 'companyName', 'companyAddress', 'companyLogo', 'hrName', 'directorName', 'companyStamp', 'remarks'],
      build: (d, helpers) => ({
        subject: 'Experience Certificate',
        salutation: 'To Whom It May Concern,',
        paragraphs: [
          `This is to certify that Mr./Ms. ${safeText(d.employeeName, 'Employee')} was employed with ${safeText(d.companyName, 'the Company')} as ${safeText(d.designation, 'Employee')} in the ${safeText(d.department, 'assigned')} department from ${helpers.date(d.joiningDate)} to ${helpers.date(d.exitDate)}.`,
          `During the tenure of ${safeText(d.experienceDuration, 'the stated period')}, the employee handled assigned responsibilities with professionalism and contributed to day-to-day business operations in the scope of the role entrusted to them.`,
          safeText(d.remarks, 'As per our records, the employee maintained satisfactory conduct during the period of service. This certificate is issued on request for official purposes.')
        ],
        bullets: [
          `Employee code: ${safeText(d.employeeId, 'Not available')}`,
          `Service duration certified: ${safeText(d.experienceDuration, 'As per company records')}`
        ],
        closing: 'We wish the employee success in future endeavors.',
        signatureMode: 'hr'
      })
    },
    {
      id: 'relieving-letter',
      name: 'Relieving Letter',
      short: 'Formal release from employment after handover.',
      fields: ['documentDate', 'employeeName', 'employeeId', 'designation', 'department', 'joiningDate', 'relievingDate', 'noticePeriod', 'companyName', 'companyAddress', 'companyLogo', 'hrName', 'managerName', 'directorName', 'companyStamp', 'remarks'],
      build: (d, helpers) => ({
        subject: 'Relieving Letter',
        salutation: 'To Whom It May Concern,',
        paragraphs: [
          `This is to confirm that Mr./Ms. ${safeText(d.employeeName, 'Employee')} bearing employee code ${safeText(d.employeeId, 'N/A')} has been relieved from the services of ${safeText(d.companyName, 'the Company')} with effect from ${helpers.date(d.relievingDate)}.`,
          `The employee served in the capacity of ${safeText(d.designation, 'Employee')} in the ${safeText(d.department, 'assigned')} department and has completed the required exit formalities, including handover of duties, knowledge transition, and administrative clearance as applicable.`,
          `The notice period obligations of ${safeText(d.noticePeriod, 'the applicable notice period')} have been complied with or otherwise resolved as per company policy.`
        ],
        bullets: [
          `Original date of joining: ${helpers.date(d.joiningDate)}`,
          `Reporting manager at separation: ${safeText(d.managerName, 'Not specified')}`
        ],
        closing: safeText(d.remarks, 'We thank the employee for the services rendered and wish continued success in future assignments.'),
        signatureMode: 'hr'
      })
    },
    {
      id: 'resignation-acceptance-letter',
      name: 'Resignation Acceptance Letter',
      short: 'Acknowledges and accepts employee resignation.',
      fields: ['documentDate', 'employeeName', 'employeeId', 'designation', 'department', 'resignationDate', 'acceptanceDate', 'relievingDate', 'noticePeriod', 'companyName', 'companyAddress', 'companyLogo', 'hrName', 'managerName', 'directorName', 'companyStamp', 'remarks'],
      build: (d, helpers) => ({
        subject: 'Acceptance of Resignation',
        salutation: `Dear ${safeText(d.employeeName, 'Employee')},`,
        paragraphs: [
          `This is with reference to your resignation dated ${helpers.date(d.resignationDate)} from the position of ${safeText(d.designation, 'Employee')}. Management has reviewed the same and hereby accepts your resignation on ${helpers.date(d.acceptanceDate)}.`,
          `Your last working / relieving date shall be ${helpers.date(d.relievingDate)}, subject to the satisfactory completion of knowledge transfer, pending deliverables, and all exit clearance requirements. The applicable notice period on record is ${safeText(d.noticePeriod, 'as per company policy')}.`,
          safeText(d.remarks, 'Please coordinate with your reporting manager and the HR department to complete all formalities for a smooth transition.')
        ],
        bullets: [
          'Full and final settlement will be processed in accordance with company policy and statutory timelines.',
          'No-dues and asset handover documentation must be completed before closure of separation.'
        ],
        closing: 'We thank you for your contributions and wish you success in your future pursuits.',
        signatureMode: 'hr'
      })
    },
    {
      id: 'full-final-settlement',
      name: 'Full & Final Settlement',
      short: 'Settlement memo with payout and clearance details.',
      fields: ['documentDate', 'settlementDate', 'employeeName', 'employeeId', 'designation', 'department', 'exitDate', 'salary', 'bonus', 'fAndFAmount', 'duesSummary', 'bankName', 'accountNumber', 'companyName', 'companyAddress', 'companyLogo', 'hrName', 'managerName', 'directorName', 'companyStamp', 'remarks'],
      build: (d, helpers) => ({
        subject: 'Full and Final Settlement Statement',
        salutation: `Dear ${safeText(d.employeeName, 'Employee')},`,
        paragraphs: [
          `This is to confirm that the full and final settlement in respect of your separation from ${safeText(d.companyName, 'the Company')} has been processed as of ${helpers.date(d.settlementDate)}.`,
          `After review of your salary dues, incentives where approved, statutory recoveries, and other payable or recoverable items up to your exit date of ${helpers.date(d.exitDate)}, the net settlement amount payable to you is Rs. ${helpers.money(d.fAndFAmount)}.`,
          safeText(d.duesSummary, 'The settlement has been prepared after accounting for salary payable, leave adjustment, recoveries, notice period treatment, and other administrative closures as applicable.')
        ],
        tableTitle: 'Settlement Snapshot',
        tableRows: [
          ['Employee Name', safeText(d.employeeName, '-')],
          ['Employee ID', safeText(d.employeeId, '-')],
          ['Department', safeText(d.department, '-')],
          ['Last Drawn Salary', `Rs. ${helpers.money(d.salary)}`],
          ['Approved Bonus / Variable', `Rs. ${helpers.money(d.bonus)}`],
          ['Net F&F Amount', `Rs. ${helpers.money(d.fAndFAmount)}`],
          ['Settlement Date', helpers.date(d.settlementDate)],
          ['Settlement Bank', safeText(d.bankName, '-')],
          ['Bank Account No.', safeText(d.accountNumber, '-')]
        ],
        closing: safeText(d.remarks, 'Please treat this letter as the official settlement memo for your records.'),
        signatureMode: 'dual'
      })
    },
    {
      id: 'exit-clearance-form',
      name: 'Exit Clearance Form',
      short: 'Exit handover and departmental clearance document.',
      fields: ['documentDate', 'employeeName', 'employeeId', 'designation', 'department', 'exitDate', 'managerName', 'hrName', 'assetChecklist', 'remarks', 'companyName', 'companyAddress', 'companyLogo', 'companyStamp'],
      build: (d, helpers) => ({
        subject: 'Exit Clearance Form',
        salutation: 'Internal Clearance Record',
        paragraphs: [
          `This form records the exit clearance of ${safeText(d.employeeName, 'the employee')} from the position of ${safeText(d.designation, 'Employee')} in the ${safeText(d.department, 'assigned')} department, with proposed separation effective from ${helpers.date(d.exitDate)}.`,
          'All departments concerned are required to verify handover status, return of company property, closure of system access, and completion of pending accountabilities before final separation processing.'
        ],
        tableTitle: 'Departmental Clearance Checklist',
        tableRows: checklistToRows(d.assetChecklist, [
          'Reporting Manager Clearance',
          'IT Assets and Access',
          'Admin / ID Card / Seating',
          'Finance / Reimbursement Closure',
          'HR File and Documentation',
          'Knowledge Transfer Completion'
        ]),
        closing: safeText(d.remarks, 'Final relieving and settlement should proceed only after all relevant approvals are completed.'),
        signatureMode: 'dual'
      })
    },
    {
      id: 'no-dues-form',
      name: 'No Dues Form',
      short: 'Declaration that dues and assets are clear.',
      fields: ['documentDate', 'settlementDate', 'employeeName', 'employeeId', 'designation', 'department', 'assetChecklist', 'managerName', 'hrName', 'companyName', 'companyAddress', 'companyLogo', 'companyStamp', 'remarks'],
      build: (d, helpers) => ({
        subject: 'No Dues Certificate',
        salutation: 'To Whom It May Concern,',
        paragraphs: [
          `This is to certify that, as on ${helpers.date(d.settlementDate)}, no outstanding company dues are recorded against Mr./Ms. ${safeText(d.employeeName, 'Employee')} bearing employee code ${safeText(d.employeeId, 'N/A')}, subject to the checklist and approvals mentioned below.`,
          'All relevant departments have been requested to verify that company assets, access credentials, and financial obligations stand reconciled before closure of the employee record.'
        ],
        tableTitle: 'Verified Clearances',
        tableRows: checklistToRows(d.assetChecklist, [
          'Laptop / Desktop / Accessories',
          'ID Card / Access Card',
          'Expense Claims / Advances',
          'Company Documents / Data',
          'Department Handover',
          'Payroll / Finance Confirmation'
        ]),
        closing: safeText(d.remarks, 'This certificate is issued for official record after due verification.'),
        signatureMode: 'dual'
      })
    },
    {
      id: 'transfer-letter',
      name: 'Transfer Letter',
      short: 'Internal transfer communication for role/location change.',
      fields: ['documentDate', 'effectiveDate', 'employeeName', 'employeeId', 'designation', 'department', 'transferLocation', 'newDepartment', 'reportingManager', 'companyName', 'companyAddress', 'companyLogo', 'hrName', 'managerName', 'directorName', 'companyStamp', 'remarks'],
      build: (d, helpers) => ({
        subject: 'Employee Transfer Letter',
        salutation: `Dear ${safeText(d.employeeName, 'Employee')},`,
        paragraphs: [
          `Management has decided to transfer you from your present assignment as ${safeText(d.designation, 'Employee')} in the ${safeText(d.department, 'current')} department to ${safeText(d.newDepartment || d.department, 'the assigned')} department / location with effect from ${helpers.date(d.effectiveDate)}.`,
          `Your new place of posting will be ${safeText(d.transferLocation, 'the designated transferred location')}, and you will report to ${safeText(d.reportingManager || d.managerName, 'the assigned reporting authority')} upon taking charge of the new assignment.`,
          safeText(d.remarks, 'You are requested to coordinate the handover of your current responsibilities and ensure a smooth transition in line with management instructions.')
        ],
        bullets: [
          'Compensation and core terms remain unchanged unless separately communicated.',
          'Reporting lines and operational responsibilities will align with business requirements at the transferred unit.'
        ],
        closing: 'Please acknowledge this transfer letter and extend full cooperation during the transition.',
        signatureMode: 'director'
      })
    },
    {
      id: 'appreciation-letter',
      name: 'Appreciation Letter',
      short: 'Recognition note for performance or contribution.',
      fields: ['documentDate', 'employeeName', 'employeeId', 'designation', 'department', 'performancePeriod', 'appreciationReason', 'companyName', 'companyAddress', 'companyLogo', 'hrName', 'managerName', 'directorName', 'directorSignature', 'companyStamp'],
      build: (d) => ({
        subject: 'Letter of Appreciation',
        salutation: `Dear ${safeText(d.employeeName, 'Employee')},`,
        paragraphs: [
          `This letter is being issued to formally appreciate your contribution as ${safeText(d.designation, 'Employee')} in the ${safeText(d.department, 'assigned')} department during ${safeText(d.performancePeriod, 'the stated period')}.`,
          safeText(d.appreciationReason, 'Your professionalism, commitment, and ownership have made a meaningful difference to the team and the organization.'),
          `The management of ${safeText(d.companyName, 'the Company')} acknowledges your dedication and the positive example you have set through your work ethic, reliability, and collaborative spirit.`
        ],
        bullets: [
          'Your efforts have been noted with appreciation by business leadership.',
          'We encourage you to continue this standard of excellence in your future assignments.'
        ],
        closing: 'Please accept our sincere thanks and best wishes for your continued growth.',
        signatureMode: 'director'
      })
    },
    {
      id: 'salary-certificate',
      name: 'Salary Certificate',
      short: 'Formal salary and employment certificate for visa, loan, or official use.',
      fields: ['documentDate', 'employeeName', 'employeeId', 'designation', 'department', 'joiningDate', 'salary', 'employmentType', 'companyName', 'companyAddress', 'companyPhone', 'companyEmail', 'companyLogo', 'hrName', 'directorName', 'companyStamp', 'remarks'],
      build: (d, helpers) => ({
        subject: 'Salary Certificate',
        salutation: 'To Whom It May Concern,',
        paragraphs: [
          `This is to certify that Mr./Ms. ${safeText(d.employeeName, 'Employee')} bearing employee code ${safeText(d.employeeId, 'N/A')} is employed with ${safeText(d.companyName, 'the Company')} as ${safeText(d.designation, 'Employee')} in the ${safeText(d.department, 'assigned')} department from ${helpers.date(d.joiningDate)}.`,
          `The employee is currently engaged on a ${safeText(d.employmentType, 'regular')} basis and is drawing a gross monthly salary of Rs. ${helpers.money(d.salary)} subject to statutory deductions and prevailing company payroll policy.`,
          safeText(d.remarks, 'This certificate is being issued at the request of the employee for official purposes and without any liability on the part of the company.')
        ],
        tableTitle: 'Employer Reference',
        tableRows: [
          ['Company Name', safeText(d.companyName, '-')],
          ['Company Address', safeText(d.companyAddress, '-')],
          ['Company Phone', safeText(d.companyPhone, '-')],
          ['Company Email', safeText(d.companyEmail, '-')],
          ['Gross Monthly Salary', `Rs. ${helpers.money(d.salary)}`]
        ],
        closing: 'For any verification, the issuer may contact the HR department through the details mentioned above.',
        signatureMode: 'hr'
      })
    },
    {
      id: 'employment-verification-letter',
      name: 'Employment Verification',
      short: 'Employment verification letter with core employee and company details.',
      fields: ['documentDate', 'employeeName', 'employeeId', 'designation', 'department', 'joiningDate', 'employmentType', 'workLocation', 'companyName', 'companyAddress', 'companyWebsite', 'companyPhone', 'companyEmail', 'companyLogo', 'hrName', 'companyStamp', 'remarks'],
      build: (d, helpers) => ({
        subject: 'Employment Verification Letter',
        salutation: 'To Whom It May Concern,',
        paragraphs: [
          `This letter confirms that Mr./Ms. ${safeText(d.employeeName, 'Employee')} is employed with ${safeText(d.companyName, 'the Company')} under employee code ${safeText(d.employeeId, 'N/A')} as ${safeText(d.designation, 'Employee')} in the ${safeText(d.department, 'assigned')} department.`,
          `The employee joined the organization on ${helpers.date(d.joiningDate)} and is presently working on a ${safeText(d.employmentType, 'regular')} basis from ${safeText(d.workLocation || d.companyAddress, 'the designated office location')}.`,
          safeText(d.remarks, 'This verification is issued based on company records for submission to the requesting authority.')
        ],
        bullets: [
          `Company website: ${safeText(d.companyWebsite, 'Not provided')}`,
          `HR contact number: ${safeText(d.companyPhone, 'Not provided')}`,
          `HR email address: ${safeText(d.companyEmail, 'Not provided')}`
        ],
        closing: 'This letter is issued upon request and is valid only as per records available on the date of issue.',
        signatureMode: 'hr'
      })
    }
  ];

  const TEMPLATE_COPY_FIELD_IDS = [
    'templateSubject',
    'templateSalutation',
    'templateParagraph1',
    'templateParagraph2',
    'templateParagraph3',
    'templateBullets',
    'templateClosing'
  ];

  const TEMPLATE_FLOW_ORDER = [
    'documentDate',
    'effectiveDate',
    'companyLogo',
    'companyName',
    'companyAddress',
    'companyPhone',
    'companyEmail',
    'companyWebsite',
    'companyGstin',
    'companyPfRegistration',
    'companyEsicRegistration',
    'employeeName',
    'employeeId',
    'profilePhoto',
    'designation',
    'department',
    'joiningDate',
    'confirmationDate',
    'workLocation',
    'employmentType',
    'reportingManager',
    'salary',
    'bonus',
    'incrementAmount',
    'revisedSalary',
    'newDesignation',
    'newDepartment',
    'performancePeriod',
    'promotionDetails',
    'warningReason',
    'appreciationReason',
    'transferLocation',
    'noticePeriod',
    'resignationDate',
    'acceptanceDate',
    'exitDate',
    'relievingDate',
    'settlementDate',
    'experienceDuration',
    'fAndFAmount',
    'duesSummary',
    'assetChecklist',
    'companyPolicy',
    'salaryStructureNote',
    'templateSubject',
    'templateSalutation',
    'templateParagraph1',
    'templateParagraph2',
    'templateParagraph3',
    'templateBullets',
    'templateClosing',
    'hrName',
    'managerName',
    'directorName',
    'signatureName',
    'hrSignature',
    'directorSignature',
    'companyStamp',
    'remarks'
  ];

  const FLOW_STAGE_LABELS = {
    header: 'Header',
    employee: 'Employee',
    job: 'Job',
    salary: 'Salary',
    body: 'Body',
    approvals: 'Approvals',
    footer: 'Footer'
  };

  function getFlowStage(fieldId) {
    if (['documentDate', 'effectiveDate', 'companyLogo', 'companyName', 'companyAddress', 'companyPhone', 'companyEmail', 'companyWebsite', 'companyGstin', 'companyPfRegistration', 'companyEsicRegistration'].includes(fieldId)) {
      return 'header';
    }
    if (['employeeName', 'employeeId', 'profilePhoto', 'mobileNumber', 'email', 'address', 'pan', 'aadhaar', 'pfNumber', 'esicNumber', 'bankName', 'accountNumber'].includes(fieldId)) {
      return 'employee';
    }
    if (['designation', 'department', 'joiningDate', 'confirmationDate', 'workLocation', 'employmentType', 'reportingManager', 'newDesignation', 'newDepartment'].includes(fieldId)) {
      return 'job';
    }
    if (['salary', 'bonus', 'incrementAmount', 'revisedSalary', 'fAndFAmount', 'salaryStructureNote'].includes(fieldId)) {
      return 'salary';
    }
    if (['hrName', 'managerName', 'directorName', 'signatureName', 'hrSignature', 'directorSignature', 'companyStamp'].includes(fieldId)) {
      return 'approvals';
    }
    if (['templateClosing', 'remarks'].includes(fieldId)) {
      return 'footer';
    }
    if (fieldId === 'fontFamily') {
      return 'header';
    }
    return 'body';
  }

  function getTemplateFlowFieldIds(documentDefinition) {
      const fieldIds = [...new Set([...documentDefinition.fields, ...TEMPLATE_COPY_FIELD_IDS])];
      fieldIds.push('fontFamily');
      return fieldIds.sort((left, right) => {
      const leftIndex = TEMPLATE_FLOW_ORDER.indexOf(left);
      const rightIndex = TEMPLATE_FLOW_ORDER.indexOf(right);
      const safeLeft = leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex;
      const safeRight = rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex;
      return safeLeft - safeRight;
    });
  }

  function safeText(value, fallback = '') {
    const cleaned = String(value || '').trim();
    return cleaned || fallback;
  }

  function numericValue(value) {
    const parsed = Number(value || 0);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function checklistToRows(rawText, defaults) {
    const items = String(rawText || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const source = items.length ? items : defaults;
    return source.map((item) => [item, 'Verified / Pending Signature']);
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderMultilineHtml(value) {
    return escapeHtml(value).replace(/\n/g, '<br>');
  }

  function parseCustomFields(rawValue) {
    try {
      const parsed = JSON.parse(rawValue || '[]');
      return Array.isArray(parsed)
        ? parsed
            .map((field) => ({
              label: String(field?.label || '').trim(),
              value: String(field?.value || '').trim()
            }))
            .filter((field) => field.label || field.value)
        : [];
    } catch (error) {
      return [];
    }
  }

  function createTemplateCopyFields(content) {
    const paragraphs = content.paragraphs || [];
    return {
      templateSubject: content.subject || '',
      templateSalutation: content.salutation || '',
      templateParagraph1: paragraphs[0] || '',
      templateParagraph2: paragraphs[1] || '',
      templateParagraph3: paragraphs[2] || '',
      templateBullets: (content.bullets || []).join('\n'),
      templateClosing: content.closing || ''
    };
  }

  function applyTemplateCopy(content, data) {
    return {
      ...content,
      subject: safeText(data.templateSubject, content.subject),
      salutation: safeText(data.templateSalutation, content.salutation),
      paragraphs: [
        data.templateParagraph1,
        data.templateParagraph2,
        data.templateParagraph3
      ].filter((paragraph) => String(paragraph || '').trim().length > 0),
      bullets: String(data.templateBullets || '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      closing: safeText(data.templateClosing, content.closing)
    };
  }

  function createHrDocumentsModule({ getEmployees, getCompanies, numberToWords }) {
    const state = {
      employees: [],
      companies: [],
      selectedEmployeeId: '',
      selectedDocumentId: '',
      selectedThemeId: '',
      formData: {},
      manualTemplateFields: new Set(),
      previewHtml: '',
      docMap: new Map(DOCUMENT_DEFINITIONS.map((doc) => [doc.id, doc])),
      themeMap: new Map(HR_THEMES.map((theme) => [theme.id, theme]))
    };

    const els = {
      employeeSelect: document.getElementById('hrEmployeeSelect'),
      selectionSummary: document.getElementById('hrSelectionSummary'),
      documentGrid: document.getElementById('hrDocumentTypeGrid'),
      templateGallery: document.getElementById('hrTemplateGallery'),
      form: document.getElementById('hrDocumentForm'),
      formFields: document.getElementById('hrFormFields'),
      formStatus: document.getElementById('hrFormStatus'),
      previewMeta: document.getElementById('hrPreviewMeta'),
      previewViewport: document.getElementById('hrPreviewViewport'),
      downloadBtn: document.getElementById('downloadHrPdfBtn'),
      reloadTemplateBtn: document.getElementById('hrReloadTemplateBtn'),
      resetFormBtn: document.getElementById('hrResetFormBtn')
    };

    function currentEmployee() {
      return state.employees.find((emp) => String(emp.id) === String(state.selectedEmployeeId)) || null;
    }

    function currentDocument() {
      return state.docMap.get(state.selectedDocumentId) || DOCUMENT_DEFINITIONS[0] || null;
    }

    function currentTheme() {
      return state.themeMap.get(state.selectedThemeId) || HR_THEMES[0] || null;
    }

    function updateFormStatus() {
      const employee = currentEmployee();
      const documentDefinition = currentDocument();

      if (!employee || !documentDefinition) {
        els.formStatus.textContent = 'Select employee and document to auto-fill the form.';
        return;
      }

      els.formStatus.textContent = `${documentDefinition.name} for ${employee.name} is pre-filled from employee, company, and template data. Every template field shows real text and stays editable with live preview updates.`;
    }

    function companyFromEmployee(employee) {
      if (!employee) return null;
      return state.companies.find((company) => Number(company.id) === Number(employee.companyId)) || null;
    }

    function formatDate(value) {
      if (!value) return '________________';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }

    function formatMoney(value) {
      return numericValue(value).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    function buildDefaults(employee, documentDefinition) {
      const company = companyFromEmployee(employee);
      const salary = employee ? numericValue(employee.basic) + numericValue(employee.hra) + numericValue(employee.specialAllowance) : 0;
      const today = new Date().toISOString().slice(0, 10);
      const base = {
        documentDate: today,
        effectiveDate: today,
        employeeName: employee?.name || '',
        employeeId: employee?.employeeId || '',
        mobileNumber: employee?.mobileNumber || '',
        email: employee?.email || '',
        address: employee?.address || employee?.location || '',
        employeeCustomFields: parseCustomFields(employee?.customFields),
        department: employee?.department || '',
        designation: employee?.designation || '',
        joiningDate: employee?.doj || '',
        confirmationDate: today,
        workLocation: employee?.location || '',
        employmentType: employee?.employmentType || 'Full Time',
        reportingManager: employee?.reportingManager || '',
        salary,
        bonus: numericValue(employee?.bonus),
        incrementAmount: 0,
        revisedSalary: salary,
        companyName: company?.displayName || company?.legalName || '',
        companyLegalName: company?.legalName || company?.displayName || '',
        companyAddress: company?.address || '',
        companyWebsite: company?.website || '',
        companyEmail: company?.email || '',
        companyPhone: company?.phone || '',
        companyGstin: company?.gstin || '',
        companyPfRegistration: company?.pfRegistrationNo || '',
        companyEsicRegistration: company?.esicRegistrationNo || '',
        companyPolicy: 'Employment is subject to company attendance rules, leave policy, confidentiality, information security, acceptable conduct, performance review standards, and all internal HR / management policies updated from time to time.',
        salaryStructureNote: 'Fixed gross monthly salary is the monthly payroll amount. Bonus / variable pay is normally annual or performance linked and is not automatically added into monthly fixed salary.',
        hrName: company?.hrName || 'HR Department',
        managerName: employee?.reportingManager || '',
        directorName: company?.directorName || 'Authorized Signatory',
        signatureName: company?.directorName || 'Authorized Signatory',
        warningReason: '',
        appreciationReason: '',
        performancePeriod: '',
        promotionDetails: '',
        newDesignation: employee?.designation || '',
        newDepartment: employee?.department || '',
        transferLocation: employee?.location || '',
        noticePeriod: '30 days',
        exitDate: today,
        relievingDate: today,
        resignationDate: today,
        acceptanceDate: today,
        experienceDuration: employee?.doj ? computeDuration(employee.doj, today) : '',
        fAndFAmount: salary,
        settlementDate: today,
        duesSummary: '',
        assetChecklist: '',
        remarks: '',
        pan: employee?.pan || '',
        aadhaar: employee?.aadhaar || '',
        pfNumber: employee?.pfNo || '',
        esicNumber: employee?.esiNo || '',
        bankName: employee?.bankName || '',
        accountNumber: employee?.accountNumber || '',
        companyLogo: company?.logoData || '',
        companyStamp: company?.stampData || '',
        hrSignature: '',
        directorSignature: company?.signatureData || '',
        profilePhoto: employee?.profilePhoto || '',
        fontFamily: TOP_FONT_FAMILIES[0].value
      };

      if (documentDefinition.id === 'increment-letter') {
        base.performancePeriod = 'Annual Performance Review';
        base.incrementAmount = Math.round(salary * 0.1);
        base.revisedSalary = salary + base.incrementAmount;
      }

      if (documentDefinition.id === 'promotion-letter') {
        base.promotionDetails = 'You will lead the assigned responsibilities, mentor the team where required, and support business delivery objectives for the promoted role.';
        base.newDesignation = employee?.designation ? `Senior ${employee.designation}` : '';
        base.revisedSalary = Math.round(salary * 1.2);
      }

      if (documentDefinition.id === 'appreciation-letter') {
        base.performancePeriod = 'Quarterly Performance Cycle';
        base.appreciationReason = 'Your consistency, ownership, and timely contribution to team goals have been recognized by management.';
      }

      const generatedContent = documentDefinition.build(base, {
        date: formatDate,
        money: formatMoney,
        words: numberToWords
      });

      Object.assign(base, createTemplateCopyFields(generatedContent));

      return base;
    }

    function refreshTemplateCopy(force = false) {
      const documentDefinition = currentDocument();
      if (!documentDefinition || !Object.keys(state.formData).length) return;

      const generatedContent = documentDefinition.build(state.formData, {
        date: formatDate,
        money: formatMoney,
        words: numberToWords
      });
      const nextCopy = createTemplateCopyFields(generatedContent);

      TEMPLATE_COPY_FIELD_IDS.forEach((fieldId) => {
        if (force || !state.manualTemplateFields.has(fieldId)) {
          state.formData[fieldId] = nextCopy[fieldId];
        }
      });
    }

    function computeDuration(fromDate, toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
        return '';
      }
      const monthDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      const years = Math.floor(monthDiff / 12);
      const months = monthDiff % 12;
      const parts = [];
      if (years) parts.push(`${years} year${years > 1 ? 's' : ''}`);
      if (months) parts.push(`${months} month${months > 1 ? 's' : ''}`);
      return parts.join(' ') || 'Less than a month';
    }

    async function refreshData() {
      const [employees, companies] = await Promise.all([getEmployees(), getCompanies()]);
      state.employees = employees;
      state.companies = companies;
      if (!state.selectedEmployeeId && state.employees.length) {
        state.selectedEmployeeId = String(state.employees[0].id);
      }
      if (!state.selectedDocumentId && DOCUMENT_DEFINITIONS.length) {
        state.selectedDocumentId = DOCUMENT_DEFINITIONS[0].id;
      }
      if (!state.selectedThemeId && HR_THEMES.length) {
        state.selectedThemeId = HR_THEMES[0].id;
      }
      if (state.selectedEmployeeId && !currentEmployee()) {
        state.selectedEmployeeId = '';
        state.formData = {};
        state.manualTemplateFields.clear();
      }
      if (!state.selectedEmployeeId && state.employees.length) {
        state.selectedEmployeeId = String(state.employees[0].id);
      }
      if (state.selectedDocumentId && !state.docMap.has(state.selectedDocumentId) && DOCUMENT_DEFINITIONS.length) {
        state.selectedDocumentId = DOCUMENT_DEFINITIONS[0].id;
      }
      if (state.selectedThemeId && !state.themeMap.has(state.selectedThemeId) && HR_THEMES.length) {
        state.selectedThemeId = HR_THEMES[0].id;
      }
      renderEmployeeSelect();
      renderDocumentGrid();
      renderTemplateGallery();
      renderSelectionSummary();
      prepareDocumentWorkspace(true);
    }

    function renderEmployeeSelect() {
      els.employeeSelect.innerHTML = '<option value="">Select Employee</option>';
      state.employees.forEach((employee) => {
        const option = document.createElement('option');
        option.value = employee.id;
        option.textContent = `${employee.name} - ${employee.designation}`;
        if (String(employee.id) === String(state.selectedEmployeeId)) {
          option.selected = true;
        }
        els.employeeSelect.appendChild(option);
      });
    }

    function renderSelectionSummary() {
      const employee = currentEmployee();
      const documentDefinition = currentDocument();
      const theme = currentTheme();
      const bits = [];

      if (employee) bits.push(`Employee: ${employee.name} (${employee.employeeId || 'No ID'})`);
      if (documentDefinition) bits.push(`Document: ${documentDefinition.name}`);
      if (theme) bits.push(`Template: ${theme.name}`);

      els.selectionSummary.textContent = bits.length
        ? bits.join('  |  ')
        : 'Select an employee to begin the HR document workflow.';
      updateFormStatus();
    }

    function renderDocumentGrid() {
      els.documentGrid.innerHTML = '';
      DOCUMENT_DEFINITIONS.forEach((documentDefinition, index) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = `hr-doc-card${documentDefinition.id === state.selectedDocumentId ? ' selected' : ''}`;
        card.innerHTML = `
          <span class="doc-index">${String(index + 1).padStart(2, '0')}</span>
          <h3>${escapeHtml(documentDefinition.name)}</h3>
          <p>${escapeHtml(documentDefinition.short)}</p>
        `;
        card.addEventListener('click', () => {
          state.selectedDocumentId = documentDefinition.id;
          renderDocumentGrid();
          renderTemplateGallery();
          prepareDocumentWorkspace(true, { refreshTemplateCopy: true });
          renderSelectionSummary();
        });
        els.documentGrid.appendChild(card);
      });
    }

    function renderTemplateGallery() {
      els.templateGallery.innerHTML = '';
      if (!state.selectedDocumentId) {
        els.templateGallery.innerHTML = '<div class="empty-state">Choose a document type to unlock its 5 professional templates.</div>';
        return;
      }

      HR_THEMES.forEach((theme) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = `hr-template-card${theme.id === state.selectedThemeId ? ' selected' : ''}`;
        card.innerHTML = `
          <div class="template-swatch" style="background: linear-gradient(135deg, ${theme.accent}, ${theme.surface});"></div>
          <div class="template-copy">
            <h3>${escapeHtml(theme.name)}</h3>
            <p>${escapeHtml(theme.tone)}</p>
            <div class="template-mini">
              <span></span><span></span><span></span>
            </div>
          </div>
        `;
        card.addEventListener('click', () => {
          state.selectedThemeId = theme.id;
          renderTemplateGallery();
          prepareDocumentWorkspace(false, { refreshTemplateCopy: true });
          renderSelectionSummary();
        });
        els.templateGallery.appendChild(card);
      });
    }

    function prepareDocumentWorkspace(forceReset = false, options = {}) {
      const employee = currentEmployee();
      const documentDefinition = currentDocument();
      const { refreshTemplateCopy: forceTemplateCopy = false } = options;

      if (!employee || !documentDefinition) {
        els.formFields.innerHTML = '<div class="empty-state">Select an employee and a document type to open the editable HR form.</div>';
        els.previewViewport.innerHTML = '<div class="empty-state">Preview will appear here once a template is selected.</div>';
        els.previewMeta.textContent = 'Choose a document template to see the generated preview.';
        state.previewHtml = '';
        updateFormStatus();
        return;
      }

      if (forceReset || !Object.keys(state.formData).length || state.formData.__docId !== documentDefinition.id || state.formData.__employeeId !== employee.id) {
        state.formData = {
          ...buildDefaults(employee, documentDefinition),
          __docId: documentDefinition.id,
          __employeeId: employee.id
        };
        state.manualTemplateFields.clear();
      }

      refreshTemplateCopy(forceReset || forceTemplateCopy);

      renderForm(documentDefinition);
      renderPreview();
      updateFormStatus();
    }

    function renderForm(documentDefinition) {
      const orderedFieldIds = getTemplateFlowFieldIds(documentDefinition);

      els.formFields.innerHTML = '';
      const section = document.createElement('section');
      section.className = 'hr-form-group flow-group';
      section.innerHTML = '<h3>Template To Footer Flow</h3><p class="muted-copy">All fields are auto-filled from employee, company, and selected template data. Edit any field below and the preview updates live.</p>';

      orderedFieldIds.forEach((fieldId, index) => {
        const row = buildFormRow(fieldId, index);
        if (row) {
          section.appendChild(row);
        }
      });

      els.formFields.appendChild(section);

      bindFormEvents();
    }

    function buildFormRow(fieldId, index) {
      const field = FIELD_LIBRARY[fieldId];
      if (!field) return null;

      const isTemplateField = TEMPLATE_COPY_FIELD_IDS.includes(fieldId);
      const row = document.createElement('div');
      row.className = `hr-input-card flow-card ${isTemplateField ? 'template-card' : ''} hr-type-${field.type}`;
      const value = state.formData[fieldId] ?? '';
      const stage = FLOW_STAGE_LABELS[getFlowStage(fieldId)] || 'Field';
      const indexEl = document.createElement('div');
      indexEl.className = 'hr-flow-index';
      indexEl.textContent = String(index + 1).padStart(2, '0');

      const contentEl = document.createElement('div');
      contentEl.className = 'hr-flow-content';

      const metaEl = document.createElement('div');
      metaEl.className = 'hr-flow-meta';

      const labelEl = document.createElement('label');
      labelEl.setAttribute('for', `hr-${fieldId}`);
      labelEl.textContent = field.label;

      const stageEl = document.createElement('span');
      stageEl.className = 'hr-flow-stage';
      stageEl.textContent = isTemplateField ? 'Template Text' : stage;

      metaEl.appendChild(labelEl);
      metaEl.appendChild(stageEl);
      contentEl.appendChild(metaEl);

      let controlEl;
      if (field.type === 'textarea') {
        controlEl = document.createElement('textarea');
        controlEl.rows = field.group === 'Template Copy' ? 5 : 4;
        controlEl.value = String(value);
      } else if (field.type === 'select') {
        controlEl = document.createElement('select');
        (field.options || []).forEach((optionConfig) => {
          const optionEl = document.createElement('option');
          optionEl.value = optionConfig.value;
          optionEl.textContent = optionConfig.label;
          if (String(optionConfig.value) === String(value)) {
            optionEl.selected = true;
          }
          controlEl.appendChild(optionEl);
        });
      } else {
        controlEl = document.createElement('input');
        controlEl.type = field.type;
        if (field.type !== 'file') {
          controlEl.value = String(value);
        }
      }

      controlEl.id = `hr-${fieldId}`;
      controlEl.setAttribute('data-field', fieldId);

      if (field.type === 'file') {
        controlEl.accept = field.accept || 'image/*';
      }

      contentEl.appendChild(controlEl);

      if (field.type === 'file') {
        const hintEl = document.createElement('div');
        hintEl.className = 'file-hint';
        hintEl.textContent = value ? 'Uploaded and ready for preview/PDF.' : 'Optional image for branding or signature.';
        contentEl.appendChild(hintEl);
      }

      row.appendChild(indexEl);
      row.appendChild(contentEl);
      return row;
    }

    function updateTemplateCopyInputs() {
      TEMPLATE_COPY_FIELD_IDS.forEach((fieldId) => {
        const input = document.getElementById(`hr-${fieldId}`);
        if (input && document.activeElement !== input) {
          input.value = state.formData[fieldId] || '';
        }
      });
    }

    function processFieldUpdate(element) {
      const fieldId = element.getAttribute('data-field');
      const field = FIELD_LIBRARY[fieldId];
      if (!field) return;

      state.formData[fieldId] = element.value;
      if (TEMPLATE_COPY_FIELD_IDS.includes(fieldId)) {
        state.manualTemplateFields.add(fieldId);
      }
      if (fieldId === 'incrementAmount' && currentDocument()?.id === 'increment-letter') {
        state.formData.revisedSalary = numericValue(state.formData.salary) + numericValue(state.formData.incrementAmount);
      }
      if (fieldId === 'joiningDate' || fieldId === 'exitDate') {
        state.formData.experienceDuration = computeDuration(state.formData.joiningDate, state.formData.exitDate || state.formData.documentDate);
      }
      if (!TEMPLATE_COPY_FIELD_IDS.includes(fieldId)) {
        refreshTemplateCopy();
        updateTemplateCopyInputs();
      }
      renderPreview();
    }

    async function processFileUpdate(element) {
      const fieldId = element.getAttribute('data-field');
      const field = FIELD_LIBRARY[fieldId];
      if (!field) return;

      const file = element.files && element.files[0];
      state.formData[fieldId] = file ? await readFileAsDataUrl(file) : '';
      renderForm(currentDocument());
      renderPreview();
    }

    function bindFormEvents() {
      return;
    }

    function renderPreview() {
      const documentDefinition = currentDocument();
      const theme = currentTheme();
      const employee = currentEmployee();

      if (!documentDefinition || !theme || !employee) {
        els.previewViewport.innerHTML = '<div class="empty-state">Choose an employee, document type, and one template design to preview the final document.</div>';
        els.previewMeta.textContent = 'Choose a document template to see the generated preview.';
        state.previewHtml = '';
        updateFormStatus();
        return;
      }

      state.previewHtml = buildDocumentHtml(documentDefinition, theme, state.formData, {
        date: formatDate,
        money: formatMoney,
        words: numberToWords
      });

      els.previewViewport.innerHTML = state.previewHtml;
      const selectedFont = TOP_FONT_FAMILIES.find((item) => item.value === state.formData.fontFamily)?.label || 'Custom Font';
      els.previewMeta.textContent = `${documentDefinition.name} preview using ${theme.name} | Font: ${selectedFont}`;
    }

    function buildDocumentHtml(documentDefinition, theme, data, helpers) {
      const baseContent = documentDefinition.build(data, helpers);
      const content = applyTemplateCopy(baseContent, data);
      const logoHtml = data.companyLogo
        ? `<img class="brand-logo" src="${data.companyLogo}" alt="Company Logo">`
        : `<div class="brand-monogram">${escapeHtml((data.companyName || 'CO').split(/\s+/).slice(0, 2).map((part) => part.charAt(0)).join('') || 'CO')}</div>`;
      const photoHtml = data.profilePhoto
        ? `<img class="profile-photo" src="${data.profilePhoto}" alt="Employee Photo">`
        : `<div class="profile-photo profile-fallback">${escapeHtml((data.employeeName || 'Employee').split(' ').map((part) => part.charAt(0)).slice(0, 2).join(''))}</div>`;

      const signatureMarkup = buildSignatureMarkup(content.signatureMode, data);
      const tableMarkup = content.tableRows?.length
        ? `
          <section class="document-panel">
            <h4>${escapeHtml(content.tableTitle || 'Details')}</h4>
            <table class="detail-table">
              <tbody>
                ${content.tableRows.map(([label, value]) => `
                  <tr>
                    <td>${escapeHtml(label)}</td>
                    <td>${renderMultilineHtml(value)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </section>
        `
        : '';

      const bulletsMarkup = content.bullets?.length
        ? `<ul class="document-list">${content.bullets.map((item) => `<li>${renderMultilineHtml(item)}</li>`).join('')}</ul>`
        : '';
      const employeeCustomFieldsMarkup = Array.isArray(data.employeeCustomFields) && data.employeeCustomFields.length
        ? `
          <section class="document-panel document-panel-soft">
            <h4>Additional Employee Inputs</h4>
            <div class="record-grid">
              ${data.employeeCustomFields.map((field) => `
                <div><span>${escapeHtml(field.label || 'Custom Field')}</span><strong>${escapeHtml(field.value || '-')}</strong></div>
              `).join('')}
            </div>
          </section>
        `
        : '';

      const topMeta = [
        ['Document Date', helpers.date(data.documentDate)],
        ['Employee Code', safeText(data.employeeId, 'N/A')],
        ['Department', safeText(data.department, 'N/A')],
        ['Designation', safeText(data.designation || data.newDesignation, 'N/A')]
      ];

      const html = `
        <style>${buildDocumentCss(theme, data)}</style>
        <div class="hr-document-page theme-${theme.id}">
          <div class="watermark">${escapeHtml(safeText(data.companyLegalName, data.companyName || 'Company'))}</div>
          <header class="document-header">
            <div class="brand-block">
              ${logoHtml}
              <div class="brand-copy">
                <div class="brand-name">${escapeHtml(data.companyName || 'Company Name')}</div>
                <div class="brand-address">${renderMultilineHtml(data.companyAddress || 'Company Address')}</div>
              </div>
            </div>
            <div class="header-aside">
              ${photoHtml}
            </div>
          </header>

          <section class="meta-ribbon">
            ${topMeta.map(([label, value]) => `
              <div class="meta-chip">
                <span>${escapeHtml(label)}</span>
                <strong>${escapeHtml(value)}</strong>
              </div>
            `).join('')}
          </section>

          <main class="document-body">
            <div class="document-tag">${escapeHtml(documentDefinition.name)}</div>
            <h1>${escapeHtml(content.subject)}</h1>
            <div class="salutation">${escapeHtml(content.salutation)}</div>
            ${content.paragraphs.map((paragraph) => `<p>${renderMultilineHtml(paragraph)}</p>`).join('')}
            ${bulletsMarkup}
            ${tableMarkup}
            <section class="document-panel document-panel-soft">
              <h4>Statutory / Record Reference</h4>
              <div class="record-grid">
                <div><span>PAN</span><strong>${escapeHtml(data.pan || 'Not on record')}</strong></div>
                <div><span>PF Number</span><strong>${escapeHtml(data.pfNumber || 'Not on record')}</strong></div>
                <div><span>ESIC Number</span><strong>${escapeHtml(data.esicNumber || 'Not on record')}</strong></div>
                <div><span>Bank Details</span><strong>${escapeHtml(data.bankName ? `${data.bankName} / ${data.accountNumber}` : 'Not on record')}</strong></div>
              </div>
            </section>
            <section class="document-panel document-panel-soft">
              <h4>Company Reference</h4>
              <div class="record-grid">
                <div><span>Company Phone</span><strong>${escapeHtml(data.companyPhone || 'Not on record')}</strong></div>
                <div><span>Company Email</span><strong>${escapeHtml(data.companyEmail || 'Not on record')}</strong></div>
                <div><span>Website</span><strong>${escapeHtml(data.companyWebsite || 'Not on record')}</strong></div>
                <div><span>GST / PF / ESIC</span><strong>${escapeHtml([data.companyGstin, data.companyPfRegistration, data.companyEsicRegistration].filter(Boolean).join(' / ') || 'Not on record')}</strong></div>
              </div>
            </section>
            ${safeText(data.remarks, '').trim() ? `
              <section class="document-panel document-panel-soft">
                <h4>Additional Remarks</h4>
                <p>${renderMultilineHtml(data.remarks)}</p>
              </section>
            ` : ''}
            ${employeeCustomFieldsMarkup}
            <p class="closing-line">${renderMultilineHtml(content.closing)}</p>
            ${content.subject.includes('Settlement') ? `<p class="amount-words">Amount in words: ${escapeHtml(helpers.words(data.fAndFAmount || 0))}</p>` : ''}
          </main>

          ${signatureMarkup}
        </div>
      `;

      return html;
    }

    function buildSignatureMarkup(mode, data) {
      const hrSign = data.hrSignature ? `<img src="${data.hrSignature}" alt="HR Signature">` : '<div class="sign-line"></div>';
      const directorSign = data.directorSignature ? `<img src="${data.directorSignature}" alt="Director Signature">` : '<div class="sign-line"></div>';
      const stamp = data.companyStamp ? `<img src="${data.companyStamp}" alt="Company Stamp">` : '<div class="stamp-box">Company Stamp</div>';

      if (mode === 'director') {
        return `
          <footer class="signature-footer">
            <div class="signature-card">${directorSign}<strong>${escapeHtml(data.directorName || data.signatureName || 'Authorized Signatory')}</strong><span>For ${escapeHtml(data.companyName || 'the Company')}</span></div>
            <div class="signature-card stamp-card">${stamp}</div>
          </footer>
        `;
      }

      if (mode === 'dual') {
        return `
          <footer class="signature-footer dual">
            <div class="signature-card">${hrSign}<strong>${escapeHtml(data.hrName || 'HR Department')}</strong><span>Human Resources</span></div>
            <div class="signature-card">${directorSign}<strong>${escapeHtml(data.directorName || data.signatureName || 'Authorized Signatory')}</strong><span>Management Approval</span></div>
            <div class="signature-card stamp-card">${stamp}</div>
          </footer>
        `;
      }

      return `
        <footer class="signature-footer">
          <div class="signature-card">${hrSign}<strong>${escapeHtml(data.hrName || 'HR Department')}</strong><span>Human Resources</span></div>
          <div class="signature-card stamp-card">${stamp}</div>
        </footer>
      `;
    }

    function buildDocumentCss(theme, data) {
      return `
        @page {
          size: A4;
          margin: 0;
        }
        .hr-document-page {
          --accent: ${theme.accent};
          --surface: ${theme.surface};
          --ink: ${theme.ink};
          --line: rgba(15, 23, 42, 0.14);
          position: relative;
          width: 794px;
          min-height: 1123px;
          margin: 0 auto;
          padding: 42px 46px 34px;
          background:
            linear-gradient(165deg, rgba(255,255,255,0.98), rgba(255,255,255,0.93)),
            radial-gradient(circle at top right, ${theme.surface}, #ffffff 55%);
          color: var(--ink);
          font-family: ${data.fontFamily || 'Georgia, "Times New Roman", serif'};
          box-shadow: 0 28px 70px rgba(15, 23, 42, 0.16);
          overflow: visible;
          box-sizing: border-box;
          page-break-after: auto;
          break-after: auto;
          break-inside: auto;
        }
        .hr-document-page::before {
          content: "";
          position: absolute;
          inset: 18px;
          border: 1.5px solid color-mix(in srgb, var(--accent) 32%, white);
          pointer-events: none;
        }
        .hr-document-page::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 10px;
          background: linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 28%, white), var(--accent));
        }
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-32deg);
          transform-origin: center;
          width: 150%;
          max-width: none;
          text-align: center;
          white-space: normal;
          word-break: break-word;
          line-height: 1.15;
          opacity: 0.06;
          font-size: 48px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          pointer-events: none;
          z-index: 0;
        }
        .document-header {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 20px;
          border-bottom: 2px solid var(--accent);
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .brand-block {
          display: flex;
          gap: 16px;
          align-items: center;
          max-width: 520px;
        }
        .brand-logo,
        .brand-monogram {
          width: 76px;
          height: 76px;
          object-fit: contain;
          border-radius: 18px;
          background: var(--surface);
          border: 1px solid color-mix(in srgb, var(--accent) 24%, white);
        }
        .brand-monogram,
        .profile-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          color: var(--accent);
        }
        .brand-name {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: var(--accent);
        }
        .brand-address {
          margin-top: 6px;
          white-space: pre-line;
          line-height: 1.45;
          font-size: 13.5px;
        }
        .header-aside {
          display: flex;
          align-items: center;
        }
        .profile-photo {
          width: 88px;
          height: 104px;
          object-fit: cover;
          border-radius: 20px;
          border: 1px solid color-mix(in srgb, var(--accent) 18%, white);
          background: var(--surface);
        }
        .meta-ribbon {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin: 22px 0 28px;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .meta-chip {
          background: var(--surface);
          border: 1px solid color-mix(in srgb, var(--accent) 18%, white);
          border-radius: 18px;
          padding: 12px 14px;
        }
        .meta-chip span {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: color-mix(in srgb, var(--ink) 55%, white);
        }
        .meta-chip strong {
          display: block;
          margin-top: 6px;
          font-size: 13px;
        }
        .document-body {
          position: relative;
          z-index: 1;
        }
        .document-tag {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: var(--surface);
          color: var(--accent);
          border: 1px solid color-mix(in srgb, var(--accent) 20%, white);
        }
        .document-body h1 {
          margin: 18px 0 20px;
          font-size: 29px;
          line-height: 1.25;
          color: var(--accent);
        }
        .salutation {
          margin-bottom: 16px;
          font-weight: 700;
          font-size: 16px;
        }
        .document-body p {
          margin: 0 0 14px;
          font-size: 15px;
          line-height: 1.7;
          text-align: justify;
        }
        .document-list {
          margin: 8px 0 18px 18px;
          padding: 0;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .document-list li {
          margin-bottom: 8px;
          line-height: 1.6;
        }
        .document-panel {
          margin: 24px 0;
          padding: 18px 20px;
          border-radius: 20px;
          background: linear-gradient(180deg, rgba(255,255,255,0.92), var(--surface));
          border: 1px solid color-mix(in srgb, var(--accent) 16%, white);
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .document-panel-soft {
          background: rgba(255,255,255,0.72);
        }
        .document-panel h4 {
          margin: 0 0 14px;
          font-size: 15px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .detail-table {
          width: 100%;
          border-collapse: collapse;
        }
        .detail-table tr {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .detail-table td {
          padding: 10px 12px;
          border-bottom: 1px solid var(--line);
          vertical-align: top;
          font-size: 14px;
        }
        .detail-table td:first-child {
          width: 42%;
          font-weight: 700;
        }
        .record-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px 18px;
        }
        .record-grid span {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: color-mix(in srgb, var(--ink) 58%, white);
        }
        .record-grid strong {
          display: block;
          margin-top: 5px;
          font-size: 14px;
        }
        .closing-line {
          margin-top: 18px;
          font-weight: 600;
        }
        .amount-words {
          padding: 12px 16px;
          border-left: 4px solid var(--accent);
          background: var(--surface);
          border-radius: 10px;
          font-style: italic;
        }
        .signature-footer {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 200px;
          gap: 24px;
          align-items: end;
          margin-top: 36px;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .signature-footer.dual {
          grid-template-columns: 1fr 1fr 190px;
        }
        .signature-card {
          min-height: 110px;
          padding-top: 10px;
        }
        .signature-card img {
          max-width: 160px;
          max-height: 70px;
          object-fit: contain;
          display: block;
          margin-bottom: 8px;
        }
        .signature-card strong,
        .signature-card span {
          display: block;
        }
        .signature-card strong {
          padding-top: 10px;
          border-top: 1px solid var(--ink);
          font-size: 14px;
        }
        .signature-card span {
          margin-top: 4px;
          font-size: 12px;
          color: color-mix(in srgb, var(--ink) 68%, white);
        }
        .sign-line {
          height: 56px;
        }
        .stamp-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 140px;
          height: 90px;
          border: 1px dashed color-mix(in srgb, var(--accent) 38%, white);
          color: color-mix(in srgb, var(--accent) 78%, white);
          border-radius: 18px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        .stamp-card img {
          max-width: 140px;
          max-height: 90px;
        }
        @media print {
          html, body {
            margin: 0;
            padding: 0;
            background: white;
          }
          .hr-document-page {
            width: auto;
            min-height: auto;
            box-shadow: none;
            margin: 0;
            padding: 16mm 14mm 14mm;
            overflow: visible;
          }
          .hr-document-page::before {
            inset: 6mm;
          }
          .watermark {
            top: 48%;
            left: 50%;
            width: 156%;
            font-size: 50px;
            opacity: 0.06;
          }
        }
      `;
    }

    async function downloadPdf() {
      const documentDefinition = currentDocument();
      const theme = currentTheme();
      if (!state.previewHtml || !documentDefinition || !theme) {
        alert('Please select employee, document type, and template first.');
        return;
      }

      const fileName = `${slugify(state.formData.employeeName || 'employee')}_${slugify(documentDefinition.name)}_${theme.id}.pdf`;
      await window.api.generateHrDocumentPdf({
        html: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${escapeHtml(documentDefinition.name)}</title></head><body style="margin:0;background:#ffffff;">${state.previewHtml}</body></html>`,
        fileName
      });
    }

    function slugify(value) {
      return String(value || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'document';
    }

    function readFileAsDataUrl(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    function bindEvents() {
      els.form.addEventListener('input', (event) => {
        const element = event.target.closest('[data-field]');
        if (!element) return;
        const fieldId = element.getAttribute('data-field');
        const field = FIELD_LIBRARY[fieldId];
        if (!field || field.type === 'file') return;
        processFieldUpdate(element);
      });

      els.form.addEventListener('change', async (event) => {
        const element = event.target.closest('[data-field]');
        if (!element) return;
        const fieldId = element.getAttribute('data-field');
        const field = FIELD_LIBRARY[fieldId];
        if (!field) return;
        if (field.type === 'file') {
          await processFileUpdate(element);
          return;
        }
        processFieldUpdate(element);
      });

      els.employeeSelect.addEventListener('change', () => {
        state.selectedEmployeeId = els.employeeSelect.value;
        state.formData = {};
        state.manualTemplateFields.clear();
        renderSelectionSummary();
        prepareDocumentWorkspace(true);
      });

      els.downloadBtn.addEventListener('click', downloadPdf);
      els.reloadTemplateBtn.addEventListener('click', () => {
        if (!currentDocument()) return;
        state.manualTemplateFields.clear();
        refreshTemplateCopy(true);
        renderForm(currentDocument());
        renderPreview();
        updateFormStatus();
      });
      els.resetFormBtn.addEventListener('click', () => {
        if (!currentDocument() || !currentEmployee()) return;
        prepareDocumentWorkspace(true);
        renderSelectionSummary();
      });
    }

    async function init() {
      bindEvents();
      renderDocumentGrid();
      renderTemplateGallery();
      await refreshData();
      prepareDocumentWorkspace();
    }

    return {
      init,
      refreshData
    };
  }

  window.hrDocumentsModule = {
    createHrDocumentsModule
  };
})();

