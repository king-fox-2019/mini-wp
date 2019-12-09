<template>
  <div>
    <div class="favotires" v-for="(data,index) in bookmark" :key="index">
      <img :src="bookmark.featured_image" class="mr-3" alt="">
      <p>{{ bookmark.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['bookmark']
}
</script>

<style>

</style>