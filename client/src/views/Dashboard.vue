<template>
  <div>
    <SideNav></SideNav>
    <router-view id="main-dashboard"></router-view>
  </div>
</template>

<script>
import SideNav from '@/components/SideNav'
import checkSession from '@/utils/checkSession'

export default {
  components: {
    SideNav
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('access_token')) {
      checkSession()
        .then(() => {
          next()
        })
        .catch(() => {
          localStorage.clear()
          next('/')
        })
    } else next('/')
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
