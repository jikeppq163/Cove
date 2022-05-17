<template>
	<view class="main">
		<!-- <div class="loading"></div> -->
		<code-elf-guide v-if="guidePages"></code-elf-guide>
		<!-- <view class="u-p-10 text-center">
			{{text}}
		</view>
		<view v-if="debug" class="u-p-10 uni-shadow-base">用户ID:{{openid}}</view>
		<view v-if="debug" class="u-p-10 uni-shadow-base">将要访问的页面:{{redirectUrl}}</view>
		<view v-if="debug" class="u-p-10 u-m-t-10 uni-shadow-base">服务端信息:{{msg}}</view>
		<view class="flex flex-center u-p-10 u-m-t-10 ">
			<button v-if="debug" size="mini" @click="handleClickTo">跳转</button>
		</view> -->
	</view>
</template>

<script>
	//import Axios from 'axios';
	import user from '@/api/login.js'
	import {mapActions} from 'vuex';
	import codeElfGuide from '@/pages/components/code-elf-guide/code-elf-guide.vue'
	export default {
		name: "Auth",
		components: {
			codeElfGuide
		},
		data() {
			return {
				guidePages:true,
				msg:"",
				openid:"",
				debug:true,
				redirectUrl:'',
				text:'准备中...'
			}
		},
		mounted() {
			var that =this;
			// 如果连接中有微信返回的 code，则用此 code 调用后端接口，向微信服务器请求用户信息
			that.openid = that.$route.query.openid;
			let redirectUrl = sessionStorage.getItem("wxRedirectUrl");
			that.redirectUrl = redirectUrl;
			//that.msg = JSON.stringify(that.$route.query);
			if (that.openid) {
				try {
					localStorage.setItem("openId",that.openid);
					that.text = "登录中...";
					user.getUserinfo({
							openId:that.openid,
							success:(res)=>{
								localStorage.setItem("userInfo", JSON.stringify(res));
								localStorage.setItem("unionid",res.unionid);
								that.getLoginStatus();
								// that.msg = JSON.stringify(res);
								// that.text = "跳转中...";
								// if(!that.debug){
								// 	if (redirectUrl) {
								// 		uni.switchTab({
								// 			url: redirectUrl,
								// 			fail:()=>{
								// 				uni.navigateTo({
								// 					url: redirectUrl
								// 				})
								// 			},
								// 			complete: (err) => {
								// 				that.msg = JSON.stringify(err);
								// 			}
								// 		})
								// 	} else {
								// 		uni.switchTab({
								// 			url: "/",
								// 			complete: (err) => {
								// 				that.msg = JSON.stringify(err);
								// 			}
								// 		})
								// 	}
								// }
								// else{
								// 	that.text = "测试模式不跳转";
								// }
							},
							fail:()=>{
								that.text = "登录失败";
								that.msg = JSON.stringify(res);
							}
						})
				} catch (error) {
					console.log(error);
				}
			} else {
				console.log('auth fail not code:', this.$route.query.code);
				// 如果不是从微信重定向过来的，没有带着微信的 code，则直接进入首页
				// this.$router.replace("/");
			}
		},
		methods:{
			...mapActions(['getLoginStatus']),
			loadExecution: function(){
				/**
				 * 获取本地存储中launchFlag的值
				 * 若存在，说明不是首次启动，直接进入首页；
				 * 若不存在，说明是首次启动，进入引导页；
				 */
				try {
					// 获取本地存储中launchFlag标识
					const value = uni.getStorageSync('launchFlag');
					if (value) {
						// launchFlag=true直接跳转到首页
						uni.switchTab({
							url: '/'
						});
					} else {
						// launchFlag!=true显示引导页
						this.guidePages = true
					}
				} catch(e) { 
					// error 
					uni.setStorage({ 
						key: 'launchFlag', 
						data: true, 
						success: function () {
							console.log('error时存储launchFlag');
						} 
					}); 
					this.guidePages = true
				}
			},
			handleClickTo(){
				var that =this;
				if (that.redirectUrl) {
					uni.switchTab({
						url: that.redirectUrl,
						fail:()=>{
							uni.navigateTo({
								url: that.redirectUrl
							})
						},
						complete: (err) => {
							that.msg = JSON.stringify(err);
						}
					})
				} else {
					uni.switchTab({
						url: "/",
						complete: (err) => {
							that.msg = JSON.stringify(err);
						}
					})
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	page,.main{
		width: 100%;
		height: 100%;
	}
	// .loading2 {
	//     margin: 20% auto;
	//     z-index: 1000;
	//     height: 42px;
	//     width: 70px;
	//     background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjQwIj48cmVjdCBmaWxsPSIjMDhhMWVmIiB4PSI0IiB5PSI0IiB3aWR0aD0iMzkyIiBoZWlnaHQ9IjIzMiIvPjxjaXJjbGUgaWQ9ImFjdG9yXzMiIGN4PSIwIiBjeT0iMCIgcj0iMzAiIGZpbGw9IiM5QUQ2NEIiPjxhbmltYXRlTW90aW9uIHBhdGg9Ik0zOSwxMjBMNzgsNTBIMTYxTDIzOSwxOTBIMzIyTDM2MSwxMjBMMzIyLDUwSDIzOUwxNjEsMTkwSDc4TDM5LDEyMCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2NpcmNsZT48cGF0aCBkPSJNMCwyNDBWMGg0MDB2MjQwSDB6IE0zMzAuNzY5LDM0aC05OC40NjJsLTgxLjUzOCwxNDEuMzQ1SDg2LjE1NEw1My44NDYsMTE5LjVsMzIuMzA4LTU1Ljg0NWg2NC42MTVsMjMuODQ2LDQwLjgyNGwxNi45MjMtMjkuMjdMMTY3LjY5MiwzNEg2OS4yMzFMMjAsMTE5LjVMNjkuMjMxLDIwNWg5OC40NjFsODEuNTM4LTE0MS4zNDVoNjQuNjE1bDMyLjMwOCw1NS44NDVsLTMyLjMwOCw1NS44NDVoLTY0LjYxNWwtMjMuODQ2LTQwLjgyNGwtMTYuOTIzLDI5LjI3TDIzMi4zMDgsMjA1aDk4LjQ2MkwzODAsMTE5LjVMMzMwLjc2OSwzNHoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=);
	// }
	
	// .loading {
	//   margin: 20% auto;
	//   width:0;
	//   height:0;
	//   border-right:1rem solid #fff;
	//   border-top:1rem solid #21af27;
	//   border-left:1rem solid #fff;
	//   border-bottom:1rem solid #21af27;
	//   border-radius: 1rem;
	//   -moz-border-radius: 1rem;
	//   -webkit-border-radius: 1rem;
	//   /* Animate and rotate the spinner using CSS3 Animations */
	
	//   animation: bganim 1.6s linear 0s infinite;
	//   /* moz: Vendor prefixe for Mozilla Firefox */
	//   -moz-animation: bganim 1.6s linear 0s infinite;
	//   /* webkit: Vendor prefixe for Google Chrome, Chromium, Apple Safari... */
	//   -webkit-animation: bganim 1.6s linear 0s infinite;
	
	// }
	
	// @keyframes bganim {
	
	//   /* Rotate the div 360° */
	
	//   from { transform:rotate(0deg); } to { transform:rotate(360deg); }
	
	// }
	
	// @-moz-keyframes bganim {
	
	//   from { -moz-transform:rotate(0deg); } to { -moz-transform:rotate(360deg); }
	
	// }
	
	// @-webkit-keyframes bganim {
	
	//   from { -webkit-transform:rotate(0deg); } to { -webkit-transform:rotate(360deg); }
	
	// }
	
</style>
