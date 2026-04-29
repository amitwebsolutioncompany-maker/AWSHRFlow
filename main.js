const fs = require('fs');
const path = require('path');
const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');
const QRCode = require('qrcode');
const db = require('./utils/db');
const authStore = require('./utils/authStore');

function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    height: 800,
    icon: path.join(__dirname, 'assets/icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('renderer/index.html');
}

async function exportHtmlToPdf({
  html,
  defaultFileName = 'document.pdf',
  subdirectory = 'Exports',
  askForPath = false
}) {
  const win = new BrowserWindow({
    show: false,
    webPreferences: { offscreen: true }
  });

  try {
    await win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);

    const pdfBuffer = await win.webContents.printToPDF({
      printBackground: true,
      preferCSSPageSize: true,
      pageSize: 'A4',
      margins: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    const defaultDir = path.join(app.getPath('documents'), subdirectory);
    if (!fs.existsSync(defaultDir)) {
      fs.mkdirSync(defaultDir, { recursive: true });
    }

    let targetPath = path.join(defaultDir, defaultFileName);

    if (askForPath) {
      const saveResult = await dialog.showSaveDialog({
        title: 'Save PDF',
        defaultPath: targetPath,
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
      });

      if (saveResult.canceled || !saveResult.filePath) {
        return { canceled: true };
      }

      targetPath = saveResult.filePath;
    }

    fs.writeFileSync(targetPath, pdfBuffer);
    await shell.openPath(targetPath);

    return {
      canceled: false,
      filePath: targetPath
    };
  } finally {
    win.close();
  }
}

app.whenReady()
  .then(async () => {
    await db.init();
    createWindow();
    authStore.init().catch((error) => {
      console.error('Background auth init failed:', error);
    });
  })
  .catch((error) => {
    console.error('App startup failed:', error);
    app.quit();
  });

ipcMain.handle('get-companies', () => db.getCompanies());
ipcMain.handle('add-company', (event, company) => db.addCompany(company));
ipcMain.handle('update-company', (event, company) => db.updateCompany(company));
ipcMain.handle('delete-company', (event, id) => db.deleteCompany(id));
ipcMain.handle('get-policies', () => db.getPolicies());
ipcMain.handle('add-policy', (event, policy) => db.addPolicy(policy));
ipcMain.handle('update-policy', (event, policy) => db.updatePolicy(policy));
ipcMain.handle('delete-policy', (event, id) => db.deletePolicy(id));
ipcMain.handle('get-employees', () => db.getEmployees());
ipcMain.handle('get-next-employee-id', (event, companyId, excludeEmployeeId) => db.getNextEmployeeId(companyId, excludeEmployeeId));
ipcMain.handle('add-employee', (event, emp) => db.addEmployee(emp));
ipcMain.handle('update-employee', (event, emp) => db.updateEmployee(emp));
ipcMain.handle('delete-employee', (event, id) => db.deleteEmployee(id));
ipcMain.handle('get-app-auth-status', () => authStore.getStatus());
ipcMain.handle('verify-app-password', async (event, password) => authStore.verifyPassword(password));
ipcMain.handle('generate-qr-data-url', (event, text) => QRCode.toDataURL(String(text || ''), {
  errorCorrectionLevel: 'M',
  margin: 1,
  width: 220,
  color: {
    dark: '#0f172a',
    light: '#ffffff'
  }
}));

ipcMain.handle('generate-payslip-pdf', async (event, data) => {
  const htmlPath = path.join(__dirname, 'renderer/pdfTemplate.html');
  const cssPath = path.join(__dirname, 'renderer/pdf.css');

  let html = fs.readFileSync(htmlPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const fallbackLogoPath = path.join(__dirname, 'renderer/logo.png');
  const fallbackLogoBase64 = fs.readFileSync(fallbackLogoPath).toString('base64');
  const logoMarkup = data.templateData.COMPANY_LOGO_DATA
    ? `<img src="${data.templateData.COMPANY_LOGO_DATA}" class="company-logo" alt="Company Logo">`
    : `<img src="data:image/png;base64,${fallbackLogoBase64}" class="company-logo" alt="Company Logo">`;

  html = html.replace('</head>', `<style>${css}</style></head>`);
  html = html.replace('{{COMPANY_LOGO}}', logoMarkup);

  Object.entries(data.templateData).forEach(([key, value]) => {
    html = html.replaceAll(`{{${key}}}`, String(value ?? ''));
  });

  const fileName = `${data.employeeName}_${data.month}_${data.year}_Payslip.pdf`;

  return exportHtmlToPdf({
    html,
    defaultFileName: fileName,
    subdirectory: 'Payslips',
    askForPath: false
  });
});

ipcMain.handle('generate-hr-document-pdf', async (event, data) => {
  return exportHtmlToPdf({
    html: data.html,
    defaultFileName: data.fileName,
    subdirectory: 'HR Documents',
    askForPath: true
  });
});

ipcMain.handle('generate-id-card-pdf', async (event, data) => {
  return exportHtmlToPdf({
    html: data.html,
    defaultFileName: data.fileName,
    subdirectory: 'ID Cards',
    askForPath: true
  });
});
