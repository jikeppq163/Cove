<template>
	<view class="bg-white u-font-black ">
		<uni-card class="" :title="userInfo.nickname" :sub-title="1?'新手 Lv 1':0" :isFull="true" :thumbnail="userInfo.headimgurl">
		<!-- :sub-title="userInfo.sex? '女':'男'" -->
		<!-- <view class="u-m-10">
			<uni-icons class='u-m-r-10' type="tune-filled" ></uni-icons>
			设置 (即将上线) 
		</view>	 -->		
		</uni-card>
		<!-- <view class="flex flex-center u-bg-malandy2 u-p-10 u-m-t-10">
			<button size="mini" @click="getLogin()" >登录</button>
		</view>	 -->	
		<!-- <view class="u-p-3 bg-black"></view> -->
	
		<view class="u-bg-white u-p-10 u-font-black ">
			我的打卡 (共打卡 {{ scount }} 次) <!-- @change="change" -->
			<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change"
				@monthSwitch="monthSwitch"  />
		</view>
		<view class="bg-white" style="height: 300px;"></view>
	<!-- 	
		<view class=" u-p-10 u-m-t-10">
			<uni-icons class='u-m-r-10' type="wallet-filled" ></uni-icons>
			隐私管理 (即将上线) <br/>
		<text class="uni-body u-font-gray2">您能在匿名的状态下访问并获取信息。当我们需要能识别您的个人信息或者可以与您联系的信息时，我们会征求您的同意。通常，在您注册或申请开通新的功能时，我们可能收集这些信息：姓名，Email地址，住址和电话号码，并征求您的确认。</text>
		</view> -->
		<view>
			<uni-popup ref="popup" >
				<view class="u-bg-malandy-g2 u-p-t-5 u-font-gray4 uni-shadow-base" 
					:style="'width:'+ (getWindowsWidth) +'px;max-height:700rpx'">
					<view class="u-radius-3 u-p-3 u-m-10 uni-shadow-base" v-for="(item,index) of list"
						:key='item.id' @click="handleClickInfo(item.id)">
						<view class="u-p-3">
							<uni-icons type="flag" color='#dbfdd6'></uni-icons>
							{{item.rdata.title}}
						</view>
						<view class="u-p-3">
							<uni-icons type="compose" color='#dbfdd6'></uni-icons>
							{{item.rdata.thoughts}}
						</view>
						<view class="u-p-3 flex space-between">
							<view class="">
								<uni-icons type="spinner-cycle" color='#dbfdd6'></uni-icons>
								<uni-dateformat :date="item.created_at"></uni-dateformat>
							</view>
							<view class="">
								<uni-icons type="location" color='#dbfdd6'></uni-icons>
								{{item.rdata.location}}
							</view>
						</view>
					</view>
						<view class="u-p-t-5"></view>
				</view>
			</uni-popup>
		</view>

	</view>

</template>

<script>
	import authorize from "../utils/user.js"
	import {login} from '@/api/login.js'
	import reqProject from "@/api/project.js";
	//uni-icon 地址 https://uniapp.dcloud.io/component/uniui/uni-icons.html#介绍
	import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)

		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}
	export default {
		data() {
			return {
				scount: 0,
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				list: []
			}
		},
		computed:{
			...mapState({
				openId: 'openId',
				userInfo: 'userInfo'
			}),
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters(['findMood', 'defaultHeight', 'getWindowsHeight','getWindowsWidth'])
		},
		mounted() {
			this.getLoginStatus(this.$route.fullPath);
		},
		onShow() {
			if (localStorage.getItem('openId')) {
				if (!this.openId) this.getLoginStatus();
				//获取网络列表
				reqProject.list({
					params: {
						openid: this.openId
					},
					success: (res) => {
						console.log('reqProject.list success:', this.mapLoction(res));
						// this.setProjectList(res);
						this.scount = 0;
						this.info.selected = this.mapLoction(res);
						// res.forEach(item=>{
						// 	this.info.selected.push({
						// 		date: getDate(item.created_at).fullDate,
						// 		info: item.rdata.mood[0],
						// 		data: {
						// 			custom: item.rdata.location,
						// 			name: item.rdata.title
						// 		}
						// 	});
						// 	this.scount++;
						// })
					},
					fail: (err) => {
						console.log('reqProject.list fail:', err);
					}
				});
			} else {
				uni.showModal({
					title: '登录?',
					content: '你还未登录,是否登录获取信息?',
					success: (res) => {
						if (res.confirm) this.getLoginStatus();
					}
				})
			}
		},
		methods:{
			...mapActions(['setProjectList', 'setProjectFromId', 'getLoginStatus', 'initStatus']),
			open() {
				this.$refs.calendar.open()
			},
			close(){
				console.log('弹窗关闭');
			},
			change(e) {
				console.log('change 返回:', e);
				if (e.extraInfo.data!==undefined&&e.extraInfo.data.length>0) {
					this.$refs.popup.open('center');
					this.list = e.extraInfo.data;
				}
				// 模拟动态打卡
				// if (this.info.selected.length > 5) return
				// this.info.selected.push({
				// 	date: e.fulldate,
				// 	info: '打卡'
				// })
			},
			confirm(e) {
				console.log('confirm 返回:', e)
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			},
			handleClickInfo(id) {
				this.setProjectFromId(id);
				uni.navigateTo({
					url: '/pages/share/index?id=' + id
				})
			},mapLoction(arr) {
				var newArr = [];
				arr.forEach(function (oldData, i) {
					 var index = -1;
					 var createTime = oldData.created_at.substring(0, 10);
					 var alreadyExists = newArr.some(function (newData, j) {
					 // console.log('oldData',oldData,newData);
						 if (oldData.created_at.substring(0, 10) === newData.date.substring(0, 10)) {
							 index = j;
							 return true;
						 }
					 });
					 if (!alreadyExists) {
						 newArr.push({
							date: getDate(oldData.created_at).fullDate,
							info: oldData.rdata.mood[0],
							data: [
								oldData
							]
						 });
					 } else {
						 newArr[index].data.push(oldData);
					 }
				 });
				 return newArr;
			 }
		}
	}
</script>

<style>
</style>
