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
				<view class="u-p-b-5">故事标题...</view>
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
					<input v-model="location" type="text" maxlength='100' @blur="inputBlur('location')"/>
				</view>
			</view>
			<view class="u-radius-3  u-font-white u-p-10 u-m-t-10 u-font-size-12" >
				<view class="u-p-b-5 text-center">认识你的想法和信念，感受情绪变化，记录此刻的心情</view>
			<!-- 	<view class="u-p-b-5 text-center">加些新标签吧.</view> -->
				<MoodList></MoodList>
			</view>
			<view class="">
				<view class="u-p-b-5 text-center u-font-white">你可以用一张图片表达你的心情</view>
				<view class="flex center">
					<uni-file-picker
						:value="fileLists" 
						return-type='object' 
						:imageStyles="imageStyles" 
						file-mediatype="image"
						limit='1'
						@select='selectImage'
					></uni-file-picker>
				</view>
			</view>
		</view>
		<view class="flex center u-m-t-20">
			<view v-if='!uploadImage' class="u-p-10 u-font-size-20 u-font-white u-border-1 u-radius-20 u-p-l-40 u-p-r-40 uni-shadow-lg" 
				@click="handleClickNext">
				保存故事
			</view>
			<view v-if='uploadImage' class="u-p-10 u-font-size-20 u-font-white u-border-1 u-radius-20 u-p-l-40 u-p-r-40 uni-shadow-lg"
				>
				图片上传中...
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
			uploadImage:false,
			imageStyles:{
				width:320,
				height:180,
				border:{
					color:"#fff",
					width:1,
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
					that.uploadImage = true;
					uni.uploadFile({
					  url: 'https://metamusic.toob.net.cn/api/h5/imgupdate?openId='+this.openId,
					  filePath: files.path,
					  name: 'file',
					  success(res) {
						  if(res.statusCode==200){
							  var {data,code} = JSON.parse(res.data);
							  if(code==200){
								  that.uploadImage = false;
								  that.setProjectImage(data);
							  }
						  }
						  else{
							  console.log('uni.uploadFile statusCode',res)
						  }
					  },
					  fail(res) {
						  that.uploadImage = false;
						  console.log('uni.uploadFile fail',res)
					  }
					})
				}
			}
		}
	}
}
</script>

<style>
</style>