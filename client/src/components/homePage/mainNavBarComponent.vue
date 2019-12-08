<template>
    <div>
        <sui-menu color='blue' id="mainNavBar">
            <sui-menu-item active link name="Home">Mini WP</sui-menu-item>
            <sui-menu-item name="username">
                <i class="user icon"></i>
                {{ name }}
            </sui-menu-item>
            <sui-menu-item name="logout" @click="logout">
                <i class="lock icon"></i>
                Log Out
            </sui-menu-item>
        </sui-menu>
    </div>
</template>

<script>
    export default {
        name: "mainNavbar",
        props:{
            name: String
        },
        methods: {
            logout: function () {
                localStorage.clear();
                location.reload();
            }
        }
    }
</script>

<style scoped>
    #mainNavBar{
        background-color: #FFF;
    }
</style>