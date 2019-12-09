<template>
  <div class="item">
    <div class="ui medium image">
      <img :src="article.image" />
    </div>
    <div class="middle aligned content">
      <div class="header">
        <h1>
          <b>{{ article.title }}</b>
        </h1>
      </div>
      <div class="description">
        {{ new Date(article.createdAt).toDateString().split(', ')[0] }}
        <br />
        {{ article.content }}
      </div>
      <div class="ui primary button" @click="viewArticle(article._id)">
        View Article
        <i class="right chevron icon"></i>
      </div>
      <div v-for="(tag, index) in article.tags" :key="index">
        <div class="ui label">{{ tag }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "articleCard",
  props: ["article"],
  data: function() {
    return {};
  },
  methods: {
    viewArticle(id) {
      console.log(this.article._id);
      this.$emit("toShowArticle", this.article._id);
    }
  },
  components: {}
};
</script>

<style>
</style>