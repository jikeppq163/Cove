import authorize from "../utils/user.js"
import * as Tone from "tone";
//组合
//const synth = new Tone.Synth().toDestination();
import getInstrument from './instrument';
import getNoteAtHeight from './getNode';

const pctArray =['D2', 'E2', 'F#2', 'G2', 'A2', 'B2', 'C#3', 'D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C#4', 'D4', 'E4', 'F#4', 'G4', 'A4', 'B4', 'C#5', 'D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C#6', 'D6', 'E6', 'F#6', 'G6', 'A6', 'B6', 'C#7'];
const notesArray_lowToHigh = ['A0', 'A#0', 'B0', 
'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1',
'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2',
'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 
'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 
'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5', 
'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6', 
'C7', 'C#7'];//, 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7', 'C8']
const notesArray = notesArray_lowToHigh.reverse();

let state={
	version:'0.2.4',
	server:'',
	systemInfo:{},
	openId:'',
	getOpenIdFirst:false,
	lastUrl:'',
	userInfo:{
		"id": "1",
		"nickname": "用户ewqvx_qw12",
		"avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/4FYsd8bWiaR8otxj1cNzib0ibL975Ug8zGvJicPT0yZYIh4ox41pmiaUc8GeKl6kw9Q4q26Mab0TzYp9SaKDic55iavIQ/132",
		"email": null,
		"openid": "o_cGP5sxh4TH6i5jBvgtRH9PcsMs",
		"sex": 0,
	},
	defaultHeight:{
		//最低高度
		"min-height":"800rpx",
	},
	mood:[
		['热爱', '幸福', '开心', '兴奋'],
		['感激', '平静', '感动', '激动'],
		['难过', '害怕', '脆弱', '孤单'],
		['失落', '罪恶', '烦恼', '受伤'],
		['焦虑', '后悔', '抑郁', '愤怒'],
		['低沉', '困惑', '沮丧', '阴郁']
	],
	//当前新增列表 project
	project:{
		"created_at": "2022-05-04 04:42:02",
		"updated_at": "2022-05-04 04:54:11",
		"deleted_at": "2022-05-04 04:54:11",
		rdata:{
			mood:[],
			audio:'',
			volume:10,
			synth:[],
			title:'',
			audioTime:30,
			thoughts:'',
			location:'',
			instrument:'',
		}
	},
	//模版
	template:{
		id:-1,
		rdata:{
			mood:[],
			audio:'',
			volume:10,
			synth:[],
			title:'',
			thoughts:'',
			location:'',
			instrument:'',
		}
	},
	//所有过往记录列表 list
	list:[
		// {
		// 	id: 'AA', 				//id
		// 	title:'标题',			//标题
		// 	backgroundMusic:'aaa', //背景音乐
		// 	dateTime:'2022-04-04 22:15:43',//时间
		// 	thoughts:'没有想法............',	//想法
		// 	location:'百慕大三角',	//位置
		// 	imageUrl:'',			//图片地址
		// 	mood:[],				//心情
		// 	synth:[]				//音阶组合
		// },
	],
	audio:{
		bgmList:[
			{
				name:'birds_countryside',
				url:'',
				img:'',
				volue:1
			},
			{
				name:'misc_night',
				url:'',
				img:'',
				volue:1
			},
			{
				name:'rain_light',
				url:'',
				img:'',
				volue:1
			},
			{
				name:'thunder',
				url:'',
				img:'',
				volue:1
			},
			{
				name:'water_river',
				url:'',
				img:'',
				volue:1
			},
			{
				name:'wind_grass',
				url:'',
				img:'',
				volue:1
			}
		]
	},
	//音频处理
	index:-1, //选中的指标
	playing:false,
	playerState:'',
	player:false,	//背景音乐播放器
	synth:false,	//音阶组合播放器
	source:false,
	Interval:false, //循环
}

