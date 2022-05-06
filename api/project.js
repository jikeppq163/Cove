import request from './request.js'

const api = '/api/h5';

let project = {
	create: function ({data,success,fail}){
		request({
			url:api+"/project",
			method:"POST",
			data,
			success,
			fail
		})
	},
	
	delete:function ({data,success,fail}){
		request({
			url:api+"/project/"+data.id,
			method:"DELETE",
			success,
			fail
		})
	},
	
	updata:function({data,success,fail}){
		request({
			url:api+"/project/"+data.id,
			method:"PUT",
			data,
			success,
			fail
		})
	},
	
	star:function ({success,fail}){
		request({
			url:api+"/project/create",
			method:"GET",
			success,
			fail
		})
	},
	
	view:function({params,success,fail}){
		request({
			url:api+"/project/5/edit",
			method:"GET",
			params,
			success,
			fail
		})
	},
	

	list:function({params,success,fail}){
		request({
			url:api+"/project",
			method:"GET",
			params,
			success,
			fail
		})
	},
	
	share:function({id,success,fail}){
		request({
			url:api+"/project/"+id,
			method:"GET",
			success,
			fail
		})
	},
	
	
	image:function({params,success,fail}){
		request({
			url:api+"/imgapi",
			method:"GET",
			params,
			success,
			fail
		})
	},
	
	imageUpdata:function ({data,success,fail}){
		request({
			url:api+"/imgupdate",
			method:"POST",
			data,
			success,
			fail
		})
	},
}

export default project