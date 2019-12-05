import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
console.log(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    children: [
      {
        path: "myarticles",
        name: "myarticles",
        component: () =>
          import(
            /* webpackChunkName: "myarticles" */ "../components/MyArticles.vue"
          )
      }
    ]
  },
  {
    path: "/addarticle",
    name: "addarticle",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "addarticle" */ "../views/AddArticle.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
