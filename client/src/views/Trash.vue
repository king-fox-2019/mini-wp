<template>
  <div class="container">
      <div class="mb-4">
        <h1>Recently Deleted Articles</h1>
        <small class="text-muted">Articles deleted here will be deleted permanently.</small>
      </div>
      <div class="row my-3" v-for="(article, i) in articles" :key="i">
          <div class="col-3" v-html="featuredImages[i]"></div>
          <div class="col-7">
            {{article.title}}
          </div>
          <div class="col-1">
            <button class="btn btn-primary" @click.prevent="restoreArticle(article._id)">Restore</button>
          </div>
          <div class="col-1">
            <button class="btn btn-warning">Delete</button>
          </div>
      </div>
  </div>
</template>

<script>
import axios from '../../config/axios'
export default {
    name: 'trash',
    data () {
        return {
            featuredImages: [],
            articles: []
        }
    },
    methods: {
      fetchTrashedArticles () {
        axios({
          method: 'get',
          url: `/articles`,
          headers: {
            authorization: localStorage.getItem('jwt_token')
          },
          params: {
            trash: true
          }
        })
        .then( ({data}) => {
          data.forEach(item => {
            let elem = document.createElement('div');
            elem.innerHTML = item.content;
            let image = elem.querySelector("img");
            this.featuredImages.push(image.outerHTML);
          });

          this.articles = data;
        })
        .catch( error => {
          this.swal('error', error)
        })
      },
      restoreArticle (id) {
        axios({
            method: 'patch',
            url: `/articles/${id}/trash`,
            headers: {
                authorization: localStorage.getItem('jwt_token')
            },
            data: {
                trash: false
            }
        })
        .then( ({data}) => {
            let filtered = this.articles.filter( item => {
                if (item._id !== data._id) {
                    return item;
                }
            })
            this.articles = filtered;
            this.swal('success', 'Article restored successfully!')
        })
        .catch(error => {
            this.swal('error', error)
        })
      }
    },
    created () {
        this.fetchTrashedArticles()
    }
}
</script>

<style scoped>

</style>