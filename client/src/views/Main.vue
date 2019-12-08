<template>
  <div>
    <app-navbar></app-navbar>
    <div class="container-fluid">
      <div class="row" style="height: 100vh">
          <!-- Left part -->
          <div id="left-part" class="col-2 border p-0">
            
            <!-- User card -->
            <div id="user-card" class="mx-2 my-2 border" style="height: 100px">
              <img 
              src="data:image/png;base64,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" 
              class="rounded float-left mx-2 my-2"
              style="width: 50px" 
              alt="avatar">
              <div id="name-job" class="my-2">
                <span id="user-name" class="" style="font-size: 1em;">User</span>
                <br>
                <!-- <span id="user-job" style="font-size: 0.8em;">Fullstack Developer</span> -->
                <b-button size="sm" @click.prevent="logout">Logout</b-button>
              </div>
            </div>
            <!-- End of user card -->
              
            <!-- Main navigation -->
            <div id="main-nav" class="mx-2 mt-4" style="height: 100vh">
              <span class="mx-2">Main</span>
              <hr class="my-1">
              <b-list-group>
                <b-list-group-item class="menu-list" @click="changeMainView('clean-canvas')">Create New Post</b-list-group-item>
                <b-list-group-item class="menu-list" @click="changeMainView('posts')">Posts</b-list-group-item>
                <b-list-group-item class="menu-list" @click="changeMainView('feeds')">Feeds</b-list-group-item>
              </b-list-group>
            </div>
            <!-- End of main navigation -->
          
          </div>
          <!-- End of left part -->
          
        <!-- Main content -->
        <div id="main-content" class="col-10 border">
          <app-postslist 
            v-if="currentMainView === 'posts'"
            @setArticleId="setArticleId"
            @changeView="changeMainView"
          ></app-postslist>
          <app-canvas 
            v-if="currentMainView === 'canvas'"
            @changeMainView="changeMainView"
            :currentView="currentMainView"
            :articleId="articleId"
          ></app-canvas>
          <app-blog 
            v-if="currentMainView === 'blog'"
            @changeMainView="changeMainView"
            :currentView="currentMainView"
            :articleId="articleId"
          ></app-blog>
          <app-feeds
            v-if="currentMainView === 'feeds'"
            @setArticleId="setArticleId"
            @changeView="changeMainView"
          ></app-feeds>
        </div>
        <!-- End of main content -->
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/navbar"
import PostsList from "../components/posts-list";
import Canvas from "../components/canvas";
import Blog from "../components/blog";
import Feeds from "../components/feeds"



export default {
  components: {
    "app-navbar": Navbar,
    "app-postslist": PostsList,
    "app-canvas": Canvas,
    "app-blog": Blog,
    "app-feeds": Feeds
  },
  data() {
    return {
      currentMainView: "canvas",
      username: "",
      articleId: null
    }
  },
  methods: {
    getUsername() {
      localStorage.getItem("username")
    },

    logout() {
      localStorage.removeItem("access_token");
      this.$emit("logout")
    },
    
    setArticleId(id) {
      this.articleId = id
    }, 
    changeMainView(v) {
      if (v === "clean-canvas") {
        this.articleId = null;
        this.currentMainView = "canvas"
      } else {
        this.currentMainView = v;
      }
    },
    getUser() {

    }
  },
  created() {
  }
}
</script>

<style scoped>
  .menu-list:hover {
    cursor: pointer;
  }
</style>