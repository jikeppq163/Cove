import request from './request.js'

let project = {
	create: function ({data,success,fail}){
		request({
			url:"/project/5",
			method:"POST",
			data,
			success,
			fail
		})
	},
	
	delete:function ({data,success,fail}){
		request({
			url:"/h5/project/5",
			method:"DEL",
			data,
			success,
			fail
		})
	},
	
	update:function({data,success,fail}){
		request({
			url:"/h5/project/5",
			method:"POST",
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
	

	list:function({data,success,fail}){
		request({
			url:"/h5/project",
			method:"DEL",
			data,
			success,
			fail
		})
	},
	
	share:function({params,success,fail}){
		request({
			url:"/h5/project/5",
			method:"GET",
			params,
			success,
			fail
		})
	}
}

export default project