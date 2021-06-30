import { useStore } from "vuex";

export const useMap = () => {
  const store = useStore();

  const bindMap = async (id: string) => {
    await store.dispatch('map/createMap', id);
  }

  const unbindMap = async () => {
    store.state.map.off();
    store.state.map.remove();

    await store.dispatch('map/destroyMap', null);
  }

  return {
    bindMap,
    unbindMap
  }
}