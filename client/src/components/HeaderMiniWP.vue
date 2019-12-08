<template>
  <div>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal text-light">Mini WP</h5>
      <div v-if="isLogin" class="d-flex align-items-center">
        <button type="button" class="btn btn-light btn-sm mr-2">
          <span class="fas fa-plus"></span> New post
        </button>
        <div class="dropdown">
          <a class="text-light dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="fas fa-user"> {{ username }} </span>
          </a>

          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderMiniWP',
  data: function () {
    return {
      username: 'Development'
    }
  },
  props: ['isLogin']
}
</script>

<style>

</style>
