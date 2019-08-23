export default {
  setSelected(state, file) {
    console.log(file)
    state.selected = file;
    if (file) {
      state[file.content.type] = file.content;
    }
  },
  updateDir(state, dir) {
    state.dir = dir;
  },
  setFiles(state, files) {
    state.files = files;
  },
  appendFile(state, file) {
    state.files.push(file);
  },
  removeFile(state, index) {
    state.files.splice(index, 1);
  },
  diffSelected(state) {
    console.log('diff');
    clearTimeout(state.debounce);
    state.debounce = setTimeout(() => {
      if (JSON.stringify(state.selected.content) === state.selected.origin) {
        state.selected.edited = false;
      } else {
        state.selected.edited = true;
      }
    }, 600);
  }
};
