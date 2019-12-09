<template>
   <div class="d-flex flex-column px-4 mt-4">
      <!-- <div id="link-wrapper" class="px-3 mt-3"> -->
      <a href="" class="py-2" v-on:click.prevent="changePage('articleList')">Article list</a>
      <a href="" class="py-2" v-on:click.prevent="changePage('articleWrite')">Write new article</a>
      <a href="" class="py-2" v-on:click.prevent="changePage('articleEdit')">Edit</a>
      <!-- </div> -->
   </div>
</template>

<script>
export default {
   name: 'leftNavbar',
   methods: {
      changePage(pageName) {
         this.$emit('updatePage', pageName)
      }
   }
}
</script>

<style scoped>
   a:hover {
      text-decoration: none;
      color: #2D3748;
   }

   a {
      color: #718096;
   }
</style>