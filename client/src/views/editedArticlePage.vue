<template>
  <div>
    <div class="container-fluid" id="dashboard-content">
      <div id="add-article">
        <form @submit.prevent="editArticle">
          <div class="form-group">
            <input
              v-model="title"
              type="text"
              class="form-control rounded-0"
              id="create-title"
              placeholder="Tambahkan Judul"
            />
          </div>
          <div>
            <input type="file" v-on:change="fileHandle" ref="file" />
          </div>
          <div class="form-group mt-3">
            <wysiwyg v-model="content" />
          </div>
          <button type="submit" class="btn btn-primary publish">
            <i class="far fa-edit"></i> Updated
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../server";
import Swal from "sweetalert2";
export default {
  props: ["article"],
  data() {
    return {
      title: "",
      content: "",
      image: null
    };
  },
  methods: {
    editArticle() {
      axios
        .put(
          `articles/${this.article._id}`,
          {
            title: this.title,
            content: this.content,
            image: this.image
          },
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(({ data }) => {
          Swal.fire({
            title: "Success!",
            text: `Your article success to updated`,
            icon: "success",
            confirmButtonText: "Cool"
          });
          this.$emit("edited");
        })
        .catch(err => {
          Swal.fire({
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "Cool"
          });
        });
    },
    fileHandle() {
      let formData = new FormData();
      formData.append("image", this.$refs.file.files[0]);

      axios({
        method: "POST",
        url: "http://localhost:3000/articles/image",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.image = data.image;
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },
  created() {
    this.title = this.article.title;
    this.content = this.article.content;
  }
};
</script>

<style scoped>
#dashboard-content {
  height: 80vh;
  min-height: 80vh;
  overflow: scroll;
}

#add-article {
  padding: 20px;
}

#create-title {
  background-color: #f9f9f9;
  border-radius: 0 !important;
  height: 100px;
  text-align: center;
  font-size: 48px;
  font-family: "Sulphur Point", sans-serif;
  border-color: #00ccaa;
  border-width: 0 0 0 4px;
}

#create-title:hover {
  border-color: #00b699;
  border-radius: 0 !important;
  border-width: 0 0 0 4px;
}

#create-title:focus {
  border-color: #00b699;
  border-radius: 0 !important;
  border-width: 1px 1px 1px 4px;
  box-shadow: none;
}

.publish {
  background-color: #00ccaa;
  border-color: #00ccaa;
  box-shadow: none !important;
  font-family: "Sulphur Point", sans-serif;
  color: #f9f9f9;
}

.publish:hover {
  background-color: #00b699;
  border-color: #00b699;
  box-shadow: none !important;
}

.publish:focus {
  background-color: #00b699;
  border-color: #00b699;
  box-shadow: none !important;
}
</style>
