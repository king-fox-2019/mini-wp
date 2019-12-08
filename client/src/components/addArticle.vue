<template>
  <div class="d-flex vertical-center">
    <div class="m-auto">
      <h1>Write your new article</h1>
      <b-form @submit.prevent="add">
        <div class="form-group">
          <label for="article-title"></label>
          <input
            v-model="title"
            type="text"
            class="form-control"
            name="article-title"
            placeholder="Input title"
          />
        </div>
        <div class="form-group">
          <wysiwyg v-model="content" />
        </div>
         <b-form-file
            v-model="featured_image"
            :state="Boolean(featured_image)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            ></b-form-file>
          <div class="mt-3">Selected file: {{ featured_image ? featured_image.name : '' }}</div>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "../../helpers/axios";

export default {
  data() {
    return {
      title: "",
      content: "",
      featured_image: []
    };
  },
  methods: {
    add: function() {
      console.log(this.featured_image)
      let fd = new FormData()
      fd.append('title',this.title)
      fd.append('content',this.content)
      fd.append('featured_image',this.featured_image)
      axios({
        method:'post',
        url:'/article',
        data:fd,
        headers : {access_token:localStorage.getItem('access_token')}
      })
        .then(article => {
          console.log(article.data)
          this.$emit("addArticle", article.data);
          this.$parent.toShow('list')
        });
    }
    // onFileChange(e){
    //   let files = e.target.files || e.dataTransfer.files
    //   if(!files.length)
    //     return
    //   this.createImage(files[0])
    // },
    // createImage(file){
    //   let image = new Image()
    //   let reader = new FileReader()
      
    //   reader.onload=e=>{
    //     console.log(e)
    //     this.image = e.target.result
    //   }
    //   reader.readAsDataURL(file)
    // }
  }
};
</script>

<style>
  @import '../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css';
</style>

<!-- <form>
        <div class="form-group">
          <label for="article-title"></label>
          <input
            v-model="title"
            type="text"
            class="form-control"
            name="article-title"
            placeholder="Input title"
          />
        </div>
        <div class="form-group">
          <wysiwyg v-model="content" />
        </div>
        <div class="form-group">
          <input method="post" name="featured_image" action="/article" enctype="multipart/form-data" type="file" accept="image/*">
        </div>
        <input type="submit" class="btn btn-dark" value="Submit" />
      </form> -->