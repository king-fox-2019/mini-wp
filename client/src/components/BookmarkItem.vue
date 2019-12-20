<template>
  <div>
    <div class="favotires d-flex" v-for="(data,index) in bookmark" :key="index">
      <div class="mr-3">{{index+1}}.</div>
      <img :src="data.featured_image" class="mr-3 img-bookmark" alt="">
      <p @click.prevent="goDetail(data._id)">{{ data.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['bookmark']
}
</script>

<style scoped>
.img-bookmark{
  width: 25px;
  height: 25px;
}
</style>