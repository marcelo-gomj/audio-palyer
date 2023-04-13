const { app, BrowserWindow, globalShortcut, ipcMain, dialog } = require("electron");
const { watch } = require('fs')

const createWindow = () => {
   const win = new BrowserWindow({
      width: 1000,
      height: 600,
      minWidth: 900,
      minHeight: 600,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
      }
   });

   win.removeMenu();

   globalShortcut.register('CommandOrControl+R', () => {
      win.reload()
   })

   globalShortcut.register('CmdOrCtrl+Shift+I', () => {
      const { webContents } = win
      if (!webContents.isDevToolsOpened()) {
         webContents.openDevTools()
      } else {
         webContents.closeDevTools()
      }
   })

   win.loadURL("http://localhost:3000");

   watch('./dist/index.html', () => {
      win.reload()
   })

   app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
         createWindow();
      }
   });
}

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
})

app.whenReady().then(() => {
   createWindow()
})

ipcMain.handle('open-dialog', async (event, options) => {
   const result = await dialog.showOpenDialog(options)
   return result.filePaths
})

ipcMain.handle('get-user-data-path', (event) => {
   return app.getPath('userData');
});