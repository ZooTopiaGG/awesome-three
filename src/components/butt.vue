<template>
  <button :class="`zs-button zs-button-${type}`" @click="click($event)">
    <span>
      <slot>默认按钮</slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'zsButtonTab',
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    click(ev) {
      this.$emit('click', ev)
    }
  }
}
</script>

<style lang="scss" scoped>
$white: #fff;
$url: '';
@mixin mixColor($color) {
  background: mix($color, $white, 85%);
}
@mixin mixBackground($url, $repeat, $pos, $w, $h) {
  background-image: url($url);
  background-repeat: $repeat;
  background-position: $pos;
  width: $w;
  height: $h;
}
.zs-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 0;
  color: $white;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  background: transparent;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  font-size: 14px;
  border-radius: 4px;
  & + .zs-button {
    margin-left: 10px;
  }
  &.zs-button-default {
    @include mixBackground($url, no-repeat, -561px -299px, 230px, 94px);
    &:hover {
      @include mixBackground($url, no-repeat, -561px -299px, 230px, 94px);
    }
  }
  &.zs-button-checked {
    background: red;
    color: inherit;
    &:hover {
      @include mixColor(red);
      color: $white;
    }
  }
  &.zs-button-yellow {
    @include mixBackground($url, no-repeat, -485px -511px, 230px, 94px);
    &:hover {
      @include mixBackground($url, no-repeat, -5px -511px, 230px, 94px);
    }
  }
  &.zs-button-blue {
    @include mixBackground($url, no-repeat, -245px -511px, 230px, 94px);
    &:hover {
      @include mixBackground($url, no-repeat, -561px -299px, 230px, 94px);
    }
  }
  &.zs-button-green {
    background: #6bdd2d;
    color: inherit;
    &:hover {
      @include mixColor(#6bdd2d);
      color: $white;
    }
  }
  &.zs-button-orange {
    background: #ff6b3e;
    &:hover {
      @include mixColor(#ff6b3e);
      color: $white;
    }
  }
  &.zs-button-text {
    background: #ff9888;
    &:hover {
      @include mixColor(#ff9888);
      color: $white;
    }
  }
}
</style>
