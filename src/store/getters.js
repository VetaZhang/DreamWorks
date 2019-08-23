export default {
  fileType(state) {
    return state.selected ? state.selected.content.type : '';
  },
  allCharacters(state) {
    let list = [];
    state.files.forEach((item) => {
      if (item.content.type === 'character') {
        list = list.concat(item.content.list.map((character) => {
          return character.name;
        }));
      }
    });

    return list;
  }
};
