<template>
	<view class="u-bg-malandy-g3" :style="defaultHeight">
		<view class="" 
			:style="'height:'+getWindowsHeight*0.8 +'px;'"
			@click="handleChickSet">
			<view
			v-for="(item,index) of synthList"
			:key='item.id' 
			class="view-synth"
			:class="animation"
			:style="[{
				animationDelay: (index + 1)*0.3 + 's',
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
	import {mapActions,mapGetters} from 'vuex';
	export default{
		data(){
			return{
				synthList:[],
				animation: 'animation-fade',
			}
		},
		computed:{
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters(['defaultHeight','getWindowsHeight']),
			show(){
				return this.synthList.length? true:false;
			}
		},
		mounted() {
			this.initPlayer();
			setInterval(()=>{
				//console.log('清空动画');
				this.animation ="";
				setTimeout(()=>{
					//console.log('启动动画');
					this.animation='animation-fade';
					this.runSynthGamut(this.synthList);
				},1000);
			},10000);
		},
		methods:{
			...mapActions([
				'synthGamut','initPlayer','runSynthGamut','saveSynthGamut'
			]),
			handleChickSet(e){
				this.synthGamut();
				this.synthList.push({
					left: (e.detail.x-20) + 'px',
					top: (e.detail.y-20) +'px',
					y: e.detail.y-20
				});
				this.synthList.sort((a,b)=>{
					return a.y - b.y
				});
				for(var i=0;i<this.synthList.length;i++){
					this.synthList[i].id = i;
				}
			},
			change(){
				
			},
			handleClickNext(e){
				this.saveSynthGamut(this.synthList);
				uni.navigateTo({
					url:'../details/index',
					complete(res) {
						console.log(res);
					}
				})
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