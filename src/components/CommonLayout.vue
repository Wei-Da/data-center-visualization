<template>
  <div class="commonLayout-wrapper" >
    <div class="commonLayout-container" :style="getPadding">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    padding: {
      type: [String, Number],
      default: '6% 4% 1%'
    }
  },
  computed: {
    getPadding() {
      return 'padding: ' + this.padding
    }
  }
}
</script>

<style lang="stylus" scoped>
.commonLayout-wrapper {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  // max-width: 685px;
  // max-height: 800px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url(../images/items-background.png) no-repeat;
  background-size: 100% 100%;
}
.commonLayout-container {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>