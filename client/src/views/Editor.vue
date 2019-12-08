<template>
  <div>
    <h2>New Blog Post</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="blogTitle">Title</label>
        <input type="text" class="form-control" id="blogTitle" v-model="title">
      </div>
      <label>Content</label>
      <vue-editor id="editor"
        useCustomImageHandler
        @image-added="handleImageAdded" v-model="content">
      </vue-editor>
      <br>
      <label>Tags</label>
      <div class="max-w-sm w-full mx-auto">
            <div class="tags-input">
              <span v-for="(tag, i) in tags" class="tags-input-tag" :key="i">
                <span>{{ tag }}</span>
                <button type="button" class="tags-input-remove" @click="removeTag(tag)">&times;</button>
              </span>
              <input class="tags-input-text" placeholder="Add tag..."
                @keydown.enter.prevent="addTag"
                v-model="newTag"
              >
            </div>
      </div>

      <button type="submit" class="btn custom-btn">Submit</button>
    </form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from '../../config/axios'
export default {
    name: 'editor',
    props: ['articleObj'],
    data () {
      return {
        title: '',
        content: '',
        tags: [],
        newTag: ''
      }
    },
    components: {
      VueEditor
    },
    methods: {
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        let formData = new FormData();
        formData.append("image", file);

        axios({
          method: "POST",
          data: formData,
          url: '/articles/uploader',
          headers: {
            authorization: localStorage.getItem('jwt_token')
          }
        })
          .then(({data}) => {
            let url = data.image;

            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader();
          })
          .catch(err => {
            console.log(err);
          });
      },
      submitForm () {
        if (!this.articleObj) {
          axios({
            method: 'post',
            url: `/articles`,
            data: {
              title: this.title,
              content: this.content,
              tags: this.tags
            },
            headers: {
              authorization: localStorage.getItem('jwt_token')
            }
          })
          .then( ({data}) => {
            this.swal('success', 'Created successfully.')
            this.$router.push('/')
          })
          .catch( error => {
            this.swal('error')
          })
        } else {
          axios({
            method: 'put',
            url: `/articles/${this.articleObj._id}`,
            data: {
              title: this.title,
              content: this.content,
              tags: this.tags
            },
            headers: {
              authorization: localStorage.getItem('jwt_token')
            }
          })
          .then( ({data}) => {
            this.swal('success', 'Updated successfully.')
            this.$router.push('/')
          })
          .catch( error => {
            this.swal('error')
          })
        }
      },
      addTag() {
        this.tags.push(this.newTag.trim())
        this.newTag = ''
      },
      removeTag(tag) {
        this.tags = this.tags.filter(t => t !== tag)
      },
      setEditorContent() {
        if (this.articleObj) {
          this.title = this.articleObj.title;
          this.content = this.articleObj.content;
          this.tags = this.articleObj.tags;
        } 
      }
    },
    created () {
      this.setEditorContent ()
    }
}
</script>

<style>
.custom-btn {
  width: 100%;
  color: black;
  background-color: white;
  border: 1px solid #ced4da;
  margin: 20px 0;
}

.tags-input {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border-width: 1px;
  border-radius: .25rem;
  padding-top: .5rem;
  padding-bottom: .25rem;
}

.tags-input-tag {
  display: inline-flex;
  line-height: 1;
  align-items: center;
  font-size: .875rem;
  background-color: #bcdefa;
  color: #1c3d5a;
  border-radius: .25rem;
  user-select: none;
  padding: .25rem;
  margin-right: .5rem;
  margin-bottom: .25rem;
}

.tags-input-tag:last-of-type {
  margin-right: 0;
}

.tags-input-remove {
  color: #2779bd;
  font-size: 1.125rem;
  line-height: 1;
}

.tags-input-remove:first-child {
  margin-right: .25rem;
}

.tags-input-remove:last-child {
  margin-left: .25rem;
}

.tags-input-remove:focus {
  outline: 0;
}

.tags-input-text {
  flex: 1;
  outline: 0;
  padding-top: .25rem;
  padding-bottom: .25rem;
  margin-bottom: .25rem;
  min-width: 10rem;
}

.py-16 {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

</style>