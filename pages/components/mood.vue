<template>
	<scroll-view scroll-x="true" style='white-space: nowrap;' :scroll-into-view='into' scroll-with-animation="true" >
		<view class=" u-font-gray4">
			<view class="flex u-p-t-10" v-for="(items,indexs) in mood" :key='items.id' :class='!(indexs%2)? "u-p-l-20":""'>
				<view :id='item' class="u-m-10 u-p-5 u-p-l-20 u-p-r-20 u-radius-3 uni-border uni-shadow-lg animation-fade" 
					:class="findMood(item)!=-1? 'u-bg-gray u-font-skyblue':''"
					:style="[{animationDelay: (index + 1)*0.1 + 's'}]"
					v-for="(item,index) in items" :key='item.id'
					@click="handleClickMood(item)">
					{{item}}
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
import {mapState,mapGetters,mapMutations} from 'vuex'
export default{
	data(){
		return{
			into:''
		}
	},
	computed:{
		...mapState({
			mood:'mood',
			//选中的情绪列表
			project:'project'
		}),
		// 使用对象展开运算符将 getter 混入 computed 对象中
		...mapGetters(['findMood','defaultHeight'])
	},
	mounted() {
		this.into = 'Annoyed';
	},
	methods:{
		...mapMutations(['addMood','deleteMood']),
		handleClickMood(value){
			var index = this.project.rdata.mood.findIndex(item=>{
				return item === value
			});
			if(index == -1){
				this.addMood(value);
			}
			else{
				this.deleteMood(index);
			}
		},
	}
}
</script>

<style>
</style>