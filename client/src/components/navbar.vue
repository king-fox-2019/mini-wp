<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-navbar-brand href="#" class="ml-5">
        <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten" /> MiniWP
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto align-items-center">
          <b-nav-item href="#">
            <b-button size="sm" class="my-2 my-sm-0 btn btn-outline-primary">Add Article</b-button>
          </b-nav-item>
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          </b-nav-form>
          <b-nav-item href="#">
            <b-button size="sm" class="my-2 my-sm-0 btn btn-success" v-b-modal.modal-login>Login</b-button>
          </b-nav-item>
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal id="modal-login" title="BootstrapVue" hide-footer>
      <login-register @set-login="setLogin"></login-register>
    </b-modal>
  </div>
</template>

<script>
import loginRegister from './login-register'
export default {
  name: "navbar",
  components: {
    loginRegister
  },
  methods: {
    setLogin: function() {
      this.$bvModal.hide('modal-login')
    }
  }
};
</script>

<style>
</style>