let mutations={
	addMood(state,value){
		state.project.rdata.mood.push(value);
	},
	deleteMood(state,value){
		state.project.rdata.mood.splice(value,1);
	},
	setSystemInfo(state,value){
		state.systemInfo = value;
		//屏幕高度减去标题高度
		state.defaultHeight['min-height'] = (value.windowHeight)+"px";
	},
	setProjectAudio(state,value){
		state.project.rdata.audio = value;
	},
	setProjectInstrument(state,value){
		state.project.rdata.instrument = value;
	},
	//todo
	setProject(state,value){
		state.project =value;
	},
	setProjectImage(state,value){
		state.project.rdata.image =value;
	},
	CLEAR_INDEX(){
		state.index = -1;
	},
	CLEAR_STORAGE(){
		
	},
	RESET_PROJECT(state){
		state.project = JSON.parse(JSON.stringify(state.template))
	},
	setOpenId(state,value){
		state.openId = value;
	},
	setUserInfo(state,value){
		state.userInfo = value;
	},
}

let getters={
	getMood(state){
		return state.mood;
	},
	getWindowsHeight:(state)=>{
		return state.systemInfo.windowHeight - 43
	},
	getWindowsWidth:(state)=>{
		return state.systemInfo.windowWidth
	},
	findMood:(state)=>(value)=>{
		return state.project.rdata.mood.findIndex(item=>{
					return item === value
				});
	},
	defaultHeight(state){
		return state.defaultHeight
	},
	getPlayerState(state){
		return state.player? state.player.state:'stopped'
	},
	getProject:state=>id=>{
		return state.list.find(item=>item.id == id);
	},
	getLogin:state=>{
		return state.openId!=""? true:false; 
	}
}

