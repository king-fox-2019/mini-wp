<template>
<div class="container">
    <!-- ======================= -->
    <b-carousel style="margin-bottom:30px">
        <b-carousel-item v-for="(article, i) in articles" :key="i">
            <span class="image" style="height:400px">
              <img :src="article.imgUrl">
            </span>
        </b-carousel-item>           
    </b-carousel>
    <!-- ========================= -->

<div class="tile is-ancestor">
  <div class="tile is-vertical is-8">
    <div class="tile is-parent">
      <article class="tile is-child notification" style="background-color: white">
        <div class="content">
          <!-- Content -->
            <div class="content" style="margin-bottom:30px" v-for="(article, i) in articles" :key="i">
            <h3 class="detail" @click="showDetail(article)" >
                {{ article.title }}
            </h3>
            <p><i><b>{{ article.userId.name}}</b></i> | {{ formatDate(article.createdAt) }}</p>
            <p class="limit" v-html="article.content">
            </p>
            </div>
        </div>
      </article>
    </div>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child notification" style="background-color: white">
      <div class="content">
        <b-field>
            <form @submit.prevent="fetchArticleByTag">
            <b-input placeholder="Search By Tag"
                v-model="tag"
                type="search"
                icon-pack="fas"
                icon="search"
                
                >
            </b-input>
            </form>
        </b-field>
        <p class="title">Tag</p>
        <p class="subtitle">With even more content</p>
        <div class="content">
          <!-- Content -->
        <template>
        <b-taglist v-for="(tag, i) in tags" :key="i" attached>
            <b-tag type="is-dark">{{tag}}</b-tag>
            <b-tag type="is-primary">{{qty[i]}}</b-tag>
        </b-taglist>
        </template>
        </div>
      </div>
    </article>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
    name: 'homepage',
    data(){
        return {
            articles: [],
            tag: '',
            tags: [],
            qty: [],
            images: []
        }
    },
    methods: {
      formatDate(date) {
          return moment(date).fromNow()
        },
      fetchArticle() {
        this.tags = [],
        this.qty = []
        axios({
          method: 'GET',
          url: `${this.$baseUrl}/articles`
        })
        .then(({data}) => {
          let obj = {}
          for (let i=0; i<data.length; i++) {
              for (let j=0; j<data[i].tags.length; j++) {
                if (!obj[data[i].tags[j]]) obj[data[i].tags[j]] = 0
                obj[data[i].tags[j]] ++
              }
          }
          for (let key in obj) {
            this.tags.push(key)
            this.qty.push(obj[key])
          }
          this.articles = data
        })
        .catch(err => {
          const error = err.response.data.error.join('\n')
          this.$swal({
              title: `<span style="color:#FFFFFF; font-size:15px">${error}</span>`,
              })        
        })
      },
      fetchArticleByTag() {
        if (this.tag === '') this.fetchArticle()
        axios({
          method: 'GET',
          url: `${this.$baseUrl}/articles/tag/${this.tag}`,
        })
        .then(({data}) => {
          console.log(data, '>>>>>>>>')
          this.articles = data
        })
        .catch(err => {
          const error = err.response.data.error.join('\n')
          this.$swal({
              title: `<span style="color:#FFFFFF; font-size:15px">${error}</span>`,
              })        
        })      
      },
      showDetail(article) {
        this.$emit('showdetail', article)
      }
    },
    created() {
      this.fetchArticle()
    }
}
</script>

<style scoped>
.limit {
  overflow: hidden;
  position: relative;
  line-height: 1em;
  max-height: 4.9em;
  text-align: justify;
  margin-right: -1em;
  padding-right: 1em;
}
.limit:before {
  content: '...';
  position: absolute;
  right: 0;
  bottom: 0;
}
.limit:after {
  content: '';
  position: absolute;
  right: 0;
  width: 1em;
  height: 1em;
  margin-top: 0.2em;
  background: white;
}
</style>