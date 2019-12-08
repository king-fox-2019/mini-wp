<template>
    <div>
        <login-page-component v-if="!isLogin"></login-page-component>
        <home-page-component v-if="isLogin"></home-page-component>
    </div>
</template>

<script>
    import loginPageComponent from "./components/loginPage/loginPageComponent";
    import homePageComponent from "./components/homePage/homePageComponent";

    export default {
        name: "app",
        data(){
            return {
                isLogin: false
            }
        },
        components: {
            loginPageComponent,
            homePageComponent
        },
        created() {
            if (localStorage.token){
                this.isLogin = true;
            }
        }
    }
</script>

<style scoped>
</style>