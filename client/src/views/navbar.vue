<template>
    <nav class="navbar navbar-expand-lg navbar-light p-0" style="background-color: #2A6188;">
        <div v-if="!isLogin" class="d-flex justify-center px-3 py-2 btn" style="background-color: #2A6188; color: white; border: none; cursor:default;">
            <i class="fab fa-wordpress-simple fa-2x"></i>
            <span class="ml-2 mt-1"> WordPress.online </span>
        </div>
        <button v-if="isLogin" type="button" class="btn-navbar d-flex justify-center px-3 py-2">
            <i class="fab fa-wordpress-simple fa-2x"></i>
            <span class="ml-2 mt-1"> My Site </span>
        </button>
        <button v-if="isLogin" type="button" class="btn-navbar d-flex justify-center px-3 py-2">
            <i class="fas fa-newspaper fa-2x"></i>
            <span class="ml-2 mt-1"> Reader </span>
        </button>
        <div class="ml-auto mr-2">
            <button v-if="isLogin" type="button" class="btn btn-light px-4 d-flex" style="color: #2E73B2;">
                <i class="far fa-plus-square mr-2" style="font-size: 25px;"> </i>
                <span style="font-size: 15px; margin-top: 2px;"> Write </span>
            </button>
        </div>
        <button v-if="loginFirst" type="button" class="btn btn-light mr-3 px-4 d-flex Login" style="color: #2E73B2;">
            <i class="fas fa-user mr-2" style="font-size: 25px;"> </i>
            <span style="font-size: 15px; margin-top: 2px;"> Login </span>
        </button>
        <button v-if="registerFirst" type="button" class="btn btn-light px-4 d-flex Register" style="color: #2E73B2;">
            <i class="far fa-user mr-2" style="font-size: 25px;"> </i>
            <span style="font-size: 15px; margin-top: 2px;"> Register </span>
        </button>
        <button v-if="logoutFirst" type="button" onclick="signOut();" class="btn btn-light px-4 d-flex Register" style="color: #2E73B2;">
            <span style="font-size: 15px; margin-top: 2px;"> Logout </span>
            <i class="fas fa-sign-out-alt ml-2" style="font-size: 25px;"> </i>
        </button>
        <button v-if="logoutFirst" type="button" class="btn-navbar py-2 px-3">
            <div style="background: url('../public/img/testing-p.jpg'); background-size: 100% ;height: 30px; width: 30px; border: 2px solid white;" class="rounded-circle"> </div>
        </button>
        <button v-if="logoutFirst" type="button" class="btn-navbar py-2 px-3 mr-3">
            <i class="fas fa-bell py-2" style="transform: rotate(35deg);"></i>
        </button>
    </nav>
</template>

<script>
export default {
    props : [
    ],
    name : 'navbar',
    data() {
        return {
            'isLogin' : false,
            'loginFirst' : true,
            'registerFirst': false,
            'logoutFirst': false
        }
    },
    methods: {
    },
    created() {
    }
}
</script>

<style>

</style>