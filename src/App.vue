<style>
.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'SF UI DISPLAY','PingFang SC','Hiragino Sans GB','Source Han Sans CN','Source Han Sans SC','Microsoft YaHei','ST Heiti','SimHei';
}
</style>

<template lang="html">
  <div class="app">
    <Overview />
    <EditArea />
  </div>
</template>

<script>
import store from './store';
import { mapState, mapActions, mapMutations } from 'vuex';
import Url from 'domurl';

import Overview from './components/Overview';
import EditArea from './components/EditArea';

export default {
  store,
  data () {
    return {
      //
    };
  },
  mounted() {
    const url = new Url();
    this.updateDir(url.query.path);
    this.readProject();
  },
  computed: {
    //
  },
  methods: {
    ...mapMutations(['updateDir']),
    ...mapActions(['readProject'])
  },
  components: {
    Overview,
    EditArea
  }
}
</script>
