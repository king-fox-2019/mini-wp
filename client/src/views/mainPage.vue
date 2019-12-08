<template>
    <div id="mainPage">
        <navBar v-on:changePage="changingPage" v-on:showNavBar="showingNavBar" :articleArray="articleArray" v-if="showNavBar"></navBar>
        <loginRegister v-on:changePage="changingPage" v-on:showNavBar="showingNavBar" v-if="showPage === 'loginRegister'"></loginRegister>
        <bodyContent v-on:setArticleArray="settingArticleArray" v-if="showPage === 'bodyContent'"></bodyContent>
        <articleDetail v-if="showPage === 'articleDetail'"></articleDetail>
        <postNewArticle v-on:changePage="changingPage" v-if="showPage === 'postNewArticle'"></postNewArticle>
        <!-- <h1 style="border : solid 1px green">mainPage.vue</h1> -->
    </div>
</template>




<script>
import loginRegister from '../components/loginRegister'
import bodyContent from '../components/bodyContent';
import articleDetail from '../components/articleDetail'
import postNewArticle from '../components/postNewArticle';
import navBar from '../components/navBar'
import buttonCounter from '../components/buttonCounter'

export default {
    components:{
        navBar,
        loginRegister,
        bodyContent,
        articleDetail,
        postNewArticle
    },
    data: function() {
        return {
            showPage:'loginRegister', //default
            showNavBar: false, //default
            // showPage:'bodyContent',
            // showNavBar: true
            message:'test',
            articleArray:[]
        }
    },
    methods:{
        changingPage(page)
          {
              this.showPage = page
          },
        showingNavBar(status)
          {
              this.showNavBar = status
          },
        settingArticleArray(articleArray)
          {
              this.articleArray = articleArray
          }
    }




}
</script>



<style>

</style>