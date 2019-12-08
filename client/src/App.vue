<template>
    <div>
        <navbar @showarticles="showarticles" @islogin="isLogin" @islogout="isLogout" :deletetoken="deletetoken"></navbar>
        <homepage v-if="needHomePage" @showdetail="showDetail"></homepage>
        <detailarticle v-if="needDetail" :article="article"></detailarticle>
        <dashboard v-if="needLogin" @logout="isLogout"></dashboard>
    </div>
</template>

<script>
import navbar from './components/navbar'
import homepage from './components/homepage'
import detailarticle from './components/detailArticle'
import dashboard from './components/dashboard'

export default {
    components: {
        navbar,
        homepage,
        detailarticle,
        dashboard
    },
    data() {
        return {
            needDetail: false,
            needHomePage: true,
            article: {},
            needLogin: false,
            deletetoken: false
        }
    },
    methods: {
        showDetail(article) {
            this.article = article
            console.log(this.article)
            this.needDetail = true
            this.needHomePage = false
            this.needLogin = false
        },
        showarticles() {
            this.needHomePage = true
            this.needDetail = false
            this.needLogin = false

        },
        isLogin() {
            this.needHomePage = false
            this.needDetail = false
            this.needLogin = true
        },
        isLogout() {
            this.needHomePage = true
            this.needDetail = false
            this.needLogin = false
            this.deletetoken = true
        }
    },
    created() {
        if (localStorage.token) this.isLogin()
    }
}
</script>

<style>

</style>