<template>
  <div class="contained">
    <p>READ</p>

    <!-- {{JSON.stringify(articles)}} -->
    <sui-item-group divided>
      <sui-item v-for="article in articles" :key="article._id">
        <!-- <sui-item-image size="small" src="static/images/wireframes/image.png" /> -->
        <img class="img" :src="article.image" />

        <sui-item-content>
          <sui-item-header class="title clickable"><span  @click="$router.push('/detail-article/' + article._id )">{{article.title}}</span></sui-item-header>
          <sui-item-meta>
            <span v-for="(tag, i) in article.tags" :key="i" class="tag">
              <a is="sui-label" tag>{{tag}}</a>
            </span>
          </sui-item-meta>
          <sui-item-description>
            <p>{{article.content.substring(0, 200)}} ...</p>
          </sui-item-description>
        </sui-item-content>
      </sui-item>
    </sui-item-group>
  </div>
</template>

<script>
export default {
  name: "Articles",
  data: function() {
    return {

    };
  },
  props: ["articles"]
  // computed: {
  //   truncated(str) {
  //     console.log(str, "mau gaa?");
      
  //     return `${str.substring(0, 25)}` + '...'
  //   }
  // }
};
</script>

<style scoped>
img {
  width: 130px;
  height: 127px;
  margin-right: 30px;
}
.title:hover {
  color:darkred !important;
}
</style>