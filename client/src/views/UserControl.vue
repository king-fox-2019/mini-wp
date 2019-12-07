<template>
    <div>
        <formsignin v-if="showLogin" @go-mainpage="changeToMainPage" @user-login="userLoginInfo"></formsignin>
        <formsignup v-if="showRegister" @show-login="changeToLogin"></formsignup>
    </div>
</template>

<script>

import formsignin from '../components/SigninForm'
import formsignup from '../components/SignupForm'

export default {
    components:{
        formsignin,
        formsignup
    },
    props: ['showRegister', 'showLogin'],
    data(){
        return {
        }
    },
    methods:{
        changeToLogin(){
            this.$emit('to-login')
        },
        changeToMainPage(){
            this.$emit('to-mainpage')
        },
        userLoginInfo(val){
            this.$emit('user-login', val)
        }
    },
    computed:{
    }
}
</script>

<style>

</style>