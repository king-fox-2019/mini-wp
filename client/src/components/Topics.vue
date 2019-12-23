<template>
  <div class="topic-container">
    <span v-for="(topic, i) in topics" :key="i">
      <a
        @click="$router.push('/articles/' + topic.split(' ').join('-').toLowerCase())"
        is="sui-label"
        basic
      >{{topic}}</a>
    </span>
  </div>
</template>

<script>
// red orange yellow olive green teal blue violet purple pink brown grey ssblack
export default {
  data: function() {
    return {
      topics: [
        "All",
        "Activity Books",
        "Animals And Nature",
        "Baby Shower Gifts",
        "Bedtime And Bathtime",
        "Mindfulness And Manners"
      ]
    };
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
  /* color: rgb(197, 67, 67) !important; */
  font-size: 15px;
  cursor: pointer;
  /* box-shadow: none !important; */
  text-align: center;
  /* padding-top: 5px !important; */
  font-family: "Antic", sans-serif !important;
  margin: 10px !important;

  color: white !important;
  background-color: #ab7a6ca6 !important;
}
a:hover {
  /* border-width: 1px !important; */
  /* color: white !important;
  background-color: #AB7A6C !important; */
  box-shadow: none !important;
  color: #ab7a6ca6 !important;
   background-color: #ffffff !important;
}
.topic-container {
  /* background-color: #FAE9E3; */
  height: 12vh;
  text-align: center;
  padding: 23px;
}
@import url("https://fonts.googleapis.com/css?family=Antic&display=swap");
</style>
