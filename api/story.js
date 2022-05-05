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
	
	delete:function({id,success,fail}){
		request({
			url:"/h5/story/"+id,
			method:"DELETE",
			success,
			fail
		})
	},
	
	like:function({data,success,fail}){
		request({
			url:"/h5/story/"+data.id,
			method:"PUT",
			data,
			success,
			fail
		})
	},
	
	getLikeList:function({data,success,fail}){
		request({
			url:"/h5/myactions/"+data.id,
			method:"PUT",
			success,
			fail
		})
	},
	
	
	byProject:function({parmas,success,fail}){
		request({
			url:"/h5/story/" + parmas.storyId,
			method:"GET",
			parmas,
			success,
			fail
		})
	}
	
}

export default story