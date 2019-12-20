<template>
  <div id="article-add-form" class="ui styled fluid accordion">
    <div class="active title"
      >
      <h3 class="text-center">Create a post</h3>
    </div>
    <div class="active content"
      >
      <form class="ui form"
        >
        <div class="field">
          <input 
              type="text" 
              v-model="postTitle"
              placeholder="Title" 
              />
        </div>
        <wysiwyg v-model="myHTML"></wysiwyg>
        <h5 class="mt-3 mb-2">Upload an image: </h5>
        <input type="file" 
          class="mb-3"
          name="file" 
          @change="changeFile" 
          ref="myFiles"
          />
        <select name="skills" multiple="" class="ui search fluid dropdown">
          <option value="">Tags</option>
        </select>

        <button class="fluid ui yellow button mt-3"
          @click.prevent="submitArticle"
          >Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import toastMixin from "../mixins/toastMixin"
import axios from "axios"

export default {
  data() {
    return {
      myHTML: '',
      postTitle: '',
      imageToUpload: null,
      tags: []
    }
  },
  methods: {
    changeFile: function() {
      this.imageToUpload = this.$refs.myFiles.files[0]
    },
    submitArticle: function() {
      console.log('---masuk submit article');
      
      const access_token = localStorage.getItem("access_token")

      if (this.imageToUpload) {
        let featured_image = ''
        let data = new FormData()
        data.append("image", this.imageToUpload)

        axios({
          method: "post",
          url: process.env.HOST_SERVER + '/upload-image',
          data,
          headers: { access_token }
        })
          .then(({ data }) => {
            featured_image = data
            // console.log("ini response", data);
            return axios({
              method: 'post',
              url: process.env.HOST_SERVER + '/articles',
              data: {
                title: this.postTitle, 
                content: this.myHTML, 
                featured_image
              },
              headers: { access_token }
            })
          })
          .then(({ data }) => {
            console.log('---ini hasil submit article', data)
            
            this.toast({ html: data.message });
            this.postTitle = "";
            this.myHTML = "";
            this.$emit('get-articles');
            this.$emit('article-submitted')
          })
          .catch(err => {
            this.danger({ html: err.message });
          })
      }
      else {
        axios({
          method: 'post',
          url: process.env.HOST_SERVER + '/articles',
          data: {
            title: this.postTitle, 
            content: this.myHTML
          },
          headers: { access_token }
        })
        .then(({ data }) => {
          console.log('---ini hasil submit article pas ga ada image', data);
          
          this.toast({ html: data.message })
          this.postTitle = ""
          this.myHTML = ""
          this.$emit('get-articles');
          this.$emit('article-submitted')
        })
        .catch(err => {
          this.toast({ html: err.message });
        })
      }
    }
  },
  mixins: [toastMixin]
}

$('.ui.dropdown').dropdown({
  allowAdditions: true
})
</script>

<style>

</style>