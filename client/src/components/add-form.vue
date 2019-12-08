<template>
  <div class="mdl-card mdl-cell mdl-cell--12-col" style="padding:30px 10px">
    <h3>add article</h3>
    <form @submit.prevent='addArticle'>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--12-col">
           <input class="mdl-textfield__input" type="text" id="sample3" v-model="title" required>
           <label class="mdl-textfield__label" for="sample3">Title</label>
        </div>
        Cover Image : <input type="file" name="myFile" id="imagecover" required><br>
        Content:
        <div id="add_content" >
                        
        </div>
        <button type="submit" class="mdl-button mdl-js-button mdl-button--accent">
          Add Article  
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
  props :[],
  methods:{
      
      addArticle(){
        this.image = document.getElementById('imagecover').files[0]
        let content = this.content.root.innerHTML
        const formdata= new FormData()
        formdata.append('file', this.image)
        formdata.append('title', this.title)
        formdata.append('content', content)
        axios({
          url:'http://localhost:3000/article',
          method:'post',
          data:formdata,
          headers:{
            access_token : localStorage.access_token
          }
        }).then(data=>{
          swal({
            title: "Good job!",
            text: "add article success!",
            icon: "success",
          });
          this.$emit('addcomplete')
        }).catch(err=>{
          console.log(err)
        })
      }
  },
  mounted(){
      this.content = new Quill('#add_content', {
        theme: 'snow'
      });
    },
};
</script>

<style scoped>
</style>