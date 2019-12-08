<template>
  <div id="Kepala">
    <div>
      <Login @submit.prevent="loginUser"></Login>
    </div>
    <div></div>
  </div>
</template>

<script>
import Login from "./Login.vue";

export default {
  name: "Kepala",
  props: ["showLoginRegister"],
  components: {
    Login
  },
  data() {
    return {
      
    }
  },
  methods: {
  
  }
};
</script>

<style scoped>
#Kepala {
  width: 100wv;
  height: 10vh;
  background-color: rgba(5, 5, 5, 0.801);
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  padding-left: 10px;
}
</style>