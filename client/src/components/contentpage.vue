<template>
  <div class="container column is-10" style="overflow:scroll;width:100vw">
      
    <div class="section-content">

<!-- ------------------------------------------------------------------------------------------------------------------------------------ -->

    <div v-if="editorPage === false" class="main-content-cards" style="display:flex;flex-direction:rows;flex-wrap:wrap;width:100%">

      <div class="card" style="margin:20px;width:28%;" v-for="(project, i) in filteredList" :key="i">
          
          <a href="#">
          
         <div class="image-header-inside" id="header-card"
         :style="`background-position : center;background-size:cover;height:300px;background-image: url('${project.images[0]}')`" @click="isModalActive = true; index = i">
          
          </div>

          </a>
          <div v-if="project.likes.length >= 2" class="love-tags" style="background-image: url('../../img/love-tag.png');width:50px;height:60px;position:absolute;margin-top:-8px;margin-left:240px;background-size:cover">
          </div>
        <div class="card-content">
          <div class="content" style="max-width:100%">
              <h2>{{project.title}}</h2>
                <p style="color:grey; font-weigth:100; margin-bottom:0px; " v-html="project.description.slice(0,50)+'...'">
                    <!-- {{project.description.slice(0,200) + '...'}} -->
                    
                </p>
                <a style="font-size:15px; color :blue" @click="isModalActive = true; index = i">show more>></a>

                <p style="color:grey; font-weigth:100; font-style:italic"></p>
                <div class="buttons-content">
                    <h6 style="font-size:12px; margin-bottom:20px;" > <strong>published at :</strong>  {{project.publishedAt.slice(0,10)}}</h6>
                    <a href="#" style="color:red" @click="likes(project._id)">
                        <i v-if="project.likes.length === 0" id="like-button" class="fas fa-heart" style="color:black"></i>
                        <i v-if="project.likes.length > 0" id="like-button" class="far fa-heart" style="margin-right:10px"></i>
                    </a>
                    {{project.likes.length}}
                </div>
            </div>
        </div>
      </div>

    </div>

    
<!-- ------------------------------------------------------------------------------------------------------------------------------------ -->

    <section>
         <b-modal :active.sync="isModalActive" :width="1200" scroll="keep">
           
              <div class="card" style="padding:50px">
                
                <div class="image-header-inside" :style="{ 'background-size':'cover','background-position':'center', 'background-image': `url('${filteredList[index].images[0]}')` }">
                </div>
            
                <div class="card-header-inside">
                    <div class="content-right">
                        
                        <p class="card-header-title" style="font-size: 36px; padding-left:-10px">{{ filteredList[index].title}}</p>
                       

                         <b-taglist style="margin-left:10px">
                            <b-tag v-for="(tag,i) in filteredList[index].tags" :key="i"  style="" type="is-info">{{tag}}</b-tag>
                        </b-taglist>
                        <a href="#" style="color:red" @click="likes(filteredList[index]._id)">
                            <i class="far fa-heart" style="margin-right:10px;margin-left:15px"></i>
                            {{filteredList[index].likes.length}}
                        </a>

                    </div>
                <p style="margin-left:20px"> <strong>published at :</strong>   {{ filteredList[index].publishedAt.slice(0,10)}}</p>  
                </div>
                <hr>
                <div class="card-content">
                <div class="content">
                        <p style="color:grey; font-weigth:100; margin-bottom:0px;" v-html="filteredList[index].description">
                        
                        </p>

                        <br>                                      
                 </div>
                 
                </div>

                <div class="image" style="background-size: cover" v-for="(image,i) in filteredList[index].images" :key="i">
                    <img :src="image" alt="" v-if="i !== 0">
                    <hr>
                </div>
                
                
            </div>
        </b-modal>

    </section>


