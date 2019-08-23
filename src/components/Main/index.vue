<template lang="html">
  <div class="main">
    <Btn class="createNewDoc" @click="handleCreateProject">
      新项目
    </Btn>
    <Btn class="createNewDoc" @click="handleOpenProject">
      打开
    </Btn>
  </div>
</template>

<script>
import Btn from '../../widgets/Button';
import { selectDir } from '../../lib/file';
import { open } from '../../lib/ipc';

export default {
  data () {
    return {
      store: {}
    };
  },
  // mounted () {
  //   readStore()
  //     .then((store) => {
  //       this.store = store;
  //     });
  // },
  methods: {
    handleCreateProject() {
      selectDir()
        .then((dir) => {
          open({ path: dir });
        });
    },
    handleOpenProject() {
      selectDir()
        .then((dir) => {
          open({ path: dir });
        });
    },
  },
  components: {
    Btn
  }
}
</script>

<style lang="css">
.main-path {
  width: 90%;
  height: 25px;
  margin: 10px 5% 10px 5%;
  padding: 0 10px;
  background-color: #eee;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
