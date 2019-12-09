<template>
  <div
    id="detail-article"
    v-bind:style="leftPadding"
    class="page-content-wrapper"
  >
    <div class="container" style="padding-top:20px;">
      <div
        class="rounded-0 card mt-3"
        style="height:79vh;overflow: scroll;width: 100%;background-color:#EEEEEE;border: 0px solid grey;color:grey;"
      >
        <div class="card-body">
          <div class="media">
            <div class="media-body">
              <div class="head-detail-article d-flex justify-content-between">
                <div class="title-detail-content" style="max-width: 70%;">
                  <h1 class="mt-0">{{ article.title }}</h1>
                </div>
              </div>
              <p>
                <i class="fa fa-user-circle"></i> {{ article.author.name }}
                <i class="fa fa-calendar-alt ml-3"></i>
                {{ getTime(article.createdAt) }}
              </p>
              <div
                class="content-article"
                v-html="article.content"
                style="text-align: justify;"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../config/axios";
import moment from "moment";

export default {
  props: ["article", "leftPadding"],
  methods: {
    getTime(article) {
      return moment(article).format("ll");
    },
    movePage() {
      this.$emit("currentPage", {
        page: "edit-article-page",
        data: this.article
      });
    }
  }
};
</script>

<style>
.content-article img {
  max-width: 100%;
}
</style>
