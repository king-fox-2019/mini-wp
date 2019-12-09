<template>
    <div>
        <navBar @logout="logout"></navBar>
        <div class="container-fluid">
            <div class="row">
                <sideNav @viewNew="changeView"></sideNav>
                <div class="col-sm-8 col-md-10">
                    <articleList v-if="views"></articleList>
                    <newArticleForm v-if="!views"></newArticleForm>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import navBar from '../components/navBar'
import sideNav from '../components/sideNav'
import articleList from '../views/articleList'
import newArticleForm from '../components/newArticleForm'

export default {
    data() {
        return {
            views: true
        }
    },
    methods: {
        logout() {
            this.$emit('authorLogout', false)
        },
        changeView(v) {
            this.views = v
        }
    },
    components: {
        navBar,
        sideNav,
        articleList,
        newArticleForm
    }
}
</script>

<style>

</style>