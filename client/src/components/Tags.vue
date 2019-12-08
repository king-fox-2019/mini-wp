<template>
  <div>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :autocomplete-items="filteredItems"
      @tags-changed="newTags => tags = newTags"
    />
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
      autocompleteItems: [{
        text: 'Activity Books',
      }, {
        text: 'Animals & Nature',
      }, {
        text: 'Baby Shower Gifts',
      }, {
        text: 'Bedtime & Bathtime ',
      }, {
        text: 'Mindfulness & Manners',
      }],
    };
  },
  // watch : {
  //   tags() {
  //     this.$emit('changeTags', this.tags)
  //   }
  // },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
  },
};
</script>