import Vue from "vue"
import Vuex from "vuex"
import project from './project.js'

Vue.use(Vuex);

let state ={
	name: 'i am root state name'
}
//todo 需要利用modules 把不同功能区的内容隔开
//
const store = new Vuex.Store(project)

export default store;

