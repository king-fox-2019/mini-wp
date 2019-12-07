<template>
  <div>
      <div class="container mb-3">
          <div class="mt-3">
            <h2 class="mb-2">Create Article</h2>
            <label for="article-title"><h3>Title</h3></label>
            <form id="create-article">
                <input type="text" id="article-title" placeholder="Input your title" class="form-control mb-3">
                <wysiwyg v-model="myHTML"></wysiwyg>
            </form>
          </div>
          <div class="mt-3">
              <h5>Thumbnail Photo</h5>
              <form @submit.prevent="uploadImage" enctype="multipart/form-data">
                <div class="card" style="width: 18rem;">
                    <img :src="imageLink" class="card-img-top" alt="">
                    <div class="card-body">
                        <input type="file" name="file" ref="file" @change="fileUploadHandle" />
                    </div>
                </div>
              </form>
          </div>
          <div class="mt-3 w-100">
              <section>
                <b-field label="Add some tags">
                    <b-taginput
                        v-model="tags"
                        ellipsis
                        icon="label"
                        placeholder="Add a tag">
                    </b-taginput>
                </b-field>
                <p class="content"><b>Tags:</b> {{ tags }}</p>
            </section>
          </div>
          <div class="mt-3">
            <button class="btn btn-success">Save</button>
            <button class="btn btn-danger" @click.prevent="createArticle">Post</button>
          </div>
      </div>
  </div>
</template>

<script>

import imageServer from '../../api/image'

export default {
    data(){
        return{
            myHTML : '',
            image: '',
            imageLink: '',
            tags: ['Auckland','Wellington','Very long string that would overflow']
        }
    },
    methods:{
        createArticle(){
        },
        fileUploadHandle(){
            this.image = this.$refs.file.files[0]
            this.uploadImage()
        },
        uploadImage(){
            let formData = new FormData()
            formData.append('file', this.image)
            imageServer({
                url: '/upload',
                method: 'POST',
                data: formData
            })
            .then(({data})=>{
                this.imageLink = data
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    },
    computed:{
    }
}
</script>

<style>

</style>