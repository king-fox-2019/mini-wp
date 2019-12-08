<template>
  <div
    class="container mx-auto d-flex flex-column align-items-center"
    id="read-article"
    v-if="article"
  >
    <b-img
      :src="article.featuredImage"
      fluid
      :alt="article.title"
      v-if="article.featuredImage"
    ></b-img>
    <div class="my-5">
      <h1 class="text-center" id="title">{{ article.title }}</h1>

      <div v-if="article.author._id != user._id">
        <p class="my-0">
          By: {{ article.author.fullName || article.author.email }}
        </p>
        <span class="text-muted" style="font-weight: 100;">
          {{ formatDate(article.updatedAt) }}
        </span>
      </div>

      <div v-else>
        <p
          class="my-0"
          :class="
            `text-${article.status == 'posted' ? 'primary' : 'secondary'}`
          "
        >
          {{ article.status }}
        </p>
        <small class="text-muted" style="font-weight: 100;"
          >Last update: {{ formatDate(article.updatedAt) }}</small
        >
        <div class v-if="article.status != 'trash'">
          <b-button
            class="secondary-action"
            pill
            variant="outline-secondary"
            active-class="active"
            @click="$bvModal.show('confirm-delete')"
          >
            <i class="fas fa-trash-alt"></i>
          </b-button>
          <b-button
            class="secondary-action mx-2"
            pill
            variant="outline-primary"
            active-class="active"
            :to="`/write/${article._id}`"
            >Edit</b-button
          >
          <b-button
            class="main-action"
            pill
            variant="primary"
            active-class="active"
            @click="postArticle"
            v-if="article.status == 'draft'"
            >Post Now</b-button
          >
        </div>

        <div v-else>
          <b-button
            class="secondary-action"
            pill
            variant="outline-danger"
            active-class="active"
            @click="$bvModal.show('confirm-permanent-delete')"
          >
            <i class="fas fa-trash-alt"></i>
          </b-button>
          <b-button
            class="secondary-action mx-2"
            pill
            variant="outline-success"
            active-class="active"
            @click="$bvModal.show('confirm-recover')"
            >Recover</b-button
          >
        </div>
      </div>
    </div>
    <div v-html="article.content" id="article-content"></div>
    <b-modal
      id="confirm-delete"
      :static="true"
      hide-header
      hide-footer
      body-bg-variant="info"
    >
      <h5>Are you sure?</h5>
      <p>
        Your deleted article will be moved to Trash section. Posted article will
        lost it's "posted" status and will be gone from Explore section. You
        need to manually repost it to make it available for everyone again.
      </p>
      <div class="d-flex flex-wrap justify-content-center mt-3">
        <b-button
          class="secondary-action"
          pill
          variant="outline-secondary"
          active-class="active"
          @click="$bvModal.hide('confirm-delete')"
          >Cancel</b-button
        >
        <b-button
          class="main-action ml-3"
          pill
          variant="primary"
          active-class="active"
          @click="deleteArticle"
          >Delete it</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import { formatRelative } from 'date-fns'
import checkSession from '@/utils/checkSession'

export default {
  props: ['id'],
  data() {
    return {
      article: null
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    formatDate(date) {
      return formatRelative(new Date(date), Date.now())
    },
    postArticle() {
      const loader = this.$loading.show()
      return this.$store
        .dispatch('onSaveArticle', {
          id: this.id,
          status: 'posted'
        })
        .then(() => {
          this.$toasted.show('Article posted')
          return this.$store
            .dispatch('getOneArticle', this.id)
            .then(({ data }) => {
              this.article = data.data
            })
        })
        .catch(({ response }) => {
          const message = response.data.message
          if (typeof message != 'string') {
            response.data.message.forEach(msg => {
              this.$toasted.show(msg, { className: 'bg-danger' })
            })
          } else {
            this.$toasted.show(response.data.message, {
              className: 'bg-danger'
            })
          }
        })
        .finally(() => {
          loader.hide()
        })
    },
    deleteArticle() {
      const loader = this.$loading.show()
      return this.$store
        .dispatch('onSaveArticle', {
          id: this.id,
          status: 'trash'
        })
        .then(() => {
          this.$toasted.show('Article deleted')
          this.$router.push('/dashboard')
        })
        .catch(({ response }) => {
          const message = response.data.message
          if (typeof message != 'string') {
            response.data.message.forEach(msg => {
              this.$toasted.show(msg, { className: 'bg-danger' })
            })
          } else {
            this.$toasted.show(response.data.message, {
              className: 'bg-danger'
            })
          }
        })
        .finally(() => {
          loader.hide()
        })
    }
  },
  created() {
    if (localStorage.getItem('access_token')) {
      const loader = this.$loading.show()
      checkSession()
        .then(({ data }) => {
          this.$store.commit('CHANGE_USER', data.data)
          this.$store.commit('CHANGE_SESSION', true)
          return this.$store
            .dispatch('getOneArticle', this.id)
            .then(({ data }) => {
              this.article = data.data
            })
        })
        .catch(() => {
          localStorage.clear()
          this.$store.commit('CHANGE_SESSION', false)
          this.$router.replace('/')
        })
        .finally(() => loader.hide())
    } else this.$router.replace('/')
  }
}
</script>

<style lang="scss">
#title {
  font-weight: 200;
  font-size: 4rem;
}

#article-content {
  width: 100%;
  img {
    max-width: 100%;
  }
}

#read-article {
  padding-top: 5rem;
}

@media (min-width: 768px) {
  #read-article {
    width: 65%;
  }
}
</style>
