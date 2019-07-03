<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
