<template lang="html">
  <selector
    ref="selector"
    :value="value"
    :options="options"
    :multiple="multiple"
    @input="handleInput">
  </selector>
</template>

<script>
import Selector from 'vue-multiselect';

export default {
  props: ['value', 'options', 'multiple'],
  mounted() {
    console.log(this.$refs.selector.$el)
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value || '');
    }
  },
  components: {
    Selector
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
