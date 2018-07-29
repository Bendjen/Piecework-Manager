<template>
	<van-popup v-model="show" position="bottom" style='background:#e5e5e5;'>
        <h4 class='title' flex='main:start cross:center'>选择员工</h4>
        <van-picker :columns="columns" show-toolbar @confirm="onConfirm" @cancel='onCancel' confirm-button-text='确定' cancel-button-text='取消' />
    </van-popup>
</template>

<script>
import { Popup, Picker } from 'vant';
import * as Fetch from '../../utils/fetch.js'

export default {
    components: {
        'vanPopup': Popup,
        'vanPicker': Picker,
    },
    data () {
        return {
            show: false,
            value: '',
            columns: Fetch.staffList()
        }
    },
    mounted () {
    },
    methods: {
        toggle () {
            this.show = !this.show;
        },
        onConfirm (value) {
            this.value = value
            this.$emit('change', value)
            this.toggle()
        },
        onCancel () {
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


