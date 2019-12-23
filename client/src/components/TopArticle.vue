<template>
  <div class="contained">

    <sui-grid :columns="2" divided>
      <sui-grid-row stretched>
        <sui-grid-column class="card">
          <!-- <sui-segment > -->
          <sui-item-group>
            <sui-item>
              <img class="img" src="../assets/a.jpg" />
              <!-- <sui-item-image src="../assets/undraw-children.png" /> -->
              <sui-item-content>
                <sui-item-header>Header</sui-item-header>
              </sui-item-content>
            </sui-item>
          </sui-item-group>
          <!-- </sui-segment> -->
        </sui-grid-column>
        <sui-grid-column class="card">
            <sui-item-group>
            <sui-item>
              <img class="img" src="../assets/a.jpg" />
              <!-- <sui-item-image src="../assets/undraw-children.png" /> -->
              <sui-item-content>
                <sui-item-header>Header</sui-item-header>
              </sui-item-content>
            </sui-item>
          </sui-item-group>
            <sui-item-group>
            <sui-item>
              <img class="img" src="../assets/a.jpg" />
              <!-- <sui-item-image src="../assets/undraw-children.png" /> -->
              <sui-item-content>
                <sui-item-header>Header</sui-item-header>
              </sui-item-content>
            </sui-item>
          </sui-item-group>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
export default {
  name: "TopArticle"
};
</script>

<style scoped>
.card {
  border-radius: none !important;
  background-color: white;
  padding: 0 !important;
}

img {
  width: 130px;
  height: 127px;
  margin-right: 30px;
}
</style>




