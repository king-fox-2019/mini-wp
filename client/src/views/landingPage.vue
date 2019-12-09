<template>
    <div class="landing-wrapper">
        <loginForm @changeLogin="authorLogin" @login="changeForm" v-if="login"></loginForm>
        <registerForm @login="changeForm" v-if="!login"></registerForm>
    </div>
</template>

<script>
import loginForm from '../components/loginForm'
import registerForm from '../components/registerForm'

export default {
    data() {
        return {
            login: true
        }
    },
    methods: {
        changeForm(value) {
            this.login = value
        },
        authorLogin(value) {
            this.$emit('authorLogin', value)
        }
    },
    components: {
        loginForm,
        registerForm
    }
}
</script>

<style scoped>
    .landing-wrapper {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: radial-gradient( circle farthest-corner at top,  rgba(195,67,129,1) 20%, rgba(90,43,186,1) 83.4% );
    }
</style>