<template>
  <div>
      <div class="container mb-3">
          <div class="mt-3">
            <h2 class="mb-2">{{ headTitle }}</h2>
            <label for="article-title"><h3>Title</h3></label>
            <form id="create-article">
                <input type="text" id="article-title" placeholder="Input your title" class="form-control mb-3" v-model="title">
                <wysiwyg v-model="myHTML"></wysiwyg>
            </form>
          </div>
          <div class="mt-3">
              <h5>Thumbnail Photo</h5>
              <form @submit.prevent="uploadImage" enctype="multipart/form-data">
                <div class="card" style="width: 18rem;">
                    <img :src="imageLink" class="card-img-top" alt="">
                    <div class="card-body">
                        <input type="file" name="file" ref="file" @change="fileUploadHandle" />
                    </div>
                </div>
              </form>
          </div>
          <div class="mt-3 w-100">
              <section>
                <b-field label="Add some tags">
                    <b-taginput
                        v-model="tags"
                        ellipsis
                        icon="label"
                        placeholder="Add a tag">
                    </b-taginput>
                </b-field>
                <p class="content"><b>Tags:</b> {{ tags }}</p>
            </section>
          </div>
          <div class="mt-3" v-if="!editForm">
            <button class="btn btn-success" @click.prevent="saveArticle">Save</button>
            <button class="btn btn-danger" @click.prevent="createArticle">Post</button>
          </div>
          <div class="mt-3" v-if="editForm">
            <button class="btn btn-success" @click.prevent="editArticle(idArticle)">Save</button>
            <button v-if="statusDraft" class="btn btn-primary" @click.prevent="saveDraft(idArticle)">Save as Draft</button>
            <button class="btn btn-danger" @click.prevent="cancelEdit">Cancel</button>
          </div>
      </div>
  </div>
</template>

<script>

import imageServer from '../../api/image'
import articleServer from '../../api/article'
import Alert from '../public/Alert'

export default {
    data(){
        return{
            title: '',
            myHTML : '',
            image: '',
            imageLink: '',
            tags: [],
            headTitle: 'Create Article',
            editForm : false,
            idArticle: '',
            statusDraft: false
        }
    },
    props: ['article'],
    methods:{
        createArticle(){
            articleServer({
                url: '/',
                method: 'POST',
                data:{
                    title: this.title,
                    content: this.myHTML,
                    featured_image: this.imageLink,
                    tags: this.tags,
                    status: 'publish'
                },
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.title = ''
                this.myHTML = ''
                this.featured_image = ''
                this.image = ''
                this.imageLink = ''
                this.tags = []
                Alert.Toast.fire({
                    icon: 'success',
                    title: 'Create Article',
                    text: 'Article has been Publish'
                })
                this.$emit('go-homepage')
            })
            .catch(err => {
                Alert.Swal.fire({
                    icon: 'error',
                    title: 'Create Artile',
                    text: `${err.response.data.message}`
                })
            })
        },
        saveArticle(){
            articleServer({
                url: '/',
                method: 'POST',
                data:{
                    title: this.title,
                    content: this.myHTML,
                    featured_image: this.imageLink,
                    tags: this.tags,
                    status: 'draft'
                },
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                console.log(data)
                Alert.Toast.fire({
                    icon: 'success',
                    title: 'Create Article',
                    text: 'Article has been saved'
                })
            })
            .catch(err => {
                Alert.Swal.fire({
                    icon: 'error',
                    title: 'Create Artile',
                    text: `${err.response.data.message}`
                })
            })
        },
        fileUploadHandle(){
            this.image = this.$refs.file.files[0]
            this.uploadImage()
        },
        uploadImage(){
            let formData = new FormData()
            formData.append('file', this.image)
            imageServer({
                url: '/upload',
                method: 'POST',
                data: formData
            })
            .then(({data})=>{
                this.imageLink = data
            })
            .catch(err => {
                console.log(err.response)
            })
        },
        cancelEdit(){
            this.$emit('go-homepage')
        },
        editArticle(id){
            articleServer({
                url: `/${id}`,
                method: 'PUT',
                data:{
                    title: this.title,
                    content: this.myHTML,
                    featured_image: this.imageLink,
                    tags: this.tags,
                    status: 'publish'
                },
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.$emit('go-homepage')
            })
            .catch(err => {
                Alert.Swal.fire({
                    icon: 'error',
                    title: 'Edit Article',
                    text: `${err.response.data.message}`
                })
            })
        },
        saveDraft(id){
            articleServer({
                url: `/${id}`,
                method: 'PUT',
                data:{
                    title: this.title,
                    content: this.myHTML,
                    featured_image: this.imageLink,
                    tags: this.tags,
                    status: 'draft'
                },
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.$emit('go-homepage')
            })
            .catch(err => {
                Alert.Swal.fire({
                    icon: 'error',
                    title: 'Edit Article',
                    text: `${err.response.data.message}`
                })
            })
        }
    },
    computed:{
    },
    created(){
        let title = this.article.title
        if(title){
            this.title = this.article.title
            this.tags = this.article.tags
            this.imageLink = this.article.featured_image
            this.myHTML = this.article.content
            this.idArticle = this.article._id
            this.editForm = true
            this.headTitle = 'Edit Article'
            if(this.article.status == 'draft'){
                this.statusDraft = true
            }else{
                this.statusDraft = false
            }
        }else{
            this.headTitle = 'Create Article'
            this.editForm = false
            this.title = ''
            this.tags = []
            this.imageLink = ''
            this.myHTML = ''
            this.idArticle = ''
            if(this.article.status == 'draft'){
                this.statusDraft = true
            }else{
                this.statusDraft = false
            }
        }
    }
}
</script>

<style>

</style>