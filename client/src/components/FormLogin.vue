<template>
  <v-dialog max-widht="600px">
    <v-btn v-if="!isLogin" depressed color="grey lighten-4">
      <span>Sign In</span>
      <v-icon right>open_in_new</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <h2>Form Sign In</h2>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "formlogin"
};
</script>

<style>
</style>