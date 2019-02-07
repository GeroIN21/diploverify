import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState(),
  ],
  state: {
    token: null,
    serial: null,
    year: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setSerial(state, serial) {
      state.serial = serial;
    },
    setYear(state, year) {
      state.year = year;
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setSerial({ commit }, serial) {
      commit('setSerial', serial);
    },
    setYear({ commit }, year) {
      commit('setYear', year);
    },
  },
});
