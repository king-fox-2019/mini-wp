// const axios = require('axios');
var app = new Vue({
    el: "#app",
    data: {
        message: "hello",
        search: '',
        article: [],
        title: '',
        content: '',
        id_skrg: ''
    },
    methods: {
        getArticle: function () {
            axios.get("http://localhost:3000/article")
                .then((result) => {
                    this.article = result.data
                })
                .catch((err) => console.log(err));
        },
        postArticle: function () {
            axios({
                url: "http://localhost:3000/article",
                method: "post",
                data: {
                    title: this.title,
                    content: this.content
                }
            })
                .then((result) => {
                    this.title = ''
                    this.content = ''
                    this.getArticle()
                    $("#form_modal").modal("toggle")
                })
                .catch((err) => console.log(err));
        },
        deleteArticle: function (id) {
            axios({
                url: `http://localhost:3000/article/${id}`,
                method: "delete"
            })
                .then((result) => {
                    this.getArticle()
                    console.log(`${result.data} terhapus qaqa`);
                })
                .catch((err) => console.log(err.message));
        },
        updateArticle: function () {
            axios({
                url: `http://localhost:3000/article/${this.id_skrg}`,
                method: "PUT",
                data: {
                    title: this.title,
                    content: this.content
                }
            })
                .then((result) => {
                    this.title = ''
                    this.content = ''
                    this.getArticle()
                    $("#form_modal_update").modal("toggle")
                })
                .catch((err) => console.log(err));
        },
        setId: function (params) {
            axios.get(`http://localhost:3000/article/${params}`)
                .then((result) => {
                    this.title = result.data.title
                    this.content = result.data.content
                    this.id_skrg = params
                })
                .catch((err) => console.log(err));
            // console.log(params);
        }
    }
})