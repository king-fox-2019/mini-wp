<template>
    <div>
        <sui-menu color='blue' id="mainNavBar">
            <sui-menu-item active link name="Home">Mini WP</sui-menu-item>
            <sui-menu-item name="username">
                <i class="user icon"></i>
                {{ name }}
            </sui-menu-item>
            <sui-menu-item name="signOut" @click="signOut">
                <i class="lock icon"></i>
                <a>Sign Out</a>
            </sui-menu-item>
        </sui-menu>
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
                // let auth2 = gapi.auth2.getAuthInstance();
                // alert(auth2);
                //
                // auth2.signOut().then(function () {
                //     console.log('User signed out.');
                // });

                localStorage.clear();
                location.reload();
            }
        }
    }
</script>

<style scoped>
    #mainNavBar {
        background-color: #FFF;
    }
</style>