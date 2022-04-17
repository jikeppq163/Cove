<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight">
		<view class="u-font-white">
			<view class="u-p-t-20 u-p-l-20 u-p-r-20 flex-row space-between">
				<view class="">
					<view class="u-font-size-20 u-p-3">
						此处标题
					</view>
					<view class="u-p-3">
						心情
					</view>
				</view>
				<view class="u-p-t-10">
					<view class="u-p-10 u-radius-5 u-bg-malandy2 text-center" style="height: 40px;width: 60px;"
						@click="handleClickPlay">
						<uni-icons type='videocam' size="30" color="#fff"></uni-icons>
					</view>
				</view>
			</view>
			<view class="u-p-l-20 u-p-r-20 flex-row space-between">
				<view class="u-p-3">
					2022-04-17 20:23
				</view>
				<view class="u-p-3">
					地址
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
	export default {
		name: 'comment-eg',
		data() {
			return {
				// 使用对象展开运算符将 getter 混入 computed 对象中
				...mapGetters(['defaultHeight', 'getWindowsHeight']),
				
				"reqFlag": false, // 请求标志，防止重复操作，true表示请求中
				//评论区
				commentData:{
					
				}
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
			//var id = this.$route.query.id;
			// if (!id) id = '123';
			// uni.request({
			// 	url: 'https://metamusic.toob.net.cn/cove.json?id=' + id,
			// 	success: (res) => {
			// 		if (res.statusCode == 200) {
			// 			console.log(res.data);
			// 			this.commentData = {
			// 			    "readNumer": res.data.readNumer,
			// 			    "commentSize": res.data.commentList.length,
			// 			    "comment": this.getTree(res.data.commentList)
			// 			}
			// 		} else {
			// 			console.error('request error:', res)
			// 		}
			// 	}
			// });
			
			this.getComment();
		},
		methods:{
			// 输入框聚焦
			focusOn() {
				this.checkLogin();
			},
			// 新增评论
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
				// let params = {
				// 	"articleId": this.articleId,
				// 	"pId": req.pId,
				// 	"content": req.content
				// }
				// this.$u.api.commentAdd(params).then(res => {
				// 	uni.showToast({
				// 		title: '操作成功！',
				// 		duration: 3000
				// 	});
				// 	this.$refs.hbComment.addComplete();
				// 	this.getComment();
				// 	this.reqFlag = false;
				// }).catch(res => {
				// 	this.reqFlag = false;
				// })
				// 下边假装请求成功
				this.reqFlag = false;
				this.$refs.hbComment.addComplete();
				this.getComment();
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
				// TODO 接入真实接口
				// this.$u.api.commentLike(commentId).then(res => {
				// 	this.$refs.hbComment.likeComplete(commentId);
				// 	this.reqFlag = false;
				// }).catch(res => {
				// 	this.reqFlag = false;
				// })
				// 下边假装请求成功
				this.reqFlag = false;
				this.$refs.hbComment.likeComplete(commentId);
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
				// TODO 接入真实接口
				// this.$u.api.commentDelete(commentId).then(res => {
				// 	this.reqFlag = false;
				// 	this.$refs.hbComment.deleteComplete(commentId);
				// }).catch(res => {
				// 	this.reqFlag = false;
				// })
				// 下边假装请求成功
				this.reqFlag = false;
				this.$refs.hbComment.deleteComplete(commentId);
			},
			// 获取评论
			getComment(articleId) {
				// TODO 接入真实接口
				// this.$u.api.commentList(articleId).then(res => {
				// this.commentData = {
				// 	"readNumer": res.readNumer,
				// 	"commentSize": res.commentList.length,
				// 	"comment": this.getTree(res.commentList)
				// };
				// }).catch(res => {})
				
				// 下边假装请求成功
				let res = {
					"readNumer": 193,
					"commentList": [{
							"id": 1,
							"owner": false,
							"hasLike": false,
							"likeNum": 2,
							"avatarUrl": "https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/15/95/31_avatar_max.jpg",
							"nickName": "超长昵称超长...",
							"content": "啦啦啦啦",
							"parentId": null,
							"createTime": "2021-07-02 16:32:07"
						},
						{
							"id": 2,
							"owner": false,
							"hasLike": false,
							"likeNum": 2,
							"avatarUrl": "https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/62/86/74_avatar_max.jpg",
							"nickName": "寂寞无敌",
							"content": "我是评论的评论",
							"parentId": 1,
							"createTime": "2021-07-02 17:05:50"
						},
						{
							"id": 4,
							"owner": true,
							"hasLike": true,
							"likeNum": 1,
							"avatarUrl": "https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/07/05/34_avatar_max.jpg",
							"nickName": "name111",
							"content": "评论啦啦啦啦啦啦啦啦啦啦",
							"parentId": null,
							"createTime": "2021-07-13 09:37:50"
						},
						{
							"id": 5,
							"owner": false,
							"hasLike": false,
							"likeNum": 0,
							"avatarUrl": "https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/15/95/31_avatar_max.jpg",
							"nickName": "超长昵称超长...",
							"content": "超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论",
							"parentId": null,
							"createTime": "2021-07-13 16:04:35"
						},
						{
							"id": 13,
							"owner": false,
							"hasLike": false,
							"likeNum": 0,
							"avatarUrl": "https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/93/95/05_avatar_max.jpg",
							"nickName": "超长昵称超长...",
							"content": "@寂寞无敌 你怕不是个大聪明",
							"parentId": 1,
							"createTime": "2021-07-14 11:01:23"
						}
					]
				};
				this.commentData = {
					"readNumer": res.readNumer,
					"commentSize": res.commentList.length,
					"comment": this.getTree(res.commentList)
				};
				console.log('this.commentData',this.commentData)
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
