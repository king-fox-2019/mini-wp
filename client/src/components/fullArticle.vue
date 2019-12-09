<template>
  <div class="ui right aligned grid">
    <div class="right floated left aligned twelve wide column" id="column">
      <h3 class="ui header">{{ article.title }}</h3>
      <h5 class="ui header">{{ article.tags }}</h5>
      <h6 class="ui header">{{ article.createdAt }}</h6>
      <img :src="article.image" />
      <p>{{ article.content }}</p>
      <div class="ui right floated primary button" @click="deleteArticle">
        Delete Article
        <i class="right chevron icon"></i>
      </div>
      <div class="ui right floated primary button" @click="editArticle">
        Edit Article
        <i class="right chevron icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "fullArticle",
  props: ["article"],
  data: function() {
    return {};
  },
  methods: {
    deleteArticle: function() {
      this.$emit("toDeleteArticle", this.article._id);
    },
    editArticle: function() {
      this.$emit("toEditArticle", this.article._id);
    }
  }
};
</script>

<style scoped>
#column {
  margin-top: 2vh;
  margin-right: 9vh;
}
</style>