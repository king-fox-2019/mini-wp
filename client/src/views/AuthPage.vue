<template>
  <div>
    <Menu></Menu>
    <RegisterLogin @setPage="setPage"></RegisterLogin>
  </div>
</template>

<script>
import RegisterLogin from "../components/RegisterLogin"
import Menu from '../components/Menu'

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