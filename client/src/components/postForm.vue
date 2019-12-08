<template>
  <div style="display:flex; justify-content:center;">
    <b-form class="col-md-10 mt-5">
      <b-form-group
        id="input-group-1"
        label="Title"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="title"
          type="text"
          required
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Content" label-for="input-2" class='mt-5'>
        <div id="editor"></div>
      </b-form-group>

      <b-form-file v-model="file" class="mt-5" plain></b-form-file>
      <b-button type="submit" variant="primary" @click.prevent='submitPost' class="mt-5">Post</b-button>
    </b-form>
  </div>
</template>

<script>
  import Quill from 'quill'
  import axios from 'axios'
export default {

  name: 'postForm',

  data () {
    return {
      title: '',
      content: '',
      file: null,
      editor: null
    }
  },
  methods: {
    submitPost(){
      this.content = this.editor.root.innerHTML
      const fd = new FormData()
      fd.append('title',this.title)
      fd.append('content',this.content)
      fd.append('file',this.file)
      axios({
        method: 'post',
        url: 'http://localhost:3000/todo',
        data: fd,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(() => {
          this.$emit('show', 'list')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted(){
    this.editor = new Quill('#editor', {
      theme: 'snow'
    })
  }
}
</script>

<style scoped>

</style>