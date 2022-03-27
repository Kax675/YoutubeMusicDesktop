const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
const path = require('path')
let win 
const contextMenu = Menu.buildFromTemplate([
    { label: 'Show', click:  function(){
        win.show();
    } },
    { label: 'Quit', click:  function(){
        app.quit();
    } }
]);

function createWindow () {
   win = new BrowserWindow({
    width: 1400,
    height: 800,
    icon: 'icons/logo.png',
    frame: false,
    transparent: true,
    webPreferences: {
      webviewTag: true,
      webSecurity: true,
        nodeIntegration: true,
        contextIsolation: false,
        devTools: false
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  tray = new Tray(path.join(__dirname, 'icons/logo.png'))
  tray.setContextMenu(contextMenu)
  tray.setToolTip('YouTube Music')
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('close-app', () => {
    win.hide()
    }
)
ipcMain.on('minimize-app', () => {
    win.minimize()
    }
)