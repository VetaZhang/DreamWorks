<template lang="html">
  <div class="script-editor">
    <editor :value="script.content" @input="handleInput"/>
  </div>
</template>

<script>
import Editor from '../../../widgets/Editor';

export default {
  props: {
    script: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  methods: {
    handleInput(value) {
      let newScript = this.script;
      newScript.content = value;
      this.$emit('input', newScript);
    }
  },
  components: {
    Editor
  }
}
</script>

<style lang="css" scoped>
.script-editor {
  width: 90%;
  height: 100%;
  margin: 5%;
}
</style>
