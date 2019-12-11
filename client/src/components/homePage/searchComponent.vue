<template lang="html">
    <form class="ui" @submit.prevent="search">
        <sui-input
                placeholder="Search and press enter..."
                icon="search" size="50"
                v-model="searchValue">
        </sui-input>
    </form>
</template>

<script>
    import {instance} from "../../../config/axiosConfig";

    export default {
        name: "searchComponent",
        data() {
            return {
                searchValue: null
            }
        },
        methods: {
            search: function () {
                instance({
                    method: "get",
                    url: `/articles/${this.searchValue}`,
                    headers: {
                        token: localStorage.token
                    }
                }).then(({data}) => {
                    console.log(data);
                    if (data.length > 0) {
                        this.$emit('search', data);
                    } else {
                        this.$emit('search', []);
                    }
                }).catch(err => {
                    console.log(err.response)
                    this.$emit('search', '')
                })
            }
        }
    }
</script>

<style scoped>
    .ui {
        margin: 0 10px 5px 0;
    }
</style>