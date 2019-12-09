<template>
  <div>
    <div class="gradient" style="padding: 30px; color: white;">
      <h2 style="margin-bottom: 30px; text-align: center;">DISCOVER</h2>
      <h5
        style=" text-align: center;"
      >Find book picks, reading tips, and activities for your little ones</h5>
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
.gradient {
  background: rgb(237, 162, 139);
  background: linear-gradient(
    180deg,
    rgba(237, 162, 139, 1) 0%,
    rgba(244, 244, 244, 1) 83%
  );
}
</style>