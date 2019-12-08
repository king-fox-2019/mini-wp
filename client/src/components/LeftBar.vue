<template>
        <div class="col-2 pr-0" style="border-right: 1px solid rgb(228, 228, 228); height: 95vh;">
            <div class="d-flex flex-column" v-if="!mainPage">
                <div style="background-color: #FFFFFF;" class="py-3">
                    <div class="d-flex flex-row">
                        <div style="background-color: teal; height: 40px; width: 40px;" class="ml-4">
                        </div>
                        <div class="d-flex flex-column">
                            <span class="ml-2" style="font-size: 16px;">Title Site</span>
                            <span class="ml-2" style="font-size: 10px;">View anggabanny.inlone.com</span>
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
                        <span class="ml-2" style="font-size: 13px;">Your are free account</span>
                        <span class="ml-auto mr-2 align-center" style="font-size: 13px;">UPGRADE</span>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column" v-if="!mainPage">
                <div class="ButtonMySite py-2">
                    <div class="d-flex flex-row ml-5 py-2 align-items-center" style="color: #1D2327;">
                        <i class="fas fa-save ml-3" style="color: rgb(107, 107, 107); font-size: 25px;"></i>
                        <span class="ml-2" style="font-size: 17px;">Save</span>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column" v-if="!mainPage">
                <div class="ButtonMySite py-2">
                    <div class="d-flex flex-row ml-5 py-2 align-items-center" style="color: #1D2327;">
                        <i class="fas fa-trash ml-3" style="color: rgb(107, 107, 107); font-size: 25px;"></i>
                        <span class="ml-2" style="font-size: 17px;">Delete</span>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column" v-if="!mainPage">
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
            <div class="d-flex flex-column" v-if="!mainPage">
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
            <!-- ---------- -->
            <div class="d-flex flex-column" v-if="mainPage">
                <h6 class="ml-3 mt-3" style="color: rgb(80, 80, 80);">
                    Streams
                </h6>
            </div>
            <div class="d-flex flex-column" v-if="mainPage">
                <div class="ButtonMySite">
                    <div @click.prevent="mysites" class="d-flex flex-row ml-2 py-2 align-items-center" style="color: #1D2327;">
                        <i class="fas fa-home ml-3" style="color: rgb(107, 107, 107); font-size: 25px;"></i>
                        <span class="ml-2 mt-2" style="font-size: 14px; font-weight: bold; color: rgb(88, 88, 88)">My Sites</span>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column" v-if="mainPage">
                <div class="ButtonMySite">
                    <div class="d-flex flex-row ml-2 py-2 align-items-center" style="color: #1D2327;" data-toggle="collapse" data-target="#collapseExample">
                        <i class="fas fa-cog ml-3" style="color: rgb(107, 107, 107); font-size: 24px;"></i>
                        <span class="ml-2 mt-2" style="font-size: 14px; font-weight: bold; color: rgb(88, 88, 88)">Options</span>
                        <i class="fas fa-caret-down ml-3 mt-2" style="color: rgb(31, 31, 31);"></i>
                    </div>
                </div>
            </div>
            <div class="collapse" id="collapseExample">
                <div class="card card-body pt-0" style="background-color: rgb(238, 238, 238);">
                    <button type="button" @click.prevent="searchtitle" class="btn btn-primary btn-sm mt-2">Search By Title</button>
                    <button type="button" @click.prevent="searchtag" class="btn btn-primary btn-sm mt-2">Search By Tag</button>
                    <button type="button" @click.prevent="searchauthor" class="btn btn-primary btn-sm mt-2">Search By Author</button>
                </div>
            </div>
        </div>
</template>

<script>
import Tags from '../components/ListTag'
export default {
    props : ['mainPage','myPage','createArticle'],
    data() {
        return {
            tags : [],
            addtag : '',
            myHTML : '',
            image : '',
            styleImage  : '',
        }
    },
    methods: {
        searchtitle(){
            this.$emit('search', 'title')
        },
        searchtag(){
            this.$emit('search', 'tag')
        },
        searchauthor(){
            this.$emit('search', 'author')
        },
        mysites(){
            this.$emit('toggle')
        },
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
        tagAdd(){
            if (!this.addtag) {
                
            } else {
                this.tags.push(this.addtag)
                this.addtag = ''
            }
        },
    },
    components : {
        'article-tags' : Tags
    }
}
</script>

<style>

</style>