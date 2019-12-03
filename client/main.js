// var quill = new Quill('#editor', {
//   theme: 'snow'
// });

let app = new Vue({
  el: '#app',
  data: {
    posts: [],
    search: '',
    page: 'posts',
    error: ''
  },
  methods: {
    showPosts: function(){
      axios({
        method:'get',
        url: 'http://localhost:3000'
      })
        .then((result) => {
          this.posts = result.data.reverse()
          this.page = 'posts'
        })
        .catch((err) => {
          this.error = err
        })
    },
    showCreatePost: function(){
      this.page = 'create'
    },
    showOnePost: function(id){
      axios({
        method:'get',
        url: `http://localhost:3000/${id}`
      })
        .then((result) => {
          this.posts = [result.data]
          this.page = 'onePost'
        })
        .catch((err) => {
          this.error = err
        })
    },
    showEditPost: function(id){
       axios({
        method:'get',
        url: `http://localhost:3000/${id}`
      })
        .then((result) => {
          this.page = 'edit'
          this.posts = [result.data]
        })
        .catch((err) => {
          this.error = err
        })
    },
    deletePost: function(id){
      axios({
        method: 'delete',
        url: `http://localhost:3000/${id}`
      })
        .then(() => {
          this.showPosts()
        })
        .catch((err) => {
          this.error = err
        })
    },
    editPost: function(id){
      let title = document.getElementById('editTitle').value
      let content = document.getElementById('editContent').value
      // let content = quill.root.innerHTML
      axios({
        method:'patch',
        url: `http://localhost:3000/${id}`,
        data: { title, content }
      })
        .then((data)=>{
          this.showPosts()
          this.page = 'posts'
        })
        .catch((err) => {
          this.error = err
        })
    },
    post: function(){
      let title = document.getElementById('title').value
      let content = document.getElementById('content').value
      // let content = quill.root.innerHTML
      axios({
        method:'post',
        url: 'http://localhost:3000',
        data: { title, content }
      })
        .then((data)=>{
          this.showPosts()
          this.page = 'posts'
        })
        .catch((err) => {
          this.error = err
        })
    }
  },
  mounted(){
    this.showPosts()
  }
})
