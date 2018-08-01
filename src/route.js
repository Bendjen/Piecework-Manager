import Home from "./pages/Home.vue";
import StaffDetail from "./pages/StaffDetail.vue";
import StaffList from "./pages/StaffList.vue";
import Goods from "./pages/Goods.vue";
import Today from "./pages/Today.vue";

export default [
    {
        path: "/",
        component: Home
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: "/staffList",
        component: StaffList,
    },
    {
        path: "/staffDetail/:staff",
        component: StaffDetail,
        props: true
    },
    {
        path: "/goods",
        component: Goods
    },
    {
        path: "/today",
        component: Today
    }
];
