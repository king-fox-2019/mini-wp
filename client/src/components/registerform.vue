<template>
  
            <form @submit.prevent="register" class="box" style="box-shadow: 10px 10px 21px -8px rgba(0,0,0,0.2);">
                <h1 style="font-size:36px">Register now</h1>
                <br>
                <br>
                <div class="field">
                    <label for="" class="label">Username</label>
                    <div class="control has-icons-left">
                        <input v-model='fullname' type="text" placeholder="e.g. bob smith" class="input" >
                        <span class="icon is-small is-left">
                           <i class="fas fa-user"></i>
                        </span>
                </div>
                <div class="field">
                    <label for="" class="label">Email</label>
                    <div class="control has-icons-left">
                        <input v-model="email" type="email" placeholder="e.g. bobsmith@gmail.com" class="input" >
                        <span class="icon is-small is-left">
                            <i class="fa fa-envelope"></i>
                        </span>
                    </div>
                </div>
                    <div class="field">
                    <label for="" class="label">Password</label>
                    <div class="control has-icons-left">
                        <input v-model="password" type="password" placeholder="*******" class="input" >
                        <span class="icon is-small is-left">
                            <i class="fa fa-lock"></i>
                        </span>
                    </div>
                </div>
                 <b-field class="file">
                    <b-upload v-model="file">
                        <a class="button is-primary">
                            <b-icon icon="upload"></b-icon>
                            <span>Click to upload</span>
                        </a>
                    </b-upload>
                    <span class="file-name" v-if="file">
                        {{ file.name }}
                    </span>
                </b-field>
                      

                <br>
            
                         
                <div class="field" style="display:flex; justify-content:space-between">
                    
                        <button class="button is-success">
                            Register
                        </button>
                         <button class="button is-success" @click="login">
                            back
                        </button>
                </div>
            </form> 
    
</template>

<script> 

import axios from '../apis/server'

export default {
    name:'register-form',
    props:{
      
    },
    data(){
        return {
            fullname:'',
            email:'',
            password:'',
            file: [],
        }
    },
    methods:{
        login(){
            this.$emit('pageStatus','login')
        },
        register(){
        
        let fd = new FormData
        fd.append('fullname',this.fullname)
        fd.append('email',this.email)
        fd.append('password',this.password)
        fd.append('file',this.file)

        axios({
            method : 'post',
            url: 'users/register',
            data: fd
        })
        .then(({data} )=> {
            console.log(data)
            this.$emit('loginStatus',true)
            this.loginStatus = true
            localStorage.setItem('token',data.access_token)
            this.fullname = ''
            this.email = ''
            this.password = ''
        })
        .catch(err =>{
            console.log(err)
        })
        }
    }
}
</script>

<style>



</style>