const { ipcRenderer } = require('electron');

// ipcRenderer.on('born', (event, person) => {
//   console.log(person, 'born');
// });



export const open = (options) => {
  ipcRenderer.send('open', options);
};
