<template>
  <div class="dashboard">
    <v-layout class="px-3">
      <!-- tag -->
      <v-menu>
        <template v-slot:activator="{ on: menu }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn color="primary" dark v-on="{ ...tooltip, ...menu }"
                >Tag</v-btn
              >
            </template>
            <span>Search By Tag</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="searchByTag(item.tag)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- end tag -->
      <!-- search -->
      <input
        type="text"
        style="border: 2px solid grey; margin-left:20px;"
        placeholder="search"
        v-model="inputSearch"
      />
      <v-btn @click="searchingArticle" class="mr-auto mr-2" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <!-- end search -->
    </v-layout>
    <allarticle-item
      v-if="this.$route.path === '/'"
      :articles="articles"
      @fetch-articles="fetchArticles"
      @searching-article="searchingArticle"
      @delete-article="deleteArticle"
      @error-create="errorCreate($event)"
      @success-create="successCreate"
    ></allarticle-item>
    <router-view
      @error-create="errorCreate"
      @success-create="successCreate($event)"
      :myarticles="myarticles"
      @fetch-myarticles="fetchMyArticles"
      @delete-article="deleteArticle"
    ></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Swal from "sweetalert2";
import AllArticle from "../components/AllArticle.vue";

export default {
  name: "DashBoard",
  components: {
    "allarticle-item": AllArticle
  },
  props: {
    articles: {
      type: Array
    },
    myarticles: {
      type: Array
    }
  },
  data() {
    return {
      items: [
        { title: "All Tag", tag: "all" },
        { title: "Technologies", tag: "technologi" },
        { title: "Sport", tag: "sport" },
        { title: "Game", tag: "game" },
        { title: "Education", tag: "education" },
        { title: "Anime", tag: "anime" }
      ],
      inputSearch: ""
    };
  },
  methods: {
    fetchArticles() {
      this.$emit("fetch-articles");
    },
    fetchMyArticles() {
      this.$emit("fetch-myarticles");
    },
    searchByTag(tag) {
      if (this.$route.path === "/") {
        this.axios({
          method: "GET",
          url: `/articles/tag/${tag}`
        })
          .then(({ data }) => {
            this.$emit("search-tag", data);
          })
          .catch(err => {
            let text = "";
            err.response.data.errors.forEach(element => {
              text += element + ", ";
            });
            let payload = {
              text,
              value: true
            };
            this.$emit("error-create", payload);
          });
      } else if (this.$route.path === "/myarticles") {
        const token = localStorage.getItem("token");

        this.axios({
          method: "GET",
          url: `articles/myarticles/tag/${tag}`,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            this.$emit("search-myarticle-tag", data);
          })
          .catch(err => {
            let text = "";
            err.response.data.errors.forEach(element => {
              text += element + ", ";
            });
            let payload = {
              text,
              value: true
            };
            this.$emit("error-create", payload);
          });
      }
    },
    errorCreate(payload) {
      this.$emit("error-create", payload);
    },
    successCreate(payload) {
      this.$emit("success-create", payload);
    },
    searchingArticle() {
      if (this.$route.path === "/") {
        if (this.inputSearch === "") {
          this.$emit("fetch-articles");
          this.inputSearch = "";
        } else {
          this.$emit("searching-article", this.inputSearch);
          this.inputSearch = "";
        }
      } else if (this.$route.path === "/myarticles") {
        if (this.inputSearch === "") {
          this.$emit("fetch-myarticles");
          this.inputSearch = "";
        } else {
          this.$emit("searching-myarticle", this.inputSearch);
          this.inputSearch = "";
        }
      }
    },
    deleteArticle(articleId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it"
      }).then(result => {
        if (result.value) {
          const token = localStorage.getItem("token");
          this.axios({
            method: "DELETE",
            url: `/articles/${articleId}`,
            headers: {
              token
            }
          })
            .then(({ data }) => {
              let payloadAlert = {
                text: data.message,
                value: true
              };
              this.$emit("success-create", payloadAlert);
            })
            .catch(err => {
              let text = "";
              err.response.data.errors.forEach(element => {
                text += element + ", ";
              });
              let payloadAlert = {
                text,
                value: true
              };
              this.$emit("error-create", payloadAlert);
            });
          Swal.fire(
            "Deleted!",
            "Your imaginary file has been deleted.",
            "success"
          );
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
        }
      });
      //
    }
  },
  computed: {},
  created() {
    this.fetchArticles;
  }
};
</script>
