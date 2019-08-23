const getDefaultScript = () => {
  return Object.assign({}, {
    time: '',
    position: '',
    place: '',
    character: [],
    content: ''
  });
};

export default {
  updateScript(state, {newValue, index}) {
    state.scripts.splice(index, 1, newValue);
  },
  addPrev(state, currentIndex) {
    state.scripts.splice(state.currentScript, 0, getDefaultScript());
  },
  addNext(state) {
    state.scripts.splice(state.currentScript + 1, 0, getDefaultScript());
  },
  creatScript(state) {
    state.scripts.push(getDefaultScript());
  },
  removeScript(state) {
    state.scripts.splice(state.currentScript, 1);
    if (!state.scripts[state.currentScript]) {
      state.currentScript = state.scripts.length - 1;
    }
  },
  updateIndex(state, index) {
    state.currentScript = index;
  }
};
