<template>
    <div>
      <b-card border-variant="light" no-body class="overflow-hidden article-card" style="max-height: 200px;">
        <b-row no-gutters>
          <b-col md="6" style="max-width: 320px">
            <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body title="Horizontal Card">
              <b-card-text>
                This is a wider card with supporting text as a natural lead-in to additional content.
                This content is a little bit longer.
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
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
}

.article-card:hover{
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>