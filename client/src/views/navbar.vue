<template>
    <nav class="navbar navbar-expand-lg navbar-light p-0" style="background-color: #2A6188;">
        <div v-if="!isLogin" class="d-flex justify-center px-3 py-2 btn" style="background-color: #2A6188; color: white; border: none; cursor:default;">
            <i class="fab fa-wordpress-simple fa-2x"></i>
            <span class="ml-2 mt-1"> WordPress.online </span>
        </div>
        <div v-if="isLogin" >
            <button type="button" @click.prevent="toggle" v-if="!myPage" class="btn-navbar d-flex justify-center px-3 py-2">
                <i class="fab fa-wordpress-simple fa-2x"></i>
                <span class="ml-2 mt-1"> My Site </span>
            </button>
            <button type="button" v-if="myPage" class="btn-navbar-focus d-flex justify-center px-3 py-2">
                <i class="fab fa-wordpress-simple fa-2x"></i>
                <span class="ml-2 mt-1"> My Site </span>
            </button>
        </div>
        <div v-if="isLogin">
            <button v-if="!mainPage" @click.prevent="toggle"  type="button" class="btn-navbar d-flex justify-center px-3 py-2">
                <i class="fas fa-newspaper fa-2x"></i>
                <span class="ml-2 mt-1"> Reader </span>
            </button>
            <button v-if="mainPage"  type="button" class="btn-navbar-focus d-flex justify-center px-3 py-2">
                <i class="fas fa-newspaper fa-2x"></i>
                <span class="ml-2 mt-1"> Reader </span>
            </button>
        </div>
        <div class="ml-auto mr-2">
            <button v-if="isLogin" @click.prevent="writeArticle" type="button" class="btn btn-light px-4 d-flex" style="color: #2E73B2;">
                <i class="far fa-plus-square mr-2" style="font-size: 25px;"> </i>
                <span style="font-size: 15px; margin-top: 2px;"> Write </span>
            </button>
        </div>
        <button v-if="!loginText" @click.prevent="formChecking" type="button" class="btn btn-light mr-3 px-4 d-flex Login" style="color: #2E73B2;">
            <i class="fas fa-user mr-2" style="font-size: 25px;"> </i>
            <span style="font-size: 15px; margin-top: 2px;"> Login </span>
        </button>
        <div v-if="!isLogin">
            <button v-if="loginText" @click.prevent="formChecking" type="button" class="btn mr-3 btn-light px-4 d-flex Register" style="color: #2E73B2;">
                <i class="far fa-user mr-2" style="font-size: 25px;"> </i>
                <span style="font-size: 15px; margin-top: 2px;"> Register </span>
            </button>
        </div>
        <div class="btn-group dropdown">
            <button v-if="isLogin" type="button" data-toggle="dropdown" class="btn-navbar mr-1 py-2 px-3">
                <div :style="profil" class="rounded-circle"> </div>
            </button>
            <div class="dropdown-menu p-0">
                <button v-if="isLogin" type="button" @click.prevent="logout" class="btn btn-light px-4 d-flex Register mr-3" style="color: #2E73B2;">
                    <span style="font-size: 15px; margin-top: 2px;"> Logout </span>
                    <i class="fas fa-sign-out-alt ml-2" style="font-size: 25px;"> </i>
                </button>
            </div>
        </div>
        
        <button v-if="isLogin" type="button" class="btn-navbar py-2 px-3 mr-3">
            <i class="fas fa-bell py-2" style="transform: rotate(35deg);"></i>
        </button>
    </nav>
</template>

<script>
export default {
    props : ['loginText','isLogin','mainPage', 'myPage'],
    name : 'navbar',
    data() {
        return {
            profil : `background: url('${localStorage.getItem('profil')}'); background-size: 100% ;height: 30px; width: 30px; border: 2px solid white;`,
            createButton : true,
        }
    },
    methods: {
        formChecking(){
            this.$emit('checkForm')
        },
        logout(){
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            localStorage.removeItem('profil')
            this.$emit('checkForm', true)
            this.$emit('loginSuccess')
        },
        writeArticle(){
            this.$emit('createArticle')
        },
        toggle(){
            console.log('kesiis');
            
            this.$emit('toggler')
        }
    },
    created() {
    }
}
</script>

<style>
.btn-navbar{
    border: none;
    background-color: #2A6188;
    border: none;
    color: white;
    transition: 0.5s;
}
.btn-navbar:hover {
    background-color: rgb(25, 72, 105);
    border: none;
}
.btn-navbar:focus {
    outline: none;
    border: none;
}

.btn-navbar-focus{
    border: none;
    background-color: #102C40;
    border: none;
    color: white;
    transition: 0.5s;
}
.btn-navbar-focus:focus {
    outline: none;
    border: none;
}
</style>