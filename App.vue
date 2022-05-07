<script>
//	import Eruda from 'eruda'
	export default {
		onLaunch: function() {
			// Eruda.init();
			//获取设备基础信息
			uni.getSystemInfo({
				success: (res) => {
					console.log('Cove version:'+this.$store.state.version,res);
					this.$store.commit('setSystemInfo',res);
				}
			})
			//初始化音频
			this.$store.dispatch('initPlayer');
			//获取存储的数据
			this.$store.dispatch('getProject');
			
			if(true){ //测试
				uni.showToast({
					title:'测试模式'+ this.$store.state.version
				})
				localStorage.setItem('authDebug',1);
				localStorage.setItem('openId','333');
				this.$store.commit('setOpenId','333');
			}
			else{ //正式
				var test = localStorage.getItem('openId');
				if(test=='333') localStorage.setItem('openId','');
				localStorage.setItem('authDebug',0);
				this.$store.dispatch('getLoginStatus');
			}
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
	
	@import '@/colorui/animation.css';
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
