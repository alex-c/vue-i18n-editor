const state = {
  keys: [],
  master: null,
  translations: [],
};

const mutations = {
  SET_KEYS(state, keys) {
    state.keys = keys;
  },
  SET_MASTER(state, master) {
    state.master = master;
  },
  ADD_TRANSLATION(state, translation) {
    if (
      !state.translations.some((r) => r.name == translation.name) &&
      state.master.name != translation.name
    ) {
      state.translations.push(translation);
    }
  },
  REMOVE_TRANSLATION(state, name) {
    for (var i = 0; i < state.translations.length; i++) {
      if (state.translations[i].name === name) {
        state.translations.splice(i, 1);
        break;
      }
    }
  },
  RESET(state) {
    state.keys = [];
    state.master = null;
    state.translations = [];
  },
};

const actions = {
  setMaster({ commit }, master) {
    const [keys, values] = parseJson(master.lang);
    commit("SET_MASTER", { values, name: master.name });
    commit("SET_KEYS", keys);
  },
  addTranslation({ commit }, translation) {
    const [_, values] = parseJson(translation.lang);
    commit("ADD_TRANSLATION", { values, name: translation.name });
  },
  removeTranslation({ commit }, name) {
    commit("REMOVE_TRANSLATION", name);
  },
  reset({ commit }) {
    commit("RESET");
  },
};

function parseJson(json, keys, values, keyPath) {
  keys = keys || [];
  values = values || {};
  keyPath = keyPath || [];
  Object.entries(json).forEach(([key, value]) => {
    const newPath = keyPath.slice();
    newPath.push(key);
    const newKey = newPath.join(".");
    if (typeof value === "string") {
      keys.push(newKey);
      values[newKey] = value;
    } else if (typeof value === "object") {
      parseJson(value, keys, values, newPath);
    } else {
      throw new Error("Invalid value!"); // TODO
    }
  });
  return [keys, values];
}

export default {
  state,
  mutations,
  actions,
};
