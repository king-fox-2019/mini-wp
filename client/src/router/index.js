import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
console.log(VueRouter);

const routes = [
  {
    path: "/",
    name: "DashBoard",
    component: () =>
      import(/* webpackChunkName: "DashBoard" */ "../views/Dashboard.vue"),
    children: [
      {
        path: "myarticles",
        name: "MyArticles",
        component: () =>
          import(
            /* webpackChunkName: "MyArticles" */ "../components/MyArticles.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
