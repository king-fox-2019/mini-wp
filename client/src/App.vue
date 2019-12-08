<template>
    <div>
        <navbar 
        @show-register="showRegister" 
        @show-login="showLogin" 
        @back-home="showMainPage" 
        :user="userLogin" :isLogin="isLogin" 
        @user-logout="userLogout" 
        @show-createArticle="showCreateArticle"
        @publish-article="getPublish"
        @draft-article="getDraft">
        </navbar>
        <landingPage v-if="mainPage" 
        :isLogin="isLogin"
        :publisharticle="publishArticle"
        :draftarticle="draftArticle"
        :showDraft="showDraftArticle">
        </landingPage>
        <usercontrol v-if="!isLogin && !mainPage" 
        :show-register="registerPage" 
        :show-login="loginPage" 
        @to-login="changeToLogin" 
        @to-mainpage="thereUserLogin" 
        @user-login="setUserLogin">
        </usercontrol>
        <createArticle 
        v-if="isLogin && showArticle" 
        @go-homepage="showMainPage">
        </createArticle>
    </div>
</template>

<script>

import landingPage from './views/LandingPage'
import navbar from './components/Navbar'
import usercontrol from './views/UserControl'
import createArticle from './views/CreateArticle'
import UserServer from '../api/user'
import articleServer from '../api/article'
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
            userLogin: {},
            publishArticle: [],
            draftArticle: [],
            showDraftArticle: false
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
            this.showArticle = false
            this.showDraftArticle = false
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
                url: '/profile',
                method: 'GET',
                headers:{
                    access_token: token
                }
            })
            .then(({data})=>{
                this.userLogin = data
            })
            .catch(err =>{
                Alert.Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${err.response.data.message}`
                })
            })
        },
        userLogout(){
            this.mainPage = true
            this.registerPage = false
            this.loginPage = false
            this.isLogin = false
            Alert.Toast.fire({
                icon: 'success',
                title: 'User Logout',
                text: 'User Logout Success!'
            })
        },
        showCreateArticle(){
            this.showArticle = true
            this.mainPage = false
        },
        getPublish(){
            this.fethcingArticlePublished()
            this.mainPage = true
            this.registerPage = false
            this.loginPage = false
            this.showArticle = false
            this.showDraftArticle = false
        },
        getDraft(){
            this.fethcingDraftArticle()
            this.showDraftArticle = true
        },
        fethcingArticlePublished(){
            articleServer({
                url: '/publish',
                method: 'GET',
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.publishArticle = data.reverse()
            })
            .catch(err => {
                Alert.Swal.fire({
                    icon: 'error',
                    title: 'Fetching Data',
                    text: `${err.response.data.message}`
                })
            })
        },
        fethcingDraftArticle(){
            articleServer({
                url: '/draft',
                method: 'GET',
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.draftArticle = data.reverse()
            })
            .catch(err => {
                Alert.Swal.fire({
                    icon: 'error',
                    title: 'Fetching Data',
                    text: `${err.response.data.message}`
                })
            })
        }
    },
    created(){
        this.checkLogin()
        this.fethcingArticlePublished()
    },
    computed:{
    }
}
</script>

<style>

</style>