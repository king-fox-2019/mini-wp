<template>
  <div>
    <Navbar :userLogin="userLogin"></Navbar>
    <div id="mainContent">
      <Sidebar :userLogin="userLogin"></Sidebar>
      <div id="content">
        <div v-if="!empty">
          <h1 id="title">{{profile.name}}</h1>
        </div>
        <div v-if="empty">
          <h1 id="title">{{profile.name}}</h1>You haven't post anything
        </div>

        <div id="myArticles" v-for="(article,i) in profile.articles" :key="i">
          <card :article="article" :creator="creator" @fetchDraft="whoAmI"></card>
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
      profile: {},
      creator: true,
      empty: false
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
    whoAmI() {
      let token = localStorage.getItem("token");
      const loadingComponent = this.$buefy.loading.open();
      axios({
        url: `/users/myprofile`,
        methods: "get",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          loadingComponent.close();
          this.profile = data;
          if (data.articles.length < 1) {
            this.empty = true;
          }
        })
        .catch(err => {
          loadingComponent.close();
          console.log(err);
          // let msg = err.response.data.arr.join('  -  ')
          this.$buefy.toast.open({
            duration: 4000,
            message: `${err.response}`,
            type: "is-danger"
          });
        });
    }
  },
  created() {
    this.getToken();
    this.whoAmI();
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
#title {
  font-size: 30px;
}
#content {
  width: 100%;
  height: 92vh;
  overflow: scroll;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>