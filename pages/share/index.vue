<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight">
		<view class="u-font-white">
			<view class="u-p-t-20 u-p-l-20 u-p-r-20 flex-row space-between">
				<view class="">
					<view class="u-font-size-20 u-p-3">
						{{project.title}}
					</view>
					<view class="u-p-3">
						{{project.thoughts}}
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
				<uni-dateformat :date="project.create_at" :threshold = "[60000,3600000]"></uni-dateformat>
				<view class="">
					<uni-icons type="location" color='#fff'></uni-icons>
					{{project.location}}
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
				project:{
					mood:[],
					audio:'',
					volume:10,
					synth:[],
					title:'疫情当下, 我们物业保安太难了',
					thoughts:'疫情期间, 每天都得与各种各样的业主打交道，挨骂、遭受抱怨已经成了家常便饭，只要业主有需要，物业人就得到，电话24小时开机，生怕错过一个电话遭到投诉，没有一刻敢让自己放松下来。',
					location:'深圳',
					create_at:'2021-03-19 12:43'
				},
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
				// 成语标签, https://wenku.baidu.com/view/689f4cf558fb770bf68a55a6.html
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
					"commentList": 
[{
	"id": 1,
	"owner": true,
	"hasLike": true,
	"likeNum": 239,
	"avatarUrl": "https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/15/95/31_avatar_max.jpg",
	"nickName": "粤语guo",
	"content": "2020年抗疫，我加入青年突击队。2021年除夕夜独自一人吃泡面守着卡口。2022年10月，我的家乡又被疫情袭扰，因个人原因无法继续和战友们并肩作战。但我时刻牵挂着他们，我心与他们同在！我们一定会驱散阴霾！战友们，加油吧！为了人民安居乐业，为了人民幸福的笑脸！越是艰险越向前，理想信念高过天！",
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
	"content": "加油加油",
	"parentId": 1,
	"createTime": "2021-07-02 17:05:50"
},
{
	"id": 4,
	"owner": true,
	"hasLike": true,
	"likeNum": 51,
	"avatarUrl": "https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/07/05/34_avatar_max.jpg",
	"nickName": "name111",
	"content": "疫情当下，需要大家的理解和支持，物业不是万能的，他们也不是神，每天超负荷的工作量，疲惫劳累，让我们给他们一个微笑！",
	"parentId": null,
	"createTime": "2021-07-13 09:37:50"
},
{
	"id": 5,
	"owner": false,
	"hasLike": false,
	"likeNum": 90,
	"avatarUrl": "https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/15/95/31_avatar_max.jpg",
	"nickName": "guv.",
	"content": "兄弟, 我作为小区业主, 第一时间参加报名参加核酸点志愿者, 现在也在一线抗疫, 一起加油, 疫情终究会消散!",
	"parentId": null,
	"createTime": "2021-07-13 16:04:35"
},
{
	"id": 13,
	"owner": false,
	"hasLike": false,
	"likeNum": 0,
	"avatarUrl": "https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/93/95/05_avatar_max.jpg",
	"nickName": "粤语guo",
	"content": "@寂寞无敌 谢谢",
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
