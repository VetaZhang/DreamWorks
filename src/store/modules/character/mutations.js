export default {
  appendFaction(state, faction, rootState) {
    state.factions.push(faction);
  },
  removeFaction(state, index) {
    state.factions.splice(index, 1);
  },
  appendCharacter(state) {
    state.list.push({
      name: '新人物',
      // from: '',
      desc: ''
    });
  },
  removeCharacter(state, index) {
    state.list.splice(index, 1);
  },
  setIndex(state, index) {
    state.index = index;
  }
};
