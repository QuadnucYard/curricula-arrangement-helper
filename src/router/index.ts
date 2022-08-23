import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  Router,
  createWebHashHistory,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "/edit",
        name: "edit",
        meta: { keepAlive: true },
        component: () => import("@/views/edit/edit-curriculum.vue"),
      },
      {
        path: "/schedule",
        name: "schedule",
        meta: { keepAlive: true },
        component: () => import("@/views/schedule/schedule.vue"),
      },
    ],
  },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
