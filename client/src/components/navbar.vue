<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-navbar-brand href="#" class="ml-3">
        <img
          src="https://image.flaticon.com/icons/svg/2/2041.svg"
          class="d-inline-block align-top img-fluid"
          style="width: 32px"
          alt="Kitten"
        /> MiniWP
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto align-items-center">
          <b-nav-item href="#" v-if="islogin">
            <b-button size="sm" class="my-2 my-sm-0 btn btn-primary" v-b-modal.modal-add-article>Add Article</b-button>
          </b-nav-item>
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          </b-nav-form>
          <b-nav-item href="#" v-if="!islogin">
            <b-button size="sm" class="my-2 my-sm-0 btn btn-success" v-b-modal.modal-login>Login</b-button>
          </b-nav-item>
          <b-nav-item-dropdown right v-if="islogin">
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal id="modal-login" title="" hide-footer hide-header>
      <login-register @set-login="setLogin"></login-register>
    </b-modal>
    <b-modal id="modal-add-article" title="Add article" hide-footer>
      <article-add @add-article="addArticle"></article-add>
    </b-modal>
  </div>
</template>

<script>
import loginRegister from "./login-register"
import articleAdd from "./article-add"
export default {
  name: "navbar",
  props: ["islogin"],
  components: {
    loginRegister,
    articleAdd
  },
  methods: {
    setLogin: function() {
      this.$emit("set-login", true);
      this.$bvModal.hide("modal-login");
    },
    logout: function() {
      localStorage.clear()
      this.$emit('set-login', false)
    },
    addArticle: function(article) {
      this.$bvModal.hide("modal-add-article");
      this.$root.$emit('add-article', article)
    }
  }
};
</script>

<style>
</style>