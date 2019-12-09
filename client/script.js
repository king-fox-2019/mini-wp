const BASE_URL = 'http://localhost:3000/'

new Vue({
  el: '#app',
  data: {
    username: 'Development',
    articles: [],
    article: {
      _id: '',
      title: '',
      description: '',
    },
    whatToDisplay: 'articles', // articles, singel-article, show-form
    formTitle: '',
    buttonContent: '',
    isEdit: false,
  },
  methods: {
    fetchAllArticles() {
      axios({
        url: `${BASE_URL}articles`,
        method: 'get'
      })
        .then(({ data }) => {
          this.articles = data
        })
        .catch(err => console.log(err))
    },
    createNewArticle() {
      axios({
        url: `${BASE_URL}articles`,
        method: 'post',
        data: {
          title: this.article.title,
          description: this.article.description,
        }
      })
        .then(() => {
          this.fetchAllArticles()
          this.showArticles()
        })
        .catch(err => console.log(err))
    },
    deleteArticle(articleId) {
      axios({
        url: `${BASE_URL}articles/${articleId}`,
        method: 'delete'
      })
        .then(({ data }) => {
          this.fetchAllArticles()
        })
        .catch(err => console.log(err))
    },
    updateArticle() {
      axios({
        url: `${BASE_URL}articles/${this.article._id}`,
        method: 'put',
        data: {
          title: this.article.title,
          description: this.article.description,
        }
      })
        .then(({ data }) => {
          this.fetchAllArticles()
          this.showArticles()
        })
        .catch(err => console.log(err))
    },
    showForm(article) {
      if (article) {
        this.formTitle = 'Edit Article'
        this.buttonContent = 'Edit',
        this.isEdit = true
        this.article = article
      } else {
        this.formTitle = 'Create new Article'
        this.buttonContent = 'Create'
        this.isEdit = false
        this.article = { _id: '', title: '', description: '' }
      }
      this.whatToDisplay = 'show-form'
    },
    showArticles() {
      this.whatToDisplay = 'articles'
    },
    showSingelArticle(article) {
      this.singelArticle = article
      this.whatToDisplay = 'singel-article'
    },
  },
  created() {
    this.fetchAllArticles()
  },
})
