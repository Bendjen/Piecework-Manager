<template>
	<div class='staffList'>
        <!-- <div class='toolBar' flex='main:justify' style='height:6%'>
            <i class='iconfont icon-back' @click="$router.push('/home')"></i>
            <i class='iconfont icon-add' @click="addPopVisible=true"></i>
        </div> -->
		<i class='iconfont icon-add' @click="addPopVisible=true" style='position:fixed;top:.4rem;right:.4rem'></i>
        <div style='height:40%' class='summary'>
            <h1 style='height:20%'>员工当月详情</h1>
            <ul style='height:60%'>
                <li flex='main:justify' v-for='i in 10' :key='i' >
                    <span>A153</span>
                    <span>*1500</span>
                    <span>500元</span>
                </li>
            </ul>
            <div style='height:20%;' class='total'  flex='main:justify cross:center'>
                <span>合计</span>
                <span>25000</span>
                <span>50000</span>
            </div>
        </div>
        <div class='staffs' style='height:60%'>
            <h1 style='height:10%' flex='cross:center'>当月记单</h1>
            <ul style='height:90%'>
                <li flex='main:justify cross:center'  v-for='item in recordList' :key='item.time' @click="$router.push('/staffDetail')">
                    <div flex='dir:top'>
                        <h4>{{item.type}}</h4>
                        <p class='time'  style='color:#6a788c'>{{item.time | toTime}}</p>
                    </div>
                    <div class='content'  style='color:#38f;'> +{{item.num}}</div>
                </li>
            </ul>
        </div>


      <!-- 添加员工 -->
          <van-popup v-model="addPopVisible" style='width:80%;height:25%;background: #f3f3f3;' class='popup'>
              <div style='width:100%;height:100%;'>
				  <h1 style='height:25%' class='dialogTitle'  flex='main:center cross:center'>添加员工</h1>
                  <div style='height:45%;' flex='dir:top cross:center main:center'>
                        <p flex='main:center cross:center'>
                            <span style='padding-right:.4rem'>姓名：</span>
                            <input type="text" v-model.trim = "newStaff.name" style='height:.8rem'>
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
import { Popup, Button } from "vant";
import StaffAdd from "../../utils/staffAdd";
export default {
  components: {
    VanPopup: Popup,
    VanButton: Button
  },
  data() {
    return {
      addPopVisible: false,
      newStaff: { name: "" },
      recordList: [
        {
          type: "A123",
          staff: "张璐群",
          num: 100,
          time: new Date().getTime(),
          actionName: "员工计件",
          action: "PIECE_RECORD"
        },
        {
          type: "A123",
          staff: "张璐群",
          num: 100,
          time: new Date().getTime(),
          actionName: "员工计件",
          action: "PIECE_RECORD"
        },
        {
          type: "A123",
          staff: "张璐群",
          num: 100,
          time: new Date().getTime(),
          actionName: "员工计件",
          action: "PIECE_RECORD"
        },
        {
          type: "A123",
          staff: "张璐群",
          num: 100,
          time: new Date().getTime(),
          actionName: "员工计件",
          action: "PIECE_RECORD"
        },
        {
          type: "A123",
          staff: "张璐群",
          num: 100,
          time: new Date().getTime(),
          actionName: "员工计件",
          action: "PIECE_RECORD"
        },
        {
          type: "A123",
          staff: "张璐群",
          num: 100,
          time: new Date().getTime(),
          actionName: "员工计件",
          action: "PIECE_RECORD"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    addStaffConfirm() {
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
    padding: 0.15rem 1.2rem;
    color: #7e9092;
  }
  .total {
    padding: 0.15rem 1.2rem;
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
        font-size: 24px;
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


