import store from 'store'
import NP from 'number-precision'
import { Toast } from 'vant';
import onfire from 'onfire.js';

// 增加员工
// @type : 型号
// @num : 数量
// @time : 时间

export default function ({ name, time }, callback) {

    // 添加操作记录
    let operationRecorddList = store.get('OPERATION_RECORD_LIST') || []
    let newOperationRecord = { staff: name, time, action: 'STAFF_ADD', actionName: '新增员工' }
    store.set('OPERATION_RECORD_LIST', [...operationRecorddList, newOperationRecord])
    onfire.fire('add_operation_record', newOperationRecord);

    // 更新员工列表
    let staffList = store.get('STAFF_LIST') || []
    let newStaff = { name, time }

    if (!!staffList.find(item => item.name == name)) {
        Toast.fail('添加失败，已存在同名员工')
        return false
    } else {
        store.set('STAFF_LIST', [...staffList, newStaff])
    }

    // 更新员工计件列表
    let staffPieceRecordList = store.get('STAFF_PIECE_RECORD_LIST') || {}
    staffPieceRecordList[name] = [];
    store.set('STAFF_PIECE_RECORD_LIST', staffPieceRecordList)

    Toast.success('添加成功')
    callback && callback()
}