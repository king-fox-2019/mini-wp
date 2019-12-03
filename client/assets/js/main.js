  let vuejs = new Vue({
    el: '#wrapper',
    data: {
      articles : [],
      add_title : '',
      add_category:'',
      add_content:null,
      edit_id:'',
      edit_title:'',
      edit_category:'',
      edit_content:null,
      delete_id:'',
      search_value:''
    },
    methods:{
      fetchArticle(){
        axios({
          url:'http://localhost:3000/article',
          method:'get'
        })
          .then (({data}) => {
            this.articles = data
          })
          .catch ((err) => {

          })
      },
      dateNow() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
      },
      create(){
        let title = this.add_title
        let category = this.add_category
        let created_at = this.dateNow()
        let content = this.add_content.root.innerHTML

        axios({
          url:'http://localhost:3000/article',
          method:'post',
          data:{ title, category, created_at, content }
        })
          .then (({data}) => {
            this.fetchArticle()
          })
          .catch(err => {

          })
          .finally(() => {
            this.add_content.setContents([{ insert: '\n' }]);
            $('#myModal').modal('toggle'); 
            this.add_title = ''
          })
      },
      clickUpdate(index){
        this.edit_id = this.articles[index]._id
        this.edit_title = this.articles[index].title
        this.edit_category = this.articles[index].category
        this.edit_content.root.innerHTML = this.articles[index].content;
      },
      clickDelete(index){
        this.delete_id = this.articles[index]._id
      },
      drop(){
        let id = this.delete_id
        axios({
          url:'http://localhost:3000/article',
          method:'delete',
          data:{ id }
        })
          .then (({data}) => {
            this.fetchArticle()
          })
          .catch(err => {

          })
          .finally(() => {
            $('#deleteModal').modal('toggle'); 
          })
      },
      update(){
        let id = this.edit_id
        let title = this.edit_title
        let category = this.edit_category
        let content = this.edit_content.root.innerHTML
        axios({
          url:'http://localhost:3000/article',
          method:'put',
          data:{ id, title, category, content }
        })
          .then (({data}) => {
            this.fetchArticle()
          })
          .catch(err => {

          })
          .finally(() => {
            this.add_content.setContents([{ insert: '\n' }]);
            $('#editModal').modal('toggle'); 
            this.add_title = ''
          })
      }
    },
    mounted(){
      this.add_content = new Quill('#add_content', {
        theme: 'snow'
      });

      this.edit_content = new Quill('#edit_content', {
        theme: 'snow'
      });
    },
    created(){
      this.fetchArticle()
    }
  })