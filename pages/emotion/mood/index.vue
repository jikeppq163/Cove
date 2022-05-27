<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight">
		<view class="">
			<view class="text-center u-font-gray4 u-font-size-20 u-p-t-40 u-p-b-20">
				Hi! 你的心情是?
			</view>
		</view>
		<MoodView></MoodView>
		<view v-if="project.rdata.mood.length" class="u-p-t-30 flex center">
			<view class="u-font-size-20 u-font-gray4 u-border-1 u-radius-20  u-p-10 u-m-b-60 uni-shadow-lg animation-fade"  @click="handleClickNext">
				下一步
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from 'vuex'
	import MoodView from '../../components/mood.vue'
	export default {
		data() {
			return {
			}
		},
		components:{MoodView},
		computed:{
			...mapState({
				//选中的情绪列表
				project:'project'
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
