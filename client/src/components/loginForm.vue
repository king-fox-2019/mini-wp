<template>
    <form action="" id="login-form">
        <h1 class="text-center mb-5">MINI WP</h1>
        <input type="text" class="mb-4" placeholder="Email" v-model="email">
        <input type="password" class="mb-4" placeholder="Password" v-model="password">
        <input type="submit" class="btn btn-primary btn-block mb-4" value="Login" @click.prevent="login">
        <b-button class="btn-block mb-4" variant="outline-primary" href="" @click="register">Register</b-button>
        <div class="g-center">
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </div>
    </form>
</template>

<script>
import Swal from 'sweetalert2'
import server from '../../api/server'
import axios from 'axios'

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            this.$emit('login', false)
        },
        login() {
            server({
                method: 'post',
                url: '/author/login',
                data: {
                    email : this.email,
                    password: this.password
                }
            })
                .then(({data}) => {
                    localStorage.setItem('access_token', data.token)
                    localStorage.setItem('author', data.authorName)
                    // this.$emit('username', data.username)
                    this.$emit('changeLogin', true)
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Login Success'
                    })
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Wrong Email or Password'
                    })
                })
        }
    }
}
</script>

<style>
    #login-form {
        width: 340px;
        height: 500px;
        background-color: #fff;
        border: 1px solid #aaa;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 16px 20px rgba(0, 0, 0, 0.6)

    }
    .btn-block {
        width: 100%;
    }
    .g-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>