<template>
	<div class="goods">
		<div
			flex="main:right cross:center"
			style="position:fixed;top:0.6rem;right:0.6rem"
			class="bar"
		>
			<div @click="$refs.monthPicker.toggle()">
				<i class="iconfont icon-calendar"></i>
				<span>{{ monthName }}</span>
			</div>
		</div>
		<div style="height:100%;">
			<div id="charts" style="width:100%;height:100%"></div>
		</div>

		<month-picker ref="monthPicker" @change="monthChoose"></month-picker>
	</div>
</template>

<script>
import { Toast, Popup, Button } from "vant";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/dataZoom");
import MonthPicker from "../components/monthPicker";
import dayjs from "dayjs";

import * as Fetch from "../../utils/fetch";

export default {
	components: {
		VanPopup: Popup,
		VanButton: Button,
		MonthPicker: MonthPicker
	},
	data() {
		return {
			chooseMonth: new Date(),
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
					data: ["当月出货", "当月完成"]
				},
				grid: {
					left: "5%",
					right: "5%",
					bottom: "20",
					//   top:"20%",
					containLabel: true
				},
				xAxis: {
                    type: "value",
                    show:false,
					boundaryGap: [0, 0.05]
				},
				yAxis: {
					type: "category",
					data: []
				},
				series: [
					{
						name: "当月出货",
						type: "bar",
						data: [],
						label: {
							normal: {
								show: true
								// position: "right"
							}
						}
					},
					{
						name: "当月完成",
						type: "bar",
						data: [],
						label: {
							normal: {
								show: true
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
	computed: {
		monthName: function() {
			return dayjs(this.chooseMonth).format("YYYY-MM");
		}
	},
	methods: {
		monthChoose(month) {
			this.chooseMonth = month;
			this.renderCharts(month);
		},
		renderCharts(month) {
			Toast.loading("加载中...");
			setTimeout(() => {
				Toast.clear();
				let chartsOption = this.initOption;

				let goodsSummary = Fetch.goodsSummary(month);
				let exportSummary = Fetch.exportSummary(month);

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
						message: "当月无数据",
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
	padding: 0.4rem;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}
.dialogTitle {
	background: #fff;
	font-size: 18px;
	font-weight: normal;
}
</style>
