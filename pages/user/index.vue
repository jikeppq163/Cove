<template>
	<view class="">
		<uni-card :title="userInfo.nickname" :sub-title="userInfo.raw.sex? '女':'男'" :isFull="true" :thumbnail="userInfo.avatar">
			<text class="uni-body">额外描述</text>
		</uni-card>

		<view class="u-bg-white u-p-10 u-m-t-10">
			<uni-icons class='u-m-r-10' type="wallet-filled"></uni-icons>
			服务
		</view>

		<view class="u-bg-white u-p-10 u-m-t-10">
			<uni-icons class='u-m-r-10' type="tune-filled"></uni-icons>
			设置
		</view>
									
	</view>
</template>

<script>
	import authorize from "../utils/user.js"
	//uni-icon 地址 https://uniapp.dcloud.io/component/uniui/uni-icons.html#介绍
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
	export default {
		data() {
			return {
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		mounted() {
			//authorize(this.$route.fullPath);

		},
		methods:{
		}
	}
</script>

<style>
</style>
