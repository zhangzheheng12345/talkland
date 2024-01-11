import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";

import "./global.css";
import "uno.css";

import Welcome from "./Welcome.vue";
import Home from "./Home.vue";

const routes = [
  { path: "/", component: Welcome },
  { path: "/home", component: Home },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
