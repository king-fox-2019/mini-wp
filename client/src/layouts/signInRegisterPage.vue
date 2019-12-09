<template>
   <div class="d-flex flex-column align-items-center mh-100">
      <h1 class="mt-3">Those who write, teach</h1>
      <div class="d-flex flex-column align-items-center justify-self-center mt-3 border p-3">
         <SignInBox v-if="signPage == 'signin'" v-on:signIn="signIn"></SignInBox>
         <RegisterBox v-if="signPage == 'register'" v-on:signIn="signIn"></RegisterBox>
      </div>
      <div class="g-signin2 mt-2" data-onsuccess="onSignIn"></div>
   </div>
</template>

<script>
   import axios from '../../apis/server'
   import SignInBox from '../components/signInBox'
   import RegisterBox from '../components/registerBox'

   export default {
      name: 'signInRegisterPage',
      components: {
         SignInBox,
         RegisterBox
      },
      props: {
         signPage: String
      },
      methods: {
         onSignIn(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token

            axios({
               url: `/googleSignIn`,
               method: `post`,
               data: {
                  id_token
               }
            })
            .then(({data}) => {
               localStorage.setItem('access_token', data.access_token)
               this.$emit('signIn')
            })
            .catch(error => console.log(error))
         },

         signIn() {
            this.$emit('signIn')
         }
      }
   }
</script>

<style>
   h1 {
      color: #718096;
   }
</style>