let actions={
	//获取登录信息
	getLoginStatus({commit,state},url){
		var openId = uni.getStorageSync('openId')? uni.getStorageSync('openId'):false;
		let authDebug = localStorage.getItem('authDebug')*1;
		//console.log('openId',authDebug,openId,authDebug || openId);
		if(authDebug || openId){
			state.openId = openId;
			var userInfo = localStorage.getItem('userInfo');
			if(userInfo) state.userInfo = JSON.parse(userInfo);
			return true;
		}
		else {
			console.log('校验:authDebug || openId',authDebug,openId,'第一次登录?',state.getOpenIdFirst);
			if(!state.getOpenIdFirst || url){
				state.getOpenIdFirst = true;
				if(!url) url = "/";
				authorize(url);
			}
			else{
				return false;
			}
		}
	},
	/**
	 * 页面状态检查
	 */
	initStatus({commit,state},url){
		var one = [
			"/",
			"/pages/index/index",
			"/pages/emotion/tone/index",
			"/pages/emotion/details/index",
			"/pages/emotion/audio/index",
			"/pages/emotion/mood/index",
			"/pages/emotion/info/index",
			"/auth",
			"/pages/login/index",
			"/pages/stars/index",
			"/pages/user/index",
			"/pages/ucharts/index",
			"/pages/share/index"
		]
		var url = url.split('?')[0];
		console.log('initStatus',url,one.findIndex(item=>item==url));
	},
	//初始化列表
	initList(){
		
	},
	//初始化sample
	initSampler({commit,state},instrument){
		state.sampler = getInstrument(instrument);
	},
	loadSampler({commit,state}){
		state.piano = getInstrument('piano');
		state.cello = getInstrument('cello');
		state.guitar = getInstrument('guitar');
		state.harp = getInstrument('harp');
		state.xylophone = getInstrument('xylophone');
	},
	setSampler({commit,state},instrument){
		switch (instrument){
			case 'piano':
			state.sampler = state.piano;
			break;
			case 'cello':
			state.sampler = state.cello;
			break;
			case 'guitar':
			state.sampler = state.guitar;
			break;
			case 'harp':
			state.sampler = state.harp;
			break;
			case 'xylophone':
			state.sampler = state.xylophone;
			break;
			defaut:
			state.sampler = state.piano;
			break;
		}
	},
	setPlayer({commit,state,getters},closeAutostart){
		//播放
		if(!state.player || state.player.name){
			console.log('setPlayer 播放状态',getters.getPlayerState,state.player.name);
			if(getters.getPlayerState=='stopped'){
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
			let bgm = state.project.rdata.audio!=="" ? state.project.rdata.audio : 'rain_light';
			state.player = new Tone.Player({
				url:'/static/mp3/'+bgm+'.mp3',
				autostart: closeAutostart? false:true,
				loop:true
			}).toDestination();
			state.source = new Tone.PWMOscillator().toDestination();
		}
	},
	//播放音乐
	playerStart({commit,state,getters}){
		if(getters.getPlayerState=='stopped'){
			Tone.loaded().then(() => {
				state.player.start();
				//commit('PLAYER_START');
			});
		}
		else{
			console.log('播放状态:',getters.getPlayerState);
		}
	},
	playerStop({commit,state,getters}){
		if(getters.getPlayerState=='started'){
			state.player.stop();
			console.log('播放状态:',getters.getPlayerState);
		}
		else{
			console.log('播放状态:',getters.getPlayerState);
		}
	},
	playerVolume({commit,state,getters},value){
		var {volume,step} = value;
		if(getters.getPlayerState=='started'){
			state.player.volume.value = volume;
			state.project.rdata.volume = volume;
		}
	},
	playerbackRate({commit,state,getters}){
		// play at 1/4 speed 音调
		state.player.playbackRate = 0.25;
	},
	//插入音阶
	synthGamut({commit,state},nodeIndex){
		const now = Tone.now();
		// const node = getNoteAtHeight(yPct);
		const node = notesArray[nodeIndex];
		// Tone.Transport.bpm.value=260
		// console.log(state.sampler,Tone.Transport.bpm.value);
		if (node !== undefined) state.sampler.triggerAttack(node,now);
		//state.synth.triggerAttackRelease(note, now);
	},
	runSynthGamut({state}){
		if (state.project.rdata.synth != []) {
			const now = Tone.now();
			// console.log('synth----------',state.project.rdata.synth);
			for (var item of state.project.rdata.synth) {
				// console.log('runSynthGamut note----------',item);
				console.log('runSynthGamut item.up----------',item.up,state.project.rdata.audioTime);
				// const node = getNoteAtHeight(item.y);
				const node = notesArray[item.node];
				if (node !== undefined) state.sampler.triggerAttack(node, now + item.up);
			}
		}
	},
	saveSynthGamut({state},Arr){
		state.project.rdata.synth = Arr;
	},
	setProjectFromId({state},id){
		state.project = state.list.find(item =>item.id==id);
		state.index = id;
	},
	saveInfo({state},Obj){
		var {title,thoughts,location} = Obj;
		if(title) state.project.rdata.title = title;
		if(thoughts) state.project.rdata.thoughts = thoughts;
		if(location) state.project.rdata.location = location;
	},
	deleteProject({state}){
		if(state.index!=-1){
			state.list.splice(state.index,1);
			uni.setStorage({
				key:'list',
				data:state.list,
				success:(res)=>{
					console.log('setStorage 存储数据:',res);
				}
			});
		}
	},
	saveProject({commit,state,getters,dispatch}){
		//console.log('saveProject',state.project);
		state.project.id = 'id_' + Date.now();
		state.project.rdata.date = new Date();
		dispatch('saveListToStorage');
	},
	saveListToStorage({commit,state,getters}){
		state.list.push(state.project);
		uni.setStorage({
			key:'list',
			data:state.list,
			success:(res)=>{
				console.log('setStorage 存储数据:',res);
			}
		});
	},
	setProjectList({commit,state,getters},value){
		if(value) state.list = value;
	},
	//获取本地list
	getProjectStorage({commit,state,getters}){
		uni.getStorage({
			key:'list',
			success:(res)=>{
				console.log('getStorage 读取数据:',res);
				if(res.data){
					if(res.data.length >0){
						state.list = res.data;
					}
				}
			}
		});
	},
	saveAudioTime({state},audioTime){
		state.project.rdata.audioTime = audioTime;
	},
	runIntervals({state},callback){
		callback(true);
		// console.log('runIntervals',state.project.rdata.audioTime)
		state.Interval = setInterval(()=>{
			callback(true);
		},9000);
	},
	clearIntervals({state}){
		//停止循环
		clearInterval(state.Interval);
	}
}

const storeProject = {
		state,
		mutations,
		getters,
		actions
	}

export default storeProject