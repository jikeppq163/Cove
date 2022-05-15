<template>
	<view class="bg-color" :style="defaultHeight">
		<view class="u-font-white text-center">点亮屏幕上的星空，创作你的情绪旋律</view>
		<view id="particles" class="" 
			:style="'height:'+getWindowsHeight*0.8 +'px;'"
			@click="handleChickSet"
			ref="container">
			<view v-for="(item) of synthList"
			:key='item.id' 
			class="view-synth"
			:class="animation"
			:style="[{
				animationDelay: item.up + 's',
				top:item.top,
				left:item.left,
				}]"
			@change="change">
			</view>
			<!-- class="view-synth"-->
			<view v-for="(line,i) of lineList" style="position: absolute;" :style="[{animationDelay: line.up + 's',}]" :class="animation" >
				<svg :width="clientWidth" :height="getWindowsHeight" >
					<line :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2" class="line-path" >
						<animate attributeName="stroke-dashoffset" from="200" to="2" begin="1s" dur="5s" repeatCount="indefinite"/>
						<!-- <animate attributeName="stroke-width" from="1" to="2" begin="1s" dur="5s" repeatCount="indefinite"/> -->
						<!-- <animate attributeName="x2" :from="line.x1" :to="line.x2" begin="500ms" dur="1000ms" />
						<animate attributeName="y2" :from="line.y1" :to="line.y2" begin="500ms" dur="1000ms" /> -->
					</line>
				</svg>
			</view>
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
		<view v-if='show' style="position: fixed; bottom: 20px; left:38%;" class="u-font-size-20 u-font-white u-border-1 u-radius-20 u-p-10 uni-shadow-lg animation-fade"
			@click="handleClickNext">
			下一步
		</view>
		<view style="position: fixed; bottom: 10px; left: 10px;">
			<view class="u-font-size-30 u-font-black u-border-1 u-radius-20 u-p-10" @click="handleChickHelper">#</view>
		</view>
		<view style="position: fixed; bottom: 10px; right: 10px;">
			<view class="u-font-size-30 u-font-black u-border-1 u-radius-20 u-p-10" @click="handleChickUndo">Undo</view>
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
				notesArray: ['A0', 'A#0', 'B0',
				'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1',
				'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2',
				'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 
				'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 
				'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5', 
				'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6', 
				'C7', 'C#7'],//, 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7', 'C8'],
				synthList:[],
				lineList:[],
				animation: 'animation-fade-ease-out',
				clientHeight: 0,
				clientWidth: 0,
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
			if(that.project.id != -1){
				that.setProjectInstrument(that.instrumentList[that.indexs][0]);
				setTimeout(()=>{
					if(!everClick){
						that.everClick = true;
						that.synthList = that.project.rdata.synth;
						that.saveSynthGamut(that.synthList);
						//that.runSynthGamut();
						that.runSynt();
					}
				},2000);
			}
		},
		methods:{
			...mapMutations(['setProjectInstrument']),
			...mapActions([
				'synthGamut','initSampler','runSynthGamut','saveSynthGamut','playerStop',
				'clearIntervals','runIntervals','setSampler','loadSampler'
			]),
			runSynt(){
				this.runIntervals(()=>{
						//Reset delay count
						loopStartTime = Date.now();
						//console.log('清空动画');
						this.animation ="";
						setTimeout(()=>{
							//console.log('启动动画');
							this.animation='animation-fade-ease-out';
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
				var nodeIndex = Math.ceil(e.detail.x/(clientWidth/7)) + (Math.floor(e.detail.y/(clientHeight/11))*7);
				// console.log(yPct,Math.ceil(e.detail.x/(clientWidth/4)),Math.floor(e.detail.y/(clientHeight/9)),e.detail.y,e.detail.x,(clientWidth/4),(clientHeight/9));
				// var yPct = normalToPct(e.detail.y/clientHeight);
				
				nodeIndex = 0<nodeIndex<78 ? (nodeIndex) : 77;
				
				if (everClick){
					this.synthGamut(nodeIndex);
				}
				
				if (!everClick) {
					this.runSynt()
				}
				
				//Calculate intervals
				let interval = 0;
				interval = (Date.now() - loopStartTime)/1000;
				clickCount +=1;
				this.synthList.push({
					left: (e.detail.x-20) + 'px',
					top: (e.detail.y-20) +'px',
					node: nodeIndex,
					up: interval,
					order: clickCount
				});
				
				//排序
				this.synthList.sort((a,b)=>{
					return a.up - b.up
				});
				
				this.lineList = [];
				for (let i=0; i<this.synthList.length; i++) {
					let lineItem1 = this.synthList[i];
					let lineItem2 = this.synthList[i+1];
					if (lineItem1!==undefined&&lineItem2!==undefined){
						this.lineList.push({
							x1: (parseInt(lineItem1.left.substr(0, lineItem1.left.length - 2))+20),
							y1: (parseInt(lineItem1.top.substr(0, lineItem1.top.length - 2))+20),
							x2: (parseInt(lineItem2.left.substr(0, lineItem2.left.length - 2))+20),
							y2: (parseInt(lineItem2.top.substr(0, lineItem2.top.length - 2))+20),
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
		font-size: 30px;
	}
	.view-synth{
		height: 40px;
		width: 40px;
		border-radius: 20px;
		position: absolute;
		background-image: url('../../../static/image/star-min.png');
		background-position: center center;
		background-repeat: no-repeat;
		background-size: contain;
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