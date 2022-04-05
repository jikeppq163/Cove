<template>
	<view class="">
		<view class="u-p-20">
			<view class="u-p-20" v-for="item of audioList" :key='item.id' @click="handleClickChange(item)">
				{{item.name}}
			</view>
		</view>
		<button class="" type="primary" @click="handleClickPlay">播放</button>
		<button @click="handleClickStop">停止</button>
	</view>
</template>

<script>
	import {mapActions} from 'vuex';
	export default{
		data(){
			return{
				audioList:[
					{
						name:'gong_1',
						url:'https://tonejs.github.io/audio/berklee/gong_1.mp3',
						loop:true
					},
					{
						name:'nggyu',
						url:'https://picturelements.github.io/images/nggyu.mp3',
						loop:true
					}
				]
			}
		},
		mounted() {
			this.setPlayer({
				url:'https://picturelements.github.io/images/nggyu.mp3',
				loop:true
			});
		},
		methods:{
			...mapActions([
				'playerStart','setPlayer','playerStop'
			]),
			handleClickChange(value){
				this.setPlayer(value);
			},
			handleClickPlay(){
				this.playerStart();
			},
			handleClickStop(){
				this.playerStop();
			}
		}
	}
</script>

<style>
</style>