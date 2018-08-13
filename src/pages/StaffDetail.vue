<template>
    <div class='staffManageContainer'>
        <!-- <div class='toolBar' flex='main:justify' style='height:6%'>
            <i class='iconfont icon-back' @click="$router.push('/home')"></i>
            <i class='iconfont icon-add' @click="addPopVisible=true"></i>
        </div> -->

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
                                <li flex='main:justify cross:center'  v-for='record in item.record' :key='record.time' style='position:relative;'>
                                    <i class='iconfont icon-close' style='position:absolute; right:.2rem;top:.2rem' @click="deleteRecord(record,key)"></i>
                                    <div flex='dir:top'>
                                        <h4>{{record.type}}</h4>
                                        <p class='time'  style='color:#6a788c'>{{record.time | toTime}}</p>
                                    </div>
                                    <div class='content'  style='color:#38f;'> +{{record.num}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>


         <i class='iconfont icon-last' v-if="!(activeIndex == 0)"  @click="lastMonth"></i>
         <i class='iconfont icon-next' v-if="!(activeIndex >= Object.keys(summary).length-1)"  @click="nextMonth"></i>


        <month-picker ref='monthPicker' @change='monthChoose'></month-picker>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
import dayjs from 'dayjs'

import { Popup, Button, Toast, Swipe, SwipeItem,Dialog } from 'vant'

import MonthPicker from "../components/monthPicker"
import * as Fetch from "../../utils/fetch";
import * as Delete from "../../utils/delete";

export default {
    components: {
        'VanPopup': Popup,
        'VanButton': Button,
        'VanSwipe': Swipe,
        'VanSwipeItem': SwipeItem,
        'MonthPicker': MonthPicker,
    },
    data () {
        console.log(this.$route.query)
        return {
            chooseMonth: this.$route.query.date,
            addPopVisible: false,
            activeIndex: 0,
            summary: Fetch.staffSummary(this.$route.query.date),
            initOption: {
                title: {
                    text: '当月统计',
                    x: 'center',
                    subtext: '当月工资:'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} "
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        }
    },
    computed: {
        monthName: function () {
            return dayjs(this.chooseMonth).format('YYYY-MM')
        },
        initialSwipe: function () {
            let index = Object.keys(this.summary).findIndex(item => item == this.$route.params.staff)
            return index
        },

    },
    mounted () {
        console.log(this.$route)
        this.activeIndex = this.initialSwipe;
        this.renderCharts(this.chooseMonth)
    },
    methods: {
        swipeChange (index) {
            if (!Object.values(this.summary)[index].total) {
                Toast.fail({
                    message: '没有记单记录',
                    duration: 1000
                })
            }
        },
        lastMonth () {
            console.log(this.activeIndex - 1)
            if (this.activeIndex > 0) {
                this.$refs.swipe.swipeTo(this.activeIndex - 1)
                this.activeIndex -= 1
            }

        },
        nextMonth () {
            console.log(this.activeIndex + 1)
            if (this.activeIndex < Object.keys(this.summary).length - 1) {
                this.$refs.swipe.swipeTo(this.activeIndex + 1)
                this.activeIndex += 1
            }
        },
        monthChoose (month) {
            this.chooseMonth = month;
            console.log(Fetch.staffSummary(month))
            this.summary = Fetch.staffSummary(month)
            this.renderCharts(month)
        },
        deleteRecord (record,key) {
            let that = this;
            Dialog.confirm({
                title: "提示",
                message: `删除记录会同时删除相关数据，确定要删除吗？`
            })
                .then(() => {
                    Delete.record(record, operationRecord => {
                        
                    });
                })
                .catch(() => {
                    // on cancel
                });
        },
        renderCharts (month) {
            Toast.loading('加载中...')
            setTimeout(() => {
                Toast.clear()
                Object.entries(this.summary).forEach(item => {
                    let staffName = item[0];
                    let staffSummary = item[1];
                    let detailList = Object.entries(staffSummary.detail).map(item => { return { name: item[0], value: item[1] } })
                    let options = this.initOption;
                    options.series[0].data = detailList;
                    options.title.subtext = `应发工资：${staffSummary.total}元`;
                    let myChart = echarts.init(document.getElementById(`${staffName}Charts`));
                    myChart.setOption(options);
                })
            }, 50)
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
</style>


