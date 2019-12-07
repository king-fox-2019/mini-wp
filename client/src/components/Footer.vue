<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-text class="py-2 white--text text-center">
        <div>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon right size="24px">{{ icon }}</v-icon>
          </v-btn>
        </div>
        {{ new Date().getFullYear() }} —
        <strong>Edwin Satya Yudistira</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      icons: [
        "fab fa-facebook",
        "fab fa-twitter",
        "fab fa-google-plus",
        "fab fa-linkedin",
        "fab fa-instagram"
      ]
    };
  }
};
</script>

<style></style>
