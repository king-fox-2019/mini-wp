<template>
    <div>
            <h4 style="font-family: 'Exo', sans-serif;margin-top: 20px;" > title </h4> 
            <hr>
            <input v-model='title' type="text" placeholder="input your Title" class="shadow p-3 mb-5 bg-white rounded mt-1" style="width: 100%;">
            <div class="shadow p-3 mb-5 bg-white rounded" style="height: 500px;">
                <h4 style="font-family: 'Exo', sans-serif;" id="asd"> content </h4> 
                <hr>
                <!-- <textarea v-model='content' rows="4" cols="50" style="width: 100%;height: 80%;" placeholder="insert your content here !!">
                </textarea> -->
                <div id="add_content" style="height: 350px;">
                </div>
            </div>
            <b-form-file
                v-model="image"
                :state="Boolean(image)"
                placeholder="Choose a picture or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
            <button @click ='save' class="btn btn-secondary btn-lg btn-block">Create</button> 
    </div>
</template>

<script>
import axios from "axios"
import Swal from 'sweetalert2'

export default {
  name: "myArticle",
  data(){
      return{
          title : '',
          image: null,
          quill : null
      }
  },
  methods: {
    save: function (){
      let isi = this.quill.root.innerHTML

      console.log(this.image)
      

      const formData = new FormData();
      if(!this.image){

      formData.set("img", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8A3YE6uTM-a7TK0LfSkc755WK_rP8QJB811lHbl_oqtItsAfm");

      }else{
          formData.append("img", this.image);
      }
      formData.set("title", this.title);
      formData.set("content", isi);

      axios({
        url: 'http://localhost:3000/articles',
        headers: {
          token: localStorage.getItem('token')
        },
        method: 'POST',
        data: formData,
      })
      .then(({data}) => {
        this.title = '',
        this.image = null
        this.quill.root.innerHTML = ''
           Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
      })
      .catch(function (error) {
        console.log(error);
      })
    },
     quillInit(){
      this.quill = new Quill('#add_content', {
        theme: 'snow'
      });
    },
  },
  mounted(){
       this.quillInit()
  }
}
</script>

<style>
</style>