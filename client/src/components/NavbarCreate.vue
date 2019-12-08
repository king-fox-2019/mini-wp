<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light p-0" style="background-color: #FFFFFF; border: 1px solid #E2E4E7">
        <div class="row" style="border-right: 1px solid #E2E4E7">
            <div class="ml-2 col-3 py-2">
                <button @click.prevent="back" type="button" class="btn-navbar-create p-2 px-3 rounded-top rounded-bottom rounded-left rounded-right">
                    <i class="fas fa-chevron-left" style="color:#555D66"></i>
                </button>
            </div>
        </div>
        <div class="ml-auto mr-5">
            <button @click.prevent="publishArticle" type="button" class="btn btn-sm btn-primary">
                Publish..
            </button>
        </div>  
    </nav>
</div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        back(){
            this.$emit('back')
        },
        publishArticle(){
            this.$emit('publish')
        }
    },
}
</script>

<style scoped>
.btn-navbar-create{
    border: none;
    background-color: #FFFFFF;
    transition: 0.5s;
}
.btn-navbar-create:hover{
    border: 1px solid #555D66;
}
.btn-navbar-create:focus {
    outline: none;
    border: none;
}
</style>