<template>
  <div>
    <Navbar :userLogin="userLogin"></Navbar>
    <div id="headss">
      <h1 class="title" id="title">{{details.title}}</h1>
      <h4>{{details.author.name}}</h4>
      <h5>{{convertMoment}} - {{reading}}</h5>
    </div>
    <div id="bodymain">
      <div style="text-align: center;">
        <img :src="details.image" style="width: auto; height: 350px;" />
      </div>
      <div v-html="details.content"></div>
    </div>
    <div></div>
  </div>
</template>

<script>
import axios from "../../config/axios";
import Navbar from "../components/Navbar.vue";
import truncate from "truncate-html";
import moment from "moment";
import readingTime from "reading-time";

export default {
  name: "Article",
  components: {
    Navbar
  },
  data() {
    return {
      details: {},
      userLogin: false
    };
  },
  methods: {
    getToken() {
      if (localStorage.getItem("token")) {
        this.userLogin = true;
      } else {
        this.userLogin = false;
      }
    },
    getThisArticle() {
      const loadingComponent = this.$buefy.loading.open();
      axios({
        methods: "get",
        url: `/articles/slug/${this.$route.params.slug}`
      })
        .then(({ data }) => {
          loadingComponent.close();
          // console.log(data);
          this.details = data;
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
    }
  },
  computed: {
    // name() {
    //   return this.details.author.name;
    // },
    convertMoment() {
      return moment(this.details.createdAt).from(new Date());
    },
    reading() {
      truncate.setup({ stripTags: true, length: 10000 });
      let text = truncate(this.details.content);
      return readingTime(text).text;
    }
  },
  created() {
    this.getToken();
    this.getThisArticle();
  }
};
</script>

<style>
.title {
  /* margin-bottom: 0px !important; */
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
#title {
  font-size: 30px;
  color: black;
}
#bodymain {
  width: 80%;
  margin: 20px auto;
}
#headss {
  width: 80%;
  margin: 10px auto;
}
</style>