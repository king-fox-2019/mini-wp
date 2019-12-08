<template>
  <div class="add-article">
    <v-dialog v-model="dialogArticle" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-list-item v-on="on">
          <v-list-item-icon>
            <v-icon class="white--text">add</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">Add Article</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <!-- card  add article-->
      <v-card>
        <v-toolbar color="light-blue darken-3" dark>
          <v-toolbar-title>Add New Article</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="formArticle" @submit.prevent="createArticle" class="px-3" lazy-validation>
            <v-text-field
              v-model="form.title"
              :rules="titleRules"
              :counter="15"
              label="Title"
              prepend-icon="edit"
            ></v-text-field>

            <!-- <v-text-field> -->
            <v-layout>
              <wysiwyg v-model="form.content" />
            </v-layout>
            <!-- </v-text-field> -->

            <v-file-input
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
            >Add Article</v-btn>
            <v-btn color="error" class="ml-5" depressed @click="resetArticle">Reset Form</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "AddArticle",
  data() {
    return {
      loading: false,
      form: {
        title: "",
        content: "<span><B><U>Content :</U></B></span>",
        tag: [],
        image: []
      },
      titleRules: [
        // v => !!v || "Title is required",
        v => (v && v.length >= 4) || "Title Minimum 4 Characters",
        v => (v && v.length <= 15) || "Title Maximum 15 Characters"
      ],
      imageRules: [
        v => !!v || "Image is required",
        v => (v && v.length <= 1) || "Image is required"
      ],
      dialogArticle: false
    };
  },
  methods: {
    createArticle() {
      if (this.$refs.formArticle.validate()) {
        this.snackbar = true;
        this.loading = true;

        const token = localStorage.getItem("token");
        let fd = new FormData();
        if (this.form.image === undefined) {
          fd.append("image", "zonk");
        } else {
          fd.append("image", this.form.image[0]);
        }
        fd.append("title", this.form.title);
        fd.append("content", this.form.content);
        fd.append("tag", this.form.tag);

        this.axios({
          method: "POST",
          url: "/articles",
          headers: {
            token
          },
          data: fd
        })
          .then(({ data }) => {
            let payloadAlert = {
              text: data.message,
              value: true
            };
            setTimeout(() => {
              this.loading = false;
              this.resetArticle();
              this.form.content = "<span><B><U>Content :</U></B></span>";
              this.dialogArticle = false;
              this.$emit("success-create", payloadAlert);
            }, 2000);
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
              this.loading = false;
              this.resetArticle();
              this.form.content = "<span><B><U>Content :</U></B></span>";
              this.dialogArticle = false;
              this.$emit("error-create", payloadAlert);
            }, 2000);
          });
      }
    },
    resetArticle() {
      this.$refs.formArticle.reset();
    }
  },
  watch: {
    dialogArticle(val) {
      if (!val) {
        this.resetArticle();
        this.$emit("close-create-article");
      }
    }
  }
};
</script>

<style></style>
