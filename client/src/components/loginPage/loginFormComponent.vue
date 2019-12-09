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
        <div>
            <button type="submit" class="ui blue labeled icon button" >
                Sign In
                <i class="lock icon"></i>
            </button>
            <!-- Google signin -->
            <g-signin-button class="ui red labeled icon button"
                             :params="googleSignInParams"
                             @success="onSignInSuccess"
                             @error="onSignInError">
                Sign In
                <i class="google icon"></i>
            </g-signin-button>
            <p></p>
           <!-- end google signin -->
        </div>

    </form>

</template>

<script>
    import messageComponent from "../messageComponent";
    import {instance} from "../../../config/axiosConfig";

    export default {
        name: "loginFormComponent",
        components: {
            messageComponent,
        },
        data() {
            return {
                email: null,
                password: null,
                header: null,
                content: null,
                googleSignInParams: {
                    client_id: '1077663190419-fkbutpat7sloejjac79gs8tnfa1bmi3k.apps.googleusercontent.com'
                }
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
            },
            onSignInSuccess: function (googleUser) {
                let profile = googleUser.getBasicProfile();
                let email = profile.getEmail();

                instance({
                    method: 'post',
                    url: `authors/login/oauth/${email}`
                }).then(({data}) => {
                    console.log(data);
                    if (data) {
                        this.header = "Sign In Success";
                        this.content = data.message;
                        localStorage.token = data.token;
                        location.reload();
                    }
                }).catch(err => {
                    this.header = "Sign In Error";
                    this.content = err.response.data.message;
                })

                // let userName = email.split("@")[0];
                // let id_token = googleUser.getAuthResponse().id_token;
                // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                // console.log('Name: ' + profile.getName());
                // console.log('Image URL: ' + profile.getImageUrl());
            },
            onSignInError(error) {
                // `error` contains any error occurred.
                this.header = "Google Sign In Error";
                this.content = error.error;
            }
        }
    }
</script>

<style scoped>
    .button {
        display: inline-block;
    }
</style>