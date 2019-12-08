<template>
  <div class="form-register">
    <!-- Default form register -->
    <form class="text-center border border-light">
      <p class="h3 mb-4">Sign up</p>

      <div class="form-row mb-4">
        <div class="col">
          <!-- First name -->
          <input
            type="text"
            id="defaultRegisterFormFirstName"
            class="form-control"
            placeholder="Name"
            v-model="name"
          />
        </div>
      </div>

      <!-- E-mail -->
      <input
        type="email"
        id="defaultRegisterFormEmail"
        class="form-control mb-4"
        placeholder="Email"
        v-model="email"
      />

      <!-- Password -->
      <input
        type="password"
        id="defaultRegisterFormPassword"
        class="form-control"
        placeholder="Password"
        aria-describedby="defaultRegisterFormPasswordHelpBlock"
        v-model="password"
      />

      <!-- Sign up button -->
      <button class="btn btn-info my-4 btn-block" type="submit">Sign in</button>
      <span>or login with Google Account</span>
      <!-- // sign in button // -->
      <div class="g-signin2" data-onsuccess="onSignIn"></div>
    </form>
    <!-- Default form register -->
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  name: "Basic",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    registerUser() {
      axios({
        url: "http://localhost:3000/register",
        method: "POST",
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(result => {
          localStorage.setItem("access_token", result.token);
          this.$emit("data-submited-from-form");
        })
        .catch(err => {
          swal(err.message);
        });
    },
    onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "post",
        url: "http://localhost:3000/google-signin",
        data: {
          id_token: id_token
        }
      })
        .done(data => {
          localStorage.setItem("access_token", data.token);
          this.$emit("data-submited-from-form");
        })
        .catch((err) => {
          swat(err.message);
        });
    }
  }
};
</script>

<style scoped>
.form-register {
  display: flex;
  position: relative;
  width: 100vw;
  height: 70vh;
  top: 10vh;
  justify-content: center;
  align-items: space-around;
}

.form-register form {
  background-color: rgba(0, 0, 0, 0.376);
  border: 2px solid rgb(85, 85, 85);
  border-radius: 10%;
  padding: 2vh 5vw;
}

form p {
  color: antiquewhite;
  font-size: 3rem;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: whitesmoke;
}

form span {
  color: antiquewhite;
}
</style>