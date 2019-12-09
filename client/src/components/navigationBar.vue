<template>
  <div class="ui left fixed vertical menu">
    <div class="item">
      <div class="ui input">
        <input
          type="text"
          placeholder="Search title..."
          @keyup.prevent.enter="toSearch"
          v-model="value"
        />
      </div>
    </div>
    <div class="item">
      Articles
      <div class="menu">
        <a class="item" @click="toAddArticle">Add</a>
        <a class="item" @click="toShowArticles">View</a>
      </div>
    </div>
    <a class="item" @click="toLogOut">Log Out</a>
  </div>
</template>

<script>
export default {
  name: "navigationBar",
  data: function() {
    return {
      value: ""
    };
  },
  methods: {
    toAddArticle: function() {
      this.$emit("toAddArticle");
    },
    toShowArticles: function() {
      this.$emit("toShowArticles");
    },
    toLogOut: function() {
      this.$emit("toLogOut");
    },
    toSearch: function() {
      console.log(this.value);
      this.$emit("toSearch", this.value);
    }
  }
};
</script>

<style>
</style>