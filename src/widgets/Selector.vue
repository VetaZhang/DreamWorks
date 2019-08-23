<template lang="html">
  <div class="selector">
    <div class="button" @click="toggleOptions()"
      :style="{color: valueText ? '#222' : '#ababab'}">
      {{valueText || placeholder}}
    </div>
    <div class="options" v-show="showOptions">
      <div class="item" v-for="item in options" @click="select(item)">
        {{item}}
        <span v-show="valueText.indexOf(item) >= 0">已选择</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'options', 'placeholder'],
  data() {
    return {
      showOptions: false
    };
  },
  computed: {
    valueText() {
      if (typeof this.value === 'string') {
        return this.value;
      } else {
        return this.value.join(', ');
      }
    }
  },
  methods: {
    toggleOptions(bool) {
      if (typeof bool === 'undefined') {
        this.showOptions = !this.showOptions;
      } else {
        this.showOptions = bool;
      }
    },
    select(value) {
      if (typeof this.value === 'string') {
        if (this.value === value) {
          this.$emit('input', '');
        } else {
          this.$emit('input', value);
        }
      } else {
        if (this.value.includes(value)) {
          this.$emit('input', this.value.filter((item) => item !== value));
        } else {
          this.$emit('input', this.value.concat([value]));
        }
      }
      this.toggleOptions(false);
    }
  }
}
</script>

<style lang="css" scoped>
.selector {
  position: relative;

  .button {
    min-height: 35px;
    padding: 0 10px;
    line-height: 35px;
    font-size: 14px;
    color: #222;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    cursor: pointer;

  }
  .options {
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    max-height: 175px;
    border: 1px solid #eee;
    border-top: none;
    border-radius: 0 0 4px 4px;
    background-color: #fff;
    overflow: auto;

    .item {
      position: relative;
      width: 100%;
      height: 35px;
      padding: 0 10px;
      line-height: 35px;
      font-size: 14px;
      color: #222;
      cursor: pointer;
      box-sizing: border-box;

      &:hover {
        color: #fff;
        background-color: #2d91ee;
      }
      span {
        position: absolute;
        top: 0;
        right: 10px;
        line-height: 35px;
      }
    }
  }
}
</style>
