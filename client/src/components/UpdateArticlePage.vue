<template>
  <div>
    <form class="card">
      <section>
        <b-field label="Title :">
          <b-input v-model="title" placeholder="Title"></b-input>
        </b-field>
      </section>

      <b-field label="Content :">
        <quill v-model="content" output="html" :config="config" id="quill"></quill>
      </b-field>

      <section>

        <template>
          <section>
            <b-field label="Tags :">
              <b-taginput v-model="tags" ellipsis icon="label" placeholder="ex : javascript">
              </b-taginput>
            </b-field>
          </section>
        </template>


        <label for="" class="label">Featured Image :</label>
        <div v-for="(img, index) in UpdateArticleData.featured_image" :key=index>
          <img :src="img" alt="image" style="width: 100px;">
          <b-button type="is-danger" @click="remove(img)">Delete</b-button>
        </div>
        <b-field>
          <b-upload v-model="dropFiles" multiple drag-drop>
            <section class="section" style="background-color: white;">
              <div class="content has-text-centered">
                <p>
                  <b-icon style="align-items:center" icon="upload" size="is-medium">
                  </b-icon>
                </p>
                <p>Drop your files here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </b-field>

        <div class="tags">
          <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary" >
            {{ file.name }}
            <button class="delete is-small" type="button" @click="deleteDropFile(index)"> </button>
          </span>
        </div>

        <b-button type="is-primary submit" @click="update">Update</b-button>
      </section>
    </form>
  </div>
</template>

<script>
import axios from '../../apis/axios'

export default {
  name: "UpdateArticlePage",
  props: ['UpdateArticleData'],
  data () {
    return {
      title: this.UpdateArticleData.title,
      content:this. UpdateArticleData.content,
      dropFiles:[],
      tags: this.UpdateArticleData.tags,
      oldImage: this.UpdateArticleData.featured_image,
      removed: [],
      config: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
            [{ 'direction': 'rtl' }], // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'] // remove formatting button
          ]
        }
      }
    }
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    },
    remove(img){ 
      this.removed.push(this.oldImage.splice(this.oldImage.indexOf(img), 1))
    },
    update(){
      let formData = new FormData()
      formData.set('title', this.title)
      formData.set('content', this.content)
      this.tags.forEach(tag => {
        formData.append('tags', tag)
      })
      formData.append('remove', this.removed)
      this.dropFiles.forEach(image => {
        formData.append('imgUrl', image)
      })

      axios({
        method: 'PUT',
        url: `/articles/${this.UpdateArticleData._id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: formData
      })
        .then(({ data }) => {
          this.title = ''
          this.content = ''
          this.dropFiles = []
          this.tags = []
          this.remove = []
          this.$buefy.toast.open({
            message: 'Post Updated!',
            type: 'is-success'
          })
          this.$emit('switch-page', 'private')
        })
        .catch((err) => {
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