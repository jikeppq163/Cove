<template>
	<view class="">	
		<view class="login-title u-bg-malandy-g2"></view>
		<view class="login-view">
			<view class="u-radius-3 shadow u-m-10 u-p-10 u-p-t-20 u-p-b-20 bg-white">
				<vue-typed-js :strings="['John', 'James']">
				  <h1>Hey <span class="typing"></span></h1>
				</vue-typed-js>
				<view class="flex u-p-5">
					<!-- <uni-easyinput prefixIcon="person-filled" v-model="username" placeholder="请输入账号"></uni-easyinput> -->
					valence(决定旋律兴奋或平静,输入范围0~1! ): <input v-model="valence" type="text" maxlength='100' placeholder='' />
				</view>
				<view class="flex u-p-5">
					<!-- <uni-easyinput prefixIcon="eye" type="password" v-model="password" placeholder="请输入密码"></uni-easyinput> -->
					arousal(决定旋律快乐或悲伤,输入范围0~1! ): <input v-model="arousal" type="text" maxlength='100' placeholder='' />
				</view>
				<view class="flex u-p-5">
					size(决定旋律有多少个音节,输入范围>5! ): <input v-model="size" type="number" maxlength='100' placeholder='' />
				</view>
			</view>
		</view>
		<view class="u-p-10 u-m-t-20">
			<view class="bg-blue radius shadow text-center u-p-10" @click="handleClickWechat">
				点击测试旋律生成
			</view>
		</view>
				<view class="flex u-p-5 bg-white">
					{{ melody }}
				</view>
		<!-- 
		<view class="view-icon flex center u-font-white">
			<view class="" @click="handleClickWechat">
				<uni-icons type='weixin' size="40" color="#769A80"></uni-icons> 
			</view>
		</view> -->
	</view>
</template>

<script>
import moodMelody from './moodmusic.js';
export default{
	data(){
		return{
			valence:0.2,
			arousal:0.8,
			size:20,
			melody:'',
			username:'',
			password:''
		}
	},
	mounted() {
		//console.log('login',this.$route,this.$route.query);
	},
	methods:{
		handleClickLogin(){
			uni.navigateTo({
				url:'../index/index'
			})
		},
		handleClickWechat(){
			this.melody = moodMelody(this.valence,this.arousal,this.size)
			console.log(this.melody)
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