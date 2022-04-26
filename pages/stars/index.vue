<template>
	<view>
		<view class="u-p-20 text-center u-font-size-16">
			今日心情
		</view>
		<view class="flex space-between u-font-gray2 u-p-l-20 u-p-r-20">
			 <liuyuno-tabs :tabData="titleTag" :defaultIndex="defaultIndex" @tabClick='tabClick' />
		</view>
		<view class="u-p-t-20">
			<swiper indicator-dots :current="swiperCurrent" previous-margin='40px' next-margin='40px' style="height: 800rpx;" >
				<swiper-item v-for="(item,index) of swiperData" :key="item.id" @click="handleClickSwiper(index)">
					<view class="flex center u-p-t-40 u-m-b-20">
						<view class="u-bg-malandy-g1 u-radius-20 shadow-blur" style="width: 500rpx;height: 700rpx;">
							<view class="flex u-p-10">
								<view class="u-p-10">
									<view class="u-radius-20" style="width: 180rpx;height: 180rpx;overflow: hidden;">
										<img :src="item.userInfo.avatarUrl" style="width: 100%;height: 100%;" alt="">
									</view>
								</view>
								<view class="text-center u-font-gray4 u-p-10 flex-column center nowrap" >
									<text class="u-p-3 u-font-size-16" >
										{{item.title}}
									</text>
									<text class="u-p-3 u-font-size-12 nowrap" >
										{{item.userInfo.nickName}}
									</text>
									<view class="">
										<uni-icons type="location" color='#fff'></uni-icons>
										<text class="u-p-3 nowrap">{{item.location}}</text>
									</view>
								</view>
							</view>
							<view class="text-center u-p-t-20 u-font-gray2">
								<text class="u-font-size-30">“</text>
								<text class="u-font-gray4">{{item.thoughts}} </text>
								<text class="u-font-size-30">”</text>
							</view>
							<view class="absolute left-20 bottom-10" style="">
								<view class="flex u-font-gray4 u-font-size-16">
									<uni-icons type="chat" color='#fff' size="20"></uni-icons>
									{{item.comment}}
								</view>
								<view class="">
									
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	// 生成表单的 工具 https://demo.ucharts.cn/#/
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	export default {
		data() {
			return {
				titleTag:['生活','情感','校园','职场','其他'],
				defaultIndex:0,
				swiperCurrent:1,
				swiperData: [{
						userInfo: {
							"avatarUrl": "https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/62/86/74_avatar_max.jpg",
							"nickName": "寂寞无敌",
						},
						comment:23,
						mood: [],
						audio: '',
						volume: 10,
						synth: [],
						title: '心情很糟糕',
						thoughts: '手机坏了,iphone维修居然要14天!',
						location: '深圳',
						create_at: '2021-03-19 12:43'
					},
					{
						userInfo: {
							"avatarUrl": "https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/15/95/31_avatar_max.jpg",
							"nickName": "超长昵称超长",
						},
						comment:121,
						mood: [],
						audio: '',
						volume: 10,
						synth: [],
						title: '今天过得很快',
						thoughts: '因为又是忙碌的一天',
						location: '哈萨克斯坦',
						create_at: '2021-03-19 12:43'
					},
					{
						userInfo: {
							"avatarUrl": "https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/07/05/34_avatar_max.jpg",
							"nickName": "name111",
						},
						comment:2101,
						mood: [],
						audio: '',
						volume: 10,
						synth: [],
						title: '如果可以从来',
						thoughts: '如果人生可以从来,你想在那一天开始?',
						location: '哥伦比亚大学',
						create_at: '2021-03-19 12:43'
					}
				]
			}
		},
		components: {
		        liuyunoTabs
		},
		mounted() {
			//todo 数据最好在创建的时候进行加载
		},
		methods:{
			tabClick(){
				//todo
			},
			/**
			 * @param {Object} index
			 * 点击侧边卡片可以切换 看效果是否需要
			 */
			handleClickSwiper(index){
				this.swiperCurrent = index;
			}
		}
	}
</script>

<style scope lang="scss">
	.view_animation {
		width: 100px;
		height: 50px;
		background: red;
		color: white;
		font-weight: bold;
		position: relative;
		animation: mymove 5s infinite;
		animation-timing-function: ease-in;
	}

	@keyframes mymove {
		from {
			left: -100px;
			top: -100px;
		}

		to {
			left: 400px;
			top: 300px;
		}
	}
</style>
