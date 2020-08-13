<template>
  <div class="businessOperation-wrapper">
    <CommonLayout>
      <div class="businessOperation-container">
        <titlebar class="title" title="业务运行可视化"></titlebar>
        <div class="businessOperation-nav mb-1">
          <div
            v-for="(item, index) of menuItems"
            :class="isActive(index)"
            @click="changeActiveIndex(index)"
            :key="index"
          >
            <div :class="item.status === '正常' ? 'success-circle' : 'error-circle'"></div>
            <div class="menu-tree-item-text">{{ item.name }}</div>
          </div>
        </div>
        <div class="businessOperation-item mb-1" v-if="activeIndex === 0 || activeIndex === 1 || activeIndex === 2">
          <div class="temperature-title skew">
            业务响应时间
            <span :class="deviceState === '正常' ? 'deviceState-success' : 'deviceState-error'"></span>
            <span class="skew-line"></span>
          </div>
          <div class="temperature-content">
            <div class="left-content">
              <div class="usageRate-container transform-topLeft">
                <div class="percent">1ms</div>
                <div class="usageRate-title">上次</div>
              </div>
              <div class="usageRate-container transform-topRight">
                <div class="percent">10ms</div>
                <div class="usageRate-title">最大</div>
              </div>

              <div class="usageRate-container transform-bottomLeft">
                <div class="percent">1ms</div>
                <div class="usageRate-title">平均</div>
              </div>
              <div class="usageRate-container transform-bottomRight">
                <div class="percent">2ms</div>
                <div class="usageRate-title">最小</div>
              </div>
            </div>
            <v-chart
              ref="businessOperationChart"
              :options="getChartOptions(chart1)"
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
        <div class="businessOperation-item mb-1" v-if="activeIndex === 0 || activeIndex === 1 || activeIndex === 2">
          <LocalDatabaseState v-if="activeIndex === 0 || activeIndex === 1" :activeIndex="activeIndex"></LocalDatabaseState>
          <CloudsNetworkResTime v-if="activeIndex === 2" :activeIndex="activeIndex"></CloudsNetworkResTime>
        </div>
        <div class="businessOperation-item" v-if="activeIndex === 0 || activeIndex === 1 || activeIndex === 2">
          <LocalStorageStatus v-if="activeIndex === 0" :activeIndex="activeIndex"></LocalStorageStatus>
          <BusinessPacketloss v-if="activeIndex === 1"></BusinessPacketloss>
          <CloudsNetworkPacketloss v-if="activeIndex === 2"></CloudsNetworkPacketloss>
        </div>
        <div class="videoRun" v-if="activeIndex === 3">
          <VideoRun></VideoRun>
        </div>
      </div>
    </CommonLayout>
  </div>
</template>

<script>
import echarts from "echarts";
import titlebar from "./header";
import CommonLayout from "./CommonLayout";
import LocalDatabaseState from "../views/LocalBusiness-databaseState"
import LocalStorageStatus from "../views/LocalBusiness-storageStatus"
import CloudsNetworkResTime from "../views/cloudsBusiness-networkResTime"
import CloudsNetworkPacketloss from "../views/cloudsBusiness-networkPacketloss"
import echartsDefaultFun from "../mixins/echartsDefaultFun"
import VideoRun from "../components/VideoRun"
import BusinessPacketloss from "../views/BusinessPacketloss"
import { defaultArrayLength } from '../mixins/defaultArrayLength'


