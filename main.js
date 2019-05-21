const path = require("path");
const url = require("url");
const electron = require("electron");
const { app, dialog, Menu, BrowserWindow, BrowserView } = electron;

// Logging Errors
logErrors = [];

const logErr = err => logErrors.push(err);

let mainWindow;
let template;

function createMenu() {
  template = [
    {
      label: "File",
      submenu: [{ label: "New Project", role: "New" }, { role: "Save" }]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "past" },
        { role: "reload" }
      ]
    },
    { label: "View", submenu: [{ role: "toggledevtools" }] }
  ];
  // Create Menu
  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({ width: 1280, height: 768 });

  // and load index.html of the app
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  exports.mainWindow = mainWindow;
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/* CREATES A NEW BROWSER WINDOW AND RETURNS THE HANDLER */

exports.createNewWindow = (
  page,
  config = { width: 1280, height: 768 },
  parentWD = mainWindow
) => {
  let init = true;

  try {
    if (!parentWD) throw "ParentWindowNull";
  } catch (err) {
    init = false;
    dialog.showErrorBox("Warning!", err);
  }

  if (parentWD == "standalone") parentWD = null;

  if (init) {
    let newWindow = new BrowserWindow({
      config,
      parent: parentWD,
      modal: true
    });

    newWindow.loadURL(url.format({}));
  }
};
