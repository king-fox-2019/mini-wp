<template>
  <div>
    <draftArticle :draft="draftArticle"></draftArticle>
  </div>
</template>

<script>

import draftArticle from './DraftItem'

export default {
  components:{
    draftArticle
  },
  props: ['draftArticle']
}
</script>

<style>

</style>