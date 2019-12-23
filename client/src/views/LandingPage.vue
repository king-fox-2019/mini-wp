<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-9 d-flex flex-column">
                <featuredArticle v-if="!showDetail && !showDraft"
                :publishArticle="publisharticle"
                :isLogin="isLogin"
                @current-article="setCurrentArticle"
                @fetch-bookmark="fetchBookmark">
                </featuredArticle>
                <draftArticle 
                :draftArticle="draftarticle" 
                v-if="showDraft"
                @edit-article="editDraftArticle"
                @go-draft="goDraft">
                </draftArticle>
                <detailArticle 
                v-if="showDetail"
                :detailArticle="currentArticle"
                @edit-article="editArticle"
                @go-homepage="goHomepage">
                </detailArticle>
            </div>
            <div class="col-3">
                <bookmarkCard :bookmarkdetail="bookmark"></bookmarkCard>
                <tag class="mt-4" 
                :tags="tags"
                @search-article="searchArticle">
                </tag>
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
    props: ['isLogin', 'publisharticle','draftarticle', 'showDraft', 'showDetail', 'bookmark', 'tags'],
    data(){
        return{
            currentArticle: {}
        }
    },
    methods:{
        setCurrentArticle(val){
            this.currentArticle = val
            this.$emit('detail-article')
        },
        editArticle(id){
            this.$emit('edit-article', id)
        },
        goHomepage(){
            this.$emit('go-homepage')
        },
        editDraftArticle(id){
            this.$emit('edit-article', id)
        },
        goDraft(id){
            this.$emit('go-draft', id)
        },
        searchArticle(tag){
            this.$emit('search', tag)
        },
        fetchBookmark(){
            this.$emit('fetch-bookmark')
        }
    },
    created(){
    }
}
</script>

<style>

</style>