<template>
	<view class="u-bg-malandy-g2 uni-scroll-view" :style="defaultHeight">
		<scroll-view scroll-y="true" class="u-p-t-5 u-font-gray4 uni-shadow-base"
			:style="'height:'+ (getWindowsHeight) +'px;'">
			<view class="uni-scroll-view-content">
					<view class="u-p-10">
					<view class="flex space-between u-font-gray4">
						<view class="">{{date}}</view>
						<view class="">{{time}}</view>
					</view>
					<view class="u-bg-malandy1 u-radius-3 u-font-gray4 u-p-10 u-m-t-10 u-font-size-12 shadow-blur" 
						:class="inputFocus=='title'? 'u-bg-malandy2':''" 
						@click="handleClickChangeInput('title')" >
						<view class="u-p-b-5">故事标题</view>
						<view class="">
							<input v-model="title" type="text" maxlength='100' placeholder='给今天的心情故事起个标题吧!' @blur="inputBlur('title')"/>
							<!-- <uni-easyinput class="u-bg-gray u-font-gray4" v-model="title" type="textarea" maxlength='200' auto-height @blur="inputBlur('title')"/> -->
						</view>
					</view>
					<view class="u-bg-malandy1 u-radius-3  u-font-gray4 u-p-10 u-m-t-20 u-font-size-12 shadow-blur"
						:class="inputFocus=='thoughts'? 'u-bg-malandy2':''" 
						@click= "handleClickChangeInput('thoughts')" >
						<view class="u-p-b-5">我的想法 (信念)</view>
						<view class="">
							<textarea v-model="thoughts" type="text" maxlength='300' auto-height :placeholder="'是什么想法或信念让你感受到了'+(project.rdata.mood.length>0?project.rdata.mood.join():'这样的情绪')+'？'" @blur="inputBlur('thoughts')"/>
							<!-- <uni-easyinput class="u-bg-gray u-font-gray4" v-model="thoughts" placeholder='可以问自己：我为什么会有这样的情绪或者那样的行为？在事情发生后，是什么导致了我出现这样的情绪或行为？我当时是怎么想的？反向检验：有了我所发现的信念，我还会期望感受到那种特定的结果吗？' type="textarea" maxlength='500' auto-height @blur="inputBlur('thoughts')"/> -->
						</view>
					</view>
					<view class="u-bg-malandy1 u-radius-3  u-font-gray4 u-p-10 u-m-t-20 u-font-size-12 shadow-blur"
						:class="inputFocus=='location'? 'u-bg-malandy2':''" 
						@click= "handleClickChangeInput('location')"
						>
						<view class="u-p-b-5">地址</view>
						<view class="">
							<input v-model="location" placeholder='例如: 家乡, 城市, 又或者是梦里, 某人的心中 ' type="text" maxlength='100' @blur="inputBlur('location')"/>
						</view>
					</view>
					<view class="u-radius-3  u-font-gray4 u-p-10 u-m-t-10 u-font-size-12" >
						<view class="u-p-b-5 text-center">认识你的想法和信念，感受情绪变化，记录此刻的心情</view>
					<!-- 	<view class="u-p-b-5 text-center">加些新标签吧.</view> -->
						<MoodList></MoodList>
					</view>
					<view class="">
						<view class="u-p-b-5 text-center u-font-gray4">你可以用一张图片表达你的心情</view>
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
					<view v-if='!uploadImage' class=" u-font-size-20 u-font-gray4 u-border-1 u-radius-20  u-p-10 u-m-b-60 uni-shadow-lg"  @click="handleClickNext">
						保存故事
					</view>
					<view v-if='uploadImage' class=" u-font-size-20 u-font-gray4 u-border-1 u-radius-20  u-p-10 u-m-b-60 uni-shadow-lg"
						>
						图片上传中...
					</view>
				</view>
			</view>
		</scroll-view>
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
				width:300,
				height:300,
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
		...mapGetters(['getWindowsHeight','defaultHeight'])
	},
	mounted() {
		var date = new Date();
		this.date = date.getFullYear() + '-' +(date.getMonth() + 1) + '-' + date.getDate();
		this.time = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
		
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
			// console.log('this.project.id',this.project.id)
			if(this.project.id < 1 || this.project.id == undefined){
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
	.textarea-placeholder {
		font-size: smaller;
	}
	.input-placeholder {
		font-size: smaller;
	}
</style>