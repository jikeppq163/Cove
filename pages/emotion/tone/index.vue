<template>
	<view class="bg-color" :style="defaultHeight">
		<view id="particles" class="pcts" 
			:style="'height:'+getWindowsHeight*0.8 +'px;'"
			@click="handleChickSet"
			ref="container">
<svg class="pcts" xmlns="http://www.w3.org/2000/svg"  :width="clientWidth" :height="getWindowsHeight*0.8"  version="1.1">
	<polygon v-for="(item,index) of synthList"
			:key='item.id' 
			:id='index' 
			class="view-star"
			:class="index==0?'star-start':animation"
			:style="[{
				animationDelay: item.up + 's',
				transform: 'translate('+item.left+','+item.top+') scale(0.1)',
				}]"
			@change="change" style="fill:#fbb300;stroke:#fbb30052;stroke-width:0;" points="100,0,129.97704786691614,58.74013328687768,195.10565162951536,69.09830056250526,148.50388233105284,115.7598667131223,158.77852522924732,180.90169943749473,100,151,41.2214747707527,180.90169943749476,51.49611766894717,115.75986671312232,4.894348370484636,69.09830056250527,70.02295213308386,58.740133286877686" >
     <animate attributeName="points" dur="1s" fill="freeze" repeatCount="indefinite" values="100,0,123.51141009169893,67.63932022500211,195.10565162951536,69.09830056250526,138.04226065180615,112.36067977499789,158.77852522924732,180.90169943749473,100,140,41.2214747707527,180.90169943749476,61.95773934819386,112.3606797749979,4.894348370484636,69.09830056250527,76.48858990830107,67.63932022500211;100,0,137.0304708944258,49.03192935437831,195.10565162951536,69.09830056250526,159.91656052659468,119.46807064562168,158.77852522924732,180.90169943749473,100.00000000000001,163,41.2214747707527,180.90169943749476,40.08343947340533,119.4680706456217,4.894348370484636,69.09830056250527,62.96952910557418,49.03192935437832;100,0,123.51141009169893,67.63932022500211,195.10565162951536,69.09830056250526,138.04226065180615,112.36067977499789,158.77852522924732,180.90169943749473,100,140,41.2214747707527,180.90169943749476,61.95773934819386,112.3606797749979,4.894348370484636,69.09830056250527,76.48858990830107,67.63932022500211" />
	</polygon>
  	<line v-for="(line,i) of lineList" style="position: absolute;" :style="[{animationDelay: line.up + 's',}]" :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2" class="line-path" >
  		<animate attributeName="stroke-dashoffset" from="200" to="2" begin="1s" dur="5s" repeatCount="indefinite"/>
  	</line>
