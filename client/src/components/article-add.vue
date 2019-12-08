<template>
  <form @submit.prevent="submitForm">
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
      <label for="content">Content:</label>
      <wysiwyg id="content" v-model="content" />
    </div>
    <div class="form-label-group justify-content-end d-flex">
      <input type="submit" value="Add Article" class="btn btn-primary" />
    </div>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  name: "addArticle",
  data: function() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    submitForm: function() {
      axios({
        method: "POST",
        url: "http://104.198.20.142:3000/article/create",
        data: {
          title: this.title,
          content: this.content
        },
        headers: {
            token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$emit("add-article", data);
          this.title = "";
          this.content = "";
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