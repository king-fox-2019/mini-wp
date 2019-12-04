<template>
  <div class="container-fluid" id="write-wrapper">
    <vue-editor
      v-model="content"
      placeholder="Start your journey..."
    ></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      content: ''
    }
  }
}
</script>

<style lang="scss">
#write-wrapper {
  padding-top: 4.5rem;
}

.quillWrapper {
  height: 80vh !important;
  // overflow-y: scroll;
}

#quill-container {
  overflow-y: scroll;
}

.ql-toolbar {
  display: flex;
  width: 100%;
  overflow-x: scroll;

  .ql-formats {
    display: block !important;
    flex-shrink: 0;
    width: auto;
  }
}

.ql-formats {
  .ql-picker-item {
    color: #444;
  }

  span:hover,
  button:hover,
  svg:hover,
  .ql-active,
  .ql-selected {
    color: #9e2b25 !important;
    .ql-stroke {
      stroke: #9e2b25 !important;
    }
    .ql-fill {
      fill: #9e2b25 !important;
    }
  }
}
</style>
