<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" id="brand-title" href="#">Tech Press</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
          <button class="btn btn-outline-danger my-2 my-sm-0 mr-2" type="submit">Signin</button>
          <button class="btn btn-danger my-2 my-sm-0" type="submit">Signout</button>
        </div>
      </nav>
</div>
</template>

<script>
export default {
}
</script>

<style scoped>
.btn-danger:hover{
  color: red;
  background-color: white;
}
</style>