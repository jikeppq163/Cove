<template>
	<view class="">
		<view class="">
			auth 本机调试
		</view>
		<view class="">
			code
			<input :value="code" />
		</view>
		<view class="">
			redirectUrl {{redirectUrl}}
		</view>
		<view class="">
			msg {{msg}}
		</view>
	</view>
</template>

<script>
	//import Axios from 'axios';
	import {
		login
	} from '@/api/login.js'
	import {mapActions} from 'vuex';
	export default {
		name: "Auth",
		data() {
			return {
				code: '',
				redirectUrl: '/',
				msg: '',
			}
		},
		methods:{
			...mapActions(['getLoginStatus']),
			reqGet(){
				uni.request({
					url: 'https://metamusic.toob.net.cn/api/oauth/wechat/oalogin?code=' + that.code,
					success: (res) => {
						if (res.data.raw.openid.length > 0) {
							that.msg = 'success~~~' + JSON.stringify(res.data.raw);
							console.log('res.data',res.data);
							//将一些信息存储到本地
							// const token = res.headers['access_token'];
							// localStorage.setItem('token', token);
							localStorage.setItem("openId", res.data.raw.openid);
							localStorage.setItem("userInfo", JSON.stringify(res.data.raw));
							// this.setOpenId(res.data.raw.openid);
							// this.setUserInfo(res.data.raw);
							// uni.setStorage({
							// 	key: 'openId',
							// 	data: res.data.raw.openid
							// })
							// uni.setStorage({
							// 	key: 'userInfo',
							// 	data: JSON.stringify(res.data.raw)
							// });
							this.getLoginStatus();
							// if (redirectUrl) {
							// 	uni.switchTab({
							// 		url: redirectUrl,
							// 		fail:()=>{
							// 			uni.navigateTo({
							// 				url: redirectUrl
							// 			})
							// 		}
							// 	})
							// } else {
							// 	uni.switchTab({
							// 		url: "/"
							// 	})
							// }
						} else {
							that.msg = 'fail~~~' + JSON.stringify(res.data);
							//fail(res)
						}
					},
					fail: (err) => {
						that.msg = 'fail~~~2' + JSON.stringify(err);
						//if (fail) fail(err);
					}
				})
				
			}
		},
		mounted() {
			var that =this;
			// 如果连接中有微信返回的 code，则用此 code 调用后端接口，向微信服务器请求用户信息
			let redirectUrl = sessionStorage.getItem("wxRedirectUrl");
			that.openid = that.$route.query.openid;
			that.redirectUrl = redirectUrl;
			that.msg = JSON.stringify(that.$route.query);
			if (that.openid) {
				try {
					
				} catch (error) {
					console.log(error);
				}
			} else {
				console.log('auth fail not code:', this.$route.query.code);
				// 如果不是从微信重定向过来的，没有带着微信的 code，则直接进入首页
				this.$router.replace("/");
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>
