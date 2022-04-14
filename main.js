
// #ifndef VUE3
import Vue from 'vue';
import App from './App';
import store from '@/pages/store/index.js';

//npm install eruda 控制台工具 体积太大 用的时候再安装

Vue.config.productionTip = false
App.mpType = 'app'
App.store = store;

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif