'use strict';
const BASE_URL = 'http://localhost:3000'

const miniWp = new Vue({
  el: "#body",
  data: {
    page: "home",
    nav: "mySite",
    showPost: false,
    article: "",
    content: "",
    blogposts: [
      {
        id: 1,
        title: "Belajar Vue.js",
        article: "Baca dokumentasi"
      },
      {
        id: 2,
        title: "Belajar Vue.js",
        article: "Nonton yucup"
      }
    ]
  },
  methods: {
    toggleMySite: function() {
      this.nav = "mySite";
    },
    toggleReader: function() {
      this.nav = "reader";
    },
    openWriteForm: function() {
      this.page = "create";
    },
    showBlogPost: function() {
      this.fetchData();
      this.page = "showPost";
    },
    fetchData: function() {
        axios({
          method: "GET",
          url: "http://localhost:3000/article"
        })
          .then(({ data }) => {
            this.blogposts = data;
          })
          .catch(_ => {
            console.log(_);
          });
    },
    addPost: function() {
      let newPost = {
        title: this.article,
        content: this.content
      };
      axios({
        method: 'POST',
        url: `${BASE_URL}/article`,
        data: {
          title: "hai",
          content: "halo"
        }
      })
        .then( ( { data } ) => {
          console.log(data)
        } )
        .catch(err=> console.log(err))
    }
  }
});
