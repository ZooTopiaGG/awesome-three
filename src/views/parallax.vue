<template>
  <section id="parallax">
    <div id="parallax-box" ref="parallax">
      <div class="parallax-item land" data-depth="0.005">
        <img src="@/assets/images/parallax/land.76251d5e26.png">
      </div>
      <div class="parallax-item suns" data-depth="0.05">
        <span class="sun"></span>
      </div>
      <div class="parallax-item coding1" data-depth="0.05">
        <img src="@/assets/images/parallax/coding1.5ca1dd1ec1.png" alt="">
      </div>
      <div class="parallax-item coding2" data-depth="0.1">
        <img src="@/assets/images/parallax/coding2.9c6ef32ff2.png" alt="">
      </div>
      <div class="parallax-item shu" data-depth="0.02">
        <img src="@/assets/images/parallax/shu.ab4c0e943a.png" alt="">
      </div>
      <div class="parallax-item young" data-depth="0.15">
        <img src="@/assets/images/parallax/young.6d811f541b.png" alt="">
      </div>
      <div class="parallax-item grass" data-depth="0.075">
        <img src="@/assets/images/parallax/grass.e6758d2c24.png" alt="">
      </div>
      <div class="parallax-item cloud" data-depth="0.025">
        <img src="@/assets/images/parallax/cloud.png" alt="">
      </div>
      <div class="parallax-item coding3" data-depth="0.15">
        <img src="@/assets/images/parallax/22.png" alt="">
      </div>
      <div class="parallax-item leaf" data-depth="0.45">
        <img src="@/assets/images/parallax/33.png" alt="">
      </div>
    </div>
  </section>
</template>

<script>
import Parallax from '@/plugins/parallax'
export default {
  name: 'parallax',
  computed: {
    parent() {
      return this.$refs['parallax']
    },
    children() {
      return this.$refs['parallax'].children
    }
  },
  mounted() {
    console.log(this.children)
    let parallax = new Parallax({
      parent: this.parent,
      childrenNode: this.children
    })
    parallax.init()
  }
}
</script>

<style lang="scss" scoped>
#parallax {
  width: 100%;
  height: 100%;
  #parallax-box {
    position: absolute;
    width: 100%;
    transform: translate3d(0px, 0px, 0px) rotate(0.0001deg);
    transform-style: preserve-3d;
    backface-visibility: hidden;
    pointer-events: none;
    width: 100%;
    overflow: hidden;
    background: #00bdff;
    .parallax-item {
      position: absolute;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      z-index: 3;
      transform: translate3d(0px, 0px, 0px);
      transition: all 0.1s;
      img {
        max-width: 100%;
        width: 100%;
      }
      .sun {
        width: 80px;
        height: 80px;
        border-radius: 100%;
        background: #ffc700;
        display: block;
      }
      &.land {
        position: relative;
        z-index: 2;
        line-height: 0;
        font-size: 0;
      }
      &.suns {
        left: 270px;
        top: 80px;
        z-index: 1;
      }
      &.coding1 {
        left: 104px;
        bottom: 80px;
        width: 160px;
        height: 129px;
        background-size: 160px 129px;
      }
      &.coding2 {
        left: 50%;
        bottom: 0;
        margin-left: -114px;
        width: 120px;
        height: 158px;
        z-index: 4;
      }
      &.shu {
        right: 0;
        top: 0;
        max-width: 1080px;
        width: 100%;
      }
      &.young {
        right: 355px;
        top: 40px;
        width: 425px;
        height: 378px;
        z-index: 5;
      }
      &.grass {
        right: 0;
        bottom: -10px;
        width: 608px;
        height: 247px;
      }
      &.cloud {
        left: 258px;
        top: 42px;
        width: 906px;
        height: 193px;
      }
      &.coding3 {
        right: 50px;
        top: 130px;
        width: 80px;
        height: 75px;
      }
      &.leaf {
        right: 80px;
        top: 485px;
        width: 494px;
        height: 160px;
        z-index: 4;
      }
    }
  }
}
</style>


