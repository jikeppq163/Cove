/**
 * 获取验证信息
 */
function auth(){
	
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
		success:(res){
			console.log('getUserInfo getStorage',res);
			callback(res.data);
		}
	})
}

export default {getUserInfo}