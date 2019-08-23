<template lang="html">
  <textarea class="textarea" :value="value" @input="handleInput" @keydown.tab.prevent="handleTab"></textarea>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
    handleTab(e) {
      const dom = e.target;
      const s = dom.selectionStart;
      dom.value = dom.value.substring(0, dom.selectionStart) + "\t" +  dom.value.substring(dom.selectionEnd);
      dom.selectionEnd = s + 1;
      this.$emit('input', e.target.value);
    }
  }
}
</script>

<style lang="css">
.textarea {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 40px 20px;
  line-height: 2;
  font-size: 14px;
  border: none;
  outline: none;
  resize: none;
  box-sizing: border-box;
}
</style>
