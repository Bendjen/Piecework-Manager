import Home from "./pages/Home.vue";
import StaffDetail from "./pages/staffDetail.vue";
import StaffList from "./pages/staffList.vue";

export default [{
    path: "/",
    component: Home,
}, {
    path: "/home",
    component: Home
}, {
    path: "/staffDetail",
    component: StaffDetail
}, {
    path: "/staffList",
    component: StaffList
}
];
