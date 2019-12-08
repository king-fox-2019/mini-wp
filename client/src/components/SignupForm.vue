<template>
    <div>
        <div class="container-fluid d-flex justify-content-center align-items-center signup-form">
            <div class="w-50 d-flex justify-content-center">
                <form class="w-75 p-5 mt-3" @submit.prevent="registerUser">
                    <h1 class="mb-5" style="font-size: 36px; font-family: 'Noto Serif', serif;">Signup</h1>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="fas fa-user"></i></div>
                            </div>
                            <input type="text" class="form-control" id="userReg" aria-describedby="userHelp" placeholder="Username" v-model="username">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="far fa-envelope"></i></div>
                            </div>
                            <input type="text" class="form-control" id="emailReg" aria-describedby="emailHelp" placeholder="Email" v-model="email">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="fas fa-lock"></i></div>
                            </div>
                            <input type="password" class="form-control" id="passReg" placeholder="Password" v-model="password">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Signup</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import Alert from '../public/Alert'
import UserServer from '../../api/user'

export default {
    data () {
        return {
            username: '',
            email: '',
            password: ''
        }
    },
    methods:{
        registerUser(){
            UserServer({
                url: '/register',
                method: 'POST',
                data:{
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data})=>{
                this.username = ''
                this.email = ''
                this.password = ''
                Alert.Toast.fire({
                    icon: 'success',
                    title: 'Register User',
                    text: 'Register Success!'
                })
                this.$emit('show-login')
            })
            .catch(err => {
                Alert.Swal.fire({
                    icon: 'error',
                    title: 'Register User',
                    text: `${err.response.data.message[0]}`
                })
            })
        }   
    }
}
</script>

<style>
.signup-form{
    height: calc(100vh - 80px);
}
</style>