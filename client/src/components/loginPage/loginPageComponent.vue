<template lang="html">
    <div class="sui placeholder segment">
        <div class="ui vertical divider">Or</div>
        <div class="ui two column stackable center aligned grid">
            <div class="middle aligned row">
                <div class="column">
                    <registration-form-component></registration-form-component>
                </div>
                <div class="column">
                    <login-form-component></login-form-component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import loginFormComponent from "./loginFormComponent";
    import registrationFormComponent from "./registrationFormComponent";

    export default {
        name: "loginPageComponent",
        components: {
            loginFormComponent,
            registrationFormComponent
        }
    }
</script>

<style scoped>
    .form {
        padding: 50px 100px 50px 100px;
        text-align: left;
    }
</style>