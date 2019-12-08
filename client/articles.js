new Vue({
  el: '#articles',
  data: {
    articles: [],
  },
  methods: {
    fetchData() {
      axios({
        url: 'http://localhost:3000/articles',
        method: 'get'
      })
        .then(({ data }) => {
          this.articles = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.fetchData()
  }
})