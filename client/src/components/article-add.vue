<template>
  <form @submit.prevent="submitForm" enctype="multipart/form-data">
    <div class="form-label-group">
      <input
        type="text"
        id="title"
        class="form-control"
        placeholder="Title"
        v-model="title"
        required
        autofocus
      />
    </div>
    <div class="form-label-group">
      <b-form-file
        v-model="image"
        :state="Boolean(image)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
    </div>
    <div class="form-label-group">
      <label for="content">Content:</label>
      <wysiwyg id="content" v-model="content" />
    </div>
    <div class="form-label-group justify-content-end d-flex">
      <input type="submit" value="Add Article" class="btn btn-primary" />
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "addArticle",
  data: function() {
    return {
      title: "",
      content: "",
      image: null
    };
  },
  methods: {
    submitForm: function() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.set("title", this.title);
      formData.set("content", this.content);
      console.log(formData);
      axios({
        method: "POST",
        url: "http://104.198.20.142:3000/article/create",
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$emit("add-article", data);
          this.title = "";
          this.content = "";
          this.image = null
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.form-label-group {
  margin: 0.75rem;
  overflow: hidden;
}
</style>