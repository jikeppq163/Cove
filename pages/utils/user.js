/**
 * 校验登录授权
 */
function authorize(fullPath){
	let openId = localStorage.getItem('openId');
	   if (localStorage.getItem('authDebug') || !openId) {
	       //保存当前路由地址，授权后还会跳到此地址
			sessionStorage.setItem('wxRedirectUrl',fullPath);
	       //请求微信授权,并跳转到 /auth 路由
	        let appId = 'wx98f8c9efa066cb6e';
			//let servers = 'metamusic.toob.net.cn/index.html';
			let ip = '192.168.31.17';
			//let servers = 'metamusic.toob.net.cn/ttt?url='+ip;
			let servers = 'metamusic.toob.net.cn/index.html#/auth';
	        let redirectUrl = encodeURIComponent(`https://${servers}`);
			let scope = 'snsapi_userinfo';
			var url=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&response_type=code&scope=${scope}&state=123&redirect_uri=${redirectUrl}#wechat_redirect`;
			console.log('authorize',url);
			//window.location.href = url;
			return false;
	  } else {
			return true;
	  }
	  return false;
}

/**
 * 登录验证
 */
function login(){
	
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
