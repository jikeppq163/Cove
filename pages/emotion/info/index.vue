<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight">
		<view class="text-center u-font-white">
			<view class="u-font-size-20 u-p-20 u-p-t-60">
				{{project.title}}
			</view>
			<view class="u-p-3">
				{{project.location}}
			</view>
			<view class="u-p-3">
				{{getDate(project.date)}}
			</view>
			<view class="u-p-3">
				{{getTime(project.date)}}
			</view>
		</view>
		<view class="flex center u-p-t-20">
			<view class="u-p-10 u-radius-5 u-bg-malandy2 text-center" style="height: 40px;width: 120px;" @click="handleClickPlay">
				<uni-icons type='videocam' size="30" color="#F4c587"></uni-icons>
			</view>
		</view>
		<view class="u-m-10 u-m-t-20 u-p-40 u-bg-maka-g text-center u-font-gray2 shadow-lg">
			配图
		</view>
		<view class="flex u-p-t-20">
			<view class="u-p-10 u-font-white" v-for="item of project.mood" :key='item.id'>
				{{item}}
			</view>
		</view>
		<view class="">
			<view class="u-m-10 u-p-10 u-radius-5 text-center u-bg-maka3 u-font-gray2"
			 @click="handleClickDelete">
				DELETE THIS COVE
			</view>
		</view>
		<view class="share-view" @click="handleClickShareOpen">
			<uni-icons type='paperplane-filled' size="30" color="#F4c587"></uni-icons>
		</view>
	</view>
</template>

<script>
	import {mapActions,mapGetters,mapState,mapMutations} from 'vuex';
	export default {
		computed:{
			...mapState([
				'project'
			]),
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters(['defaultHeight','getPlayerState'])
		},
		mounted() {

		},
		methods:{
			...mapMutations(['setProject']),
			...mapActions(['deleteProject','setPlayer','playerStop','runIntervals','runSynthGamut','clearIntervals']),
			handleClickPlay(){
				if(this.getPlayerState=='stoped'){
					this.setPlayer();
					this.runIntervals(()=>{
						this.runSynthGamut();
					})
				}
				else{
					this.playerStop();
					this.clearIntervals();
				}
			},
			handleClickShareOpen(){
				this.$refs.popup.open('bottom');
			},
			handleClickDelete(){
				var that =this;
				uni.showModal({
					title:'WARING!!!',
					content:'ARE YOU SURE DELETE?',
					confirmColor: 'red',
					success:(res)=>{
						if(res.confirm){
							that.playerStop();
							that.clearIntervals();
							that.deleteProject();
							uni.switchTab({
								url:'../../index/index'
							})
						}
					}
				})
			},
			shareSelect(){
				//todo
			},
			getDate(value){
				var date = new Date(value);
				var dates = date.getFullYear() + '-' +(date.getMonth() + 1) + '-' + date.getDate();
				return dates
			},
			getTime(value){
				var date = new Date(value);
				var time = date.getHours() + ':' + date.getMinutes();
				return time
			}
		}
	}
</script>

<style scoped lang="scss">
	.share-view{
		position: absolute;
		right: 20px;
		top:20px;
	}
</style>