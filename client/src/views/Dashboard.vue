<template>
  <div>
    <SideNav></SideNav>
    <router-view class="float-right" id="main"></router-view>
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
#main {
  width: calc(100vw - 13rem);
}
</style>
