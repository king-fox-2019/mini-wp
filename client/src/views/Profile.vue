<template>
  <div class="container" id="profile-page">
    <h1 id="full-name" v-if="!onEdit">{{ fullName || email }}</h1>
    <div class="text-input" ref="nameContainer" v-else>
      <input
        type="text"
        v-model.trim="fullName"
        placeholder="Enter your full name"
        autocomplete="off"
        id="input-full-name"
      />
    </div>
    <div class="d-flex align-items-center mb-4">
      <div class="text-muted mr-2 mr-sm-5" v-if="!onEdit">
        <p class="my-0">Username: {{ username }}</p>
        <p class="my-0">Email: {{ email }}</p>
      </div>
      <div class="text-muted mr-2 mr-sm-5" v-else>
        <p class="my-0">Name must only contain alphabetic letters.</p>
      </div>
      <b-button
        class="secondary-action"
        pill
        size="sm"
        variant="outline-secondary"
        active-class="active"
        @click="onEdit = true"
        v-if="!onEdit"
        >Edit Name</b-button
      >
      <div v-else>
        <b-button
          class="secondary-action mb-2 mb-sm-0 mr-sm-2"
          pill
          size="sm"
          variant="outline-secondary"
          active-class="active"
          @click="onEdit = false"
          >Cancel</b-button
        >
        <b-button
          class="secondary-action px-4"
          pill
          size="sm"
          variant="outline-primary"
          active-class="active"
          @click="saveName"
          >Save</b-button
        >
      </div>
    </div>
    <div id="statistic">
      <p class="mt-2">
        You have an amount of {{ totalArticles }} article{{
          totalArticles > 1 ? 's' : ''
        }}. You have posted
        {{
          postedArticles == totalArticles
            ? `all of your article${totalArticles > 1 ? 's' : ''}.`
            : postedArticles +
              ` of your article${totalArticles > 1 ? 's' : ''}${
                draftArticles > 0
                  ? `, and ${
                      totalArticles == postedArticles + draftArticles
                        ? 'the rest of the'
                        : 'another ' + draftArticles
                    } article${
                      draftArticles > 1 ? 's are' : ' is'
                    } still in draft phase.`
                  : '.'
              }${
                deletedArticles > 0
                  ? ` You have ${deletedArticles} article${
                      deletedArticles > 1 ? 's' : ''
                    } in trash, and it's still
        recoverable should you need to.`
                  : ''
              }`
        }}
      </p>
    </div>
  </div>
</template>

<script>
import checkSession from '@/utils/checkSession'

export default {
  name: 'Profile',
  data() {
    return {
      onEdit: false,
      fullName: '',
      username: '',
      email: ''
    }
  },
  methods: {
    saveName() {
      const loader = this.$loading.show({
        container: this.$refs.nameContainer
      })
      this.$store
        .dispatch('onUpdateName', this.fullName)
        .then(() => {
          this.onEdit = false
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
  computed: {
    totalArticles() {
      return this.$store.state.userArticles.length
    },
    postedArticles() {
      return this.$store.state.userArticles.filter(article => {
        return article.status == 'posted'
      }).length
    },
    draftArticles() {
      return this.$store.state.userArticles.filter(article => {
        return article.status == 'draft'
      }).length
    },
    deletedArticles() {
      return this.$store.state.userArticles.filter(article => {
        return article.status == 'trash'
      }).length
    }
  },
  watch: {
    onEdit(val) {
      if (val)
        setTimeout(() => {
          document.getElementById('input-full-name').focus()
        }, 100)
    }
  },
  created() {
    if (localStorage.getItem('access_token')) {
      const loader = this.$loading.show()
      checkSession()
        .then(({ data }) => {
          this.$store.commit('CHANGE_USER', data.data)
          this.$store.commit('CHANGE_SESSION', true)
          const user = data.data
          this.fullName = user.fullName
          this.username = user.username
          this.email = user.email
          return this.$store.dispatch('fetchUserArticles')
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

<style lang="scss" scoped>
#full-name {
  font-weight: 400;
  font-size: 3.1rem;
}

#profile-page {
  margin-top: 8rem;
}

#statistic {
  border-top: 1px solid #3f4b3f;
}

@media (min-width: 768px) {
  #profile-page {
    width: 60%;
  }
}

.text-input {
  // margin-top: 2rem;
  // margin-bottom: 3rem;
  input {
    background-color: transparent;
    display: block;
    // height: 40px;
    // text-align: center;
    width: 100%;
    font-size: 3.1rem;
    font-weight: 400;
    // line-height: 40px;
    border: 0;
    // border-bottom: 1px solid #9e9e9e;
    outline: 0;
  }
}
</style>
