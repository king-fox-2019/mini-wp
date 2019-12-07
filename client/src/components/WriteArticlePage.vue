<template>
  <div>
    <form class="card">
      <section>
        <b-field label="Title :">
          <b-input v-model="title" placeholder="Title"></b-input>
        </b-field>
      </section>

      <b-field label="Content :">
        <quill v-model="content" output="html" :config="config" style="heigth: 100px;"></quill>
      </b-field>

      <section>
        <template>
          <section>
            <b-field label="Tags :">
              <b-taginput v-model="tags" ellipsis icon="label" placeholder="ex : javascript"></b-taginput>
            </b-field>
          </section>
        </template>

        <label class="label">Featured Image :</label>
        <b-field>
          <b-upload v-model="featured_images" multiple drag-drop>
            <section class="section" style="background-color: white;">
              <div class="content has-text-centered">
                <p>
                  <b-icon style="align-items:center" icon="upload" size="is-medium"></b-icon>
                </p>
                <p>Drop your files here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </b-field>

        <div class="tags">
          <span v-for="(file, index) in featured_images" :key="index" class="tag is-primary">
            {{ file.name }}
            <button class="delete is-small" type="button" @click="deleteFile(index)"></button>
          </span>
        </div>

        <b-button type="is-primary submit" @click="create">Post</b-button>
      </section>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQuill from 'vue-quill'
import axios from '../../apis/axios'
import Swal from 'sweetalert2'
Vue.use(VueQuill)

export default {
  name: "WriteArticlePage",
  data () {
    return {
      title: '',
      content: '',
      featured_images:[],
      tags:[],
      config: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction
            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
            ['clean'] // remove formatting button
          ]
        },
        placeholder: 'Description here'
      }
    }
  },
  methods: {
    deleteFile(index) {
      this.featured_images.splice(index, 1)
    },
    create(){
      let formData = new FormData()
      this.featured_images.forEach(image => {
        formData.append('imgUrl', image)
      });
      this.tags.forEach(tag => {
        formData.append('tags', tag)
      })
      formData.set('title', this.title)
      formData.set('content', this.content)

      axios({
        method: 'POST',
        url: `/articles`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: formData
      })
        .then(({ data }) => {
          this.title = ''
          this.content = ''
          this.featured_images = []
          this.tags = []
          this.$buefy.toast.open({
            message: 'Article Posted!',
            type: 'is-success'
          })
          this.$emit('switch-page', 'private')
        })
        .catch((err) => {
          console.log(err);
          this.$buefy.toast.open({
            duration: 5000,
            message: err.response.data.errors.join(', '),
            position: 'is-top',
            type: 'is-danger'
          })
        })
    }
  }
}
</script>

<style scoped>
.card{
  padding: 20px 20px 20px 20px; 
}
</style>