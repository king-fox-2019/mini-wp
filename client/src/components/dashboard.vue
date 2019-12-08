<template>
    <div class="container" style="margin-top:35px">
        <div class="tile is-ancestor">
            <div class="tile is-vertical is-3">
                <div class="tile is-parent">
                    <article class="tile is-child notification" style="background-color: white">
                        <div class="content">
                            <b-menu>
                                <b-menu-list :label="name">
                                    <b-menu-item
                                        icon="settings"
                                        :active="isActive"
                                        :expanded="isActive"
                                        @click="isActive = !isActive">
                                        <template slot="label" slot-scope="props">
                                        Administrator
                                            <b-icon
                                            class="is-pulled-right"
                                            :icon="props.expanded ? 'menu-down' : 'menu-up'">
                                            </b-icon>
                                        </template>
                                        <b-menu-item @click="showList" icon="account" label="My Articles"></b-menu-item>
                                        <b-menu-item @click="showAddForm" icon="cash-multiple" label="Add Article"></b-menu-item>
                                    </b-menu-item>
                                    <b-menu-item icon="account" label="My Account">
                                        <b-menu-item @click="deleteAccount" label="Terminate Account"></b-menu-item>
                                    </b-menu-item>
                                </b-menu-list>
                            </b-menu>
                        </div>
                    </article>
                </div>
            </div>
                <div class="tile is-parent">
                    <article class="tile is-child notification" style="background-color: white">
                        <div class="content">
                            <section v-if="needList">
                                <h1 style="text-align: center">{{ rawname }}'s Articles</h1>
                                <br>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Title</th>
                                            <th>Tags</th>
                                            <th>Pubhlised</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(datum, i) in data" :key="i">
                                            <td>{{datum.no}}</td>
                                            <td>{{datum.title}}</td>
                                            <td>{{datum.tags}}</td>
                                            <td>{{datum.createdAt}}</td>
                                            <td><a @click="showUpdateForm(datum._id)">Update</a> | <a @click="deleteData(datum._id)">Delete</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                            <template v-if="needAdd">
                                <h1 style="text-align: center">Add Article</h1>
                                <br>
                                <section>
                                <b-field>
                                    <b-input v-model="titleAdd" placeholder="Title" type="text"></b-input>
                                </b-field>
                                <section>
                                    <b-field>
                                        <b-upload v-model="dropFilesAdd"
                                            multiple
                                            drag-drop>
                                            <section class="section">
                                                <div class="content has-text-centered">
                                                    <p>
                                                        <b-icon
                                                            icon="upload"
                                                            style="width:900px">
                                                        </b-icon>
                                                    </p>
                                                    <p>Drop your image here or click to upload</p>
                                                </div>
                                            </section>
                                        </b-upload>
                                    </b-field>
                                    <div class="tags">
                                        <span v-for="(file, index) in dropFilesAdd"
                                                :key="index"
                                                class="tag is-primary" >
                                                {{file.name}}
                                            <button class="delete is-small"
                                                    type="button"
                                                    @click="deleteDropFileAdd(index)">
                                            </button>
                                        </span>
                                    </div>
                                </section>
                                <Editor v-model="contentAdd" api-key='axnkcmia8jj36i1936fhxiqk3wagnqs5dle6xcmljp52lao9' :init="{plugins: 'wordcount'}"></Editor>
                                <b-field label="Add some tags">
                                    <b-taginput
                                        v-model="tagsAdd"
                                        ellipsis
                                        icon="label"
                                        placeholder="Add a tag">
                                    </b-taginput>
                                </b-field>
                                <br>
                                <b-button @click="addArticle" type="is-primary">Submit</b-button>
                                </section>
                            </template>
                            <template v-if="needEdit">
                                <h1 style="text-align: center">Edit Article</h1>
                                <br>
                                <section>
                                    <b-field>
                                        <b-input v-model="titleEdit" type="text"></b-input>
                                    </b-field>
                                    <section>
                                    <b-field>
                                        <b-upload v-model="dropFilesEdit"
                                                multiple
                                                drag-drop>
                                            <section class="section">
                                                <div class="content has-text-centered">
                                                    <p>
                                                        <b-icon
                                                            icon="upload"
                                                            style="width:900px">
                                                        </b-icon>
                                                    </p>
                                                    <p>Drop your image here or click to upload</p>
                                                </div>
                                            </section>
                                        </b-upload>
                                    </b-field>
                                    <div class="tags">
                                        <span v-for="(file, index) in dropFilesEdit"
                                            :key="index"
                                            class="tag is-primary" >
                                            {{file.name}}
                                            <button class="delete is-small"
                                                type="button"
                                                @click="deleteDropFileEdit(index)">
                                            </button>
                                        </span>
                                    </div>
                                    </section>
                                    <Editor v-model="contentEdit" api-key='axnkcmia8jj36i1936fhxiqk3wagnqs5dle6xcmljp52lao9' :init="{plugins: 'wordcount'}"></Editor>
                                    <b-field label="Add some tags">
                                        <b-taginput
                                            v-model="tagsEdit"
                                            ellipsis
                                            icon="label"
                                            placeholder="Add a tag">
                                        </b-taginput>
                                    </b-field>
                                </section>
                                <br>
                                <b-button @click="updateData" type="is-primary">Submit</b-button>
                            </template>

                        </div>
                    </article>
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Editor from '@tinymce/tinymce-vue'

