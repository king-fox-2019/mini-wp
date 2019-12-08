<template>
  <div class="container">
    <div class="contained" >
    <a is="sui-label" basic color="purple">All Articles</a>
    </div>
  </div>
</template>

<script>
export default {

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

