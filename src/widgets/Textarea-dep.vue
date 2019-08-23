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
      console.log('tab')
      const dom = e.target;
      const s = dom.selectionStart;
      dom.value = dom.value.substring(0,dom.selectionStart) +"\t" + dom.value.substring(dom.selectionEnd);
      dom.selectionEnd = s + 1;
    }
  }
}
</script>

<style lang="css">
.textarea {
  display: block;
  width: 90%;
  height: 400px;
  margin: auto;
  padding: 20px;
  font-size: 14px;
  border: 1px solid #eee;
  border-radius: 4px;
  outline: none;
  resize: none;
}
</style>
