import request from './request.js'

const api = '/api/h5';

let story = {
	create:function({data,success,fail}){
		request({
			url: api +"/story",
			method:"POST",
			data,
			success,
			fail
		})
	},
	
	delete:function({id,success,fail}){
		request({
			url:api +"/story/"+id,
			method:"DELETE",
			success,
			fail
		})
	},
	
	like:function({data,success,fail}){
		request({
			url:api +"/story/"+data.id,
			method:"PUT",
			data,
			success,
			fail
		})
	},
	
	getLikeList:function({data,success,fail}){
		request({
			url:api +"/myactions/"+data.id,
			method:"PUT",
			success,
			fail
		})
	},
	
	
	byProject:function({parmas,success,fail}){
		request({
			url:api +"/story/" + parmas.storyId,
			method:"GET",
			parmas,
			success,
			fail
		})
	}
	
}

export default story