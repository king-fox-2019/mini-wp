<template>
  <div>
      <div id="sidebar-container" class="sidebar-expanded d-none d-md-block">
            <ul class="list-group">
              <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                <b-button @click="logout" size="sm" class="my-2 my-sm-0" type="submit"><i class="fas fa-sign-out-alt"></i> Logout</b-button>
              </li>
            </ul>
            <a href="#submenu1" data-toggle="collapse" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-dashboard fa-fw mr-3"></span>
                    <span class="menu-collapsed">Dashboard</span>
                    <span class="fas fa-caret-down ml-auto"></span>
                </div>
            </a>
            <div id='submenu1' class="collapse sidebar-submenu">
                <button @click="newArticle" class="list-group-item list-group-item-action bg-dark text-white">
                    <span class="menu-collapsed">New article</span>
                </button>
                <button @click="myArticle" class="list-group-item list-group-item-action bg-dark text-white">
                    <span class="menu-collapsed">articles</span>
                </button>
            </div>

            <a href="#submenu2" data-toggle="collapse" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-user fa-fw mr-3"></span>
                    <span class="menu-collapsed">Profile</span>
                    <span class="fas fa-caret-down ml-auto"></span>
                </div>
            </a>
            <div id='submenu2' class="collapse sidebar-submenu">
                <a href="#" class="list-group-item list-group-item-action bg-dark text-white">
                    <span class="menu-collapsed">Settings</span>
                </a>
                <a href="#" class="list-group-item list-group-item-action bg-dark text-white">
                    <span class="menu-collapsed">Password</span>
                </a>
            </div>             
    </div> 
  </div>
</template>

<script>
export default {
  name: "navbarZ",
  methods: {
    logout(){
      localStorage.clear()
      this.$emit('set-login',false)
    },
    myArticle(){
        this.$emit('set-status', 'myArticle')
    },
    newArticle(){
        this.$emit('set-status', 'newArticle')
    }
  }
}
</script>

<style>
</style>