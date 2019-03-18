import store from 'store'
import { Toast } from 'vant'
import onfire from "onfire.js";

export default function () {
  store.set('STAFF_LIST', [])
  store.set('ITEM_TYPE_LIST', [])
  store.set('OPERATION_RECORD_LIST', [])
  store.set('LATELY_ID', 0)
  Toast.success({
    message: '已清除所有数据',
    title: '成功'
  })
  onfire.fire("reload");
}
