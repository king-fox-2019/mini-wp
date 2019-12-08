<template>
    <div v-if="!isLogin" class="row" style="background-color: #F6F7F7; height: 95vh;">
        <div class="col-3"></div>
        <div class="col mt-5">
            <h4 v-if="loginText" style="font-weight: normal;" class="text-center Login"> Log in to your account </h4>
            <h4 v-if="!loginText" style="font-weight: normal;" class="text-center Register"> Register your account </h4>
            <div class="row mx-auto mt-4 pb-4" style="height: auto; width: 30em; background-color: #FFFFFF; border: 1px solid rgb(223, 223, 223);">
                <div class="form-group mx-auto">
                    <label v-if="!loginText" for="" class="ml-2 mt-4 Login" style="font-weight:500; font-size: 15px; color: rgb(46, 46, 46);">Name</label>
                    <input v-model="name" v-if="!loginText" type="text" class="form-control Login" name="" id="" style="margin-top: -6px;width: 25em; border: 1px solid rgb(211, 210, 210);" aria-describedby="helpId" placeholder="Name">
                    <label for="" class="ml-2 mt-4" style="font-weight:500; font-size: 15px; color: rgb(46, 46, 46);">Email Address</label>
                    <input v-model="email" type="email" class="form-control" name="" id="" style="margin-top: -6px;width: 25em; border: 1px solid rgb(211, 210, 210);" aria-describedby="helpId" placeholder="Email">
                    <label for="" class="ml-2 mt-4" style="font-weight:500; font-size: 15px; color: rgb(46, 46, 46);">Password</label>
                    <input v-model="password" type="password" class="form-control" name="" id="" style="margin-top: -6px;width: 25em; border: 1px solid rgb(211, 210, 210);" aria-describedby="helpId" placeholder="Password">
                    <!-- <label for="" class="ml-2 mt-4" style="font-weight:500; font-size: 15px; color: rgb(46, 46, 46);">Password</label> -->
                    <div v-if="!loginText" class="form-group files mt-4 Login" style="font-weight:500; font-size: 15px; color: rgb(46, 46, 46);">
                        <label class="text-left">Photo Profile</label>
                        <div :style="styleImage"> </div>
                        <input @change="onFileChange" type="file" class="form-control pb-5" multiple="">
                    </div>
                    <!-- -- -->
                    <button @click.prevent="login" v-show="login" v-if="loginText" type="button" class="btn btn-block mt-3 buttonLogin Login">Login</button>
                    <button @click.prevent="register" v-if="!loginText" type="button" class="btn btn-block mt-4 buttonLogin Register">Register</button>
                    <div v-if="loginText" class="separator mt-4 Login mb-3">OR</div>
                    <div v-if="loginText" class="text-center">
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
import Swal from 'sweetalert2'
import GoogleLogin from 'vue-google-login'
import axios from '../../apis/server'
export default {
    props : ['loginText','isLogin'],
    name : 'form-user',
    data() {
        return {
            googleSignInParams: { client_id: '487893327742-9nlhan5kbksp9vn9mqi11bn1saoe7mha.apps.googleusercontent.com' },
            name : '',
            email : '',
            password : '',
            image : '',
            styleImage : '',
            google : false
        }
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files[0]);
        },
        createImage(file) {
            this.image = file
            this.google = false
            let image = new Image();
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.styleImage = `height: 200px; background: url(${e.target.result}) no-repeat center center/cover; background-size: 100%; margin-top: -6px;`
            };
            reader.readAsDataURL(file);
        },
        login(){
            Swal.showLoading()
            let form = {
                email : this.email,
                password : this.password
            }
            axios({
                url : '/user/login',
                method : 'POST',
                data : form
            })
            .then(({data})=>{
                console.log(data);
                localStorage.setItem('token', data.token)
                localStorage.setItem('email', data.user.email)
                localStorage.setItem('name', data.user.name)
                localStorage.setItem('profil', data.user.image[0])
                this.$emit('loginSuccess')
                Swal.close()
            })
            .catch(err=>{
                Swal.close()
                Swal.fire({
                    title: 'Register Failed!',
                    text: err,
                    icon : 'error',
                    // imageUrl: 'https://loading.io/mod/spinner/lava-lamp/index.svg',
                    // imageWidth: 400,
                    // imageHeight: 200,
                    timer: 3500,
                    imageAlt: 'Custom image',
                    showConfirmButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'نعم',
                    cancelButtonText: 'لا',
                })
                console.log(err);
            })
        },
        register(){
            Swal.fire({
                title: 'Register!',
                text: '',
                // imageUrl: 'https://loading.io/mod/spinner/square/index.svg',
                icon : 'success',
                // imageWidth: 400,
                // imageHeight: 200,
                // timer: 2500,
                imageAlt: 'Custom image',
                showConfirmButton: false,
                showCancelButton: false,
                confirmButtonText: 'نعم',
                cancelButtonText: 'لا',
            })
            let form;
            if (this.google) {
                form = {
                    name : this.name,
                    email : this.email,
                    password : this.password,
                    image : this.image
                }
                axios({
                url : '/user/register/google',
                method : 'POST',
                data : form
                })
                .then(({data})=>{
                    this.name = ''
                    this.password = ''
                    this.image = ''
                    this.$emit('checkForm')
                    Swal.close()
                })
                .catch(err=>{
                    Swal.close()
                    let ereror = []
                    this.tags.length == 0 ? ereror.push(`tag is required`) : ''
                    !this.title ? ereror.push(`title is required`) : ''
                    this.image.length == 0 ? ereror.push(`image is required`) : ''
                    !this.content ? ereror.push(`content is required`) : ''
                    if (err && this.image) {
                        ereror.push(`image size too large`)
                    }
                    Swal.fire({
                        title: 'Register Failed!',
                        text: ereror.join(` & `),
                        icon : 'success',
                        // imageUrl: 'https://loading.io/mod/spinner/lava-lamp/index.svg',
                        // imageWidth: 400,
                        // imageHeight: 200,
                        timer: 7500,
                        imageAlt: 'Custom image',
                        showConfirmButton: false,
                        showCancelButton: false,
                        confirmButtonText: 'نعم',
                        cancelButtonText: 'لا',
                    })
                    console.log(err);
                })
            } else {
                let form = new FormData();
                form.set('name', this.name)
                form.set('email', this.email)
                form.set('password', this.password)
                form.append('image', this.image)

                axios({
                url : '/user/register',
                method : 'POST',
                data : form
                })
                .then(({data})=>{
                    this.name = ''
                    this.password = ''
                    this.image = ''
                    this.$emit('checkForm')
                    Swal.close()
                })
                .catch(err=>{
                    Swal.close()
                    let ereror = []
                    !this.name? ereror.push(`name is required`) : ''
                    !this.email ? ereror.push(`email is required`) : ''
                    !this.password ? ereror.push(`password is required`) : ''
                    !this.image ? ereror.push(`image is required`) : ''
                    if (err && this.image) {
                        ereror.push(`image size too large`)
                    }
                    Swal.fire({
                        title: 'Register Failed!',
                        text: ereror.join(` & `),
                        // imageUrl: 'https://loading.io/mod/spinner/lava-lamp/index.svg',
                        icon : 'success',
                        // imageWidth: 400,
                        // imageHeight: 200,
                        timer: 3500,
                        imageAlt: 'Custom image',
                        showConfirmButton: false,
                        showCancelButton: false,
                        confirmButtonText: 'نعم',
                        cancelButtonText: 'لا',
                    })
                })
            }
        },
        onSignInSuccess (googleUser) {
            Swal.fire({
                title: 'Loading!',
                text: '',
                // imageUrl: '../public/img/loading.gif',
                icon : 'success',
                // imageWidth: 400,
                // imageHeight: 200,
                // timer: 2500,
                imageAlt: 'Custom image',
                showConfirmButton: false,
                showCancelButton: false,
                confirmButtonText: 'نعم',
                cancelButtonText: 'لا',
            })
            const { id_token } = googleUser.getAuthResponse();
            axios({
                url : '/user/google',
                method : 'POST',
                data : { id_token }
            })
            .then(({data})=>{
                console.log(data);
                if (data.token) {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('email', data.user.email)
                    localStorage.setItem('name', data.user.name)
                    localStorage.setItem('profil', data.user.image[0])
                    Swal.close()
                    this.$emit('loginSuccess')
                } else {
                    this.name = data.name
                    this.email = data.email
                    this.image = data.picture
                    this.styleImage = `height: 200px; background: url(${data.picture}) no-repeat center center/cover; background-size: 100%; margin-top: -6px;`
                    this.google = true
                    Swal.close()
                    this.$emit('checkForm')
                }
            })
            .catch(err=>{
                console.log(err);
            })
        },
        onSignInError(error){
            console.log(error);
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
html { 
    height: 100%;
}
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