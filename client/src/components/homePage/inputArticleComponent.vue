<template>
    <form class="w-100" @submit.prevent="submitArticle" action="" enctype="multipart/form-data">
        <label for="article-title">Title</label>
        <div class="field">
            <div class="ui input">
                <input type="text"
                       id="article-title"
                       placeholder="Title"
                       v-model="title"
                       size="100"
                       required>
            </div>
        </div>

        <label for="article-category">Category</label>
        <div class="field">
            <div class="ui input">
                <input type="text"
                       id="article-category"
                       placeholder="Category"
                       v-model="category"
                       size="50"
                       required>
            </div>
        </div>

        <div class="field">
            <div class="ui input">
                <input type="file" ref="featured_image" name="featured_image" @change="handleFileUpload"/>
            </div>
        </div>

        <label>Content</label>
        <div class="field">
            <local-quill-editor v-model="content"
                                ref="quillEditor"
                                :options="editorOption">
            </local-quill-editor>
        </div>

        <div class="field">
            <button class="ui button" type="submit" class="btn btn-primary">Submit</button>
        </div>
        </div>

    </form>
</template>

<script>
    import {instance} from "../../../config/axiosConfig";

    export default {
        name: "inputArticleComponent",
        data() {
            return {
                title: "",
                category: "",
                featured_image: "",
                content: "",
                editorOption: {
                    theme: 'snow'
                }
            }
        },
        methods: {
            submitArticle: function () {
                let formData = new FormData();
                formData.set('title', this.title);
                formData.set('category', this.category);
                formData.set('content', this.content);
                formData.set('quillContent', this.content);
                formData.set('featured_image', this.featured_image);

                instance({
                    method: "post",
                    url: "/articles",
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        token: localStorage.token
                    }
                }).then(({data}) => {
                    this.$emit('clicked');
                    console.log(data)
                }).catch(err => {
                    console.log(err)
                });
            },
            handleFileUpload: function () {
                this.featured_image = this.$refs.featured_image.files[0];
            }
        },
        components: {
            LocalQuillEditor: VueQuillEditor.quillEditor
        }
    }
</script>

<style scoped>
.field{
    margin: 10px;
}
</style>