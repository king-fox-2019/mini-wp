<template>
   <div class="d-flex flex-column">
      <label for="name">Name<span>*</span></label>
      <input type="text" required v-model="name" class="mb-2" />
      <label for="username">Username<span>*</span></label>
      <input type="text" required v-model="username" class="mb-2"/>
      <label for="email">Email<span>*</span></label>
      <input type="email" required v-model="email" class="mb-2"/>
      <label for="password">Password<span>*</span></label>
      <input type="password" required v-model="password" class="mb-2"/>
      <label for="image">
         Profile picture (optional)&nbsp;
         <span class="text-success" v-if="uploadSuccess === true">upload success</span>
         <span class="text-danger" v-if="uploadSuccess === false">upload failed</span>
      </label>
      <input type="file" name="image" ref="file" v-on:change="uploadImage()"/>
      <button class="btn my-2 btn-green" v-on:click="submitForm()">Submit</button>
   </div>
</template>

<script>
   import axios from '../../apis/server'

   export default {
      name: 'registerBox',

      data() {
         return {
            name: '',
            username: '',
            email: '',
            password: '',
            image: '',
            file: '',
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
            .then(({data}) => {
               this.image = data.image
               this.uploadSuccess = true
            })
            .catch(error => {
               console.log(error)
               this.uploadSuccess = false
            })
         },

         submitForm() {
            axios({
               url: '/user/register',
               method: 'post',
               data: {
                  name: this.name,
                  username: this.username,
                  email: this.email,
                  password: this.password,
                  image: this.image
               }
            })
            .then(({data}) => {
               localStorage.setItem('access_token', data.access_token)
               this.$emit('signIn')
            })
            .catch(error => console.log(error))
         }
      }
   }
</script>

<style scoped>
   span {
      color: coral;
   }

   .btn-green {
      background-color: #38b2ac;
      color: white;
      width: 100%;
   }
</style>