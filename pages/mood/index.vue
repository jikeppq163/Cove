<template>
	<view class="index_body" :style="innerHeight">
		<view class="">
			<view class="text-center u-font-white u-font-size-20 u-p-t-40">
				How do you feel right now?
			</view>
		</view>
		<scroll-view>
			<view class="u-p-t-40 u-font-white">
				<view class="flex u-p-t-10" v-for="(items,index) in mood" :key='items.id'>
					<view class="u-m-10 u-p-5 u-p-l-20 u-p-r-20  uni-border u-radius-3" v-for="(item,index) in items" @click="handleClickMood(item)">
						{{item}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {mapState,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				innerHeight:{
					"min-height":'800rpx'
				}
			}
		},
		computed:{
			...mapState(['mood']),
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters([])
		},
		created() {
			//获取屏幕高度
			this.innerHeight['height'] = `${this.$store.getters['getWindowsHeight']}px`;
			console.log('list created');
		},
		methods: {
			handleClickMood(){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.index_body{
		background-color: skyblue;
	}
</style>
