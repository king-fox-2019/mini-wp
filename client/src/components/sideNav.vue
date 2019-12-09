<template>
  <div class="col-sm-4 col-md-2 side-nav">
        <ul>
            <li><a href="#" id="linkNewArticle" @click.prevent="viewNew(false)"><i
                        class="far fa-edit"></i>New Article</a></li>
            <li><a href="#" id="linkListArticle" @click.prevent="viewNew(true)"><i
                        class="fas fa-align-justify"></i>Blog Posts</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        viewNew(value) {
            this.$emit('viewNew', value)
        }
    }
}
</script>

<style scoped>
    .side-nav {
        margin: 0;
        padding: 0;
        background-color: #fff;
        min-height: calc(100vh - 4rem);
        box-shadow: 2px 0px 6px rgba(0, 0, 0, 0.2);
        /* position: fixed; */
    }

    .side-nav ul {
        width: 100%;
    }

    .side-nav li {
        width: 100%;
    }

    .side-nav li i {
        margin: 0 1rem;
    }

    .side-nav li a {
        padding: 1rem 0;
        display: block;
        color: #2b2b28;
    }

    .side-nav li a:hover {
        background-color: #e3b04b;
        transition: 0.4s background-color;
        text-decoration: none;
    }
</style>