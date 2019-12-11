<template>
    <div id="mainNavBar" class="ui inverted segment">
        <div class="ui inverted main menu">
            <sui-menu-item name="username">
                <i class="user icon"></i>
                {{ name }}
            </sui-menu-item>
            <sui-menu-item active link name="signOut" @click="signOut">
                <i class="lock icon"></i>
                Sign Out
            </sui-menu-item>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mainNavbar",
        props: {
            name: String
        },
        methods: {
            signOut: function () {
                this.$gAuth.signOut()
                    .then(() => {
                        // things to do when sign-out succeeds
                        localStorage.clear();
                        location.reload();
                    })
                    .catch(error  => {
                        // things to do when sign-out fails
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>
    .ui {
        background-color: #3498db !important;
    }
</style>