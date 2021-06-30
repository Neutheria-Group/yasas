import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'map', component: () => import('../views/Map.vue') },
    { path: '/', name: 'login', component: () => import('../views/Login.vue') }
  ] as RouteRecordRaw[]
});

export {
  router
};