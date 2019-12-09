<template>
  <div class="d-flex flex-around mr-5">
     <button
      class="btn px-4"
      v-on:click="changeSignTab('signin')"
     >
      Sign in
     </button>
     <button
      class="btn px-4"
      v-on:click="changeSignTab('register')"
     >
      Register
     </button>
  </div>
</template>

<script>
export default {
   name: 'signInRegister',
   methods: {
      changeSignTab(signTabName) {
         this.$emit('changeSignTab', signTabName)
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