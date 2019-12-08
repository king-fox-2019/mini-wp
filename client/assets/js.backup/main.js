const app = new Vue({
    el: '#app',
    data: {
        article: "",
        author: "",
        message: "",
        quill: "",
        title: "",
        category: "",
        featured_image: ""
    },
    methods: {
        fetchArticle: function () {
            axios
                .get("http://localhost:3000/articles")
                .then(({data}) => {
                    this.article = data;
                })
                .catch(err => {
                    this.message = err
                })
        },
        fetchProfile: function () {
            axios
                .get("http://localhost:3000/authors", {
                    params: {
                        id: 1
                    }
                })
                .then(({data}) => {
                    this.author = data[0]
                })
                .catch(err => {
                    this.message = err
                })
        },
        submitArticle: function (e) {
            e.preventDefault()

            if (this.title === "") {
                swal({
                    title: "Warning?",
                    text: "Title must not be empty",
                    type: "warning",
                    confirmButtonClass: "btn-danger",
                    closeOnConfirm: false
                });
                return
            }

            swal({
                title: "Are you sure?",
                text: "Your article will be saved",
                type: "info",
                showCancelButton: true,
                cancelButtonClass: "btn btn-primary",
                confirmButtonClass: "btn btn-danger",
                confirmButtonText: "Yes, save it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    swal("Saved!", "Your article has been saved.", "success");
                    submitOk();
                } else {
                    swal("Cancelled", "Your your article not saved", "error");
                }
            });

            const submitOk = () => {
                let formData = new FormData();
                formData.set('title', this.title);
                formData.set('category', this.category);
                formData.set('author',this.author._id);
                formData.set('content', this.quill.root.innerHTML);
                formData.set('quillContent', this.quill.getContents());
                formData.set('featured_image', this.featured_image);

                axios({
                    method: "post",
                    url: "http://localhost:3000/articles",
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then((response) => {
                    this.message = response;
                    this.fetchArticle()
                }).catch(err => {
                    this.message = err
                });
            };
        },
        deleteArticle: function (id) {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                cancelButtonClass: "btn btn-primary",
                confirmButtonClass: "btn btn-danger",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    swal("Deleted!", "Your imaginary file has been deleted.", "success");
                    deleteOk();
                } else {
                    swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });

            const deleteOk = () => {
                axios
                    .delete(`http://localhost:3000/Articles/${id}`)
                    .then((response) => {
                        this.message = response;
                        this.fetchArticle();
                    })
                    .catch(err => {
                        this.message = err
                    });
            }
        },
        handleFileUpload: function () {
            this.featured_image = this.$refs.featured_image.files[0];
        }
    },
    created() {
        this.fetchArticle();
        this.fetchProfile();
    },
    mounted() {
        this.quill = new Quill('#editor', {
            theme: 'snow',
            placeholder: 'input content of your article here'
        });
    }
});