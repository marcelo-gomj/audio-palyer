const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
// const { loadAlbums } = require("./loadAlbums");

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

