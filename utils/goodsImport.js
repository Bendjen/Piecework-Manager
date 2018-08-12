import store from 'store'
import NP from 'number-precision'
import { Toast } from 'vant';
import onfire from 'onfire.js';

// 进货
// @type : 型号
// @num : 数量
// @time : 时间

export default function ({ type, num, time }) {
    // 添加库存
    // let stock = store.get('STOCK') || {}
    // if (!stock[type]) {
    //     Toast.fail('库存中未添加此类产品');
    //     return false
    // }
    // let curStock = NP.plus(stock[type], num)
    // store.set('STOCK', curStock)

    // 添加操作记录
    let operationRecorddList = store.get('OPERATION_RECORD_LIST') || []
    let newOperationRecord = { type, num, time, action: 'GOODS_IMPORT', actionName: '进货' }
    store.set('OPERATION_RECORD_LIST', [...operationRecorddList, newOperationRecord])
    onfire.fire('add_operation_record', newOperationRecord);

    // 添加进货记录
    // let importRecordList = store.get('IMPORT_RECORD_LIST') || []
    // let newImportRecord = { type, num, time }
    // store.set('IMPORT_RECORD_LIST', [...importRecordList, newImportRecord])


	Toast.success({ duration: 1000, message: "添加进货成功" });

}
