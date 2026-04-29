const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getCompanies: () => ipcRenderer.invoke('get-companies'),
  addCompany: (company) => ipcRenderer.invoke('add-company', company),
  updateCompany: (company) => ipcRenderer.invoke('update-company', company),
  deleteCompany: (id) => ipcRenderer.invoke('delete-company', id),
  getPolicies: () => ipcRenderer.invoke('get-policies'),
  addPolicy: (policy) => ipcRenderer.invoke('add-policy', policy),
  updatePolicy: (policy) => ipcRenderer.invoke('update-policy', policy),
  deletePolicy: (id) => ipcRenderer.invoke('delete-policy', id),
  getEmployees: () => ipcRenderer.invoke('get-employees'),
  getNextEmployeeId: (companyId, excludeEmployeeId) => ipcRenderer.invoke('get-next-employee-id', companyId, excludeEmployeeId),
  addEmployee: (emp) => ipcRenderer.invoke('add-employee', emp),
  updateEmployee: (emp) => ipcRenderer.invoke('update-employee', emp),
  deleteEmployee: (id) => ipcRenderer.invoke('delete-employee', id),
  getAppAuthStatus: () => ipcRenderer.invoke('get-app-auth-status'),
  verifyAppPassword: (password) => ipcRenderer.invoke('verify-app-password', password),
  generateQrDataUrl: (text) => ipcRenderer.invoke('generate-qr-data-url', text),
  generatePayslipPdf: (data) => ipcRenderer.invoke('generate-payslip-pdf', data),
  generateHrDocumentPdf: (data) => ipcRenderer.invoke('generate-hr-document-pdf', data),
  generateIdCardPdf: (data) => ipcRenderer.invoke('generate-id-card-pdf', data)
});
