<template>
    <div>
      <div>
      <!-- Card -->
        <div class="card mb-3 article-card d-flex flex-column" v-for="(article,index) in articles" :key="index">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img :src="article.featured_image" class="card-img" alt="" style="maxHeight: 250px" height="250px">
            </div>
            <div class="col-md-8">
              <div class="card-body h-100 d-flex flex-column justify-content-between">
                <div class="mb-3">
                  <h5 class="card-title article-title" style="font-size: 20px; font-family: 'Noto Serif', serif;" @click.prevent="detailArticle(article._id)">{{ article.title }}</h5>
                  <p class="text-muted" style="font-size: 14px;"><small>{{ showDate(article.createdAt) }}</small></p>
                  <p class="card-text" v-html="setContent(article.content)" style="font-size: 16px"></p>
                </div>
                <div class="d-flex flex-column">
                  <div class="d-flex">
                    <span class="mr-2"><small><img :src="article.author.avatar" width="30px" height="30px" style="border-radius:50%"></small></span>
                    <span><small>{{ article.author.username }}</small></span>
                    <span class="mx-2">.</span>
                    <p class="card-text"><small class="text-muted">{{ setDate(article.createdAt) }}</small></p>
                  </div>
                  <div class="my-2" v-for="(data,index) in article.tags" :key="index">
                    <span class="badge badge-pill badge-info">{{data}}</span>
                  </div>
                  <div class="d-flex mt-2 justify-content-between" v-if="isLogin">
                    <div>
                      <span class="mr-3"><i class="far fa-heart"><small class="ml-2">{{ article.likes.length }}</small></i></span>
                      <span><i class="far fa-comment"><small class="ml-2">Comment</small></i></span>
                    </div>
                    <div>
                      <span><i class="far fa-bookmark" style="cursor: pointer; font-size: 18px"></i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Card -->
      </div>
    </div> 
</template>

<script>

import moment from 'moment'

export default {
    data (){
      return {
      }
    },
    props: ['articles', 'isLogin'],
    methods:{
      setDate(val){
        return moment(val).startOf('minutes').fromNow()
      },
      detailArticle(id){
        
      },
      setContent(val){
        let firstIndex = val.indexOf('>')
        let lastIndex = val.indexOf('&nbsp;')
        let content = val.slice(firstIndex+1, lastIndex+1)
        if(firstIndex == -1){
          return val
        }else{
          return `${content}...`
        }
      },
      showDate(date){
        return moment(date).format('LL')
      }
    }
}
</script>

<style scoped>
.article-card{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-top: 3px #B71C1C solid;
}

.article-card:hover{
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.article-title:hover{
  color: blue;
  cursor: pointer;
}
</style>