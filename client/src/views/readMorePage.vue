<template>
  <div class="component">
    <div class="header">
      <img :src="article.featured_image" class="img-thumbnail" />
    </div>
    <div class="container-fluid" id="dashboard-content">
      <div id="article">
        <div class="title">
          {{ article.title }}
        </div>
        <div class="container-fluid bv-example-row">
          <b-row>
            <b-col
              ><p class="card-text" id="date">
                <i class="far fa-user-circle"></i>
                {{ article.userId["username"] }}
              </p></b-col
            >
            <b-col
              ><p class="card-text" id="date" style="text-align:right">
                <i class="far fa-clock"></i>
                {{ dateFormat(article.created_at) }}
              </p></b-col
            >
          </b-row>
        </div>
        <hr />
        <b-row
          v-if="userLogin == article.userId._id"
          class="bv-example-row d-flex justify-content-end"
        >
          <button
            @click="editArticle(article)"
            class="btn btn-primary btn-sm mr-3 publish"
          >
            <i class="far fa-edit"></i> Edit
          </button>
          <button
            @click="deleteArticle(article)"
            class="btn btn-primary btn-sm mr-3 publish"
          >
            <i class="far fa-trash-alt"></i> Delete
          </button>
        </b-row>
        <div class="content">
          <p class="content" v-html="article.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "../server";
import Swal from "sweetalert2";

export default {
  props: ["article"],
  data() {
    return {
      userLogin: null
    };
  },
  methods: {
    dateFormat(val) {
      return moment(val).format("MMMM Do YYYY");
    },
    cekSession() {
      axios
        .get("users/cekSession", {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.userLogin = data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    deleteArticle(val) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios
            .delete(`articles/${val._id}`, {
              headers: { token: localStorage.getItem("token") }
            })
            .then(({ data }) => {
              Swal.fire(
                "Deleted!",
                "Your article has been deleted.",
                "success"
              );
              this.$emit("deleted");
            })
            .catch(err => {});
        }
      });
    },
    editArticle(val) {
      this.$emit("edited", val);
    }
  },
  created() {
    this.cekSession();
  }
};
</script>

<style scoped>
.component {
  height: 100vh;
  min-height: 100vh;
  overflow: scroll;
}

#date {
  font-size: 12px;
  color: darkgrey;
}

.bv-example-row {
  /* margin-top: 10px; */
  margin-bottom: 20px;
  padding-left: 0px;
  padding-right: 0px;
}

/* #dashboard-content {
  height: 68vh;
  min-height: 68vh;
  overflow: scroll;
} */

#article {
  padding: 20px;
}

.title {
  padding: 2px;
  text-align: left;
  height: auto;
  font-size: 52px;
  font-weight: bold;
  font-family: "Sulphur Point", sans-serif;
  line-height: 1.2;
}

/* .image {
  height: 200px;
} */

/* img {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
} */

.content {
  font-family: "PT Sans", sans-serif;
  text-align: justify;
  font-size: 20px;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 5px;
}

.publish {
  background-color: #00ccaa;
  border-color: #00ccaa;
  box-shadow: none !important;
  font-family: "Sulphur Point", sans-serif;
  color: #f9f9f9;
}

.publish:hover {
  background-color: #00b699;
  border-color: #00b699;
  box-shadow: none !important;
}

.publish:focus {
  background-color: #00b699;
  border-color: #00b699;
  box-shadow: none !important;
}

.header {
  height: 200px;
  overflow: hidden;
}

.img-thumbnail {
  border: 0px !important;
}
</style>
