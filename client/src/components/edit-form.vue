<template>
  <div class="mdl-card mdl-cell mdl-cell--12-col" style="padding:30px 10px">
    <h3>edit article</h3>
    <form @submit.prevent='addArticle'>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--12-col">
           <input class="mdl-textfield__input" type="text" id="sample3" v-model="title" required>
           <label class="mdl-textfield__label" for="sample3">Title</label>
        </div>
        Cover Image : <input type="file" name="myFile" id="imagecover"><br>
        Content:
        <div id="edit_content" >
                        
        </div>
        <button type="submit" class="mdl-button mdl-js-button mdl-button--accent">
          Edit Article  
        </button><br>
        </form> 
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      title:'',
      image:null,
      content:''
    };
  },
  props :['idArticle'],
  methods:{
      fetch(){
        axios({
              url:`http://localhost:3000/article/${this.idArticle}`,
              method:'get',
              headers:{
                  access_token : localStorage.access_token
              }
          }).then(({data})=>{
              this.title = data.title
              this.content.root.innerHTML = data.content
          }).catch(err => {
              console.log(err)
          })
      },
      addArticle(){
        let obj = {}
        let content = this.content.root.innerHTML
        if(document.getElementById('imagecover').files.length >= 1){
          this.image = document.getElementById('imagecover').files[0]
          const formdata= new FormData()
          formdata.append('file', this.image)
          formdata.append('title', this.title)
          formdata.append('content', content) 
          obj = formdata
        }else{
          obj.title = this.title
          obj.content = content
        }
        axios({
          url:`http://localhost:3000/article/${this.idArticle}`,
          method:'put',
          data:obj,
          headers:{
            access_token : localStorage.access_token
          }
        }).then(data=>{
          swal({
            title: "Good job!",
            text: "update article success!",
            icon: "success",
          });
          this.$emit('editcomplete')
        }).catch(err=>{
          console.log(err)
        })
      }
  },
  mounted(){
      this.content = new Quill('#edit_content', {
        theme: 'snow'
      });
      this.fetch()
    },
};
</script>

<style scoped>
</style>