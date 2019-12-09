<template>
    <div>
        <div class="container d-flex flex-column">
            <div class="d-flex flex-column article-head">
                <div class="d-flex flex-column">
                    <div class="d-flex flex-column">
                        <h1 id="detail-title">{{ detailArticle.title }}</h1>
                    </div>
                    <div class="my-2">
                        <p class="text-muted">{{ dateCreate(detailArticle.createdAt) }}</p>
                    </div>
                    <div class="d-flex align-items-center my-1">
                        <span class="mr-2"><img :src="detailArticle.author.avatar" id="avatar-user"></span>
                        <h2><strong>{{ detailArticle.author.username }}</strong></h2>
                        <p class="ml-2 text-muted">{{ currentTime(detailArticle.createdAt) }}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="my-3 d-flex">
                            <span v-for="(data,index) in detailArticle.tags" :key="index" class="badge badge-pill badge-info">{{data}}</span>
                        </div>
                        <div>
                            <span class="mr-3 edit-article" @click.prevent="editArticle(detailArticle._id)"><i class="far fa-edit" style="color: green; font-size: 24px"></i></span>
                            <span @click.prevent="deleteArticle(detailArticle._id)" class="delete-article"><i class="far fa-trash-alt" style="color: red; font-size: 24px"></i></span>
                        </div>
                    </div>
                    <div>
                        <img :src="detailArticle.featured_image" id="head-image">
                    </div>
                </div>
            </div>
            <div class="mt-5 pt-5">
                <div v-html="detailArticle.content"></div>
            </div>
        </div>
    </div>
</template>

<script>

import moment from 'moment'
import articleServer from '../../api/article'
import Alert from '../public/Alert'

export default {
    props: ['detailArticle'],
    methods:{
        dateCreate(val){
            return moment(val).format('LLLL')
        },
        currentTime(val){
            return moment(val).startOf('minutes').fromNow()
        },
        editArticle(id){
            this.$emit('edit-article', id)
        },
        deleteArticle(id){
            Alert.Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    articleServer({
                        url: `/${id}`,
                        method: 'DELETE',
                        headers:{
                            access_token: localStorage.getItem('token')
                        }
                    })
                    .then(({data})=>{
                        Alert.Toast.fire({
                            icon: 'success',
                            title: 'Delete Article',
                            text: 'Delete Success!'
                        })
                        this.$emit('go-homepage')
                    })
                    .catch(err => {
                        Alert.Swal.fire({
                            icon: 'error',
                            title: 'Delete Article',
                            text: `${err.response.data.message}`
                        })
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Bitter&display=swap');

#head-image{
    width: 100%;
    height: 500px;
}

#avatar-user{
    height: 32px;
    width: 32px;
    border-radius: 50%;
}

#detail-title{
    font-family: 'Bitter', serif;
    font-size: 68px;
}

.delete-article{
    cursor: pointer;
}

.edit-article{
    cursor: pointer;
}
</style>