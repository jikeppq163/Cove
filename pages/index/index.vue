<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight" >
		<scroll-view scroll-y="true" class="u-p-t-5 u-font-white uni-shadow-base" 
			:style="'height:'+getWindowsHeight*0.8 +'px;'" 
			>
			<view class="u-radius-3 u-p-3 u-m-10 u-bg-maka-g uni-shadow-base" v-for="(item,index) of list" :key='item.id' @click="handleClickInfo(item.id)">
				<view class="u-p-3">
					<uni-icons type="flag" color='#769A80'></uni-icons>
					{{item.rdata.title}}
				</view>
				<view class="u-p-3">
					<uni-icons type="compose" color='#769A80'></uni-icons>
					{{item.rdata.thoughts}}
				</view>
				<view class="u-p-3 flex space-between">
					<view class="">
					<uni-icons type="spinner-cycle" color='#769A80'></uni-icons>
						<uni-dateformat :date="item.updated_at"></uni-dateformat>
					</view>
					<view class="">
						<uni-icons type="location" color='#769A80'></uni-icons>
						{{item.rdata.location}}
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="u-bottom u-p-10 u-m-t-20 u-m-b-40 flex space-between u-bg-malandy-g2">
			<view class="u-m-10 u-p-10 u-radius-5 text-center u-bg-maka3 u-font-gray2" 
			 style="width: 100%;"
			 @click="handleClickAdd">
				新增作品
			</view>
		</view>
	</view>
</template>

<script>
	import authorize from "../utils/user.js";
	import reqProject from "@/api/project.js";
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
	export default {
		data() {
			return {
			}
		},
		computed:{
			...mapState({
				//选中的情绪列表
				project:'project',
				//总列表
				list:'list',
				listIndex:'index',
				openId:'openId'
			}),
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters(['findMood','defaultHeight','getWindowsHeight'])
		},
		mounted() {
			this.CLEAR_INDEX();	
		},
		onShow() {
			if(this.getLoginStatus()){
				//获取网络列表
				reqProject.list({
					params:{openid:this.openId},
					success:(res)=>{
						console.log('reqProject.list success:',res);
						this.setProjectList(res);
					},
					fail:(err)=>{
						console.log('reqProject.list fail:',err);
					}
				});
			}
		},
		methods:{
			...mapMutations(['CLEAR_INDEX','RESET_PROJECT']),
			...mapActions(['setProjectList','setProjectFromId','getLoginStatus']),
			handleClickDelete(){
				uni.showModal({
					title:'删除全部',
					content:'确认删除全部吗?',
					cancelColor:'red',
					success(res) {
						if(res.confirm){
							console.log('确认删除');
						}
					}
				})
			},
			handleClickAdd(){
				 //console.log(this.$route.fullPath)
				 if(this.getLoginStatus(this.$route.fullPath)){
					this.RESET_PROJECT();
					uni.navigateTo({
						url:'/pages/emotion/mood/index'
					})
				}
			},
			getDate(value){
				console.log('1',value);
				var date = new Date(value);
				var dates = date.getFullYear() + '-' +(date.getMonth() + 1) + '-' + date.getDate();
				var time = date.getHours() + ':' + date.getMinutes();
				return dates + ' ' + time
			},
			handleClickInfo(id){
				this.setProjectFromId(id);
				uni.navigateTo({
					url:'/pages/emotion/info/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.index_body{
		background-color: #60Eaff;
	}
	
	.u-bottom{
		position:fixed; 
		width: 750rpx;
		bottom:0px;
	}
</style>