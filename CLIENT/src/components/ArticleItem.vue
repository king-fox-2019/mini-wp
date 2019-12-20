<template>
  <div class="ui fluid card">
    <div class="image">
      <img :src="featuredImage" />
    </div>
    <div class="content px-5 py-5">
      <a class="header">{{title}}</a>
      <!-- <div class="meta">Slack is not your friend</div> -->
      <div class="description"
        v-html="content"
        >
      </div>
    </div>
    <div class="extra content">
      <span class="right floated" v-for="(tag, i) in tags" :key="i">
        <a class="ui yellow tag label">{{tag}}</a>
      </span>
    </div>
    <div class="extra content">
      <span class="right floated">
        Dec 6, 2019
      </span>
      <span>
        {{author}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-item',
  props: ['title', 'content', 'tags', 'featuredImage', 'author']
}
</script>

<style>
</style>