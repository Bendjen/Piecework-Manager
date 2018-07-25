import dayjs from 'dayjs'

export default function toyun (Vue) {
    Vue.filter("toTime", (val) => {
        const today = dayjs(new Date(dayjs().year(), dayjs().month(), dayjs().date()))
        const yesterday = dayjs(today).subtract(1, 'day');
        const tommorrow = dayjs(today).add(1, 'day');
        if (dayjs(val).isBefore(today) && dayjs(val).isAfter(yesterday)) {
            return dayjs(val).format('昨天 HH:mm');
        } else if (dayjs(val).isBefore(tommorrow) && dayjs(val).isAfter(today)) {
            return dayjs(val).format('今天 HH:mm');
        } else {
            return dayjs(val).format('MM:DD HH:mm');
        }

    })
}