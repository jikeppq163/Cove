<template>
	<view class="">
		123
	</view>
</template>

<script>
export default{
	mounted() {
		var id = this.$route.query.id;
		if(!id) id='123';
		uni.request({
			url:'https://metamusic.toob.net.cn/cove.json?id='+id,
			success: (res) => {
				if(res.statusCode==200){
					console.log(res.data);
				}
				else{
					console.error('request error:',res)
				}
			}
		});
	}
}
</script>

<style>
</style>