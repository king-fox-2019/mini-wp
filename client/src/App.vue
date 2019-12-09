<template>
  <div>
      <Navbar v-if="!isLoggedIn"></Navbar>
      <DashboardNav v-else @session="setSession"></DashboardNav>
      <div class="row">
        <div class="col-1">
          <Sidebar v-if="isLoggedIn"></Sidebar>
        </div>
        <div class="col-11 content col-offset-3">
          <router-view @session="setSession"></router-view>
        </div>
      </div> 
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import DashboardNav from './components/DashboardNav'
import Sidebar from './components/Sidebar'
export default {
    name: 'App',
    data () {
      return {
        isLoggedIn: localStorage.getItem('jwt_token')
      }
    },
    components: {
      Navbar,
      DashboardNav,
      Sidebar
    },
    methods: {
      setSession(bool) {
        this.isLoggedIn = bool;
      }
    }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  background-color: white;
}

.row {
  max-width: 100vw;
}

.content {
  margin: 0;
  padding-top: 6rem;
}
</style>