<template>
	<view class="">
		<view class="u-p-10">
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change"
				@monthSwitch="monthSwitch" />
		</view>
		<view class="charts-box">
			<qiun-data-charts type="column" :chartData="column" />
			<qiun-data-charts type="pie" :chartData="pie" />
		</view>
	</view>
</template>

<script>
	/**
	 * 获取任意时间
	 */
	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)

		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}
	// 生成表单的 工具 https://demo.ucharts.cn/#/
	export default {
		data() {
			return {
				showCalendar: false,
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				column: {
					categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
					series: [{
						name: "目标值",
						data: [35, 36, 31, 33, 13, 34]
					}, {
						name: "完成量",
						data: [18, 27, 21, 24, 6, 28]
					}]
				},
				pie: {
					"series": [{
						"data": [{
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
					}]
				}
			}
		},
		methods: {
			change(e) {
				console.log('change 返回:', e)
				// 模拟动态打卡
				if (this.info.selected.length > 5) return
				this.info.selected.push({
					date: e.fulldate,
					info: '打卡'
				})
			}
		}
	}
</script>

<style>
</style>
