<template>
  <div
    class="justify-content-start bg-info d-none d-lg-flex"
    id="side-nav-wrapper"
  >
    <b-nav vertical class="d-flex" id="side-nav">
      <b-nav-item
        link-classes="btn btn-primary w-75 mx-auto my-0 p-2"
        active-class="active"
        >New Post</b-nav-item
      >
      <b-nav-item link-classes="text-primary" active-class="active"
        >Articles</b-nav-item
      >
      <b-nav-item link-classes="text-primary" active-class="active"
        >Posted</b-nav-item
      >
      <b-nav-item link-classes="text-primary" active-class="active"
        >Draft</b-nav-item
      >
      <b-nav-item link-classes="text-primary" active-class="active"
        >Trash</b-nav-item
      >
    </b-nav>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

#side-nav-wrapper {
  position: fixed;
  height: 100%;
  width: 13rem;
}
#side-nav {
  margin-top: 5rem;
  width: 100%;

  .btn:hover {
    background-color: $primary - #111;
  }

  a:hover {
    background-color: rgba($secondary, 0.6);
  }
}
</style>
