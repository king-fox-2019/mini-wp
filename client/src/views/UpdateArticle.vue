<!--
<template>
  <div>
    <form @submit.prevent="edit">
      <sui-input v-model="title" placeholder="Title..."></sui-input>
      <br />
      <wysiwyg v-model="content"></wysiwyg>

      <div class="container">
        <img v-if="!file" :src="img" alt="old_pict" />
        <div class="input">
          <input @change="previewFiles" ref="myFiles" name="input" id="file" type="file" />
        </div>
      </div>

      <tags-input
        element-id="tags"
        v-model="tags"
        :existing-tags="[
        { key: 'activity-books', value: 'Activity Books' },
        { key: 'animals-and-nature', value: 'Animals And Nature' },
        { key: 'baby-shower-gifts', value: 'Baby Shower Gifts' },
        { key: 'bedtime-and-bathtime', value: 'Bedtime And Bathtime' },
        { key: 'mindfulness-and-manners', value: 'Mindfulness And Manners' }
    ]"
        :typeahead="true"
        only-existing-tags
      ></tags-input>
      <sui-button type="submit">Submit</sui-button>
    </form>
  </div>
</template>
-->




<template>
  <div class="contained" style="margin-top: 30px;">
    <form @submit.prevent="edit">
      <sui-input class="full-width" v-model="title" placeholder="Title..."></sui-input>
      <br />
      <wysiwyg v-model="content"></wysiwyg>

      <div class="container">
        <img style="width: 150px;" v-if="!file" :src="img" alt="old_pict" />
        <div class="input">
          <input @change="previewFiles" ref="myFiles" name="input" id="file" type="file" />
        </div>
      </div>

      <tags-input
        element-id="tags"
        v-model="tags"
        :existing-tags="[
        { key: 'activity-books', value: 'Activity Books' },
        { key: 'animals-and-nature', value: 'Animals And Nature' },
        { key: 'baby-shower-gifts', value: 'Baby Shower Gifts' },
        { key: 'bedtime-and-bathtime', value: 'Bedtime And Bathtime' },
        { key: 'mindfulness-and-manners', value: 'Mindfulness And Manners' }
    ]"
        :typeahead="true"
        only-existing-tags
      ></tags-input>
      <sui-button class="is-primary-bg mt" type="submit">Submit</sui-button>
    </form>
  </div>
</template>






<script>
import axios from "../helpers/axios";
// import VueTagsInput from "@johmun/vue-tags-input";
import Tags from "../components/Tags";

// $(function() {
//   var container = $(".container"),
//     inputFile = $("#file"),
//     img,
//     btn,
//     txt = "change image",
//     txtAfter = "Browse another pic";

//   if (!container.find("#upload").length) {
//     container
//       .find(".input")
//       .append('<input type="button" value="' + txt + '" id="upload">');
//     btn = $("#upload");

//     container.prepend('<img class="hidden"  id="uploadImg" width="100">');
//     img = $("#uploadImg");
//   }

//   btn.on("click", function() {
//     img.animate({ opacity: 0 }, 300);
//     inputFile.click();
//   });

//   inputFile.on("change", function(e) {
//     container.find("label").html(inputFile.val());

//     var i = 0;
//     for (i; i < e.originalEvent.srcElement.files.length; i++) {
//       var file = e.originalEvent.srcElement.files[i],
//         reader = new FileReader();

//       reader.onloadend = function() {
//         img.attr("src", reader.result).animate({ opacity: 1 }, 700);
//       };
//       reader.readAsDataURL(file);
//       img.removeClass("hidden");
//     }

//     btn.val(txtAfter);
//   });
// });

