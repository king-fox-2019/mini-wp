<template>
<div>
    <app-navbar-create
        @publish="publish"
        @back="back"
    ></app-navbar-create>
    <div class="row">
        <div class="col-1"></div>
        <div class="col" style="height:94vh;overflow-y: scroll;">
            <div class="form-group">
            <input type="text" v-model="title"
                class="form-control mt-5 py-5 text-center addTitle"
                name="" id="" aria-describedby="helpId" placeholder="Add title">
            </div>
            <div class="row ml-1">
                <div :style="styleImage"></div>
            </div>
            <div class="row">
                <div class="col-10">
                    <div class="mt-3">
                        <wysiwyg v-html="content"> </wysiwyg>
                        <!-- <quill output="html" v-model="content" :config="config" class="mb-5 text-center"></quill> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="col-2" style="border-left: 1px solid #E2E4E7;">
            <div class="row" style="background-color: #F3F4F5">
                <div class="col d-flex justify-content-center pl-0 pt-2 pb-0 pr-0 ">
                    <button type="button" class="btn btn-sm ml-0 pb-2 px-5 options"> Options </button>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <p class="mt-2">
                    <button class="btnTags rounded-top rounded-bottom rounded-left rounded-right px-3" type="button" data-toggle="collapse" data-target="#collapseExamplea" aria-expanded="false" aria-controls="collapseExample">
                        <i class="fas fa-images"></i>
                        Images
                    </button>
                </p>
            </div>
            <div class="collapse mr-3" id="collapseExamplea">
                    <div class="card card-body p-1">
                        <input @change="onFileChange" type="file" class="form-control pb-5" multiple="">
                        <!-- <div class="col-auto">
                            <div class="col text-center" style="font-size:20px">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                                    <label class="form-check-label" for="inlineRadio1">1 image</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option1">
                                    <label class="form-check-label" for="inlineRadio2">2 images</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option1">
                                    <label class="form-check-label" for="inlineRadio3">3 images</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option1">
                                    <label class="form-check-label" for="inlineRadio4">4 images</label>
                                </div>
                            </div>
                            <div class="row mt-2 ml-1">
                            </div>
                        </div> -->
                    </div>
                </div>
            <div class="row d-flex justify-content-center">
                <p class="mt-2">
                    <button class="btnTags rounded-top rounded-bottom rounded-left rounded-right px-3" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <i class="fas fa-tag"></i>
                        Tags
                    </button>
                </p>
                <div class="collapse" id="collapseExample">
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
            <div class="row d-flex justify-content-center">
                <p class="mt-2">
                    <button class="btnTags rounded-top rounded-bottom rounded-left rounded-right px-3" type="button">
                        <i class="fas fa-sun"></i>
                        Light
                    </button>
                </p>
            </div>
            <div class="row d-flex justify-content-center">
                <p class="mt-2">
                    <button class="btnTags rounded-top rounded-bottom rounded-left rounded-right px-3" type="button">
                        <i class="fas fa-moon    "></i>
                        Dark
                    </button>
                </p>
            </div>
            <div class="row" style="height:90vh;">
            </div>
        </div>
    </div>
</div>
</template>

<script>
import NavbarCreate from '../components/NavbarCreate.vue'
import Tags from '../components/ListTag'
import axios from '../../apis/server'

export default {
    data() {
        return {
            tags : [],
            addtag : '',
            content : '',
            config: {
                modules : {
                    toolbar : toolbarOptions,
                },
                placeholder: '...',
            },
            image : '',
            styleImage  : '',
            title : ''
        }
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files[0]);
        },
        createImage(file) {
            this.image = file
            let image = new Image();
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.styleImage = `height: 30em; background: url(${e.target.result}) no-repeat center center/cover; background-size: 100%; width: 82% ; margin-top: -6px;`
            };
            reader.readAsDataURL(file);
        },
        back(){
            this.$emit('createArticle')
        },
        publish(){
            let form = new FormData();
            form.set('title', this.title)
            form.append('content', this.content)
            this.tags.forEach(tag=>{
                form.append('tag', tag)
            })
            form.append('image', this.image)
            axios({
                url : '/article',
                method : 'POST',
                data : form,
                headers : {
                    token : localStorage.getItem('token')
                }
                })
                .then(({data})=>{
                    this.title = ''
                    this.content = { ops : [] }
                    this.tags = []
                    this.addtag = ''
                    this.image = ''
                    this.styleImage = ''
                    this.$emit('createArticle')
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        tagAdd(){
            if (!this.addtag) {
                
            } else {
                this.tags.push(this.addtag)
                this.addtag = ''
            }
        },
    },
    components : {
        'app-navbar-create' : NavbarCreate,
        'article-tags' : Tags
    }
}
</script>

<style scoped>
@import "vue-wysiwyg/dist/vueWysiwyg.css";

.inputTags:focus{
    box-shadow: none;
}

.btnTags{
    background-color:#FFFFFF;
    outline: none;
    border: none;
    font-size: 20px;
    transition: 0.5s;
}

.btnTags:hover{
    border: 1px solid black;
    border-left: 5px solid black;
}

.btnTags:focus{
    border: 1px solid black;
    border-left: 5px solid black;
}

.options:hover{
    border-bottom: 2px solid rgb(108, 108, 231);
    transition: 0.5s;
    font-weight: bold
}

.options{
    background-color:#F3F4F5;
    border-bottom: 2px solid blue;
}

.options:focus{
    box-shadow: none;
    font-weight: bold;
    border-bottom: 2px solid blue;
}

.addTitle{
    font-size: 60px;
    font-weight:lighter;
    border:none;
    transition: 0.5s;
    width: 83%;
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

</style>