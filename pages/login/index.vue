<template>
	<view class="">
		<view class="login-title"></view>
		<view class="login-view">
			<view class="u-radius-3 shadow u-m-10 u-p-10 u-p-t-20 u-p-b-20 bg-white">
				<view class="flex u-p-5">
					<uni-easyinput prefixIcon="person-filled" v-model="username" placeholder="请输入账号"></uni-easyinput>
				</view>
				<view class="flex u-p-5">
					<uni-easyinput prefixIcon="eye" type="password" v-model="password" placeholder="请输入密码"></uni-easyinput>
				</view>
			</view>
		</view>
		<view class="u-p-10 u-m-t-20">
			<view class="bg-blue radius shadow text-center u-p-10" @click="handleClickLogin">
				登录
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			username:'',
			password:'',
		}
	},
	methods:{
		handleClickLogin(){
			uni.navigateTo({
				url:'../index/index'
			})
		}
	}
}
</script>

<style scoped lang="scss">
	.login-title{
		height: 300rpx;
		background-color: skyblue;
	}
	.login-view{
		margin-top: -80rpx;
	}
</style>