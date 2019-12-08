<template>
    <div>
        <div class="row">
            <div class="col-2 pr-0" style="border-right: 1px solid rgb(228, 228, 228); height: 95vh;">
                <div class="d-flex flex-column" v-if="!mainPage">
                    <div style="background-color: #FFFFFF;" class="py-3">
                        <div class="d-flex flex-row">
                            <div :style="profil" class="ml-4">
                            </div>
                            <div class="d-flex flex-column">
                                <span class="ml-2" style="font-size: 16px;">{{name}}</span>
                                <span class="ml-2" style="font-size: 10px;">{{email}}</span>
                            </div>
                            <br>
                        </div>
                        <div class="d-flex flex-row mt-1 ml-5">
                            <span style="background-color: #DCDCDE; font-size: 13px;" class="ml-4 px-3 rounded-top rounded-bottom rounded-left rounded-right"> Private </span>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column" v-if="!mainPage">
                    <div style="background-color: #558D1E;" class="py-2">
                        <div class="d-flex flex-row ml-2 align-center" style="color: white;">
                            <i class="fas fa-info-circle"></i>
                            <span class="ml-2" style="font-size: 13px; cursor: pointer;">Your are free account</span>
                            <span class="ml-auto mr-2 align-center upgrade-btn">UPGRADE</span>
                    </div>
                        </div>
                </div>
                <div class="d-flex flex-column" v-if="edited">
                    <div class="ButtonMySite py-2">
                        <div @click.prevent="saving" class="d-flex flex-row ml-5 py-2 align-items-center" style="color: #1D2327;">
                            <i class="fas fa-save ml-3" style="color: rgb(107, 107, 107); font-size: 25px;"></i>
                            <span class="ml-2" style="font-size: 17px;">Save</span>
                        </div>
                    </div>
                </div>
                <!-- <div class="d-flex flex-column" v-if="!mainPage"> -->
                    <!-- <div class="ButtonMySite py-2"> -->
                        <!-- <div class="d-flex flex-row ml-5 py-2 align-items-center" style="color: #1D2327;"> -->
                            <!-- <i class="fas fa-trash ml-3" style="color: rgb(107, 107, 107); font-size: 25px;"></i> -->
                            <!-- <span class="ml-2" style="font-size: 17px;">Delete</span> -->
                        <!-- </div> -->
                    <!-- </div> -->
                <!-- </div> -->
                <div class="d-flex flex-column" v-if="edited">
                    <div class="ButtonMySite py-2">
                        <div class="d-flex flex-row ml-5 py-2 align-items-center" style="color: #1D2327;" data-toggle="collapse" data-target="#collapseExamplea" aria-expanded="false" aria-controls="collapseExample">
                            <i class="fas fa-images ml-3" style="color: rgb(107, 107, 107); font-size: 25px;"></i>
                            <span class="ml-2" style="font-size: 17px;">Images</span>
                        </div>
                    </div>
                </div>
                <div class="collapse" id="collapseExamplea">
                    <div class="card card-body p-1">
                        <input @change="onFileChange" type="file" class="form-control pb-5" multiple="">
                    </div>
                </div>
                <div class="d-flex flex-column" v-if="edited">
                    <div class="ButtonMySite py-2">
                        <div class="d-flex flex-row ml-5 py-2 align-items-center" style="color: #1D2327;" data-toggle="collapse" data-target="#collapseExamples" aria-expanded="false" aria-controls="collapseExample">
                            <i class="fas fa-tags ml-3" style="color: rgb(107, 107, 107); font-size: 25px;"></i>
                            <span class="ml-2" style="font-size: 17px;">Tags</span>
                        </div>
                    </div>
                </div>
                <div class="collapse" id="collapseExamples">
                    <div class="card card-body pt-2">
                        <div class="col-auto">
                            <label class="sr-only" for="inlineFormInputGroup">tags</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <i class="fas fa-tags"></i>
                                    </div>
                                </div>
                                <input v-model="addtag" type="text" v-on:keyup.enter="tagAdd" class="form-control inputTags" id="inlineFormInputGroup" placeholder="Javascript, hacktiv8, etc..">
                            </div>
                            <div class="row mt-2 ml-1">
                            <article-tags
                                v-for="(tag,i) in tags" :key="i"
                                :tag="tag" :i="i"
                                ></article-tags>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ---------- -->
        <div class="col mr-3" v-if="edited" style="height:94vh; overflow-y:scroll;">
            <input type="text" v-model="title"
                class="form-control mt-5 py-5 text-center addTitle"
                name="" id="" aria-describedby="helpId" placeholder="Add title">
            <div :style="styleImage" class="mt-3 mx-auto"></div>
            <wysiwyg v-model="myHTML" class="mt-3 mb-5 text-center"> </wysiwyg>
        </div>    
        <div class="col mt-4" v-if="!edited">
            <div class="ml-5 col-5 mt-1">
                <div class="inputSearch" style="border: 2px solid #C3C4C7">
                    <div class="input-group py-1">
                        <div class="input-group-prepend" >
                            <div class="input-group-text" style="background-color: #FFFFFF; border: none;">
                                <i class="fas fa-search pl-2 pr-0"></i>
                            </div>
                        </div>
                        <input v-model="search" type="text" class="form-control searchInput" style="border: none;" id="inlineFormInputGroup" placeholder="Search By Title">
                    </div>
                </div>
            </div>
            <div class="row" v-if="!edited">
                <div class="col d-flex flex-wrap justify-content-center pb-5 mr-3" style="overflow-y:scroll; height :87vh;">
                    <div class="d-flex flex-column" v-if="articles.length==0">
                        <img src="../public/img/not-found.gif" class="mt-5" style="width:60%;" alt="image">
                        <span class="ml-4" style="font-weight:bold; font-size: 3em; color: #3F3859;">Article Not Found</span>
                    </div>
                    <reader-article-card
                        @editedTrigger="editedTrigger"
                        @findAllArticles="findAllArticles"
                        style="width:30%; height:auto;"
                        v-for="article in filterArticle" :key="article._id"
                        :article="article"
                    ></reader-article-card>
                </div>
            </div>
        </div>        
    </div>
