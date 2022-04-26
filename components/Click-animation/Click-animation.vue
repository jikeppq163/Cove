<template>
	<view class="content">
		<view class="boxs" ref="cdone" @tap="getCloOne($event)">
			<view class="">======</view>
		</view>
		<view class="list">
			<block v-for="(item,index) in 4" :key="index">
				<view ref="cd" :class='"isa"+index' @tap="getClo($event,index)" style="position: relative; overflow: hidden;width: 400upx;height: 260upx;border: #007AFF 1upx solid;display: block;">cd{{item}}</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		};
	},
	onLoad() {
	},
	methods: {
		
		// 单个 一般用于btn
		getCloOne(e){
			let el = this.$refs.cdone.$el;
			let a =  uni.createSelectorQuery()
				.select(".boxs")
			a.fields({
			  size: true,
			  scrollOffset: true
			}, data => {
			  this.$add(e,el,data)
			}).exec();
		},
		//循环
		getClo(e,ins) {
			let el = document.getElementsByClassName(`isa${ins}`)[0]
			let a =  uni.createSelectorQuery()
				.select(`.isa${ins}`)
			a.fields({
			  size: true,
			  scrollOffset: true
			}, data => {
			  this.$add(e,el,data)
			}).exec();
		}
	}
};
</script>

<style lang="scss">
	//全局样式---重要放在自己导入全局样式的css ，less...或者app.vue中
	// .i_opa{
	// 	position: absolute;
	// 	border-radius: 50%;
	// }

.content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 90vh;
	.boxs {
		width: 30%;
		border: 1upx solid $uni-border-color;
		height: 100%;
		//以下重要的样式
		position: relative;
		overflow: hidden;
	}
	.list {
		width: 68%;
		border: 1upx solid $uni-border-color;
		height: 100%;
	}
}
</style>
