<template>
  <div>
    <div class="card tags-wrapper" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">List Tags</h5>
        <hr>
        <ul>
          <li class="mb-2 tag-article" v-for="(tag,index) in tags" :key="index" @click.prevent="searchArticle(tag)">
             {{ index+1 }}. {{ tag }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tags'],
  methods:{
    searchArticle(tag){
      this.$emit('search-article', tag)
    }
  }
}
</script>

<style scoped>
.tags-wrapper{
  height: 300px;
  max-height: 300px;
  overflow: auto;
}

.tag-article:hover{
  cursor: pointer;
  color: brown;
}
</style>