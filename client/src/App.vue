<template>
  <v-app class="grey lighten-4">
    <navbar-item
      @not-login="isLogin = false"
      @is-login="isLogin = true"
      @success-create="successCreate"
      @error-create="errorCreate"
      @fetch-articles="fetchAllArticle()"
    ></navbar-item>
    <v-content class="mx-4 my-4">
      <!-- alert success -->
      <v-alert
        :value="alertSuccess.value"
        color="#2A3B4D"
        dark
        icon="mdi-firework"
        dense
        transition="scale-transition"
      >{{ alertSuccess.text }}.</v-alert>
      <!-- end alert -->
      <!-- alert error -->
      <v-alert
        :value="alertError.value"
        text
        outlined
        color="deep-orange"
        icon="mdi-fire"
        transition="scale-transition"
      >{{ alertError.text }}.</v-alert>
      <!-- end alert -->
      <router-view
        :islogin="isLogin"
        :articles="articles"
        :myarticles="myArticles"
        @fetch-articles="fetchAllArticle"
        @fetch-myarticles="fetchMyArticles()"
        @success-create="successCreate"
        @error-create="errorCreate"
        @searching-article="searchingArticle"
        @searching-myarticle="searchingMyArticle"
        @search-tag="fetchByTag"
        @search-myarticle-tag="fetchMyArticleByTag"
      ></router-view>
    </v-content>
    <footer-item></footer-item>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    "navbar-item": Navbar,
    "footer-item": Footer
  },
  data() {
    return {
      alertSuccess: {
        value: false,
        text: ""
      },
      alertError: {
        value: false,
        text: ""
      },
      articles: [],
      myArticles: [],
      isLogin: false
    };
  },
  methods: {
    successCreate(payload) {
      this.fetchAllArticle();
      this.fetchMyArticles();
      this.alertSuccess.text = payload.text;
      this.alertSuccess.value = payload.value;
      setTimeout(() => {
        this.alertSuccess.value = false;
      }, 5000);
    },
    errorCreate(payload) {
      this.alertError.text = payload.text;
      this.alertError.value = payload.value;
      setTimeout(() => {
        this.alertError.value = false;
      }, 5000);
    },
    fetchAllArticle(payload) {
      console.log(payload);
      this.axios({
        method: "GET",
        url: "/articles/"
      })
        .then(({ data }) => {
          data.forEach(element => {
            if (element.tag) {
              let newTag = "";
              element.tag.forEach((tag, index) => {
                if (index == element.tag.length - 1) {
                  newTag += tag;
                } else {
                  newTag += tag + ", ";
                }
              });
              element.tag = newTag;
            }
            let newTime = this.getTime(element.updatedAt);
            element.updatedAt = `${newTime} ago`;
          });
          this.articles = data;
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
          this.errorCreate(payload);
        });
    },
    fetchMyArticles() {
      const token = localStorage.getItem("token");

      this.axios({
        method: "GET",
        url: "/articles/myarticles",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          data.forEach(element => {
            if (element.tag) {
              let newTag = "";
              element.tag.forEach((tag, index) => {
                if (index == element.tag.length - 1) {
                  newTag += tag;
                } else {
                  newTag += tag + ", ";
                }
              });
              element.tag = newTag;
            }
            let newTime = this.getTime(element.updatedAt);
            element.updatedAt = `${newTime} ago`;
          });
          this.myArticles = data;
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
          this.errorCreate(payload);
        });
    },
    searchingArticle(payload) {
      this.axios({
        method: "GET",
        url: "/articles/"
      })
        .then(({ data }) => {
          data.forEach(element => {
            if (element.tag) {
              let newTag = "";
              element.tag.forEach((tag, index) => {
                if (index == element.tag.length - 1) {
                  newTag += tag;
                } else {
                  newTag += tag + ", ";
                }
              });
              element.tag = newTag;
            }
            let newTime = this.getTime(element.createdAt);
            element.createdAt = `${newTime} ago`;
          });
          this.articles = data.filter(item => {
            return item.title.toLowerCase().includes(payload.toLowerCase());
          });
          if (this.articles.length === 0) {
            let payload = {
              text: "No Match, Try Again",
              value: true
            };
            // this.fetchAllArticle();
            this.errorCreate(payload);
          }
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
          this.errorCreate(payload);
        });
    },
    searchingMyArticle(payload) {
      const token = localStorage.getItem("token");
      this.axios({
        method: "GET",
        url: "/articles/myarticles",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          data.forEach(element => {
            if (element.tag) {
              let newTag = "";
              element.tag.forEach((tag, index) => {
                if (index == element.tag.length - 1) {
                  newTag += tag;
                } else {
                  newTag += tag + ", ";
                }
              });
              element.tag = newTag;
            }
            let newTime = this.getTime(element.createdAt);
            element.createdAt = `${newTime} ago`;
          });
          this.myArticles = data.filter(item => {
            return item.title.toLowerCase().includes(payload.toLowerCase());
          });
          if (this.myArticles.length === 0) {
            let payload = {
              text: "No Match, Try Again",
              value: true
            };
            // this.fetchMyArticles();
            this.errorCreate(payload);
          }
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
          this.errorCreate(payload);
        });
    },
    fetchByTag(payload) {
      payload.forEach(element => {
        if (element.tag) {
          let newTag = "";
          element.tag.forEach((tag, index) => {
            if (index == element.tag.length - 1) {
              newTag += tag;
            } else {
              newTag += tag + ", ";
            }
          });
          element.tag = newTag;
        }
        let newTime = this.getTime(element.createdAt);
        element.createdAt = `${newTime} ago`;
      });
      this.articles = payload;
      if (this.articles.length === 0) {
        this.fetchAllArticle();
      }
    },
    fetchMyArticleByTag(payload) {
      payload.forEach(element => {
        if (element.tag) {
          let newTag = "";
          element.tag.forEach((tag, index) => {
            if (index == element.tag.length - 1) {
              newTag += tag;
            } else {
              newTag += tag + ", ";
            }
          });
          element.tag = newTag;
        }
        let newTime = this.getTime(element.createdAt);
        element.createdAt = `${newTime} ago`;
      });
      this.myArticles = payload;
      if (this.myArticles.length === 0) {
        this.fetchMyArticles();
      }
    },
    getTime(date) {
      var seconds = Math.abs((new Date() - new Date(date)) / 1000);
      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    }
  },
  created() {
    this.fetchAllArticle();
    // this.fetchMyArticles();
  }
};
</script>
