import common from './modules/common/state';
import character from './modules/character/state';
import movie from './modules/movie/state';

import { readProject, createFile, saveFile, readFile, deleteFile } from '../lib/file';

const defaultState = {
  common,
  character,
  movie
};

export default {
  readProject({ commit, state }) {
    if (state.dir) {
      readProject(state.dir)
        .then((files) => {
          console.log('files: ', files)
          commit('setFiles', files);
        });
    }
  },
  createFile({ commit, state }, type) {
    if (defaultState[type]) {
      return createFile(state.dir, defaultState[type])
        .then((file) => {
          commit('appendFile', file);
        });
    }
  },
  deleteFile({ commit, state }, payload) {
    if (state.selected && payload.path === state.selected.path) {
      commit('setSelected', null);
    }
    return deleteFile(payload.path)
      .then(() => {
        commit('removeFile', payload.index);
      });
  },
  selectFile({ commit }, file) {
    commit('setSelected', file)
  },
  saveFile({}, file) {
    return saveFile(file.path, file.content)
      .then(() => {
        file.edited = false;
      });
  }
};
