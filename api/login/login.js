
/**
 * 先拿到code
 * @param {Object} code
 */
function getCode(code){
	uni.request({
		url:'https://metamusic.toob.net.cn/api/oauth/wechat/oalogin?code='+code,
		header:[],
		method:'GET',
		success:(res)=>{
			if(res.state==200){
				//需要自己测试了
			}
		}
	})
}

function login(){
	
}


export default {
	getCode,login
}