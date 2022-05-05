import {tansParams} from "../utils/func.js"

function uni_request({url,method,header,data,params,success,fail}){
	if(method=='GET' && params) url ='https://metamusic.toob.net.cn/api' + url + "?" + tansParams(params);
	else{
		url ='https://metamusic.toob.net.cn/api' + url
	}
	console.log('parmas',url);
	if(!data) data = {};
	data.openid = localStorage.getItem('openId');
	console.log('url:',url,' method:',method,' 发送的数据:',data);
	uni.request({
		url,
		header:header? header:{},
		method:method? method:'GET',
		data,
		success:(res)=>{
			if(res.statusCode==200){
				//需要自己测试了
				if(res.data.code==200){
					if(success) success(res.data.data);
				}
				else{
					uni.showModal({
						title:'出错了:'+res.data.code,
						content:res.data.msg,
						showCancel:false
					})
					if(fail) fail(res.data);
				}
			}
			else{
				uni.showModal({
					title:'服务器故障:' + res.statusCode,
					content:res,
					showCancel:false
				})
				if(fail) fail(res);
			}
		},
		fail:(err)=>{
			if(fail) fail(err);
		}
	})
}

export default uni_request;
