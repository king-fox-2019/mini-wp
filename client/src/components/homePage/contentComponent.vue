<template lang="html">
    <sui-container text id="contentComponent">
        <div id="remove" @click="dismissContent">
            <i class="remove icon"></i>
        </div>
        <div id="sui-image-container">
            <sui-image :src="data.featured_image" id="sui-image"></sui-image>
        </div>
        <h1 is="sui-header">{{ data.title }}</h1>
        <p v-html="data.content">
            {{ data.content }}
        </p>
    </sui-container>

</template>

<script>
    export default {
        name: "contentComponent",
        props: {
            data: Object
        },
        methods: {
            dismissContent: function () {
                this.$emit("dismiss");
            }
        }
    }
</script>

<style scoped>
    #contentComponent {
        position: absolute;
        top: 10%;
        left: 50%;
        background-color: #fff;
        padding: 25px;
        border: 1px #bdc3c7 solid;
        transform: translate(-50%);
    }

    #sui-image-container {
        width: 100%;
        max-height: 350px;
        overflow: hidden;
    }

    #sui-image{
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>