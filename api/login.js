import request from './request.js'

const api = '/api/h5';

/**
 * 先拿到code
 * @param {Object} code
 */
const getCode=(code, success)=>{
	request({
		url: '/oauth/wechat/oalogin?code=' + code
	}, success)
}

const getUserinfo=({openId,success,fail})=>{
	request({
		url:api+"/user/"+openId,
		method:"GET",
		success,
		fail
	})
}

const login=({url,success,fail})=>{
	request({
		url: '/oauth/wechat/oalogin?code=' + code,
		success: (res) => {
			console.log('wxChat login:', res);
			if (res.state == 200) {
				//将一些信息存储到本地
				const token = res.headers['access_token'];
				localStorage.setItem('token', token);
				localStorage.setItem("wxUserInfo", JSON.stringify(res.data.root));
				localStorage.setItem("openId", res.data.root.openId);
				uni.setStorage({
					key: 'openId',
					data: res.data.root.openId
				})
				uni.setStorage({
					key: 'userInfo',
					data: JSON.stringify(res.data.root)
				});
				success(res.data.root);
			} else {
				fail(res)
			}
		}
	})
}


export default {
	getCode,
	login,
	getUserinfo
}
