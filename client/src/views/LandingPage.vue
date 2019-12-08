<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-9 d-flex flex-column">
                <featuredArticle v-if="!showDetailArticle && !showDraft"
                :publishArticle="publisharticle"
                :isLogin="isLogin">
                </featuredArticle>
                <draftArticle 
                :draftArticle="draftarticle" 
                v-if="showDraft">
                </draftArticle>
                <detailArticle 
                v-if="showDetailArticle">
                </detailArticle>
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
import draftArticle from '../components/DraftArticle'

export default {
    components:{
        featuredArticle,
        bookmarkCard,
        tag,
        job,
        detailArticle,
        draftArticle
    },
    props: ['isLogin', 'publisharticle','draftarticle', 'showDraft'],
    data(){
        return{
            showDetailArticle: false
        }
    },
    methods:{
    },
    created(){
    }
}
</script>

<style>

</style>