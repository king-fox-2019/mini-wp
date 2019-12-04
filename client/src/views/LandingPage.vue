<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-9">
                <featuredArticle></featuredArticle>
            </div>
            <div class="col-3">
                <rightSide></rightSide>
            </div>
        </div>
    </div>
</template>

<script>

import featuredArticle from '../components/FeaturedArticle'
import rightSide from '../components/RightSide'

export default {
    components:{
        featuredArticle,
        rightSide
    },
    data(){
        return{

        }
    }
}
</script>

<style>

</style>