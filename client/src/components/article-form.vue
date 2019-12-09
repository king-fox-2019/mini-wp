<template>
  <div class="container" style="min-height: 83vh;">
    <wysiwyg v-model="myHTML"></wysiwyg>
    <div class="m-2">
      <button type="button" class="btn btn-primary">Create</button>
      <button type="button" class="btn btn-light">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-form',
  data: function () {
    return {
      myHTML: '',
    }
  },
}
</script>

<style>

</style>
