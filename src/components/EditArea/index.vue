<template lang="html">
  <div class="edit-area">
    <components :is="editorType"></components>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

import Common from '../FileTypes/Common';
import Character from '../FileTypes/Character';
import Movie from '../FileTypes/Movie';

export default {
  data() {
    return {
      editorType: ''
    };
  },
  watch: {
    selected(newValue) {
      if (this.editorType === this.fileType) {
        this.editorType = '';
        this.$nextTick(() => {
          this.editorType = this.fileType;
        });
      } else {
        this.editorType = this.fileType;
      }
    }
  },
  computed: {
    ...mapState(['selected', 'files']),
    ...mapGetters(['fileType'])
  },
  components: {
    Common,
    Character,
    Movie
  }
}
</script>

<style lang="css">
.edit-area {
  float: left;
  width: calc(100% - 200px);
  height: 100vh;
}
</style>
