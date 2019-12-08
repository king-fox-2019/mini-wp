<template>
    <div>
        <div class="row mt-4">
            <div class="col-3"></div>
                <div class="col mt-5">
                <h1 v-if="taglist">search tag <i><u>{{ nameTag }}</u></i>
                    <button type="button" @click.prevent="findAllArticles" class="btn btn-success ml-3 p-0">
                        <i class="fas fa-spinner refresh p-3"></i>
                    </button>
                </h1>
                <div class="inputSearch" v-if="!taglist" style="border: 2px solid #C3C4C7">
                    <div class="input-group py-1">
                        <div class="input-group-prepend" >
                            <div class="input-group-text" style="background-color: #FFFFFF; border: none;">
                                <i class="fas fa-search pl-2 pr-0"></i>
                            </div>
                        </div>
                        <input v-model="searchTitle" v-if="titleFlag" type="text" class="form-control searchInput" style="border: none;" id="inlineFormInputGroup" placeholder="Search By Title">
                        <input v-model="searchTag" v-else-if="tagFlag" type="text" class="form-control searchInput" style="border: none;" id="inlineFormInputGroup" placeholder="Search By Tag">
                        <input v-model="searchAuthor" v-else-if="authorFlag" type="text" class="form-control searchInput" style="border: none;" id="inlineFormInputGroup" placeholder="Search By Author">
                    </div>
                </div>
            </div>  
            <div class="col-3"></div>
        </div>
        <div class="row mt-1">
            <div class="col-3"></div>
            <div class="col">
                <div class="d-flex flex-column" v-if="articles.length==0">
                    <img src="../public/img/not-found.gif" class="mt-5 mx-auto" style="width:60%;" alt="image">
                    <span class="ml-4 mx-auto" style="font-weight:bold; font-size: 3em; color: #3F3859;">Articles Not Found</span>
                </div>
                <reader-article-card
                    @changeListTag="changeListTag"
                    v-for="article in filterArticle" :key="article._id"
                    :article="article"
                ></reader-article-card>
            </div>
            <div class="col-3"></div>
        </div>
        <div class="row mt-5">
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../../apis/server.js'
import CardArticle from './CardContent.vue'
export default {
    props : ['reader','titleFlag','tagFlag','authorFlag'],
    data() {
        return {
            articles : [],
            searchTitle : '',
            searchTag : '',
            searchAuthor : '',
            taglist: false,
            nameTag : ''
        }
    },
    components : {
        'reader-article-card' : CardArticle
    },
    methods: {
        changeListTag(data,tag){
            this.taglist = true
            this.articles = data
            this.nameTag = tag
        },
        findAllArticles(){
            Swal.fire({
                title: 'Loading!',
                text: '',
                imageUrl: 'https://loading.io/mod/spinner/square/index.svg',
                // imageWidth: 400,
                // imageHeight: 200,
                // timer: 2500,
                imageAlt: 'Custom image',
                showConfirmButton: false,
                showCancelButton: false,
                confirmButtonText: 'نعم',
                cancelButtonText: 'لا',
            })
            this.taglist = false
            axios({
                url : '/article',
                method : 'GET',
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({ data })=>{
                this.articles = data
                Swal.close()
            })
            .catch(err=>{
                Swal.close()
                console.log(err);
            })
        }
    },
    created() {
        this.findAllArticles()
    },
    computed: {
        filterArticle() {
            if (this.titleFlag) {
                this.searchTag = ''
                this.searchAuthor = ''
                return this.articles.filter(article => {
                    return article['title'].toLowerCase().includes(this.searchTitle.toLowerCase())
                })
            } else if (this.tagFlag) {
                this.searchTitle = ''
                this.searchAuthor = ''
                return this.articles.filter(article => {
                    return article['tag'].some(tag=>{
                        if (tag.toLowerCase().includes(this.searchTag.toLowerCase())) {
                            return article
                        }
                    })
                })
            } else if (this.authorFlag) {
                this.searchTitle = ''
                this.searchTag = ''
                return this.articles.filter(article => {
                    return article['author'].name.toLowerCase().includes(this.searchAuthor.toLowerCase())
                })
            } else {
                return this.articles
            }
        }
    }
}
</script>

<style scoped>
.refresh{
    transition: 0.8s;
}
.refresh:hover{
    transform: rotate(360deg)
}
.searchInput:focus{
    box-shadow: none;
}
.inputSearch{
    transition: 0.8s;
}
.inputSearch:focus-within{
    box-shadow: 0px 0px 0px 3px rgba(44, 113, 177, 0.39);
}
</style>