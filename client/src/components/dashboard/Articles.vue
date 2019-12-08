<template>
  <div class="px-5" id="article-list">
    <b-card
      no-body
      class="overflow-hidden mb-2 bg-light"
      v-for="article in articles"
      :key="article._id"
    >
      <b-row no-gutters>
        <b-col md="4" v-if="article.featuredImage">
          <b-card-img
            :src="article.featuredImage"
            class="rounded-0 pointer"
            @click="readArticle(article)"
          ></b-card-img>
        </b-col>
        <b-col :md="article.featuredImage ? 8 : null">
          <b-card-body>
            <b-card-text class="float-right">
              <small class="text-muted">{{ article.status }}</small>
            </b-card-text>
            <b-card-title
              class="mb-0 d-inline-block pointer"
              @click="readArticle(article)"
              >{{ article.title }}</b-card-title
            >
            <b-card-text>
              <small class="text-muted pointer" @click="readArticle(article)">{{
                formatDate(article.updatedAt)
              }}</small>
            </b-card-text>
            <b-card-text
              class="pointer"
              v-html="formatContent(article.content)"
              @click="readArticle(article)"
            ></b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { formatDistance } from 'date-fns'

export default {
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    formatContent(content) {
      let patt = RegExp('</p>', 'g')
      for (let i = 0; i < 3; i++) {
        if (patt.exec(content) == null) break
      }

      content = content.slice(0, patt.lastIndex)
      content = content.replace(/(<img.+>)/g, '').slice(0, 250)
      if (content.length >= 250) {
        if (content.endsWith('</p>'))
          content = content.slice(0, content.length - 4)
        content += '...</p>'
      }
      return content
    },
    formatDate(date) {
      return formatDistance(new Date(date), Date.now()) + ' ago'
    },
    readArticle(article) {
      this.$router.push(`/read/${article._id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
// #article-list {
//   width: 100%;
//   padding-top: 100rem;
// }
.pointer {
  cursor: pointer;
}

.card {
  border: 1px solid rgba(0, 0, 0, 0);

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
}

@media (min-width: 768px) {
  .card {
    max-height: 13rem;
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
