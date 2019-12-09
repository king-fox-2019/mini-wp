<template>
  <form class="form-signin" @submit.prevent="submitForm">
    <div class="text-center mb-4">
      <img
        class="mb-4"
        src="https://image.flaticon.com/icons/svg/2/2041.svg"
        alt
        width="72"
        height="72"
      />
      <h1 class="h3 mb-3 font-weight-normal">Login</h1>
    </div>

    <div class="form-label-group">
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        v-model="email"
        required
        autofocus
      />
      <label for="inputEmail">Email address</label>
    </div>

    <div class="form-label-group">
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        v-model="password"
        required
      />
      <label for="inputPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me" /> Remember me
      </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  name: "loginForm",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submitForm: function() {
      axios({
        method: "POST",
        url: "http://104.198.20.142:3000/user/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.$emit("set-login");
          localStorage.setItem("token", data.token);
          this.email = "";
          this.password = "";
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.form-control {
  height: calc(1.5em + 0.75rem + 12px);
}
.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: 0 auto;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: 0.75rem 0.75rem;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(0.75rem + 0.75rem * (2 / 3));
  padding-bottom: calc(0.75rem / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(0.75rem / 3);
  padding-bottom: calc(0.75rem / 3);
  font-size: 12px;
  color: #777;
}
</style>