<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-9 d-flex flex-column">
                <featuredArticle v-if="!showDetailArticle" :publish-article="publishArticle" :isLogin="isLogin"></featuredArticle>
                <detailArticle v-if="showDetailArticle"></detailArticle>
            </div>
            <div class="col-3">
                <bookmarkCard></bookmarkCard>
                <tag class="mt-4"></tag>
                <job class="mt-4"></job>
            </div>
        </div>
    </div>
</template>

<script>

import featuredArticle from '../components/FeaturedArticle'
import bookmarkCard from '../components/Bookmark'
import tag from '../components/Tags'
import job from '../components/Jobs'
import detailArticle from '../components/DetailArticle'
import articleServer from '../../api/article'
import Alert from '../public/Alert'

export default {
    components:{
        featuredArticle,
        bookmarkCard,
        tag,
        job,
        detailArticle
    },
    props: ['isLogin'],
    data(){
        return{
            showDetailArticle: false,
            publishArticle: []
        }
    },
    methods:{
        fethcingArticlePublished(){
            articleServer({
                url: '/publish',
                method: 'GET',
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.publishArticle = data.reverse()
            })
            .catch(err => {
                Alert.Swal.fire({
                    icon: 'error',
                    title: 'Fetching Data',
                    text: `${err.response.data.message}`
                })
            })
        }
    },
    created(){
        this.fethcingArticlePublished()
    }
}
</script>

<style>

</style>