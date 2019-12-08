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
        <div id="editor">
        </div>
      </b-form-group>

      <b-button type="submit" variant="primary" @click.prevent='submitPost' class="mt-5">Post</b-button>
    </b-form>
  </div>
</template>

<script>
  import Quill from 'quill'
  import axios from 'axios'
export default {

  name: 'editForm',

  data () {
    return {
      title: '',
      content: '',
      file: null,
      editor: null
    }
  },
  methods: {
    fetchPost(){
      axios({
        method: 'get',
        url: `http://localhost:3000/todo/${this.postId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          this.title = data.title
          this.content = data.content
          this.editor.root.innerHTML = this.content
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submitPost(){
      this.content = this.editor.root.innerHTML
      axios({
        method: 'patch',
        url: `http://localhost:3000/todo/${this.postId}`,
        data: {
          title: this.title,
          content: this.content
        },
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
  props: ['postId'],
  created(){
    this.fetchPost()
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