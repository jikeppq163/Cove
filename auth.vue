<template>
	<view class="">
		<view class="">
			auth 本机调试
		</view>
		<view class=""><input :value="openid" /></view>
		<view class=""><input :value="url" /></view>
		<view class=""><input :value="nickname" /></view>
		<view class=""><input :value="sex" /></view>
		<view class=""><input :value="unionid" /></view>
		<view class=""><input :value="language" /></view>
		<view class=""><input :value="country" /></view>
		<view class=""><input :value="headimgurl" /></view>
		<view class=""><input :value="province" /></view>
		<view class=""><input :value="city" /></view>
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
				openid: this.$route.query.openid,
				url: this.$route.query.url,
				nickname: this.$route.query.nickname,
				sex: this.$route.query.sex,
				unionid: this.$route.query.unionid,
				language: this.$route.query.language,
				headimgurl: this.$route.query.headimgurl,
				country: this.$route.query.country,
				province: this.$route.query.province,
				city: this.$route.query.city
			}
		},
		methods:{
			...mapActions(['getLoginStatus'])
		},
		mounted() {
			// var that =this;
			// let demoData =
				// `{"openid":"o_cGP5oEgf4j5U8_4itil0Jf5Hio","nickname":"Jack(XiaJF)","sex":0,"language":"","city":"","province":"","country":"",
				// "headimgurl":"https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/4FYsd8bWiaR8otxj1cNzib0ibL975Ug8zGvJicPT0yZYIh4ox41pmiaUc8GeKl6kw9Q4q26Mab0TzYp9SaKDic55iavIQ\/132",
				// "privilege":[],"unionid":"ojrNT1qbB6qco98Jl4gWbDaV0lRo"}`;
			// // 如果连接中有微信返回的 code，则用此 code 调用后端接口，向微信服务器请求用户信息
			// let redirectUrl = sessionStorage.getItem("wxRedirectUrl");
			// that.code = that.$route.query.code;
			// that.redirectUrl = redirectUrl;
			// if (that.$route.query.code) {
			// 	try {
			// 		uni.request({
			// 			url: 'https://metamusic.toob.net.cn/api/oauth/wechat/oalogin?code=' + that.code,
			// 			success: (res) => {
			// 				if (res.data.raw.openid.length > 0) {
			// 					that.msg = 'success~~~' + JSON.stringify(res.data.raw);
			// 					console.log('res.data',res.data);
			// 					//将一些信息存储到本地
			// 					// const token = res.headers['access_token'];
			// 					// localStorage.setItem('token', token);
			// 					localStorage.setItem("openId", res.data.raw.openid);
			// 					localStorage.setItem("userInfo", JSON.stringify(res.data.raw));
			// 					// this.setOpenId(res.data.raw.openid);
			// 					// this.setUserInfo(res.data.raw);
			// 					// uni.setStorage({
			// 					// 	key: 'openId',
			// 					// 	data: res.data.raw.openid
			// 					// })
			// 					// uni.setStorage({
			// 					// 	key: 'userInfo',
			// 					// 	data: JSON.stringify(res.data.raw)
			// 					// });
			// 					this.getLoginStatus();
			// 					// if (redirectUrl) {
			// 					// 	uni.switchTab({
			// 					// 		url: redirectUrl,
			// 					// 		fail:()=>{
			// 					// 			uni.navigateTo({
			// 					// 				url: redirectUrl
			// 					// 			})
			// 					// 		}
			// 					// 	})
			// 					// } else {
			// 					// 	uni.switchTab({
			// 					// 		url: "/"
			// 					// 	})
			// 					// }
			// 				} else {
			// 					that.msg = 'fail~~~' + JSON.stringify(res.data);
			// 					//fail(res)
			// 				}
			// 			},
			// 			fail: (err) => {
			// 				that.msg = 'fail~~~2' + JSON.stringify(err);
			// 				//if (fail) fail(err);
			// 			}
			// 		})

			// 		// login({
			// 		// 		code:this.code,
			// 		// 		success: (res) => {
			// 		// 			this.msg = 'success' + JSON.stringify(res);
			// 		// 			//console.log('auth 重定向地址:',redirectUrl);
			// 		// 			if(redirectUrl){
			// 		// 				this.$router.replace(redirectUrl); //跳转到业务页面
			// 		// 			}
			// 		// 			else{
			// 		// 				this.$router.replace("./");
			// 		// 			}
			// 		// 		},
			// 		// 		fail: (err) => {
			// 		// 			this.msg ='auth fail' + JSON.stringify(err);
			// 		// 			console.log('auth fail',err);
			// 		// 		}
			// 		// 	})
			// 	} catch (error) {
			// 		console.log(error);
			// 	}
			// } else {
			// 	console.log('auth fail not code:', this.$route.query.code);
			// 	// 如果不是从微信重定向过来的，没有带着微信的 code，则直接进入首页
			// 	this.$router.replace("/");
			// }
		}
	}
</script>

<style lang="scss" scoped>
</style>
