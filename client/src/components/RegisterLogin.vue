<template>
  <div>
 
   
   <!-- codepen  -->
   <div class="cont">
  <div class="form sign-in">
    <h2 style="color: #A36053;">Welcome back,</h2>
     <form @submit.prevent="login()">
      <label>
        <span>Email</span>
        <input type="email" v-model="email" />
      </label>
      <label>
        <span>Password</span>
        <input type="password" v-model="password"/>
      </label>
      <p class="forgot-pass">Forgot password?</p>
      <button type="submit" class="submit">Sign In</button>
      <!-- google signin -->
        <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
          style="cursor: pointer;">
          Sign In with Google +
        </g-signin-button>
      <!-- end google signin -->
    </form>
  </div>
  <div class="sub-cont">
    <div class="img">
      <div class="img__text m--up">
        <h2>New here?</h2>
        <p>Sign up and discover great amount of new opportunities!</p>
      </div>
      <div class="img__text m--in">
        <h2>One of us?</h2>
        <p>If you already has an account, just sign in. We've missed you!</p>
      </div>
      <div @click="animate()" class="img__btn">
        <span class="m--up">Sign Up</span>
        <span class="m--in">Sign In</span>
      </div>
    </div>
    <div class="form sign-up">
      <h2 style="color: #A36053;">Time to feel like home,</h2>
       <form @submit.prevent="register()">
      <label>
        <span>Name</span>
        <input type="text" v-model="name" />
      </label>
      <label>
        <span>Email</span>
        <input type="email" v-model="email" />
      </label>
      <label>
        <span>Password</span>
        <input type="password" v-model="password" />
      </label>
      <button type="submit" class="submit">Sign Up</button>
    </form>
    </div>
  </div>
</div>
   <!-- end codepen  -->



   
  </div>
  
</template>

<script>
import axios from 'axios'

 


export default {
  data: function() {
    return {
      name: '',
      email: '',
      password: '',
      googleSignInParams: {
        client_id: '239754148921-nlpf58ao2hn3gmba34aoj22s3jvlnjcg.apps.googleusercontent.com'
      }
    }
  },
  methods : {
    switchToAuthPage() {
      console.log(`masuk switch auth page`);
      this.$emit('setPage', 'auth')
    },
    switchToMainPage() {
      console.log(`masuk switch main page`);
      this.$emit('setPage', 'main')
    },
    login() {
      console.log(`loginnnnnnnnnnn`);
      
      axios({
        method : 'post',
        // url: 'http://35.198.219.105/users/login',
        url: 'http://localhost:3040/users/login',

        data : {
          email : this.email, 
          password : this.password
        }
      })
      .then(({data}) => {
        console.log(data);
        this.switchToMainPage()
        localStorage.setItem('token', data.token)
        
      })
      .catch(err => {
        console.log(err.response);
        
      })
    },
    register() {
      console.log('registerrrrrrrr');
      axios({
        method: 'post',
        // url: 'http://35.198.219.105/users/register',
        url: 'http://localhost:3040/users/register',

        data : {
          name : this.name,
          email : this.email, 
          password : this.password
        }
      })
      .then(({data}) => {
        console.log(data);
        localStorage.setItem('token', data.token)     
        this.switchToMainPage() 
      })
      .catch(err => {
        console.log(err.response);
        
      })
    },
    animate() {
    console.log(`triggeredddd `);
      document.querySelector('.cont').classList.toggle('s--signup');
    },
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile() // etc etc
      console.log(profile);
      let idToken = googleUser.getAuthResponse().id_token;
      console.log(idToken);

      axios({
        method : 'post',
        // url : 'http://35.198.219.105/users/google-signin',
        url : 'http://localhost:3000/users/google-signin',

        data : {
          idToken
        }
      })
      .then(({data}) => {
        console.log(data, "ini on sign in google");
        localStorage.setItem('token', data.token)
        this.switchToMainPage()
      })
      .catch(err => {
        console.log(err.response);
        
      })
      
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    }
  }
}


        
</script>

