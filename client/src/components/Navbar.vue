<template>
  <div>
    <sui-menu :widths="4" class="navbar" borderless compact>
      <sui-menu-item>
        <sui-grid class="full-width">
          <sui-grid-row stretched>
            <sui-grid-column
              :width="8"
              class="logo"
              @click="$router.push('/')"
              style="cursor: pointer;"
            >Brightly</sui-grid-column>
            <sui-grid-column :width="8" class="tagline">
              Raise Kids
              <br />Who Love to Read
            </sui-grid-column>
          </sui-grid-row>
        </sui-grid>
      </sui-menu-item>
      <sui-menu-item></sui-menu-item>
      <sui-menu-item>
        <sui-grid class="full-width">
          <sui-grid-row stretched>
            <sui-grid-column
              v-if="isLogin"
              @click="$router.push('/add-article')"
              :width="5"
              style="color: white; padding-right: 10% !important; cursor: pointer;"
            >Add Article</sui-grid-column>

            <sui-grid-column
              v-if="isLogin"
              :width="5"
              @click="$router.push('/my-articles')"
              style="color: white; padding-right: 10% !important; cursor: pointer;"
            >
              My Articles
              <!-- <sui-icon style="color: white; margin-left: 80% !important;" name="search" /> -->
            </sui-grid-column>

            <sui-grid-column
              v-if="!isLogin"
              @click="$router.push('/signin')"
              :width="5"
              style="color: white; padding-right: 10% !important; cursor: pointer;"
            >Sign In</sui-grid-column>

            <sui-grid-column
              v-if="isLogin"
              @click="logout"
              :width="5"
              style="color: white; padding-right: 30% !important; cursor: pointer;"
            >Sign Out</sui-grid-column>
          </sui-grid-row>
        </sui-grid>
      </sui-menu-item>
    </sui-menu>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: function() {
    return {};
  },
  props: ["isLogin"],

  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      this.$router.push("/");
      this.$emit("cekLogin");
      this.$toastr.h("Logout").i("Success!");
    }
  },
  // created() {
  //   if (localStorage.getItem('token')) {
  //     this.isLogin = false
  //   }
  // },
   
  // computed: {
  //   showLis() {
  //      if (localStorage.getItem('token')) {
  //     return this.isLogin = false
  //   }
  //   }
  // }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Yeseva+One&display=swap");
.navbar {
  background: #eda28b !important;
  border: none !important;
  border-radius: 0 !important;
  height: 70px;

  /* overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%; */
}
.full-width {
  width: 100%;
}
.logo {
  font-family: "Yeseva One", cursive !important;
  font-size: 30px;
  color: white;
  border-right: 1px solid white !important;
  text-align: right;
}
.tagline {
  text-align: left;
  color: white;
}
</style>

