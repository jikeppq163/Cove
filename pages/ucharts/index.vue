<template>
	<view class="charts-box">
	    <qiun-data-charts type="column" :chartData="column" />
		<qiun-data-charts type="pie" :chartData="pie" />
	</view>
</template>

<script>
	// 生成表单的 工具 https://demo.ucharts.cn/#/
export default {
	data(){
		return{
			column:{
			  categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
			  series: [{
			    name: "目标值",
			    data: [35, 36, 31, 33, 13, 34]
			  }, {
			    name: "完成量",
			    data: [18, 27, 21, 24, 6, 28]
			  }]
			},
			pie:{
				"series": [
				      {
				          "data": [
				              {
				                  "name": "一班",
				                  "value": 50
				              },
				              {
				                  "name": "二班",
				                  "value": 30
				              },
				              {
				                  "name": "三班",
				                  "value": 20
				              },
				              {
				                  "name": "四班",
				                  "value": 18
				              },
				              {
				                  "name": "五班",
				                  "value": 8
				              }
				          ]
				      }
				  ]
			} 
		}
	}
}
</script>

<style>
</style>