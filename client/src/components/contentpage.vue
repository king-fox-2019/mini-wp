<template>
  <div class="container column is-10" style="overflow:scroll;">
      
    <div class="section-content">

<!-- ------------------------------------------------------------------------------------------------------------------------------------ -->

        

    <div v-if="editorPage === false" class="main-content-cards" style="display:flex;flex-direction:rows">

      <div class="card" style="margin:30px;width:30%;" v-for="(project, i) in projects" :key="i">
          
          <a href="#">
          
         <div class="image-header-inside" 
         :style="`background-position : center;background-size:cover;height:300px;background-image: url('${projects[i].images[0]}')`" @click="isModalActive = true; index = i">
          
          </div>

          </a>
        <div class="card-content">
          <div class="content" style="max-width:100%">
              <h1>{{project.title}}</h1>
                <p style="color:grey; font-weigth:100; margin-bottom:0px; " v-html="project.description.slice(0,200) + ' ...'">
                    <!-- {{project.description.slice(0,200) + '...'}} -->
                    
                </p>
                <a style="font-size:15px; color :blue" @click="isModalActive = true; index = i">show more>></a>

                <p style="color:grey; font-weigth:100; font-style:italic"></p>
                <div class="buttons-content">
                    <h6 style="font-size:12px; margin-bottom:20px;" > <strong>published at :</strong>  {{project.publishedAt.slice(0,10)}}</h6>
                    <!-- <b-button type="is-primary" style="height:50px ; margin-right:20px" @click.prevent="findUpdate(project._id); index = i ; "
                        icon-left="update">
                        Update
                    </b-button>

                    <b-button type="is-danger" style="height:50px ; margin-right:20px" @click.prevent="deleteProject(project._id)"
                        icon-left="delete">
                        Delete
                    </b-button> -->
                   
                </div>
            </div>
        </div>
      </div>

    </div>

    
<!-- ------------------------------------------------------------------------------------------------------------------------------------ -->

    <section>
         <b-modal :active.sync="isModalActive" :width="1200" scroll="keep">
           
              <div class="card" style="padding:50px">
                
                <div class="image-header-inside" :style="{ 'background-size':'cover','background-position':'center', 'background-image': `url('${projects[index].images[0]}')` }">
                </div>
            
                <div class="card-header-inside">
                    <div class="content-right">
                        
                        <p class="card-header-title" style="font-size: 36px; padding-left:-10px">{{ projects[index].title}}</p>
                       

                         <b-taglist style="margin-left:10px">
                            <b-tag v-for="(tag,i) in projects[index].tags" :key="i"  style="" type="is-info">{{tag}}</b-tag>
                        </b-taglist>

                    </div>
                <p style="margin-left:20px"> <strong>published at :</strong>   {{ projects[index].publishedAt.slice(0,10)}}</p>  
                </div>
                <hr>
                <div class="card-content">
                <div class="content">
                        <p style="color:grey; font-weigth:100; margin-bottom:0px;" v-html="projects[index].description">
                        
                        </p>

                        <br>                                      
                 </div>
                </div>

                <div class="image" style="background-size: cover" v-for="(image,i) in projects[index].images" :key="i">
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
                        
                        <p class="card-header-title" style="font-size: 36px; padding-left:-10px">Editor page</p> 
                        
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
            }
        },
        methods : {

            findUpdate(id){
                this.editorPage = true
                axios({
                    method: 'get',
                    url : `/projects/${id}`,
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then(({data})=>{
                    console.log(data.images)
                    this.title = data.title
                    this.description = data.description
                    this.dropFiles = data.images
                    this.tags = data.tags
                    this.projectId = data._id
                })
            },

            updateProject(){
                console.log('halo dari update')
                console.log(this.projectId)
                axios({
                    method:'put',
                    url:`/projects/${this.projectId}`,
                    headers :{
                        token : localStorage.getItem('token')
                    },
                    data :{
                        title : this.title,
                        description : this.description,
                        images : this.images,
                        tags : this.tags
                    }
                })
                .then(({data})=>{
                    console.log(data)
                    console.log('SUKSES')
                })
                .catch(err => {
                    console.log(err)
                })
                // console.log({
                //     title:this.title,
                //     description:this.description,
                //     tags : this.tags,
                //     images : this.images
                // })

            },
            

            showCreateForm(status){
                this.editorPage = status
            },
            getProjects(){
                axios({
                    method: 'get',
                    url : '/projects/all',
                })
                .then(({data})=>{
                    console.log(data)
                    this.projects = data
                })
                .catch(err => {
                    console.log(err)
                })
            },
            deleteProject(id){
                
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                axios({
                    method: 'delete',
                    url : `/projects/${id}`,
                    headers : {
                        token : localStorage.getItem('token')
                    },
                })
                .then(({data})=>{
                    this.getProjects()
                })
                .catch(err => {
                    console.log(err)
                })
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                }
            })

                
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
        components : {
            
        },
        created(){
            this.getProjects()
        },
        watch(){
            this.getProjects()
        }
        
    }
</script>


<style>

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