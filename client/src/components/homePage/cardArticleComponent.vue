<template lang="html">
    <sui-card id="cardArticle">
        <a>
            <sui-image :src="article.featured_image"/>
        </a>
        <sui-card-content>
            <small id="created_at">{{createdDate}}</small>
            <p></p>
            <sui-card-header><a>{{article.title}}</a></sui-card-header>
            <sui-card-meta>
                <a>{{article.category}}</a>
            </sui-card-meta>
        </sui-card-content>
    </sui-card>
</template>

<script>
    export default {
        name: "cardArticleComponent",
        props: {
            article: Object
        },
        computed: {
            createdDate: function () {
                let date = new Date(this.article.created_at);
                return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} -
                ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            }
        }
    }
</script>

<style scoped>
    #cardArticle {
        width: 225px;
    }

    #created_at {
        color: gray;
    }
</style>