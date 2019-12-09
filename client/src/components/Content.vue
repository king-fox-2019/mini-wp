<template>
  <div id="contents">
    <div v-if="!tagMode">
      <FeaturedArticle v-if="articles.length >= 3" :articles="articles.slice(0, 3)"></FeaturedArticle>
      <div style="width: 100%; margin-bottom: 5px" v-for="(article,i) in filteredArticle" :key="i">
        <Card :article="article"></Card>
      </div>
    </div>
    <div v-if="tagMode">
      <b-field grouped group-multiline>
        <div class="control" v-for="(id,i) in tag" :key="i">
          <div class="tags has-addons">
            <b-tag type="is-dark" class="tag is-dark">{{id}}</b-tag>
            <a class="tag is-delete" @click="close(id)"></a>
          </div>
        </div>
      </b-field>
      <div style="width: 100%; margin-bottom: 5px" v-for="(article,i) in filteredArticle" :key="i">
        <Card :article="article"></Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import axios from "../../config/axios";
import FeaturedArticle from "./FeaturedArticle";

export default {
  props: ["tag", "query"],
  name: "Content",
  components: {
    Card,
    FeaturedArticle
  },
  data() {
    return {
      articles: [],
      tagMode: false,
      articleByTag: []
    };
  },
  methods: {
    getArticles() {
      const loadingComponent = this.$buefy.loading.open();
      axios({
        methods: "get",
        url: "/articles/posted"
      })
        .then(({ data }) => {
          loadingComponent.close();
          this.articles = data;
        })
        .catch(err => {
          loadingComponent.close();
          console.log(err.response.data.message);
          this.$buefy.toast.open({
            duration: 4000,
            message: `${err.response.data.message}`,
            type: "is-danger"
          });
        });
    },
    close(tag) {
      let a = [];
      this.articleByTag.forEach(element => {
        let filter = element.tags.filter(function(item) {
          if (tag.includes(item)) {
            a.push(element);
          }
        });
      });
      for (var i = this.articleByTag.length - 1; i >= 0; i--) {
        for (let j = 0; j < a.length; j++) {
          if (this.articleByTag[i] === a[j]) {
            this.articleByTag.splice(i, 1);
          }
        }
      }
      this.$emit("removeTagSearch", tag);
    }
  },
  watch: {
    tag(val) {
      console.log(val);
      this.tagMode = true;
      let temp = [];
      this.articles.forEach(element => {
        let filter = element.tags.filter(el => {
          if (val.includes(el)) {
            temp.push(element);
          }
        });
      });
      this.articleByTag = temp;
    },
    articleByTag() {
      if (this.articleByTag.length < 1) {
        this.tagMode = false;
      } else {
        this.tagMode = true;
      }
    }
  },
  computed: {
    filteredArticle() {
      let find = this.query;
      if (!this.tagMode) {
        return this.articles.filter(article => {
          let regex = new RegExp(find, "i");
          return article.title.match(regex);
        });
      } else {
        return this.articleByTag.filter(article => {
          let regex = new RegExp(find, "i");
          return article.title.match(regex);
        });
      }
    }
  },
  created() {
    this.getArticles();
  }
};
</script>

<style scoped>
#contents {
  margin: 15px;
  /* border: 1px solid black; */
  width: 100%;
  height: 92vh;
  overflow: scroll;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>