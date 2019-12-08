<template>
    <form class="ui form login" @submit.prevent="login">
        <p>
            <message-component :header="header" :content="content">
            </message-component>
        </p>
        <h1>Mini WP</h1>
        <p></p>
        <div class="field">
            <label>Email</label>
            <div class="ui left icon input">
                <input type="email" placeholder="Email" v-model="email" required>
                <i class="mail icon"></i>
            </div>
        </div>
        <div class="field">
            <label>Password</label>
            <div class="ui left icon input">
                <input type="password" placeholder="Password" v-model="password" required>
                <i class="lock icon"></i>
            </div>
        </div>
        <button type="submit" class="ui blue labeled icon button">
            Sign In
            <i class="lock icon"></i>
        </button>
    </form>

</template>

<script>
    import messageComponent from "../messageComponent";
    import {instance} from "../../../config/axiosConfig";

    export default {
        name: "loginFormComponent",
        components: {
            messageComponent
        },
        data() {
            return {
                email: null,
                password: null,
                header: null,
                content: null
            }
        },
        methods: {
            login: function () {
                instance({
                    method: 'post',
                    url: '/authors/login',
                    data: {
                        email: this.email,
                        password: this.password
                    }
                }).then(({data}) => {
                    this.header = "Sign In Success";
                    this.content = data.message;
                    localStorage.token = data.token;
                    location.reload();
                }).catch(err => {
                    this.header = "Sign In Error";
                    this.content = err.response.data.message;
                })
            }
        }
    }
</script>

<style scoped>

</style>