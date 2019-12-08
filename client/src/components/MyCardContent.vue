<template>
    <div class="card mt-3 ml-3">
        <div class="card-head ">
            <h1 class="card-title mt-3 text-center">
                {{ article.title }}</h1>
            <img :src="article.image" style="width: 100%;" class="card-img-top" alt="image">
        </div>
        <div class="card-body pt-0 pb-1 mt-3">
            <div class="text-center" v-html="article.content"></div>
        </div>
        <div class="mr-2 d-flex flex-row mb-1">
            <span class="ml-2 d-flex align-items-end" style="font-size:14px;">
                <i>
                    <i class="fas fa-clock"></i>
                    {{ new Date(article.createdAt) | moment("from", "now") }}
                </i>
            </span>
            <div class="ml-auto mt-1 mb-2">
                <button @click.prevent="deleted(article._id)" type="button" class="mt-1 btn btn-primary p-0 px-1 btn-delete-article" style="background-color: #FFFFFF; border: none;">
                    <i class="fas fa-trash-alt" style="font-size:35px;"></i>
                </button>
                <button type="button" data-toggle="modal" :data-target="'#myArticle'+article._id" class="mt-1 btn btn-primary p-0 px-1 btn-edited-article" style="background-color: #FFFFFF; border: none;">
                    <i class="fas fa-book-open " style="font-size:35px;"></i>
                </button>
            </div>
        </div>
        <div class="card-footer p-1">
            <card-tags
                v-for="(tag,i) in article.tag" :key="i"
                :tag="tag"
                :i="i"
                ></card-tags>
        </div>
        <!-- Modal -->
        <div class="modal fade" :id="'myArticle'+article._id" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Reader</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <span class="mr-2 d-flex flex-row-reverse" style="font-size:14px;">
                    <i>
                        <i class="fas fa-clock"></i>
                        {{ new Date(article.createdAt) | moment("from", "now") }}
                    </i>
                </span>
                <h1 class="mt-0 text-center mb-2" style="font-size: 5em;"> {{ article.title }}</h1>
                <img :src="article.image" style="width: 100%;" class="card-img-top" alt="image">
                <card-tags
                class="mr-auto mb-3 ml-3"
                v-for="(tag,i) in article.tag" :key="i"
                :tag="tag"
                :i="i"
                ></card-tags>
                <div class="text-center mt-2" v-html="article.content"> </div>
            </div>
            <div class="modal-footer">
                <button type="button" @click.prevent="edited" data-toggle="modal" data-dismiss="modal" data-target="#myArticle" class="mt-1 btn btn-primary p-0 px-1 btn-edited-article" style="background-color: #FFFFFF; border: none;">
                    <i class="fas fa-edit" style="font-size:35px;"></i>
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import Tags from '../components/ListTag'
import axios from '../../apis/server'
const toolbarOptions = [];
export default {
    props : ['article'],
    data() {
        return {
            styleBackground : `background: url('${this.article.author.image[0]}'); background-size: 100% ;height: 40px; width: 40px; border: 2px solid white;`,
            selectedText : '',
            content : {
                props : []
            },
            config: {
                modules : {
                    toolbar : toolbarOptions,
                },
                readOnly: true,
                placeholder: ``,
                theme: 'bubble'
            }
        }
    },
    components : {
        'card-tags' : Tags
    },
    methods: {
        deleted(id){
            Swal.fire({
                title: 'Delete Success!',
                // icon : 'success',
                text: '',
                imageUrl: 'https://loading.io/mod/spinner/square/index.svg',
                // imageWidth: 400,
                // imageHeight: 200,
                // timer: 5500,
                imageAlt: 'Custom image',
                showConfirmButton: false,
                showCancelButton: false,
                confirmButtonText: 'نعم',
                cancelButtonText: 'لا',
            })
            axios({
                url : `/article/${id}`,
                method : 'DELETE',
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({ data })=>{
                this.$emit('findAllArticles')
                Swal.close()
            })
            .catch(err=>{
                console.log(err);
                Swal.close()
            })
        },
        edited(){
            this.$emit('editedTrigger',this.article)
        }
    },
}
</script>

<style scoped>
.btn-delete-article{
    color: rgb(26, 26, 26);
    transition: 0.5s;
}

.btn-delete-article:hover{
    color: rgb(218, 8, 8);
}

.btn-edited-article{
    color: rgb(26, 26, 26);
    transition: 0.5s;
}

.btn-edited-article:hover{
    color: rgb(60, 163, 19);
}

.btn-read-article{
    color: rgb(26, 26, 26);
    transition: 0.5s;
}

.btn-read-article:hover{
    color: #2E73B2;
}
</style>