<template>
    <div>
        <navbar @show-register="showRegister" @show-login="showLogin" @back-home="showMainPage"></navbar>
        <landingPage v-if="mainPage"></landingPage>
        <usercontrol v-if="!isLogin && !mainPage" :show-register="registerPage" :show-login="loginPage"></usercontrol>
        <createArticle v-if="isLogin && createArticle"></createArticle>
    </div>
</template>

<script>

import landingPage from './views/LandingPage'
import navbar from './components/Navbar'
import usercontrol from './views/UserControl'
import createArticle from './views/CreateArticle'

export default {
    components:{
        landingPage,
        navbar,
        usercontrol,
        createArticle
    },
    data(){
        return {
            isLogin: false,
            mainPage: true,
            registerPage: false,
            loginPage: false
        }
    },
    methods:{
        checkLogin(){
            let token = localStorage.getItem('token')
            if(token){
                this.isLogin = true
            }else{
                this.isLogin = false
            }   
        },
        showRegister(){
            this.registerPage = true
            this.loginPage = false
            this.mainPage = false
        },
        showLogin(){
            this.loginPage = true
            this.registerPage = false
            this.mainPage = false
        },
        showMainPage(){
            this.mainPage = true
            this.registerPage = false
            this.loginPage = false
        }
    },
    created(){
        this.checkLogin()
    }
}
</script>

<style>

</style>