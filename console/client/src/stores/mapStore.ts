import * as L from "leaflet";

export const mapStore = {
  namespaced: true,
  state: {
    map: null
  },
  mutations: {
    CREATE_MAP (state, elementId) {
      state.map = L.map(elementId);

      state.map.setView([47, 1], 6);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(state.map);
    },
    DESTROY_MAP (state) {
      if (state.map) {
        state.map.off();
        state.map.remove();
        state.map = null;
      }
    }
  },
  actions: {
    createMap ({ commit }, elementId) {
      commit('CREATE_MAP', elementId);
    },
    destroyMap ({ commit }) {
      commit('DESTROY_MAP');
    }
  }
}