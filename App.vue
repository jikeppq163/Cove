<script>
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: (res) => {
					console.log('Cove version:'+this.$store.state.version,res);
					this.$store.state.systemInfo = res;
				}
			})
		},
		onShow: function() {
			//console.log('App Show')
		},
		onHide: function() {
			//console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	@import '@/pages/css/common.scss';
	@import '@/pages/css/color.scss';
	
	@import '@/colorui/main.css';
	@import '@/colorui/icon.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
