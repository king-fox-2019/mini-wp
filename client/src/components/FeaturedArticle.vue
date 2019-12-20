<template>
<div>
  <featuredCard :articles="publishArticle" :isLogin="isLogin" @current-article="currentArticle" @fetch-bookmark="fetchBookmark"></featuredCard>
</div>
</template>

<script>

import featuredCard from './Card'

export default {
  components:{
    featuredCard
  },
  props: ['publishArticle', 'isLogin'],
  methods:{
    currentArticle(val){
      this.$emit('current-article', val)
    },
    fetchBookmark(){
      this.$emit('fetch-bookmark')
    }
  }
}
</script>

<style scoped>
</style>