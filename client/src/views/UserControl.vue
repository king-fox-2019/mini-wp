<template>
    <div>
        <formsignin v-if="showLogin"></formsignin>
        <formsignup v-if="showRegister"></formsignup>
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
    computed:{
    }
}
</script>

<style>

</style>