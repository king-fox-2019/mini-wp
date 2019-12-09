<template>
  <div class="d-flex flex-column justify-content-around">
     <label for="email">Email</label>
     <input type="email" v-model="email" class="mb-2" required/>
     <label for="password">Password</label>
     <input type="password" class="mb-2" v-model="password" required/>
     <button class="btn" id="btn-green" v-on:click="submit">Submit</button>
  </div>
</template>

<script>
import axios from '../../apis/server'
export default {
   name: 'signInBox',

   data() {
      return {
         email: '',
         password: ''
      }
   },

   methods: {
      submit() {
         
         axios({
            method: 'post',
            url: '/user/login',
            data: {
               email: this.email,
               password: this.password
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

<style>
   #btn-green {
      background-color: #38b2ac;
      color: white;
      width: 100%;
   }
</style>