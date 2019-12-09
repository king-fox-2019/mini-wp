<template>
    <nav>
        <div class="left-nav">
            <i class="fab fa-wordpress"></i>
            <span>Hi, {{ username }}</span>
        </div>
        <div class="right-nav">
            <!-- <button id="shortcutNewArticle" @click.prevent="showNewArticle"><i class="far fa-edit"></i>
                Write</button> -->
            <b-button variant="outline-primary" @click="logout">Logout</b-button>
            <!-- <img src="https://randomuser.me/api/portraits/women/60.jpg" alt="user potraits" class="user-avatar"> -->
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            username: ''
        }
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$emit('logout')
        }
    },
    created() {
        this.username = localStorage.getItem('author')
    }
}
</script>

<style scoped>
    nav {
    background-color: #2b2b28;
    height: 4rem;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    color: #f8f8f8;
    }

    .left-nav {
        display: flex;
        align-items: center;
    }

    .left-nav i {
        color: #f8f8f8;
        font-size: 2rem;
        margin-right: 1rem;
        cursor: pointer;
    }

    .right-nav {
        margin-left: auto;
    }

    .right-nav button {
        border: none;
        height: 2rem;
        background-color: #f8f8f8;
        color: #2b2b28;
        margin-right: 1rem;
        border-radius: 4px;
        padding: 0 0.5rem;
    }

    .right-nav button:hover {
        background-color: #e3b04b;
        color: #fff;
        transition: 0.4s all;
    }

    .right-nav button:hover>i {
        color: #fff;
        transition: 0.4s all;
    }

    .right-nav i {
        color: #2b2b28; 
    }

    .user-avatar {
        height: 2.1rem;
        border-radius: 100%;
        cursor: pointer;
    }
</style>