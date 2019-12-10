<template>
  <div class="mediaz">
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Footer
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins|Raleway&display=swap");

* {
  font-family: "Poppins", sans-serif;
  font-size: 12px;
}
.mediaz {
  padding: 10px 100px 0px 100px;
}
.leftside {
  margin-left: 10px;
}
@media only screen and (max-width: 700px) {
  .mediaz {
    margin: 0px;
    padding: 10px 0px !important;
  }
}
</style>