<template>
  <div>
    <SideNav></SideNav>
    <router-view id="main-dashboard"></router-view>
  </div>
</template>

<script>
import SideNav from '@/components/SideNav'

export default {
  components: {
    SideNav
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

@media (min-width: map-get($grid-breakpoints, lg)) {
  #main-dashboard {
    margin-left: 13rem;
    padding-top: 4.5rem;
    height: 100%;
    width: calc(100vw - 13rem);
  }
}

#main-dashboard {
  padding-top: 4.5rem;
  height: 100%;
}
</style>
