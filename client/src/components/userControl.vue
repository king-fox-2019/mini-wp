<template>
  <div class="d-flex flex-around mr-5">
     <button
      class="btn px-4"
     >
      Username
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
export default {
   name: 'userControl',
   methods: {
      signOut() {
         // if(GoogleAuth.isSignedIn.get()) {
         //    auth2.signOut()
         // }
         localStorage.removeItem('access_token')
         this.$emit('signOut')
      }
   }
}
</script>

<style scoped>
   button {
      color: #718096;
   }

   button:hover {
      color: #2D3748;
   }
</style>