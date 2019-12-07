<template>
  <div class="add-article">
    <h1>add article</h1>
    <wysiwyg v-model="content" />
  </div>
</template>

<script>
export default {
  name: "AddArticle",
  data() {
    return {
      content: `
        title:
        content:
        author:
      `
    };
  }
};
</script>

<style></style>
