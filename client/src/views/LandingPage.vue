<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-9 d-flex flex-column">
                <featuredArticle></featuredArticle>
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

export default {
    components:{
        featuredArticle,
        bookmarkCard,
        tag,
        job
    },
    data(){
        return{

        }
    }
}
</script>

<style>

</style>