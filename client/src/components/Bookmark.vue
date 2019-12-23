<template>
  <div>
    <div class="card bookmark-wrapper" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Your Bookmark</h5>
        <hr>
        <div class="mt-2 container">
          <bookmarkItem :bookmark="bookmarkdetail"></bookmarkItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import bookmarkItem from './BookmarkItem'

export default {
  components:{
    bookmarkItem
  },
  props: ['bookmarkdetail']
}
</script>

<style scoped>
.bookmark-wrapper{
  height: 300px;
  max-height: 300px;
  overflow: auto;
}
</style>