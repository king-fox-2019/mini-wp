<template>
<div>
  <featuredCard :articles="publishArticle" :isLogin="isLogin" @current-article="currentArticle"></featuredCard>
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
    }
  }
}
</script>

<style scoped>
</style>