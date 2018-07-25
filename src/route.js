import Home from "./pages/Home.vue";
import StaffManage from "./pages/staffManage.vue";

export default [{
    path: "/",
    component: Home,
}, {
    path: "/home",
    component: Home
}, {
    path: "/staffManage",
    component: StaffManage
}
];
