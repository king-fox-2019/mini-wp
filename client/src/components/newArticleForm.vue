<template>
  <transition name="fade">
        <section id="new-article">

            <form action="" id="add-article">

                <input type="text" v-model="title" class="mb-4" placeholder="Write your epic Title here...">

                <wysiwyg style="height:200px" class="mb-4" v-model="content"></wysiwyg>

                <input type="text" v-model="tags" class="mb-4" placeholder="Separate Tags with comma...">

                <input type="submit" value="Save" class="btn btn-primary"
                    @click.prevent="createArticle()">

            </form>
        </section>
    </transition>
</template>

<script>
import server from '../../api/server'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            title: '',
            content: '',
            tags: ''
        }
    },
    methods: {
        createArticle() {
            let  tags = this.tags
            tags = tags.split(',')
            server({
                method: 'post',
                url: '/articles',
                data: {
                    title: this.title,
                    content: this.content,
                    tags: tags
                },
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(result => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Article has been saved'
                    })
                    this.title = '',
                    this.content = '',
                    this.tags = ''
                    // this.showListArticle()
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message
                    })
                })
        }
    }
}
</script>

<style scoped>
    #new-article {
        width: 80%;
        margin: 2rem auto;
    }
</style>