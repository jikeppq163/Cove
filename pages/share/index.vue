<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight">
		<view class="u-font-white u-m-t-20">
			<view class="u-p-l-20 u-p-r-20 flex-row space-between">
				<view class="">
					<view class="u-font-size-20 u-p-3">
						{{project.rdata.title}}
					</view>
					<view class="u-p-3">
						{{project.rdata.thoughts}}
					</view>
				</view>
				<view class="u-p-t-10">
					<view class="u-p-10 u-radius-5 u-bg-malandy2 text-center" style="height: 40px;width: 40px;">
						<uni-icons custom-prefix="iconfont" type='icon-fenxiang' size="20" color="#fff"
						@click="handleClickShare"
						></uni-icons>
					</view>
				</view>
			</view>
			<view class="u-p-l-23 u-p-r-20 flex-row space-between">
				<uni-dateformat :date="project.created_at" :threshold="[60000,3600000]"></uni-dateformat>
				<view class="">
					<uni-icons type="location" color='#fff'></uni-icons>
					{{project.rdata.location}}
				</view>
			</view>
		</view>
		<view class="u-m-10 u-m-t-20 u-bg-maka-g text-center u-font-gray2 shadow-lg" style="width: 700rpx;height: 400rpx;">
			<image v-if='imageUrl' :src="imageUrl" mode="aspectFill" style="width: 100%; height: 100%;"></image>
			<view class="u-p-10 u-radius-5 text-center relative" style="height: 60px;width: 60px;left:300rpx;top:-250rpx;"
				@click="handleClickPlay">
				<uni-icons 	v-if="imageUrl" 
							custom-prefix="iconfont" 
							:type='getPlayerState=="stoped"? "icon-bofang":"icon-zanting"' 
							size="40" 
							color="#fff">
				</uni-icons>
			</view>
		</view>
		<view v-if="project.openid == openId" class="u-bottom u-p-10 u-m-t-10 u-m-b-10 flex flex-end">
			<view class="u-p-5 u-p-l-20 u-p-r-20 u-radius-5 text-center u-bg-maka3 u-font-gray2"
			 @click="handleClickDelete">
				<uni-icons type="trash"></uni-icons>
				删除
			</view>
			<view class="u-m-l-10 u-p-5 u-p-l-20 u-p-r-20 u-radius-5 text-center u-bg-maka3 u-font-gray2" 
			 @click="handleClickEdit">
				<uni-icons type="compose"></uni-icons>
				编辑
			</view>
		</view>
		<uComment :projectId='projectId'></uComment>
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
			if (!this.projectId) this.projectId = '17';
			if(!that.reqFlag){
				that.reqFlag = true;
				that.getProject();
			}
		},
		methods: {
			...mapMutations(['setProject']),
			...mapActions(['initPlayer','setPlayer','playerStop','runIntervals','runSynthGamut','clearIntervals','getLoginStatus']),
			handleClickPlay(){
				if(this.imageUrl){
					if(!this.initPlay){
						this.initPlay = true;
						//this.initPlayer();
						this.setPlayer();
					}
					else{
						if(this.getPlayerState=='stoped'){
								this.playerStart();
						}
						else{
							this.playerStop();
							this.getPlayerState;
							//this.clearIntervals();
						}
					}
				}
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
					title:'WARING!!!',
					content:'ARE YOU SURE DELETE?',
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
</style>
