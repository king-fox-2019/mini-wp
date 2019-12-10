<template>
  <div class="all-article">
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex v-for="article in articles" :key="article._id" xs12 md3 class="mx-5 my-5">
          <v-card class="mx-auto" max-width="400">
            <v-img class="white--text align-end" height="200px" :src="article.image">
              <v-card-title class="text-uppercase">
                {{
                article.title
                }}
              </v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0"></v-card-subtitle>

            <v-card-text v-html="article.content" class="text--primary"></v-card-text>
            <v-card-text
              class="font-italic font-weight-light text--primary"
            >Genre: {{ article.tag }}</v-card-text>
            <v-card-text class="font-weight-thin display-1 red--text">
              {{
              article.updatedAt
              }}
            </v-card-text>
            <v-card-text class="font-weight-bold grey--text">By: {{ article.author }}</v-card-text>
            <v-card-actions class="d-flex justify-space-between">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="orange"
                    text
                    v-on="on"
                    :href="
                      `https://twitter.com/intent/tweet?url=${article.image}`
                    "
                  >Share</v-btn>
                </template>
                <span>want share</span>
              </v-tooltip>

              <!-- <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn color="blue" text v-on="on">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </template>
                <span>want edit</span>
              </v-tooltip>-->
              <formedit-item
                v-if="islogin"
                :articleId="article._id"
                @error-create="errorCreate"
                @success-create="successCreate"
                @fetch-articles="fetchAllArticle"
              ></formedit-item>

              <v-tooltip bottom v-if="islogin">
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="islogin"
                    color="red"
                    @click="deleteArticle(article._id)"
                    text
                    v-on="on"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </template>
                <span>want delete</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FormEdit from "./FormEdit.vue";

export default {
  name: "AllArticle",
  components: {
    "formedit-item": FormEdit
  },
  props: {
    articles: {
      type: Array
    },
    islogin: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  methods: {
    fetchAllArticle(payload) {
      this.$emit("fetch-articles", payload);
    },
    deleteArticle(articleId) {
      this.$emit("delete-article", articleId);
    },
    errorCreate(payload) {
      this.$emit("error-create", payload);
    },
    successCreate(payload) {
      this.$emit("success-create", payload);
    }
  },
  created() {
    this.fetchAllArticle();
  }
};
</script>

<style></style>
