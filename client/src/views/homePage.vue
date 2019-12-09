<template>
  <div class="main-page">
    <b-container class="bv-example-row text-center">
      <b-row>
        <b-col class="image">
          <img src="../assets/home-page.jpg" />
        </b-col>
        <b-col class="menu ">
          <div class="d-flex flex-column window  ">
            <div class="p-2 title">Mini Wordpress</div>
            <div class="p-2 title-porto">Portofolio Project</div>
            <div class="p-2  mt-2 row">
              <div class="col">
                <button @click="loginPage" class="btn btn-primary login">
                  Login
                </button>
              </div>
              <div class="col ">
                <button @click="registerPage" class="btn btn-primary register">
                  Register
                </button>
              </div>
            </div>
            <div class="p-2 form mt-4">
              <login v-if="page == 'login'" @isLogin="isLogin"></login>
              <register v-else @islogin="isLogin"></register>
            </div>
            <div class="p-2 footer mt-2">
              Copyright © 2019 | Brahmantya Sukma
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import login from "../components/login";
import register from "../components/register";
export default {
  components: {
    login,
    register
  },
  data() {
    return {
      page: "login"
    };
  },
  methods: {
    isLogin(val) {
      this.$emit("isLogin", val);
    },
    loginPage() {
      this.page = "login";
    },
    registerPage() {
      this.page = "register";
    }
  }
};
</script>

<style>
.main-page {
  height: 100vh;
  min-height: 100vh;
  width: 100vw;
  min-width: 100vw;
}

img {
  height: 620px;
}

.backdrop {
  align-items: center;
  justify-content: center;
}

.position {
  width: 50%;
  padding: 20px;
  /* resize: both; */
  /* overflow: auto; */
}

.window {
  width: 400px !important;
}

.title {
  font-family: "PT Sans", sans-serif;
  font-weight: bold;
  font-size: 38px;
  color: #00b699;
  border-radius: 7px;
}

.title-porto {
  font-family: "PT Sans", sans-serif;
  font-weight: bold;
  font-size: 24px;
  color: #00ccaa;
  margin-top: -25px;
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  height: 240px;
}

.login {
  width: 100% !important;
  background-color: #00ccaa !important;
  border-color: #00ccaa !important;
  box-shadow: none !important;
  font-family: "Sulphur Point", sans-serif;
  color: #f9f9f9;
}

.login:hover {
  background-color: #00b699 !important;
  border-color: #00b699 !important;
  box-shadow: none !important;
}

.login:focus {
  background-color: #00b699 !important;
  border-color: #00b699 !important;
  box-shadow: none !important;
}

.register {
  width: 100% !important;
  background-color: #007965 !important;
  border-color: #007965 !important;
  box-shadow: none !important;
  font-family: "Sulphur Point", sans-serif;
  color: #f9f9f9;
}

.register:hover {
  background-color: #009980 !important;
  border-color: #009980 !important;
  box-shadow: none !important;
}

.register:focus {
  background-color: #009980 !important;
  border-color: #009980 !important;
  box-shadow: none !important;
}

#create-title {
  background-color: #f9f9f9;
  border-radius: 0 !important;
  height: 35px;
  text-align: center;
  font-size: 20px;
  font-family: "Sulphur Point", sans-serif;
  border-color: #00ccaa;
  border-width: 0 0 0 4px;
}

#create-title:hover {
  border-color: #00b699;
  border-radius: 0 !important;
  border-width: 0 0 0 4px;
}

#create-title:focus {
  border-color: #00b699;
  border-radius: 0 !important;
  border-width: 1px 1px 1px 4px;
  box-shadow: none;
}

.footer {
  font-size: 10px !important;
}
</style>
