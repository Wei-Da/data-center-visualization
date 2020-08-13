<template>
  <div class="networkLink-wrapper">
    <div class="title skew mb-10">
      广域网链路
      <span class="skew-line"></span>
    </div>
    <table class="networkLink-table">
      <thead>
        <tr>
          <th>线路名称</th>
          <th>运营商</th>
          <th>通断性</th>
          <th>上行流量</th>
          <th>下行流量</th>
          <th>带宽利用率</th>
          <th>链路丢包率</th>
          <th>响应时间</th>
          <th>最大抖动</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>盐城-南京</td>
          <td>电信</td>
          <td class="tableText-success">通</td>
          <td class="tableText-success">15 Mbps</td>
          <td class="tableText-success">35 Mbps</td>
          <td class="tableText-success">14%</td>
          <td class="tableText-success">0%</td>
          <td class="tableText-success">21 ms</td>
          <td class="tableText-success">【-5ms, 8ms】</td>
        </tr>
        <tr class="table-gray">
          <td>盐城-上海</td>
          <td>电信</td>
          <td class="tableText-success">通</td>
          <td class="tableText-success">22 Mbps</td>
          <td class="tableText-success">120 Mbps</td>
          <td class="tableText-success">54%</td>
          <td class="tableText-success">2%</td>
          <td class="tableText-success">15 ms</td>
          <td class="tableText-success">【-15ms, 24ms】</td>
        </tr>
        <tr>
          <td class="tableText-warning">北京-沧州</td>
          <td>移动</td>
          <td class="tableText-warning">断</td>
          <td class="tableText-warning">0 Mbps</td>
          <td class="tableText-warning">0 Mbps</td>
          <td class="tableText-warning">0%</td>
          <td class="tableText-warning">100%</td>
          <td class="tableText-warning">>1000 ms</td>
          <td class="tableText-warning">【-1000ms, 1000ms】</td>
        </tr>
        <tr class="table-gray">
          <td>盐城-北京</td>
          <td>电信</td>
          <td class="tableText-success">通</td>
          <td class="tableText-success">65 Mbps</td>
          <td class="tableText-success">12 Mbps</td>
          <td class="tableText-success">44%</td>
          <td class="tableText-success">1%</td>
          <td class="tableText-success">55 ms</td>
          <td class="tableText-success">【-33ms, 25ms】</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="stylus" scoped>
.mb-10 {
  margin-bottom: 10px;
}

.skew-line {
  position: absolute;
  left: 120px;
  width: 77%;
  background: #2f51d1;
  height: 2px;
  top: 50%;
  transform: translate(0px, -50%);
}

.networkLink-wrapper {
  width: 100%;
  height: 100%;
  color: #96acd4;

  .title {
    position: relative;
    font-size: 14px;
    color: #FFF;
    width: 100%;
    height: 20px;
  }

  .networkLink-table {
    width: 100%;
    height: calc(100% - 30px);
    font-size: 12px;
    border-spacing: 0px;
    th {
      text-align: left;
      background: #0e1024;
    }
  }
  .table-gray {
    background: #2b2d4f;
  }

  .table-header {
    background: #0e1024;
  }

  .tableText-warning {
    color: #fd2c4f;
  }

  .tableText-success {
    color: #2eddb4;
  }
}
</style>