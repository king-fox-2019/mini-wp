<template>
  <div class="d-flex flex-around mr-5">
     <button
      class="btn px-4"
     >
      {{user.username}}
     </button>
     <button
      class="btn px-4"
      v-on:click="signOut()"
     >
      Sign out
     </button>
  </div>
</template>

<script>
import axios from '../../apis/server'

export default {
   name: 'userControl',
   data() {
      return {
         user: {}
      }
   },
   methods: {
      signOut() {
         // if(GoogleAuth.isSignedIn.get()) {
         //    auth2.signOut()
         // }
         localStorage.removeItem('access_token')
         this.$emit('signOut')
      },
      fetchUser() {
         axios({
            url: '/user',
            method: 'get',
            headers: {
               access_token: localStorage.getItem('access_token')
            }
         })
         .then(({data}) => {
            this.user = data.user
         })
         .catch(error => console.log(error))
      }
   },
   created() {
      this.fetchUser()
   }
}
</script>

<style scoped>
   button {
      color: #718096;
      font-weight: 500;
   }

   button:hover {
      color: #39B2AC;
   }
</style>