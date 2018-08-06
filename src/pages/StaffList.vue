<template>
	<div class='staffList'>
        <!-- <div class='toolBar' flex='main:justify' style='height:6%'>
            <i class='iconfont icon-back' @click="$router.push('/home')"></i>
            <i class='iconfont icon-add' @click="addPopVisible=true"></i>
        </div> -->
		<!-- <i class='iconfont icon-add' @click="addPopVisible=true" style='position:fixed;top:.4rem;right:.4rem'></i> -->
		<div @click='$refs.monthPicker.toggle()' style='position:fixed;top:1.0rem;right:1.2rem;color:#333;'>
			<i class='iconfont icon-calendar'></i>
			<span>{{monthName}}</span>
		</div>
        <div style='height:40%' class='summary'>
            <h1 style='height:20%'>当月记单统计</h1>
            <ul style='height:60%;padding:10px; box-sizing:border-box;'>
                <li flex='main:left' v-for='(item,key) in goodsSummaryList' :key='key'  v-if="item.num">
                    <span style='text-align:left;width:25%'>{{key}}</span>
                    <span style='text-align:right;width:35%'>*{{item.num}}</span>
                    <span style='text-align:right;width:40%'>{{item.money}}元</span>
                </li>
            </ul>
            <div style='height:20%;' class='total'  flex='main:justify cross:center'>
                <span>合计</span>
                <span style='text-align:right;width:35%'>*{{totalNum}}</span>
                <span style='text-align:right;width:40%'>{{totalMoney}}元</span>
            </div>
        </div>
        <div class='staffs' style='height:60%'>
            <h1 style='height:10%;padding:.2rem 0.4rem' flex='main:justify cross:center'> <span style='font-size:16px'>应发工资</span> <span>{{staffMoney}} 元</span> </h1>
            <ul style='height:90%'>
                <li v-if="!staffMoney"> <div>当月没有员工记单记录</div></li>
                <li flex='main:justify cross:center'  v-for="(item,key) in staffSummaryList" :key='key' @click="linkToDetail(key)" v-else>
                    <div class='content' > {{key}}</div>
                    <div class='content'  style='color:#f44;'> {{item.total}} 元</div>
                </li>
            </ul>
        </div>


		<month-picker ref='monthPicker' @change='monthChoose'></month-picker>

      <!-- 添加员工 -->
          <van-popup v-model="addPopVisible" style='width:80%;height:25%;background: #f3f3f3;' class='popup'>
              <div style='width:100%;height:100%;'>
				  <h1 style='height:25%' class='dialogTitle'  flex='main:center cross:center'>添加员工</h1>
                  <div style='height:45%;' flex='dir:top cross:center main:center'>
                        <p flex='main:center cross:center'>
                            <span style='padding-right:.4rem'>姓名：</span>
                            <input type="text" v-model.trim = "newStaff.name" style='height:.8rem;text-align:center'>
                        </p>
                  </div>
                  <div style='height:20%;padding:0 10%;' flex='main:justify cross:center'>
                        <van-button type="default"  style='width:40%' @click='addPopVisible = false'>取消</van-button>
                        <van-button type="primary" style='width:40%' @click='addStaffConfirm'>确定</van-button>
                  </div>
              </div>
          </van-popup>
    </div>
</template>

<script>
import dayjs from "dayjs";
import { Popup, Button, Toast } from "vant";
import StaffAdd from "../../utils/staffAdd";
import * as Fetch from "../../utils/fetch";
import MonthPicker from "../components/monthPicker";
import NP from "number-precision";

export default {
    components: {
        VanPopup: Popup,
        VanButton: Button,
        MonthPicker: MonthPicker
    },
    data () {
        return {
            chooseMonth: new Date(),
            addPopVisible: false,
            newStaff: { name: "" },
            staffSummaryList: Fetch.staffSummary(),
            goodsSummaryList: Fetch.goodsSummary()
        };
    },
    computed: {
        monthName: function () {
            return dayjs(this.chooseMonth).format("YYYY-MM");
        },
        totalNum: function () {
            return Object.values(this.goodsSummaryList).map(item => item.num).reduce((cur, pre) => NP.plus(cur || 0, pre || 0), 0)
        },
        totalMoney: function () {
            return Object.values(this.goodsSummaryList).map(item => item.money).reduce((cur, pre) => NP.plus(cur || 0, pre || 0), 0)
        },
        staffMoney: function () {
            return Object.values(this.staffSummaryList).map(item => item.total).reduce((cur, pre) => NP.plus(cur || 0, pre || 0), 0)
        },
    },
    mounted () {
        if (!this.totalNum) {
            Toast.fail({ message: '无记单记录', duration: 1000 })
        }
    },
    methods: {
        linkToDetail (staff) {
            this.$router.push({ path: `/staffDetail/${staff}`, query: { date: this.chooseMonth.getTime() } })
        },
        monthChoose (month) {
            this.chooseMonth = month;
            Toast.loading('加载中...')
            setTimeout(() => {
                Toast.clear()
                this.staffSummaryList = Fetch.staffSummary(month)
                this.goodsSummaryList = Fetch.goodsSummary(month)
                if (!this.totalNum) {
                    Toast.fail({ message: '无记单记录', duration: 1000 })
                }
            }, 500)

        },
        addStaffConfirm () {
            let vm = this;
            if (!this.newStaff.name) {
                Toast.fail("姓名不能为空");
            } else {
                StaffAdd(
                    { name: this.newStaff.name, time: new Date().getTime() },
                    () => {
                        vm.addPopVisible = false;
                    }
                );
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.staffList {
  padding: 0.4rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.summary {
  box-sizing: border-box;
  background: #efd3b5;
  color: #336933;
  ul {
    overflow-y: auto;
  }
  h1 {
    padding: 0.4rem 0;
    text-align: center;
    font-size: 18px;
  }
  li {
    padding: 0.15rem 0.6rem;
    color: #7e9092;
    span {
      display: inline-block;
    }
  }
  .total {
    padding: 0.15rem 0.6rem;
    color: #336933;
    span {
      font-weight: bold;
      font-size: 18px;
    }
  }
}

.staffs {
  box-sizing: border-box;
  overflow-x: hidden;
  height: 40%;
  width: 100%;
  h1 {
    margin-top: 0.5rem;
    box-sizing: content-box;
    color: #fff;
    background: #967171;
    font-size: 16px;
    font-weight: normal;
    padding: 0.2rem 0.2rem;
    font-weight: normal;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
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
        font-size: 18px;
      }
    }
  }
}
.dialogTitle {
  background: #fff;
  font-size: 18px;
  font-weight: normal;
}
</style>


