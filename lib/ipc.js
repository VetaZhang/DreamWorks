const { ipcMain } = require('electron');
const { openEditorWindow } = require('./window');

ipcMain.on('open', (event, options) => {
  // event.sender.send('born', options);
  console.log('open: ', options);
  openEditorWindow(options);
});
