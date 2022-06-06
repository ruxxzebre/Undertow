import { createRouter, createWebHashHistory } from "vue-router";
import { getRoutes } from "./routes";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: getRoutes(['component', 'path']),
});
