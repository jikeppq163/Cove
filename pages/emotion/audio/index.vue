<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight">
		<view class="">
			<view class="text-center u-font-gray4 u-font-size-20 u-p-t-40">
				来听听自然的声音，感受你的情绪和想法
			</view>
		</view>
		<view class="flex center" :style="'height:'+getWindowsHeight*0.65 +'px;'">
			<view class="flex warp u-p-20">
				<view v-for="(item,index) of audioList" :key='item.id' 
					class="view-image flex center "
					>
					<view class="view-image-s u-p-20 animation-fade"
					:style="[{animationDelay: (index + 1)*0.1 + 's'}]"
					@click="handleClickImg(index)">
						<image style="height: 60px;width: 60px;"
						class="u-p-10 u-radius-40 uni-shadow-base"
						:class="indexs==index? 'u-bg-malandy-g1':'u-bg-malandy-g2'"
						:src="'../../../static/icon/'+item[0]+'.png'"
						></image>
					</view>
				</view>
			</view>
		</view>
		<view class="u-p-10">
			<slider v-if='show' :value="project.rdata.volume" block-color='#F4c587' min="0" max="30"  @changing='sliderChanging'/>
		</view>
		<view v-if='show' class="flex center">
			<view class="u-font-size-20 u-font-gray4 u-border-1 u-radius-20 u-p-10 u-m-b-60 uni-shadow-lg animation-fade"  @click="handleClickNext">
				下一步
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
	export default {
		data() {
			return {
				innerAudioContext:'',
				audioList:[
					//名称 音量 是否选中
					['rain_window'],
					['misc_night'],
					['rain_light'],
					['thunder'],
					['water_river'],
					['wind_grass'],
					['misc_fire'],
					['water_beach'],
				],
				indexs:99,
				volume:10,
				show:false,
				audio:[],
				start:0,
			}
		},
		computed:{
			...mapState({
				//选中的情绪列表
				list:'list',
				//总列表
				project:'project'
			}),
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters(['findMood','defaultHeight','getPlayerState','getWindowsHeight'])
		},
		mounted() {
			var that =this;
			//Eruda.init();
			//this.defaultHeight['height'] = this.defaultHeight['min-height'];
			if(that.project.id!=-1){
				that.show = true;
				that.setProjectAudio(that.project.rdata.audio);
				that.indexs = that.audioList.findIndex(item=> item[0] == that.project.rdata.audio[0]);
				that.setPlayer();
			}
		},
		methods:{
			...mapMutations(['setProjectAudio']),
			...mapActions(['setPlayer','playerStop','playerStart','playerVolume']),
			handleClickDelete(){
				
			},
			handleClickNext(){
				uni.navigateTo({
					url:'/pages/emotion/tone/index'
				})
			},
			handleClickImg(value){
				var that = this;
				//console.log('handleClickImg');
				that.playerStop();
				if(that.indexs == value){ 
					//命中已经选中的背景音乐
					if(that.show){
						that.show = false;
						that.indexs = 99;
					}
					else{
						that.show = true;
						that.indexs = value;
						that.setProjectAudio(that.audioList[that.indexs]);
						that.setPlayer();
					}
				}
				else{
					that.indexs = value;
					that.show = true;
					that.setProjectAudio(that.audioList[that.indexs]);
					that.setPlayer();
				}
			},
			sliderChanging(e){
				this.playerVolume({
					volume:e.detail.value
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.index_body{
		background-color: skyblue;
	}
	.view-image-s{
		cursor:pointer;
	}
	.view-image{
		height: 80px;
		width: 50%;
	}
</style>