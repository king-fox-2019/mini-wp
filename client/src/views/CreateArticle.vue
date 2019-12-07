<template>
  <div>
      <div class="container">
          <div class="mt-3">
            <h1 class="mb-2">Create Article</h1>
            <label for="article-title"><h3>Title</h3></label>
            <form id="create-article">
                <input type="text" id="article-title" placeholder="Input your title" class="form-control mb-3">
                <wysiwyg v-model="myHTML"></wysiwyg>
            </form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            myHTML : ''
        }
    }
}
</script>

<style>

</style>