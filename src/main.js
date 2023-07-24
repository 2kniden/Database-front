import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import $ from "jquery";
// 引入jQuery、bootstrap

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 全局注册 $
createApp(App).config.globalProperties.$ = $;

// 挂载一个自定义属性$http
createApp(App).config.globalProperties.$http = axios;
// 全局配置axios请求根路径(axios.默认配置.请求根路径)

//连接服务器用这个
// axios.defaults.baseURL = "";
//连接本地服务器用这个
// axios.defaults.baseURL = "http://localhost:5000";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
