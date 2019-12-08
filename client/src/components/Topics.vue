<template>
  <div class="container">
    <div  class="contained" >
      <span v-for="(topic, i) in topics" :key="i" >

    <a @click="$router.push('/articles/' + topic.split(' ').join('-').toLowerCase())" is="sui-label" basic color="pink">{{topic}}</a>
      </span>


    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      topics : ['All', 'Activity Books', 'Animals And Nature', 'Baby Shower Gifts' , 'Bedtime And Bathtime', 'Mindfulness And Manners' ]
    }
  }
};
</script>

<style scoped>
a {
  display: block;
	 margin: 0 auto;
	 /* width: 150px; */
	 height: 36px;
	 border-radius: 90px !important;
	 color: rgb(197, 67, 67) !important;
	 font-size: 15px;
	 cursor: pointer;
   box-shadow: none !important;
   text-align: center;
   padding-top: 10px !important;
   font-family: 'Antic', sans-serif !important;
}
a:hover {
  border-width: 2px !important;
}
.container {
  background-color: #F6E8F7;
  height: 11vh;
  text-align: center;
  padding: 23px;
}
@import url('https://fonts.googleapis.com/css?family=Antic&display=swap');
</style>
