<template>
	<view>
        <u-popup :show="loginPopupShow" mode="bottom" borderRadius="15" @close="closeLogin" zIndex="999998">
            <view class="f__login">
                <view class="loginLoading" v-if="isLoading">
                    <u-loadmore status="loading" loadingText="正在登录..."></u-loadmore>
                </view>
                <view class="logo">
                    <image class="img" src="/static/logo.png"></image>
                </view>
                <view class="title">欢迎登录~</view>
                <view class="text">会员用户登录后消费可享受折扣，享受更好的服务体验</view>
                <view class="loginButton" v-if="!isPhoneLogin">
                    <!-- #ifdef MP-WEIXIN -->
                    <button class="button" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber" :style="{background:PrimaryColor}">微信手机号登录</button>
                    <button class="button marginT" @click="onAuthorization" :style="{background:PrimaryColor}">微信一键登录</button>
                    <!-- #endif -->
                    <!-- #ifdef MP-ALIPAY -->
                    <button class="button" open-type="getAuthorize" scope="phoneNumber" @getAuthorize="decryptPhoneNumber" @error="onAuthError" :style="{background:PrimaryColor}">支付宝手机号登录</button>
                    <button class="button marginT" open-type="getAuthorize" scope="userInfo" @getAuthorize="onAuthorization" :style="{background:PrimaryColor}">支付宝一键登录</button>
                    <!-- #endif -->
                    <button class="button" @click="closeLogin" style="background:#fff;margin-top:24rpx;" :style="{border:'2rpx solid '+PrimaryColor,color:PrimaryColor}">
                        暂不登录
                    </button>
                </view>
                <!-- 验证码登录 -->
                <view class="loginPhone" v-if="isPhoneLogin">
                    <view class="form-row">
                        <input class="input" type="number" v-model="phone" placeholder="请输入手机号码" placeholder-style="font-weight:normal;color:#bbbbbb;"></input>
                    </view>
                    <view class="form-row">
                        <input class="input" type="number" v-model="vCode" placeholder="请输入验证码" placeholder-style="font-weight:normal;color:#bbbbbb;"></input>
                        <view class="getvcode" :class="{forhidden:readonly}" @click="getVcode">{{ codeText }}</view>
                    </view>
                    <button class="submit" size="default" @click="onSubmit" :style="{background:PrimaryColor}">确定</button>
                </view>
                <!-- #ifdef MP -->
                <!-- 快速登录和手机号登录切换 -->
                <view class="tips">
                    <view @click="isPhoneLogin = !isPhoneLogin" class="goBuy" :style="{color:PrimaryColor}">{{isPhoneLogin?'快速登录':'手机号登录'}}</view>
                </view>
                <!-- #endif -->
            </view>
        </u-popup>
        
	</view>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
