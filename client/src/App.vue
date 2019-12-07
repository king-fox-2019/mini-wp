<template>
    <div>
        <navbar @show-register="showRegister" @show-login="showLogin" @back-home="showMainPage" :user="userLogin" :isLogin="isLogin"></navbar>
        <landingPage v-if="mainPage"></landingPage>
        <usercontrol v-if="!isLogin && !mainPage" :show-register="registerPage" :show-login="loginPage" @to-login="changeToLogin" @to-mainpage="thereUserLogin" @user-login="setUserLogin"></usercontrol>
        <createArticle v-if="isLogin && showArticle"></createArticle>
    </div>
</template>

<script>

import landingPage from './views/LandingPage'
import navbar from './components/Navbar'
import usercontrol from './views/UserControl'
import createArticle from './views/CreateArticle'
import UserServer from '../api/user'
import Alert from './public/Alert'

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
            loginPage: false,
            showArticle: false,
            userLogin: {}
        }
    },
    methods:{
        checkLogin(){
            let token = localStorage.getItem('token')
            if(token){
                this.isLogin = true
                this.whoIsLogin()
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
        },
        changeToLogin(){
            this.registerPage = false
            this.loginPage = true
            this.mainPage = false
        },
        setUserLogin(val){
            this.userLogin = val
        },
        thereUserLogin(){
            this.mainPage = true
            this.registerPage = false
            this.loginPage = false
            this.isLogin = true
        },
        whoIsLogin(){
            let token = localStorage.getItem('token')
            UserServer({
                url: `/${token}`,
                method: 'GET',
                headers:{
                    access_token: token
                }
            })
            .then(({data})=>{
                this.userLogin = data.user
            })
            .catch(err =>{
                Alert.Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${err.response.data.message}`
                })
            })
        }
    },
    created(){
        this.checkLogin()
    }
}
</script>

<style>

</style>