<template>
  <a href="#" class="btn btn-primary" v-on:click="signOut">Google Sign out</a>
</template>

<script>
export default {
  name: 'GoogleSignOut',
  methods: {
    signOut() {
      const auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(function () {
        console.log('keluar pak eko')
        console.log('User sign out')
      })
    }
  }
}
</script>

<style>

</style>
