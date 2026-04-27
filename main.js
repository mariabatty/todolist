const { app, BrowserWindow } = require('electron');
const path = require('path');

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 600,
    height: 700,
    icon: path.join(__dirname, 'favicon.png'),
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});