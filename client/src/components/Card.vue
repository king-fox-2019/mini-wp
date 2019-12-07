<template>
    <div>
      <!-- Card -->
      <div class="card mb-3 article-card">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="" class="card-img" alt="">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <div>
                <h5 class="card-title" style="font-size: 24px; font-family: 'Noto Serif', serif;">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
              <div class="d-flex flex-column">
                <div class="d-flex">
                  <span><small>Avatar</small></span>
                  <span class="mx-2">.</span>
                  <span><small>Author</small></span>
                  <span class="mx-2">.</span>
                  <p class="card-text"><small class="text-muted">3 mins ago</small></p>
                </div>
                <div class="d-flex">
                  <span class="mr-3"><i class="far fa-heart"><small class="ml-2">100 likes</small></i></span>
                  <span><i class="far fa-comment"><small class="ml-2">Comment</small></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Card -->
    </div> 
</template>

<script>
export default {

}
</script>

<style scoped>
.article-card{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-top: 3px #B71C1C solid;
}

.article-card:hover{
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>