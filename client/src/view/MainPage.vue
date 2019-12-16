<template>
  <div id="main-div-for-body">
      
    <h1>HALO WORLD</h1>
    <div v-for="(article, i) in ArticleData" :key = i>
      <div>
        <!-- <h4>{{article.title}}</h4> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  props: ["ArticleData"],
  data() {
    return {

    }
  },
  methods: {}
};
</script>

<style scoped>
#main-div-for-body{
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: blueviolet;
  width: 92.5vw;
  height: 90vh;
}
</style>