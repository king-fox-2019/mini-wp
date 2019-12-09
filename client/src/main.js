"use strict";

import Vue from "vue";
import App from "./App.vue";
import SuiVue from "semantic-ui-vue";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.snow.css";
// import GSignInButton from "vue-google-signin-button";
Vue.use(VueQuillEditor);
// Vue.use(GSignInButton);

new Vue({
  render: h => h(App)
}).$mount("#app");
Vue.use(SuiVue);

// Vue.use(VueQuillEditor)

// let app = new Vue({
//   el: '#app',
//   data: {
//     showPage: "articles",
//     articles: [],
//     article: "",
//     errors: "",
//     title: "",
//     tags: "",
//     id: "",
//     image: "",
//     search: "",
//     content1: "",
//     content2: "",
//     editorOption: {
//       theme: 'snow'
//     }
//   },
//   components: {
//     LocalQuillEditor: VueQuillEditor.quillEditor
//   }, methods: {
//     showPost: function() {
//       this.showPage = "post";
//     },
//     showArticles: function() {
//       this.getArticles()
//       this.showPage = "articles";
//     },
//     showEdit: function(obj) {
//       this.title = obj.title;
//       this.tags = obj.tags;
//       this.content2 = obj.content;
//       this.image = obj.image;
//       this.id = obj.id;
//       this.showPage = "edit";
//     },
//     showArticle: function(id) {
//       this.getArticle(id)
//       this.showPage = "article";
//     },
//     getArticles: function() {
//       axios.get('http://localhost:5000/articles')
//         .then(articles => {
//           this.articles = articles.data
//         })
//         .catch(err => {
//           this.errors = err;
//         })
//     },
//     getArticle: function(id) {
//       axios.get(`http://localhost:5000/articles/${id}`)
//         .then(article => {
//           this.article = article.data
//         })
//         .catch(err => {
//           this.errors = err;
//         })
//     },
//     addArticle: function() {
//       let title = document.getElementById('add-title').value
//       let content = this.content1
//       let image = document.getElementById('add-image').value
//       let tags = document.getElementById('add-tags').value
//       axios.post('http://localhost:5000/articles', {
//         title: title,
//         content: content,
//         tags: tags,
//         image: image
//       })
//         .then(article => {
//           return this.showArticle(article.data._id);
//         })
//         .catch(err => {
//           this.errors = err;
//         })
//     },
//     editArticle: function() {
//       let title = document.getElementById('edit-title').value
//       let content = this.content2
//       let tags = document.getElementById('edit-tags').value
//       let image = document.getElementById('edit-image').value
//       axios.put(`http://localhost:5000/articles/${this.id}`, {
//         title: title,
//         content: content,
//         tags: tags,
//         image: image
//       })
//         .then(() => {
//           this.showArticle(this.id);
//         })
//         .catch(err => {
//           this.errors = err;
//         })
//     },
//     deleteArticle: function(id) {
//       axios.delete(`http://localhost:5000/articles/${id}`)
//         .then(() => {
//           this.showArticles();
//         })
//         .catch(err => {
//           this.errors = err;
//         })
//     },
//     updateData: function (data) {
//       this.content1 = data
//     },
//     onEditorBlur(quill) {
//       console.log('editor blur!', quill)
//     },
//     onEditorFocus(quill) {
//       console.log('editor focus!', quill)
//     },
//     onEditorReady(quill) {
//       console.log('editor ready!', quill)
//     }
//   }, computed: {
//     editorA() {
//       return this.$refs.quillEditorA.quill
//     },
//     editorB() {
//       return this.$refs.quillEditorB.quill
//     }
//   }, mounted() {
//     this.showArticles()
//   }
// })
