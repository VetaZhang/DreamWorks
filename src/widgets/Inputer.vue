<template lang="html">
  <input class="input" type="text" :value="value" :style="style || {}"
    @input="handleEvent('input', $event)"
    @change="handleEvent('change', $event)"
    @keydown.enter="handleEvent('enter', $event)"/>
</template>

<script>
export default {
  props: ['type', 'value', 'style'],
  data() {
    return {
      //
    };
  },
  methods: {
    handleEvent(eventName, event) {
      this.$emit(eventName, event.target.value);
      if (eventName === 'enter') {
        event.target.value = '';
      }
    },
  }
}
</script>

<style lang="css">
.input {
  display: inline-block;
  height: 35px;
  margin: 0 20px 20px 20px;
  padding: 0 10px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #eee;
  outline: none;
  box-sizing: border-box;
}
</style>
