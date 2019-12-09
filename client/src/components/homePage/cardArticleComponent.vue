<template lang="html">
    <sui-card id="cardArticle">
        <div id="remove" @click="remove">
            <i class="remove icon"></i>
        </div>
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
    import {instance} from "../../../config/axiosConfig";

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
        },
        methods: {
            remove: function () {
                instance({
                    method: 'delete',
                    url: `/articles/${this.article._id}`,
                    headers: {
                        token: localStorage.token
                    }
                }).then(({data}) => {
                    console.log(data.message);
                    this.$emit('clicked')
                }).catch(err => {
                    console.log(err);
                })
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

    #remove {
        color: gray;
        margin: 10px
    }
</style>