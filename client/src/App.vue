<template>
  <div>
    <navbar
      v-bind:isLogin="isLogin"
      @fromLogOutButton="loginCondition"
      @fromChildren="triggerParent"
      @showPage="showPageToggle"
      @search="search"
      :message="message"
      :currentUser="currentUser"
    ></navbar>
    <login
      v-if="!isLogin&&isLoginForm"
      @fromLoginFormLoginCond="loginCondition"
      @fromLoginFormRegisterCond="loginFormCondition"
    ></login>
    <register v-if="!isLogin&&!isLoginForm" @fromRegisterForm="loginFormCondition"></register>
    <articleList
      v-if="isLogin"
      @searchByTag="searchByTag($event)"
      @detailedArticle="detailedArticle($event)"
      @editArticle="editArticle($event)"
      @removedArticle="deleteArticle($event)"
      v-bind:isShowArticle="isShowArticle"
      v-bind:allArticles="allArticles"
      v-bind:isUserArticle="isUserArticle"
    ></articleList>
    <createArticle
      v-bind:isCreate="isCreate"
      @addArticle="getAllArticles"
      @showPage="showPageToggle"
    ></createArticle>
    <updateArticle
      v-bind:articleToBeEdited="articleToBeEdited"
      v-if="isEditArticle"
      @showPage="showPageToggle"
    ></updateArticle>
    <detailedArticlePage v-bind:articleDetailObj="articleDetailObj" v-if="isDetailedArticle"></detailedArticlePage>
  </div>
</template>


<script>
import updateArticle from "./components/updateArticle";
import articleList from "./components/articleList.vue";
import navbar from "./components/navbar.vue";
import login from "./components/login.vue";
import register from "./components/register";
import axios from "axios";
import createArticle from "./components/createArticle";
import detailedArticlePage from "./components/detailedArticle";

export default {
  components: {
    navbar,
    login,
    register,
    articleList,
    createArticle,
    updateArticle,
    detailedArticlePage
  },
  data() {
    return {
      isCreate: false, //false
      isShowArticle: true, //true
      isLogin: false, //false
      isEditArticle: false, //false
      isDetailedArticle: false, //false
      articleDetailObj: {},
      articleToBeEdited: {},
      message: "",
      isUserArticle: false, //false
      counter: 0,
      allArticles: [],
      tempArticles: [],
      isLoginForm: true,
      currentUser : {},
    };
  },
  methods: {
    triggerParent(number) {
      this.counter += number;
      this.message = "from parent" + this.counter;
    },
    loginFormCondition(cond) {
      this.isLoginForm = cond;
    },
    deleteArticle(id) {
      
      // this.getAllArticles()
      this.showPageToggle("UserArticle")
      // this.isUserArticle()
      // this.getUserArticles()
    },
    detailedArticle(obj) {
      // console.log("masuk ke detail");
      // console.log(obj);
      this.articleDetailObj = obj;
      this.showPageToggle("detailedArticle");
    },
    
    editArticle(obj) {
      // console.log(obj)
      this.showPageToggle("editArticle");
      this.articleToBeEdited = obj;
      // console.log(obj);
    },
    loginCondition(cond,currentUser) {
      console.log('110')
      let token = localStorage.getItem("token");
      this.currentUser = currentUser

      if (token) {
        console.log('115')
        this.isLogin = true;
        this.getAllArticles();
        this.isUserArticle = true;
        console.log('119 this.isUserArticle => ',this.isUserArticle);
      } 
      
      else {

        if (cond) {
          this.isUserArticle = true; //false
          console.log('124: ', this.isUserArticle);
          this.isLogin = true;
          this.getAllArticles();
        } 
        else {
          console.log('129');
          this.isLogin = false;
          this.allArticles = []
          this.isUserArticle = false;
        }
      }
    },
    showPageToggle(page) {
      if (page == "UserArticle") {
        // console.log("masuk ke user article")
        // this.getAllArticles()
        this.isShowArticle = true;
        this.isUserArticle = true;
        this.isCreate = false;
        this.isEditArticle = false;
        this.isDetailedArticle = false;
        this.getUserArticles();
      } 

      else if (page == "AllArticle") {
        // console.log("masuk ke all article");
        this.isShowArticle = true;
        this.isUserArticle = false; //false
        this.isCreate = false;
        this.isEditArticle = false;
        this.isDetailedArticle = false;
        this.getAllArticles();
      } 

      else if (page == "createTodoForm") {
        // console.log("masuk ke create");
        this.isShowArticle = false;
        this.isCreate = true;
        this.isEditArticle = false;
        this.isDetailedArticle = false;
      } 

      else if (page == "editArticle") {
        this.isShowArticle = false;
        this.isUserArticle = false; //false
        this.isCreate = false;
        this.isEditArticle = true;
        this.isDetailedArticle = false;
      } 
      
      else if ((page = "detailedArticle")) {
        // console.log("masuk page");
        this.isShowArticle = false;
        this.isUserArticle = true; //test
        this.isCreate = false;
        this.isEditArticle = false;
        this.isDetailedArticle = true;
      }
    },
    getUserArticles() {
      console.log('184')
        let token = localStorage.getItem("token")
        axios({
            url : "http://localhost:3000/articles/user",
            method : "GET",
            headers : {token}
      })
        .then(( response ) => {
            this.allArticles = response.data;
            console.log('192 this.allArticles => ',this.allArticles);
            this.tempArticles = response.data;
        })
        .catch(( err ) => {
          console.log(err)
        })
    },
    getAllArticles() {
      console.log('201')
      let token = localStorage.getItem("token")
      axios({
        url: "http://localhost:3000/articles",
        method: "GET",
        headers: {
          token
        }
      })
        .then(response => {
          console.log('213 response => ', response);
          this.allArticles = response.data;
          this.tempArticles = response.data;
          console.log('216 this.allArticles => ',this.allArticles);
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchByTag(tag){

      let token = localStorage.getItem("token")

      axios({
        url : `http://localhost:3000/articles/${tag}`,
        method : "GET",
        headers : {token}
      })
      .then(( response ) => {
        this.allArticles = response.data
        // this.tempArticles = response.data
      })
      .catch(err=>{
        console.log(err)
      })
    },
    search(value){
      // console.log(value)
      const title = new RegExp(value,'i')
      this.allArticles = this.tempArticles.filter((el) => { return title.test(el.title)})
      // console.log(this.allArticles)
    }
  },
  created() {
    this.loginCondition(null);
    if (localStorage.getItem("token")) {
      this.getAllArticles();
      if (localStorage.getItem("currentUser")){
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
      }
    } else {
      this.allArticles = [],
      this.tempArticles = []
    }
  }
};
</script>

<style>
*{
 font-family: 'Quicksand', sans-serif; 
}
</style>
