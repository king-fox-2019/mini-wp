<template>
  <div>
    <sui-menu :widths="4" class="navbar" borderless compact>
      <sui-menu-item>
        <sui-grid class="full-width">
          <sui-grid-row stretched>
            <sui-grid-column :width="8" class="logo" @click="$router.push('/')" style="cursor: pointer;">
              Brightly
            </sui-grid-column>
            <sui-grid-column :width="8" class="tagline">
              Raise Kids
              <br />Who Love to Read
            </sui-grid-column>
          </sui-grid-row>
        </sui-grid>
      </sui-menu-item>
      <sui-menu-item></sui-menu-item>
      <sui-menu-item>
        <sui-grid class="full-width">
          <sui-grid-row stretched>
            <sui-grid-column
              @click="$router.push('/add-article')"
              :width="4"
              style="color: white; padding-right: 30% !important; cursor: pointer;"
            >Add Article</sui-grid-column>
            <sui-grid-column :width="3">
              <!-- <sui-icon style="color: white; margin-left: 80% !important;" name="search" /> -->
            </sui-grid-column>
            <sui-grid-column
              @click="$router.push('/signin')"
              :width="4"
              style="color: white; padding-right: 30% !important; cursor: pointer;"
            >Sign In</sui-grid-column>


            <sui-grid-column
              @click="$router.push('/signin')"
              :width="4"
              style="color: white; padding-right: 30% !important; cursor: pointer;"
            >

<!-- 
              <div class="ui search">
                <div class="ui icon input">
                  <input class="prompt" type="text" placeholder="Search..." />
                  <i class="search icon"></i>
                </div>
                <div class="results"></div>
              </div> -->
            </sui-grid-column>


            <sui-grid-column
              @click="$router.push('/signout')"
              :width="4"
              style="color: white; padding-right: 30% !important; cursor: pointer;"
            >Sign Out</sui-grid-column>
          </sui-grid-row>
        </sui-grid>
      </sui-menu-item>
    </sui-menu>
  </div>
</template>

<script>

export default {
  name: "Navbar"
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Yeseva+One&display=swap');
.navbar {
  background: #eda28b !important;
  border: none !important;
  border-radius: 0 !important;
  height: 70px;

  /* overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%; */
}
.full-width {
  width: 100%;
}
.logo {
  font-family: 'Yeseva One', cursive !important;
  font-size: 30px;
  color: white;
  border-right: 1px solid white !important;
  text-align: right;
}
.tagline {
  text-align: left;
  color: white;
}


</style>

