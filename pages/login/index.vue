<template>
	<view class="">
		<view class="login-title u-bg-malandy-g2"></view>
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
		<view class="view-icon flex center">
			<view class="" @click="handleClickWechat">
				<uni-icons type='weixin' size="40" color="#769A80"></uni-icons> 
			</view>
		</view>
	</view>
</template>

<script>
//import eruda from 'eruda';
export default{
	data(){
		return{
			username:'',
			password:''
		}
	},
	mounted() {
		//eruda.init();//控制台
		console.log('login',this.$route,this.$route.query);
	},
	methods:{
		handleClickLogin(){
			uni.navigateTo({
				url:'../index/index'
			})
		},
		handleClickWechat(){
			 let openId = localStorage.getItem('openId');
			    if (!openId) {
			        //保存当前路由地址，授权后还会跳到此地址
					sessionStorage.setItem('wxRedirectUrl', this.$route.fullPath)
			        //请求微信授权,并跳转到 /auth 路由
			        let appId = 'wx98f8c9efa066cb6e';
					let servers = '192.168.2.4';
			        let redirectUrl = `https%3A%2F%2F${servers}%2Fauth#wechat_redirect`;
					var url=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&response_type=code&scope=snsapi_userinfo&state=123&redirect_uri=${redirectUrl}`;
					window.location.href = url;
			   } else {
			       console.log('next');
			   }
		}
	}
}
</script>

<style scoped lang="scss">
	.login-title{
		height: 300rpx;
	}
	.login-view{
		margin-top: -80rpx;
	}
	.view-icon{
		position: absolute;
		bottom: 20px;
		left: 0px;
		width: 750rpx;
		height: 120rpx;
	}
</style>