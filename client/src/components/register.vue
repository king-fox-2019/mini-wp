<template>
  <div>
    <form @submit.prevent="register">
      <div class="form-group">
        <input
          v-model="username"
          type="text"
          class="form-control rounded-0 title"
          placeholder="Enter Username"
        />
      </div>
      <div class="form-group">
        <input
          v-model="email"
          type="email"
          class="form-control rounded-0 title"
          placeholder="Enter email"
        />
      </div>
      <div class="form-group">
        <input
          v-model="password"
          type="password"
          class="form-control rounded-0 title"
          placeholder="Enter Password"
        />
      </div>
      <button type="submit" class="btn btn-primary register mt-3">
        Register
      </button>
    </form>
  </div>
</template>

<script>
import axios from "../server";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      axios
        .post("users/register", {
          email: this.email,
          password: this.password,
          username: this.username
        })
        .then(({ data }) => {
          Swal.fire({
            title: "Success!",
            text: `Welcome to Mini Wordpress ${data.username}`,
            icon: "success",
            confirmButtonText: "Cool"
          });
          localStorage.setItem("token", data.token);
          this.$emit("islogin", true);
        })
        .catch(err => {
          Swal.fire({
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "Cool"
          });
        });
    }
  }
};
</script>

<style scoped>
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

.title {
  background-color: #f9f9f9;
  border-radius: 0 !important;
  height: 35px;
  text-align: center;
  font-size: 20px;
  font-family: "Sulphur Point", sans-serif;
  border-color: #00ccaa;
  border-width: 0 0 0 4px;
}

.title:hover {
  border-color: #00b699;
  border-radius: 0 !important;
  border-width: 0 0 0 4px;
}

.title:focus {
  border-color: #00b699;
  border-radius: 0 !important;
  border-width: 1px 1px 1px 4px;
  box-shadow: none;
}
</style>
