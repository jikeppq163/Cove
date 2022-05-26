<template>
	<view class="u-bg-malandy-g2 uni-scroll-view" :style="defaultHeight">

		<view class=" share-point u-bg-malandy2 " style="width: 100%;">
			<view class="u-font-gray2" style="float: right;">
				 点击上方 ... 分享
			</view>
			<view class="u-bg-malandy2 u-font-gray4 u-p-5" @click="handelClickStars">
				<uni-icons type='home-filled' size="20" color="#fff" ></uni-icons> 返回社区
			</view>
		</view>
		<scroll-view scroll-y="true" class="u-p-t-5 u-font-gray4 uni-shadow-base"
			:style="'height:'+ (getWindowsHeight) +'px;'">
			<view class="uni-scroll-view-content" >
				<view class="u-p-20"></view>
				<view class="u-font-gray4">
					<view class="u-p-l-20 u-p-r-20 flex-row space-between">
						<view class="">
							<view class="u-font-size-20 u-p-3">
								{{project.rdata.title}}
							</view>
							<view class="u-p-3 u-font-gray4">
								{{project.rdata.thoughts}}
							</view>
						</view>
						<!-- <view class="u-p-t-10">
							<view class="u-p-10 u-radius-5 u-bg-malandy2 text-center" style="height: 40px;width: 40px;">
								<uni-icons custom-prefix="iconfont" type='icon-fenxiang' size="20" color="#fff"
								@click="handleClickShare"
								></uni-icons>
							</view>
						</view> -->
					</view>
					<view class="u-p-l-23 u-p-r-20 flex-row space-between u-font-gray3">
						<uni-dateformat :date="project.created_at" :threshold="[60000,3600000]"></uni-dateformat>
						<view class="">
							<uni-icons type="location" color='#fff'></uni-icons>
							{{project.rdata.location}}
						</view>
					</view>
				</view>
				<view class="u-m-10 u-m-t-20 u-bg-maka-g text-center u-font-gray2 shadow-lg" style="width: 700rpx;height: 700rpx;">
					<image v-if='imageUrl' :src="imageUrl" lazy-load="true" mode="aspectFill" style="width: 100%; height: 100%;"></image>
					<view class="u-p-10 u-radius-5 text-center relative" style="position: relative;top:-395rpx;"
						@click="handleClickPlay">
						<uni-icons 	v-if="imageUrl" 
									custom-prefix="iconfont" 
									:type='getPlayerState=="stopped"? "icon-bofang":"icon-zanting"' 
									size="90" 
									color="#fff">
						</uni-icons>
					</view>
				</view>
				<view v-if="project.openid == openId" class="u-bottom u-p-10 u-m-t-10 u-m-b-10 flex flex-end widthFull">
					<view class="u-p-5 u-p-l-20 u-p-r-20 u-radius-5 text-center u-font-gray4"
					 @click="handleClickDelete">
						<uni-icons type="trash" color="#fff"></uni-icons>
						删除
					</view>
					<view class="u-m-l-10 u-p-5 u-p-l-20 u-p-r-20 u-radius-5 u-font-gray4 text-center" 
					 @click="handleClickEdit">
						<uni-icons type="compose" color="#fff"></uni-icons>
						编辑
					</view>
				</view>
				<uComment style="color: #FFF" :projectId='projectId'></uComment>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters,
		mapState,
		mapMutations
	} from 'vuex';
	import reqProject from "@/api/project.js";
	import reqStory from "@/api/story.js";
	import uComment from "@/components/u-comment/index.vue";
	import wx from 'weixin-js-sdk';
	export default {
		name: 'comment-eg',
		data() {
			return {
				// 使用对象展开运算符将 getter 混入 computed 对象中
				projectId:-1,
				project: {
					rdata:{
						mood: [],
						audio: '',
						volume: 10,
						synth: [],
						title: 'Loading...',
						thoughts: '',
						location: '',
						instrument:''
					},
					created_at: ''
				},
				imageUrl:'',
				initPlay:false,
			}
		},
		props: {
			articleId: {
				type: String,
				default: () => {
					return null;
				}
			}
		},
		watch: {
			articleId: {
				handler: function(newVal, oldVal) {
					if (newVal) {
						this.getComment(newVal);
					}
				},
				immediate: true
			}
		},
		components:{uComment},
		computed:{
			...mapState(['openId']),
			...mapGetters(['defaultHeight', 'getWindowsHeight','getPlayerState']),
		},
		mounted() {
			var that = this;
			this.projectId = that.$route.query.id;
			//this.$store.dispatch('initStatus',this.$route.fullPath);
			if (this.projectId){
				if(!that.reqFlag){
					that.reqFlag = true;
					that.getProject();
				}
			}
		},
		methods: {
			...mapMutations(['setProject']),
			...mapActions(['initSampler','setPlayer','playerStart','playerStop','runIntervals','runSynthGamut','clearIntervals','getLoginStatus']),
			handleClickPlay(){
				if(this.imageUrl){
					if(this.getPlayerState=='stopped'){
							this.playerStart();
							this.runSynthGamut();
					}
					else if(this.getPlayerState=='started'){
						this.playerStop();
						//this.clearIntervals();
					}
					else{
						uni.showToast({
							icon:'error',
							title:'加载中...'
						})
					}
				}
			},
			handelClickStars() {
				uni.switchTab({
					url: '/pages/stars/index'
				})
			},
			handleClickShare(){
				//// #ifdef H5
					this.wechatJs();
					// uni.share({
					// 	provider: "weixin",
					// 	scene: "WXSceneSession",
					// 	type: 0,
					// 	title:this.project.rdata.title,
					// 	href:'http://metamusic.toob.net.cn/index.html#/pages/share/index?id=20',
					// 	imageUrl: "https://metamusic.toob.net.cn/app/project//20220507/jx6tX61T51gL6JFe5E5LngkH4DZ21CKSC40UBkRl.jpg",
					// 	success: function (res) {
					// 		console.log("success:" + JSON.stringify(res));
					// 	},
					// 	fail: function (err) {
					// 		console.log("fail:" + JSON.stringify(err));
					// 		uni.showModal({
					// 			title:"error",
					// 			content:JSON.stringify(err),
					// 			showCancel:false
					// 		})
					// 	}
					// });
				//// #endif
			},
			handleClickDelete(){
				var that =this;
				uni.showModal({
					title:'请确认',
					content:'您是否想要删除这个故事?',
					confirmColor: 'red',
					success:(res)=>{
						if(res.confirm){
							that.playerStop();
							that.clearIntervals();
							that.deleteProject();
						}
					}
				})
			},
			wechatJs(){
				uni.request({
				 method: 'post',
				 url: 'http://my.service.com/index.php/opcode/6002',
				 data:{ url:'http://metamusic.toob.net.cn'} //向服务端提供授权url参数，并且不需要#后面的部分
				}).then((res)=>{
				 wx.config({
				  debug: true, // 开启调试模式,
				  appid: res.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
				  timestamp: res.timestamp, // 必填，生成签名的时间戳
				  noncestr: res.noncestr, // 必填，生成签名的随机串
				  signature: res.signature,// 必填，签名，见附录1
				  jsapilist: ['scanqrcode'] // 必填，需要使用的js接口列表，所有js接口列表见附录2
				 });
				})
			},
			getProject(){
				var that =this;
				reqProject.share({
					id:this.projectId,
					success: (res) => {
						console.log('reqProject.share success',res);
						that.project = res;
						that.setProject(res);
						that.setPlayer(true);
						that.reqFlag = false;
						if(!that.project.rdata.image){
							reqProject.image({
								params:{
									q:'love',
								},
								success:(res)=>{
									that.imageUrl = res.list[0];
									that.project.rdata.image = res.list[0];
								},
								fail: (err) => {
									console.log('reqProject.image fail',err);
								}
							})
						}
						else{
							that.imageUrl = that.project.rdata.image;
						}
						this.initSampler(that.project.rdata.instrument);
					},
					fail: (err) => {
						console.log('reqProject.share fail',err);
					}
				})
			},
			deleteProject(){
				reqProject.delete({
					data:{
						id:this.project.id
					},
					success:(res)=>{
						console.log('reqProject.delete success:',res);
						uni.switchTab({
							url:'/pages/index/index'
						})
					},
					fail:(err)=>{
						console.log('reqProject.delete fail:',err);
					}
				})
			},
			handleClickEdit(){
				uni.navigateTo({
					url:'/pages/emotion/mood/index'
				})
			}
		}
	}
</script>

<style Scope>
@import '@/static/share/iconfont.css';
/* body {
	position: absolute !important;
} */
.share-point {
	z-index: 99;
	position: fixed;
}
</style>
