const baseUrl = 'http://localhost:3000'

const miniWp = new Vue({
    el: '#miniWp',
    data: {
      articles: [],
      singleArticle: {},
      title: "",
      listArt: true,
      newArt: false,
      editArt: false,
      quillAdd: null,
      quilEdit: null
    },
    methods: {
        showNewArticle: function() {
            this.listArt = false
            this.editArt = false
            this.newArt = true
            this.getArticle()
        },
        showListArticle: function() {
            this.listArt = true
            this.editArt = false
            this.newArt = false
            this.getArticle()
        },
        getArticle: function() {
            axios({
                method: 'get',
                url: `${baseUrl}/articles`
            })
                .then(({data}) => {
                    data.forEach(article => {
                        for (const key in article) {
                            if (key === 'created_at') {
                                article.created_at = formatDate(article.created_at)
                            }
                        }
                    });
                    this.articles = data
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.message
                      })
                })
        },
        createArticle: function() {
            const title = document.getElementById('article-title').value
            const content = this.quill.root.innerHTML
            const created_at = Date.now()
            console.log(title, content, created_at)

            axios({
                method: 'post',
                url: `${baseUrl}/articles`,
                data: {
                    title,
                    content,
                    created_at
                } 
            })
                .then(result => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Article has been saved'
                    })
                    this.showListArticle()
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.message
                    })
                })
            
        },
        setEditArticle: function(id) {
            this.listArt = false
            this.editArt = true
            this.newArt = false
            
            axios({
                method: 'get',
                url: `${baseUrl}/articles/${id}`
            })
            .then(({ data }) => {
                console.log(data)
                const {title, content, created_at} = data
                this.singleArticle.title = title
                this.singleArticle.content = content
                this.singleArticle.created_at = created_at
                this.title = title
                console.log(this.singleArticle)
            })
        },
        editArticle: function(id) {
            axios({
                method: 'put',
                url: `${baseUrl}/articles/${id}`,
                data: {
                    title,
                    content,
                    created_at
                } 
            })
                .then(result => {
                    console.log('bisa')
                })
                .catch(err => console.log(err.message))
        },
        deleteArticle: function(id) {
            Swal.fire({
        
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then((result) => {
                if(result.value) {
                    axios({
                        method: 'delete',
                        url: `${baseUrl}/articles/${id}`
                    })
                        .then(result => {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            this.getArticle()
                        })
                        .catch(err => console.log(err))
                } else {

                }
            })
        },
        filter: function() {
            const findArticle = document.getElementById('search-input').value
            axios({
                method: 'get',
                url: `${baseUrl}/articles/${findArticle}`
            })
                .then(({data}) => {
                    data.forEach(article => {
                        for (const key in article) {
                            if (key === 'created_at') {
                                article.created_at = formatDate(article.created_at)
                            }
                        }
                    });
                    this.articles = data
                })
                .catch(err => console.log(err))
        }
    },
    created: function() {
        this.getArticle()
    },
    mounted: function () {
        this.quill = new Quill('#article-editor', {
            theme: 'snow'
        });
        // this.quill = new Quill('#article-updater', {
        //     theme: 'snow'
        // });
        
    }
})

function formatDate(date) {
    let formattedDate = new Date(date);
    
    let d = formattedDate.getDate();
    let m =  formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    
    if (d < 10) {d = `0${d}`}
    if (m < 10) {m = `0${m}`}

    let y = formattedDate.getFullYear();

    return `${y}-${m}-${d}`;
}