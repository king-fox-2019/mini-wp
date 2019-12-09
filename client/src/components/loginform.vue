<template>
    <form v-on:submit.prevent="login" class="box" style="box-shadow: 10px 10px 21px -8px rgba(0,0,0,0.2);">
        <div class="bts-opening" style="background-image:url('../../img/bts-opening.png');height:170px;width:450px;position:absolute;left:150px;margin-top:215px;background-size:cover">
        </div>
        <div class="bts-opening" style="background-image:url('../../img/all-kpop-logo.png');height:50px;width:200px;position:absolute;left:100px;margin-top:-200px;background-size:cover">
        </div>
                <h2 style="font-size:36px">What's Kpoppin today?</h2>
                <br>
                <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                    <input v-model="email" type="email" placeholder="e.g. bobsmith@gmail.com" class="input">
                    <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                    </span>
                </div>
                </div>
                <div class="field">
                <label for="" class="label">Password</label>
                <div class="control has-icons-left">
                    <input v-model="password" type="password" placeholder="*******" class="input">
                    <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                    </span>
                </div>
                </div>
                <br>
                <div class="field" style="display:flex; justify-content:space-between">
                    <div class="options">
                        <button class="button is-primary" style="margin-right:20px">
                            Login
                        </button>
                        <button @click="register" class="button is-warning">
                            Register
                        </button>
                    </div>
                        <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
                </div>
    </form>
    
</template>

<script>

import axios from '../apis/server'
import Swal from 'sweetalert2'
import GoogleLogin from 'vue-google-login'

export default {
    name:'login-form',
    data(){
        return {
            email:'',
            password: '',
            params: {
                client_id:'434137932056-mhlk7skeh24mkbuusvdovau85bd8oees.apps.googleusercontent.com'
            },
            renderParams: {
                width: 200,
                height: 40,
                longtitle: true
            }
        }
    },
    methods: {
        onSuccess(googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            axios({
                method : 'post',
                url : 'users/googleLogin',
                data : {
                    id_token
                }
            })
            .then(({data})=>{
                Swal.fire(
                    'Welcome Back!',
                    'Now you are signed in',
                    'success'
                )
                localStorage.setItem('token',data.access_token)
                this.email = ''
                this.password = ''
                this.$emit('loginStatus',true)
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Wrong email/password', 
                })
                console.log(err)
            })

            // console.log(googleUser.Zi.access_token ,'consoleee logggg');

            // console.log(googleUser,'consoleee logggg');
            // This only gets the user information: id, name, imageUrl and email
            // console.log(googleUser.getBasicProfile());
        },
    
        login(){
            axios({
                method : 'post',
                url : 'users/login',
                data : {
                    email : this.email,
                    password : this.password
                }
            })
            .then(({data})=>{
                Swal.fire(
                    'Welcome Back!',
                    'Now you are signed in',
                    'success'
                )
                localStorage.setItem('token',data.access_token)
                this.email = ''
                this.password = ''
                this.$emit('loginStatus',true)
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Wrong email/password', 
                })
                console.log(err)
            })

        },
        register(){
            this.$emit('pageStatus','register')
        }
    },
    components: {
            GoogleLogin
        }

}
</script>

<style>


.box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 600px;
    height: 600px;
    padding:5rem;
    margin-right: 6rem;
}
.input{
    height: 50px;
    padding-left: 4rem;
}

.control.has-icons-left .input, .control.has-icons-left .select select {
    padding-left: 4rem;
}

.columns.is-centered {
    justify-content: space-between;
}
.button{ 
    transition: all .2s ease-in-out;
}
.button:hover{
    transform: scale(1.1) perspective(1px)
}

</style>