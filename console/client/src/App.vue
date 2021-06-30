<template>
  <div class="dark">
    <router-view />
  </div>
</template>

<script lang="ts">
import '@fontsource/roboto';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'leaflet/dist/leaflet.css';
import './assets/scss/styles.scss';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
  }
})
</script>
