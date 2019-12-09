<template>
    <form action="" id="login-form">
        <h1 class="text-center mb-5">MINI WP</h1>
        <input type="text" class="mb-4" placeholder="Username" v-model="username">
        <input type="text" class="mb-4" placeholder="Email" v-model="email">
        <input type="password" class="mb-4" placeholder="Password" v-model="password">
        <input type="submit" class="btn btn-primary btn-block mb-4" value="Register" @click.prevent="register">
        <b-button class="btn-block mb-4" variant="outline-primary" @click.prevent="login">Already have account?</b-button>
    </form>
</template>

<script>
import server from '../../api/server'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            this.$emit('login', true)
        },
        register() {
            server({
                method: 'post',
                url: '/author/register',
                data: {
                    username: this.username,
                    email : this.email,
                    password: this.password
                }
            })
                .then(({data}) =>{
                    this.username = '',
                    this.email = '',
                    this.password = ''
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Author has been saved'
                    })

                    this.login()
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message
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