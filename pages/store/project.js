import {authorize} from "../utils/user.js"
import * as Tone from "tone";
//组合
const synth = new Tone.Synth().toDestination();

let state={
	version:'0.1.0',
	systemInfo:{},
	openId:'',
	getOpenId:false,
	userInfo:{
		"id": "",
		"nickname": "用户名",
		"avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/4FYsd8bWiaR8otxj1cNzib0ibL975Ug8zGvJicPT0yZYIh4ox41pmiaUc8GeKl6kw9Q4q26Mab0TzYp9SaKDic55iavIQ/132",
		"email": null,
		"raw": {
			"openid": "",
			"sex": 0,
		}
	},
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
		synth:[],
		title:'NOTHING...',
		thoughts:'NOTHING...',
		location:'NOTHING...',
	},
	//模版
	template:{
			mood:[],
			audio:'',
			volume:10,
			synth:[],
			title:'NOTHING...',
			thoughts:'NOTHING...',
			location:'NOTHING...',
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
		state.project.mood.push(value);
	},
	deleteMood(state,value){
		state.project.mood.splice(value,1);
	},
	setSystemInfo(state,value){
		state.systemInfo = value;
		//屏幕高度减去标题高度
		state.defaultHeight['min-height'] = (value.windowHeight)+"px";
	},
	setProjectAudio(state,value){
		state.project.audio = value;
	},
	//todo
	setProject(state,value){
		state.project =value;
	},
	//获取登录信息
	getLoginStatus(state){
		if(!state.getOpenId){
			state.getOpenId = true;
			var openId = uni.getStorageSync('openId');
			if(openId){
				state.openId = openId;
				state.userInfo = uni.getStorageSync('userInfo');
				return true;
			}
			else {
				authorize();
				return false;
			}
		}
		else{
			return true;
		}
	},
	CLEAR_INDEX(){
		state.index = -1;
	},
	CLEAR_STORAGE(){
		
	},
	RESET_PROJECT(state){
		state.project = JSON.parse(JSON.stringify(state.template))
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
		state.synth = new Tone.Synth().toDestination();
	},
	setPlayer({commit,state,getters}){
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
				url:'/static/mp3/'+state.project.audio+'.mp3',
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
	synthGamut({commit,state}){
		const now = Tone.now();
		state.synth.triggerAttackRelease("C4", "8n", now);
	},
	runSynthGamut({state}){
		if(state.project.synth!=[]){
			const now = Tone.now();
			var i=0;
			var yd = ['A4','B4','C5','B4','C5','E5','B4'];
			var jp = ['8n','8n','2n','8n','4n','8n','2n'];
			for(var item of state.project.synth){
				state.synth.triggerAttackRelease(yd[i], jp[i], now + item.up);
				i++;
			}
		}
	},
	saveSynthGamut({state},Arr){
		state.project.synth = Arr;
	},
	setProjectFromId({state},index){
		state.project = state.list[index];
		state.index = index;
	},
	saveInfo({state},Obj){
		var {title,thoughts,location} = Obj;
		if(title) state.project.title = title;
		if(thoughts) state.project.thoughts = thoughts;
		if(location) state.project.location = location;
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
	saveProject({commit,state,getters}){
		//console.log('saveProject',state.project);
		state.project.id = 'id_' + Date.now();
		state.project.date = new Date();
		state.list.push(state.project);
		uni.setStorage({
			key:'list',
			data:state.list,
			success:(res)=>{
				console.log('setStorage 存储数据:',res);
			}
			});
	},
	getProject({commit,state,getters}){
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
	runIntervals({state},callback){
		callback(true);
		state.Interval = setInterval(()=>{
			callback(true);
		},10000);
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