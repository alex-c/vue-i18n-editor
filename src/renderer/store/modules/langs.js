const state = {
  master: null,
  translations: []
};

const mutations = {
  SET_MASTER(state, master) {
    state.master = master;
  },
  ADD_TRANSLATION(state, lang) {
    state.translations.push(lang);
  },
  RESET(state) {
    state.translations.length = 0;
    state.master = null;
  }
};

const actions = {
  setMaster({ commit }, master) {
    commit("SET_MASTER", master);
  },
  addTranslation({ commit }, translation) {
    commit("ADD_TRANSLATION", translation);
  },
  reset({ commit }) {
    commit("RESET");
  }
};

export default {
  state,
  mutations,
  actions
};