// #ifdef MP
import { getPhoneInfo,getUserInfo } from './f-login.js';
// #endif
var clear;
export default {
    computed: {
    	...mapState(['loginPopupShow']),
    },
	data() {
		return {
            // #ifndef MP-ALIPAY
            PrimaryColor: '#1fba1a', //主题色
            // #endif
            // #ifdef MP-ALIPAY
            PrimaryColor: '#007AFF',
            // #endif
            // #ifdef APP-PLUS
            isLoading:false,
            isPhoneLogin:true,//是否显示验证码登录
            // #endif
            // #ifndef APP-PLUS
            isLoading:true,
            isPhoneLogin:false,//是否显示验证码登录
            // #endif
            readonly: false,
            codeText: '获取验证码',
            phone: '',
            vCode: '',
            code: '',
		};
	},
    watch:{
        // #ifdef MP
        loginPopupShow(val){
            // 默认静默登录
            val && this.getLoginByUnion()
        }
        // #endif
    },
	methods: {
        ...mapMutations(['setLoginPopupShow']),
        //个人信息授权登录
        onAuthorization(e) {
            getUserInfo(info=>{
                console.log(info,'授权信息')
                let httpData = {
                    code: this.code,
                    nickName: info.nickName || '', //昵称
                    nickName: info.avatarUrl || '', //头像
                }
                // this.$http.get('您的接口', httpData).then(res => {
                    setTimeout(()=>{
                        uni.showToast({
                        	title: '登录成功',
                        	icon: 'none'
                        });
                        this.closeLogin();
                    },100)
                // })
            },err=>{
                // this.closeLogin();
            })
        },
        //授权手机号登录
        decryptPhoneNumber(e) {
            console.log(e,'授权手机号')
            var that = this
            // #ifdef MP-WEIXIN
			if(e.detail.errMsg == 'getPhoneNumber:ok'){
                if(e.detail.iv){
                    var userInfo = e.detail;
                    userInfo.code = this.code
                    this.closeLogin();
                    getPhoneInfo(userInfo, 'authorized', res=>{
                        // this.$http.get('您的接口', httpData).then(res => {
                            setTimeout(()=>{
                                uni.showToast({
                                	title: '登录成功',
                                	icon: 'none'
                                });
                                this.closeLogin();
                            },100)
                        // })
                    });
                }else{
                    // 授权失败请使用验证码登录
                    this.isPhoneLogin = true
                    uni.showToast({
                    	title: '请使用手机号登录',
                    	icon: 'none'
                    });
                }
			}else{
                // this.closeLogin()
            }
            // #endif
            
            // #ifdef MP-ALIPAY
            uni.getPhoneNumber({
                success:(res)=>{
                    getPhoneInfo(res.response, 'authorized', res=>{
                        // that.$http.get('您的接口', httpData).then(res => {
                            setTimeout(()=>{
                                uni.showToast({
                                	title: '登录成功',
                                	icon: 'none'
                                });
                                that.closeLogin();
                            },100)
                        // })
                    }, err=>{
                        // 授权失败请使用验证码登录
                        that.isPhoneLogin = true
                        uni.showToast({
                        	title: '授权登录失败,请使用手机号登录',
                        	icon: 'none'
                        });
                    });
                },
                fail:(res)=>{
                    // 授权失败请使用验证码登录
                    that.isPhoneLogin = true
                    uni.showToast({
                    	title: '授权登录失败,请使用手机号登录',
                    	icon: 'none'
                    });
                }
            })
            // #endif
		},
        // 支付宝拒绝
        onAuthError(e){
            uni.showToast({
            	title: '您已拒绝授权~',
            	icon: 'none'
            });
        },
		closeLogin(){
            console.log('closeLogin')
            this.setLoginPopupShow(false);
            // #ifdef APP-PLUS
            this.isLoading = false
            this.isPhoneLogin = true//是否显示验证码登录
            // #endif
            // #ifndef APP-PLUS
            this.isLoading = true
            this.isPhoneLogin = false//是否显示验证码登录
            // #endif
		},
        // 自动静默登录----获取code
        // 静默登录：就是已经登录过的用户，被迫下线。调用此接口快速登录
        getLoginByUnion(){
            console.log("自动静默登录--自定义接口--")
            var that = this
            uni.login({
                success(res){
                    console.log(res, "获取code")
                    that.code = res.code
                    let httpData = {
                        code: res.code,
                    }
                    // that.$http.get('您的接口', httpData).then(res => {
                        setTimeout(()=>{
                            // 自动静默登录失败--打开手动登录
                            that.isLoading = false
                        },500)
                    // }).catch(()=>{
                    //     // 自动静默登录失败--打开手动登录
                    //     that.isLoading = false
                    // })
                }
            })
        },
        //验证码按钮文字状态
        getCodeState() {
        	const _this = this;
        	this.readonly = true;
        	this.codeText = '60S后重新获取';
        	var s = 60;
        	clear = setInterval(() => {
        		s--;
        		_this.codeText = s + 'S后重新获取';
        		if (s <= 0) {
        			clearInterval(clear);
        			_this.codeText = '获取验证码';
        			_this.readonly = false;
        		}
        	}, 1000);
        },
        //获取验证码
        getVcode(){
        	if (this.readonly) {
                uni.showToast({
                	title: '验证码已发送~',
                	icon: 'none'
                });
        		return;
        	}
        	if (this.phone == '') {
                uni.showToast({
                	title: '请输入手机号~',
                	icon: 'none'
                });
        		return;
        	}
            const phoneRegular = /^1\d{10}$/;
        	if (!phoneRegular.test(this.phone)) {
                uni.showToast({
                	title: '手机号格式不正确~',
                	icon: 'none'
                });
        		return;
        	}
            let httpData = {}
            // 获取验证码接口
            // this.$http.post('您的接口', httpData).then(res => {
                this.getCodeState(); //开始倒计时
            // })
        },
        // 手机号登录
        onSubmit() {
        	if (this.phone == '') {
                uni.showToast({
                	title: '请输入手机号~',
                	icon: 'none'
                });
        		return;
        	}
            const phoneRegular = /^1\d{10}$/;
        	if (!phoneRegular.test(this.phone)) {
                uni.showToast({
                	title: '手机号格式不正确~',
                	icon: 'none'
                });
        		return;
        	}
        	if (this.vCode == '') {
                uni.showToast({
                	title: '请输入验证码~',
                	icon: 'none'
                });
        		return;
        	}
        	let httpData = {};
        	// this.$http.post('您的接口',httpData).then(res => {
                uni.showToast({
                	title: '登录成功~',
                	icon: 'none'
                });
            // });
        }
        
        
        
        
        
        
        
	}
};
</script>

<style lang="scss" scoped>
.f__login {
    padding: 48rpx 32rpx;
    border-radius: 18rpx 18rpx 0 0;
    z-index: 99;
    position: relative;
    .loginLoading {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, .95);
        z-index: 999;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .logo {
        width: 90rpx;
        height: 90rpx;
        border-radius: 18rpx;
        overflow: hidden;
        .img {
            width: 90rpx;
            height: 90rpx;
        }
    }
    .title {
        font-size: 40rpx;
        font-weight: bold;
        margin-top: 24rpx;
    }
    .text {
        font-size: 24rpx;
        color: #666;
        margin-top: 16rpx;
    }
    .loginButton {
        margin-top: 56rpx;
        .button {
            color: #fff;
            width: 100%;
            height: 92rpx;
        }
        .marginT{
            margin-top: 24rpx;
        }
    }
    .tips {
        margin-top: 24rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .left {
            display: flex;
            flex-direction: row;
        }
        .goBuy {
            font-size: 24rpx;
            /* margin-left: 16rpx; */
            background: none;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            padding: 0;
            margin: 0;
            color: #1fba1a;
        }
    }
}
.loginPhone{
    .form-row {
        position: relative;
        border-bottom: 1rpx solid #e8e8e8;
        line-height: 1;
        margin-top: 24rpx;
        .input{
            font-size: 34rpx;
            line-height: 102rpx;
            height: 94rpx;
            width: 100%;
            box-sizing: border-box;
            font-size: 30rpx;
            padding: 0;
            font-weight: bold;
        }
        .getvcode {
            font-size: 26rpx;
            height: 80rpx;
            color: #333;
            line-height: 80rpx;
            background: #eee;
            min-width: 188rpx;
            text-align: center;
            border-radius: 8rpx;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
            z-index: 11;
            &.forhidden {
                background: #eee;
                color: #cccccc;
            }
        }
    }
    .submit{
        margin-top: 60rpx;
        color: #fff;
        width: 100%;
        border: none;
    }
}
</style>
