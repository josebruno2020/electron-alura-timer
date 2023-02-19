const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const path = require("path");
const data = require("./src/data");
const template = require("./src/template");

let tray;
let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(`${__dirname}/app/index.html`);
};

app.whenReady().then(() => {
  createWindow();
  tray = new Tray(`${__dirname}/app/img/icon.png`);
  const trayMenu = template.trayTemplate(win);
  tray.setContextMenu(trayMenu);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

let aboutWin;

ipcMain.on("open-about", () => {
  if (!aboutWin) {
    aboutWin = new BrowserWindow({
      width: 400,
      height: 300,
      alwaysOnTop: true,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    aboutWin.on("closed", () => {
      aboutWin = null;
    });
  }

  aboutWin.loadFile(`${__dirname}/app/sobre.html`);
});

ipcMain.on("about-close", () => {
  if (aboutWin) {
    aboutWin.close();
  }
});

ipcMain.on("pause", async (e, curso, timePass) => {
  data.save(curso, timePass);
});
