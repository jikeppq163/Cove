let configURL = {}
const NODE_ENV = 'prod'; // prod:生产环境 | test:测试环境  
const INTERFACE = '/api/'
let applyNodeEnv = '' //保存当前环境

if (process.env.NODE_ENV === "development") {
	//本地环境(小程序调试时请勾选不检验合法域名，且手机无法调试，需要调试，请修改此地址为外网地址)
	const domainName = 'https://localhost'
	configURL = {
		// 腾讯地图的key，参考：https://lbs.qq.com/service/webService/webServiceGuide/webServiceGeocoder
		lbsQq: '',
		DomainName: domainName,
		BaseURL: domainName +INTERFACE,	//api_URL
		secret: 'base64:5ystCkgsivTkMMT3XKPySXwdoUMqaTFJ5AB2dA0TX54='
	}
	applyNodeEnv = 'dev'
} else {
	// if (NODE_ENV === 'test') {
	// 	//测试环境
	// 	const domainName = 'https://localhost'
	// 	configURL = {
	// 		lbsQq: '',
	// 		DomainName: domainName,
	// 		BaseURL: domainName +INTERFACE,
	// 		secret: 'base64:5ystCkgsivTkMMT3XKPySXwdoUMqaTFJ5AB2dA0TX54='
	// 	}
	// 	applyNodeEnv = 'test'
	// }else{
		//生产环境
		const domainName = 'https://metamusic.toob.net.cn'
		configURL = {
			lbsQq: '',
			DomainName: domainName,
			BaseURL: domainName +INTERFACE,
			secret: 'base64:5ystCkgsivTkMMT3XKPySXwdoUMqaTFJ5AB2dA0TX54='
		}
		applyNodeEnv = 'prod'
	// }
}
if(applyNodeEnv !== uni.getStorageSync('applyNodeEnv')){	//如果当前环境和上一次环境不同，则清空缓存
	uni.clearStorageSync()
	uni.setStorageSync('applyNodeEnv', applyNodeEnv)
}
export default configURL