</svg>
			<view class="pcts" :style="[{'display': helperDisplay}]" ref="pcts" >
				<view class="helper"
					:style="[{
						'width': clientWidth/7 + 'px',
						'height': clientHeight/11 + 'px',
						'line-height': clientHeight/11 + 'px',
						}]"
					v-for="(item) of notesArray" :key='item.id' >{{ item }}</view>	
			</view>
		</view>
		<vue-typed-js :strings="getQuestions()" :typeSpeed="100" :startDelay="3000" :backSpeed="30" :smartBackspace="true" :backDelay="5000" :fadeOut="true" :fadeOutDelay="1500" :loop="true" :loopCount="3" :showCursor="true" :cursorChar="'_'" :autoInsertCss="true" >
		<!-- 点亮星空，告诉星星你为什么感到{{project.rdata.mood.length>0?project.rdata.mood.join('，'):'这样的情绪'}}? -->
			<view class="typing u-font-gray4 text-center" style="position:fixed;top:10rpx;width: 100%;"></view>
		</vue-typed-js>
		<!-- 想想是什么样的信念让你有了这样的情绪体验? -->
		
		<view class="flex center" style="position:fixed;bottom:150rpx;width: 100%;">
			<view v-for="(item,index) of instrumentList" :key='item.id'
				class="view-image flex center " >
				<view class="view-image-s u-p-l-10 animation-fade"
				:style="[{animationDelay: (index + 1)*0.1 + 's'}]"
				@click="handleClickImg(index)">
					<image style="height: 40px;width: 40px;"
					class="u-p-10 u-radius-20 uni-shadow-base"
					:class="indexs==index? 'u-bg-malandy-g1':'u-bg-malandy-g2'"
					:src="'../../../static/icon/'+item[0]+'.png'"
					></image>
				</view>
			</view>
		</view>
		<view v-if='show' style="position: fixed; bottom: 20px; left:38%;" class="u-font-size-20 u-font-gray4 u-border-1 u-radius-20 u-p-10 uni-shadow-lg animation-fade"
			@click="handleClickNext">
			下一步
		</view>
		<view style="position: fixed; bottom: 155rpx; left: 10px;">
			<view class="u-font-size-30 bg-black u-font-gray2 u-border-1 u-radius-20 u-p-10 uni-shadow-base" @click="handleChickHelper">#</view>
		</view>
		<view style="position: fixed; bottom: 155rpx; right: 10px;">
			<view class="u-font-size-30 bg-black u-font-gray2 u-border-1 u-radius-20 u-p-10 uni-shadow-base" @click="handleChickUndo">↺</view>
		</view>
	</view>
</template>