export default {
    name: 'dashboard',
    data() {
            return {
                dropFiles: [],
                isActive: true,
                name: 'Hi, ' + localStorage.name + '!',
                rawname: localStorage.name,
                data: [],
                needAdd: false,
                needEdit: false,
                needList: true,
                tagsAdd: [],
                tagsEdit: [],
                titleAdd: '',
                titleEdit: '',
                contentAdd: '',
                contentEdit: '',
                dropFilesAdd: [],
                dropFilesEdit: [],
                idEdit: ''
            }
        },
    components: {
        Editor
    },
    methods: {
            showUpdateForm(id) {
                this.idEdit = id
                axios({
                    method: 'GET',
                    url: `${this.$baseUrl}/articles/${id}`,
                    headers: {
                        token: localStorage.token
                    }
                })
                .then(({data}) => {
                    this.titleEdit = data.title
                    this.contentEdit = data.content 
                    this.imageEdit = data.imgUrl
                    this.tagsEdit = data.tags
                    this.needAdd = false
                    this.needList = false
                    this.needEdit = true
                })
                .catch(err => {
                    const error = err.response.data.error.join('\n')
                    this.$swal({
                        title: `<span style="color:#FFFFFF; font-size:15px">${error}</span>`,
                        })        
                    })            
            },
            deleteAccount() {
                axios({
                    method: 'DELETE',
                    url: `${this.$baseUrl}/users`,
                    headers: {
                        token: localStorage.token
                    }
                })
                .then(response => {
                    this.$emit('logout')
                })
                .catch(err=> {
                    const error = err.response.data.error.join('\n')
                    this.$swal({
                        title: `<span style="color:#FFFFFF; font-size:15px">${error}</span>`,
                        })                         
                })
            },
            updateData() {
                let bodyFormDataEdit = new FormData()
                bodyFormDataEdit.append('title', this.titleEdit)
                bodyFormDataEdit.append('content', this.contentEdit)
                bodyFormDataEdit.append('file', this.dropFilesEdit[0])
                bodyFormDataEdit.append('tags', this.tagsEdit)
                axios({
                    method: 'PUT',
                    url: `${this.$baseUrl}/articles/${this.idEdit}`,
                    data: bodyFormDataEdit,
                    headers: {
                        token: localStorage.token
                    }
                })
                .then(({data}) => {
                    this.fetchMyArticles()
                    this.showList()
                })
                .catch(err => {
                    const error = err.response.data.error.join('\n')
                    this.$swal({
                        title: `<span style="color:#FFFFFF; font-size:15px">${error}</span>`,
                        })        
                    })            
            },
            deleteData(id) {
                axios({
                    method: 'DELETE',
                    url: `${this.$baseUrl}/articles/${id}`,
                    headers: {
                        token: localStorage.token
                    }
                })
                .then(({data}) => {
                    this.fetchMyArticles()
                })
                .catch(err => {
                    const error = err.response.data.error.join('\n')
                    this.$swal({
                        title: `<span style="color:#FFFFFF; font-size:15px">${error}</span>`,
                        })        
                    })            
            },
            deleteDropFileAdd(index) {
                this.dropFilesAdd.splice(index, 1)
            },
            deleteDropFileEdit(index) {
                this.dropFilesEdit.splice(index, 1)
            },
            addArticle() {
                let bodyFormData = new FormData()
                bodyFormData.append('title', this.titleAdd)
                bodyFormData.append('content', this.contentAdd)
                bodyFormData.append('file', this.dropFilesAdd[0])
                bodyFormData.append('tags', this.tagsAdd)
                axios({
                    method: 'POST',
                    url: `${this.$baseUrl}/articles`,
                    data: bodyFormData,
                    headers: {
                        token: localStorage.token
                    }
                })
                .then(({data}) => {
                    this.fetchMyArticles()
                    this.showList()
                })
                .catch(err => {
                    const error = err.response.data.error.join('\n')
                    this.$swal({
                        title: `<span style="color:#FFFFFF; font-size:15px">${error}</span>`,
                        })        
                    })            
            },
            fetchMyArticles() {
                axios({
                    method: 'GET',
                    url: `${this.$baseUrl}/articles/user`,
                    headers: {
                        token: localStorage.token
                    }
                })
                .then(({data}) => {
                    let rawdata = []
                    for (let i=0; i<data.length; i++) {
                        let obj = data[i]
                        obj.createdAt = obj.createdAt.split('T')[0]
                        obj.tags = obj.tags.join(', ')
                        obj.no = i+1
                        rawdata.push(obj)
                    }
                    this.data = rawdata
                    console.log(data)
                })
                .catch(err => {
                    const error = err.response.data.error.join('\n')
                    this.$swal({
                        title: `<span style="color:#FFFFFF; font-size:15px">${error}</span>`,
                        })        
                })            
            },
            showAddForm() {
                this.needList = false
                this.needAdd = true
                this.needEdit = false
            },
            showList() {
                this.needList = true,
                this.needAdd = false,
                this.needEdit = false
            }
        },
        created() {
            this.fetchMyArticles()
        }
}
</script>

<style>

</style>