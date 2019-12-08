<template>
  <div class="demo-blog__posts mdl-grid">
    <div class="mdl-card mdl-cell mdl-cell--12-col">
              <div class="demo-back">
                  <a class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" href="#" @click='backToList' title="go back" role="button">
                    <i class="material-icons" role="presentation">arrow_back</i>
                  </a>
                </div>
                <div class="demo-blog__posts mdl-grid">
                  <div class="mdl-card mdl-shadow--4dp mdl-cell mdl-cell--12-col" >
                    <div class="mdl-card__media mdl-color-text--grey-50" :style="`background-image: url('${article.image}')`">
                      <h3>{{article.title}}</h3>
                    </div>
                    <div class="mdl-color-text--grey-700 mdl-card__supporting-text" v-if="editable">
                      <button class="mdl-button mdl-js-button mdl-button--primary" @click="deleteArticle">
                        delete article
                      </button>
                      <button class="mdl-button mdl-js-button mdl-button--primary" @click="editArticle">
                        edit article
                      </button>
                      <button class="mdl-button mdl-js-button mdl-button--primary" @click="showTagForm">
                        add tags
                      </button>
                      <div v-if="tagform">
                        <form @submit.prevent="addTag">
                          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="text" id="sample3" v-model="newTag" required>
                            <label class="mdl-textfield__label" for="sample3">Tags</label>
                          </div>
                          <button type="submit" class="mdl-button mdl-js-button mdl-button--accent">
                            add    
                          </button>
                        </form>
                      </div>
                    </div>
                    <div class="mdl-color-text--grey-700 mdl-card__supporting-text meta">
                      <div class="minilogo"></div>
                      <div>
                        <strong>{{article.author.username}}</strong>
                        <span>{{article.created_at}}</span>
                      </div>
                      <div class="section-spacer"></div>
                      <div style="margin-left:3px;" v-for="(tag, id) in article.Tags" :key="id">
                          <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                              {{tag}}
                          </button> &nbsp;
                      </div>
                    </div>
                    
                    
                    <div class="mdl-color-text--grey-700 mdl-card__supporting-text" v-html="article.content">
                      <p>
                        Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit. Velit anim eiusmod labore sit amet. Voluptate voluptate irure occaecat deserunt incididunt esse in. Sunt velit aliquip sunt elit ex nulla reprehenderit qui ut eiusmod ipsum do. Duis veniam reprehenderit laborum occaecat id proident nulla veniam. Duis enim deserunt voluptate aute veniam sint pariatur exercitation. Irure mollit est sit labore est deserunt pariatur duis aute laboris cupidatat. Consectetur consequat esse est sit veniam adipisicing ipsum enim irure.
                      </p>
                      <p>
                        Qui ullamco consectetur aute fugiat officia ullamco proident Lorem ad irure. Sint eu ut consectetur ut esse veniam laboris adipisicing aliquip minim anim labore commodo. Incididunt eu enim enim ipsum Lorem commodo tempor duis eu ullamco tempor elit occaecat sit. Culpa eu sit voluptate ullamco ad irure. Anim commodo aliquip cillum ea nostrud commodo id culpa eu irure ut proident. Incididunt cillum excepteur incididunt mollit exercitation fugiat in. Magna irure laborum amet non ullamco aliqua eu. Aliquip adipisicing dolore irure culpa aute enim. Ullamco quis eiusmod ipsum laboris quis qui.
                      </p>
                      <p>
                        Cillum ullamco eu cupidatat excepteur Lorem minim sint quis officia irure irure sint fugiat nostrud. Pariatur Lorem irure excepteur Lorem non irure ea fugiat adipisicing esse nisi ullamco proident sint. Consectetur qui quis cillum occaecat ullamco veniam et Lorem cupidatat pariatur. Labore officia ex aliqua et occaecat velit dolor deserunt minim velit mollit irure. Cillum cupidatat enim officia non velit officia labore. Ut esse nisi voluptate et deserunt enim laborum qui magna sint sunt cillum. Id exercitation labore sint ea labore adipisicing deserunt enim commodo consectetur reprehenderit enim. Est anim nostrud quis non fugiat duis cillum. Aliquip enim officia ad commodo id.
                      </p>
                    </div>
                  </div>
                </div>
          </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      article : {author:{username:''}},
      editable : false,
      tagform: false,
      newTag:''
    };
  },
  props:['idArticle'],
  methods:{
      editArticle(){
        this.$emit('editArticle', this.article._id)
      },
      deleteArticle(){
        swal({
          title: "Are you sure?",
          text: "you are going to delete your's article",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            return axios({
              url:`http://localhost:3000/article/${this.idArticle}`,
              method:'delete',
              headers:{
                access_token : localStorage.access_token
              }
            })
          } 
        })
        .then(({data}) => {
          swal("Poof! Your article has been deleted!", {
              icon: "success",
          });
          this.backToList()
        })
      },
      showTagForm(){
        this.tagform = true
      },
      backToList(){
        this.$emit('back-detail')
      },
      addTag(){
        axios({
          url:`http://localhost:3000/article/tag/${this.idArticle}`,
          method:'patch',
          data:{
            Tags: this.newTag
          },
          headers:{
            access_token : localStorage.access_token
          }
        })
          .then(({data})=>{
            swal({
              title: "Good job!",
              text: "tag added!",
              icon: "success",
            });
            this.article.Tags.push(this.newTag)
            this.newTag = ''
            this.tagform = false
          }).catch(console.log)
      },
      fetch(){
        axios({
              url:`http://localhost:3000/article/${this.idArticle}`,
              method:'get',
              headers:{
                  access_token : localStorage.access_token
              }
          }).then(({data})=>{
              this.article = data
              if(this.article.author.email == localStorage.email){
                this.editable = true
              }
          }).catch(err => {
              console.log(err)
          })
      }
  },
  created(){
    this.fetch()
  }
};
</script>

<style scoped>
</style>