<template>
  <div class="demo-blog__posts mdl-grid">
          <div class="mdl-card nav coffee-pic mdl-cell mdl-cell--8-col">
            <div class="mdl-card__supporting-text meta mdl-color-text--grey-600" style="margin-left: 38%;">
              <div>
                  <h4><strong>wowordpress</strong></h4>
              </div>
            </div>
          </div>

          <div class="mdl-card nav something-else mdl-cell mdl-cell--4-col-desktop">
            <button class="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--fab mdl-color--accent" @click="showAdd">
              <i class="material-icons mdl-color-text--white" role="presentation">add</i>
              <span class="visuallyhidden">add</span>
            </button>
            <div class="mdl-card__supporting-text non-demo meta meta--fill mdl-color-text--grey-600" @click="showAll">
                <div>
                  <strong>Homepage</strong>
                </div>
            </div>
            <div class="mdl-card__supporting-text non-demo meta meta--fill mdl-color-text--grey-600" @click="showMine">
              <div>
                <strong>MyArticle</strong>
              </div>
            </div>
            <div class="mdl-card__supporting-text non-demo meta meta--fill mdl-color-text--grey-600" @click="logout">
              <div>
                <strong>sign out</strong>
              </div>
            </div>
          </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props :['online'],
  methods:{
      logout(){
          localStorage.removeItem('email')
          localStorage.removeItem('access_token')
          swal({
            title: "Good bye!",
            icon: "success",
          });
          this.$emit('logout')
      },
      showAdd(){
        this.$emit('showAdd')
      }
      ,
      showAll(){
        this.$emit('showArticle','all')
      },
      showMine(){
        this.$emit('showArticle','mine')
      }
  }
};
</script>

<style scoped>
</style>