<template>
  <div class="ui right aligned grid">
    <div class="right floated left aligned eight wide column" id="column">
      <div class="ui icon warning message">
        <i class="lock icon"></i>
        <div class="content">
          <p>{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "messageBox",
  props: ["message"],
  data() {
    return {};
  }
};
</script>

<style scoped>
#column {
  margin-right: 35vh;
}
</style>