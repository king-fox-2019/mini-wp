<template>
  <div>
    <message-box v-if="isMessage" :message="message"></message-box>
    <navigation-bar
      @toShowArticles="showArticles"
      @toAddArticle="addArticle"
      @toLogOut="logOut"
      @toSearch="search"
    ></navigation-bar>
    <add-article-form v-if="page === 'addArticle'" @toShowArticle="showArticle"></add-article-form>
    <edit-article-form v-if="page === 'editArticle'" @toShowArticle="showArticle" :id="id"></edit-article-form>
    <div class="ui four column grid" v-if="page === 'showArticles'">
      <div class="row" id="rows">
        <article-card
          v-for="article in articles"
          :key="article._id"
          :article="article"
          @toShowArticle="showArticle"
        ></article-card>
      </div>
    </div>
    <full-article
      v-if="page === 'showArticle'"
      :article="article"
      @toDeleteArticle="deleteArticle"
      @toEditArticle="editArticle"
    ></full-article>
  </div>
</template>

<script>
import axios from "axios";
import messageBox from "../components/messageBox";
import navigationBar from "../components/navigationBar";
import addArticleForm from "../components/addArticleForm";
import editArticleForm from "../components/editArticleForm";
import articleCard from "../components/articleCard";
import fullArticle from "../components/fullArticle";

export default {
  name: "homePage",
  data: function() {
    return {
      page: "addArticle",
      articles: [],
      isMessage: false,
      message: "",
      id: "",
      article: ""
    };
  },
  methods: {
    getArticles: function() {
      // alert("masuk sini");
      axios({
        method: "get",
        url: "http://localhost:3000/articles",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          // console.log(response.data);
          this.articles = response.data;
        })
        .catch(err => {
          this.message = err;
          this.isMessage = true;
        });
    },
    getArticle: function() {
      axios({
        method: "get",
        url: `http://localhost:3000/articles/${this.id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          // console.log(response);
          this.article = response.data;
        })
        .catch(err => {
          this.message = err;
          this.isMessage = true;
        });
    },
    showArticles: function() {
      this.getArticles();
      this.page = "showArticles";
    },
    showArticle: function(value) {
      this.id = value;
      this.getArticle();
      this.page = "showArticle";
    },
    addArticle: function() {
      this.page = "addArticle";
    },
    editArticle: function(id) {
      this.page = "editArticle";
    },
    deleteArticle: function(id) {
      axios({
        method: "delete",
        url: `http://localhost:3000/articles/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          // console.log(response.data);
          // this.articles = response.data;
          this.isMessage = true;
          this.message = this.msg;
          this.getArticles();
          this.page = "showArticles";
        })
        .catch(err => {
          this.message = err;
          this.isMessage = true;
        });
    },
    logOut: function() {
      if (gapi.auth2) {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
          console.log("User logged out successfuly.");
        });
      }
      if (localStorage.getItem("access_token")) {
        localStorage.removeItem("access_token");
        this.isMessage = true;
        this.message = "Successfully logged out";
      }
      this.$emit("toLandingPage");
    },
    search: function(value) {
      axios({
        method: "get",
        url: `http://localhost:3000/articles/filter/${value}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          // console.log(response.data);
          // this.articles = response.data;
          this.articles = response.data;
          this.isMessage = true;
          this.message = this.msg;
          this.page = "showArticles";
        })
        .catch(err => {
          this.message = err;
          this.isMessage = true;
        });
    }
  },
  components: {
    navigationBar,
    messageBox,
    addArticleForm,
    editArticleForm,
    articleCard,
    fullArticle
  },
  created() {
    this.getArticles();
  }
};
</script>

<style scoped>
#rows {
  /* margin-right: 50vh; */
  padding-left: 45vh;
}
</style>