export default {
  name: "UpdateArticle",
  data: function() {
    return {
      content: "",
      name: "",
      file: null,
      title: "",
      tags: [],
      img: ""
    };
  },
  components: {
    Tags
  },
  methods: {
    edit() {
      if (this.file) {
        let formData = new FormData();
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("image", this.file);

        axios
          .patch(`/articles/${this.$route.params.id}/gcs`, formData, {
            headers: {
              access_token: localStorage.getItem("token")
            }
          })
          .then(({ data }) => {
            this.file = null;
            this.$router.push("/");
          })
          .catch(err => {
            if (err.response) {
              this.$toastr.h("Error!").i(err.response.data.message);
            } else {
              this.$toastr.h("Error!").i(`Couldn't connect to server`);
            }
          });
      } else {
        axios
          .patch(
            `/articles/${this.$route.params.id}`,
            {
              title: this.title,
              content: this.content,
              tags: this.tags
            },
            {
              headers: {
                access_token: localStorage.getItem("token")
              }
            }
          )
          .then(({ data }) => {
            this.file = null;
            this.$router.push("/");
          })
          .catch(err => {
            if (err.response) {
              this.$toastr.h("Error!").i(err.response.data.message);
            } else {
              this.$toastr.h("Error!").i(`Couldn't connect to server`);
            }
          });
      }
    },
    previewFiles(event) {
      this.file = event.target.files["0"];
    },
    changeTags(tags) {
      this.tags = tags;
    },
    fetchDetailArticle() {
      axios
        .get(`/articles/${this.$route.params.id}`)
        .then(({ data }) => {
          this.article = data;
          this.content = data.content;
          this.name = data.name;

          this.img = data.image;
          this.title = data.title;
          this.tags = data.tags;
        })
        .catch(err => {
          if (err.response) {
            this.$toastr.h("Error!").i(err.response.data.message);
          } else {
            this.$toastr.h("Error!").i(`Couldn't connect to server`);
          }
        });
    }
  },
  computed: {
    tagsText() {
      let result = [];
      this.tags.forEach(tag => {
        result.push(tag.text);
      });

      return result;
    }
  },
  created() {
    this.fetchDetailArticle();
  },
  mounted() {

$(function() {
  var container = $(".container"),
    inputFile = $("#file"),
    img,
    btn,
    txt = "change image",
    txtAfter = "Browse another pic";

  if (!container.find("#upload").length) {
    container
      .find(".input")
      .append('<input type="button" value="' + txt + '" id="upload">');
    btn = $("#upload");

    container.prepend('<img class="hidden"  id="uploadImg" width="100">');
    img = $("#uploadImg");
  }

  btn.on("click", function() {
    img.animate({ opacity: 0 }, 300);
    inputFile.click();
  });

  inputFile.on("change", function(e) {
    container.find("label").html(inputFile.val());

    var i = 0;
    for (i; i < e.originalEvent.srcElement.files.length; i++) {
      var file = e.originalEvent.srcElement.files[i],
        reader = new FileReader();

      reader.onloadend = function() {
        img.attr("src", reader.result).animate({ opacity: 1 }, 700);
      };
      reader.readAsDataURL(file);
      img.removeClass("hidden");
    }

    btn.val(txtAfter);
  });
});
  }
};
</script>

<style scoped>
.container {
  width: 200px;
  margin: 50px auto;
  font-family: sans-serif;
}
label {
  display: block;
  max-width: 200px;
  margin: 0 auto 15px;
  text-align: center;
  word-wrap: break-word;
  color: #1a4756;
}
.hidden,
#uploadImg:not(.hidden) + label {
  display: none;
}
#file {
  display: none;
  margin: 0 auto;
}
#upload {
  display: block;
  padding: 10px 25px;
  border: 0;
  margin: 0 auto;
  font-size: 15px;
  letter-spacing: 0.05em;
  cursor: pointer;
  background: #216e69;
  color: #fff;
  outline: none;
  transition: 0.3s ease-in-out;
}
#upload:hover,
#upload:focus {
  background: #1aa39a;
}
#upload:active {
  background: #13d4c8;
  transition: 0.1s ease-in-out;
}
img {
  display: block;
  margin: 0 auto 15px;
}
</style>