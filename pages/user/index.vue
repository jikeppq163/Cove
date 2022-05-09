<template>
	<view class="">
		<uni-card :title="userInfo.nickname" :sub-title="userInfo.sex? '女':'男'" :isFull="true" :thumbnail="userInfo.headimgurl">
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
		<view class="flex flex-center u-bg-white u-p-10 u-m-t-10">
			<button size="mini" @click="getLogin()" >登录</button>
		</view>					
	</view>
</template>

<script>
	import authorize from "../utils/user.js"
	import {login} from '@/api/login.js'
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
			this.getLoginStatus(this.$route.fullPath);
		},
		methods:{
			...mapActions(['getLoginStatus']),
			getLogin(){
				authorize(this.$route.fullPath);
			}
		}
	}
</script>

<style>
</style>
