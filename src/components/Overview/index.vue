<template lang="html">
  <div class="overview">
    <div class="logo">
      DreamWorks
    </div>
    <div class="file-list">
      <div class="item"
        v-for="(value, index) in files"
        @click="selectFile(value)">
        <span class="name"
          v-show="!editFileName"
          @dblclick.stop="openEditFileName">
          {{value.content.name}}
        </span>
        <input type="text"
          v-show="editFileName"
          v-model="value.content.name"
          @blur="closeEditFileName"
          @keydown.enter="closeEditFileName"
          @input="diffSelected">
        <span class="save"
          v-show="value.edited"
          @click.stop="saveFile(value)">
          保存
        </span>
        <span class="remove"
          @click.stop="deleteFile({index, path: value.path})">
          ×
        </span>
      </div>
    </div>
    <div class="add-file" @click="toggleFileTypes">
      新建
      <div class="type-select" v-show="showFileTypes">
        <span class="type"
          v-for="type in fileTypes"
          @click.stop="handleCreateFile(type.value)">
          {{type.label}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      fileTypes: [
        { label: '普通文本', value: 'common' },
        { label: '人物介绍', value: 'character' },
        { label: '电影剧本', value: 'movie' },
      ],
      showFileTypes: false,
      editFileName: false
    };
  },
  computed: {
    ...mapState(['files'])
  },
  methods: {
    closeEditFileName() {
      this.editFileName = false;
    },
    openEditFileName(e) {
      const input = e.target.nextSibling.nextSibling;
      this.editFileName = !this.editFileName;
      setTimeout(() => {
        input.focus();
      }, 100);
    },
    toggleFileTypes() {
      this.showFileTypes = !this.showFileTypes;
    },
    handleCreateFile(type) {
      console.log('create file');
      this.createFile(type);
      this.showFileTypes = false;
    },
    ...mapActions(['createFile', 'saveFile', 'readProject', 'deleteFile', 'selectFile']),
    ...mapMutations(['diffSelected'])
  }
}
</script>

<style lang="css" scoped>
.overview {
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 200px;
  height: 100vh;
  border-right: 1px solid #eee;
  box-sizing: border-box;

  .logo {
    height: 50px;
    border-bottom: 1px solid #aaa;
    box-sizing: border-box;
  }

  .file-list {
    flex: 1;

    .item {
      position: relative;
      height: 50px;
      padding: 12px 15px;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;

      .name {
        display: inline-block;
        width: 110px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        cursor: default;
        letter-spacing: 1px;
      }
      input {
        display: inline-block;
        position: relative;
        left: -5px;
        width: 110px;
        height: 20px;
        padding: 5px;
        font-size: 14px;
        vertical-align: middle;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #eee;
        outline: none;
        letter-spacing: 0.7px;
      }
      .save {
        display: inline-block;
        width: 35px;
        height: 20px;
        line-height: 20px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background-color: #2d91ee;
        border-radius: 4px;
        vertical-align: middle;
        cursor: pointer;
      }
      .remove {
        display: none;
        position: absolute;
        top: 4px;
        right: 10px;
        font-size: 25px;
        opacity: 0.7;
        cursor: pointer;
      }
      &:hover .remove {
        display: block;
      }
    }
  }
  .add-file {
    position: relative;
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-top: 1px solid #eee;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;

    .type-select {
      position: absolute;
      bottom: 35px;
      left: 10px;
      width: 200px;
      height: 120px;
      padding: 10px;
      text-align: left;
      box-shadow: 0 0 10px #999;
      border-radius: 4px;
      background-color: #fff;

      .type {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        margin: 5px;
        padding: 0 5px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        background-color: #2d91ee;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>
