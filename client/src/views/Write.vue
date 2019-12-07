<template>
  <div>
    <Navbar-Write
      @on-cancel="$router.push('/dashboard')"
      @on-save="saveArticle"
    ></Navbar-Write>

    <div class="container-fluid" id="write-wrapper">
      <!-- <input type="text" v-model="title" class="text-input" /> -->
      <div class="text-input">
        <input
          type="text"
          v-model="title"
          placeholder="Add Title"
          autocomplete="off"
        />
        <!-- <label for="username">Username</label> -->
      </div>
      <!-- <b-form-input
      class="text-input"
      v-model="text"
      placeholder="Enter your name"
      ></b-form-input>-->
      <vue-editor
        v-model="content"
        useCustomImageHandler
        @image-added="addImageHandler"
        @image-removed="removeImageHandler"
        placeholder="Start your journey..."
      ></vue-editor>
    </div>
    <b-modal
      id="confirm-leave"
      :static="true"
      hide-header
      hide-footer
      body-bg-variant="info"
    >
      <h5>You have unsaved changes. Do you want to save it?</h5>
      <div class="d-flex flex-wrap justify-content-center mt-3">
        <b-button
          class="secondary-action"
          pill
          variant="outline-secondary"
          active-class="active"
          @click="$bvModal.hide('confirm-leave')"
          >Cancel</b-button
        >
        <b-button
          class="secondary-action mx-0 mr-sm-3 ml-sm-5"
          pill
          variant="outline-primary"
          active-class="active"
          id="leave-nosave"
          >Don't save</b-button
        >
        <b-button
          class="main-action mt-2 mt-sm-0"
          pill
          variant="primary"
          active-class="active"
          @click="saveAndLeave"
          >Yes, save it</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import NavbarWrite from '@/components/NavbarWrite'
import { VueEditor } from 'vue2-editor'
import checkSession from '@/utils/checkSession'

export default {
  name: 'WritePage',
  components: {
    VueEditor,
    NavbarWrite
  },
  data() {
    return {
      id: '',
      title: '',
      initialTitle: '',
      content: '',
      initialContent: '',
      images: [],
      vwWidth: 0
    }
  },
  computed: {
    saveToLeave() {
      return (
        this.initialTitle == this.title && this.initialContent == this.content
      )
    }
  },
  methods: {
    addImageHandler(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      this.$store
        .dispatch('onEditorAddImage', file)
        .then(({ data }) => {
          let imageUrl = data.data.imageUrl // Get imageUrl from response
          this.images.push(imageUrl)
          console.log(cursorLocation)
          Editor.insertEmbed(cursorLocation, 'image', imageUrl)
        })
        .catch(({ response }) => {
          this.$toasted.show(response.data.message, {
            className: 'bg-danger'
          })
        })
        .finally(() => resetUploader())
    },
    removeImageHandler(file) {
      this.images.splice(this.images.indexOf(file), 1)
    },
    saveArticle() {
      const loader = this.$loading.show({
        container: this.$refs.signUpContainer
      })
      const featuredImage = this.images[
        Math.floor(Math.random() * this.images.length)
      ]
      return this.$store
        .dispatch('onSaveArticle', {
          id: this.id || undefined,
          title: this.title,
          content: this.content,
          featuredImage
        })
        .then(({ data }) => {
          this.id = data.data._id
          this.initialTitle = this.title
          this.initialContent = this.content
          this.$toasted.show('Article saved')
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
          this.$bvModal.hide('confirm-leave')
          loader.hide()
        })
    },
    saveAndLeave() {
      this.saveArticle().then(() => {
        if (this.saveToLeave) this.$router.push('/dashboard')
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('access_token')) {
      checkSession()
        .then(() => {
          next()
        })
        .catch(() => {
          localStorage.clear()
          next('/')
        })
    } else next('/')
  },
  beforeRouteLeave(to, from, next) {
    if (this.saveToLeave) return next()
    this.$bvModal.show('confirm-leave')

    const noSave = document.getElementById('leave-nosave')
    noSave.addEventListener('click', () => {
      this.$bvModal.hide('confirm-leave')
      next()
    })
  }
  // mounted() {
  //   this.vwWidth = window.innerWidth
  //   window.addEventListener('resize', () => {
  //     this.vwWidth = window.innerWidth
  //   })
  // }
}
</script>

<style lang="scss">
.text-input {
  margin-top: 2rem;
  margin-bottom: 3rem;
  input {
    background-color: transparent;
    display: block;
    // height: 40px;
    text-align: center;
    width: 100%;
    font-size: 3rem;
    font-weight: 200;
    // line-height: 40px;
    border: 0;
    // border-bottom: 1px solid #9e9e9e;
    outline: 0;
  }
}

#write-wrapper {
  padding-top: 4.5rem;
}

.quillWrapper {
  height: 80vh !important;
  #quill-container {
    margin-bottom: 1rem;
    overflow-y: scroll;

    .ql-editor {
      // margin-top: 1rem;
      margin-bottom: 3rem;
      height: auto;
    }
  }

  .ql-toolbar {
    display: flex;
    width: 100%;
    overflow-x: scroll;

    .ql-formats {
      display: block !important;
      flex-shrink: 0;
      width: auto;
      .ql-picker-item {
        color: #444;
      }

      span:hover,
      button:hover,
      svg:hover,
      .ql-active,
      .ql-selected {
        color: #9e2b25 !important;
        .ql-stroke {
          stroke: #9e2b25 !important;
        }
        .ql-fill {
          fill: #9e2b25 !important;
        }
      }
    }
  }
}
</style>
