<template>
  <div id="map"></div>
</template>

<script>
  import { onMounted, onBeforeUnmount } from "vue";
  import { useMap } from "../hooks/useMap";

  export default {
    setup () {
      const {
        bindMap,
        unbindMap
      } = useMap();

      onMounted(() => bindMap('map'));
      onBeforeUnmount(() => unbindMap());
    }
  }
</script>

<style scoped>
  #map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>