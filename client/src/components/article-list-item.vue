<template>
  <article>
    <header>
      <div class="meta">
        Written by
        <span class="author">{{ article.author.email }}</span>
        <span class="date">{{ article.created_at }}</span> |
        <span class="comments">
          <span class="badge">4</span> Comments
        </span>
      </div>
      <h2>
        <a href>{{ article.title }}</a>
      </h2>
    </header>
    <div class="entry-content">
      <a href>
        <img src="https://image.freepik.com/free-photo/colorful-fruit_1417-1529.jpg" alt class="img-fluid" />
      </a>
      <p
        class="lead"
        v-html="article.content"
      ></p>

      <a href="#" class="btn btn-outline-danger">
        Delete
        <span class="glyphicon glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      </a>
    </div>
    <footer></footer>
  </article>
</template>

<script>
export default {
  name: "articleListItem",
  props: ["article"]
};
</script>

<style scoped>
img {
  height: 200px;
  width: auto
}
</style>