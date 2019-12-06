<template>
    <div class="row" style="background-color: #F6F7F7; height: 95vh;">
        <div class="col-3"></div>
        <div class="col mt-5">
            <h4 v-if="loginText" style="font-weight: normal;" class="text-center Login"> Log in to your account </h4>
            <h4 v-if="!loginText" style="font-weight: normal;" class="text-center Register"> Register your account </h4>
            <div class="row mx-auto mt-4 pb-4" style="height: auto; width: 30em; background-color: #FFFFFF; border: 1px solid rgb(223, 223, 223);">
                <div class="form-group mx-auto">
                    <label v-if="!loginText" for="" class="ml-2 mt-4 Login" style="font-weight:500; font-size: 15px; color: rgb(46, 46, 46);">Name</label>
                    <input v-if="!loginText" type="text" class="form-control Login" name="" id="" style="margin-top: -6px;width: 25em; border: 1px solid rgb(211, 210, 210);" aria-describedby="helpId" placeholder="Name">
                    <label for="" class="ml-2 mt-4" style="font-weight:500; font-size: 15px; color: rgb(46, 46, 46);">Email Address</label>
                    <input type="email" class="form-control" name="" id="" style="margin-top: -6px;width: 25em; border: 1px solid rgb(211, 210, 210);" aria-describedby="helpId" placeholder="Email">
                    <label for="" class="ml-2 mt-4" style="font-weight:500; font-size: 15px; color: rgb(46, 46, 46);">Password</label>
                    <input type="password" class="form-control" name="" id="" style="margin-top: -6px;width: 25em; border: 1px solid rgb(211, 210, 210);" aria-describedby="helpId" placeholder="Email">
                    <!-- <label for="" class="ml-2 mt-4" style="font-weight:500; font-size: 15px; color: rgb(46, 46, 46);">Password</label> -->
                    <div v-if="!loginText" class="form-group files mt-4 Login" style="font-weight:500; font-size: 15px; color: rgb(46, 46, 46);">
                        <label class="text-left">Photo Profile</label>
                        <div style="background: url('../public/img/testing-p.jpg'); margin-top: -6px; background-size: 100%; width: 100%; height: 200px;"> </div>
                        <input type="file" class="form-control" multiple="">
                    </div>
                    <!-- -- -->
                    <button type="button" class="btn btn-block mt-3 buttonLogin Login">Login</button>
                    <button v-if="!loginText" type="button" class="btn btn-block mt-3 buttonLogin Register">Register</button>
                    <div class="separator mt-4 Login mb-3">OR</div>
                    <div class="text-center">
                        <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
                            <div class="d-flex align-items-center">
                                <i class="fab fa-google fa-2x mr-3"></i>
                                <span>Sign in with Google</span>
                            </div>
                        </g-signin-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-3"></div>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'
export default {
    name : 'form-user',
    data() {
        return {
            googleSignInParams: { client_id: '487893327742-9nlhan5kbksp9vn9mqi11bn1saoe7mha.apps.googleusercontent.com' },
            'loginText' : true
        }
    },
    methods: {
        onSignInSuccess (googleUser) {
            console.log(googleUser);
            Swal.showLoading()
            const { id_token } = googleUser.getAuthResponse();
            axios({
                url : '/user/google',
                method : 'post',
                data : { id_token }
            })
            .then(({data})=>{
                Swal.close()
                localStorage.setItem('token',data.token)
            })
            .catch(err=>{
                // console.log(err);
            })
        },
        onSignInError(error){
		},
    },
    mounted() {
        gapi.signin2.render('google-signin-button', {
            onsuccess: this.onSignIn
        })
    },
}
</script>

<style scoped>
.g-signin-button {
    display: inline-block;
    padding: 10px 15px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    cursor: pointer;
    transition: 0.5s;
}
.g-signin-button:hover{
    background-color: #bbbbbb;
    color: #3c82f7;
}

.buttonLogin{
    background-color: rgb(194, 78, 98);
    color: white;
    transition: 0.5s;
    border: 1px solid rgb(122, 43, 56);
}

.buttonLogin:hover{
    background-color: rgb(119, 48, 60);
    color: white;
}
</style>