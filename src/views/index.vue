<template>
  <div id="rainFall"></div>
</template>

<script>
import demo from '@/plugins/rainFall/index.js'
let three = new demo({
  el: '#rainFall'
})
export default {
  name: 'rain-fall',
  mounted() {
    three.init()
  }
}
</script>

<style>
#rainFall {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
canvas {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
