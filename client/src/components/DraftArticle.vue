<template>
  <div>
    <draftArticle :draft="draftArticle"
    @edit-article="editArticle"
    @go-draft="goDraft"></draftArticle>
  </div>
</template>

<script>

import draftArticle from './DraftItem'

export default {
  components:{
    draftArticle
  },
  props: ['draftArticle'],
  methods:{
    editArticle(id){
      this.$emit('edit-article',id)
    },
    goDraft(id){
      this.$emit('go-draft', id)
    }
  }
}
</script>

<style>

</style>