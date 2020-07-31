<template>
  <div style="height:100%; width:100%;">
    <div class="summary" id="charts"></div>
    <div class="quickList" flex="dir:top main:center">
      <ul flex="main:center cross:center">
        <li
          v-for="item in navList1"
          :key="item.title"
          @click="item.onClick"
          flex="dir:top main:center cross:center"
        >
          <div class="icon" flex="main:center cross:center">
            <i class="iconfont" :class="item.icon"></i>
          </div>
          <span style="text-align:center;">{{item.title}}</span>
        </li>
      </ul>
      <ul flex="main:center cross:center">
        <li
          v-for="item in navList2"
          :key="item.title"
          @click="item.onClick"
          flex="dir:top main:center cross:center"
        >
          <div class="icon" flex="main:center cross:center">
            <i class="iconfont" :class="item.icon"></i>
          </div>
          <span style="text-align:center;">{{item.title}}</span>
        </li>
      </ul>
    </div>
    <div class="operationRecords">
      <!-- <h1 style='height:10%' flex='cross:center'>操作记录</h1> -->
      <ul>
        <li v-if="recordList.length == 0">
          <div>暂无任何操作记录</div>
        </li>
        <transition-group name="slide-fade" v-else>
          <li
            flex="main:justify cross:center"
            v-for="(item,index) in recordList"
            :key="index"
            style="position:relative"
          >
            <i
              class="iconfont icon-close"
              v-if="item.action == 'PIECE_RECORD' || item.action == 'GOODS_EXPORT' "
              style="position:absolute; right:.2rem;top:.2rem"
              @click="deleteRecord(item)"
            ></i>
            <div flex="dir:top">
              <h4>{{item.actionName}}</h4>
              <p v-if="item.type">[{{item.type}}]</p>
              <p v-else>&nbsp;</p>
              <p class="time" style="color:#6a788c">{{item.time | toTime}}</p>
            </div>
            <div class="content" v-if="item.action == 'STAFF_ADD'">{{item.staff}}</div>
            <div
              class="content"
              v-if="item.action == 'GOODS_EXPORT'"
              style="color:#00c000;"
            >+{{item.num}} 件</div>
            <div
              class="content"
              v-else-if="item.action == 'GOODS_IMPORT'"
              style="color:#f44"
            >+{{item.num}} 件</div>
            <div
              class="content"
              v-else-if="item.action == 'TYPE_ADD'"
              style="color:#f44"
            >{{item.name}}</div>
            <div
              class="content"
              v-else-if="item.action == 'PIECE_RECORD'"
              flex="dir:top main:center cross:center"
              style="color:#38f;"
            >
              <span style="margin-bottom:.2rem;font-size:16px;">{{item.staff}}</span>
              <span>+{{item.num}} 件</span>
            </div>
          </li>
        </transition-group>
      </ul>
    </div>

    <!-- 进货弹窗 -->
    <van-popup
      v-model="importPopupVisible"
      style="width:90%;height:50%;background: #f3f3f3;"
      class="popup"
    >
      <div style="width:90%;height:100%;">
        <h2 class="dialogTitle" style="height:15%;" flex="main:center cross:center">进货</h2>
        <div style="height:65%;" flex="dir:top cross:center main:center">
          <p flex="main:center cross:center">
            <span class="inputTitle">型号：</span>
            <input
              type="text"
              readonly
              placeholder="点击选择型号"
              @click="$refs.typePicker.toggle()"
              :value="importValue.type"
            >
          </p>
          <p flex="main:center cross:center">
            <span class="inputTitle">数量（件）：</span>
            <input type="number" v-model.number="importValue.num">
            <!-- <input type="number" v-model.number="importValue.num" @focus="$event.target.select()"> -->
          </p>
          <p flex="main:center cross:center">
            <span class="inputTitle">时间：</span>
            <input
              type="text"
              readonly
              :value="importValue.time | toTime"
              @click="$refs.timePicker.toggle()"
            >
          </p>
        </div>
        <div style="height:20%;padding:0 10%;" flex="main:justify cross:center">
          <van-button type="default" style="width:40%" @click="importPopupVisible = false">取消</van-button>
          <van-button type="primary" style="width:40%" @click="importConfirm">确定</van-button>
        </div>
      </div>
    </van-popup>

    <!-- 出货弹窗 -->
    <van-popup
      v-model="exportPopupVisible"
      style="width:100%;background: #f3f3f3;"
      class="popup"
    >
      <div style="width:100%;height:100%;">
        <h2 class="dialogTitle" style="height:1.2rem;" flex="main:center cross:center">出货</h2>
        <div style="height:65%;" flex="dir:top cross:center main:center">
          <p flex="main:center cross:center">
            <span class="inputTitle">型号：</span>
            <input
              type="text"
              readonly
              placeholder="点击选择型号"
              @click="$refs.typePicker.toggle()"
              :value="exportValue.type"
            >
          </p>
          <p flex="main:center cross:center">
            <span class="inputTitle">数量（件）：</span>
            <input type="number" v-model.number="exportValue.num">
            <!-- <input type="number" v-model.number="exportValue.num" @focus="$event.target.select()"> -->
          </p>
          <p flex="main:center cross:center">
            <span class="inputTitle">时间：</span>
            <input
              type="text"
              readonly
              :value="exportValue.time | toTime"
              @click="$refs.timePicker.toggle()"
            >
          </p>
        </div>
        <div style="height:2rem;padding:0 10%;" flex="main:justify cross:center">
          <van-button type="default" style="width:40%" @click="exportPopupVisible = false">取消</van-button>
          <van-button type="primary" style="width:40%" @click="exportConfirm">确定</van-button>
        </div>
      </div>
    </van-popup>

    <!-- 记单弹窗 -->
    <van-popup
      v-model="pieceRecordPopupVisible"
      style="width:100%;background: #f3f3f3;"
      class="popup"
    >
      <div style="width:100%;height:100%;">
        <h2 class="dialogTitle" style="height:1.2rem;" flex="main:center cross:center">员工记单</h2>
        <div flex="dir:top cross:center main:center">
          <p flex="main:center cross:center">
            <span class="inputTitle">员工：</span>
            <input
              type="text"
              readonly
              placeholder="点击选择员工"
              @click="$refs.staffPicker.toggle()"
              :value="pieceRecordValue.staff"
            >
          </p>
          <p flex="main:center cross:center">
            <span class="inputTitle">型号：</span>
            <input
              type="text"
              readonly
              placeholder="点击选择型号"
              @click="$refs.typePicker.toggle()"
              :value="pieceRecordValue.type"
            >
          </p>
          <p flex="main:center cross:center">
            <span class="inputTitle">数量（件）：</span>
            <input
              type="number"
              v-model.number="pieceRecordValue.num"
            >
            <!-- <input
              type="number"
              v-model.number="pieceRecordValue.num"
              @focus="$event.target.select()"
            > -->
          </p>
          <p flex="main:center cross:center">
            <span class="inputTitle">时间：</span>
            <input
              type="text"
              readonly
              :value="pieceRecordValue.time | toTime"
              @click="$refs.timePicker.toggle()"
            >
          </p>
        </div>
        <div style="height:2rem;padding:0 10%;" flex="main:justify cross:center">
          <van-button type="default" style="width:40%" @click="pieceRecordPopupVisible = false">取消</van-button>
          <van-button type="primary" style="width:40%" @click="pieceRecordConfirm">确定</van-button>
        </div>
      </div>
    </van-popup>

    <!-- 选择器 -->
    <type-picker ref="typePicker" @change="typeChoose"></type-picker>
    <time-picker ref="timePicker" @change="timeChoose"></time-picker>
    <staff-picker ref="staffPicker" @change="staffChoose"></staff-picker>
    <van-popup v-model="manageDialogVisible">
      <div flex="main:center cross:center">
        <p class="iconBtn" flex="dir:top main:center cross:center" @click="fileLoad">
          <i class="iconfont icon-file-load"></i>
          <span>读取数据</span>
        </p>
        <p class="iconBtn" flex="dir:top main:center cross:center" @click="fileSave">
          <i class="iconfont icon-file-save"></i>
          <span>备份数据</span>
        </p>
        <p class="iconBtn" flex="dir:top main:center cross:center" @click="clearData">
          <i class="iconfont icon-lajixiang"></i>
          <span>清空数据</span>
        </p>
      </div>
    </van-popup>
    <!-- 读取文件 -->
    <input type="file" id="file" style="width:0;height:0;position:absoluted;" v-show="false">
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

