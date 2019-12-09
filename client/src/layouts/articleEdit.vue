<template>
   <div id="edit-article" class="d-flex justify-content-center mt-4">
      <div class="wrapper d-flex flex-column">
         <label for="title">Title</label>
         <input type="text" required v-model="title">
         <label for="content">Content</label>
         <div class="my-3">
            <wysiwyg v-model="content" />
         </div>
         <div id="current-image-wrapper" v-if="image != ''">
            <label>Current Image:</label>
            <a v-bind:src="image" v-text="image"></a>
         </div>
         <label for="image" class="mb-3">
            Featured Image (optional)&nbsp;
            <span class="text-success" v-if="uploadSuccess === true">upload success</span>
            <span class="text-danger" v-if="uploadSuccess === false">upload failed</span>
         </label>
         <input type="file" ref="file" class="mb-3" v-on:change="uploadImage()" />
         <button class="btn" id="btn-green" v-on:click="updateArticle()">Submit</button>
      </div>
   </div>
</template>

<script>
   import axios from '../../apis/server'

   export default {
      name: 'articleEdit',
      props: {
         articleId: String
      },
      data() {
         return {
            title: '',
            image: '',
            file: '',
            content: '',
            uploadSuccess: null
         }
      },
      methods: {
         fillUpdateForm() {
            console.log(this.articleId, 'fetching data for update')
            axios({
                  url: `/article/${this.articleId}`,
                  method: 'get',
                  headers: {
                     access_token: localStorage.getItem('access_token')
                  }
               })
               .then(({data}) => {
                  console.log('dapet datanya', data.article)
                  this.title = data.article.title
                  this.content = data.article.content
                  this.image = data.article.image
               })
               .catch(error => console.log(error))
         },

         uploadImage() {
            this.file = this.$refs.file.files[0]
            let formData = new FormData()

            formData.append('image', this.file)

            axios.post('/imgUpload', formData, {
                  headers: {
                     'content-type': 'multipart/form-data'
                  }
               })
               .then(({
                  data
               }) => {
                  this.image = data.image
                  this.uploadSuccess = true
               })
               .catch(error => {
                  console.log(error)
                  this.uploadSuccess = false
               })
         },

         updateArticle() {
            axios({
                  url: `/article/${this.articleId}`,
                  method: 'patch',
                  headers: {
                     access_token: localStorage.getItem('access_token')
                  },
                  data: {
                     title: this.title,
                     content: this.content,
                     image: this.image
                  }
               })
               .then(() => {
                  this.$emit('readDetail', this.articleId)
               })
               .catch(error => console.log(error))
         }
      },
      created() {
         this.fillUpdateForm()
      }
   }
</script>

<style>
   @import "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";

   #btn-green {
      background-color: #38b2ac;
      color: white;
      width: 100%;
   }

   #write-article {
      width: 100%
   }

   .wrapper {
      width: 80%;
   }
</style>