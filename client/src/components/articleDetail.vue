<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-sm mb-3" v-for="article in data" :key='article.id'>
                <div class="card" style="width: 18rem;">
                    <img src="https://images.glints.com/unsafe/1024x0/glints-dashboard.s3.amazonaws.com/company-logo/61e556967f6e6c34b5b704c2e6f2043d.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{article.title}}</h5>
                        <p class="card-text">{{article.author.fullname}}</p>
                        <a href="#" class="btn btn-primary" data-toggle="modal" @click="sentToModal(article)"  data-target="#exampleModalScrollable">READ</a>
                    </div>
                </div>
                <div class="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalScrollableTitle">{{title}}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <article v-html="content"></article>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'detail',
    props: ['data'],
   
    data() {
        return {
            viewMore: false,
            title: '',
            content: '',
            author: '',
            createdAt: '',
        };
    },
    methods: {
        sentToModal: function(article) {
            this.title = article.title
            this.content = article.content
            this.author = article.author
            this.createdAt = article.createdAt
        }
    }
};
</script>

<style scoped>
</style>