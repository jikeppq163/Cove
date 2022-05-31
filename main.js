
// #ifndef VUE3
import Vue from 'vue';
import App from './App';
import store from '@/pages/store/index.js';
import VueTypedJs from 'vue-typed-js'

Vue.use(VueTypedJs)

// import Vconsole from 'vconsole';
//npm install eruda 控制台工具 体积太大 用的时候再安装
if(process.env.NODE_ENV === 'development'){
	console.log('开发环境')
	localStorage.setItem('debug',true);
}else{
	console.log('生产环境')
	localStorage.setItem('debug',false);
}
// Vue.prototype.$vconsole = new Vconsole() // 使用vconsole
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