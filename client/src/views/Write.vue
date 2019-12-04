<template>
  <div>
    <Navbar-Write v-if="$route.path == '/write'"></Navbar-Write>

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
    ></b-form-input> -->
      <vue-editor
        v-model="content"
        useCustomImageHandler
        @image-added="addImageHandler"
        @image-removed="removeImageHandler"
        placeholder="Start your journey..."
      ></vue-editor>
    </div>
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
      title: '',
      content: '',
      images: []
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
  }
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
// .text-input {
//   position: relative;
//   display: block;
//   height: 56px;
//   width: 100%;
//   margin-bottom: 16px;
// }
// .text-input > input {
//   background-color: transparent;
//   position: absolute;
//   bottom: 0;
//   display: block;
//   height: 40px;
//   width: 100%;
//   line-height: 40px;
//   border: 0;
//   border-bottom: 1px solid #9e9e9e;
//   outline: 0;
//   padding: 0 8px;
//   /*   transition: all 1s ease-in-out; */
// }
// .text-input > input::placeholder {
//   color: transparent;
// }
// .text-input > label {
//   position: absolute;
//   bottom: 12px;
//   left: 9px;
//   color: #9e9e9e;
//   cursor: text;
//   transition: all 0.2s ease-in-out;
// }
// .text-input > input:focus,
// .text-input > input:not(:placeholder-shown) {
//   border-bottom: 2px solid #6c17e1;
// }
// .text-input > input:focus + label,
// .text-input > input:not(:placeholder-shown) + label {
//   bottom: 40px;
//   left: 0;
//   font-size: 14px;
//   color: #6c17e1;
// }

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
