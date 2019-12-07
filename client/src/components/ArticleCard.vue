<template>
  <div>
    <div class="columns" style="flex-wrap:wrap;" id="detail-image">
      <div class="column">
        <div class="card-image">
          <figure class="image is-4by3">
            <a @click="isCardModalActive = true;" href="#">
              <img :src="ArticleData.featured_image[0]" alt="Placeholder image" />
            </a>
          </figure>
          <div class="contents">
            <h2 style="font-weight:bold; font-size:22px">{{ ArticleData.title }}</h2>
            <b-taglist>
              <b-tag v-for="(tag, i) in ArticleData.tags" :key="i" type="is-success">{{ tag }}</b-tag>
            </b-taglist>
            <hr>
          </div>
        </div>
      </div>
    </div>
    
    <b-modal :active.sync="isCardModalActive" :width="1000" scroll="keep">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
              <img :src="ArticleData.featured_image[0]" alt="Image">
          </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left"></div>
                <div class="media-content" style="display:flex; justify-content:center;flex-direction:column;">
                  <div class="content-text">
                    <h3 style="font-size:36px">{{ ArticleData.title }}</h3>
                    <hr>
                    <i class="fas fa-user-tie"></i> Author: <a style="margin-right:25px"> </a><i class="far fa-envelope"></i>  {{ ArticleData.author.email }}
                    <hr>
                    <h3 style="font-weight: 700;">Content:</h3>
                    <h3 v-html="ArticleData.content"></h3>
                    <hr>
                    <h3 style="font-weight: 700;">Posted on:</h3>
                    <h3> {{ ArticleData.created_at.split('T')[0] }} </h3>
                    <hr>
                    <div>
                      <h3 style="font-weight: 700;">Tags:</h3>
                      <br>
                      <b-taglist>
                        <b-tag v-for="(tag, i) in ArticleData.tags" :key="i" type="is-info">{{ tag }}</b-tag>
                      </b-taglist>
                    </div>
                  </div>

                  <div v-if="ArticleData.featured_image.length > 1">
                    <hr>
                    <h3 style="font-weight: 700;">Featured Image(s) :</h3>
                    <br>
                    <div v-for="(image, i) in ArticleData.featured_image" :key="i">
                      <div class="card-image">
                        <figure class="image is-4by3" >
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

export default {
  name: "ArticleCard",
  props: ["ArticleData"],
  data () {
    return {
      isCardModalActive: false
    }
  }
};
</script>

<style>
</style>