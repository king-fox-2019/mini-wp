<template>
  <div>
    <Menu></Menu>
    <p>ini main page rencananya</p>
  </div>
</template>

<script>
import Menu from "../components/Menu"
export default {
  name: 'MainPage',
  data: function() {
    return {
      message : 'Hello Vue!',
      articles : [],
      searchTitle : '',
      baseURL : `http://localhost:3000`
    }
  },
  methods: {
    changeMessage() {
      this.message = 'Welcome to Brightly'
    },
    selectedArticle() {
      axios({
        method: 'GET',
        url: `${this.baseURL}/articles?title=${this.searchTitle}`
      })
        .then(({ data }) => {
          this.articles = data
        })
        .catch(err => {
          console.log(err);
          
        })
    },
    fetchArticle() {
      axios({
        method: 'GET',
        url: `${this.baseURL}/articles`
      })
        .then(({ data }) => {
          this.articles = data
        })
    },
    setSection(section) {
      this.section = section
    },
    setPage(page) {
      this.$emit('setPage', page)
    }
  },
  components: {
    Menu
  },
  created() {
    this.fetchArticle
  },
  watch: {
    section() {
      if (this.section === 'article') {
        this.fetchArticle()
      }
    }
  },
  computed: {
    filteredArticles() {
      console.log(this.articles.filter(el => {
        el.title.includes(this.searchTitle)
      }), "<<");
      //regex match
      return this.articles
    }
  }
}
</script>

<style>

</style>