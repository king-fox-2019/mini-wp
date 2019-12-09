<template>
  <div>
    <div class="p-2 flex-shrink-1 bd-highlight" id="navbar">
      <div
        class="d-flex align-content-between flex-wrap bd-highlight"
        style="justify-content: center"
      >
        <a
          :class="{ active: activePage == 'read-all-article-page' }"
          @click="changePage('read-all-article-page')"
          class="btn navbar-btn"
          role="button"
        >
          <i class="fas fa-home" id="icon"></i>
        </a>
        <a
          :class="{ active: activePage == 'create-article-page' }"
          @click="changePage('create-article-page')"
          class="btn navbar-btn"
          role="button"
        >
          <i class="fas fa-pencil-alt" id="icon"></i>
        </a>
        <a class="btn navbar-btn active disabled" role="button">
          <i class="fab fa-wordpress" id="icon-mini"></i>
        </a>
        <a
          :class="{ active: activePage == 'read-article-page' }"
          @click="changePage('read-article-page')"
          class="btn navbar-btn"
          role="button"
        >
          <i class="far fa-newspaper" id="icon"></i>
        </a>
        <a class="btn navbar-btn" @click="logout" role="button">
          <i class="fas fa-sign-out-alt" id="icon"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: ["activePage"],
  data() {
    return {
      isActive: "read-all-article-page"
    };
  },
  methods: {
    changePage(isPage) {
      this.isActive = isPage;
      this.$emit("page", isPage);
    },
    logout() {
      Swal.fire({
        title: "Are you sure to Logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!"
      }).then(result => {
        if (result.value) {
          Swal.fire({
            title: "Success!",
            text: "See you soon.....",
            icon: "success",
            confirmButtonText: "Cool"
          });
          let auth2 = gapi.auth2.getAuthInstance();
          auth2
            .signOut()
            localStorage.removeItem("token");
            this.$emit("isLogin", false);
        }
      });
    }
  }
};
</script>

<style scoped>
#navbar {
  width: 70px;
  display: flex;
  height: 100vh;
}

#icon-mini {
  width: 24px !important;
  height: 24px !important;
}

#icon {
  width: 24px !important;
  height: 24px !important;
}

.navbar-btn {
  box-shadow: none !important;
}

.navbar-btn:hover {
  background-color: #00b699;
  border-color: #00b699;
  box-shadow: none !important;
  color: white;
}

.active {
  background-color: #00b699;
  border-color: #00b699;
  box-shadow: none !important;
  color: white;
}
</style>
