# 需求背景和适用范围
app开发经常需要底部pop菜单，但往往遇到2类问题：
1. 前端的pop菜单无法覆盖原生对象，比如video、map，以及web-view等组件
2. 原生的actionsheet虽然可以覆盖其他原生组件，但样式不太灵活，无法放图标

而app开发经常用的底部分享菜单，往往是底部一排图标按钮。
其实在app下使用plus.nativeObj.view可以做出这样的效果。

本插件意在提供基于plus.nativeObj.view的底部图标菜单解决方案，希望这个轮子可以方便app开发者。
因h5和小程序都不会显示这种分享菜单，比如小程序里分享只有一个选项，不需要菜单，所以本模板仅适用于app开发，需要在真机上运行预览。

另外nvue下除非需要遮挡pages.json里配置的原生tabbar，否则不存在层级问题。

更新：除了本示例使用的plus.nativeObj.view技术，也可以使用弹出一个subnvue页面或者全屏nvue页面但其顶部半透明的方式做分享菜单。如果有复杂的排版需求，nvue的排版灵活度高于plus.nativeObj.view。

# 使用示例：
```
<template>
	<button type="default" @click="showImageMenu">显示底部图标菜单</button>
</template>
<script>
import uniImageMenu from 'uni_modules/uni-image-menu/js_sdk/uni-image-menu.js';
	export default {
		methods: {
			showImageMenu(){
				uniImageMenu.show({
					list:[
						{
							"img": "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/9a952c80-6080-11eb-a16f-5b3e54966275.png",
							"text": "uni-app"
						},
						{
							"img": "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/9a952c80-6080-11eb-a16f-5b3e54966275.png",
							"text": "uni-app"
						},
						{
							"img": "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/d84c6de0-6080-11eb-bdc1-8bd33eb6adaa.png",
							"text": "unicloud"
						},
						{
							"img": "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/9a952c80-6080-11eb-a16f-5b3e54966275.png",
							"text": "uni-app"
						}],
					cancelText:"取消"
				}, index => {
					uni.showToast({
						title: '你点了第'+(index+1)+'个图标',
						icon: 'none'
					});
				})
			}
		}
	}
</script>
```