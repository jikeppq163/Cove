<template>
	<view class="bg-color" :style="defaultHeight">
		<view class="u-font-white text-center">点亮屏幕上的星空，创作你的情绪旋律</view>
		<view id = "particles" class="" 
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
			<view class="pcts" :style="[{'display': helperDisplay}]" ref="pcts" >
				<view class="helper " @click="handleChickHelper"
					:style="[{
						'width': clientWidth/4 + 'px',
						'height': clientHeight/9 + 'px',
						'line-height': clientHeight/9 + 'px',
						}]"
					v-for="(item) of pctArray" :key='item.id' >{{ item }}</view>	
			</view>
		</view>
		<view class="flex center" style="position:fixed;bottom: 50rpx;width: 100%;">
			<view class="u-font-size-20 u-font-white u-border-1 u-radius-20 u-p-20 u-m-b-20 u-m-r-20 uni-shadow-lg animation-fade"
				@click="handleChickHelper">
				帮助
			</view>
			<view class="u-font-size-20 u-font-white u-border-1 u-radius-20 u-p-20 u-m-b-20 uni-shadow-lg animation-fade"
				@click="handleClickNext">
				下一步
			</view>
		</view>
	</view>
</template>

<script>
	// 情绪点位页面
	import {mapActions,mapGetters,mapState} from 'vuex';
	import ref from 'vue';
	import normalToPct from './normal-to-pct.js';
	import particles from 'particles.js';
	//For interval calculation 
	var loopStartTime;
	var everClick = false;
	const container = new ref(null);
	
	export default{
		data(){
			return{
				pctArray: ['D2', 'E2', 'F#2', 'G2', 'A2', 'B2', 'C#3', 'D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C#4', 'D4', 'E4', 'F#4', 'G4', 'A4', 'B4', 'C#5', 'D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'C#6', 'D6', 'E6', 'F#6', 'G6', 'A6', 'B6', 'C#7'],
				synthList:[],
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
			this.initPlayer();
			if(that.project.id != -1){
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
			...mapActions([
				'synthGamut','initPlayer','runSynthGamut','saveSynthGamut','playerStop','clearIntervals','runIntervals'
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
						},10);
				})
			},
			handleChickHelper(e) {
				this.helperDisplay ="block";
				setTimeout(()=>{
					this.helperDisplay='none';
				},3000);
			},
			handleChickSet(e){
				//播放音阶
				var clientHeight = this.clientHeight;
				var clientWidth = this.clientWidth;
				var yPct = Math.ceil(e.detail.x/(clientWidth/4)) + (Math.floor(e.detail.y/(clientHeight/9))*4);
				console.log(yPct,Math.ceil(e.detail.x/(clientWidth/4)),Math.floor(e.detail.y/(clientHeight/9)),e.detail.y,e.detail.x,(clientWidth/4),(clientHeight/9));
				// var yPct = normalToPct(e.detail.y/clientHeight);
				
				yPct = 0<yPct<35 ? (yPct-1) : 34;
				
				if (everClick){
					this.synthGamut(yPct);
				}
				
				if (!everClick) {
					this.runSynt()
				}
				
				//Calculate intervals
				let interval = 0;
				interval = (Date.now() - loopStartTime)/1000;
				
				this.synthList.push({
					left: (e.detail.x-20) + 'px',
					top: (e.detail.y-20) +'px',
					y: yPct,
					up: interval
				});
				
				//排序
				this.synthList.sort((a,b)=>{
					return a.up - b.up
				});
				
				//新增播放间隔
				// for(var i=0;i<this.synthList.length;i++){
				// 	this.synthList[i].up = i*0.7;
				// }
				this.saveSynthGamut(this.synthList);

				//previousClickTime = Date.now();
				everClick = true;
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