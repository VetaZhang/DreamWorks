/***
 * By Veta
 * 负责窗口的管理，如开启和关闭
 */

const { BrowserWindow } = require('electron');

let mainWindow;
let editorWindows = {};

const transToQuery = (options) => {
  let query = [];
  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      query.push(`${key}=${options[key]}`);
    }
  }
  return `?${query.join('&')}`;
};

exports.openMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'DreamWorks',
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.openDevTools();
  // mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.loadURL('http://localhost:8080');
  mainWindow.on('closed', () => {
    console.log('main window closed');
    mainWindow = undefined;
  });
};

/***
 * winId: String
 * page: 'editor' | 'main'
 * path: undefined | String
 */
exports.openEditorWindow = (options) => {
  options.winId = `_${new Date().getTime()}`;
  options.page = 'editor';
  const query = transToQuery(options);
  const editorWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'DreamWorks',
    webPreferences: {
      nodeIntegration: true,
    },
  });
  editorWindow.openDevTools();
  // editorWindow.loadURL('file://' + __dirname + '/index.html');
  editorWindow.loadURL('http://localhost:8080' + query);
  editorWindow.on('closed', () => {
    delete editorWindows[options.winId];
    console.log('editor window closed, id: ' + options.winId);
  });
  editorWindows[options.winId] = editorWindow;
  mainWindow.close();
};
