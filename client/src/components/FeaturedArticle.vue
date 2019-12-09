<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent t-standard">
      <div class="tile is-child">
        <router-link :to="`/${slug(0)}`">
          <figure class="image is-2by1 has-margin-b" id="test">
            <img :src="articles[0].image" />
          </figure>
          <p class="title t-standard" style="cursor:pointer">{{ articles[0].title }}</p>
          <div class="t-lighten">
            <small>
              <i>{{ topics(0) }}</i>
            </small>
          </div>
        </router-link>

        <div class="contenz" v-html="truncatePreview(articles[0].content)"></div>
        <div class="row t-lighten">
          <small>{{ fullName(0) }}</small>
        </div>
        <div class="row">
          <small>{{ publishedDate(0) }}</small>
        </div>
      </div>
    </div>
    <div class="tile is-4 is-vertical is-parent">
      <div class="tile is-child">
        <router-link :to="`/${slug(1)}`">
          <p class="title t-standard" style="cursor:pointer">{{ articles[1].title }}</p>
        </router-link>

        <div class="t-lighten">
          <small>
            <i>{{ topics(1) }}</i>
          </small>
        </div>

        <div class="contenz" v-html="truncatePreview(articles[1].content)"></div>
        <figure class="image is-3by1 has-margin-t">
          <img :src="articles[1].image" />
        </figure>

        <div class="row t-lighten">
          <small>{{ publishedDate(1) }} - {{ fullName(1) }}</small>
        </div>
      </div>
      <div class="tile is-child">
        <router-link :to="`/${slug(2)}`">
          <p class="title t-standard" style="cursor:pointer">{{ articles[2].title }}</p>
        </router-link>

        <div class="t-lighten">
          <small>
            <i>{{ topics(1) }}</i>
          </small>
        </div>

        <div class="contenz" v-html="truncatePreview(articles[2].content)"></div>
        <figure class="image is-3by1 has-margin-t">
          <img :src="articles[2].image" />
        </figure>

        <div class="row t-lighten">
          <small>{{ publishedDate(2) }} - {{ fullName(2) }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import truncate from "truncate-html";

export default {
  name: "FeaturedArticle",
  props: {
    articles: Array
  },
  methods: {
    goToArticle() {
      this.$router.push({ path: `/${this.article.slug}` });
    },
    publishedDate(i) {
      const date = new Date(this.articles[i].createdAt); // 2009-11-10
      const month = date.toLocaleString("default", { month: "long" });
      return `${month.substring(0, 3)}, ${date.getDate()}`;
    },
    fullName(i) {
      return `${this.articles[i].author.name}`;
    },
    topics(i) {
      return this.articles[i].tags.join(", ").toUpperCase();
    },
    truncatePreview(text) {
      truncate.setup({ stripTags: true, length: 130 });
      return truncate(text);
    },
    slug(i) {
      const slug = this.articles[i].title;
      return `${slug}`;
    }
  },
  computed: {
    // truncatePreview(text) {
    //   truncate.setup({ stripTags: true, length: 130 });
    //   return truncate(text);
    // },
    convertMoment() {
      return moment(this.article.createdAt).from(new Date());
    },
    reading() {
      return readingTime(this.article.content).text;
    }
  }
};
</script>

<style scoped>
.title {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
#test {
  object-fit: cover !important;
}
.contenz {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  font-size: 13px;
}
</style>