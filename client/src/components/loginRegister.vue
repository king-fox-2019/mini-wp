<template>
    
    <div class="firstPage">
        <!-- <h1>filename: loginRegister.vue</h1> -->
        
        <!-- login form -->
        <div class="card" style="width: 18rem; margin:auto; margin-top:10%;" v-if="showForm === 'login'">
            <form class="px-4 py-3 shadow-lg p-3 bg-white rounded">
                <div class="form-group">
                <label for="exampleDropdownFormEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleDropdownFormEmail1" v-model="emailLogin" required>
                </div>
                <div class="form-group">
                <label for="exampleDropdownFormPassword1">Password</label>
                <input type="password" class="form-control" id="exampleDropdownFormPassword1" v-model="passwordLogin" required>
                </div>
                
                <div>
                <button type="submit" class="btn btn-primary" @click.prevent="signIn">Sign in</button>
                <div class="g-signin2" data-onsuccess="onSignIn">Hit refresh to show Gsignin</div>
                </div>

                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="" @click.prevent="changeForm('register')">New around here? Sign up</a>
            </form>
        </div>  
        <!-- end of login form -->



        <!-- register form -->
        <div class="card" style="width: 18rem; margin:auto; margin-top:10%;" v-if="showForm === 'register'">
            <form class="px-4 py-3 shadow-lg p-3  bg-white rounded">
                 <div class="form-group">
                <label for="username">username</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
                </div>
                <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" v-model="emailRegistration" required>
                </div>
                <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="passwordRegistration" required>
                </div>
                <button type="submit" class="btn btn-primary" @click.prevent="register">Register</button>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="" @click.prevent="changeForm('login')">Already registered? Sign in</a>
            </form>
        </div>
        <!-- end of register form -->

    
    </div>
    


</template>



<script>
import axios from 'axios'
import Swal from 'sweetalert2'


export default {
    
    data: function (){
        return {
            showForm : 'login',
            emailLogin: '',
            passwordLogin: '',
            username: '',
            emailRegistration: '',
            passwordRegistration: '',

        }
    },
    methods:{
        signIn()
          {
            axios({
                method: 'post',
                url: 'http://localhost:3000/users/login',
                data:{
                    email: this.emailLogin,
                    password: this.passwordLogin
                }   
            })
            .then( result=>{
                console.log('login success nih')
                console.log(result)
                localStorage.setItem('access_token', result.data.access_token)
                
                Swal.fire({
                    title: "Login",
                    text: `Welcome Back, ${result.data.username}`,
                    icon: 'success'
                })
                .then(result=>{
                    this.$emit('changePage', 'bodyContent')
                    this.$emit('showNavBar', true)
                })

            })
            .catch( err=>{
                console.log('login error nih')
                console.log(err.response)
                Swal.fire(
                    err.response.data.code,
                    err.response.data.message,
                    'error'
                )
            })

            this.emailLogin = ''
            this.passwordLogin = ''
          },
        register()
          {
            axios({
                method: 'post',
                url: 'http://localhost:3000/users/register',
                data:{
                    username: this.username,
                    email: this.emailRegistration,
                    password: this.passwordRegistration
                }
            })
            .then(result=>{
                console.log('regist success')
                console.log(result)
                Swal.fire(
                    'Registration Succeed',
                    `Thank you for registrating,  ${result.data.username}`,
                    'success'
                )

                this.username = ''
                this.emailRegistration = ''
                this.passwordRegistration = ''
            })
            .catch(err=>{
                console.log('error nih')
                console.log(err.response)
                Swal.fire(
                    err.response.data.code,
                    err.response.data.message,
                    'error'
                )
            })
          },
        changeForm(page)
          {
            this.showForm = page
          }

    }
}
</script>




<style>
.firstPage
{
  border: solid 1px black;
  background-image: url('../../dist/Dense_fog_over_Huangshan_(Unsplash).jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: bottom;
  /* background-size: 100% auto ; */
  height: 100vh
  
}


.dropdown-menu
{
    height:600px;
    width:auto;
    background-color: white

}


.g-signin2
{
    display: inline-block
}

</style>