<!-- ------------------------------------------------------------------------------------------------------------------------------------ -->     


        <form v-if="editorPage === true" @submit.prevent="updateProject()">
             
               <template style="display:flex;align-items:center">
                    <section>
                        
                        <p class="card-header-title" style="font-size: 36px; padding-left:-10px">Editor Page</p> 
                        
                        <hr>

                        <div class="field">
                            <label for="" class="label">Title</label>
                            <div class="control has-icons-left">
                                <input v-model="title" type="text" placeholder="" class="input">
                                <span class="icon is-small is-left">
                                </span>
                        </div>

                         <div class="field">
                            <label for="" class="label">Description</label>
                            <div class="control has-icons-left">
                                 <quill v-model="description" output="html"></quill>
                                <span class="icon is-small is-left">
                                </span>
                        </div>

                         <div class="field">
                            <section>
                                <b-field label="Tags">
                                    <b-taginput
                                        placeholder="Add a tag"
                                        v-model="tags"
                                        >
                                    </b-taginput>
                                </b-field>
                            </section>
                        </div>

                         <div class="field">
                            <section style="margin-top:50px;justify-contents:center">
                                <b-field label="Upload file">
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
                                                <p>Drop your files here or click to upload</p>
                                            </div>
                                        </section>
                                    </b-upload>
                                </b-field>

                                <div class="tags">
                                    <span v-for="(file, index) in dropFiles"
                                        :key="index"
                                        class="tag is-primary" >
                                        {{file.name}}
                                        <button class="delete is-small"
                                            type="button"
                                            @click="deleteDropFile(index)">
                                        </button>
                                    </span>
                                </div>
                            </section>
                        </div>
                        

                         <button class="button" type="is-primary">Submit</button>
                         <button class="button" type="is-danger" @click.prevent="editorPage = false">Cancel</button>

                    
                    </section>
                </template>


        </form>

   


<!-- ------------------------------------------------------------------------------------------------------------------------------------ -->   



    </div>
  </div>
</template>

<script>

import axios from '../apis/server'
import Swal from 'sweetalert2'

    export default {
        name: 'content-page',
        props: ['keyword'],
        data() {
            return {
                file: [],
                projects : [],
                projectId:'',
                title:'',
                dropFiles : [],
                tags : [],
                editorPage: false,
                isModalActive: false,
                index : 0,
                description: '',
                    config: {
                        placeholder: 'Compose an epic...',
                    },
                page:'',
            }
        },
        

        methods : {

            fetchData() {
                axios({
                    method: 'get',
                    url : '/articles/all',
                })
                .then(({data})=>{
                    this.projects = data
                })
                .catch(err => {
                    console.log(err)
                })
            
            },
            likes(id){
                 axios({
                    method: 'post',
                    url : `/articles/${id}/likes`,
                    headers : {
                        token : localStorage.getItem('token')
                    },
                })
                .then(({data})=>{
                    this.fetchData()
                })
                .catch(err => {
                })
            },
            deleteDropFile(index) {
                this.dropFiles.splice(index, 1)
            },
            changePage(value){
                console.log('page position ======',value)
                this.page = value
            },
            showCreateForm(status){
                this.editorPage = status
            },
            createProject(){
                console.log(
                    this.title,
                    this.description,
                    this.tags,
                    this.dropFiles
                )
            }
        },
        computed: {

            filteredList() {
                return this.projects.filter(post => {
                    // console.log(post.tags.toString())
                    return post.tags.toString().toLowerCase().includes(this.keyword.toLowerCase()) || post.title.toLowerCase().includes(this.keyword.toLowerCase())
                    
                })
            },
        },
        mounted() {
            this.fetchData()
        },
    }
</script>


<style>


#like-button:hover{
    transform: scale(1.2) perspective(1px)
}

.section-content {
    padding: 3rem 1.5rem;
    margin: 4rem;
}

.image-header{
    width: 100%;
    height: 200px;
    background-color:grey;
     
}

.card-image{
    display: flex;
}

.image-inside{
    width:100%;
    height:300px;
}

.image-header-inside{
    height: 500px;
    display: flex;
    justify-content: space-evenly;
}

#header-card:hover{
    width:100%;
    height:100%;
    background-color:#000;
    opacity:0.8;
}

.detail-card {
    background-color: white;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    color: #4a4a4a;
    max-width: 100%;
    position: relative;
}
.card-content{
    display: flex;
    justify-content: space-between;
    height: 100%;
    border: transparent;
}

.content{
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-header{
    display: flex;
    flex-direction: column;
}

.card-header-inside{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:20px;
}


.button-content{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

</style>