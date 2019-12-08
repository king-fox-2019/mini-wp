<template>
  <div class="add-article">
    <!-- <wysiwyg v-model="content" /> -->
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
        <v-toolbar color="red darken-4" dark flat>
          <v-toolbar-title>Add New Article</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form @submit.prevent="createArticle" class="px-3">
            <v-text-field v-model="form.title" label="Title"></v-text-field>
            <wysiwyg v-model="form.content" />
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
      form: {
        title: "",
        content: "",
        tag: [],
        image: ""
      },
      dialogArticle: false
    };
  },
  watch: {
    dialogArticle(val) {}
  }
};
</script>

<style></style>
