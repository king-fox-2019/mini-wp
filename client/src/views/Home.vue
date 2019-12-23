<template>
  <div>
    <div class="gradient" style="padding: 30px; color: white;">
      <h2 class="discover">DISCOVER</h2>
      <h5 style=" text-align: center; color: #795147a6; margin-top: 0px !important;">
        <i>Find book picks, reading tips, and activities for your little ones</i>
      </h5>
      <Topics></Topics>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "../helpers/axios";
import Topics from "../components/Topics";

export default {
  name: "Home",
  data: function() {
    return {};
  },
  components: {
    Topics
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Pacifico&display=swap");
.gradient {
  background: rgb(237, 162, 139);
  background: linear-gradient(
    180deg,
    rgba(237, 162, 139, 1) 0%,
    rgba(244, 244, 244, 1) 83%
  );
}
.discover {
  margin-bottom: 8px;
  font-family: "Pacifico", cursive !important;
  text-align: center;
  color: #795147a6;
}
</style>
