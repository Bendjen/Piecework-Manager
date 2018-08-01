import store from 'store'

// 导出localStorage表

export default function () {
    const initData = [
        { name: 'OPERATION_RECORD_LIST', value: [] },
        { name: 'STOCK', value: {} },
        { name: 'EXPORT_RECORD_LIST', value: [] },
        { name: 'IMPORT_RECORD_LIST', value: [] },
        // { name:'STAFF_PIECE_RECORD_LIST', value: {} },
        { name: 'STAFF_LIST', value: [] },
        { name: 'ITEM_TYPE_LIST', value: [] },
    ]

    initData.forEach(item => {
        if (!store.get(item.name)) {
            store.set(item.name, item.value)
        }
    })
}