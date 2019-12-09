<template>
  <!-- sidebar -->
  <div class="wrapper side_bar">
    <!-- Sidebar -->
    <nav id="sidebar">
      <ul class="list-unstyled components">
        <li>
          <button type="button">Add Article</button>
        </li>
        <li>
          <button type="button" @click="getArticle">My Article</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
.side_bar {
  position: fixed;
  left: 0;
  background-color: rgb(116, 116, 116, 0.6);
  /* color: azure; */
  height: 100vh;
}
</style>