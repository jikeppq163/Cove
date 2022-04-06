<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight" >
		<scroll-view scroll-y="true" class="u-p-t-5 u-font-white uni-shadow-base" 
			:style="'height:'+getWindowsHeight*0.8 +'px;'" 
			>
			<view class="u-radius-3 u-p-3 u-m-10 u-bg-maka-g uni-shadow-base" v-for="item of list" :key='item.id'>
				<view class="u-p-3">
					<uni-icons type="flag"></uni-icons>
					{{item.title}}
				</view>
				<view class="u-p-3">
					{{item.thoughts}}
				</view>
				<view class="u-p-3 flex space-between">
					<view class="">
						{{item.dateTime}}
					</view>
					<view class="">
						<uni-icons type="location"></uni-icons>
						{{item.location}}
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="u-bottom u-p-10 u-m-t-20 flex space-between u-bg-malandy-g2">
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
	import {mapState,mapGetters,mapMutations} from 'vuex'
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
				list:'list'
			}),
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters(['findMood','defaultHeight','getWindowsHeight'])
		},
		methods:{
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
				uni.navigateTo({
					url:'../mood/index'
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