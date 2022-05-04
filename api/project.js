import request from './request.js'

let project = {
	create: function ({data,success,fail}){
		request({
			url:"/h5/project",
			method:"POST",
			data,
			success,
			fail
		})
	},
	
	delete:function ({data,success,fail}){
		request({
			url:"/h5/project/"+data.id,
			method:"DELETE",
			success,
			fail
		})
	},
	
	updata:function({data,success,fail}){
		request({
			url:"/h5/project/"+data.id,
			method:"PUT",
			data,
			success,
			fail
		})
	},
	
	star:function ({params,success,fail}){
		request({
			url:"/h5/project/create",
			method:"GET",
			params,
			success,
			fail
		})
	},
	
	view:function({params,success,fail}){
		request({
			url:"/h5/project/5/edit",
			method:"GET",
			params,
			success,
			fail
		})
	},
	

	list:function({params,success,fail}){
		request({
			url:"/h5/project",
			method:"GET",
			params,
			success,
			fail
		})
	},
	
	share:function({id,success,fail}){
		request({
			url:"/h5/project/"+id,
			method:"GET",
			success,
			fail
		})
	}
}

export default project