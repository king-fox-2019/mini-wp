
<template>
  <div style="text-align: center;">
    <h2 class="detail-title mt">{{article.title}}</h2>
    <img :src="String(article.image)" size="big" />
    <div class="mt">
      <sui-button class="is-primary-bg" @click="$router.push('/edit-article/' + article._id)" v-if="isMine">edit</sui-button>
      <sui-button @click="remove" v-if="isMine">delete</sui-button>
    </div>

    <div class="detail-content mt" v-html="article.content"></div>
  </div>
</template>




<script>
import axios from "../helpers/axios";

export default {
  name: "detail-article",
  data: function() {
    return {
      article: {}
    };
  },
  methods: {
    fetchDetailArticle() {
      axios
        .get(`/articles/${this.$route.params.id}`)
        .then(({ data }) => {
          this.article = data;
        })
        .catch(err => {
            if (err.response) {
            this.$toastr.h("Error!").i(err.response.data.message);
          } else {
            this.$toastr.h("Error!").i(`Couldn't connect to server`);
          }
        });
    },
    remove() {
      axios
        .delete(`/articles/${this.$route.params.id}`, {
          headers: {
            access_token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.$router.push("/");
          this.$toastr.h("Article").i("Deleted!");
        })
        .catch(err => {
            if (err.response) {
            this.$toastr.h("Error!").i(err.response.data.message);
          } else {
            this.$toastr.h("Error!").i(`Couldn't connect to server`);
          }
        });
    }
  },
  created() {
    this.fetchDetailArticle();
  },
  computed: {
    isMine() {
      return localStorage.getItem("userId") === this.article.user;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=PT+Serif&display=swap');

.detail-content {
  width: 70vw;
  text-align: center;
  align-items: center;
  margin-left: 14%;
}
.detail-title {
font-family: 'PT Serif', serif;
color: #AB7A6C;
margin-top: 30px !important;
margin-bottom: 45px;
}
</style>