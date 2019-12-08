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
        data() {
            return {
                header: this.props.header,
                content: this.props.content
            };
        },
        methods: {},
    }
</script>

<style media="screen" scoped>

</style>