<template>
    <div>
        <navbar></navbar>
        <!-- <landingPage></landingPage> -->
        <!-- <usercontrol></usercontrol> -->
        <createArticle></createArticle>
    </div>
</template>

<script>

// import landingPage from './views/LandingPage'
import navbar from './components/Navbar'
// import usercontrol from './views/UserControl'
import createArticle from './views/CreateArticle'

export default {
    components:{
        // landingPage,
        navbar,
        // usercontrol,
        createArticle
    }
}
</script>

<style>

</style>