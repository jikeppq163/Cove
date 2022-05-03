import {tansParams} from "../utils/func.js"

function uni_request({url,method,header,data,parmas,success,fail}){
	if(method=='GET') url = url + "?" + tansParams(parmas);
	uni.request({
		url:'https://metamusic.toob.net.cn/api'+url,
		header:header? header:[],
		method:method? method:'GET',
		data: data? data:'',
		success:(res)=>{
			if(res.state==200){
				//需要自己测试了
				if(success) success(res.data);
			}
			else{
				if(fail) fail(res);
			}
		},
		fail:(err)=>{
			if(fail) fail(err);
		}
	})
}

export default uni_request;
