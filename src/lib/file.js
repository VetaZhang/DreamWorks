import fs from 'fs';
import os from 'os';
import { id } from './tools';
const { dialog } = require('electron').remote;

export const selectDir = () => {
  return new Promise(function(resolve, reject) {
    dialog.showOpenDialog(null, {
        properties: ['createDirectory', 'openDirectory']
      }, (dir) => {
        if (dir && dir.length >= 1) {
          resolve(dir[0]);
        }
      });
  });
};

// export const readStore = () => {
//   return new Promise(function(resolve, reject) {
//     const storePath = `${os.homedir()}/.dreamWorks`;
//     const storeExist = fs.existsSync(storePath);
//
//     if (storeExist) {
//       fs.readFile(storePath, function (err, buffer) {
//         if (err) reject(err);
//         else resolve(JSON.parse(buffer.toString()));
//       });
//     } else resolve({});
//   });
// };

// export const updateStore = (obj) => {
//   return readStore()
//     .then((store) => {
//       const newStoreString = JSON.stringify(Object.assign(store, obj), null, 2);
//       return new Promise(function(resolve, reject) {
//         const storePath = `${os.homedir()}/.dreamWorks`;
//         fs.writeFile(storePath, newStoreString, (err) => {
//           if (err) reject(err);
//           else resolve();
//         });
//       });
//     });
// };

export const readProject = (dir) => {
  let files = fs.readdirSync(dir);
  files = files.filter((filename) => /.dws$/.test(filename));

  return Promise.all(files.map((filename) => {
    return new Promise(function(resolve, reject) {
      readFile(`${dir}/${filename}`)
        .then((fileContent) => {
          fileContent = JSON.stringify(fileContent);
          resolve({
            // id: filename.replace('.dws', ''),
            path: `${dir}/${filename}`,
            edited: false,
            content: JSON.parse(fileContent),
            origin: fileContent
          });
        });
    });
  }));
};

export const readFile = (path) => {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, function (err, buffer) {
      if (err) reject(err);
      else resolve(JSON.parse(buffer.toString()));
    });
  });
};

export const createFile = (dir, content) => {
  return new Promise(function(resolve, reject) {
    const contentString = JSON.stringify(content, null, 2);
    const path = `${dir}/${id()}.dws`;
    fs.writeFile(path, contentString, (err) => {
      if (err) reject(err);
      else resolve({
        // id: filename.replace('.dws', ''),
        path,
        edited: false,
        content,
        origin: contentString
      });
    });
  });
};

export const saveFile = (path, content) => {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path, JSON.stringify(content, null, 2), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export const deleteFile = (path) => {
  return new Promise(function(resolve, reject) {
    fs.unlinkSync(path);
    resolve();
  });
};
