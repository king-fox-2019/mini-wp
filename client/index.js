const baseUrl = "http://localhost:3000"
Vue.use(VueQuillEditor)
let app = new Vue({
  el: "#app",
  data: {
    page: 'allPosts',
    articles: [],
    submission: { title: "",  content: ""},
    newArticle: {},
    articleData: {},
    content: ""
  },
  methods: {
    fetchData() {
      axios({
        method: "get",
        url:  "http://localhost:3000/articles",
      })
        .then(articles => {
          this.articles = articles.data;
        })
        .catch(err => {
          console.log(err)
        })
    },

    createPost() {
      axios({
        method: "post",
        url: "http://localhost:3000/articles",
        data: {
          title: document.getElementById("title-input").value,
          content: this.content
        }
      })
        .then(post => {
          this.fetchData();
          this.page = "allPosts";
        })
        .catch(err => {
          console.log(err);
        })
    },

    editCanvas(articleId) {
      axios({
        method: "get",
        url: `http://localhost:3000/articles/${articleId}`
      })
        .then(article => {
          this.articleData = article.data;
          this.content = article.data.content
          this.changePage("edit");
        })
        .catch(err => {
          console.log(err)
        })
    },

    changePage(p) {
      this.page = p
      if (p === "allPosts") {
        this.fetchData()
      } else if (p === "canvas") {
        this.content = "";
      }
    },

    viewPost(articleId) {
      axios({
        method: "get",
        url: `http://localhost:3000/articles/${articleId}`
      })
      .then(article => {
        console.log(article.data)
        this.articleData = article.data;
        this.content = article.data.content;
        this.changePage("blog");
        
      })
      .catch(err => {
        console.log(err)
      })
    },
    
    editPost(articleId) {
      console.log(typeof articleId)
      console.log(`http://localhost:3000/articles/${articleId}`)
      axios({
        method: "patch",
        url: `http://localhost:3000/articles/${articleId}`,
        data: {
          title: document.getElementById("edit-title-input").value,
          content: this.content
        }
      })
        .then(article => {
          return axios({
            method: "get",
            url: `http://localhost:3000/articles/${articleId}`,
          })
        })
        .then(article => {
          this.articleData = article.data;
          this.changePage("blog")
        })
        .catch(err => {
        console.log(err)
      })
    },

    deletePost(articleId) {
      axios({
        method: "delete",
        url: `http://localhost:3000/articles/${articleId}`
      })
        .then(result => {
          this.fetchData()
        })
        .catch(err => {
          console.log(err)
        })
    }
    
  },
  components: {
    LocalQuillEditor: VueQuillEditor.quillEditor
  },
  created () {
    this.fetchData();  
  }
});
