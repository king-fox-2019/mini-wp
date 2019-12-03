const vue = new Vue({
    el: '#app',
    data: {
        showPage: 'home',
        articles:null,
        title:'',
        content:''
    },
    methods: {
        changePage: function(page){
            this.showPage = page
        },
        getArticles: function(){
            axios({
                method: 'get',
                url:`http://localhost:3000/articles/all`
            })
            .then(result=>{
                console.log(result)
                console.log('length data', result.data.length)
                
                this.articles = result
                console.log('article nih', this.articles)
                console.log(this.articles.data[0].content)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        createArticles: function(){
            event.preventDefault()
            // console.log(this.title)
            // console.log(this.content)

            const createdAt = new Date()
            axios({
                method:'post',
                url:`http://localhost:3000/articles`,
                data: {
                    title:this.title,
                    content:this.content,
                    createdAt
                }
            })
            .then(result=>{
                console.log(result)
                this.title = ''
                this.content = ''
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    mounted(){
        // axios
        //     .get(`http://localhost:3000/articles/all`)
        //     .then(result=>{
        //         console.log("TCL: mounted -> result", result)
        //         this.articles = result
        //     })
        //     .catch(err=>{
        //         console.log('error nih')
        //         console.log(err)
        //     })
    },
    created(){
        this.getArticles()
    }
})