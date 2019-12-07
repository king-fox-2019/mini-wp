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
  },
  {
    path: "/addarticle",
    name: "AddArticle",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "AddArticle" */ "../components/AddArticle.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
