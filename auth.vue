<template>
    <div></div>
</template>

<script>
export default {
  name: "Auth",
  async created() {
    // 如果连接中有微信返回的 code，则用此 code 调用后端接口，向微信服务器请求用户信息
    if (this.$route.query.code) {
      try {
        let redirectUrl = sessionStorage.getItem("wxRedirectUrl");
		uni.request({
			url:'https://metamusic.toob.net.cn/api/oauth/wechat/oalogin?code='+this.$route.query.code,
			success: (res) => {
				console.log('request api:',res);
				if(res.state==200){
					 //将一些信息存储到本地
					  const token = res.headers['access_token'];
					  localStorage.setItem('token', token)
					  localStorage.setItem("wxUserInfo", JSON.stringify(res.data.root));
					  localStorage.setItem("openId", res.data.root.openId);
					  uni.setStorage({
					  	key:'userInfo',
						data:JSON.stringify(res.data.root)
					  })  
				}
				console.log('request redirectUrl:',redirectUrl);
				// if(redirectUrl){
				// 	this.$router.replace(redirectUrl); //跳转到业务页面
				// }
				// else{
				 this.$router.replace("./pages/user/index");
				//}
			}
		})
      } catch (error) {
        console.log(error);
      }
    } else {
     // 如果不是从微信重定向过来的，没有带着微信的 code，则直接进入首页
      this.$router.replace("/");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>