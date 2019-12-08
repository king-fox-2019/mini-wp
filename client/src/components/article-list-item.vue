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
        <img src="https://picsum.photos/320" alt class="img-fluid" />
      </a>
      <p
        class="lead"
      >{{ article.content }}</p>

      <a href="#" class="btn btn-primary">
        Read More
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

<style>
</style>