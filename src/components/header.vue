<template>
  <div class="header-wrapper">
    <div class="title-text">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String,
      default: '标题'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .title-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 20px;
      letter-spacing: 2px;
    }
  }
</style>