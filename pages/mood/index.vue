<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight">
		<view class="">
			<view class="text-center u-font-white u-font-size-20 u-p-t-40 u-p-b-20">
				How do you feel right now?
			</view>
		</view>
		<MoodView></MoodView>
		<view v-if="list.mood.length" class="u-p-t-60 flex center">
			<view class="u-p-10 u-font-size-20 u-font-white u-border-1 u-radius-20 u-p-l-40 u-p-r-40 uni-shadow-lg animation-fade" 
				@click="handleClickNext">
				NEXT
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from 'vuex'
	import MoodView from '../components/mood.vue'
	export default {
		data() {
			return {
			}
		},
		components:{MoodView},
		computed:{
			...mapState({
				//选中的情绪列表
				list:'project'
			}),
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters(['defaultHeight'])
		},
		methods: {
			handleClickNext(){
				uni.navigateTo({
					url:'../audio/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
