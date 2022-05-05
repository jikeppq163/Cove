<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight">
		<view class="u-font-white">
			<view class="u-p-t-20 u-p-l-20 u-p-r-20 flex-row space-between">
				<view class="">
					<view class="u-font-size-20 u-p-3">
						{{project.rdata.title}}
					</view>
					<view class="u-p-3">
						{{project.rdata.thoughts}}
					</view>
				</view>
				<view class="u-p-t-10">
					<view class="u-p-10 u-radius-5 u-bg-malandy2 text-center" style="height: 40px;width: 60px;"
						@click="handleClickPlay">
						<uni-icons type='videocam' size="30" color="#fff"></uni-icons>
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
		<view class="u-m-10 u-m-t-20 u-p-40 u-bg-maka-g text-center u-font-gray2 shadow-lg">
			配图
		</view>
		<view class="u-bg-white">
			<hb-comment ref="hbComment" @add="add" @del="del" @like="like" @focusOn="focusOn" :deleteTip="'确认删除？'"
				:cmData="commentData" v-if="commentData"></hb-comment>
		</view>
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
	import reqStory from "@/api/story.js"
	export default {
		name: 'comment-eg',
		data() {
			return {
				// 使用对象展开运算符将 getter 混入 computed 对象中
				...mapGetters(['defaultHeight', 'getWindowsHeight']),
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
				"reqFlag": false, // 请求标志，防止重复操作，true表示请求中
				//评论区
				commentData: {
					
				},
				pages:1,
				size:10
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
		mounted() {
			var that = this;
			this.projectId = that.$route.query.id;
			if (!this.projectId) this.projectId = '17';
			if(!that.reqFlag){
				that.reqFlag = true;
				reqProject.share(
				{	
					id:this.projectId,
					success: (res) => {
						//console.log('success',res);
						that.project = res;
						that.reqFlag = false;
					},
					fail: (err) => {
						console.log('fail',err);
					}
				})
			}
			this.getComment();
		},
		methods: {
			// 登录校验
			checkLogin() {
				// TODO 此处填写登录校验逻辑
				if (true) {
					return true;
				} else {
					uni.showModal({
						title: '提示',
						content: '请先登录',
						confirmText: '前往登录',
						success: function(res) {
							if (res.confirm) {
								// uni.redirectTo({
								// 	url: '/pages/login/login'
								// });
							}
						}
					});
					return false;
				}
			},
			// 输入框聚焦
			focusOn() {
				this.checkLogin();
			},
			// 新增评论 改为分享你的故事 - 他的心情很「XX」，分享你的故事，帮帮Ta
			add(req) {
				if (!this.checkLogin()) {
					return
				}
				if (this.reqFlag) {
					uni.showToast({
						title: '操作频繁',
						duration: 1000
					});
					return
				}
				this.reqFlag = true;
				// TODO 接入真实接口
				var data = {
					project_id:this.projectId,
					story:JSON.stringify(req.content),
					nickname:'王大锤',
					parent_id:req.pId,
				}
				//console.log('data',data);
				reqStory.create({
					data,
					success:(res)=>{
						console.log('reqStory.create',res);
						// 下边假装请求成功
						this.reqFlag = false;
						this.$refs.hbComment.addComplete();
						this.getComment();
					},
					fail:(err)=>{
						console.log('reqStory.create fail',err);
					}
				})

			},
			// 点赞评论
			like(commentId) {
				if (!this.checkLogin()) {
					return
				}
				if (this.reqFlag) {
					uni.showToast({
						title: '操作频繁',
						duration: 1000
					});
					return
				}
				this.reqFlag = true;
				var data = {
					id:commentId,
					project_id:this.projectId,
				};
				reqStory.like({
					data,
					success:(res)=>{
						console.log('reqStory.like success',res);
						// 下边假装请求成功
						this.reqFlag = false;
						this.$refs.hbComment.likeComplete(commentId);
					},
					fail:(err)=>{
						console.log('reqStory.like fail',err);
					}
				})
			},
			// 删除评论
			del(commentId) {
				if (!this.checkLogin()) {
					return
				}
				if (this.reqFlag) {
					uni.showToast({
						title: '操作频繁',
						duration: 1000
					});
					return
				}
				this.reqFlag = true;
				reqStory.delete({
					id:commentId,
					success:(res)=>{
						console.log('reqStory.delete success',res);
						this.reqFlag = false;
						this.$refs.hbComment.deleteComplete(commentId);
					},
					fail:(err)=>{
						console.log('reqStory.delete fail',err);
					}
				})
				// 下边假装请求成功
			},
			// 获取评论
			getComment(articleId) {
				var that =this;
				// 成语标签, https://wenku.baidu.com/view/689f4cf558fb770bf68a55a6.html
				// TODO 接入真实接口
				reqStory.byProject({
					parmas:{
						storyId: 17,
						project_id:that.projectId
					},
					success:(res)=>{
						console.log('reqStory.byProject success',res);
						// 下边假装请求成功
						var list = [];
						var openId = localStorage.getItem('openId');
						res.forEach(item=>{
							list.push({
								id:item.id,
								owner: item.openid == openId,
								content: item.story,
								avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/4FYsd8bWiaR8otxj1cNzib0ibL975Ug8zGvJicPT0yZYIh4ox41pmiaUc8GeKl6kw9Q4q26Mab0TzYp9SaKDic55iavIQ/132",
								nickName: item.nickname,
								createTime: item.created_at,
								likeNum: item.likes_count,
								hasLike:false,
								parentId: item.parent_id,
							})
						})
						that.getLike(list);
					},
					fail:(err)=>{
						console.log('reqStory.byProject fail',err);
					},
				})
			},
			getLike(list){
				var that = this;
				reqStory.getLikeList({
					data:{
						id:this.projectId
					},
					success:(res)=>{
						console.log('reqStory.getLikeList sucess',res);
						var likeList = res.filter(item=>item.action_id==1);
						likeList.forEach(item=>{
							var index =  list.findIndex(items=>items.id == item.story_id);
							list[index].hasLike =true;
						})
						that.commentData = {
							"readNumer": list.length,
							"commentSize": list.length,
							"comment": that.getTree(list)
						};
						console.log('commentData',list);
					},
					fail:(err)=>{
						console.log('reqStory.getLikeList fail',err);
					},
				})
			},
			getTree(data) {
				let result = [];
				let map = {};
				data.forEach(item => {
					map[item.id] = item;
				});
				data.forEach(item => {
					let parent = map[item.parentId];
					if (parent) {
						(parent.children || (parent.children = [])).push(item);
					} else {
						result.push(item);
					}
				});
				return result;
			}
		}
	}
</script>

<style>
</style>
