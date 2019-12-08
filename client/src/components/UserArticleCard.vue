<template>
  <div>
    <div class="container" id="image-container" >
      <div class="columns" style="flex-wrap:wrap;" id="detail-image">
        <div class="column">
          <div class="card-image">
            <figure class="image is-4by3">
              <a @click="isCardModalActive = true;" href="#">
                <img :src="UserArticleData.featured_image[0]" alt="Placeholder image" />
              </a>
            </figure>
            <div class="contents">
              <h2 style="font-weight:bold; font-size:22px">{{ UserArticleData.title }}</h2>
              <b-taglist>
                <b-tag v-for="(tag, i) in UserArticleData.tags" :key="i" type="is-info">{{ tag }}</b-tag>
              </b-taglist>
              <b-button type="is-danger" @click="deleteArticle(UserArticleData._id)">Delete</b-button>
              <b-button type="is-success" @click="updateArticle(UserArticleData)">Update</b-button>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal :active.sync="isCardModalActive" :width="1000" scroll="keep">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="UserArticleData.featured_image[0]" alt="Image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <div class="content-text">
                <h3 style="font-size:36px">{{ UserArticleData.title }}</h3>
                <hr>
                <h3 style="font-weight: 700;">Content:</h3>
                <h3 v-html="UserArticleData.content"></h3>
                <hr>
                <h3 style="font-weight: 700;">Posted on:</h3>
                <h3> {{ UserArticleData.created_at.split('T')[0] }} </h3>
                <hr>
                <i class="fas fa-user-tie"></i> <a style="margin-right:25px"> Author: <i class="far fa-envelope"></i>
                {{ UserArticleData.author.email }}
                <div>
                  <hr>
                  <h3 style="font-weight: 700;">Tags:</h3>
                  <b-taglist>
                    <b-tag v-for="(tag, i) in UserArticleData.tags" :key="i" type="is-info">{{ tag }}</b-tag>
                  </b-taglist>
                </div>
                <hr>
              </div>

              <div v-if="UserArticleData.featured_image.length > 1">
                <h3 style="font-weight: 700;">Featured Image(s) : </h3>
                <br />
                <div v-for="(image, i) in UserArticleData.featured_image" :key="i">
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img :src="image" alt="Image">
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "../../apis/axios"

export default {
  name: "UserArticleCard",
  props: ["UserArticleData"],
  data() {
    return {
      isCardModalActive: false
    }
  },
  methods: {
    deleteArticle(id){
      axios({
        method: 'delete',
        url: `/articles/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$buefy.toast.open({
            message: 'Post Deleted!',
            type: 'is-success'
          })
          this.$emit('fetch-user-articles')
        })
        .catch(err => {
          this.$buefy.toast.open({
            duration: 5000,
            message: err.response.data.errors.join(', '),
            position: 'is-top',
            type: 'is-danger'
          })
        })
    },
    updateArticle(articleData){
      this.$emit('update-article', articleData)
    }
  }
};
</script>

<style>
</style>