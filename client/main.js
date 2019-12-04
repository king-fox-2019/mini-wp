'use strict';


const BASE_URL = 'http://localhost:3000'

const miniWp = new Vue({
  el: "#body",
  data: {
    id: '',
    isLogged: false,
    page: "home",
    nav: "mySite",
    showPost: false,
    article: "",
    content: "",
    blogposts: [
      {
        id: 1,
        title: "Belajar Vue.js",
        article: "Baca dokumentasi"
      },
      {
        id: 2,
        title: "Belajar Vue.js",
        article: "Nonton yucup"
      }
    ]
  },
  methods: {
    navbar: function(ref) {
      this.nav = ref
    },
    editForm: function(data){
      this.page = 'edit'
      this.article = data.title
      this.content = data.content
      this.id = data._id
    },
    pageControl: function(index) {
      if(!this.isLogged) {
        swal.fire({
          title: "HELLO",
          text: "PLEASE LOGIN OR REGISTER!"
        });
      } else {
        this.fetchData();
        this.page = index
      }
    },
    submitEdit: function() {
      let newTitle = document.getElementById('titleEdit').value
      let newContent = document.getElementById('contentEdit').value
      let idEdit = document.getElementById('idEdit').value
      axios({
        method: "PATCH",
        url: `${BASE_URL}/article`,
        data: {
          id: idEdit,
          title: newTitle,
          content: newContent
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(_ => {
          this.page = "showPost";
          this.fetchData();
        })
        .catch(_ => {
          swal({
            title: "ERROR",
            message: "INTERNAL SERVER ERROR"
          });
        });
    },
    register: function() {
      let fullname =  document.getElementById('fullname').value
      let email = document.getElementById('emailRegist').value
      let password = document.getElementById('passwordRegist').value
      axios({
        method: 'post',
        url: `${BASE_URL}/user`,
        data: {
          fullname,
          email, 
          password
        }
      })
        .then(({data})=> {
          
        })
        .catch(({data})=> {
          console.log(err)
        })
    },
    sentLogin: function() {
     if(localStorage.getItem('token')) {
       localStorage.removeItem('token')
       this.isLogged = false
       this.page = ''
     } else {
       axios({
        method: 'POST',
        url: `${BASE_URL}/user/login`,
        data: {
          email: document.getElementById('emailLogin').value,
          password: document.getElementById('passwordLogin').value
        }
       })
        .then(({data})=> {
          localStorage.setItem('token', data)
          this.isLogged = true
        })
        .catch(err=> {
          console.log(err)
        })
     }
    },
    fetchData: function() {
        axios({
          method: "GET",
          url: "http://localhost:3000/article"
        })
          .then(({ data }) => {
            data.forEach(post => {
              let dataCreate = new Date(post.createdAt).toDateString();
              post.createdAt = new Date(dataCreate)
            });
            this.blogposts = data;
          })
          .catch(_ => {
            swal({
              title: 'ERROR',
              message: 'INTERNAL SERVER ERROR'
            })
          });
    },
    addPost: function() {
      let newPost = {
        title: this.article,
        content: this.content
      };
      axios({
        method: "POST",
        url: `${BASE_URL}/article`,
        data: {
          title: this.article,
          content: this.content
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.fetchData();
          this.page = "showPost";
          this.article = "";
          this.content = "";
        })
        .catch(_ => {
          swal({
            title: "ERROR",
            message: "INTERNAL SERVER ERROR"
          });
        });
    }
  },
  created() {
    if(localStorage.getItem('token')){
      this.isLogged = true
    }
    console.log('Ready!')
  }
});

/* SWAL */

