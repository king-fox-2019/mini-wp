<template>
    <div class="containerLogin">
        <div class="overlay" :style="overlay">
            <div class="form form__login" :style="formLogin">
                <form v-on:submit.prevent="login">
                    <label>E-MAIL</label>
                    <input v-model="emailLogin" type="text">
                    <label>PASSWORD</label>
                    <input v-model="passwordLogin" type="password"><br />
                    <input type="submit" value="LOG IN">
                </form>
            </div>
            <div class="form form__signup" :style="formSignup">
                <form v-on:submit.prevent="register">
                    <label for="email">E-MAIL</label>
                    <input v-model="emailSignup" type="email">
                    <label for="password">PASSWORD</label>
                    <input v-model="passwordSignup" type="password"><br />
                    <input type="submit" value="REGISTER">
                </form>
            </div>
        </div>
        <div class="boxx left">
            <h4>Start working!</h4>
            <button class="btn btn__login" v-on:click="removeOverlay">LOG IN</button>
        </div>
        <div class="boxx right">
            <h4>Need an account?</h4>
            <button class="btn btn__signup" v-on:click="moveOverlay">REGISTER</button>
        </div>
    </div>
</template>

<script>
import axios from '../apis/axios'
import Swal from 'sweetalert2'

export default {
  name: "LoginForm",
    data() {
        return {
            emailLogin: '',
            passwordLogin: '',
            emailSignup: '',
            passwordSignup: '',
            overlay: '',
            formLogin : '',
            formSignup : ''
        }
    },
    methods: {
        login() {
            axios({
                url: "/users/login",
                method: "POST",
                data: {
                    email: this.emailLogin,
                    password: this.passwordLogin
                }
            })
                .then(({ data }) => {
                    localStorage.setItem('token', data.token)
                    this.$emit('set-login')
                    this.emailLogin = ''
                    this.passwordLogin = ''
                    Swal.fire({
                        icon: 'success',
                        title: `Login Successful, Welcome`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Wrong Email or Password'
                    })
                })
        },
        register() {
            axios({
                url: "/users/register",
                method: "POST",
                data: {
                    email: this.emailSignup,
                    password: this.passwordSignup
                }
            })
                .then(({ data }) => {
                    localStorage.setItem('token', data.token)
                    this.$emit('set-login')
                    console.log(`register successful`);
                    this.emailSignup = ''
                    this.passwordSignup = ''
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration successful',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'The email that you use is already registered in our database, please use other email.',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
                })
        },
        moveOverlay(e) {
            e.preventDefault();
            this.overlay = 'left : 335px';
            this.formLogin = 'display : none';
            this.formSignup = 'display : flex';
        },
        removeOverlay(e) {
            e.preventDefault();
            this.overlay = 'left : 15px';
            this.formLogin = 'display : flex';
            this.formSignup = 'display : none';
        }
    }
};
</script>

<style>
</style>