export default {
  mixins: [echartsDefaultFun],
  components: {
    titlebar,
    CommonLayout,
    LocalDatabaseState,
    LocalStorageStatus,
    CloudsNetworkResTime,
    CloudsNetworkPacketloss,
    VideoRun,
    BusinessPacketloss
  },
  mounted() {
    let dataIndex = 0;
    this.changeActiveIndex(0)
    this.timer = setInterval(() => {
      dataIndex = (dataIndex + 1) % 4
      this.changeActiveIndex(dataIndex)
    }, 24000)
  },
  data() {
    return {
      activeIndex: 0,
      btnActiveIndex1: 'm',
      btnActiveIndex2: 0,
      btnActiveIndex3: 0,
      deviceState: "正常",
      menuItems: [
        {
          name: "本地部署(23)",
          status: "正常",
        },
        {
          name: "云端部署(11)",
          status: "失败",
        },
        {
          name: "云端应用(12)",
          status: "正常",
        },
        {
          name: "视频运行(23)",
          status: "失败",
        },
      ],
      chart1: {
        name: "当前业务响应时间",
        max: 5,
        legendFormatter: [],
        areaColor: "#fd2c4f",
        xAxisData: this.getxAxisData('m', 1, defaultArrayLength),
        yAxisName: 'ms',
        yAxisLabel: "",
        tooltipSymbol: 'ms',
        seriesData: this.getSeriesData(5, defaultArrayLength),
      }
    };
  },
  methods: {
    
    isActive(index) {
      if (index === this.activeIndex) {
        return "menu-tree-item-active";
      } else if (index !== this.activeIndex) {
        return "menu-tree-item";
      }
    },
    changeActiveIndex(index) {
      this.activeIndex = index;
      this.deviceState = this.menuItems[this.activeIndex].status
      this.chart1.legendFormatter = [this.deviceState === "正常" ? "访问状态: 502【正常】" : "访问状态: 404【异常】", "5ms"]
      this.chart1.areaColor = this.deviceState === "正常" ? "#2efdb4" : "#fd2c4f"
      this.chart1.seriesData = this.getSeriesData(5, defaultArrayLength)
    },
    changeBtnIndex1(index) {
      this.btnActiveIndex1 = index;
      this.chart1.xAxisData = this.getxAxisData(index, 1, defaultArrayLength)
      this.chart1.seriesData = this.getSeriesData(5, defaultArrayLength)
    }
  },
  destroyed() {
    if (this.timer) clearInterval(this.timer)
  }
};
</script>

<style lang="stylus" scoped>
.mb-1 {
  margin-bottom: 1%;
}

.skew::after {
  position: relative;
  top: 2px;
  left: 20px;
  display: inline-block;
  content: '';
  width: 32px;
  height: 14px;
  background: url('../images/skew.png') no-repeat;
}

.skew-line {
  position: absolute;
  left: 150px;
  width: 77%;
  background: #2f51d1;
  height: 2px;
  top: 50%;
  transform: translate(0px, -50%);
}

.businessOperation-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .businessOperation-container {
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;

    .title {
      position: absolute;
      top: 2.5%;
      left: 5px;
      width: 100%;
      height: 0;
    }

    .businessOperation-nav {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 6%;

      .menu-tree-item-active {
        position: relative;
        width: 24%;
        height: 100%;
        box-shadow: 0px 0px 16px #4d87ff inset;

        .menu-tree-item-text {
          width: calc(100% - 20px);
          padding-left: 18px;
          text-align: center;
          color: #4d87ff;
          font-size: 16px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .menu-tree-item {
        position: relative;
        width: 24%;
        height: 100%;
        box-shadow: 0px 0px 16px #fff inset;
        cursor: pointer;

        .menu-tree-item-text {
          width: calc(100% - 20px);
          padding-left: 18px;
          text-align: center;
          color: #8f95c8;
          font-size: 16px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .success-circle {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translate(0, -50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #2efdb4;
      }

      .error-circle {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translate(0, -50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #fd2c4f;
      }
    }

    .businessOperation-item {
      width: 100%;
      height: 30%;

      .temperature-title {
        position: relative;
        font-size: 14px;
        color: #FFF;
        width: 100%;
        height: 20px;

        .deviceState-success {
          position: absolute;
          top: 50%;
          left: 90px;
          transform: translate(0, -50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2efdb4;
        }

        .deviceState-error {
          position: absolute;
          top: 50%;
          left: 90px;
          transform: translate(0, -50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fd2c4f;
        }
      }

      .temperature-content {
        display: flex;
        width: 100%;
        height: calc(100% - 20px);

        .left-content {
          display: flex;
          // flex-direction: column;
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
              width: 50%;
              height: 50%;

              .percent {
                color: #2efdb4;
                font-size: 1.375em;
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
    }
    .videoRun {
      height: 93%;
      width: 100%;
    }
  }
}
</style>