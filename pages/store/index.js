import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

let state={
	version:'0.1.0',
	systemInfo:{},
	mood:[
		['Happy','Sad','Annoyed','Strong','Anxous','Content','Excited'],
		['Scared','Peaceful','Loved','Vulnerable','Regret','Overwhelmed','Hight'],
		['Upset','Mature','Weak','Alone','Clouded','Lost','Grateful'],
		['Low','Confused','Guilty','Depressed','Angry','Lonely']
		]
}

let mutations={
	
}

let getters={
	getMood(state){
		return state.mood;
	},
	getWindowsHeight:(state)=>{
		return state.systemInfo.windowHeight - 43
	}
}

let actions={
	
}

const store = new Vuex.Store({
		state,
		mutations,
		getters,
		actions
	})

export default store;