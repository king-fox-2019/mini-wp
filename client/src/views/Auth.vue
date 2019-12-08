<template>
  <div >
    <RegisterLogin @setPage="setPage"></RegisterLogin>
  </div>
</template>

<script>
import RegisterLogin from "../components/RegisterLogin"

export default {
  name: 'Auth',
   components: {
    RegisterLogin
  },
  data: function() {
    return {
    }
  }
 
}
</script>

<style scoped>

</style>