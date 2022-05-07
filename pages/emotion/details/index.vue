<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight">
		<view class="u-p-10">
			<view class="flex space-between u-font-white">
				<view class="">{{date}}</view>
				<view class="">{{time}}</view>
			</view>
			<view class="u-bg-malandy1 u-radius-3  u-font-white u-p-10 u-m-t-10 u-font-size-12 shadow-blur" 
				:class="inputFocus=='title'? 'u-bg-malandy2':''" 
				@click="handleClickChangeInput('title')"
				>
				<view class="u-p-b-5">作品标题...</view>
				<view class="">
					<input v-model="title" type="text" maxlength='100' @blur="inputBlur('title')"/>
				</view>
			</view>
			<view class="u-bg-malandy1 u-radius-3  u-font-white u-p-10 u-m-t-20 u-font-size-12 shadow-blur"
				:class="inputFocus=='thoughts'? 'u-bg-malandy2':''" 
				@click= "handleClickChangeInput('thoughts')"
				>
				<view class="u-p-b-5">你可以记录下你的想法...</view>
				<view class="">
					<textarea v-model="thoughts" type="text" maxlength='300' auto-height  @blur="inputBlur('thoughts')"/>
				</view>
			</view>
			<view class="u-bg-malandy1 u-radius-3  u-font-white u-p-10 u-m-t-20 u-font-size-12 shadow-blur"
				:class="inputFocus=='location'? 'u-bg-malandy2':''" 
				@click= "handleClickChangeInput('location')"
				>
				<view class="u-p-b-5">地址</view>
				<view class="">
					<input v-model="location" type="text" maxlength='100'  @blur="inputBlur('location')"/>
				</view>
			</view>
			<view class="u-radius-3  u-font-white u-p-10 u-m-t-10 u-font-size-12"
				>
				<view class="u-p-b-5 text-center">你觉得心情好点了吗?</view>
				<view class="u-p-b-5 text-center">加些新标签吧.</view>
				<MoodList></MoodList>
			</view>
			<view class="">
				<view class="u-p-b-5 text-center u-font-white">你可以用一张图片表达你的心情</view>
				<uni-file-picker
					:value="fileLists" 
					return-type='object' 
					:imageStyles="imageStyles" 
					file-mediatype="image"
					limit='1'
					@select='selectImage'
				></uni-file-picker>
			</view>
			<view v-if='imageUrl' class="u-m-t-20 u-bg-maka-g text-center u-font-gray2 shadow-lg" style="width: 700rpx;height: 400rpx;">
				<image :src="imageUrl" mode="aspectFill" style="width: 100%; height: 100%;"></image>
			</view>
		</view>
		<view class="flex center">
			<view class="u-p-10 u-font-size-20 u-font-white u-border-1 u-radius-20 u-p-l-40 u-p-r-40 uni-shadow-lg" 
				@click="handleClickNext">
				保存
			</view>
		</view>
	</view>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
import MoodList from '@/pages/components/mood.vue';
import reqProject from "@/api/project.js";
export default {
	data(){
		return{
			show:false,
			date:'',
			time:'',
			inputFocus:'',
			location:'',
			thoughts:'',
			title:'',
			imageUrl:'',
			//image 上传组件
			fileLists:{},
			imageStyles:{
				width:64,
				height:64,
				border:{
					color:"#ff5a5f",
					width:2,
					style:'dashed',
					radius:'2px'
				}
			}
		}
	},
	components:{MoodList},
	computed:{
		...mapState(['openId','project']),
		...mapGetters(['defaultHeight'])
	},
	mounted() {
		var date = new Date();
		this.date = date.getFullYear() + '-' +(date.getMonth() + 1) + '-' + date.getDate();
		this.time = date.getHours() + ':' + date.getMinutes();
		if(this.project.id!=-1){
			this.title = this.project.rdata.title;
			this.location = this.project.rdata.location;
			this.thoughts = this.project.rdata.thoughts;
		}
	},
	methods:{
		...mapMutations(['setProjectImage']),
		...mapActions(['saveInfo','saveProject']),
		handleClickNext(){
			this.saveInfo({
				title:this.title,
				thoughts:this.thoughts,
				location:this.location
			});
			var data = {};
			data.id = this.project.id;
			data.openid = this.openId;
			data.rdata = JSON.stringify(this.project.rdata);
			if(this.project.id ==-1){
				reqProject.create({
					data:data,
					success:(res)=>{
						console.log('reqProject.create success:',res);
						uni.switchTab({
							url:'/pages/index/index'
						})
					},
					fail:(err)=>{
						console.log('reqProject.create fail:',err);
					}
				})
			}
			else{
				reqProject.updata({
					data:data,
					success:(res)=>{
						console.log('reqProject.create success:',res);
						uni.switchTab({
							url:'/pages/index/index'
						})
					},
					fail:(err)=>{
						console.log('reqProject.create fail:',err);
					}
				})
			}
			//this.saveProject();
		},
		handleClickChangeInput(value){
			this.inputFocus = value;
		},
		inputBlur(value){
			if(this.inputFocus==value) this.inputFocus = '';
		},
		selectImage(e){
			var that = this;
			console.log('selectImage',e);
			if(e.tempFiles[0]){
				var files =e.tempFiles[0];
				if(files.name){
					var data = {
						url:'https://metamusic.toob.net.cn/api/h5/imgupdate?openId='+this.openId,
						file:files.file,
						filePath:files.path,
						name:files.name,
						header:{
							"Content-Type":"multipart/form-data"
						}
					};
					console.log('uploadFile',data);
					uni.uploadFile(data)
					.then(res=>{
						console.log('uni.uploadFile success:',res);
						//that.setProjectImage();
					})
					.catch(err=>{
						console.log('uni.uploadFile error:',err);
					})
				}
			}
		}
	}
}
</script>

<style>
</style>