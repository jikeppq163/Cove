<template>
	<view class="u-bg-malandy-g3" :style="defaultHeight">
		<view class="u-font-white text-center">TAP WINDOWS ADD NEW GAUMT</view>
		<view class="" 
			:style="'height:'+getWindowsHeight*0.8 +'px;'"
			@click="handleChickSet">
			<view
			v-for="(item,index) of synthList"
			:key='item.id' 
			class="view-synth"
			:class="animation"
			:style="[{
				animationDelay: (index + 1)*0.8 + 's',
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
			this.initPlayer();
			this.runIntervals(()=>{
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
				this.synthGamut();
				if(this.synthList.length<8){
					//新增
					this.synthList.push({
						left: (e.detail.x-20) + 'px',
						top: (e.detail.y-20) +'px',
						y: e.detail.y-20
					});
					//排序
					this.synthList.sort((a,b)=>{
						return a.y - b.y
					});
					//新增播放间隔 编号是播放音频的增量 也可以自定义up值
					for(var i=0;i<this.synthList.length;i++){
						this.synthList[i].up = i*0.7;
					}
					this.saveSynthGamut(this.synthList);
				}
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
		background-color: skyblue;
		position: absolute;
	}
</style>