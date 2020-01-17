<template>
  <div class="zs" v-if="show">
    <div class="zs-dialog-wrapper flex" @click.self="closeOnModal && hideDilog()">
      <div :class="`zs-dialog ${dialogshow ? 'dialogshow' : 'dialoghide'}`">
        <span class="zs-dialog__closer" v-if="showCloseIcon" @click="hideDilog()"></span>
        <div :class="`zs-dialog__header ${backhead ? 'backhead' : 'fronthead'}`">
          <slot name="header"></slot>
        </div>
        <div class="zs-dialog__wrapper">
          <slot></slot>
        </div>
        <div class="zs-dialog__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
    <div :class="`zs-modal ${dialogshow ? 'modalshow' : 'modalhide'}`"></div>
  </div>
</template>

<script>
export default {
  name: 'zsDialog',
  props: {
    show: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    closeOnModal: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    backhead: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    showCloseIcon: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      dialogshow: false
    }
  },
  watch: {
    show(val) {
      this.dialogshow = val
    }
  },
  methods: {
    hideDilog() {
      this.dialogshow = false
      let timer = setTimeout(() => {
        this.$emit('update:show', false)
        clearTimeout(timer)
      }, 350)
    }
  }
}
</script>

<style lang="scss" scoped>
$zindex: 99;
.zs {
  width: 100%;
  height: 100%;
  .zs-dialog-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: $zindex + 1;
    overflow: auto;
    .zs-dialog {
      position: relative;
      transform: translate(0, -10px);
      text-align: center;
      width: 65vw;
      height: calc(65vw * 0.7163);
      min-width: 1000px;
      min-height: calc(1000px * 0.7163);
      margin: auto;
      &.dialogshow {
        animation: moves 0.35s 1 ease forwards;
      }
      &.dialoghide {
        animation: moves2 0.35s 1 ease forwards;
      }
      @keyframes moves {
        from {
          opacity: 0;
          transform: translate(0, -10px);
        }
        to {
          opacity: 1;
          transform: translate(0, 0);
        }
      }
      @keyframes moves2 {
        from {
          opacity: 1;
          transform: translate(0, 0px);
        }
        to {
          opacity: 0;
          transform: translate(0, -10px);
        }
      }
      .zs-dialog__closer {
        position: absolute;
        width: 48px;
        height: 48px;
        right: 20px;
        top: 20px;
        background: red;
        border-radius: 100%;
        z-index: 10;
        cursor: pointer;
      }
      .zs-dialog__wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        background: blue;
        background-size: cover;
        padding: 6% 5.5%;
        box-sizing: border-box;
      }
      .zs-dialog__header {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        &.backhead {
          z-index: 0;
          top: -20px;
        }
      }
      .zs-dialog__footer {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 0;
        width: 100%;
      }
    }
  }
  .zs-modal {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: $zindex;
    background: rgba($color: #000000, $alpha: 0.5);
    &.modalshow {
      animation: showmodel 0.1s 1 linear forwards;
    }
    &.modalhide {
      animation: hidemodel 0.1s 1 linear forwards;
    }
    @keyframes showmodel {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @keyframes hidemodel {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  }
}
</style>

