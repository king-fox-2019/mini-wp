<template>
<div>
    <div class="card mt-3">
        <div class="card-head">
            <div class="row">
                <div class="col-1 pr-0">
                    <div class="py-2 ml-3 pr-0">
                        <div :style="styleBackground" class="rounded-circle pr-0"> </div>
                    </div>
                </div>
                <div class="col ml-4 mt-2 pl-0 mb-0">
                    <div class="ml-1 mb-0">
                        <span style="font-size: 13px; font-weight: bold;">
                            {{ article.author.name }}
                        </span>
                        <span class="row ml-0" style="font-size: 10px;">
                            <span>{{ new Date(article.createdAt) | moment("from", "now") }}</span>
                        </span>
                    </div>
                </div>
                <div class="ml-auto mr-4 mt-2">
                    <!-- <button type="button" class="mt-1 btn btn-primary p-0 px-1 btn-delete-article" style="background-color: #FFFFFF; border: none;">
                        <i class="fas fa-trash-alt fa-2x"></i>
                    </button>
                    <button type="button" class="mt-1 btn btn-primary p-0 px-1 btn-edited-article" style="background-color: #FFFFFF; border: none;">
                        <i class="fas fa-edit fa-2x"></i>
                    </button> -->
                    <button type="button" data-toggle="modal" :data-target="'#myArticles'+article._id" class="btn btn-primary p-0 px-1 btn-read-article" style="transform: rotate(-30deg); background-color: #FFFFFF; border: none;">
                        <i class="fas fa-sign-out-alt fa-2x"></i>
                    </button>
                </div>
            </div>
        </div>
        <img :src="article.image" class="card-img-top" alt="image">
        <div class="card-body pt-0">
            <card-tags
                v-for="(tag,i) in article.tag" :key="i"
                :tag="tag"
                :i="i"
                @changeListTag="changeListTag"
                ></card-tags>
            <h1 class="card-title mt-3 text-center">{{ article.title }}</h1>
            <div class="text-center" v-html="article.content"></div>
        </div>
        <div class="modal fade" :id="'myArticles'+article._id" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                        {{ new Date(article.createdAt) | moment("from", "now") }}
                        <i class="fas fa-clock"></i>
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
                <vue-goodshare-facebook
                    :page_url="article.image[0]"
                    :page_title="article.title"
                    title_social="Facebook"
                    has_counter
                    has_icon
                    button_design="gradient"
                ></vue-goodshare-facebook>
                <vue-goodshare-email
                    :page_url="article.image[0]"
                    :page_title="article.title +' '+ article.content"
                    title_social="Email"
                    has_counter
                    has_icon
                    button_design="gradient"
                ></vue-goodshare-email>
                <vue-goodshare-Twitter
                    :page_url="article.image[0]"
                    :page_title="article.title +' '+ article.content"
                    title_social="Twitter"
                    has_counter
                    has_icon
                    button_design="gradient"
                ></vue-goodshare-Twitter>
            </div>
            </div>
        </div>
        </div>
    </div>
</div>
</template>

<script>
import VueGoodshareFacebook from "vue-goodshare/src/providers/Facebook.vue";
import VueGoodshareTwitter from "vue-goodshare/src/providers/Twitter.vue";
import VueGoodshareEmail from "vue-goodshare/src/providers/Email.vue";

import Tags from '../components/ListTag'
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
        'vue-goodshare-Twitter' : VueGoodshareTwitter,
        'vue-goodshare-email' : VueGoodshareEmail,
        'vue-goodshare-facebook' : VueGoodshareFacebook,
        'card-tags' : Tags
    },
    methods: {
        changeListTag(data, tag){
            this.$emit('changeListTag', data, tag)
        },
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