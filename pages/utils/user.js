/**
 * 校验登录授权
 */
function authorize(fullPath){
	let openId = uni.getStorageSync('openId')? uni.getStorageSync('openId'):false;
	//let authDebug = localStorage.getItem('authDebug')*1;
	   //if (!openId && authDebug) {
		   console.log('authorize 未登录授权',openId,fullPath);
		   //保存当前路由地址，授权后还会跳到此地址
			sessionStorage.setItem('wxRedirectUrl',fullPath);
		   //请求微信授权,并跳转到 /auth 路由
			let appId = 'wx98f8c9efa066cb6e';
			//let servers = 'metamusic.toob.net.cn/index.html';
			// let ip = '192.168.31.251';
			let servers = 'https://metamusic.toob.net.cn/api/oauth/wechat/oalogin';
			// let servers = 'https://metamusic.toob.net.cn/index.html#/auth';
			let redirectUrl = encodeURIComponent(servers);
			let scope = 'snsapi_userinfo';
			var url=`https://open.weixin.qq.com/connect/oauth2/authorize?
			appid=${appId}
			&response_type=code
			&scope=${scope}
			&state=123
			&redirect_uri=${redirectUrl}#wechat_redirect`;
			window.location.href = url; 
			// var code = this.$route.query.code;
			// that.redirectUrl = redirectUrl;
			return false;
	  // } else {
			// console.log('authorize 已经登录',openId,fullPath);
			// return true;
	  // }
	  //return false;
}

/**
 * 登录验证
 */
function login(){
	if(localStorage.getItem('openId')){
		
	}
}

/**
 * 获取个人信息
 */
function getUserInfo(code,callback){
	uni.getStorage({
		key:'userInfo',
		success:(res)=>{
			console.log('getUserInfo getStorage',res);
			callback(res.data);
		}
	})
}

export default authorize
