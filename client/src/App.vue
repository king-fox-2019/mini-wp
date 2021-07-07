<template>
    <div>
        <app-navbar
            v-if="!createButton"
            @toggler="toggler"
            @createArticle="createArticle"
            @checkForm="checkForm"
            :loginText="loginText"
            :isLogin="isLogin"
            :mainPage="mainPage"
            :myPage="myPage"
            @loginSuccess="loginSuccess"
            ></app-navbar>
        <app-formUser
            :isLogin="isLogin"
            :loginText="loginText"
            @checkForm="checkForm"
            @loginSuccess="loginSuccess"
            ></app-formUser>
        <app-create-article
            @createArticle="createArticle"
            v-if="createButton"
            ></app-create-article>
        <app-HomePage
            v-if="!createButton"
            :isLogin="isLogin"
            :myPage="myPage"
            :mainPage="mainPage"
            @toggler="toggler"
            ></app-HomePage>
    </div>
</template>

<script>
import CreateArticle from './views/CreateArticle'
import HomePage from './views/HomePage.vue'
import navbar from './views/navbar.vue'
import formUser from './views/form.vue'
export default {
    name : 'app',
    data() {
        return {
            loginText : true,
            isLogin: false,
            createButton : false,
            myPage : false,
            mainPage : true,
        }
    },
    methods: {
        checkForm(flag){
            if (flag) {
                this.loginText = flag
            } else {
                this.loginText ? this.loginText = false : this.loginText = true
            }
        },
        loginSuccess(){
            this.isLogin ? this.isLogin = false : this.isLogin = true
        },
        createArticle(){
            this.createButton ? this.createButton = false : this.createButton = true
        },
        publish(){
            // console.log('assa');
        },
        toggler(){
            if(this.myPage){
                this.myPage = false,
                this.mainPage = true
            } else if(this.mainPage) {
                this.myPage = true,
                this.mainPage = false
            }
        }
    },
    created() {
        if(localStorage.getItem('token')){
            this.isLogin = true
        }
    },
    components: {
        'app-navbar' : navbar,
        'app-formUser' : formUser,
        'app-HomePage': HomePage,
        'app-create-article' : CreateArticle
    },
}
</script>

<style>

</style>