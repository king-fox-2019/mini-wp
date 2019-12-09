<template>
  <div>
        <landingPage @authorLogin="changeLogin" v-if="!login"></landingPage>
        <homePage @authorLogout="changeLogin" v-if="login"></homePage>
  </div>
</template>

<script>

import landingPage from './views/landingPage'
import homePage from './views/homePage'


export default {
    data() {
        return {
            login: false
        }
    },
    methods: {
        changeLogin(value) {
            this.login = value
        },
        isLogin() {
            if (localStorage.getItem('access_token')) {
                this.login = true
            } else {
                this.login = false
            }
        }
    },
    created() {
        this.isLogin()
    },
    components: {
        landingPage,
        homePage
    }
}

</script>

<style>
    * {
        font-family:Arial, Helvetica, sans-serif;
        list-style-type: none;
        padding: 0;
    }
    input[type="text"], input[type="password"] {
        width: 100%;
        height: 3rem;
        padding: 0 1rem;
    }
</style>