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
import MoodList from '../../components/mood.vue'
export default {
	data(){
		return{
			show:false,
			date:'',
			time:'',
			inputFocus:'',
			location:'',
			thoughts:'',
			title:''
		}
	},
	components:{MoodList},
	computed:{
		...mapGetters(['defaultHeight'])
	},
	mounted() {
		var date = new Date();
		this.date = date.getFullYear() + '-' +(date.getMonth() + 1) + '-' + date.getDate();
		this.time = date.getHours() + ':' + date.getMinutes();
	},
	methods:{
		...mapActions(['saveInfo','saveProject']),
		handleClickNext(){
			this.saveInfo({
				title:this.title,
				thoughts:this.thoughts,
				location:this.location
			});
			this.saveProject();
			uni.switchTab({
				url:'../../index/index'
			})
		},
		handleClickChangeInput(value){
			this.inputFocus = value;
		},
		inputBlur(value){
			if(this.inputFocus==value) this.inputFocus = '';
		}
	}
}
</script>

<style>
</style>