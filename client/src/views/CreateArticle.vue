<template>
 <div id="writePage">
<navbar :userLogin="userLogin" @loggedIn="isLogin"></navbar>
    <div id="formArticle">
      <h1 id="title">Create new article</h1>
      <form @submit.prevent="createArticle">
        <b-field label="Title">
            <b-input type="text" v-model="title"></b-input>
        </b-field>

        <b-field label="Content">
            <div class="field">
              <editor
              v-model="content"
              api-key="len2fw22p8rdjbvkee1128okxped3d2fnf5l11br8vsupt3t"
              ></editor>
            </div>
        </b-field>

        <b-field label="Add some tags">
          <b-taginput
              v-model="tags"
              ellipsis
              icon="label"
              placeholder="Add a tag">
          </b-taginput>
        </b-field>

        <b-field label="Upload image header">
          <div  id="uploadContent">
            <b-upload v-model="dropFiles"
                multiple
                drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon
                        icon="upload"
                        size="is-large">
                    </b-icon>
                  </p>
                  <p>Drop your file here or click to upload</p>
                </div>
              </section>
            </b-upload>
          </div>
        </b-field>

        <div class="tags" >
            <span v-for="(file, index) in dropFiles"
                :key="index"
                class="tag is-link" >
                {{file.name}}
                <button class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)">
                </button>
            </span>
        </div>
        <div id="action">
          <button class="button" type="submit" id="submitButton">Submit article</button>
          <a @click="saveToDraft" id="draftButton">Save to draft</a>
        </div>
      <form>
    </div>
 </div>
    
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import axios from '../../config/axios'

export default {
  name : 'createArticle',
  components : {
    Editor,
    Sidebar,
    Navbar
  },
  data(){
    return{
      tags : [],
      content : '',
      title : '',
      dropFiles : [],
      userLogin : true,
      
    }
  },
  methods : {
    createArticle(){
      let token = localStorage.getItem('token')
       let formData = new FormData();
      formData.append('image',this.dropFiles[0])
      formData.append('title',this.title)
      formData.append('content',this.content)
      formData.append('tags',this.tags)
      const loadingComponent = this.$buefy.loading.open()
      axios({
        method : 'post',
        url : '/articles/add',
        data : formData,
        headers : {
          token,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(({data})=>{
          loadingComponent.close()
          this.$buefy.toast.open({
                    message: 'Article Created!, redirecting back to home',
                    type: 'is-success'
                })
          setTimeout(()=>{
            this.$router.push({path:'/'})
          },2000)
        })
        .catch((err)=>{
          console.log(err.response.data);
          loadingComponent.close()
          let msg = err.response.data.arr.join('  -  ')
           this.$buefy.toast.open({
                    duration: 4000,
                    message: `${msg}`,
                    type: 'is-danger'
                })
                
        })
    },
    deleteDropFile(index){
      this.dropFiles.splice(index, 1)
    },
     userLogout(){
      localStorage.clear()
      this.userLogin = false
    },
     isLogin(){
      let token = localStorage.getItem('token')
      if(token){
        this.userLogin = true
      } else {
        this.userLogin = false
      }
    },
    saveToDraft(){
      let token = localStorage.getItem('token')
       let formData = new FormData();
      formData.append('image',this.dropFiles[0])
      formData.append('title',this.title)
      formData.append('content',this.content)
      formData.append('tags',this.tags)
      const loadingComponent = this.$buefy.loading.open()
      axios({
        method : 'post',
        url : '/articles/addDraft',
        data : formData,
        headers : {
          token,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(({data})=>{
          loadingComponent.close()
           this.$buefy.toast.open({
                    message: 'Article saved, redirecting back to home',
                    type: 'is-success'
                })
          setTimeout(()=>{
            this.$router.push({path:'/'})
          },2000)
        })
        .catch((err)=>{
            loadingComponent.close()
          let msg = err.response.data.arr.join('  -  ')
           this.$buefy.toast.open({
                    duration: 4000,
                    message: `${msg}`,
                    type: 'is-danger'
                })
        })
    },
  }
}
</script>

<style>
#formArticle{
width: 70%;
margin : 0 auto;
height: 92vh;
/* overflow: scroll; */
padding: 20px;

}
#writePage{
  display: flex;
  flex-direction: row
}
#title{
  font-size: 30px;
  color: black;
  margin-bottom: 10px
}
#action{
  width: 40%;
  margin: 10px auto;
  display: flex;
  /* flex-direction: row; */
  justify-content: center
}
#draftButton{
  background-color: gray;
  color: white;
  padding: 5px 10px;
  border-radius: 2px;
  /* margin-left: 8px; */
  margin-top: 10px;
  max-height: 35px
}
#submitButton{
  background-color:#3C4ADC;
  color: white
}
#uploadContent{
 margin: 0px 10% 0px 30%; 
 width: 60%;
}
</style>
