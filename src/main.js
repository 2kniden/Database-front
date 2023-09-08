import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './mock';

import axios from "axios";
import $ from "jquery";
// import './mock/mock';
// 引入jQuery、bootstrap

import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 引入组件
import VueSplide from '@splidejs/vue-splide'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 创建一个全局变量，例如 globalData
let globalData = {
    navbarActive: 'home',
};

const app = createApp(App);

// 全局注册 $
app.config.globalProperties.$ = $;

// 挂载一个自定义属性$http
app.config.globalProperties.$http = axios;
// 全局配置axios请求根路径(axios.默认配置.请求根路径)

//连接服务器用这个
// axios.defaults.baseURL = "";
//连接本地服务器用这个
// axios.defaults.baseURL = "http://localhost:5000";

// 测试
axios.defaults.baseURL = "http://8.130.25.70:5545";

// 注册全局变量
app.config.globalProperties.$globalData = globalData;

// 注册全局的baseURL
app.config.globalProperties.$http=axios;
axios.defaults.baseURL="http://8.130.25.70:5000";

app.use(VueSplide);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(vue3videoPlay);

// 注册elementui图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount("#app");

