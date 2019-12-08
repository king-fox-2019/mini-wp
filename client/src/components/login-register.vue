<template>
  <div>
      <p class="my-4">Hello from login!</p>
      <button class="btn btn-primary" @click="setLogin">Login</button>
  </div>
</template>

<script>
export default {
    name: 'loginRegister',
    methods :{
        setLogin: function(){
            this.$emit('set-login')
        }
    }
}
</script>

<style>

</style>