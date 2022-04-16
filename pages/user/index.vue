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
	//uni-icon 地址 https://uniapp.dcloud.io/component/uniui/uni-icons.html#介绍
	export default {
		data() {
			return {
				userInfo: {
					"id": "o_cGP5oEgf4j5U8_4itil0Jf5Hio",
					"nickname": "用户名",
					"avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/4FYsd8bWiaR8otxj1cNzib0ibL975Ug8zGvJicPT0yZYIh4ox41pmiaUc8GeKl6kw9Q4q26Mab0TzYp9SaKDic55iavIQ/132",
					"email": null,
					"raw": {
						"openid": "o_cGP5oEgf4j5U8_4itil0Jf5Hio",
						"sex": 0,
					}
				},
			}
		},
		mounted() {
			uni.request({
				url: "https://metamusic.toob.net.cn/user.json",
				success: (res) => {
					if (res.statusCode == 200) {
						this.userInfo = res.data
					} else {
						uni.showModal({
							title: '错误:' + res.statusCode,
							content: res.errMsg,
							showCancel: false
						})
					}
					console.log('uni.request', res);
				}
			})
		}
	}
</script>

<style>
</style>
