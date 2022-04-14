<template>
	<view class="">
			<uni-card
			:title="nickName"
			:sub-title="sex" 
			:extra="extra"
			:isFull="true"
			:thumbnail="avatar"
			>
				<text class="uni-body">额外描述</text>
			</uni-card>
			
			<view class="u-bg-white u-p-10 u-m-t-10">
				<uni-icons class='u-m-r-10' type="wallet-filled"></uni-icons>
				服务
			</view>
			
			<view class="u-bg-white u-p-10 u-m-t-10">
				<uni-icons  class='u-m-r-10' type="tune-filled"></uni-icons>
				设置
			</view>
	</view>
</template>

<script>
//uni-icon 地址 https://uniapp.dcloud.io/component/uniui/uni-icons.html#介绍
export default{
	data(){
		return{
				nickName:'用户名',
				sex:'男',
				extra:'铂金会员',
				avatar:'../../static/image/headeri.jpeg',
				extraIcon:{
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				}
		}
	}
}
</script>

<style>
</style>