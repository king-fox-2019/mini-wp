<template>
  <div class="all-article">
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex v-for="article in articles" :key="article._id" xs12 md3 class="mx-5 my-5">
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
  name: "AllArticle",
  props: {
    articles: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {
    fetchAllArticle() {
      this.$emit("fetch-articles");
    }
  },
  created() {
    this.fetchAllArticle();
  }
};
</script>

<style>
</style>