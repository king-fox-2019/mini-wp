<template>
  <div class="container">
  <section class="hero is-primary"  v-bind:style="{ backgroundImage: 'url('+ article.imgUrl +')', backgroundSize:'cover', height:'400px'}">
  <div class="hero-body">
    <div class="container" style="background-color: #f2f2f2; width:500px; padding:15px; margin-top:120px">
      <h1 class="title" style="color:black">
        {{ article.title }}
      </h1>
      <h3 class="subtitle" style="color:grey">
        {{ article.userId.name }} | <span style="font-size:15px"> {{ formatDate(article.createdAt) }}</span>
      </h3>
    </div>
  </div>
  </section>
  <div style="display: flex; justify-content:space-between"> 
    <div style="display: flex; justify-content:flex-start; margin-top:20px">
        <div style="margin-right:10px" v-for="(tag, i) in article.tags" :key="i">
          <b-taglist attached>
              <b-tag type="is-dark">{{ tag }}</b-tag>
          </b-taglist>
        </div>
    </div>
    <div style="margin-top:20px">
                              <div
                            class="fb-share-button"
                            :data-href="article.imgUrl"
                            data-layout="button"
                            data-size="small"
                            >
                            <a
                                style="text-align: left"
                                target="_blank"
                                :href="'https://www.facebook.com/sharer/sharer.php?u=' + article.imgUrl"
                                class="fb-xfbml-parse-ignore"
                                onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"
                            >
                                <span style="text-align: left">
                                <img src="https://www.pngkey.com/png/detail/207-2071361_facebook-share-icon-small.png" style="width: 100px">
                                </span>
                            </a>
                        </div>
    </div>
  </div>
  <div style="margin-top:20px" v-html="article.content">
  </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'detailarticle',
    props: ['article'],
    methods: {
        formatDate(date) {
            return moment(date).fromNow()
        }
    }
}
</script>

<style>

</style>