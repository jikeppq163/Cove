<template>
	<hb-comment ref="hbComment" @add="add" @del="del" @like="like" @focusOn="focusOn" :deleteTip="'确认删除？'"
		:cmData="commentData" v-if="commentData"></hb-comment>
</template>

<script>
import {mapState,mapActions} from "vuex";
import reqStory from "@/api/story.js";
export default {
	data(){
		return{
			openId:localStorage.getItem('openId')? localStorage.getItem('openId'):'',
			projectId:-1,
			commentData: {
				
			},
			reqFlag:false
		}
	},
	mounted(){
		this.projectId = this.$route.query.id;
		//测试用
		if (!this.projectId) this.projectId = '17';
		if(this.projectId){
			this.getComment(this.projectId);
		}
	},
	computed:{
		...mapState(['userInfo'])
	},
	methods:{
		...mapActions(['getLoginStatus']),
		// 输入框聚焦
		focusOn() {
			this.getLoginStatus();
		},
		// 新增评论 改为分享你的故事 - 他的心情很「XX」，分享你的故事，帮帮Ta
		add(req) {
			if (!this.getLoginStatus()) {
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
				nickname:this.userInfo.nickname,
				parent_id:req.pId,
			}
			//console.log('data',data);
			reqStory.create({
				data,
				success:(res)=>{
					//console.log('reqStory.create',res);
					// 下边假装请求成功
					this.reqFlag = false;
					this.$refs.hbComment.addComplete();
					this.getComment(this.projectId);
				},
				fail:(err)=>{
					console.log('reqStory.create fail',err);
				}
			})
		},
		// 点赞评论
		like(commentId) {
			if (!this.getLoginStatus()) {
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
					//console.log('reqStory.like success',res);
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
			if (!this.getLoginStatus()) {
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
					storyId: articleId,
					project_id:that.projectId
				},
				success:(res)=>{
					//console.log('reqStory.byProject success',res);
					// 下边假装请求成功
					var list = [];
					var openId = this.openId;
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
					//console.log('reqStory.getLikeList sucess',res);
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
					//console.log('reqStory.getLikeList sucess',list);
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
		},
	}
}
</script>

<style>
</style>