import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { routeSerialize } from "./utils.ts";

const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts"],
  {
    eager: true,
  },
);

let routes1: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("../view/index.vue"),
  },
];

// 拿到导出的路由
Object.keys(modules).forEach((key) => {
  routes1.push(modules[key].default);
});

routes1 = routeSerialize(routes1);

console.log(routes1);

const router = createRouter({
  history: createWebHistory(),
  routes: routes1,
});

export default router;
