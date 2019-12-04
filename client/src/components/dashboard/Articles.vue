<template>
  <div class="px-5" id="article-list">
    <!-- <b-card
      v-for="article in articles"
      :key="article._id"
      :title="article.title"
      :img-src="article.featuredImage"
      img-alt="featuredImage"
      img-left
      tag="article"
      class="mb-2 bg-light"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </b-card-text>

      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>-->
    <b-card
      no-body
      class="overflow-hidden mb-2 bg-light"
      v-for="article in articles"
      :key="article._id"
    >
      <b-row no-gutters>
        <!-- <b-col
          md="4"
          :style="{
            'background-image': `url(${article.featuredImage})`
          }"
          v-if="vwWidth >= 768"
        ></b-col>-->
        <b-col md="4">
          <b-card-img
            :src="article.featuredImage"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="8">
          <b-card-body>
            <b-card-title class="mb-0">{{ article.title }}</b-card-title>
            <b-card-text>
              <small class="text-muted">{{ article.updatedAt }}</small>
            </b-card-text>
            <b-card-text>{{ article.content }}</b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <!-- <b-card
      no-body
      class="overflow-hidden mb-3 bg-light"
      v-for="article in articles"
      :key="article._id"
    >
      <div class="d-flex flex-wrap">
        <div class="img-wrapper">
          <b-card-img
            :src="article.featuredImage"
            class="rounded-0"
          ></b-card-img>
        </div>
        <div class="text-wrapper">
          <b-card-body :title="article.title">
            <b-card-text>
              <small class="text-muted">{{ article.updatedAt }}</small>
            </b-card-text>
            <b-card-text>{{ article.content }}</b-card-text>
          </b-card-body>
        </div>
      </div>
    </b-card>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      vwWidth: 0
    }
  },
  computed: {
    articles() {
      return this.$store.state.userArticles
    }
  },
  created() {
    const loader = this.$loading.show()
    this.$store.dispatch('fetchUserArticles').then(() => {
      loader.hide()
    })
  },
  mounted() {
    this.vwWidth = window.innerWidth
    window.addEventListener('resize', () => {
      this.vwWidth = window.innerWidth
    })
  }
}
</script>

<style lang="scss" scoped>
// #article-list {
//   width: 100%;
//   padding-top: 100rem;
// }

.card {
  border: 1px solid rgba(0, 0, 0, 0);

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
}

@media (min-width: 768px) {
  .card {
    max-height: 35vh;
  }
}

@media (max-width: 768px) {
  .col-md-4 {
    max-height: 45vh;
    overflow: hidden;
  }
}

// .img-wrapper {
//   // max-width: 35%;
//   max-height: 100%;
//   // overflow: hidden;
//   // background-size: cover;
//   // background-repeat: no-repeat;
//   // background-position: 50% 50%;
//   img {
//     // max-height: 100%;
//     max-width: 30vw;
//   }
// }

// .text-wrapper {
//   max-width: 50vw;
// }
</style>
