<template>
	<view class="u-bg-malandy-g3" :style="defaultHeight">
		<view class="u-font-white text-center">点击屏幕创作你的情绪旋律</view>
		<view id = "particles" class="" 
			:style="'height:'+getWindowsHeight*0.8 +'px;'"
			@click="handleChickSet"
			ref = "container">
			<view
			v-for="(item) of synthList"
			:key='item.id' 
			class="view-synth"
			:class="animation"
			:style="[{
				animationDelay: item.up + 's',
				top:item.top,
				left:item.left,
				}]"
			@change="change"
			>
			</view>
		</view>
		<view v-if='show' class="flex center">
			<view class="u-p-10 u-font-size-20 u-font-white u-border-1 u-radius-20 u-p-l-40 u-p-r-40 uni-shadow-lg animation-fade"
				@click="handleClickNext">
				NEXT
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
	var previousClickTime;
	var everClick = false;
	const container = new ref(null);
	
	export default{
		data(){
			return{
				synthList:[],
				animation: 'animation-fade',
			}
		},
		computed:{
			...mapState(['Interval']),
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters(['defaultHeight','getWindowsHeight']),
			show(){
				return this.synthList.length? true:false;
			}
		},
		mounted() {
			particlesJS.load('particles','./static/particles_nasa.json');
			this.initPlayer();
			this.runIntervals(()=>{
				//Reset delay count
				if (everClick) {
					previousClickTime = Date.now();
				}
				
				//console.log('清空动画');
				this.animation ="";
				setTimeout(()=>{
					//console.log('启动动画');
					this.animation='animation-fade';
					this.runSynthGamut();
				},100);
			})
		},
		methods:{
			...mapActions([
				'synthGamut','initPlayer','runSynthGamut','saveSynthGamut','playerStop','clearIntervals','runIntervals'
			]),
			handleChickSet(e){
				//播放音阶
				var clientHeight = this.$refs.container.$el.clientHeight;
				var yPct = normalToPct(e.detail.y/clientHeight);
				this.synthGamut(yPct);
				
				//新增
				
				//Calculate intervals
				
				let interval = 0;
				if (everClick) {
					interval = (Date.now() - previousClickTime)/1000;
				}
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

				previousClickTime = Date.now();
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
	.view-synth{
		height: 40px;
		width: 40px;
		border-radius: 20px;
		position: absolute;
		background-image: url('../../../static/image/star.png');
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
</style>