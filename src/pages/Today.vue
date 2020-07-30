<template>
	<div class='goods'>
		<!-- <div class='toolBar' flex='main:justify' style='height:6%'>
            <i class='iconfont icon-back' @click="$router.push('/home')"></i>
            <i class='iconfont icon-add' @click="addPopVisible=true"></i>
        </div> -->
		<div style='height:94%'>
			<div id='charts' style='width:100%;height:100%'></div>
		</div>
    </div>
</template>

<script>
import { Toast } from "vant";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/dataZoom");
import * as Fetch from "../../utils/fetch";

export default {
  components: {},
  data() {
    return {
      initOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 80,
            yAxisIndex: 0
          },
          {
            show: true,
            start: 0,
            end: 80,
            yAxisIndex: 0
          }
        ],
        legend: {
          data: ["今日出货", "今日完成"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "0",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: []
        },
        series: [
          {
            name: "今日出货",
            type: "bar",
            data: [],
            label: {
              normal: {
                show: true,
                // position: "right"
              }
            }
          },
          {
            name: "今日完成",
            type: "bar",
            data: [],
            label: {
              normal: {
                show: true,
                // position: "right"
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.renderCharts();
  },
  methods: {
    renderCharts() {
      Toast.loading("加载中...");
      setTimeout(() => {
        Toast.clear();
        let chartsOption = this.initOption;
        let goodsSummary = Fetch.goodsSummary(new Date(), "day");
        let exportSummary = Fetch.exportSummary(new Date(), "day");

        let dataMap = [];
        Object.entries(goodsSummary).forEach(item => {
          let key = item[0];
          let value = item[1].num;
          dataMap.push({ name: key, piece: value });
        });

        Object.entries(exportSummary).forEach(item => {
          let key = item[0];
          let value = item[1];
          let target = dataMap.find(item => item.name == key);
          if (target) {
            target.export = value;
          } else {
            dataMap.push({ name: key, piece: 0, export: value });
          }
        });

        chartsOption.yAxis.data = dataMap.map(item => item.name);
        chartsOption.series[0].data = dataMap.map(item => item.export);
        chartsOption.series[1].data = dataMap.map(item => item.piece);

        if (chartsOption.yAxis.data.length == 0) {
          Toast.fail({
            message: "今日无数据",
            duration: 1000
          });
        }
        // 图表渲染
        let myChart = echarts.init(document.getElementById("charts"));
        myChart.setOption(chartsOption);
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
.goods {
//   padding: 0.4rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>


