<template>
  <div class="container" style="margin-top:20px">
    <template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item @click="backtohome">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="end">
                <div class="buttons">
                    <b-navbar-item tag="div">
                    <button v-if="isLogin" class="button is-primary" @click="admin">
                        <strong>My Profile</strong>
                    </button>
                    <button v-if="!isLogin" class="button is-primary" @click="toogleSignUp">
                        <strong>Sign up</strong>
                    </button>
                    <button v-if="!isLogin" class="button is-primary" @click="toogleLogin">
                        <strong>Log in</strong>
                    </button>
                    <button v-if="isLogin" class="button is-primary" @click="logout">
                        <strong>Log Out</strong>
                    </button>
            </b-navbar-item>
            </div>
        </template>
    </b-navbar>
    </template>
    <!-- ====================Login Form==================== -->
    <form style="width:500px; margin:auto; margin-top:50px" v-if="needLogin">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Login</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Email">
                            <b-input
                                type="email"
                                v-model="emailLogin"
                                placeholder="Your email"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input
                                type="password"
                                v-model="passwordLogin"
                                password-reveal
                                placeholder="Your password"
                                required>
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="toogleLogin">Close</button>
                        <button @click.prevent="login" class="button is-primary">Login</button>
                    </footer>
                <br>
                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                <br>
                </div>
    </form>

    <!-- ===============Sign Up Form======================== -->
    <form @submit.prevent="signup" style="width:500px; margin:auto; margin-top:50px" v-if="needSignUp">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Sign Up</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Username">
                            <b-input
                                type="text"
                                v-model="usernameRegister"
                                placeholder="Your username"
                                required>
                            </b-input>
                        </b-field>
                        <b-field label="Email">
                            <b-input
                                type="email"
                                v-model="emailRegister"
                                placeholder="Your email"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input
                                type="password"
                                v-model="passwordRegister"
                                password-reveal
                                placeholder="Your password"
                                required>
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="toogleSignUp">Close</button>
                        <button @click.prevent="signup" class="button is-primary">Sign Up</button>
                    </footer>
                </div>
            </form>
  </div>
</template>

<script>
import axios from 'axios'
import GoogleLogin from 'vue-google-login';


export default {
    name: 'navbar',
    components: {
        GoogleLogin
    },
    props: ['deletetoken'],
    data: function() {
        return {
            needLogin: false,
            needSignUp: false,
            usernameRegister: '',
            emailRegister: '',
            passwordRegister: '',
            emailLogin: '',
            passwordLogin: '',
            isLogin: false,
            params: {
                        client_id: "907041340854-ma59s73mevnrp9vv6u2ohmfopln2gt0i.apps.googleusercontent.com"
                    },
                    // only needed if you want to render the button with the google ui
                    renderParams: {
                        width: 500,
                        height: 50,
                        longtitle: true
                    }
        }
    },
    methods: {
        onFailure(err) {
            console.log(err)
        },
        onSuccess(googleUser) {
            var profile = googleUser.getBasicProfile();
            // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            // console.log('Name: ' + profile.getName());
            // console.log('Image URL: ' + profile.getImageUrl());
            // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            const id_token = googleUser.getAuthResponse().id_token
            axios({
                method: 'POST',
                url: `${this.$baseUrl}/users/signin/google`,
                headers: {
                    name : profile.getName(),
                    email : profile.getEmail(),
                    id_token
                }
            })
                .then(response => {
                    this.isLogin = true
                    this.toogleLogin()
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('name', response.data.name)
                    localStorage.setItem('email', response.data.email)
                    console.log(response.data)
                    this.admin()
                })
                .catch((err) => {   
                    this.$swal('error',err.response.data.error[0],'error')
                    console.log(err)
                })
        },
        toogleLogin() {
            if (this.needLogin == true) this.needLogin = false
            else {
                this.needLogin = true 
                this.needSignUp = false
            }
        },
        toogleSignUp() {
            if (this.needSignUp == true) this.needSignUp = false
            else {
                this.needSignUp = true
                this.needLogin = false
            }
        },
        login() {
            axios({
                method: 'POST',
                url: `${this.$baseUrl}/users/signin`,
                data: {
                    email: this.emailLogin,
                    password: this.passwordLogin
                }
            })
                .then(response => {
                    this.isLogin = true
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('name', response.data.name)
                    localStorage.setItem('email', response.data.email)
                    // console.log(response.data)
                    this.$swal({
                        title: `<span style="color:#FFFFFF; font-size:15px">Welcome, ${response.data.name}!</span>`,
                        })
                    this.admin()
                })
                .catch(err => {
                    const error = err.response.data.error.join('\n')
                    this.$swal({
                        title: `<span style="color:#FFFFFF; font-size:15px">${error}</span>`,
                        })
                })
                .finally(_=> {
                    this.toogleLogin()
                })
        },
        admin() {
            this.$emit('islogin')
        },        
        signup() {
            axios({
                method: 'POST',
                url: `${this.$baseUrl}/users/signup`,
                data: {
                    name: this.usernameRegister,
                    email: this.emailRegister,
                    password: this.passwordRegister
                }
            })
                .then(response => {
                    console.log(response.data)
                    this.$swal({
                        title: `<span style="color:#FFFFFF" font-size:15px>Hi, ${response.data.name}! <br> Register was succes. You should login first!</span>`,
                        })
                })
                .catch(err => {
                    console.log(err.response.data.error)
                    const error = err.response.data.error.join('\n')
                    this.$swal({
                        title: `<span style="color:#FFFFFF; font-size:15px">${error}</span>`,
                        })
                })
                .finally(_=> {
                    this.toogleSignUp()
                })
        },
        logout() {
            if (gapi.auth2) {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(() => {
                    console.log('signout succes')
                })
            }
            this.$swal({
                title: `<span style="color:#FFFFFF" font-size:15px>Bye, ${localStorage.name}!</span>`,
                })
            this.$emit('islogout')
            this.isLogin = false
            localStorage.clear()
            
        },
        backtohome() {
            this.$emit('showarticles')
        }
        
    },
    created() {
        if (localStorage.token) this.isLogin = true
    },
    watch: {
        deletetoken() {
            if (this.deletetoken == true) this.logout()
        }
    }
}
</script>

<style>

</style>