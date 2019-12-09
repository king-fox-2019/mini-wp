<template>
  <div class="card">
    <div class="card-content">
      <div class="columns">
        <div class="column is-four-fifths" id="card-content">
          <div v-if="creator">
            <div>
              <a class="action" @click="editArticle">edit</a>
              <a class="action" @click="conDelArticle">delete</a>
            </div>
          </div>
          <div v-if="bookmark">
            <div>
              <a class="action" @click="conRemBookmark">Remove from bookmark</a>
            </div>
          </div>
          <div id="head" style="cursor:pointer" @click="goToArticle">
            <p class="card-header-title title">{{article.title}}</p>
            <div class="content">
              <div class="contenz" v-html="truncatePreview"></div>
              <!-- <br> -->
            </div>
          </div>
          <div id="footer">
            <p id="author">{{article.author.name}}</p>
            <p id="moment">{{convertMoment}} - {{reading}}</p>
            <div v-if="article.tags.length > 1">
              <div v-for="(tag,i) in article.tags" :key="i" style="display: inline">
                <span class="tagCard">{{ tag }}</span>
              </div>
            </div>
            <b-tooltip
              label="Bookmark this article to read later"
              style="float : right"
              type="is-dark"
              :animated="true"
              position="is-bottom"
            >
              <div @click="addBookmark">
                <b-icon v-if="!creator" style="cursor: pointer" icon="bookmark"></b-icon>
              </div>
            </b-tooltip>
          </div>
        </div>
        <div class="column image" style="cursor:pointer" @click="goToArticle">
          <!-- <div class="card-image"> -->
          <figure class="image is-square">
            <img :src="article.image" style="width: auto; height: 150px;" />
          </figure>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import truncate from "truncate-html";
import axios from "../../config/axios";
import moment from "moment";
import readingTime from "reading-time";

export default {
  name: "Card",
  props: ["article", "creator", "bookmark"],
  methods: {
    goToArticle() {
      this.$router.push({ path: `/${this.article.slug}` });
    },
    editArticle() {
      this.$router.push({ path: `/edit/${this.article._id}` });
    },
    deleteArticle() {
      let articleId = this.article._id;
      const loadingComponent = this.$buefy.loading.open();
      axios({
        method: "delete",
        url: `/articles/remove/${articleId}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          loadingComponent.close();
          this.$buefy.toast.open("Article deleted!");
          this.$emit("fetchDraft");
        })
        .catch(err => {
          loadingComponent.close();
          this.$buefy.toast.open({
            duration: 4000,
            message: `${err.response.data.message}`,
            type: "is-danger"
          });
          console.log(err.response.data);
        });
    },
    addBookmark() {
      let articleId = this.article._id;
      axios({
        url: `/articles/addbookmark/${articleId}`,
        method: "patch",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$buefy.toast.open({
            message: "Bookmarked!",
            type: "is-success"
          });
        })
        .catch(err => {
          console.log(err.response.data);
          this.$buefy.toast.open({
            duration: 3000,
            message: `${err.response.data.message}`,
            type: "is-danger"
          });
        });
    },
    removeBookmark() {
      let articleId = this.article._id;
      axios({
        url: `/articles/removebookmark/${articleId}`,
        method: "patch",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$buefy.toast.open("Bookmark removed!");
          this.$emit("fetchBookmark");
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    conRemBookmark() {
      this.$buefy.dialog.confirm({
        title: "Remove bookmark",
        message: "Are you sure you want to <b>remove</b> this bookmark?",
        confirmText: "Remove",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.removeBookmark()
      });
    },
    conDelArticle() {
      this.$buefy.dialog.confirm({
        title: "Delete article",
        message: "Are you sure you want to <b>delete</b> this article?",
        confirmText: "Delete",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.deleteArticle()
      });
    }
  },
  computed: {
    truncatePreview() {
      truncate.setup({ stripTags: true, length: 130 });
      return truncate(this.article.content);
    },
    convertMoment() {
      return moment(this.article.createdAt).from(new Date());
    },
    reading() {
      return readingTime(this.article.content).text;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins|Raleway&display=swap");

.title {
  margin-bottom: 0px !important;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
#test {
  object-fit: cover !important;
}
.contenz {
  font-family: "Raleway", sans-serif;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
}
.card {
  width: 100%;
  height: 11rem;
}
.card-header-title {
  /* padding: 5px !important; */
}
.card-content {
  padding: 5px 2vh !important;
  height: 100% !important;
}
.columns {
  height: 110% !important;
}
#card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.tagCard {
  font-size: 8px;
  background-color: rgba(94, 94, 94, 0.384);
  padding: 5px;
  border-radius: 3px;
  margin-right: 3px;
}
#author {
  font-size: 12px;
  cursor: pointer;
}
#moment {
  font-size: 10px;
}
#footer {
  margin-top: 10px;
}
.action {
  background-color: rgb(14, 14, 14);
  font-size: 10px;
  padding: 5px;
  border-radius: 3px;
  color: white;
}
.column.image {
  margin: auto 0;
}
</style>