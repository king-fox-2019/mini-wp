<template>
  <div id="header">
    <div>
      <Login></Login>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
  import Login from './Login.vue';
export default {
  name: 'header',
  props:["showLoginRegister"],
  components:{
    Login
  },
  data(){

  },
  methods:{

  }
}
</script>

<style scoped>
    #header {
        width: 100wv;
        height: 10vh;
        background-color: rgba(5, 5, 5, 0.801);
        display: flex;
        justify-content: flex-end;
        padding: 5px;
        padding-left: 10px
    }
</style>