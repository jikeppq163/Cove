<template>
	<view class="">
		<view class="u-p-10 text-center">
			auth 本机调试
		</view>
		<view class="u-p-10 uni-shadow-base">openid:{{openid}}</view>
		<view class="u-p-10 u-m-t-10 uni-shadow-base">msg:{{msg}}</view>
	</view>
</template>

<script>
	//import Axios from 'axios';
	import user from '@/api/login.js'
	import {mapActions} from 'vuex';
	export default {
		name: "Auth",
		data() {
			return {
				msg:"",
				openid:""
			}
		},
		mounted() {
			var that =this;
			// 如果连接中有微信返回的 code，则用此 code 调用后端接口，向微信服务器请求用户信息
			let redirectUrl = sessionStorage.getItem("wxRedirectUrl");
			that.openid = that.$route.query.openid;
			that.redirectUrl = redirectUrl;
			//that.msg = JSON.stringify(that.$route.query);
			if (that.openid) {
				try {
					localStorage.setItem("openId",that.openid);
					user.getUserinfo({
							openId:that.openid,
							success:(res)=>{
								localStorage.setItem("userInfo", JSON.stringify(res));
								localStorage.setItem("unionid",res.unionid);
								that.getLoginStatus();
								if (redirectUrl) {
									that.msg = JSON.stringify(res);
									uni.switchTab({
										url: redirectUrl,
										fail:()=>{
											uni.navigateTo({
												url: redirectUrl
											})
										}
									})
								} else {
									uni.switchTab({
										url: "/"
									})
								}
							},
							fail:()=>{
								
							}
						})
				} catch (error) {
					console.log(error);
				}
			} else {
				console.log('auth fail not code:', this.$route.query.code);
				// 如果不是从微信重定向过来的，没有带着微信的 code，则直接进入首页
				this.$router.replace("/");
			}
		},
		methods:{
			...mapActions(['getLoginStatus'])
		},
	}
</script>

<style lang="scss" scoped>
</style>
