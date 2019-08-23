<template lang="html">
  <div class="common-editor">
    <Editor v-model="common.text" @input="diffSelected"/>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import Editor from '../../widgets/Editor';

export default {
  computed: {
    ...mapState(['common'])
  },
  methods: {
    ...mapMutations(['diffSelected']),
    ...mapMutations('common', ['updateText'])
  },
  components: {
    Editor
  }
}
</script>

<style lang="css" scoped>
.common-editor {
  height: 100%;
}
</style>
