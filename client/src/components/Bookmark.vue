<template>
  <div>
    <div class="card bookmark-wrapper" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Your Bookmark</h5>
        <hr>
        <div class="mt-2">
          <bookmarkItem></bookmarkItem>
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
  }
}
</script>

<style scoped>
.bookmark-wrapper{
  height: 300px;
  max-height: 300px;
}
</style>