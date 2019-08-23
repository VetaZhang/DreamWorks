<template lang="html">
  <div class="movie-script">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          v-for="(script, index) in movie.scripts">
          <script-editor :script="movie.scripts[index]"
            @input="handleInput"/>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="create" @click="handleCreate">添加</div>
      <div class="btn" @click="handleAddPrev">向前添加</div>
      <div class="btn" @click="handlePrev">上一幕</div>
      <div class="pagination">
        <input type="tel" :value="currentPage"
          @blur="handleJump"
          @keydown.enter="handleJump"/>
        <span> / </span>
        <span>{{totalPage}}</span>
      </div>
      <div class="btn" @click="handleNext">下一幕</div>
      <div class="btn" @click="handleAddNext">向后添加</div>
      <div class="remove" @click="handleRemove">删除</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import Swiper from 'swiper';
import ScriptEditor from './scriptEditor';

export default {
  props: ['script'],
  data() {
    return {
      swiper: null
    };
  },
  mounted() {
    this.swiper = new Swiper('.swiper-container', {
      initialSlide: this.movie.currentScript,
    	slidesPerView: 1,
      observer: true,
      observeParents: true,
      onTransitionEnd: (swiper) => {
        this.updateIndex(swiper.activeIndex);
      }
    });
  },
  computed: {
    totalPage() {
      return this.movie.scripts.length;
    },
    currentPage() {
      return this.movie.currentScript + 1;
    },
    ...mapState(['movie']),
    ...mapGetters(['allCharacters'])
  },
  methods: {
    handleJump(e) {
      const num = e.target.value;
      const isVaild = /^\d{1,}$/.test(num) && Number(num) > 0 && Number(num) <= this.movie.scripts.length;
      if (isVaild) {
        this.swiper.slideTo(Number(e.target.value - 1));
      } else {
        this.$forceUpdate();
      }
    },
    handleAddPrev() {
      this.addPrev();
      setTimeout(() => {
        this.swiper.slideNext(false, null);
        setTimeout(() => {
          this.swiper.slidePrev();
        }, 30);
      }, 30);
    },
    handleAddNext() {
      this.addNext();
      setTimeout(() => {
        this.swiper.slideNext();
      }, 30);
    },
    handlePrev() {
      this.swiper.slidePrev();
    },
    handleNext() {
      this.swiper.slideNext();
    },
    handleInput(newScript) {
      this.updateScript({
        newValue: newScript,
        index: this.movie.currentScript
      });
      this.diffSelected();
    },
    handleCreate() {
      this.creatScript();
      setTimeout(() => {
        this.swiper.slideTo(this.movie.scripts.length - 1, 300, () => {
          this.diffSelected();
        });
      }, 30);

    },
    handleRemove() {
      this.removeScript();
      this.diffSelected();
    },
    ...mapMutations(['diffSelected']),
    ...mapMutations('movie', [
      'updateScript',
      'addPrev',
      'addNext',
      'updateIndex',
      'creatScript',
      'removeScript'
    ])
  },
  components: {
    Swiper,
    ScriptEditor
  }
}
</script>

<style lang="css" scoped>
.movie-script {
  height: 100%;
}
.swiper-container {
  z-index: 1;
  position: relative;
  width: 100%;
  height: calc(100% - 50px);
  margin-left: auto;
  margin-right: auto;
  background-color: #eee;
  overflow: hidden;
}

.swiper-wrapper {
  z-index: 1;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  -o-transition-property: -o-transform;
  -ms-transition-property: -ms-transform;
  transition-property: transform;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-transform: translate3d(0,0,0);
  -moz-transform: translate3d(0,0,0);
  -o-transform: translate(0,0);
  -ms-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);

  .swiper-slide {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-flex-shrink: 0;
    -ms-flex: 0 0 auto;
    flex-shrink: 0;
    position: relative;
    width: 100%;
    height: 100%;
  }
}

.footer {
  z-index: 10;
  position: relative;
  width: 100%;
  height: 50px;
  text-align: center;
  box-shadow: 0 -3px 10px #eee;

  .btn {
    display: inline-block;
    height: 50px;
    padding: 0 10px;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
  .pagination {
    display: inline-block;
    height: 50px;

    input {
      display: inline-block;
      width: 35px;
      padding: 2px 5px;
      font-size: 12px;
      text-align: center;
      border: none;
      border-radius: 4px;
      outline: none;
      vertical-align: middle;
      box-sizing: border-box;

      &:focus {
        border: 1px solid #eee;
        background-color: #fff !important;
      }
      &:hover {
        background-color: #eee;
      }
    }
    span {
      display: inline-block;
      color: #ababab;
      line-height: 50px;
      font-size: 12px;
      user-select: none;
      vertical-align: middle;

      &:nth-child(3) {
        width: 35px;
      }
    }
  }
  .create {
    position: absolute;
    top: 0;
    left: 0;
    line-height: 50px;
    padding-left: 20px;
    font-size: 12px;
    color: #ababab;
    cursor: pointer;
    user-select: none;
  }
  .remove {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 50px;
    padding-right: 20px;
    font-size: 12px;
    color: #ababab;
    cursor: pointer;
    user-select: none;
  }
}
</style>
