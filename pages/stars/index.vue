<template>
	<view class="u-bg-malandy-g2">
		<!-- <view class="flex space-between u-font-gray2 u-p-l-20 u-p-r-20">
			<liuyuno-tabs :tabData="titleTag" :defaultIndex="defaultIndex" @tabClick='tabClick' />
		</view> -->
		<view >
		<view class="u-p-20 u-font-gray4 text-center u-font-size-16">
			与同伴们一起, 寻找你心路旅程的故事吧!
		</view>
			<swiper indicator-dots :current="swiperCurrent" previous-margin='40px' next-margin='40px' :style="style">
				<swiper-item v-for="(item,index) of swiperData" :key="item.id" @click="handleClickSwiper(index)">
					<view class="flex center" style="height: 95%;">
						<view class="flex-column center" style="height: 95%;">
							<view class="u-bg-malandy-g1 u-radius-20 shadow-blur" style="width: 500rpx;height: 900rpx;">
								<view class="flex u-p-5">
									<!-- <view class="u-p-10">
										<view class="u-radius-20"
											style="width: 120rpx;height: 120rpx;overflow: hidden;">
											<img :src="item.userInfo.avatarUrl" style="width: 100%;height: 100%;"
												alt="">
										</view>
									</view> -->
									<view class="flex absolute right-10">
										<uni-icons type="location" color='#000'></uni-icons>
										<text class="nowrap u-font-size-12">{{item.rdata.location}}</text>
									</view>
									<view class="text-center u-p-10 u-p-t-25 flex-column center nowrap">
										<text class="u-p-3 u-font-size-20">
											{{textLine(item.rdata.title,10)}}
										</text>
										<view class="flex space-between u-m-t-10">
											<!-- <text class="u-p-3 u-font-size-12 nowrap">
												{{item.userInfo.nickName}}
											</text> -->
											<view class="u-p-5 u-m-l-5 u-font-black u-bg-malandy-g1 u-radius-50"
												v-for="item_mood of item.rdata.mood" :key='item_mood.id'>
												{{item_mood}}
											</view>
										</view>
									</view>
								</view>
								<view class="bg-image" :style="getStyle(item.rdata,index)">
									<view class="u-p-t-20"></view>
									<view class="text-center text-story">
										<text class="u-font-size-30">“</text>
										<text class="text-shadow text-story-text">{{textLine(item.rdata.thoughts,170)}} </text>
										<text class="u-font-size-30">”</text>
									</view>
								</view>
								<!-- <view class="absolute left-20 bottom-10" style="">
									<view class="flex u-font-gray4 u-font-size-16">
										<uni-icons type="chat" color='#fff' size="20"></uni-icons>
										{{item.comment}}
									</view>
								</view> -->
								<view class="absolute right-20 bottom-10" style="">
									<view
										class="u-p-7 u-radius-3 uni-shadow-lg u-bg-white u-font-size-30 u-font-gray text-center" @click="handelClickInfo(item.id)">
										➪
									</view>
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
	import reqProject from "@/api/project.js"
	export default {
		data() {
			return {
				titleTag: ['生活', '情感', '校园', '职场', '其他'],
				defaultIndex: 0,
				swiperCurrent: 1,
				swiperData: [],
				imageList: [],
				style: {
					"height": '800rpx'
				}
			}
		},
		components: {
			liuyunoTabs
		},
		onShow() {
			this.style.height = ((this.$store.getters.getWindowsHeight - 62) ) + 'px';
			// console.log('defaultHeight', this.style);
			this.$store.dispatch('getLoginStatus');
			this.$store.dispatch('playerStop');
			var that = this;
			that.swiperData = [];
			reqProject.star({
				success: (res) => {
					//console.log('reqProject.star success',res);
					var list = [];
					res.forEach(item => {
						// var a = {
						// 	userInfo: {
						// 		"avatarUrl": "https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/62/86/74_avatar_max.jpg",
						// 		"nickName": "寂寞无敌",
						// 	},
						// 	comment: 23,
						// }
						// a = Object.assign(a, item);
						list.push(item);
						console.log('res'+item.openid, item.rdata.title,item.id);
					})
					that.swiperData = list;
					console.log('res.forEach', list);
				},
				fail: (err) => {
					console.log('reqProject.star fail', err);
				}
			})
			reqProject.image({
				params: {
					q: 'love',
				},
				success: (res) => {
					that.imageList = res.list;
				},
				fail: (err) => {
					console.log('reqProject.image fail', err);
				}
			})
		},
		methods: {
			getStyle(item,index) {
				if (item.image) return "background-image:url(" + item.image + ');';
				if (this.imageList) return "background-image:url(" + this.imageList[index%10] + ');';
			},
			textLine(text,length) {
				if(!length) length =8;
				if (text.length > length) return text.substr(0, length) + '...'
				return text
			},
			handelClickInfo(id) {
				uni.navigateTo({
					url: '/pages/share/index?id='+id
				})
			},
			tabClick() {
				//todo
			},
			/**
			 * @param {Object} index
			 * 点击侧边卡片可以切换 看效果是否需要
			 */
			handleClickSwiper(index) {
				this.swiperCurrent = index;
			}
		}
	}
</script>

<style scope lang="scss">
	.bg-star {
		// background-color: #AAA;
	}
	.text-story {
		background-color: #f0f0f0d6;
		border-radius: 10px;
		margin: 10rpx;
		padding: 15rpx;
		max-height: 550rpx;
	}
	
	.bg-image{
		height: 600rpx;
		background-repeat: no-repeat;
		// background-blend-mode: color; //定义了背景层的混合模式（图片与颜色）
		background-color: #AAA; // 解决小白边
		background-position: center center;
		background-size: cover;
	}
	
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
