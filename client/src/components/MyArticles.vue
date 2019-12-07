<template>
  <div class="my-articles">
    <h1>my articles</h1>
  </div>
</template>

<script>
export default {
  name: "MyArticles",
  data() {
    return {};
  },
  created() {
    this.$router.push("/myarticles");
  }
};
</script>

<style>
</style>
