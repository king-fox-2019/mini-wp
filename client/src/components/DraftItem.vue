<template>
  <div>
    <div class="d-flex mb-2" v-for="(data, index) in draft" :key="index">
      <div class="mr-5">
        <h2>{{ index+1 }}</h2>
      </div>
      <div class="d-flex">
        <img :src="data.featured_image" class="mr-3" alt="" width="128px" height="128px">
      </div>
      <div class="d-flex flex-column container justify-content-between">
        <div class="">
          <p class="mt-0 draft-title" @click.prevent="detail(data._id)">{{ data.title }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <div>
            <button class="btn btn-primary">Edit</button>
            <button class="btn btn-success">Post</button>
          </div>
          <div>
            <button class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return {}
    },
    props: ['draft'],
    methods:{
      detail(id){
        
      }
    }
}
</script>

<style scoped>
.draft-title{
  font-size: 20px;
}

.draft-title:hover{
  cursor: pointer;
  color: blue;
}
</style>