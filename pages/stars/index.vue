<template>
	<view>
		<view class="u-p-10 bg-blue u-font-white view_animation">灰色</view>
	</view>
</template>

<script>
// 生成表单的 工具 https://demo.ucharts.cn/#/


export default {
	data(){
		return{
			
		}
	},
	mounted() {
		
	}
}
</script>

<style scope lang="scss">
	.view_animation{
		width:100px;
		height:50px;
		background:red;
		color:white;
		font-weight:bold;
		position:relative;
		animation:mymove 5s infinite;
		animation-timing-function:ease-in;
	}
	
	@keyframes mymove
	{
		from {left:-100px;top: -100px;}
		to {left:400px;top: 300px;}
	}
	
</style>

