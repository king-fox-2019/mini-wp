<template>
  <div class="mdl-card mdl-cell mdl-cell--12-col" >
    <div @click="detailArticle(article._id)" class="mdl-card__media mdl-color-text--grey-50" :style="`background-image: url('${article.image}')`">
        <h3><a href="#">{{article.title}}</a></h3>
    </div>
    <div @click="detailArticle(article._id)" class="mdl-color-text--grey-600 mdl-card__supporting-text">
      {{article.content}} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, tempore voluptatem cumque at molestiae quos sapiente blanditiis beatae rerum maxime dolor impedit veritatis iusto atque? Fugiat nulla omnis dolore mollitia.
    </div>
    <div class="mdl-card__supporting-text meta mdl-color-text--grey-600">     
        <div class="minilogo"></div>
        <div>
            <strong>{{article.author.username}}</strong>
            <span>{{article.created_at}}</span>
        </div>  
        <div class="section-spacer"></div>
        <div style="margin-left:3px;" v-for="(tag, id) in article.Tags" :key="id">
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" @click="seeTag(tag)" >
                {{tag}}
            </button> &nbsp;
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
  props:['article'],
  methods:{
      detailArticle(id){
          this.$emit('see-detail',id)
      },
      seeTag(tag){
        this.$emit('fetchTag', tag)
      }
  }
};
</script>

<style scoped>
</style>