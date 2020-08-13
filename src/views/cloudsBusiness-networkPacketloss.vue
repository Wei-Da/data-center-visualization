<template>
  <div class="w-100 h-100">
    <div class="temperature-title skew">
      网络丢包率
      <span class="skew-line"></span>
    </div>
    <div class="temperature-content">
      <div class="left-content">
        <div class="usageRate-container w-50 transform-topLeft">
          <div class="percent font-size-22">1ms</div>
          <div class="usageRate-title">上次</div>
        </div>
        <div class="usageRate-container w-50 transform-topRight">
          <div class="percent font-size-22">10ms</div>
          <div class="usageRate-title">最大</div>
        </div>

        <div class="usageRate-container w-50 transform-bottomLeft">
          <div class="percent font-size-22">1ms</div>
          <div class="usageRate-title">平均</div>
        </div>
        <div class="usageRate-container w-50 transform-bottomRight">
          <div class="percent font-size-22">2ms</div>
          <div class="usageRate-title">最小</div>
        </div>
      </div>
      <v-chart
        ref="businessOperationChart"
        :options="getChartOptions(chartOptions)"
        :autoresize="true"
        style="width: calc(80% - 40px); height: 100%;"
      />
      <div class="businessOperationChart-btn">
        <div
          :class="{buttonActive : btnActiveIndex1 === 'm'}"
          class="button"
          @click="changeBtnIndex1('m')"
        >1m</div>
        <div
          :class="{buttonActive : btnActiveIndex1 === 'h'}"
          class="button"
          @click="changeBtnIndex1('h')"
        >1h</div>
        <div
          :class="{buttonActive : btnActiveIndex1 === 'd'}"
          class="button"
          @click="changeBtnIndex1('d')"
        >1d</div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import echartsDefaultFun from "../mixins/echartsDefaultFun"
import { defaultArrayLength } from '../mixins/defaultArrayLength'

export default {
  mixins: [echartsDefaultFun],
  data() {
    return {
      btnActiveIndex1: 'm',
      chartOptions: {
        name: "当前网络丢包率",
        max: 3,
        legendFormatter: " 0%",
        areaColor: "#03d3f0",
        xAxisData: this.getxAxisData('m', 1, defaultArrayLength),
        yAxisName: '',
        yAxisLabel: "%",
        tooltipSymbol: "%",
        seriesData: this.getSeriesData(2.5, defaultArrayLength, 0.5, 1),
      },
    };
  },
  methods: {
    changeBtnIndex1(index) {
      this.btnActiveIndex1 = index;
      this.chartOptions.xAxisData = this.getxAxisData(index, 1, defaultArrayLength)
      this.chartOptions.seriesData = this.getSeriesData(100, defaultArrayLength)
    }
  }
};
</script>

<style lang="stylus" scoped>

.temperature-title {
  position: relative;
  font-size: 14px;
  color: #FFF;
  width: 100%;
  height: 20px;
  .skew-line {
    position: absolute;
    left: 150px;
    width: 77%;
    background: #2f51d1;
    height: 2px;
    top: 50%;
    transform: translate(0px, -50%);
  }
}

.temperature-content {
  display: flex;
  width: 100%;
  height: calc(100% - 20px);

  .left-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 20%;
    height: 100%;

    .usageRate-container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      height: 50%;

      .percent {
        color: #2efdb4;
      }

      .usageRate-title {
        color: #96acd4;
        font-size: 12px;
      }
    }
  }

  .businessOperationChart-btn {
    width: 40px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-shadow: 0px 0px 10px #fff inset;
      cursor: pointer;
      color: #96acd4;
    }

    .buttonActive {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-shadow: 0px 0px 10px #4d87ff inset;
      cursor: pointer;
      color: #4d87ff;
    }
  }
}

>>>.el-carousel__container {
  height: 95%;
  width: 100%;
}

>>>.el-carousel__indicators--outside {
  height: 5%;
  line-height: 5%;
  vertical-align: middle;
}

>>>.el-carousel__indicator--horizontal {
  padding: 0px 4px;
}

>>>.el-carousel__item {
  display: flex;
}
</style>