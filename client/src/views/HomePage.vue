<template>
    <div v-if="isLogin">
        <div class="row">
            <home-leftbar
                @search="search"
                :mainPage="mainPage"
                :myPage="myPage"
                v-if="mainPage"
                :createArticle="createArticle"
                @toggle="toggle"
                ></home-leftbar>
        <div class="col" style="background-color: #FFFFFF;">
            <home-maincontent
                style="height:94vh; overflow-x: hidden"
                v-if="mainPage"
                :titleFlag="titleFlag"
                :tagFlag="tagFlag"
                :authorFlag="authorFlag"
                ></home-maincontent>
            <home-mycontent
                :mainPage="mainPage"
                :myPage="myPage"
                v-if="myPage"
            ></home-mycontent>
            <home-writearticle
                v-if="createArticle"
                ></home-writearticle>
        </div>
    </div>
</template>

<script>
import MyContent from '../components/MyContent.vue'
import LeftBar from '../components/LeftBar.vue'
import MainContent from '../components/MainContent.vue'
import CreateArticle from '../components/WriteArticle.vue'
export default {
    props : ['isLogin','myPage','mainPage'],
    data() {
        return {
            createArticle : false,
            titleFlag : true,
            tagFlag : false,
            authorFlag : false,
        }
    },
    methods: {
        search(val){
            console.log(val);
            if (val == 'title') {
                this.titleFlag = true,
                this.tagFlag = false,
                this.authorFlag = false
            } else if (val == 'tag'){
                this.tagFlag = true,
                this.titleFlag = false,
                this.authorFlag = false
            } else if (val == 'author'){
                this.authorFlag = true,
                this.tagFlag = false,
                this.titleFlag = false
            }
        },
        toggle(){
            this.$emit('toggler')
        }
    },
    components : {
        'home-leftbar' : LeftBar,
        'home-maincontent' : MainContent,
        'home-writearticle' : CreateArticle,
        'home-mycontent' : MyContent
    }
}
</script>

<style>

</style>