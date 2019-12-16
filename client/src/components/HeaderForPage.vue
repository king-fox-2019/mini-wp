<template>
  <div id="Kepala">
    <div>
      <Login 
        @submit.prevent="loginUser"
        @data-submited-from-form="hideFormData"
        ></Login>
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
    hideFormData(){
      this.$emit("data-submited-from-form")
    }
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