import dayjs from 'dayjs'
export default function toyun (Vue) {
    Vue.filter("toTime", (val) => {
        return dayjs(val).format('MM-DD HH:mm');
    })
}