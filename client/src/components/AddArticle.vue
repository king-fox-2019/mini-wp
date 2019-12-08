<template>
  <div id="addArticle" class="page-content-wrapper" :style="leftPadding">
    <div class="container" style="padding-top:20px;">
      <h1 style="color:grey">Create Article</h1>
      <div
        class="rounded-0 card mt-3"
        style="height:73vh;background-color:#EEEEEE;border: 0px solid grey;color:grey;"
      >
        <div class="card-body">
          <div class="media">
            <div class="media-body">
              <div class="head-detail-article justify-content-between">
                <div class="form-group">
                  <label>Title</label>
                  <input
                    v-model="title"
                    style="color:grey"
                    type="text"
                    class="form-control"
                    id="title"
                  />
                </div>
                <div class="form-group">
                  <label>Content</label>
                  <wysiwyg v-model="content" style="height:165px;color:grey" />
                </div>
                <label>Thumbnail Image</label>
                <input
                  style="margin-bottom:20px"
                  type="file"
                  class="form-control-file"
                  id="file"
                  ref="file"
                  v-on:change="handleFileUpload"
                />
                <button
                  @click.prevent="createArticle"
                  class="btn btn-outline-secondary rounded-0"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../config/axios";
import Swal from "sweetalert2";

export default {
  props: ["leftPadding"],
  data() {
    return {
      title: "",
      content: "",
      image: ""
    };
  },
  methods: {
    handleFileUpload() {
      this.image = this.$refs.file.files[0];
      let formData = new FormData();
      const access_token = localStorage.getItem("access_token");
      formData.append("file", this.image);
      axios({
        url: "/articles/image",
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data", access_token }
      })
        .then(({ data }) => {
          this.image = data;
        })
        .catch(err => {
          Swal.fire({
            title: "Error!",
            text: `${err.message}`,
            icon: "error",
            confirmButtonText: "Okay"
          });
        });
    },
    createArticle() {
      const access_token = localStorage.getItem("access_token");
      const data = {
        title: this.title,
        content: this.content,
        featured_image: this.image
      };
      axios({
        url: "/articles",
        method: "post",
        headers: {
          access_token
        },
        data
      })
        .then(({ data }) => {
          Swal.fire({
            title: "Success!",
            text: "Create article success",
            icon: "success",
            confirmButtonText: "Okay"
          });
          this.$emit("currentPage", { page: "dashboard-page" });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            title: "Error!",
            text: `${err.message}`,
            icon: "error",
            confirmButtonText: "Okay"
          });
        });
    }
  }
};
</script>

<style></style>
