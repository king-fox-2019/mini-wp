<template>
    <div>
        <sui-tab :menu="{ vertical: true, fluid: true, tabular: true }">
            <sui-tab-pane title="List Article">
                <sui-card-group :items-per-row="3">
                    <card-article-component
                            v-for="article in articles"
                            :key="article._id"
                            :article="article"
                            @clicked="listOfArticle">
                    </card-article-component>
                </sui-card-group>
            </sui-tab-pane>
            <sui-tab-pane title="New Article">
                <input-article-component @clicked="listOfArticle"></input-article-component>
            </sui-tab-pane>
        </sui-tab>
    </div>
</template>

<script>
    import cardArticleComponent from "./cardArticleComponent";
    import {instance} from "../../../config/axiosConfig";
    import inputArticleComponent from "./inputArticleComponent";

    export default {
        name: "sideBarComponent",
        data() {
            return {
                articles: []
            }
        },
        methods: {
            listOfArticle: function () {
                instance({
                    method: 'get',
                    url: '/articles',
                    headers: {
                        token: localStorage.token
                    }
                }).then(({data}) => {
                    console.log(data);
                    this.articles = data.reverse();
                }).catch(err => {
                    console.log(err.response.data.message)
                })
            }
        },
        mounted() {
            this.listOfArticle();
        },
        components: {
            cardArticleComponent,
            inputArticleComponent
        },
    }
</script>

<style scoped>

</style>