import onfire from "onfire.js";
import dayjs from "dayjs";
import { Popup, Button, Toast,  Dialog } from "vant";
import TypePicker from "../components/TypePicker";
import TimePicker from "../components/TimePicker";
import StaffPicker from "../components/StaffPicker";

import GoodsImport from "../../utils/goodsImport";
import GoodsExport from "../../utils/goodsExport";
import PieceRecord from "../../utils/pieceRecord";
import FileSave from "../../utils/fileSave";
import FileLoad from "../../utils/fileLoad";
import * as Fetch from "../../utils/fetch";
import * as Delete from "../../utils/delete";
import Mock from "../../utils/mock";
import Clear from "../../utils/clear";

export default {
  components: {
    VanPopup: Popup,
    VanButton: Button,
    TypePicker: TypePicker,
    TimePicker: TimePicker,
    StaffPicker: StaffPicker
  },
  data() {
    let that = this;
    return {
      activeKey: "",
      importPopupVisible: false,
      exportPopupVisible: false,
      pieceRecordPopupVisible: false,
      manageDialogVisible: false,
      importValue: {
        type: "",
        num: "",
        time: ""
      },
      exportValue: {
        type: "",
        num: "",
        time: ""
      },
      pieceRecordValue: {
        staff: "",
        type: "",
        num: "",
        time: ""
      },
      recordList: Fetch.currentOperationRecord(),
      navList1: [
        // {
        //     title: "进货",
        //     icon: "icon-import",
        //     onClick: () => {
        //         this.importPopupVisible = true;
        //         this.activeKey = "importValue";
        //         this.importValue = { type: "", num: 0, time: new Date().getTime() };
        //     }
        // },
        {
          title: "出货",
          icon: "icon-export",
          onClick: () => {
            this.exportPopupVisible = true;
            this.activeKey = "exportValue";
            this.exportValue = { type: "", num: "", time: new Date().getTime() };
          }
        },
        {
          title: "员工计单",
          icon: "icon-records",
          onClick: () => {
            this.pieceRecordPopupVisible = true;
            this.activeKey = "pieceRecordValue";
            this.pieceRecordValue = {
              staff: "",
              type: "",
              num: "",
              time: new Date().getTime()
            };
          }
        },
        {
          title: "今日核对",
          icon: "icon-summary",
          onClick: () => {
            this.$router.push("/today");
          }
        },
        {
          title: "工资结算",
          icon: "icon-staff",
          onClick: () => {
            this.$router.push("/staffList");
          }
        }
      ],
      navList2: [
        {
          title: "出货报表",
          icon: "icon-goodsSummary",
          onClick: () => {
            this.$router.push("/goods");
          }
        },
        {
          title: "员工与型号",
          icon: "icon-data",
          onClick: () => {
            this.$router.push("/dataManage");
          }
        },
        {
          title: "数据管理",
          icon: "icon-data-manage",
          onClick: () => {
            this.$data.manageDialogVisible = true;
          }
        },
        { title: "随机模拟", icon: "icon-mock", onClick: this.mockData }
        // { title: "读取数据", icon: "icon-file-load", onClick: this.fileLoad },
        // { title: "导出数据", icon: "icon-file-save", onClick: this.fileSave }
      ],
      initOption: {
        title: {
          text: "今日完成",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} "
        },
        series: [
          {
            name: "访问来源",
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
  mounted() {
    let vm = this;
    this.renderCharts();

    // 读取文件监听
    let input = document.getElementById("file");
    input.onchange = function() {
      let file = this.files[0];
      if (!!file) {
        let reader = new FileReader();
        reader.readAsText(file);
        Toast.loading({ duration: 0, message: "文件解析中..." });
        reader.onload = function() {
          Toast.clear();
          try {
            FileLoad(JSON.parse(this.result));
          } catch (err) {
            Dialog.alert({
              title: "错误",
              message: "文件解析失败：文件格式错误，请选择JSON文件"
            });
          }
        };
      }
    };

    // 操作记录更新监听
    onfire.on("add_operation_record", function(record) {
      setTimeout(() => {
        vm.recordList.splice(0, 0, record);
        vm.renderCharts();
      }, 500);
    });
    onfire.on("reload", function(record) {
      location.reload();
    });
  },
  beforeDestroy() {
    onfire.un("add_operation_record");
    onfire.un("reload");
  },
  methods: {
    typeChoose(val) {
      this.$set(this.$data[this.activeKey], "type", val);
    },
    timeChoose(val) {
      this.$set(this.$data[this.activeKey], "time", val.getTime());
    },
    staffChoose(val) {
      this.$set(this.$data[this.activeKey], "staff", val);
    },
    importConfirm() {
      if (!this.importValue.type) {
        Toast.fail("请选择型号");
      } else if (!this.importValue.num) {
        Toast.fail("数量不能为0");
      } else {
        GoodsImport(this.importValue);
        this.importPopupVisible = false;
      }
    },
    exportConfirm() {
      if (!this.exportValue.type) {
        Toast.fail("请选择型号");
      } else if (!this.exportValue.num) {
        Toast.fail("数量不能为0");
      } else {
        GoodsExport(this.exportValue);
        this.exportPopupVisible = false;
      }
    },
    pieceRecordConfirm() {
      //console.log(this.pieceRecordValue);
      if (!this.pieceRecordValue.type) {
        Toast.fail("请选择型号");
      } else if (!this.pieceRecordValue.num) {
        Toast.fail("数量不能为0");
      } else if (!this.pieceRecordValue.staff) {
        Toast.fail("请选择员工");
      } else {
        PieceRecord(this.pieceRecordValue);
        this.pieceRecordPopupVisible = false;
      }
    },
    deleteRecord(record) {
      let that = this;
      Dialog.confirm({
        title: "提示",
        message: `删除记录会同时删除相关数据，确定要删除吗？`
      })
        .then(() => {
          Delete.record(record, operationRecord => {
            that.recordList = operationRecord;
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    clearData() {
      Dialog.confirm({
        title: "提示",
        message: "数据清空后将无法恢复，确认清空数据吗？"
      })
        .then(() => {
          Clear();
          this.manageDialogVisible = false;
        })
        .catch(() => {
          // on cancel
        });
    },
    mockData() {
      Dialog.confirm({
        title: "提示",
        message: "随机模拟数据将会覆盖原来的数据，确定要这么做吗？"
      })
        .then(() => {
          Mock();
          this.manageDialogVisible = false;
        })
        .catch(() => {
          // on cancel
        });
    },
    fileLoad() {
      document.getElementById("file").click();
      this.manageDialogVisible = false;
    },
    fileSave() {
      try {
        FileSave();
      } catch (err) {
        console.log(err)
        Dialog.alert({
          title: "错误",
          message: "微信或该浏览器不支持导出文件，请切换到主流浏览器后再次尝试"
        });
      }
      this.manageDialogVisible = false;
    },
    renderCharts() {
      setTimeout(() => {
        // 图表渲染
        let chartsOption = this.initOption;
        chartsOption.series[0].data = Object.entries(
          Fetch.goodsSummary(new Date(), "day")
        ).map(item => {
          return { name: item[0], value: item[1].num };
        });
        //console.log(chartsOption);
        let myChart = echarts.init(document.getElementById("charts"));
        myChart.setOption(chartsOption);
      }, 300);
    }
  }
};
</script>

<style lang="scss" scoped>
.summary {
  width: 100%;
  height: 35%;
  box-sizing: border-box;
  overflow: hidden;
}
.popup {
  input {
    height: 1rem;
  }
}
.quickList {
  height: 25%;
  box-sizing: border-box;
  overflow: hidden;
  background: #c39a9a;
  ul {
    li {
      display: inline-block;
      width: 30%;
      height: 1.8rem;
      padding: 0.1rem 0;
      color: #fff;
      &:active {
        transition: all 0.1s;
        box-sizing: border-box;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.14),
          2px 2px 2px 2px rgba(0, 0, 0, 0.12),
          2px 2px 2px -2px rgba(0, 0, 0, 0.2);
      }
      .icon {
        width: 100%;
        height: 70%;
      }
      i {
        font-size: 26px;
        color: #fff;
      }
    }
  }
}
.inputTitle {
  width: 2.9rem;
  display: inline-block;
  text-align: center;
}
.operationRecords {
  box-sizing: border-box;
  overflow-x: hidden;
  height: 40%;
  width: 100%;
  h1 {
    color: black;
    padding: 0.2rem 0.4rem;
    font-weight: normal;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
  }
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

.popup {
  .dialogTitle {
    background: #fff;
    font-size: 20px;
  }
  p {
    padding: 0.3rem;
    font-size: 20px;
    span {
      font-size: 17px;
    //   margin-right: 0.5rem;
      color: #000;
    }
    input {
      border: 1px #c9c9c9 solid;
      border-radius: 2px;
      color: #000;
      text-align: center;
      font-weight: bold;
      font-size: 16px;
    //   padding: 0.1rem 0.4rem;
    }
  }
}
.iconBtn {
  padding: 0.4rem 0.2rem;
  border: 1px solid #e5e5e5;
  width: 2rem;
  i {
    font-size: 40px;
      color: #409eff;
  }
  span {
    padding-top: 0.3rem;
    color: #969799;
    font-size: 14px;
  }
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


