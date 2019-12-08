<template>
  <div class="my-articles">
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex v-for="article in myarticles" :key="article._id" xs12 md3 class="mx-5 my-5">
          <v-card class="mx-auto" max-width="400">
            <v-img class="white--text align-end" height="200px" :src="article.image">
              <v-card-title class="text-uppercase">{{ article.title }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">{{ }}</v-card-subtitle>

            <v-card-text v-html="article.content" class="text--primary"></v-card-text>
            <v-card-text
              class="font-italic font-weight-light text--primary"
            >Genre: {{ article.tag }}</v-card-text>
            <v-card-text class="font-weight-thin display-1 red--text">{{ article.createdAt }}</v-card-text>
            <v-card-text class="font-weight-bold grey--text">By: {{ article.author }}</v-card-text>
            <v-card-actions>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn color="orange" text v-on="on">Share</v-btn>
                </template>
                <span>want share</span>
              </v-tooltip>

              <v-btn color="orange" text>Explore</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "MyArticles",
  props: {
    myarticles: {
      type: Array
    }
  },
  data() {
    return {
      //   myArticles: []
    };
  },
  methods: {
    fetchMyArticles() {
      this.$emit("fetch-myarticles");
    }
    // fetchMyArticles() {
    //   const token = localStorage.getItem("token");
    //   this.axios({
    //     method: "GET",
    //     url: "/articles/myarticles",
    //     headers: {
    //       token
    //     }
    //   })
    //     .then(({ data }) => {
    //       data.forEach(element => {
    //         if (element.tag) {
    //           let newTag = "";
    //           element.tag.forEach((tag, index) => {
    //             if (index == element.tag.length - 1) {
    //               newTag += tag;
    //             } else {
    //               newTag += tag + ", ";
    //             }
    //           });
    //           element.tag = newTag;
    //         }
    //         let newTime = this.getTime(element.createdAt);
    //         element.createdAt = `${newTime} ago`;
    //       });
    //       this.myArticles = data;
    //     })
    //     .catch(err => {
    //       let text = "";
    //       err.response.data.errors.forEach(element => {
    //         text += element + ", ";
    //       });
    //       let payload = {
    //         text,
    //         value: true
    //       };
    //       this.$emit("error-create", payload);
    //     });
    // },
    // getTime(date) {
    //   var seconds = Math.abs((new Date() - new Date(date)) / 1000);
    //   var interval = Math.floor(seconds / 31536000);
    //   if (interval > 1) {
    //     return interval + " years";
    //   }
    //   interval = Math.floor(seconds / 2592000);
    //   if (interval > 1) {
    //     return interval + " months";
    //   }
    //   interval = Math.floor(seconds / 86400);
    //   if (interval > 1) {
    //     return interval + " days";
    //   }
    //   interval = Math.floor(seconds / 3600);
    //   if (interval > 1) {
    //     return interval + " hours";
    //   }
    //   interval = Math.floor(seconds / 60);
    //   if (interval > 1) {
    //     return interval + " minutes";
    //   }
    //   return Math.floor(seconds) + " seconds";
    // }
  },
  created() {
    this.fetchMyArticles();
  }
};
</script>

<style>
</style>
