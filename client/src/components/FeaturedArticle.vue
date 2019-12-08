<template>
<div>
  <featuredCard :articles="publishArticle" :isLogin="isLogin"></featuredCard>
</div>
</template>

<script>

import featuredCard from './Card'

export default {
  components:{
    featuredCard
  },
  props: ['publishArticle', 'isLogin']
}
</script>

<style scoped>
</style>