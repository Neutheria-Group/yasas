import { createStore } from 'vuex';
import { authStore } from "./authStore";
import { mapStore } from './mapStore';

export const store = createStore({
  modules: {
    auth: authStore,
    map: mapStore
  }
});