const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 500,
    frame: false,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

ipcMain.on("minimize-window", () => {
  if (win) win.minimize();
});

ipcMain.on("close-window", () => {
  if (win) win.close();
});
