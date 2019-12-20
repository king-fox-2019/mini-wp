<template>
  <div class="row" id="body-row">
    <sideBar @set-status="setStatus"> </sideBar>
    <div class="col">
        <myArticle v-if="status === 'myArticle'">
        </myArticle>
        <newArticle v-if="status === 'newArticle'">
        </newArticle>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import sideBar from "../commponents/sideBar"
import myArticle from "../commponents/myArticle"
import newArticle from "../commponents/newArticle"

export default {
  name: "MainPage",
  data() {
    return {
     status : ''
    };
  },
  components: {
   sideBar,
   myArticle,
   newArticle
  },
  methods: {
      setStatus(str){
          this.status = str
      }
  },
  created() {
   
  }
};
</script>

<style>
#body-row {
    margin-left:0;
    margin-right:0;
}
#sidebar-container {
    min-height: 100vh;   
    background-color: #333;
    padding: 0;
}


.sidebar-expanded {
    width: 230px;
}
.sidebar-collapsed {
    width: 60px;
}


#sidebar-container .list-group a {
    height: 50px;
    color: white;
}


#sidebar-container .list-group .sidebar-submenu a {
    height: 45px;
    padding-left: 30px;
}
.sidebar-submenu {
    font-size: 0.9rem;
}


.sidebar-separator-title {
    background-color: #333;
    height: 35px;
}
.sidebar-separator {
    background-color: #333;
    height: 25px;
}
.logo-separator {
    background-color: #333;    
    height: 60px;
}


#sidebar-container .list-group .list-group-item[aria-expanded="false"] .submenu-icon::after {
  content: " \f0d7";
  font-family: FontAwesome;
  display: inline;
  text-align: right;
  padding-left: 10px;
}

#sidebar-container .list-group .list-group-item[aria-expanded="true"] .submenu-icon::after {
  content: " \f0da";
  font-family: FontAwesome;
  display: inline;
  text-align: right;
  padding-left: 10px;
}
</style>