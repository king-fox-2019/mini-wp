<template>
    <form>
        <div class="form-group">
            <label for="loginFromName">Fullname</label>
                <input type="text" class="form-control" id="loginFormmName" name="fullname" placeholder="Your Name">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="text" class="form-control" id="inputEmail" name="email" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="inputPassword" name="password" placeholder="Password">
        </div>
        <div class="row justify-content-center">
            <button style="width: 30%" @click.prevent="signup" class="btn btn-primary mr-5">Submit</button>
            <button style="width: 30%" @click.prevent="loginForm" class="btn btn-primary">Login</button>
        </div>
    </form>
</template>

<script>
import axios from '../../api/server'
export default {
    name: 'register',
    data() {
        return {
        };
    },
    methods: {
        loginForm: function() {
            this.$emit('changeform')
        },
        signup: function() {
            let formValue = {
                fullname: document.getElementById('loginFormmName').value,
                email: document.getElementById('inputEmail').value,
                password: document.getElementById('inputPassword').value
            }
            axios
                .post('user/', {
                    formValue
                })
                .then(({ data })=> {
                    Swal.fire('Registration success, login to start!')
                    this.loginForm()
                })
                .catch(err=> {
                    let fields = err.response.data.join(' | ')
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: fields
                    })
                    
                })
            
        }
    }
};
</script>

<style scoped>
</style>