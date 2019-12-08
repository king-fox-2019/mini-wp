<template>
  <div>
    <div class="row my-3 pb-5">
      <div class="col-3"><h1>Articles</h1></div>
      <form id="content">
        <input type="text" name="input" class="input" id="search-input" v-model="filterTitle">
        <button type="reset" class="search" id="search-btn"></button>
      </form>
    </div>
    <div v-if="filterByTag" class="row">
      <span class="tags-input-tag">{{filterByTag}}
        <button type="button" class="tags-input-remove" @click="removeFilterByTag">&times;</button>
      </span>
    </div>
    <div class="row my-2">
      <div class="col-4 pb-5" v-for="(article, i) in filteredArticles" :key="i">
        <div class="d-flex justify-content-between mr-4rem">
          <h4>{{ article.title }}</h4>

          <div class="dropleft">
            <button class="dropdown-toggle dropdown-left" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-ellipsis-h"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#"
              @click="editArticle(article)">Edit</a>
              <a class="dropdown-item" href="#"
              @click="moveToTrash(article._id)">Delete</a>
            </div>
          </div>
        </div>
        <p>Last Updated: {{ parseDate(article.updatedAt) }}</p>
        <p v-html="article.featuredImage"></p>
        <span v-for="(tag, i) in article.tags" class="tags-input-tag" :key="i">
          <span @click="filterTag(tag)">{{ tag }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../config/axios'
export default {
    name: 'home',
    data () {
      return {
        originalData: [],
        articles: [],
        filterTitle: '',
        filterByTag: ''
      }
    },
    components: {
    },
    methods: {
      fetchArticles () {
        axios({
          method: 'get',
          url: `/articles`,
          headers: {
            authorization: localStorage.getItem('jwt_token')
          },
          params: {
            trash: false
          }
        })
        .then( ({data}) => {
          this.originalData = data
          
          data.forEach(item => {
            let elem = document.createElement('div');
            elem.innerHTML = item.content;
            let image = elem.querySelector("img");
            item.featuredImage = image.outerHTML
          });

          this.articles = data;
        })
        .catch( error => {
          this.swal('error', error)
        })
      },
      parseDate (date) {
        let parsed = new Date(date);

        return `${parsed.getDate()} / ${parsed.getMonth()} / ${parsed.getFullYear()}`;
      },
      editArticle (obj) {
        this.$router.push({
          name: 'editor',
          params: {
              articleObj: obj
          }
        }) 
      },
      moveToTrash (id) {
        axios({
          method: 'patch',
          url: `/articles/${id}/trash`,
          headers: {
            authorization: localStorage.getItem('jwt_token')
          },
          data: {
            trash: true
          }
        })
        .then( ({data}) => {
          let filtered = this.articles.filter( item => {
            if (item._id !== data._id) {
              return item;
            }
          })
          this.articles = filtered;
          this.swal('success', 'Moved to trash!')
        })
        .catch(error => {
          this.swal('error', error)
        })
      },
      filterTag(tag) {
        this.filterByTag = tag;
        let filtered = this.originalData.filter( item => {
          if (item.tags.includes(tag)) {
            return item;
          }
        })
        this.articles = filtered
      },
      removeFilterByTag () {
        this.filterByTag = ''
        this.articles = this.originalData;
      }
    },
    created () {
      this.fetchArticles()
    },
    computed: {
      filteredArticles: function() {
        let filtered = this.articles.filter(item => {
          let title = item.title.toLowerCase();
          let filterTitle = this.filterTitle.toLowerCase();
          if(title.includes(filterTitle)){
            return item;
          }
        })
        return filtered;
      }
    }
}
</script>

<style>
img {
  max-width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>

<style scoped>
.dropdown-toggle {
  border: none;
  outline: none;
}

.dropdown-left::before {
  content: none;
}

.mr-4rem {
  margin-right: 3rem;
}

#search-btn {
  outline: none;
}

#content {
    position: absolute;
    height: 50px;
    width: 300px;
    left: 90%;
}

#content.on {
  -webkit-animation-name: in-out;
  animation-name: in-out;
  -webkit-animation-duration: 0.7s;
  animation-duration: 0.7s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}

input {
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  border: 4px solid black;
  border-radius: 50%;
  background: none;
  color: black;
  font-size: 16px;
  font-weight: 400;
  outline: 0;
  -webkit-transition: width 0.4s ease-in-out, border-radius 0.8s ease-in-out,
    padding 0.2s;
  transition: width 0.4s ease-in-out, border-radius 0.8s ease-in-out,
    padding 0.2s;
  -webkit-transition-delay: 0.4s;
  transition-delay: 0.4s;
  -webkit-transform: translate(-100%, -50%);
  -ms-transform: translate(-100%, -50%);
  transform: translate(-100%, -50%);
}

.search {
  background: none;
  position: absolute;
  top: 0px;
  left: 0;
  height: 50px;
  width: 50px;
  padding: 0;
  border-radius: 100%;
  outline: 0;
  border: 0;
  color: inherit;
  cursor: pointer;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
  -webkit-transform: translate(-100%, -50%);
  -ms-transform: translate(-100%, -50%);
  transform: translate(-100%, -50%);
}

.search:before {
  content: "";
  position: absolute;
  width: 20px;
  height: 4px;
  background-color: black;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  margin-top: 26px;
  margin-left: 17px;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
}

.close {
  -webkit-transition: 0.4s ease-in-out;
  transition: 0.4s ease-in-out;
  -webkit-transition-delay: 0.4s;
  transition-delay: 0.4s;
}

.close:before {
  content: "";
  position: absolute;
  width: 27px;
  height: 4px;
  margin-top: -1px;
  margin-left: -13px;
  background-color: black;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
}

.close:after {
  content: "";
  position: absolute;
  width: 27px;
  height: 4px;
  background-color: black;
  margin-top: -1px;
  margin-left: -13px;
  cursor: pointer;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.square {
  box-sizing: border-box;
  padding: 0 40px 0 10px;
  width: 300px;
  height: 50px;
  border: 4px solid black;
  border-radius: 0;
  background: none;
  color: black;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  outline: 0;
  -webkit-transition: width 0.4s ease-in-out, border-radius 0.4s ease-in-out,
    padding 0.2s;
  transition: width 0.4s ease-in-out, border-radius 0.4s ease-in-out,
    padding 0.2s;
  -webkit-transition-delay: 0.4s, 0s, 0.4s;
  transition-delay: 0.4s, 0s, 0.4s;
  -webkit-transform: translate(-100%, -50%);
  -ms-transform: translate(-100%, -50%);
  transform: translate(-100%, -50%);
}

</style>