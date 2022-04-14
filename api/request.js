

function uni_request({url,method,header,success,fail}){
	uni.request({
		url,
		header:header? header:[],
		method:method? method:'GET',
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
