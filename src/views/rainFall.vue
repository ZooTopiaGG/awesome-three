<template>
  <div id="rainFall">
  </div>
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

<style scoped lang="scss">
#rainFall {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
