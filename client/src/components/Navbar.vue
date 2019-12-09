<template>
  <b-navbar :fixed-top="fixed" class="mediaz">
    <template slot="brand">
      <b-navbar-item v-on:click="backHome()">
        <img src="../../assets/image/logo.png" alt style="margin-top: ; height: 50px;" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-field id="searchBar">
        <b-input
          placeholder="Search articles..."
          type="search"
          size="is-small"
          icon="magnify"
          v-model="search"
        ></b-input>
        <p class="control">
          <b-button class="button" size="is-small">Search</b-button>
        </p>
      </b-field>
    </template>
    <template slot="end">
      <b-navbar-item v-if="!userLogin">
        <p class="control">
          <b-button
            style="border: none;"
            class="button is-active"
            size="is-small"
            @click="loginActive"
          >Sign In</b-button>
        </p>
        <p class="control">
          <b-button
            style="border: none;"
            class="button is-active"
            size="is-small"
            @click="registerActive"
          >Sign Up</b-button>
        </p>
      </b-navbar-item>
      <b-dropdown position="is-bottom-left" aria-role="menu" v-if="userLogin">
        <a class="navbar-item" slot="trigger" role="button">
          <span>
            <b-icon icon="account-circle"></b-icon>
            <b-icon icon="menu-down"></b-icon>
          </span>
        </a>

        <b-dropdown-item custom aria-role="menuitem">
          Logged as {{namez}}
          <b></b>
        </b-dropdown-item>
        <hr class="dropdown-divider" />
        <b-dropdown-item aria-role="menuitem" @click="myProfile">
          <b-icon icon="link"></b-icon>My articles
        </b-dropdown-item>
        <b-dropdown-item value="My Drafts" aria-role="menuitem" @click="myDrafts">
          <b-icon icon="home"></b-icon>My Drafts
        </b-dropdown-item>
        <b-dropdown-item value="My Bookmark" aria-role="menuitem" @click="myBookmark">
          <b-icon icon="book-open"></b-icon>My Bookmark
        </b-dropdown-item>
        <hr class="dropdown-divider" aria-role="menuitem" />
        <b-dropdown-item value="logout" aria-role="menuitem" @click="conLogout">
          <b-icon icon="logout"></b-icon>Logout
        </b-dropdown-item>
      </b-dropdown>
      <b-navbar-item v-if="userLogin">
        <p class="control">
          <b-button class="button is-active" size="is-small" @click="createArticle">share new story</b-button>
        </p>
      </b-navbar-item>
      <b-modal
        :active.sync="loginRegisterActive"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal
      >
        <modal-form @gotuser="isLoggedIn" :tab="tab"></modal-form>
      </b-modal>
    </template>
  </b-navbar>
</template>

<script>
import ModalForm from "../components/ModalLogReg";

export default {
  components: {
    ModalForm
  },
  props: ["userLogin"],
  name: "navbar",
  data() {
    return {
      namez: localStorage.getItem("name"),
      expanded: false,
      fixed: true,
      loginRegisterActive: false,
      msgGithub: "",
      tab: "",
      tokenFind: false,
      search: ""
    };
  },
  methods: {
    isLoggedIn() {
      this.$emit("loggedIn");
    },
    loginActive() {
      this.loginRegisterActive = true;
      this.tab = "login";
    },
    registerActive() {
      this.loginRegisterActive = true;
      this.tab = "register";
    },
    createArticle() {
      if (this.$router.currentRoute.path !== "/addarticle") {
        this.$router.push({ path: "/addarticle" });
      }
    },
    backHome() {
      if (this.$router.currentRoute.name !== "home") {
        this.$router.push({ path: "/" });
      }
    },
    findToken() {
      if (localStorage.getItem("token")) {
        this.tokenFind = true;
      } else {
        this.tokenFind = false;
      }
    },
    userLeave() {
      this.$gAuth
        .signOut()
        .then(() => {
          this.$emit("logout");
          if (this.$router.currentRoute.name !== "home") {
            localStorage.clear();
            this.$router.push({ path: "/" });
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.$emit("logout");
      if (this.$router.currentRoute.name !== "home") {
        localStorage.clear();
        this.$router.push({ path: "/" });
      } else {
        localStorage.clear();
      }
    },
    myProfile() {
      if (this.$router.currentRoute.name !== "myarticle") {
        this.$router.push({ path: "/myarticle" });
      }
    },
    myDrafts() {
      if (this.$router.currentRoute.name !== "draft") {
        this.$router.push({ path: "/draft" });
      }
    },
    myBookmark() {
      if (this.$router.currentRoute.name !== "bookmark") {
        this.$router.push({ path: "/bookmark" });
      }
    },
    conLogout() {
      this.$buefy.dialog.confirm({
        title: "Logout",
        message: "Are you sure?",
        confirmText: "Yes",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.userLeave()
      });
    }
  },
  watch: {
    search() {
      this.$emit("search", this.search);
    }
  },
  created() {
    this.findToken();
  }
};
</script>

<style scoped>
.navbar-start,
#searchBar {
  margin: 13px;
  width: 100%;
  overflow: hidden;
}

* {
  box-shadow: none;
}
#nav {
  border: 1px solid black;
}
</style>