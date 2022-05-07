import {tansParams} from "../utils/func.js"

function uni_request({url,method,header,data,params,success,fail}){
	var src ='';
	if(method=='GET' && params) src ='https://metamusic.toob.net.cn' + url + "?" + tansParams(params);
	else{
		src ='https://metamusic.toob.net.cn' + url
	}
	var openid = localStorage.getItem('openId');
	if(!data) data = {};
	if(openid) data.openid = localStorage.getItem('openId');
	console.log('url:',url,' method:',method,' 发送的数据:',data);
	uni.request({
		url:src,
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
					console.log('uni.request 服务接口出错',url,res);
					uni.showModal({
						title:'出错了:'+res.data.code,
						content:res.data,
						showCancel:false
					})
					if(fail) fail(res.data);
				}
			}
			else{
				console.log('uni.request 服务器故障',url,res);
				uni.showModal({
					title:'服务器故障:' + res.statusCode,
					content:res,
					showCancel:false
				})
				if(fail) fail(res);
			}
		},
		fail:(err)=>{
			console.log('uni.request 请求出错',url,res);
			if(fail) fail(err);
		}
	})
}

export default uni_request;
