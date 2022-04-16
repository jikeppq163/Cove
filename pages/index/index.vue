<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight" >
		<scroll-view scroll-y="true" class="u-p-t-5 u-font-white uni-shadow-base" 
			:style="'height:'+getWindowsHeight*0.8 +'px;'" 
			>
			<view class="u-radius-3 u-p-3 u-m-10 u-bg-maka-g uni-shadow-base" v-for="(item,index) of list" :key='item.id' @click="handleClickInfo(index)">
				<view class="u-p-3">
					<uni-icons type="flag" color='#769A80'></uni-icons>
					{{item.title}}
				</view>
				<view class="u-p-3">
					<uni-icons type="compose" color='#769A80'></uni-icons>
					{{item.thoughts}}
				</view>
				<view class="u-p-3 flex space-between">
					<view class="">
					<uni-icons type="spinner-cycle" color='#769A80'></uni-icons>
						{{getDate(item.date)}}
					</view>
					<view class="">
						<uni-icons type="location" color='#769A80'></uni-icons>
						{{item.location}}
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="u-bottom u-p-10 u-m-t-20 u-m-b-40 flex space-between u-bg-malandy-g2">
			<view class="u-m-10 u-p-10 u-radius-5 text-center u-bg-maka3 u-font-gray2"
			 style="width: 100%;"
			 @click="handleClickDelete">
				Delete All
			</view>
			<view class="u-m-10 u-p-10 u-radius-5 text-center u-bg-maka3 u-font-gray2" 
			 style="width: 100%;"
			 @click="handleClickAdd">
				Add New
			</view>
		</view>
	</view>
</template>

<script>
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
				listIndex:'index'
			}),
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters(['findMood','defaultHeight','getWindowsHeight'])
		},
		mounted() {
			this.CLEAR_INDEX();
			
		},
		methods:{
			...mapMutations(['CLEAR_INDEX','RESET_PROJECT','getLoginStatus']),
			...mapActions(['getProject','setProjectFromId']),
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
				if(this.getLoginStatus()){
					this.RESET_PROJECT();
					uni.navigateTo({
						url:'../emotion/mood/index'
					})
				}
				else{
					
				}
			},
			getDate(value){
				var date = new Date(value);
				var dates = date.getFullYear() + '-' +(date.getMonth() + 1) + '-' + date.getDate();
				var time = date.getHours() + ':' + date.getMinutes();
				return dates + ' ' + time
			},
			handleClickInfo(index){
				this.setProjectFromId(index);
				uni.navigateTo({
					url:'../emotion/info/index'
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