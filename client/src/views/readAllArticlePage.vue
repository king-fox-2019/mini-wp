<template>
  <div>
    <div class="container-fluid" id="dashboard-content">
      <div
        v-for="article in articles"
        :key="article._id"
        class="card"
        id="article-card"
      >
        <div class="card-body border">
          <div class="d-flex bd-highlight">
            <div class="p-2 flex-shrink-1 bd-highlight align-items-center">
              <img
                :src="article.featured_image"
                style="height: 200px; width: 320px; margin-right: 10px"
              />
            </div>
            <div class="p-2 w-100 bd-highlight">
              <h1 class="card-title">{{ article.title }}</h1>
              <p
                class="card-title content"
                v-html="sliceArticle(article.content)"
              ></p>
              <a href="" @click.prevent="readMore(article)">Read More</a>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col
                    ><p class="card-text" id="date">
                      <i class="far fa-user-circle"></i>
                      {{ article.userId["username"] }}
                    </p></b-col
                  >
                  <b-col
                    ><p class="card-text" id="date" style="text-align:right">
                      <i class="far fa-clock"></i>
                      {{ dateFormat(article.created_at) }}
                    </p></b-col
                  >
                </b-row>
              </b-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../server";
import moment from "moment";
export default {
  data() {
    return {
      articles: []
    };
  },
  methods: {
    getAllArticle() {
      axios
        .get("articles", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.articles = data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    sliceArticle(article) {
      const a = article.slice(0, 200) + "...";
      return a;
    },
    readMore(val) {
      this.$emit("readMore", val);
    },
    dateFormat(val) {
      return moment(val).format("MMMM Do YYYY");
    }
  },
  created() {
    this.getAllArticle();
  }
};
</script>

<style scoped>
#article-card {
  margin-top: 15px !important;
  margin-bottom: 2px !important;
}

#dashboard-content {
  height: 80vh;
  min-height: 80vh;
  overflow: scroll;
}

#navbar-article {
  color: black;
}

#date {
  font-size: 12px;
  color: darkgrey;
}

.content {
  font-family: "PT Sans", sans-serif;
}

.card-title {
  margin-bottom: 0.4rem;
}

.bv-example-row {
  margin-top: 18px;
  padding-left: 0px;
}

.card-body {
  border-color: #00ccaa !important;
  border-width: 0 0 0 8px !important;
}

a {
  color: #00ccaa;
}
</style>
