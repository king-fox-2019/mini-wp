<template>
    <div>
        <div class="container-fluid d-flex justify-content-center align-items-center signin-form">
            <div class="w-50 d-flex justify-content-center">
                <form class="w-75 p-5 mt-3" @submit.prevent="loginUser">
                    <h1 class="mb-5" style="font-size: 36px; font-family: 'Noto Serif', serif;">Signin</h1>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="far fa-envelope"></i></div>
                            </div>
                            <input type="text" class="form-control" id="emailLog" aria-describedby="emailHelp" placeholder="Email" v-model="email">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="fas fa-lock"></i></div>
                            </div>
                            <input type="password" class="form-control" id="passLog" placeholder="Password" v-model="password">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Signin</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import UserServer from '../../api/user'
import Alert from '../public/Alert'


export default {
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods:{
        loginUser(){
            UserServer({
                url: '/login',
                method: 'POST',
                data:{
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data})=>{
                localStorage.setItem('token', data.token)
                this.email = ''
                this.password = ''
                Alert.Toast.fire({
                    icon: 'success',
                    title: 'Login User',
                    text: 'User Login Success!'
                })
                this.$emit('go-mainpage')
                this.$emit('user-login', data.user)
            })
            .catch(err => {
                if(err.response.data.message.length > 1){
                    let message = ''
                    let array = err.response.message.length
                    array.forEach((data,index) => {
                        if(index == array.length-1){
                            message += data
                        }else{
                            message += `${data} & `
                        }
                    });
                    Alert.Swal.fire({
                        icon: 'error',
                        title: 'Login User',
                        text: message
                    })
                }else{
                    Alert.Swal.fire({
                        icon: 'error',
                        title: 'Login User',
                        text: `${err.response.data.message[0]}`
                    })
                }
            })
        }
    }
}
</script>

<style>
.signin-form{
    height: calc(100vh - 80px);
}
</style>