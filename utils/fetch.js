import store from "store";
import NP from "number-precision";
import { Toast } from "vant";
import dayjs from "dayjs";

export function itemTypeList () {
    return store.get("ITEM_TYPE_LIST").map(item => item.name);
}

export function staffList () {
    return store.get("STAFF_LIST").map(item => item.name);
}

export function operationRecord () {
    let list = store.get("OPERATION_RECORD_LIST") || [];
    list.reverse();
    return list;
}

// // 员工目标月记录汇总
// export function targetStaffMonthRecord (staff, date = new Date()) {
//     let list = store.get("OPERATION_RECORD_LIST");
//     let itemTypeList = store.get('ITEM_TYPE_LIST')
//     let targetMonthStart = dayjs(date).startOf("month");
//     let targetMonthEnd = dayjs(date).endOf("month");
//     list = list.filter(item => {
//         return (
//             dayjs(item.time).isAfter(targetMonthStart) &&
//             dayjs(item.time).isBefore(targetMonthEnd) &&
//             item.action == "PIECE_RECORD" &&
//             item.staff == staff
//         );
//     });
//     list.reverse();


//     let summary = {}
//     let totalMoney = 0;
//     list.forEach(item => {
//         summary[item.type] = NP.plus(
//             summary[item.type] || 0,
//             item.num
//         );
//         let itemPrice = itemTypeList.find(_item => _item.name == item.type).price;
//         totalMoney = NP.plus(
//             totalMoney,
//             NP.times(item.num, itemPrice)
//         );

//     });
//     return {
//         summary,
//         recordList: list,
//         totalMoney
//     }
// }


// 过滤目标月下单记录
export function pieceRecordFilter (date = new Date(), unit = 'month') {
    let list = store.get("OPERATION_RECORD_LIST");
    let targetMonthStart = dayjs(date).startOf(unit);
    let targetMonthEnd = dayjs(date).endOf(unit);
    return list.filter(item => {
        return (
            dayjs(item.time).isAfter(targetMonthStart) &&
            dayjs(item.time).isBefore(targetMonthEnd) &&
            item.action == "PIECE_RECORD"
        );
    });
}


// 员工记单汇总
export function staffSummary (date = new Date(), unit = 'month') {
    // 数据初始化为0
    let staffSummary = {};
    let itemTypeList = store.get('ITEM_TYPE_LIST')
    store.get("STAFF_LIST").forEach(item => {
        staffSummary[item.name] = {};
        staffSummary[item.name]['detail'] = {};
        staffSummary[item.name]['record'] = [];
        staffSummary[item.name]['total'] = 0;
    });

    // 数据累加
    pieceRecordFilter(date, unit).forEach(item => {
        staffSummary[item.staff]['detail'][item.type] = NP.plus(
            staffSummary[item.staff][['detail']][item.type] || 0,
            item.num
        );

        staffSummary[item.staff]['record'].push(item);

        let itemPrice = itemTypeList.find(_item => _item.name == item.type).price;
        staffSummary[item.staff]['total'] = NP.plus(
            staffSummary[item.staff]['total'],
            NP.times(item.num, itemPrice)
        );
    });

    console.log(staffSummary)
    return staffSummary;
}

// 货物记单汇总
export function goodsSummary (date = new Date(), unit = 'month') {
    // 数据初始化为0
    let goodsSummary = {};
    let itemTypeList = store.get('ITEM_TYPE_LIST')

    store.get("ITEM_TYPE_LIST").forEach(item => {
        goodsSummary[item.name] = {};
    });

    // 数据累加
    pieceRecordFilter(date, unit).forEach(item => {
        goodsSummary[item.type]['num'] = NP.plus(
            goodsSummary[item.type]['num'] || 0,
            item.num
        );

        let itemPrice = itemTypeList.find(_item => _item.name == item.type).price;
        goodsSummary[item.type]['money'] = NP.plus(
            goodsSummary[item.type]['money'] || 0,
            NP.times(item.num, itemPrice)
        );
    });

    // console.log(goodsSummary)
    return goodsSummary;
}
