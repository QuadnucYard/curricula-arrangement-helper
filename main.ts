import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/src/message.scss";
import "element-plus/theme-chalk/src/message-box.scss";
import "element-plus/theme-chalk/src/notification.scss";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// import './samples/node-api'

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app
  .use(router)
  .use(store)
  .use(ElementPlus)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });
