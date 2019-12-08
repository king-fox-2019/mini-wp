<template>
  <div class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="navbar-brand mr-auto" @click.prevent="show('list')">MINI WORDPRESS</div>
    <ul class="navbar-nav">
        <li class="nav-item">
            <a @click.prevent="show('profile')">Profile</a>
        </li>
        <li class="nav-item">
            <a @click.prevent="show('add')">Add Article</a>
        </li>
        <li class="nav-item">
            <a href="" @click.prevent="logout">Logout</a>
        </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name:"navbar",
  methods:{
    show:function(param){
      this.$parent.toShow(param)
    },
    logout:function(){
      localStorage.removeItem('access_token')
      this.$parent.logout()
    }
  }
};
</script>

<style>
</style>