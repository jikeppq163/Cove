import Vue from "vue"
import Vuex from "vuex"
import * as Tone from "tone";

//组合
const synth = new Tone.Synth().toDestination();

Vue.use(Vuex);

let state={
	version:'0.1.0',
	systemInfo:{},
	defaultHeight:{
		//最低高度
		"min-height":"800rpx",
	},
	mood:[
		['Happy','Sad','Annoyed','Strong','Anxous','Content','Excited'],
		['Scared','Peaceful','Loved','Vulnerable','Regret','Overwhelmed','Hight'],
		['Upset','Mature','Weak','Alone','Clouded','Lost','Grateful'],
		['Low','Confused','Guilty','Depressed','Angry','Lonely']
		],
	//当前新增列表 project
	project:{
		mood:[],
		audio:'',
		volume:10,
	},
	//所有过往记录列表 list
	list:[
		{
			id: 'AA', 				//id
			title:'标题',			//标题
			backgroundMusic:'aaa', //背景音乐
			dateTime:'2022-04-04 22:15:43',//时间
			thoughts:'没有想法............',	//想法
			location:'百慕大三角',	//位置
			imageUrl:'',			//图片地址
			mood:[],				//心情
			music:[]				//音乐组合
		},
		{
			title:'标题',			//标题
			backgroundMusic:'aaa', //背景音乐
			dateTime:'2022-04-04 22:15:43',//时间
			thoughts:'没有想法............',	//想法
			location:'百慕大三角',	//位置
			imageUrl:'',			//图片地址
			mood:[],				//心情
			music:[]				//音乐组合
		}
	],
	//音频处理
	playing:false,
	playerState:'',
	player:false,
	source:false,
}

let mutations={
	addMood(state,value){
		state.project.mood.push(value);
	},
	deleteMood(state,value){
		state.project.mood.splice(value,1);
	},
	setSystemInfo(state,value){
		state.systemInfo = value;
		//屏幕高度减去标题高度
		state.defaultHeight['min-height'] = (value.windowHeight - 43)+"px";
	},
	setProjectAudio(state,value){
		state.project.audio = value;
	}
}

let getters={
	getMood(state){
		return state.mood;
	},
	getWindowsHeight:(state)=>{
		return state.systemInfo.windowHeight - 43
	},
	findMood:(state)=>(value)=>{
		return state.project.mood.findIndex(item=>{
					return item === value
				});
	},
	defaultHeight(state){
		return state.defaultHeight
	},
	getPlayerState(state){
		return state.player? state.player.state:'stoped'
	}
}

let actions={
	//初始化音乐
	initPlayer({commit,state}){

	},
	setPlayer({commit,state,getters},src){
		//播放
		if(!state.player){
			if(getters.getPlayerState=='stoped'){
				set();
			}
			else if(getters.getPlayerState=='started'){
				state.player.stop();
				setTimeout(()=>{
					set();
					},100);
			}
		}
		else{
			set();
		}
		function set(){
			state.player = new Tone.Player({
				url:'/static/mp3/'+src+'.mp3',
				autostart: true,
				loop:true
			}).toDestination();
			state.source = new Tone.PWMOscillator().toDestination();
		}
	},
	//播放音乐
	playerStart({commit,state,getters}){
		if(getters.getPlayerState=='stoped'){
			Tone.loaded().then(() => {
				state.player.start();
				commit('PLAYER_START');
			});
		}
		else{
			console.log('播放状态:',getters.getPlayerState);
		}
	},
	playerStop({commit,state,getters}){
		if(getters.getPlayerState=='started'){
			state.player.stop();
		}
		else{
			console.log('播放状态:',getters.getPlayerState);
		}
	},
	playerVolume({commit,state,getters},value){
		var {volume,step} = value;
		if(getters.getPlayerState=='started'){
			state.player.volume.value = volume;
			state.project.volume = volume;
		}
	},
	playerbackRate({commit,state,getters}){
		// play at 1/4 speed 音调
		state.player.playbackRate = 0.25;
	},
	//插入音阶
	synthStart({commit}){
		const now = Tone.now();
		synth.triggerAttackRelease("C4", "8n", now);
		synth.triggerAttackRelease("E4", "8n", now + 0.5);
		synth.triggerAttackRelease("G4", "8n", now + 1);
	},
	saveProject({commit,state,getters}){
		console.log('saveProject',state.project);
	}
}

const store = new Vuex.Store({
		state,
		mutations,
		getters,
		actions
	})

export default store;