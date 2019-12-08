<template>
  <div class="d-flex vertical-center">
    <div class="m-auto">
      <h1>Edit your article</h1>
      <b-form @submit.prevent="edit">
        <div class="form-group">
          <label for="title"></label>
          <input
            v-model="article.title"
            type="text"
            class="form-control"
            name="title"
            placeholder="Input title"
          />
        </div>
        <div class="form-group">
          <label for="content">
            <wysiwyg v-model="article.content"></wysiwyg>
          </label>
        </div>
        <b-form-file
        v-model="featured_image"
        :state="Boolean(featured_image)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="mt-3">Selected file: {{ featured_image ? featured_image.name : '' }}</div>
        <b-button type="submit">Submit</b-button>
        </b-form>
    </div>
  </div>
</template>

<script>
import axios from "../../helpers/axios";

export default {
  props:['articleData'],
  data() {
    return {
      article: this.articleData,
      featured_image:[]
    };
  },
  methods: {
    edit: function() {
      let fd = new FormData()
      fd.append('id',this.article._id)
      fd.append('title',this.article.title)
      fd.append('content',this.article.content)
      fd.append('featured_image',this.featured_image)
      axios({
        method:'put',
        url:'/article',
        data:fd,
        headers:{access_token:localStorage.getItem('access_token')}
      })
        .then(article => {
          this.$parent.show('profile')
        }); 
    }
  },
  watch: {
    articleData: function(){
      this.article = this.articleData
    }
  }
};
</script>

<style>
  @import '../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css';
</style>