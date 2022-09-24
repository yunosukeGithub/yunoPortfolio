import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import FriendView from "../views/FriendView.vue";
import ChatView from "../views/ChatView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
// import RoomView from "@/views/RoomView.vue";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/friend",
    name: "friend",
    component: FriendView,
  },
  {
    path: "/chat",
    name: "chat",
    component: ChatView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiredAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiredAuth) {
    const getUser = sessionStorage.getItem("user");
    console.log(JSON.parse(getUser));
    if (!getUser) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // next() を常に呼び出すようにしてください!
  }
});

export default router;

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (!user) {
//     next({
//       path: "/login",
//       query: { redirect: to.fullPath },
//     });
//   } else {
//     next();
//   }
// });
