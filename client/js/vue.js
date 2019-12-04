let baseUrl = 'http://localhost:3000'

var app = new Vue({
  el: "#app",
  data: {
    register: false,
    loggedIn: false,
    showDasboard : true,
    showListPost: false,
    showAddPost: false,
    showSubMenu: false,
    articles: [],
    quill: null,
    title: null,
    nameRegister: "",
    emailRegister: "",
    passwordRegister: "",
    emailLogin: "",
    passwordLogin: "",
    contentSementara: ""
  },
  methods: {
    logout: function() {
      localStorage.clear()
      this.checkLogin()
    },
    checkLogin: function() {
      if(localStorage.getItem("token")){
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    },
    submitLogin: function() {
      axios({
        method: 'POST',
        url: `${baseUrl}/user/login`,
        data: {
            email: this.emailLogin,
            password: this.passwordLogin
        }
      })
        .then( result => {
          this.emailLogin = ''
          this.passwordLogin = ''
          this.loggedIn = !this.loggedIn
          localStorage.setItem('token', result.data.token)
        })
    },
    submitRegister: function() {
      axios({
        method: 'POST',
        url: `${baseUrl}/user`,
        data: {
            name: this.nameRegister,
            email: this.emailRegister,
            password: this.passwordRegister
        }
      })
        .then(result => {
          this.nameRegister = ''
          this.emailRegister = ''
          this.passwordRegister = ''
          this.register = !this.register
        })
    },
    onSubmit: function() {
        let data = {
          title: this.title,
          content: this.quill.root.innerHTML,
          created_at: (new Date()).toString().split(' ').slice(0, 4).join(" ")
        }
        this.articles.push(data)
        axios({
            method: 'POST',
            url: `${baseUrl}/article`,
            data,
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(result => {
                console.log(result);
            });
    },
    changeListPost: function() {
        this.showDasboard = false
        this.showListPost = true
        this.showAddPost = false
    },
    changeAddPost: function() {
        this.showDasboard = false
        this.showAddPost = true
        this.showListPost = false
    },
    changeDashboard: function() {
        this.showDasboard = true
        this.showListPost = false
        this.showAddPost = false
    },
    fetchData: function() {
        axios({
            method: 'get',
            url: `${baseUrl}/article`
          })
            .then(result => {
                this.articles = result.data
            });
    }
  },
  created: function() {
      this.fetchData()
  },
  mounted: function () {
      this.checkLogin()
      this.quill = new Quill("#editor-container", {
        modules: {
          toolbar: [
            ["bold", "italic"],
            ["link", "blockquote", "code-block", "image"],
            [{ list: "ordered" }, { list: "bullet" }]
          ]
        },
        theme: "snow"
      });
  }
});
