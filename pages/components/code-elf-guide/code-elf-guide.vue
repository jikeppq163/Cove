<template>
	<view class="content u-bg-malandy-g2">
		<swiper class="swiper" indicator-dots 
		:autoplay="autoplay" 
		:duration="duration">
			<swiper-item>
				<view class="swiper-item u-font-gray4 u-p-t-60">
					<view class="u-p-t-40"></view>
					<view class="title u-font-size-20  u-p-t-60">欢迎来到心乐星记 </view>
					<view class="u-p-t-60"></view>
					<view class="content u-font-size-15 u-p-60">
						在这里你可以记录你的心情和想法，<br /><br />
						创作和分享属于你的音乐日记，<br /><br />
						我们为你创造了一条音乐摘星之旅，<br /><br />
						通过你的情绪，认识你的想法和信念，<br /><br />
						让心情在音乐创作的过程中流淌。<br /><br />
					</view>
					<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item u-font-gray4 u-p-t-60">
					<view class="u-p-t-40"></view>
					<view class="title u-font-size-20  u-p-t-60">在心情音乐中感受你的想法和信念</view>
					<view class="u-p-t-60"></view>
					<view class="content u-font-size-15 u-p-60">
						你的想法比想象中更重要，他没有好坏之分，<br /><br />
						关键是这想法给你带来了什么样的情绪体验，<br /><br />
						总是有一些想法不断强化后形成了你的信念，<br /><br />
						深呼吸几次，冷静一下认识你的想法和信念，<br /><br />
						从更高的认知层次看, 你有没有更多的可能。<br /><br />
					</view>
					<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="u-p-t-40"></view>
				<view class="swiper-item u-font-gray4 u-p-t-60">
					<view class="u-p-t-60"></view>
					<view class="content u-font-size-15 u-p-60">
						在记忆里留存，<br /><br />
						在聆听中明晰，<br /><br />
						在回忆里沉淀，<br /><br />
						在分享中升华。<br /><br />
						<view class="u-font-size-20  u-p-t-40">准备开始你的心路旅程吧 </view>
					</view>
					<view class="experience" @tap="launchFlag()">{{experience}}</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="uniapp-img"><image src="../../../static/image/logo1.png" mode="aspectFit"></image></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				duration: 500,
				jumpover: '跳过',
				experience: '立即进入'
			}
		},
		methods: {
			launchFlag: function(){
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				// uni.setStorage({
				// 		key: 'launchFlag',
				// 		data: true,
				// });
				let redirectUrl = sessionStorage.getItem("wxRedirectUrl");
				// console.log(redirectUrl)
				if (redirectUrl&&redirectUrl.search("share/index")!==-1) {
					uni.navigateTo({
						url: redirectUrl
					});
				} else {
					uni.navigateTo({
						url: '/pages/emotion/mood/index'
					});
				}
				
			}
		}
	}
</script>
<style>
	page,
	.content{
		width: 100%;
		height: 100%;
		background-size: 100% auto ;
		padding: 0;
	}
	.swiper{
		width: 100%;
		height: 80%;
	}
	.swiper-item {
		width: 100%;
		height: 100%;
		text-align: center;
		align-items:flex-end;
		flex-direction:column-reverse
	}
	.uniapp-img{
		height: 20%;
		/* background: #FFFFFF; */
		display: flex;
		justify-content: center;
		align-items:center;
		overflow: hidden;
	}
	.uniapp-img image{
		width: 40%;
	}
	
	.jump-over,.experience{
		position: absolute;
		height: 60upx;
		line-height: 60upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 32upx;
		color: white;
		border: 1px solid white;
		z-index: 999;
	}
	.jump-over{
		right: 45upx;
		top: 125upx;
	}
	.experience{
		right: 50%;
		margin-right: -105upx;
		bottom: 80upx;
	}
</style>
