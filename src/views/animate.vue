<template>
  <div id="animateBox">
    <div id="animate-box">
      <div ref="coding1" class="animate-item coding1 animation1">
        <div class="goods1"></div>
      </div>
      <div class="animate-item coding2">
        <div class="goods2"></div>
      </div>
      <div class="animate-item coding3" style="width: 100px; height: 50px; background: red; overflow: hidden;white-space: nowrap;">
        <p class="box-line" style="height: 50px; line-height:50px; color:#fff; font-size: 16px;white-space: nowrap;">
          我真的好想你，在每一个预计，我们的好的好的会场布置现场发放是。哈哈，哈哈哈哈
        </p>
      </div>
    </div>
    <div class="list">
      <li v-for="item in 5" :key="item" class="item"></li>
    </div>
    <div class="keyboard">
      <i>&lt;</i>
      <i>p</i>
      <i>y</i>
      <i>t</i>
      <i>h</i>
      <i>o</i>
      <i>n</i>
      <i>/</i>
      <i>&gt;</i>
    </div>
    <!-- <div class="steps">
      <span class="plan"></span>
    </div> -->
    <div class="steps2">
      <span class="plan2"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'animateBox',
  data() {
    return {
      showDialog: false
    }
  },
  mounted() {
    let and = this.$refs['coding1']
    console.log(document.querySelector('.coding1'))
    console.log(and)
    and.addEventListener(
      'animationend',
      function() {
        and.classList.remove('animation1')
        and.classList.add('animation2')
      },
      false
    )
  }
}
</script>
<style lang="scss" scoped>
#animateBox {
  width: 100%;
  height: 100%;
  #animate-box {
    position: relative;
    width: 100%;
    // height: 100%;
    display: block;
    transform: translate3d(0px, 0px, 0px) rotate(0.0001deg);
    transform-style: preserve-3d;
    backface-visibility: hidden;
    pointer-events: none;
    .animate-item {
      position: absolute;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      pointer-events: none;
      transform: perspective(800px);
    }
    .coding1 {
      left: 100px;
      top: 100px;
    }
    .coding1.animation1 {
      animation: c1wave1 1s 1 linear;
    }
    .coding1.animation2 {
      animation: c1wave2 1s infinite linear;
    }
    .coding2 {
      right: 100px;
      top: 100px;
      animation: movewave2 1s infinite alternate linear;
    }
    .coding3 {
      top: 200px;
      left: 200px;
      p {
        display: inline-block;
      }
    }
    .box-line {
      position: relative;
      animation: movewave3 10s infinite linear;
    }
    @keyframes movewave3 {
      100% {
        transform: translateX(-500px);
      }
      0% {
        transform: translateX(0);
      }
    }
    .goods1 {
      width: 160px;
      height: 129px;
      background-image: url('../assets/images/parallax/coding1.5ca1dd1ec1.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
    .goods2 {
      width: 120px;
      height: 158px;
      background-image: url('../assets/images/parallax/coding2.9c6ef32ff2.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
    @keyframes c1wave1 {
      100% {
        transform-origin: center;
        opacity: 1;
        transform: translate3d(0px, 0px, 0px);
      }
      50% {
        transform-origin: center;
        transform: translate3d(0px, 200px, 800px) scale(0.5);
      }
      0% {
        transform-origin: center;
        opacity: 0;
        transform: translate3d(0px, -200px, 0px);
      }
    }
    @keyframes c1wave2 {
      100% {
        transform-origin: center;
        transform: translate3d(0px, 0px, 0px);
      }
      50% {
        transform-origin: center;
        transform: translate3d(0, 10px, 0);
      }
      0% {
        transform-origin: center;
        transform: translate3d(0px, 0px, 0px);
      }
    }
    @keyframes movewave2 {
      100% {
        transform-origin: center;
        transform: translate3d(0px, 0px, 0px);
      }
      50% {
        transform-origin: center;
        transform: translate3d(0, -10px, 0);
      }
      0% {
        transform-origin: center;
        transform: translate3d(0px, 0px, 0px);
      }
    }
  }
  .list {
    .item {
      width: 50px;
      height: 50px;
      background: #6180e9;
      margin-right: 10px;
      float: left;
      animation: listAni 0.5s ease both alternate infinite;
    }
    @keyframes listAni {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }

    @for $i from 1 to 6 {
      .item:nth-child(#{$i}) {
        animation-delay: -$i * 0.1s; /* animation-delay 为负值*/
      }
    }
  }
  .keyboard {
    vertical-align: baseline;
    i {
      font-style: normal;
      font-size: 20px;
      animation: in_add_item 2s ease both infinite;
      @keyframes in_add_item {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @for $i from 1 to 11 {
        &:nth-child(#{$i}) {
          animation-delay: 1s + $i * 0.1s; /* animation-delay 为负值*/
        }
      }
    }
  }
  .steps {
    .plan {
      width: 160px;
      height: 225px;
      background: url('../assets/images/springNn2.png') no-repeat;
      background-size: 9120px 225px;
      position: absolute;
      top: 0px;
      left: 0px;
      animation: plan 4s infinite steps(57, end) both;
      @keyframes plan {
        from {
          background-position: 0;
        }
        to {
          background-position: -9120px;
        }
      }
    }
  }
  .steps2 {
    position: absolute;
    top: 29%;
    right: 43%;
    .plan2 {
      width: 404px;
      height: 319px;
      background: url('../assets/images/css_sprites.png') no-repeat;
      background-size: 24644px 319px;
      position: absolute;
      top: 0px;
      left: 0px;
      animation: plan2 3s infinite steps(61, end) both;
      @keyframes plan2 {
        from {
          background-position: 0;
        }
        to {
          background-position: -24644px;
        }
      }
    }
  }
}
</style>

