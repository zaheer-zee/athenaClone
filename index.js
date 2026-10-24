const { app, BrowserWindow, session, desktopCapturer, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  const distIndexPath = path.join(__dirname, 'frontend', 'dist', 'index.html');

  if (app.isPackaged) {
    win.loadFile(distIndexPath);
  } else {
    win.loadURL('http://localhost:5173').catch(() => {
      if (fs.existsSync(distIndexPath)) {
        win.loadFile(distIndexPath);
      }
    });
  }

  // Handle permission requests for camera and microphone
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === 'media') {
      callback(true); // Automatically grant camera/microphone if requested by the frontend
    } else {
      callback(false);
    }
  });

  // Handle screen sharing requests specifically
  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
      // Grant access to the first available screen
      if (sources && sources.length > 0) {
        callback({ video: sources[0], audio: 'loopback' });
      } else {
        callback(null);
      }
    }).catch((err) => {
      console.error('Error getting desktop sources:', err);
      callback(null); // Deny on error
    });
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
ipcMain.handle('show-rules', async () => {
  const res = await dialog.showMessageBox(win, {
    
  })
})