<template>
    <div>
        <transition name="fade">
            <sui-message id="messenger" dismissable @dismiss="dismissHandler" v-if="visible">
                <div class="header">{{ header }}</div>
                <div class="content">{{ content }}</div>
            </sui-message>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "messageComponent",
        props: {
            header: String,
            content: String,
            visible: Boolean
        },
        methods: {
            dismissHandler() {
                this.visible = Boolean;
            }
        }
    }
</script>

<style media="screen" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    #messenger {
        margin: 5px 0 5px 0;
    }
</style>