<template>
  <div class="formedit">
    <v-dialog v-model="dialogArticleEdit" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="blue" text v-on="on">
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <!-- card  add article-->
      <v-card>
        <v-toolbar color="orange darken-4" dark>
          <v-toolbar-title>Add New Article</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form
            ref="formArticleEdit"
            @submit.prevent="editArticle(articleId)"
            class="px-3"
            lazy-validation
          >
            <v-text-field
              v-model="form.title"
              :rules="titleRules"
              :counter="20"
              label="Title"
              prepend-icon="edit"
            ></v-text-field>

            <!-- <v-text-field> -->
            <v-layout>
              <wysiwyg v-model="form.content" />
            </v-layout>
            <!-- </v-text-field> -->

            <v-file-input
              accept="image/*"
              small-chips
              multiple
              type="file"
              required
              :rules="imageRules"
              v-model="form.image"
              label="Image Article"
            ></v-file-input>

            <v-container>
              <p>Tag Selected : {{ form.tag }}</p>
              <v-layout d-flex flex-row>
                <v-checkbox v-model="form.tag" label="Technologies" value="technologi"></v-checkbox>
                <v-checkbox v-model="form.tag" class="ml-3" label="Sport" value="sport"></v-checkbox>
                <v-checkbox v-model="form.tag" class="ml-3" label="Game" value="game"></v-checkbox>
                <v-checkbox v-model="form.tag" class="ml-3" label="Education" value="education"></v-checkbox>
                <v-checkbox v-model="form.tag" class="ml-3" label="Anime" value="anime"></v-checkbox>
              </v-layout>
            </v-container>

            <v-btn
              color="blue darken-2"
              :loading="loading"
              class="white--text"
              depressed
              type="submit"
            >Edit Article</v-btn>
            <v-btn color="error" class="ml-5" depressed @click="resetArticle">Reset Form</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "FormEdit",
  props: {
    articleId: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      form: {
        title: "",
        content: "<span><B><U>Content :</U></B></span>",
        tag: [],
        image: []
      },
      tempImage: [],
      titleRules: [
        // v => !!v || "Title is required",
        v => (v && v.length >= 4) || "Title Minimum 4 Characters",
        v => (v && v.length <= 20) || "Title Maximum 20 Characters"
      ],
      imageRules: [
        v => !!v || "Image is required",
        v => (v && v.length <= 1) || "Image is required"
      ],
      dialogArticleEdit: false
    };
  },
  methods: {
    editArticle(articleId) {
      // console.log(this.tempImage);
      const token = localStorage.getItem("token");
      let newImage = null;
      if (this.form.image.length === 0) {
        newImage = this.tempImage;
      } else {
        newImage = this.form.image[0];
      }
      const fd = new FormData();
      fd.append("title", this.form.title);
      fd.append("content", this.form.content);
      fd.append("tag", this.form.tag);
      fd.append("image", newImage);

      this.axios({
        method: "PUT",
        url: `/articles/${articleId}`,
        headers: {
          token
        },
        data: fd
      })
        .then(({ data }) => {
          this.dialogArticleEdit = false;
          this.resetArticle();
          let payloadAlert = {
            text: data.message,
            value: true
          };
          this.$emit("success-create", payloadAlert);
        })
        .catch(err => {
          let text = "";
          err.response.data.errors.forEach(element => {
            text += element + ", ";
          });
          let payloadAlert = {
            text,
            value: true
          };
          this.dialogArticleEdit = false;
          this.resetArticle();
          this.$emit("error-create", payloadAlert);
        });
    },
    resetArticle() {
      this.$refs.formArticleEdit.reset();
      this.form.content = "<span><B><U>Content :</U></B></span>";
    }
  },
  watch: {
    dialogArticleEdit(val) {
      if (!val) {
        this.resetArticle();
        this.form.content = "<span><B><U>Content :</U></B></span>";
      } else {
        const token = localStorage.getItem("token");
        // console.log(this.getArticleId);
        this.axios({
          method: "GET",
          url: `/articles/readone/${this.getArticleId}`,
          headers: {
            token
          }
        })
          .then(({ data }) => {
            this.form.title = data.title;
            this.form.content = data.content;
            this.form.tag = data.tag;
            this.tempImage = data.image;
          })
          .catch(err => {
            let text = "";
            err.response.data.errors.forEach(element => {
              text += element + ", ";
            });
            let payloadAlert = {
              text,
              value: true
            };
            setTimeout(() => {
              this.dialogArticleEdit = false;
              this.$emit("error-create", payloadAlert);
            }, 2000);
          });
      }
    }
  },
  computed: {
    getArticleId() {
      return this.articleId;
    }
  }
};
</script>

<style>
</style>