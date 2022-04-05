<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight">
		<view class="">
			<view class="text-center u-font-white u-font-size-20 u-p-t-40">
				How do you feel right now?
			</view>
		</view>
		<scroll-view scroll-x="true" style='white-space: nowrap;' scroll-into-view='Annoyed'>
			<view class="u-p-t-40 u-font-white">
				<view class="flex u-p-t-10" v-for="(items,indexs) in mood" :key='items.id' :class='!(indexs%2)? "u-p-l-20":""'>
					<view :id='item' class="u-m-10 u-p-5 u-p-l-20 u-p-r-20 u-radius-3 uni-border uni-shadow-lg" 
						:class="findMood(item)!=-1? 'u-bg-gray u-font-skyblue':''"
						v-for="(item,index) in items" :key='item.id'
						@click="handleClickMood(item)">
						{{item}}
					</view>
				</view>
			</view>
		</scroll-view>
		<view v-if="moodList.length" class="u-p-t-60 flex center">
			<view class="u-p-10 u-font-size-20 u-font-white u-border-1 u-radius-20 u-p-l-40 u-p-r-40 uni-shadow-lg" 
				@click="handleClickNext">
				NEXT
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
				mood:'mood',
				//选中的情绪列表
				list:'project'
			}),
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters(['findMood','defaultHeight'])
		},
		created() {
			this.moodList = this.list.mood;
			console.log('list created');
		},
		methods: {
			...mapMutations(['addMood','deleteMood']),
			handleClickMood(value){
				var index = this.moodList.findIndex(item=>{
					return item === value
				});
				if(index == -1){
					this.addMood(value);
				}
				else{
					this.deleteMood(index);
				}
			},
			handleClickNext(){
				uni.navigateTo({
					url:'../audio/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.index_body{
		background-color: skyblue;
	}
</style>
