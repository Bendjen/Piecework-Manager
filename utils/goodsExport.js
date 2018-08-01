import store from 'store'
import NP from 'number-precision'
import { Toast } from 'vant';
import onfire from 'onfire.js';

// 出货
// @type : 型号
// @num : 数量
// @time : 时间

export default function ({ type, num, time }) {
    // 减少库存
    // let stock = store.get('STOCK') || {}
    // if (!stock[type]) {
    //     Toast.fail('库存中未添加此类产品');
    //     return false
    // }
    // let curStock = NP.minus(stock[type], num)
    // store.set('STOCK', curStock)

    // 添加操作记录
    let operationRecorddList = store.get('OPERATION_RECORD_LIST') || []
    let newOperationRecord = { type, num, time, action: 'GOODS_EXPORT', actionName: '出货' }
    store.set('OPERATION_RECORD_LIST', [...operationRecorddList, newOperationRecord])
    onfire.fire('add_operation_record', newOperationRecord);

    // 添加进货记录
    // let exportRecordList = store.get('EXPORT_RECORD_LIST') || []
    // let newExportRecord = { type, num, time }
    // store.set('IMPORT_RECORD_LIST', [...exportRecordList, newExportRecord])

    Toast.success('添加出货成功')
}
