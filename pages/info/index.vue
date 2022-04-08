<template>
	<view class="u-bg-malandy-g2" :style="defaultHeight">
		<view class="text-center">
			<view class="u-font-size-20">
				{{project.title}}
			</view>
			<view class="u-p-3">
				{{project.location}}
			</view>
			<view class="u-p-3">
				{{getDate(project.date)}}
			</view>
			<view class="u-p-3">
				{{getTime(project.date)}}
			</view>
		</view>
		<view class="flex center">
			<view class="u-p-10 u-p-l-20 u-p-r-20 u-radius-5 u-bg-malandy1">
				<uni-icons type='videocam' size="20"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions,mapGetters,mapState} from 'vuex';
	export default {
		computed:{
			...mapState([
				'project'
			])
		},
		methods:{
			getDate(value){
				var date = new Date(value);
				var dates = date.getFullYear() + '-' +(date.getMonth() + 1) + '-' + date.getDate();
				return dates
			},
			getTime(value){
				var time = date.getHours() + ':' + date.getMinutes();
			}
		}
	}
</script>

<style>
</style>