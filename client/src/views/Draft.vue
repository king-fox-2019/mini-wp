<template>
  <div>
    <Navbar :userLogin="userLogin"></Navbar>
    <div id="mainContent">
      <Sidebar id="test" :userLogin="userLogin" @logout="userLogout"></Sidebar>
      <div id="content">
        <div v-if="!empty">
          <h1 id="titlePage">Drafts</h1>
        </div>
        <div v-if="empty">
          <h1 id="titlePage">Drafts</h1>
          You dont have any drafted articles
        </div>
        <div id="myArticles" v-for="(article,i) in articles" :key="i">
          <card :article="article" :creator="creator" @fetchDraft="getDraft"></card> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "../../config/axios";
import Card from '../components/Card'

export default {
  components: {
    Navbar,
    Sidebar,
    Card
  },
  data() {
    return {
      userLogin: false,
      profile: {},
      creator: true,
      articles: [],
      empty : true
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
    getDraft() {
      let token = localStorage.getItem("token");
      const loadingComponent = this.$buefy.loading.open()
      axios({
        url: `/articles/draft`,
        methods: "get",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          loadingComponent.close()
           if(data.articles.length >= 1){
            this.empty = false
            this.articles = data.articles;
          } else {
            this.empty = true
            this.articles = []
          }
        })
        .catch(err => {
          loadingComponent.close()
          this.$buefy.toast.open({
                    duration: 4000,
                    message: `${err.response.data.message}`,
                    type: 'is-danger'
                })
          console.log(err.response.data.message);
        });
    },
    userLogout(){
      localStorage.clear()
      this.userLogin = false
    },
  },
  created() {
    this.getToken();
    this.getDraft();
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
#content{
  padding : 0px 20px !important;
  width: 100% !important
}
#eachCard{
  width: 100% !important
}
#titlePage{
  font-size: 30px;
  color: black
}
#content{
  width: 100%;
  height: 92vh;
  overflow: scroll;
  padding: 20px;
  display: flex;
  flex-wrap: wrap 
}
</style>