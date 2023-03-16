const { app, BrowserWindow, globalShortcut, ipcMain, dialog } = require("electron");
const fs = require('fs')



const createWindow = () => {
   const win = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 700,
      minHeight: 500,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false, // desabilita o isolamento de contexto
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

   win.loadFile("./interface/index.html");

      // Monitora alterações em arquivos HTML e recarrega a janela principal
   fs.watch('./interface/index.html', () => {
      win.reload()
   })
   
   // Monitora alterações em arquivos CSS e recarrega a janela principal
   fs.watch('./interface/style.css', () => {
      win.reload()
   })

   app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
         createWindow();
      }
   });



   // ipcMain.on("load-albums", async (event) =>{
   //    const data = await loadAlbums();
   //    event.reply("message", { data })
   // })
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