<template lang="html">
  <button class="button" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
}
</script>

<style lang="css" scoped>
.button {
  display: inline-block;
  min-width: 80px;
  height: 35px;
  padding: 0 15px;
  color: #fff;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: #2d91ee;
  cursor: pointer;
  outline: none;
}
</style>
