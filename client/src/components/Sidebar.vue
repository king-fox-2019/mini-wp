<template>
  <div>
    <div id="sidebar" :class="{ menuDisplayed: sidebarOpen }">
      <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
          <div id="navbar-user">
            <div class="d-flex flex-column">
              <li @click.prevent="slidingMenu">
                <a href="#">
                  <i class="material-icons mr-2">close</i>Close
                </a>
              </li>
              <div v-if="userLogin">
                <li @click="movePage('dashboard-page')">
                  <a href="#">
                    <i class="material-icons mr-2">home</i>Home
                  </a>
                </li>
                <div v-if="activePage === 'dashboard-page'">
                  <li @click="movePage('add-article-page')">
                    <a href="#">
                      <i class="material-icons mr-2">note</i>Add articles
                    </a>
                  </li>
                </div>
                <div v-if="activePage === 'detail-page'">
                  <li @click="movePage('edit-article-page')">
                    <a href="#">
                      <i class="material-icons mr-2">edit</i>Edit
                    </a>
                  </li>
                  <li @click.prevent="deleteArticle">
                    <a href="#">
                      <i class="material-icons mr-2">delete</i>Delete
                    </a>
                  </li>
                </div>
                <li @click.prevent="signOut" style="max-height: 20%;max-width:170px;">
                  <a href="#">
                    <i class="material-icons mr-2" id="icon-menu">exit_to_app</i>Sign Out
                  </a>
                </li>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <div
        id="button-sidebar"
        v-if="!sidebarOpen"
        class="page-content-wrapper d-flex justify-content-between"
      >
        <div
          class="d-flex flex-column fixed-top"
          style="height: 90%;max-width:50px;background-color:#c3c3c3"
        >
          <a @click.prevent="slidingMenu" href="#" class="btn" id="menu-toggle">
            <span class="glyphicon glyphicon-menu-hamburger">
              <i style="color:grey" class="material-icons" id="icon-menu">menu</i>
            </span>
          </a>
          <div v-if="userLogin">
            <a href="#" @click="movePage('dashboard-page')" class="btn" id="menu-toggle">
              <span class="glyphicon glyphicon-menu-hamburger">
                <i style="color:grey" class="material-icons" id="icon-menu">home</i>
              </span>
            </a>
            <div v-if="activePage === 'dashboard-page'">
              <a href="#" @click="movePage('add-article-page')" class="btn" id="menu-toggle">
                <span class="glyphicon glyphicon-menu-hamburger">
                  <i style="color:grey" class="material-icons" id="icon-menu">note</i>
                </span>
              </a>
            </div>
            <div v-if="activePage === 'detail-page'">
              <a href="#" @click="movePage('edit-article-page')" class="btn" id="menu-toggle">
                <span class="glyphicon glyphicon-menu-hamburger">
                  <i style="color:grey" class="material-icons" id="icon-menu">edit</i>
                </span>
              </a>
              <a href="#" @click.prevent="deleteArticle" class="btn" id="menu-toggle">
                <span class="glyphicon glyphicon-menu-hamburger">
                  <i style="color:grey" class="material-icons" id="icon-menu">delete</i>
                </span>
              </a>
            </div>
          </div>
          <div class="fixed-bottom" style="height: 10%;max-width:50px;background-color:#c3c3c3">
            <a v-if="userLogin" href="#" @click="signOut" class="btn" id="menu-toggle">
              <span class="glyphicon glyphicon-menu-hamburger">
                <i style="color:grey" class="material-icons" id="icon-menu">exit_to_app</i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light"
      style="background-color:#B4B4B4 !important;height:62px;justify-content:flex-end;display:flex"
    >
      <a class="navbar-brand" style="color:#F6F6F6" href="#">Wordpress KW</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
  </div>
</template>

<script>
import axios from "../config/axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      leftPadding: "padding-left: 0",
      sidebarOpen: false
    };
  },
  props: ["userLogin", "activePage", "article"],
  methods: {
    signOut() {
      if (typeof gapi.auth2 !== "undefined") {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
          console.log("User signed out.");
        });
      }

      localStorage.removeItem("access_token");
      this.$emit("currentPage", { page: "login-page" });
    },
    movePage(page) {
      this.$emit("currentPage", { page, data: this.article });
    },
    slidingMenu() {
      this.sidebarOpen = !this.sidebarOpen;
      if (this.sidebarOpen) this.leftPadding = "padding-left: 170px";
      else this.leftPadding = "padding-left: 0";
      this.$emit("currentPaddingLeft", { padding: this.leftPadding });
    },
    deleteArticle() {
      const access_token = localStorage.getItem("access_token");
      const id = this.article._id;
      axios({
        method: "DELETE",
        url: `/articles/${id}`,
        headers: {
          access_token
        }
      })
        .then(({ data }) => {
          Swal.fire({
            title: "Success!",
            text: "Delete article success",
            icon: "success",
            confirmButtonText: "Okay"
          });
          this.$emit("currentPage", { page: "dashboard-page" });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            title: "Error!",
            text: `${err.message}`,
            icon: "error",
            confirmButtonText: "Okay"
          });
        });
    }
  }
};
</script>

<style>
#sidebar-wrapper {
  z-index: 10;
  position: fixed;
  width: 0;
  height: 100%;
  overflow-y: hidden;
  background: #c3c3c3;
  opacity: 0.9;
  transition: all 0.5s;
  display: flex;
  align-items: flex-start;
}

#button-sidebar {
  z-index: 9;
  width: 170px;
  display: inline-block;
}

.page-content-wrapper {
  width: 100%;
  position: absolute;
  transition: all 0.5s;
}

#menu-toggle {
  transition: all 0.3s;
  font-size: 2em;
  text-align: left;
}

#sidebar.menuDisplayed #sidebar-wrapper {
  width: 170px;
}

#sidebar.menuDisplayed .page-content-wrapper {
  padding-left: 170px;
}

.sidebar-nav {
  padding: 0;
  list-style: none;
  transition: all 0.5s;
  width: 100%;
  text-align: center;
}

.sidebar-nav li {
  line-height: 25px;
  width: 100%;
  transition: all 0.3s;
  padding: 19px;
}

.sidebar-nav li a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
}

.sidebar-nav li:hover {
  background: #808080;
}
</style>
