<template>
   <div id="navbar" class="d-flex justify-content-between align-items-center">
      <a class="ml-4 py-2" v-on:click.prevent="" href="">Mini Wordpress</a>
      <div>
         <SignInRegister
            v-if="showing == 'sign'"
            v-on:changeSignTab="updateSignPage($event)"
            v-on:signIn="$emit('signIn')"
         >
         </SignInRegister>
         
         <UserControl
            v-if="showing == 'article'"
            v-bind:userId="userId"
            v-bind:username="username"
            v-on:signOut="$emit('signOut')"
         >
         </UserControl>
      </div>
   </div>
</template>

<script>
   import SignInRegister from '../components/signInRegister'
   import UserControl from '../components/userControl'

   export default {
      props: {
         showing: String,
         userId: String,
         username: String,
      },
      data() {
         return {
            
         }
      },
      components: {
         SignInRegister,
         UserControl
      },
      methods: {
         backToHome() {
            this.$emit('backToHome')
         },
         updateSignPage(signTabName) {
            this.$emit('updateSignPage', signTabName)
         }
      }
   }
</script>

<style scoped>
   a {
      font-size: 1.5rem;
      color: #39B2AC;
   }

   a:hover {
      color: #39b2ac;
      text-decoration: none;
   }

   #navbar {
      border-bottom: 3px solid;
      border-color: #edf2f7;
   }
</style>