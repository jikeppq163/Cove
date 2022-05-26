<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight">
		<view class="text-center u-font-gray4">
			<view class="u-font-size-20 u-p-20 u-p-t-60">
				{{project.rdata.title}}
			</view>
			<view class="u-p-3">
				{{project.rdata.thoughts}}
			</view>
			<view class="u-p-3">
				{{project.rdata.location}}
			</view>
			<view class="u-p-3">
				{{getDate(project.updated_at)}}
			</view>
			<view class="u-p-3">
				{{getTime(project.updated_at)}}
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
		<view class="flex u-p-20">
			<view class="u-p-10 u-m-l-10 u-font-gray4 u-bg-maka-g2 u-radius-5" v-for="item of project.rdata.mood" :key='item.id'>
				{{item}}
			</view>
		</view>
		<view class="flex space-between">
			<view class="u-m-10 u-p-10 u-radius-5 text-center u-bg-maka3 u-font-gray2" style="width: 100%;"
			 @click="handleClickDelete">
				删除这个故事
			</view>
			<view class="u-m-10 u-p-10 u-radius-5 text-center u-bg-maka3 u-font-gray2" style="width: 100%;"
			 @click="handleClickEdit">
				编辑
			</view>
		</view>
		<view class="share-view" @click="handleClickShareOpen">
			<uni-icons type='paperplane-filled' size="30" color="#F4c587"></uni-icons>
		</view>
		<view>
			<!-- 分享示例 -->
			<uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
				<uni-popup-share title="分享到" @select="shareSelect"></uni-popup-share>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {mapActions,mapGetters,mapState,mapMutations} from 'vuex';
	import reqProject from "@/api/project.js";
	export default {
		computed:{
			...mapState(['index','project']),
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters(['defaultHeight','getPlayerState'])
		},
		mounted() {
			if(this.index==-1){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		},
		methods:{
			...mapMutations([]),
			...mapActions(['setPlayer','playerStop','runIntervals','runSynthGamut','clearIntervals']),
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
				//this.$refs.share.open();
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
						}
					}
				})
			},
			deleteProject(){
				console.log(reqProject.delete)
				reqProject.delete({
					data:{
						id:this.project.id
					},
					success:(res)=>{
						console.log('reqProject.delete success:',res);
						uni.switchTab({
							url:'/pages/index/index'
						})
					},
					fail:(err)=>{
						console.log('reqProject.delete fail:',err);
					}
				})
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
			},
			handleClickEdit(){
				uni.navigateTo({
					url:'/pages/emotion/mood/index'
				})
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