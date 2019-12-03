const miniWp = new Vue({
  el: "#body",
  data: {
    page: "home",
    nav: "mySite",
    showPost: false,
    article: "",
    content: "",
    blogposts: []
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
        url: "http://localhost:3000/posts"
      })
        .then(({ data }) => {
          this.blogposts = data;
        })
        .catch(_ => {
          console.log(_);
        });
    }
  }
});


