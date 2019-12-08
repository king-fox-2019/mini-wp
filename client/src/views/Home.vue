<template>
  <div class="contained">
    <p>DISCOVER</p>
    <p>Find book picks, reading tips, and activities for your little ones</p>
    <Topics></Topics>
    <router-view></router-view>
    <!-- <TopArticle></TopArticle> -->
    <!-- <Articles :articles="articles"></Articles> -->

    <!-- styling discover banner  -->

    <!-- <Tags></Tags>
    <TopArticles></TopArticles> -->
  </div>
</template>

<script>
import axios from '../helpers/axios'
import Topics from '../components/Topics'

export default {
  name: 'Home',
  data: function() {
    return {
    }
  },
  components : {
    Topics
  }
}
</script>

<style>

</style>