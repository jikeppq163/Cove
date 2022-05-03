import request from './request.js'

let story = {
	create:function({data,success,fail}){
		request({
			url:"/h5/story",
			method:"POST",
			data,
			success,
			fail
		})
	},
	
	delete:function({data,success,fail}){
		request({
			url:"/h5/story/5",
			method:"DEL",
			data,
			success,
			fail
		})
	},
	
	like:function({data,success,fail}){
		request({
			url:"/h5/story/2",
			method:"PUT",
			data,
			success,
			fail
		})
	},
	
	byProject:function({parmas,success,fail}){
		request({
			url:"/h5/story/5",
			method:"GET",
			parmas,
			success,
			fail
		})
	}
	
}

export default story