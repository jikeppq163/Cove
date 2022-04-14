import request from 'request.js'
/**
 * 先拿到code
 * @param {Object} code
 */
function getCode(code,success){
	request({
		url:'https://metamusic.toob.net.cn/api/oauth/wechat/oalogin?code='+code
	},success)
}

function login(){
	
}


export default {
	getCode,login
}