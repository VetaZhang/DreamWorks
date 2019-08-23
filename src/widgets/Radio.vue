<template lang="html">
  <div class="radio">
    <span class="item" v-for="item in options" @click="handleInput(item)">
      <span class="unactived" v-show="value !== item"></span>
      <span class="actived" v-show="value === item">
        <span></span>
      </span>
      <span class="label">{{item}}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: ['value', 'options'],
  data() {
    return {
      currentValue: this.value
    };
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value);
    }
  }
}
</script>

<style lang="css" scoped>
.radio {
  margin: 10px;
  font-size: 14px;

  .item {
    display: inline-block;
    margin: 0 12px;
    cursor: pointer;

    .unactived {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 1px solid #dfe4e7;
      border-radius: 8px;
      vertical-align: middle;
      box-sizing: border-box;
    }
    .actived {
      display: inline-block;
      position: relative;
      width: 16px;
      height: 16px;
      background-color: #43ca74;
      border-radius: 8px;
      vertical-align: middle;
    }
    .actived span {
      display: inline-block;
      position: absolute;
      top: 6px;
      left: 6px;
      width: 4px;
      height: 4px;
      background-color: #fff;
      border-radius: 2px;
    }
    .label {
      display: inline-block;
      margin-left: 6px;
      vertical-align: middle;
    }
  }
}
</style>
