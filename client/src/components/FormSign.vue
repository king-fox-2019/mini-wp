<template>
  <div class="text-center" id="signin">
    <v-dialog v-model="dialog" width="400">
      <template v-slot:activator="{ on }">
        <v-btn depressed color="grey lighten-4" v-on="on">
          <span>Sign In</span>
          <v-icon right>open_in_new</v-icon>
        </v-btn>
      </template>

      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>SignIn Form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="onSignIn" lazy-validation>
            <v-text-field
              v-model="signIn.email"
              :rules="emailRules"
              label="E-mail"
              required
              prepend-icon="person"
              type="text"
            ></v-text-field>

            <v-text-field
              v-model="signIn.password"
              :rules="passwordRules"
              label="Password"
              required
              prepend-icon="lock"
              type="password"
            ></v-text-field>

            <v-btn color="primary" class="mr-4" type="submit">SignIn</v-btn>

            <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

            <!-- sign up form -->
            <v-dialog v-model="dialog2" width="400">
              <template v-slot:activator="{ on }">
                <v-btn color="pink lighten-1" @click="goSignUpForm" v-on="on">SignUp</v-btn>
              </template>
              <!-- <v-btn color="warning" @click="onSignUp">SignUp</v-btn> -->
              <v-card class="elevation-12">
                <v-toolbar color="pink lighten-1" dark flat>
                  <v-toolbar-title>SignUp Form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form2" v-model="valid2" @submit.prevent="onSignUp" lazy-validation>
                    <v-text-field
                      v-model="signUp.name"
                      :counter="30"
                      :rules="nameRules"
                      label="Name"
                      required
                      prepend-icon="note"
                      type="text"
                    ></v-text-field>

                    <v-text-field
                      v-model="signUp.email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                      prepend-icon="person"
                      type="text"
                    ></v-text-field>

                    <v-text-field
                      v-model="signUp.password"
                      :rules="passwordRules"
                      label="Password"
                      required
                      prepend-icon="lock"
                      type="password"
                    ></v-text-field>

                    <v-file-input
                      small-chips
                      multiple
                      type="file"
                      required
                      :rules="imageRules"
                      v-model="signUp.image"
                      label="Your Photo Profile"
                    ></v-file-input>

                    <v-btn color="primary" class="mr-4" @click="backToSignIn">Back</v-btn>

                    <v-btn color="error" class="mr-4" @click="resetSignUp">Reset Form</v-btn>

                    <v-btn color="pink lighten-1" type="submit">SignUp</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
            <!-- end signup form -->
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "FormSign",
  data() {
    return {
      dialog: false,
      dialog2: false,
      valid: true,
      valid2: true,
      signIn: {
        email: "",
        password: ""
      },
      signUp: {
        name: "",
        email: "",
        password: "",
        image: []
      },
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 30) || "Name must be less than 30 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "password is required",
        v => (v && v.length >= 7) || "Password must be higher than 7 characters"
      ],
      imageRules: [
        // v => !!v || "Image is required",
        v => !!v || "Image is required",
        v => (v && v.length <= 1) || "Image is required"
        // v => v.file === null || "Image is required"
      ]
    };
  },
  methods: {
    onSignIn() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.axios({
          method: "POST",
          url: "/users/signin",
          data: this.signIn
        })
          .then(({ data }) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.response.name);
            localStorage.setItem("image", data.response.image);
            this.reset();
            this.dialog = false;
            this.$emit("snackbar-success", {
              color: "success",
              text: `Welcome to the Article Sharing, ${data.response.name}`,
              isLogin: true
            });
            this.$emit("user-signin", {
              name: `${data.response.name}`,
              image: data.response.image
            });
          })
          .catch(err => {
            let text = "";
            err.response.data.errors.forEach(element => {
              text += element + ", ";
            });
            this.reset();
            this.$emit("snackbar-success", {
              color: "warning",
              text: `${text}`
            });
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetSignUp() {
      this.$refs.form2.reset();
    },
    goSignUpForm() {
      this.dialog = false;
      this.dialog2 = true;
      this.reset();
    },
    onSignUp() {
      if (this.$refs.form2.validate()) {
        this.snackbar = true;
        let fd = new FormData();
        if (this.signUp.image === undefined) {
          fd.append("image", "zonk");
        } else {
          fd.append("image", this.signUp.image[0]);
        }
        fd.append("name", this.signUp.name);
        fd.append("email", this.signUp.email);
        fd.append("password", this.signUp.password);
        this.axios({
          method: "POST",
          url: "/users/signup",
          data: fd
        })
          .then(({ data }) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.response.name);
            localStorage.setItem("image", data.response.image);
            this.resetSignUp();
            this.dialog2 = false;
            this.$emit("snackbar-success", {
              color: "success",
              text: `Welcome to the Article Sharing, ${data.response.name}`,
              isLogin: true
            });
            this.$emit("user-signin", {
              name: `${data.response.name}`,
              image: data.response.image
            });
          })
          .catch(err => {
            let text = "";
            err.response.data.errors.forEach(element => {
              text += element + ", ";
            });
            this.resetSignUp();
            this.$emit("snackbar-success", {
              color: "warning",
              text: `${text}`
            });
          });
      }
    },
    backToSignIn() {
      this.dialog2 = false;
      this.dialog = true;
      this.resetSignUp();
    }
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.reset();
      }
    },
    dialog2(val) {
      if (!val) {
        this.resetSignUp();
      }
    },
    signUp(val) {
      this.signUp.image = val;
    }
  }
};
</script>

<style></style>
