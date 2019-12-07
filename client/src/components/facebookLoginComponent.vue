<template>
  <facebook-login class="button"
      appId="326022817735322"
      @login="getUserData"
      @logout="onLogout"
      @get-initial-status="getUserData">
    </facebook-login>
</template>

<script>
import facebookLogin from 'facebook-login-vuejs';
export default {
    name: 'facebookOAuth',
  data() {
    return {
    };
  },
  components: {
      facebookLogin
  }
};
</script>

<style scoped>
</style>