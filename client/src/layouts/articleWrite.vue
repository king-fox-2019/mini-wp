<template>
   <div id="write-article" class="d-flex justify-content-center mt-4">
      <div class="wrapper d-flex flex-column">
         <label for="title">Title</label>
         <input type="text" required v-model="title">
         <label for="content">Content</label>
         <div class="my-3">

         <wysiwyg v-model="content"/>
         </div>
         
         <label for="image" class="mb-3">
            Featured Image (optional)&nbsp;
            <span class="text-success" v-if="uploadSuccess === true">upload success</span>
            <span class="text-danger" v-if="uploadSuccess === false">upload failed</span>
         </label>
         <input type="file" ref="file" class="mb-3" v-on:change="uploadImage()" />
         <button class="btn btn-green" v-on:click="submit()">Submit</button>
      </div>
   </div>
</template>

<script>
   import axios from '../../apis/server'

   export default {
      name: 'articleWrite',
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

         submit() {
            axios({
               url: '/article',
               method: 'post',
               data: {
                  title: this.title,
                  content: this.content,
                  image: this.image
               },
               headers: {
                  access_token: localStorage.getItem('access_token')
               }
            })
            .then(() => {
               this.$emit('updatePage', 'articleList')
            })
            .catch(error => console.log(error))
         }
      },
   }
</script>

<style scoped>
   @import "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";

   .btn-green {
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