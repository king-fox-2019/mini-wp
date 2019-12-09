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
        :showDraft="showDraftArticle"
        :showDetail="showDetailArticle"
        @detail-article="detailArticle"
        @edit-article="editArticle"
        @go-homepage="showMainPage"
        @go-draft="getDraft"
        :bookmark="bookmarkUser"
        :tags="tags"
        @search="searchArticle">
        </landingPage>
        <usercontrol v-if="!isLogin && !mainPage" 
        :show-register="registerPage" 
        :show-login="loginPage" 
        @to-login="changeToLogin" 
        @to-mainpage="thereUserLogin" 
        @user-login="setUserLogin">
        </usercontrol>
        <createArticle 
        v-if="isLogin && displayCreateArticle" 
        @go-homepage="showMainPage"
        :article="currentArticle">
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
            displayCreateArticle: false,
            userLogin: {},
            publishArticle: [],
            draftArticle: [],
            showDraftArticle: false,
            showDetailArticle: false,
            currentArticle: {},
            bookmarkUser: [],
            tags: []
        }
    },
    methods:{
        checkLogin(){
            let token = localStorage.getItem('token')
            if(token){
                this.isLogin = true
                this.whoIsLogin()
                this.getFavorites()
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
            this.fethcingArticlePublished()
            this.mainPage = true
            this.registerPage = false
            this.loginPage = false
            this.displayCreateArticle = false
            this.showDraftArticle = false
            this.showDetailArticle = false
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
            this.currentArticle = {}
            this.displayCreateArticle = true
            this.mainPage = false
            this.showDetailArticle = false
        },
        getPublish(){
            this.fethcingArticlePublished()
            this.currentArticle = {}
            this.mainPage = true
            this.registerPage = false
            this.loginPage = false
            this.displayCreateArticle = false
            this.showDraftArticle = false
            this.showDetailArticle = false
        },
        getDraft(){
            this.fethcingDraftArticle()
            this.mainPage = true
            this.showDraftArticle = true
            this.showDetailArticle = false
            this.displayCreateArticle = false
            this.currentArticle = {}
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
                this.getTags()
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
        },
        detailArticle(){
            this.showDetailArticle = true
        },
        editArticle(id){
            articleServer({
                url: `/${id}`,
                method: 'GET',
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.currentArticle = data
                this.displayCreateArticle = true
                this.mainPage = false
                this.showDetailArticle = false
            })
            .catch(err =>{
                Alert.Swal.fire({
                    icon: 'error',
                    title: 'Edit article',
                    text: `${err.response.data.message}`
                })
            })
        },
        getFavorites(){
            UserServer({
                url: `/profile`,
                method: 'GET',
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.bookmarkUser = data.favorites
                console.log(this.bookmarkUser)
            })
            .catch(err => {
                Alert.Swal.fire({
                    icon: 'error',
                    title: 'Favorite User',
                    text: `${err.response.data.message}`
                })
            })
        },
        getTags(){
            let filteredTags = []
            let articles = this.publishArticle
            articles.forEach(element => {
                let tag = element.tags
                tag.forEach(data => {
                    if(!filteredTags.includes(data)){
                        filteredTags.push(data)
                    }
                })
            });
            this.tags = filteredTags
        },
        searchArticle(tag){
            articleServer({
                url: '/publish',
                method: 'GET',
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
            let tagFiltered = []
            let arr = data
            arr.forEach(element => {
                if(element.tags.includes(tag)){
                    tagFiltered.push(element)
                }
            })  
            this.publishArticle = tagFiltered
            })
            .catch(err => {

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