<script>
	// 情绪点位页面
	import {mapActions,mapGetters,mapState,mapMutations} from 'vuex';
	import ref from 'vue';
	import normalToPct from './normal-to-pct.js';
	import particles from 'particles.js';
	//For interval calculation 
	var loopStartTime;
	var everClick = false;
	var clickCount = 0;
	const container = new ref(null);
	
	
	export default{
		data(){
			return{
				instrumentList:[
					//名称 乐器 是否选中
					['piano'],
					['guitar'],
					['cello'],
					['harp'],
					['xylophone'],
				],
				indexs:0, //default piano
				pctArray: ['D2', 'E2', 'F#2', 'G2', 'A2', 'B2', 'C#3', 'D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C#4', 'D4', 'E4', 'F#4', 'G4', 'A4', 'B4', 'C#5', 'D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C#6', 'D6', 'E6', 'F#6', 'G6', 'A6', 'B6', 'C#7'],
				// notesArray: ['A0', 'A#0', 'B0',
				// 'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1',
				// 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2',
				// 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 
				// 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 
				// 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5', 
				// 'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6', 
				// 'C7', 'C#7'],//, 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7', 'C8'],
				//notesArray: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C#1', 'C#2', 'C#3', 'C#4', 'C#5', 'C#6', 'C#7', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D#1', 'D#2', 'D#3', 'D#4', 'D#5', 'D#6', 'D#7', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F#1', 'F#2', 'F#3', 'F#4', 'F#5', 'F#6', 'F#7', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G#1', 'G#2', 'G#3', 'G#4', 'G#5', 'G#6', 'G#7', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'B1','B2','B3', 'B4', 'B5', 'B6', 'B7'],
				notesArray: ['C#7', 'C7', 'B6', 'A#6', 'A6', 'G#6', 'G6', 'F#6', 'F6', 'E6', 'D#6', 'D6', 'C#6', 'C6', 'B5', 'A#5', 'A5', 'G#5', 'G5', 'F#5', 'F5', 'E5', 'D#5', 'D5', 'C#5', 'C5', 'B4', 'A#4', 'A4', 'G#4', 'G4', 'F#4', 'F4', 'E4', 'D#4', 'D4', 'C#4', 'C4', 'B3', 'A#3', 'A3', 'G#3', 'G3', 'F#3', 'F3', 'E3', 'D#3', 'D3', 'C#3', 'C3', 'B2', 'A#2', 'A2', 'G#2', 'G2', 'F#2', 'F2', 'E2', 'D#2', 'D2', 'C#2', 'C2', 'B1', 'A#1', 'A1', 'G#1', 'G1', 'F#1', 'F1', 'E1', 'D#1', 'D1', 'C#1', 'C1', 'B0', 'A#0', 'A0'],
				synthList:[],
				lineList:[],
				animation: 'animation-fade-ease-out',
				clientHeight: 0,
				clientWidth: 0,
				questions:{
					base:[]
				},
				// audioTime:this.project.rdata.audioTime,
				helperDisplay:'none'
			}
		},
		computed:{
			...mapState(['Interval',"project"]),
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters(['defaultHeight','getWindowsHeight']),
			show(){
				return this.synthList.length? true:false;
			}
		},
		mounted() {
			
			this.clientHeight = this.$refs.container.$el.clientHeight;
			this.clientWidth = this.$refs.container.$el.clientWidth;
			var that =this;
			particlesJS.load('particles','./static/particles_nasa.json');
			this.initSampler('piano');
			//Separating the load to utilize the speed
			this.loadSampler();
			if(that.project.id > 0){
				that.setProjectInstrument(that.instrumentList[that.indexs][0]);
				setTimeout(()=>{
					if(!everClick){
						that.everClick = true;
						that.synthList = that.project.rdata.synth;
						that.saveSynthGamut(that.synthList);
						//that.runSynthGamut();
						that.runSynt();
					}
				},5000);
			}
		},
		methods:{
			...mapMutations(['setProjectInstrument']),
			...mapActions([
				'synthGamut','initSampler','runSynthGamut','saveSynthGamut','playerStop',
				'clearIntervals','runIntervals','setSampler','loadSampler'
			]),
			getQuestions(){
				let currentMoods = this.project.rdata.mood.length>0?this.project.rdata.mood.join('，'):'这样的情绪';
				return [
					'点亮星空，告诉星星是什么事让你感到'+currentMoods+'?',
					'为什么这件事让你感到'+currentMoods+'呢?',
					'你没有头绪？那么让我来帮帮你吧!',//或许是因为你的主观想法
					'你可以试着问问自己...',
					'首先，我这样想，符合逻辑吗？',
					'其次，这是事实，还是我的过度想象？',
					'再次，这样想能让我得到好处吗，或只是自找麻烦？',
					'最后，如果这件事再次发生，我可以有别的选择吗？',
					'你的想法比你想象的更重要，在你的旋律中觉察你的信念吧!'
				];
			},
			runSynt(){
				this.runIntervals(()=>{
					//Reset delay count
					loopStartTime = Date.now();
					//console.log('清空动画');
					this.animation ="";
					setTimeout(()=>{
						//console.log('启动动画');
						// this.animation='animation-fade-ease-out';
						this.animation='star-b';
						this.runSynthGamut();
					},30);
				})
			},
			handleChickHelper(e) {
				if (this.helperDisplay == "block") {
					this.helperDisplay='none';
				} else {
					this.helperDisplay='block';
				}
			},handleClickImg(value){
				var that = this;
				//console.log('handleClickImg');
				//that.playerStop();
				//命中已经选中的乐器
				that.indexs = value;
				that.setSampler(that.instrumentList[that.indexs][0]);
				that.setProjectInstrument(that.instrumentList[that.indexs][0]);
			},
			handleChickSet(e){
				//播放音阶
				var clientHeight = this.clientHeight;
				var clientWidth = this.clientWidth;
				var nodeIndex = Math.ceil(e.detail.x/(clientWidth/7)) + (Math.floor(e.detail.y/(clientHeight/11))*7-1);
				console.log(nodeIndex,Math.ceil(e.detail.x/(clientWidth/7)),Math.floor(e.detail.y/(clientHeight/11)*7-1),e.detail.y,e.detail.x,(clientWidth/4),(clientHeight/9));
				// var yPct = normalToPct(e.detail.y/clientHeight);
				
				nodeIndex = 0<nodeIndex<77 ? (nodeIndex) : (nodeIndex-7);
				
				this.animation='';
				if (everClick) {
					this.synthGamut(nodeIndex);
				} else {
					this.runSynt();
				}
				
				//Calculate intervals
				let interval = 0;
				interval = (Date.now() - loopStartTime)/1000;
				clickCount +=1;
				this.synthList.push({
					left: (e.detail.x-10) + 'px',
					top: (e.detail.y-10) +'px',
					node: nodeIndex,
					up: interval,
					order: clickCount
				});
				console.log(interval);
				// this.audioTime = interval;
				//排序
				this.synthList.sort((a,b)=>{
					return a.up - b.up
				});
				
				this.lineList = [];
				for (let i=0; i<this.synthList.length; i++) {
					let lineItem1 = this.synthList[i];
					let lineItem2 = this.synthList[i+1];
					if (lineItem1!==undefined&&lineItem2!==undefined){
						if (lineItem2.up>(lineItem1.up+1)) {
							lineItem2.up = lineItem1.up + 1;
						}
						this.lineList.push({
							x1: (parseInt(lineItem1.left.substr(0, lineItem1.left.length - 2))+10),
							y1: (parseInt(lineItem1.top.substr(0, lineItem1.top.length - 2))+10),
							x2: (parseInt(lineItem2.left.substr(0, lineItem2.left.length - 2))+10),
							y2: (parseInt(lineItem2.top.substr(0, lineItem2.top.length - 2))+10),
							up: lineItem2.up,
						});
					}
				}
				// console.log(this.lineList);
				
				//新增播放间隔
				// for(var i=0;i<this.synthList.length;i++){
				// 	this.synthList[i].up = i*0.7;
				// }
				this.saveSynthGamut(this.synthList);

				//previousClickTime = Date.now();
				everClick = true;
			},
			handleChickUndo(){
				//Sort by clicking order to delete the last one
				this.synthList.sort((a,b)=>{
					return a.order - b.order
				});
				if (this.synthList != []){
					this.synthList.pop();
				}
				if (this.lineList != []){
					this.lineList.pop();
				}
				//Then re-sort after deleting 
				this.synthList.sort((a,b)=>{
					return a.up - b.up
				});
			},
			change(){
				
			},
			handleClickNext(e){
				this.clearIntervals();
				this.playerStop();
				uni.navigateTo({
					url:'../details/index',
					complete(res) {
						console.log(res);
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.star-start {
	  animation: ani_flow 9s infinite;
	}
	@keyframes ani_flow {
	  from {
		stroke-width: 300;
	  }
	  to {
		stroke-width: 30;
	  }
	}
	.star-b {
	  animation: star_flow 1s;
	}
	@keyframes star_flow {
	  from {
		stroke: #fbb30077;
		stroke-width: 0;
	  }
	  to {
		stroke: #fbb30000;
		stroke-width: 1000;
	  }
	}
	.line-path {
		stroke: #fbb300;
		stroke-width: 1;
		stroke-dasharray: 1, 10;
	}
	.pcts {
		position: fixed; 
		// display: none;
	}
	.helper {
		position: relative;
		color: #ffffff36;
		float: left;
		text-align: center;
		border: 1px solid #ffffff17;
		font-size: 20px;
	}
	.view-synth{
		height: 180px;
		width: 180px;
		border-radius: 20px;
		position: absolute;
		background-image: url('../../../static/image/star.svg');
		background-position: center center;
		background-repeat: no-repeat;
		background-size: contain;
	}
	.view-star{
		position: absolute;
	}
	#particles{
	      position: absolute;
	      width: 100%;
	      height: 100%;
	      background-color: #000022;
	      background-repeat: no-repeat;
	      background-size: cover;
	      background-position: center center;
	}
	
	.bg-color{
		background-color: #000022;
	}
</style>