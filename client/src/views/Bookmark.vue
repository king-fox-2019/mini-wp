<template>
  <div>
    <Navbar :userLogin="userLogin"></Navbar>
    <div id="mainContent">
      <Sidebar :userLogin="userLogin"></Sidebar>
      <div id="content">
        <div v-if="!empty">
          <h1 id="titlePage">Bookmarks</h1>
        </div>
        <div v-else>
          <h1 id="titlePage">Bookmarks</h1>You haven't bookmarked any articles
        </div>
        <div id="myArticles" v-for="(article,index) in articles" :key="index">
          <card :article="article" :bookmark="true" @fetchBookmark="getBookmark"></card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "../../config/axios";
import Card from "../components/Card";

export default {
  components: {
    Navbar,
    Sidebar,
    Card
  },
  data() {
    return {
      userLogin: false,
      articles: [],
      creator: false,
      empty: true
    };
  },
  methods: {
    getToken() {
      if (localStorage.getItem("token")) {
        this.userLogin = true;
      } else {
        this.userLogin = false;
      }
    },
    getBookmark() {
      let token = localStorage.getItem("token");
      const loadingComponent = this.$buefy.loading.open();
      axios({
        url: `/users/mybookmark`,
        methods: "get",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          loadingComponent.close();
          if (data.bookmarks.length >= 1) {
            this.empty = false;
            this.articles = data.bookmarks;
          } else {
            this.empty = true;
            this.articles = [];
          }
        })
        .catch(err => {
          loadingComponent.close();
          this.$buefy.toast.open({
            duration: 4000,
            message: `${err.response.data}`,
            type: "is-danger"
          });
          console.log(err.response.data);
        });
    }
  },
  created() {
    this.getToken();
    this.getBookmark();
  }
};
</script>

<style>
#mainContent {
  width: 100%;
}
#myArticles {
  width: 100%;
  margin: 10px;
}
#content {
  padding: 0px 20px !important;
  width: 100% !important;
}
#eachCard {
  width: 100% !important;
}
#titlePage {
  font-size: 30px;
  color: black;
}
#content {
  /* border: 1px solid black; */
  width: 100%;
  height: 92vh;
  overflow: scroll;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>