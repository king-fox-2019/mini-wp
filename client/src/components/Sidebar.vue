<template>
  <div id="sideBar" class="col-md-4 p-0">
    <a class="list-group-item" href="#" @click="setPage('public')">
      <i class="fas fa-align-left pr-3"></i> Blog Posts
    </a>
    <hr />
    <a class="list-group-item" href="#" @click="setPage('private')">
      <i class="fas fa-desktop pr-3"></i> Your Site
    </a>
    <hr />
  </div>
</template>

<script>
export default {
  name: "SideBar",
  methods: {
    setPage(page) {
      this.$emit('switch-page', page)
    }
  }
};
</script>

<style>
</style>