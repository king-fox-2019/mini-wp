<template>
  <!-- sidebar -->
  <div class="wrapper side_bar">
    <!-- Sidebar -->
    <nav id="sidebar">
      <ul class="list-unstyled components">
        <li>
          <button type="button">Add Article</button>
        </li>
        <li>
          <button type="button" @click="getArticle">My Article</button>
        </li>
        <li>
          <button type="button" @click="logout" id="logout">Logout</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "SideBar",
  data() {
    return {
      articles: []
    };
  },
  methods: {
    getArticle() {
      axios({
        url: "http://localhost:3000/article",
        method: "get"
      })
        .then(result => {
          this.articles = result;
          console.log(result.data);
          
          this.$emit("get-all-articles", result.data);
        })
        .catch(err => {
          swal.status(500).json(err.message);
        });
    },
    logout() {
      localStorage.clear();
      console.log("masuk logout()");
      this.signOut()
      this.$emit("logout-out-called");
    },
    signOut() {
        console.log("masuk google");
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
          console.log("User signed out.");
        });
      }
  }
};
</script>

<style>
.side_bar {
  position: fixed;
  display: flex;
  left: 0;
  background-color: rgb(116, 116, 116, 0.6);
  /* color: azure; */
  height: 100vh;
  width: 7.5vw;
  padding: 5px;
  padding-top: 12vh;
}

.side_bar button {
  background-color: transparent;
  color: whitesmoke;
  margin: 1vw 0.6vh;
  padding: 2px;
  width: 6vw;
}

#logout{
  align-self: flex-end;
  justify-self: flex-end;
  position: absolute;
  bottom: 3vh;
}

</style>