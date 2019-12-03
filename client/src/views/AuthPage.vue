<template>
  <div>
    <RegisterLogin @setPage="setPage"></RegisterLogin>
  </div>
</template>

<script>
import RegisterLogin from "../components/RegisterLogin"

export default {
  name: 'AuthPage',
  data: function() {
    return {

    }
  },
  methods: {
    setPage(page) {
      this.$emit('setPage', page)
    }
  },
  components: {
    RegisterLogin
  }
}
</script>

<style scoped>

</style>