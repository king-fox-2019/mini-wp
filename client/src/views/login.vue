<template>
   <section class="hero is-primary is-fullheight" style=" background-image: url('../../img/home.jpg');">
    <div class="hero-body">
        <div class="container">
        <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">

            <registerform v-if="page === 'register'" @loginStatus='isLogin' @pageStatus='gantiPage'></registerform>
            <loginform v-if="page === 'login'" @loginStatus='isLogin' @pageStatus='gantiPage'></loginform>

            </div>
        </div>
        </div>
    </div>
    </section> 
</template>

<script>

import loginform from '../components/loginform'
import registerform from '../components/registerform'

export default {
    name:'login-page',
    data() {
        return {
            page : 'login',
            show: true
        }
    },
    components :{
        loginform,
        registerform
    },
    methods : {
        isLogin(status){
            this.$emit('loginStatus',status)
        },
        gantiPage(page){
            this.page = page
        }
    }

}
</script>

<style>

</style>