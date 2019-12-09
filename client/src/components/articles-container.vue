<template>
  <div>
    <!-- if no articles -->
    <div class="jumbotron jumbotron-fluid" v-if="articles.length === 0">
      <div class="container text-center" style="min-height: 69vh;">
        <h1 class="display-4">You didn't have any articles yet.</h1>
        <p class="lead">
          Lets make a new one
          <button type="button" class="btn btn-light btn-sm">
            <span class="fas fa-plus"></span> New post
          </button>
        </p>
      </div>
    </div>

    <!-- else -->
    <div class="album py-5 bg-light" style="min-height: 86vh;" v-else>
      <div class="jumbotron jumbotron-fluid">
        <h1 class="display-4">Will be a list of articles</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articles-container',
  props: ['articles']
}
</script>

<style>

</style>
