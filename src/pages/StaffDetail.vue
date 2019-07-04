<template>
    <div class='staffManageContainer'>
        <!-- <div class='toolBar' flex='main:justify' style='height:6%'>
            <i class='iconfont icon-back' @click="$router.push('/home')"></i>
            <i class='iconfont icon-add' @click="addPopVisible=true"></i>
        </div> -->
			<i class='iconfont icon-add' style='position:fixed;top:.4rem;right:.4rem' @click="doRecord"></i>
            <van-swipe style='height:100%;' :loop='false' :show-indicators='false' :initial-swipe='initialSwipe'  ref='swipe' @change='swipeChange'>
                <van-swipe-item v-for='(item,key) in summary' :key='key'>
                    <div style='height:100%;width:100%;' class='staffDetail'>
                        <div style='height:50%;border: 1px solid #e5e5e5;'>
                            <h1 flex='main:justify cross:center' style="height:10%">
                                <span style='font-size:16px'>{{key}}</span>
                                <div flex='main:right cross:center'  class='bar'>
                                    <div>
                                        <i class='iconfont icon-calendar'></i>
                                        <span>{{monthName}}</span>
                                    </div>
                                </div>
                            </h1>
                           <div :id="`${key}Charts`" style="width:;height:85%;"></div>
                        </div>
                        <div class='operationRecords' style="height:50%">
                            <h1 style='height:10%' flex='cross:center'>当月记单</h1>
                            <ul style='height:80%;'>
                                <li v-if="item.record.length == 0"> <div>暂无任何操作记录</div></li>
								<transition-group name="slide-fade"  v-else>
									<li flex='main:justify cross:center'  v-for='(record,index) in item.record' :key='index' style='position:relative;'>
										<i class='iconfont icon-close' style='position:absolute; right:.2rem;top:.2rem' @click="deleteRecord(record,key)"></i>
										<div flex='dir:top'>
											<h4>{{record.type}}</h4>
											<p class='time'  style='color:#6a788c'>{{record.time | toTime}}</p>
										</div>
										<div class='content'  style='color:#38f;'> +{{record.num}} 件</div>
									</li>
								</transition-group>
                            </ul>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>


         <i class='iconfont icon-last' v-if="!(activeIndex == 0)"  @click="lastMonth"></i>
         <i class='iconfont icon-next' v-if="!(activeIndex >= Object.keys(summary).length-1)"  @click="nextMonth"></i>

		<!-- 选择器 -->
        <month-picker ref='monthPicker' @change='monthChoose'></month-picker>
        <type-picker ref='typePicker' @change='typeChoose'></type-picker>
        <time-picker ref='timePicker' @change='timeChoose'></time-picker>
        <staff-picker ref='staffPicker' @change='staffChoose'></staff-picker>

		 <!-- 记单弹窗 -->
          <van-popup v-model="pieceRecordPopupVisible" position="right" style='width:100%;background: #f3f3f3;' class='popup'>
              <div style='width:100%;height:100%;'>
                  <h2 class='dialogTitle' style='height:1.2rem;' flex='main:center cross:center'>员工记单</h2>
                  <div style='height:65%;' flex='dir:top cross:center main:center'>
                        <p flex='main:center cross:center'>
                            <span class='inputTitle'>员工：</span>
                            <input type="text" readonly placeholder="点击选择员工" @click="$refs.staffPicker.toggle()" :value="pieceRecordValue.staff">
                        </p>
                        <p flex='main:center cross:center'>
                            <span class='inputTitle'>型号：</span>
                            <input type="text" readonly placeholder="点击选择型号" @click="$refs.typePicker.toggle()" :value="pieceRecordValue.type">
                        </p>
                        <p flex='main:center cross:center'>
                            <span class='inputTitle'>数量（件）：</span>
                            <input type="number" v-model.number="pieceRecordValue.num" @focus="$event.target.select()">
                        </p>
                        <p flex='main:center cross:center'>
                            <span class='inputTitle'>时间：</span>
                            <input type="text" readonly :value="pieceRecordValue.time | toTime" @click="$refs.timePicker.toggle()">
                        </p>
                  </div>
                  <div style='height:2rem;padding:0 10%;' flex='main:justify cross:center'>
                        <van-button type="default" style='width:40%' @click='pieceRecordPopupVisible = false'>取消</van-button>
                        <van-button type="primary" style='width:40%' @click='pieceRecordConfirm'>确定</van-button>
                  </div>
              </div>
          </van-popup>
    </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
