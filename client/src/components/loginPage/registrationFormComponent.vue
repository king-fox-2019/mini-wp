<template>
    <form class="ui form" @submit.prevent="registration">
        <p>
            <message-component :header="header" :content="content" :visible="visible"></message-component>
        </p>
        <h1>Registration</h1>
        <p></p>
        <div class="field">
            <label>Full Name</label>
            <div class="ui left icon input">
                <input type="text" placeholder="Full Name" v-model="name" required>
                <i class="user icon"></i>
            </div>
        </div>
        <div class="field">
            <label>Title</label>
            <div class="ui left icon input">
                <input type="text" placeholder="Title" v-model="title">
                <i class="user icon"></i>
            </div>
        </div>
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
        <button type="submit" class="ui black labeled icon button">
            Sign Up
            <i class="user icon"></i>
        </button>
    </form>
</template>

<script>
    import messageComponent from "../messageComponent";
    import {instance} from "../../../config/axiosConfig";

    export default {
        name: "registrationForm",
        data() {
            return{
                header: null,
                content: null,
                name: null,
                title: null,
                email: null,
                password: null,
                visible: false
            }
        },
        components: {
            messageComponent
        },
        methods: {
            registration: function(){
                instance({
                    method: 'post',
                    url: '/authors',
                    data: {
                        name: this.name,
                        title: this.title,
                        email: this.email,
                        password: this.password
                    }
                }).then(({data}) => {
                    console.log(data)
                    this.header = "Sign Up Success";
                    this.content = data.message;
                    localStorage.token = data.token;
                    location.reload();
                }).catch(err => {
                    console.log(err);
                    this.header = "Sign Up Error";
                    this.content = err.response.data.message;
                });
                this.visible = true
            }
        }

    }
</script>

<style scoped>

</style>