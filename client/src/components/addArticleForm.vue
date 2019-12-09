<template>
  <div>
    <message-box v-if="isMessage" :message="message"></message-box>
    <div class="ui right aligned grid">
      <div class="right floated left aligned twelve wide column" id="column">
        <h2 class="h2">Write Article</h2>
        <form class="ui form">
          <div class="field">
            <label>Title</label>
            <input type="text" name="title" v-model="title" />
          </div>
          <div class="field">
            <label>Image</label>
            <input type="file" name="image" ref="file" @change="onFileChanged" />
          </div>
          <div class="field">
            <label>Tags</label>
            <input type="text" name="tags" v-model="tags" placeholder="tags" />
          </div>
          <div class="field">
            <quill-editor
              ref="myTextEditor"
              v-model="content"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            ></quill-editor>
          </div>
          <button class="ui button" type="submit" @click.prevent="addArticle">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import messageBox from "./messageBox";

export default {
  name: "addArticleForm",
  data: function() {
    return {
      isMessage: "",
      message: "",
      title: "",
      tags: "",
      image: "",
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link"]
          ]
        }
      }
    };
  },
  methods: {
    onEditorBlur(editor) {},
    onEditorFocus(editor) {},
    onEditorReady(editor) {},
    addArticle: function() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("tags", this.tags);
      formData.append("image", this.image);
      formData.append("content", this.content);
      axios({
        method: "post",
        url: "http://localhost:3000/articles",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: formData
      })
        .then(response => {
          console.log(response);
          this.isMessage = true;
          this.message = this.msg;
          this.$emit("toShowArticle", response.data._id);
          this.reset();
          // location.reload();
        })
        .catch(err => {
          // alert(err);
          this.isMessage = true;
          this.message = err;
        });
    },
    onFileChanged(event) {
      this.image = this.$refs.file.files[0];
    },
    reset: function() {
      this.content = "";
      this.id = "";
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    }
  },
  components: {
    messageBox
  }
};
</script>

<style scoped>
#column {
  margin-top: 2vh;
  margin-right: 9vh;
}
</style>