<template>
<div>
    
        <navbar @loginStatus='isLogin'></navbar>
        <section class="main-content columns is-fullheight" >
        <sidebar v-if="isLogin === true" @openCreateForm='showCreateForm'></sidebar>
        <contentpage v-if="createPage === false"></contentpage>
 
        <div class="container column is-10" style="overflow:scroll; padding:100px;">

            <form v-if="createPage === true" @submit.prevent="createProject" enctype="multipart/form-data">
                
                <template style="display:flex;align-items:center; width:70%">
                        <section style="padding-left:0px">
                            <p class="card-header-title" style="font-size: 36px; padding-left:-10px">Create project</p> 
                            <hr>
                            <div class="field">
                                <label for="" class="label">Title</label>                                
                                    <input style="padding-left:10px" v-model="title" type="text" placeholder="" class="input">
                            </div>

                            <br>

                            <div class="field">
                                <label for="" class="label">Description</label>
                                <div class="control has-icons-left">
                                    <quill v-model="description" :config='config' output="html"></quill>
                                    <span class="icon is-small is-left">
                                    </span>
                            </div>

                            <br>

                            <section>
                                <b-field label="Tags">
                                    <b-taginput
                                        style="padding-left:10px"
                                        placeholder="Add a tag"
                                        v-model="tags"
                                        >
                                    </b-taginput>
                                </b-field>
                            </section>
                            
                            <br>

                            <div class="field">    
                                    
                                <label for="" class="label">Upload Images</label>
                                 <b-field>
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
                                
                            </div>                            

                            <button class="button" type="is-primary">Submit</button>
                            <button class="button" type="is-danger" @click="createPage = false">Cancel</button>

                        
                        </section>
                    </template>


            </form>
        </div>

        </section>

</div>
   

</template>

<script>

import sidebar from '../components/sidebar'
import navbar from '../components/navbar'
import contentpage from '../components/contentpage'
import quill from 'vue-quill'
import axios from '../apis/server'
import Swal from 'sweetalert2'


export default {
    name : 'main-page',
    data(){
        return {
            isLogin : false,
            tags: [],
            projects : [],
            title:'',
            dropFiles : [],
            tags : [],
            index : 0,
            description: '',
                config: {
                    placeholder: 'Start writing here...',
                },   
            createPage : false,
        }
    },
    components:{

        sidebar,
        navbar,
        contentpage

    },
    methods: {
        deleteDropFile(index) {
            this.dropFiles.splice(index, 1)
        },
        isLogin(status){
            this.$emit('loginStatus',status)
        },
        showCreateForm(status){
            this.createPage = status
        },
        createProject(){
            let formData = new FormData()
            this.dropFiles.forEach(image => {
                formData.append ('files',image)
            });
            this.tags.forEach(tags => {
                formData.append ('tags',tags)
            })
            formData.append ('title',this.title)
            formData.append ('description',this.description)
            axios({
                method : 'post',
                url : 'projects',
                data : formData,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                Swal.fire(
                    'Good job!',
                    'Congratulation, your post is updated!',
                    'success'
                )
                this.createPage = false
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Something wrong when we updating your data!',
                    text: 'Please try again, and make sure to fill all field',
                })
                console.log(err)
            })
        }
    },
    mounted() {
    this.editor = new quill(this.$refs.editor, {
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, 4, false] }],
                ['bold', 'italic', 'underline']
            ]
        },
        theme: 'bubble',
        formats: ['bold', 'underline', 'header', 'italic']
    });

    this.editor.root.innerHTML = this.value;
    // We will add the update event here
    this.editor.on('text-change', () => {});
}

}

</script>

<style>

.main-content{
    background-color: rgb(247, 247, 247);
    height:100vh;
}

</style>