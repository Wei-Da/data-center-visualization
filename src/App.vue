<template>
  <div class="page-wrapper">
    <div class="largeScreen-wrapper">
      <div class="largeScreen-title">
        <largeScreenTitle></largeScreenTitle>
      </div>
      <div class="largeScreen-items-wrapper">
        <div class="largeScreen-items">
          <BusinessOperation></BusinessOperation>
        </div>
        <div class="largeScreen-items">
          <NetworkLinkFlow></NetworkLinkFlow>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import largeScreenTitle from "./components/largeScreenTitle";
import BusinessOperation from "./components/BusinessOperation";
import NetworkLinkFlow from "./components/NetworkLinkFlow";

export default {
  components: {
    largeScreenTitle,
    BusinessOperation,
    NetworkLinkFlow
  }
};
</script>

<style lang="stylus" scoped>
.page-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 1451px;
  // min-width: 1451px;
  // min-height: 746px;
  font-size: 1em;
  background: 100% url('./images/background.png') no-repeat
  background-size: cover;
  .largeScreen-title {
    position: absolute;
    width: 100%;
    height: 10%;
    min-height: 70px;
    font-size: 1em;
  }
}
.largeScreen-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 90%;
  // max-height: 870px;

  .largeScreen-items-wrapper {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0px;
    box-sizing: border-box;
    width: 90%;
    height: 90%;
    // max-height: 800px;
  }
  .largeScreen-items {
    width: 48%;
    height: 100%;
    // max-width: 685px;
  }
}
</style>