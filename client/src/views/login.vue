<template>
  <div class="demo-blog demo-blog--blogpost mdl-layout mdl-js-layout has-drawer is-upgraded">
      <main class="mdl-layout__content">
        <div class="demo-blog__posts mdl-grid">

          <div class="mdl-card on-the-road-again mdl-cell mdl-cell--6-col">
            <div style="padding: 20px 80px;">
              <h4>Login</h4>
              <form @submit.prevent='login'>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="email" id="sample3" v-model="loginEmail" required>
                  <label class="mdl-textfield__label" for="sample3">Your Email</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="password" id="sample3" v-model="loginPassword" required>
                  <label class="mdl-textfield__label" for="sample3">Your Password</label>
                </div>
                <button type="submit" class="mdl-button mdl-js-button mdl-button--accent">
                  sign in    
                </button><br>
                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
              </form> 
            </div>
          </div>
          <div class="mdl-card on-the-road-again mdl-cell mdl-cell--6-col">
            <div style="padding: 20px 80px;">
              <h4>Register</h4>
              <form @submit.prevent="register">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="email" id="sample3" v-model="registerEmail" required>
                  <label class="mdl-textfield__label" for="sample3">Your Email</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" id="sample3" v-model="registerUsername" required>
                  <label class="mdl-textfield__label" for="sample3">Your Username</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="password" id="sample3" v-model="registerPassword" required>
                  <label class="mdl-textfield__label" for="sample3">Your Password</label>
                </div>
                <button type="submit" class="mdl-button mdl-js-button mdl-button--accent">
                  sign up  
                </button>
              </form> 
            </div>
          </div>

        </div>
      </main>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axios from 'axios'
export default {
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
      registerEmail:'',
      registerUsername:'',
      registerPassword:'',
      params: {
          client_id: "259179261938-aessue9o5qdukqshn071djbjgb0r7pc1.apps.googleusercontent.com",
      },
      renderParams: {
        width: 150,
        height: 30,
        longtitle: true
      }
    };
  },
  methods:{
    onSuccess(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      axios({
        url:'http://localhost:3000/user/google',
        method:'post',
        data:{
          token : id_token
        }
      }).then(({data})=>{
        swal({
            title: "Good job!",
            text: "Login success!",
            icon: "success",
          });
          localStorage.setItem('email', data.email)
          localStorage.setItem('access_token', data.access_token)
          this.$emit('loginregis')
      }).catch(console.log)
    },
    login(){
      axios({
        url:'http://localhost:3000/user/login',
        method:'post',
        data:{
          email : this.loginEmail,
          password : this.loginPassword
        }
      })
        .then(({data}) => {
          swal({
            title: "Good job!",
            text: "Login success!",
            icon: "success",
          });
          this.loginEmail = ''
          this.loginPassword = ''
          localStorage.setItem('email', data.email)
          localStorage.setItem('access_token', data.access_token)
          this.$emit('loginregis')
        })
        .catch(err => {
          swal({
            title: "Something wrong!",
            text: "wrong username or password",
            icon: "warning",
          });
        })
    },
    register(){
      axios({
        url:'http://localhost:3000/user/',
        method:'post',
        data:{
          email : this.registerEmail,
          password : this.registerPassword,
          username: this.registerUsername
        }
      })
        .then(({data}) => {
          swal({
            title: "Good job!",
            text: "Register success!",
            icon: "success",
          });
          this.registerEmail = ''
          this.registerUsername = ''
          this.registerPassword = ''
          localStorage.setItem('email', data.email)
          localStorage.setItem('access_token', data.access_token)
          this.$emit('loginregis')
        })
        .catch(err => {
          console.log(err.message, '---------------')
          swal({
            title: "Something wrong!",
            text: "wrong username or password",
            icon: "warning",
          });
        })
    }
  },
  components: { GoogleLogin }
};
</script>

<style scoped>
</style>