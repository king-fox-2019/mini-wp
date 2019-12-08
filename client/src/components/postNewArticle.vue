<template>
    <div style="margin-top:40px">
        <!-- <h1>filename: postNewArticle.vue</h1> -->

        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" v-model="title" placeholder="input your title here" required>
        </div>

        <div>
        <wysiwyg v-model="content" />
        </div>  

         <b-form-file
            v-model="file"
            :state="Boolean(file)"
            placeholder="Choose a file or drop it here (max 1MB)..."
            drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>


        <div class="dropdown-divider"></div>
        <nav class="navbar navbar-light bg-white d-flex justify-content-center ">
            <div style="margin-right:10px">
            <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" @click="submitPost" >
                submit
            </button>
            </div>
        
            <div>
            <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" @click="goingBack">
                go back
            </button>
            </div>
            
        </nav>
        




    </div>

</template>




<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    
    data:function(){
        return {
            title:'',
            content:'',
            file:[]
        }
    },
    methods: {
        submitPost()
          {
              console.log(this.file) 
              console.log("TCL: this.title", this.title)
              console.log("TCL: this.content", this.content)

              const fd = new FormData()
              fd.append('file',this.file)
              fd.append('title',this.title)
              fd.append('content',this.content)

              axios({
                  method: 'post',
                  url: 'http://localhost:3000/articles/create',
                  headers:{
                      access_token: localStorage.getItem('access_token')
                  },
                  data: fd
              })
              .then(result=>{
                  console.log(result)
                  Swal.fire(
                      'Success to post new article'
                  )
                  this.title = ''
                  this.content = ''
                  this.file = []
              })
              .catch(err=>{
                Swal.fire(
                    err.response.data.code,
                    err.response.data.message,
                    'error'
                )
              })
          },
        goingBack()
          {
            Swal.fire({
                title: "un-saved progress will be lost",
                text: "are you seriously going back",
                icon: "warning",
                showCancelButton: true,
            })
            .then(result=>{
                if(result.value)
                    this.$emit('changePage', 'bodyContent')
            })
          }
    }


}
</script>





<style>
@import "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";


</style>