<style>
*, *:before, *:after {
	 box-sizing: border-box;
	 margin: 0;
	 padding: 0;
}
 body {
	 font-family: 'Open Sans', Helvetica, Arial, sans-serif;
	 background: #ededed;
}
 input, button {
	 border: none;
	 outline: none;
	 background: none;
	 font-family: 'Open Sans', Helvetica, Arial, sans-serif;
}
 .tip {
	 font-size: 20px;
	 margin: 40px auto 50px;
	 text-align: center;
}
 .cont {
	 overflow: hidden;
	 position: relative;
	 width: 900px;
	 height: 550px;
	 margin: 0 auto 100px;
	 background: #fff;
}
 .form {
	 position: relative;
	 width: 640px;
	 height: 100%;
	 transition: transform 1.5s ease-in-out;
	 padding: 50px 30px 0;
}
 .sub-cont {
	 overflow: hidden;
	 position: absolute;
	 left: 640px;
	 top: 0;
	 width: 900px;
	 height: 100%;
	 padding-left: 260px;
	 background: #fff;
	 transition: transform 1.5s ease-in-out;
}
 .cont.s--signup .sub-cont {
	 transform: translate3d(-640px, 0, 0);
}
 button {
	 display: block;
	 margin: 0 auto;
	 width: 260px;
	 height: 36px;
	 border-radius: 30px;
	 color: #fff;
	 font-size: 15px;
	 cursor: pointer;
}
 .img {
	 overflow: hidden;
	 z-index: 2;
	 position: absolute;
	 left: 0;
	 top: 0;
	 width: 260px;
	 height: 100%;
	 padding-top: 360px;
}
 .img:before {
	 content: '';
	 position: absolute;
	 right: 0;
	 top: 0;
	 width: 900px;
	 height: 100%;
	 background-image: url('https://i.pinimg.com/564x/f2/9a/21/f29a2130131341812e4271f7eff07da4.jpg');
	 background-size: cover;
	 transition: transform 1.2s ease-in-out;
}
 .img:after {
	 content: '';
	 position: absolute;
	 left: 10;
	 top: 0;
	 width: 100%;
	 height: 100%;
	 /* background: rgba(0, 0, 0, 0.6); */
   background: rgba(163, 98, 84, 0.65);
}
 .cont.s--signup .img:before {
	 transform: translate3d(640px, 0, 0);
}
 .img__text {
	 z-index: 2;
	 position: absolute;
	 left: 0;
	 top: 50px;
	 width: 100%;
	 padding: 0 20px;
	 text-align: center;
	 color: #fff;
	 transition: transform 1.5s ease-in-out;
}
 .img__text h2 {
	 margin-bottom: 10px;
	 font-weight: normal;
}
 .img__text p {
	 font-size: 14px;
	 line-height: 1.5;
}
 .cont.s--signup .img__text.m--up {
	 transform: translateX(520px);
}
 .img__text.m--in {
	 transform: translateX(-520px);
}
 .cont.s--signup .img__text.m--in {
	 transform: translateX(0);
}
 .img__btn {
	 overflow: hidden;
	 z-index: 2;
	 position: relative;
	 width: 100px;
	 height: 36px;
	 margin: 0 auto;
	 background: transparent;
	 color: #fff;
	 text-transform: uppercase;
	 font-size: 15px;
	 cursor: pointer;
}
/* utk tagss */
 .img__btn:after {
	 content: '';
	 z-index: 2;
	 position: absolute;
	 left: 0;
	 top: 0;
	 width: 100%;
	 height: 100%;
	 border: 2px solid #fff;
	 border-radius: 30px;
}
 .img__btn span {
	 position: absolute;
	 left: 0;
	 top: 0;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 width: 100%;
	 height: 100%;
	 transition: transform 1.2s;
}
 .img__btn span.m--in {
	 transform: translateY(-72px);
}
 .cont.s--signup .img__btn span.m--in {
	 transform: translateY(0);
}
 .cont.s--signup .img__btn span.m--up {
	 transform: translateY(72px);
}
 h2 {
	 width: 100%;
	 font-size: 26px;
	 text-align: center;
}
 label {
	 display: block;
	 width: 260px;
	 margin: 25px auto 0;
	 text-align: center;
}
 label span {
	 font-size: 12px;
	 color: #8d584a;
	 text-transform: uppercase;
}
 input {
	 display: block;
	 width: 100%;
	 margin-top: 5px;
	 padding-bottom: 5px;
	 font-size: 16px;
	 border-bottom: 1px solid rgba(180, 72, 72, 0.4);
	 text-align: center;
}
 .forgot-pass {
	 margin-top: 15px;
	 text-align: center;
	 font-size: 12px;
	 color: #cea397;
}
 .submit {
	 margin-top: 40px;
	 margin-bottom: 20px;
	 background: #A36053;
	 text-transform: uppercase;
}
 .fb-btn {
	 border: 2px solid #d3dae9;
	 color: #8fa1c7;
}
 .fb-btn span {
	 font-weight: bold;
	 color: #455a81;
}
 .sign-in {
	 transition-timing-function: ease-out;
}
 .cont.s--signup .sign-in {
	 transition-timing-function: ease-in-out;
	 transition-duration: 1.2s;
	 transform: translate3d(640px, 0, 0);
}
 .sign-up {
	 transform: translate3d(-900px, 0, 0);
}
 .cont.s--signup .sign-up {
	 transform: translate3d(0, 0, 0);
}
 .icon-link {
	 position: absolute;
	 left: 5px;
	 bottom: 5px;
	 width: 32px;
}
 .icon-link img {
	 width: 100%;
	 vertical-align: top;
}
 .icon-link--twitter {
	 left: auto;
	 right: 5px;
}
 
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 10px 30px;
  margin-left: 200px !important;
  border-radius: 45px;
  background-color: #C29589 !important;
  color: #fff;
}
</style>