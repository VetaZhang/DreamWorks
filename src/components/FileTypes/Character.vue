<template lang="html">
  <div class="character-editor">
    <div class="list-box">
      <div class="list">
        <ListItem v-for="(item, index) in character.list"
          v-model="item.name"
          @input="diffSelected"
          @select="selectCharacter(index)"
          @remove="handleRemoveCharacter(index)">
        </ListItem>
      </div>
      <div class="add-btn" @click="handleAppendCharacter">
        添加人物
      </div>
    </div>

    <div class="detail" v-if="characterDetail">
      <editor v-model="characterDetail.desc" @input="diffSelected"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import Editor from '../../widgets/Editor';
import ListItem from '../../widgets/ListItem';

export default {
  data() {
    return {};
  },
  computed: {
    characterDetail() {
      return this.character.list[this.character.index] ||  null;
    },
    ...mapState(['character'])
  },
  methods: {
    handleAppendFaction(faction) {
      console.log('append new faction: ', faction);
      if (!this.character.factions.includes(faction)) {
        this.appendFaction(faction);
        this.diffSelected();
      }
    },
    handleRemoveFaction(index) {
      console.log('remove faction: ' + index);
      this.removeFaction(index);
      this.diffSelected();
    },
    handleAppendCharacter() {
      console.log('append new character');
      this.appendCharacter();
      this.diffSelected();
    },
    handleRemoveCharacter(index) {
      console.log('remove character: ' + index);
      this.removeCharacter(index);
      this.diffSelected();
    },
    selectCharacter(index) {
      console.log('select character: ', index);
      this.setIndex(index);
    },
    ...mapMutations(['diffSelected']),
    ...mapMutations('character', [
      'appendFaction',
      'removeFaction',
      'appendCharacter',
      'removeCharacter',
      'setIndex'
    ])
  },
  components: {
    Editor,
    ListItem
  }
}
</script>

<style lang="css" scoped>
.character-editor {
  height: 100%;

  .list-box {
    display: inline-block;
    position: relative;
    width: 120px;
    height: 100%;
    border-right: 1px solid #eee;
    box-sizing: border-box;
    vertical-align: top;

    .add-btn {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 30px;
      line-height: 29px;
      text-align: center;
      border-top: 1px solid #eee;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
  .list {
    position: relative;
    width: 100%;
    height: calc(100% - 30px);
    overflow: auto;

    .item {
      position: relative;
      height: 40px;
      padding: 10px 8px;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;

      .name {
        display: inline-block;
        width: 80px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .remove {
        display: none;
        position: absolute;
        top: 6px;
        right: 8px;
        opacity: 0.7;
        cursor: pointer;
      }
      &:hover .remove {
        display: inline-block;
      }
    }
  }
  .detail {
    display: inline-block;
    width: calc(100% - 130px);
    height: 100%;
    vertical-align: top;
  }
}
</style>
