<template>
  <div id="canvas" class="my-2 container" style="height: 100vh; width: 70%">
      <h4 class="my-4 mx-1">{{ pageTitle }}</h4>
      <b-form v-on:submit.prevent="createPost">
      <div class="form-group">
        <input id="title-input" class="form-control" type="text" placeholder="Title" v-model="title">
      </div>
      <div id="qEditor" class="form-group" style="background-color: white;">
        <quill-editor v-model="content"></quill-editor>
      </div>

      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        required
      ></b-form-file>
      <b-button variant="primary" class="my-3" type="submit">Submit Post</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "../../apis/server";
import Swal from 'sweetalert2';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  props: ["currentView", "articleId"],
  data() {
    return {
      title: "",
      content: "",
      file: null,
      pageTitle: "Create New Post"
    }
  },
  components: {
    quillEditor
  },
  methods: {
    createPost() {
      if (!this.articleId) {
        let fd = new FormData();
        fd.append("title", this.title);
        fd.append("content", this.content);
        fd.append("featured_img", this.file)
        axios({
          method: "post",
          url: "/articles",
          headers: { 
            'Content-Type': 'multipart/form-data',
            access_token: localStorage.getItem("access_token")
          },
          data: fd 
        })
        .then(({ data }) => {
          console.log(data)
          Swal.fire({
            icon: 'success',
            text: "Submitted!"
          })
          this.$emit("changeMainView", "posts")
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
      } else {
          alert('!')
          axios.patch(`/articles/${this.articleId}`, {
            title: this.title,
            content: this.content 
            },{
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          })
            .then(({ data }) => {
              Swal.fire({
                icon: 'success',
                text: "Updated!"
              })
              this.$emit("changeMainView", "posts")
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err
              })
            })
      }
      
    }
  },
  mounted() {
    if (this.articleId) {
      axios.get(`/articles/${this.articleId}`, {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.pageTitle = "Edit Post"
          this.title = data.title,
          this.content = data.content
        })
    } else {
      this.title = "",
      this.content = ""
    }
  }
}
</script>

<style>

</style>