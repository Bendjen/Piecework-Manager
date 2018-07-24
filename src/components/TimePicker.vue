<template>
	<van-popup v-model="show" position="bottom" style='background:#e5e5e5;'>
        <h4 class='title' flex='main:start cross:center'>选择时间</h4>
        <van-datetime-picker type="datetime" v-model='currentDate' @confirm='onConfim' @cancel='onCancel' confirm-button-text='确定' cancel-button-text='取消'/>
    </van-popup>
</template>

<script>
import { Popup, DatetimePicker } from 'vant';

export default {
    components: {
        'vanPopup': Popup,
        'vanDatetimePicker': DatetimePicker
    },
    data () {
        return {
            show: false,
            currentDate:new Date()
        }
    },
    mounted () {
    },
    methods: {
        toggle () {
            this.show = !this.show;
        },
        onConfim (value) {
            this.value = value
            this.$emit('change', value)
            this.toggle()
        },
        onCancel(){
            this.toggle()
        }
    }
};
</script>

<style lang="scss" scoped>
.title {
  height: 1.2rem;
  font-size: 15px;
  border-bottom: 1px solid #e5e5e5;
  padding-left: 0.4rem;
}
</style>


