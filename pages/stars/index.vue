<template>
	<view>
		<view class="u-p-20 text-center u-font-size-16">
			社区作品
		</view>
		<view class="flex space-between u-font-gray2 u-p-l-20 u-p-r-20">
			 <liuyuno-tabs :tabData="titleTag" :defaultIndex="defaultIndex" @tabClick='tabClick' />
		</view>
		<view class="u-p-t-20">
			<swiper indicator-dots :current="swiperCurrent" previous-margin='40px' next-margin='40px' style="height: 1000rpx;" >
				<swiper-item v-for="(item,index) of swiperData" :key="item.id" @click="handleClickSwiper(index)">
					<view class="flex center u-p-t-40 u-m-b-20">
						<view class="u-bg-malandy-g1 u-radius-20 shadow-blur" style="width: 500rpx;height: 800rpx;">
							<view class="flex u-p-10">
								<view class="u-p-10">
									<view class="u-radius-20" style="width: 120rpx;height: 120rpx;overflow: hidden;">
										<img :src="item.userInfo.avatarUrl" style="width: 100%;height: 100%;" alt="">
									</view>
								</view>
								<view class="text-center u-font-gray4 u-p-10 flex-column center nowrap" >
									<text class="u-p-3 u-font-size-14" >
										{{item.rdata.title}}
									</text>
									<text class="u-p-3 u-font-size-12 nowrap" >
										{{item.userInfo.nickName}}
									</text>
									<view class="">
										<uni-icons type="location" color='#fff'></uni-icons>
										<text class="u-p-3 nowrap">{{item.rdata.location}}</text>
									</view>
								</view>
							</view>
							<view class="text-center u-p-t-20 u-font-gray2">
								<text class="u-font-size-30">“</text>
								<text class="u-font-gray4">{{item.rdata.thoughts}} </text>
								<text class="u-font-size-30">”</text>
							</view>
							<view class="u-m-10 u-m-t-20 u-p-40 u-bg-maka-g text-center u-font-gray2 shadow-lg">
								配图
							</view>
							<view class="flex absolute bottom-40">
								<view class="u-p-5 u-m-l-10 u-font-white u-bg-maka-g2 u-radius-5" v-for="item_mood of item.rdata.mood" :key='item_mood.id'>
									{{item_mood}}
								</view>
							</view>
							<view class="absolute left-20 bottom-10" style="">
								<view class="flex u-font-gray4 u-font-size-16">
									<uni-icons type="chat" color='#fff' size="20"></uni-icons>
									{{item.comment}}
								</view>
							</view>
							<view class="absolute right-20 bottom-10" style="">
								<view class="flex u-font-gray4 u-font-size-16" @click="goto('/pages/share/index')">
									详情
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
				titleTag:['生活','情感','校园','职场','其他'],
				defaultIndex:0,
				swiperCurrent:1,
				swiperData: []
			}
		},
		components: {
		        liuyunoTabs
		},
		onShow(){
			var that = this;
			reqProject.star({
				success:(res)=>{
					//console.log('reqProject.star success',res);
					var list =[];
					res.forEach(item=>{
						var a = {
							userInfo: {
								"avatarUrl": "https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/62/86/74_avatar_max.jpg",
								"nickName": "寂寞无敌",
							},
							comment:23,
						}
						a = Object.assign(a,item);
						list.push(a);
					})
					that.swiperData = list;
					console.log('res.forEach',list);
				},
				fail:(err)=>{
					console.log('reqProject.star fail',err);
				}
			})
		},
		methods:{
			goto(url) {
				uni.navigateTo({
					url:url
				})
			},
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
