<template lang="html">
  <div class="list-display-box">
    <div class="item" v-for="(item, index) in data">
      <span class="name">{{item}}</span>
      <span class="remove" @click="handleRemove(index)">×</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    handleRemove(index) {
      this.$emit('remove', index);
    }
  }
}
</script>

<style lang="css">
.list-display-box {
  padding: 10px 15px;

  .item {
    display: inline-block;
    height: 20px;
    margin: 0 6px;
    line-height: 20px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    border-radius: 4px;
    background-color: #2d91ee;

    span {
      display: inline-block;
      padding: 0 5px;
    }
    .remove {
      border-left: 1px solid #aaa;
      cursor: pointer;
    }
  }
}
</style>
