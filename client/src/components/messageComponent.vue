<template>
    <div>
        <sui-message dismissable>
            <div class="header">{{ header }}</div>
            <div class="content">{{ content }}</div>
        </sui-message>
    </div>
</template>

<script>
    export default {
        name: "messageComponent",
        props: {
            header: String,
            content: String
        },
        methods: {},
    }
</script>

<style media="screen" scoped>

</style>