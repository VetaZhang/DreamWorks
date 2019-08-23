'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const ipc = require('./lib/ipc');
const { openMainWindow } = require('./lib/window');

let mainWindow = null;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  openMainWindow();
});
