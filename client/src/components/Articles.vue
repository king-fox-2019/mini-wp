<template>
  <div class="contained">
    <div style="  text-align: center; margin: 50px;">
      <h2>READ</h2>
      <h5>Classroom favorites and new stories are both included in our hand-picked books for tweens to enjoy.</h5>
    </div>
    <div class="contained">
      <sui-item-group divided>
        <sui-item v-for="article in articles" :key="article._id">
          <img class="img" :src="article.image" />

          <sui-item-content>
            <sui-item-header class="title clickable">
              <span @click="$router.push('/detail-article/' + article._id )">{{article.title}}</span>
            </sui-item-header>
            <sui-item-meta>
              <span v-for="(tag, i) in article.tags" :key="i" class="tag">
                <a is="sui-label" tag>{{tag.value}}</a>
              </span>
            </sui-item-meta>
            <sui-item-description>
              <p>{{article.content.substring(0, 200)}} ...</p>
            </sui-item-description>
          </sui-item-content>
        </sui-item>
      </sui-item-group>
      <paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="paginate"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-range="5"
      ></paginate>
    </div>
  </div>
</template>

<script>
import axios from "../helpers/axios";
export default {
  name: "Articles",
  data: function() {
    return {
      articles: [],
      count: 0,
      limit: 5,
      page: 1
    };
  },
  methods: {
    fetchArticle(page) {
      axios
        .get(
          `/articles?topic=${this.$route.params.topic}&page=${page}&limit=${this.limit}`
        )
        .then(({ data }) => {
          this.articles = data.articles;
          this.count = data.count;
        })
        .catch(err => {
          if (err.response) {
            this.$toastr.h("Error!").i(err.response.data.message);
          } else {
            this.$toastr.h("Error!").i(`Couldn't connect to server`);
          }
        });
    },
    paginate() {
      this.fetchArticle(this.page);
    }
  },
  created() {
    this.fetchArticle(1);
  },
  watch: {
    "$route.params.topic"() {
      this.fetchArticle(1);
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.count / this.limit);
    }
  }
};
</script>

<style scoped>
img {
  width: 130px;
  height: 127px;
  margin-right: 30px;
}
.title:hover {
  color: darkred !important;
}
.pagination {
  display: flex;
  list-style-type: none;
  align-items: center;
  justify-content: center;
}
</style>