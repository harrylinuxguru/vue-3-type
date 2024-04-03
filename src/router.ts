import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/Login",
    name: "Login",
    component: () => import("./components/Login.vue"),
    meta: { requiresAuth: true } 
  },
  {
    path: "/",
    alias: "/tutorials",
    name: "tutorials",
    component: () => import("./components/TutorialsList.vue"),
    // meta: { requiresAuth: true } 
  },
  {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: () => import("./components/TutorialDetails.vue"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddTutorial.vue"),
    meta: { requiresAuth: true } 
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