</div>
            
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../../apis/server.js'
import CardArticle from './MyCardContent.vue'
import Tags from '../components/ListTag'

export default {
    props : ['reader','mainPage'],
    data() {
        return {
            name : localStorage.getItem('name'),
            email : localStorage.getItem('email'),
            profil : `background: url('${localStorage.getItem('profil')}'); background-size: 100%; height: 40px; width: 40px;`,
            articles : [],
            edited : false,
            myHTML : '',
            title :'',
            tags : [],
            addtag : '',
            image : '',
            styleImage  : '',
            newPictures: false,
            idArticle : '',
            search : ''
        }
    },
    components : {
        'reader-article-card' : CardArticle,
        'article-tags' : Tags
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files[0]);
        },
        createImage(file) {
            this.image = file
            this.newPictures = true
            let image = new Image();
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.styleImage = `height: 30em; background: url(${e.target.result}) no-repeat center center/cover; background-size: 100%; width: 82% ; margin-top: -6px;`
            };
            reader.readAsDataURL(file);
        },
        tagAdd(){
            if (!this.addtag) {
                
            } else {
                this.tags.push(this.addtag)
                this.addtag = ''
            }
        },
        findAllArticles(){
            Swal.fire({
                title: 'Login!',
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
            axios({
                url : '/article/myarticles',
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
                console.log(err);
                Swal.close()
            })
        },
        editedTrigger(article){
            this.edited ? this.edited = false : this.edited = true
            console.log(article);
            this.title = article.title
            this.tags = article.tag
            this.myHTML = article.content
            this.image = article.image[0]
            this.styleImage = `height: 30em; background: url('${article.image[0]}') no-repeat center center/cover; background-size: 100%; width: 82% ; margin-top: -6px;`
            this.newPictures = false
            this.idArticle = article._id
        },
        saving(){
            if (!this.newPictures) {
                Swal.fire({
                    title: 'Saving your change!',
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
                let form  = {
                    title : this.title,
                    content : this.myHTML,
                    image : this.image,
                    tag : this.tags
                }
                axios({
                    url : `/article/${this.idArticle}/oldpicture`,
                    method : 'PUT',
                    headers : {
                        token : localStorage.getItem('token')
                    },
                    data : form
                })
                .then(({ data })=>{
                    this.edited = false
                    this.findAllArticles()
                    Swal.close()
                })
                .catch(err=>{
                    Swal.close()
                    let ereror = []
                    this.tags.length == 0 ? ereror.push(`tag is required`) : ''
                    !this.title ? ereror.push(`title is required`) : ''
                    this.image.length == 0 ? ereror.push(`image is required`) : ''
                    !this.content ? ereror.push(`content is required`) : ''
                    if (err && this.image) {
                        ereror.push(`image size too large`)
                    }
                    Swal.fire({
                        title: 'Failed Publish!',
                        text: ereror.join(` & `),
                        imageUrl: 'https://loading.io/mod/spinner/lava-lamp/index.svg',
                        // imageWidth: 400,
                        // imageHeight: 200,
                        timer: 2500,
                        imageAlt: 'Custom image',
                        showConfirmButton: false,
                        showCancelButton: false,
                        confirmButtonText: 'نعم',
                        cancelButtonText: 'لا',
                    })
                })
            } else {
                Swal.fire({
                    title: 'Saving your change!',
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
                let form = new FormData()
                form.set('title',this.title)
                form.set('content',this.myHTML)
                this.tags.forEach(tag=>{
                    form.append('tag', tag)
                })
                form.append('image',this.image)
                axios({
                    url : `/article/${this.idArticle}`,
                    method : 'PUT',
                    headers : {
                        token : localStorage.getItem('token')
                    },
                    data : form
                })
                .then(({ data })=>{
                    this.edited = false
                    this.findAllArticles()
                    Swal.close()
                })
                .catch(err=>{
                    Swal.close()
                    let ereror = []
                    this.tags.length == 0 ? ereror.push(`tag is required`) : ''
                    !this.myHTML ? ereror.push(`content is required`) : ''
                    this.image ? ereror.push(`image is required`) : ''
                    !this.title ? ereror.push(`title is required`) : ''
                    if (err && this.image) {
                        ereror.push(`image size too large`)
                    }
                    Swal.fire({
                        title: 'Failed Publish!',
                        text: ereror.join(` & `),
                        imageUrl: 'https://loading.io/mod/spinner/lava-lamp/index.svg',
                        // imageWidth: 400,
                        // imageHeight: 200,
                        timer: 2500,
                        imageAlt: 'Custom image',
                        showConfirmButton: false,
                        showCancelButton: false,
                        confirmButtonText: 'نعم',
                        cancelButtonText: 'لا',
                    })
                })
            }
        }
    },
    created() {
        this.findAllArticles()
    },
    computed: {
        filterArticle() {
            if (this.search) {
                return this.articles.filter(article => {
                    return article['title'].toLowerCase().includes(this.search.toLowerCase())
                })
            } else {
                return this.articles
            }
        }
    }
}
</script>

<style scoped>
@import "vue-wysiwyg/dist/vueWysiwyg.css";

.upgrade-btn{
    font-size: 13px;
    cursor: pointer;
    transition: 0.5s;
    padding: 1px 3px;
    border-radius: 5%;
}

.upgrade-btn:hover{
    color: black;
    background-color: aliceblue;
}

.addTitle{
    font-size: 60px;
    font-weight:lighter;
    border:none;
    transition: 0.5s;
    width: 100%;
}
.addTitle:hover{
    border-left: 5px solid rgba(0, 0, 0, 0.363)
}
.addTitle:focus{
    border: 1px solid rgba(182, 182, 182, 0.801);
    border-left: 5px solid rgba(0, 0, 0, 0.712);
    box-shadow: none;
    outline : none;
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