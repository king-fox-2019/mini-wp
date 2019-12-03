
var app = new Vue({
  el: '#app',
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString(),
    status : '',
    articles : [],
    title: '',
    content:'',
    updateData: false,
    quill: null
  },
  methods:{
    changeNew : function() {
      this.status = 'newArticle'
    },
    changeMy : function () {
      this.getData()
      this.status = 'myArticle'
    },
    getData : function(){
      // this.quill = new Quill('#editor', {
      //   theme: 'snow'
      // });
          axios({
            url: 'http://localhost:3000/article',
            method: 'GET',
          })
          .then(({data}) => {
            this.articles = data;
          })
          .catch(function (error) {
            console.log(error);
          })
       
    },
    save: function (){
      // let isi = this.quill.getContents()
      axios({
        url: 'http://localhost:3000/article',
        method: 'POST',
        data:{
          title: this.title,
          content: this.content,
          created_at: new Date(),
        }
      })
      .then(({data}) => {
        this.title = ''
        this.content = ''
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    destroy: function(id){
      axios({
        url: `http://localhost:3000/article/${id}`,
        method: 'delete',
      })
      .then(({data}) => {
       this.changeMy()
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    update: function(id){
      axios({
        url: `http://localhost:3000/${id}`,
        method: 'get',
      })
      .then(({data}) => {
        console.log(data)
       this.updateData = data
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  },
  created(){
    this.getData()
  },
  mounted(){
  
  }
})



 