import dayjs from "dayjs";
import NP from "number-precision";
import onfire from "onfire.js";

import { Popup, Button, Toast, Swipe, SwipeItem, Dialog } from "vant";

import PieceRecord from "../../utils/pieceRecord.js";
import MonthPicker from "../components/MonthPicker";
import TypePicker from "../components/TypePicker";
import TimePicker from "../components/TimePicker";
import StaffPicker from "../components/StaffPicker";
import * as Fetch from "../../utils/fetch";
import * as Delete from "../../utils/delete";

export default {
  components: {
    VanPopup: Popup,
    VanButton: Button,
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    MonthPicker: MonthPicker,
    TypePicker: TypePicker,
    TimePicker: TimePicker,
    StaffPicker: StaffPicker
  },
  data() {
    //console.log(this.$route.query)
    return {
      chooseMonth: this.$route.query.date,
      addPopVisible: false,
      activeIndex: 0,
      summary: Fetch.staffSummary(this.$route.query.date),
      pieceRecordPopupVisible: false,
      pieceRecordValue: {
        staff: "",
        type: "",
        num: "",
        time: ""
      },
      initOption: {
        title: {
          text: "当月统计",
          x: "center",
          subtext: "当月工资:"
        },
        tooltip: {
          trigger: "item",
          formatter: "型号: {b} </br> 数量: {c} 件 "
        },
        series: [
          {
            name: "数据",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  computed: {
    monthName: function() {
      return dayjs(this.chooseMonth).format("YYYY-MM");
    },
    initialSwipe: function() {
      let index = Object.keys(this.summary).findIndex(
        item => item == this.$route.params.staff
      );
      return index;
    }
  },
  mounted() {
    let vm = this;
    this.targetStaff = Object.keys(this.summary)[this.activeIndex];
    this.activeIndex = this.initialSwipe;
    this.renderCharts(this.chooseMonth);
  },
  methods: {
    doRecord() {
      this.targetStaff = Object.keys(this.summary)[this.activeIndex];
      this.pieceRecordPopupVisible = true;
      this.pieceRecordValue = {
        staff: this.targetStaff,
        type: "",
        num: 0,
        time: new Date().getTime()
      };
    },
    typeChoose(val) {
      this.$set(this.$data.pieceRecordValue, "type", val);
    },
    timeChoose(val) {
      this.$set(this.$data.pieceRecordValue, "time", val.getTime());
    },
    staffChoose(val) {
      this.$set(this.$data.pieceRecordValue, "staff", val);
    },
    swipeChange(index) {
      if (!Object.values(this.summary)[index].total) {
        Toast.fail({
          message: "没有记单记录",
          duration: 1000
        });
      }
    },
    lastMonth() {
      //console.log(this.activeIndex - 1)
      if (this.activeIndex > 0) {
        this.$refs.swipe.swipeTo(this.activeIndex - 1);
        this.activeIndex -= 1;
      }
    },
    nextMonth() {
      //console.log(this.activeIndex + 1)
      if (this.activeIndex < Object.keys(this.summary).length - 1) {
        this.$refs.swipe.swipeTo(this.activeIndex + 1);
        this.activeIndex += 1;
      }
    },
    monthChoose(month) {
      this.chooseMonth = month;
      //console.log(Fetch.staffSummary(month))
      this.summary = Fetch.staffSummary(month);
      this.renderCharts(month);
    },
    pieceRecordConfirm() {
      let that = this;
      if (!this.pieceRecordValue.type) {
        Toast.fail("请选择型号");
      } else if (!this.pieceRecordValue.num) {
        Toast.fail("数量不能为0");
      } else if (!this.pieceRecordValue.staff) {
        Toast.fail("请选择员工");
      } else {
        PieceRecord(this.pieceRecordValue, (record) => {
          that.$set(that.$data.summary[that.targetStaff], "record", [
            record,
            ...that.$data.summary[that.targetStaff].record
          ]);
		  that.reRenderCharts();
		  that.pieceRecordPopupVisible = false;
        });
      }
    },
    deleteRecord(record, key) {
      //console.log(this.summary)
      //console.log(key)
      let that = this;
      Dialog.confirm({
        title: "提示",
        message: `删除记录会同时删除相关数据，确定要删除吗？`
      })
        .then(() => {
          Delete.record(record, () => {
            let index = that.summary[key].record.findIndex(
              item => item == record
            );
            let recordList = this.summary[key].record;
            recordList.splice(index, 1);
            that.$set(that.$data.summary[key], "record", recordList);
            that.renderCharts(that.chooseMonth);
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    renderCharts(month) {
      Toast.loading("加载中...");
      setTimeout(() => {
        Toast.clear();
        Object.entries(this.summary).forEach(item => {
          let staffName = item[0];
          let staffSummary = item[1];
          let detailList = Object.entries(staffSummary.detail).map(item => {
            return { name: item[0], value: item[1] };
          });
          let options = this.initOption;
          options.series[0].data = detailList;
          options.title.subtext = `应发工资：${staffSummary.total}元`;
          let myChart = echarts.init(
            document.getElementById(`${staffName}Charts`)
          );
          myChart.setOption(options);
        });
      }, 50);
	},
	reRenderCharts() {
		  this.summary =  Fetch.staffSummary(this.$route.query.date);
          let staffName = this.targetStaff;
          let staffSummary = this.summary[staffName];
          let detailList = Object.entries(staffSummary.detail).map(item => {
            return { name: item[0], value: item[1] };
          });
          let options = this.initOption;
          options.series[0].data = detailList;
          options.title.subtext = `应发工资：${NP.times(
            staffSummary.total,
            10000
          )}元`;
          let myChart = echarts.init(
            document.getElementById(`${staffName}Charts`)
          );
          myChart.setOption(options);
    }
  }
};
</script>

<style lang="scss" scoped>
.staffManageContainer {
  padding: 0.4rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .staffDetail {
    // border-radius: 0.4rem;
    // background: #e2e2e2;
    color: #8e7777;
    width: 100%;
    // border: 1px solid #e5e5e5;
    box-sizing: border-box;
    h1 {
      box-sizing: content-box;
      color: #fff;
      background: #967171;
      font-size: 16px;
      font-weight: normal;
      padding: 0.2rem 0.4rem;
      font-weight: normal;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
    }
    .bar {
      padding: 0 0.3rem;
    }
  }
  .toolBar {
    width: 100%;
    height: 6%;
  }
}
.popup {
  .dialogTitle {
    background: #fff;
    font-size: 20px;
  }
  p {
    padding: 0.3rem;
    font-size: 20px;
    span {
      font-size: 18px;
      margin-right: 0.5rem;
      color: #000;
    }
    input {
      border: 1px #c9c9c9 solid;
      border-radius: 2px;
      color: #000;
      text-align: center;
      font-weight: lighter;
      font-size: 16px;
      padding: 0.1rem 0.4rem;
    }
  }
}

.operationRecords {
  box-sizing: border-box;
  overflow-x: hidden;
  height: 40%;
  width: 100%;
  background: #f3f3f3;
  border: none;
  ul {
    height: 100%;
    overflow-y: auto;
    li {
      box-sizing: border-box;
      border: 1px solid #dbdbdb;
      border-top: none;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      padding: 0.4rem;
      margin: 0.1rem;
      background: #fff;
      h4 {
        padding: 0.1rem 0;
        font-size: 14px;
      }
      p {
        padding: 0.1rem 0;
      }
      .content,
      .content span {
        font-size: 24px;
      }
    }
  }
}

.icon-last {
  position: fixed;
  left: 0.2rem;
  top: 50%;
  font-size: 26px;
  color: #888888;
}
.icon-next {
  position: fixed;
  right: 0.2rem;
  top: 50%;
  font-size: 26px;
  color: #888888;
}

.inputTitle {
  width: 2.9rem;
  display: inline-block;
  text-align: center;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(2rem);
  opacity: 0;
}
</style>


