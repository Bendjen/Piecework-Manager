import store from 'store'
import NP from 'number-precision'
import { Toast } from 'vant';
import onfire from 'onfire.js';

// 员工记单
// @type : 型号
// @staff : 员工
// @num : 数量
// @time : 时间

export default function ({ staff, type, num, time }) {
    // 添加操作记录
    let operationRecorddList = store.get('OPERATION_RECORD_LIST') || []
    let newOperationRecord = { type, num, time, staff, action: 'PIECE_RECORD', actionName: '员工记单' }
    store.set('OPERATION_RECORD_LIST', [...operationRecorddList, newOperationRecord])
    onfire.fire('add_operation_record', newOperationRecord);

    // 添加员工记单记录
    let staffPieceRecordList = store.get('STAFF_PIECE_RECORD_LIST') || {}
    if (!staffPieceRecordList[staff]) {
        Toast.fail('员工记单表中未添加此员工')
        return false
    }
    staffPieceRecordList[staff].push({ staff, type, num, time })
    store.set('STAFF_PIECE_RECORD_LIST', staffPieceRecordList)

    Toast.success('添加记单成功')
}