<template>
    <span @click.prevent="search" v-if="i % 2 == 0" class="badge badge-primary ml-1 taggedButton">{{ tag }}</span>
    <span @click.prevent="search" v-else-if="i % 3 == 0" class="badge badge-danger ml-1 taggedButton">{{ tag }}</span>
    <span @click.prevent="search" v-else-if="i % 4 == 0" class="badge badge-warning ml-1 taggedButton">{{ tag }}</span>
    <span @click.prevent="search" v-else-if="i % 5 == 0" class="badge badge-success ml-1 taggedButton">{{ tag }}</span>
    <span @click.prevent="search" v-else-if="i % 6 == 0" class="badge badge-secodary ml-1 taggedButton">{{ tag }}</span>
    <span @click.prevent="search" v-else-if="i == 1" class="badge badge-info ml-1 taggedButton">{{ tag }}</span>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../../apis/server'
export default {
    props : ['tag','i'],
    methods: {
        search(){
            Swal.fire({
                title: 'Searching Article!',
                text: `by tag ${this.tag}`,
                imageUrl: 'https://loading.io/mod/spinner/magnify/index.svg',
                // imageWidth: 400,
                // imageHeight: 200,
                // timer: 2500,
                imageAlt: 'Custom image',
                showConfirmButton: false,
                showCancelButton: false,
                confirmButtonText: 'نعم',
                cancelButtonText: 'لا',
            })
            let form = {
                tag : this.tag
            }
            axios({
                url : '/article/tag',
                method : 'POST',
                headers : {
                    token : localStorage.getItem('token')
                },
                data : form
            })
            .then(({ data })=>{
                this.$emit('changeListTag', data.articles, this.tag)
                Swal.close()
            })
            .catch(err=>{
                console.log(err);
                Swal.close()
            })
        }
    }
}
</script>

<style scoped>
.taggedButton{
    cursor: pointer;
    transition: 0.5s;
}
.taggedButton:hover{
    background-color: rgb(143, 143, 143);
    color: rgb(0, 0, 0);
}
</style>