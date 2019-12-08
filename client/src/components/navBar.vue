<template>
        <div>
            <nav class="navbar navbar-light bg-white d-flex justify-content-end fixed-top">
                <div style="margin-right:10px">
                <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" @click="postNewArticle">
                    +Post
                </button>
                </div>

                <form class="form-inline" style="margin-right:10px">
                    <input class="form-control mr-sm-2" type="search" v-model="searchText" placeholder="Search" aria-label="Search">
                    {{ showingSearchCard }}
                    <!-- <button class="btn btn-light my-2 my-sm-0" @click.prevent="showSearchCard">Search</button> -->
                </form>
            
                <div>
                <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" @click="signOut();">
                    Sign Out
                </button>
                </div>
                
            </nav>
            <div class="dropdown-divider"></div>

            <div id="searchCard" v-if="showSearchCard">
                <div class="card-columns">
                        <div v-for="(article, x) in searchContent" :key="x">
                            <div class="card shadow p-3 bg-white rounded">
                                <img class="card-img-top" :src="article.featured_image"  alt="Card image cap">
                                <div class="card-body">
                                <h5 class="card-title">{{ article.title }}</h5>
                                <p class="card-text" v-html="article.content"></p>
                                <div>
                                    <p class="card-text">Author: {{ article.authorId.username }}  
                                    <button type="button" class="btn btn-outline-secondary" style="float:right" @click="deleteArticle(article._id)">x</button> </p>
                                </div>
                                </div>
                                
                            </div>
                        </div>

                  </div>

            </div>




        </div>

</template>



<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    
    data: function(){
      return {
        searchText: '',
        searchContent: [],
        showSearchCard: false
      }
    },
    props:['articleArray'],
    methods:{
        postNewArticle()
          {
            this.$emit('changePage', 'postNewArticle')
          },
        signOut()
          {
            Swal.fire({
                title: "Sign Out",
                text: "Confirm Sign Out?",
                icon: "warning",
                showCancelButton: true,
            })
            .then(result=>{
                if(result.value)
                  {
                      const auth2 = gapi.auth2.getAuthInstance();
                      auth2.signOut().then(function () {
                      localStorage.removeItem('access_token')
                      console.log('User signed out.');
                      });
  

                      Swal.fire({
                        title: "",
                        text: `See You Again`,
                      })
                      .then(result=>{
                        this.$emit('changePage', 'loginRegister')
                        this.$emit('showNavBar', false)
                      })
                  }
            })
          }
    },
    computed: {
      showingSearchCard : function(){
        if(this.searchText)
          {
            this.$emit('changePage', '')
            console.log("TCL: this.searchText", this.searchText)
            const regSearchText = new RegExp(this.searchText, 'g')
            this.searchContent = this.articleArray.filter( element=> element.content.match(regSearchText) )
            
            console.log("TCL: this.searchContent", this.searchContent)

            if(this.searchContent.length > 0)
                this.showSearchCard = true
            else
                this.showSearchCard = false
          }
        else
          {
            this.showSearchCard = false
            this.$emit('changePage', 'bodyContent')
          }
      }
    }




}
</script>



<style>


</style>