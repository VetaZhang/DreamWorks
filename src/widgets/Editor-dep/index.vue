<template lang="html">
  <div ref="editor" class="_editor"
    @keydown.meta.83.prevent="save"
    @keydown.ctrl.83.prevent="save">

  </div>
</template>

<script>
import wangEditor from 'wangeditor';

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      editor: null
    };
  },
  computed: {
    contentList() {
      return this.value.split('\n');
    }
  },
  mounted: function() {
    this.editor = new wangEditor(this.$refs.editor);
    this.editor.config.menus = [
        // 'source',
        // '|',
        // 'bold',
        // 'underline',
        // 'italic',
        // 'strikethrough',
        // 'eraser',
        // 'forecolor',
        // 'bgcolor'
    ];

    this.editor.onchange = () => {
      this.$emit('input', this.getContent());
    };
    this.editor.create();
    if (this.contentList) {
      this.contentList.forEach((item, index) => {
        item = item || '<br/>';
        if (index === 0) {
          this.editor.$txt.html(`<p>${item}</p>`);
        } else {
          this.editor.$txt.append(`<p>${item}</p>`);
        }
      });
    }
  },
  methods: {
    getContent() {
      return this.editor.$txt.formatText();
    },
    save() {
      this.$emit('onSave', this.getContent());
    }
  }
}
</script>

<style lang="css">
._editor {
  height: 100%;
  padding-top: 40px !important;
  font-family: "PingFangSC";
  outline: none;

  p {
    margin: 0 !important;
    line-height: 1.8 !important;
  }
  p:nth-child(1) {
    line-height: 1.5 !important;
  }
}
</style>
