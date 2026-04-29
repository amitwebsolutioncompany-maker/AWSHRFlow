const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getCompanies: () => ipcRenderer.invoke('get-companies'),
  addCompany: (company) => ipcRenderer.invoke('add-company', company),
  updateCompany: (company) => ipcRenderer.invoke('update-company', company),
  deleteCompany: (id) => ipcRenderer.invoke('delete-company', id),
  getEmployees: () => ipcRenderer.invoke('get-employees'),
  addEmployee: (emp) => ipcRenderer.invoke('add-employee', emp),
  updateEmployee: (emp) => ipcRenderer.invoke('update-employee', emp),
  deleteEmployee: (id) => ipcRenderer.invoke('delete-employee', id),
  generatePayslipPdf: (data) => ipcRenderer.invoke('generate-payslip-pdf', data),
  generateHrDocumentPdf: (data) => ipcRenderer.invoke('generate-hr-document-pdf', data)
});
