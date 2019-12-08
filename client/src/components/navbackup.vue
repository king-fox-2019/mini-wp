<template>
  <div v-if="userLogin" id="sidebar" :class="{menuDisplayed: sidebarOpen}">
    <div id="sidebar-wrapper">
      <ul class="sidebar-nav">
        <div id="navbar-user">
          <div class="d-flex flex-column">
            <li @click="slidingDashboard">
              <a href="#">
                <i class="material-icons mr-2">close</i>Close
              </a>
            </li>
            <li>
              <a href="#">
                <i class="material-icons mr-2">home</i>Home
              </a>
            </li>
            <li>
              <a href="#">
                <i class="material-icons mr-2">account_circle</i>Account
              </a>
            </li>
            <li>
              <a href="#">
                <i class="material-icons mr-2">note_add</i>Articles
              </a>
            </li>
          </div>
          <!-- <div class="fixed-bottom">
                            <li><a href="#"><i class="material-icons mr-2">exit_to_app</i>Logout</a></li>
          </div>-->
          <!-- <li @click="slidingDashboard"><a href="#"><i class="material-icons mr-2">close</i>Close</a></li>
                        <li><a href="#"><i class="material-icons mr-2">home</i>Home</a></li>
                        <li><a href="#"><i class="material-icons mr-2">account_circle</i>Account</a></li>
                        <li><a href="#"><i class="material-icons mr-2">note_add</i>Articles</a></li>
          <li><a href="#"><i class="material-icons mr-2">exit_to_app</i>Logout</a></li>-->
        </div>
      </ul>
    </div>
    <div
      id="button-sidebar"
      v-if="!sidebarOpen"
      class="page-content-wrapper d-flex justify-content-between"
      style="width: 20px; "
    >
      <div class="d-flex flex-column" style="max-height: 80%;">
        <a @click="slidingDashboard" href="#" class="btn" id="menu-toggle">
          <span class="glyphicon glyphicon-menu-hamburger">
            <i class="material-icons" id="icon-menu">menu</i>
          </span>
        </a>
        <a href="#" class="btn" id="menu-toggle">
          <span class="glyphicon glyphicon-menu-hamburger">
            <i class="material-icons" id="icon-menu">home</i>
          </span>
        </a>
        <a href="#" class="btn" id="menu-toggle">
          <span class="glyphicon glyphicon-menu-hamburger">
            <i class="material-icons" id="icon-menu">account_circle</i>
          </span>
        </a>
        <a href="#" class="btn" id="menu-toggle">
          <span class="glyphicon glyphicon-menu-hamburger">
            <i class="material-icons" id="icon-menu">note_add</i>
          </span>
        </a>
      </div>
      <div class="fixed-bottom" style="max-height: 20%;">
        <a @click="slidingDashboard" href="#" class="btn" id="menu-toggle">
          <span class="glyphicon glyphicon-menu-hamburger">
            <i class="material-icons" id="icon-menu">exit_to_app</i>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>