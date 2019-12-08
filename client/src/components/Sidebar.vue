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
    <b-dropdown aria-role="list">
      <b-button outlined type="is-primary" slot="trigger">
        <template>
          <b-icon icon="account-multiple"></b-icon>
          <span><i class="fas fa-palette"></i> Theme</span>
        </template>
        <b-icon icon="menu-down"></b-icon>
      </b-button>

      <b-dropdown-item :value="true" aria-role="listitem">
        <div class="media">
          <b-icon class="media-left" icon="earth"></b-icon>
          <div @click="toDark()" class="media-content">
            <h3> <i class="fas fa-moon"></i> Dark Theme</h3>
          </div>
        </div>
      </b-dropdown-item>

      <b-dropdown-item :value="true" aria-role="listitem">
        <div class="media">
          <b-icon class="media-left" icon="earth"></b-icon>
          <div @click="toLight()" class="media-content">
            <h3> <i class="far fa-sun"></i> Light Theme</h3>
          </div>
        </div>
      </b-dropdown-item>
    </b-dropdown>
    <hr />
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {};
  },
  methods: {
    setPage(page) {
      this.$emit("switch-page", page);
    },
    toDark() {
      this.$emit('change-theme', true, false)
    },
    toLight() {
      this.$emit('change-theme', false, true)
    },
  }
};
</script>

<style>
</style>