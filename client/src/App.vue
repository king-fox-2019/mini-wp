<template>
  <div>
      <navbar></navbar>
      <main-page></main-page>
  </div>
</template>

<script>
import navbar from './components/navbar'
import mainPage from './views/main-page'

export default {
  components: {
      navbar,
      mainPage
  }
};
</script>

<style>
</style>