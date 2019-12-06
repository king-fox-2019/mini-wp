<template>
<div class="container">
  <div class="row">
    <div class="col-xl"></div>
    <!-- LOGIN FORM -->
    <div class="col-sm d-flex justify-content-center align-items-center" id="login">
        <div class="" id="wrapper">
            <form id="form" v-if="!isRegister">
                <div class="form-group">
                    <label for="inputEmail">Email address</label>
                    <input type="email" class="form-control" id="inputEmail" name="email" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="inputPassword">Password</label>
                    <input type="password" class="form-control" id="inputPassword" name="password" placeholder="Password">
                </div>
                <div class="row justify-content-center">
                    <button style="width: 30%" @click.prevent="sentToParent" class="btn btn-primary mr-5">Login</button>
                    <button style="width: 30%" @click.prevent="changeForm(true)" class="btn btn-primary">Register</button>
                </div>
            </form>
            <register @changeform="changeForm(false)" v-else></register>
        </div>
    </div>
    <div class="col-sm"></div>
  </div>
</div>
</template>

<script>
    import axios from '../../api/server'
    import register from "./registerComponent"
    export default {
        name: 'login',
        data() {
            return {
                isRegister: false
            }
        },
        components:{
            register
        },
        methods: {
            changeForm: function(value) {
                this.isRegister = value
            },
            sentToParent: function() {
                let email = document.getElementById('inputEmail').value
                let password = document.getElementById('inputPassword').value
                if(!email || !password) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please input your email and password!'
                    })
                } else {
                    this.$emit('login', {email, password})
                }
            }
        }
    };
</script>

<style scoped>
    form {
        padding: 1rem;
    }
    #wrapper {
        padding: 15px;
        width: 600px;
        border-radius: 2rem;
        margin-top: 9rem;
        border: 1px solid lightgray;
        background-color: aqua
    }
</style>