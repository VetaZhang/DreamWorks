<template lang="html">
  <div class="list-item" @click="handleClick" @dblclick="handleDbClick">
    <input ref="input" :value="value"
      @input="handleInput"
      @keydown.enter="handleEnter"/>
    <img :src="require('./close-icon.svg')" @click="handleRemove">
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
    handleClick(e) {
      this.$emit('select');
    },
    handleDbClick(e) {
      this.$refs.input.focus();
    },
    handleEnter(e) {
      this.$refs.input.blur();
    },
    handleRemove(e) {
      this.$emit('remove');
    }
  }
}
</script>

<style lang="css" scoped>
.list-item {
  position: relative;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;

  input {
    width: 100%;
    height: 30px;
    padding: 0 10px;
    font-size: 14px;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0);
    box-sizing: border-box;
    outline: none;
    pointer-events: none;
    box-sizing: border-box;

    &:focus {
      border-bottom: 1px solid #eee;
      pointer-events: auto;
    }
  }
  img {
    position: absolute;
    top: 17px;
    right: 5px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
}
</style>
