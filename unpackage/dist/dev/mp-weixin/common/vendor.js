(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"example","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 12:
/*!******************************************************************!*\
  !*** /Users/ou/Desktop/Vue/Xia/Coves/Coves/pages/store/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 13));
var Tone = _interopRequireWildcard(__webpack_require__(/*! tone */ 14));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//组合
var synth = new Tone.Synth().toDestination();

_vue.default.use(_vuex.default);


var state = {
  version: '0.1.0',
  systemInfo: {},
  defaultHeight: {
    //最低高度
    "min-height": "800rpx",
    //屏幕高度
    "height": "800rpx" },

  mood: [
  ['Happy', 'Sad', 'Annoyed', 'Strong', 'Anxous', 'Content', 'Excited'],
  ['Scared', 'Peaceful', 'Loved', 'Vulnerable', 'Regret', 'Overwhelmed', 'Hight'],
  ['Upset', 'Mature', 'Weak', 'Alone', 'Clouded', 'Lost', 'Grateful'],
  ['Low', 'Confused', 'Guilty', 'Depressed', 'Angry', 'Lonely']],

  //当前新增列表 project
  list: {
    mood: [] },

  //所有过往记录列表 list
  menu: [
  {
    id: 'AA', //id
    title: 'title', //标题
    backgroundMusic: 'aaa', //背景音乐
    dateTime: '', //时间
    thoughts: '没有想法............', //想法
    location: '百慕大三角', //位置
    imageUrl: '', //图片地址
    mood: [], //心情
    music: [] //音乐组合
  }],


  //音频处理
  playing: false };


var mutations = {
  addMood: function addMood(state, value) {
    state.list.mood.push(value);
  },
  deleteMood: function deleteMood(state, value) {
    state.list.mood.splice(value, 1);
  },
  setSystemInfo: function setSystemInfo(state, value) {
    state.systemInfo = value;
    //屏幕高度减去标题高度
    state.defaultHeight['height'] = value.windowHeight - 43 + "px";
  },
  PLAYER_START: function PLAYER_START(state, value) {
    state.playing = true;
  },
  PLAYER_STOP: function PLAYER_STOP(state, value) {
    state.playing = false;
  } };


var getters = {
  getMood: function getMood(state) {
    return state.mood;
  },
  getWindowsHeight: function getWindowsHeight(state) {
    return state.systemInfo.windowHeight - 43;
  },
  findMood: function findMood(state) {return function (value) {
      return state.list.mood.findIndex(function (item) {
        return item === value;
      });
    };},
  defaultHeight: function defaultHeight(state) {
    return state.defaultHeight;
  } };


var actions = {
  //初始化音乐
  initPlayer: function initPlayer(_ref) {var commit = _ref.commit,state = _ref.state;

  },
  setPlayer: function setPlayer(_ref2, value) {var commit = _ref2.commit,state = _ref2.state;
    //播放
    if (!state.playing) state.player = new Tone.Player(value).toDestination();
  },
  //播放音乐
  playerStart: function playerStart(_ref3) {var commit = _ref3.commit,state = _ref3.state;
    if (!state.playing) {
      Tone.loaded().then(function () {
        state.player.start();
        commit('PLAYER_START');
      });
    }
  },
  playerStop: function playerStop(_ref4) {var commit = _ref4.commit,state = _ref4.state;
    if (state.playing) {
      state.player.stop();
      commit('PLAYER_STOP');
    } else
    {
      console.log('音频未启动');
    }
  },
  //插入音阶
  synthStart: function synthStart(_ref5) {var commit = _ref5.commit;
    var now = Tone.now();
    synth.triggerAttackRelease("C4", "8n", now);
    synth.triggerAttackRelease("E4", "8n", now + 0.5);
    synth.triggerAttackRelease("G4", "8n", now + 1);
  } };


var store = new _vuex.default.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions });var _default =


store;exports.default = _default;

/***/ }),

/***/ 13:
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 14:
/*!*****************************************************************************!*\
  !*** /Users/ou/Desktop/Vue/Xia/Coves/Coves/node_modules/tone/build/Tone.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _regeneratorRuntime = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 15);function _get(target, property, receiver) {if (typeof Reflect !== "undefined" && Reflect.get) {_get = Reflect.get;} else {_get = function _get(target, property, receiver) {var base = _superPropBase(target, property);if (!base) return;var desc = Object.getOwnPropertyDescriptor(base, property);if (desc.get) {return desc.get.call(receiver);}return desc.value;};}return _get(target, property, receiver || target);}function _superPropBase(object, property) {while (!Object.prototype.hasOwnProperty.call(object, property)) {object = _getPrototypeOf(object);if (object === null) break;}return object;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e119) {throw _e119;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e120) {didErr = true;err = _e120;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;} /*! For license information please see Tone.js.LICENSE.txt */!function (t, e) {
   true ? module.exports = e() : undefined;
}("undefined" != typeof self ? self : this, function () {
  return function () {
    var t = {
      228: function _(t) {
        t.exports = function (t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var s = 0, n = new Array(e); s < e; s++) {n[s] = t[s];}
          return n;
        }, t.exports.default = t.exports, t.exports.__esModule = !0;
      },
      858: function _(t) {
        t.exports = function (t) {
          if (Array.isArray(t)) return t;
        }, t.exports.default = t.exports, t.exports.__esModule = !0;
      },
      575: function _(t) {
        t.exports = function (t, e) {
          if (!(t instanceof e)) throw new TypeError(
          "Cannot call a class as a function");
        }, t.exports.default = t.exports, t.exports.__esModule = !0;
      },
      913: function _(t) {
        function e(t, e) {
          for (var s = 0; s < e.length; s++) {
            var n = e[s];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (
            n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }
        t.exports = function (t, s, n) {
          return s && e(t.prototype, s), n && e(t, n), t;
        }, t.exports.default = t.exports, t.exports.__esModule = !0;
      },
      884: function _(t) {
        t.exports = function (t, e) {
          var s = null == t ? null : "undefined" != typeof Symbol && t[Symbol.
          iterator] || t["@@iterator"];
          if (null != s) {
            var n,i,o = [],
            r = !0,
            a = !1;
            try {
              for (s = s.call(t); !(r = (n = s.next()).done) && (o.push(n.
              value), !e || o.length !== e); r = !0) {;}
            } catch (t) {
              a = !0, i = t;
            } finally {
              try {
                r || null == s.return || s.return();
              } finally {
                if (a) throw i;
              }
            }
            return o;
          }
        }, t.exports.default = t.exports, t.exports.__esModule = !0;
      },
      521: function _(t) {
        t.exports = function () {
          throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");

        }, t.exports.default = t.exports, t.exports.__esModule = !0;
      },
      38: function _(t, e, s) {
        var n = s(858),
        i = s(884),
        o = s(379),
        r = s(521);
        t.exports = function (t, e) {
          return n(t) || i(t, e) || o(t, e) || r();
        }, t.exports.default = t.exports, t.exports.__esModule = !0;
      },
      379: function _(t, e, s) {
        var n = s(228);
        t.exports = function (t, e) {
          if (t) {
            if ("string" == typeof t) return n(t, e);
            var s = Object.prototype.toString.call(t).slice(8, -1);
            return "Object" === s && t.constructor && (s = t.constructor.name),
            "Map" === s || "Set" === s ? Array.from(t) : "Arguments" ===
            s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s) ? n(t,
            e) : void 0;
          }
        }, t.exports.default = t.exports, t.exports.__esModule = !0;
      },
      382: function _(t, e, s) {
        !function (t, e, s, n) {
          "use strict";

          function i(t) {
            return t && "object" == typeof t && "default" in t ? t : {
              default: t };

          }
          var o = i(e),
          r = i(s),
          a = i(n),
          c = function c(t, e, s) {
            return {
              endTime: e,
              insertTime: s,
              type: "exponentialRampToValue",
              value: t };

          },
          h = function h(t, e, s) {
            return {
              endTime: e,
              insertTime: s,
              type: "linearRampToValue",
              value: t };

          },
          l = function l(t, e) {
            return {
              startTime: e,
              type: "setValue",
              value: t };

          },
          u = function u(t, e, s) {
            return {
              duration: s,
              startTime: e,
              type: "setValueCurve",
              values: t };

          },
          p = function p(t, e, s) {
            var n = s.startTime,
            i = s.target,
            o = s.timeConstant;
            return i + (e - i) * Math.exp((n - t) / o);
          },
          d = function d(t) {
            return "exponentialRampToValue" === t.type;
          },
          f = function f(t) {
            return "linearRampToValue" === t.type;
          },
          _ = function _(t) {
            return d(t) || f(t);
          },
          m = function m(t) {
            return "setValue" === t.type;
          },
          g = function g(t) {
            return "setValueCurve" === t.type;
          },
          v = function t(e, s, n, i) {
            var o = e[s];
            return void 0 === o ? i : _(o) || m(o) ? o.value : g(o) ? o.values[o.
            values.length - 1] : p(n, t(e, s - 1, o.startTime, i), o);
          },
          y = function y(t, e, s, n, i) {
            return void 0 === s ? [n.insertTime, i] : _(s) ? [s.endTime, s.
            value] : m(s) ? [s.startTime, s.value] : g(s) ? [s.
            startTime + s.duration, s.values[s.values.length - 1]] :
            [s.startTime, v(t, e - 1, s.startTime, i)];
          },
          x = function x(t) {
            return "cancelAndHold" === t.type;
          },
          w = function w(t) {
            return "cancelScheduledValues" === t.type;
          },
          b = function b(t) {
            return x(t) || w(t) ? t.cancelTime : d(t) || f(t) ? t.endTime : t.
            startTime;
          },
          T = function T(t, e, s, n) {
            var i = n.endTime,
            o = n.value;
            return s === o ? o : 0 < s && 0 < o || s < 0 && o < 0 ? s * Math.
            pow(o / s, (t - e) / (i - e)) : 0;
          },
          S = function S(t, e, s, n) {
            return s + (t - e) / (n.endTime - e) * (n.value - s);
          },
          k = function k(t, e) {
            var s = e.duration,
            n = e.startTime,
            i = e.values;
            return function (t, e) {
              var s = Math.floor(e),
              n = Math.ceil(e);
              return s === n ? t[s] : (1 - (e - s)) * t[s] + (1 - (n -
              e)) * t[n];
            }(i, (t - n) / s * (i.length - 1));
          },
          A = function A(t) {
            return "setTarget" === t.type;
          },
          C = function (t) {
            function e(t) {
              r.default(this, e), this._automationEvents = [], this.
              _currenTime = 0, this._defaultValue = t;
            }
            return a.default(e, [{
              key: t,
              value: function value() {
                return this._automationEvents[Symbol.
                iterator]();
              } },
            {
              key: "add",
              value: function value(t) {
                var e = b(t);
                if (x(t) || w(t)) {
                  var s = this._automationEvents.
                  findIndex(function (s) {
                    return w(t) && g(s) ? s.
                    startTime + s.
                    duration >= e : b(
                    s) >= e;
                  }),
                  n = this._automationEvents[s];
                  if (-1 !== s && (this.
                  _automationEvents = this.
                  _automationEvents.slice(0, s)),
                  x(t)) {
                    var i = this._automationEvents[this.
                    _automationEvents.length -
                    1];
                    if (void 0 !== n && _(n)) {
                      if (A(i)) throw new Error(
                      "The internal list is malformed.");

                      var o = g(i) ? i.startTime + i.
                      duration : b(i),
                      r = g(i) ? i.values[i.values.
                      length - 1] : i.value,
                      a = d(n) ? T(e, o, r, n) :
                      S(e, o, r, n),
                      p = d(n) ? c(a, e, this.
                      _currenTime) : h(a, e,
                      this._currenTime);
                      this._automationEvents.push(p);
                    }
                    void 0 !== i && A(i) && this.
                    _automationEvents.push(l(this.
                    getValue(e), e)),
                    void 0 !== i && g(i) && i.
                    startTime + i.duration > e && (
                    this._automationEvents[this.
                    _automationEvents.
                    length - 1] = u(
                    new Float32Array([6,
                    7]), i.startTime, e - i.
                    startTime));
                  }
                } else {
                  var m = this._automationEvents.
                  findIndex(function (t) {
                    return b(t) > e;
                  }),
                  v = -1 === m ? this.
                  _automationEvents[this.
                  _automationEvents.length - 1] :
                  this._automationEvents[m - 1];
                  if (void 0 !== v && g(v) && b(v) + v.
                  duration > e) return !1;
                  var y = d(t) ? c(t.value, t.endTime,
                  this._currenTime) : f(t) ? h(t.
                  value, e, this._currenTime) : t;
                  if (-1 === m) this._automationEvents.
                  push(y);else
                  {
                    if (g(t) && e + t.duration > b(this.
                    _automationEvents[m]))
                    return !1;
                    this._automationEvents.splice(m, 0,
                    y);
                  }
                }
                return !0;
              } },
            {
              key: "flush",
              value: function value(t) {
                var e = this._automationEvents.findIndex(
                function (e) {
                  return b(e) > t;
                });
                if (e > 1) {
                  var s = this._automationEvents.slice(e -
                  1),
                  n = s[0];
                  A(n) && s.unshift(l(v(this.
                  _automationEvents, e -
                  2, n.startTime, this.
                  _defaultValue), n.
                  startTime)), this.
                  _automationEvents = s;
                }
              } },
            {
              key: "getValue",
              value: function value(t) {
                if (0 === this._automationEvents.length)
                return this._defaultValue;
                var e = this._automationEvents.findIndex(
                function (e) {
                  return b(e) > t;
                }),
                s = this._automationEvents[e],
                n = (-1 === e ? this._automationEvents.
                length : e) - 1,
                i = this._automationEvents[n];
                if (void 0 !== i && A(i) && (void 0 === s ||
                !_(s) || s.insertTime > t))
                return p(t, v(this._automationEvents,
                n - 1, i.startTime, this.
                _defaultValue), i);
                if (void 0 !== i && m(i) && (void 0 === s ||
                !_(s))) return i.value;
                if (void 0 !== i && g(i) && (void 0 === s ||
                !_(s) || i.startTime + i.duration >
                t)) return t < i.startTime + i.
                duration ? k(t, i) : i.values[i.
                values.length - 1];
                if (void 0 !== i && _(i) && (void 0 === s ||
                !_(s))) return i.value;
                if (void 0 !== s && d(s)) {
                  var r = y(this._automationEvents, n, i,
                  s, this._defaultValue),
                  a = o.default(r, 2),
                  c = a[0],
                  h = a[1];
                  return T(t, c, h, s);
                }
                if (void 0 !== s && f(s)) {
                  var l = y(this._automationEvents, n, i,
                  s, this._defaultValue),
                  u = o.default(l, 2),
                  x = u[0],
                  w = u[1];
                  return S(t, x, w, s);
                }
                return this._defaultValue;
              } }]),
            e;
          }(Symbol.iterator);
          t.AutomationEventList = C, t.createCancelAndHoldAutomationEvent = function (
          t) {
            return {
              cancelTime: t,
              type: "cancelAndHold" };

          }, t.createCancelScheduledValuesAutomationEvent = function (t) {
            return {
              cancelTime: t,
              type: "cancelScheduledValues" };

          }, t.createExponentialRampToValueAutomationEvent = function (t, e) {
            return {
              endTime: e,
              type: "exponentialRampToValue",
              value: t };

          }, t.createLinearRampToValueAutomationEvent = function (t, e) {
            return {
              endTime: e,
              type: "linearRampToValue",
              value: t };

          }, t.createSetTargetAutomationEvent = function (t, e, s) {
            return {
              startTime: e,
              target: t,
              timeConstant: s,
              type: "setTarget" };

          }, t.createSetValueAutomationEvent = l, t.
          createSetValueCurveAutomationEvent = u, Object.defineProperty(t,
          "__esModule", {
            value: !0 });

        }(e, s(38), s(575), s(913));
      } },

    e = {};

    function s(n) {
      var i = e[n];
      if (void 0 !== i) return i.exports;
      var o = e[n] = {
        exports: {} };

      return t[n].call(o.exports, o, o.exports, s), o.exports;
    }
    s.d = function (t, e) {
      for (var n in e) {s.o(e, n) && !s.o(t, n) && Object.defineProperty(t, n, {
          enumerable: !0,
          get: e[n] });}

    }, s.o = function (t, e) {return Object.prototype.hasOwnProperty.call(t, e);}, s.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.
      toStringTag, {
        value: "Module" }),
      Object.defineProperty(t, "__esModule", {
        value: !0 });

    };
    var n = {};
    return function () {
      "use strict";var _marked = /*#__PURE__*/_regeneratorRuntime.mark(




































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































      Jr),_marked2 = /*#__PURE__*/_regeneratorRuntime.mark(




      Kr),_marked3 = /*#__PURE__*/_regeneratorRuntime.mark(




      ta),_marked4 = /*#__PURE__*/_regeneratorRuntime.mark(



      ea),_marked5 = /*#__PURE__*/_regeneratorRuntime.mark(





      sa),_marked6 = /*#__PURE__*/_regeneratorRuntime.mark(





      na),_marked7 = /*#__PURE__*/_regeneratorRuntime.mark(





      ia),_marked8 = /*#__PURE__*/_regeneratorRuntime.mark(









      oa);s.r(n), s.d(n, { AMOscillator: function AMOscillator() {return Yo;}, AMSynth: function AMSynth() {return Cr;}, Abs: function Abs() {return ur;}, Add: function Add() {return sr;}, AmplitudeEnvelope: function AmplitudeEnvelope() {return Sr;}, Analyser: function Analyser() {return Xa;}, AudioToGain: function AudioToGain() {return Zo;}, AutoFilter: function AutoFilter() {return ua;}, AutoPanner: function AutoPanner() {return da;}, AutoWah: function AutoWah() {return _a;}, BaseContext: function BaseContext() {return Ci;}, BiquadFilter: function BiquadFilter() {return Dr;}, BitCrusher: function BitCrusher() {return ga;}, Buffer: function Buffer() {return Dc;}, BufferSource: function BufferSource() {return Mc;}, Buffers: function Buffers() {return Oc;}, Channel: function Channel() {return sc;}, Chebyshev: function Chebyshev() {return ya;}, Chorus: function Chorus() {return Sa;}, Clock: function Clock() {return vo;}, Compressor: function Compressor() {return cc;}, Context: function Context() {return Di;}, Convolver: function Convolver() {return fc;}, CrossFade: function CrossFade() {return ca;}, DCMeter: function DCMeter() {return Ja;}, Delay: function Delay() {return yo;}, Destination: function Destination() {return yc;}, Distortion: function Distortion() {return ka;}, Draw: function Draw() {return Sc;}, DuoSynth: function DuoSynth() {return Rr;}, EQ3: function EQ3() {return dc;}, Emitter: function Emitter() {return Ai;}, Envelope: function Envelope() {return xr;}, FFT: function FFT() {return Ha;}, FMOscillator: function FMOscillator() {return $o;}, FMSynth: function FMSynth() {return qr;}, FatOscillator: function FatOscillator() {return Jo;}, FeedbackCombFilter: function FeedbackCombFilter() {return Br;}, FeedbackDelay: function FeedbackDelay() {return Ca;}, Filter: function Filter() {return Or;}, Follower: function Follower() {return fa;}, Freeverb: function Freeverb() {return Ra;}, Frequency: function Frequency() {return Ji;}, FrequencyClass: function FrequencyClass() {return Yi;}, FrequencyEnvelope: function FrequencyEnvelope() {return Mr;}, FrequencyShifter: function FrequencyShifter() {return Oa;}, Gain: function Gain() {return ho;}, GainToAudio: function GainToAudio() {return pr;}, Gate: function Gate() {return hc;}, GrainPlayer: function GrainPlayer() {return lr;}, GreaterThan: function GreaterThan() {return mr;}, GreaterThanZero: function GreaterThanZero() {return _r;}, IntervalTimeline: function IntervalTimeline() {return Co;}, JCReverb: function JCReverb() {return Va;}, LFO: function LFO() {return or;}, Limiter: function Limiter() {return lc;}, Listener: function Listener() {return bc;}, Loop: function Loop() {return $r;}, LowpassCombFilter: function LowpassCombFilter() {return Gr;}, Master: function Master() {return xc;}, MembraneSynth: function MembraneSynth() {return Vr;}, Merge: function Merge() {return wa;}, MetalSynth: function MetalSynth() {return Ir;}, Meter: function Meter() {return $a;}, MidSideCompressor: function MidSideCompressor() {return uc;}, MidSideMerge: function MidSideMerge() {return Ba;}, MidSideSplit: function MidSideSplit() {return Wa;}, Midi: function Midi() {return To;}, MidiClass: function MidiClass() {return bo;}, Mono: function Mono() {return nc;}, MonoSynth: function MonoSynth() {return Er;}, MultibandCompressor: function MultibandCompressor() {return pc;}, MultibandSplit: function MultibandSplit() {return ic;}, Multiply: function Multiply() {return Xo;}, Negate: function Negate() {return dr;}, Noise: function Noise() {return No;}, NoiseSynth: function NoiseSynth() {return Nr;}, Offline: function Offline() {return xo;}, OfflineContext: function OfflineContext() {return qi;}, OmniOscillator: function OmniOscillator() {return er;}, OnePoleFilter: function OnePoleFilter() {return Ur;}, Oscillator: function Oscillator() {return Uo;}, PWMOscillator: function PWMOscillator() {return Ko;}, PanVol: function PanVol() {return ec;}, Panner: function Panner() {return pa;}, Panner3D: function Panner3D() {return rc;}, Param: function Param() {return no;}, Part: function Part() {return Hr;}, Pattern: function Pattern() {return ra;}, Phaser: function Phaser() {return La;}, PingPongDelay: function PingPongDelay() {return Pa;}, PitchShift: function PitchShift() {return ja;}, Player: function Player() {return cr;}, Players: function Players() {return hr;}, PluckSynth: function PluckSynth() {return Qr;}, PolySynth: function PolySynth() {return Zr;}, Pow: function Pow() {return gr;}, PulseOscillator: function PulseOscillator() {return Ho;}, Recorder: function Recorder() {return ac;}, Reverb: function Reverb() {return za;}, Sampler: function Sampler() {return Xr;}, Scale: function Scale() {return nr;}, ScaleExp: function ScaleExp() {return vr;}, Sequence: function Sequence() {return aa;}, Signal: function Signal() {return po;}, Solo: function Solo() {return tc;}, Split: function Split() {return xa;}, StateTimeline: function StateTimeline() {return so;}, StereoWidener: function StereoWidener() {return Ga;}, Subtract: function Subtract() {return fr;}, SyncedSignal: function SyncedSignal() {return yr;}, Synth: function Synth() {return kr;}, Ticks: function Ticks() {return ko;}, TicksClass: function TicksClass() {return So;}, Time: function Time() {return Xi;}, TimeClass: function TimeClass() {return Zi;}, Timeline: function Timeline() {return wi;}, ToneAudioBuffer: function ToneAudioBuffer() {return Ri;}, ToneAudioBuffers: function ToneAudioBuffers() {return wo;}, ToneAudioNode: function ToneAudioNode() {return io;}, ToneBufferSource: function ToneBufferSource() {return Vo;}, ToneEvent: function ToneEvent() {return Yr;}, ToneOscillatorNode: function ToneOscillatorNode() {return Bo;}, Transport: function Transport() {return gc;}, TransportTime: function TransportTime() {return to;}, TransportTimeClass: function TransportTimeClass() {return Ki;}, Tremolo: function Tremolo() {return Qa;}, Unit: function Unit() {return e;}, UserMedia: function UserMedia() {return zo;}, Vibrato: function Vibrato() {return Za;}, Volume: function Volume() {return Oo;}, WaveShaper: function WaveShaper() {return Qo;}, Waveform: function Waveform() {return Ka;}, Zero: function Zero() {return ir;}, connect: function connect() {return ro;}, connectSeries: function connectSeries() {return oo;}, connectSignal: function connectSignal() {return fo;}, context: function context() {return Ac;}, dbToGain: function dbToGain() {return ji;}, debug: function debug() {return t;}, defaultArg: function defaultArg() {return pi;}, disconnect: function disconnect() {return ao;}, fanIn: function fanIn() {return co;}, ftom: function ftom() {return Bi;}, gainToDb: function gainToDb() {return Li;}, getContext: function getContext() {return Vi;}, getDestination: function getDestination() {return wc;}, getDraw: function getDraw() {return kc;}, getListener: function getListener() {return Tc;}, getTransport: function getTransport() {return vc;}, immediate: function immediate() {return mc;}, intervalToFrequencyRatio: function intervalToFrequencyRatio() {return zi;}, isArray: function isArray() {return Ln;}, isBoolean: function isBoolean() {return jn;}, isDefined: function isDefined() {return In;}, isFunction: function isFunction() {return Vn;}, isNote: function isNote() {return Wn;}, isNumber: function isNumber() {return Nn;}, isObject: function isObject() {return Pn;}, isString: function isString() {return zn;}, isUndef: function isUndef() {return Fn;}, loaded: function loaded() {return Cc;}, mtof: function mtof() {return Gi;}, now: function now() {return _c;}, optionsFromArguments: function optionsFromArguments() {return ui;}, setContext: function setContext() {return Ni;}, start: function start() {return Pi;}, supported: function supported() {return qn;}, version: function version() {return i;} });var t = {};s.r(t), s.d(t, { assert: function assert() {return Bn;}, assertContextRunning: function assertContextRunning() {return Gn;}, assertRange: function assertRange() {return Un;}, assertUsedScheduleTime: function assertUsedScheduleTime() {return Yn;}, enterScheduledCallback: function enterScheduledCallback() {return Xn;}, log: function log() {return Jn;}, setLogger: function setLogger() {return Hn;}, warn: function warn() {return Kn;} });var e = {};s.r(e);var i = "14.8.38";var o = s(382);var r = new WeakSet(),a = new WeakMap(),c = new WeakMap(),h = new WeakMap(),l = new WeakMap(),u = new WeakMap(),p = new WeakMap(),d = new WeakMap(),f = new WeakMap(),_ = new WeakMap(),m = { construct: function construct() {return m;} },g = /^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/,v = function v(t, e) {var s = [];var n = t.replace(/^[\s]+/, ""),i = n.match(g);for (; null !== i;) {var _t2 = i[1].slice(1, -1),_o2 = i[0].replace(/([\s]+)?;?$/, "").replace(_t2, new URL(_t2, e).toString());s.push(_o2), n = n.slice(i[0].length).replace(/^[\s]+/, ""), i = n.match(g);}return [s.join(";"), n];},y = function y(t) {if (void 0 !== t && !Array.isArray(t)) throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.");},x = function x(t) {if (!function (t) {try {new new Proxy(t, m)();} catch (_unused) {return !1;}return !0;}(t)) throw new TypeError("The given value for processorCtor should be a constructor.");if (null === t.prototype || "object" != typeof t.prototype) throw new TypeError("The given value for processorCtor should have a prototype.");},w = function w(t, e) {var s = t.get(e);if (void 0 === s) throw new Error("A value with the given key could not be found.");return s;},b = function b(t, e) {var s = Array.from(t).filter(e);if (s.length > 1) throw Error("More than one element was found.");if (0 === s.length) throw Error("No element was found.");var _s2 = _slicedToArray(s, 1),n = _s2[0];return t.delete(n), n;},T = function T(t, e, s, n) {var i = w(t, e),o = b(i, function (t) {return t[0] === s && t[1] === n;});return 0 === i.size && t.delete(e), o;},S = function S(t) {return w(p, t);},k = function k(t) {if (r.has(t)) throw new Error("The AudioNode is already stored.");r.add(t), S(t).forEach(function (t) {return t(!0);});},A = function A(t) {return "port" in t;},C = function C(t) {if (!r.has(t)) throw new Error("The AudioNode is not stored.");r.delete(t), S(t).forEach(function (t) {return t(!1);});},D = function D(t, e) {!A(t) && e.every(function (t) {return 0 === t.size;}) && C(t);},O = { channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", fftSize: 2048, maxDecibels: -30, minDecibels: -100, smoothingTimeConstant: .8 },M = function M(t, e) {return t.context === e;},E = function E(t) {try {t.copyToChannel(new Float32Array(1), 0, -1);} catch (_unused2) {return !1;}return !0;},R = function R() {return new DOMException("", "IndexSizeError");},q = function q(t) {var e;t.getChannelData = (e = t.getChannelData, function (s) {try {return e.call(t, s);} catch (t) {if (12 === t.code) throw R();throw t;}});},F = { numberOfChannels: 1 },I = -34028234663852886e22,V = -I,N = function N(t) {return r.has(t);},P = { buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: !1, loopEnd: 0, loopStart: 0, playbackRate: 1 },j = function j(t) {return w(a, t);},L = function L(t) {return w(h, t);},z = function z(t, e) {var _j = j(t),s = _j.activeInputs;s.forEach(function (s) {return s.forEach(function (_ref) {var _ref2 = _slicedToArray(_ref, 1),s = _ref2[0];e.includes(t) || z(s, [].concat(_toConsumableArray(e), [t]));});});var n = function (t) {return "playbackRate" in t;}(t) ? [t.playbackRate] : A(t) ? Array.from(t.parameters.values()) : function (t) {return "frequency" in t && "gain" in t;}(t) ? [t.Q, t.detune, t.frequency, t.gain] : function (t) {return "offset" in t;}(t) ? [t.offset] : function (t) {return !("frequency" in t) && "gain" in t;}(t) ? [t.gain] : function (t) {return "detune" in t && "frequency" in t;}(t) ? [t.detune, t.frequency] : function (t) {return "pan" in t;}(t) ? [t.pan] : [];var _iterator = _createForOfIteratorHelper(n),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _t3 = _step.value;var _s3 = L(_t3);void 0 !== _s3 && _s3.activeInputs.forEach(function (_ref3) {var _ref4 = _slicedToArray(_ref3, 1),t = _ref4[0];return z(t, e);});}} catch (err) {_iterator.e(err);} finally {_iterator.f();}N(t) && C(t);},W = function W(t) {z(t.destination, []);},B = function B(t) {return "context" in t;},U = function U(t) {return B(t[0]);},G = function G(t, e, s, n) {var _iterator2 = _createForOfIteratorHelper(t),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _e2 = _step2.value;if (s(_e2)) {if (n) return !1;throw Error("The set contains at least one similar element.");}}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}return t.add(e), !0;},Q = function Q(t, e, _ref5, i) {var _ref6 = _slicedToArray(_ref5, 2),s = _ref6[0],n = _ref6[1];G(t, [e, s, n], function (t) {return t[0] === e && t[1] === s;}, i);},Z = function Z(t, _ref7, i) {var _ref8 = _slicedToArray(_ref7, 3),e = _ref8[0],s = _ref8[1],n = _ref8[2];var o = t.get(e);void 0 === o ? t.set(e, new Set([[s, n]])) : G(o, [s, n], function (t) {return t[0] === s;}, i);},X = function X(t) {return "inputs" in t;},Y = function Y(t, e, s, n) {if (X(e)) {var _i2 = e.inputs[n];return t.connect(_i2, s, 0), [_i2, s, 0];}return t.connect(e, s, n), [e, s, n];},$ = function $(t, e, s) {var _iterator3 = _createForOfIteratorHelper(t),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _n2 = _step3.value;if (_n2[0] === e && _n2[1] === s) return t.delete(_n2), _n2;}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}return null;},H = function H(t, e) {if (!S(t).delete(e)) throw new Error("Missing the expected event listener.");},J = function J(t, e, s) {var n = w(t, e),i = b(n, function (t) {return t[0] === s;});return 0 === n.size && t.delete(e), i;},K = function K(t, e, s, n) {X(e) ? t.disconnect(e.inputs[n], s, 0) : t.disconnect(e, s, n);},tt = function tt(t) {return w(c, t);},et = function et(t) {return w(l, t);},st = function st(t) {return d.has(t);},nt = function nt(t) {return !r.has(t);},it = function it(t, e) {return new Promise(function (s) {if (null !== e) s(!0);else {var _e3 = t.createScriptProcessor(256, 1, 1),_n3 = t.createGain(),_i3 = t.createBuffer(1, 2, 44100),_o3 = _i3.getChannelData(0);_o3[0] = 1, _o3[1] = 1;var _r2 = t.createBufferSource();_r2.buffer = _i3, _r2.loop = !0, _r2.connect(_e3).connect(t.destination), _r2.connect(_n3), _r2.disconnect(_n3), _e3.onaudioprocess = function (n) {var i = n.inputBuffer.getChannelData(0);Array.prototype.some.call(i, function (t) {return 1 === t;}) ? s(!0) : s(!1), _r2.stop(), _e3.onaudioprocess = null, _r2.disconnect(_e3), _e3.disconnect(t.destination);}, _r2.start();}});},ot = function ot(t, e) {var s = new Map();var _iterator4 = _createForOfIteratorHelper(t),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _e4 = _step4.value;var _iterator5 = _createForOfIteratorHelper(_e4),_step5;try {for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {var _t4 = _step5.value;var _e5 = s.get(_t4);s.set(_t4, void 0 === _e5 ? 1 : _e5 + 1);}} catch (err) {_iterator5.e(err);} finally {_iterator5.f();}}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}s.forEach(function (t, s) {return e(s, t);});},rt = function rt(t) {return "context" in t;},at = function at(t) {var e = new Map();t.connect = function (t) {return function (s) {var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var o = rt(s) ? t(s, n, i) : t(s, n),r = e.get(s);return void 0 === r ? e.set(s, [{ input: i, output: n }]) : r.every(function (t) {return t.input !== i || t.output !== n;}) && r.push({ input: i, output: n }), o;};}(t.connect.bind(t)), t.disconnect = function (s) {return function (n, i, o) {if (s.apply(t), void 0 === n) e.clear();else if ("number" == typeof n) {var _iterator6 = _createForOfIteratorHelper(e),_step6;try {for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {var _step6$value = _slicedToArray(_step6.value, 2),_t5 = _step6$value[0],_s4 = _step6$value[1];var _i4 = _s4.filter(function (t) {return t.output !== n;});0 === _i4.length ? e.delete(_t5) : e.set(_t5, _i4);}} catch (err) {_iterator6.e(err);} finally {_iterator6.f();}} else if (e.has(n)) if (void 0 === i) e.delete(n);else {var _t6 = e.get(n);if (void 0 !== _t6) {var _s5 = _t6.filter(function (t) {return t.output !== i && (t.input !== o || void 0 === o);});0 === _s5.length ? e.delete(n) : e.set(n, _s5);}}var _iterator7 = _createForOfIteratorHelper(e),_step7;try {var _loop = function _loop() {var _step7$value = _slicedToArray(_step7.value, 2),s = _step7$value[0],n = _step7$value[1];n.forEach(function (e) {rt(s) ? t.connect(s, e.output, e.input) : t.connect(s, e.output);});};for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {_loop();}} catch (err) {_iterator7.e(err);} finally {_iterator7.f();}};}(t.disconnect);},ct = function ct(t, e, s, n, i) {var _ref9 = function (t, e, s, n) {var _j2 = j(e),i = _j2.activeInputs,o = _j2.passiveInputs,r = $(i[n], t, s);return null === r ? [T(o, t, s, n)[2], !1] : [r[2], !0];}(t, s, n, i),_ref10 = _slicedToArray(_ref9, 2),o = _ref10[0],r = _ref10[1];if (null !== o && (H(t, o), !r || e || st(t) || K(tt(t), tt(s), n, i)), N(s)) {var _j3 = j(s),_t7 = _j3.activeInputs;D(s, _t7);}},ht = function ht(t, e, s, n) {var _ref11 = function (t, e, s) {var _L = L(e),n = _L.activeInputs,i = _L.passiveInputs,o = $(n, t, s);return null === o ? [J(i, t, s)[1], !1] : [o[2], !0];}(t, s, n),_ref12 = _slicedToArray(_ref11, 2),i = _ref12[0],o = _ref12[1];null !== i && (H(t, i), !o || e || st(t) || tt(t).disconnect(et(s), n));};var lt = /*#__PURE__*/function () {function lt(t) {_classCallCheck(this, lt);this._map = new Map(t);}_createClass(lt, [{ key: "entries", value: function entries() {return this._map.entries();} }, { key: "forEach", value: function forEach(t) {var _this = this;var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;return this._map.forEach(function (s, n) {return t.call(e, s, n, _this);});} }, { key: "get", value: function get(t) {return this._map.get(t);} }, { key: "has", value: function has(t) {return this._map.has(t);} }, { key: "keys", value: function keys() {return this._map.keys();} }, { key: "values", value: function values() {return this._map.values();} }, { key: "size", get: function get() {return this._map.size;} }]);return lt;}();var ut = { channelCount: 2, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 1, numberOfOutputs: 1, parameterData: {}, processorOptions: {} };function pt(t, e, s, n, i) {if ("function" == typeof t.copyFromChannel) 0 === e[s].byteLength && (e[s] = new Float32Array(128)), t.copyFromChannel(e[s], n, i);else {var _o4 = t.getChannelData(n);if (0 === e[s].byteLength) e[s] = _o4.slice(i, i + 128);else {var _t8 = new Float32Array(_o4.buffer, i * Float32Array.BYTES_PER_ELEMENT, 128);e[s].set(_t8);}}}var dt = function dt(t, e, s, n, i) {"function" == typeof t.copyToChannel ? 0 !== e[s].byteLength && t.copyToChannel(e[s], n, i) : 0 !== e[s].byteLength && t.getChannelData(n).set(e[s], i);},ft = function ft(t, e) {var s = [];for (var _n4 = 0; _n4 < t; _n4 += 1) {var _t9 = [],_i5 = "number" == typeof e ? e : e[_n4];for (var _e6 = 0; _e6 < _i5; _e6 += 1) {_t9.push(new Float32Array(128));}s.push(_t9);}return s;},_t = /*#__PURE__*/function () {var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(t, e, s, n, i, o, r) {var a, c, h, l, u, p, d, f, m, _loop2, _h, _ret;return _regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:a = null === e ? 128 * Math.ceil(t.context.length / 128) : e.length, c = n.channelCount * n.numberOfInputs, h = i.reduce(function (t, e) {return t + e;}, 0), l = 0 === h ? null : s.createBuffer(h, a, s.sampleRate);if (!(void 0 === o)) {_context.next = 3;break;}throw new Error("Missing the processor constructor.");case 3:u = j(t);_context.next = 6;return function (t, e) {var s = w(_, t),n = tt(e);return w(s, n);}(s, t);case 6:p = _context.sent;d = ft(n.numberOfInputs, n.channelCount);f = ft(n.numberOfOutputs, i);m = Array.from(t.parameters.keys()).reduce(function (t, e) {return _objectSpread(_objectSpread({}, t), {}, _defineProperty({}, e, new Float32Array(128)));}, {});_loop2 = function _loop2(_h) {if (n.numberOfInputs > 0 && null !== e) for (var _t10 = 0; _t10 < n.numberOfInputs; _t10 += 1) {for (var _s6 = 0; _s6 < n.channelCount; _s6 += 1) {pt(e, d[_t10], _s6, _s6, _h);}}void 0 !== o.parameterDescriptors && null !== e && o.parameterDescriptors.forEach(function (_ref14, s) {var t = _ref14.name;pt(e, m, t, c + s, _h);});for (var _t11 = 0; _t11 < n.numberOfInputs; _t11 += 1) {for (var _e7 = 0; _e7 < i[_t11]; _e7 += 1) {0 === f[_t11][_e7].byteLength && (f[_t11][_e7] = new Float32Array(128));}}try {var _t12 = d.map(function (t, e) {return 0 === u.activeInputs[e].size ? [] : t;}),_e8 = r(_h / s.sampleRate, s.sampleRate, function () {return p.process(_t12, f, m);});if (null !== l) for (var _t13 = 0, _e9 = 0; _t13 < n.numberOfOutputs; _t13 += 1) {for (var _s7 = 0; _s7 < i[_t13]; _s7 += 1) {dt(l, f[_t13], _s7, _e9 + _s7, _h);}_e9 += i[_t13];}if (!_e8) return "break";} catch (e) {t.dispatchEvent(new ErrorEvent("processorerror", { colno: e.colno, filename: e.filename, lineno: e.lineno, message: e.message }));return "break";}};_h = 0;case 12:if (!(_h < a)) {_context.next = 19;break;}_ret = _loop2(_h);if (!(_ret === "break")) {_context.next = 16;break;}return _context.abrupt("break", 19);case 16:_h += 128;_context.next = 12;break;case 19:return _context.abrupt("return", l);case 20:case "end":return _context.stop();}}}, _callee);}));return function _t(_x, _x2, _x3, _x4, _x5, _x6, _x7) {return _ref13.apply(this, arguments);};}(),mt = { Q: 1, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", detune: 0, frequency: 350, gain: 0, type: "lowpass" },gt = { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 6 },vt = { channelCount: 6, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: 6 },yt = { channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", offset: 1 },xt = { buffer: null, channelCount: 2, channelCountMode: "clamped-max", channelInterpretation: "speakers", disableNormalization: !1 },wt = function wt(t) {var _MessageChannel = new MessageChannel(),e = _MessageChannel.port1,s = _MessageChannel.port2;return new Promise(function (n) {var i = function i() {s.onmessage = null, e.close(), s.close(), n();};s.onmessage = function () {return i();};try {e.postMessage(t, [t]);} finally {i();}});},bt = { channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", delayTime: 0, maxDelayTime: 1 },Tt = function Tt(t, e, s) {var n = e[s];if (void 0 === n) throw t();return n;},St = { attack: .003, channelCount: 2, channelCountMode: "clamped-max", channelInterpretation: "speakers", knee: 30, ratio: 12, release: .25, threshold: -24 },kt = { channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", gain: 1 },At = function At() {return new DOMException("", "InvalidStateError");},Ct = function Ct() {return new DOMException("", "InvalidAccessError");},Dt = { channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers" },Ot = function Ot(t, e, s, n, i, o, r, a, c, h, l) {var u = h.length;var p = a;for (var _a2 = 0; _a2 < u; _a2 += 1) {var _u = s[0] * h[_a2];for (var _e10 = 1; _e10 < i; _e10 += 1) {var _n5 = p - _e10 & c - 1;_u += s[_e10] * o[_n5], _u -= t[_e10] * r[_n5];}for (var _t14 = i; _t14 < n; _t14 += 1) {_u += s[_t14] * o[p - _t14 & c - 1];}for (var _s8 = i; _s8 < e; _s8 += 1) {_u -= t[_s8] * r[p - _s8 & c - 1];}o[p] = h[_a2], r[p] = _u, p = p + 1 & c - 1, l[_a2] = _u;}return p;},Mt = { channelCount: 2, channelCountMode: "explicit", channelInterpretation: "speakers" },Et = function Et(t) {var e = new Uint32Array([1179011410, 40, 1163280727, 544501094, 16, 131073, 44100, 176400, 1048580, 1635017060, 4, 0]);try {var _s9 = t.decodeAudioData(e.buffer, function () {});return void 0 !== _s9 && (_s9.catch(function () {}), !0);} catch (_unused3) {}return !1;},Rt = function Rt(t, e, s) {var n = e[s];void 0 !== n && n !== t[s] && (t[s] = n);},qt = function qt(t, e) {Rt(t, e, "channelCount"), Rt(t, e, "channelCountMode"), Rt(t, e, "channelInterpretation");},Ft = function Ft(t) {return "function" == typeof t.getFloatTimeDomainData;},It = function It(t, e, s) {var n = e[s];void 0 !== n && n !== t[s].value && (t[s].value = n);},Vt = function Vt(t) {t.start = function (e) {return function () {var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var i = arguments.length > 2 ? arguments[2] : undefined;if ("number" == typeof i && i < 0 || n < 0 || s < 0) throw new RangeError("The parameters can't be negative.");e.call(t, s, n, i);};}(t.start);},Nt = function Nt(t) {var e;t.stop = (e = t.stop, function () {var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;if (s < 0) throw new RangeError("The parameter can't be negative.");e.call(t, s);});},Pt = function Pt(t, e) {return null === t ? 512 : Math.max(512, Math.min(16384, Math.pow(2, Math.round(Math.log2(t * e)))));},jt = function jt(t, e) {var s = t.createBiquadFilter();return qt(s, e), It(s, e, "Q"), It(s, e, "detune"), It(s, e, "frequency"), It(s, e, "gain"), Rt(s, e, "type"), s;},Lt = function Lt(t, e) {var s = t.createChannelSplitter(e.numberOfOutputs);return qt(s, e), function (t) {var e = t.numberOfOutputs;Object.defineProperty(t, "channelCount", { get: function get() {return e;}, set: function set(t) {if (t !== e) throw At();} }), Object.defineProperty(t, "channelCountMode", { get: function get() {return "explicit";}, set: function set(t) {if ("explicit" !== t) throw At();} }), Object.defineProperty(t, "channelInterpretation", { get: function get() {return "discrete";}, set: function set(t) {if ("discrete" !== t) throw At();} });}(s), s;},zt = function zt(t, e) {return t.connect = e.connect.bind(e), t.disconnect = e.disconnect.bind(e), t;},Wt = function Wt(t, e) {var s = t.createDelay(e.maxDelayTime);return qt(s, e), It(s, e, "delayTime"), s;},Bt = function Bt(t, e) {var s = t.createGain();return qt(s, e), It(s, e, "gain"), s;};function Ut(t, e) {var s = e[0] * e[0] + e[1] * e[1];return [(t[0] * e[0] + t[1] * e[1]) / s, (t[1] * e[0] - t[0] * e[1]) / s];}function Gt(t, e) {var s = [0, 0];for (var _o5 = t.length - 1; _o5 >= 0; _o5 -= 1) {i = e, s = [(n = s)[0] * i[0] - n[1] * i[1], n[0] * i[1] + n[1] * i[0]], s[0] += t[_o5];}var n, i;return s;}var Qt = function Qt(t, e, s, n) {return t.createScriptProcessor(e, s, n);},Zt = function Zt() {return new DOMException("", "NotSupportedError");},Xt = { numberOfChannels: 1 },Yt = { channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", detune: 0, frequency: 440, periodicWave: void 0, type: "sine" },$t = { channelCount: 2, channelCountMode: "clamped-max", channelInterpretation: "speakers", coneInnerAngle: 360, coneOuterAngle: 360, coneOuterGain: 0, distanceModel: "inverse", maxDistance: 1e4, orientationX: 1, orientationY: 0, orientationZ: 0, panningModel: "equalpower", positionX: 0, positionY: 0, positionZ: 0, refDistance: 1, rolloffFactor: 1 },Ht = { disableNormalization: !1 },Jt = { channelCount: 2, channelCountMode: "explicit", channelInterpretation: "speakers", pan: 0 },Kt = function Kt() {return new DOMException("", "UnknownError");},te = { channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", curve: null, oversample: "none" },ee = function ee(t, e, s) {return void 0 === t.copyFromChannel ? t.getChannelData(s)[0] : (t.copyFromChannel(e, s), e[0]);},se = function se(t) {if (null === t) return !1;var e = t.length;return e % 2 != 0 ? 0 !== t[Math.floor(e / 2)] : t[e / 2 - 1] + t[e / 2] !== 0;},ne = function ne(t, e, s, n) {var i = t;for (; !i.hasOwnProperty(e);) {i = Object.getPrototypeOf(i);}var _Object$getOwnPropert = Object.getOwnPropertyDescriptor(i, e),o = _Object$getOwnPropert.get,r = _Object$getOwnPropert.set;Object.defineProperty(t, e, { get: s(o), set: n(r) });},ie = function ie(t, e, s) {try {t.setValueAtTime(e, s);} catch (n) {if (9 !== n.code) throw n;ie(t, e, s + 1e-7);}},oe = function oe(t) {var e = t.createOscillator();try {e.start(-1);} catch (t) {return t instanceof RangeError;}return !1;},re = function re(t) {var e = t.createBuffer(1, 1, 44100),s = t.createBufferSource();s.buffer = e, s.start(), s.stop();try {return s.stop(), !0;} catch (_unused4) {return !1;}},ae = function ae(t) {var e = t.createOscillator();try {e.stop(-1);} catch (t) {return t instanceof RangeError;}return !1;},ce = function ce() {try {new DOMException();} catch (_unused5) {return !1;}return !0;},he = function he() {return new Promise(function (t) {var e = new ArrayBuffer(0),_MessageChannel2 = new MessageChannel(),s = _MessageChannel2.port1,n = _MessageChannel2.port2;s.onmessage = function (_ref15) {var e = _ref15.data;return t(null !== e);}, n.postMessage(e, [e]);});},le = function le(t, e) {var s = e.createGain();t.connect(s);var n = function (e) {return function () {e.call(t, s), t.removeEventListener("ended", n);};}(t.disconnect);t.addEventListener("ended", n), zt(t, s), t.stop = function (e) {var n = !1;return function () {var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;if (n) try {e.call(t, i);} catch (_unused6) {s.gain.setValueAtTime(0, i);} else e.call(t, i), n = !0;};}(t.stop);},ue = function ue(t, e) {return function (s) {var n = { value: t };return Object.defineProperties(s, { currentTarget: n, target: n }), "function" == typeof e ? e.call(t, s) : e.handleEvent.call(t, s);};},pe = function (t) {return function (e, s, _ref16, r) {var _ref17 = _slicedToArray(_ref16, 3),n = _ref17[0],i = _ref17[1],o = _ref17[2];t(e[i], [s, n, o], function (t) {return t[0] === s && t[1] === n;}, r);};}(G),de = function (t) {return function (e, s, _ref18, r) {var _ref19 = _slicedToArray(_ref18, 3),n = _ref19[0],i = _ref19[1],o = _ref19[2];var a = e.get(n);void 0 === a ? e.set(n, new Set([[i, s, o]])) : t(a, [i, s, o], function (t) {return t[0] === i && t[1] === s;}, r);};}(G),fe = function (t) {return function (e, s, n, i) {return t(e[i], function (t) {return t[0] === s && t[1] === n;});};}(b),_e = new WeakMap(),me = function (t) {return function (e) {var s;return null !== (s = t.get(e)) && void 0 !== s ? s : 0;};}(_e),ge = (ve = new Map(), ye = new WeakMap(), function (t, e) {var s = ye.get(t);if (void 0 !== s) return s;var n = ve.get(t);if (void 0 !== n) return n;try {var _s10 = e();return _s10 instanceof Promise ? (ve.set(t, _s10), _s10.catch(function () {return !1;}).then(function (e) {return ve.delete(t), ye.set(t, e), e;})) : (ye.set(t, _s10), _s10);} catch (_unused7) {return ye.set(t, !1), !1;}});var ve, ye;var xe = "undefined" == typeof window ? null : window,we = function (t, e) {return function (s, n) {var i = s.createAnalyser();if (qt(i, n), !(n.maxDecibels > n.minDecibels)) throw e();return Rt(i, n, "fftSize"), Rt(i, n, "maxDecibels"), Rt(i, n, "minDecibels"), Rt(i, n, "smoothingTimeConstant"), t(Ft, function () {return Ft(i);}) || function (t) {t.getFloatTimeDomainData = function (e) {var s = new Uint8Array(e.length);t.getByteTimeDomainData(s);var n = Math.max(s.length, t.fftSize);for (var _t15 = 0; _t15 < n; _t15 += 1) {e[_t15] = .0078125 * (s[_t15] - 128);}return e;};}(i), i;};}(ge, R),be = function (t) {return function (e) {var s = t(e);if (null === s.renderer) throw new Error("Missing the renderer of the given AudioNode in the audio graph.");return s.renderer;};}(j),Te = function (t, e, s) {return /*#__PURE__*/function () {var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(n, i, o) {var r;return _regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:r = t(n);_context3.next = 3;return Promise.all(r.activeInputs.map(function (t, r) {return Array.from(t).map( /*#__PURE__*/function () {var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(_ref21) {var _ref23, t, a, c, h, l;return _regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_ref23 = _slicedToArray(_ref21, 2), t = _ref23[0], a = _ref23[1];c = e(t);_context2.next = 4;return c.render(t, i);case 4:h = _context2.sent;l = n.context.destination;s(t) || n === l && s(n) || h.connect(o, a, r);case 7:case "end":return _context2.stop();}}}, _callee2);}));return function (_x11) {return _ref22.apply(this, arguments);};}());}).reduce(function (t, e) {return [].concat(_toConsumableArray(t), _toConsumableArray(e));}, []));case 3:case "end":return _context3.stop();}}}, _callee3);}));return function (_x8, _x9, _x10) {return _ref20.apply(this, arguments);};}();}(j, be, st),Se = function (t, e, s) {return function () {var n = new WeakMap();return { render: function render(i, o) {var r = n.get(o);return void 0 !== r ? Promise.resolve(r) : function () {var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(i, o) {var r, _e11;return _regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:r = e(i);if (!M(r, o)) {_e11 = { channelCount: r.channelCount, channelCountMode: r.channelCountMode, channelInterpretation: r.channelInterpretation, fftSize: r.fftSize, maxDecibels: r.maxDecibels, minDecibels: r.minDecibels, smoothingTimeConstant: r.smoothingTimeConstant };r = t(o, _e11);}n.set(o, r);_context4.next = 5;return s(i, o, r);case 5:return _context4.abrupt("return", r);case 6:case "end":return _context4.stop();}}}, _callee4);}));return function (_x12, _x13) {return _ref24.apply(this, arguments);};}()(i, o);} };};}(we, tt, Te),ke = (Ae = u, function (t) {var e = Ae.get(t);if (void 0 === e) throw At();return e;});var Ae;var Ce = function (t) {return null === t ? null : t.hasOwnProperty("OfflineAudioContext") ? t.OfflineAudioContext : t.hasOwnProperty("webkitOfflineAudioContext") ? t.webkitOfflineAudioContext : null;}(xe),De = function (t) {return function (e) {return null !== t && e instanceof t;};}(Ce),Oe = new WeakMap(),Me = function (t) {return /*#__PURE__*/function () {function _class(t) {_classCallCheck(this, _class);this._nativeEventTarget = t, this._listeners = new WeakMap();}_createClass(_class, [{ key: "addEventListener", value: function addEventListener(e, s, n) {if (null !== s) {var _i6 = this._listeners.get(s);void 0 === _i6 && (_i6 = t(this, s), "function" == typeof s && this._listeners.set(s, _i6)), this._nativeEventTarget.addEventListener(e, _i6, n);}} }, { key: "dispatchEvent", value: function dispatchEvent(t) {return this._nativeEventTarget.dispatchEvent(t);} }, { key: "removeEventListener", value: function removeEventListener(t, e, s) {var n = null === e ? void 0 : this._listeners.get(e);this._nativeEventTarget.removeEventListener(t, void 0 === n ? null : n, s);} }]);return _class;}();}(ue),Ee = function (t) {return null === t ? null : t.hasOwnProperty("AudioContext") ? t.AudioContext : t.hasOwnProperty("webkitAudioContext") ? t.webkitAudioContext : null;}(xe),Re = function (t) {return function (e) {return null !== t && e instanceof t;};}(Ee),qe = function (t) {return function (e) {return null !== t && "function" == typeof t.AudioNode && e instanceof t.AudioNode;};}(xe),Fe = function (t) {return function (e) {return null !== t && "function" == typeof t.AudioParam && e instanceof t.AudioParam;};}(xe),Ie = function (t) {return null === t ? null : t.hasOwnProperty("AudioWorkletNode") ? t.AudioWorkletNode : null;}(xe),Ve = function (t, e, s, n, i, o, r, a, h, l, u, d, f, _, m, g) {return /*#__PURE__*/function (_l) {_inherits(_class2, _l);var _super = _createSuper(_class2);function _class2(e, n, i, o) {var _this2;_classCallCheck(this, _class2);_this2 = _super.call(this, i), _this2._context = e, _this2._nativeAudioNode = i;var r = u(e);d(r) && !0 !== s(it, function () {return it(r, g);}) && at(i), c.set(_assertThisInitialized(_this2), i), p.set(_assertThisInitialized(_this2), new Set()), "closed" !== e.state && n && k(_assertThisInitialized(_this2)), t(_assertThisInitialized(_this2), o, i);return _this2;}_createClass(_class2, [{ key: "connect", value: function connect(t) {var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var a = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;if (s < 0 || s >= this._nativeAudioNode.numberOfOutputs) throw i();var c = u(this._context),l = m(c);if (f(t) || _(t)) throw o();if (B(t)) {var _i7 = tt(t);try {var _this$_nativeAudioNod;var _e12 = Y(this._nativeAudioNode, _i7, s, a),_n6 = nt(this);(l || _n6) && (_this$_nativeAudioNod = this._nativeAudioNode).disconnect.apply(_this$_nativeAudioNod, _toConsumableArray(_e12)), "closed" !== this.context.state && !_n6 && nt(t) && k(t);} catch (t) {if (12 === t.code) throw o();throw t;}if (e(this, t, s, a, l)) {var _e13 = h([this], t);ot(_e13, n(l));}return t;}var p = et(t);if ("playbackRate" === p.name && 1024 === p.maxValue) throw r();try {this._nativeAudioNode.connect(p, s), (l || nt(this)) && this._nativeAudioNode.disconnect(p, s);} catch (t) {if (12 === t.code) throw o();throw t;}if (function (t, e, s, n) {var _L2 = L(e),i = _L2.activeInputs,o = _L2.passiveInputs,_j4 = j(t),r = _j4.outputs,a = S(t),c = function c(r) {var a = tt(t),c = et(e);if (r) {var _e14 = J(o, t, s);Q(i, t, _e14, !1), n || st(t) || a.connect(c, s);} else {var _e15 = function (t, e, s) {return b(t, function (t) {return t[0] === e && t[1] === s;});}(i, t, s);Z(o, _e15, !1), n || st(t) || a.disconnect(c, s);}};return !!G(r, [e, s], function (t) {return t[0] === e && t[1] === s;}, !0) && (a.add(c), N(t) ? Q(i, t, [s, c], !0) : Z(o, [t, s, c], !0), !0);}(this, t, s, l)) {var _e16 = h([this], t);ot(_e16, n(l));}} }, { key: "disconnect", value: function disconnect(t, e, s) {var n;var r = u(this._context),c = m(r);if (void 0 === t) n = function (t, e) {var s = j(t),n = [];var _iterator8 = _createForOfIteratorHelper(s.outputs),_step8;try {for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {var _i8 = _step8.value;U(_i8) ? ct.apply(void 0, [t, e].concat(_toConsumableArray(_i8))) : ht.apply(void 0, [t, e].concat(_toConsumableArray(_i8))), n.push(_i8[0]);}} catch (err) {_iterator8.e(err);} finally {_iterator8.f();}return s.outputs.clear(), n;}(this, c);else if ("number" == typeof t) {if (t < 0 || t >= this.numberOfOutputs) throw i();n = function (t, e, s) {var n = j(t),i = [];var _iterator9 = _createForOfIteratorHelper(n.outputs),_step9;try {for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {var _o6 = _step9.value;_o6[1] === s && (U(_o6) ? ct.apply(void 0, [t, e].concat(_toConsumableArray(_o6))) : ht.apply(void 0, [t, e].concat(_toConsumableArray(_o6))), i.push(_o6[0]), n.outputs.delete(_o6));}} catch (err) {_iterator9.e(err);} finally {_iterator9.f();}return i;}(this, c, t);} else {if (void 0 !== e && (e < 0 || e >= this.numberOfOutputs)) throw i();if (B(t) && void 0 !== s && (s < 0 || s >= t.numberOfInputs)) throw i();if (n = function (t, e, s, n, i) {var o = j(t);return Array.from(o.outputs).filter(function (t) {return !(t[0] !== s || void 0 !== n && t[1] !== n || void 0 !== i && t[2] !== i);}).map(function (s) {return U(s) ? ct.apply(void 0, [t, e].concat(_toConsumableArray(s))) : ht.apply(void 0, [t, e].concat(_toConsumableArray(s))), o.outputs.delete(s), s[0];});}(this, c, t, e, s), 0 === n.length) throw o();}var _iterator10 = _createForOfIteratorHelper(n),_step10;try {for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {var _t16 = _step10.value;var _e17 = h([this], _t16);ot(_e17, a);}} catch (err) {_iterator10.e(err);} finally {_iterator10.f();}} }, { key: "channelCount", get: function get() {return this._nativeAudioNode.channelCount;}, set: function set(t) {this._nativeAudioNode.channelCount = t;} }, { key: "channelCountMode", get: function get() {return this._nativeAudioNode.channelCountMode;}, set: function set(t) {this._nativeAudioNode.channelCountMode = t;} }, { key: "channelInterpretation", get: function get() {return this._nativeAudioNode.channelInterpretation;}, set: function set(t) {this._nativeAudioNode.channelInterpretation = t;} }, { key: "context", get: function get() {return this._context;} }, { key: "numberOfInputs", get: function get() {return this._nativeAudioNode.numberOfInputs;} }, { key: "numberOfOutputs", get: function get() {return this._nativeAudioNode.numberOfOutputs;} }]);return _class2;}(l);}((Ne = a, function (t, e, s) {var n = [];for (var _t17 = 0; _t17 < s.numberOfInputs; _t17 += 1) {n.push(new Set());}Ne.set(t, { activeInputs: n, outputs: new Set(), passiveInputs: new WeakMap(), renderer: e });}), function (t, e, s, n, i, o, r, a, c, h, l, u, p) {var d = new WeakMap();return function (f, _, m, g, v) {var _o7 = o(_),y = _o7.activeInputs,x = _o7.passiveInputs,_o8 = o(f),w = _o8.outputs,b = a(f),S = function S(o) {var a = c(_),h = c(f);if (o) {var _e18 = T(x, f, m, g);t(y, f, _e18, !1), v || u(f) || s(h, a, m, g), p(_) && k(_);} else {var _t18 = n(y, f, m, g);e(x, g, _t18, !1), v || u(f) || i(h, a, m, g);var _s11 = r(_);if (0 === _s11) l(_) && D(_, y);else {var _t19 = d.get(_);void 0 !== _t19 && clearTimeout(_t19), d.set(_, setTimeout(function () {l(_) && D(_, y);}, 1e3 * _s11));}}};return !!h(w, [_, m, g], function (t) {return t[0] === _ && t[1] === m && t[2] === g;}, !0) && (b.add(S), l(f) ? t(y, f, [m, g, S], !0) : e(x, g, [f, m, S], !0), !0);};}(pe, de, Y, fe, K, j, me, S, tt, G, N, st, nt), ge, function (t, e, s, n, i, o) {return function (r) {return function (a, c) {var h = t.get(a);if (void 0 === h) {if (!r && o(a)) {var _t20 = n(a),_s12 = s(a),_o9 = _s12.outputs;var _iterator11 = _createForOfIteratorHelper(_o9),_step11;try {for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {var _s13 = _step11.value;if (U(_s13)) {var _i9 = n(_s13[0]);e(_t20, _i9, _s13[1], _s13[2]);} else {var _e19 = i(_s13[0]);_t20.disconnect(_e19, _s13[1]);}}} catch (err) {_iterator11.e(err);} finally {_iterator11.f();}}t.set(a, c);} else t.set(a, h + c);};};}(d, K, j, tt, et, N), R, Ct, Zt, function (t, e, s, n, i, o, r, a) {return function (c, h) {var l = e.get(c);if (void 0 === l) throw new Error("Missing the expected cycle count.");var u = o(c.context),p = a(u);if (l === h) {if (e.delete(c), !p && r(c)) {var _e20 = n(c),_s14 = s(c),_o10 = _s14.outputs;var _iterator12 = _createForOfIteratorHelper(_o10),_step12;try {for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {var _s15 = _step12.value;if (U(_s15)) {var _i10 = n(_s15[0]);t(_e20, _i10, _s15[1], _s15[2]);} else {var _t21 = i(_s15[0]);_e20.connect(_t21, _s15[1]);}}} catch (err) {_iterator12.e(err);} finally {_iterator12.f();}}} else e.set(c, l - h);};}(Y, d, j, tt, et, ke, N, De), function (t, e, s) {return function n(i, o) {var r = B(o) ? o : s(t, o);if (function (t) {return "delayTime" in t;}(r)) return [];if (i[0] === r) return [i];if (i.includes(r)) return [];var _e21 = e(r),a = _e21.outputs;return Array.from(a).map(function (t) {return n([].concat(_toConsumableArray(i), [r]), t[0]);}).reduce(function (t, e) {return t.concat(e);}, []);};}(Oe, j, w), Me, ke, Re, qe, Fe, De, Ie);var Ne;var Pe = function (t, e, s, n, i, o) {return /*#__PURE__*/function (_t22) {_inherits(_class3, _t22);var _super2 = _createSuper(_class3);function _class3(t, s) {var _this3;_classCallCheck(this, _class3);var r = i(t),a = _objectSpread(_objectSpread({}, O), s),c = n(r, a);_this3 = _super2.call(this, t, !1, c, o(r) ? e() : null), _this3._nativeAnalyserNode = c;return _this3;}_createClass(_class3, [{ key: "getByteFrequencyData", value: function getByteFrequencyData(t) {this._nativeAnalyserNode.getByteFrequencyData(t);} }, { key: "getByteTimeDomainData", value: function getByteTimeDomainData(t) {this._nativeAnalyserNode.getByteTimeDomainData(t);} }, { key: "getFloatFrequencyData", value: function getFloatFrequencyData(t) {this._nativeAnalyserNode.getFloatFrequencyData(t);} }, { key: "getFloatTimeDomainData", value: function getFloatTimeDomainData(t) {this._nativeAnalyserNode.getFloatTimeDomainData(t);} }, { key: "fftSize", get: function get() {return this._nativeAnalyserNode.fftSize;}, set: function set(t) {this._nativeAnalyserNode.fftSize = t;} }, { key: "frequencyBinCount", get: function get() {return this._nativeAnalyserNode.frequencyBinCount;} }, { key: "maxDecibels", get: function get() {return this._nativeAnalyserNode.maxDecibels;}, set: function set(t) {var e = this._nativeAnalyserNode.maxDecibels;if (this._nativeAnalyserNode.maxDecibels = t, !(t > this._nativeAnalyserNode.minDecibels)) throw this._nativeAnalyserNode.maxDecibels = e, s();} }, { key: "minDecibels", get: function get() {return this._nativeAnalyserNode.minDecibels;}, set: function set(t) {var e = this._nativeAnalyserNode.minDecibels;if (this._nativeAnalyserNode.minDecibels = t, !(this._nativeAnalyserNode.maxDecibels > t)) throw this._nativeAnalyserNode.minDecibels = e, s();} }, { key: "smoothingTimeConstant", get: function get() {return this._nativeAnalyserNode.smoothingTimeConstant;}, set: function set(t) {this._nativeAnalyserNode.smoothingTimeConstant = t;} }]);return _class3;}(t);}(Ve, Se, R, we, ke, De),je = new WeakSet(),Le = function (t) {return null === t ? null : t.hasOwnProperty("AudioBuffer") ? t.AudioBuffer : null;}(xe),ze = (We = new Uint32Array(1), function (t) {return We[0] = t, We[0];});var We;var Be = function (t, e) {return function (s) {s.copyFromChannel = function (n, i) {var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var r = t(o),a = t(i);if (a >= s.numberOfChannels) throw e();var c = s.length,h = s.getChannelData(a),l = n.length;for (var _t23 = r < 0 ? -r : 0; _t23 + r < c && _t23 < l; _t23 += 1) {n[_t23] = h[_t23 + r];}}, s.copyToChannel = function (n, i) {var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var r = t(o),a = t(i);if (a >= s.numberOfChannels) throw e();var c = s.length,h = s.getChannelData(a),l = n.length;for (var _t24 = r < 0 ? -r : 0; _t24 + r < c && _t24 < l; _t24 += 1) {h[_t24 + r] = n[_t24];}};};}(ze, R),Ue = function (t) {return function (e) {e.copyFromChannel = function (s) {return function (n, i) {var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var r = t(o),a = t(i);if (r < e.length) return s.call(e, n, a, r);};}(e.copyFromChannel), e.copyToChannel = function (s) {return function (n, i) {var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var r = t(o),a = t(i);if (r < e.length) return s.call(e, n, a, r);};}(e.copyToChannel);};}(ze),Ge = function (t, e, s, n, i, o, r, a) {var c = null;return /*#__PURE__*/function () {function h(_h2) {_classCallCheck(this, h);if (null === i) throw new Error("Missing the native OfflineAudioContext constructor.");var _F$_h = _objectSpread(_objectSpread({}, F), _h2),l = _F$_h.length,u = _F$_h.numberOfChannels,p = _F$_h.sampleRate;null === c && (c = new i(1, 1, 44100));var d = null !== n && e(o, o) ? new n({ length: l, numberOfChannels: u, sampleRate: p }) : c.createBuffer(u, l, p);if (0 === d.numberOfChannels) throw s();return "function" != typeof d.copyFromChannel ? (r(d), q(d)) : e(E, function () {return E(d);}) || a(d), t.add(d), d;}_createClass(h, null, [{ key: Symbol.hasInstance, value: function value(e) {return null !== e && "object" == typeof e && Object.getPrototypeOf(e) === h.prototype || t.has(e);} }]);return h;}();}(je, ge, Zt, Le, Ce, function (t) {return function () {if (null === t) return !1;try {new t({ length: 1, sampleRate: 44100 });} catch (_unused8) {return !1;}return !0;};}(Le), Be, Ue),Qe = function (t) {return function (e, s) {var n = t(e, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0 });s.connect(n).connect(e.destination);var i = function i() {s.removeEventListener("ended", i), s.disconnect(n), n.disconnect();};s.addEventListener("ended", i);};}(Bt),Ze = function (t, e, s) {return /*#__PURE__*/function () {var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(n, i, o) {var r;return _regeneratorRuntime.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:r = e(n);_context6.next = 3;return Promise.all(Array.from(r.activeInputs).map( /*#__PURE__*/function () {var _ref27 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(_ref26) {var _ref28, e, n, r, a;return _regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_ref28 = _slicedToArray(_ref26, 2), e = _ref28[0], n = _ref28[1];r = t(e);_context5.next = 4;return r.render(e, i);case 4:a = _context5.sent;s(e) || a.connect(o, n);case 6:case "end":return _context5.stop();}}}, _callee5);}));return function (_x17) {return _ref27.apply(this, arguments);};}()));case 3:case "end":return _context6.stop();}}}, _callee6);}));return function (_x14, _x15, _x16) {return _ref25.apply(this, arguments);};}();}(be, L, st),Xe = function (t) {return function (e, s, n) {return t(s, e, n);};}(Ze),Ye = function (t, e, s, n, i, o, r, a, c, h, l) {return function (c, u) {var p = c.createBufferSource();return qt(p, u), It(p, u, "playbackRate"), Rt(p, u, "buffer"), Rt(p, u, "loop"), Rt(p, u, "loopEnd"), Rt(p, u, "loopStart"), e(s, function () {return s(c);}) || function (t) {t.start = function (e) {var s = !1;return function () {var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var o = arguments.length > 2 ? arguments[2] : undefined;if (s) throw At();e.call(t, n, i, o), s = !0;};}(t.start);}(p), e(n, function () {return n(c);}) || function (t) {t.start = function (e) {return function () {var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var i = arguments.length > 2 ? arguments[2] : undefined;var o = t.buffer,r = null === o ? n : Math.min(o.duration, n);null !== o && r > o.duration - .5 / t.context.sampleRate ? e.call(t, s, 0, 0) : e.call(t, s, r, i);};}(t.start);}(p), e(i, function () {return i(c);}) || h(p, c), e(o, function () {return o(c);}) || Vt(p), e(r, function () {return r(c);}) || l(p, c), e(a, function () {return a(c);}) || Nt(p), t(c, p), p;};}(Qe, ge, function (t) {var e = t.createBufferSource();e.start();try {e.start();} catch (_unused9) {return !0;}return !1;}, function (t) {var e = t.createBufferSource(),s = t.createBuffer(1, 1, 44100);e.buffer = s;try {e.start(0, 1);} catch (_unused10) {return !1;}return !0;}, function (t) {var e = t.createBufferSource();e.start();try {e.stop();} catch (_unused11) {return !1;}return !0;}, oe, re, ae, 0, function (t) {return function (e, s) {var n = s.createBuffer(1, 1, 44100);null === e.buffer && (e.buffer = n), t(e, "buffer", function (t) {return function () {var s = t.call(e);return s === n ? null : s;};}, function (t) {return function (s) {return t.call(e, null === s ? n : s);};});};}(ne), le),$e = function (t, e) {return function (s, n, i) {return t(n).replay(i), e(n, s, i);};}(function (t) {return function (e) {var s = t(e);if (null === s.renderer) throw new Error("Missing the renderer of the given AudioParam in the audio graph.");return s.renderer;};}(L), Ze),He = function (t, e, s, n, i) {return function () {var o = new WeakMap();var r = null,a = null;return { set start(t) {r = t;}, set stop(t) {a = t;}, render: function render(c, h) {var l = o.get(h);return void 0 !== l ? Promise.resolve(l) : function () {var _ref29 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(c, h) {var l, u, _l2, _t25;return _regeneratorRuntime.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:l = s(c);u = M(l, h);if (!u) {_t25 = { buffer: l.buffer, channelCount: l.channelCount, channelCountMode: l.channelCountMode, channelInterpretation: l.channelInterpretation, loop: l.loop, loopEnd: l.loopEnd, loopStart: l.loopStart, playbackRate: l.playbackRate.value };l = e(h, _t25), null !== r && (_l2 = l).start.apply(_l2, _toConsumableArray(r)), null !== a && l.stop(a);}o.set(h, l);if (!u) {_context7.next = 9;break;}_context7.next = 7;return t(h, c.playbackRate, l.playbackRate);case 7:_context7.next = 11;break;case 9:_context7.next = 11;return n(h, c.playbackRate, l.playbackRate);case 11:_context7.next = 13;return i(c, h, l);case 13:return _context7.abrupt("return", l);case 14:case "end":return _context7.stop();}}}, _callee7);}));return function (_x18, _x19) {return _ref29.apply(this, arguments);};}()(c, h);} };};}(Xe, Ye, tt, $e, Te),Je = function (t, e, s, n, i, r, a, c, h, l, u, p, d) {return function (n, f, _) {var m = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;var g = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;var v = new o.AutomationEventList(_.defaultValue),y = f ? function (t) {return { replay: function replay(e) {var _iterator13 = _createForOfIteratorHelper(t),_step13;try {for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {var _s16 = _step13.value;if ("exponentialRampToValue" === _s16.type) {var _t26 = _s16.endTime,_n7 = _s16.value;e.exponentialRampToValueAtTime(_n7, _t26);} else if ("linearRampToValue" === _s16.type) {var _t27 = _s16.endTime,_n8 = _s16.value;e.linearRampToValueAtTime(_n8, _t27);} else if ("setTarget" === _s16.type) {var _t28 = _s16.startTime,_n9 = _s16.target,_i11 = _s16.timeConstant;e.setTargetAtTime(_n9, _t28, _i11);} else if ("setValue" === _s16.type) {var _t29 = _s16.startTime,_n10 = _s16.value;e.setValueAtTime(_n10, _t29);} else {if ("setValueCurve" !== _s16.type) throw new Error("Can't apply an unknown automation.");{var _t30 = _s16.duration,_n11 = _s16.startTime,_i12 = _s16.values;e.setValueCurveAtTime(_i12, _n11, _t30);}}}} catch (err) {_iterator13.e(err);} finally {_iterator13.f();}} };}(v) : null,x = { get defaultValue() {return _.defaultValue;}, get maxValue() {return null === m ? _.maxValue : m;}, get minValue() {return null === g ? _.minValue : g;}, get value() {return _.value;}, set value(t) {_.value = t, x.setValueAtTime(t, n.context.currentTime);}, cancelAndHoldAtTime: function cancelAndHoldAtTime(t) {if ("function" == typeof _.cancelAndHoldAtTime) null === y && v.flush(n.context.currentTime), v.add(i(t)), _.cancelAndHoldAtTime(t);else {var _e22 = Array.from(v).pop();null === y && v.flush(n.context.currentTime), v.add(i(t));var _s17 = Array.from(v).pop();_.cancelScheduledValues(t), _e22 !== _s17 && void 0 !== _s17 && ("exponentialRampToValue" === _s17.type ? _.exponentialRampToValueAtTime(_s17.value, _s17.endTime) : "linearRampToValue" === _s17.type ? _.linearRampToValueAtTime(_s17.value, _s17.endTime) : "setValue" === _s17.type ? _.setValueAtTime(_s17.value, _s17.startTime) : "setValueCurve" === _s17.type && _.setValueCurveAtTime(_s17.values, _s17.startTime, _s17.duration));}return x;}, cancelScheduledValues: function cancelScheduledValues(t) {return null === y && v.flush(n.context.currentTime), v.add(r(t)), _.cancelScheduledValues(t), x;}, exponentialRampToValueAtTime: function exponentialRampToValueAtTime(t, e) {if (0 === t) throw new RangeError();if (!Number.isFinite(e) || e < 0) throw new RangeError();return null === y && v.flush(n.context.currentTime), v.add(a(t, e)), _.exponentialRampToValueAtTime(t, e), x;}, linearRampToValueAtTime: function linearRampToValueAtTime(t, e) {return null === y && v.flush(n.context.currentTime), v.add(c(t, e)), _.linearRampToValueAtTime(t, e), x;}, setTargetAtTime: function setTargetAtTime(t, e, s) {return null === y && v.flush(n.context.currentTime), v.add(h(t, e, s)), _.setTargetAtTime(t, e, s), x;}, setValueAtTime: function setValueAtTime(t, e) {return null === y && v.flush(n.context.currentTime), v.add(l(t, e)), _.setValueAtTime(t, e), x;}, setValueCurveAtTime: function setValueCurveAtTime(t, e, s) {var i = t instanceof Float32Array ? t : new Float32Array(t);if (null !== p && "webkitAudioContext" === p.name) {var _t31 = e + s,_o11 = n.context.sampleRate,_r3 = Math.ceil(e * _o11),_a3 = Math.floor(_t31 * _o11),_c2 = _a3 - _r3,_h3 = new Float32Array(_c2);for (var _t32 = 0; _t32 < _c2; _t32 += 1) {var _n12 = (i.length - 1) / s * ((_r3 + _t32) / _o11 - e),_a4 = Math.floor(_n12),_c3 = Math.ceil(_n12);_h3[_t32] = _a4 === _c3 ? i[_a4] : (1 - (_n12 - _a4)) * i[_a4] + (1 - (_c3 - _n12)) * i[_c3];}null === y && v.flush(n.context.currentTime), v.add(u(_h3, e, s)), _.setValueCurveAtTime(_h3, e, s);var _l3 = _a3 / _o11;_l3 < _t31 && d(x, _h3[_h3.length - 1], _l3), d(x, i[i.length - 1], _t31);} else null === y && v.flush(n.context.currentTime), v.add(u(i, e, s)), _.setValueCurveAtTime(i, e, s);return x;} };return s.set(x, _), e.set(x, n), t(x, y), x;};}((Ke = h, function (t, e) {Ke.set(t, { activeInputs: new Set(), passiveInputs: new WeakMap(), renderer: e });}), Oe, l, 0, o.createCancelAndHoldAutomationEvent, o.createCancelScheduledValuesAutomationEvent, o.createExponentialRampToValueAutomationEvent, o.createLinearRampToValueAutomationEvent, o.createSetTargetAutomationEvent, o.createSetValueAutomationEvent, o.createSetValueCurveAutomationEvent, Ee, ie);var Ke;var ts = function (t, e, s, n, i, o, r, a) {return /*#__PURE__*/function (_t33) {_inherits(_class4, _t33);var _super3 = _createSuper(_class4);function _class4(t, n) {var _this4;_classCallCheck(this, _class4);var a = o(t),c = _objectSpread(_objectSpread({}, P), n),h = i(a, c),l = r(a),u = l ? e() : null;_this4 = _super3.call(this, t, !1, h, u), _this4._audioBufferSourceNodeRenderer = u, _this4._isBufferNullified = !1, _this4._isBufferSet = null !== c.buffer, _this4._nativeAudioBufferSourceNode = h, _this4._onended = null, _this4._playbackRate = s(_assertThisInitialized(_this4), l, h.playbackRate, V, I);return _this4;}_createClass(_class4, [{ key: "start", value: function start() {var _this5 = this;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var s = arguments.length > 2 ? arguments[2] : undefined;if (this._nativeAudioBufferSourceNode.start(t, e, s), null !== this._audioBufferSourceNodeRenderer && (this._audioBufferSourceNodeRenderer.start = void 0 === s ? [t, e] : [t, e, s]), "closed" !== this.context.state) {k(this);var _t34 = function _t34() {_this5._nativeAudioBufferSourceNode.removeEventListener("ended", _t34), N(_this5) && C(_this5);};this._nativeAudioBufferSourceNode.addEventListener("ended", _t34);}} }, { key: "stop", value: function stop() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;this._nativeAudioBufferSourceNode.stop(t), null !== this._audioBufferSourceNodeRenderer && (this._audioBufferSourceNodeRenderer.stop = t);} }, { key: "buffer", get: function get() {return this._isBufferNullified ? null : this._nativeAudioBufferSourceNode.buffer;}, set: function set(t) {if (this._nativeAudioBufferSourceNode.buffer = t, null !== t) {if (this._isBufferSet) throw n();this._isBufferSet = !0;}} }, { key: "loop", get: function get() {return this._nativeAudioBufferSourceNode.loop;}, set: function set(t) {this._nativeAudioBufferSourceNode.loop = t;} }, { key: "loopEnd", get: function get() {return this._nativeAudioBufferSourceNode.loopEnd;}, set: function set(t) {this._nativeAudioBufferSourceNode.loopEnd = t;} }, { key: "loopStart", get: function get() {return this._nativeAudioBufferSourceNode.loopStart;}, set: function set(t) {this._nativeAudioBufferSourceNode.loopStart = t;} }, { key: "onended", get: function get() {return this._onended;}, set: function set(t) {var e = "function" == typeof t ? a(this, t) : null;this._nativeAudioBufferSourceNode.onended = e;var s = this._nativeAudioBufferSourceNode.onended;this._onended = null !== s && s === e ? t : s;} }, { key: "playbackRate", get: function get() {return this._playbackRate;} }]);return _class4;}(t);}(Ve, He, Je, At, Ye, ke, De, ue),es = function (t, e, s, n, i, o, r, a) {return /*#__PURE__*/function (_t35) {_inherits(_class5, _t35);var _super4 = _createSuper(_class5);function _class5(t, e) {var _this6;_classCallCheck(this, _class5);var s = o(t),n = r(s),c = i(s, e, n);_this6 = _super4.call(this, t, !1, c, n ? function (t) {var e = new WeakMap();return { render: function render(s, n) {var i = e.get(n);return void 0 !== i ? Promise.resolve(i) : function () {var _ref30 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(s, n) {var i;return _regeneratorRuntime.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:i = n.destination;e.set(n, i);_context8.next = 4;return t(s, n, i);case 4:return _context8.abrupt("return", i);case 5:case "end":return _context8.stop();}}}, _callee8);}));return function (_x20, _x21) {return _ref30.apply(this, arguments);};}()(s, n);} };}(a) : null), _this6._isNodeOfNativeOfflineAudioContext = n, _this6._nativeAudioDestinationNode = c;return _this6;}_createClass(_class5, [{ key: "channelCount", get: function get() {return this._nativeAudioDestinationNode.channelCount;}, set: function set(t) {if (this._isNodeOfNativeOfflineAudioContext) throw n();if (t > this._nativeAudioDestinationNode.maxChannelCount) throw s();this._nativeAudioDestinationNode.channelCount = t;} }, { key: "channelCountMode", get: function get() {return this._nativeAudioDestinationNode.channelCountMode;}, set: function set(t) {if (this._isNodeOfNativeOfflineAudioContext) throw n();this._nativeAudioDestinationNode.channelCountMode = t;} }, { key: "maxChannelCount", get: function get() {return this._nativeAudioDestinationNode.maxChannelCount;} }]);return _class5;}(t);}(Ve, 0, R, At, function (t, e) {return function (s, n, i) {var o = s.destination;if (o.channelCount !== n) try {o.channelCount = n;} catch (_unused12) {}i && "explicit" !== o.channelCountMode && (o.channelCountMode = "explicit"), 0 === o.maxChannelCount && Object.defineProperty(o, "maxChannelCount", { value: n });var r = t(s, { channelCount: n, channelCountMode: o.channelCountMode, channelInterpretation: o.channelInterpretation, gain: 1 });return e(r, "channelCount", function (t) {return function () {return t.call(r);};}, function (t) {return function (e) {t.call(r, e);try {o.channelCount = e;} catch (t) {if (e > o.maxChannelCount) throw t;}};}), e(r, "channelCountMode", function (t) {return function () {return t.call(r);};}, function (t) {return function (e) {t.call(r, e), o.channelCountMode = e;};}), e(r, "channelInterpretation", function (t) {return function () {return t.call(r);};}, function (t) {return function (e) {t.call(r, e), o.channelInterpretation = e;};}), Object.defineProperty(r, "maxChannelCount", { get: function get() {return o.maxChannelCount;} }), r.connect(o), r;};}(Bt, ne), ke, De, Te),ss = function (t, e, s, n, i) {return function () {var o = new WeakMap();return { render: function render(r, a) {var c = o.get(a);return void 0 !== c ? Promise.resolve(c) : function () {var _ref31 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(r, a) {var c, h, _t36;return _regeneratorRuntime.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:c = s(r);h = M(c, a);if (!h) {_t36 = { Q: c.Q.value, channelCount: c.channelCount, channelCountMode: c.channelCountMode, channelInterpretation: c.channelInterpretation, detune: c.detune.value, frequency: c.frequency.value, gain: c.gain.value, type: c.type };c = e(a, _t36);}o.set(a, c);if (!h) {_context9.next = 15;break;}_context9.next = 7;return t(a, r.Q, c.Q);case 7:_context9.next = 9;return t(a, r.detune, c.detune);case 9:_context9.next = 11;return t(a, r.frequency, c.frequency);case 11:_context9.next = 13;return t(a, r.gain, c.gain);case 13:_context9.next = 23;break;case 15:_context9.next = 17;return n(a, r.Q, c.Q);case 17:_context9.next = 19;return n(a, r.detune, c.detune);case 19:_context9.next = 21;return n(a, r.frequency, c.frequency);case 21:_context9.next = 23;return n(a, r.gain, c.gain);case 23:_context9.next = 25;return i(r, a, c);case 25:return _context9.abrupt("return", c);case 26:case "end":return _context9.stop();}}}, _callee9);}));return function (_x22, _x23) {return _ref31.apply(this, arguments);};}()(r, a);} };};}(Xe, jt, tt, $e, Te),ns = function (t) {return function (e, s) {return t.set(e, s);};}(_e),is = function (t, e, s, n, i, o, r, a) {return /*#__PURE__*/function (_t37) {_inherits(_class6, _t37);var _super5 = _createSuper(_class6);function _class6(t, n) {var _this7;_classCallCheck(this, _class6);var c = o(t),h = _objectSpread(_objectSpread({}, mt), n),l = i(c, h),u = r(c);_this7 = _super5.call(this, t, !1, l, u ? s() : null), _this7._Q = e(_assertThisInitialized(_this7), u, l.Q, V, I), _this7._detune = e(_assertThisInitialized(_this7), u, l.detune, 1200 * Math.log2(V), -1200 * Math.log2(V)), _this7._frequency = e(_assertThisInitialized(_this7), u, l.frequency, t.sampleRate / 2, 0), _this7._gain = e(_assertThisInitialized(_this7), u, l.gain, 40 * Math.log10(V), I), _this7._nativeBiquadFilterNode = l, a(_assertThisInitialized(_this7), 1);return _this7;}_createClass(_class6, [{ key: "getFrequencyResponse", value: function getFrequencyResponse(t, e, s) {try {this._nativeBiquadFilterNode.getFrequencyResponse(t, e, s);} catch (t) {if (11 === t.code) throw n();throw t;}if (t.length !== e.length || e.length !== s.length) throw n();} }, { key: "detune", get: function get() {return this._detune;} }, { key: "frequency", get: function get() {return this._frequency;} }, { key: "gain", get: function get() {return this._gain;} }, { key: "Q", get: function get() {return this._Q;} }, { key: "type", get: function get() {return this._nativeBiquadFilterNode.type;}, set: function set(t) {this._nativeBiquadFilterNode.type = t;} }]);return _class6;}(t);}(Ve, Je, ss, Ct, jt, ke, De, ns),os = function (t, e) {return function (s, n, i) {var o = new Set();return s.connect = function (i) {return function (r) {var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var h = 0 === o.size;if (e(r)) return i.call(s, r, a, c), t(o, [r, a, c], function (t) {return t[0] === r && t[1] === a && t[2] === c;}, !0), h && n(), r;i.call(s, r, a), t(o, [r, a], function (t) {return t[0] === r && t[1] === a;}, !0), h && n();};}(s.connect), s.disconnect = function (t) {return function (n, r, a) {var c = o.size > 0;if (void 0 === n) t.apply(s), o.clear();else if ("number" == typeof n) {t.call(s, n);var _iterator14 = _createForOfIteratorHelper(o),_step14;try {for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {var _t38 = _step14.value;_t38[1] === n && o.delete(_t38);}} catch (err) {_iterator14.e(err);} finally {_iterator14.f();}} else {e(n) ? t.call(s, n, r, a) : t.call(s, n, r);var _iterator15 = _createForOfIteratorHelper(o),_step15;try {for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {var _t39 = _step15.value;_t39[0] !== n || void 0 !== r && _t39[1] !== r || void 0 !== a && _t39[2] !== a || o.delete(_t39);}} catch (err) {_iterator15.e(err);} finally {_iterator15.f();}}var h = 0 === o.size;c && h && i();};}(s.disconnect), s;};}(G, qe),rs = function (t, e) {return function (s, n) {n.channelCount = 1, n.channelCountMode = "explicit", Object.defineProperty(n, "channelCount", { get: function get() {return 1;}, set: function set() {throw t();} }), Object.defineProperty(n, "channelCountMode", { get: function get() {return "explicit";}, set: function set() {throw t();} });var i = s.createBufferSource();e(n, function () {var t = n.numberOfInputs;for (var _e23 = 0; _e23 < t; _e23 += 1) {i.connect(n, 0, _e23);}}, function () {return i.disconnect(n);});};}(At, os),as = function (t, e) {return function (s, n) {var i = s.createChannelMerger(n.numberOfInputs);return null !== t && "webkitAudioContext" === t.name && e(s, i), qt(i, n), i;};}(Ee, rs),cs = function (t, e, s) {return function () {var n = new WeakMap();return { render: function render(i, o) {var r = n.get(o);return void 0 !== r ? Promise.resolve(r) : function () {var _ref32 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(i, o) {var r, _e24;return _regeneratorRuntime.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:r = e(i);if (!M(r, o)) {_e24 = { channelCount: r.channelCount, channelCountMode: r.channelCountMode, channelInterpretation: r.channelInterpretation, numberOfInputs: r.numberOfInputs };r = t(o, _e24);}n.set(o, r);_context10.next = 5;return s(i, o, r);case 5:return _context10.abrupt("return", r);case 6:case "end":return _context10.stop();}}}, _callee10);}));return function (_x24, _x25) {return _ref32.apply(this, arguments);};}()(i, o);} };};}(as, tt, Te),hs = function (t, e, s, n, i) {return /*#__PURE__*/function (_t40) {_inherits(_class7, _t40);var _super6 = _createSuper(_class7);function _class7(t, o) {_classCallCheck(this, _class7);var r = n(t),a = _objectSpread(_objectSpread({}, gt), o);return _super6.call(this, t, !1, s(r, a), i(r) ? e() : null);}return _class7;}(t);}(Ve, cs, as, ke, De),ls = function (t, e, s) {return function () {var n = new WeakMap();return { render: function render(i, o) {var r = n.get(o);return void 0 !== r ? Promise.resolve(r) : function () {var _ref33 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11(i, o) {var r, _e25;return _regeneratorRuntime.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:r = e(i);if (!M(r, o)) {_e25 = { channelCount: r.channelCount, channelCountMode: r.channelCountMode, channelInterpretation: r.channelInterpretation, numberOfOutputs: r.numberOfOutputs };r = t(o, _e25);}n.set(o, r);_context11.next = 5;return s(i, o, r);case 5:return _context11.abrupt("return", r);case 6:case "end":return _context11.stop();}}}, _callee11);}));return function (_x26, _x27) {return _ref33.apply(this, arguments);};}()(i, o);} };};}(Lt, tt, Te),us = function (t, e, s, n, i, o) {return /*#__PURE__*/function (_t41) {_inherits(_class8, _t41);var _super7 = _createSuper(_class8);function _class8(t, o) {_classCallCheck(this, _class8);var r = n(t),a = function (t) {return _objectSpread(_objectSpread({}, t), {}, { channelCount: t.numberOfOutputs });}(_objectSpread(_objectSpread({}, vt), o));return _super7.call(this, t, !1, s(r, a), i(r) ? e() : null);}return _class8;}(t);}(Ve, ls, Lt, ke, De),ps = function (t, e, s, n) {return function (i, _ref34) {var o = _ref34.offset,r = _objectWithoutProperties(_ref34, ["offset"]);var a = i.createBuffer(1, 2, 44100),c = e(i, { buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: !1, loopEnd: 0, loopStart: 0, playbackRate: 1 }),h = s(i, _objectSpread(_objectSpread({}, r), {}, { gain: o })),l = a.getChannelData(0);l[0] = 1, l[1] = 1, c.buffer = a, c.loop = !0;var u = { get bufferSize() {}, get channelCount() {return h.channelCount;}, set channelCount(t) {h.channelCount = t;}, get channelCountMode() {return h.channelCountMode;}, set channelCountMode(t) {h.channelCountMode = t;}, get channelInterpretation() {return h.channelInterpretation;}, set channelInterpretation(t) {h.channelInterpretation = t;}, get context() {return h.context;}, get inputs() {return [];}, get numberOfInputs() {return c.numberOfInputs;}, get numberOfOutputs() {return h.numberOfOutputs;}, get offset() {return h.gain;}, get onended() {return c.onended;}, set onended(t) {c.onended = t;}, addEventListener: function addEventListener() {return c.addEventListener(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);}, dispatchEvent: function dispatchEvent() {return c.dispatchEvent(arguments.length <= 0 ? undefined : arguments[0]);}, removeEventListener: function removeEventListener() {return c.removeEventListener(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);}, start: function start() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;c.start.call(c, t);}, stop: function stop() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;c.stop.call(c, t);} };return t(i, c), n(zt(u, h), function () {return c.connect(h);}, function () {return c.disconnect(h);});};}(Qe, Ye, Bt, os),ds = function (t, e, s, n, i) {return function (o, r) {if (void 0 === o.createConstantSource) return s(o, r);var a = o.createConstantSource();return qt(a, r), It(a, r, "offset"), e(n, function () {return n(o);}) || Vt(a), e(i, function () {return i(o);}) || Nt(a), t(o, a), a;};}(Qe, ge, ps, oe, ae),fs = function (t, e, s, n, i) {return function () {var o = new WeakMap();var r = null,a = null;return { set start(t) {r = t;}, set stop(t) {a = t;}, render: function render(c, h) {var l = o.get(h);return void 0 !== l ? Promise.resolve(l) : function () {var _ref35 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12(c, h) {var l, u, _t42;return _regeneratorRuntime.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:l = s(c);u = M(l, h);if (!u) {_t42 = { channelCount: l.channelCount, channelCountMode: l.channelCountMode, channelInterpretation: l.channelInterpretation, offset: l.offset.value };l = e(h, _t42), null !== r && l.start(r), null !== a && l.stop(a);}o.set(h, l);if (!u) {_context12.next = 9;break;}_context12.next = 7;return t(h, c.offset, l.offset);case 7:_context12.next = 11;break;case 9:_context12.next = 11;return n(h, c.offset, l.offset);case 11:_context12.next = 13;return i(c, h, l);case 13:return _context12.abrupt("return", l);case 14:case "end":return _context12.stop();}}}, _callee12);}));return function (_x28, _x29) {return _ref35.apply(this, arguments);};}()(c, h);} };};}(Xe, ds, tt, $e, Te),_s = function (t, e, s, n, i, o, r) {return /*#__PURE__*/function (_t43) {_inherits(_class9, _t43);var _super8 = _createSuper(_class9);function _class9(t, r) {var _this8;_classCallCheck(this, _class9);var a = i(t),c = _objectSpread(_objectSpread({}, yt), r),h = n(a, c),l = o(a),u = l ? s() : null;_this8 = _super8.call(this, t, !1, h, u), _this8._constantSourceNodeRenderer = u, _this8._nativeConstantSourceNode = h, _this8._offset = e(_assertThisInitialized(_this8), l, h.offset, V, I), _this8._onended = null;return _this8;}_createClass(_class9, [{ key: "start", value: function start() {var _this9 = this;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;if (this._nativeConstantSourceNode.start(t), null !== this._constantSourceNodeRenderer && (this._constantSourceNodeRenderer.start = t), "closed" !== this.context.state) {k(this);var _t44 = function _t44() {_this9._nativeConstantSourceNode.removeEventListener("ended", _t44), N(_this9) && C(_this9);};this._nativeConstantSourceNode.addEventListener("ended", _t44);}} }, { key: "stop", value: function stop() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;this._nativeConstantSourceNode.stop(t), null !== this._constantSourceNodeRenderer && (this._constantSourceNodeRenderer.stop = t);} }, { key: "offset", get: function get() {return this._offset;} }, { key: "onended", get: function get() {return this._onended;}, set: function set(t) {var e = "function" == typeof t ? r(this, t) : null;this._nativeConstantSourceNode.onended = e;var s = this._nativeConstantSourceNode.onended;this._onended = null !== s && s === e ? t : s;} }]);return _class9;}(t);}(Ve, Je, fs, ds, ke, De, ue),ms = function (t, e) {return function (s, n) {var i = s.createConvolver();if (qt(i, n), n.disableNormalization === i.normalize && (i.normalize = !n.disableNormalization), Rt(i, n, "buffer"), n.channelCount > 2) throw t();if (e(i, "channelCount", function (t) {return function () {return t.call(i);};}, function (e) {return function (s) {if (s > 2) throw t();return e.call(i, s);};}), "max" === n.channelCountMode) throw t();return e(i, "channelCountMode", function (t) {return function () {return t.call(i);};}, function (e) {return function (s) {if ("max" === s) throw t();return e.call(i, s);};}), i;};}(Zt, ne),gs = function (t, e, s) {return function () {var n = new WeakMap();return { render: function render(i, o) {var r = n.get(o);return void 0 !== r ? Promise.resolve(r) : function () {var _ref36 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13(i, o) {var r, _e26;return _regeneratorRuntime.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:r = e(i);if (!M(r, o)) {_e26 = { buffer: r.buffer, channelCount: r.channelCount, channelCountMode: r.channelCountMode, channelInterpretation: r.channelInterpretation, disableNormalization: !r.normalize };r = t(o, _e26);}n.set(o, r);if (!X(r)) {_context13.next = 8;break;}_context13.next = 6;return s(i, o, r.inputs[0]);case 6:_context13.next = 10;break;case 8:_context13.next = 10;return s(i, o, r);case 10:return _context13.abrupt("return", r);case 11:case "end":return _context13.stop();}}}, _callee13);}));return function (_x30, _x31) {return _ref36.apply(this, arguments);};}()(i, o);} };};}(ms, tt, Te),vs = function (t, e, s, n, i, o) {return /*#__PURE__*/function (_t45) {_inherits(_class10, _t45);var _super9 = _createSuper(_class10);function _class10(t, r) {var _this10;_classCallCheck(this, _class10);var a = n(t),c = _objectSpread(_objectSpread({}, xt), r),h = s(a, c);_this10 = _super9.call(this, t, !1, h, i(a) ? e() : null), _this10._isBufferNullified = !1, _this10._nativeConvolverNode = h, null !== c.buffer && o(_assertThisInitialized(_this10), c.buffer.duration);return _this10;}_createClass(_class10, [{ key: "buffer", get: function get() {return this._isBufferNullified ? null : this._nativeConvolverNode.buffer;}, set: function set(t) {if (this._nativeConvolverNode.buffer = t, null === t && null !== this._nativeConvolverNode.buffer) {var _t46 = this._nativeConvolverNode.context;this._nativeConvolverNode.buffer = _t46.createBuffer(1, 1, 44100), this._isBufferNullified = !0, o(this, 0);} else this._isBufferNullified = !1, o(this, null === this._nativeConvolverNode.buffer ? 0 : this._nativeConvolverNode.buffer.duration);} }, { key: "normalize", get: function get() {return this._nativeConvolverNode.normalize;}, set: function set(t) {this._nativeConvolverNode.normalize = t;} }]);return _class10;}(t);}(Ve, gs, ms, ke, De, ns),ys = function (t, e, s, n, i) {return function (o) {var r = new WeakMap();return { render: function render(a, c) {var h = r.get(c);return void 0 !== h ? Promise.resolve(h) : function () {var _ref37 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14(a, c) {var h, l, _t47;return _regeneratorRuntime.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:h = s(a);l = M(h, c);if (!l) {_t47 = { channelCount: h.channelCount, channelCountMode: h.channelCountMode, channelInterpretation: h.channelInterpretation, delayTime: h.delayTime.value, maxDelayTime: o };h = e(c, _t47);}r.set(c, h);if (!l) {_context14.next = 9;break;}_context14.next = 7;return t(c, a.delayTime, h.delayTime);case 7:_context14.next = 11;break;case 9:_context14.next = 11;return n(c, a.delayTime, h.delayTime);case 11:_context14.next = 13;return i(a, c, h);case 13:return _context14.abrupt("return", h);case 14:case "end":return _context14.stop();}}}, _callee14);}));return function (_x32, _x33) {return _ref37.apply(this, arguments);};}()(a, c);} };};}(Xe, Wt, tt, $e, Te),xs = function (t, e, s, n, i, o, r) {return /*#__PURE__*/function (_t48) {_inherits(_class11, _t48);var _super10 = _createSuper(_class11);function _class11(t, a) {var _this11;_classCallCheck(this, _class11);var c = i(t),h = _objectSpread(_objectSpread({}, bt), a),l = n(c, h),u = o(c);_this11 = _super10.call(this, t, !1, l, u ? s(h.maxDelayTime) : null), _this11._delayTime = e(_assertThisInitialized(_this11), u, l.delayTime), r(_assertThisInitialized(_this11), h.maxDelayTime);return _this11;}_createClass(_class11, [{ key: "delayTime", get: function get() {return this._delayTime;} }]);return _class11;}(t);}(Ve, Je, ys, Wt, ke, De, ns),ws = function (t) {return function (e, s) {var n = e.createDynamicsCompressor();if (qt(n, s), s.channelCount > 2) throw t();if ("max" === s.channelCountMode) throw t();return It(n, s, "attack"), It(n, s, "knee"), It(n, s, "ratio"), It(n, s, "release"), It(n, s, "threshold"), n;};}(Zt),bs = function (t, e, s, n, i) {return function () {var o = new WeakMap();return { render: function render(r, a) {var c = o.get(a);return void 0 !== c ? Promise.resolve(c) : function () {var _ref38 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee15(r, a) {var c, h, _t49;return _regeneratorRuntime.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:c = s(r);h = M(c, a);if (!h) {_t49 = { attack: c.attack.value, channelCount: c.channelCount, channelCountMode: c.channelCountMode, channelInterpretation: c.channelInterpretation, knee: c.knee.value, ratio: c.ratio.value, release: c.release.value, threshold: c.threshold.value };c = e(a, _t49);}o.set(a, c);if (!h) {_context15.next = 17;break;}_context15.next = 7;return t(a, r.attack, c.attack);case 7:_context15.next = 9;return t(a, r.knee, c.knee);case 9:_context15.next = 11;return t(a, r.ratio, c.ratio);case 11:_context15.next = 13;return t(a, r.release, c.release);case 13:_context15.next = 15;return t(a, r.threshold, c.threshold);case 15:_context15.next = 27;break;case 17:_context15.next = 19;return n(a, r.attack, c.attack);case 19:_context15.next = 21;return n(a, r.knee, c.knee);case 21:_context15.next = 23;return n(a, r.ratio, c.ratio);case 23:_context15.next = 25;return n(a, r.release, c.release);case 25:_context15.next = 27;return n(a, r.threshold, c.threshold);case 27:_context15.next = 29;return i(r, a, c);case 29:return _context15.abrupt("return", c);case 30:case "end":return _context15.stop();}}}, _callee15);}));return function (_x34, _x35) {return _ref38.apply(this, arguments);};}()(r, a);} };};}(Xe, ws, tt, $e, Te),Ts = function (t, e, s, n, i, o, r, a) {return /*#__PURE__*/function (_t50) {_inherits(_class12, _t50);var _super11 = _createSuper(_class12);function _class12(t, i) {var _this12;_classCallCheck(this, _class12);var c = o(t),h = _objectSpread(_objectSpread({}, St), i),l = n(c, h),u = r(c);_this12 = _super11.call(this, t, !1, l, u ? s() : null), _this12._attack = e(_assertThisInitialized(_this12), u, l.attack), _this12._knee = e(_assertThisInitialized(_this12), u, l.knee), _this12._nativeDynamicsCompressorNode = l, _this12._ratio = e(_assertThisInitialized(_this12), u, l.ratio), _this12._release = e(_assertThisInitialized(_this12), u, l.release), _this12._threshold = e(_assertThisInitialized(_this12), u, l.threshold), a(_assertThisInitialized(_this12), .006);return _this12;}_createClass(_class12, [{ key: "attack", get: function get() {return this._attack;} }, { key: "channelCount", get: function get() {return this._nativeDynamicsCompressorNode.channelCount;}, set: function set(t) {var e = this._nativeDynamicsCompressorNode.channelCount;if (this._nativeDynamicsCompressorNode.channelCount = t, t > 2) throw this._nativeDynamicsCompressorNode.channelCount = e, i();} }, { key: "channelCountMode", get: function get() {return this._nativeDynamicsCompressorNode.channelCountMode;}, set: function set(t) {var e = this._nativeDynamicsCompressorNode.channelCountMode;if (this._nativeDynamicsCompressorNode.channelCountMode = t, "max" === t) throw this._nativeDynamicsCompressorNode.channelCountMode = e, i();} }, { key: "knee", get: function get() {return this._knee;} }, { key: "ratio", get: function get() {return this._ratio;} }, { key: "reduction", get: function get() {return "number" == typeof this._nativeDynamicsCompressorNode.reduction.value ? this._nativeDynamicsCompressorNode.reduction.value : this._nativeDynamicsCompressorNode.reduction;} }, { key: "release", get: function get() {return this._release;} }, { key: "threshold", get: function get() {return this._threshold;} }]);return _class12;}(t);}(Ve, Je, bs, ws, Zt, ke, De, ns),Ss = function (t, e, s, n, i) {return function () {var o = new WeakMap();return { render: function render(r, a) {var c = o.get(a);return void 0 !== c ? Promise.resolve(c) : function () {var _ref39 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee16(r, a) {var c, h, _t51;return _regeneratorRuntime.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:c = s(r);h = M(c, a);if (!h) {_t51 = { channelCount: c.channelCount, channelCountMode: c.channelCountMode, channelInterpretation: c.channelInterpretation, gain: c.gain.value };c = e(a, _t51);}o.set(a, c);if (!h) {_context16.next = 9;break;}_context16.next = 7;return t(a, r.gain, c.gain);case 7:_context16.next = 11;break;case 9:_context16.next = 11;return n(a, r.gain, c.gain);case 11:_context16.next = 13;return i(r, a, c);case 13:return _context16.abrupt("return", c);case 14:case "end":return _context16.stop();}}}, _callee16);}));return function (_x36, _x37) {return _ref39.apply(this, arguments);};}()(r, a);} };};}(Xe, Bt, tt, $e, Te),ks = function (t, e, s, n, i, o) {return /*#__PURE__*/function (_t52) {_inherits(_class13, _t52);var _super12 = _createSuper(_class13);function _class13(t, r) {var _this13;_classCallCheck(this, _class13);var a = i(t),c = _objectSpread(_objectSpread({}, kt), r),h = n(a, c),l = o(a);_this13 = _super12.call(this, t, !1, h, l ? s() : null), _this13._gain = e(_assertThisInitialized(_this13), l, h.gain, V, I);return _this13;}_createClass(_class13, [{ key: "gain", get: function get() {return this._gain;} }]);return _class13;}(t);}(Ve, Je, Ss, Bt, ke, De),As = function (t, e, s, n) {return function (i, o, _ref40) {var r = _ref40.channelCount,a = _ref40.channelCountMode,c = _ref40.channelInterpretation,h = _ref40.feedback,l = _ref40.feedforward;var u = Pt(o, i.sampleRate),p = h instanceof Float64Array ? h : new Float64Array(h),d = l instanceof Float64Array ? l : new Float64Array(l),f = p.length,_ = d.length,m = Math.min(f, _);if (0 === f || f > 20) throw n();if (0 === p[0]) throw e();if (0 === _ || _ > 20) throw n();if (0 === d[0]) throw e();if (1 !== p[0]) {for (var _t53 = 0; _t53 < _; _t53 += 1) {d[_t53] /= p[0];}for (var _t54 = 1; _t54 < f; _t54 += 1) {p[_t54] /= p[0];}}var g = s(i, u, r, r);g.channelCount = r, g.channelCountMode = a, g.channelInterpretation = c;var v = [],y = [],x = [];for (var _t55 = 0; _t55 < r; _t55 += 1) {v.push(0);var _t56 = new Float32Array(32),_e27 = new Float32Array(32);_t56.fill(0), _e27.fill(0), y.push(_t56), x.push(_e27);}g.onaudioprocess = function (t) {var e = t.inputBuffer,s = t.outputBuffer,n = e.numberOfChannels;for (var _t57 = 0; _t57 < n; _t57 += 1) {var _n13 = e.getChannelData(_t57),_i13 = s.getChannelData(_t57);v[_t57] = Ot(p, f, d, _, m, y[_t57], x[_t57], v[_t57], 32, _n13, _i13);}};var w = i.sampleRate / 2;return zt({ get bufferSize() {return u;}, get channelCount() {return g.channelCount;}, set channelCount(t) {g.channelCount = t;}, get channelCountMode() {return g.channelCountMode;}, set channelCountMode(t) {g.channelCountMode = t;}, get channelInterpretation() {return g.channelInterpretation;}, set channelInterpretation(t) {g.channelInterpretation = t;}, get context() {return g.context;}, get inputs() {return [g];}, get numberOfInputs() {return g.numberOfInputs;}, get numberOfOutputs() {return g.numberOfOutputs;}, addEventListener: function addEventListener() {return g.addEventListener(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);}, dispatchEvent: function dispatchEvent() {return g.dispatchEvent(arguments.length <= 0 ? undefined : arguments[0]);}, getFrequencyResponse: function getFrequencyResponse(e, s, n) {if (e.length !== s.length || s.length !== n.length) throw t();var i = e.length;for (var _t58 = 0; _t58 < i; _t58 += 1) {var _i14 = -Math.PI * (e[_t58] / w),_o12 = [Math.cos(_i14), Math.sin(_i14)],_r4 = Ut(Gt(d, _o12), Gt(p, _o12));s[_t58] = Math.sqrt(_r4[0] * _r4[0] + _r4[1] * _r4[1]), n[_t58] = Math.atan2(_r4[1], _r4[0]);}}, removeEventListener: function removeEventListener() {return g.removeEventListener(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);} }, g);};}(Ct, At, Qt, Zt),Cs = function (t, e, s, n) {return function (i) {return t(Et, function () {return Et(i);}) ? Promise.resolve(t(n, n)).then(function (t) {if (!t) {var _t59 = s(i, 512, 0, 1);i.oncomplete = function () {_t59.onaudioprocess = null, _t59.disconnect();}, _t59.onaudioprocess = function () {return i.currentTime;}, _t59.connect(i.destination);}return i.startRendering();}) : new Promise(function (t) {var s = e(i, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0 });i.oncomplete = function (e) {s.disconnect(), t(e.renderedBuffer);}, s.connect(i.destination), i.startRendering();});};}(ge, Bt, Qt, function (t, e) {return function () {if (null === e) return Promise.resolve(!1);var s = new e(1, 1, 44100),n = t(s, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0 });return new Promise(function (t) {s.oncomplete = function () {n.disconnect(), t(0 !== s.currentTime);}, s.startRendering();});};}(Bt, Ce)),Ds = function (t, e, s, n, i) {return function (o, r) {var a = new WeakMap();var c = null;return { render: function render(h, l) {var u = a.get(l);return void 0 !== u ? Promise.resolve(u) : function () {var _ref41 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee18(h, l) {var u, p, d, _t61, _t60;return _regeneratorRuntime.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:u = null, p = e(h);d = M(p, l);if (!(void 0 === l.createIIRFilter ? u = t(l, { buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: !1, loopEnd: 0, loopStart: 0, playbackRate: 1 }) : d || (p = l.createIIRFilter(r, o)), a.set(l, null === u ? p : u), null !== u)) {_context18.next = 12;break;}if (!(null === c)) {_context18.next = 8;break;}if (!(null === s)) {_context18.next = 6;break;}throw new Error("Missing the native OfflineAudioContext constructor.");case 6:_t61 = new s(h.context.destination.channelCount, h.context.length, l.sampleRate);c = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee17() {return _regeneratorRuntime.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:_context17.next = 2;return n(h, _t61, _t61.destination);case 2:_context17.t0 = function (t, e, s, n) {var i = s instanceof Float64Array ? s : new Float64Array(s),o = n instanceof Float64Array ? n : new Float64Array(n),r = i.length,a = o.length,c = Math.min(r, a);if (1 !== i[0]) {for (var _t62 = 0; _t62 < r; _t62 += 1) {o[_t62] /= i[0];}for (var _t63 = 1; _t63 < a; _t63 += 1) {i[_t63] /= i[0];}}var h = new Float32Array(32),l = new Float32Array(32),u = e.createBuffer(t.numberOfChannels, t.length, t.sampleRate),p = t.numberOfChannels;for (var _e28 = 0; _e28 < p; _e28 += 1) {var _s18 = t.getChannelData(_e28),_n14 = u.getChannelData(_e28);h.fill(0), l.fill(0), Ot(i, r, o, a, c, h, l, 0, 32, _s18, _n14);}return u;};_context17.next = 5;return i(_t61);case 5:_context17.t1 = _context17.sent;_context17.t2 = l;_context17.t3 = o;_context17.t4 = r;return _context17.abrupt("return", (0, _context17.t0)(_context17.t1, _context17.t2, _context17.t3, _context17.t4));case 10:case "end":return _context17.stop();}}}, _callee17);}))();case 8:_context18.next = 10;return c;case 10:_t60 = _context18.sent;return _context18.abrupt("return", (u.buffer = _t60, u.start(0), u));case 12:_context18.next = 14;return n(h, l, p);case 14:return _context18.abrupt("return", p);case 15:case "end":return _context18.stop();}}}, _callee18);}));return function (_x38, _x39) {return _ref41.apply(this, arguments);};}()(h, l);} };};}(Ye, tt, Ce, Te, Cs),Os = function (t) {return function (e, s, n) {if (void 0 === e.createIIRFilter) return t(e, s, n);var i = e.createIIRFilter(n.feedforward, n.feedback);return qt(i, n), i;};}(As),Ms = function (t, e, s, n, i, o) {return /*#__PURE__*/function (_t64) {_inherits(_class14, _t64);var _super13 = _createSuper(_class14);function _class14(t, r) {var _this14;_classCallCheck(this, _class14);var a = n(t),c = i(a),h = _objectSpread(_objectSpread({}, Dt), r),l = e(a, c ? null : t.baseLatency, h);_this14 = _super13.call(this, t, !1, l, c ? s(h.feedback, h.feedforward) : null), function (t) {var e;t.getFrequencyResponse = (e = t.getFrequencyResponse, function (s, n, i) {if (s.length !== n.length || n.length !== i.length) throw Ct();return e.call(t, s, n, i);});}(l), _this14._nativeIIRFilterNode = l, o(_assertThisInitialized(_this14), 1);return _this14;}_createClass(_class14, [{ key: "getFrequencyResponse", value: function getFrequencyResponse(t, e, s) {return this._nativeIIRFilterNode.getFrequencyResponse(t, e, s);} }]);return _class14;}(t);}(Ve, Os, Ds, ke, De, ns),Es = function (t, e, s, n, i, o, r, a) {return function (c, h) {var l = h.listener,_ref43 = void 0 === l.forwardX ? function () {var u = new Float32Array(1),p = e(h, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 9 }),d = r(h);var f = !1,_ = [0, 0, -1, 0, 1, 0],m = [0, 0, 0];var g = function g() {if (f) return;f = !0;var t = n(h, 256, 9, 0);t.onaudioprocess = function (_ref44) {var t = _ref44.inputBuffer;var e = [o(t, u, 0), o(t, u, 1), o(t, u, 2), o(t, u, 3), o(t, u, 4), o(t, u, 5)];e.some(function (t, e) {return t !== _[e];}) && (l.setOrientation.apply(l, e), _ = e);var s = [o(t, u, 6), o(t, u, 7), o(t, u, 8)];s.some(function (t, e) {return t !== m[e];}) && (l.setPosition.apply(l, s), m = s);}, p.connect(t);},v = function v(t) {return function (e) {e !== _[t] && (_[t] = e, l.setOrientation.apply(l, _toConsumableArray(_)));};},y = function y(t) {return function (e) {e !== m[t] && (m[t] = e, l.setPosition.apply(l, _toConsumableArray(m)));};},x = function x(e, n, o) {var r = s(h, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: n });r.connect(p, 0, e), r.start(), Object.defineProperty(r.offset, "defaultValue", { get: function get() {return n;} });var l = t({ context: c }, d, r.offset, V, I);var u, f, _, m, v, y, x;return a(l, "value", function (t) {return function () {return t.call(l);};}, function (t) {return function (e) {try {t.call(l, e);} catch (t) {if (9 !== t.code) throw t;}g(), d && o(e);};}), l.cancelAndHoldAtTime = (u = l.cancelAndHoldAtTime, d ? function () {throw i();} : function () {for (var _len = arguments.length, t = new Array(_len), _key = 0; _key < _len; _key++) {t[_key] = arguments[_key];}var e = u.apply(l, t);return g(), e;}), l.cancelScheduledValues = (f = l.cancelScheduledValues, d ? function () {throw i();} : function () {for (var _len2 = arguments.length, t = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {t[_key2] = arguments[_key2];}var e = f.apply(l, t);return g(), e;}), l.exponentialRampToValueAtTime = (_ = l.exponentialRampToValueAtTime, d ? function () {throw i();} : function () {for (var _len3 = arguments.length, t = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {t[_key3] = arguments[_key3];}var e = _.apply(l, t);return g(), e;}), l.linearRampToValueAtTime = (m = l.linearRampToValueAtTime, d ? function () {throw i();} : function () {for (var _len4 = arguments.length, t = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {t[_key4] = arguments[_key4];}var e = m.apply(l, t);return g(), e;}), l.setTargetAtTime = (v = l.setTargetAtTime, d ? function () {throw i();} : function () {for (var _len5 = arguments.length, t = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {t[_key5] = arguments[_key5];}var e = v.apply(l, t);return g(), e;}), l.setValueAtTime = (y = l.setValueAtTime, d ? function () {throw i();} : function () {for (var _len6 = arguments.length, t = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {t[_key6] = arguments[_key6];}var e = y.apply(l, t);return g(), e;}), l.setValueCurveAtTime = (x = l.setValueCurveAtTime, d ? function () {throw i();} : function () {for (var _len7 = arguments.length, t = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {t[_key7] = arguments[_key7];}var e = x.apply(l, t);return g(), e;}), l;};return { forwardX: x(0, 0, v(0)), forwardY: x(1, 0, v(1)), forwardZ: x(2, -1, v(2)), positionX: x(6, 0, y(0)), positionY: x(7, 0, y(1)), positionZ: x(8, 0, y(2)), upX: x(3, 0, v(3)), upY: x(4, 1, v(4)), upZ: x(5, 0, v(5)) };}() : l,u = _ref43.forwardX,p = _ref43.forwardY,d = _ref43.forwardZ,f = _ref43.positionX,_ = _ref43.positionY,m = _ref43.positionZ,g = _ref43.upX,v = _ref43.upY,y = _ref43.upZ;return { get forwardX() {return u;}, get forwardY() {return p;}, get forwardZ() {return d;}, get positionX() {return f;}, get positionY() {return _;}, get positionZ() {return m;}, get upX() {return g;}, get upY() {return v;}, get upZ() {return y;} };};}(Je, as, ds, Qt, Zt, ee, De, ne),Rs = new WeakMap(),qs = function (t, e, s, n, i, o) {return /*#__PURE__*/function (_s19) {_inherits(_class15, _s19);var _super14 = _createSuper(_class15);function _class15(s, o) {var _this15;_classCallCheck(this, _class15);_this15 = _super14.call(this, s), _this15._nativeContext = s, u.set(_assertThisInitialized(_this15), s), n(s) && i.set(s, new Set()), _this15._destination = new t(_assertThisInitialized(_this15), o), _this15._listener = e(_assertThisInitialized(_this15), s), _this15._onstatechange = null;return _this15;}_createClass(_class15, [{ key: "currentTime", get: function get() {return this._nativeContext.currentTime;} }, { key: "destination", get: function get() {return this._destination;} }, { key: "listener", get: function get() {return this._listener;} }, { key: "onstatechange", get: function get() {return this._onstatechange;}, set: function set(t) {var e = "function" == typeof t ? o(this, t) : null;this._nativeContext.onstatechange = e;var s = this._nativeContext.onstatechange;this._onstatechange = null !== s && s === e ? t : s;} }, { key: "sampleRate", get: function get() {return this._nativeContext.sampleRate;} }, { key: "state", get: function get() {return this._nativeContext.state;} }]);return _class15;}(s);}(es, Es, Me, De, Rs, ue),Fs = function (t, e, s, n, i, o) {return function (r, a) {var c = r.createOscillator();return qt(c, a), It(c, a, "detune"), It(c, a, "frequency"), void 0 !== a.periodicWave ? c.setPeriodicWave(a.periodicWave) : Rt(c, a, "type"), e(s, function () {return s(r);}) || Vt(c), e(n, function () {return n(r);}) || o(c, r), e(i, function () {return i(r);}) || Nt(c), t(r, c), c;};}(Qe, ge, oe, re, ae, le),Is = function (t, e, s, n, i) {return function () {var o = new WeakMap();var r = null,a = null,c = null;return { set periodicWave(t) {r = t;}, set start(t) {a = t;}, set stop(t) {c = t;}, render: function render(h, l) {var u = o.get(l);return void 0 !== u ? Promise.resolve(u) : function () {var _ref45 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee19(h, l) {var u, p, _t65;return _regeneratorRuntime.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:u = s(h);p = M(u, l);if (!p) {_t65 = { channelCount: u.channelCount, channelCountMode: u.channelCountMode, channelInterpretation: u.channelInterpretation, detune: u.detune.value, frequency: u.frequency.value, periodicWave: null === r ? void 0 : r, type: u.type };u = e(l, _t65), null !== a && u.start(a), null !== c && u.stop(c);}o.set(l, u);if (!p) {_context19.next = 11;break;}_context19.next = 7;return t(l, h.detune, u.detune);case 7:_context19.next = 9;return t(l, h.frequency, u.frequency);case 9:_context19.next = 15;break;case 11:_context19.next = 13;return n(l, h.detune, u.detune);case 13:_context19.next = 15;return n(l, h.frequency, u.frequency);case 15:_context19.next = 17;return i(h, l, u);case 17:return _context19.abrupt("return", u);case 18:case "end":return _context19.stop();}}}, _callee19);}));return function (_x40, _x41) {return _ref45.apply(this, arguments);};}()(h, l);} };};}(Xe, Fs, tt, $e, Te),Vs = function (t, e, s, n, i, o, r) {return /*#__PURE__*/function (_t66) {_inherits(_class16, _t66);var _super15 = _createSuper(_class16);function _class16(t, r) {var _this16;_classCallCheck(this, _class16);var a = i(t),c = _objectSpread(_objectSpread({}, Yt), r),h = s(a, c),l = o(a),u = l ? n() : null,p = t.sampleRate / 2;_this16 = _super15.call(this, t, !1, h, u), _this16._detune = e(_assertThisInitialized(_this16), l, h.detune, 153600, -153600), _this16._frequency = e(_assertThisInitialized(_this16), l, h.frequency, p, -p), _this16._nativeOscillatorNode = h, _this16._onended = null, _this16._oscillatorNodeRenderer = u, null !== _this16._oscillatorNodeRenderer && void 0 !== c.periodicWave && (_this16._oscillatorNodeRenderer.periodicWave = c.periodicWave);return _this16;}_createClass(_class16, [{ key: "setPeriodicWave", value: function setPeriodicWave(t) {this._nativeOscillatorNode.setPeriodicWave(t), null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.periodicWave = t);} }, { key: "start", value: function start() {var _this17 = this;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;if (this._nativeOscillatorNode.start(t), null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.start = t), "closed" !== this.context.state) {k(this);var _t67 = function _t67() {_this17._nativeOscillatorNode.removeEventListener("ended", _t67), N(_this17) && C(_this17);};this._nativeOscillatorNode.addEventListener("ended", _t67);}} }, { key: "stop", value: function stop() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;this._nativeOscillatorNode.stop(t), null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.stop = t);} }, { key: "detune", get: function get() {return this._detune;} }, { key: "frequency", get: function get() {return this._frequency;} }, { key: "onended", get: function get() {return this._onended;}, set: function set(t) {var e = "function" == typeof t ? r(this, t) : null;this._nativeOscillatorNode.onended = e;var s = this._nativeOscillatorNode.onended;this._onended = null !== s && s === e ? t : s;} }, { key: "type", get: function get() {return this._nativeOscillatorNode.type;}, set: function set(t) {this._nativeOscillatorNode.type = t, null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.periodicWave = null);} }]);return _class16;}(t);}(Ve, Je, Fs, Is, ke, De, ue),Ns = function (t) {return function (e, s) {var n = t(e, { buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: !1, loopEnd: 0, loopStart: 0, playbackRate: 1 }),i = e.createBuffer(1, 2, 44100);return n.buffer = i, n.loop = !0, n.connect(s), n.start(), function () {n.stop(), n.disconnect(s);};};}(Ye),Ps = function (t, e, s, n, i) {return function (o, _ref46) {var r = _ref46.curve,a = _ref46.oversample,c = _objectWithoutProperties(_ref46, ["curve", "oversample"]);var h = o.createWaveShaper(),l = o.createWaveShaper();qt(h, c), qt(l, c);var u = s(o, _objectSpread(_objectSpread({}, c), {}, { gain: 1 })),p = s(o, _objectSpread(_objectSpread({}, c), {}, { gain: -1 })),d = s(o, _objectSpread(_objectSpread({}, c), {}, { gain: 1 })),f = s(o, _objectSpread(_objectSpread({}, c), {}, { gain: -1 }));var _ = null,m = !1,g = null;var v = { get bufferSize() {}, get channelCount() {return h.channelCount;}, set channelCount(t) {u.channelCount = t, p.channelCount = t, h.channelCount = t, d.channelCount = t, l.channelCount = t, f.channelCount = t;}, get channelCountMode() {return h.channelCountMode;}, set channelCountMode(t) {u.channelCountMode = t, p.channelCountMode = t, h.channelCountMode = t, d.channelCountMode = t, l.channelCountMode = t, f.channelCountMode = t;}, get channelInterpretation() {return h.channelInterpretation;}, set channelInterpretation(t) {u.channelInterpretation = t, p.channelInterpretation = t, h.channelInterpretation = t, d.channelInterpretation = t, l.channelInterpretation = t, f.channelInterpretation = t;}, get context() {return h.context;}, get curve() {return g;}, set curve(s) {if (null !== s && s.length < 2) throw e();if (null === s) h.curve = s, l.curve = s;else {var _t68 = s.length,_e29 = new Float32Array(_t68 + 2 - _t68 % 2),_n15 = new Float32Array(_t68 + 2 - _t68 % 2);_e29[0] = s[0], _n15[0] = -s[_t68 - 1];var _i15 = Math.ceil((_t68 + 1) / 2),_o13 = (_t68 + 1) / 2 - 1;for (var _r5 = 1; _r5 < _i15; _r5 += 1) {var _a5 = _r5 / _i15 * _o13,_c4 = Math.floor(_a5),_h4 = Math.ceil(_a5);_e29[_r5] = _c4 === _h4 ? s[_c4] : (1 - (_a5 - _c4)) * s[_c4] + (1 - (_h4 - _a5)) * s[_h4], _n15[_r5] = _c4 === _h4 ? -s[_t68 - 1 - _c4] : -(1 - (_a5 - _c4)) * s[_t68 - 1 - _c4] - (1 - (_h4 - _a5)) * s[_t68 - 1 - _h4];}_e29[_i15] = _t68 % 2 == 1 ? s[_i15 - 1] : (s[_i15 - 2] + s[_i15 - 1]) / 2, h.curve = _e29, l.curve = _n15;}g = s, m && (n(g) && null === _ ? _ = t(o, u) : null !== _ && (_(), _ = null));}, get inputs() {return [u];}, get numberOfInputs() {return h.numberOfInputs;}, get numberOfOutputs() {return h.numberOfOutputs;}, get oversample() {return h.oversample;}, set oversample(t) {h.oversample = t, l.oversample = t;}, addEventListener: function addEventListener() {return u.addEventListener(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);}, dispatchEvent: function dispatchEvent() {return u.dispatchEvent(arguments.length <= 0 ? undefined : arguments[0]);}, removeEventListener: function removeEventListener() {return u.removeEventListener(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);} };return null !== r && (v.curve = r instanceof Float32Array ? r : new Float32Array(r)), a !== v.oversample && (v.oversample = a), i(zt(v, d), function () {u.connect(h).connect(d), u.connect(p).connect(l).connect(f).connect(d), m = !0, n(g) && (_ = t(o, u));}, function () {u.disconnect(h), h.disconnect(d), u.disconnect(p), p.disconnect(l), l.disconnect(f), f.disconnect(d), m = !1, null !== _ && (_(), _ = null);});};}(Ns, At, Bt, se, os),js = function (t, e, s, n, i, o, r) {return function (a, c) {var h = a.createWaveShaper();if (null !== o && "webkitAudioContext" === o.name && void 0 === a.createGain().gain.automationRate) return s(a, c);qt(h, c);var l = null === c.curve || c.curve instanceof Float32Array ? c.curve : new Float32Array(c.curve);if (null !== l && l.length < 2) throw e();Rt(h, { curve: l }, "curve"), Rt(h, c, "oversample");var u = null,p = !1;return r(h, "curve", function (t) {return function () {return t.call(h);};}, function (e) {return function (s) {return e.call(h, s), p && (n(s) && null === u ? u = t(a, h) : n(s) || null === u || (u(), u = null)), s;};}), i(h, function () {p = !0, n(h.curve) && (u = t(a, h));}, function () {p = !1, null !== u && (u(), u = null);});};}(Ns, At, Ps, se, os, Ee, ne),Ls = function (t, e, s, n, i, o, r, a, c, h) {return function (l, _ref47) {var u = _ref47.coneInnerAngle,p = _ref47.coneOuterAngle,d = _ref47.coneOuterGain,f = _ref47.distanceModel,_ = _ref47.maxDistance,m = _ref47.orientationX,g = _ref47.orientationY,v = _ref47.orientationZ,y = _ref47.panningModel,x = _ref47.positionX,w = _ref47.positionY,b = _ref47.positionZ,T = _ref47.refDistance,S = _ref47.rolloffFactor,k = _objectWithoutProperties(_ref47, ["coneInnerAngle", "coneOuterAngle", "coneOuterGain", "distanceModel", "maxDistance", "orientationX", "orientationY", "orientationZ", "panningModel", "positionX", "positionY", "positionZ", "refDistance", "rolloffFactor"]);var A = l.createPanner();if (k.channelCount > 2) throw r();if ("max" === k.channelCountMode) throw r();qt(A, k);var C = { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete" },D = s(l, _objectSpread(_objectSpread({}, C), {}, { channelInterpretation: "speakers", numberOfInputs: 6 })),O = n(l, _objectSpread(_objectSpread({}, k), {}, { gain: 1 })),M = n(l, _objectSpread(_objectSpread({}, C), {}, { gain: 1 })),E = n(l, _objectSpread(_objectSpread({}, C), {}, { gain: 0 })),R = n(l, _objectSpread(_objectSpread({}, C), {}, { gain: 0 })),q = n(l, _objectSpread(_objectSpread({}, C), {}, { gain: 0 })),F = n(l, _objectSpread(_objectSpread({}, C), {}, { gain: 0 })),I = n(l, _objectSpread(_objectSpread({}, C), {}, { gain: 0 })),V = i(l, 256, 6, 1),N = o(l, _objectSpread(_objectSpread({}, C), {}, { curve: new Float32Array([1, 1]), oversample: "none" }));var P = [m, g, v],j = [x, w, b];var L = new Float32Array(1);V.onaudioprocess = function (_ref48) {var t = _ref48.inputBuffer;var e = [c(t, L, 0), c(t, L, 1), c(t, L, 2)];e.some(function (t, e) {return t !== P[e];}) && (A.setOrientation.apply(A, e), P = e);var s = [c(t, L, 3), c(t, L, 4), c(t, L, 5)];s.some(function (t, e) {return t !== j[e];}) && (A.setPosition.apply(A, s), j = s);}, Object.defineProperty(E.gain, "defaultValue", { get: function get() {return 0;} }), Object.defineProperty(R.gain, "defaultValue", { get: function get() {return 0;} }), Object.defineProperty(q.gain, "defaultValue", { get: function get() {return 0;} }), Object.defineProperty(F.gain, "defaultValue", { get: function get() {return 0;} }), Object.defineProperty(I.gain, "defaultValue", { get: function get() {return 0;} });var z = { get bufferSize() {}, get channelCount() {return A.channelCount;}, set channelCount(t) {if (t > 2) throw r();O.channelCount = t, A.channelCount = t;}, get channelCountMode() {return A.channelCountMode;}, set channelCountMode(t) {if ("max" === t) throw r();O.channelCountMode = t, A.channelCountMode = t;}, get channelInterpretation() {return A.channelInterpretation;}, set channelInterpretation(t) {O.channelInterpretation = t, A.channelInterpretation = t;}, get coneInnerAngle() {return A.coneInnerAngle;}, set coneInnerAngle(t) {A.coneInnerAngle = t;}, get coneOuterAngle() {return A.coneOuterAngle;}, set coneOuterAngle(t) {A.coneOuterAngle = t;}, get coneOuterGain() {return A.coneOuterGain;}, set coneOuterGain(t) {if (t < 0 || t > 1) throw e();A.coneOuterGain = t;}, get context() {return A.context;}, get distanceModel() {return A.distanceModel;}, set distanceModel(t) {A.distanceModel = t;}, get inputs() {return [O];}, get maxDistance() {return A.maxDistance;}, set maxDistance(t) {if (t < 0) throw new RangeError();A.maxDistance = t;}, get numberOfInputs() {return A.numberOfInputs;}, get numberOfOutputs() {return A.numberOfOutputs;}, get orientationX() {return M.gain;}, get orientationY() {return E.gain;}, get orientationZ() {return R.gain;}, get panningModel() {return A.panningModel;}, set panningModel(t) {A.panningModel = t;}, get positionX() {return q.gain;}, get positionY() {return F.gain;}, get positionZ() {return I.gain;}, get refDistance() {return A.refDistance;}, set refDistance(t) {if (t < 0) throw new RangeError();A.refDistance = t;}, get rolloffFactor() {return A.rolloffFactor;}, set rolloffFactor(t) {if (t < 0) throw new RangeError();A.rolloffFactor = t;}, addEventListener: function addEventListener() {return O.addEventListener(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);}, dispatchEvent: function dispatchEvent() {return O.dispatchEvent(arguments.length <= 0 ? undefined : arguments[0]);}, removeEventListener: function removeEventListener() {return O.removeEventListener(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);} };return u !== z.coneInnerAngle && (z.coneInnerAngle = u), p !== z.coneOuterAngle && (z.coneOuterAngle = p), d !== z.coneOuterGain && (z.coneOuterGain = d), f !== z.distanceModel && (z.distanceModel = f), _ !== z.maxDistance && (z.maxDistance = _), m !== z.orientationX.value && (z.orientationX.value = m), g !== z.orientationY.value && (z.orientationY.value = g), v !== z.orientationZ.value && (z.orientationZ.value = v), y !== z.panningModel && (z.panningModel = y), x !== z.positionX.value && (z.positionX.value = x), w !== z.positionY.value && (z.positionY.value = w), b !== z.positionZ.value && (z.positionZ.value = b), T !== z.refDistance && (z.refDistance = T), S !== z.rolloffFactor && (z.rolloffFactor = S), 1 === P[0] && 0 === P[1] && 0 === P[2] || A.setOrientation.apply(A, _toConsumableArray(P)), 0 === j[0] && 0 === j[1] && 0 === j[2] || A.setPosition.apply(A, _toConsumableArray(j)), h(zt(z, A), function () {O.connect(A), t(O, N, 0, 0), N.connect(M).connect(D, 0, 0), N.connect(E).connect(D, 0, 1), N.connect(R).connect(D, 0, 2), N.connect(q).connect(D, 0, 3), N.connect(F).connect(D, 0, 4), N.connect(I).connect(D, 0, 5), D.connect(V).connect(l.destination);}, function () {O.disconnect(A), a(O, N, 0, 0), N.disconnect(M), M.disconnect(D), N.disconnect(E), E.disconnect(D), N.disconnect(R), R.disconnect(D), N.disconnect(q), q.disconnect(D), N.disconnect(F), F.disconnect(D), N.disconnect(I), I.disconnect(D), D.disconnect(V), V.disconnect(l.destination);});};}(Y, At, as, Bt, Qt, js, Zt, K, ee, os),zs = function (t) {return function (e, s) {var n = e.createPanner();return void 0 === n.orientationX ? t(e, s) : (qt(n, s), It(n, s, "orientationX"), It(n, s, "orientationY"), It(n, s, "orientationZ"), It(n, s, "positionX"), It(n, s, "positionY"), It(n, s, "positionZ"), Rt(n, s, "coneInnerAngle"), Rt(n, s, "coneOuterAngle"), Rt(n, s, "coneOuterGain"), Rt(n, s, "distanceModel"), Rt(n, s, "maxDistance"), Rt(n, s, "panningModel"), Rt(n, s, "refDistance"), Rt(n, s, "rolloffFactor"), n);};}(Ls),Ws = function (t, e, s, n, i, o, r, a, c, h) {return function () {var l = new WeakMap();var u = null;return { render: function render(p, d) {var f = l.get(d);return void 0 !== f ? Promise.resolve(f) : function () {var _ref49 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee23(p, d) {var f, _, m, g, v, _t69, _ret2;return _regeneratorRuntime.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:f = null, _ = o(p);m = { channelCount: _.channelCount, channelCountMode: _.channelCountMode, channelInterpretation: _.channelInterpretation }, g = _objectSpread(_objectSpread({}, m), {}, { coneInnerAngle: _.coneInnerAngle, coneOuterAngle: _.coneOuterAngle, coneOuterGain: _.coneOuterGain, distanceModel: _.distanceModel, maxDistance: _.maxDistance, panningModel: _.panningModel, refDistance: _.refDistance, rolloffFactor: _.rolloffFactor }), v = M(_, d);if ("bufferSize" in _) f = n(d, _objectSpread(_objectSpread({}, m), {}, { gain: 1 }));else if (!v) {_t69 = _objectSpread(_objectSpread({}, g), {}, { orientationX: _.orientationX.value, orientationY: _.orientationY.value, orientationZ: _.orientationZ.value, positionX: _.positionX.value, positionY: _.positionY.value, positionZ: _.positionZ.value });_ = i(d, _t69);}if (!(l.set(d, null === f ? _ : f), null !== f)) {_context23.next = 8;break;}return _context23.delegateYield( /*#__PURE__*/_regeneratorRuntime.mark(function _callee22() {var _t70, _n16, t, o, l, _e30, _, v, y, x, _e31, _t72, _s20, _r6;return _regeneratorRuntime.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:if (!(null === u)) {_context22.next = 5;break;}if (!(null === r)) {_context22.next = 3;break;}throw new Error("Missing the native OfflineAudioContext constructor.");case 3:_t70 = new r(6, p.context.length, d.sampleRate), _n16 = e(_t70, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 6 });_n16.connect(_t70.destination), u = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee21() {var e, _t71;return _regeneratorRuntime.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:_context21.next = 2;return Promise.all([p.orientationX, p.orientationY, p.orientationZ, p.positionX, p.positionY, p.positionZ].map( /*#__PURE__*/function () {var _ref51 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee20(e, n) {var i;return _regeneratorRuntime.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:i = s(_t70, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: 0 === n ? 1 : 0 });_context20.next = 3;return a(_t70, e, i.offset);case 3:return _context20.abrupt("return", i);case 4:case "end":return _context20.stop();}}}, _callee20);}));return function (_x44, _x45) {return _ref51.apply(this, arguments);};}()));case 2:e = _context21.sent;for (_t71 = 0; _t71 < 6; _t71 += 1) {e[_t71].connect(_n16, 0, _t71), e[_t71].start(0);}return _context21.abrupt("return", h(_t70));case 5:case "end":return _context21.stop();}}}, _callee21);}))();case 5:_context22.next = 7;return u;case 7:t = _context22.sent;o = n(d, _objectSpread(_objectSpread({}, m), {}, { gain: 1 }));_context22.next = 11;return c(p, d, o);case 11:l = [];for (_e30 = 0; _e30 < t.numberOfChannels; _e30 += 1) {l.push(t.getChannelData(_e30));}_ = [l[0][0], l[1][0], l[2][0]], v = [l[3][0], l[4][0], l[5][0]], y = n(d, _objectSpread(_objectSpread({}, m), {}, { gain: 1 })), x = i(d, _objectSpread(_objectSpread({}, g), {}, { orientationX: _[0], orientationY: _[1], orientationZ: _[2], positionX: v[0], positionY: v[1], positionZ: v[2] }));o.connect(y).connect(x.inputs[0]), x.connect(f);for (_e31 = 128; _e31 < t.length; _e31 += 128) {_t72 = [l[0][_e31], l[1][_e31], l[2][_e31]], _s20 = [l[3][_e31], l[4][_e31], l[5][_e31]];if (_t72.some(function (t, e) {return t !== _[e];}) || _s20.some(function (t, e) {return t !== v[e];})) {_ = _t72, v = _s20;_r6 = _e31 / d.sampleRate;y.gain.setValueAtTime(0, _r6), y = n(d, _objectSpread(_objectSpread({}, m), {}, { gain: 0 })), x = i(d, _objectSpread(_objectSpread({}, g), {}, { orientationX: _[0], orientationY: _[1], orientationZ: _[2], positionX: v[0], positionY: v[1], positionZ: v[2] })), y.gain.setValueAtTime(1, _r6), o.connect(y).connect(x.inputs[0]), x.connect(f);}}return _context22.abrupt("return", { v: f });case 17:case "end":return _context22.stop();}}}, _callee22);})(), "t0", 5);case 5:_ret2 = _context23.t0;if (!(typeof _ret2 === "object")) {_context23.next = 8;break;}return _context23.abrupt("return", _ret2.v);case 8:if (!v) {_context23.next = 23;break;}_context23.next = 11;return t(d, p.orientationX, _.orientationX);case 11:_context23.next = 13;return t(d, p.orientationY, _.orientationY);case 13:_context23.next = 15;return t(d, p.orientationZ, _.orientationZ);case 15:_context23.next = 17;return t(d, p.positionX, _.positionX);case 17:_context23.next = 19;return t(d, p.positionY, _.positionY);case 19:_context23.next = 21;return t(d, p.positionZ, _.positionZ);case 21:_context23.next = 35;break;case 23:_context23.next = 25;return a(d, p.orientationX, _.orientationX);case 25:_context23.next = 27;return a(d, p.orientationY, _.orientationY);case 27:_context23.next = 29;return a(d, p.orientationZ, _.orientationZ);case 29:_context23.next = 31;return a(d, p.positionX, _.positionX);case 31:_context23.next = 33;return a(d, p.positionY, _.positionY);case 33:_context23.next = 35;return a(d, p.positionZ, _.positionZ);case 35:if (!X(_)) {_context23.next = 40;break;}_context23.next = 38;return c(p, d, _.inputs[0]);case 38:_context23.next = 42;break;case 40:_context23.next = 42;return c(p, d, _);case 42:return _context23.abrupt("return", _);case 43:case "end":return _context23.stop();}}}, _callee23);}));return function (_x42, _x43) {return _ref49.apply(this, arguments);};}()(p, d);} };};}(Xe, as, ds, Bt, zs, tt, Ce, $e, Te, Cs),Bs = function (t, e, s, n, i, o, r) {return /*#__PURE__*/function (_t73) {_inherits(_class17, _t73);var _super16 = _createSuper(_class17);function _class17(t, a) {var _this18;_classCallCheck(this, _class17);var c = i(t),h = _objectSpread(_objectSpread({}, $t), a),l = s(c, h),u = o(c);_this18 = _super16.call(this, t, !1, l, u ? n() : null), _this18._nativePannerNode = l, _this18._orientationX = e(_assertThisInitialized(_this18), u, l.orientationX, V, I), _this18._orientationY = e(_assertThisInitialized(_this18), u, l.orientationY, V, I), _this18._orientationZ = e(_assertThisInitialized(_this18), u, l.orientationZ, V, I), _this18._positionX = e(_assertThisInitialized(_this18), u, l.positionX, V, I), _this18._positionY = e(_assertThisInitialized(_this18), u, l.positionY, V, I), _this18._positionZ = e(_assertThisInitialized(_this18), u, l.positionZ, V, I), r(_assertThisInitialized(_this18), 1);return _this18;}_createClass(_class17, [{ key: "coneInnerAngle", get: function get() {return this._nativePannerNode.coneInnerAngle;}, set: function set(t) {this._nativePannerNode.coneInnerAngle = t;} }, { key: "coneOuterAngle", get: function get() {return this._nativePannerNode.coneOuterAngle;}, set: function set(t) {this._nativePannerNode.coneOuterAngle = t;} }, { key: "coneOuterGain", get: function get() {return this._nativePannerNode.coneOuterGain;}, set: function set(t) {this._nativePannerNode.coneOuterGain = t;} }, { key: "distanceModel", get: function get() {return this._nativePannerNode.distanceModel;}, set: function set(t) {this._nativePannerNode.distanceModel = t;} }, { key: "maxDistance", get: function get() {return this._nativePannerNode.maxDistance;}, set: function set(t) {this._nativePannerNode.maxDistance = t;} }, { key: "orientationX", get: function get() {return this._orientationX;} }, { key: "orientationY", get: function get() {return this._orientationY;} }, { key: "orientationZ", get: function get() {return this._orientationZ;} }, { key: "panningModel", get: function get() {return this._nativePannerNode.panningModel;}, set: function set(t) {this._nativePannerNode.panningModel = t;} }, { key: "positionX", get: function get() {return this._positionX;} }, { key: "positionY", get: function get() {return this._positionY;} }, { key: "positionZ", get: function get() {return this._positionZ;} }, { key: "refDistance", get: function get() {return this._nativePannerNode.refDistance;}, set: function set(t) {this._nativePannerNode.refDistance = t;} }, { key: "rolloffFactor", get: function get() {return this._nativePannerNode.rolloffFactor;}, set: function set(t) {this._nativePannerNode.rolloffFactor = t;} }]);return _class17;}(t);}(Ve, Je, zs, Ws, ke, De, ns),Us = function (t) {return function (e, _ref52) {var s = _ref52.disableNormalization,n = _ref52.imag,i = _ref52.real;var o = n instanceof Float32Array ? n : new Float32Array(n),r = i instanceof Float32Array ? i : new Float32Array(i),a = e.createPeriodicWave(r, o, { disableNormalization: s });if (Array.from(n).length < 2) throw t();return a;};}(R),Gs = function (t, e, s, n) {return /*#__PURE__*/function () {function n(_n17, i) {_classCallCheck(this, n);var o = e(_n17),r = function (t) {var e = t.imag,s = t.real;return void 0 === e ? void 0 === s ? _objectSpread(_objectSpread({}, t), {}, { imag: [0, 0], real: [0, 0] }) : _objectSpread(_objectSpread({}, t), {}, { imag: Array.from(s, function () {return 0;}), real: s }) : void 0 === s ? _objectSpread(_objectSpread({}, t), {}, { imag: e, real: Array.from(e, function () {return 0;}) }) : _objectSpread(_objectSpread({}, t), {}, { imag: e, real: s });}(_objectSpread(_objectSpread({}, Ht), i)),a = t(o, r);return s.add(a), a;}_createClass(n, null, [{ key: Symbol.hasInstance, value: function value(t) {return null !== t && "object" == typeof t && Object.getPrototypeOf(t) === n.prototype || s.has(t);} }]);return n;}();}(Us, ke, new WeakSet()),Qs = function (t, e, s, n, i, o) {var r = 16385,a = new Float32Array([1, 1]),c = Math.PI / 2,h = { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete" },l = _objectSpread(_objectSpread({}, h), {}, { oversample: "none" }),u = function u(t, o, _u2, p, d) {if (1 === o) return function (t, e, i, o) {var u = new Float32Array(r),p = new Float32Array(r);for (var _t74 = 0; _t74 < r; _t74 += 1) {var _e32 = _t74 / 16384 * c;u[_t74] = Math.cos(_e32), p[_t74] = Math.sin(_e32);}var d = s(t, _objectSpread(_objectSpread({}, h), {}, { gain: 0 })),f = n(t, _objectSpread(_objectSpread({}, l), {}, { curve: u })),_ = n(t, _objectSpread(_objectSpread({}, l), {}, { curve: a })),m = s(t, _objectSpread(_objectSpread({}, h), {}, { gain: 0 })),g = n(t, _objectSpread(_objectSpread({}, l), {}, { curve: p }));return { connectGraph: function connectGraph() {e.connect(d), e.connect(void 0 === _.inputs ? _ : _.inputs[0]), e.connect(m), _.connect(i), i.connect(void 0 === f.inputs ? f : f.inputs[0]), i.connect(void 0 === g.inputs ? g : g.inputs[0]), f.connect(d.gain), g.connect(m.gain), d.connect(o, 0, 0), m.connect(o, 0, 1);}, disconnectGraph: function disconnectGraph() {e.disconnect(d), e.disconnect(void 0 === _.inputs ? _ : _.inputs[0]), e.disconnect(m), _.disconnect(i), i.disconnect(void 0 === f.inputs ? f : f.inputs[0]), i.disconnect(void 0 === g.inputs ? g : g.inputs[0]), f.disconnect(d.gain), g.disconnect(m.gain), d.disconnect(o, 0, 0), m.disconnect(o, 0, 1);} };}(t, _u2, p, d);if (2 === o) return function (t, i, o, u) {var p = new Float32Array(r),d = new Float32Array(r),f = new Float32Array(r),_ = new Float32Array(r),m = Math.floor(8192.5);for (var _t75 = 0; _t75 < r; _t75 += 1) {if (_t75 > m) {var _e33 = (_t75 - m) / (16384 - m) * c;p[_t75] = Math.cos(_e33), d[_t75] = Math.sin(_e33), f[_t75] = 0, _[_t75] = 1;} else {var _e34 = _t75 / (16384 - m) * c;p[_t75] = 1, d[_t75] = 0, f[_t75] = Math.cos(_e34), _[_t75] = Math.sin(_e34);}}var g = e(t, { channelCount: 2, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: 2 }),v = s(t, _objectSpread(_objectSpread({}, h), {}, { gain: 0 })),y = n(t, _objectSpread(_objectSpread({}, l), {}, { curve: p })),x = s(t, _objectSpread(_objectSpread({}, h), {}, { gain: 0 })),w = n(t, _objectSpread(_objectSpread({}, l), {}, { curve: d })),b = n(t, _objectSpread(_objectSpread({}, l), {}, { curve: a })),T = s(t, _objectSpread(_objectSpread({}, h), {}, { gain: 0 })),S = n(t, _objectSpread(_objectSpread({}, l), {}, { curve: f })),k = s(t, _objectSpread(_objectSpread({}, h), {}, { gain: 0 })),A = n(t, _objectSpread(_objectSpread({}, l), {}, { curve: _ }));return { connectGraph: function connectGraph() {i.connect(g), i.connect(void 0 === b.inputs ? b : b.inputs[0]), g.connect(v, 0), g.connect(x, 0), g.connect(T, 1), g.connect(k, 1), b.connect(o), o.connect(void 0 === y.inputs ? y : y.inputs[0]), o.connect(void 0 === w.inputs ? w : w.inputs[0]), o.connect(void 0 === S.inputs ? S : S.inputs[0]), o.connect(void 0 === A.inputs ? A : A.inputs[0]), y.connect(v.gain), w.connect(x.gain), S.connect(T.gain), A.connect(k.gain), v.connect(u, 0, 0), T.connect(u, 0, 0), x.connect(u, 0, 1), k.connect(u, 0, 1);}, disconnectGraph: function disconnectGraph() {i.disconnect(g), i.disconnect(void 0 === b.inputs ? b : b.inputs[0]), g.disconnect(v, 0), g.disconnect(x, 0), g.disconnect(T, 1), g.disconnect(k, 1), b.disconnect(o), o.disconnect(void 0 === y.inputs ? y : y.inputs[0]), o.disconnect(void 0 === w.inputs ? w : w.inputs[0]), o.disconnect(void 0 === S.inputs ? S : S.inputs[0]), o.disconnect(void 0 === A.inputs ? A : A.inputs[0]), y.disconnect(v.gain), w.disconnect(x.gain), S.disconnect(T.gain), A.disconnect(k.gain), v.disconnect(u, 0, 0), T.disconnect(u, 0, 0), x.disconnect(u, 0, 1), k.disconnect(u, 0, 1);} };}(t, _u2, p, d);throw i();};return function (e, _ref53) {var n = _ref53.channelCount,r = _ref53.channelCountMode,a = _ref53.pan,c = _objectWithoutProperties(_ref53, ["channelCount", "channelCountMode", "pan"]);if ("max" === r) throw i();var h = t(e, _objectSpread(_objectSpread({}, c), {}, { channelCount: 1, channelCountMode: r, numberOfInputs: 2 })),l = s(e, _objectSpread(_objectSpread({}, c), {}, { channelCount: n, channelCountMode: r, gain: 1 })),p = s(e, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: a });var _u3 = u(e, n, l, p, h),d = _u3.connectGraph,f = _u3.disconnectGraph;Object.defineProperty(p.gain, "defaultValue", { get: function get() {return 0;} }), Object.defineProperty(p.gain, "maxValue", { get: function get() {return 1;} }), Object.defineProperty(p.gain, "minValue", { get: function get() {return -1;} });var _ = { get bufferSize() {}, get channelCount() {return l.channelCount;}, set channelCount(t) {var _u4;l.channelCount !== t && (m && f(), (_u4 = u(e, t, l, p, h), d = _u4.connectGraph, f = _u4.disconnectGraph, _u4), m && d()), l.channelCount = t;}, get channelCountMode() {return l.channelCountMode;}, set channelCountMode(t) {if ("clamped-max" === t || "max" === t) throw i();l.channelCountMode = t;}, get channelInterpretation() {return l.channelInterpretation;}, set channelInterpretation(t) {l.channelInterpretation = t;}, get context() {return l.context;}, get inputs() {return [l];}, get numberOfInputs() {return l.numberOfInputs;}, get numberOfOutputs() {return l.numberOfOutputs;}, get pan() {return p.gain;}, addEventListener: function addEventListener() {return l.addEventListener(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);}, dispatchEvent: function dispatchEvent() {return l.dispatchEvent(arguments.length <= 0 ? undefined : arguments[0]);}, removeEventListener: function removeEventListener() {return l.removeEventListener(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);} };var m = !1;return o(zt(_, h), function () {d(), m = !0;}, function () {f(), m = !1;});};}(as, Lt, Bt, js, Zt, os),Zs = function (t, e) {return function (s, n) {var i = n.channelCountMode;if ("clamped-max" === i) throw e();if (void 0 === s.createStereoPanner) return t(s, n);var o = s.createStereoPanner();return qt(o, n), It(o, n, "pan"), Object.defineProperty(o, "channelCountMode", { get: function get() {return i;}, set: function set(t) {if (t !== i) throw e();} }), o;};}(Qs, Zt),Xs = function (t, e, s, n, i) {return function () {var o = new WeakMap();return { render: function render(r, a) {var c = o.get(a);return void 0 !== c ? Promise.resolve(c) : function () {var _ref54 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee24(r, a) {var c, h, _t76;return _regeneratorRuntime.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:c = s(r);h = M(c, a);if (!h) {_t76 = { channelCount: c.channelCount, channelCountMode: c.channelCountMode, channelInterpretation: c.channelInterpretation, pan: c.pan.value };c = e(a, _t76);}o.set(a, c);if (!h) {_context24.next = 9;break;}_context24.next = 7;return t(a, r.pan, c.pan);case 7:_context24.next = 11;break;case 9:_context24.next = 11;return n(a, r.pan, c.pan);case 11:if (!X(c)) {_context24.next = 16;break;}_context24.next = 14;return i(r, a, c.inputs[0]);case 14:_context24.next = 18;break;case 16:_context24.next = 18;return i(r, a, c);case 18:return _context24.abrupt("return", c);case 19:case "end":return _context24.stop();}}}, _callee24);}));return function (_x46, _x47) {return _ref54.apply(this, arguments);};}()(r, a);} };};}(Xe, Zs, tt, $e, Te),Ys = function (t, e, s, n, i, o) {return /*#__PURE__*/function (_t77) {_inherits(_class18, _t77);var _super17 = _createSuper(_class18);function _class18(t, r) {var _this19;_classCallCheck(this, _class18);var a = i(t),c = _objectSpread(_objectSpread({}, Jt), r),h = s(a, c),l = o(a);_this19 = _super17.call(this, t, !1, h, l ? n() : null), _this19._pan = e(_assertThisInitialized(_this19), l, h.pan);return _this19;}_createClass(_class18, [{ key: "pan", get: function get() {return this._pan;} }]);return _class18;}(t);}(Ve, Je, Zs, Xs, ke, De),$s = function (t, e, s) {return function () {var n = new WeakMap();return { render: function render(i, o) {var r = n.get(o);return void 0 !== r ? Promise.resolve(r) : function () {var _ref55 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee25(i, o) {var r, _e35;return _regeneratorRuntime.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:r = e(i);if (!M(r, o)) {_e35 = { channelCount: r.channelCount, channelCountMode: r.channelCountMode, channelInterpretation: r.channelInterpretation, curve: r.curve, oversample: r.oversample };r = t(o, _e35);}n.set(o, r);if (!X(r)) {_context25.next = 8;break;}_context25.next = 6;return s(i, o, r.inputs[0]);case 6:_context25.next = 10;break;case 8:_context25.next = 10;return s(i, o, r);case 10:return _context25.abrupt("return", r);case 11:case "end":return _context25.stop();}}}, _callee25);}));return function (_x48, _x49) {return _ref55.apply(this, arguments);};}()(i, o);} };};}(js, tt, Te),Hs = function (t, e, s, n, i, o, r) {return /*#__PURE__*/function (_t78) {_inherits(_class19, _t78);var _super18 = _createSuper(_class19);function _class19(t, e) {var _this20;_classCallCheck(this, _class19);var a = i(t),c = _objectSpread(_objectSpread({}, te), e),h = s(a, c);_this20 = _super18.call(this, t, !0, h, o(a) ? n() : null), _this20._isCurveNullified = !1, _this20._nativeWaveShaperNode = h, r(_assertThisInitialized(_this20), 1);return _this20;}_createClass(_class19, [{ key: "curve", get: function get() {return this._isCurveNullified ? null : this._nativeWaveShaperNode.curve;}, set: function set(t) {if (null === t) this._isCurveNullified = !0, this._nativeWaveShaperNode.curve = new Float32Array([0, 0]);else {if (t.length < 2) throw e();this._isCurveNullified = !1, this._nativeWaveShaperNode.curve = t;}} }, { key: "oversample", get: function get() {return this._nativeWaveShaperNode.oversample;}, set: function set(t) {this._nativeWaveShaperNode.oversample = t;} }]);return _class19;}(t);}(Ve, At, js, $s, ke, De, ns),Js = function (t) {return null !== t && t.isSecureContext;}(xe),Ks = function (t) {return function (e, s, n) {Object.defineProperties(t, { currentFrame: { configurable: !0, get: function get() {return Math.round(e * s);} }, currentTime: { configurable: !0, get: function get() {return e;} } });try {return n();} finally {null !== t && (delete t.currentFrame, delete t.currentTime);}};}(xe),tn = new WeakMap(),en = function (t, e) {return function (s) {var n = t.get(s);if (void 0 !== n) return n;if (null === e) throw new Error("Missing the native OfflineAudioContext constructor.");return n = new e(1, 1, 44100), t.set(s, n), n;};}(tn, Ce),sn = Js ? function (t, e, s, n, i, o, r, a, c, h, l, u, p) {var d = 0;return function (_, m) {var g = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { credentials: "omit" };var w = l.get(_);if (void 0 !== w && w.has(m)) return Promise.resolve();var b = h.get(_);if (void 0 !== b) {var _t79 = b.get(m);if (void 0 !== _t79) return _t79;}var T = o(_),S = void 0 === T.audioWorklet ? i(m).then(function (_ref56) {var _ref57 = _slicedToArray(_ref56, 2),t = _ref57[0],e = _ref57[1];var _v = v(t, e),_v2 = _slicedToArray(_v, 2),n = _v2[0],i = _v2[1];return s("".concat(n, ";((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{").concat(i, "\n})})(window,'_AWGS')"));}).then(function () {var t = p._AWGS.pop();if (void 0 === t) throw new SyntaxError();n(T.currentTime, T.sampleRate, function () {return t( /*#__PURE__*/function () {function _class20() {_classCallCheck(this, _class20);}return _class20;}(), void 0, function (t, s) {if ("" === t.trim()) throw e();var n = f.get(T);if (void 0 !== n) {if (n.has(t)) throw e();x(s), y(s.parameterDescriptors), n.set(t, s);} else x(s), y(s.parameterDescriptors), f.set(T, new Map([[t, s]]));}, T.sampleRate, void 0, void 0);});}) : Promise.all([i(m), Promise.resolve(t(u, u))]).then(function (_ref58) {var _ref59 = _slicedToArray(_ref58, 2),_ref59$ = _slicedToArray(_ref59[0], 2),t = _ref59$[0],e = _ref59$[1],s = _ref59[1];var n = d + 1;d = n;var _v3 = v(t, e),_v4 = _slicedToArray(_v3, 2),i = _v4[0],o = _v4[1],h = new Blob(["".concat(i, ";((AudioWorkletProcessor,registerProcessor)=>{").concat(o, "\n})(").concat(s ? "AudioWorkletProcessor" : "class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}", ",(n,p)=>registerProcessor(n,class extends p{").concat(s ? "" : "__c = (a) => a.forEach(e=>this.__b.add(e.buffer));", "process(i,o,p){").concat(s ? "" : "i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));", "return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac").concat(n, "',class extends AudioWorkletProcessor{process(){return !1}})")], { type: "application/javascript; charset=utf-8" }),l = URL.createObjectURL(h);return T.audioWorklet.addModule(l, g).then(function () {if (a(T)) return T;var t = r(T);return t.audioWorklet.addModule(l, g).then(function () {return t;});}).then(function (t) {if (null === c) throw new SyntaxError();try {new c(t, "__sac".concat(n));} catch (_unused13) {throw new SyntaxError();}}).finally(function () {return URL.revokeObjectURL(l);});});return void 0 === b ? h.set(_, new Map([[m, S]])) : b.set(m, S), S.then(function () {var t = l.get(_);void 0 === t ? l.set(_, new Set([m])) : t.add(m);}).finally(function () {var t = h.get(_);void 0 !== t && t.delete(m);}), S;};}(ge, Zt, function (t) {return function (e) {return new Promise(function (s, n) {if (null === t) return void n(new SyntaxError());var i = t.document.head;if (null === i) n(new SyntaxError());else {var _o14 = t.document.createElement("script"),_r7 = new Blob([e], { type: "application/javascript" }),_a6 = URL.createObjectURL(_r7),_c5 = t.onerror,_h5 = function _h5() {t.onerror = _c5, URL.revokeObjectURL(_a6);};t.onerror = function (e, s, i, o, r) {return s === _a6 || s === t.location.href && 1 === i && 1 === o ? (_h5(), n(r), !1) : null !== _c5 ? _c5(e, s, i, o, r) : void 0;}, _o14.onerror = function () {_h5(), n(new SyntaxError());}, _o14.onload = function () {_h5(), s();}, _o14.src = _a6, _o14.type = "module", i.appendChild(_o14);}});};}(xe), Ks, /*#__PURE__*/function () {var _ref60 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee26(t) {var _e36;return _regeneratorRuntime.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.prev = 0;_context26.next = 3;return fetch(t);case 3:_e36 = _context26.sent;if (!_e36.ok) {_context26.next = 10;break;}_context26.next = 7;return _e36.text();case 7:_context26.t0 = _context26.sent;_context26.t1 = _e36.url;return _context26.abrupt("return", [_context26.t0, _context26.t1]);case 10:_context26.next = 14;break;case 12:_context26.prev = 12;_context26.t2 = _context26["catch"](0);case 14:throw new DOMException("", "AbortError");case 15:case "end":return _context26.stop();}}}, _callee26, null, [[0, 12]]);}));return function (_x50) {return _ref60.apply(this, arguments);};}(), ke, en, De, Ie, new WeakMap(), new WeakMap(), function (t, e) {return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee27() {var s, n, i, o, r, _e37, _s21;return _regeneratorRuntime.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!(null === t)) {_context27.next = 2;break;}return _context27.abrupt("return", !0);case 2:if (!(null === e)) {_context27.next = 4;break;}return _context27.abrupt("return", !1);case 4:s = new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'], { type: "application/javascript; charset=utf-8" }), n = new e(1, 128, 44100), i = URL.createObjectURL(s);o = !1, r = !1;_context27.prev = 6;_context27.next = 9;return n.audioWorklet.addModule(i);case 9:_e37 = new t(n, "a", { numberOfOutputs: 0 }), _s21 = n.createOscillator();_e37.port.onmessage = function () {return o = !0;};_e37.onprocessorerror = function () {return r = !0;};_s21.connect(_e37);_s21.start(0);_context27.next = 16;return n.startRendering();case 16:_context27.next = 20;break;case 18:_context27.prev = 18;_context27.t0 = _context27["catch"](6);case 20:_context27.prev = 20;URL.revokeObjectURL(i);return _context27.finish(20);case 23:return _context27.abrupt("return", o && !r);case 24:case "end":return _context27.stop();}}}, _callee27, null, [[6, 18, 20, 23]]);}));}(Ie, Ce), xe) : void 0,nn = function (t, e) {return function (s) {return t(s) || e(s);};}(Re, De),on = function (t, e, s, n, i, o, r, a, c, h, l) {return function (s, n) {var u = r(s) ? s : o(s);if (i.has(n)) {var _t80 = new DOMException("", "DataCloneError");return Promise.reject(_t80);}try {i.add(n);} catch (_unused16) {}return e(c, function () {return c(u);}) ? u.decodeAudioData(n).then(function (s) {return wt(n).catch(function () {}), e(a, function () {return a(s);}) || l(s), t.add(s), s;}) : new Promise(function (e, s) {var i = /*#__PURE__*/function () {var _ref62 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee28() {return _regeneratorRuntime.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:_context28.prev = 0;_context28.next = 3;return wt(n);case 3:_context28.next = 7;break;case 5:_context28.prev = 5;_context28.t0 = _context28["catch"](0);case 7:case "end":return _context28.stop();}}}, _callee28, null, [[0, 5]]);}));return function i() {return _ref62.apply(this, arguments);};}(),o = function o(t) {s(t), i();};try {u.decodeAudioData(n, function (s) {"function" != typeof s.copyFromChannel && (h(s), q(s)), t.add(s), i().then(function () {return e(s);});}, function (t) {o(null === t ? new DOMException("", "EncodingError") : t);});} catch (t) {o(t);}});};}(je, ge, 0, 0, new WeakSet(), ke, nn, E, Et, Be, Ue),rn = function (t, e, s, n, i, o, r, a, c, h, l, u, p, d, f, _, m, g, v, y) {return /*#__PURE__*/function (_f) {_inherits(_class21, _f);var _super19 = _createSuper(_class21);function _class21(e, s) {var _this21;_classCallCheck(this, _class21);_this21 = _super19.call(this, e, s), _this21._nativeContext = e, _this21._audioWorklet = void 0 === t ? void 0 : { addModule: function addModule(e, s) {return t(_assertThisInitialized(_this21), e, s);} };return _this21;}_createClass(_class21, [{ key: "createAnalyser", value: function createAnalyser() {return new e(this);} }, { key: "createBiquadFilter", value: function createBiquadFilter() {return new i(this);} }, { key: "createBuffer", value: function createBuffer(t, e, n) {return new s({ length: e, numberOfChannels: t, sampleRate: n });} }, { key: "createBufferSource", value: function createBufferSource() {return new n(this);} }, { key: "createChannelMerger", value: function createChannelMerger() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;return new o(this, { numberOfInputs: t });} }, { key: "createChannelSplitter", value: function createChannelSplitter() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;return new r(this, { numberOfOutputs: t });} }, { key: "createConstantSource", value: function createConstantSource() {return new a(this);} }, { key: "createConvolver", value: function createConvolver() {return new c(this);} }, { key: "createDelay", value: function createDelay() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;return new l(this, { maxDelayTime: t });} }, { key: "createDynamicsCompressor", value: function createDynamicsCompressor() {return new u(this);} }, { key: "createGain", value: function createGain() {return new p(this);} }, { key: "createIIRFilter", value: function createIIRFilter(t, e) {return new d(this, { feedback: e, feedforward: t });} }, { key: "createOscillator", value: function createOscillator() {return new _(this);} }, { key: "createPanner", value: function createPanner() {return new m(this);} }, { key: "createPeriodicWave", value: function createPeriodicWave(t, e) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { disableNormalization: !1 };return new g(this, _objectSpread(_objectSpread({}, s), {}, { imag: e, real: t }));} }, { key: "createStereoPanner", value: function createStereoPanner() {return new v(this);} }, { key: "createWaveShaper", value: function createWaveShaper() {return new y(this);} }, { key: "decodeAudioData", value: function decodeAudioData(t, e, s) {return h(this._nativeContext, t).then(function (t) {return "function" == typeof e && e(t), t;}, function (t) {throw "function" == typeof s && s(t), t;});} }, { key: "audioWorklet", get: function get() {return this._audioWorklet;} }]);return _class21;}(f);}(sn, Pe, Ge, ts, is, hs, us, _s, vs, on, xs, Ts, ks, Ms, qs, Vs, Bs, Gs, Ys, Hs),an = function (t, e, s, n) {return /*#__PURE__*/function (_t81) {_inherits(_class22, _t81);var _super20 = _createSuper(_class22);function _class22(t, e) {var _this22;_classCallCheck(this, _class22);var i = s(t),o = function (t, e) {return t.createMediaElementSource(e.mediaElement);}(i, e);if (n(i)) throw TypeError();_this22 = _super20.call(this, t, !0, o, null), _this22._nativeMediaElementAudioSourceNode = o;return _this22;}_createClass(_class22, [{ key: "mediaElement", get: function get() {return this._nativeMediaElementAudioSourceNode.mediaElement;} }]);return _class22;}(t);}(Ve, 0, ke, De),cn = function (t, e, s, n) {return /*#__PURE__*/function (_t82) {_inherits(_class23, _t82);var _super21 = _createSuper(_class23);function _class23(t, e) {var _this23;_classCallCheck(this, _class23);var i = s(t);if (n(i)) throw new TypeError();var o = function (t, e) {var s = t.createMediaStreamDestination();return qt(s, e), 1 === s.numberOfOutputs && Object.defineProperty(s, "numberOfOutputs", { get: function get() {return 0;} }), s;}(i, _objectSpread(_objectSpread({}, Mt), e));_this23 = _super21.call(this, t, !1, o, null), _this23._nativeMediaStreamAudioDestinationNode = o;return _this23;}_createClass(_class23, [{ key: "stream", get: function get() {return this._nativeMediaStreamAudioDestinationNode.stream;} }]);return _class23;}(t);}(Ve, 0, ke, De),hn = function (t, e, s, n) {return /*#__PURE__*/function (_t83) {_inherits(_class24, _t83);var _super22 = _createSuper(_class24);function _class24(t, e) {var _this24;_classCallCheck(this, _class24);var i = s(t),o = function (t, _ref63) {var e = _ref63.mediaStream;var s = e.getAudioTracks();s.sort(function (t, e) {return t.id < e.id ? -1 : t.id > e.id ? 1 : 0;});var n = s.slice(0, 1),i = t.createMediaStreamSource(new MediaStream(n));return Object.defineProperty(i, "mediaStream", { value: e }), i;}(i, e);if (n(i)) throw new TypeError();_this24 = _super22.call(this, t, !0, o, null), _this24._nativeMediaStreamAudioSourceNode = o;return _this24;}_createClass(_class24, [{ key: "mediaStream", get: function get() {return this._nativeMediaStreamAudioSourceNode.mediaStream;} }]);return _class24;}(t);}(Ve, 0, ke, De),ln = function (t, e) {return function (s, _ref64) {var n = _ref64.mediaStreamTrack;if ("function" == typeof s.createMediaStreamTrackSource) return s.createMediaStreamTrackSource(n);var i = new MediaStream([n]),o = s.createMediaStreamSource(i);if ("audio" !== n.kind) throw t();if (e(s)) throw new TypeError();return o;};}(At, De),un = function (t, e, s) {return /*#__PURE__*/function (_t84) {_inherits(_class25, _t84);var _super23 = _createSuper(_class25);function _class25(t, n) {_classCallCheck(this, _class25);var i = s(t);return _super23.call(this, t, !0, e(i, n), null);}return _class25;}(t);}(Ve, ln, ke),pn = function (t, e, s, n, i, o, r, a, c) {return /*#__PURE__*/function (_t85) {_inherits(_class26, _t85);var _super24 = _createSuper(_class26);function _class26() {var _this25;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, _class26);if (null === c) throw new Error("Missing the native AudioContext constructor.");var e;try {e = new c(t);} catch (t) {if (12 === t.code && "sampleRate is not in range" === t.message) throw s();throw t;}if (null === e) throw n();if (!function (t) {return void 0 === t || "number" == typeof t || "string" == typeof t && ("balanced" === t || "interactive" === t || "playback" === t);}(t.latencyHint)) throw new TypeError("The provided value '".concat(t.latencyHint, "' is not a valid enum value of type AudioContextLatencyCategory."));if (void 0 !== t.sampleRate && e.sampleRate !== t.sampleRate) throw s();_this25 = _super24.call(this, e, 2);var i = t.latencyHint,_e38 = e,o = _e38.sampleRate;if (_this25._baseLatency = "number" == typeof e.baseLatency ? e.baseLatency : "balanced" === i ? 512 / o : "interactive" === i || void 0 === i ? 256 / o : "playback" === i ? 1024 / o : 128 * Math.max(2, Math.min(128, Math.round(i * o / 128))) / o, _this25._nativeAudioContext = e, "webkitAudioContext" === c.name ? (_this25._nativeGainNode = e.createGain(), _this25._nativeOscillatorNode = e.createOscillator(), _this25._nativeGainNode.gain.value = 1e-37, _this25._nativeOscillatorNode.connect(_this25._nativeGainNode).connect(e.destination), _this25._nativeOscillatorNode.start()) : (_this25._nativeGainNode = null, _this25._nativeOscillatorNode = null), _this25._state = null, "running" === e.state) {_this25._state = "suspended";var _t86 = function _t86() {"suspended" === _this25._state && (_this25._state = null), e.removeEventListener("statechange", _t86);};e.addEventListener("statechange", _t86);}return _this25;}_createClass(_class26, [{ key: "close", value: function close() {var _this26 = this;return "closed" === this.state ? this._nativeAudioContext.close().then(function () {throw e();}) : ("suspended" === this._state && (this._state = null), this._nativeAudioContext.close().then(function () {null !== _this26._nativeGainNode && null !== _this26._nativeOscillatorNode && (_this26._nativeOscillatorNode.stop(), _this26._nativeGainNode.disconnect(), _this26._nativeOscillatorNode.disconnect()), W(_this26);}));} }, { key: "createMediaElementSource", value: function createMediaElementSource(t) {return new i(this, { mediaElement: t });} }, { key: "createMediaStreamDestination", value: function createMediaStreamDestination() {return new o(this);} }, { key: "createMediaStreamSource", value: function createMediaStreamSource(t) {return new r(this, { mediaStream: t });} }, { key: "createMediaStreamTrackSource", value: function createMediaStreamTrackSource(t) {return new a(this, { mediaStreamTrack: t });} }, { key: "resume", value: function resume() {var _this27 = this;return "suspended" === this._state ? new Promise(function (t, e) {var s = function s() {_this27._nativeAudioContext.removeEventListener("statechange", s), "running" === _this27._nativeAudioContext.state ? t() : _this27.resume().then(t, e);};_this27._nativeAudioContext.addEventListener("statechange", s);}) : this._nativeAudioContext.resume().catch(function (t) {if (void 0 === t || 15 === t.code) throw e();throw t;});} }, { key: "suspend", value: function suspend() {return this._nativeAudioContext.suspend().catch(function (t) {if (void 0 === t) throw e();throw t;});} }, { key: "baseLatency", get: function get() {return this._baseLatency;} }, { key: "state", get: function get() {return null !== this._state ? this._state : this._nativeAudioContext.state;} }]);return _class26;}(t);}(rn, At, Zt, Kt, an, cn, hn, un, Ee),dn = function (t) {return function (e) {var s = t.get(e);if (void 0 === s) throw new Error("The context has no set of AudioWorkletNodes.");return s;};}(Rs),fn = function (t) {return function (e, s) {t(e).add(s);};}(dn),_n = function (t) {return function (e, s) {var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;var o = e[n];if (void 0 === o) throw t();return rt(s) ? o.connect(s, 0, i) : o.connect(s, 0);};}(R),mn = function (t) {return function (e, s) {t(e).delete(s);};}(dn),gn = function (t) {return function (e, s, n) {var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;return void 0 === s ? e.forEach(function (t) {return t.disconnect();}) : "number" == typeof s ? Tt(t, e, s).disconnect() : rt(s) ? void 0 === n ? e.forEach(function (t) {return t.disconnect(s);}) : void 0 === i ? Tt(t, e, n).disconnect(s, 0) : Tt(t, e, n).disconnect(s, 0, i) : void 0 === n ? e.forEach(function (t) {return t.disconnect(s);}) : Tt(t, e, n).disconnect(s, 0);};}(R),vn = new WeakMap(),yn = function (t, e) {return function (s) {return e(t, s);};}(vn, w),xn = function (t, e, s, n, i, o, r, a, c, h, l, u, p) {return function (d, f, m, g) {if (0 === g.numberOfInputs && 0 === g.numberOfOutputs) throw c();var v = Array.isArray(g.outputChannelCount) ? g.outputChannelCount : Array.from(g.outputChannelCount);if (v.some(function (t) {return t < 1;})) throw c();if (v.length !== g.numberOfOutputs) throw e();if ("explicit" !== g.channelCountMode) throw c();var y = g.channelCount * g.numberOfInputs,x = v.reduce(function (t, e) {return t + e;}, 0),w = void 0 === m.parameterDescriptors ? 0 : m.parameterDescriptors.length;if (y + w > 6 || x > 6) throw c();var b = new MessageChannel(),T = [],S = [];for (var _t87 = 0; _t87 < g.numberOfInputs; _t87 += 1) {T.push(r(d, { channelCount: g.channelCount, channelCountMode: g.channelCountMode, channelInterpretation: g.channelInterpretation, gain: 1 })), S.push(i(d, { channelCount: g.channelCount, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: g.channelCount }));}var k = [];if (void 0 !== m.parameterDescriptors) {var _iterator16 = _createForOfIteratorHelper(m.parameterDescriptors),_step16;try {var _loop3 = function _loop3() {var _step16$value = _step16.value,t = _step16$value.defaultValue,e = _step16$value.maxValue,s = _step16$value.minValue,n = _step16$value.name;var i = o(d, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: void 0 !== g.parameterData[n] ? g.parameterData[n] : void 0 === t ? 0 : t });Object.defineProperties(i.offset, { defaultValue: { get: function get() {return void 0 === t ? 0 : t;} }, maxValue: { get: function get() {return void 0 === e ? V : e;} }, minValue: { get: function get() {return void 0 === s ? I : s;} } }), k.push(i);};for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {_loop3();}} catch (err) {_iterator16.e(err);} finally {_iterator16.f();}}var A = n(d, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: Math.max(1, y + w) }),C = Pt(f, d.sampleRate),D = a(d, C, y + w, Math.max(1, x)),O = i(d, { channelCount: Math.max(1, x), channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: Math.max(1, x) }),M = [];for (var _t88 = 0; _t88 < g.numberOfOutputs; _t88 += 1) {M.push(n(d, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: v[_t88] }));}for (var _t89 = 0; _t89 < g.numberOfInputs; _t89 += 1) {T[_t89].connect(S[_t89]);for (var _e39 = 0; _e39 < g.channelCount; _e39 += 1) {S[_t89].connect(A, _e39, _t89 * g.channelCount + _e39);}}var E = new lt(void 0 === m.parameterDescriptors ? [] : m.parameterDescriptors.map(function (_ref65, e) {var t = _ref65.name;var s = k[e];return s.connect(A, 0, y + e), s.start(0), [t, s.offset];}));A.connect(D);var R = g.channelInterpretation,q = null;var F = 0 === g.numberOfOutputs ? [D] : M,N = { get bufferSize() {return C;}, get channelCount() {return g.channelCount;}, set channelCount(t) {throw s();}, get channelCountMode() {return g.channelCountMode;}, set channelCountMode(t) {throw s();}, get channelInterpretation() {return R;}, set channelInterpretation(t) {var _iterator17 = _createForOfIteratorHelper(T),_step17;try {for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {var _e40 = _step17.value;_e40.channelInterpretation = t;}} catch (err) {_iterator17.e(err);} finally {_iterator17.f();}R = t;}, get context() {return D.context;}, get inputs() {return T;}, get numberOfInputs() {return g.numberOfInputs;}, get numberOfOutputs() {return g.numberOfOutputs;}, get onprocessorerror() {return q;}, set onprocessorerror(t) {"function" == typeof q && N.removeEventListener("processorerror", q), q = "function" == typeof t ? t : null, "function" == typeof q && N.addEventListener("processorerror", q);}, get parameters() {return E;}, get port() {return b.port2;}, addEventListener: function addEventListener() {return D.addEventListener(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);}, connect: t.bind(null, F), disconnect: h.bind(null, F), dispatchEvent: function dispatchEvent() {return D.dispatchEvent(arguments.length <= 0 ? undefined : arguments[0]);}, removeEventListener: function removeEventListener() {return D.removeEventListener(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);} },P = new Map();var j, L;b.port1.addEventListener = (j = b.port1.addEventListener, function () {for (var _len8 = arguments.length, t = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {t[_key8] = arguments[_key8];}if ("message" === t[0]) {var _e41 = "function" == typeof t[1] ? t[1] : "object" == typeof t[1] && null !== t[1] && "function" == typeof t[1].handleEvent ? t[1].handleEvent : null;if (null !== _e41) {var _s22 = P.get(t[1]);void 0 !== _s22 ? t[1] = _s22 : (t[1] = function (t) {l(d.currentTime, d.sampleRate, function () {return _e41(t);});}, P.set(_e41, t[1]));}}return j.call(b.port1, t[0], t[1], t[2]);}), b.port1.removeEventListener = (L = b.port1.removeEventListener, function () {for (var _len9 = arguments.length, t = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {t[_key9] = arguments[_key9];}if ("message" === t[0]) {var _e42 = P.get(t[1]);void 0 !== _e42 && (P.delete(t[1]), t[1] = _e42);}return L.call(b.port1, t[0], t[1], t[2]);});var z = null;Object.defineProperty(b.port1, "onmessage", { get: function get() {return z;}, set: function set(t) {"function" == typeof z && b.port1.removeEventListener("message", z), z = "function" == typeof t ? t : null, "function" == typeof z && (b.port1.addEventListener("message", z), b.port1.start());} }), m.prototype.port = b.port1;var W = null;var B = function (t, e, s, n) {var i = _.get(t);void 0 === i && (i = new WeakMap(), _.set(t, i));var o = function () {var _ref66 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee29(t, e) {var s;return _regeneratorRuntime.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:_context29.next = 2;return function (t) {return new Promise(function (e, s) {var _MessageChannel3 = new MessageChannel(),n = _MessageChannel3.port1,i = _MessageChannel3.port2;n.onmessage = function (_ref67) {var t = _ref67.data;n.close(), i.close(), e(t);}, n.onmessageerror = function (_ref68) {var t = _ref68.data;n.close(), i.close(), s(t);}, i.postMessage(t);});}(e);case 2:s = _context29.sent;return _context29.abrupt("return", new t(s));case 4:case "end":return _context29.stop();}}}, _callee29);}));return function (_x51, _x52) {return _ref66.apply(this, arguments);};}()(s, n);return i.set(e, o), o;}(d, N, m, g);B.then(function (t) {return W = t;});var U = ft(g.numberOfInputs, g.channelCount),G = ft(g.numberOfOutputs, v),Q = void 0 === m.parameterDescriptors ? [] : m.parameterDescriptors.reduce(function (t, _ref69) {var e = _ref69.name;return _objectSpread(_objectSpread({}, t), {}, _defineProperty({}, e, new Float32Array(128)));}, {});var Z = !0;var X = function X() {g.numberOfOutputs > 0 && D.disconnect(O);for (var _t90 = 0, _e43 = 0; _t90 < g.numberOfOutputs; _t90 += 1) {var _s23 = M[_t90];for (var _n18 = 0; _n18 < v[_t90]; _n18 += 1) {O.disconnect(_s23, _e43 + _n18, _n18);}_e43 += v[_t90];}},Y = new Map();D.onaudioprocess = function (_ref70) {var t = _ref70.inputBuffer,e = _ref70.outputBuffer;if (null !== W) {(function () {var s = u(N);var _loop4 = function _loop4(_n19) {for (var _e44 = 0; _e44 < g.numberOfInputs; _e44 += 1) {for (var _s24 = 0; _s24 < g.channelCount; _s24 += 1) {pt(t, U[_e44], _s24, _s24, _n19);}}void 0 !== m.parameterDescriptors && m.parameterDescriptors.forEach(function (_ref71, s) {var e = _ref71.name;pt(t, Q, e, y + s, _n19);});for (var _t91 = 0; _t91 < g.numberOfInputs; _t91 += 1) {for (var _e45 = 0; _e45 < v[_t91]; _e45 += 1) {0 === G[_t91][_e45].byteLength && (G[_t91][_e45] = new Float32Array(128));}}try {var _t92 = U.map(function (t, e) {if (s[e].size > 0) return Y.set(e, C / 128), t;var n = Y.get(e);return void 0 === n ? [] : (t.every(function (t) {return t.every(function (t) {return 0 === t;});}) && (1 === n ? Y.delete(e) : Y.set(e, n - 1)), t);}),_i16 = l(d.currentTime + _n19 / d.sampleRate, d.sampleRate, function () {return W.process(_t92, G, Q);});Z = _i16;for (var _t93 = 0, _s25 = 0; _t93 < g.numberOfOutputs; _t93 += 1) {for (var _i17 = 0; _i17 < v[_t93]; _i17 += 1) {dt(e, G[_t93], _i17, _s25 + _i17, _n19);}_s25 += v[_t93];}} catch (t) {Z = !1, N.dispatchEvent(new ErrorEvent("processorerror", { colno: t.colno, filename: t.filename, lineno: t.lineno, message: t.message }));}if (!Z) {for (var _t94 = 0; _t94 < g.numberOfInputs; _t94 += 1) {T[_t94].disconnect(S[_t94]);for (var _e46 = 0; _e46 < g.channelCount; _e46 += 1) {S[_n19].disconnect(A, _e46, _t94 * g.channelCount + _e46);}}if (void 0 !== m.parameterDescriptors) {var _t95 = m.parameterDescriptors.length;for (var _e47 = 0; _e47 < _t95; _e47 += 1) {var _t96 = k[_e47];_t96.disconnect(A, 0, y + _e47), _t96.stop();}}A.disconnect(D), D.onaudioprocess = null, $ ? X() : K();return "break";}};for (var _n19 = 0; _n19 < C; _n19 += 128) {var _ret3 = _loop4(_n19);if (_ret3 === "break") break;}})();}};var $ = !1;var H = r(d, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0 }),J = function J() {return D.connect(H).connect(d.destination);},K = function K() {D.disconnect(H), H.disconnect();};return J(), p(N, function () {if (Z) {K(), g.numberOfOutputs > 0 && D.connect(O);for (var _t97 = 0, _e48 = 0; _t97 < g.numberOfOutputs; _t97 += 1) {var _s26 = M[_t97];for (var _n20 = 0; _n20 < v[_t97]; _n20 += 1) {O.connect(_s26, _e48 + _n20, _n20);}_e48 += v[_t97];}}$ = !0;}, function () {Z && (J(), X()), $ = !1;});};}(_n, R, At, as, Lt, ds, Bt, Qt, Zt, gn, Ks, yn, os),wn = function (t, e, s, n, i) {return function (o, r, a, c, h, l) {if (null !== a) try {var _e49 = new a(o, c, l),_n21 = new Map();var _r8 = null;if (Object.defineProperties(_e49, { channelCount: { get: function get() {return l.channelCount;}, set: function set() {throw t();} }, channelCountMode: { get: function get() {return "explicit";}, set: function set() {throw t();} }, onprocessorerror: { get: function get() {return _r8;}, set: function set(t) {"function" == typeof _r8 && _e49.removeEventListener("processorerror", _r8), _r8 = "function" == typeof t ? t : null, "function" == typeof _r8 && _e49.addEventListener("processorerror", _r8);} } }), _e49.addEventListener = (p = _e49.addEventListener, function () {var _p;for (var _len10 = arguments.length, t = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {t[_key10] = arguments[_key10];}if ("processorerror" === t[0]) {var _e50 = "function" == typeof t[1] ? t[1] : "object" == typeof t[1] && null !== t[1] && "function" == typeof t[1].handleEvent ? t[1].handleEvent : null;if (null !== _e50) {var _s27 = _n21.get(t[1]);void 0 !== _s27 ? t[1] = _s27 : (t[1] = function (s) {"error" === s.type ? (Object.defineProperties(s, { type: { value: "processorerror" } }), _e50(s)) : _e50(new ErrorEvent(t[0], _objectSpread({}, s)));}, _n21.set(_e50, t[1]));}}return p.call(_e49, "error", t[1], t[2]), (_p = p).call.apply(_p, [_e49].concat(t));}), _e49.removeEventListener = (u = _e49.removeEventListener, function () {for (var _len11 = arguments.length, t = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {t[_key11] = arguments[_key11];}if ("processorerror" === t[0]) {var _e51 = _n21.get(t[1]);void 0 !== _e51 && (_n21.delete(t[1]), t[1] = _e51);}return u.call(_e49, "error", t[1], t[2]), u.call(_e49, t[0], t[1], t[2]);}), 0 !== l.numberOfOutputs) {var _t98 = s(o, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0 });return _e49.connect(_t98).connect(o.destination), i(_e49, function () {return _t98.disconnect();}, function () {return _t98.connect(o.destination);});}return _e49;} catch (t) {if (11 === t.code) throw n();throw t;}var u, p;if (void 0 === h) throw n();return function (t) {var _MessageChannel4 = new MessageChannel(),e = _MessageChannel4.port1;try {e.postMessage(t);} finally {e.close();}}(l), e(o, r, h, l);};}(At, xn, Bt, Zt, os),bn = function (t, e, s, n, i, o, r, a, c, h, l, u, p, d, f, _) {return function (m, g, v) {var y = new WeakMap();var x = null;return { render: function render(w, b) {a(b, w);var T = y.get(b);return void 0 !== T ? Promise.resolve(T) : function () {var _ref72 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee32(a, w) {var b, T, S, k, _t99, _s28, _o15, _t100, _h6, _t102, _e53, _s29, _c7, _t101, _e52, _T, _T2, _c6, _l4, _u5, _t105, _e56, _s31, _n22, _iterator19, _step19, _step19$value, _e57, _s32, _iterator20, _step20, _step20$value, _t106, _e58;return _regeneratorRuntime.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:b = l(a), T = null;S = M(b, w), k = Array.isArray(g.outputChannelCount) ? g.outputChannelCount : Array.from(g.outputChannelCount);if (null === u) {_t99 = k.reduce(function (t, e) {return t + e;}, 0), _s28 = i(w, { channelCount: Math.max(1, _t99), channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: Math.max(1, _t99) }), _o15 = [];for (_t100 = 0; _t100 < a.numberOfOutputs; _t100 += 1) {_o15.push(n(w, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: k[_t100] }));}_h6 = r(w, { channelCount: g.channelCount, channelCountMode: g.channelCountMode, channelInterpretation: g.channelInterpretation, gain: 1 });_h6.connect = e.bind(null, _o15), _h6.disconnect = c.bind(null, _o15), T = [_s28, _o15, _h6];} else S || (b = new u(w, m));if (!(y.set(w, null === T ? b : T[2]), null !== T)) {_context32.next = 38;break;}if (!(null === x)) {_context32.next = 26;break;}if (!(void 0 === v)) {_context32.next = 7;break;}throw new Error("Missing the processor constructor.");case 7:if (!(null === p)) {_context32.next = 9;break;}throw new Error("Missing the native OfflineAudioContext constructor.");case 9:_t102 = a.channelCount * a.numberOfInputs, _e53 = void 0 === v.parameterDescriptors ? 0 : v.parameterDescriptors.length, _s29 = _t102 + _e53, _c7 = /*#__PURE__*/function () {var _ref73 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee31() {var c, h, l, _t103, u, m, _t104, _e54, _iterator18, _step18, _step18$value, _e55, _s30;return _regeneratorRuntime.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:c = new p(_s29, 128 * Math.ceil(a.context.length / 128), w.sampleRate), h = [], l = [];for (_t103 = 0; _t103 < g.numberOfInputs; _t103 += 1) {h.push(r(c, { channelCount: g.channelCount, channelCountMode: g.channelCountMode, channelInterpretation: g.channelInterpretation, gain: 1 })), l.push(i(c, { channelCount: g.channelCount, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: g.channelCount }));}_context31.next = 4;return Promise.all(Array.from(a.parameters.values()).map( /*#__PURE__*/function () {var _ref74 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee30(t) {var e;return _regeneratorRuntime.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:e = o(c, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: t.value });_context30.next = 3;return d(c, t, e.offset);case 3:return _context30.abrupt("return", e);case 4:case "end":return _context30.stop();}}}, _callee30);}));return function (_x55) {return _ref74.apply(this, arguments);};}()));case 4:u = _context31.sent;m = n(c, { channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: Math.max(1, _t102 + _e53) });for (_t104 = 0; _t104 < g.numberOfInputs; _t104 += 1) {h[_t104].connect(l[_t104]);for (_e54 = 0; _e54 < g.channelCount; _e54 += 1) {l[_t104].connect(m, _e54, _t104 * g.channelCount + _e54);}}_iterator18 = _createForOfIteratorHelper(u.entries());try {for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {_step18$value = _slicedToArray(_step18.value, 2), _e55 = _step18$value[0], _s30 = _step18$value[1];_s30.connect(m, 0, _t102 + _e55), _s30.start(0);}} catch (err) {_iterator18.e(err);} finally {_iterator18.f();}m.connect(c.destination);_context31.next = 12;return Promise.all(h.map(function (t) {return f(a, c, t);}));case 12:return _context31.abrupt("return", _(c));case 13:case "end":return _context31.stop();}}}, _callee31);}));return function _c7() {return _ref73.apply(this, arguments);};}();_context32.t0 = _t;_context32.t1 = a;if (!(0 === _s29)) {_context32.next = 16;break;}_context32.t2 = null;_context32.next = 19;break;case 16:_context32.next = 18;return _c7();case 18:_context32.t2 = _context32.sent;case 19:_context32.t3 = _context32.t2;_context32.t4 = w;_context32.t5 = g;_context32.t6 = k;_context32.t7 = v;_context32.t8 = h;x = (0, _context32.t0)(_context32.t1, _context32.t3, _context32.t4, _context32.t5, _context32.t6, _context32.t7, _context32.t8);case 26:_context32.next = 28;return x;case 28:_t101 = _context32.sent;_e52 = s(w, { buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: !1, loopEnd: 0, loopStart: 0, playbackRate: 1 });_T = T;_T2 = _slicedToArray(_T, 3);_c6 = _T2[0];_l4 = _T2[1];_u5 = _T2[2];null !== _t101 && (_e52.buffer = _t101, _e52.start(0)), _e52.connect(_c6);for (_t105 = 0, _e56 = 0; _t105 < a.numberOfOutputs; _t105 += 1) {_s31 = _l4[_t105];for (_n22 = 0; _n22 < k[_t105]; _n22 += 1) {_c6.connect(_s31, _e56 + _n22, _n22);}_e56 += k[_t105];}return _context32.abrupt("return", _u5);case 38:if (!S) {_context32.next = 58;break;}_iterator19 = _createForOfIteratorHelper(a.parameters.entries());_context32.prev = 40;_iterator19.s();case 42:if ((_step19 = _iterator19.n()).done) {_context32.next = 48;break;}_step19$value = _slicedToArray(_step19.value, 2), _e57 = _step19$value[0], _s32 = _step19$value[1];_context32.next = 46;return t(w, _s32, b.parameters.get(_e57));case 46:_context32.next = 42;break;case 48:_context32.next = 53;break;case 50:_context32.prev = 50;_context32.t9 = _context32["catch"](40);_iterator19.e(_context32.t9);case 53:_context32.prev = 53;_iterator19.f();return _context32.finish(53);case 56:_context32.next = 75;break;case 58:_iterator20 = _createForOfIteratorHelper(a.parameters.entries());_context32.prev = 59;_iterator20.s();case 61:if ((_step20 = _iterator20.n()).done) {_context32.next = 67;break;}_step20$value = _slicedToArray(_step20.value, 2), _t106 = _step20$value[0], _e58 = _step20$value[1];_context32.next = 65;return d(w, _e58, b.parameters.get(_t106));case 65:_context32.next = 61;break;case 67:_context32.next = 72;break;case 69:_context32.prev = 69;_context32.t10 = _context32["catch"](59);_iterator20.e(_context32.t10);case 72:_context32.prev = 72;_iterator20.f();return _context32.finish(72);case 75:_context32.next = 77;return f(a, w, b);case 77:return _context32.abrupt("return", b);case 78:case "end":return _context32.stop();}}}, _callee32, null, [[40, 50, 53, 56], [59, 69, 72, 75]]);}));return function (_x53, _x54) {return _ref72.apply(this, arguments);};}()(w, b);} };};}(Xe, _n, Ye, as, Lt, ds, Bt, mn, gn, Ks, tt, Ie, Ce, $e, Te, Cs),Tn = function (t) {return function (e) {return t.get(e);};}(tn),Sn = function (t) {return function (e, s) {t.set(e, s);};}(vn),kn = Js ? function (t, e, s, n, i, o, r, a, c, h, l, u, p, d) {return /*#__PURE__*/function (_e59) {_inherits(_class27, _e59);var _super25 = _createSuper(_class27);function _class27(e, l, p) {var _this28;_classCallCheck(this, _class27);var d;var _ = a(e),m = c(_),g = function (t) {return _objectSpread(_objectSpread({}, t), {}, { outputChannelCount: void 0 !== t.outputChannelCount ? t.outputChannelCount : 1 === t.numberOfInputs && 1 === t.numberOfOutputs ? [t.channelCount] : Array.from({ length: t.numberOfOutputs }, function () {return 1;}) });}(_objectSpread(_objectSpread({}, ut), p));(function (t) {var _MessageChannel5 = new MessageChannel(),e = _MessageChannel5.port1,s = _MessageChannel5.port2;try {e.postMessage(t);} finally {e.close(), s.close();}})(g);var v = f.get(_),y = null == v ? void 0 : v.get(l),x = m || "closed" !== _.state ? _ : null !== (d = r(_)) && void 0 !== d ? d : _,w = i(x, m ? null : e.baseLatency, h, l, y, g);_this28 = _super25.call(this, e, !0, w, m ? n(l, g, y) : null);var b = [];w.parameters.forEach(function (t, e) {var n = s(_assertThisInitialized(_this28), m, t);b.push([e, n]);}), _this28._nativeAudioWorkletNode = w, _this28._onprocessorerror = null, _this28._parameters = new lt(b), m && t(_, _assertThisInitialized(_this28));var _o16 = o(_assertThisInitialized(_this28)),T = _o16.activeInputs;u(w, T);return _this28;}_createClass(_class27, [{ key: "onprocessorerror", get: function get() {return this._onprocessorerror;}, set: function set(t) {var e = "function" == typeof t ? d(this, t) : null;this._nativeAudioWorkletNode.onprocessorerror = e;var s = this._nativeAudioWorkletNode.onprocessorerror;this._onprocessorerror = null !== s && s === e ? t : s;} }, { key: "parameters", get: function get() {return null === this._parameters ? this._nativeAudioWorkletNode.parameters : this._parameters;} }, { key: "port", get: function get() {return this._nativeAudioWorkletNode.port;} }]);return _class27;}(e);}(fn, Ve, Je, bn, wn, j, Tn, ke, De, Ie, 0, Sn, 0, ue) : void 0,An = function (t, e) {return function (s, n, i) {if (null === e) throw new Error("Missing the native OfflineAudioContext constructor.");try {return new e(s, n, i);} catch (e) {if ("SyntaxError" === e.name) throw t();throw e;}};}(Zt, Ce),Cn = function (t, e, s, n, i, o, r, a) {return function (c, h) {return s(c).render(c, h).then(function () {return Promise.all(Array.from(n(h)).map(function (t) {return s(t).render(t, h);}));}).then(function () {return i(h);}).then(function (s) {return "function" != typeof s.copyFromChannel ? (r(s), q(s)) : e(o, function () {return o(s);}) || a(s), t.add(s), s;});};}(je, ge, be, dn, Cs, E, Be, Ue),Dn = function (t, e, s, n, i) {return /*#__PURE__*/function (_t107) {_inherits(_class28, _t107);var _super26 = _createSuper(_class28);function _class28(t, s, i) {var _this29;_classCallCheck(this, _class28);var o;if ("number" == typeof t && void 0 !== s && void 0 !== i) o = { length: s, numberOfChannels: t, sampleRate: i };else {if ("object" != typeof t) throw new Error("The given parameters are not valid.");o = t;}var _Xt$o = _objectSpread(_objectSpread({}, Xt), o),r = _Xt$o.length,a = _Xt$o.numberOfChannels,c = _Xt$o.sampleRate,h = n(a, r, c);e(Et, function () {return Et(h);}) || h.addEventListener("statechange", function () {var t = 0;var e = function e(s) {"running" === _this29._state && (t > 0 ? (h.removeEventListener("statechange", e), s.stopImmediatePropagation(), _this29._waitForThePromiseToSettle(s)) : t += 1);};return e;}()), _this29 = _super26.call(this, h, a), _this29._length = r, _this29._nativeOfflineAudioContext = h, _this29._state = null;return _this29;}_createClass(_class28, [{ key: "startRendering", value: function startRendering() {var _this30 = this;return "running" === this._state ? Promise.reject(s()) : (this._state = "running", i(this.destination, this._nativeOfflineAudioContext).finally(function () {_this30._state = null, W(_this30);}));} }, { key: "_waitForThePromiseToSettle", value: function _waitForThePromiseToSettle(t) {var _this31 = this;null === this._state ? this._nativeOfflineAudioContext.dispatchEvent(t) : setTimeout(function () {return _this31._waitForThePromiseToSettle(t);});} }, { key: "length", get: function get() {return void 0 === this._nativeOfflineAudioContext.length ? this._length : this._nativeOfflineAudioContext.length;} }, { key: "state", get: function get() {return null === this._state ? this._nativeOfflineAudioContext.state : this._state;} }]);return _class28;}(t);}(rn, ge, At, An, Cn),On = function (t, e) {return function (s) {var n = t.get(s);return e(n) || e(s);};}(u, Re),Mn = function (t, e) {return function (s) {return t.has(s) || e(s);};}(c, qe),En = function (t, e) {return function (s) {return t.has(s) || e(s);};}(l, Fe),Rn = function (t, e) {return function (s) {var n = t.get(s);return e(n) || e(s);};}(u, De),qn = function qn() {return function () {var _ref75 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee33(t, e, s, n, i, o, r, a, c, h, l, u, p, d, f, _) {return _regeneratorRuntime.wrap(function _callee33$(_context33) {while (1) {switch (_context33.prev = _context33.next) {case 0:_context33.t0 = !!(t(e, e) && t(s, s) && t(i, i) && t(o, o) && t(a, a) && t(c, c) && t(h, h) && t(l, l) && t(u, u) && t(p, p) && t(d, d));if (!_context33.t0) {_context33.next = 5;break;}_context33.next = 4;return Promise.all([t(n, n), t(r, r), t(f, f), t(_, _)]);case 4:_context33.t0 = _context33.sent.every(function (t) {return t;});case 5:return _context33.abrupt("return", _context33.t0);case 6:case "end":return _context33.stop();}}}, _callee33);}));return function (_x56, _x57, _x58, _x59, _x60, _x61, _x62, _x63, _x64, _x65, _x66, _x67, _x68, _x69, _x70, _x71) {return _ref75.apply(this, arguments);};}()(ge, function (t) {return function () {if (null === t) return !1;var e = new t(1, 1, 44100).createBuffer(1, 1, 44100);if (void 0 === e.copyToChannel) return !0;var s = new Float32Array(2);try {e.copyFromChannel(s, 0, 0);} catch (_unused18) {return !1;}return !0;};}(Ce), function (t) {return function () {if (null === t) return !1;if (void 0 !== t.prototype && void 0 !== t.prototype.close) return !0;var e = new t(),s = void 0 !== e.close;try {e.close();} catch (_unused19) {}return s;};}(Ee), function (t) {return function () {if (null === t) return Promise.resolve(!1);var e = new t(1, 1, 44100);return new Promise(function (t) {var s = !0;var n = function n(_n23) {s && (s = !1, e.startRendering(), t(_n23 instanceof TypeError));};var i;try {i = e.decodeAudioData(null, function () {}, n);} catch (t) {n(t);}void 0 !== i && i.catch(n);});};}(Ce), function (t) {return function () {if (null === t) return !1;var e;try {e = new t({ latencyHint: "balanced" });} catch (_unused20) {return !1;}return e.close(), !0;};}(Ee), function (t) {return function () {if (null === t) return !1;var e = new t(1, 1, 44100).createGain(),s = e.connect(e) === e;return e.disconnect(e), s;};}(Ce), function (t, e) {return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee34() {var s, n, i, o, r, _e60, _s33;return _regeneratorRuntime.wrap(function _callee34$(_context34) {while (1) {switch (_context34.prev = _context34.next) {case 0:if (!(null === t)) {_context34.next = 2;break;}return _context34.abrupt("return", !0);case 2:if (!(null === e)) {_context34.next = 4;break;}return _context34.abrupt("return", !1);case 4:s = new Blob(['let c,p;class A extends AudioWorkletProcessor{constructor(){super();this.port.onmessage=(e)=>{p=e.data;p.onmessage=()=>{p.postMessage(c);p.close()};this.port.postMessage(0)}}process(){c=1}}registerProcessor("a",A)'], { type: "application/javascript; charset=utf-8" }), n = new MessageChannel(), i = new e(1, 128, 44100), o = URL.createObjectURL(s);r = !1;_context34.prev = 6;_context34.next = 9;return i.audioWorklet.addModule(o);case 9:_e60 = new t(i, "a", { numberOfOutputs: 0 }), _s33 = i.createOscillator();_context34.next = 12;return new Promise(function (t) {_e60.port.onmessage = function () {return t();}, _e60.port.postMessage(n.port2, [n.port2]);});case 12:_e60.port.onmessage = function () {return r = !0;};_s33.connect(_e60);_s33.start(0);_context34.next = 17;return i.startRendering();case 17:_context34.next = 19;return new Promise(function (t) {n.port1.onmessage = function (_ref77) {var e = _ref77.data;return t(1 === e);}, n.port1.postMessage(0);});case 19:r = _context34.sent;_context34.next = 24;break;case 22:_context34.prev = 22;_context34.t0 = _context34["catch"](6);case 24:_context34.prev = 24;n.port1.close(), URL.revokeObjectURL(o);return _context34.finish(24);case 27:return _context34.abrupt("return", r);case 28:case "end":return _context34.stop();}}}, _callee34, null, [[6, 22, 24, 27]]);}));}(Ie, Ce), function (t) {return function () {if (null === t) return !1;var e = new t(1, 1, 44100).createChannelMerger();if ("max" === e.channelCountMode) return !0;try {e.channelCount = 2;} catch (_unused22) {return !0;}return !1;};}(Ce), function (t) {return function () {if (null === t) return !1;var e = new t(1, 1, 44100);return void 0 === e.createConstantSource || e.createConstantSource().offset.maxValue !== Number.POSITIVE_INFINITY;};}(Ce), function (t) {return function () {if (null === t) return !1;var e = new t(1, 1, 44100),s = e.createConvolver();s.buffer = e.createBuffer(1, 1, e.sampleRate);try {s.buffer = e.createBuffer(1, 1, e.sampleRate);} catch (_unused23) {return !1;}return !0;};}(Ce), function (t) {return function () {if (null === t) return !1;var e = new t(1, 1, 44100).createConvolver();try {e.channelCount = 1;} catch (_unused24) {return !1;}return !0;};}(Ce), ce, function (t) {return function () {return null !== t && t.hasOwnProperty("isSecureContext");};}(xe), function (t) {return function () {if (null === t) return !1;var e = new t();try {return e.createMediaStreamSource(new MediaStream()), !1;} catch (t) {return !0;} finally {e.close();}};}(Ee), function (t) {return function () {if (null === t) return Promise.resolve(!1);var e = new t(1, 1, 44100);if (void 0 === e.createStereoPanner) return Promise.resolve(!0);if (void 0 === e.createConstantSource) return Promise.resolve(!0);var s = e.createConstantSource(),n = e.createStereoPanner();return s.channelCount = 1, s.offset.value = 1, n.channelCount = 1, s.start(), s.connect(n).connect(e.destination), e.startRendering().then(function (t) {return 1 !== t.getChannelData(0)[0];});};}(Ce), he);};function Fn(t) {return void 0 === t;}function In(t) {return !Fn(t);}function Vn(t) {return "function" == typeof t;}function Nn(t) {return "number" == typeof t;}function Pn(t) {return "[object Object]" === Object.prototype.toString.call(t) && t.constructor === Object;}function jn(t) {return "boolean" == typeof t;}function Ln(t) {return Array.isArray(t);}function zn(t) {return "string" == typeof t;}function Wn(t) {return zn(t) && /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(t);}function Bn(t, e) {if (!t) throw new Error(e);}function Un(t, e) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1 / 0;if (!(e <= t && t <= s)) throw new RangeError("Value must be within [".concat(e, ", ").concat(s, "], got: ").concat(t));}function Gn(t) {t.isOffline || "running" === t.state || Kn('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.');}var Qn = !1,Zn = !1;function Xn(t) {Qn = t;}function Yn(t) {Fn(t) && Qn && !Zn && (Zn = !0, Kn("Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing"));}var $n = console;function Hn(t) {$n = t;}function Jn() {var _$n;(_$n = $n).log.apply(_$n, arguments);}function Kn() {var _$n2;(_$n2 = $n).warn.apply(_$n2, arguments);}var ti = "object" == typeof self ? self : null,ei = ti && (ti.hasOwnProperty("AudioContext") || ti.hasOwnProperty("webkitAudioContext"));function si(t, e, s, n) {var i,o = arguments.length,r = o < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, s) : n;if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, s, n);else for (var a = t.length - 1; a >= 0; a--) {(i = t[a]) && (r = (o < 3 ? i(r) : o > 3 ? i(e, s, r) : i(e, s)) || r);}return o > 3 && r && Object.defineProperty(e, s, r), r;}function ni(t, e, s, n) {return new (s || (s = Promise))(function (i, o) {function r(t) {try {c(n.next(t));} catch (t) {o(t);}}function a(t) {try {c(n.throw(t));} catch (t) {o(t);}}function c(t) {var e;t.done ? i(t.value) : (e = t.value, e instanceof s ? e : new s(function (t) {t(e);})).then(r, a);}c((n = n.apply(t, e || [])).next());});}Object.create, Object.create;var ii = /*#__PURE__*/function () {function ii(t, e, s, n) {_classCallCheck(this, ii);this._callback = t, this._type = e, this._minimumUpdateInterval = Math.max(128 / (n || 44100), .001), this.updateInterval = s, this._createClock();}_createClass(ii, [{ key: "_createWorker", value: function _createWorker() {var t = new Blob(["\n\t\t\t// the initial timeout time\n\t\t\tlet timeoutTime =  ".concat((1e3 * this._updateInterval).toFixed(1), ";\n\t\t\t// onmessage callback\n\t\t\tself.onmessage = function(msg){\n\t\t\t\ttimeoutTime = parseInt(msg.data);\n\t\t\t};\n\t\t\t// the tick function which posts a message\n\t\t\t// and schedules a new tick\n\t\t\tfunction tick(){\n\t\t\t\tsetTimeout(tick, timeoutTime);\n\t\t\t\tself.postMessage('tick');\n\t\t\t}\n\t\t\t// call tick initially\n\t\t\ttick();\n\t\t\t")], { type: "text/javascript" }),e = URL.createObjectURL(t),s = new Worker(e);s.onmessage = this._callback.bind(this), this._worker = s;} }, { key: "_createTimeout", value: function _createTimeout() {var _this32 = this;this._timeout = setTimeout(function () {_this32._createTimeout(), _this32._callback();}, 1e3 * this._updateInterval);} }, { key: "_createClock", value: function _createClock() {if ("worker" === this._type) try {this._createWorker();} catch (t) {this._type = "timeout", this._createClock();} else "timeout" === this._type && this._createTimeout();} }, { key: "_disposeClock", value: function _disposeClock() {this._timeout && clearTimeout(this._timeout), this._worker && (this._worker.terminate(), this._worker.onmessage = null);} }, { key: "dispose", value: function dispose() {this._disposeClock();} }, { key: "updateInterval", get: function get() {return this._updateInterval;}, set: function set(t) {var e;this._updateInterval = Math.max(t, this._minimumUpdateInterval), "worker" === this._type && (null === (e = this._worker) || void 0 === e || e.postMessage(1e3 * this._updateInterval));} }, { key: "type", get: function get() {return this._type;}, set: function set(t) {this._disposeClock(), this._type = t, this._createClock();} }]);return ii;}();function oi(t) {return En(t);}function ri(t) {return Mn(t);}function ai(t) {return Rn(t);}function ci(t) {return On(t);}function hi(t, e) {return "value" === t || oi(e) || ri(e) || function (t) {return t instanceof Ge;}(e);}function li(t) {for (var _len12 = arguments.length, e = new Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {e[_key12 - 1] = arguments[_key12];}if (!e.length) return t;var s = e.shift();if (Pn(t) && Pn(s)) for (var _e61 in s) {hi(_e61, s[_e61]) ? t[_e61] = s[_e61] : Pn(s[_e61]) ? (t[_e61] || Object.assign(t, _defineProperty({}, _e61, {})), li(t[_e61], s[_e61])) : Object.assign(t, _defineProperty({}, _e61, s[_e61]));}return li.apply(void 0, [t].concat(e));}function ui(t, e) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var n = arguments.length > 3 ? arguments[3] : undefined;var i = {},o = Array.from(e);if (Pn(o[0]) && n && !Reflect.has(o[0], n) && (Object.keys(o[0]).some(function (e) {return Reflect.has(t, e);}) || (li(i, _defineProperty({}, n, o[0])), s.splice(s.indexOf(n), 1), o.shift())), 1 === o.length && Pn(o[0])) li(i, o[0]);else for (var _t108 = 0; _t108 < s.length; _t108++) {In(o[_t108]) && (i[s[_t108]] = o[_t108]);}return li(t, i);}function pi(t, e) {return Fn(t) ? e : t;}function di(t, e) {return e.forEach(function (e) {Reflect.has(t, e) && delete t[e];}), t;}var fi = /*#__PURE__*/function () {function fi() {_classCallCheck(this, fi);this.debug = !1, this._wasDisposed = !1;}_createClass(fi, [{ key: "log", value: function log() {for (var _len13 = arguments.length, t = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {t[_key13] = arguments[_key13];}(this.debug || ti && this.toString() === ti.TONE_DEBUG_CLASS) && Jn.apply(void 0, [this].concat(t));} }, { key: "dispose", value: function dispose() {return this._wasDisposed = !0, this;} }, { key: "toString", value: function toString() {return this.name;} }, { key: "disposed", get: function get() {return this._wasDisposed;} }], [{ key: "getDefaults", value: function getDefaults() {return {};} }]);return fi;}();fi.version = i;var _i = 1e-6;function mi(t, e) {return t > e + _i;}function gi(t, e) {return mi(t, e) || yi(t, e);}function vi(t, e) {return t + _i < e;}function yi(t, e) {return Math.abs(t - e) < _i;}function xi(t, e, s) {return Math.max(Math.min(t, s), e);}var wi = /*#__PURE__*/function (_fi) {_inherits(wi, _fi);var _super27 = _createSuper(wi);function wi() {var _this33;_classCallCheck(this, wi);_this33 = _super27.call(this), _this33.name = "Timeline", _this33._timeline = [];var t = ui(wi.getDefaults(), arguments, ["memory"]);_this33.memory = t.memory, _this33.increasing = t.increasing;return _this33;}_createClass(wi, [{ key: "add", value: function add(t) {if (Bn(Reflect.has(t, "time"), "Timeline: events must have a time attribute"), t.time = t.time.valueOf(), this.increasing && this.length) {var _e62 = this._timeline[this.length - 1];Bn(gi(t.time, _e62.time), "The time must be greater than or equal to the last scheduled time"), this._timeline.push(t);} else {var _e63 = this._search(t.time);this._timeline.splice(_e63 + 1, 0, t);}if (this.length > this.memory) {var _t109 = this.length - this.memory;this._timeline.splice(0, _t109);}return this;} }, { key: "remove", value: function remove(t) {var e = this._timeline.indexOf(t);return -1 !== e && this._timeline.splice(e, 1), this;} }, { key: "get", value: function get(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "time";var s = this._search(t, e);return -1 !== s ? this._timeline[s] : null;} }, { key: "peek", value: function peek() {return this._timeline[0];} }, { key: "shift", value: function shift() {return this._timeline.shift();} }, { key: "getAfter", value: function getAfter(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "time";var s = this._search(t, e);return s + 1 < this._timeline.length ? this._timeline[s + 1] : null;} }, { key: "getBefore", value: function getBefore(t) {var e = this._timeline.length;if (e > 0 && this._timeline[e - 1].time < t) return this._timeline[e - 1];var s = this._search(t);return s - 1 >= 0 ? this._timeline[s - 1] : null;} }, { key: "cancel", value: function cancel(t) {if (this._timeline.length > 1) {var _e64 = this._search(t);if (_e64 >= 0) {if (yi(this._timeline[_e64].time, t)) {for (var _s34 = _e64; _s34 >= 0 && yi(this._timeline[_s34].time, t); _s34--) {_e64 = _s34;}this._timeline = this._timeline.slice(0, _e64);} else this._timeline = this._timeline.slice(0, _e64 + 1);} else this._timeline = [];} else 1 === this._timeline.length && gi(this._timeline[0].time, t) && (this._timeline = []);return this;} }, { key: "cancelBefore", value: function cancelBefore(t) {var e = this._search(t);return e >= 0 && (this._timeline = this._timeline.slice(e + 1)), this;} }, { key: "previousEvent", value: function previousEvent(t) {var e = this._timeline.indexOf(t);return e > 0 ? this._timeline[e - 1] : null;} }, { key: "_search", value: function _search(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "time";if (0 === this._timeline.length) return -1;var s = 0;var n = this._timeline.length;var i = n;if (n > 0 && this._timeline[n - 1][e] <= t) return n - 1;for (; s < i;) {var _n24 = Math.floor(s + (i - s) / 2);var _o17 = this._timeline[_n24],_r9 = this._timeline[_n24 + 1];if (yi(_o17[e], t)) {for (var _s35 = _n24; _s35 < this._timeline.length && yi(this._timeline[_s35][e], t); _s35++) {_n24 = _s35;}return _n24;}if (vi(_o17[e], t) && mi(_r9[e], t)) return _n24;mi(_o17[e], t) ? i = _n24 : s = _n24 + 1;}return -1;} }, { key: "_iterate", value: function _iterate(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._timeline.length - 1;this._timeline.slice(e, s + 1).forEach(t);} }, { key: "forEach", value: function forEach(t) {return this._iterate(t), this;} }, { key: "forEachBefore", value: function forEachBefore(t, e) {var s = this._search(t);return -1 !== s && this._iterate(e, 0, s), this;} }, { key: "forEachAfter", value: function forEachAfter(t, e) {var s = this._search(t);return this._iterate(e, s + 1), this;} }, { key: "forEachBetween", value: function forEachBetween(t, e, s) {var n = this._search(t),i = this._search(e);return -1 !== n && -1 !== i ? (this._timeline[n].time !== t && (n += 1), this._timeline[i].time === e && (i -= 1), this._iterate(s, n, i)) : -1 === n && this._iterate(s, 0, i), this;} }, { key: "forEachFrom", value: function forEachFrom(t, e) {var s = this._search(t);for (; s >= 0 && this._timeline[s].time >= t;) {s--;}return this._iterate(e, s + 1), this;} }, { key: "forEachAtTime", value: function forEachAtTime(t, e) {var s = this._search(t);if (-1 !== s && yi(this._timeline[s].time, t)) {var _n25 = s;for (var _e65 = s; _e65 >= 0 && yi(this._timeline[_e65].time, t); _e65--) {_n25 = _e65;}this._iterate(function (t) {e(t);}, _n25, s);}return this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(wi.prototype), "dispose", this).call(this), this._timeline = [], this;} }, { key: "length", get: function get() {return this._timeline.length;} }], [{ key: "getDefaults", value: function getDefaults() {return { memory: 1 / 0, increasing: !1 };} }]);return wi;}(fi);var bi = [];function Ti(t) {bi.push(t);}var Si = [];function ki(t) {Si.push(t);}var Ai = /*#__PURE__*/function (_fi2) {_inherits(Ai, _fi2);var _super28 = _createSuper(Ai);function Ai() {var _this34;_classCallCheck(this, Ai);_this34 = _super28.apply(this, arguments), _this34.name = "Emitter";return _this34;}_createClass(Ai, [{ key: "on", value: function on(t, e) {var _this35 = this;return t.split(/\W+/).forEach(function (t) {Fn(_this35._events) && (_this35._events = {}), _this35._events.hasOwnProperty(t) || (_this35._events[t] = []), _this35._events[t].push(e);}), this;} }, { key: "once", value: function once(t, e) {var _this36 = this;var s = function s() {e.apply(void 0, arguments), _this36.off(t, s);};return this.on(t, s), this;} }, { key: "off", value: function off(t, e) {var _this37 = this;return t.split(/\W+/).forEach(function (t) {if (Fn(_this37._events) && (_this37._events = {}), _this37._events.hasOwnProperty(t)) if (Fn(e)) _this37._events[t] = [];else {var _s36 = _this37._events[t];for (var _t110 = _s36.length - 1; _t110 >= 0; _t110--) {_s36[_t110] === e && _s36.splice(_t110, 1);}}}), this;} }, { key: "emit", value: function emit(t) {if (this._events && this._events.hasOwnProperty(t)) {var _s37 = this._events[t].slice(0);for (var _len14 = arguments.length, e = new Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {e[_key14 - 1] = arguments[_key14];}for (var _t111 = 0, _n26 = _s37.length; _t111 < _n26; _t111++) {_s37[_t111].apply(this, e);}}return this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Ai.prototype), "dispose", this).call(this), this._events = void 0, this;} }], [{ key: "mixin", value: function mixin(t) {["on", "once", "off", "emit"].forEach(function (e) {var s = Object.getOwnPropertyDescriptor(Ai.prototype, e);Object.defineProperty(t.prototype, e, s);});} }]);return Ai;}(fi);var Ci = /*#__PURE__*/function (_Ai) {_inherits(Ci, _Ai);var _super29 = _createSuper(Ci);function Ci() {var _this38;_classCallCheck(this, Ci);_this38 = _super29.apply(this, arguments), _this38.isOffline = !1;return _this38;}_createClass(Ci, [{ key: "toJSON", value: function toJSON() {return {};} }]);return Ci;}(Ai);var Di = /*#__PURE__*/function (_Ci) {_inherits(Di, _Ci);var _super30 = _createSuper(Di);function Di() {var _this39;_classCallCheck(this, Di);var t, e;_this39 = _super30.call(this), _this39.name = "Context", _this39._constants = new Map(), _this39._timeouts = new wi(), _this39._timeoutIds = 0, _this39._initialized = !1, _this39.isOffline = !1, _this39._workletModules = new Map();var s = ui(Di.getDefaults(), arguments, ["context"]);s.context ? (_this39._context = s.context, _this39._latencyHint = (null === (t = arguments[0]) || void 0 === t ? void 0 : t.latencyHint) || "") : (_this39._context = function (t) {return new pn(t);}({ latencyHint: s.latencyHint }), _this39._latencyHint = s.latencyHint), _this39._ticker = new ii(_this39.emit.bind(_assertThisInitialized(_this39), "tick"), s.clockSource, s.updateInterval, _this39._context.sampleRate), _this39.on("tick", _this39._timeoutLoop.bind(_assertThisInitialized(_this39))), _this39._context.onstatechange = function () {_this39.emit("statechange", _this39.state);}, _this39[(null === (e = arguments[0]) || void 0 === e ? void 0 : e.hasOwnProperty("updateInterval")) ? "_lookAhead" : "lookAhead"] = s.lookAhead;return _this39;}_createClass(Di, [{ key: "initialize", value: function initialize() {var t;return this._initialized || (t = this, bi.forEach(function (e) {return e(t);}), this._initialized = !0), this;} }, { key: "createAnalyser", value: function createAnalyser() {return this._context.createAnalyser();} }, { key: "createOscillator", value: function createOscillator() {return this._context.createOscillator();} }, { key: "createBufferSource", value: function createBufferSource() {return this._context.createBufferSource();} }, { key: "createBiquadFilter", value: function createBiquadFilter() {return this._context.createBiquadFilter();} }, { key: "createBuffer", value: function createBuffer(t, e, s) {return this._context.createBuffer(t, e, s);} }, { key: "createChannelMerger", value: function createChannelMerger(t) {return this._context.createChannelMerger(t);} }, { key: "createChannelSplitter", value: function createChannelSplitter(t) {return this._context.createChannelSplitter(t);} }, { key: "createConstantSource", value: function createConstantSource() {return this._context.createConstantSource();} }, { key: "createConvolver", value: function createConvolver() {return this._context.createConvolver();} }, { key: "createDelay", value: function createDelay(t) {return this._context.createDelay(t);} }, { key: "createDynamicsCompressor", value: function createDynamicsCompressor() {return this._context.createDynamicsCompressor();} }, { key: "createGain", value: function createGain() {return this._context.createGain();} }, { key: "createIIRFilter", value: function createIIRFilter(t, e) {return this._context.createIIRFilter(t, e);} }, { key: "createPanner", value: function createPanner() {return this._context.createPanner();} }, { key: "createPeriodicWave", value: function createPeriodicWave(t, e, s) {return this._context.createPeriodicWave(t, e, s);} }, { key: "createStereoPanner", value: function createStereoPanner() {return this._context.createStereoPanner();} }, { key: "createWaveShaper", value: function createWaveShaper() {return this._context.createWaveShaper();} }, { key: "createMediaStreamSource", value: function createMediaStreamSource(t) {return Bn(ci(this._context), "Not available if OfflineAudioContext"), this._context.createMediaStreamSource(t);} }, { key: "createMediaElementSource", value: function createMediaElementSource(t) {return Bn(ci(this._context), "Not available if OfflineAudioContext"), this._context.createMediaElementSource(t);} }, { key: "createMediaStreamDestination", value: function createMediaStreamDestination() {return Bn(ci(this._context), "Not available if OfflineAudioContext"), this._context.createMediaStreamDestination();} }, { key: "decodeAudioData", value: function decodeAudioData(t) {return this._context.decodeAudioData(t);} }, { key: "createAudioWorkletNode", value: function createAudioWorkletNode(t, e) {return function (t, e, s) {return Bn(In(kn), "This node only works in a secure context (https or localhost)"), new kn(t, e, s);}(this.rawContext, t, e);} }, { key: "addAudioWorkletModule", value: function addAudioWorkletModule(t, e) {return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee35() {return _regeneratorRuntime.wrap(function _callee35$(_context35) {while (1) {switch (_context35.prev = _context35.next) {case 0:Bn(In(this.rawContext.audioWorklet), "AudioWorkletNode is only available in a secure context (https or localhost)");this._workletModules.has(e) || this._workletModules.set(e, this.rawContext.audioWorklet.addModule(t));_context35.next = 4;return this._workletModules.get(e);case 4:case "end":return _context35.stop();}}}, _callee35, this);}));} }, { key: "workletsAreReady", value: function workletsAreReady() {return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee36() {var t;return _regeneratorRuntime.wrap(function _callee36$(_context36) {while (1) {switch (_context36.prev = _context36.next) {case 0:t = [];this._workletModules.forEach(function (e) {return t.push(e);});_context36.next = 4;return Promise.all(t);case 4:case "end":return _context36.stop();}}}, _callee36, this);}));} }, { key: "now", value: function now() {return this._context.currentTime + this._lookAhead;} }, { key: "immediate", value: function immediate() {return this._context.currentTime;} }, { key: "resume", value: function resume() {return ci(this._context) ? this._context.resume() : Promise.resolve();} }, { key: "close", value: function close() {return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee37() {var t;return _regeneratorRuntime.wrap(function _callee37$(_context37) {while (1) {switch (_context37.prev = _context37.next) {case 0:_context37.t0 = ci(this._context);if (!_context37.t0) {_context37.next = 4;break;}_context37.next = 4;return this._context.close();case 4:this._initialized && (t = this, Si.forEach(function (e) {return e(t);}));case 5:case "end":return _context37.stop();}}}, _callee37, this);}));} }, { key: "getConstant", value: function getConstant(t) {if (this._constants.has(t)) return this._constants.get(t);{var _e66 = this._context.createBuffer(1, 128, this._context.sampleRate),_s38 = _e66.getChannelData(0);for (var _e67 = 0; _e67 < _s38.length; _e67++) {_s38[_e67] = t;}var _n27 = this._context.createBufferSource();return _n27.channelCount = 1, _n27.channelCountMode = "explicit", _n27.buffer = _e66, _n27.loop = !0, _n27.start(0), this._constants.set(t, _n27), _n27;}} }, { key: "dispose", value: function dispose() {var _this40 = this;return _get(_getPrototypeOf(Di.prototype), "dispose", this).call(this), this._ticker.dispose(), this._timeouts.dispose(), Object.keys(this._constants).map(function (t) {return _this40._constants[t].disconnect();}), this;} }, { key: "_timeoutLoop", value: function _timeoutLoop() {var t = this.now();var e = this._timeouts.peek();for (; this._timeouts.length && e && e.time <= t;) {e.callback(), this._timeouts.shift(), e = this._timeouts.peek();}} }, { key: "setTimeout", value: function setTimeout(t, e) {this._timeoutIds++;var s = this.now();return this._timeouts.add({ callback: t, id: this._timeoutIds, time: s + e }), this._timeoutIds;} }, { key: "clearTimeout", value: function clearTimeout(t) {var _this41 = this;return this._timeouts.forEach(function (e) {e.id === t && _this41._timeouts.remove(e);}), this;} }, { key: "clearInterval", value: function clearInterval(t) {return this.clearTimeout(t);} }, { key: "setInterval", value: function setInterval(t, e) {var _this42 = this;var s = ++this._timeoutIds,n = function n() {var i = _this42.now();_this42._timeouts.add({ callback: function callback() {t(), n();}, id: s, time: i + e });};return n(), s;} }, { key: "currentTime", get: function get() {return this._context.currentTime;} }, { key: "state", get: function get() {return this._context.state;} }, { key: "sampleRate", get: function get() {return this._context.sampleRate;} }, { key: "listener", get: function get() {return this.initialize(), this._listener;}, set: function set(t) {Bn(!this._initialized, "The listener cannot be set after initialization."), this._listener = t;} }, { key: "transport", get: function get() {return this.initialize(), this._transport;}, set: function set(t) {Bn(!this._initialized, "The transport cannot be set after initialization."), this._transport = t;} }, { key: "draw", get: function get() {return this.initialize(), this._draw;}, set: function set(t) {Bn(!this._initialized, "Draw cannot be set after initialization."), this._draw = t;} }, { key: "destination", get: function get() {return this.initialize(), this._destination;}, set: function set(t) {Bn(!this._initialized, "The destination cannot be set after initialization."), this._destination = t;} }, { key: "updateInterval", get: function get() {return this._ticker.updateInterval;}, set: function set(t) {this._ticker.updateInterval = t;} }, { key: "clockSource", get: function get() {return this._ticker.type;}, set: function set(t) {this._ticker.type = t;} }, { key: "lookAhead", get: function get() {return this._lookAhead;}, set: function set(t) {this._lookAhead = t, this.updateInterval = t ? t / 2 : .01;} }, { key: "latencyHint", get: function get() {return this._latencyHint;} }, { key: "rawContext", get: function get() {return this._context;} }], [{ key: "getDefaults", value: function getDefaults() {return { clockSource: "worker", latencyHint: "interactive", lookAhead: .1, updateInterval: .05 };} }]);return Di;}(Ci);function Oi(t, e) {Ln(e) ? e.forEach(function (e) {return Oi(t, e);}) : Object.defineProperty(t, e, { enumerable: !0, writable: !1 });}function Mi(t, e) {Ln(e) ? e.forEach(function (e) {return Mi(t, e);}) : Object.defineProperty(t, e, { writable: !0 });}var Ei = function Ei() {};var Ri = /*#__PURE__*/function (_fi3) {_inherits(Ri, _fi3);var _super31 = _createSuper(Ri);function Ri() {var _this43;_classCallCheck(this, Ri);_this43 = _super31.call(this), _this43.name = "ToneAudioBuffer", _this43.onload = Ei;var t = ui(Ri.getDefaults(), arguments, ["url", "onload", "onerror"]);_this43.reverse = t.reverse, _this43.onload = t.onload, zn(t.url) ? _this43.load(t.url).catch(t.onerror) : t.url && _this43.set(t.url);return _this43;}_createClass(Ri, [{ key: "set", value: function set(t) {var _this44 = this;return t instanceof Ri ? t.loaded ? this._buffer = t.get() : t.onload = function () {_this44.set(t), _this44.onload(_this44);} : this._buffer = t, this._reversed && this._reverse(), this;} }, { key: "get", value: function get() {return this._buffer;} }, { key: "load", value: function load(t) {return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee38() {var _this45 = this;var e, _t112;return _regeneratorRuntime.wrap(function _callee38$(_context38) {while (1) {switch (_context38.prev = _context38.next) {case 0:e = Ri.load(t).then(function (t) {_this45.set(t), _this45.onload(_this45);});Ri.downloads.push(e);_context38.prev = 2;_context38.next = 5;return e;case 5:_context38.prev = 5;_t112 = Ri.downloads.indexOf(e);Ri.downloads.splice(_t112, 1);return _context38.finish(5);case 9:return _context38.abrupt("return", this);case 10:case "end":return _context38.stop();}}}, _callee38, this, [[2,, 5, 9]]);}));} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Ri.prototype), "dispose", this).call(this), this._buffer = void 0, this;} }, { key: "fromArray", value: function fromArray(t) {var e = Ln(t) && t[0].length > 0,s = e ? t.length : 1,n = e ? t[0].length : t.length,i = Vi(),o = i.createBuffer(s, n, i.sampleRate),r = e || 1 !== s ? t : [t];for (var _t113 = 0; _t113 < s; _t113++) {o.copyToChannel(r[_t113], _t113);}return this._buffer = o, this;} }, { key: "toMono", value: function toMono(t) {if (Nn(t)) this.fromArray(this.toArray(t));else {var _t114 = new Float32Array(this.length);var _e68 = this.numberOfChannels;for (var _s39 = 0; _s39 < _e68; _s39++) {var _e69 = this.toArray(_s39);for (var _s40 = 0; _s40 < _e69.length; _s40++) {_t114[_s40] += _e69[_s40];}}_t114 = _t114.map(function (t) {return t / _e68;}), this.fromArray(_t114);}return this;} }, { key: "toArray", value: function toArray(t) {if (Nn(t)) return this.getChannelData(t);if (1 === this.numberOfChannels) return this.toArray(0);{var _t115 = [];for (var _e70 = 0; _e70 < this.numberOfChannels; _e70++) {_t115[_e70] = this.getChannelData(_e70);}return _t115;}} }, { key: "getChannelData", value: function getChannelData(t) {return this._buffer ? this._buffer.getChannelData(t) : new Float32Array(0);} }, { key: "slice", value: function slice(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;Bn(this.loaded, "Buffer is not loaded");var s = Math.floor(t * this.sampleRate),n = Math.floor(e * this.sampleRate);Bn(s < n, "The start time must be less than the end time");var i = n - s,o = Vi().createBuffer(this.numberOfChannels, i, this.sampleRate);for (var _t116 = 0; _t116 < this.numberOfChannels; _t116++) {o.copyToChannel(this.getChannelData(_t116).subarray(s, n), _t116);}return new Ri(o);} }, { key: "_reverse", value: function _reverse() {if (this.loaded) for (var _t117 = 0; _t117 < this.numberOfChannels; _t117++) {this.getChannelData(_t117).reverse();}return this;} }, { key: "sampleRate", get: function get() {return this._buffer ? this._buffer.sampleRate : Vi().sampleRate;} }, { key: "loaded", get: function get() {return this.length > 0;} }, { key: "duration", get: function get() {return this._buffer ? this._buffer.duration : 0;} }, { key: "length", get: function get() {return this._buffer ? this._buffer.length : 0;} }, { key: "numberOfChannels", get: function get() {return this._buffer ? this._buffer.numberOfChannels : 0;} }, { key: "reverse", get: function get() {return this._reversed;}, set: function set(t) {this._reversed !== t && (this._reversed = t, this._reverse());} }], [{ key: "getDefaults", value: function getDefaults() {return { onerror: Ei, onload: Ei, reverse: !1 };} }, { key: "fromArray", value: function fromArray(t) {return new Ri().fromArray(t);} }, { key: "fromUrl", value: function fromUrl(t) {return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee39() {var e;return _regeneratorRuntime.wrap(function _callee39$(_context39) {while (1) {switch (_context39.prev = _context39.next) {case 0:e = new Ri();_context39.next = 3;return e.load(t);case 3:return _context39.abrupt("return", _context39.sent);case 4:case "end":return _context39.stop();}}}, _callee39);}));} }, { key: "load", value: function load(t) {return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee40() {var e, _s41, _n28, _iterator21, _step21, _t118, s, n, i, o;return _regeneratorRuntime.wrap(function _callee40$(_context40) {while (1) {switch (_context40.prev = _context40.next) {case 0:e = t.match(/\[([^\]\[]+\|.+)\]$/);if (!e) {_context40.next = 23;break;}_s41 = e[1].split("|");_n28 = _s41[0];_iterator21 = _createForOfIteratorHelper(_s41);_context40.prev = 5;_iterator21.s();case 7:if ((_step21 = _iterator21.n()).done) {_context40.next = 14;break;}_t118 = _step21.value;if (!Ri.supportsType(_t118)) {_context40.next = 12;break;}_n28 = _t118;return _context40.abrupt("break", 14);case 12:_context40.next = 7;break;case 14:_context40.next = 19;break;case 16:_context40.prev = 16;_context40.t0 = _context40["catch"](5);_iterator21.e(_context40.t0);case 19:_context40.prev = 19;_iterator21.f();return _context40.finish(19);case 22:t = t.replace(e[0], _n28);case 23:s = "" === Ri.baseUrl || Ri.baseUrl.endsWith("/") ? Ri.baseUrl : Ri.baseUrl + "/", n = document.createElement("a");n.href = s + t, n.pathname = (n.pathname + n.hash).split("/").map(encodeURIComponent).join("/");_context40.next = 27;return fetch(n.href);case 27:i = _context40.sent;if (i.ok) {_context40.next = 30;break;}throw new Error("could not load url: ".concat(t));case 30:_context40.next = 32;return i.arrayBuffer();case 32:o = _context40.sent;_context40.next = 35;return Vi().decodeAudioData(o);case 35:return _context40.abrupt("return", _context40.sent);case 36:case "end":return _context40.stop();}}}, _callee40, null, [[5, 16, 19, 22]]);}));} }, { key: "supportsType", value: function supportsType(t) {var e = t.split("."),s = e[e.length - 1];return "" !== document.createElement("audio").canPlayType("audio/" + s);} }, { key: "loaded", value: function loaded() {return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee41() {return _regeneratorRuntime.wrap(function _callee41$(_context41) {while (1) {switch (_context41.prev = _context41.next) {case 0:_context41.next = 2;return Promise.resolve();case 2:if (!Ri.downloads.length) {_context41.next = 7;break;}_context41.next = 5;return Ri.downloads[0];case 5:_context41.next = 2;break;case 7:case "end":return _context41.stop();}}}, _callee41);}));} }]);return Ri;}(fi);Ri.baseUrl = "", Ri.downloads = [];var qi = /*#__PURE__*/function (_Di) {_inherits(qi, _Di);var _super32 = _createSuper(qi);function qi() {var _this46;_classCallCheck(this, qi);var t, e, s;_this46 = _super32.call(this, { clockSource: "offline", context: ai(arguments[0]) ? arguments[0] : (t = arguments[0], e = arguments[1] * arguments[2], s = arguments[2], new Dn(t, e, s)), lookAhead: 0, updateInterval: ai(arguments[0]) ? 128 / arguments[0].sampleRate : 128 / arguments[2] }), _this46.name = "OfflineContext", _this46._currentTime = 0, _this46.isOffline = !0, _this46._duration = ai(arguments[0]) ? arguments[0].length / arguments[0].sampleRate : arguments[1];return _this46;}_createClass(qi, [{ key: "now", value: function now() {return this._currentTime;} }, { key: "_renderClock", value: function _renderClock(t) {return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee42() {var e, _s42;return _regeneratorRuntime.wrap(function _callee42$(_context42) {while (1) {switch (_context42.prev = _context42.next) {case 0:e = 0;case 1:if (!(this._duration - this._currentTime >= 0)) {_context42.next = 10;break;}this.emit("tick"), this._currentTime += 128 / this.sampleRate, e++;_s42 = Math.floor(this.sampleRate / 128);_context42.t0 = t && e % _s42 == 0;if (!_context42.t0) {_context42.next = 8;break;}_context42.next = 8;return new Promise(function (t) {return setTimeout(t, 1);});case 8:_context42.next = 1;break;case 10:case "end":return _context42.stop();}}}, _callee42, this);}));} }, { key: "render", value: function render() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee43() {var e;return _regeneratorRuntime.wrap(function _callee43$(_context43) {while (1) {switch (_context43.prev = _context43.next) {case 0:_context43.next = 2;return this.workletsAreReady();case 2:_context43.next = 4;return this._renderClock(t);case 4:_context43.next = 6;return this._context.startRendering();case 6:e = _context43.sent;return _context43.abrupt("return", new Ri(e));case 8:case "end":return _context43.stop();}}}, _callee43, this);}));} }, { key: "close", value: function close() {return Promise.resolve();} }, { key: "currentTime", get: function get() {return this._currentTime;} }]);return qi;}(Di);var Fi = new ( /*#__PURE__*/function (_Ci2) {_inherits(_class29, _Ci2);var _super33 = _createSuper(_class29);function _class29() {var _this47;_classCallCheck(this, _class29);_this47 = _super33.apply(this, arguments), _this47.lookAhead = 0, _this47.latencyHint = 0, _this47.isOffline = !1;return _this47;}_createClass(_class29, [{ key: "createAnalyser", value: function createAnalyser() {return {};} }, { key: "createOscillator", value: function createOscillator() {return {};} }, { key: "createBufferSource", value: function createBufferSource() {return {};} }, { key: "createBiquadFilter", value: function createBiquadFilter() {return {};} }, { key: "createBuffer", value: function createBuffer(t, e, s) {return {};} }, { key: "createChannelMerger", value: function createChannelMerger(t) {return {};} }, { key: "createChannelSplitter", value: function createChannelSplitter(t) {return {};} }, { key: "createConstantSource", value: function createConstantSource() {return {};} }, { key: "createConvolver", value: function createConvolver() {return {};} }, { key: "createDelay", value: function createDelay(t) {return {};} }, { key: "createDynamicsCompressor", value: function createDynamicsCompressor() {return {};} }, { key: "createGain", value: function createGain() {return {};} }, { key: "createIIRFilter", value: function createIIRFilter(t, e) {return {};} }, { key: "createPanner", value: function createPanner() {return {};} }, { key: "createPeriodicWave", value: function createPeriodicWave(t, e, s) {return {};} }, { key: "createStereoPanner", value: function createStereoPanner() {return {};} }, { key: "createWaveShaper", value: function createWaveShaper() {return {};} }, { key: "createMediaStreamSource", value: function createMediaStreamSource(t) {return {};} }, { key: "createMediaElementSource", value: function createMediaElementSource(t) {return {};} }, { key: "createMediaStreamDestination", value: function createMediaStreamDestination() {return {};} }, { key: "decodeAudioData", value: function decodeAudioData(t) {return Promise.resolve({});} }, { key: "createAudioWorkletNode", value: function createAudioWorkletNode(t, e) {return {};} }, { key: "addAudioWorkletModule", value: function addAudioWorkletModule(t, e) {return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee44() {return _regeneratorRuntime.wrap(function _callee44$(_context44) {while (1) {switch (_context44.prev = _context44.next) {case 0:return _context44.abrupt("return", Promise.resolve());case 1:case "end":return _context44.stop();}}}, _callee44);}));} }, { key: "resume", value: function resume() {return Promise.resolve();} }, { key: "setTimeout", value: function setTimeout(t, e) {return 0;} }, { key: "clearTimeout", value: function clearTimeout(t) {return this;} }, { key: "setInterval", value: function setInterval(t, e) {return 0;} }, { key: "clearInterval", value: function clearInterval(t) {return this;} }, { key: "getConstant", value: function getConstant(t) {return {};} }, { key: "now", value: function now() {return 0;} }, { key: "immediate", value: function immediate() {return 0;} }, { key: "rawContext", get: function get() {return {};} }, { key: "currentTime", get: function get() {return 0;} }, { key: "state", get: function get() {return {};} }, { key: "sampleRate", get: function get() {return 0;} }, { key: "listener", get: function get() {return {};} }, { key: "transport", get: function get() {return {};} }, { key: "draw", get: function get() {return {};}, set: function set(t) {} }, { key: "destination", get: function get() {return {};}, set: function set(t) {} }]);return _class29;}(Ci))();var Ii = Fi;function Vi() {return Ii === Fi && ei && Ni(new Di()), Ii;}function Ni(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;e && Ii.dispose(), Ii = ci(t) ? new Di(t) : ai(t) ? new qi(t) : t;}function Pi() {return Ii.resume();}if (ti && !ti.TONE_SILENCE_LOGGING) {var _t119 = "v";"dev" === i && (_t119 = "");var _e71 = " * Tone.js ".concat(_t119).concat(i, " * ");console.log("%c".concat(_e71), "background: #000; color: #fff");}function ji(t) {return Math.pow(10, t / 20);}function Li(t) {return Math.log(t) / Math.LN10 * 20;}function zi(t) {return Math.pow(2, t / 12);}var Wi = 440;function Bi(t) {return Math.round(Ui(t));}function Ui(t) {return 69 + 12 * Math.log2(t / Wi);}function Gi(t) {return Wi * Math.pow(2, (t - 69) / 12);}var Qi = /*#__PURE__*/function (_fi4) {_inherits(Qi, _fi4);var _super34 = _createSuper(Qi);function Qi(t, e, s) {var _this48;_classCallCheck(this, Qi);_this48 = _super34.call(this), _this48.defaultUnits = "s", _this48._val = e, _this48._units = s, _this48.context = t, _this48._expressions = _this48._getExpressions();return _this48;}_createClass(Qi, [{ key: "_getExpressions", value: function _getExpressions() {var _this49 = this;return { hz: { method: function method(t) {return _this49._frequencyToUnits(parseFloat(t));}, regexp: /^(\d+(?:\.\d+)?)hz$/i }, i: { method: function method(t) {return _this49._ticksToUnits(parseInt(t, 10));}, regexp: /^(\d+)i$/i }, m: { method: function method(t) {return _this49._beatsToUnits(parseInt(t, 10) * _this49._getTimeSignature());}, regexp: /^(\d+)m$/i }, n: { method: function method(t, e) {var s = parseInt(t, 10),n = "." === e ? 1.5 : 1;return 1 === s ? _this49._beatsToUnits(_this49._getTimeSignature()) * n : _this49._beatsToUnits(4 / s) * n;}, regexp: /^(\d+)n(\.?)$/i }, number: { method: function method(t) {return _this49._expressions[_this49.defaultUnits].method.call(_this49, t);}, regexp: /^(\d+(?:\.\d+)?)$/ }, s: { method: function method(t) {return _this49._secondsToUnits(parseFloat(t));}, regexp: /^(\d+(?:\.\d+)?)s$/ }, samples: { method: function method(t) {return parseInt(t, 10) / _this49.context.sampleRate;}, regexp: /^(\d+)samples$/ }, t: { method: function method(t) {var e = parseInt(t, 10);return _this49._beatsToUnits(8 / (3 * Math.floor(e)));}, regexp: /^(\d+)t$/i }, tr: { method: function method(t, e, s) {var n = 0;return t && "0" !== t && (n += _this49._beatsToUnits(_this49._getTimeSignature() * parseFloat(t))), e && "0" !== e && (n += _this49._beatsToUnits(parseFloat(e))), s && "0" !== s && (n += _this49._beatsToUnits(parseFloat(s) / 4)), n;}, regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/ } };} }, { key: "valueOf", value: function valueOf() {if (this._val instanceof Qi && this.fromType(this._val), Fn(this._val)) return this._noArg();if (zn(this._val) && Fn(this._units)) {for (var _t120 in this._expressions) {if (this._expressions[_t120].regexp.test(this._val.trim())) {this._units = _t120;break;}}} else if (Pn(this._val)) {var _t121 = 0;for (var _e72 in this._val) {if (In(this._val[_e72])) {var _s43 = this._val[_e72];_t121 += new this.constructor(this.context, _e72).valueOf() * _s43;}}return _t121;}if (In(this._units)) {var _t122 = this._expressions[this._units],_e73 = this._val.toString().trim().match(_t122.regexp);return _e73 ? _t122.method.apply(this, _e73.slice(1)) : _t122.method.call(this, this._val);}return zn(this._val) ? parseFloat(this._val) : this._val;} }, { key: "_frequencyToUnits", value: function _frequencyToUnits(t) {return 1 / t;} }, { key: "_beatsToUnits", value: function _beatsToUnits(t) {return 60 / this._getBpm() * t;} }, { key: "_secondsToUnits", value: function _secondsToUnits(t) {return t;} }, { key: "_ticksToUnits", value: function _ticksToUnits(t) {return t * this._beatsToUnits(1) / this._getPPQ();} }, { key: "_noArg", value: function _noArg() {return this._now();} }, { key: "_getBpm", value: function _getBpm() {return this.context.transport.bpm.value;} }, { key: "_getTimeSignature", value: function _getTimeSignature() {return this.context.transport.timeSignature;} }, { key: "_getPPQ", value: function _getPPQ() {return this.context.transport.PPQ;} }, { key: "fromType", value: function fromType(t) {switch (this._units = void 0, this.defaultUnits) {case "s":this._val = t.toSeconds();break;case "i":this._val = t.toTicks();break;case "hz":this._val = t.toFrequency();break;case "midi":this._val = t.toMidi();}return this;} }, { key: "toFrequency", value: function toFrequency() {return 1 / this.toSeconds();} }, { key: "toSamples", value: function toSamples() {return this.toSeconds() * this.context.sampleRate;} }, { key: "toMilliseconds", value: function toMilliseconds() {return 1e3 * this.toSeconds();} }]);return Qi;}(fi);var Zi = /*#__PURE__*/function (_Qi) {_inherits(Zi, _Qi);var _super35 = _createSuper(Zi);function Zi() {var _this50;_classCallCheck(this, Zi);_this50 = _super35.apply(this, arguments), _this50.name = "TimeClass";return _this50;}_createClass(Zi, [{ key: "_getExpressions", value: function _getExpressions() {var _this51 = this;return Object.assign(_get(_getPrototypeOf(Zi.prototype), "_getExpressions", this).call(this), { now: { method: function method(t) {return _this51._now() + new _this51.constructor(_this51.context, t).valueOf();}, regexp: /^\+(.+)/ }, quantize: { method: function method(t) {var e = new Zi(_this51.context, t).valueOf();return _this51._secondsToUnits(_this51.context.transport.nextSubdivision(e));}, regexp: /^@(.+)/ } });} }, { key: "quantize", value: function quantize(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;var s = new this.constructor(this.context, t).valueOf(),n = this.valueOf();return n + (Math.round(n / s) * s - n) * e;} }, { key: "toNotation", value: function toNotation() {var _this52 = this;var t = this.toSeconds(),e = ["1m"];for (var _t123 = 1; _t123 < 9; _t123++) {var _s44 = Math.pow(2, _t123);e.push(_s44 + "n."), e.push(_s44 + "n"), e.push(_s44 + "t");}e.push("0");var s = e[0],n = new Zi(this.context, e[0]).toSeconds();return e.forEach(function (e) {var i = new Zi(_this52.context, e).toSeconds();Math.abs(i - t) < Math.abs(n - t) && (s = e, n = i);}), s;} }, { key: "toBarsBeatsSixteenths", value: function toBarsBeatsSixteenths() {var t = this._beatsToUnits(1);var e = this.valueOf() / t;e = parseFloat(e.toFixed(4));var s = Math.floor(e / this._getTimeSignature());var n = e % 1 * 4;e = Math.floor(e) % this._getTimeSignature();var i = n.toString();return i.length > 3 && (n = parseFloat(parseFloat(i).toFixed(3))), [s, e, n].join(":");} }, { key: "toTicks", value: function toTicks() {var t = this._beatsToUnits(1);return this.valueOf() / t * this._getPPQ();} }, { key: "toSeconds", value: function toSeconds() {return this.valueOf();} }, { key: "toMidi", value: function toMidi() {return Bi(this.toFrequency());} }, { key: "_now", value: function _now() {return this.context.now();} }]);return Zi;}(Qi);function Xi(t, e) {return new Zi(Vi(), t, e);}var Yi = /*#__PURE__*/function (_Zi) {_inherits(Yi, _Zi);var _super36 = _createSuper(Yi);function Yi() {var _this53;_classCallCheck(this, Yi);_this53 = _super36.apply(this, arguments), _this53.name = "Frequency", _this53.defaultUnits = "hz";return _this53;}_createClass(Yi, [{ key: "_getExpressions", value: function _getExpressions() {return Object.assign({}, _get(_getPrototypeOf(Yi.prototype), "_getExpressions", this).call(this), { midi: { regexp: /^(\d+(?:\.\d+)?midi)/, method: function method(t) {return "midi" === this.defaultUnits ? t : Yi.mtof(t);} }, note: { regexp: /^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i, method: function method(t, e) {var s = $i[t.toLowerCase()] + 12 * (parseInt(e, 10) + 1);return "midi" === this.defaultUnits ? s : Yi.mtof(s);} }, tr: { regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/, method: function method(t, e, s) {var n = 1;return t && "0" !== t && (n *= this._beatsToUnits(this._getTimeSignature() * parseFloat(t))), e && "0" !== e && (n *= this._beatsToUnits(parseFloat(e))), s && "0" !== s && (n *= this._beatsToUnits(parseFloat(s) / 4)), n;} } });} }, { key: "transpose", value: function transpose(t) {return new Yi(this.context, this.valueOf() * zi(t));} }, { key: "harmonize", value: function harmonize(t) {var _this54 = this;return t.map(function (t) {return _this54.transpose(t);});} }, { key: "toMidi", value: function toMidi() {return Bi(this.valueOf());} }, { key: "toNote", value: function toNote() {var t = this.toFrequency(),e = Math.log2(t / Yi.A4);var s = Math.round(12 * e) + 57;var n = Math.floor(s / 12);return n < 0 && (s += -12 * n), Hi[s % 12] + n.toString();} }, { key: "toSeconds", value: function toSeconds() {return 1 / _get(_getPrototypeOf(Yi.prototype), "toSeconds", this).call(this);} }, { key: "toTicks", value: function toTicks() {var t = this._beatsToUnits(1),e = this.valueOf() / t;return Math.floor(e * this._getPPQ());} }, { key: "_noArg", value: function _noArg() {return 0;} }, { key: "_frequencyToUnits", value: function _frequencyToUnits(t) {return t;} }, { key: "_ticksToUnits", value: function _ticksToUnits(t) {return 1 / (60 * t / (this._getBpm() * this._getPPQ()));} }, { key: "_beatsToUnits", value: function _beatsToUnits(t) {return 1 / _get(_getPrototypeOf(Yi.prototype), "_beatsToUnits", this).call(this, t);} }, { key: "_secondsToUnits", value: function _secondsToUnits(t) {return 1 / t;} }], [{ key: "mtof", value: function mtof(t) {return Gi(t);} }, { key: "ftom", value: function ftom(t) {return Bi(t);} }, { key: "A4", get: function get() {return Wi;}, set: function set(t) {!function (t) {Wi = t;}(t);} }]);return Yi;}(Zi);var $i = { cbbb: -3, cbb: -2, cb: -1, c: 0, "c#": 1, cx: 2, "c##": 2, "c###": 3, "cx#": 3, "c#x": 3, dbbb: -1, dbb: 0, db: 1, d: 2, "d#": 3, dx: 4, "d##": 4, "d###": 5, "dx#": 5, "d#x": 5, ebbb: 1, ebb: 2, eb: 3, e: 4, "e#": 5, ex: 6, "e##": 6, "e###": 7, "ex#": 7, "e#x": 7, fbbb: 2, fbb: 3, fb: 4, f: 5, "f#": 6, fx: 7, "f##": 7, "f###": 8, "fx#": 8, "f#x": 8, gbbb: 4, gbb: 5, gb: 6, g: 7, "g#": 8, gx: 9, "g##": 9, "g###": 10, "gx#": 10, "g#x": 10, abbb: 6, abb: 7, ab: 8, a: 9, "a#": 10, ax: 11, "a##": 11, "a###": 12, "ax#": 12, "a#x": 12, bbbb: 8, bbb: 9, bb: 10, b: 11, "b#": 12, bx: 13, "b##": 13, "b###": 14, "bx#": 14, "b#x": 14 },Hi = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];function Ji(t, e) {return new Yi(Vi(), t, e);}var Ki = /*#__PURE__*/function (_Zi2) {_inherits(Ki, _Zi2);var _super37 = _createSuper(Ki);function Ki() {var _this55;_classCallCheck(this, Ki);_this55 = _super37.apply(this, arguments), _this55.name = "TransportTime";return _this55;}_createClass(Ki, [{ key: "_now", value: function _now() {return this.context.transport.seconds;} }]);return Ki;}(Zi);function to(t, e) {return new Ki(Vi(), t, e);}var eo = /*#__PURE__*/function (_fi5) {_inherits(eo, _fi5);var _super38 = _createSuper(eo);function eo() {var _this56;_classCallCheck(this, eo);_this56 = _super38.call(this);var t = ui(eo.getDefaults(), arguments, ["context"]);_this56.defaultContext ? _this56.context = _this56.defaultContext : _this56.context = t.context;return _this56;}_createClass(eo, [{ key: "now", value: function now() {return this.context.currentTime + this.context.lookAhead;} }, { key: "immediate", value: function immediate() {return this.context.currentTime;} }, { key: "toSeconds", value: function toSeconds(t) {return Yn(t), new Zi(this.context, t).toSeconds();} }, { key: "toFrequency", value: function toFrequency(t) {return new Yi(this.context, t).toFrequency();} }, { key: "toTicks", value: function toTicks(t) {return new Ki(this.context, t).toTicks();} }, { key: "_getPartialProperties", value: function _getPartialProperties(t) {var e = this.get();return Object.keys(e).forEach(function (s) {Fn(t[s]) && delete e[s];}), e;} }, { key: "get", value: function get() {var _this57 = this;var t = this.constructor.getDefaults();return Object.keys(t).forEach(function (e) {if (Reflect.has(_this57, e)) {var _s45 = _this57[e];In(_s45) && In(_s45.value) && In(_s45.setValueAtTime) ? t[e] = _s45.value : _s45 instanceof eo ? t[e] = _s45._getPartialProperties(t[e]) : Ln(_s45) || Nn(_s45) || zn(_s45) || jn(_s45) ? t[e] = _s45 : delete t[e];}}), t;} }, { key: "set", value: function set(t) {var _this58 = this;return Object.keys(t).forEach(function (e) {Reflect.has(_this58, e) && In(_this58[e]) && (_this58[e] && In(_this58[e].value) && In(_this58[e].setValueAtTime) ? _this58[e].value !== t[e] && (_this58[e].value = t[e]) : _this58[e] instanceof eo ? _this58[e].set(t[e]) : _this58[e] = t[e]);}), this;} }, { key: "sampleTime", get: function get() {return 1 / this.context.sampleRate;} }, { key: "blockTime", get: function get() {return 128 / this.context.sampleRate;} }], [{ key: "getDefaults", value: function getDefaults() {return { context: Vi() };} }]);return eo;}(fi);var so = /*#__PURE__*/function (_wi) {_inherits(so, _wi);var _super39 = _createSuper(so);function so() {var _this59;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "stopped";_classCallCheck(this, so);_this59 = _super39.call(this), _this59.name = "StateTimeline", _this59._initial = t, _this59.setStateAtTime(_this59._initial, 0);return _this59;}_createClass(so, [{ key: "getValueAtTime", value: function getValueAtTime(t) {var e = this.get(t);return null !== e ? e.state : this._initial;} }, { key: "setStateAtTime", value: function setStateAtTime(t, e, s) {return Un(e, 0), this.add(Object.assign({}, s, { state: t, time: e })), this;} }, { key: "getLastState", value: function getLastState(t, e) {for (var _s46 = this._search(e); _s46 >= 0; _s46--) {var _e74 = this._timeline[_s46];if (_e74.state === t) return _e74;}} }, { key: "getNextState", value: function getNextState(t, e) {var s = this._search(e);if (-1 !== s) for (var _e75 = s; _e75 < this._timeline.length; _e75++) {var _s47 = this._timeline[_e75];if (_s47.state === t) return _s47;}} }]);return so;}(wi);var no = /*#__PURE__*/function (_eo) {_inherits(no, _eo);var _super40 = _createSuper(no);function no() {var _this60;_classCallCheck(this, no);_this60 = _super40.call(this, ui(no.getDefaults(), arguments, ["param", "units", "convert"])), _this60.name = "Param", _this60.overridden = !1, _this60._minOutput = 1e-7;var t = ui(no.getDefaults(), arguments, ["param", "units", "convert"]);for (Bn(In(t.param) && (oi(t.param) || t.param instanceof no), "param must be an AudioParam"); !oi(t.param);) {t.param = t.param._param;}_this60._swappable = !!In(t.swappable) && t.swappable, _this60._swappable ? (_this60.input = _this60.context.createGain(), _this60._param = t.param, _this60.input.connect(_this60._param)) : _this60._param = _this60.input = t.param, _this60._events = new wi(1e3), _this60._initialValue = _this60._param.defaultValue, _this60.units = t.units, _this60.convert = t.convert, _this60._minValue = t.minValue, _this60._maxValue = t.maxValue, In(t.value) && t.value !== _this60._toType(_this60._initialValue) && _this60.setValueAtTime(t.value, 0);return _this60;}_createClass(no, [{ key: "_is", value: function _is(t, e) {return this.units === e;} }, { key: "_assertRange", value: function _assertRange(t) {return In(this.maxValue) && In(this.minValue) && Un(t, this._fromType(this.minValue), this._fromType(this.maxValue)), t;} }, { key: "_fromType", value: function _fromType(t) {return this.convert && !this.overridden ? this._is(t, "time") ? this.toSeconds(t) : this._is(t, "decibels") ? ji(t) : this._is(t, "frequency") ? this.toFrequency(t) : t : this.overridden ? 0 : t;} }, { key: "_toType", value: function _toType(t) {return this.convert && "decibels" === this.units ? Li(t) : t;} }, { key: "setValueAtTime", value: function setValueAtTime(t, e) {var s = this.toSeconds(e),n = this._fromType(t);return Bn(isFinite(n) && isFinite(s), "Invalid argument(s) to setValueAtTime: ".concat(JSON.stringify(t), ", ").concat(JSON.stringify(e))), this._assertRange(n), this.log(this.units, "setValueAtTime", t, s), this._events.add({ time: s, type: "setValueAtTime", value: n }), this._param.setValueAtTime(n, s), this;} }, { key: "getValueAtTime", value: function getValueAtTime(t) {var e = Math.max(this.toSeconds(t), 0),s = this._events.getAfter(e),n = this._events.get(e);var i = this._initialValue;if (null === n) i = this._initialValue;else if ("setTargetAtTime" !== n.type || null !== s && "setValueAtTime" !== s.type) {if (null === s) i = n.value;else if ("linearRampToValueAtTime" === s.type || "exponentialRampToValueAtTime" === s.type) {var _t124 = n.value;if ("setTargetAtTime" === n.type) {var _e76 = this._events.getBefore(n.time);_t124 = null === _e76 ? this._initialValue : _e76.value;}i = "linearRampToValueAtTime" === s.type ? this._linearInterpolate(n.time, _t124, s.time, s.value, e) : this._exponentialInterpolate(n.time, _t124, s.time, s.value, e);} else i = n.value;} else {var _t125 = this._events.getBefore(n.time);var _s48;_s48 = null === _t125 ? this._initialValue : _t125.value, "setTargetAtTime" === n.type && (i = this._exponentialApproach(n.time, _s48, n.value, n.constant, e));}return this._toType(i);} }, { key: "setRampPoint", value: function setRampPoint(t) {t = this.toSeconds(t);var e = this.getValueAtTime(t);return this.cancelAndHoldAtTime(t), 0 === this._fromType(e) && (e = this._toType(this._minOutput)), this.setValueAtTime(e, t), this;} }, { key: "linearRampToValueAtTime", value: function linearRampToValueAtTime(t, e) {var s = this._fromType(t),n = this.toSeconds(e);return Bn(isFinite(s) && isFinite(n), "Invalid argument(s) to linearRampToValueAtTime: ".concat(JSON.stringify(t), ", ").concat(JSON.stringify(e))), this._assertRange(s), this._events.add({ time: n, type: "linearRampToValueAtTime", value: s }), this.log(this.units, "linearRampToValueAtTime", t, n), this._param.linearRampToValueAtTime(s, n), this;} }, { key: "exponentialRampToValueAtTime", value: function exponentialRampToValueAtTime(t, e) {var s = this._fromType(t);s = yi(s, 0) ? this._minOutput : s, this._assertRange(s);var n = this.toSeconds(e);return Bn(isFinite(s) && isFinite(n), "Invalid argument(s) to exponentialRampToValueAtTime: ".concat(JSON.stringify(t), ", ").concat(JSON.stringify(e))), this._events.add({ time: n, type: "exponentialRampToValueAtTime", value: s }), this.log(this.units, "exponentialRampToValueAtTime", t, n), this._param.exponentialRampToValueAtTime(s, n), this;} }, { key: "exponentialRampTo", value: function exponentialRampTo(t, e, s) {return s = this.toSeconds(s), this.setRampPoint(s), this.exponentialRampToValueAtTime(t, s + this.toSeconds(e)), this;} }, { key: "linearRampTo", value: function linearRampTo(t, e, s) {return s = this.toSeconds(s), this.setRampPoint(s), this.linearRampToValueAtTime(t, s + this.toSeconds(e)), this;} }, { key: "targetRampTo", value: function targetRampTo(t, e, s) {return s = this.toSeconds(s), this.setRampPoint(s), this.exponentialApproachValueAtTime(t, s, e), this;} }, { key: "exponentialApproachValueAtTime", value: function exponentialApproachValueAtTime(t, e, s) {e = this.toSeconds(e), s = this.toSeconds(s);var n = Math.log(s + 1) / Math.log(200);return this.setTargetAtTime(t, e, n), this.cancelAndHoldAtTime(e + .9 * s), this.linearRampToValueAtTime(t, e + s), this;} }, { key: "setTargetAtTime", value: function setTargetAtTime(t, e, s) {var n = this._fromType(t);Bn(isFinite(s) && s > 0, "timeConstant must be a number greater than 0");var i = this.toSeconds(e);return this._assertRange(n), Bn(isFinite(n) && isFinite(i), "Invalid argument(s) to setTargetAtTime: ".concat(JSON.stringify(t), ", ").concat(JSON.stringify(e))), this._events.add({ constant: s, time: i, type: "setTargetAtTime", value: n }), this.log(this.units, "setTargetAtTime", t, i, s), this._param.setTargetAtTime(n, i, s), this;} }, { key: "setValueCurveAtTime", value: function setValueCurveAtTime(t, e, s) {var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;s = this.toSeconds(s), e = this.toSeconds(e);var i = this._fromType(t[0]) * n;this.setValueAtTime(this._toType(i), e);var o = s / (t.length - 1);for (var _s49 = 1; _s49 < t.length; _s49++) {var _i18 = this._fromType(t[_s49]) * n;this.linearRampToValueAtTime(this._toType(_i18), e + _s49 * o);}return this;} }, { key: "cancelScheduledValues", value: function cancelScheduledValues(t) {var e = this.toSeconds(t);return Bn(isFinite(e), "Invalid argument to cancelScheduledValues: ".concat(JSON.stringify(t))), this._events.cancel(e), this._param.cancelScheduledValues(e), this.log(this.units, "cancelScheduledValues", e), this;} }, { key: "cancelAndHoldAtTime", value: function cancelAndHoldAtTime(t) {var e = this.toSeconds(t),s = this._fromType(this.getValueAtTime(e));Bn(isFinite(e), "Invalid argument to cancelAndHoldAtTime: ".concat(JSON.stringify(t))), this.log(this.units, "cancelAndHoldAtTime", e, "value=" + s);var n = this._events.get(e),i = this._events.getAfter(e);return n && yi(n.time, e) ? i ? (this._param.cancelScheduledValues(i.time), this._events.cancel(i.time)) : (this._param.cancelAndHoldAtTime(e), this._events.cancel(e + this.sampleTime)) : i && (this._param.cancelScheduledValues(i.time), this._events.cancel(i.time), "linearRampToValueAtTime" === i.type ? this.linearRampToValueAtTime(this._toType(s), e) : "exponentialRampToValueAtTime" === i.type && this.exponentialRampToValueAtTime(this._toType(s), e)), this._events.add({ time: e, type: "setValueAtTime", value: s }), this._param.setValueAtTime(s, e), this;} }, { key: "rampTo", value: function rampTo(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : .1;var s = arguments.length > 2 ? arguments[2] : undefined;return "frequency" === this.units || "bpm" === this.units || "decibels" === this.units ? this.exponentialRampTo(t, e, s) : this.linearRampTo(t, e, s), this;} }, { key: "apply", value: function apply(t) {var e = this.context.currentTime;t.setValueAtTime(this.getValueAtTime(e), e);var s = this._events.get(e);if (s && "setTargetAtTime" === s.type) {var _n29 = this._events.getAfter(s.time),_i19 = _n29 ? _n29.time : e + 2,_o18 = (_i19 - e) / 10;for (var _s50 = e; _s50 < _i19; _s50 += _o18) {t.linearRampToValueAtTime(this.getValueAtTime(_s50), _s50);}}return this._events.forEachAfter(this.context.currentTime, function (e) {"cancelScheduledValues" === e.type ? t.cancelScheduledValues(e.time) : "setTargetAtTime" === e.type ? t.setTargetAtTime(e.value, e.time, e.constant) : t[e.type](e.value, e.time);}), this;} }, { key: "setParam", value: function setParam(t) {Bn(this._swappable, "The Param must be assigned as 'swappable' in the constructor");var e = this.input;return e.disconnect(this._param), this.apply(t), this._param = t, e.connect(this._param), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(no.prototype), "dispose", this).call(this), this._events.dispose(), this;} }, { key: "_exponentialApproach", value: function _exponentialApproach(t, e, s, n, i) {return s + (e - s) * Math.exp(-(i - t) / n);} }, { key: "_linearInterpolate", value: function _linearInterpolate(t, e, s, n, i) {return e + (i - t) / (s - t) * (n - e);} }, { key: "_exponentialInterpolate", value: function _exponentialInterpolate(t, e, s, n, i) {return e * Math.pow(n / e, (i - t) / (s - t));} }, { key: "value", get: function get() {var t = this.now();return this.getValueAtTime(t);}, set: function set(t) {this.cancelScheduledValues(this.now()), this.setValueAtTime(t, this.now());} }, { key: "minValue", get: function get() {return In(this._minValue) ? this._minValue : "time" === this.units || "frequency" === this.units || "normalRange" === this.units || "positive" === this.units || "transportTime" === this.units || "ticks" === this.units || "bpm" === this.units || "hertz" === this.units || "samples" === this.units ? 0 : "audioRange" === this.units ? -1 : "decibels" === this.units ? -1 / 0 : this._param.minValue;} }, { key: "maxValue", get: function get() {return In(this._maxValue) ? this._maxValue : "normalRange" === this.units || "audioRange" === this.units ? 1 : this._param.maxValue;} }, { key: "defaultValue", get: function get() {return this._toType(this._param.defaultValue);} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(eo.getDefaults(), { convert: !0, units: "number" });} }]);return no;}(eo);var io = /*#__PURE__*/function (_eo2) {_inherits(io, _eo2);var _super41 = _createSuper(io);function io() {var _this61;_classCallCheck(this, io);_this61 = _super41.apply(this, arguments), _this61._internalChannels = [];return _this61;}_createClass(io, [{ key: "_isAudioNode", value: function _isAudioNode(t) {return In(t) && (t instanceof io || ri(t));} }, { key: "_getInternalNodes", value: function _getInternalNodes() {var t = this._internalChannels.slice(0);return this._isAudioNode(this.input) && t.push(this.input), this._isAudioNode(this.output) && this.input !== this.output && t.push(this.output), t;} }, { key: "_setChannelProperties", value: function _setChannelProperties(t) {this._getInternalNodes().forEach(function (e) {e.channelCount = t.channelCount, e.channelCountMode = t.channelCountMode, e.channelInterpretation = t.channelInterpretation;});} }, { key: "_getChannelProperties", value: function _getChannelProperties() {var t = this._getInternalNodes();Bn(t.length > 0, "ToneAudioNode does not have any internal nodes");var e = t[0];return { channelCount: e.channelCount, channelCountMode: e.channelCountMode, channelInterpretation: e.channelInterpretation };} }, { key: "connect", value: function connect(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;return ro(this, t, e, s), this;} }, { key: "toDestination", value: function toDestination() {return this.connect(this.context.destination), this;} }, { key: "toMaster", value: function toMaster() {return Kn("toMaster() has been renamed toDestination()"), this.toDestination();} }, { key: "disconnect", value: function disconnect(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;return ao(this, t, e, s), this;} }, { key: "chain", value: function chain() {for (var _len15 = arguments.length, t = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {t[_key15] = arguments[_key15];}return oo.apply(void 0, [this].concat(t)), this;} }, { key: "fan", value: function fan() {var _this62 = this;for (var _len16 = arguments.length, t = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {t[_key16] = arguments[_key16];}return t.forEach(function (t) {return _this62.connect(t);}), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(io.prototype), "dispose", this).call(this), In(this.input) && (this.input instanceof io ? this.input.dispose() : ri(this.input) && this.input.disconnect()), In(this.output) && (this.output instanceof io ? this.output.dispose() : ri(this.output) && this.output.disconnect()), this._internalChannels = [], this;} }, { key: "numberOfInputs", get: function get() {return In(this.input) ? oi(this.input) || this.input instanceof no ? 1 : this.input.numberOfInputs : 0;} }, { key: "numberOfOutputs", get: function get() {return In(this.output) ? this.output.numberOfOutputs : 0;} }, { key: "channelCount", get: function get() {return this._getChannelProperties().channelCount;}, set: function set(t) {var e = this._getChannelProperties();this._setChannelProperties(Object.assign(e, { channelCount: t }));} }, { key: "channelCountMode", get: function get() {return this._getChannelProperties().channelCountMode;}, set: function set(t) {var e = this._getChannelProperties();this._setChannelProperties(Object.assign(e, { channelCountMode: t }));} }, { key: "channelInterpretation", get: function get() {return this._getChannelProperties().channelInterpretation;}, set: function set(t) {var e = this._getChannelProperties();this._setChannelProperties(Object.assign(e, { channelInterpretation: t }));} }]);return io;}(eo);function oo() {for (var _len17 = arguments.length, t = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {t[_key17] = arguments[_key17];}var e = t.shift();t.reduce(function (t, e) {return t instanceof io ? t.connect(e) : ri(t) && ro(t, e), e;}, e);}function ro(t, e) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;for (Bn(In(t), "Cannot connect from undefined node"), Bn(In(e), "Cannot connect to undefined node"), (e instanceof io || ri(e)) && Bn(e.numberOfInputs > 0, "Cannot connect to node with no inputs"), Bn(t.numberOfOutputs > 0, "Cannot connect from node with no outputs"); e instanceof io || e instanceof no;) {In(e.input) && (e = e.input);}for (; t instanceof io;) {In(t.output) && (t = t.output);}oi(e) ? t.connect(e, s) : t.connect(e, s, n);}function ao(t, e) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;if (In(e)) for (; e instanceof io;) {e = e.input;}for (; !ri(t);) {In(t.output) && (t = t.output);}oi(e) ? t.disconnect(e, s) : ri(e) ? t.disconnect(e, s, n) : t.disconnect();}function co() {for (var _len18 = arguments.length, t = new Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {t[_key18] = arguments[_key18];}var e = t.pop();In(e) && t.forEach(function (t) {return ro(t, e);});}var ho = /*#__PURE__*/function (_io) {_inherits(ho, _io);var _super42 = _createSuper(ho);function ho() {var _this63;_classCallCheck(this, ho);_this63 = _super42.call(this, ui(ho.getDefaults(), arguments, ["gain", "units"])), _this63.name = "Gain", _this63._gainNode = _this63.context.createGain(), _this63.input = _this63._gainNode, _this63.output = _this63._gainNode;var t = ui(ho.getDefaults(), arguments, ["gain", "units"]);_this63.gain = new no({ context: _this63.context, convert: t.convert, param: _this63._gainNode.gain, units: t.units, value: t.gain, minValue: t.minValue, maxValue: t.maxValue }), Oi(_assertThisInitialized(_this63), "gain");return _this63;}_createClass(ho, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(ho.prototype), "dispose", this).call(this), this._gainNode.disconnect(), this.gain.dispose(), this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { convert: !0, gain: 1, units: "gain" });} }]);return ho;}(io);var lo = /*#__PURE__*/function (_io2) {_inherits(lo, _io2);var _super43 = _createSuper(lo);function lo(t) {var _this64;_classCallCheck(this, lo);_this64 = _super43.call(this, t), _this64.onended = Ei, _this64._startTime = -1, _this64._stopTime = -1, _this64._timeout = -1, _this64.output = new ho({ context: _this64.context, gain: 0 }), _this64._gainNode = _this64.output, _this64.getStateAtTime = function (t) {var e = this.toSeconds(t);return -1 !== this._startTime && e >= this._startTime && (-1 === this._stopTime || e <= this._stopTime) ? "started" : "stopped";}, _this64._fadeIn = t.fadeIn, _this64._fadeOut = t.fadeOut, _this64._curve = t.curve, _this64.onended = t.onended;return _this64;}_createClass(lo, [{ key: "_startGain", value: function _startGain(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;Bn(-1 === this._startTime, "Source cannot be started more than once");var s = this.toSeconds(this._fadeIn);return this._startTime = t + s, this._startTime = Math.max(this._startTime, this.context.currentTime), s > 0 ? (this._gainNode.gain.setValueAtTime(0, t), "linear" === this._curve ? this._gainNode.gain.linearRampToValueAtTime(e, t + s) : this._gainNode.gain.exponentialApproachValueAtTime(e, t, s)) : this._gainNode.gain.setValueAtTime(e, t), this;} }, { key: "stop", value: function stop(t) {return this.log("stop", t), this._stopGain(this.toSeconds(t)), this;} }, { key: "_stopGain", value: function _stopGain(t) {var _this65 = this;Bn(-1 !== this._startTime, "'start' must be called before 'stop'"), this.cancelStop();var e = this.toSeconds(this._fadeOut);return this._stopTime = this.toSeconds(t) + e, this._stopTime = Math.max(this._stopTime, this.now()), e > 0 ? "linear" === this._curve ? this._gainNode.gain.linearRampTo(0, e, t) : this._gainNode.gain.targetRampTo(0, e, t) : (this._gainNode.gain.cancelAndHoldAtTime(t), this._gainNode.gain.setValueAtTime(0, t)), this.context.clearTimeout(this._timeout), this._timeout = this.context.setTimeout(function () {var t = "exponential" === _this65._curve ? 2 * e : 0;_this65._stopSource(_this65.now() + t), _this65._onended();}, this._stopTime - this.context.currentTime), this;} }, { key: "_onended", value: function _onended() {var _this66 = this;if (this.onended !== Ei && (this.onended(this), this.onended = Ei, !this.context.isOffline)) {var _t126 = function _t126() {return _this66.dispose();};void 0 !== window.requestIdleCallback ? window.requestIdleCallback(_t126) : setTimeout(_t126, 1e3);}} }, { key: "cancelStop", value: function cancelStop() {return this.log("cancelStop"), Bn(-1 !== this._startTime, "Source is not started"), this._gainNode.gain.cancelScheduledValues(this._startTime + this.sampleTime), this.context.clearTimeout(this._timeout), this._stopTime = -1, this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(lo.prototype), "dispose", this).call(this), this._gainNode.dispose(), this.onended = Ei, this;} }, { key: "state", get: function get() {return this.getStateAtTime(this.now());} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { curve: "linear", fadeIn: 0, fadeOut: 0, onended: Ei });} }]);return lo;}(io);var uo = /*#__PURE__*/function (_lo) {_inherits(uo, _lo);var _super44 = _createSuper(uo);function uo() {var _this67;_classCallCheck(this, uo);_this67 = _super44.call(this, ui(uo.getDefaults(), arguments, ["offset"])), _this67.name = "ToneConstantSource", _this67._source = _this67.context.createConstantSource();var t = ui(uo.getDefaults(), arguments, ["offset"]);ro(_this67._source, _this67._gainNode), _this67.offset = new no({ context: _this67.context, convert: t.convert, param: _this67._source.offset, units: t.units, value: t.offset, minValue: t.minValue, maxValue: t.maxValue });return _this67;}_createClass(uo, [{ key: "start", value: function start(t) {var e = this.toSeconds(t);return this.log("start", e), this._startGain(e), this._source.start(e), this;} }, { key: "_stopSource", value: function _stopSource(t) {this._source.stop(t);} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(uo.prototype), "dispose", this).call(this), "started" === this.state && this.stop(), this._source.disconnect(), this.offset.dispose(), this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(lo.getDefaults(), { convert: !0, offset: 1, units: "number" });} }]);return uo;}(lo);var po = /*#__PURE__*/function (_io3) {_inherits(po, _io3);var _super45 = _createSuper(po);function po() {var _this68;_classCallCheck(this, po);_this68 = _super45.call(this, ui(po.getDefaults(), arguments, ["value", "units"])), _this68.name = "Signal", _this68.override = !0;var t = ui(po.getDefaults(), arguments, ["value", "units"]);_this68.output = _this68._constantSource = new uo({ context: _this68.context, convert: t.convert, offset: t.value, units: t.units, minValue: t.minValue, maxValue: t.maxValue }), _this68._constantSource.start(0), _this68.input = _this68._param = _this68._constantSource.offset;return _this68;}_createClass(po, [{ key: "connect", value: function connect(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;return fo(this, t, e, s), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(po.prototype), "dispose", this).call(this), this._param.dispose(), this._constantSource.dispose(), this;} }, { key: "setValueAtTime", value: function setValueAtTime(t, e) {return this._param.setValueAtTime(t, e), this;} }, { key: "getValueAtTime", value: function getValueAtTime(t) {return this._param.getValueAtTime(t);} }, { key: "setRampPoint", value: function setRampPoint(t) {return this._param.setRampPoint(t), this;} }, { key: "linearRampToValueAtTime", value: function linearRampToValueAtTime(t, e) {return this._param.linearRampToValueAtTime(t, e), this;} }, { key: "exponentialRampToValueAtTime", value: function exponentialRampToValueAtTime(t, e) {return this._param.exponentialRampToValueAtTime(t, e), this;} }, { key: "exponentialRampTo", value: function exponentialRampTo(t, e, s) {return this._param.exponentialRampTo(t, e, s), this;} }, { key: "linearRampTo", value: function linearRampTo(t, e, s) {return this._param.linearRampTo(t, e, s), this;} }, { key: "targetRampTo", value: function targetRampTo(t, e, s) {return this._param.targetRampTo(t, e, s), this;} }, { key: "exponentialApproachValueAtTime", value: function exponentialApproachValueAtTime(t, e, s) {return this._param.exponentialApproachValueAtTime(t, e, s), this;} }, { key: "setTargetAtTime", value: function setTargetAtTime(t, e, s) {return this._param.setTargetAtTime(t, e, s), this;} }, { key: "setValueCurveAtTime", value: function setValueCurveAtTime(t, e, s, n) {return this._param.setValueCurveAtTime(t, e, s, n), this;} }, { key: "cancelScheduledValues", value: function cancelScheduledValues(t) {return this._param.cancelScheduledValues(t), this;} }, { key: "cancelAndHoldAtTime", value: function cancelAndHoldAtTime(t) {return this._param.cancelAndHoldAtTime(t), this;} }, { key: "rampTo", value: function rampTo(t, e, s) {return this._param.rampTo(t, e, s), this;} }, { key: "apply", value: function apply(t) {return this._param.apply(t), this;} }, { key: "value", get: function get() {return this._param.value;}, set: function set(t) {this._param.value = t;} }, { key: "convert", get: function get() {return this._param.convert;}, set: function set(t) {this._param.convert = t;} }, { key: "units", get: function get() {return this._param.units;} }, { key: "overridden", get: function get() {return this._param.overridden;}, set: function set(t) {this._param.overridden = t;} }, { key: "maxValue", get: function get() {return this._param.maxValue;} }, { key: "minValue", get: function get() {return this._param.minValue;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { convert: !0, units: "number", value: 0 });} }]);return po;}(io);function fo(t, e, s, n) {(e instanceof no || oi(e) || e instanceof po && e.override) && (e.cancelScheduledValues(0), e.setValueAtTime(0, 0), e instanceof po && (e.overridden = !0)), ro(t, e, s, n);}var _o = /*#__PURE__*/function (_no) {_inherits(_o, _no);var _super46 = _createSuper(_o);function _o() {var _this69;_classCallCheck(this, _o);_this69 = _super46.call(this, ui(_o.getDefaults(), arguments, ["value"])), _this69.name = "TickParam", _this69._events = new wi(1 / 0), _this69._multiplier = 1;var t = ui(_o.getDefaults(), arguments, ["value"]);_this69._multiplier = t.multiplier, _this69._events.cancel(0), _this69._events.add({ ticks: 0, time: 0, type: "setValueAtTime", value: _this69._fromType(t.value) }), _this69.setValueAtTime(t.value, 0);return _this69;}_createClass(_o, [{ key: "setTargetAtTime", value: function setTargetAtTime(t, e, s) {e = this.toSeconds(e), this.setRampPoint(e);var n = this._fromType(t),i = this._events.get(e),o = Math.round(Math.max(1 / s, 1));for (var _t127 = 0; _t127 <= o; _t127++) {var _o19 = s * _t127 + e,_r10 = this._exponentialApproach(i.time, i.value, n, s, _o19);this.linearRampToValueAtTime(this._toType(_r10), _o19);}return this;} }, { key: "setValueAtTime", value: function setValueAtTime(t, e) {var s = this.toSeconds(e);_get(_getPrototypeOf(_o.prototype), "setValueAtTime", this).call(this, t, e);var n = this._events.get(s),i = this._events.previousEvent(n),o = this._getTicksUntilEvent(i, s);return n.ticks = Math.max(o, 0), this;} }, { key: "linearRampToValueAtTime", value: function linearRampToValueAtTime(t, e) {var s = this.toSeconds(e);_get(_getPrototypeOf(_o.prototype), "linearRampToValueAtTime", this).call(this, t, e);var n = this._events.get(s),i = this._events.previousEvent(n),o = this._getTicksUntilEvent(i, s);return n.ticks = Math.max(o, 0), this;} }, { key: "exponentialRampToValueAtTime", value: function exponentialRampToValueAtTime(t, e) {e = this.toSeconds(e);var s = this._fromType(t),n = this._events.get(e),i = Math.round(Math.max(10 * (e - n.time), 1)),o = (e - n.time) / i;for (var _t128 = 0; _t128 <= i; _t128++) {var _i20 = o * _t128 + n.time,_r11 = this._exponentialInterpolate(n.time, n.value, e, s, _i20);this.linearRampToValueAtTime(this._toType(_r11), _i20);}return this;} }, { key: "_getTicksUntilEvent", value: function _getTicksUntilEvent(t, e) {if (null === t) t = { ticks: 0, time: 0, type: "setValueAtTime", value: 0 };else if (Fn(t.ticks)) {var _e77 = this._events.previousEvent(t);t.ticks = this._getTicksUntilEvent(_e77, t.time);}var s = this._fromType(this.getValueAtTime(t.time));var n = this._fromType(this.getValueAtTime(e));var i = this._events.get(e);return i && i.time === e && "setValueAtTime" === i.type && (n = this._fromType(this.getValueAtTime(e - this.sampleTime))), .5 * (e - t.time) * (s + n) + t.ticks;} }, { key: "getTicksAtTime", value: function getTicksAtTime(t) {var e = this.toSeconds(t),s = this._events.get(e);return Math.max(this._getTicksUntilEvent(s, e), 0);} }, { key: "getDurationOfTicks", value: function getDurationOfTicks(t, e) {var s = this.toSeconds(e),n = this.getTicksAtTime(e);return this.getTimeOfTick(n + t) - s;} }, { key: "getTimeOfTick", value: function getTimeOfTick(t) {var e = this._events.get(t, "ticks"),s = this._events.getAfter(t, "ticks");if (e && e.ticks === t) return e.time;if (e && s && "linearRampToValueAtTime" === s.type && e.value !== s.value) {var _n30 = this._fromType(this.getValueAtTime(e.time)),_i21 = (this._fromType(this.getValueAtTime(s.time)) - _n30) / (s.time - e.time),_o20 = Math.sqrt(Math.pow(_n30, 2) - 2 * _i21 * (e.ticks - t)),_r12 = (-_n30 + _o20) / _i21,_a7 = (-_n30 - _o20) / _i21;return (_r12 > 0 ? _r12 : _a7) + e.time;}return e ? 0 === e.value ? 1 / 0 : e.time + (t - e.ticks) / e.value : t / this._initialValue;} }, { key: "ticksToTime", value: function ticksToTime(t, e) {return this.getDurationOfTicks(t, e);} }, { key: "timeToTicks", value: function timeToTicks(t, e) {var s = this.toSeconds(e),n = this.toSeconds(t),i = this.getTicksAtTime(s);return this.getTicksAtTime(s + n) - i;} }, { key: "_fromType", value: function _fromType(t) {return "bpm" === this.units && this.multiplier ? 1 / (60 / t / this.multiplier) : _get(_getPrototypeOf(_o.prototype), "_fromType", this).call(this, t);} }, { key: "_toType", value: function _toType(t) {return "bpm" === this.units && this.multiplier ? t / this.multiplier * 60 : _get(_getPrototypeOf(_o.prototype), "_toType", this).call(this, t);} }, { key: "multiplier", get: function get() {return this._multiplier;}, set: function set(t) {var e = this.value;this._multiplier = t, this.cancelScheduledValues(0), this.setValueAtTime(e, 0);} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(no.getDefaults(), { multiplier: 1, units: "hertz", value: 1 });} }]);return _o;}(no);var mo = /*#__PURE__*/function (_po) {_inherits(mo, _po);var _super47 = _createSuper(mo);function mo() {var _this70;_classCallCheck(this, mo);_this70 = _super47.call(this, ui(mo.getDefaults(), arguments, ["value"])), _this70.name = "TickSignal";var t = ui(mo.getDefaults(), arguments, ["value"]);_this70.input = _this70._param = new _o({ context: _this70.context, convert: t.convert, multiplier: t.multiplier, param: _this70._constantSource.offset, units: t.units, value: t.value });return _this70;}_createClass(mo, [{ key: "ticksToTime", value: function ticksToTime(t, e) {return this._param.ticksToTime(t, e);} }, { key: "timeToTicks", value: function timeToTicks(t, e) {return this._param.timeToTicks(t, e);} }, { key: "getTimeOfTick", value: function getTimeOfTick(t) {return this._param.getTimeOfTick(t);} }, { key: "getDurationOfTicks", value: function getDurationOfTicks(t, e) {return this._param.getDurationOfTicks(t, e);} }, { key: "getTicksAtTime", value: function getTicksAtTime(t) {return this._param.getTicksAtTime(t);} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(mo.prototype), "dispose", this).call(this), this._param.dispose(), this;} }, { key: "multiplier", get: function get() {return this._param.multiplier;}, set: function set(t) {this._param.multiplier = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(po.getDefaults(), { multiplier: 1, units: "hertz", value: 1 });} }]);return mo;}(po);var go = /*#__PURE__*/function (_eo3) {_inherits(go, _eo3);var _super48 = _createSuper(go);function go() {var _this71;_classCallCheck(this, go);_this71 = _super48.call(this, ui(go.getDefaults(), arguments, ["frequency"])), _this71.name = "TickSource", _this71._state = new so(), _this71._tickOffset = new wi(), _this71._ticksAtTime = new wi(), _this71._secondsAtTime = new wi();var t = ui(go.getDefaults(), arguments, ["frequency"]);_this71.frequency = new mo({ context: _this71.context, units: t.units, value: t.frequency }), Oi(_assertThisInitialized(_this71), "frequency"), _this71._state.setStateAtTime("stopped", 0), _this71.setTicksAtTime(0, 0);return _this71;}_createClass(go, [{ key: "start", value: function start(t, e) {var s = this.toSeconds(t);return "started" !== this._state.getValueAtTime(s) && (this._state.setStateAtTime("started", s), In(e) && this.setTicksAtTime(e, s), this._ticksAtTime.cancel(s), this._secondsAtTime.cancel(s)), this;} }, { key: "stop", value: function stop(t) {var e = this.toSeconds(t);if ("stopped" === this._state.getValueAtTime(e)) {var _t129 = this._state.get(e);_t129 && _t129.time > 0 && (this._tickOffset.cancel(_t129.time), this._state.cancel(_t129.time));}return this._state.cancel(e), this._state.setStateAtTime("stopped", e), this.setTicksAtTime(0, e), this._ticksAtTime.cancel(e), this._secondsAtTime.cancel(e), this;} }, { key: "pause", value: function pause(t) {var e = this.toSeconds(t);return "started" === this._state.getValueAtTime(e) && (this._state.setStateAtTime("paused", e), this._ticksAtTime.cancel(e), this._secondsAtTime.cancel(e)), this;} }, { key: "cancel", value: function cancel(t) {return t = this.toSeconds(t), this._state.cancel(t), this._tickOffset.cancel(t), this._ticksAtTime.cancel(t), this._secondsAtTime.cancel(t), this;} }, { key: "getTicksAtTime", value: function getTicksAtTime(t) {var _this72 = this;var e = this.toSeconds(t),s = this._state.getLastState("stopped", e),n = this._ticksAtTime.get(e),i = { state: "paused", time: e };this._state.add(i);var o = n || s,r = n ? n.ticks : 0,a = null;return this._state.forEachBetween(o.time, e + this.sampleTime, function (t) {var e = o.time;var s = _this72._tickOffset.get(t.time);s && s.time >= o.time && (r = s.ticks, e = s.time), "started" === o.state && "started" !== t.state && (r += _this72.frequency.getTicksAtTime(t.time) - _this72.frequency.getTicksAtTime(e), t.time != i.time && (a = { state: t.state, time: t.time, ticks: r })), o = t;}), this._state.remove(i), a && this._ticksAtTime.add(a), r;} }, { key: "getSecondsAtTime", value: function getSecondsAtTime(t) {var _this73 = this;t = this.toSeconds(t);var e = this._state.getLastState("stopped", t),s = { state: "paused", time: t };this._state.add(s);var n = this._secondsAtTime.get(t);var i = n || e,o = n ? n.seconds : 0,r = null;return this._state.forEachBetween(i.time, t + this.sampleTime, function (t) {var e = i.time;var n = _this73._tickOffset.get(t.time);n && n.time >= i.time && (o = n.seconds, e = n.time), "started" === i.state && "started" !== t.state && (o += t.time - e, t.time != s.time && (r = { state: t.state, time: t.time, seconds: o })), i = t;}), this._state.remove(s), r && this._secondsAtTime.add(r), o;} }, { key: "setTicksAtTime", value: function setTicksAtTime(t, e) {return e = this.toSeconds(e), this._tickOffset.cancel(e), this._tickOffset.add({ seconds: this.frequency.getDurationOfTicks(t, e), ticks: t, time: e }), this._ticksAtTime.cancel(e), this._secondsAtTime.cancel(e), this;} }, { key: "getStateAtTime", value: function getStateAtTime(t) {return t = this.toSeconds(t), this._state.getValueAtTime(t);} }, { key: "getTimeOfTick", value: function getTimeOfTick(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.now();var s = this._tickOffset.get(e),n = this._state.get(e),i = Math.max(s.time, n.time),o = this.frequency.getTicksAtTime(i) + t - s.ticks;return this.frequency.getTimeOfTick(o);} }, { key: "forEachTickBetween", value: function forEachTickBetween(t, e, s) {var _this74 = this;var n = this._state.get(t);this._state.forEachBetween(t, e, function (e) {n && "started" === n.state && "started" !== e.state && _this74.forEachTickBetween(Math.max(n.time, t), e.time - _this74.sampleTime, s), n = e;});var i = null;if (n && "started" === n.state) {var _o21 = Math.max(n.time, t),_r13 = this.frequency.getTicksAtTime(_o21),_a8 = _r13 - this.frequency.getTicksAtTime(n.time);var _c8 = Math.ceil(_a8) - _a8;_c8 = yi(_c8, 1) ? 0 : _c8;var _h7 = this.frequency.getTimeOfTick(_r13 + _c8);for (; _h7 < e;) {try {s(_h7, Math.round(this.getTicksAtTime(_h7)));} catch (t) {i = t;break;}_h7 += this.frequency.getDurationOfTicks(1, _h7);}}if (i) throw i;return this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(go.prototype), "dispose", this).call(this), this._state.dispose(), this._tickOffset.dispose(), this._ticksAtTime.dispose(), this._secondsAtTime.dispose(), this.frequency.dispose(), this;} }, { key: "state", get: function get() {return this.getStateAtTime(this.now());} }, { key: "ticks", get: function get() {return this.getTicksAtTime(this.now());}, set: function set(t) {this.setTicksAtTime(t, this.now());} }, { key: "seconds", get: function get() {return this.getSecondsAtTime(this.now());}, set: function set(t) {var e = this.now(),s = this.frequency.timeToTicks(t, e);this.setTicksAtTime(s, e);} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign({ frequency: 1, units: "hertz" }, eo.getDefaults());} }]);return go;}(eo);var vo = /*#__PURE__*/function (_eo4) {_inherits(vo, _eo4);var _super49 = _createSuper(vo);function vo() {var _this75;_classCallCheck(this, vo);_this75 = _super49.call(this, ui(vo.getDefaults(), arguments, ["callback", "frequency"])), _this75.name = "Clock", _this75.callback = Ei, _this75._lastUpdate = 0, _this75._state = new so("stopped"), _this75._boundLoop = _this75._loop.bind(_assertThisInitialized(_this75));var t = ui(vo.getDefaults(), arguments, ["callback", "frequency"]);_this75.callback = t.callback, _this75._tickSource = new go({ context: _this75.context, frequency: t.frequency, units: t.units }), _this75._lastUpdate = 0, _this75.frequency = _this75._tickSource.frequency, Oi(_assertThisInitialized(_this75), "frequency"), _this75._state.setStateAtTime("stopped", 0), _this75.context.on("tick", _this75._boundLoop);return _this75;}_createClass(vo, [{ key: "start", value: function start(t, e) {Gn(this.context);var s = this.toSeconds(t);return this.log("start", s), "started" !== this._state.getValueAtTime(s) && (this._state.setStateAtTime("started", s), this._tickSource.start(s, e), s < this._lastUpdate && this.emit("start", s, e)), this;} }, { key: "stop", value: function stop(t) {var e = this.toSeconds(t);return this.log("stop", e), this._state.cancel(e), this._state.setStateAtTime("stopped", e), this._tickSource.stop(e), e < this._lastUpdate && this.emit("stop", e), this;} }, { key: "pause", value: function pause(t) {var e = this.toSeconds(t);return "started" === this._state.getValueAtTime(e) && (this._state.setStateAtTime("paused", e), this._tickSource.pause(e), e < this._lastUpdate && this.emit("pause", e)), this;} }, { key: "getSecondsAtTime", value: function getSecondsAtTime(t) {return this._tickSource.getSecondsAtTime(t);} }, { key: "setTicksAtTime", value: function setTicksAtTime(t, e) {return this._tickSource.setTicksAtTime(t, e), this;} }, { key: "getTimeOfTick", value: function getTimeOfTick(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.now();return this._tickSource.getTimeOfTick(t, e);} }, { key: "getTicksAtTime", value: function getTicksAtTime(t) {return this._tickSource.getTicksAtTime(t);} }, { key: "nextTickTime", value: function nextTickTime(t, e) {var s = this.toSeconds(e),n = this.getTicksAtTime(s);return this._tickSource.getTimeOfTick(n + t, s);} }, { key: "_loop", value: function _loop() {var _this76 = this;var t = this._lastUpdate,e = this.now();this._lastUpdate = e, this.log("loop", t, e), t !== e && (this._state.forEachBetween(t, e, function (t) {switch (t.state) {case "started":var _e78 = _this76._tickSource.getTicksAtTime(t.time);_this76.emit("start", t.time, _e78);break;case "stopped":0 !== t.time && _this76.emit("stop", t.time);break;case "paused":_this76.emit("pause", t.time);}}), this._tickSource.forEachTickBetween(t, e, function (t, e) {_this76.callback(t, e);}));} }, { key: "getStateAtTime", value: function getStateAtTime(t) {var e = this.toSeconds(t);return this._state.getValueAtTime(e);} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(vo.prototype), "dispose", this).call(this), this.context.off("tick", this._boundLoop), this._tickSource.dispose(), this._state.dispose(), this;} }, { key: "state", get: function get() {return this._state.getValueAtTime(this.now());} }, { key: "ticks", get: function get() {return Math.ceil(this.getTicksAtTime(this.now()));}, set: function set(t) {this._tickSource.ticks = t;} }, { key: "seconds", get: function get() {return this._tickSource.seconds;}, set: function set(t) {this._tickSource.seconds = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(eo.getDefaults(), { callback: Ei, frequency: 1, units: "hertz" });} }]);return vo;}(eo);Ai.mixin(vo);var yo = /*#__PURE__*/function (_io4) {_inherits(yo, _io4);var _super50 = _createSuper(yo);function yo() {var _this77;_classCallCheck(this, yo);_this77 = _super50.call(this, ui(yo.getDefaults(), arguments, ["delayTime", "maxDelay"])), _this77.name = "Delay";var t = ui(yo.getDefaults(), arguments, ["delayTime", "maxDelay"]),e = _this77.toSeconds(t.maxDelay);_this77._maxDelay = Math.max(e, _this77.toSeconds(t.delayTime)), _this77._delayNode = _this77.input = _this77.output = _this77.context.createDelay(e), _this77.delayTime = new no({ context: _this77.context, param: _this77._delayNode.delayTime, units: "time", value: t.delayTime, minValue: 0, maxValue: _this77.maxDelay }), Oi(_assertThisInitialized(_this77), "delayTime");return _this77;}_createClass(yo, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(yo.prototype), "dispose", this).call(this), this._delayNode.disconnect(), this.delayTime.dispose(), this;} }, { key: "maxDelay", get: function get() {return this._maxDelay;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { delayTime: 0, maxDelay: 1 });} }]);return yo;}(io);function xo(t, e) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Vi().sampleRate;return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee45() {var i, o, r, a;return _regeneratorRuntime.wrap(function _callee45$(_context45) {while (1) {switch (_context45.prev = _context45.next) {case 0:i = Vi(), o = new qi(s, e, n);Ni(o);_context45.next = 4;return t(o);case 4:r = o.render();Ni(i);_context45.next = 8;return r;case 8:a = _context45.sent;return _context45.abrupt("return", new Ri(a));case 10:case "end":return _context45.stop();}}}, _callee45);}));}var wo = /*#__PURE__*/function (_fi6) {_inherits(wo, _fi6);var _super51 = _createSuper(wo);function wo() {var _this78;_classCallCheck(this, wo);_this78 = _super51.call(this), _this78.name = "ToneAudioBuffers", _this78._buffers = new Map(), _this78._loadingCount = 0;var t = ui(wo.getDefaults(), arguments, ["urls", "onload", "baseUrl"], "urls");_this78.baseUrl = t.baseUrl, Object.keys(t.urls).forEach(function (e) {_this78._loadingCount++;var s = t.urls[e];_this78.add(e, s, _this78._bufferLoaded.bind(_assertThisInitialized(_this78), t.onload), t.onerror);});return _this78;}_createClass(wo, [{ key: "has", value: function has(t) {return this._buffers.has(t.toString());} }, { key: "get", value: function get(t) {return Bn(this.has(t), "ToneAudioBuffers has no buffer named: ".concat(t)), this._buffers.get(t.toString());} }, { key: "_bufferLoaded", value: function _bufferLoaded(t) {this._loadingCount--, 0 === this._loadingCount && t && t();} }, { key: "add", value: function add(t, e) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Ei;var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Ei;return zn(e) ? (this.baseUrl && "data:audio/" === e.trim().substring(0, 11).toLowerCase() && (this.baseUrl = ""), this._buffers.set(t.toString(), new Ri(this.baseUrl + e, s, n))) : this._buffers.set(t.toString(), new Ri(e, s, n)), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(wo.prototype), "dispose", this).call(this), this._buffers.forEach(function (t) {return t.dispose();}), this._buffers.clear(), this;} }, { key: "loaded", get: function get() {return Array.from(this._buffers).every(function (_ref78) {var _ref79 = _slicedToArray(_ref78, 2),t = _ref79[0],e = _ref79[1];return e.loaded;});} }], [{ key: "getDefaults", value: function getDefaults() {return { baseUrl: "", onerror: Ei, onload: Ei, urls: {} };} }]);return wo;}(fi);var bo = /*#__PURE__*/function (_Yi) {_inherits(bo, _Yi);var _super52 = _createSuper(bo);function bo() {var _this79;_classCallCheck(this, bo);_this79 = _super52.apply(this, arguments), _this79.name = "MidiClass", _this79.defaultUnits = "midi";return _this79;}_createClass(bo, [{ key: "_frequencyToUnits", value: function _frequencyToUnits(t) {return Bi(_get(_getPrototypeOf(bo.prototype), "_frequencyToUnits", this).call(this, t));} }, { key: "_ticksToUnits", value: function _ticksToUnits(t) {return Bi(_get(_getPrototypeOf(bo.prototype), "_ticksToUnits", this).call(this, t));} }, { key: "_beatsToUnits", value: function _beatsToUnits(t) {return Bi(_get(_getPrototypeOf(bo.prototype), "_beatsToUnits", this).call(this, t));} }, { key: "_secondsToUnits", value: function _secondsToUnits(t) {return Bi(_get(_getPrototypeOf(bo.prototype), "_secondsToUnits", this).call(this, t));} }, { key: "toMidi", value: function toMidi() {return this.valueOf();} }, { key: "toFrequency", value: function toFrequency() {return Gi(this.toMidi());} }, { key: "transpose", value: function transpose(t) {return new bo(this.context, this.toMidi() + t);} }]);return bo;}(Yi);function To(t, e) {return new bo(Vi(), t, e);}var So = /*#__PURE__*/function (_Ki) {_inherits(So, _Ki);var _super53 = _createSuper(So);function So() {var _this80;_classCallCheck(this, So);_this80 = _super53.apply(this, arguments), _this80.name = "Ticks", _this80.defaultUnits = "i";return _this80;}_createClass(So, [{ key: "_now", value: function _now() {return this.context.transport.ticks;} }, { key: "_beatsToUnits", value: function _beatsToUnits(t) {return this._getPPQ() * t;} }, { key: "_secondsToUnits", value: function _secondsToUnits(t) {return Math.floor(t / (60 / this._getBpm()) * this._getPPQ());} }, { key: "_ticksToUnits", value: function _ticksToUnits(t) {return t;} }, { key: "toTicks", value: function toTicks() {return this.valueOf();} }, { key: "toSeconds", value: function toSeconds() {return this.valueOf() / this._getPPQ() * (60 / this._getBpm());} }]);return So;}(Ki);function ko(t, e) {return new So(Vi(), t, e);}var Ao = /*#__PURE__*/function (_eo5) {_inherits(Ao, _eo5);var _super54 = _createSuper(Ao);function Ao() {var _this81;_classCallCheck(this, Ao);_this81 = _super54.apply(this, arguments), _this81.name = "Draw", _this81.expiration = .25, _this81.anticipation = .008, _this81._events = new wi(), _this81._boundDrawLoop = _this81._drawLoop.bind(_assertThisInitialized(_this81)), _this81._animationFrame = -1;return _this81;}_createClass(Ao, [{ key: "schedule", value: function schedule(t, e) {return this._events.add({ callback: t, time: this.toSeconds(e) }), 1 === this._events.length && (this._animationFrame = requestAnimationFrame(this._boundDrawLoop)), this;} }, { key: "cancel", value: function cancel(t) {return this._events.cancel(this.toSeconds(t)), this;} }, { key: "_drawLoop", value: function _drawLoop() {var t = this.context.currentTime;for (; this._events.length && this._events.peek().time - this.anticipation <= t;) {var _e79 = this._events.shift();_e79 && t - _e79.time <= this.expiration && _e79.callback();}this._events.length > 0 && (this._animationFrame = requestAnimationFrame(this._boundDrawLoop));} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Ao.prototype), "dispose", this).call(this), this._events.dispose(), cancelAnimationFrame(this._animationFrame), this;} }]);return Ao;}(eo);Ti(function (t) {t.draw = new Ao({ context: t });}), ki(function (t) {t.draw.dispose();});var Co = /*#__PURE__*/function (_fi7) {_inherits(Co, _fi7);var _super55 = _createSuper(Co);function Co() {var _this82;_classCallCheck(this, Co);_this82 = _super55.apply(this, arguments), _this82.name = "IntervalTimeline", _this82._root = null, _this82._length = 0;return _this82;}_createClass(Co, [{ key: "add", value: function add(t) {Bn(In(t.time), "Events must have a time property"), Bn(In(t.duration), "Events must have a duration parameter"), t.time = t.time.valueOf();var e = new Do(t.time, t.time + t.duration, t);for (null === this._root ? this._root = e : this._root.insert(e), this._length++; null !== e;) {e.updateHeight(), e.updateMax(), this._rebalance(e), e = e.parent;}return this;} }, { key: "remove", value: function remove(t) {if (null !== this._root) {var _e80 = [];this._root.search(t.time, _e80);for (var _i22 = 0, _e81 = _e80; _i22 < _e81.length; _i22++) {var _s51 = _e81[_i22];if (_s51.event === t) {this._removeNode(_s51), this._length--;break;}}}return this;} }, { key: "cancel", value: function cancel(t) {var _this83 = this;return this.forEachFrom(t, function (t) {return _this83.remove(t);}), this;} }, { key: "_setRoot", value: function _setRoot(t) {this._root = t, null !== this._root && (this._root.parent = null);} }, { key: "_replaceNodeInParent", value: function _replaceNodeInParent(t, e) {null !== t.parent ? (t.isLeftChild() ? t.parent.left = e : t.parent.right = e, this._rebalance(t.parent)) : this._setRoot(e);} }, { key: "_removeNode", value: function _removeNode(t) {if (null === t.left && null === t.right) this._replaceNodeInParent(t, null);else if (null === t.right) this._replaceNodeInParent(t, t.left);else if (null === t.left) this._replaceNodeInParent(t, t.right);else {var _e82,_s52 = null;if (t.getBalance() > 0) {if (null === t.left.right) _e82 = t.left, _e82.right = t.right, _s52 = _e82;else {for (_e82 = t.left.right; null !== _e82.right;) {_e82 = _e82.right;}_e82.parent && (_e82.parent.right = _e82.left, _s52 = _e82.parent, _e82.left = t.left, _e82.right = t.right);}} else if (null === t.right.left) _e82 = t.right, _e82.left = t.left, _s52 = _e82;else {for (_e82 = t.right.left; null !== _e82.left;) {_e82 = _e82.left;}_e82.parent && (_e82.parent.left = _e82.right, _s52 = _e82.parent, _e82.left = t.left, _e82.right = t.right);}null !== t.parent ? t.isLeftChild() ? t.parent.left = _e82 : t.parent.right = _e82 : this._setRoot(_e82), _s52 && this._rebalance(_s52);}t.dispose();} }, { key: "_rotateLeft", value: function _rotateLeft(t) {var e = t.parent,s = t.isLeftChild(),n = t.right;n && (t.right = n.left, n.left = t), null !== e ? s ? e.left = n : e.right = n : this._setRoot(n);} }, { key: "_rotateRight", value: function _rotateRight(t) {var e = t.parent,s = t.isLeftChild(),n = t.left;n && (t.left = n.right, n.right = t), null !== e ? s ? e.left = n : e.right = n : this._setRoot(n);} }, { key: "_rebalance", value: function _rebalance(t) {var e = t.getBalance();e > 1 && t.left ? t.left.getBalance() < 0 ? this._rotateLeft(t.left) : this._rotateRight(t) : e < -1 && t.right && (t.right.getBalance() > 0 ? this._rotateRight(t.right) : this._rotateLeft(t));} }, { key: "get", value: function get(t) {if (null !== this._root) {var _e83 = [];if (this._root.search(t, _e83), _e83.length > 0) {var _t130 = _e83[0];for (var _s53 = 1; _s53 < _e83.length; _s53++) {_e83[_s53].low > _t130.low && (_t130 = _e83[_s53]);}return _t130.event;}}return null;} }, { key: "forEach", value: function forEach(t) {if (null !== this._root) {var _e84 = [];this._root.traverse(function (t) {return _e84.push(t);}), _e84.forEach(function (e) {e.event && t(e.event);});}return this;} }, { key: "forEachAtTime", value: function forEachAtTime(t, e) {if (null !== this._root) {var _s54 = [];this._root.search(t, _s54), _s54.forEach(function (t) {t.event && e(t.event);});}return this;} }, { key: "forEachFrom", value: function forEachFrom(t, e) {if (null !== this._root) {var _s55 = [];this._root.searchAfter(t, _s55), _s55.forEach(function (t) {t.event && e(t.event);});}return this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Co.prototype), "dispose", this).call(this), null !== this._root && this._root.traverse(function (t) {return t.dispose();}), this._root = null, this;} }, { key: "length", get: function get() {return this._length;} }]);return Co;}(fi);var Do = /*#__PURE__*/function () {function Do(t, e, s) {_classCallCheck(this, Do);this._left = null, this._right = null, this.parent = null, this.height = 0, this.event = s, this.low = t, this.high = e, this.max = this.high;}_createClass(Do, [{ key: "insert", value: function insert(t) {t.low <= this.low ? null === this.left ? this.left = t : this.left.insert(t) : null === this.right ? this.right = t : this.right.insert(t);} }, { key: "search", value: function search(t, e) {t > this.max || (null !== this.left && this.left.search(t, e), this.low <= t && this.high > t && e.push(this), this.low > t || null !== this.right && this.right.search(t, e));} }, { key: "searchAfter", value: function searchAfter(t, e) {this.low >= t && (e.push(this), null !== this.left && this.left.searchAfter(t, e)), null !== this.right && this.right.searchAfter(t, e);} }, { key: "traverse", value: function traverse(t) {t(this), null !== this.left && this.left.traverse(t), null !== this.right && this.right.traverse(t);} }, { key: "updateHeight", value: function updateHeight() {null !== this.left && null !== this.right ? this.height = Math.max(this.left.height, this.right.height) + 1 : null !== this.right ? this.height = this.right.height + 1 : null !== this.left ? this.height = this.left.height + 1 : this.height = 0;} }, { key: "updateMax", value: function updateMax() {this.max = this.high, null !== this.left && (this.max = Math.max(this.max, this.left.max)), null !== this.right && (this.max = Math.max(this.max, this.right.max));} }, { key: "getBalance", value: function getBalance() {var t = 0;return null !== this.left && null !== this.right ? t = this.left.height - this.right.height : null !== this.left ? t = this.left.height + 1 : null !== this.right && (t = -(this.right.height + 1)), t;} }, { key: "isLeftChild", value: function isLeftChild() {return null !== this.parent && this.parent.left === this;} }, { key: "dispose", value: function dispose() {this.parent = null, this._left = null, this._right = null, this.event = null;} }, { key: "left", get: function get() {return this._left;}, set: function set(t) {this._left = t, null !== t && (t.parent = this), this.updateHeight(), this.updateMax();} }, { key: "right", get: function get() {return this._right;}, set: function set(t) {this._right = t, null !== t && (t.parent = this), this.updateHeight(), this.updateMax();} }]);return Do;}();var Oo = /*#__PURE__*/function (_io5) {_inherits(Oo, _io5);var _super56 = _createSuper(Oo);function Oo() {var _this84;_classCallCheck(this, Oo);_this84 = _super56.call(this, ui(Oo.getDefaults(), arguments, ["volume"])), _this84.name = "Volume";var t = ui(Oo.getDefaults(), arguments, ["volume"]);_this84.input = _this84.output = new ho({ context: _this84.context, gain: t.volume, units: "decibels" }), _this84.volume = _this84.output.gain, Oi(_assertThisInitialized(_this84), "volume"), _this84._unmutedVolume = t.volume, _this84.mute = t.mute;return _this84;}_createClass(Oo, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Oo.prototype), "dispose", this).call(this), this.input.dispose(), this.volume.dispose(), this;} }, { key: "mute", get: function get() {return this.volume.value === -1 / 0;}, set: function set(t) {!this.mute && t ? (this._unmutedVolume = this.volume.value, this.volume.value = -1 / 0) : this.mute && !t && (this.volume.value = this._unmutedVolume);} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { mute: !1, volume: 0 });} }]);return Oo;}(io);var Mo = /*#__PURE__*/function (_io6) {_inherits(Mo, _io6);var _super57 = _createSuper(Mo);function Mo() {var _this85;_classCallCheck(this, Mo);_this85 = _super57.call(this, ui(Mo.getDefaults(), arguments)), _this85.name = "Destination", _this85.input = new Oo({ context: _this85.context }), _this85.output = new ho({ context: _this85.context }), _this85.volume = _this85.input.volume;var t = ui(Mo.getDefaults(), arguments);oo(_this85.input, _this85.output, _this85.context.rawContext.destination), _this85.mute = t.mute, _this85._internalChannels = [_this85.input, _this85.context.rawContext.destination, _this85.output];return _this85;}_createClass(Mo, [{ key: "chain", value: function chain() {for (var _len19 = arguments.length, t = new Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {t[_key19] = arguments[_key19];}return this.input.disconnect(), t.unshift(this.input), t.push(this.output), oo.apply(void 0, t), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Mo.prototype), "dispose", this).call(this), this.volume.dispose(), this;} }, { key: "mute", get: function get() {return this.input.mute;}, set: function set(t) {this.input.mute = t;} }, { key: "maxChannelCount", get: function get() {return this.context.rawContext.destination.maxChannelCount;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { mute: !1, volume: 0 });} }]);return Mo;}(io);Ti(function (t) {t.destination = new Mo({ context: t });}), ki(function (t) {t.destination.dispose();});var Eo = /*#__PURE__*/function (_fi8) {_inherits(Eo, _fi8);var _super58 = _createSuper(Eo);function Eo(t) {var _this86;_classCallCheck(this, Eo);_this86 = _super58.call(this), _this86.name = "TimelineValue", _this86._timeline = new wi({ memory: 10 }), _this86._initialValue = t;return _this86;}_createClass(Eo, [{ key: "set", value: function set(t, e) {return this._timeline.add({ value: t, time: e }), this;} }, { key: "get", value: function get(t) {var e = this._timeline.get(t);return e ? e.value : this._initialValue;} }]);return Eo;}(fi);var Ro = /*#__PURE__*/function () {function Ro(t, e) {_classCallCheck(this, Ro);this.id = Ro._eventId++, this._remainderTime = 0;var s = Object.assign(Ro.getDefaults(), e);this.transport = t, this.callback = s.callback, this._once = s.once, this.time = Math.floor(s.time), this._remainderTime = s.time - this.time;}_createClass(Ro, [{ key: "invoke", value: function invoke(t) {if (this.callback) {var _e85 = this.transport.bpm.getDurationOfTicks(1, t);this.callback(t + this._remainderTime * _e85), this._once && this.transport.clear(this.id);}} }, { key: "dispose", value: function dispose() {return this.callback = void 0, this;} }, { key: "floatTime", get: function get() {return this.time + this._remainderTime;} }], [{ key: "getDefaults", value: function getDefaults() {return { callback: Ei, once: !1, time: 0 };} }]);return Ro;}();Ro._eventId = 0;var qo = /*#__PURE__*/function (_Ro) {_inherits(qo, _Ro);var _super59 = _createSuper(qo);function qo(t, e) {var _this87;_classCallCheck(this, qo);_this87 = _super59.call(this, t, e), _this87._currentId = -1, _this87._nextId = -1, _this87._nextTick = _this87.time, _this87._boundRestart = _this87._restart.bind(_assertThisInitialized(_this87));var s = Object.assign(qo.getDefaults(), e);_this87.duration = s.duration, _this87._interval = s.interval, _this87._nextTick = s.time, _this87.transport.on("start", _this87._boundRestart), _this87.transport.on("loopStart", _this87._boundRestart), _this87.transport.on("ticks", _this87._boundRestart), _this87.context = _this87.transport.context, _this87._restart();return _this87;}_createClass(qo, [{ key: "invoke", value: function invoke(t) {this._createEvents(t), _get(_getPrototypeOf(qo.prototype), "invoke", this).call(this, t);} }, { key: "_createEvent", value: function _createEvent() {return vi(this._nextTick, this.floatTime + this.duration) ? this.transport.scheduleOnce(this.invoke.bind(this), new So(this.context, this._nextTick).toSeconds()) : -1;} }, { key: "_createEvents", value: function _createEvents(t) {vi(this._nextTick + this._interval, this.floatTime + this.duration) && (this._nextTick += this._interval, this._currentId = this._nextId, this._nextId = this.transport.scheduleOnce(this.invoke.bind(this), new So(this.context, this._nextTick).toSeconds()));} }, { key: "_restart", value: function _restart(t) {this.transport.clear(this._currentId), this.transport.clear(this._nextId), this._nextTick = this.floatTime;var e = this.transport.getTicksAtTime(t);mi(e, this.time) && (this._nextTick = this.floatTime + Math.ceil((e - this.floatTime) / this._interval) * this._interval), this._currentId = this._createEvent(), this._nextTick += this._interval, this._nextId = this._createEvent();} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(qo.prototype), "dispose", this).call(this), this.transport.clear(this._currentId), this.transport.clear(this._nextId), this.transport.off("start", this._boundRestart), this.transport.off("loopStart", this._boundRestart), this.transport.off("ticks", this._boundRestart), this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign({}, Ro.getDefaults(), { duration: 1 / 0, interval: 1, once: !1 });} }]);return qo;}(Ro);var Fo = /*#__PURE__*/function (_eo6) {_inherits(Fo, _eo6);var _super60 = _createSuper(Fo);function Fo() {var _this88;_classCallCheck(this, Fo);_this88 = _super60.call(this, ui(Fo.getDefaults(), arguments)), _this88.name = "Transport", _this88._loop = new Eo(!1), _this88._loopStart = 0, _this88._loopEnd = 0, _this88._scheduledEvents = {}, _this88._timeline = new wi(), _this88._repeatedEvents = new Co(), _this88._syncedSignals = [], _this88._swingAmount = 0;var t = ui(Fo.getDefaults(), arguments);_this88._ppq = t.ppq, _this88._clock = new vo({ callback: _this88._processTick.bind(_assertThisInitialized(_this88)), context: _this88.context, frequency: 0, units: "bpm" }), _this88._bindClockEvents(), _this88.bpm = _this88._clock.frequency, _this88._clock.frequency.multiplier = t.ppq, _this88.bpm.setValueAtTime(t.bpm, 0), Oi(_assertThisInitialized(_this88), "bpm"), _this88._timeSignature = t.timeSignature, _this88._swingTicks = t.ppq / 2;return _this88;}_createClass(Fo, [{ key: "_processTick", value: function _processTick(t, e) {if (this._loop.get(t) && e >= this._loopEnd && (this.emit("loopEnd", t), this._clock.setTicksAtTime(this._loopStart, t), e = this._loopStart, this.emit("loopStart", t, this._clock.getSecondsAtTime(t)), this.emit("loop", t)), this._swingAmount > 0 && e % this._ppq != 0 && e % (2 * this._swingTicks) != 0) {var _s56 = e % (2 * this._swingTicks) / (2 * this._swingTicks),_n31 = Math.sin(_s56 * Math.PI) * this._swingAmount;t += new So(this.context, 2 * this._swingTicks / 3).toSeconds() * _n31;}Xn(!0), this._timeline.forEachAtTime(e, function (e) {return e.invoke(t);}), Xn(!1);} }, { key: "schedule", value: function schedule(t, e) {var s = new Ro(this, { callback: t, time: new Ki(this.context, e).toTicks() });return this._addEvent(s, this._timeline);} }, { key: "scheduleRepeat", value: function scheduleRepeat(t, e, s) {var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1 / 0;var i = new qo(this, { callback: t, duration: new Zi(this.context, n).toTicks(), interval: new Zi(this.context, e).toTicks(), time: new Ki(this.context, s).toTicks() });return this._addEvent(i, this._repeatedEvents);} }, { key: "scheduleOnce", value: function scheduleOnce(t, e) {var s = new Ro(this, { callback: t, once: !0, time: new Ki(this.context, e).toTicks() });return this._addEvent(s, this._timeline);} }, { key: "clear", value: function clear(t) {if (this._scheduledEvents.hasOwnProperty(t)) {var _e86 = this._scheduledEvents[t.toString()];_e86.timeline.remove(_e86.event), _e86.event.dispose(), delete this._scheduledEvents[t.toString()];}return this;} }, { key: "_addEvent", value: function _addEvent(t, e) {return this._scheduledEvents[t.id.toString()] = { event: t, timeline: e }, e.add(t), t.id;} }, { key: "cancel", value: function cancel() {var _this89 = this;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var e = this.toTicks(t);return this._timeline.forEachFrom(e, function (t) {return _this89.clear(t.id);}), this._repeatedEvents.forEachFrom(e, function (t) {return _this89.clear(t.id);}), this;} }, { key: "_bindClockEvents", value: function _bindClockEvents() {var _this90 = this;this._clock.on("start", function (t, e) {e = new So(_this90.context, e).toSeconds(), _this90.emit("start", t, e);}), this._clock.on("stop", function (t) {_this90.emit("stop", t);}), this._clock.on("pause", function (t) {_this90.emit("pause", t);});} }, { key: "start", value: function start(t, e) {var s;return this.context.resume(), In(e) && (s = this.toTicks(e)), this._clock.start(t, s), this;} }, { key: "stop", value: function stop(t) {return this._clock.stop(t), this;} }, { key: "pause", value: function pause(t) {return this._clock.pause(t), this;} }, { key: "toggle", value: function toggle(t) {return t = this.toSeconds(t), "started" !== this._clock.getStateAtTime(t) ? this.start(t) : this.stop(t), this;} }, { key: "setLoopPoints", value: function setLoopPoints(t, e) {return this.loopStart = t, this.loopEnd = e, this;} }, { key: "getTicksAtTime", value: function getTicksAtTime(t) {return this._clock.getTicksAtTime(t);} }, { key: "getSecondsAtTime", value: function getSecondsAtTime(t) {return this._clock.getSecondsAtTime(t);} }, { key: "nextSubdivision", value: function nextSubdivision(t) {if (t = this.toTicks(t), "started" !== this.state) return 0;{var _e87 = this.now(),_s57 = t - this.getTicksAtTime(_e87) % t;return this._clock.nextTickTime(_s57, _e87);}} }, { key: "syncSignal", value: function syncSignal(t, e) {if (!e) {var _s58 = this.now();if (0 !== t.getValueAtTime(_s58)) {var _n32 = 1 / (60 / this.bpm.getValueAtTime(_s58) / this.PPQ);e = t.getValueAtTime(_s58) / _n32;} else e = 0;}var s = new ho(e);return this.bpm.connect(s), s.connect(t._param), this._syncedSignals.push({ initial: t.value, ratio: s, signal: t }), t.value = 0, this;} }, { key: "unsyncSignal", value: function unsyncSignal(t) {for (var _e88 = this._syncedSignals.length - 1; _e88 >= 0; _e88--) {var _s59 = this._syncedSignals[_e88];_s59.signal === t && (_s59.ratio.dispose(), _s59.signal.value = _s59.initial, this._syncedSignals.splice(_e88, 1));}return this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Fo.prototype), "dispose", this).call(this), this._clock.dispose(), Mi(this, "bpm"), this._timeline.dispose(), this._repeatedEvents.dispose(), this;} }, { key: "state", get: function get() {return this._clock.getStateAtTime(this.now());} }, { key: "timeSignature", get: function get() {return this._timeSignature;}, set: function set(t) {Ln(t) && (t = t[0] / t[1] * 4), this._timeSignature = t;} }, { key: "loopStart", get: function get() {return new Zi(this.context, this._loopStart, "i").toSeconds();}, set: function set(t) {this._loopStart = this.toTicks(t);} }, { key: "loopEnd", get: function get() {return new Zi(this.context, this._loopEnd, "i").toSeconds();}, set: function set(t) {this._loopEnd = this.toTicks(t);} }, { key: "loop", get: function get() {return this._loop.get(this.now());}, set: function set(t) {this._loop.set(t, this.now());} }, { key: "swing", get: function get() {return this._swingAmount;}, set: function set(t) {this._swingAmount = t;} }, { key: "swingSubdivision", get: function get() {return new So(this.context, this._swingTicks).toNotation();}, set: function set(t) {this._swingTicks = this.toTicks(t);} }, { key: "position", get: function get() {var t = this.now(),e = this._clock.getTicksAtTime(t);return new So(this.context, e).toBarsBeatsSixteenths();}, set: function set(t) {var e = this.toTicks(t);this.ticks = e;} }, { key: "seconds", get: function get() {return this._clock.seconds;}, set: function set(t) {var e = this.now(),s = this._clock.frequency.timeToTicks(t, e);this.ticks = s;} }, { key: "progress", get: function get() {if (this.loop) {var _t131 = this.now();return (this._clock.getTicksAtTime(_t131) - this._loopStart) / (this._loopEnd - this._loopStart);}return 0;} }, { key: "ticks", get: function get() {return this._clock.ticks;}, set: function set(t) {if (this._clock.ticks !== t) {var _e89 = this.now();if ("started" === this.state) {var _s60 = this._clock.getTicksAtTime(_e89),_n33 = _e89 + this._clock.frequency.getDurationOfTicks(Math.ceil(_s60) - _s60, _e89);this.emit("stop", _n33), this._clock.setTicksAtTime(t, _n33), this.emit("start", _n33, this._clock.getSecondsAtTime(_n33));} else this.emit("ticks", _e89), this._clock.setTicksAtTime(t, _e89);}} }, { key: "PPQ", get: function get() {return this._clock.frequency.multiplier;}, set: function set(t) {this._clock.frequency.multiplier = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(eo.getDefaults(), { bpm: 120, loopEnd: "4m", loopStart: 0, ppq: 192, swing: 0, swingSubdivision: "8n", timeSignature: 4 });} }]);return Fo;}(eo);Ai.mixin(Fo), Ti(function (t) {t.transport = new Fo({ context: t });}), ki(function (t) {t.transport.dispose();});var Io = /*#__PURE__*/function (_io7) {_inherits(Io, _io7);var _super61 = _createSuper(Io);function Io(t) {var _this91;_classCallCheck(this, Io);_this91 = _super61.call(this, t), _this91.input = void 0, _this91._state = new so("stopped"), _this91._synced = !1, _this91._scheduled = [], _this91._syncedStart = Ei, _this91._syncedStop = Ei, _this91._state.memory = 100, _this91._state.increasing = !0, _this91._volume = _this91.output = new Oo({ context: _this91.context, mute: t.mute, volume: t.volume }), _this91.volume = _this91._volume.volume, Oi(_assertThisInitialized(_this91), "volume"), _this91.onstop = t.onstop;return _this91;}_createClass(Io, [{ key: "_clampToCurrentTime", value: function _clampToCurrentTime(t) {return this._synced ? t : Math.max(t, this.context.currentTime);} }, { key: "start", value: function start(t, e, s) {var _this92 = this;var n = Fn(t) && this._synced ? this.context.transport.seconds : this.toSeconds(t);if (n = this._clampToCurrentTime(n), this._synced || "started" !== this._state.getValueAtTime(n)) {if (this.log("start", n), this._state.setStateAtTime("started", n), this._synced) {var _t132 = this._state.get(n);_t132 && (_t132.offset = this.toSeconds(pi(e, 0)), _t132.duration = s ? this.toSeconds(s) : void 0);var _i23 = this.context.transport.schedule(function (t) {_this92._start(t, e, s);}, n);this._scheduled.push(_i23), "started" === this.context.transport.state && this.context.transport.getSecondsAtTime(this.immediate()) > n && this._syncedStart(this.now(), this.context.transport.seconds);} else Gn(this.context), this._start(n, e, s);} else Bn(mi(n, this._state.get(n).time), "Start time must be strictly greater than previous start time"), this._state.cancel(n), this._state.setStateAtTime("started", n), this.log("restart", n), this.restart(n, e, s);return this;} }, { key: "stop", value: function stop(t) {var e = Fn(t) && this._synced ? this.context.transport.seconds : this.toSeconds(t);if (e = this._clampToCurrentTime(e), "started" === this._state.getValueAtTime(e) || In(this._state.getNextState("started", e))) {if (this.log("stop", e), this._synced) {var _t133 = this.context.transport.schedule(this._stop.bind(this), e);this._scheduled.push(_t133);} else this._stop(e);this._state.cancel(e), this._state.setStateAtTime("stopped", e);}return this;} }, { key: "restart", value: function restart(t, e, s) {return t = this.toSeconds(t), "started" === this._state.getValueAtTime(t) && (this._state.cancel(t), this._restart(t, e, s)), this;} }, { key: "sync", value: function sync() {var _this93 = this;return this._synced || (this._synced = !0, this._syncedStart = function (t, e) {if (mi(e, 0)) {var _s61 = _this93._state.get(e);if (_s61 && "started" === _s61.state && _s61.time !== e) {var _n34 = e - _this93.toSeconds(_s61.time);var _i24;_s61.duration && (_i24 = _this93.toSeconds(_s61.duration) - _n34), _this93._start(t, _this93.toSeconds(_s61.offset) + _n34, _i24);}}}, this._syncedStop = function (t) {var e = _this93.context.transport.getSecondsAtTime(Math.max(t - _this93.sampleTime, 0));"started" === _this93._state.getValueAtTime(e) && _this93._stop(t);}, this.context.transport.on("start", this._syncedStart), this.context.transport.on("loopStart", this._syncedStart), this.context.transport.on("stop", this._syncedStop), this.context.transport.on("pause", this._syncedStop), this.context.transport.on("loopEnd", this._syncedStop)), this;} }, { key: "unsync", value: function unsync() {var _this94 = this;return this._synced && (this.context.transport.off("stop", this._syncedStop), this.context.transport.off("pause", this._syncedStop), this.context.transport.off("loopEnd", this._syncedStop), this.context.transport.off("start", this._syncedStart), this.context.transport.off("loopStart", this._syncedStart)), this._synced = !1, this._scheduled.forEach(function (t) {return _this94.context.transport.clear(t);}), this._scheduled = [], this._state.cancel(0), this._stop(0), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Io.prototype), "dispose", this).call(this), this.onstop = Ei, this.unsync(), this._volume.dispose(), this._state.dispose(), this;} }, { key: "state", get: function get() {return this._synced ? "started" === this.context.transport.state ? this._state.getValueAtTime(this.context.transport.seconds) : "stopped" : this._state.getValueAtTime(this.now());} }, { key: "mute", get: function get() {return this._volume.mute;}, set: function set(t) {this._volume.mute = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { mute: !1, onstop: Ei, volume: 0 });} }]);return Io;}(io);var Vo = /*#__PURE__*/function (_lo2) {_inherits(Vo, _lo2);var _super62 = _createSuper(Vo);function Vo() {var _this95;_classCallCheck(this, Vo);_this95 = _super62.call(this, ui(Vo.getDefaults(), arguments, ["url", "onload"])), _this95.name = "ToneBufferSource", _this95._source = _this95.context.createBufferSource(), _this95._internalChannels = [_this95._source], _this95._sourceStarted = !1, _this95._sourceStopped = !1;var t = ui(Vo.getDefaults(), arguments, ["url", "onload"]);ro(_this95._source, _this95._gainNode), _this95._source.onended = function () {return _this95._stopSource();}, _this95.playbackRate = new no({ context: _this95.context, param: _this95._source.playbackRate, units: "positive", value: t.playbackRate }), _this95.loop = t.loop, _this95.loopStart = t.loopStart, _this95.loopEnd = t.loopEnd, _this95._buffer = new Ri(t.url, t.onload, t.onerror), _this95._internalChannels.push(_this95._source);return _this95;}_createClass(Vo, [{ key: "start", value: function start(t, e, s) {var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;Bn(this.buffer.loaded, "buffer is either not set or not loaded");var i = this.toSeconds(t);this._startGain(i, n), e = this.loop ? pi(e, this.loopStart) : pi(e, 0);var o = Math.max(this.toSeconds(e), 0);if (this.loop) {var _t134 = this.toSeconds(this.loopEnd) || this.buffer.duration,_e90 = this.toSeconds(this.loopStart),_s62 = _t134 - _e90;gi(o, _t134) && (o = (o - _e90) % _s62 + _e90), yi(o, this.buffer.duration) && (o = 0);}if (this._source.buffer = this.buffer.get(), this._source.loopEnd = this.toSeconds(this.loopEnd) || this.buffer.duration, vi(o, this.buffer.duration) && (this._sourceStarted = !0, this._source.start(i, o)), In(s)) {var _t135 = this.toSeconds(s);_t135 = Math.max(_t135, 0), this.stop(i + _t135);}return this;} }, { key: "_stopSource", value: function _stopSource(t) {!this._sourceStopped && this._sourceStarted && (this._sourceStopped = !0, this._source.stop(this.toSeconds(t)), this._onended());} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Vo.prototype), "dispose", this).call(this), this._source.onended = null, this._source.disconnect(), this._buffer.dispose(), this.playbackRate.dispose(), this;} }, { key: "fadeIn", get: function get() {return this._fadeIn;}, set: function set(t) {this._fadeIn = t;} }, { key: "fadeOut", get: function get() {return this._fadeOut;}, set: function set(t) {this._fadeOut = t;} }, { key: "curve", get: function get() {return this._curve;}, set: function set(t) {this._curve = t;} }, { key: "loopStart", get: function get() {return this._source.loopStart;}, set: function set(t) {this._source.loopStart = this.toSeconds(t);} }, { key: "loopEnd", get: function get() {return this._source.loopEnd;}, set: function set(t) {this._source.loopEnd = this.toSeconds(t);} }, { key: "buffer", get: function get() {return this._buffer;}, set: function set(t) {this._buffer.set(t);} }, { key: "loop", get: function get() {return this._source.loop;}, set: function set(t) {this._source.loop = t, this._sourceStarted && this.cancelStop();} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(lo.getDefaults(), { url: new Ri(), loop: !1, loopEnd: 0, loopStart: 0, onload: Ei, onerror: Ei, playbackRate: 1 });} }]);return Vo;}(lo);var No = /*#__PURE__*/function (_Io) {_inherits(No, _Io);var _super63 = _createSuper(No);function No() {var _this96;_classCallCheck(this, No);_this96 = _super63.call(this, ui(No.getDefaults(), arguments, ["type"])), _this96.name = "Noise", _this96._source = null;var t = ui(No.getDefaults(), arguments, ["type"]);_this96._playbackRate = t.playbackRate, _this96.type = t.type, _this96._fadeIn = t.fadeIn, _this96._fadeOut = t.fadeOut;return _this96;}_createClass(No, [{ key: "_start", value: function _start(t) {var _this97 = this;var e = Lo[this._type];this._source = new Vo({ url: e, context: this.context, fadeIn: this._fadeIn, fadeOut: this._fadeOut, loop: !0, onended: function onended() {return _this97.onstop(_this97);}, playbackRate: this._playbackRate }).connect(this.output), this._source.start(this.toSeconds(t), Math.random() * (e.duration - .001));} }, { key: "_stop", value: function _stop(t) {this._source && (this._source.stop(this.toSeconds(t)), this._source = null);} }, { key: "_restart", value: function _restart(t) {this._stop(t), this._start(t);} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(No.prototype), "dispose", this).call(this), this._source && this._source.disconnect(), this;} }, { key: "type", get: function get() {return this._type;}, set: function set(t) {if (Bn(t in Lo, "Noise: invalid type: " + t), this._type !== t && (this._type = t, "started" === this.state)) {var _t136 = this.now();this._stop(_t136), this._start(_t136);}} }, { key: "playbackRate", get: function get() {return this._playbackRate;}, set: function set(t) {this._playbackRate = t, this._source && (this._source.playbackRate.value = t);} }, { key: "fadeIn", get: function get() {return this._fadeIn;}, set: function set(t) {this._fadeIn = t, this._source && (this._source.fadeIn = this._fadeIn);} }, { key: "fadeOut", get: function get() {return this._fadeOut;}, set: function set(t) {this._fadeOut = t, this._source && (this._source.fadeOut = this._fadeOut);} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Io.getDefaults(), { fadeIn: 0, fadeOut: 0, playbackRate: 1, type: "white" });} }]);return No;}(Io);var Po = 220500,jo = { brown: null, pink: null, white: null },Lo = { get brown() {if (!jo.brown) {var _t137 = [];for (var _e91 = 0; _e91 < 2; _e91++) {var _s63 = new Float32Array(Po);_t137[_e91] = _s63;var _n35 = 0;for (var _t138 = 0; _t138 < Po; _t138++) {var _e92 = 2 * Math.random() - 1;_s63[_t138] = (_n35 + .02 * _e92) / 1.02, _n35 = _s63[_t138], _s63[_t138] *= 3.5;}}jo.brown = new Ri().fromArray(_t137);}return jo.brown;}, get pink() {if (!jo.pink) {var _t139 = [];for (var _e93 = 0; _e93 < 2; _e93++) {var _s64 = new Float32Array(Po);var _n36 = void 0,_i25 = void 0,_o22 = void 0,_r14 = void 0,_a9 = void 0,_c9 = void 0,_h8 = void 0;_t139[_e93] = _s64, _n36 = _i25 = _o22 = _r14 = _a9 = _c9 = _h8 = 0;for (var _t140 = 0; _t140 < Po; _t140++) {var _e94 = 2 * Math.random() - 1;_n36 = .99886 * _n36 + .0555179 * _e94, _i25 = .99332 * _i25 + .0750759 * _e94, _o22 = .969 * _o22 + .153852 * _e94, _r14 = .8665 * _r14 + .3104856 * _e94, _a9 = .55 * _a9 + .5329522 * _e94, _c9 = -.7616 * _c9 - .016898 * _e94, _s64[_t140] = _n36 + _i25 + _o22 + _r14 + _a9 + _c9 + _h8 + .5362 * _e94, _s64[_t140] *= .11, _h8 = .115926 * _e94;}}jo.pink = new Ri().fromArray(_t139);}return jo.pink;}, get white() {if (!jo.white) {var _t141 = [];for (var _e95 = 0; _e95 < 2; _e95++) {var _s65 = new Float32Array(Po);_t141[_e95] = _s65;for (var _t142 = 0; _t142 < Po; _t142++) {_s65[_t142] = 2 * Math.random() - 1;}}jo.white = new Ri().fromArray(_t141);}return jo.white;} };var zo = /*#__PURE__*/function (_io8) {_inherits(zo, _io8);var _super64 = _createSuper(zo);function zo() {var _this98;_classCallCheck(this, zo);_this98 = _super64.call(this, ui(zo.getDefaults(), arguments, ["volume"])), _this98.name = "UserMedia";var t = ui(zo.getDefaults(), arguments, ["volume"]);_this98._volume = _this98.output = new Oo({ context: _this98.context, volume: t.volume }), _this98.volume = _this98._volume.volume, Oi(_assertThisInitialized(_this98), "volume"), _this98.mute = t.mute;return _this98;}_createClass(zo, [{ key: "open", value: function open(t) {return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee46() {var e, s, n, _t143;return _regeneratorRuntime.wrap(function _callee46$(_context46) {while (1) {switch (_context46.prev = _context46.next) {case 0:Bn(zo.supported, "UserMedia is not supported"), "started" === this.state && this.close();_context46.next = 3;return zo.enumerateDevices();case 3:e = _context46.sent;Nn(t) ? this._device = e[t] : (this._device = e.find(function (e) {return e.label === t || e.deviceId === t;}), !this._device && e.length > 0 && (this._device = e[0]), Bn(In(this._device), "No matching device ".concat(t)));s = { audio: { echoCancellation: !1, sampleRate: this.context.sampleRate, noiseSuppression: !1, mozNoiseSuppression: !1 } };this._device && (s.audio.deviceId = this._device.deviceId);_context46.next = 9;return navigator.mediaDevices.getUserMedia(s);case 9:n = _context46.sent;if (!this._stream) {this._stream = n;_t143 = this.context.createMediaStreamSource(n);ro(_t143, this.output), this._mediaStream = _t143;}return _context46.abrupt("return", this);case 12:case "end":return _context46.stop();}}}, _callee46, this);}));} }, { key: "close", value: function close() {return this._stream && this._mediaStream && (this._stream.getAudioTracks().forEach(function (t) {t.stop();}), this._stream = void 0, this._mediaStream.disconnect(), this._mediaStream = void 0), this._device = void 0, this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(zo.prototype), "dispose", this).call(this), this.close(), this._volume.dispose(), this.volume.dispose(), this;} }, { key: "state", get: function get() {return this._stream && this._stream.active ? "started" : "stopped";} }, { key: "deviceId", get: function get() {return this._device ? this._device.deviceId : void 0;} }, { key: "groupId", get: function get() {return this._device ? this._device.groupId : void 0;} }, { key: "label", get: function get() {return this._device ? this._device.label : void 0;} }, { key: "mute", get: function get() {return this._volume.mute;}, set: function set(t) {this._volume.mute = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { mute: !1, volume: 0 });} }, { key: "enumerateDevices", value: function enumerateDevices() {return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee47() {return _regeneratorRuntime.wrap(function _callee47$(_context47) {while (1) {switch (_context47.prev = _context47.next) {case 0:_context47.next = 2;return navigator.mediaDevices.enumerateDevices();case 2:return _context47.abrupt("return", _context47.sent.filter(function (t) {return "audioinput" === t.kind;}));case 3:case "end":return _context47.stop();}}}, _callee47);}));} }, { key: "supported", get: function get() {return In(navigator.mediaDevices) && In(navigator.mediaDevices.getUserMedia);} }]);return zo;}(io);function Wo(t, e) {return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee48() {var s, n;return _regeneratorRuntime.wrap(function _callee48$(_context48) {while (1) {switch (_context48.prev = _context48.next) {case 0:s = e / t.context.sampleRate, n = new qi(1, s, t.context.sampleRate);new t.constructor(Object.assign(t.get(), { frequency: 2 / s, detune: 0, context: n })).toDestination().start(0);_context48.next = 4;return n.render();case 4:return _context48.abrupt("return", _context48.sent.getChannelData(0));case 5:case "end":return _context48.stop();}}}, _callee48);}));}var Bo = /*#__PURE__*/function (_lo3) {_inherits(Bo, _lo3);var _super65 = _createSuper(Bo);function Bo() {var _this99;_classCallCheck(this, Bo);_this99 = _super65.call(this, ui(Bo.getDefaults(), arguments, ["frequency", "type"])), _this99.name = "ToneOscillatorNode", _this99._oscillator = _this99.context.createOscillator(), _this99._internalChannels = [_this99._oscillator];var t = ui(Bo.getDefaults(), arguments, ["frequency", "type"]);ro(_this99._oscillator, _this99._gainNode), _this99.type = t.type, _this99.frequency = new no({ context: _this99.context, param: _this99._oscillator.frequency, units: "frequency", value: t.frequency }), _this99.detune = new no({ context: _this99.context, param: _this99._oscillator.detune, units: "cents", value: t.detune }), Oi(_assertThisInitialized(_this99), ["frequency", "detune"]);return _this99;}_createClass(Bo, [{ key: "start", value: function start(t) {var e = this.toSeconds(t);return this.log("start", e), this._startGain(e), this._oscillator.start(e), this;} }, { key: "_stopSource", value: function _stopSource(t) {this._oscillator.stop(t);} }, { key: "setPeriodicWave", value: function setPeriodicWave(t) {return this._oscillator.setPeriodicWave(t), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Bo.prototype), "dispose", this).call(this), "started" === this.state && this.stop(), this._oscillator.disconnect(), this.frequency.dispose(), this.detune.dispose(), this;} }, { key: "type", get: function get() {return this._oscillator.type;}, set: function set(t) {this._oscillator.type = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(lo.getDefaults(), { detune: 0, frequency: 440, type: "sine" });} }]);return Bo;}(lo);var Uo = /*#__PURE__*/function (_Io2) {_inherits(Uo, _Io2);var _super66 = _createSuper(Uo);function Uo() {var _this100;_classCallCheck(this, Uo);_this100 = _super66.call(this, ui(Uo.getDefaults(), arguments, ["frequency", "type"])), _this100.name = "Oscillator", _this100._oscillator = null;var t = ui(Uo.getDefaults(), arguments, ["frequency", "type"]);_this100.frequency = new po({ context: _this100.context, units: "frequency", value: t.frequency }), Oi(_assertThisInitialized(_this100), "frequency"), _this100.detune = new po({ context: _this100.context, units: "cents", value: t.detune }), Oi(_assertThisInitialized(_this100), "detune"), _this100._partials = t.partials, _this100._partialCount = t.partialCount, _this100._type = t.type, t.partialCount && "custom" !== t.type && (_this100._type = _this100.baseType + t.partialCount.toString()), _this100.phase = t.phase;return _this100;}_createClass(Uo, [{ key: "_start", value: function _start(t) {var _this101 = this;var e = this.toSeconds(t),s = new Bo({ context: this.context, onended: function onended() {return _this101.onstop(_this101);} });this._oscillator = s, this._wave ? this._oscillator.setPeriodicWave(this._wave) : this._oscillator.type = this._type, this._oscillator.connect(this.output), this.frequency.connect(this._oscillator.frequency), this.detune.connect(this._oscillator.detune), this._oscillator.start(e);} }, { key: "_stop", value: function _stop(t) {var e = this.toSeconds(t);this._oscillator && this._oscillator.stop(e);} }, { key: "_restart", value: function _restart(t) {var e = this.toSeconds(t);return this.log("restart", e), this._oscillator && this._oscillator.cancelStop(), this._state.cancel(e), this;} }, { key: "syncFrequency", value: function syncFrequency() {return this.context.transport.syncSignal(this.frequency), this;} }, { key: "unsyncFrequency", value: function unsyncFrequency() {return this.context.transport.unsyncSignal(this.frequency), this;} }, { key: "_getCachedPeriodicWave", value: function _getCachedPeriodicWave() {var _this102 = this;if ("custom" === this._type) return Uo._periodicWaveCache.find(function (t) {return t.phase === _this102._phase && (e = t.partials, s = _this102._partials, e.length === s.length && e.every(function (t, e) {return s[e] === t;}));var e, s;});{var _t144 = Uo._periodicWaveCache.find(function (t) {return t.type === _this102._type && t.phase === _this102._phase;});return this._partialCount = _t144 ? _t144.partialCount : this._partialCount, _t144;}} }, { key: "_getRealImaginary", value: function _getRealImaginary(t, e) {var s = 2048;var n = new Float32Array(s),i = new Float32Array(s);var o = 1;if ("custom" === t) {if (o = this._partials.length + 1, this._partialCount = this._partials.length, s = o, 0 === this._partials.length) return [n, i];} else {var _e96 = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(t);_e96 ? (o = parseInt(_e96[2], 10) + 1, this._partialCount = parseInt(_e96[2], 10), t = _e96[1], o = Math.max(o, 2), s = o) : this._partialCount = 0, this._partials = [];}for (var _r15 = 1; _r15 < s; ++_r15) {var _s66 = 2 / (_r15 * Math.PI);var _a10 = void 0;switch (t) {case "sine":_a10 = _r15 <= o ? 1 : 0, this._partials[_r15 - 1] = _a10;break;case "square":_a10 = 1 & _r15 ? 2 * _s66 : 0, this._partials[_r15 - 1] = _a10;break;case "sawtooth":_a10 = _s66 * (1 & _r15 ? 1 : -1), this._partials[_r15 - 1] = _a10;break;case "triangle":_a10 = 1 & _r15 ? _s66 * _s66 * 2 * (_r15 - 1 >> 1 & 1 ? -1 : 1) : 0, this._partials[_r15 - 1] = _a10;break;case "custom":_a10 = this._partials[_r15 - 1];break;default:throw new TypeError("Oscillator: invalid type: " + t);}0 !== _a10 ? (n[_r15] = -_a10 * Math.sin(e * _r15), i[_r15] = _a10 * Math.cos(e * _r15)) : (n[_r15] = 0, i[_r15] = 0);}return [n, i];} }, { key: "_inverseFFT", value: function _inverseFFT(t, e, s) {var n = 0;var i = t.length;for (var _o23 = 0; _o23 < i; _o23++) {n += t[_o23] * Math.cos(_o23 * s) + e[_o23] * Math.sin(_o23 * s);}return n;} }, { key: "getInitialValue", value: function getInitialValue() {var _this$_getRealImagina = this._getRealImaginary(this._type, 0),_this$_getRealImagina2 = _slicedToArray(_this$_getRealImagina, 2),t = _this$_getRealImagina2[0],e = _this$_getRealImagina2[1];var s = 0;var n = 2 * Math.PI;for (var _i26 = 0; _i26 < 32; _i26++) {s = Math.max(this._inverseFFT(t, e, _i26 / 32 * n), s);}return xi(-this._inverseFFT(t, e, this._phase) / s, -1, 1);} }, { key: "asArray", value: function asArray() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1024;return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee49() {return _regeneratorRuntime.wrap(function _callee49$(_context49) {while (1) {switch (_context49.prev = _context49.next) {case 0:return _context49.abrupt("return", Wo(this, t));case 1:case "end":return _context49.stop();}}}, _callee49, this);}));} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Uo.prototype), "dispose", this).call(this), null !== this._oscillator && this._oscillator.dispose(), this._wave = void 0, this.frequency.dispose(), this.detune.dispose(), this;} }, { key: "type", get: function get() {return this._type;}, set: function set(t) {this._type = t;var e = -1 !== ["sine", "square", "sawtooth", "triangle"].indexOf(t);if (0 === this._phase && e) this._wave = void 0, this._partialCount = 0, null !== this._oscillator && (this._oscillator.type = t);else {var _e97 = this._getCachedPeriodicWave();if (In(_e97)) {var _t145 = _e97.partials,_s67 = _e97.wave;this._wave = _s67, this._partials = _t145, null !== this._oscillator && this._oscillator.setPeriodicWave(this._wave);} else {var _this$_getRealImagina3 = this._getRealImaginary(t, this._phase),_this$_getRealImagina4 = _slicedToArray(_this$_getRealImagina3, 2),_e98 = _this$_getRealImagina4[0],_s68 = _this$_getRealImagina4[1],_n37 = this.context.createPeriodicWave(_e98, _s68);this._wave = _n37, null !== this._oscillator && this._oscillator.setPeriodicWave(this._wave), Uo._periodicWaveCache.push({ imag: _s68, partialCount: this._partialCount, partials: this._partials, phase: this._phase, real: _e98, type: this._type, wave: this._wave }), Uo._periodicWaveCache.length > 100 && Uo._periodicWaveCache.shift();}}} }, { key: "baseType", get: function get() {return this._type.replace(this.partialCount.toString(), "");}, set: function set(t) {this.partialCount && "custom" !== this._type && "custom" !== t ? this.type = t + this.partialCount : this.type = t;} }, { key: "partialCount", get: function get() {return this._partialCount;}, set: function set(t) {Un(t, 0);var e = this._type;var s = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);if (s && (e = s[1]), "custom" !== this._type) this.type = 0 === t ? e : e + t.toString();else {var _e99 = new Float32Array(t);this._partials.forEach(function (t, s) {return _e99[s] = t;}), this._partials = Array.from(_e99), this.type = this._type;}} }, { key: "partials", get: function get() {return this._partials.slice(0, this.partialCount);}, set: function set(t) {this._partials = t, this._partialCount = this._partials.length, t.length && (this.type = "custom");} }, { key: "phase", get: function get() {return this._phase * (180 / Math.PI);}, set: function set(t) {this._phase = t * Math.PI / 180, this.type = this._type;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Io.getDefaults(), { detune: 0, frequency: 440, partialCount: 0, partials: [], phase: 0, type: "sine" });} }]);return Uo;}(Io);Uo._periodicWaveCache = [];var Go = /*#__PURE__*/function (_io9) {_inherits(Go, _io9);var _super67 = _createSuper(Go);function Go() {_classCallCheck(this, Go);return _super67.call(this, Object.assign(ui(Go.getDefaults(), arguments, ["context"])));}_createClass(Go, [{ key: "connect", value: function connect(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;return fo(this, t, e, s), this;} }]);return Go;}(io);var Qo = /*#__PURE__*/function (_Go) {_inherits(Qo, _Go);var _super68 = _createSuper(Qo);function Qo() {var _this103;_classCallCheck(this, Qo);_this103 = _super68.call(this, Object.assign(ui(Qo.getDefaults(), arguments, ["mapping", "length"]))), _this103.name = "WaveShaper", _this103._shaper = _this103.context.createWaveShaper(), _this103.input = _this103._shaper, _this103.output = _this103._shaper;var t = ui(Qo.getDefaults(), arguments, ["mapping", "length"]);Ln(t.mapping) || t.mapping instanceof Float32Array ? _this103.curve = Float32Array.from(t.mapping) : Vn(t.mapping) && _this103.setMap(t.mapping, t.length);return _this103;}_createClass(Qo, [{ key: "setMap", value: function setMap(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1024;var s = new Float32Array(e);for (var _n38 = 0, _i27 = e; _n38 < _i27; _n38++) {var _e100 = _n38 / (_i27 - 1) * 2 - 1;s[_n38] = t(_e100, _n38);}return this.curve = s, this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Qo.prototype), "dispose", this).call(this), this._shaper.disconnect(), this;} }, { key: "curve", get: function get() {return this._shaper.curve;}, set: function set(t) {this._shaper.curve = t;} }, { key: "oversample", get: function get() {return this._shaper.oversample;}, set: function set(t) {Bn(["none", "2x", "4x"].some(function (e) {return e.includes(t);}), "oversampling must be either 'none', '2x', or '4x'"), this._shaper.oversample = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(po.getDefaults(), { length: 1024 });} }]);return Qo;}(Go);var Zo = /*#__PURE__*/function (_Go2) {_inherits(Zo, _Go2);var _super69 = _createSuper(Zo);function Zo() {var _this104;_classCallCheck(this, Zo);_this104 = _super69.apply(this, arguments), _this104.name = "AudioToGain", _this104._norm = new Qo({ context: _this104.context, mapping: function mapping(t) {return (t + 1) / 2;} }), _this104.input = _this104._norm, _this104.output = _this104._norm;return _this104;}_createClass(Zo, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Zo.prototype), "dispose", this).call(this), this._norm.dispose(), this;} }]);return Zo;}(Go);var Xo = /*#__PURE__*/function (_po2) {_inherits(Xo, _po2);var _super70 = _createSuper(Xo);function Xo() {var _this105;_classCallCheck(this, Xo);_this105 = _super70.call(this, Object.assign(ui(Xo.getDefaults(), arguments, ["value"]))), _this105.name = "Multiply", _this105.override = !1;var t = ui(Xo.getDefaults(), arguments, ["value"]);_this105._mult = _this105.input = _this105.output = new ho({ context: _this105.context, minValue: t.minValue, maxValue: t.maxValue }), _this105.factor = _this105._param = _this105._mult.gain, _this105.factor.setValueAtTime(t.value, 0);return _this105;}_createClass(Xo, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Xo.prototype), "dispose", this).call(this), this._mult.dispose(), this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(po.getDefaults(), { value: 0 });} }]);return Xo;}(po);var Yo = /*#__PURE__*/function (_Io3) {_inherits(Yo, _Io3);var _super71 = _createSuper(Yo);function Yo() {var _this106;_classCallCheck(this, Yo);_this106 = _super71.call(this, ui(Yo.getDefaults(), arguments, ["frequency", "type", "modulationType"])), _this106.name = "AMOscillator", _this106._modulationScale = new Zo({ context: _this106.context }), _this106._modulationNode = new ho({ context: _this106.context });var t = ui(Yo.getDefaults(), arguments, ["frequency", "type", "modulationType"]);_this106._carrier = new Uo({ context: _this106.context, detune: t.detune, frequency: t.frequency, onstop: function onstop() {return _this106.onstop(_assertThisInitialized(_this106));}, phase: t.phase, type: t.type }), _this106.frequency = _this106._carrier.frequency, _this106.detune = _this106._carrier.detune, _this106._modulator = new Uo({ context: _this106.context, phase: t.phase, type: t.modulationType }), _this106.harmonicity = new Xo({ context: _this106.context, units: "positive", value: t.harmonicity }), _this106.frequency.chain(_this106.harmonicity, _this106._modulator.frequency), _this106._modulator.chain(_this106._modulationScale, _this106._modulationNode.gain), _this106._carrier.chain(_this106._modulationNode, _this106.output), Oi(_assertThisInitialized(_this106), ["frequency", "detune", "harmonicity"]);return _this106;}_createClass(Yo, [{ key: "_start", value: function _start(t) {this._modulator.start(t), this._carrier.start(t);} }, { key: "_stop", value: function _stop(t) {this._modulator.stop(t), this._carrier.stop(t);} }, { key: "_restart", value: function _restart(t) {this._modulator.restart(t), this._carrier.restart(t);} }, { key: "asArray", value: function asArray() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1024;return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee50() {return _regeneratorRuntime.wrap(function _callee50$(_context50) {while (1) {switch (_context50.prev = _context50.next) {case 0:return _context50.abrupt("return", Wo(this, t));case 1:case "end":return _context50.stop();}}}, _callee50, this);}));} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Yo.prototype), "dispose", this).call(this), this.frequency.dispose(), this.detune.dispose(), this.harmonicity.dispose(), this._carrier.dispose(), this._modulator.dispose(), this._modulationNode.dispose(), this._modulationScale.dispose(), this;} }, { key: "type", get: function get() {return this._carrier.type;}, set: function set(t) {this._carrier.type = t;} }, { key: "baseType", get: function get() {return this._carrier.baseType;}, set: function set(t) {this._carrier.baseType = t;} }, { key: "partialCount", get: function get() {return this._carrier.partialCount;}, set: function set(t) {this._carrier.partialCount = t;} }, { key: "modulationType", get: function get() {return this._modulator.type;}, set: function set(t) {this._modulator.type = t;} }, { key: "phase", get: function get() {return this._carrier.phase;}, set: function set(t) {this._carrier.phase = t, this._modulator.phase = t;} }, { key: "partials", get: function get() {return this._carrier.partials;}, set: function set(t) {this._carrier.partials = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Uo.getDefaults(), { harmonicity: 1, modulationType: "square" });} }]);return Yo;}(Io);var $o = /*#__PURE__*/function (_Io4) {_inherits($o, _Io4);var _super72 = _createSuper($o);function $o() {var _this107;_classCallCheck(this, $o);_this107 = _super72.call(this, ui($o.getDefaults(), arguments, ["frequency", "type", "modulationType"])), _this107.name = "FMOscillator", _this107._modulationNode = new ho({ context: _this107.context, gain: 0 });var t = ui($o.getDefaults(), arguments, ["frequency", "type", "modulationType"]);_this107._carrier = new Uo({ context: _this107.context, detune: t.detune, frequency: 0, onstop: function onstop() {return _this107.onstop(_assertThisInitialized(_this107));}, phase: t.phase, type: t.type }), _this107.detune = _this107._carrier.detune, _this107.frequency = new po({ context: _this107.context, units: "frequency", value: t.frequency }), _this107._modulator = new Uo({ context: _this107.context, phase: t.phase, type: t.modulationType }), _this107.harmonicity = new Xo({ context: _this107.context, units: "positive", value: t.harmonicity }), _this107.modulationIndex = new Xo({ context: _this107.context, units: "positive", value: t.modulationIndex }), _this107.frequency.connect(_this107._carrier.frequency), _this107.frequency.chain(_this107.harmonicity, _this107._modulator.frequency), _this107.frequency.chain(_this107.modulationIndex, _this107._modulationNode), _this107._modulator.connect(_this107._modulationNode.gain), _this107._modulationNode.connect(_this107._carrier.frequency), _this107._carrier.connect(_this107.output), _this107.detune.connect(_this107._modulator.detune), Oi(_assertThisInitialized(_this107), ["modulationIndex", "frequency", "detune", "harmonicity"]);return _this107;}_createClass($o, [{ key: "_start", value: function _start(t) {this._modulator.start(t), this._carrier.start(t);} }, { key: "_stop", value: function _stop(t) {this._modulator.stop(t), this._carrier.stop(t);} }, { key: "_restart", value: function _restart(t) {return this._modulator.restart(t), this._carrier.restart(t), this;} }, { key: "asArray", value: function asArray() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1024;return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee51() {return _regeneratorRuntime.wrap(function _callee51$(_context51) {while (1) {switch (_context51.prev = _context51.next) {case 0:return _context51.abrupt("return", Wo(this, t));case 1:case "end":return _context51.stop();}}}, _callee51, this);}));} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf($o.prototype), "dispose", this).call(this), this.frequency.dispose(), this.harmonicity.dispose(), this._carrier.dispose(), this._modulator.dispose(), this._modulationNode.dispose(), this.modulationIndex.dispose(), this;} }, { key: "type", get: function get() {return this._carrier.type;}, set: function set(t) {this._carrier.type = t;} }, { key: "baseType", get: function get() {return this._carrier.baseType;}, set: function set(t) {this._carrier.baseType = t;} }, { key: "partialCount", get: function get() {return this._carrier.partialCount;}, set: function set(t) {this._carrier.partialCount = t;} }, { key: "modulationType", get: function get() {return this._modulator.type;}, set: function set(t) {this._modulator.type = t;} }, { key: "phase", get: function get() {return this._carrier.phase;}, set: function set(t) {this._carrier.phase = t, this._modulator.phase = t;} }, { key: "partials", get: function get() {return this._carrier.partials;}, set: function set(t) {this._carrier.partials = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Uo.getDefaults(), { harmonicity: 1, modulationIndex: 2, modulationType: "square" });} }]);return $o;}(Io);var Ho = /*#__PURE__*/function (_Io5) {_inherits(Ho, _Io5);var _super73 = _createSuper(Ho);function Ho() {var _this108;_classCallCheck(this, Ho);_this108 = _super73.call(this, ui(Ho.getDefaults(), arguments, ["frequency", "width"])), _this108.name = "PulseOscillator", _this108._widthGate = new ho({ context: _this108.context, gain: 0 }), _this108._thresh = new Qo({ context: _this108.context, mapping: function mapping(t) {return t <= 0 ? -1 : 1;} });var t = ui(Ho.getDefaults(), arguments, ["frequency", "width"]);_this108.width = new po({ context: _this108.context, units: "audioRange", value: t.width }), _this108._triangle = new Uo({ context: _this108.context, detune: t.detune, frequency: t.frequency, onstop: function onstop() {return _this108.onstop(_assertThisInitialized(_this108));}, phase: t.phase, type: "triangle" }), _this108.frequency = _this108._triangle.frequency, _this108.detune = _this108._triangle.detune, _this108._triangle.chain(_this108._thresh, _this108.output), _this108.width.chain(_this108._widthGate, _this108._thresh), Oi(_assertThisInitialized(_this108), ["width", "frequency", "detune"]);return _this108;}_createClass(Ho, [{ key: "_start", value: function _start(t) {t = this.toSeconds(t), this._triangle.start(t), this._widthGate.gain.setValueAtTime(1, t);} }, { key: "_stop", value: function _stop(t) {t = this.toSeconds(t), this._triangle.stop(t), this._widthGate.gain.cancelScheduledValues(t), this._widthGate.gain.setValueAtTime(0, t);} }, { key: "_restart", value: function _restart(t) {this._triangle.restart(t), this._widthGate.gain.cancelScheduledValues(t), this._widthGate.gain.setValueAtTime(1, t);} }, { key: "asArray", value: function asArray() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1024;return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee52() {return _regeneratorRuntime.wrap(function _callee52$(_context52) {while (1) {switch (_context52.prev = _context52.next) {case 0:return _context52.abrupt("return", Wo(this, t));case 1:case "end":return _context52.stop();}}}, _callee52, this);}));} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Ho.prototype), "dispose", this).call(this), this._triangle.dispose(), this.width.dispose(), this._widthGate.dispose(), this._thresh.dispose(), this;} }, { key: "phase", get: function get() {return this._triangle.phase;}, set: function set(t) {this._triangle.phase = t;} }, { key: "type", get: function get() {return "pulse";} }, { key: "baseType", get: function get() {return "pulse";} }, { key: "partials", get: function get() {return [];} }, { key: "partialCount", get: function get() {return 0;} }, { key: "carrierType", set: function set(t) {this._triangle.type = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Io.getDefaults(), { detune: 0, frequency: 440, phase: 0, type: "pulse", width: .2 });} }]);return Ho;}(Io);var Jo = /*#__PURE__*/function (_Io6) {_inherits(Jo, _Io6);var _super74 = _createSuper(Jo);function Jo() {var _this109;_classCallCheck(this, Jo);_this109 = _super74.call(this, ui(Jo.getDefaults(), arguments, ["frequency", "type", "spread"])), _this109.name = "FatOscillator", _this109._oscillators = [];var t = ui(Jo.getDefaults(), arguments, ["frequency", "type", "spread"]);_this109.frequency = new po({ context: _this109.context, units: "frequency", value: t.frequency }), _this109.detune = new po({ context: _this109.context, units: "cents", value: t.detune }), _this109._spread = t.spread, _this109._type = t.type, _this109._phase = t.phase, _this109._partials = t.partials, _this109._partialCount = t.partialCount, _this109.count = t.count, Oi(_assertThisInitialized(_this109), ["frequency", "detune"]);return _this109;}_createClass(Jo, [{ key: "_start", value: function _start(t) {t = this.toSeconds(t), this._forEach(function (e) {return e.start(t);});} }, { key: "_stop", value: function _stop(t) {t = this.toSeconds(t), this._forEach(function (e) {return e.stop(t);});} }, { key: "_restart", value: function _restart(t) {this._forEach(function (e) {return e.restart(t);});} }, { key: "_forEach", value: function _forEach(t) {for (var _e101 = 0; _e101 < this._oscillators.length; _e101++) {t(this._oscillators[_e101], _e101);}} }, { key: "asArray", value: function asArray() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1024;return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee53() {return _regeneratorRuntime.wrap(function _callee53$(_context53) {while (1) {switch (_context53.prev = _context53.next) {case 0:return _context53.abrupt("return", Wo(this, t));case 1:case "end":return _context53.stop();}}}, _callee53, this);}));} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Jo.prototype), "dispose", this).call(this), this.frequency.dispose(), this.detune.dispose(), this._forEach(function (t) {return t.dispose();}), this;} }, { key: "type", get: function get() {return this._type;}, set: function set(t) {this._type = t, this._forEach(function (e) {return e.type = t;});} }, { key: "spread", get: function get() {return this._spread;}, set: function set(t) {if (this._spread = t, this._oscillators.length > 1) {var _e102 = -t / 2,_s69 = t / (this._oscillators.length - 1);this._forEach(function (t, n) {return t.detune.value = _e102 + _s69 * n;});}} }, { key: "count", get: function get() {return this._oscillators.length;}, set: function set(t) {var _this110 = this;if (Un(t, 1), this._oscillators.length !== t) {this._forEach(function (t) {return t.dispose();}), this._oscillators = [];for (var _e103 = 0; _e103 < t; _e103++) {var _s70 = new Uo({ context: this.context, volume: -6 - 1.1 * t, type: this._type, phase: this._phase + _e103 / t * 360, partialCount: this._partialCount, onstop: 0 === _e103 ? function () {return _this110.onstop(_this110);} : Ei });"custom" === this.type && (_s70.partials = this._partials), this.frequency.connect(_s70.frequency), this.detune.connect(_s70.detune), _s70.detune.overridden = !1, _s70.connect(this.output), this._oscillators[_e103] = _s70;}this.spread = this._spread, "started" === this.state && this._forEach(function (t) {return t.start();});}} }, { key: "phase", get: function get() {return this._phase;}, set: function set(t) {var _this111 = this;this._phase = t, this._forEach(function (t, e) {return t.phase = _this111._phase + e / _this111.count * 360;});} }, { key: "baseType", get: function get() {return this._oscillators[0].baseType;}, set: function set(t) {this._forEach(function (e) {return e.baseType = t;}), this._type = this._oscillators[0].type;} }, { key: "partials", get: function get() {return this._oscillators[0].partials;}, set: function set(t) {this._partials = t, this._partialCount = this._partials.length, t.length && (this._type = "custom", this._forEach(function (e) {return e.partials = t;}));} }, { key: "partialCount", get: function get() {return this._oscillators[0].partialCount;}, set: function set(t) {this._partialCount = t, this._forEach(function (e) {return e.partialCount = t;}), this._type = this._oscillators[0].type;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Uo.getDefaults(), { count: 3, spread: 20, type: "sawtooth" });} }]);return Jo;}(Io);var Ko = /*#__PURE__*/function (_Io7) {_inherits(Ko, _Io7);var _super75 = _createSuper(Ko);function Ko() {var _this112;_classCallCheck(this, Ko);_this112 = _super75.call(this, ui(Ko.getDefaults(), arguments, ["frequency", "modulationFrequency"])), _this112.name = "PWMOscillator", _this112.sourceType = "pwm", _this112._scale = new Xo({ context: _this112.context, value: 2 });var t = ui(Ko.getDefaults(), arguments, ["frequency", "modulationFrequency"]);_this112._pulse = new Ho({ context: _this112.context, frequency: t.modulationFrequency }), _this112._pulse.carrierType = "sine", _this112.modulationFrequency = _this112._pulse.frequency, _this112._modulator = new Uo({ context: _this112.context, detune: t.detune, frequency: t.frequency, onstop: function onstop() {return _this112.onstop(_assertThisInitialized(_this112));}, phase: t.phase }), _this112.frequency = _this112._modulator.frequency, _this112.detune = _this112._modulator.detune, _this112._modulator.chain(_this112._scale, _this112._pulse.width), _this112._pulse.connect(_this112.output), Oi(_assertThisInitialized(_this112), ["modulationFrequency", "frequency", "detune"]);return _this112;}_createClass(Ko, [{ key: "_start", value: function _start(t) {t = this.toSeconds(t), this._modulator.start(t), this._pulse.start(t);} }, { key: "_stop", value: function _stop(t) {t = this.toSeconds(t), this._modulator.stop(t), this._pulse.stop(t);} }, { key: "_restart", value: function _restart(t) {this._modulator.restart(t), this._pulse.restart(t);} }, { key: "asArray", value: function asArray() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1024;return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee54() {return _regeneratorRuntime.wrap(function _callee54$(_context54) {while (1) {switch (_context54.prev = _context54.next) {case 0:return _context54.abrupt("return", Wo(this, t));case 1:case "end":return _context54.stop();}}}, _callee54, this);}));} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Ko.prototype), "dispose", this).call(this), this._pulse.dispose(), this._scale.dispose(), this._modulator.dispose(), this;} }, { key: "type", get: function get() {return "pwm";} }, { key: "baseType", get: function get() {return "pwm";} }, { key: "partials", get: function get() {return [];} }, { key: "partialCount", get: function get() {return 0;} }, { key: "phase", get: function get() {return this._modulator.phase;}, set: function set(t) {this._modulator.phase = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Io.getDefaults(), { detune: 0, frequency: 440, modulationFrequency: .4, phase: 0, type: "pwm" });} }]);return Ko;}(Io);var tr = { am: Yo, fat: Jo, fm: $o, oscillator: Uo, pulse: Ho, pwm: Ko };var er = /*#__PURE__*/function (_Io8) {_inherits(er, _Io8);var _super76 = _createSuper(er);function er() {var _this113;_classCallCheck(this, er);_this113 = _super76.call(this, ui(er.getDefaults(), arguments, ["frequency", "type"])), _this113.name = "OmniOscillator";var t = ui(er.getDefaults(), arguments, ["frequency", "type"]);_this113.frequency = new po({ context: _this113.context, units: "frequency", value: t.frequency }), _this113.detune = new po({ context: _this113.context, units: "cents", value: t.detune }), Oi(_assertThisInitialized(_this113), ["frequency", "detune"]), _this113.set(t);return _this113;}_createClass(er, [{ key: "_start", value: function _start(t) {this._oscillator.start(t);} }, { key: "_stop", value: function _stop(t) {this._oscillator.stop(t);} }, { key: "_restart", value: function _restart(t) {return this._oscillator.restart(t), this;} }, { key: "set", value: function set(t) {return Reflect.has(t, "type") && t.type && (this.type = t.type), _get(_getPrototypeOf(er.prototype), "set", this).call(this, t), this;} }, { key: "_createNewOscillator", value: function _createNewOscillator(t) {var _this114 = this;if (t !== this._sourceType) {this._sourceType = t;var _e104 = tr[t],_s71 = this.now();if (this._oscillator) {var _t146 = this._oscillator;_t146.stop(_s71), this.context.setTimeout(function () {return _t146.dispose();}, this.blockTime);}this._oscillator = new _e104({ context: this.context }), this.frequency.connect(this._oscillator.frequency), this.detune.connect(this._oscillator.detune), this._oscillator.connect(this.output), this._oscillator.onstop = function () {return _this114.onstop(_this114);}, "started" === this.state && this._oscillator.start(_s71);}} }, { key: "_getOscType", value: function _getOscType(t, e) {return t instanceof tr[e];} }, { key: "asArray", value: function asArray() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1024;return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee55() {return _regeneratorRuntime.wrap(function _callee55$(_context55) {while (1) {switch (_context55.prev = _context55.next) {case 0:return _context55.abrupt("return", Wo(this, t));case 1:case "end":return _context55.stop();}}}, _callee55, this);}));} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(er.prototype), "dispose", this).call(this), this.detune.dispose(), this.frequency.dispose(), this._oscillator.dispose(), this;} }, { key: "type", get: function get() {var _this115 = this;var t = "";return ["am", "fm", "fat"].some(function (t) {return _this115._sourceType === t;}) && (t = this._sourceType), t + this._oscillator.type;}, set: function set(t) {"fm" === t.substr(0, 2) ? (this._createNewOscillator("fm"), this._oscillator = this._oscillator, this._oscillator.type = t.substr(2)) : "am" === t.substr(0, 2) ? (this._createNewOscillator("am"), this._oscillator = this._oscillator, this._oscillator.type = t.substr(2)) : "fat" === t.substr(0, 3) ? (this._createNewOscillator("fat"), this._oscillator = this._oscillator, this._oscillator.type = t.substr(3)) : "pwm" === t ? (this._createNewOscillator("pwm"), this._oscillator = this._oscillator) : "pulse" === t ? this._createNewOscillator("pulse") : (this._createNewOscillator("oscillator"), this._oscillator = this._oscillator, this._oscillator.type = t);} }, { key: "partials", get: function get() {return this._oscillator.partials;}, set: function set(t) {this._getOscType(this._oscillator, "pulse") || this._getOscType(this._oscillator, "pwm") || (this._oscillator.partials = t);} }, { key: "partialCount", get: function get() {return this._oscillator.partialCount;}, set: function set(t) {this._getOscType(this._oscillator, "pulse") || this._getOscType(this._oscillator, "pwm") || (this._oscillator.partialCount = t);} }, { key: "phase", get: function get() {return this._oscillator.phase;}, set: function set(t) {this._oscillator.phase = t;} }, { key: "sourceType", get: function get() {return this._sourceType;}, set: function set(t) {var e = "sine";"pwm" !== this._oscillator.type && "pulse" !== this._oscillator.type && (e = this._oscillator.type), "fm" === t ? this.type = "fm" + e : "am" === t ? this.type = "am" + e : "fat" === t ? this.type = "fat" + e : "oscillator" === t ? this.type = e : "pulse" === t ? this.type = "pulse" : "pwm" === t && (this.type = "pwm");} }, { key: "baseType", get: function get() {return this._oscillator.baseType;}, set: function set(t) {this._getOscType(this._oscillator, "pulse") || this._getOscType(this._oscillator, "pwm") || "pulse" === t || "pwm" === t || (this._oscillator.baseType = t);} }, { key: "width", get: function get() {return this._getOscType(this._oscillator, "pulse") ? this._oscillator.width : void 0;} }, { key: "count", get: function get() {return this._getOscType(this._oscillator, "fat") ? this._oscillator.count : void 0;}, set: function set(t) {this._getOscType(this._oscillator, "fat") && Nn(t) && (this._oscillator.count = t);} }, { key: "spread", get: function get() {return this._getOscType(this._oscillator, "fat") ? this._oscillator.spread : void 0;}, set: function set(t) {this._getOscType(this._oscillator, "fat") && Nn(t) && (this._oscillator.spread = t);} }, { key: "modulationType", get: function get() {return this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am") ? this._oscillator.modulationType : void 0;}, set: function set(t) {(this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am")) && zn(t) && (this._oscillator.modulationType = t);} }, { key: "modulationIndex", get: function get() {return this._getOscType(this._oscillator, "fm") ? this._oscillator.modulationIndex : void 0;} }, { key: "harmonicity", get: function get() {return this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am") ? this._oscillator.harmonicity : void 0;} }, { key: "modulationFrequency", get: function get() {return this._getOscType(this._oscillator, "pwm") ? this._oscillator.modulationFrequency : void 0;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Uo.getDefaults(), $o.getDefaults(), Yo.getDefaults(), Jo.getDefaults(), Ho.getDefaults(), Ko.getDefaults());} }]);return er;}(Io);var sr = /*#__PURE__*/function (_po3) {_inherits(sr, _po3);var _super77 = _createSuper(sr);function sr() {var _this116;_classCallCheck(this, sr);_this116 = _super77.call(this, Object.assign(ui(sr.getDefaults(), arguments, ["value"]))), _this116.override = !1, _this116.name = "Add", _this116._sum = new ho({ context: _this116.context }), _this116.input = _this116._sum, _this116.output = _this116._sum, _this116.addend = _this116._param, oo(_this116._constantSource, _this116._sum);return _this116;}_createClass(sr, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(sr.prototype), "dispose", this).call(this), this._sum.dispose(), this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(po.getDefaults(), { value: 0 });} }]);return sr;}(po);var nr = /*#__PURE__*/function (_Go3) {_inherits(nr, _Go3);var _super78 = _createSuper(nr);function nr() {var _this117;_classCallCheck(this, nr);_this117 = _super78.call(this, Object.assign(ui(nr.getDefaults(), arguments, ["min", "max"]))), _this117.name = "Scale";var t = ui(nr.getDefaults(), arguments, ["min", "max"]);_this117._mult = _this117.input = new Xo({ context: _this117.context, value: t.max - t.min }), _this117._add = _this117.output = new sr({ context: _this117.context, value: t.min }), _this117._min = t.min, _this117._max = t.max, _this117.input.connect(_this117.output);return _this117;}_createClass(nr, [{ key: "_setRange", value: function _setRange() {this._add.value = this._min, this._mult.value = this._max - this._min;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(nr.prototype), "dispose", this).call(this), this._add.dispose(), this._mult.dispose(), this;} }, { key: "min", get: function get() {return this._min;}, set: function set(t) {this._min = t, this._setRange();} }, { key: "max", get: function get() {return this._max;}, set: function set(t) {this._max = t, this._setRange();} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Go.getDefaults(), { max: 1, min: 0 });} }]);return nr;}(Go);var ir = /*#__PURE__*/function (_Go4) {_inherits(ir, _Go4);var _super79 = _createSuper(ir);function ir() {var _this118;_classCallCheck(this, ir);_this118 = _super79.call(this, Object.assign(ui(ir.getDefaults(), arguments))), _this118.name = "Zero", _this118._gain = new ho({ context: _this118.context }), _this118.output = _this118._gain, _this118.input = void 0, ro(_this118.context.getConstant(0), _this118._gain);return _this118;}_createClass(ir, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(ir.prototype), "dispose", this).call(this), ao(this.context.getConstant(0), this._gain), this;} }]);return ir;}(Go);var or = /*#__PURE__*/function (_io10) {_inherits(or, _io10);var _super80 = _createSuper(or);function or() {var _this119;_classCallCheck(this, or);_this119 = _super80.call(this, ui(or.getDefaults(), arguments, ["frequency", "min", "max"])), _this119.name = "LFO", _this119._stoppedValue = 0, _this119._units = "number", _this119.convert = !0, _this119._fromType = no.prototype._fromType, _this119._toType = no.prototype._toType, _this119._is = no.prototype._is, _this119._clampValue = no.prototype._clampValue;var t = ui(or.getDefaults(), arguments, ["frequency", "min", "max"]);_this119._oscillator = new Uo(t), _this119.frequency = _this119._oscillator.frequency, _this119._amplitudeGain = new ho({ context: _this119.context, gain: t.amplitude, units: "normalRange" }), _this119.amplitude = _this119._amplitudeGain.gain, _this119._stoppedSignal = new po({ context: _this119.context, units: "audioRange", value: 0 }), _this119._zeros = new ir({ context: _this119.context }), _this119._a2g = new Zo({ context: _this119.context }), _this119._scaler = _this119.output = new nr({ context: _this119.context, max: t.max, min: t.min }), _this119.units = t.units, _this119.min = t.min, _this119.max = t.max, _this119._oscillator.chain(_this119._amplitudeGain, _this119._a2g, _this119._scaler), _this119._zeros.connect(_this119._a2g), _this119._stoppedSignal.connect(_this119._a2g), Oi(_assertThisInitialized(_this119), ["amplitude", "frequency"]), _this119.phase = t.phase;return _this119;}_createClass(or, [{ key: "start", value: function start(t) {return t = this.toSeconds(t), this._stoppedSignal.setValueAtTime(0, t), this._oscillator.start(t), this;} }, { key: "stop", value: function stop(t) {return t = this.toSeconds(t), this._stoppedSignal.setValueAtTime(this._stoppedValue, t), this._oscillator.stop(t), this;} }, { key: "sync", value: function sync() {return this._oscillator.sync(), this._oscillator.syncFrequency(), this;} }, { key: "unsync", value: function unsync() {return this._oscillator.unsync(), this._oscillator.unsyncFrequency(), this;} }, { key: "_setStoppedValue", value: function _setStoppedValue() {this._stoppedValue = this._oscillator.getInitialValue(), this._stoppedSignal.value = this._stoppedValue;} }, { key: "connect", value: function connect(t, e, s) {return (t instanceof no || t instanceof po) && (this.convert = t.convert, this.units = t.units), fo(this, t, e, s), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(or.prototype), "dispose", this).call(this), this._oscillator.dispose(), this._stoppedSignal.dispose(), this._zeros.dispose(), this._scaler.dispose(), this._a2g.dispose(), this._amplitudeGain.dispose(), this.amplitude.dispose(), this;} }, { key: "min", get: function get() {return this._toType(this._scaler.min);}, set: function set(t) {t = this._fromType(t), this._scaler.min = t;} }, { key: "max", get: function get() {return this._toType(this._scaler.max);}, set: function set(t) {t = this._fromType(t), this._scaler.max = t;} }, { key: "type", get: function get() {return this._oscillator.type;}, set: function set(t) {this._oscillator.type = t, this._setStoppedValue();} }, { key: "partials", get: function get() {return this._oscillator.partials;}, set: function set(t) {this._oscillator.partials = t, this._setStoppedValue();} }, { key: "phase", get: function get() {return this._oscillator.phase;}, set: function set(t) {this._oscillator.phase = t, this._setStoppedValue();} }, { key: "units", get: function get() {return this._units;}, set: function set(t) {var e = this.min,s = this.max;this._units = t, this.min = e, this.max = s;} }, { key: "state", get: function get() {return this._oscillator.state;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Uo.getDefaults(), { amplitude: 1, frequency: "4n", max: 1, min: 0, type: "sine", units: "number" });} }]);return or;}(io);function rr(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1 / 0;var s = new WeakMap();return function (n, i) {Reflect.defineProperty(n, i, { configurable: !0, enumerable: !0, get: function get() {return s.get(this);}, set: function set(n) {Un(n, t, e), s.set(this, n);} });};}function ar(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1 / 0;var s = new WeakMap();return function (n, i) {Reflect.defineProperty(n, i, { configurable: !0, enumerable: !0, get: function get() {return s.get(this);}, set: function set(n) {Un(this.toSeconds(n), t, e), s.set(this, n);} });};}var cr = /*#__PURE__*/function (_Io9) {_inherits(cr, _Io9);var _super81 = _createSuper(cr);function cr() {var _this120;_classCallCheck(this, cr);_this120 = _super81.call(this, ui(cr.getDefaults(), arguments, ["url", "onload"])), _this120.name = "Player", _this120._activeSources = new Set();var t = ui(cr.getDefaults(), arguments, ["url", "onload"]);_this120._buffer = new Ri({ onload: _this120._onload.bind(_assertThisInitialized(_this120), t.onload), onerror: t.onerror, reverse: t.reverse, url: t.url }), _this120.autostart = t.autostart, _this120._loop = t.loop, _this120._loopStart = t.loopStart, _this120._loopEnd = t.loopEnd, _this120._playbackRate = t.playbackRate, _this120.fadeIn = t.fadeIn, _this120.fadeOut = t.fadeOut;return _this120;}_createClass(cr, [{ key: "load", value: function load(t) {return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee56() {return _regeneratorRuntime.wrap(function _callee56$(_context56) {while (1) {switch (_context56.prev = _context56.next) {case 0:_context56.next = 2;return this._buffer.load(t);case 2:this._onload();return _context56.abrupt("return", this);case 4:case "end":return _context56.stop();}}}, _callee56, this);}));} }, { key: "_onload", value: function _onload() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Ei;t(), this.autostart && this.start();} }, { key: "_onSourceEnd", value: function _onSourceEnd(t) {this.onstop(this), this._activeSources.delete(t), 0 !== this._activeSources.size || this._synced || "started" !== this._state.getValueAtTime(this.now()) || (this._state.cancel(this.now()), this._state.setStateAtTime("stopped", this.now()));} }, { key: "start", value: function start(t, e, s) {return _get(_getPrototypeOf(cr.prototype), "start", this).call(this, t, e, s), this;} }, { key: "_start", value: function _start(t, e, s) {e = this._loop ? pi(e, this._loopStart) : pi(e, 0);var n = this.toSeconds(e),i = s;s = pi(s, Math.max(this._buffer.duration - n, 0));var o = this.toSeconds(s);o /= this._playbackRate, t = this.toSeconds(t);var r = new Vo({ url: this._buffer, context: this.context, fadeIn: this.fadeIn, fadeOut: this.fadeOut, loop: this._loop, loopEnd: this._loopEnd, loopStart: this._loopStart, onended: this._onSourceEnd.bind(this), playbackRate: this._playbackRate }).connect(this.output);this._loop || this._synced || (this._state.cancel(t + o), this._state.setStateAtTime("stopped", t + o, { implicitEnd: !0 })), this._activeSources.add(r), this._loop && Fn(i) ? r.start(t, n) : r.start(t, n, o - this.toSeconds(this.fadeOut));} }, { key: "_stop", value: function _stop(t) {var e = this.toSeconds(t);this._activeSources.forEach(function (t) {return t.stop(e);});} }, { key: "restart", value: function restart(t, e, s) {return _get(_getPrototypeOf(cr.prototype), "restart", this).call(this, t, e, s), this;} }, { key: "_restart", value: function _restart(t, e, s) {var n;null === (n = _toConsumableArray(this._activeSources).pop()) || void 0 === n || n.stop(t), this._start(t, e, s);} }, { key: "seek", value: function seek(t, e) {var s = this.toSeconds(e);if ("started" === this._state.getValueAtTime(s)) {var _e105 = this.toSeconds(t);this._stop(s), this._start(s, _e105);}return this;} }, { key: "setLoopPoints", value: function setLoopPoints(t, e) {return this.loopStart = t, this.loopEnd = e, this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(cr.prototype), "dispose", this).call(this), this._activeSources.forEach(function (t) {return t.dispose();}), this._activeSources.clear(), this._buffer.dispose(), this;} }, { key: "loopStart", get: function get() {return this._loopStart;}, set: function set(t) {this._loopStart = t, this.buffer.loaded && Un(this.toSeconds(t), 0, this.buffer.duration), this._activeSources.forEach(function (e) {e.loopStart = t;});} }, { key: "loopEnd", get: function get() {return this._loopEnd;}, set: function set(t) {this._loopEnd = t, this.buffer.loaded && Un(this.toSeconds(t), 0, this.buffer.duration), this._activeSources.forEach(function (e) {e.loopEnd = t;});} }, { key: "buffer", get: function get() {return this._buffer;}, set: function set(t) {this._buffer.set(t);} }, { key: "loop", get: function get() {return this._loop;}, set: function set(t) {if (this._loop !== t && (this._loop = t, this._activeSources.forEach(function (e) {e.loop = t;}), t)) {var _t147 = this._state.getNextState("stopped", this.now());_t147 && this._state.cancel(_t147.time);}} }, { key: "playbackRate", get: function get() {return this._playbackRate;}, set: function set(t) {this._playbackRate = t;var e = this.now(),s = this._state.getNextState("stopped", e);s && s.implicitEnd && (this._state.cancel(s.time), this._activeSources.forEach(function (t) {return t.cancelStop();})), this._activeSources.forEach(function (s) {s.playbackRate.setValueAtTime(t, e);});} }, { key: "reverse", get: function get() {return this._buffer.reverse;}, set: function set(t) {this._buffer.reverse = t;} }, { key: "loaded", get: function get() {return this._buffer.loaded;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Io.getDefaults(), { autostart: !1, fadeIn: 0, fadeOut: 0, loop: !1, loopEnd: 0, loopStart: 0, onload: Ei, onerror: Ei, playbackRate: 1, reverse: !1 });} }]);return cr;}(Io);si([ar(0)], cr.prototype, "fadeIn", void 0), si([ar(0)], cr.prototype, "fadeOut", void 0);var hr = /*#__PURE__*/function (_io11) {_inherits(hr, _io11);var _super82 = _createSuper(hr);function hr() {var _this121;_classCallCheck(this, hr);_this121 = _super82.call(this, ui(hr.getDefaults(), arguments, ["urls", "onload"], "urls")), _this121.name = "Players", _this121.input = void 0, _this121._players = new Map();var t = ui(hr.getDefaults(), arguments, ["urls", "onload"], "urls");_this121._volume = _this121.output = new Oo({ context: _this121.context, volume: t.volume }), _this121.volume = _this121._volume.volume, Oi(_assertThisInitialized(_this121), "volume"), _this121._buffers = new wo({ urls: t.urls, onload: t.onload, baseUrl: t.baseUrl, onerror: t.onerror }), _this121.mute = t.mute, _this121._fadeIn = t.fadeIn, _this121._fadeOut = t.fadeOut;return _this121;}_createClass(hr, [{ key: "has", value: function has(t) {return this._buffers.has(t);} }, { key: "player", value: function player(t) {if (Bn(this.has(t), "No Player with the name ".concat(t, " exists on this object")), !this._players.has(t)) {var _e106 = new cr({ context: this.context, fadeIn: this._fadeIn, fadeOut: this._fadeOut, url: this._buffers.get(t) }).connect(this.output);this._players.set(t, _e106);}return this._players.get(t);} }, { key: "add", value: function add(t, e, s) {return Bn(!this._buffers.has(t), "A buffer with that name already exists on this object"), this._buffers.add(t, e, s), this;} }, { key: "stopAll", value: function stopAll(t) {return this._players.forEach(function (e) {return e.stop(t);}), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(hr.prototype), "dispose", this).call(this), this._volume.dispose(), this.volume.dispose(), this._players.forEach(function (t) {return t.dispose();}), this._buffers.dispose(), this;} }, { key: "mute", get: function get() {return this._volume.mute;}, set: function set(t) {this._volume.mute = t;} }, { key: "fadeIn", get: function get() {return this._fadeIn;}, set: function set(t) {this._fadeIn = t, this._players.forEach(function (e) {e.fadeIn = t;});} }, { key: "fadeOut", get: function get() {return this._fadeOut;}, set: function set(t) {this._fadeOut = t, this._players.forEach(function (e) {e.fadeOut = t;});} }, { key: "state", get: function get() {return Array.from(this._players).some(function (_ref80) {var _ref81 = _slicedToArray(_ref80, 2),t = _ref81[0],e = _ref81[1];return "started" === e.state;}) ? "started" : "stopped";} }, { key: "loaded", get: function get() {return this._buffers.loaded;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Io.getDefaults(), { baseUrl: "", fadeIn: 0, fadeOut: 0, mute: !1, onload: Ei, onerror: Ei, urls: {}, volume: 0 });} }]);return hr;}(io);var lr = /*#__PURE__*/function (_Io10) {_inherits(lr, _Io10);var _super83 = _createSuper(lr);function lr() {var _this122;_classCallCheck(this, lr);_this122 = _super83.call(this, ui(lr.getDefaults(), arguments, ["url", "onload"])), _this122.name = "GrainPlayer", _this122._loopStart = 0, _this122._loopEnd = 0, _this122._activeSources = [];var t = ui(lr.getDefaults(), arguments, ["url", "onload"]);_this122.buffer = new Ri({ onload: t.onload, onerror: t.onerror, reverse: t.reverse, url: t.url }), _this122._clock = new vo({ context: _this122.context, callback: _this122._tick.bind(_assertThisInitialized(_this122)), frequency: 1 / t.grainSize }), _this122._playbackRate = t.playbackRate, _this122._grainSize = t.grainSize, _this122._overlap = t.overlap, _this122.detune = t.detune, _this122.overlap = t.overlap, _this122.loop = t.loop, _this122.playbackRate = t.playbackRate, _this122.grainSize = t.grainSize, _this122.loopStart = t.loopStart, _this122.loopEnd = t.loopEnd, _this122.reverse = t.reverse, _this122._clock.on("stop", _this122._onstop.bind(_assertThisInitialized(_this122)));return _this122;}_createClass(lr, [{ key: "_start", value: function _start(t, e, s) {e = pi(e, 0), e = this.toSeconds(e), t = this.toSeconds(t);var n = 1 / this._clock.frequency.getValueAtTime(t);this._clock.start(t, e / n), s && this.stop(t + this.toSeconds(s));} }, { key: "restart", value: function restart(t, e, s) {return _get(_getPrototypeOf(lr.prototype), "restart", this).call(this, t, e, s), this;} }, { key: "_restart", value: function _restart(t, e, s) {this._stop(t), this._start(t, e, s);} }, { key: "_stop", value: function _stop(t) {this._clock.stop(t);} }, { key: "_onstop", value: function _onstop(t) {this._activeSources.forEach(function (e) {e.fadeOut = 0, e.stop(t);}), this.onstop(this);} }, { key: "_tick", value: function _tick(t) {var _this123 = this;var e = this._clock.getTicksAtTime(t),s = e * this._grainSize;if (this.log("offset", s), !this.loop && s > this.buffer.duration) return void this.stop(t);var n = s < this._overlap ? 0 : this._overlap,i = new Vo({ context: this.context, url: this.buffer, fadeIn: n, fadeOut: this._overlap, loop: this.loop, loopStart: this._loopStart, loopEnd: this._loopEnd, playbackRate: zi(this.detune / 100) }).connect(this.output);i.start(t, this._grainSize * e), i.stop(t + this._grainSize / this.playbackRate), this._activeSources.push(i), i.onended = function () {var t = _this123._activeSources.indexOf(i);-1 !== t && _this123._activeSources.splice(t, 1);};} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(lr.prototype), "dispose", this).call(this), this.buffer.dispose(), this._clock.dispose(), this._activeSources.forEach(function (t) {return t.dispose();}), this;} }, { key: "playbackRate", get: function get() {return this._playbackRate;}, set: function set(t) {Un(t, .001), this._playbackRate = t, this.grainSize = this._grainSize;} }, { key: "loopStart", get: function get() {return this._loopStart;}, set: function set(t) {this.buffer.loaded && Un(this.toSeconds(t), 0, this.buffer.duration), this._loopStart = this.toSeconds(t);} }, { key: "loopEnd", get: function get() {return this._loopEnd;}, set: function set(t) {this.buffer.loaded && Un(this.toSeconds(t), 0, this.buffer.duration), this._loopEnd = this.toSeconds(t);} }, { key: "reverse", get: function get() {return this.buffer.reverse;}, set: function set(t) {this.buffer.reverse = t;} }, { key: "grainSize", get: function get() {return this._grainSize;}, set: function set(t) {this._grainSize = this.toSeconds(t), this._clock.frequency.setValueAtTime(this._playbackRate / this._grainSize, this.now());} }, { key: "overlap", get: function get() {return this._overlap;}, set: function set(t) {var e = this.toSeconds(t);Un(e, 0), this._overlap = e;} }, { key: "loaded", get: function get() {return this.buffer.loaded;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Io.getDefaults(), { onload: Ei, onerror: Ei, overlap: .1, grainSize: .2, playbackRate: 1, detune: 0, loop: !1, loopStart: 0, loopEnd: 0, reverse: !1 });} }]);return lr;}(Io);var ur = /*#__PURE__*/function (_Go5) {_inherits(ur, _Go5);var _super84 = _createSuper(ur);function ur() {var _this124;_classCallCheck(this, ur);_this124 = _super84.apply(this, arguments), _this124.name = "Abs", _this124._abs = new Qo({ context: _this124.context, mapping: function mapping(t) {return Math.abs(t) < .001 ? 0 : Math.abs(t);} }), _this124.input = _this124._abs, _this124.output = _this124._abs;return _this124;}_createClass(ur, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(ur.prototype), "dispose", this).call(this), this._abs.dispose(), this;} }]);return ur;}(Go);var pr = /*#__PURE__*/function (_Go6) {_inherits(pr, _Go6);var _super85 = _createSuper(pr);function pr() {var _this125;_classCallCheck(this, pr);_this125 = _super85.apply(this, arguments), _this125.name = "GainToAudio", _this125._norm = new Qo({ context: _this125.context, mapping: function mapping(t) {return 2 * Math.abs(t) - 1;} }), _this125.input = _this125._norm, _this125.output = _this125._norm;return _this125;}_createClass(pr, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(pr.prototype), "dispose", this).call(this), this._norm.dispose(), this;} }]);return pr;}(Go);var dr = /*#__PURE__*/function (_Go7) {_inherits(dr, _Go7);var _super86 = _createSuper(dr);function dr() {var _this126;_classCallCheck(this, dr);_this126 = _super86.apply(this, arguments), _this126.name = "Negate", _this126._multiply = new Xo({ context: _this126.context, value: -1 }), _this126.input = _this126._multiply, _this126.output = _this126._multiply;return _this126;}_createClass(dr, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(dr.prototype), "dispose", this).call(this), this._multiply.dispose(), this;} }]);return dr;}(Go);var fr = /*#__PURE__*/function (_po4) {_inherits(fr, _po4);var _super87 = _createSuper(fr);function fr() {var _this127;_classCallCheck(this, fr);_this127 = _super87.call(this, Object.assign(ui(fr.getDefaults(), arguments, ["value"]))), _this127.override = !1, _this127.name = "Subtract", _this127._sum = new ho({ context: _this127.context }), _this127.input = _this127._sum, _this127.output = _this127._sum, _this127._neg = new dr({ context: _this127.context }), _this127.subtrahend = _this127._param, oo(_this127._constantSource, _this127._neg, _this127._sum);return _this127;}_createClass(fr, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(fr.prototype), "dispose", this).call(this), this._neg.dispose(), this._sum.dispose(), this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(po.getDefaults(), { value: 0 });} }]);return fr;}(po);var _r = /*#__PURE__*/function (_Go8) {_inherits(_r, _Go8);var _super88 = _createSuper(_r);function _r() {var _this128;_classCallCheck(this, _r);_this128 = _super88.call(this, Object.assign(ui(_r.getDefaults(), arguments))), _this128.name = "GreaterThanZero", _this128._thresh = _this128.output = new Qo({ context: _this128.context, length: 127, mapping: function mapping(t) {return t <= 0 ? 0 : 1;} }), _this128._scale = _this128.input = new Xo({ context: _this128.context, value: 1e4 }), _this128._scale.connect(_this128._thresh);return _this128;}_createClass(_r, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(_r.prototype), "dispose", this).call(this), this._scale.dispose(), this._thresh.dispose(), this;} }]);return _r;}(Go);var mr = /*#__PURE__*/function (_po5) {_inherits(mr, _po5);var _super89 = _createSuper(mr);function mr() {var _this129;_classCallCheck(this, mr);_this129 = _super89.call(this, Object.assign(ui(mr.getDefaults(), arguments, ["value"]))), _this129.name = "GreaterThan", _this129.override = !1;var t = ui(mr.getDefaults(), arguments, ["value"]);_this129._subtract = _this129.input = new fr({ context: _this129.context, value: t.value }), _this129._gtz = _this129.output = new _r({ context: _this129.context }), _this129.comparator = _this129._param = _this129._subtract.subtrahend, Oi(_assertThisInitialized(_this129), "comparator"), _this129._subtract.connect(_this129._gtz);return _this129;}_createClass(mr, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(mr.prototype), "dispose", this).call(this), this._gtz.dispose(), this._subtract.dispose(), this.comparator.dispose(), this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(po.getDefaults(), { value: 0 });} }]);return mr;}(po);var gr = /*#__PURE__*/function (_Go9) {_inherits(gr, _Go9);var _super90 = _createSuper(gr);function gr() {var _this130;_classCallCheck(this, gr);_this130 = _super90.call(this, Object.assign(ui(gr.getDefaults(), arguments, ["value"]))), _this130.name = "Pow";var t = ui(gr.getDefaults(), arguments, ["value"]);_this130._exponentScaler = _this130.input = _this130.output = new Qo({ context: _this130.context, mapping: _this130._expFunc(t.value), length: 8192 }), _this130._exponent = t.value;return _this130;}_createClass(gr, [{ key: "_expFunc", value: function _expFunc(t) {return function (e) {return Math.pow(Math.abs(e), t);};} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(gr.prototype), "dispose", this).call(this), this._exponentScaler.dispose(), this;} }, { key: "value", get: function get() {return this._exponent;}, set: function set(t) {this._exponent = t, this._exponentScaler.setMap(this._expFunc(this._exponent));} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Go.getDefaults(), { value: 1 });} }]);return gr;}(Go);var vr = /*#__PURE__*/function (_nr) {_inherits(vr, _nr);var _super91 = _createSuper(vr);function vr() {var _this131;_classCallCheck(this, vr);_this131 = _super91.call(this, Object.assign(ui(vr.getDefaults(), arguments, ["min", "max", "exponent"]))), _this131.name = "ScaleExp";var t = ui(vr.getDefaults(), arguments, ["min", "max", "exponent"]);_this131.input = _this131._exp = new gr({ context: _this131.context, value: t.exponent }), _this131._exp.connect(_this131._mult);return _this131;}_createClass(vr, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(vr.prototype), "dispose", this).call(this), this._exp.dispose(), this;} }, { key: "exponent", get: function get() {return this._exp.value;}, set: function set(t) {this._exp.value = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(nr.getDefaults(), { exponent: 1 });} }]);return vr;}(nr);var yr = /*#__PURE__*/function (_po6) {_inherits(yr, _po6);var _super92 = _createSuper(yr);function yr() {var _this132;_classCallCheck(this, yr);_this132 = _super92.call(this, ui(po.getDefaults(), arguments, ["value", "units"])), _this132.name = "SyncedSignal", _this132.override = !1;var t = ui(po.getDefaults(), arguments, ["value", "units"]);_this132._lastVal = t.value, _this132._synced = _this132.context.transport.scheduleRepeat(_this132._onTick.bind(_assertThisInitialized(_this132)), "1i"), _this132._syncedCallback = _this132._anchorValue.bind(_assertThisInitialized(_this132)), _this132.context.transport.on("start", _this132._syncedCallback), _this132.context.transport.on("pause", _this132._syncedCallback), _this132.context.transport.on("stop", _this132._syncedCallback), _this132._constantSource.disconnect(), _this132._constantSource.stop(0), _this132._constantSource = _this132.output = new uo({ context: _this132.context, offset: t.value, units: t.units }).start(0), _this132.setValueAtTime(t.value, 0);return _this132;}_createClass(yr, [{ key: "_onTick", value: function _onTick(t) {var e = _get(_getPrototypeOf(yr.prototype), "getValueAtTime", this).call(this, this.context.transport.seconds);this._lastVal !== e && (this._lastVal = e, this._constantSource.offset.setValueAtTime(e, t));} }, { key: "_anchorValue", value: function _anchorValue(t) {var e = _get(_getPrototypeOf(yr.prototype), "getValueAtTime", this).call(this, this.context.transport.seconds);this._lastVal = e, this._constantSource.offset.cancelAndHoldAtTime(t), this._constantSource.offset.setValueAtTime(e, t);} }, { key: "getValueAtTime", value: function getValueAtTime(t) {var e = new Ki(this.context, t).toSeconds();return _get(_getPrototypeOf(yr.prototype), "getValueAtTime", this).call(this, e);} }, { key: "setValueAtTime", value: function setValueAtTime(t, e) {var s = new Ki(this.context, e).toSeconds();return _get(_getPrototypeOf(yr.prototype), "setValueAtTime", this).call(this, t, s), this;} }, { key: "linearRampToValueAtTime", value: function linearRampToValueAtTime(t, e) {var s = new Ki(this.context, e).toSeconds();return _get(_getPrototypeOf(yr.prototype), "linearRampToValueAtTime", this).call(this, t, s), this;} }, { key: "exponentialRampToValueAtTime", value: function exponentialRampToValueAtTime(t, e) {var s = new Ki(this.context, e).toSeconds();return _get(_getPrototypeOf(yr.prototype), "exponentialRampToValueAtTime", this).call(this, t, s), this;} }, { key: "setTargetAtTime", value: function setTargetAtTime(t, e, s) {var n = new Ki(this.context, e).toSeconds();return _get(_getPrototypeOf(yr.prototype), "setTargetAtTime", this).call(this, t, n, s), this;} }, { key: "cancelScheduledValues", value: function cancelScheduledValues(t) {var e = new Ki(this.context, t).toSeconds();return _get(_getPrototypeOf(yr.prototype), "cancelScheduledValues", this).call(this, e), this;} }, { key: "setValueCurveAtTime", value: function setValueCurveAtTime(t, e, s, n) {var i = new Ki(this.context, e).toSeconds();return s = this.toSeconds(s), _get(_getPrototypeOf(yr.prototype), "setValueCurveAtTime", this).call(this, t, i, s, n), this;} }, { key: "cancelAndHoldAtTime", value: function cancelAndHoldAtTime(t) {var e = new Ki(this.context, t).toSeconds();return _get(_getPrototypeOf(yr.prototype), "cancelAndHoldAtTime", this).call(this, e), this;} }, { key: "setRampPoint", value: function setRampPoint(t) {var e = new Ki(this.context, t).toSeconds();return _get(_getPrototypeOf(yr.prototype), "setRampPoint", this).call(this, e), this;} }, { key: "exponentialRampTo", value: function exponentialRampTo(t, e, s) {var n = new Ki(this.context, s).toSeconds();return _get(_getPrototypeOf(yr.prototype), "exponentialRampTo", this).call(this, t, e, n), this;} }, { key: "linearRampTo", value: function linearRampTo(t, e, s) {var n = new Ki(this.context, s).toSeconds();return _get(_getPrototypeOf(yr.prototype), "linearRampTo", this).call(this, t, e, n), this;} }, { key: "targetRampTo", value: function targetRampTo(t, e, s) {var n = new Ki(this.context, s).toSeconds();return _get(_getPrototypeOf(yr.prototype), "targetRampTo", this).call(this, t, e, n), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(yr.prototype), "dispose", this).call(this), this.context.transport.clear(this._synced), this.context.transport.off("start", this._syncedCallback), this.context.transport.off("pause", this._syncedCallback), this.context.transport.off("stop", this._syncedCallback), this._constantSource.dispose(), this;} }]);return yr;}(po);var xr = /*#__PURE__*/function (_io12) {_inherits(xr, _io12);var _super93 = _createSuper(xr);function xr() {var _this133;_classCallCheck(this, xr);_this133 = _super93.call(this, ui(xr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"])), _this133.name = "Envelope", _this133._sig = new po({ context: _this133.context, value: 0 }), _this133.output = _this133._sig, _this133.input = void 0;var t = ui(xr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"]);_this133.attack = t.attack, _this133.decay = t.decay, _this133.sustain = t.sustain, _this133.release = t.release, _this133.attackCurve = t.attackCurve, _this133.releaseCurve = t.releaseCurve, _this133.decayCurve = t.decayCurve;return _this133;}_createClass(xr, [{ key: "_getCurve", value: function _getCurve(t, e) {if (zn(t)) return t;{var _s72;for (_s72 in wr) {if (wr[_s72][e] === t) return _s72;}return t;}} }, { key: "_setCurve", value: function _setCurve(t, e, s) {if (zn(s) && Reflect.has(wr, s)) {var _n39 = wr[s];Pn(_n39) ? "_decayCurve" !== t && (this[t] = _n39[e]) : this[t] = _n39;} else {if (!Ln(s) || "_decayCurve" === t) throw new Error("Envelope: invalid curve: " + s);this[t] = s;}} }, { key: "triggerAttack", value: function triggerAttack(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;this.log("triggerAttack", t, e), t = this.toSeconds(t);var s = this.toSeconds(this.attack);var n = this.toSeconds(this.decay),i = this.getValueAtTime(t);if (i > 0 && (s = (1 - i) / (1 / s)), s < this.sampleTime) this._sig.cancelScheduledValues(t), this._sig.setValueAtTime(e, t);else if ("linear" === this._attackCurve) this._sig.linearRampTo(e, s, t);else if ("exponential" === this._attackCurve) this._sig.targetRampTo(e, s, t);else {this._sig.cancelAndHoldAtTime(t);var _n40 = this._attackCurve;for (var _t148 = 1; _t148 < _n40.length; _t148++) {if (_n40[_t148 - 1] <= i && i <= _n40[_t148]) {_n40 = this._attackCurve.slice(_t148), _n40[0] = i;break;}}this._sig.setValueCurveAtTime(_n40, t, s, e);}if (n && this.sustain < 1) {var _i28 = e * this.sustain,_o24 = t + s;this.log("decay", _o24), "linear" === this._decayCurve ? this._sig.linearRampToValueAtTime(_i28, n + _o24) : this._sig.exponentialApproachValueAtTime(_i28, _o24, n);}return this;} }, { key: "triggerRelease", value: function triggerRelease(t) {this.log("triggerRelease", t), t = this.toSeconds(t);var e = this.getValueAtTime(t);if (e > 0) {var _s73 = this.toSeconds(this.release);_s73 < this.sampleTime ? this._sig.setValueAtTime(0, t) : "linear" === this._releaseCurve ? this._sig.linearRampTo(0, _s73, t) : "exponential" === this._releaseCurve ? this._sig.targetRampTo(0, _s73, t) : (Bn(Ln(this._releaseCurve), "releaseCurve must be either 'linear', 'exponential' or an array"), this._sig.cancelAndHoldAtTime(t), this._sig.setValueCurveAtTime(this._releaseCurve, t, _s73, e));}return this;} }, { key: "getValueAtTime", value: function getValueAtTime(t) {return this._sig.getValueAtTime(t);} }, { key: "triggerAttackRelease", value: function triggerAttackRelease(t, e) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;return e = this.toSeconds(e), this.triggerAttack(e, s), this.triggerRelease(e + this.toSeconds(t)), this;} }, { key: "cancel", value: function cancel(t) {return this._sig.cancelScheduledValues(this.toSeconds(t)), this;} }, { key: "connect", value: function connect(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;return fo(this, t, e, s), this;} }, { key: "asArray", value: function asArray() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1024;return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee57() {var e, s, n, i, o, r, a;return _regeneratorRuntime.wrap(function _callee57$(_context57) {while (1) {switch (_context57.prev = _context57.next) {case 0:e = t / this.context.sampleRate, s = new qi(1, e, this.context.sampleRate), n = this.toSeconds(this.attack) + this.toSeconds(this.decay), i = n + this.toSeconds(this.release), o = .1 * i, r = i + o, a = new this.constructor(Object.assign(this.get(), { attack: e * this.toSeconds(this.attack) / r, decay: e * this.toSeconds(this.decay) / r, release: e * this.toSeconds(this.release) / r, context: s }));a._sig.toDestination();a.triggerAttackRelease(e * (n + o) / r, 0);_context57.next = 5;return s.render();case 5:return _context57.abrupt("return", _context57.sent.getChannelData(0));case 6:case "end":return _context57.stop();}}}, _callee57, this);}));} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(xr.prototype), "dispose", this).call(this), this._sig.dispose(), this;} }, { key: "value", get: function get() {return this.getValueAtTime(this.now());} }, { key: "attackCurve", get: function get() {return this._getCurve(this._attackCurve, "In");}, set: function set(t) {this._setCurve("_attackCurve", "In", t);} }, { key: "releaseCurve", get: function get() {return this._getCurve(this._releaseCurve, "Out");}, set: function set(t) {this._setCurve("_releaseCurve", "Out", t);} }, { key: "decayCurve", get: function get() {return this._decayCurve;}, set: function set(t) {Bn(["linear", "exponential"].some(function (e) {return e === t;}), "Invalid envelope curve: ".concat(t)), this._decayCurve = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { attack: .01, attackCurve: "linear", decay: .1, decayCurve: "exponential", release: 1, releaseCurve: "exponential", sustain: .5 });} }]);return xr;}(io);si([ar(0)], xr.prototype, "attack", void 0), si([ar(0)], xr.prototype, "decay", void 0), si([rr(0, 1)], xr.prototype, "sustain", void 0), si([ar(0)], xr.prototype, "release", void 0);var wr = function () {var t = 128;var e, s;var n = [];for (e = 0; e < t; e++) {n[e] = Math.sin(e / 127 * (Math.PI / 2));}var i = [];for (e = 0; e < 127; e++) {s = e / 127;var _t149 = Math.sin(s * (2 * Math.PI) * 6.4 - Math.PI / 2) + 1;i[e] = _t149 / 10 + .83 * s;}i[127] = 1;var o = [];for (e = 0; e < t; e++) {o[e] = Math.ceil(e / 127 * 5) / 5;}var r = [];for (e = 0; e < t; e++) {s = e / 127, r[e] = .5 * (1 - Math.cos(Math.PI * s));}var a = [];for (e = 0; e < t; e++) {s = e / 127;var _t150 = 4 * Math.pow(s, 3) + .2,_n41 = Math.cos(_t150 * Math.PI * 2 * s);a[e] = Math.abs(_n41 * (1 - s));}function c(t) {var e = new Array(t.length);for (var _s74 = 0; _s74 < t.length; _s74++) {e[_s74] = 1 - t[_s74];}return e;}return { bounce: { In: c(a), Out: a }, cosine: { In: n, Out: (h = n, h.slice(0).reverse()) }, exponential: "exponential", linear: "linear", ripple: { In: i, Out: c(i) }, sine: { In: r, Out: c(r) }, step: { In: o, Out: c(o) } };var h;}();var br = /*#__PURE__*/function (_io13) {_inherits(br, _io13);var _super94 = _createSuper(br);function br() {var _this134;_classCallCheck(this, br);_this134 = _super94.call(this, ui(br.getDefaults(), arguments)), _this134._scheduledEvents = [], _this134._synced = !1, _this134._original_triggerAttack = _this134.triggerAttack, _this134._original_triggerRelease = _this134.triggerRelease, _this134._syncedRelease = function (t) {return _this134._original_triggerRelease(t);};var t = ui(br.getDefaults(), arguments);_this134._volume = _this134.output = new Oo({ context: _this134.context, volume: t.volume }), _this134.volume = _this134._volume.volume, Oi(_assertThisInitialized(_this134), "volume");return _this134;}_createClass(br, [{ key: "sync", value: function sync() {return this._syncState() && (this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 0), this.context.transport.on("stop", this._syncedRelease), this.context.transport.on("pause", this._syncedRelease), this.context.transport.on("loopEnd", this._syncedRelease)), this;} }, { key: "_syncState", value: function _syncState() {var t = !1;return this._synced || (this._synced = !0, t = !0), t;} }, { key: "_syncMethod", value: function _syncMethod(t, e) {var _this135 = this;var s = this["_original_" + t] = this[t];this[t] = function () {for (var _len20 = arguments.length, t = new Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {t[_key20] = arguments[_key20];}var n = t[e],i = _this135.context.transport.schedule(function (n) {t[e] = n, s.apply(_this135, t);}, n);_this135._scheduledEvents.push(i);};} }, { key: "unsync", value: function unsync() {var _this136 = this;return this._scheduledEvents.forEach(function (t) {return _this136.context.transport.clear(t);}), this._scheduledEvents = [], this._synced && (this._synced = !1, this.triggerAttack = this._original_triggerAttack, this.triggerRelease = this._original_triggerRelease, this.context.transport.off("stop", this._syncedRelease), this.context.transport.off("pause", this._syncedRelease), this.context.transport.off("loopEnd", this._syncedRelease)), this;} }, { key: "triggerAttackRelease", value: function triggerAttackRelease(t, e, s, n) {var i = this.toSeconds(s),o = this.toSeconds(e);return this.triggerAttack(t, i, n), this.triggerRelease(i + o), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(br.prototype), "dispose", this).call(this), this._volume.dispose(), this.unsync(), this._scheduledEvents = [], this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { volume: 0 });} }]);return br;}(io);var Tr = /*#__PURE__*/function (_br) {_inherits(Tr, _br);var _super95 = _createSuper(Tr);function Tr() {var _this137;_classCallCheck(this, Tr);_this137 = _super95.call(this, ui(Tr.getDefaults(), arguments));var t = ui(Tr.getDefaults(), arguments);_this137.portamento = t.portamento, _this137.onsilence = t.onsilence;return _this137;}_createClass(Tr, [{ key: "triggerAttack", value: function triggerAttack(t, e) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;this.log("triggerAttack", t, e, s);var n = this.toSeconds(e);return this._triggerEnvelopeAttack(n, s), this.setNote(t, n), this;} }, { key: "triggerRelease", value: function triggerRelease(t) {this.log("triggerRelease", t);var e = this.toSeconds(t);return this._triggerEnvelopeRelease(e), this;} }, { key: "setNote", value: function setNote(t, e) {var s = this.toSeconds(e),n = t instanceof Yi ? t.toFrequency() : t;if (this.portamento > 0 && this.getLevelAtTime(s) > .05) {var _t151 = this.toSeconds(this.portamento);this.frequency.exponentialRampTo(n, _t151, s);} else this.frequency.setValueAtTime(n, s);return this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(br.getDefaults(), { detune: 0, onsilence: Ei, portamento: 0 });} }]);return Tr;}(br);si([ar(0)], Tr.prototype, "portamento", void 0);var Sr = /*#__PURE__*/function (_xr) {_inherits(Sr, _xr);var _super96 = _createSuper(Sr);function Sr() {var _this138;_classCallCheck(this, Sr);_this138 = _super96.call(this, ui(Sr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"])), _this138.name = "AmplitudeEnvelope", _this138._gainNode = new ho({ context: _this138.context, gain: 0 }), _this138.output = _this138._gainNode, _this138.input = _this138._gainNode, _this138._sig.connect(_this138._gainNode.gain), _this138.output = _this138._gainNode, _this138.input = _this138._gainNode;return _this138;}_createClass(Sr, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Sr.prototype), "dispose", this).call(this), this._gainNode.dispose(), this;} }]);return Sr;}(xr);var kr = /*#__PURE__*/function (_Tr) {_inherits(kr, _Tr);var _super97 = _createSuper(kr);function kr() {var _this139;_classCallCheck(this, kr);_this139 = _super97.call(this, ui(kr.getDefaults(), arguments)), _this139.name = "Synth";var t = ui(kr.getDefaults(), arguments);_this139.oscillator = new er(Object.assign({ context: _this139.context, detune: t.detune, onstop: function onstop() {return _this139.onsilence(_assertThisInitialized(_this139));} }, t.oscillator)), _this139.frequency = _this139.oscillator.frequency, _this139.detune = _this139.oscillator.detune, _this139.envelope = new Sr(Object.assign({ context: _this139.context }, t.envelope)), _this139.oscillator.chain(_this139.envelope, _this139.output), Oi(_assertThisInitialized(_this139), ["oscillator", "frequency", "detune", "envelope"]);return _this139;}_createClass(kr, [{ key: "_triggerEnvelopeAttack", value: function _triggerEnvelopeAttack(t, e) {if (this.envelope.triggerAttack(t, e), this.oscillator.start(t), 0 === this.envelope.sustain) {var _e107 = this.toSeconds(this.envelope.attack),_s75 = this.toSeconds(this.envelope.decay);this.oscillator.stop(t + _e107 + _s75);}} }, { key: "_triggerEnvelopeRelease", value: function _triggerEnvelopeRelease(t) {this.envelope.triggerRelease(t), this.oscillator.stop(t + this.toSeconds(this.envelope.release));} }, { key: "getLevelAtTime", value: function getLevelAtTime(t) {return t = this.toSeconds(t), this.envelope.getValueAtTime(t);} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(kr.prototype), "dispose", this).call(this), this.oscillator.dispose(), this.envelope.dispose(), this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Tr.getDefaults(), { envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), { attack: .005, decay: .1, release: 1, sustain: .3 }), oscillator: Object.assign(di(er.getDefaults(), [].concat(_toConsumableArray(Object.keys(Io.getDefaults())), ["frequency", "detune"])), { type: "triangle" }) });} }]);return kr;}(Tr);var Ar = /*#__PURE__*/function (_Tr2) {_inherits(Ar, _Tr2);var _super98 = _createSuper(Ar);function Ar() {var _this140;_classCallCheck(this, Ar);_this140 = _super98.call(this, ui(Ar.getDefaults(), arguments)), _this140.name = "ModulationSynth";var t = ui(Ar.getDefaults(), arguments);_this140._carrier = new kr({ context: _this140.context, oscillator: t.oscillator, envelope: t.envelope, onsilence: function onsilence() {return _this140.onsilence(_assertThisInitialized(_this140));}, volume: -10 }), _this140._modulator = new kr({ context: _this140.context, oscillator: t.modulation, envelope: t.modulationEnvelope, volume: -10 }), _this140.oscillator = _this140._carrier.oscillator, _this140.envelope = _this140._carrier.envelope, _this140.modulation = _this140._modulator.oscillator, _this140.modulationEnvelope = _this140._modulator.envelope, _this140.frequency = new po({ context: _this140.context, units: "frequency" }), _this140.detune = new po({ context: _this140.context, value: t.detune, units: "cents" }), _this140.harmonicity = new Xo({ context: _this140.context, value: t.harmonicity, minValue: 0 }), _this140._modulationNode = new ho({ context: _this140.context, gain: 0 }), Oi(_assertThisInitialized(_this140), ["frequency", "harmonicity", "oscillator", "envelope", "modulation", "modulationEnvelope", "detune"]);return _this140;}_createClass(Ar, [{ key: "_triggerEnvelopeAttack", value: function _triggerEnvelopeAttack(t, e) {this._carrier._triggerEnvelopeAttack(t, e), this._modulator._triggerEnvelopeAttack(t, e);} }, { key: "_triggerEnvelopeRelease", value: function _triggerEnvelopeRelease(t) {return this._carrier._triggerEnvelopeRelease(t), this._modulator._triggerEnvelopeRelease(t), this;} }, { key: "getLevelAtTime", value: function getLevelAtTime(t) {return t = this.toSeconds(t), this.envelope.getValueAtTime(t);} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Ar.prototype), "dispose", this).call(this), this._carrier.dispose(), this._modulator.dispose(), this.frequency.dispose(), this.detune.dispose(), this.harmonicity.dispose(), this._modulationNode.dispose(), this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Tr.getDefaults(), { harmonicity: 3, oscillator: Object.assign(di(er.getDefaults(), [].concat(_toConsumableArray(Object.keys(Io.getDefaults())), ["frequency", "detune"])), { type: "sine" }), envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), { attack: .01, decay: .01, sustain: 1, release: .5 }), modulation: Object.assign(di(er.getDefaults(), [].concat(_toConsumableArray(Object.keys(Io.getDefaults())), ["frequency", "detune"])), { type: "square" }), modulationEnvelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), { attack: .5, decay: 0, sustain: 1, release: .5 }) });} }]);return Ar;}(Tr);var Cr = /*#__PURE__*/function (_Ar) {_inherits(Cr, _Ar);var _super99 = _createSuper(Cr);function Cr() {var _this141;_classCallCheck(this, Cr);_this141 = _super99.call(this, ui(Cr.getDefaults(), arguments)), _this141.name = "AMSynth", _this141._modulationScale = new Zo({ context: _this141.context }), _this141.frequency.connect(_this141._carrier.frequency), _this141.frequency.chain(_this141.harmonicity, _this141._modulator.frequency), _this141.detune.fan(_this141._carrier.detune, _this141._modulator.detune), _this141._modulator.chain(_this141._modulationScale, _this141._modulationNode.gain), _this141._carrier.chain(_this141._modulationNode, _this141.output);return _this141;}_createClass(Cr, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Cr.prototype), "dispose", this).call(this), this._modulationScale.dispose(), this;} }]);return Cr;}(Ar);var Dr = /*#__PURE__*/function (_io14) {_inherits(Dr, _io14);var _super100 = _createSuper(Dr);function Dr() {var _this142;_classCallCheck(this, Dr);_this142 = _super100.call(this, ui(Dr.getDefaults(), arguments, ["frequency", "type"])), _this142.name = "BiquadFilter";var t = ui(Dr.getDefaults(), arguments, ["frequency", "type"]);_this142._filter = _this142.context.createBiquadFilter(), _this142.input = _this142.output = _this142._filter, _this142.Q = new no({ context: _this142.context, units: "number", value: t.Q, param: _this142._filter.Q }), _this142.frequency = new no({ context: _this142.context, units: "frequency", value: t.frequency, param: _this142._filter.frequency }), _this142.detune = new no({ context: _this142.context, units: "cents", value: t.detune, param: _this142._filter.detune }), _this142.gain = new no({ context: _this142.context, units: "decibels", convert: !1, value: t.gain, param: _this142._filter.gain }), _this142.type = t.type;return _this142;}_createClass(Dr, [{ key: "getFrequencyResponse", value: function getFrequencyResponse() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 128;var e = new Float32Array(t);for (var _s76 = 0; _s76 < t; _s76++) {var _n42 = 19980 * Math.pow(_s76 / t, 2) + 20;e[_s76] = _n42;}var s = new Float32Array(t),n = new Float32Array(t),i = this.context.createBiquadFilter();return i.type = this.type, i.Q.value = this.Q.value, i.frequency.value = this.frequency.value, i.gain.value = this.gain.value, i.getFrequencyResponse(e, s, n), s;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Dr.prototype), "dispose", this).call(this), this._filter.disconnect(), this.Q.dispose(), this.frequency.dispose(), this.gain.dispose(), this.detune.dispose(), this;} }, { key: "type", get: function get() {return this._filter.type;}, set: function set(t) {Bn(-1 !== ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"].indexOf(t), "Invalid filter type: ".concat(t)), this._filter.type = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { Q: 1, type: "lowpass", frequency: 350, detune: 0, gain: 0 });} }]);return Dr;}(io);var Or = /*#__PURE__*/function (_io15) {_inherits(Or, _io15);var _super101 = _createSuper(Or);function Or() {var _this143;_classCallCheck(this, Or);_this143 = _super101.call(this, ui(Or.getDefaults(), arguments, ["frequency", "type", "rolloff"])), _this143.name = "Filter", _this143.input = new ho({ context: _this143.context }), _this143.output = new ho({ context: _this143.context }), _this143._filters = [];var t = ui(Or.getDefaults(), arguments, ["frequency", "type", "rolloff"]);_this143._filters = [], _this143.Q = new po({ context: _this143.context, units: "positive", value: t.Q }), _this143.frequency = new po({ context: _this143.context, units: "frequency", value: t.frequency }), _this143.detune = new po({ context: _this143.context, units: "cents", value: t.detune }), _this143.gain = new po({ context: _this143.context, units: "decibels", convert: !1, value: t.gain }), _this143._type = t.type, _this143.rolloff = t.rolloff, Oi(_assertThisInitialized(_this143), ["detune", "frequency", "gain", "Q"]);return _this143;}_createClass(Or, [{ key: "getFrequencyResponse", value: function getFrequencyResponse() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 128;var e = new Dr({ frequency: this.frequency.value, gain: this.gain.value, Q: this.Q.value, type: this._type, detune: this.detune.value }),s = new Float32Array(t).map(function () {return 1;});return this._filters.forEach(function () {e.getFrequencyResponse(t).forEach(function (t, e) {return s[e] *= t;});}), e.dispose(), s;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Or.prototype), "dispose", this).call(this), this._filters.forEach(function (t) {t.dispose();}), Mi(this, ["detune", "frequency", "gain", "Q"]), this.frequency.dispose(), this.Q.dispose(), this.detune.dispose(), this.gain.dispose(), this;} }, { key: "type", get: function get() {return this._type;}, set: function set(t) {Bn(-1 !== ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"].indexOf(t), "Invalid filter type: ".concat(t)), this._type = t, this._filters.forEach(function (e) {return e.type = t;});} }, { key: "rolloff", get: function get() {return this._rolloff;}, set: function set(t) {var e = Nn(t) ? t : parseInt(t, 10),s = [-12, -24, -48, -96];var n = s.indexOf(e);Bn(-1 !== n, "rolloff can only be ".concat(s.join(", "))), n += 1, this._rolloff = e, this.input.disconnect(), this._filters.forEach(function (t) {return t.disconnect();}), this._filters = new Array(n);for (var _t152 = 0; _t152 < n; _t152++) {var _e108 = new Dr({ context: this.context });_e108.type = this._type, this.frequency.connect(_e108.frequency), this.detune.connect(_e108.detune), this.Q.connect(_e108.Q), this.gain.connect(_e108.gain), this._filters[_t152] = _e108;}this._internalChannels = this._filters, oo.apply(void 0, [this.input].concat(_toConsumableArray(this._internalChannels), [this.output]));} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { Q: 1, detune: 0, frequency: 350, gain: 0, rolloff: -12, type: "lowpass" });} }]);return Or;}(io);var Mr = /*#__PURE__*/function (_xr2) {_inherits(Mr, _xr2);var _super102 = _createSuper(Mr);function Mr() {var _this144;_classCallCheck(this, Mr);_this144 = _super102.call(this, ui(Mr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"])), _this144.name = "FrequencyEnvelope";var t = ui(Mr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"]);_this144._octaves = t.octaves, _this144._baseFrequency = _this144.toFrequency(t.baseFrequency), _this144._exponent = _this144.input = new gr({ context: _this144.context, value: t.exponent }), _this144._scale = _this144.output = new nr({ context: _this144.context, min: _this144._baseFrequency, max: _this144._baseFrequency * Math.pow(2, _this144._octaves) }), _this144._sig.chain(_this144._exponent, _this144._scale);return _this144;}_createClass(Mr, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Mr.prototype), "dispose", this).call(this), this._exponent.dispose(), this._scale.dispose(), this;} }, { key: "baseFrequency", get: function get() {return this._baseFrequency;}, set: function set(t) {var e = this.toFrequency(t);Un(e, 0), this._baseFrequency = e, this._scale.min = this._baseFrequency, this.octaves = this._octaves;} }, { key: "octaves", get: function get() {return this._octaves;}, set: function set(t) {this._octaves = t, this._scale.max = this._baseFrequency * Math.pow(2, t);} }, { key: "exponent", get: function get() {return this._exponent.value;}, set: function set(t) {this._exponent.value = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(xr.getDefaults(), { baseFrequency: 200, exponent: 1, octaves: 4 });} }]);return Mr;}(xr);var Er = /*#__PURE__*/function (_Tr3) {_inherits(Er, _Tr3);var _super103 = _createSuper(Er);function Er() {var _this145;_classCallCheck(this, Er);_this145 = _super103.call(this, ui(Er.getDefaults(), arguments)), _this145.name = "MonoSynth";var t = ui(Er.getDefaults(), arguments);_this145.oscillator = new er(Object.assign(t.oscillator, { context: _this145.context, detune: t.detune, onstop: function onstop() {return _this145.onsilence(_assertThisInitialized(_this145));} })), _this145.frequency = _this145.oscillator.frequency, _this145.detune = _this145.oscillator.detune, _this145.filter = new Or(Object.assign(t.filter, { context: _this145.context })), _this145.filterEnvelope = new Mr(Object.assign(t.filterEnvelope, { context: _this145.context })), _this145.envelope = new Sr(Object.assign(t.envelope, { context: _this145.context })), _this145.oscillator.chain(_this145.filter, _this145.envelope, _this145.output), _this145.filterEnvelope.connect(_this145.filter.frequency), Oi(_assertThisInitialized(_this145), ["oscillator", "frequency", "detune", "filter", "filterEnvelope", "envelope"]);return _this145;}_createClass(Er, [{ key: "_triggerEnvelopeAttack", value: function _triggerEnvelopeAttack(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;if (this.envelope.triggerAttack(t, e), this.filterEnvelope.triggerAttack(t), this.oscillator.start(t), 0 === this.envelope.sustain) {var _e109 = this.toSeconds(this.envelope.attack),_s77 = this.toSeconds(this.envelope.decay);this.oscillator.stop(t + _e109 + _s77);}} }, { key: "_triggerEnvelopeRelease", value: function _triggerEnvelopeRelease(t) {this.envelope.triggerRelease(t), this.filterEnvelope.triggerRelease(t), this.oscillator.stop(t + this.toSeconds(this.envelope.release));} }, { key: "getLevelAtTime", value: function getLevelAtTime(t) {return t = this.toSeconds(t), this.envelope.getValueAtTime(t);} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Er.prototype), "dispose", this).call(this), this.oscillator.dispose(), this.envelope.dispose(), this.filterEnvelope.dispose(), this.filter.dispose(), this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Tr.getDefaults(), { envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), { attack: .005, decay: .1, release: 1, sustain: .9 }), filter: Object.assign(di(Or.getDefaults(), Object.keys(io.getDefaults())), { Q: 1, rolloff: -12, type: "lowpass" }), filterEnvelope: Object.assign(di(Mr.getDefaults(), Object.keys(io.getDefaults())), { attack: .6, baseFrequency: 200, decay: .2, exponent: 2, octaves: 3, release: 2, sustain: .5 }), oscillator: Object.assign(di(er.getDefaults(), Object.keys(Io.getDefaults())), { type: "sawtooth" }) });} }]);return Er;}(Tr);var Rr = /*#__PURE__*/function (_Tr4) {_inherits(Rr, _Tr4);var _super104 = _createSuper(Rr);function Rr() {var _this146;_classCallCheck(this, Rr);_this146 = _super104.call(this, ui(Rr.getDefaults(), arguments)), _this146.name = "DuoSynth";var t = ui(Rr.getDefaults(), arguments);_this146.voice0 = new Er(Object.assign(t.voice0, { context: _this146.context, onsilence: function onsilence() {return _this146.onsilence(_assertThisInitialized(_this146));} })), _this146.voice1 = new Er(Object.assign(t.voice1, { context: _this146.context })), _this146.harmonicity = new Xo({ context: _this146.context, units: "positive", value: t.harmonicity }), _this146._vibrato = new or({ frequency: t.vibratoRate, context: _this146.context, min: -50, max: 50 }), _this146._vibrato.start(), _this146.vibratoRate = _this146._vibrato.frequency, _this146._vibratoGain = new ho({ context: _this146.context, units: "normalRange", gain: t.vibratoAmount }), _this146.vibratoAmount = _this146._vibratoGain.gain, _this146.frequency = new po({ context: _this146.context, units: "frequency", value: 440 }), _this146.detune = new po({ context: _this146.context, units: "cents", value: t.detune }), _this146.frequency.connect(_this146.voice0.frequency), _this146.frequency.chain(_this146.harmonicity, _this146.voice1.frequency), _this146._vibrato.connect(_this146._vibratoGain), _this146._vibratoGain.fan(_this146.voice0.detune, _this146.voice1.detune), _this146.detune.fan(_this146.voice0.detune, _this146.voice1.detune), _this146.voice0.connect(_this146.output), _this146.voice1.connect(_this146.output), Oi(_assertThisInitialized(_this146), ["voice0", "voice1", "frequency", "vibratoAmount", "vibratoRate"]);return _this146;}_createClass(Rr, [{ key: "getLevelAtTime", value: function getLevelAtTime(t) {return t = this.toSeconds(t), this.voice0.envelope.getValueAtTime(t) + this.voice1.envelope.getValueAtTime(t);} }, { key: "_triggerEnvelopeAttack", value: function _triggerEnvelopeAttack(t, e) {this.voice0._triggerEnvelopeAttack(t, e), this.voice1._triggerEnvelopeAttack(t, e);} }, { key: "_triggerEnvelopeRelease", value: function _triggerEnvelopeRelease(t) {return this.voice0._triggerEnvelopeRelease(t), this.voice1._triggerEnvelopeRelease(t), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Rr.prototype), "dispose", this).call(this), this.voice0.dispose(), this.voice1.dispose(), this.frequency.dispose(), this.detune.dispose(), this._vibrato.dispose(), this.vibratoRate.dispose(), this._vibratoGain.dispose(), this.harmonicity.dispose(), this;} }], [{ key: "getDefaults", value: function getDefaults() {return li(Tr.getDefaults(), { vibratoAmount: .5, vibratoRate: 5, harmonicity: 1.5, voice0: li(di(Er.getDefaults(), Object.keys(Tr.getDefaults())), { filterEnvelope: { attack: .01, decay: 0, sustain: 1, release: .5 }, envelope: { attack: .01, decay: 0, sustain: 1, release: .5 } }), voice1: li(di(Er.getDefaults(), Object.keys(Tr.getDefaults())), { filterEnvelope: { attack: .01, decay: 0, sustain: 1, release: .5 }, envelope: { attack: .01, decay: 0, sustain: 1, release: .5 } }) });} }]);return Rr;}(Tr);var qr = /*#__PURE__*/function (_Ar2) {_inherits(qr, _Ar2);var _super105 = _createSuper(qr);function qr() {var _this147;_classCallCheck(this, qr);_this147 = _super105.call(this, ui(qr.getDefaults(), arguments)), _this147.name = "FMSynth";var t = ui(qr.getDefaults(), arguments);_this147.modulationIndex = new Xo({ context: _this147.context, value: t.modulationIndex }), _this147.frequency.connect(_this147._carrier.frequency), _this147.frequency.chain(_this147.harmonicity, _this147._modulator.frequency), _this147.frequency.chain(_this147.modulationIndex, _this147._modulationNode), _this147.detune.fan(_this147._carrier.detune, _this147._modulator.detune), _this147._modulator.connect(_this147._modulationNode.gain), _this147._modulationNode.connect(_this147._carrier.frequency), _this147._carrier.connect(_this147.output);return _this147;}_createClass(qr, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(qr.prototype), "dispose", this).call(this), this.modulationIndex.dispose(), this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Ar.getDefaults(), { modulationIndex: 10 });} }]);return qr;}(Ar);var Fr = [1, 1.483, 1.932, 2.546, 2.63, 3.897];var Ir = /*#__PURE__*/function (_Tr5) {_inherits(Ir, _Tr5);var _super106 = _createSuper(Ir);function Ir() {var _this148;_classCallCheck(this, Ir);_this148 = _super106.call(this, ui(Ir.getDefaults(), arguments)), _this148.name = "MetalSynth", _this148._oscillators = [], _this148._freqMultipliers = [];var t = ui(Ir.getDefaults(), arguments);_this148.detune = new po({ context: _this148.context, units: "cents", value: t.detune }), _this148.frequency = new po({ context: _this148.context, units: "frequency" }), _this148._amplitude = new ho({ context: _this148.context, gain: 0 }).connect(_this148.output), _this148._highpass = new Or({ Q: 0, context: _this148.context, type: "highpass" }).connect(_this148._amplitude);for (var _e110 = 0; _e110 < Fr.length; _e110++) {var _s78 = new $o({ context: _this148.context, harmonicity: t.harmonicity, modulationIndex: t.modulationIndex, modulationType: "square", onstop: 0 === _e110 ? function () {return _this148.onsilence(_assertThisInitialized(_this148));} : Ei, type: "square" });_s78.connect(_this148._highpass), _this148._oscillators[_e110] = _s78;var _n43 = new Xo({ context: _this148.context, value: Fr[_e110] });_this148._freqMultipliers[_e110] = _n43, _this148.frequency.chain(_n43, _s78.frequency), _this148.detune.connect(_s78.detune);}_this148._filterFreqScaler = new nr({ context: _this148.context, max: 7e3, min: _this148.toFrequency(t.resonance) }), _this148.envelope = new xr({ attack: t.envelope.attack, attackCurve: "linear", context: _this148.context, decay: t.envelope.decay, release: t.envelope.release, sustain: 0 }), _this148.envelope.chain(_this148._filterFreqScaler, _this148._highpass.frequency), _this148.envelope.connect(_this148._amplitude.gain), _this148._octaves = t.octaves, _this148.octaves = t.octaves;return _this148;}_createClass(Ir, [{ key: "_triggerEnvelopeAttack", value: function _triggerEnvelopeAttack(t) {var _this149 = this;var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;return this.envelope.triggerAttack(t, e), this._oscillators.forEach(function (e) {return e.start(t);}), 0 === this.envelope.sustain && this._oscillators.forEach(function (e) {e.stop(t + _this149.toSeconds(_this149.envelope.attack) + _this149.toSeconds(_this149.envelope.decay));}), this;} }, { key: "_triggerEnvelopeRelease", value: function _triggerEnvelopeRelease(t) {var _this150 = this;return this.envelope.triggerRelease(t), this._oscillators.forEach(function (e) {return e.stop(t + _this150.toSeconds(_this150.envelope.release));}), this;} }, { key: "getLevelAtTime", value: function getLevelAtTime(t) {return t = this.toSeconds(t), this.envelope.getValueAtTime(t);} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Ir.prototype), "dispose", this).call(this), this._oscillators.forEach(function (t) {return t.dispose();}), this._freqMultipliers.forEach(function (t) {return t.dispose();}), this.frequency.dispose(), this.detune.dispose(), this._filterFreqScaler.dispose(), this._amplitude.dispose(), this.envelope.dispose(), this._highpass.dispose(), this;} }, { key: "modulationIndex", get: function get() {return this._oscillators[0].modulationIndex.value;}, set: function set(t) {this._oscillators.forEach(function (e) {return e.modulationIndex.value = t;});} }, { key: "harmonicity", get: function get() {return this._oscillators[0].harmonicity.value;}, set: function set(t) {this._oscillators.forEach(function (e) {return e.harmonicity.value = t;});} }, { key: "resonance", get: function get() {return this._filterFreqScaler.min;}, set: function set(t) {this._filterFreqScaler.min = this.toFrequency(t), this.octaves = this._octaves;} }, { key: "octaves", get: function get() {return this._octaves;}, set: function set(t) {this._octaves = t, this._filterFreqScaler.max = this._filterFreqScaler.min * Math.pow(2, t);} }], [{ key: "getDefaults", value: function getDefaults() {return li(Tr.getDefaults(), { envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), { attack: .001, decay: 1.4, release: .2 }), harmonicity: 5.1, modulationIndex: 32, octaves: 1.5, resonance: 4e3 });} }]);return Ir;}(Tr);var Vr = /*#__PURE__*/function (_kr) {_inherits(Vr, _kr);var _super107 = _createSuper(Vr);function Vr() {var _this151;_classCallCheck(this, Vr);_this151 = _super107.call(this, ui(Vr.getDefaults(), arguments)), _this151.name = "MembraneSynth", _this151.portamento = 0;var t = ui(Vr.getDefaults(), arguments);_this151.pitchDecay = t.pitchDecay, _this151.octaves = t.octaves, Oi(_assertThisInitialized(_this151), ["oscillator", "envelope"]);return _this151;}_createClass(Vr, [{ key: "setNote", value: function setNote(t, e) {var s = this.toSeconds(e),n = this.toFrequency(t instanceof Yi ? t.toFrequency() : t),i = n * this.octaves;return this.oscillator.frequency.setValueAtTime(i, s), this.oscillator.frequency.exponentialRampToValueAtTime(n, s + this.toSeconds(this.pitchDecay)), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Vr.prototype), "dispose", this).call(this), this;} }], [{ key: "getDefaults", value: function getDefaults() {return li(Tr.getDefaults(), kr.getDefaults(), { envelope: { attack: .001, attackCurve: "exponential", decay: .4, release: 1.4, sustain: .01 }, octaves: 10, oscillator: { type: "sine" }, pitchDecay: .05 });} }]);return Vr;}(kr);si([rr(0)], Vr.prototype, "octaves", void 0), si([ar(0)], Vr.prototype, "pitchDecay", void 0);var Nr = /*#__PURE__*/function (_br2) {_inherits(Nr, _br2);var _super108 = _createSuper(Nr);function Nr() {var _this152;_classCallCheck(this, Nr);_this152 = _super108.call(this, ui(Nr.getDefaults(), arguments)), _this152.name = "NoiseSynth";var t = ui(Nr.getDefaults(), arguments);_this152.noise = new No(Object.assign({ context: _this152.context }, t.noise)), _this152.envelope = new Sr(Object.assign({ context: _this152.context }, t.envelope)), _this152.noise.chain(_this152.envelope, _this152.output);return _this152;}_createClass(Nr, [{ key: "triggerAttack", value: function triggerAttack(t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;return t = this.toSeconds(t), this.envelope.triggerAttack(t, e), this.noise.start(t), 0 === this.envelope.sustain && this.noise.stop(t + this.toSeconds(this.envelope.attack) + this.toSeconds(this.envelope.decay)), this;} }, { key: "triggerRelease", value: function triggerRelease(t) {return t = this.toSeconds(t), this.envelope.triggerRelease(t), this.noise.stop(t + this.toSeconds(this.envelope.release)), this;} }, { key: "sync", value: function sync() {return this._syncState() && (this._syncMethod("triggerAttack", 0), this._syncMethod("triggerRelease", 0)), this;} }, { key: "triggerAttackRelease", value: function triggerAttackRelease(t, e) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;return e = this.toSeconds(e), t = this.toSeconds(t), this.triggerAttack(e, s), this.triggerRelease(e + t), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Nr.prototype), "dispose", this).call(this), this.noise.dispose(), this.envelope.dispose(), this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(br.getDefaults(), { envelope: Object.assign(di(xr.getDefaults(), Object.keys(io.getDefaults())), { decay: .1, sustain: 0 }), noise: Object.assign(di(No.getDefaults(), Object.keys(Io.getDefaults())), { type: "white" }) });} }]);return Nr;}(br);var Pr = new Set();function jr(t) {Pr.add(t);}function Lr(t, e) {var s = "registerProcessor(\"".concat(t, "\", ").concat(e, ")");Pr.add(s);}var zr = /*#__PURE__*/function (_io16) {_inherits(zr, _io16);var _super109 = _createSuper(zr);function zr(t) {var _this153;_classCallCheck(this, zr);_this153 = _super109.call(this, t), _this153.name = "ToneAudioWorklet", _this153.workletOptions = {}, _this153.onprocessorerror = Ei;var e = URL.createObjectURL(new Blob([Array.from(Pr).join("\n")], { type: "text/javascript" })),s = _this153._audioWorkletName();_this153._dummyGain = _this153.context.createGain(), _this153._dummyParam = _this153._dummyGain.gain, _this153.context.addAudioWorkletModule(e, s).then(function () {_this153.disposed || (_this153._worklet = _this153.context.createAudioWorkletNode(s, _this153.workletOptions), _this153._worklet.onprocessorerror = _this153.onprocessorerror.bind(_assertThisInitialized(_this153)), _this153.onReady(_this153._worklet));});return _this153;}_createClass(zr, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(zr.prototype), "dispose", this).call(this), this._dummyGain.disconnect(), this._worklet && (this._worklet.port.postMessage("dispose"), this._worklet.disconnect()), this;} }]);return zr;}(io);jr('\n\t/**\n\t * The base AudioWorkletProcessor for use in Tone.js. Works with the [[ToneAudioWorklet]]. \n\t */\n\tclass ToneAudioWorkletProcessor extends AudioWorkletProcessor {\n\n\t\tconstructor(options) {\n\t\t\t\n\t\t\tsuper(options);\n\t\t\t/**\n\t\t\t * If the processor was disposed or not. Keep alive until it\'s disposed.\n\t\t\t */\n\t\t\tthis.disposed = false;\n\t\t   \t/** \n\t\t\t * The number of samples in the processing block\n\t\t\t */\n\t\t\tthis.blockSize = 128;\n\t\t\t/**\n\t\t\t * the sample rate\n\t\t\t */\n\t\t\tthis.sampleRate = sampleRate;\n\n\t\t\tthis.port.onmessage = (event) => {\n\t\t\t\t// when it receives a dispose \n\t\t\t\tif (event.data === "dispose") {\n\t\t\t\t\tthis.disposed = true;\n\t\t\t\t}\n\t\t\t};\n\t\t}\n\t}\n'), jr("\n\t/**\n\t * Abstract class for a single input/output processor. \n\t * has a 'generate' function which processes one sample at a time\n\t */\n\tclass SingleIOProcessor extends ToneAudioWorkletProcessor {\n\n\t\tconstructor(options) {\n\t\t\tsuper(Object.assign(options, {\n\t\t\t\tnumberOfInputs: 1,\n\t\t\t\tnumberOfOutputs: 1\n\t\t\t}));\n\t\t\t/**\n\t\t\t * Holds the name of the parameter and a single value of that\n\t\t\t * parameter at the current sample\n\t\t\t * @type { [name: string]: number }\n\t\t\t */\n\t\t\tthis.params = {}\n\t\t}\n\n\t\t/**\n\t\t * Generate an output sample from the input sample and parameters\n\t\t * @abstract\n\t\t * @param input number\n\t\t * @param channel number\n\t\t * @param parameters { [name: string]: number }\n\t\t * @returns number\n\t\t */\n\t\tgenerate(){}\n\n\t\t/**\n\t\t * Update the private params object with the \n\t\t * values of the parameters at the given index\n\t\t * @param parameters { [name: string]: Float32Array },\n\t\t * @param index number\n\t\t */\n\t\tupdateParams(parameters, index) {\n\t\t\tfor (const paramName in parameters) {\n\t\t\t\tconst param = parameters[paramName];\n\t\t\t\tif (param.length > 1) {\n\t\t\t\t\tthis.params[paramName] = parameters[paramName][index];\n\t\t\t\t} else {\n\t\t\t\t\tthis.params[paramName] = parameters[paramName][0];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t/**\n\t\t * Process a single frame of the audio\n\t\t * @param inputs Float32Array[][]\n\t\t * @param outputs Float32Array[][]\n\t\t */\n\t\tprocess(inputs, outputs, parameters) {\n\t\t\tconst input = inputs[0];\n\t\t\tconst output = outputs[0];\n\t\t\t// get the parameter values\n\t\t\tconst channelCount = Math.max(input && input.length || 0, output.length);\n\t\t\tfor (let sample = 0; sample < this.blockSize; sample++) {\n\t\t\t\tthis.updateParams(parameters, sample);\n\t\t\t\tfor (let channel = 0; channel < channelCount; channel++) {\n\t\t\t\t\tconst inputSample = input && input.length ? input[channel][sample] : 0;\n\t\t\t\t\toutput[channel][sample] = this.generate(inputSample, channel, this.params);\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn !this.disposed;\n\t\t}\n\t};\n"), jr("\n\t/**\n\t * A multichannel buffer for use within an AudioWorkletProcessor as a delay line\n\t */\n\tclass DelayLine {\n\t\t\n\t\tconstructor(size, channels) {\n\t\t\tthis.buffer = [];\n\t\t\tthis.writeHead = []\n\t\t\tthis.size = size;\n\n\t\t\t// create the empty channels\n\t\t\tfor (let i = 0; i < channels; i++) {\n\t\t\t\tthis.buffer[i] = new Float32Array(this.size);\n\t\t\t\tthis.writeHead[i] = 0;\n\t\t\t}\n\t\t}\n\n\t\t/**\n\t\t * Push a value onto the end\n\t\t * @param channel number\n\t\t * @param value number\n\t\t */\n\t\tpush(channel, value) {\n\t\t\tthis.writeHead[channel] += 1;\n\t\t\tif (this.writeHead[channel] > this.size) {\n\t\t\t\tthis.writeHead[channel] = 0;\n\t\t\t}\n\t\t\tthis.buffer[channel][this.writeHead[channel]] = value;\n\t\t}\n\n\t\t/**\n\t\t * Get the recorded value of the channel given the delay\n\t\t * @param channel number\n\t\t * @param delay number delay samples\n\t\t */\n\t\tget(channel, delay) {\n\t\t\tlet readHead = this.writeHead[channel] - Math.floor(delay);\n\t\t\tif (readHead < 0) {\n\t\t\t\treadHead += this.size;\n\t\t\t}\n\t\t\treturn this.buffer[channel][readHead];\n\t\t}\n\t}\n");var Wr = "feedback-comb-filter";Lr(Wr, '\n\tclass FeedbackCombFilterWorklet extends SingleIOProcessor {\n\n\t\tconstructor(options) {\n\t\t\tsuper(options);\n\t\t\tthis.delayLine = new DelayLine(this.sampleRate, options.channelCount || 2);\n\t\t}\n\n\t\tstatic get parameterDescriptors() {\n\t\t\treturn [{\n\t\t\t\tname: "delayTime",\n\t\t\t\tdefaultValue: 0.1,\n\t\t\t\tminValue: 0,\n\t\t\t\tmaxValue: 1,\n\t\t\t\tautomationRate: "k-rate"\n\t\t\t}, {\n\t\t\t\tname: "feedback",\n\t\t\t\tdefaultValue: 0.5,\n\t\t\t\tminValue: 0,\n\t\t\t\tmaxValue: 0.9999,\n\t\t\t\tautomationRate: "k-rate"\n\t\t\t}];\n\t\t}\n\n\t\tgenerate(input, channel, parameters) {\n\t\t\tconst delayedSample = this.delayLine.get(channel, parameters.delayTime * this.sampleRate);\n\t\t\tthis.delayLine.push(channel, input + delayedSample * parameters.feedback);\n\t\t\treturn delayedSample;\n\t\t}\n\t}\n');var Br = /*#__PURE__*/function (_zr) {_inherits(Br, _zr);var _super110 = _createSuper(Br);function Br() {var _this154;_classCallCheck(this, Br);_this154 = _super110.call(this, ui(Br.getDefaults(), arguments, ["delayTime", "resonance"])), _this154.name = "FeedbackCombFilter";var t = ui(Br.getDefaults(), arguments, ["delayTime", "resonance"]);_this154.input = new ho({ context: _this154.context }), _this154.output = new ho({ context: _this154.context }), _this154.delayTime = new no({ context: _this154.context, value: t.delayTime, units: "time", minValue: 0, maxValue: 1, param: _this154._dummyParam, swappable: !0 }), _this154.resonance = new no({ context: _this154.context, value: t.resonance, units: "normalRange", param: _this154._dummyParam, swappable: !0 }), Oi(_assertThisInitialized(_this154), ["resonance", "delayTime"]);return _this154;}_createClass(Br, [{ key: "_audioWorkletName", value: function _audioWorkletName() {return Wr;} }, { key: "onReady", value: function onReady(t) {oo(this.input, t, this.output);var e = t.parameters.get("delayTime");this.delayTime.setParam(e);var s = t.parameters.get("feedback");this.resonance.setParam(s);} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Br.prototype), "dispose", this).call(this), this.input.dispose(), this.output.dispose(), this.delayTime.dispose(), this.resonance.dispose(), this;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { delayTime: .1, resonance: .5 });} }]);return Br;}(zr);var Ur = /*#__PURE__*/function (_io17) {_inherits(Ur, _io17);var _super111 = _createSuper(Ur);function Ur() {var _this155;_classCallCheck(this, Ur);_this155 = _super111.call(this, ui(Ur.getDefaults(), arguments, ["frequency", "type"])), _this155.name = "OnePoleFilter";var t = ui(Ur.getDefaults(), arguments, ["frequency", "type"]);_this155._frequency = t.frequency, _this155._type = t.type, _this155.input = new ho({ context: _this155.context }), _this155.output = new ho({ context: _this155.context }), _this155._createFilter();return _this155;}_createClass(Ur, [{ key: "_createFilter", value: function _createFilter() {var _this156 = this;var t = this._filter,e = this.toFrequency(this._frequency),s = 1 / (2 * Math.PI * e);if ("lowpass" === this._type) {var _t153 = 1 / (s * this.context.sampleRate),_e111 = _t153 - 1;this._filter = this.context.createIIRFilter([_t153, 0], [1, _e111]);} else {var _t154 = 1 / (s * this.context.sampleRate) - 1;this._filter = this.context.createIIRFilter([1, -1], [1, _t154]);}this.input.chain(this._filter, this.output), t && this.context.setTimeout(function () {_this156.disposed || (_this156.input.disconnect(t), t.disconnect());}, this.blockTime);} }, { key: "getFrequencyResponse", value: function getFrequencyResponse() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 128;var e = new Float32Array(t);for (var _s79 = 0; _s79 < t; _s79++) {var _n44 = 19980 * Math.pow(_s79 / t, 2) + 20;e[_s79] = _n44;}var s = new Float32Array(t),n = new Float32Array(t);return this._filter.getFrequencyResponse(e, s, n), s;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Ur.prototype), "dispose", this).call(this), this.input.dispose(), this.output.dispose(), this._filter.disconnect(), this;} }, { key: "frequency", get: function get() {return this._frequency;}, set: function set(t) {this._frequency = t, this._createFilter();} }, { key: "type", get: function get() {return this._type;}, set: function set(t) {this._type = t, this._createFilter();} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { frequency: 880, type: "lowpass" });} }]);return Ur;}(io);var Gr = /*#__PURE__*/function (_io18) {_inherits(Gr, _io18);var _super112 = _createSuper(Gr);function Gr() {var _this157;_classCallCheck(this, Gr);_this157 = _super112.call(this, ui(Gr.getDefaults(), arguments, ["delayTime", "resonance", "dampening"])), _this157.name = "LowpassCombFilter";var t = ui(Gr.getDefaults(), arguments, ["delayTime", "resonance", "dampening"]);_this157._combFilter = _this157.output = new Br({ context: _this157.context, delayTime: t.delayTime, resonance: t.resonance }), _this157.delayTime = _this157._combFilter.delayTime, _this157.resonance = _this157._combFilter.resonance, _this157._lowpass = _this157.input = new Ur({ context: _this157.context, frequency: t.dampening, type: "lowpass" }), _this157._lowpass.connect(_this157._combFilter);return _this157;}_createClass(Gr, [{ key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Gr.prototype), "dispose", this).call(this), this._combFilter.dispose(), this._lowpass.dispose(), this;} }, { key: "dampening", get: function get() {return this._lowpass.frequency;}, set: function set(t) {this._lowpass.frequency = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { dampening: 3e3, delayTime: .1, resonance: .5 });} }]);return Gr;}(io);var Qr = /*#__PURE__*/function (_br3) {_inherits(Qr, _br3);var _super113 = _createSuper(Qr);function Qr() {var _this158;_classCallCheck(this, Qr);_this158 = _super113.call(this, ui(Qr.getDefaults(), arguments)), _this158.name = "PluckSynth";var t = ui(Qr.getDefaults(), arguments);_this158._noise = new No({ context: _this158.context, type: "pink" }), _this158.attackNoise = t.attackNoise, _this158._lfcf = new Gr({ context: _this158.context, dampening: t.dampening, resonance: t.resonance }), _this158.resonance = t.resonance, _this158.release = t.release, _this158._noise.connect(_this158._lfcf), _this158._lfcf.connect(_this158.output);return _this158;}_createClass(Qr, [{ key: "triggerAttack", value: function triggerAttack(t, e) {var s = this.toFrequency(t);e = this.toSeconds(e);var n = 1 / s;return this._lfcf.delayTime.setValueAtTime(n, e), this._noise.start(e), this._noise.stop(e + n * this.attackNoise), this._lfcf.resonance.cancelScheduledValues(e), this._lfcf.resonance.setValueAtTime(this.resonance, e), this;} }, { key: "triggerRelease", value: function triggerRelease(t) {return this._lfcf.resonance.linearRampTo(0, this.release, t), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Qr.prototype), "dispose", this).call(this), this._noise.dispose(), this._lfcf.dispose(), this;} }, { key: "dampening", get: function get() {return this._lfcf.dampening;}, set: function set(t) {this._lfcf.dampening = t;} }], [{ key: "getDefaults", value: function getDefaults() {return li(br.getDefaults(), { attackNoise: 1, dampening: 4e3, resonance: .7, release: 1 });} }]);return Qr;}(br);var Zr = /*#__PURE__*/function (_br4) {_inherits(Zr, _br4);var _super114 = _createSuper(Zr);function Zr() {var _this159;_classCallCheck(this, Zr);_this159 = _super114.call(this, ui(Zr.getDefaults(), arguments, ["voice", "options"])), _this159.name = "PolySynth", _this159._availableVoices = [], _this159._activeVoices = [], _this159._voices = [], _this159._gcTimeout = -1, _this159._averageActiveVoices = 0, _this159._syncedRelease = function (t) {return _this159.releaseAll(t);};var t = ui(Zr.getDefaults(), arguments, ["voice", "options"]);Bn(!Nn(t.voice), "DEPRECATED: The polyphony count is no longer the first argument.");var e = t.voice.getDefaults();_this159.options = Object.assign(e, t.options), _this159.voice = t.voice, _this159.maxPolyphony = t.maxPolyphony, _this159._dummyVoice = _this159._getNextAvailableVoice();var s = _this159._voices.indexOf(_this159._dummyVoice);_this159._voices.splice(s, 1), _this159._gcTimeout = _this159.context.setInterval(_this159._collectGarbage.bind(_assertThisInitialized(_this159)), 1);return _this159;}_createClass(Zr, [{ key: "_makeVoiceAvailable", value: function _makeVoiceAvailable(t) {this._availableVoices.push(t);var e = this._activeVoices.findIndex(function (e) {return e.voice === t;});this._activeVoices.splice(e, 1);} }, { key: "_getNextAvailableVoice", value: function _getNextAvailableVoice() {if (this._availableVoices.length) return this._availableVoices.shift();if (this._voices.length < this.maxPolyphony) {var _t155 = new this.voice(Object.assign(this.options, { context: this.context, onsilence: this._makeVoiceAvailable.bind(this) }));return Bn(_t155 instanceof Tr, "Voice must extend Monophonic class"), _t155.connect(this.output), this._voices.push(_t155), _t155;}Kn("Max polyphony exceeded. Note dropped.");} }, { key: "_collectGarbage", value: function _collectGarbage() {if (this._averageActiveVoices = Math.max(.95 * this._averageActiveVoices, this.activeVoices), this._availableVoices.length && this._voices.length > Math.ceil(this._averageActiveVoices + 1)) {var _t156 = this._availableVoices.shift(),_e112 = this._voices.indexOf(_t156);this._voices.splice(_e112, 1), this.context.isOffline || _t156.dispose();}} }, { key: "_triggerAttack", value: function _triggerAttack(t, e, s) {var _this160 = this;t.forEach(function (t) {var n = new bo(_this160.context, t).toMidi(),i = _this160._getNextAvailableVoice();i && (i.triggerAttack(t, e, s), _this160._activeVoices.push({ midi: n, voice: i, released: !1 }), _this160.log("triggerAttack", t, e));});} }, { key: "_triggerRelease", value: function _triggerRelease(t, e) {var _this161 = this;t.forEach(function (t) {var s = new bo(_this161.context, t).toMidi(),n = _this161._activeVoices.find(function (_ref82) {var t = _ref82.midi,e = _ref82.released;return t === s && !e;});n && (n.voice.triggerRelease(e), n.released = !0, _this161.log("triggerRelease", t, e));});} }, { key: "_scheduleEvent", value: function _scheduleEvent(t, e, s, n) {var _this162 = this;Bn(!this.disposed, "Synth was already disposed"), s <= this.now() ? "attack" === t ? this._triggerAttack(e, s, n) : this._triggerRelease(e, s) : this.context.setTimeout(function () {_this162.disposed || _this162._scheduleEvent(t, e, s, n);}, s - this.now());} }, { key: "triggerAttack", value: function triggerAttack(t, e, s) {Array.isArray(t) || (t = [t]);var n = this.toSeconds(e);return this._scheduleEvent("attack", t, n, s), this;} }, { key: "triggerRelease", value: function triggerRelease(t, e) {Array.isArray(t) || (t = [t]);var s = this.toSeconds(e);return this._scheduleEvent("release", t, s), this;} }, { key: "triggerAttackRelease", value: function triggerAttackRelease(t, e, s, n) {var i = this.toSeconds(s);if (this.triggerAttack(t, i, n), Ln(e)) {Bn(Ln(t), "If the duration is an array, the notes must also be an array"), t = t;for (var _s80 = 0; _s80 < t.length; _s80++) {var _n45 = e[Math.min(_s80, e.length - 1)],_o25 = this.toSeconds(_n45);Bn(_o25 > 0, "The duration must be greater than 0"), this.triggerRelease(t[_s80], i + _o25);}} else {var _s81 = this.toSeconds(e);Bn(_s81 > 0, "The duration must be greater than 0"), this.triggerRelease(t, i + _s81);}return this;} }, { key: "sync", value: function sync() {return this._syncState() && (this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 1), this.context.transport.on("stop", this._syncedRelease), this.context.transport.on("pause", this._syncedRelease), this.context.transport.on("loopEnd", this._syncedRelease)), this;} }, { key: "set", value: function set(t) {var e = di(t, ["onsilence", "context"]);return this.options = li(this.options, e), this._voices.forEach(function (t) {return t.set(e);}), this._dummyVoice.set(e), this;} }, { key: "get", value: function get() {return this._dummyVoice.get();} }, { key: "releaseAll", value: function releaseAll(t) {var e = this.toSeconds(t);return this._activeVoices.forEach(function (_ref83) {var t = _ref83.voice;t.triggerRelease(e);}), this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Zr.prototype), "dispose", this).call(this), this._dummyVoice.dispose(), this._voices.forEach(function (t) {return t.dispose();}), this._activeVoices = [], this._availableVoices = [], this.context.clearInterval(this._gcTimeout), this;} }, { key: "activeVoices", get: function get() {return this._activeVoices.length;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(br.getDefaults(), { maxPolyphony: 32, options: {}, voice: kr });} }]);return Zr;}(br);var Xr = /*#__PURE__*/function (_br5) {_inherits(Xr, _br5);var _super115 = _createSuper(Xr);function Xr() {var _this163;_classCallCheck(this, Xr);_this163 = _super115.call(this, ui(Xr.getDefaults(), arguments, ["urls", "onload", "baseUrl"], "urls")), _this163.name = "Sampler", _this163._activeSources = new Map();var t = ui(Xr.getDefaults(), arguments, ["urls", "onload", "baseUrl"], "urls"),e = {};Object.keys(t.urls).forEach(function (s) {var n = parseInt(s, 10);if (Bn(Wn(s) || Nn(n) && isFinite(n), "url key is neither a note or midi pitch: ".concat(s)), Wn(s)) {var _n46 = new Yi(_this163.context, s).toMidi();e[_n46] = t.urls[s];} else Nn(n) && isFinite(n) && (e[n] = t.urls[n]);}), _this163._buffers = new wo({ urls: e, onload: t.onload, baseUrl: t.baseUrl, onerror: t.onerror }), _this163.attack = t.attack, _this163.release = t.release, _this163.curve = t.curve, _this163._buffers.loaded && Promise.resolve().then(t.onload);return _this163;}_createClass(Xr, [{ key: "_findClosest", value: function _findClosest(t) {var e = 0;for (; e < 96;) {if (this._buffers.has(t + e)) return -e;if (this._buffers.has(t - e)) return e;e++;}throw new Error("No available buffers for note: ".concat(t));} }, { key: "triggerAttack", value: function triggerAttack(t, e) {var _this164 = this;var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;return this.log("triggerAttack", t, e, s), Array.isArray(t) || (t = [t]), t.forEach(function (t) {var n = Ui(new Yi(_this164.context, t).toFrequency()),i = Math.round(n),o = n - i,r = _this164._findClosest(i),a = i - r,c = _this164._buffers.get(a),h = zi(r + o),l = new Vo({ url: c, context: _this164.context, curve: _this164.curve, fadeIn: _this164.attack, fadeOut: _this164.release, playbackRate: h }).connect(_this164.output);l.start(e, 0, c.duration / h, s), Ln(_this164._activeSources.get(i)) || _this164._activeSources.set(i, []), _this164._activeSources.get(i).push(l), l.onended = function () {if (_this164._activeSources && _this164._activeSources.has(i)) {var _t157 = _this164._activeSources.get(i),_e113 = _t157.indexOf(l);-1 !== _e113 && _t157.splice(_e113, 1);}};}), this;} }, { key: "triggerRelease", value: function triggerRelease(t, e) {var _this165 = this;return this.log("triggerRelease", t, e), Array.isArray(t) || (t = [t]), t.forEach(function (t) {var s = new Yi(_this165.context, t).toMidi();if (_this165._activeSources.has(s) && _this165._activeSources.get(s).length) {var _t158 = _this165._activeSources.get(s);e = _this165.toSeconds(e), _t158.forEach(function (t) {t.stop(e);}), _this165._activeSources.set(s, []);}}), this;} }, { key: "releaseAll", value: function releaseAll(t) {var e = this.toSeconds(t);return this._activeSources.forEach(function (t) {for (; t.length;) {t.shift().stop(e);}}), this;} }, { key: "sync", value: function sync() {return this._syncState() && (this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 1)), this;} }, { key: "triggerAttackRelease", value: function triggerAttackRelease(t, e, s) {var _this166 = this;var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;var i = this.toSeconds(s);return this.triggerAttack(t, i, n), Ln(e) ? (Bn(Ln(t), "notes must be an array when duration is array"), t.forEach(function (t, s) {var n = e[Math.min(s, e.length - 1)];_this166.triggerRelease(t, i + _this166.toSeconds(n));})) : this.triggerRelease(t, i + this.toSeconds(e)), this;} }, { key: "add", value: function add(t, e, s) {if (Bn(Wn(t) || isFinite(t), "note must be a pitch or midi: ".concat(t)), Wn(t)) {var _n47 = new Yi(this.context, t).toMidi();this._buffers.add(_n47, e, s);} else this._buffers.add(t, e, s);return this;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Xr.prototype), "dispose", this).call(this), this._buffers.dispose(), this._activeSources.forEach(function (t) {t.forEach(function (t) {return t.dispose();});}), this._activeSources.clear(), this;} }, { key: "loaded", get: function get() {return this._buffers.loaded;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(br.getDefaults(), { attack: 0, baseUrl: "", curve: "exponential", onload: Ei, onerror: Ei, release: .1, urls: {} });} }]);return Xr;}(br);si([ar(0)], Xr.prototype, "attack", void 0), si([ar(0)], Xr.prototype, "release", void 0);var Yr = /*#__PURE__*/function (_eo7) {_inherits(Yr, _eo7);var _super116 = _createSuper(Yr);function Yr() {var _this167;_classCallCheck(this, Yr);_this167 = _super116.call(this, ui(Yr.getDefaults(), arguments, ["callback", "value"])), _this167.name = "ToneEvent", _this167._state = new so("stopped"), _this167._startOffset = 0;var t = ui(Yr.getDefaults(), arguments, ["callback", "value"]);_this167._loop = t.loop, _this167.callback = t.callback, _this167.value = t.value, _this167._loopStart = _this167.toTicks(t.loopStart), _this167._loopEnd = _this167.toTicks(t.loopEnd), _this167._playbackRate = t.playbackRate, _this167._probability = t.probability, _this167._humanize = t.humanize, _this167.mute = t.mute, _this167._playbackRate = t.playbackRate, _this167._state.increasing = !0, _this167._rescheduleEvents();return _this167;}_createClass(Yr, [{ key: "_rescheduleEvents", value: function _rescheduleEvents() {var _this168 = this;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;this._state.forEachFrom(t, function (t) {var e;if ("started" === t.state) {-1 !== t.id && _this168.context.transport.clear(t.id);var _s82 = t.time + Math.round(_this168.startOffset / _this168._playbackRate);if (!0 === _this168._loop || Nn(_this168._loop) && _this168._loop > 1) {e = 1 / 0, Nn(_this168._loop) && (e = _this168._loop * _this168._getLoopDuration());var _n48 = _this168._state.getAfter(_s82);null !== _n48 && (e = Math.min(e, _n48.time - _s82)), e !== 1 / 0 && (e = new So(_this168.context, e));var _i29 = new So(_this168.context, _this168._getLoopDuration());t.id = _this168.context.transport.scheduleRepeat(_this168._tick.bind(_this168), _i29, new So(_this168.context, _s82), e);} else t.id = _this168.context.transport.schedule(_this168._tick.bind(_this168), new So(_this168.context, _s82));}});} }, { key: "start", value: function start(t) {var e = this.toTicks(t);return "stopped" === this._state.getValueAtTime(e) && (this._state.add({ id: -1, state: "started", time: e }), this._rescheduleEvents(e)), this;} }, { key: "stop", value: function stop(t) {this.cancel(t);var e = this.toTicks(t);if ("started" === this._state.getValueAtTime(e)) {this._state.setStateAtTime("stopped", e, { id: -1 });var _t159 = this._state.getBefore(e);var _s83 = e;null !== _t159 && (_s83 = _t159.time), this._rescheduleEvents(_s83);}return this;} }, { key: "cancel", value: function cancel(t) {var _this169 = this;t = pi(t, -1 / 0);var e = this.toTicks(t);return this._state.forEachFrom(e, function (t) {_this169.context.transport.clear(t.id);}), this._state.cancel(e), this;} }, { key: "_tick", value: function _tick(t) {var e = this.context.transport.getTicksAtTime(t);if (!this.mute && "started" === this._state.getValueAtTime(e)) {if (this.probability < 1 && Math.random() > this.probability) return;if (this.humanize) {var _e114 = .02;jn(this.humanize) || (_e114 = this.toSeconds(this.humanize)), t += (2 * Math.random() - 1) * _e114;}this.callback(t, this.value);}} }, { key: "_getLoopDuration", value: function _getLoopDuration() {return (this._loopEnd - this._loopStart) / this._playbackRate;} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Yr.prototype), "dispose", this).call(this), this.cancel(), this._state.dispose(), this;} }, { key: "state", get: function get() {return this._state.getValueAtTime(this.context.transport.ticks);} }, { key: "startOffset", get: function get() {return this._startOffset;}, set: function set(t) {this._startOffset = t;} }, { key: "probability", get: function get() {return this._probability;}, set: function set(t) {this._probability = t;} }, { key: "humanize", get: function get() {return this._humanize;}, set: function set(t) {this._humanize = t;} }, { key: "loop", get: function get() {return this._loop;}, set: function set(t) {this._loop = t, this._rescheduleEvents();} }, { key: "playbackRate", get: function get() {return this._playbackRate;}, set: function set(t) {this._playbackRate = t, this._rescheduleEvents();} }, { key: "loopEnd", get: function get() {return new So(this.context, this._loopEnd).toSeconds();}, set: function set(t) {this._loopEnd = this.toTicks(t), this._loop && this._rescheduleEvents();} }, { key: "loopStart", get: function get() {return new So(this.context, this._loopStart).toSeconds();}, set: function set(t) {this._loopStart = this.toTicks(t), this._loop && this._rescheduleEvents();} }, { key: "progress", get: function get() {if (this._loop) {var _t160 = this.context.transport.ticks,_e115 = this._state.get(_t160);if (null !== _e115 && "started" === _e115.state) {var _s84 = this._getLoopDuration();return (_t160 - _e115.time) % _s84 / _s84;}return 0;}return 0;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(eo.getDefaults(), { callback: Ei, humanize: !1, loop: !1, loopEnd: "1m", loopStart: 0, mute: !1, playbackRate: 1, probability: 1, value: null });} }]);return Yr;}(eo);var $r = /*#__PURE__*/function (_eo8) {_inherits($r, _eo8);var _super117 = _createSuper($r);function $r() {var _this170;_classCallCheck(this, $r);_this170 = _super117.call(this, ui($r.getDefaults(), arguments, ["callback", "interval"])), _this170.name = "Loop";var t = ui($r.getDefaults(), arguments, ["callback", "interval"]);_this170._event = new Yr({ context: _this170.context, callback: _this170._tick.bind(_assertThisInitialized(_this170)), loop: !0, loopEnd: t.interval, playbackRate: t.playbackRate, probability: t.probability }), _this170.callback = t.callback, _this170.iterations = t.iterations;return _this170;}_createClass($r, [{ key: "start", value: function start(t) {return this._event.start(t), this;} }, { key: "stop", value: function stop(t) {return this._event.stop(t), this;} }, { key: "cancel", value: function cancel(t) {return this._event.cancel(t), this;} }, { key: "_tick", value: function _tick(t) {this.callback(t);} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf($r.prototype), "dispose", this).call(this), this._event.dispose(), this;} }, { key: "state", get: function get() {return this._event.state;} }, { key: "progress", get: function get() {return this._event.progress;} }, { key: "interval", get: function get() {return this._event.loopEnd;}, set: function set(t) {this._event.loopEnd = t;} }, { key: "playbackRate", get: function get() {return this._event.playbackRate;}, set: function set(t) {this._event.playbackRate = t;} }, { key: "humanize", get: function get() {return this._event.humanize;}, set: function set(t) {this._event.humanize = t;} }, { key: "probability", get: function get() {return this._event.probability;}, set: function set(t) {this._event.probability = t;} }, { key: "mute", get: function get() {return this._event.mute;}, set: function set(t) {this._event.mute = t;} }, { key: "iterations", get: function get() {return !0 === this._event.loop ? 1 / 0 : this._event.loop;}, set: function set(t) {this._event.loop = t === 1 / 0 || t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(eo.getDefaults(), { interval: "4n", callback: Ei, playbackRate: 1, iterations: 1 / 0, probability: 1, mute: !1, humanize: !1 });} }]);return $r;}(eo);var Hr = /*#__PURE__*/function (_Yr) {_inherits(Hr, _Yr);var _super118 = _createSuper(Hr);function Hr() {var _this171;_classCallCheck(this, Hr);_this171 = _super118.call(this, ui(Hr.getDefaults(), arguments, ["callback", "events"])), _this171.name = "Part", _this171._state = new so("stopped"), _this171._events = new Set();var t = ui(Hr.getDefaults(), arguments, ["callback", "events"]);_this171._state.increasing = !0, t.events.forEach(function (t) {Ln(t) ? _this171.add(t[0], t[1]) : _this171.add(t);});return _this171;}_createClass(Hr, [{ key: "start", value: function start(t, e) {var _this172 = this;var s = this.toTicks(t);if ("started" !== this._state.getValueAtTime(s)) {e = pi(e, this._loop ? this._loopStart : 0), e = this._loop ? pi(e, this._loopStart) : pi(e, 0);var _t161 = this.toTicks(e);this._state.add({ id: -1, offset: _t161, state: "started", time: s }), this._forEach(function (e) {_this172._startNote(e, s, _t161);});}return this;} }, { key: "_startNote", value: function _startNote(t, e, s) {e -= s, this._loop ? t.startOffset >= this._loopStart && t.startOffset < this._loopEnd ? (t.startOffset < s && (e += this._getLoopDuration()), t.start(new So(this.context, e))) : t.startOffset < this._loopStart && t.startOffset >= s && (t.loop = !1, t.start(new So(this.context, e))) : t.startOffset >= s && t.start(new So(this.context, e));} }, { key: "stop", value: function stop(t) {var e = this.toTicks(t);return this._state.cancel(e), this._state.setStateAtTime("stopped", e), this._forEach(function (e) {e.stop(t);}), this;} }, { key: "at", value: function at(t, e) {var s = new Ki(this.context, t).toTicks(),n = new So(this.context, 1).toSeconds(),i = this._events.values();var o = i.next();for (; !o.done;) {var _t162 = o.value;if (Math.abs(s - _t162.startOffset) < n) return In(e) && (_t162.value = e), _t162;o = i.next();}return In(e) ? (this.add(t, e), this.at(t)) : null;} }, { key: "add", value: function add(t, e) {t instanceof Object && Reflect.has(t, "time") && (t = (e = t).time);var s = this.toTicks(t);var n;return e instanceof Yr ? (n = e, n.callback = this._tick.bind(this)) : n = new Yr({ callback: this._tick.bind(this), context: this.context, value: e }), n.startOffset = s, n.set({ humanize: this.humanize, loop: this.loop, loopEnd: this.loopEnd, loopStart: this.loopStart, playbackRate: this.playbackRate, probability: this.probability }), this._events.add(n), this._restartEvent(n), this;} }, { key: "_restartEvent", value: function _restartEvent(t) {var _this173 = this;this._state.forEach(function (e) {"started" === e.state ? _this173._startNote(t, e.time, e.offset) : t.stop(new So(_this173.context, e.time));});} }, { key: "remove", value: function remove(t, e) {var _this174 = this;return Pn(t) && t.hasOwnProperty("time") && (t = (e = t).time), t = this.toTicks(t), this._events.forEach(function (s) {s.startOffset === t && (Fn(e) || In(e) && s.value === e) && (_this174._events.delete(s), s.dispose());}), this;} }, { key: "clear", value: function clear() {return this._forEach(function (t) {return t.dispose();}), this._events.clear(), this;} }, { key: "cancel", value: function cancel(t) {return this._forEach(function (e) {return e.cancel(t);}), this._state.cancel(this.toTicks(t)), this;} }, { key: "_forEach", value: function _forEach(t) {return this._events && this._events.forEach(function (e) {e instanceof Hr ? e._forEach(t) : t(e);}), this;} }, { key: "_setAll", value: function _setAll(t, e) {this._forEach(function (s) {s[t] = e;});} }, { key: "_tick", value: function _tick(t, e) {this.mute || this.callback(t, e);} }, { key: "_testLoopBoundries", value: function _testLoopBoundries(t) {this._loop && (t.startOffset < this._loopStart || t.startOffset >= this._loopEnd) ? t.cancel(0) : "stopped" === t.state && this._restartEvent(t);} }, { key: "dispose", value: function dispose() {return _get(_getPrototypeOf(Hr.prototype), "dispose", this).call(this), this.clear(), this;} }, { key: "startOffset", get: function get() {return this._startOffset;}, set: function set(t) {var _this175 = this;this._startOffset = t, this._forEach(function (t) {t.startOffset += _this175._startOffset;});} }, { key: "probability", get: function get() {return this._probability;}, set: function set(t) {this._probability = t, this._setAll("probability", t);} }, { key: "humanize", get: function get() {return this._humanize;}, set: function set(t) {this._humanize = t, this._setAll("humanize", t);} }, { key: "loop", get: function get() {return this._loop;}, set: function set(t) {var _this176 = this;this._loop = t, this._forEach(function (e) {e.loopStart = _this176.loopStart, e.loopEnd = _this176.loopEnd, e.loop = t, _this176._testLoopBoundries(e);});} }, { key: "loopEnd", get: function get() {return new So(this.context, this._loopEnd).toSeconds();}, set: function set(t) {var _this177 = this;this._loopEnd = this.toTicks(t), this._loop && this._forEach(function (e) {e.loopEnd = t, _this177._testLoopBoundries(e);});} }, { key: "loopStart", get: function get() {return new So(this.context, this._loopStart).toSeconds();}, set: function set(t) {var _this178 = this;this._loopStart = this.toTicks(t), this._loop && this._forEach(function (t) {t.loopStart = _this178.loopStart, _this178._testLoopBoundries(t);});} }, { key: "playbackRate", get: function get() {return this._playbackRate;}, set: function set(t) {this._playbackRate = t, this._setAll("playbackRate", t);} }, { key: "length", get: function get() {return this._events.size;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Yr.getDefaults(), { events: [] });} }]);return Hr;}(Yr);function Jr(t) {var e;return _regeneratorRuntime.wrap(function Jr$(_context58) {while (1) {switch (_context58.prev = _context58.next) {case 0:e = 0;case 1:if (!(e < t)) {_context58.next = 8;break;}e = xi(e, 0, t - 1);_context58.next = 5;return e;case 5:e++;case 6:_context58.next = 1;break;case 8:case "end":return _context58.stop();}}}, _marked);}function Kr(t) {var e;return _regeneratorRuntime.wrap(function Kr$(_context59) {while (1) {switch (_context59.prev = _context59.next) {case 0:e = t - 1;case 1:if (!(e >= 0)) {_context59.next = 8;break;}e = xi(e, 0, t - 1);_context59.next = 5;return e;case 5:e--;case 6:_context59.next = 1;break;case 8:case "end":return _context59.stop();}}}, _marked2);}function ta(t, e) {return _regeneratorRuntime.wrap(function ta$(_context60) {while (1) {switch (_context60.prev = _context60.next) {case 0:return _context60.delegateYield(e(t), "t0", 1);case 1:_context60.next = 0;break;case 3:case "end":return _context60.stop();}}}, _marked3);}function ea(t, e) {var s;return _regeneratorRuntime.wrap(function ea$(_context61) {while (1) {switch (_context61.prev = _context61.next) {case 0:s = e ? 0 : t - 1;case 1:s = xi(s, 0, t - 1);_context61.next = 4;return s;case 4:e ? (s++, s >= t - 1 && (e = !1)) : (s--, s <= 0 && (e = !0));case 5:_context61.next = 1;break;case 7:case "end":return _context61.stop();}}}, _marked4);}function sa(t) {var e, s;return _regeneratorRuntime.wrap(function sa$(_context62) {while (1) {switch (_context62.prev = _context62.next) {case 0:e = 0, s = 0;case 1:if (!(e < t)) {_context62.next = 9;break;}e = xi(e, 0, t - 1);_context62.next = 5;return e;case 5:s++;e += s % 2 ? 2 : -1;case 7:_context62.next = 1;break;case 9:case "end":return _context62.stop();}}}, _marked5);}function na(t) {var e, s;return _regeneratorRuntime.wrap(function na$(_context63) {while (1) {switch (_context63.prev = _context63.next) {case 0:e = t - 1, s = 0;case 1:if (!(e >= 0)) {_context63.next = 9;break;}e = xi(e, 0, t - 1);_context63.next = 5;return e;case 5:s++;e += s % 2 ? -2 : 1;case 7:_context63.next = 1;break;case 9:case "end":return _context63.stop();}}}, _marked6);}function ia(t) {var e, _s85, _s86;return _regeneratorRuntime.wrap(function ia$(_context64) {while (1) {switch (_context64.prev = _context64.next) {case 0:e = [];for (_s85 = 0; _s85 < t; _s85++) {e.push(_s85);}case 2:if (!(e.length > 0)) {_context64.next = 8;break;}_s86 = xi(e.splice(Math.floor(e.length * Math.random()), 1)[0], 0, t - 1);_context64.next = 6;return _s86;case 6:_context64.next = 2;break;case 8:case "end":return _context64.stop();}}}, _marked7);}function oa(t) {var e,s,_args67 = arguments;return _regeneratorRuntime.wrap(function oa$(_context67) {while (1) {switch (_context67.prev = _context67.next) {case 0:e = _args67.length > 1 && _args67[1] !== undefined ? _args67[1] : "up";s = _args67.length > 2 && _args67[2] !== undefined ? _args67[2] : 0;_context67.t0 = (
                Bn(t >= 1, "The number of values must be at least one"), e);_context67.next = _context67.t0 ===
                "up" ? 5 : _context67.t0 ===

                "down" ? 6 : _context67.t0 ===

                "upDown" ? 7 : _context67.t0 ===

                "downUp" ? 8 : _context67.t0 ===

                "alternateUp" ? 9 : _context67.t0 ===

                "alternateDown" ? 10 : _context67.t0 ===

                "random" ? 11 : _context67.t0 ===






                "randomOnce" ? 12 : _context67.t0 ===

                "randomWalk" ? 13 : 14;break;case 5:return _context67.delegateYield(ta(t, Jr), "t1", 6);case 6:return _context67.delegateYield(ta(t, Kr), "t2", 7);case 7:return _context67.delegateYield(ea(t, !0), "t3", 8);case 8:return _context67.delegateYield(ea(t, !1), "t4", 9);case 9:return _context67.delegateYield(ta(t, sa), "t5", 10);case 10:return _context67.delegateYield(ta(t, na), "t6", 11);case 11:return _context67.delegateYield( /*#__PURE__*/_regeneratorRuntime.mark(function _callee58(t) {var _e116;return _regeneratorRuntime.wrap(function _callee58$(_context65) {while (1) {switch (_context65.prev = _context65.next) {case 0:_e116 = Math.floor(Math.random() * t);_context65.next = 3;return _e116;case 3:_context65.next = 0;break;case 5:case "end":return _context65.stop();}}}, _callee58);})(t), "t7", 12);case 12:return _context67.delegateYield(ta(t, ia), "t8", 13);case 13:
                return _context67.delegateYield( /*#__PURE__*/_regeneratorRuntime.mark(function _callee59(t) {var e;return _regeneratorRuntime.wrap(function _callee59$(_context66) {while (1) {switch (_context66.prev = _context66.next) {case 0:
                          e = Math.floor(Math.random() * t);case 1:
                          0 === e ? e++ : e === t - 1 || Math.random() < .5 ?
                          e-- : e++;_context66.next = 4;return e;case 4:_context66.next = 1;break;case 6:case "end":return _context66.stop();}}}, _callee59);})(
                t), "t9", 14);case 14:case "end":return _context67.stop();}}}, _marked8);}var


      ra = /*#__PURE__*/function (_$r) {_inherits(ra, _$r);var _super119 = _createSuper(ra);
        function ra() {var _this179;_classCallCheck(this, ra);
          _this179 = _super119.call(this, ui(ra.getDefaults(), arguments, ["callback", "values",
          "pattern"])), _this179.name = "Pattern";
          var t = ui(ra.getDefaults(), arguments, ["callback", "values",
          "pattern"]);

          _this179.callback = t.callback, _this179._values = t.values, _this179._pattern = oa(
          t.values.length, t.pattern), _this179._type = t.pattern;return _this179;
        }_createClass(ra, [{ key: "_tick", value: function _tick(







          t) {
            var e = this._pattern.next();
            this._index = e.value, this._value = this._values[e.value], this.
            callback(t, this._value);
          } }, { key: "values", get: function get()
          {
            return this._values;
          }, set: function set(
          t) {
            this._values = t, this.pattern = this._type;
          } }, { key: "value", get: function get()
          {
            return this._value;
          } }, { key: "index", get: function get()
          {
            return this._index;
          } }, { key: "pattern", get: function get()
          {
            return this._type;
          }, set: function set(
          t) {
            this._type = t, this._pattern = oa(this._values.length, this._type);
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign($r.getDefaults(), { pattern: "up", values: [], callback: Ei });} }]);return ra;}($r);var

      aa = /*#__PURE__*/function (_Yr2) {_inherits(aa, _Yr2);var _super120 = _createSuper(aa);
        function aa() {var _this180;_classCallCheck(this, aa);
          _this180 = _super120.call(this, ui(aa.getDefaults(), arguments, ["callback", "events",
          "subdivision"])),
          _this180.name = "Sequence", _this180._part = new Hr({
            callback: _this180._seqCallback.bind(_assertThisInitialized(_this180)),
            context: _this180.context }),
          _this180._events = [], _this180._eventsArray = [];
          var t = ui(aa.getDefaults(), arguments, ["callback", "events",
          "subdivision"]);

          _this180._subdivision = _this180.toTicks(t.subdivision), _this180.events = t.events,
          _this180.loop = t.loop, _this180.loopStart = t.loopStart, _this180.loopEnd = t.
          loopEnd, _this180.playbackRate = t.playbackRate, _this180.probability = t.
          probability, _this180.humanize = t.humanize, _this180.mute = t.mute, _this180.
          playbackRate = t.playbackRate;return _this180;
        }_createClass(aa, [{ key: "_seqCallback", value: function _seqCallback(









          t, e) {
            null === e || this.mute || this.callback(t, e);
          } }, { key: "start", value: function start(







          t, e) {
            return this._part.start(t, e ? this._indexTime(e) : e), this;
          } }, { key: "stop", value: function stop(
          t) {
            return this._part.stop(t), this;
          } }, { key: "_createSequence", value: function _createSequence(



          t) {var _this181 = this;
            return new Proxy(t, {
              get: function get(t, e) {return t[e];},
              set: function set(t, e, s) {return zn(e) && isFinite(parseInt(e, 10)) && Ln(
                s) ? t[e] = _this181._createSequence(s) : t[e] = s,
                _this181._eventsUpdated(), !0;} });

          } }, { key: "_eventsUpdated", value: function _eventsUpdated()
          {
            this._part.clear(), this._rescheduleSequence(this._eventsArray, this.
            _subdivision, this.startOffset), this.loopEnd = this.loopEnd;
          } }, { key: "_rescheduleSequence", value: function _rescheduleSequence(
          t, e, s) {var _this182 = this;
            t.forEach(function (t, n) {
              var i = n * e + s;
              if (Ln(t)) _this182._rescheduleSequence(t, e / t.length, i);else
              {
                var _e117 = new So(_this182.context, i, "i").toSeconds();
                _this182._part.add(_e117, t);
              }
            });
          } }, { key: "_indexTime", value: function _indexTime(
          t) {
            return new So(this.context, t * this._subdivision + this.startOffset).
            toSeconds();
          } }, { key: "clear", value: function clear()
          {
            return this._part.clear(), this;
          } }, { key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(aa.prototype), "dispose", this).call(this), this._part.dispose(), this;
          } }, { key: "events", get: function get() {return this._events;}, set: function set(t) {this.clear(), this._eventsArray = t, this._events = this._createSequence(this._eventsArray), this._eventsUpdated();} }, { key: "subdivision", get: function get() {return new So(this.context, this._subdivision).toSeconds();} }, { key: "loop", get: function get()
          {
            return this._part.loop;
          }, set: function set(
          t) {
            this._part.loop = t;
          } }, { key: "loopStart", get: function get()
          {
            return this._loopStart;
          }, set: function set(
          t) {
            this._loopStart = t, this._part.loopStart = this._indexTime(t);
          } }, { key: "loopEnd", get: function get()
          {
            return this._loopEnd;
          }, set: function set(
          t) {
            this._loopEnd = t, this._part.loopEnd = 0 === t ? this._indexTime(this.
            _eventsArray.length) : this._indexTime(t);
          } }, { key: "startOffset", get: function get()
          {
            return this._part.startOffset;
          }, set: function set(
          t) {
            this._part.startOffset = t;
          } }, { key: "playbackRate", get: function get()
          {
            return this._part.playbackRate;
          }, set: function set(
          t) {
            this._part.playbackRate = t;
          } }, { key: "probability", get: function get()
          {
            return this._part.probability;
          }, set: function set(
          t) {
            this._part.probability = t;
          } }, { key: "progress", get: function get()
          {
            return this._part.progress;
          } }, { key: "humanize", get: function get()
          {
            return this._part.humanize;
          }, set: function set(
          t) {
            this._part.humanize = t;
          } }, { key: "length", get: function get()
          {
            return this._part.length;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(di(Yr.getDefaults(), ["value"]), { events: [], loop: !0, loopEnd: 0, loopStart: 0, subdivision: "8n" });} }]);return aa;}(Yr);var

      ca = /*#__PURE__*/function (_io19) {_inherits(ca, _io19);var _super121 = _createSuper(ca);
        function ca() {var _this183;_classCallCheck(this, ca);
          _this183 = _super121.call(this, Object.assign(ui(ca.getDefaults(), arguments, ["fade"]))), _this183.
          name = "CrossFade", _this183._panner = _this183.context.
          createStereoPanner(), _this183._split = _this183.context.
          createChannelSplitter(2), _this183._g2a = new pr({
            context: _this183.context }),
          _this183.a = new ho({
            context: _this183.context,
            gain: 0 }),
          _this183.b = new ho({
            context: _this183.context,
            gain: 0 }),
          _this183.output = new ho({
            context: _this183.context }),
          _this183._internalChannels = [_this183.a, _this183.b];
          var t = ui(ca.getDefaults(), arguments, ["fade"]);
          _this183.fade = new po({
            context: _this183.context,
            units: "normalRange",
            value: t.fade }),
          Oi(_assertThisInitialized(_this183), "fade"), _this183.context.getConstant(1).connect(_this183.
          _panner), _this183._panner.connect(_this183._split), _this183._panner.
          channelCount = 1, _this183._panner.channelCountMode = "explicit", ro(
          _this183._split, _this183.a.gain, 0), ro(_this183._split, _this183.b.gain, 1),
          _this183.fade.chain(_this183._g2a, _this183._panner.pan), _this183.a.connect(_this183.
          output), _this183.b.connect(_this183.output);return _this183;
        }_createClass(ca, [{ key: "dispose", value: function dispose()





          {
            return _get(_getPrototypeOf(ca.prototype), "dispose", this).call(this), this.a.dispose(), this.b.dispose(), this.output.
            dispose(), this.fade.dispose(), this._g2a.dispose(), this._panner.
            disconnect(), this._split.disconnect(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { fade: .5 });} }]);return ca;}(io);var

      ha = /*#__PURE__*/function (_io20) {_inherits(ha, _io20);var _super122 = _createSuper(ha);
        function ha(t) {var _this184;_classCallCheck(this, ha);
          _this184 = _super122.call(this, t), _this184.name = "Effect", _this184._dryWet = new ca({
            context: _this184.context }),
          _this184.wet = _this184._dryWet.fade, _this184.effectSend = new ho({
            context: _this184.context }),
          _this184.effectReturn = new ho({
            context: _this184.context }),
          _this184.input = new ho({
            context: _this184.context }),
          _this184.output = _this184._dryWet, _this184.input.fan(_this184._dryWet.a, _this184.
          effectSend), _this184.effectReturn.connect(_this184._dryWet.b), _this184.
          wet.setValueAtTime(t.wet, 0), _this184._internalChannels = [_this184.
          effectReturn, _this184.effectSend],
          Oi(_assertThisInitialized(_this184), "wet");return _this184;
        }_createClass(ha, [{ key: "connectEffect", value: function connectEffect(





          t) {
            return this._internalChannels.push(t), this.effectSend.chain(t, this.
            effectReturn), this;
          } }, { key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(ha.prototype), "dispose", this).call(this), this._dryWet.dispose(), this.effectSend.
            dispose(), this.effectReturn.dispose(), this.wet.dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { wet: 1 });} }]);return ha;}(io);var

      la = /*#__PURE__*/function (_ha) {_inherits(la, _ha);var _super123 = _createSuper(la);
        function la(t) {var _this185;_classCallCheck(this, la);
          _this185 = _super123.call(this, t), _this185.name = "LFOEffect", _this185._lfo = new or({
            context: _this185.context,
            frequency: t.frequency,
            amplitude: t.depth }),
          _this185.depth = _this185._lfo.amplitude, _this185.frequency = _this185._lfo.
          frequency, _this185.type = t.type, Oi(_assertThisInitialized(_this185), ["frequency", "depth"]);return _this185;
        }_createClass(la, [{ key: "start", value: function start(







          t) {
            return this._lfo.start(t), this;
          } }, { key: "stop", value: function stop(
          t) {
            return this._lfo.stop(t), this;
          } }, { key: "sync", value: function sync()
          {
            return this._lfo.sync(), this;
          } }, { key: "unsync", value: function unsync()
          {
            return this._lfo.unsync(), this;
          } }, { key: "dispose", value: function dispose()






          {
            return _get(_getPrototypeOf(la.prototype), "dispose", this).call(this), this._lfo.dispose(), this.frequency.dispose(),
            this.depth.dispose(), this;
          } }, { key: "type", get: function get() {return this._lfo.type;}, set: function set(t) {this._lfo.type = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(ha.getDefaults(), { frequency: 1, type: "sine", depth: 1 });} }]);return la;}(ha);var

      ua = /*#__PURE__*/function (_la) {_inherits(ua, _la);var _super124 = _createSuper(ua);
        function ua() {var _this186;_classCallCheck(this, ua);
          _this186 = _super124.call(this, ui(ua.getDefaults(), arguments, ["frequency", "baseFrequency",
          "octaves"])),
          _this186.name = "AutoFilter";
          var t = ui(ua.getDefaults(), arguments, ["frequency", "baseFrequency",
          "octaves"]);

          _this186.filter = new Or(Object.assign(t.filter, {
            context: _this186.context })),
          _this186.connectEffect(_this186.filter), _this186._lfo.connect(_this186.filter.
          frequency), _this186.octaves = t.octaves, _this186.baseFrequency = t.
          baseFrequency;return _this186;
        }_createClass(ua, [{ key: "dispose", value: function dispose()























          {
            return _get(_getPrototypeOf(ua.prototype), "dispose", this).call(this), this.filter.dispose(), this;
          } }, { key: "baseFrequency", get: function get() {return this._lfo.min;}, set: function set(t) {this._lfo.min = this.toFrequency(t), this.octaves = this._octaves;} }, { key: "octaves", get: function get() {return this._octaves;}, set: function set(t) {this._octaves = t, this._lfo.max = this._lfo.min * Math.pow(2, t);} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(la.getDefaults(), { baseFrequency: 200, octaves: 2.6, filter: { type: "lowpass", rolloff: -12, Q: 1 } });} }]);return ua;}(la);var

      pa = /*#__PURE__*/function (_io21) {_inherits(pa, _io21);var _super125 = _createSuper(pa);
        function pa() {var _this187;_classCallCheck(this, pa);
          _this187 = _super125.call(this, Object.assign(ui(pa.getDefaults(), arguments, ["pan"]))), _this187.
          name = "Panner", _this187._panner = _this187.context.createStereoPanner(),
          _this187.input = _this187._panner, _this187.output = _this187._panner;
          var t = ui(pa.getDefaults(), arguments, ["pan"]);
          _this187.pan = new no({
            context: _this187.context,
            param: _this187._panner.pan,
            value: t.pan,
            minValue: -1,
            maxValue: 1 }),
          _this187._panner.channelCount = t.channelCount, _this187._panner.
          channelCountMode = "explicit", Oi(_assertThisInitialized(_this187), "pan");return _this187;
        }_createClass(pa, [{ key: "dispose", value: function dispose()






          {
            return _get(_getPrototypeOf(pa.prototype), "dispose", this).call(this), this._panner.disconnect(), this.pan.dispose(),
            this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { pan: 0, channelCount: 1 });} }]);return pa;}(io);var

      da = /*#__PURE__*/function (_la2) {_inherits(da, _la2);var _super126 = _createSuper(da);
        function da() {var _this188;_classCallCheck(this, da);
          _this188 = _super126.call(this, ui(da.getDefaults(), arguments, ["frequency"])), _this188.name =
          "AutoPanner";
          var t = ui(da.getDefaults(), arguments, ["frequency"]);
          _this188._panner = new pa({
            context: _this188.context,
            channelCount: t.channelCount }),
          _this188.connectEffect(_this188._panner), _this188._lfo.connect(_this188._panner.
          pan), _this188._lfo.min = -1, _this188._lfo.max = 1;return _this188;
        }_createClass(da, [{ key: "dispose", value: function dispose()





          {
            return _get(_getPrototypeOf(da.prototype), "dispose", this).call(this), this._panner.dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(la.getDefaults(), { channelCount: 1 });} }]);return da;}(la);var

      fa = /*#__PURE__*/function (_io22) {_inherits(fa, _io22);var _super127 = _createSuper(fa);
        function fa() {var _this189;_classCallCheck(this, fa);
          _this189 = _super127.call(this, ui(fa.getDefaults(), arguments, ["smoothing"])), _this189.name =
          "Follower";
          var t = ui(fa.getDefaults(), arguments, ["smoothing"]);
          _this189._abs = _this189.input = new ur({
            context: _this189.context }),
          _this189._lowpass = _this189.output = new Ur({
            context: _this189.context,
            frequency: 1 / _this189.toSeconds(t.smoothing),
            type: "lowpass" }),
          _this189._abs.connect(_this189._lowpass), _this189._smoothing = t.smoothing;return _this189;
        }_createClass(fa, [{ key: "dispose", value: function dispose()












          {
            return _get(_getPrototypeOf(fa.prototype), "dispose", this).call(this), this._abs.dispose(), this._lowpass.dispose(),
            this;
          } }, { key: "smoothing", get: function get() {return this._smoothing;}, set: function set(t) {this._smoothing = t, this._lowpass.frequency = 1 / this.toSeconds(this.smoothing);} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { smoothing: .05 });} }]);return fa;}(io);var

      _a = /*#__PURE__*/function (_ha2) {_inherits(_a, _ha2);var _super128 = _createSuper(_a);
        function _a() {var _this190;_classCallCheck(this, _a);
          _this190 = _super128.call(this, ui(_a.getDefaults(), arguments, ["baseFrequency", "octaves",
          "sensitivity"])),
          _this190.name = "AutoWah";
          var t = ui(_a.getDefaults(), arguments, ["baseFrequency", "octaves",
          "sensitivity"]);

          _this190._follower = new fa({
            context: _this190.context,
            smoothing: t.follower }),
          _this190._sweepRange = new vr({
            context: _this190.context,
            min: 0,
            max: 1,
            exponent: .5 }),
          _this190._baseFrequency = _this190.toFrequency(t.baseFrequency), _this190.
          _octaves = t.octaves, _this190._inputBoost = new ho({
            context: _this190.context }),
          _this190._bandpass = new Or({
            context: _this190.context,
            rolloff: -48,
            frequency: 0,
            Q: t.Q }),
          _this190._peaking = new Or({
            context: _this190.context,
            type: "peaking" }),
          _this190._peaking.gain.value = t.gain, _this190.gain = _this190._peaking.
          gain, _this190.Q = _this190._bandpass.Q, _this190.effectSend.chain(_this190.
          _inputBoost, _this190._follower, _this190._sweepRange), _this190.
          _sweepRange.connect(_this190._bandpass.frequency), _this190._sweepRange.
          connect(_this190._peaking.frequency), _this190.effectSend.chain(_this190.
          _bandpass, _this190._peaking, _this190.effectReturn), _this190.
          _setSweepRange(), _this190.sensitivity = t.sensitivity, Oi(_assertThisInitialized(_this190), [
          "gain", "Q"]);return _this190;

        }_createClass(_a, [{ key: "_setSweepRange", value: function _setSweepRange()


































          {
            this._sweepRange.min = this._baseFrequency, this._sweepRange.max = Math.
            min(this._baseFrequency * Math.pow(2, this._octaves), this.context.
            sampleRate / 2);
          } }, { key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(_a.prototype), "dispose", this).call(this), this._follower.dispose(), this._sweepRange.
            dispose(), this._bandpass.dispose(), this._peaking.dispose(), this.
            _inputBoost.dispose(), this;
          } }, { key: "octaves", get: function get() {return this._octaves;}, set: function set(t) {this._octaves = t, this._setSweepRange();} }, { key: "follower", get: function get() {return this._follower.smoothing;}, set: function set(t) {this._follower.smoothing = t;} }, { key: "baseFrequency", get: function get() {return this._baseFrequency;}, set: function set(t) {this._baseFrequency = this.toFrequency(t), this._setSweepRange();} }, { key: "sensitivity", get: function get() {return Li(1 / this._inputBoost.gain.value);}, set: function set(t) {this._inputBoost.gain.value = 1 / ji(t);} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(ha.getDefaults(), { baseFrequency: 100, octaves: 6, sensitivity: 0, Q: 2, gain: 2, follower: .2 });} }]);return _a;}(ha);

      var ma = "bit-crusher";
      Lr(ma,
      "\n\tclass BitCrusherWorklet extends SingleIOProcessor {\n\n\t\tstatic get parameterDescriptors() {\n\t\t\treturn [{\n\t\t\t\tname: \"bits\",\n\t\t\t\tdefaultValue: 12,\n\t\t\t\tminValue: 1,\n\t\t\t\tmaxValue: 16,\n\t\t\t\tautomationRate: 'k-rate'\n\t\t\t}];\n\t\t}\n\n\t\tgenerate(input, _channel, parameters) {\n\t\t\tconst step = Math.pow(0.5, parameters.bits - 1);\n\t\t\tconst val = step * Math.floor(input / step + 0.5);\n\t\t\treturn val;\n\t\t}\n\t}\n");var
      ga = /*#__PURE__*/function (_ha3) {_inherits(ga, _ha3);var _super129 = _createSuper(ga);
        function ga() {var _this191;_classCallCheck(this, ga);
          _this191 = _super129.call(this, ui(ga.getDefaults(), arguments, ["bits"])), _this191.name =
          "BitCrusher";
          var t = ui(ga.getDefaults(), arguments, ["bits"]);
          _this191._bitCrusherWorklet = new va({
            context: _this191.context,
            bits: t.bits }),
          _this191.connectEffect(_this191._bitCrusherWorklet), _this191.bits = _this191.
          _bitCrusherWorklet.bits;return _this191;
        }_createClass(ga, [{ key: "dispose", value: function dispose()





          {
            return _get(_getPrototypeOf(ga.prototype), "dispose", this).call(this), this._bitCrusherWorklet.dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(ha.getDefaults(), { bits: 4 });} }]);return ga;}(ha);var

      va = /*#__PURE__*/function (_zr2) {_inherits(va, _zr2);var _super130 = _createSuper(va);
        function va() {var _this192;_classCallCheck(this, va);
          _this192 = _super130.call(this, ui(va.getDefaults(), arguments)), _this192.name = "BitCrusherWorklet";
          var t = ui(va.getDefaults(), arguments);
          _this192.input = new ho({
            context: _this192.context }),
          _this192.output = new ho({
            context: _this192.context }),
          _this192.bits = new no({
            context: _this192.context,
            value: t.bits,
            units: "positive",
            minValue: 1,
            maxValue: 16,
            param: _this192._dummyParam,
            swappable: !0 });return _this192;

        }_createClass(va, [{ key: "_audioWorkletName", value: function _audioWorkletName()





          {
            return ma;
          } }, { key: "onReady", value: function onReady(
          t) {
            oo(this.input, t, this.output);
            var e = t.parameters.get("bits");
            this.bits.setParam(e);
          } }, { key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(va.prototype), "dispose", this).call(this), this.input.dispose(), this.output.dispose(),
            this.bits.dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(zr.getDefaults(), { bits: 12 });} }]);return va;}(zr);var

      ya = /*#__PURE__*/function (_ha4) {_inherits(ya, _ha4);var _super131 = _createSuper(ya);
        function ya() {var _this193;_classCallCheck(this, ya);
          _this193 = _super131.call(this, ui(ya.getDefaults(), arguments, ["order"])), _this193.name =
          "Chebyshev";
          var t = ui(ya.getDefaults(), arguments, ["order"]);
          _this193._shaper = new Qo({
            context: _this193.context,
            length: 4096 }),
          _this193._order = t.order, _this193.connectEffect(_this193._shaper), _this193.
          order = t.order, _this193.oversample = t.oversample;return _this193;
        }_createClass(ya, [{ key: "_getCoefficient", value: function _getCoefficient(






          t, e, s) {
            return s.has(e) || (0 === e ? s.set(e, 0) : 1 === e ? s.set(e, t) : s.
            set(e, 2 * t * this._getCoefficient(t, e - 1, s) - this.
            _getCoefficient(t, e - 2, s))), s.get(e);
          } }, { key: "dispose", value: function dispose()













          {
            return _get(_getPrototypeOf(ya.prototype), "dispose", this).call(this), this._shaper.dispose(), this;
          } }, { key: "order", get: function get() {return this._order;}, set: function set(t) {var _this194 = this;Bn(Number.isInteger(t), "'order' must be an integer"), this._order = t, this._shaper.setMap(function (e) {return _this194._getCoefficient(e, t, new Map());});} }, { key: "oversample", get: function get() {return this._shaper.oversample;}, set: function set(t) {this._shaper.oversample = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(ha.getDefaults(), { order: 1, oversample: "none" });} }]);return ya;}(ha);var

      xa = /*#__PURE__*/function (_io23) {_inherits(xa, _io23);var _super132 = _createSuper(xa);
        function xa() {var _this195;_classCallCheck(this, xa);
          _this195 = _super132.call(this, ui(xa.getDefaults(), arguments, ["channels"])), _this195.name =
          "Split";
          var t = ui(xa.getDefaults(), arguments, ["channels"]);
          _this195._splitter = _this195.input = _this195.output = _this195.context.
          createChannelSplitter(t.channels), _this195._internalChannels = [_this195.
          _splitter];return _this195;

        }_createClass(xa, [{ key: "dispose", value: function dispose()





          {
            return _get(_getPrototypeOf(xa.prototype), "dispose", this).call(this), this._splitter.disconnect(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { channels: 2 });} }]);return xa;}(io);var

      wa = /*#__PURE__*/function (_io24) {_inherits(wa, _io24);var _super133 = _createSuper(wa);
        function wa() {var _this196;_classCallCheck(this, wa);
          _this196 = _super133.call(this, ui(wa.getDefaults(), arguments, ["channels"])), _this196.name =
          "Merge";
          var t = ui(wa.getDefaults(), arguments, ["channels"]);
          _this196._merger = _this196.output = _this196.input = _this196.context.
          createChannelMerger(t.channels);return _this196;
        }_createClass(wa, [{ key: "dispose", value: function dispose()





          {
            return _get(_getPrototypeOf(wa.prototype), "dispose", this).call(this), this._merger.disconnect(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { channels: 2 });} }]);return wa;}(io);var

      ba = /*#__PURE__*/function (_io25) {_inherits(ba, _io25);var _super134 = _createSuper(ba);
        function ba(t) {var _this197;_classCallCheck(this, ba);
          _this197 = _super134.call(this, t), _this197.name = "StereoEffect", _this197.input = new ho({
            context: _this197.context }),
          _this197.input.channelCount = 2, _this197.input.channelCountMode =
          "explicit", _this197._dryWet = _this197.output = new ca({
            context: _this197.context,
            fade: t.wet }),
          _this197.wet = _this197._dryWet.fade, _this197._split = new xa({
            context: _this197.context,
            channels: 2 }),
          _this197._merge = new wa({
            context: _this197.context,
            channels: 2 }),
          _this197.input.connect(_this197._split), _this197.input.connect(_this197._dryWet.
          a), _this197._merge.connect(_this197._dryWet.b), Oi(_assertThisInitialized(_this197), ["wet"]);return _this197;
        }_createClass(ba, [{ key: "connectEffectLeft", value: function connectEffectLeft()
          {var _ref84;
            this._split.connect(arguments.length <= 0 ? undefined : arguments[0], 0, 0), oo.apply(void 0, arguments), ro((_ref84 = arguments.length - 1, _ref84 < 0 || arguments.length <= _ref84 ? undefined : arguments[_ref84]), this.
            _merge, 0, 0);
          } }, { key: "connectEffectRight", value: function connectEffectRight()
          {var _ref85;
            this._split.connect(arguments.length <= 0 ? undefined : arguments[0], 1, 0), oo.apply(void 0, arguments), ro((_ref85 = arguments.length - 1, _ref85 < 0 || arguments.length <= _ref85 ? undefined : arguments[_ref85]), this.
            _merge, 0, 1);
          } }, { key: "dispose", value: function dispose()





          {
            return _get(_getPrototypeOf(ba.prototype), "dispose", this).call(this), this._dryWet.dispose(), this._split.dispose(),
            this._merge.dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { wet: 1 });} }]);return ba;}(io);var

      Ta = /*#__PURE__*/function (_ba) {_inherits(Ta, _ba);var _super135 = _createSuper(Ta);
        function Ta(t) {var _this198;_classCallCheck(this, Ta);
          _this198 = _super135.call(this, t), _this198.feedback = new po({
            context: _this198.context,
            value: t.feedback,
            units: "normalRange" }),
          _this198._feedbackL = new ho({
            context: _this198.context }),
          _this198._feedbackR = new ho({
            context: _this198.context }),
          _this198._feedbackSplit = new xa({
            context: _this198.context,
            channels: 2 }),
          _this198._feedbackMerge = new wa({
            context: _this198.context,
            channels: 2 }),
          _this198._merge.connect(_this198._feedbackSplit), _this198._feedbackMerge.
          connect(_this198._split), _this198._feedbackSplit.connect(_this198._feedbackL,
          0, 0), _this198._feedbackL.connect(_this198._feedbackMerge, 0, 0), _this198.
          _feedbackSplit.connect(_this198._feedbackR, 1, 0), _this198._feedbackR.
          connect(_this198._feedbackMerge, 0, 1), _this198.feedback.fan(_this198.
          _feedbackL.gain, _this198._feedbackR.gain), Oi(_assertThisInitialized(_this198), ["feedback"]);return _this198;
        }_createClass(Ta, [{ key: "dispose", value: function dispose()





          {
            return _get(_getPrototypeOf(Ta.prototype), "dispose", this).call(this), this.feedback.dispose(), this._feedbackL.
            dispose(), this._feedbackR.dispose(), this._feedbackSplit.
            dispose(), this._feedbackMerge.dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(ba.getDefaults(), { feedback: .5 });} }]);return Ta;}(ba);var

      Sa = /*#__PURE__*/function (_Ta) {_inherits(Sa, _Ta);var _super136 = _createSuper(Sa);
        function Sa() {var _this199;_classCallCheck(this, Sa);
          _this199 = _super136.call(this, ui(Sa.getDefaults(), arguments, ["frequency", "delayTime",
          "depth"])), _this199.name = "Chorus";
          var t = ui(Sa.getDefaults(), arguments, ["frequency", "delayTime",
          "depth"]);

          _this199._depth = t.depth, _this199._delayTime = t.delayTime / 1e3, _this199._lfoL =
          new or({
            context: _this199.context,
            frequency: t.frequency,
            min: 0,
            max: 1 }),
          _this199._lfoR = new or({
            context: _this199.context,
            frequency: t.frequency,
            min: 0,
            max: 1,
            phase: 180 }),
          _this199._delayNodeL = new yo({
            context: _this199.context }),
          _this199._delayNodeR = new yo({
            context: _this199.context }),
          _this199.frequency = _this199._lfoL.frequency, Oi(_assertThisInitialized(_this199), ["frequency"]),
          _this199._lfoL.frequency.connect(_this199._lfoR.frequency), _this199.
          connectEffectLeft(_this199._delayNodeL), _this199.connectEffectRight(_this199.
          _delayNodeR), _this199._lfoL.connect(_this199._delayNodeL.delayTime),
          _this199._lfoR.connect(_this199._delayNodeR.delayTime), _this199.depth = _this199.
          _depth, _this199.type = t.type, _this199.spread = t.spread;return _this199;
        }_createClass(Sa, [{ key: "start", value: function start(







































          t) {
            return this._lfoL.start(t), this._lfoR.start(t), this;
          } }, { key: "stop", value: function stop(
          t) {
            return this._lfoL.stop(t), this._lfoR.stop(t), this;
          } }, { key: "sync", value: function sync()
          {
            return this._lfoL.sync(), this._lfoR.sync(), this;
          } }, { key: "unsync", value: function unsync()
          {
            return this._lfoL.unsync(), this._lfoR.unsync(), this;
          } }, { key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(Sa.prototype), "dispose", this).call(this), this._lfoL.dispose(), this._lfoR.dispose(), this.
            _delayNodeL.dispose(), this._delayNodeR.dispose(), this.frequency.
            dispose(), this;
          } }, { key: "depth", get: function get() {return this._depth;}, set: function set(t) {this._depth = t;var e = this._delayTime * t;this._lfoL.min = Math.max(this._delayTime - e, 0), this._lfoL.max = this._delayTime + e, this._lfoR.min = Math.max(this._delayTime - e, 0), this._lfoR.max = this._delayTime + e;} }, { key: "delayTime", get: function get() {return 1e3 * this._delayTime;}, set: function set(t) {this._delayTime = t / 1e3, this.depth = this._depth;} }, { key: "type", get: function get() {return this._lfoL.type;}, set: function set(t) {this._lfoL.type = t, this._lfoR.type = t;} }, { key: "spread", get: function get() {return this._lfoR.phase - this._lfoL.phase;}, set: function set(t) {this._lfoL.phase = 90 - t / 2, this._lfoR.phase = t / 2 + 90;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Ta.getDefaults(), { frequency: 1.5, delayTime: 3.5, depth: .7, type: "sine", spread: 180, feedback: 0, wet: .5 });} }]);return Sa;}(Ta);var

      ka = /*#__PURE__*/function (_ha5) {_inherits(ka, _ha5);var _super137 = _createSuper(ka);
        function ka() {var _this200;_classCallCheck(this, ka);
          _this200 = _super137.call(this, ui(ka.getDefaults(), arguments, ["distortion"])), _this200.name =
          "Distortion";
          var t = ui(ka.getDefaults(), arguments, ["distortion"]);
          _this200._shaper = new Qo({
            context: _this200.context,
            length: 4096 }),
          _this200._distortion = t.distortion, _this200.connectEffect(_this200.
          _shaper), _this200.distortion = t.distortion, _this200.oversample = t.
          oversample;return _this200;
        }_createClass(ka, [{ key: "dispose", value: function dispose()






















          {
            return _get(_getPrototypeOf(ka.prototype), "dispose", this).call(this), this._shaper.dispose(), this;
          } }, { key: "distortion", get: function get() {return this._distortion;}, set: function set(t) {this._distortion = t;var e = 100 * t,s = Math.PI / 180;this._shaper.setMap(function (t) {return Math.abs(t) < .001 ? 0 : (3 + e) * t * 20 * s / (Math.PI + e * Math.abs(t));});} }, { key: "oversample", get: function get() {return this._shaper.oversample;}, set: function set(t) {this._shaper.oversample = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(ha.getDefaults(), { distortion: .4, oversample: "none" });} }]);return ka;}(ha);var

      Aa = /*#__PURE__*/function (_ha6) {_inherits(Aa, _ha6);var _super138 = _createSuper(Aa);
        function Aa(t) {var _this201;_classCallCheck(this, Aa);
          _this201 = _super138.call(this, t), _this201.name = "FeedbackEffect", _this201._feedbackGain = new ho({
            context: _this201.context,
            gain: t.feedback,
            units: "normalRange" }),
          _this201.feedback = _this201._feedbackGain.gain, Oi(_assertThisInitialized(_this201), "feedback"),
          _this201.effectReturn.chain(_this201._feedbackGain, _this201.effectSend);return _this201;
        }_createClass(Aa, [{ key: "dispose", value: function dispose()





          {
            return _get(_getPrototypeOf(Aa.prototype), "dispose", this).call(this), this._feedbackGain.dispose(), this.feedback.
            dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(ha.getDefaults(), { feedback: .125 });} }]);return Aa;}(ha);var

      Ca = /*#__PURE__*/function (_Aa) {_inherits(Ca, _Aa);var _super139 = _createSuper(Ca);
        function Ca() {var _this202;_classCallCheck(this, Ca);
          _this202 = _super139.call(this, ui(Ca.getDefaults(), arguments, ["delayTime", "feedback"])), _this202.
          name = "FeedbackDelay";
          var t = ui(Ca.getDefaults(), arguments, ["delayTime", "feedback"]);
          _this202._delayNode = new yo({
            context: _this202.context,
            delayTime: t.delayTime,
            maxDelay: t.maxDelay }),
          _this202.delayTime = _this202._delayNode.delayTime, _this202.connectEffect(
          _this202._delayNode), Oi(_assertThisInitialized(_this202), "delayTime");return _this202;
        }_createClass(Ca, [{ key: "dispose", value: function dispose()






          {
            return _get(_getPrototypeOf(Ca.prototype), "dispose", this).call(this), this._delayNode.dispose(), this.delayTime.
            dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Aa.getDefaults(), { delayTime: .25, maxDelay: 1 });} }]);return Ca;}(Aa);var

      Da = /*#__PURE__*/function (_io26) {_inherits(Da, _io26);var _super140 = _createSuper(Da);
        function Da(t) {var _this203;_classCallCheck(this, Da);
          _this203 = _super140.call(this, t), _this203.name = "PhaseShiftAllpass", _this203.input = new ho({
            context: _this203.context }),
          _this203.output = new ho({
            context: _this203.context }),
          _this203.offset90 = new ho({
            context: _this203.context }),
          _this203._bank0 = _this203._createAllPassFilterBank([.6923878,
          .9360654322959, .988229522686, .9987488452737]),
          _this203._bank1 = _this203._createAllPassFilterBank([.4021921162426,
          .856171088242, .9722909545651, .9952884791278]),
          _this203._oneSampleDelay = _this203.context.createIIRFilter([0, 1], [1,
          0]),
          oo.apply(void 0, [_this203.input].concat(_toConsumableArray(_this203._bank0), [_this203._oneSampleDelay, _this203.
          output])), oo.apply(void 0, [_this203.input].concat(_toConsumableArray(_this203._bank1), [_this203.offset90]));return _this203;
        }_createClass(Da, [{ key: "_createAllPassFilterBank", value: function _createAllPassFilterBank(
          t) {var _this204 = this;
            return t.map(function (t) {
              var e = [
              [t * t, 0, -1],
              [1, 0, -t * t]];

              return _this204.context.createIIRFilter(e[0], e[1]);
            });
          } }, { key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(Da.prototype), "dispose", this).call(this), this.input.dispose(), this.output.dispose(),
            this.offset90.dispose(), this._bank0.forEach(function (t) {return t.disconnect();}),
            this._bank1.forEach(function (t) {return t.disconnect();}), this._oneSampleDelay.
            disconnect(), this;
          } }]);return Da;}(io);var

      Oa = /*#__PURE__*/function (_ha7) {_inherits(Oa, _ha7);var _super141 = _createSuper(Oa);
        function Oa() {var _this205;_classCallCheck(this, Oa);
          _this205 = _super141.call(this, ui(Oa.getDefaults(), arguments, ["frequency"])), _this205.name =
          "FrequencyShifter";
          var t = ui(Oa.getDefaults(), arguments, ["frequency"]);
          _this205.frequency = new po({
            context: _this205.context,
            units: "frequency",
            value: t.frequency,
            minValue: -_this205.context.sampleRate / 2,
            maxValue: _this205.context.sampleRate / 2 }),
          _this205._sine = new Bo({
            context: _this205.context,
            type: "sine" }),
          _this205._cosine = new Uo({
            context: _this205.context,
            phase: -90,
            type: "sine" }),
          _this205._sineMultiply = new Xo({
            context: _this205.context }),
          _this205._cosineMultiply = new Xo({
            context: _this205.context }),
          _this205._negate = new dr({
            context: _this205.context }),
          _this205._add = new sr({
            context: _this205.context }),
          _this205._phaseShifter = new Da({
            context: _this205.context }),
          _this205.effectSend.connect(_this205._phaseShifter), _this205.frequency.fan(
          _this205._sine.frequency, _this205._cosine.frequency), _this205.
          _phaseShifter.offset90.connect(_this205._cosineMultiply), _this205._cosine.
          connect(_this205._cosineMultiply.factor), _this205._phaseShifter.connect(
          _this205._sineMultiply), _this205._sine.connect(_this205._sineMultiply.
          factor), _this205._sineMultiply.connect(_this205._negate), _this205.
          _cosineMultiply.connect(_this205._add), _this205._negate.connect(_this205._add.
          addend), _this205._add.connect(_this205.effectReturn);
          var e = _this205.immediate();
          _this205._sine.start(e), _this205._cosine.start(e);return _this205;
        }_createClass(Oa, [{ key: "dispose", value: function dispose()





          {
            return _get(_getPrototypeOf(Oa.prototype), "dispose", this).call(this), this.frequency.dispose(), this._add.dispose(),
            this._cosine.dispose(), this._cosineMultiply.dispose(), this._negate.
            dispose(), this._phaseShifter.dispose(), this._sine.dispose(), this.
            _sineMultiply.dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(ha.getDefaults(), { frequency: 0 });} }]);return Oa;}(ha);

      var Ma = [1557 / 44100, 1617 / 44100, 1491 / 44100, 1422 / 44100, 1277 / 44100,
      1356 / 44100, 1188 / 44100, 1116 / 44100],

      Ea = [225, 556, 441, 341];var
      Ra = /*#__PURE__*/function (_ba2) {_inherits(Ra, _ba2);var _super142 = _createSuper(Ra);
        function Ra() {var _this206;_classCallCheck(this, Ra);
          _this206 = _super142.call(this, ui(Ra.getDefaults(), arguments, ["roomSize", "dampening"])), _this206.
          name = "Freeverb", _this206._combFilters = [], _this206.
          _allpassFiltersL = [], _this206._allpassFiltersR = [];
          var t = ui(Ra.getDefaults(), arguments, ["roomSize", "dampening"]);
          _this206.roomSize = new po({
            context: _this206.context,
            value: t.roomSize,
            units: "normalRange" }),
          _this206._allpassFiltersL = Ea.map(function (t) {
            var e = _this206.context.createBiquadFilter();
            return e.type = "allpass", e.frequency.value = t, e;
          }), _this206._allpassFiltersR = Ea.map(function (t) {
            var e = _this206.context.createBiquadFilter();
            return e.type = "allpass", e.frequency.value = t, e;
          }), _this206._combFilters = Ma.map(function (e, s) {var _this207, _this208;
            var n = new Gr({
              context: _this206.context,
              dampening: t.dampening,
              delayTime: e });

            return s < Ma.length / 2 ? (_this207 = _this206).connectEffectLeft.apply(_this207, [n].concat(_toConsumableArray(
            _this206._allpassFiltersL))) : (_this208 = _this206).
            connectEffectRight.apply(_this208, [n].concat(_toConsumableArray(_this206._allpassFiltersR))),
            _this206.roomSize.connect(n.resonance), n;
          }), Oi(_assertThisInitialized(_this206), ["roomSize"]);return _this206;
        }_createClass(Ra, [{ key: "dispose", value: function dispose()












          {
            return _get(_getPrototypeOf(Ra.prototype), "dispose", this).call(this), this._allpassFiltersL.forEach(function (t) {return t.
              disconnect();}), this._allpassFiltersR.forEach(function (t) {return t.
              disconnect();}), this._combFilters.forEach(function (t) {return t.dispose();}),
            this.roomSize.dispose(), this;
          } }, { key: "dampening", get: function get() {return this._combFilters[0].dampening;}, set: function set(t) {this._combFilters.forEach(function (e) {return e.dampening = t;});} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(ba.getDefaults(), { roomSize: .7, dampening: 3e3 });} }]);return Ra;}(ba);

      var qa = [.06748, .06404, .08212, .09004],
      Fa = [.773, .802, .753, .733],
      Ia = [347, 113, 37];var
      Va = /*#__PURE__*/function (_ba3) {_inherits(Va, _ba3);var _super143 = _createSuper(Va);
        function Va() {var _this209;_classCallCheck(this, Va);
          _this209 = _super143.call(this, ui(Va.getDefaults(), arguments, ["roomSize"])), _this209.name =
          "JCReverb", _this209._allpassFilters = [], _this209.
          _feedbackCombFilters = [];
          var t = ui(Va.getDefaults(), arguments, ["roomSize"]);
          _this209.roomSize = new po({
            context: _this209.context,
            value: t.roomSize,
            units: "normalRange" }),
          _this209._scaleRoomSize = new nr({
            context: _this209.context,
            min: -.733,
            max: .197 }),
          _this209._allpassFilters = Ia.map(function (t) {
            var e = _this209.context.createBiquadFilter();
            return e.type = "allpass", e.frequency.value = t, e;
          }), _this209._feedbackCombFilters = qa.map(function (t, e) {var _this210, _this211;
            var s = new Br({
              context: _this209.context,
              delayTime: t });

            return _this209._scaleRoomSize.connect(s.resonance), s.
            resonance.value = Fa[e], e < qa.length / 2 ? (_this210 = _this209).
            connectEffectLeft.apply(_this210, _toConsumableArray(_this209._allpassFilters).concat([s])) :
            (_this211 = _this209).connectEffectRight.apply(_this211, _toConsumableArray(_this209._allpassFilters).concat([s])),
            s;
          }), _this209.roomSize.connect(_this209._scaleRoomSize), Oi(_assertThisInitialized(_this209), [
          "roomSize"]);return _this209;

        }_createClass(Va, [{ key: "dispose", value: function dispose()





          {
            return _get(_getPrototypeOf(Va.prototype), "dispose", this).call(this), this._allpassFilters.forEach(function (t) {return t.
              disconnect();}), this._feedbackCombFilters.forEach(function (t) {return t.
              dispose();}), this.roomSize.dispose(), this._scaleRoomSize.
            dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(ba.getDefaults(), { roomSize: .5 });} }]);return Va;}(ba);var

      Na = /*#__PURE__*/function (_Ta2) {_inherits(Na, _Ta2);var _super144 = _createSuper(Na);
        function Na(t) {var _this212;_classCallCheck(this, Na);
          _this212 = _super144.call(this, t), _this212._feedbackL.disconnect(), _this212._feedbackL.connect(_this212.
          _feedbackMerge, 0, 1), _this212._feedbackR.disconnect(), _this212.
          _feedbackR.connect(_this212._feedbackMerge, 0, 0), Oi(_assertThisInitialized(_this212), [
          "feedback"]);return _this212;
        }return Na;}(Ta);var

      Pa = /*#__PURE__*/function (_Na) {_inherits(Pa, _Na);var _super145 = _createSuper(Pa);
        function Pa() {var _this213;_classCallCheck(this, Pa);
          _this213 = _super145.call(this, ui(Pa.getDefaults(), arguments, ["delayTime", "feedback"])), _this213.
          name = "PingPongDelay";
          var t = ui(Pa.getDefaults(), arguments, ["delayTime", "feedback"]);
          _this213._leftDelay = new yo({
            context: _this213.context,
            maxDelay: t.maxDelay }),
          _this213._rightDelay = new yo({
            context: _this213.context,
            maxDelay: t.maxDelay }),
          _this213._rightPreDelay = new yo({
            context: _this213.context,
            maxDelay: t.maxDelay }),
          _this213.delayTime = new po({
            context: _this213.context,
            units: "time",
            value: t.delayTime }),
          _this213.connectEffectLeft(_this213._leftDelay), _this213.
          connectEffectRight(_this213._rightPreDelay, _this213._rightDelay), _this213.
          delayTime.fan(_this213._leftDelay.delayTime, _this213._rightDelay.
          delayTime, _this213._rightPreDelay.delayTime), _this213._feedbackL.
          disconnect(), _this213._feedbackL.connect(_this213._rightDelay), Oi(_assertThisInitialized(_this213), [
          "delayTime"]);return _this213;

        }_createClass(Pa, [{ key: "dispose", value: function dispose()






          {
            return _get(_getPrototypeOf(Pa.prototype), "dispose", this).call(this), this._leftDelay.dispose(), this._rightDelay.
            dispose(), this._rightPreDelay.dispose(), this.delayTime.dispose(),
            this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Na.getDefaults(), { delayTime: .25, maxDelay: 1 });} }]);return Pa;}(Na);var

      ja = /*#__PURE__*/function (_Aa2) {_inherits(ja, _Aa2);var _super146 = _createSuper(ja);
        function ja() {var _this214;_classCallCheck(this, ja);
          _this214 = _super146.call(this, ui(ja.getDefaults(), arguments, ["pitch"])), _this214.name =
          "PitchShift";
          var t = ui(ja.getDefaults(), arguments, ["pitch"]);
          _this214._frequency = new po({
            context: _this214.context }),
          _this214._delayA = new yo({
            maxDelay: 1,
            context: _this214.context }),
          _this214._lfoA = new or({
            context: _this214.context,
            min: 0,
            max: .1,
            type: "sawtooth" }).
          connect(_this214._delayA.delayTime), _this214._delayB = new yo({
            maxDelay: 1,
            context: _this214.context }),
          _this214._lfoB = new or({
            context: _this214.context,
            min: 0,
            max: .1,
            type: "sawtooth",
            phase: 180 }).
          connect(_this214._delayB.delayTime), _this214._crossFade = new ca({
            context: _this214.context }),
          _this214._crossFadeLFO = new or({
            context: _this214.context,
            min: 0,
            max: 1,
            type: "triangle",
            phase: 90 }).
          connect(_this214._crossFade.fade), _this214._feedbackDelay = new yo({
            delayTime: t.delayTime,
            context: _this214.context }),
          _this214.delayTime = _this214._feedbackDelay.delayTime, Oi(_assertThisInitialized(_this214),
          "delayTime"), _this214._pitch = t.pitch, _this214._windowSize = t.
          windowSize, _this214._delayA.connect(_this214._crossFade.a), _this214._delayB.
          connect(_this214._crossFade.b), _this214._frequency.fan(_this214._lfoA.
          frequency, _this214._lfoB.frequency, _this214._crossFadeLFO.frequency),
          _this214.effectSend.fan(_this214._delayA, _this214._delayB), _this214._crossFade.
          chain(_this214._feedbackDelay, _this214.effectReturn);
          var e = _this214.now();
          _this214._lfoA.start(e), _this214._lfoB.start(e), _this214._crossFadeLFO.start(e),
          _this214.windowSize = _this214._windowSize;return _this214;
        }_createClass(ja, [{ key: "dispose", value: function dispose()


























          {
            return _get(_getPrototypeOf(ja.prototype), "dispose", this).call(this), this._frequency.dispose(), this._delayA.
            dispose(), this._delayB.dispose(), this._lfoA.dispose(), this._lfoB.
            dispose(), this._crossFade.dispose(), this._crossFadeLFO.dispose(),
            this._feedbackDelay.dispose(), this;
          } }, { key: "pitch", get: function get() {return this._pitch;}, set: function set(t) {this._pitch = t;var e = 0;t < 0 ? (this._lfoA.min = 0, this._lfoA.max = this._windowSize, this._lfoB.min = 0, this._lfoB.max = this._windowSize, e = zi(t - 1) + 1) : (this._lfoA.min = this._windowSize, this._lfoA.max = 0, this._lfoB.min = this._windowSize, this._lfoB.max = 0, e = zi(t) - 1), this._frequency.value = e * (1.2 / this._windowSize);} }, { key: "windowSize", get: function get() {return this._windowSize;}, set: function set(t) {this._windowSize = this.toSeconds(t), this.pitch = this._pitch;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Aa.getDefaults(), { pitch: 0, windowSize: .1, delayTime: 0, feedback: 0 });} }]);return ja;}(Aa);var

      La = /*#__PURE__*/function (_ba4) {_inherits(La, _ba4);var _super147 = _createSuper(La);
        function La() {var _this216, _this217;var _this215;_classCallCheck(this, La);
          _this215 = _super147.call(this, ui(La.getDefaults(), arguments, ["frequency", "octaves",
          "baseFrequency"])),
          _this215.name = "Phaser";
          var t = ui(La.getDefaults(), arguments, ["frequency", "octaves",
          "baseFrequency"]);

          _this215._lfoL = new or({
            context: _this215.context,
            frequency: t.frequency,
            min: 0,
            max: 1 }),
          _this215._lfoR = new or({
            context: _this215.context,
            frequency: t.frequency,
            min: 0,
            max: 1,
            phase: 180 }),
          _this215._baseFrequency = _this215.toFrequency(t.baseFrequency), _this215.
          _octaves = t.octaves, _this215.Q = new po({
            context: _this215.context,
            value: t.Q,
            units: "positive" }),
          _this215._filtersL = _this215._makeFilters(t.stages, _this215._lfoL), _this215.
          _filtersR = _this215._makeFilters(t.stages, _this215._lfoR), _this215.
          frequency = _this215._lfoL.frequency, _this215.frequency.value = t.
          frequency, (_this216 = _this215).connectEffectLeft.apply(_this216, _toConsumableArray(_this215._filtersL)), (_this217 = _this215).
          connectEffectRight.apply(_this217, _toConsumableArray(_this215._filtersR)), _this215._lfoL.frequency.
          connect(_this215._lfoR.frequency), _this215.baseFrequency = t.
          baseFrequency, _this215.octaves = t.octaves, _this215._lfoL.start(), _this215.
          _lfoR.start(), Oi(_assertThisInitialized(_this215), ["frequency", "Q"]);return _this215;
        }_createClass(La, [{ key: "_makeFilters", value: function _makeFilters(









          t, e) {
            var s = [];
            for (var _n49 = 0; _n49 < t; _n49++) {
              var _t163 = this.context.createBiquadFilter();
              _t163.type = "allpass", this.Q.connect(_t163.Q), e.connect(_t163.frequency), s.
              push(_t163);
            }
            return s;
          } }, { key: "dispose", value: function dispose()
















          {
            return _get(_getPrototypeOf(La.prototype), "dispose", this).call(this), this.Q.dispose(), this._lfoL.dispose(), this.
            _lfoR.dispose(), this._filtersL.forEach(function (t) {return t.disconnect();}),
            this._filtersR.forEach(function (t) {return t.disconnect();}), this.frequency.
            dispose(), this;
          } }, { key: "octaves", get: function get() {return this._octaves;}, set: function set(t) {this._octaves = t;var e = this._baseFrequency * Math.pow(2, t);this._lfoL.max = e, this._lfoR.max = e;} }, { key: "baseFrequency", get: function get() {return this._baseFrequency;}, set: function set(t) {this._baseFrequency = this.toFrequency(t), this._lfoL.min = this._baseFrequency, this._lfoR.min = this._baseFrequency, this.octaves = this._octaves;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(ba.getDefaults(), { frequency: .5, octaves: 3, stages: 10, Q: 10, baseFrequency: 350 });} }]);return La;}(ba);var

      za = /*#__PURE__*/function (_ha8) {_inherits(za, _ha8);var _super148 = _createSuper(za);
        function za() {var _this218;_classCallCheck(this, za);
          _this218 = _super148.call(this, ui(za.getDefaults(), arguments, ["decay"])), _this218.name = "Reverb",
          _this218._convolver = _this218.context.createConvolver(), _this218.ready =
          Promise.resolve();
          var t = ui(za.getDefaults(), arguments, ["decay"]);
          _this218._decay = t.decay, _this218._preDelay = t.preDelay, _this218.generate(),
          _this218.connectEffect(_this218._convolver);return _this218;
        }_createClass(za, [{ key: "generate", value: function generate()


















          {
            return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee60() {var t, e, s, n, i, o, r;return _regeneratorRuntime.wrap(function _callee60$(_context68) {while (1) {switch (_context68.prev = _context68.next) {case 0:
                      t = this.ready,
                      e = new qi(2, this._decay + this._preDelay, this.
                      context.sampleRate),
                      s = new No({
                        context: e }),

                      n = new No({
                        context: e }),

                      i = new wa({
                        context: e });

                      s.connect(i, 0, 0), n.connect(i, 0, 1);
                      o = new ho({
                        context: e }).
                      toDestination();
                      i.connect(o), s.start(0), n.start(0), o.gain.
                      setValueAtTime(0, 0), o.gain.setValueAtTime(1, this.
                      _preDelay), o.gain.
                      exponentialApproachValueAtTime(0, this._preDelay,
                      this.decay);
                      r = e.render();
                      this.ready = r.then(Ei);_context68.next = 8;return t;case 8:_context68.next = 10;
                      return r;case 10:this._convolver.buffer = _context68.sent.get();return _context68.abrupt("return", this);case 12:case "end":return _context68.stop();}}}, _callee60, this);}));

          } }, { key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(za.prototype), "dispose", this).call(this), this._convolver.disconnect(), this;
          } }, { key: "decay", get: function get() {return this._decay;}, set: function set(t) {Un(t = this.toSeconds(t), .001), this._decay = t, this.generate();} }, { key: "preDelay", get: function get() {return this._preDelay;}, set: function set(t) {Un(t = this.toSeconds(t), 0), this._preDelay = t, this.generate();} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(ha.getDefaults(), { decay: 1.5, preDelay: .01 });} }]);return za;}(ha);var

      Wa = /*#__PURE__*/function (_io27) {_inherits(Wa, _io27);var _super149 = _createSuper(Wa);
        function Wa() {var _this219;_classCallCheck(this, Wa);
          _this219 = _super149.call(this, ui(Wa.getDefaults(), arguments)), _this219.name = "MidSideSplit", _this219.
          _split = _this219.input = new xa({
            channels: 2,
            context: _this219.context }),
          _this219._midAdd = new sr({
            context: _this219.context }),
          _this219.mid = new Xo({
            context: _this219.context,
            value: Math.SQRT1_2 }),
          _this219._sideSubtract = new fr({
            context: _this219.context }),
          _this219.side = new Xo({
            context: _this219.context,
            value: Math.SQRT1_2 }),
          _this219._split.connect(_this219._midAdd, 0), _this219._split.connect(_this219.
          _midAdd.addend, 1), _this219._split.connect(_this219._sideSubtract, 0),
          _this219._split.connect(_this219._sideSubtract.subtrahend, 1), _this219._midAdd.
          connect(_this219.mid), _this219._sideSubtract.connect(_this219.side);return _this219;
        }_createClass(Wa, [{ key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(Wa.prototype), "dispose", this).call(this), this.mid.dispose(), this.side.dispose(), this.
            _midAdd.dispose(), this._sideSubtract.dispose(), this._split.
            dispose(), this;
          } }]);return Wa;}(io);var

      Ba = /*#__PURE__*/function (_io28) {_inherits(Ba, _io28);var _super150 = _createSuper(Ba);
        function Ba() {var _this220;_classCallCheck(this, Ba);
          _this220 = _super150.call(this, ui(Ba.getDefaults(), arguments)), _this220.name = "MidSideMerge", _this220.
          mid = new ho({
            context: _this220.context }),
          _this220.side = new ho({
            context: _this220.context }),
          _this220._left = new sr({
            context: _this220.context }),
          _this220._leftMult = new Xo({
            context: _this220.context,
            value: Math.SQRT1_2 }),
          _this220._right = new fr({
            context: _this220.context }),
          _this220._rightMult = new Xo({
            context: _this220.context,
            value: Math.SQRT1_2 }),
          _this220._merge = _this220.output = new wa({
            context: _this220.context }),
          _this220.mid.fan(_this220._left), _this220.side.connect(_this220._left.addend),
          _this220.mid.connect(_this220._right), _this220.side.connect(_this220._right.
          subtrahend), _this220._left.connect(_this220._leftMult), _this220._right.
          connect(_this220._rightMult), _this220._leftMult.connect(_this220._merge, 0,
          0), _this220._rightMult.connect(_this220._merge, 0, 1);return _this220;
        }_createClass(Ba, [{ key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(Ba.prototype), "dispose", this).call(this), this.mid.dispose(), this.side.dispose(), this.
            _leftMult.dispose(), this._rightMult.dispose(), this._left.
            dispose(), this._right.dispose(), this;
          } }]);return Ba;}(io);var

      Ua = /*#__PURE__*/function (_ha9) {_inherits(Ua, _ha9);var _super151 = _createSuper(Ua);
        function Ua(t) {var _this221;_classCallCheck(this, Ua);
          _this221 = _super151.call(this, t), _this221.name = "MidSideEffect", _this221._midSideMerge = new Ba({
            context: _this221.context }),
          _this221._midSideSplit = new Wa({
            context: _this221.context }),
          _this221._midSend = _this221._midSideSplit.mid, _this221._sideSend = _this221.
          _midSideSplit.side, _this221._midReturn = _this221._midSideMerge.mid, _this221.
          _sideReturn = _this221._midSideMerge.side, _this221.effectSend.connect(_this221.
          _midSideSplit), _this221._midSideMerge.connect(_this221.effectReturn);return _this221;
        }_createClass(Ua, [{ key: "connectEffectMid", value: function connectEffectMid()
          {var _this$_midSend;for (var _len21 = arguments.length, t = new Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {t[_key21] = arguments[_key21];}
            (_this$_midSend = this._midSend).chain.apply(_this$_midSend, t.concat([this._midReturn]));
          } }, { key: "connectEffectSide", value: function connectEffectSide()
          {var _this$_sideSend;for (var _len22 = arguments.length, t = new Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {t[_key22] = arguments[_key22];}
            (_this$_sideSend = this._sideSend).chain.apply(_this$_sideSend, t.concat([this._sideReturn]));
          } }, { key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(Ua.prototype), "dispose", this).call(this), this._midSideSplit.dispose(), this._midSideMerge.
            dispose(), this._midSend.dispose(), this._sideSend.dispose(), this.
            _midReturn.dispose(), this._sideReturn.dispose(), this;
          } }]);return Ua;}(ha);var

      Ga = /*#__PURE__*/function (_Ua) {_inherits(Ga, _Ua);var _super152 = _createSuper(Ga);
        function Ga() {var _this222;_classCallCheck(this, Ga);
          _this222 = _super152.call(this, ui(Ga.getDefaults(), arguments, ["width"])), _this222.name =
          "StereoWidener";
          var t = ui(Ga.getDefaults(), arguments, ["width"]);
          _this222.width = new po({
            context: _this222.context,
            value: t.width,
            units: "normalRange" }),
          Oi(_assertThisInitialized(_this222), ["width"]), _this222._twoTimesWidthMid = new Xo({
            context: _this222.context,
            value: 2 }),
          _this222._twoTimesWidthSide = new Xo({
            context: _this222.context,
            value: 2 }),
          _this222._midMult = new Xo({
            context: _this222.context }),
          _this222._twoTimesWidthMid.connect(_this222._midMult.factor), _this222.
          connectEffectMid(_this222._midMult), _this222._oneMinusWidth = new fr({
            context: _this222.context }),
          _this222._oneMinusWidth.connect(_this222._twoTimesWidthMid), ro(_this222.
          context.getConstant(1), _this222._oneMinusWidth), _this222.width.
          connect(_this222._oneMinusWidth.subtrahend), _this222._sideMult = new Xo({
            context: _this222.context }),
          _this222.width.connect(_this222._twoTimesWidthSide), _this222.
          _twoTimesWidthSide.connect(_this222._sideMult.factor), _this222.
          connectEffectSide(_this222._sideMult);return _this222;
        }_createClass(Ga, [{ key: "dispose", value: function dispose()





          {
            return _get(_getPrototypeOf(Ga.prototype), "dispose", this).call(this), this.width.dispose(), this._midMult.dispose(),
            this._sideMult.dispose(), this._twoTimesWidthMid.dispose(), this.
            _twoTimesWidthSide.dispose(), this._oneMinusWidth.dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Ua.getDefaults(), { width: .5 });} }]);return Ga;}(Ua);var

      Qa = /*#__PURE__*/function (_ba5) {_inherits(Qa, _ba5);var _super153 = _createSuper(Qa);
        function Qa() {var _this223;_classCallCheck(this, Qa);
          _this223 = _super153.call(this, ui(Qa.getDefaults(), arguments, ["frequency", "depth"])), _this223.
          name = "Tremolo";
          var t = ui(Qa.getDefaults(), arguments, ["frequency", "depth"]);
          _this223._lfoL = new or({
            context: _this223.context,
            type: t.type,
            min: 1,
            max: 0 }),
          _this223._lfoR = new or({
            context: _this223.context,
            type: t.type,
            min: 1,
            max: 0 }),
          _this223._amplitudeL = new ho({
            context: _this223.context }),
          _this223._amplitudeR = new ho({
            context: _this223.context }),
          _this223.frequency = new po({
            context: _this223.context,
            value: t.frequency,
            units: "frequency" }),
          _this223.depth = new po({
            context: _this223.context,
            value: t.depth,
            units: "normalRange" }),
          Oi(_assertThisInitialized(_this223), ["frequency", "depth"]), _this223.connectEffectLeft(_this223.
          _amplitudeL), _this223.connectEffectRight(_this223._amplitudeR), _this223.
          _lfoL.connect(_this223._amplitudeL.gain), _this223._lfoR.connect(_this223.
          _amplitudeR.gain), _this223.frequency.fan(_this223._lfoL.frequency,
          _this223._lfoR.frequency), _this223.depth.fan(_this223._lfoR.amplitude, _this223.
          _lfoL.amplitude), _this223.spread = t.spread;return _this223;
        }_createClass(Qa, [{ key: "start", value: function start(








          t) {
            return this._lfoL.start(t), this._lfoR.start(t), this;
          } }, { key: "stop", value: function stop(
          t) {
            return this._lfoL.stop(t), this._lfoR.stop(t), this;
          } }, { key: "sync", value: function sync()
          {
            return this._lfoL.sync(), this._lfoR.sync(), this.context.transport.
            syncSignal(this.frequency), this;
          } }, { key: "unsync", value: function unsync()
          {
            return this._lfoL.unsync(), this._lfoR.unsync(), this.context.transport.
            unsyncSignal(this.frequency), this;
          } }, { key: "dispose", value: function dispose()












          {
            return _get(_getPrototypeOf(Qa.prototype), "dispose", this).call(this), this._lfoL.dispose(), this._lfoR.dispose(), this.
            _amplitudeL.dispose(), this._amplitudeR.dispose(), this.frequency.
            dispose(), this.depth.dispose(), this;
          } }, { key: "type", get: function get() {return this._lfoL.type;}, set: function set(t) {this._lfoL.type = t, this._lfoR.type = t;} }, { key: "spread", get: function get() {return this._lfoR.phase - this._lfoL.phase;}, set: function set(t) {this._lfoL.phase = 90 - t / 2, this._lfoR.phase = t / 2 + 90;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(ba.getDefaults(), { frequency: 10, type: "sine", depth: .5, spread: 180 });} }]);return Qa;}(ba);var

      Za = /*#__PURE__*/function (_ha10) {_inherits(Za, _ha10);var _super154 = _createSuper(Za);
        function Za() {var _this224;_classCallCheck(this, Za);
          _this224 = _super154.call(this, ui(Za.getDefaults(), arguments, ["frequency", "depth"])), _this224.
          name = "Vibrato";
          var t = ui(Za.getDefaults(), arguments, ["frequency", "depth"]);
          _this224._delayNode = new yo({
            context: _this224.context,
            delayTime: 0,
            maxDelay: t.maxDelay }),
          _this224._lfo = new or({
            context: _this224.context,
            type: t.type,
            min: 0,
            max: t.maxDelay,
            frequency: t.frequency,
            phase: -90 }).
          start().connect(_this224._delayNode.delayTime), _this224.frequency = _this224.
          _lfo.frequency, _this224.depth = _this224._lfo.amplitude, _this224.depth.
          value = t.depth, Oi(_assertThisInitialized(_this224), ["frequency", "depth"]), _this224.effectSend.
          chain(_this224._delayNode, _this224.effectReturn);return _this224;
        }_createClass(Za, [{ key: "dispose", value: function dispose()














          {
            return _get(_getPrototypeOf(Za.prototype), "dispose", this).call(this), this._delayNode.dispose(), this._lfo.dispose(),
            this.frequency.dispose(), this.depth.dispose(), this;
          } }, { key: "type", get: function get() {return this._lfo.type;}, set: function set(t) {this._lfo.type = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(ha.getDefaults(), { maxDelay: .005, frequency: 5, depth: .1, type: "sine" });} }]);return Za;}(ha);var

      Xa = /*#__PURE__*/function (_io29) {_inherits(Xa, _io29);var _super155 = _createSuper(Xa);
        function Xa() {var _this225;_classCallCheck(this, Xa);
          _this225 = _super155.call(this, ui(Xa.getDefaults(), arguments, ["type", "size"])), _this225.name =
          "Analyser", _this225._analysers = [], _this225._buffers = [];
          var t = ui(Xa.getDefaults(), arguments, ["type", "size"]);
          _this225.input = _this225.output = _this225._gain = new ho({
            context: _this225.context }),
          _this225._split = new xa({
            context: _this225.context,
            channels: t.channels }),
          _this225.input.connect(_this225._split), Un(t.channels, 1);
          for (var _e118 = 0; _e118 < t.channels; _e118++) {_this225._analysers[_e118] = _this225.context.
            createAnalyser(), _this225._split.connect(_this225._analysers[_e118], _e118, 0);}
          _this225.size = t.size, _this225.type = t.type, _this225.smoothing = t.smoothing;return _this225;
        }_createClass(Xa, [{ key: "getValue", value: function getValue()








          {var _this226 = this;
            return this._analysers.forEach(function (t, e) {
              var s = _this226._buffers[e];
              "fft" === _this226._type ? t.getFloatFrequencyData(s) :
              "waveform" === _this226._type && t.
              getFloatTimeDomainData(s);
            }), 1 === this.channels ? this._buffers[0] : this._buffers;
          } }, { key: "dispose", value: function dispose()

























          {
            return _get(_getPrototypeOf(Xa.prototype), "dispose", this).call(this), this._analysers.forEach(function (t) {return t.disconnect();}),
            this._split.dispose(), this._gain.dispose(), this;
          } }, { key: "size", get: function get() {return this._analysers[0].frequencyBinCount;}, set: function set(t) {var _this227 = this;this._analysers.forEach(function (e, s) {e.fftSize = 2 * t, _this227._buffers[s] = new Float32Array(t);});} }, { key: "channels", get: function get() {return this._analysers.length;} }, { key: "type", get: function get() {return this._type;}, set: function set(t) {Bn("waveform" === t || "fft" === t, "Analyser: invalid type: ".concat(t)), this._type = t;} }, { key: "smoothing", get: function get() {return this._analysers[0].smoothingTimeConstant;}, set: function set(t) {this._analysers.forEach(function (e) {return e.smoothingTimeConstant = t;});} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { size: 1024, smoothing: .8, type: "fft", channels: 1 });} }]);return Xa;}(io);var

      Ya = /*#__PURE__*/function (_io30) {_inherits(Ya, _io30);var _super156 = _createSuper(Ya);
        function Ya() {var _this228;_classCallCheck(this, Ya);
          _this228 = _super156.call(this, ui(Ya.getDefaults(), arguments)), _this228.name = "MeterBase", _this228.
          input = _this228.output = _this228._analyser = new Xa({
            context: _this228.context,
            size: 256,
            type: "waveform" });return _this228;

        }_createClass(Ya, [{ key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(Ya.prototype), "dispose", this).call(this), this._analyser.dispose(), this;
          } }]);return Ya;}(io);var

      $a = /*#__PURE__*/function (_Ya) {_inherits($a, _Ya);var _super157 = _createSuper($a);
        function $a() {var _this229;_classCallCheck(this, $a);
          _this229 = _super157.call(this, ui($a.getDefaults(), arguments, ["smoothing"])), _this229.name =
          "Meter";
          var t = ui($a.getDefaults(), arguments, ["smoothing"]);
          _this229.input = _this229.output = _this229._analyser = new Xa({
            context: _this229.context,
            size: 256,
            type: "waveform",
            channels: t.channelCount }),
          _this229.smoothing = t.smoothing, _this229.normalRange = t.normalRange,
          _this229._rms = new Array(t.channelCount), _this229._rms.fill(0);return _this229;
        }_createClass($a, [{ key: "getLevel", value: function getLevel()







          {
            return Kn("'getLevel' has been changed to 'getValue'"), this.getValue();
          } }, { key: "getValue", value: function getValue()
          {var _this230 = this;
            var t = this._analyser.getValue(),
            e = (1 === this.channels ? [t] : t).map(function (t, e) {
              var s = t.reduce(function (t, e) {return t + e * e;}, 0),
              n = Math.sqrt(s / t.length);
              return _this230._rms[e] = Math.max(n, _this230._rms[e] * _this230.
              smoothing), _this230.normalRange ? _this230._rms[e] :
              Li(_this230._rms[e]);
            });
            return 1 === this.channels ? e[0] : e;
          } }, { key: "dispose", value: function dispose()



          {
            return _get(_getPrototypeOf($a.prototype), "dispose", this).call(this), this._analyser.dispose(), this;
          } }, { key: "channels", get: function get() {return this._analyser.channels;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Ya.getDefaults(), { smoothing: .8, normalRange: !1, channelCount: 1 });} }]);return $a;}(Ya);var

      Ha = /*#__PURE__*/function (_Ya2) {_inherits(Ha, _Ya2);var _super158 = _createSuper(Ha);
        function Ha() {var _this231;_classCallCheck(this, Ha);
          _this231 = _super158.call(this, ui(Ha.getDefaults(), arguments, ["size"])), _this231.name = "FFT";
          var t = ui(Ha.getDefaults(), arguments, ["size"]);
          _this231.normalRange = t.normalRange, _this231._analyser.type = "fft", _this231.
          size = t.size;return _this231;
        }_createClass(Ha, [{ key: "getValue", value: function getValue()







          {var _this232 = this;
            return this._analyser.getValue().map(function (t) {return _this232.normalRange ? ji(t) :
              t;});
          } }, { key: "getFrequencyOfIndex", value: function getFrequencyOfIndex(












          t) {
            return Bn(0 <= t && t < this.size, "index must be greater than or equal to 0 and less than ".concat(
            this.size)),
            t * this.context.sampleRate / (2 * this.size);
          } }, { key: "size", get: function get() {return this._analyser.size;}, set: function set(t) {this._analyser.size = t;} }, { key: "smoothing", get: function get() {return this._analyser.smoothing;}, set: function set(t) {this._analyser.smoothing = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { normalRange: !1, size: 1024, smoothing: .8 });} }]);return Ha;}(Ya);var

      Ja = /*#__PURE__*/function (_Ya3) {_inherits(Ja, _Ya3);var _super159 = _createSuper(Ja);
        function Ja() {var _this233;_classCallCheck(this, Ja);
          _this233 = _super159.call(this, ui(Ja.getDefaults(), arguments)), _this233.name = "DCMeter", _this233.
          _analyser.type = "waveform", _this233._analyser.size = 256;return _this233;
        }_createClass(Ja, [{ key: "getValue", value: function getValue()
          {
            return this._analyser.getValue()[0];
          } }]);return Ja;}(Ya);var

      Ka = /*#__PURE__*/function (_Ya4) {_inherits(Ka, _Ya4);var _super160 = _createSuper(Ka);
        function Ka() {var _this234;_classCallCheck(this, Ka);
          _this234 = _super160.call(this, ui(Ka.getDefaults(), arguments, ["size"])), _this234.name =
          "Waveform";
          var t = ui(Ka.getDefaults(), arguments, ["size"]);
          _this234._analyser.type = "waveform", _this234.size = t.size;return _this234;
        }_createClass(Ka, [{ key: "getValue", value: function getValue()





          {
            return this._analyser.getValue();
          } }, { key: "size", get: function get()
          {
            return this._analyser.size;
          }, set: function set(
          t) {
            this._analyser.size = t;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(Ya.getDefaults(), { size: 1024 });} }]);return Ka;}(Ya);var

      tc = /*#__PURE__*/function (_io31) {_inherits(tc, _io31);var _super161 = _createSuper(tc);
        function tc() {var _this235;_classCallCheck(this, tc);
          _this235 = _super161.call(this, ui(tc.getDefaults(), arguments, ["solo"])), _this235.name = "Solo";
          var t = ui(tc.getDefaults(), arguments, ["solo"]);
          _this235.input = _this235.output = new ho({
            context: _this235.context }),
          tc._allSolos.has(_this235.context) || tc._allSolos.set(_this235.context,
          new Set()), tc._allSolos.get(_this235.context).add(_assertThisInitialized(_this235)), _this235.solo =
          t.solo;return _this235;
        }_createClass(tc, [{ key: "_addSolo", value: function _addSolo()















          {
            tc._soloed.has(this.context) || tc._soloed.set(this.context, new Set()),
            tc._soloed.get(this.context).add(this);
          } }, { key: "_removeSolo", value: function _removeSolo()
          {
            tc._soloed.has(this.context) && tc._soloed.get(this.context).delete(
            this);
          } }, { key: "_isSoloed", value: function _isSoloed()
          {
            return tc._soloed.has(this.context) && tc._soloed.get(this.context).has(
            this);
          } }, { key: "_noSolos", value: function _noSolos()
          {
            return !tc._soloed.has(this.context) || tc._soloed.has(this.context) &&
            0 === tc._soloed.get(this.context).size;
          } }, { key: "_updateSolo", value: function _updateSolo()
          {
            this._isSoloed() || this._noSolos() ? this.input.gain.value = 1 : this.
            input.gain.value = 0;
          } }, { key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(tc.prototype), "dispose", this).call(this), tc._allSolos.get(this.context).delete(this),
            this._removeSolo(), this;
          } }, { key: "solo", get: function get() {return this._isSoloed();}, set: function set(t) {t ? this._addSolo() : this._removeSolo(), tc._allSolos.get(this.context).forEach(function (t) {return t._updateSolo();});} }, { key: "muted", get: function get() {return 0 === this.input.gain.value;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { solo: !1 });} }]);return tc;}(io);

      tc._allSolos = new Map(), tc._soloed = new Map();var
      ec = /*#__PURE__*/function (_io32) {_inherits(ec, _io32);var _super162 = _createSuper(ec);
        function ec() {var _this236;_classCallCheck(this, ec);
          _this236 = _super162.call(this, ui(ec.getDefaults(), arguments, ["pan", "volume"])), _this236.name =
          "PanVol";
          var t = ui(ec.getDefaults(), arguments, ["pan", "volume"]);
          _this236._panner = _this236.input = new pa({
            context: _this236.context,
            pan: t.pan,
            channelCount: t.channelCount }),
          _this236.pan = _this236._panner.pan, _this236._volume = _this236.output =
          new Oo({
            context: _this236.context,
            volume: t.volume }),
          _this236.volume = _this236._volume.volume, _this236._panner.connect(_this236.
          _volume), _this236.mute = t.mute, Oi(_assertThisInitialized(_this236), ["pan", "volume"]);return _this236;
        }_createClass(ec, [{ key: "dispose", value: function dispose()














          {
            return _get(_getPrototypeOf(ec.prototype), "dispose", this).call(this), this._panner.dispose(), this.pan.dispose(), this.
            _volume.dispose(), this.volume.dispose(), this;
          } }, { key: "mute", get: function get() {return this._volume.mute;}, set: function set(t) {this._volume.mute = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { mute: !1, pan: 0, volume: 0, channelCount: 1 });} }]);return ec;}(io);var

      sc = /*#__PURE__*/function (_io33) {_inherits(sc, _io33);var _super163 = _createSuper(sc);
        function sc() {var _this237;_classCallCheck(this, sc);
          _this237 = _super163.call(this, ui(sc.getDefaults(), arguments, ["volume", "pan"])), _this237.name =
          "Channel";
          var t = ui(sc.getDefaults(), arguments, ["volume", "pan"]);
          _this237._solo = _this237.input = new tc({
            solo: t.solo,
            context: _this237.context }),
          _this237._panVol = _this237.output = new ec({
            context: _this237.context,
            pan: t.pan,
            volume: t.volume,
            mute: t.mute,
            channelCount: t.channelCount }),
          _this237.pan = _this237._panVol.pan, _this237.volume = _this237._panVol.volume,
          _this237._solo.connect(_this237._panVol), Oi(_assertThisInitialized(_this237), ["pan", "volume"]);return _this237;
        }_createClass(sc, [{ key: "_getBus", value: function _getBus(
























          t) {
            return sc.buses.has(t) || sc.buses.set(t, new ho({
              context: this.context })),
            sc.buses.get(t);
          } }, { key: "send", value: function send(
          t) {var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var s = this._getBus(t),
            n = new ho({
              context: this.context,
              units: "decibels",
              gain: e });

            return this.connect(n), n.connect(s), n;
          } }, { key: "receive", value: function receive(
          t) {
            return this._getBus(t).connect(this), this;
          } }, { key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(sc.prototype), "dispose", this).call(this), this._panVol.dispose(), this.pan.dispose(), this.
            volume.dispose(), this._solo.dispose(), this;
          } }, { key: "solo", get: function get() {return this._solo.solo;}, set: function set(t) {this._solo.solo = t;} }, { key: "muted", get: function get() {return this._solo.muted || this.mute;} }, { key: "mute", get: function get() {return this._panVol.mute;}, set: function set(t) {this._panVol.mute = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { pan: 0, volume: 0, mute: !1, solo: !1, channelCount: 1 });} }]);return sc;}(io);

      sc.buses = new Map();var
      nc = /*#__PURE__*/function (_io34) {_inherits(nc, _io34);var _super164 = _createSuper(nc);
        function nc() {var _this238;_classCallCheck(this, nc);
          _this238 = _super164.call(this, ui(nc.getDefaults(), arguments)), _this238.name = "Mono", _this238.input =
          new ho({
            context: _this238.context }),
          _this238._merge = _this238.output = new wa({
            channels: 2,
            context: _this238.context }),
          _this238.input.connect(_this238._merge, 0, 0), _this238.input.connect(_this238.
          _merge, 0, 1);return _this238;
        }_createClass(nc, [{ key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(nc.prototype), "dispose", this).call(this), this._merge.dispose(), this.input.dispose(),
            this;
          } }]);return nc;}(io);var

      ic = /*#__PURE__*/function (_io35) {_inherits(ic, _io35);var _super165 = _createSuper(ic);
        function ic() {var _this239;_classCallCheck(this, ic);
          _this239 = _super165.call(this, ui(ic.getDefaults(), arguments, ["lowFrequency",
          "highFrequency"])), _this239.name = "MultibandSplit", _this239.input =
          new ho({
            context: _this239.context }),
          _this239.output = void 0, _this239.low = new Or({
            context: _this239.context,
            frequency: 0,
            type: "lowpass" }),
          _this239._lowMidFilter = new Or({
            context: _this239.context,
            frequency: 0,
            type: "highpass" }),
          _this239.mid = new Or({
            context: _this239.context,
            frequency: 0,
            type: "lowpass" }),
          _this239.high = new Or({
            context: _this239.context,
            frequency: 0,
            type: "highpass" }),
          _this239._internalChannels = [_this239.low, _this239.mid, _this239.high];
          var t = ui(ic.getDefaults(), arguments, ["lowFrequency",
          "highFrequency"]);

          _this239.lowFrequency = new po({
            context: _this239.context,
            units: "frequency",
            value: t.lowFrequency }),
          _this239.highFrequency = new po({
            context: _this239.context,
            units: "frequency",
            value: t.highFrequency }),
          _this239.Q = new po({
            context: _this239.context,
            units: "positive",
            value: t.Q }),
          _this239.input.fan(_this239.low, _this239.high), _this239.input.chain(_this239.
          _lowMidFilter, _this239.mid), _this239.lowFrequency.fan(_this239.low.
          frequency, _this239._lowMidFilter.frequency), _this239.highFrequency.
          fan(_this239.mid.frequency, _this239.high.frequency), _this239.Q.connect(_this239.
          low.Q), _this239.Q.connect(_this239._lowMidFilter.Q), _this239.Q.connect(
          _this239.mid.Q), _this239.Q.connect(_this239.high.Q), Oi(_assertThisInitialized(_this239), ["high",
          "mid", "low", "highFrequency", "lowFrequency"]);return _this239;

        }_createClass(ic, [{ key: "dispose", value: function dispose()







          {
            return _get(_getPrototypeOf(ic.prototype), "dispose", this).call(this), Mi(this, ["high", "mid", "low", "highFrequency",
            "lowFrequency"]),
            this.low.dispose(), this._lowMidFilter.dispose(), this.mid.
            dispose(), this.high.dispose(), this.lowFrequency.dispose(), this.
            highFrequency.dispose(), this.Q.dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { Q: 1, highFrequency: 2500, lowFrequency: 400 });} }]);return ic;}(io);var

      oc = /*#__PURE__*/function (_io36) {_inherits(oc, _io36);var _super166 = _createSuper(oc);
        function oc() {var _this240;_classCallCheck(this, oc);
          _this240 = _super166.apply(this, arguments), _this240.name = "Listener", _this240.positionX = new no({
            context: _this240.context,
            param: _this240.context.rawContext.listener.positionX }),
          _this240.positionY = new no({
            context: _this240.context,
            param: _this240.context.rawContext.listener.positionY }),
          _this240.positionZ = new no({
            context: _this240.context,
            param: _this240.context.rawContext.listener.positionZ }),
          _this240.forwardX = new no({
            context: _this240.context,
            param: _this240.context.rawContext.listener.forwardX }),
          _this240.forwardY = new no({
            context: _this240.context,
            param: _this240.context.rawContext.listener.forwardY }),
          _this240.forwardZ = new no({
            context: _this240.context,
            param: _this240.context.rawContext.listener.forwardZ }),
          _this240.upX = new no({
            context: _this240.context,
            param: _this240.context.rawContext.listener.upX }),
          _this240.upY = new no({
            context: _this240.context,
            param: _this240.context.rawContext.listener.upY }),
          _this240.upZ = new no({
            context: _this240.context,
            param: _this240.context.rawContext.listener.upZ });return _this240;

        }_createClass(oc, [{ key: "dispose", value: function dispose()













          {
            return _get(_getPrototypeOf(oc.prototype), "dispose", this).call(this), this.positionX.dispose(), this.positionY.
            dispose(), this.positionZ.dispose(), this.forwardX.dispose(), this.
            forwardY.dispose(), this.forwardZ.dispose(), this.upX.dispose(),
            this.upY.dispose(), this.upZ.dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { positionX: 0, positionY: 0, positionZ: 0, forwardX: 0, forwardY: 0, forwardZ: -1, upX: 0, upY: 1, upZ: 0 });} }]);return oc;}(io);

      Ti(function (t) {
        t.listener = new oc({
          context: t });

      }), ki(function (t) {
        t.listener.dispose();
      });var
      rc = /*#__PURE__*/function (_io37) {_inherits(rc, _io37);var _super167 = _createSuper(rc);
        function rc() {var _this241;_classCallCheck(this, rc);
          _this241 = _super167.call(this, ui(rc.getDefaults(), arguments, ["positionX", "positionY",
          "positionZ"])),
          _this241.name = "Panner3D";
          var t = ui(rc.getDefaults(), arguments, ["positionX", "positionY",
          "positionZ"]);

          _this241._panner = _this241.input = _this241.output = _this241.context.createPanner(),
          _this241.panningModel = t.panningModel, _this241.maxDistance = t.
          maxDistance, _this241.distanceModel = t.distanceModel, _this241.
          coneOuterGain = t.coneOuterGain, _this241.coneOuterAngle = t.
          coneOuterAngle, _this241.coneInnerAngle = t.coneInnerAngle, _this241.
          refDistance = t.refDistance, _this241.rolloffFactor = t.rolloffFactor,
          _this241.positionX = new no({
            context: _this241.context,
            param: _this241._panner.positionX,
            value: t.positionX }),
          _this241.positionY = new no({
            context: _this241.context,
            param: _this241._panner.positionY,
            value: t.positionY }),
          _this241.positionZ = new no({
            context: _this241.context,
            param: _this241._panner.positionZ,
            value: t.positionZ }),
          _this241.orientationX = new no({
            context: _this241.context,
            param: _this241._panner.orientationX,
            value: t.orientationX }),
          _this241.orientationY = new no({
            context: _this241.context,
            param: _this241._panner.orientationY,
            value: t.orientationY }),
          _this241.orientationZ = new no({
            context: _this241.context,
            param: _this241._panner.orientationZ,
            value: t.orientationZ });return _this241;

        }_createClass(rc, [{ key: "setPosition", value: function setPosition(


















          t, e, s) {
            return this.positionX.value = t, this.positionY.value = e, this.
            positionZ.value = s, this;
          } }, { key: "setOrientation", value: function setOrientation(
          t, e, s) {
            return this.orientationX.value = t, this.orientationY.value = e, this.
            orientationZ.value = s, this;
          } }, { key: "dispose", value: function dispose()
















































          {
            return _get(_getPrototypeOf(rc.prototype), "dispose", this).call(this), this._panner.disconnect(), this.orientationX.
            dispose(), this.orientationY.dispose(), this.orientationZ.
            dispose(), this.positionX.dispose(), this.positionY.dispose(), this.
            positionZ.dispose(), this;
          } }, { key: "panningModel", get: function get() {return this._panner.panningModel;}, set: function set(t) {this._panner.panningModel = t;} }, { key: "refDistance", get: function get() {return this._panner.refDistance;}, set: function set(t) {this._panner.refDistance = t;} }, { key: "rolloffFactor", get: function get() {return this._panner.rolloffFactor;}, set: function set(t) {this._panner.rolloffFactor = t;} }, { key: "distanceModel", get: function get() {return this._panner.distanceModel;}, set: function set(t) {this._panner.distanceModel = t;} }, { key: "coneInnerAngle", get: function get() {return this._panner.coneInnerAngle;}, set: function set(t) {this._panner.coneInnerAngle = t;} }, { key: "coneOuterAngle", get: function get() {return this._panner.coneOuterAngle;}, set: function set(t) {this._panner.coneOuterAngle = t;} }, { key: "coneOuterGain", get: function get() {return this._panner.coneOuterGain;}, set: function set(t) {this._panner.coneOuterGain = t;} }, { key: "maxDistance", get: function get() {return this._panner.maxDistance;}, set: function set(t) {this._panner.maxDistance = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { coneInnerAngle: 360, coneOuterAngle: 360, coneOuterGain: 0, distanceModel: "inverse", maxDistance: 1e4, orientationX: 0, orientationY: 0, orientationZ: 0, panningModel: "equalpower", positionX: 0, positionY: 0, positionZ: 0, refDistance: 1, rolloffFactor: 1 });} }]);return rc;}(io);var

      ac = /*#__PURE__*/function (_io38) {_inherits(ac, _io38);var _super168 = _createSuper(ac);
        function ac() {var _this242;_classCallCheck(this, ac);
          _this242 = _super168.call(this, ui(ac.getDefaults(), arguments)), _this242.name = "Recorder";
          var t = ui(ac.getDefaults(), arguments);
          _this242.input = new ho({
            context: _this242.context }),
          Bn(ac.supported, "Media Recorder API is not available"), _this242.
          _stream = _this242.context.createMediaStreamDestination(), _this242.input.
          connect(_this242._stream), _this242._recorder = new MediaRecorder(_this242.
          _stream.stream, {
            mimeType: t.mimeType });return _this242;

        }_createClass(ac, [{ key: "start", value: function start()













          {
            return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee61() {var _this243 = this;var t;return _regeneratorRuntime.wrap(function _callee61$(_context69) {while (1) {switch (_context69.prev = _context69.next) {case 0:
                      Bn("started" !== this.state,
                      "Recorder is already started");
                      t = new Promise(function (t) {
                        var e = function e() {
                          _this243._recorder.
                          removeEventListener(
                          "start", e, !1), t();
                        };
                        _this243._recorder.addEventListener("start",
                        e, !1);
                      });
                      this._recorder.start();_context69.next = 5;return t;case 5:return _context69.abrupt("return", _context69.sent);case 6:case "end":return _context69.stop();}}}, _callee61, this);}));

          } }, { key: "stop", value: function stop()
          {
            return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee62() {var _this244 = this;var t;return _regeneratorRuntime.wrap(function _callee62$(_context70) {while (1) {switch (_context70.prev = _context70.next) {case 0:
                      Bn("stopped" !== this.state, "Recorder is not started");
                      t = new Promise(function (t) {
                        var e = function e(s) {
                          _this244._recorder.
                          removeEventListener(
                          "dataavailable", e, !1),
                          t(s.data);
                        };
                        _this244._recorder.addEventListener(
                        "dataavailable", e, !1);
                      });
                      this._recorder.stop();_context70.next = 5;return t;case 5:return _context70.abrupt("return", _context70.sent);case 6:case "end":return _context70.stop();}}}, _callee62, this);}));

          } }, { key: "pause", value: function pause()
          {
            return Bn("started" === this.state, "Recorder must be started"), this.
            _recorder.pause(), this;
          } }, { key: "dispose", value: function dispose()
          {
            return _get(_getPrototypeOf(ac.prototype), "dispose", this).call(this), this.input.dispose(), this._stream.disconnect(),
            this;
          } }, { key: "mimeType", get: function get() {return this._recorder.mimeType;} }, { key: "state", get: function get() {return "inactive" === this._recorder.state ? "stopped" : "paused" === this._recorder.state ? "paused" : "started";} }], [{ key: "getDefaults", value: function getDefaults() {return io.getDefaults();} }, { key: "supported", get: function get() {return null !== ti && Reflect.has(ti, "MediaRecorder");} }]);return ac;}(io);var

      cc = /*#__PURE__*/function (_io39) {_inherits(cc, _io39);var _super169 = _createSuper(cc);
        function cc() {var _this245;_classCallCheck(this, cc);
          _this245 = _super169.call(this, ui(cc.getDefaults(), arguments, ["threshold", "ratio"])), _this245.
          name = "Compressor", _this245._compressor = _this245.context.
          createDynamicsCompressor(), _this245.input = _this245._compressor, _this245.
          output = _this245._compressor;
          var t = ui(cc.getDefaults(), arguments, ["threshold", "ratio"]);
          _this245.threshold = new no({
            minValue: _this245._compressor.threshold.minValue,
            maxValue: _this245._compressor.threshold.maxValue,
            context: _this245.context,
            convert: !1,
            param: _this245._compressor.threshold,
            units: "decibels",
            value: t.threshold }),
          _this245.attack = new no({
            minValue: _this245._compressor.attack.minValue,
            maxValue: _this245._compressor.attack.maxValue,
            context: _this245.context,
            param: _this245._compressor.attack,
            units: "time",
            value: t.attack }),
          _this245.release = new no({
            minValue: _this245._compressor.release.minValue,
            maxValue: _this245._compressor.release.maxValue,
            context: _this245.context,
            param: _this245._compressor.release,
            units: "time",
            value: t.release }),
          _this245.knee = new no({
            minValue: _this245._compressor.knee.minValue,
            maxValue: _this245._compressor.knee.maxValue,
            context: _this245.context,
            convert: !1,
            param: _this245._compressor.knee,
            units: "decibels",
            value: t.knee }),
          _this245.ratio = new no({
            minValue: _this245._compressor.ratio.minValue,
            maxValue: _this245._compressor.ratio.maxValue,
            context: _this245.context,
            convert: !1,
            param: _this245._compressor.ratio,
            units: "positive",
            value: t.ratio }),
          Oi(_assertThisInitialized(_this245), ["knee", "release", "attack", "ratio", "threshold"]);return _this245;
        }_createClass(cc, [{ key: "dispose", value: function dispose()












          {
            return _get(_getPrototypeOf(cc.prototype), "dispose", this).call(this), this._compressor.disconnect(), this.attack.
            dispose(), this.release.dispose(), this.threshold.dispose(), this.
            ratio.dispose(), this.knee.dispose(), this;
          } }, { key: "reduction", get: function get() {return this._compressor.reduction;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { attack: .003, knee: 30, ratio: 12, release: .25, threshold: -24 });} }]);return cc;}(io);var

      hc = /*#__PURE__*/function (_io40) {_inherits(hc, _io40);var _super170 = _createSuper(hc);
        function hc() {var _this246;_classCallCheck(this, hc);
          _this246 = _super170.call(this, Object.assign(ui(hc.getDefaults(), arguments, ["threshold",
          "smoothing"]))),
          _this246.name = "Gate";
          var t = ui(hc.getDefaults(), arguments, ["threshold", "smoothing"]);
          _this246._follower = new fa({
            context: _this246.context,
            smoothing: t.smoothing }),
          _this246._gt = new mr({
            context: _this246.context,
            value: ji(t.threshold) }),
          _this246.input = new ho({
            context: _this246.context }),
          _this246._gate = _this246.output = new ho({
            context: _this246.context }),
          _this246.input.connect(_this246._gate), _this246.input.chain(_this246._follower,
          _this246._gt, _this246._gate.gain);return _this246;
        }_createClass(hc, [{ key: "dispose", value: function dispose()


















          {
            return _get(_getPrototypeOf(hc.prototype), "dispose", this).call(this), this.input.dispose(), this._follower.dispose(),
            this._gt.dispose(), this._gate.dispose(), this;
          } }, { key: "threshold", get: function get() {return Li(this._gt.value);}, set: function set(t) {this._gt.value = ji(t);} }, { key: "smoothing", get: function get() {return this._follower.smoothing;}, set: function set(t) {this._follower.smoothing = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { smoothing: .1, threshold: -40 });} }]);return hc;}(io);var

      lc = /*#__PURE__*/function (_io41) {_inherits(lc, _io41);var _super171 = _createSuper(lc);
        function lc() {var _this247;_classCallCheck(this, lc);
          _this247 = _super171.call(this, Object.assign(ui(lc.getDefaults(), arguments, ["threshold"]))),
          _this247.name = "Limiter";
          var t = ui(lc.getDefaults(), arguments, ["threshold"]);
          _this247._compressor = _this247.input = _this247.output = new cc({
            context: _this247.context,
            ratio: 20,
            attack: .003,
            release: .01,
            threshold: t.threshold }),
          _this247.threshold = _this247._compressor.threshold, Oi(_assertThisInitialized(_this247),
          "threshold");return _this247;
        }_createClass(lc, [{ key: "dispose", value: function dispose()








          {
            return _get(_getPrototypeOf(lc.prototype), "dispose", this).call(this), this._compressor.dispose(), this.threshold.
            dispose(), this;
          } }, { key: "reduction", get: function get() {return this._compressor.reduction;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { threshold: -12 });} }]);return lc;}(io);var

      uc = /*#__PURE__*/function (_io42) {_inherits(uc, _io42);var _super172 = _createSuper(uc);
        function uc() {var _this248;_classCallCheck(this, uc);
          _this248 = _super172.call(this, Object.assign(ui(uc.getDefaults(), arguments))), _this248.name =
          "MidSideCompressor";
          var t = ui(uc.getDefaults(), arguments);
          _this248._midSideSplit = _this248.input = new Wa({
            context: _this248.context }),
          _this248._midSideMerge = _this248.output = new Ba({
            context: _this248.context }),
          _this248.mid = new cc(Object.assign(t.mid, {
            context: _this248.context })),
          _this248.side = new cc(Object.assign(t.side, {
            context: _this248.context })),
          _this248._midSideSplit.mid.chain(_this248.mid, _this248._midSideMerge.mid),
          _this248._midSideSplit.side.chain(_this248.side, _this248._midSideMerge.side),
          Oi(_assertThisInitialized(_this248), ["mid", "side"]);return _this248;
        }_createClass(uc, [{ key: "dispose", value: function dispose()


















          {
            return _get(_getPrototypeOf(uc.prototype), "dispose", this).call(this), this.mid.dispose(), this.side.dispose(), this.
            _midSideSplit.dispose(), this._midSideMerge.dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { mid: { ratio: 3, threshold: -24, release: .03, attack: .02, knee: 16 }, side: { ratio: 6, threshold: -30, release: .25, attack: .03, knee: 10 } });} }]);return uc;}(io);var

      pc = /*#__PURE__*/function (_io43) {_inherits(pc, _io43);var _super173 = _createSuper(pc);
        function pc() {var _this249;_classCallCheck(this, pc);
          _this249 = _super173.call(this, Object.assign(ui(pc.getDefaults(), arguments))), _this249.name =
          "MultibandCompressor";
          var t = ui(pc.getDefaults(), arguments);
          _this249._splitter = _this249.input = new ic({
            context: _this249.context,
            lowFrequency: t.lowFrequency,
            highFrequency: t.highFrequency }),
          _this249.lowFrequency = _this249._splitter.lowFrequency, _this249.
          highFrequency = _this249._splitter.highFrequency, _this249.output =
          new ho({
            context: _this249.context }),
          _this249.low = new cc(Object.assign(t.low, {
            context: _this249.context })),
          _this249.mid = new cc(Object.assign(t.mid, {
            context: _this249.context })),
          _this249.high = new cc(Object.assign(t.high, {
            context: _this249.context })),
          _this249._splitter.low.chain(_this249.low, _this249.output), _this249._splitter.
          mid.chain(_this249.mid, _this249.output), _this249._splitter.high.chain(_this249.
          high, _this249.output), Oi(_assertThisInitialized(_this249), ["high", "mid", "low",
          "highFrequency", "lowFrequency"]);return _this249;

        }_createClass(pc, [{ key: "dispose", value: function dispose()



























          {
            return _get(_getPrototypeOf(pc.prototype), "dispose", this).call(this), this._splitter.dispose(), this.low.dispose(),
            this.mid.dispose(), this.high.dispose(), this.output.dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { lowFrequency: 250, highFrequency: 2e3, low: { ratio: 6, threshold: -30, release: .25, attack: .03, knee: 10 }, mid: { ratio: 3, threshold: -24, release: .03, attack: .02, knee: 16 }, high: { ratio: 3, threshold: -24, release: .03, attack: .02, knee: 16 } });} }]);return pc;}(io);var

      dc = /*#__PURE__*/function (_io44) {_inherits(dc, _io44);var _super174 = _createSuper(dc);
        function dc() {var _this250;_classCallCheck(this, dc);
          _this250 = _super174.call(this, ui(dc.getDefaults(), arguments, ["low", "mid", "high"])), _this250.
          name = "EQ3", _this250.output = new ho({
            context: _this250.context }),
          _this250._internalChannels = [];
          var t = ui(dc.getDefaults(), arguments, ["low", "mid", "high"]);
          _this250.input = _this250._multibandSplit = new ic({
            context: _this250.context,
            highFrequency: t.highFrequency,
            lowFrequency: t.lowFrequency }),
          _this250._lowGain = new ho({
            context: _this250.context,
            gain: t.low,
            units: "decibels" }),
          _this250._midGain = new ho({
            context: _this250.context,
            gain: t.mid,
            units: "decibels" }),
          _this250._highGain = new ho({
            context: _this250.context,
            gain: t.high,
            units: "decibels" }),
          _this250.low = _this250._lowGain.gain, _this250.mid = _this250._midGain.gain,
          _this250.high = _this250._highGain.gain, _this250.Q = _this250._multibandSplit.Q,
          _this250.lowFrequency = _this250._multibandSplit.lowFrequency, _this250.
          highFrequency = _this250._multibandSplit.highFrequency, _this250.
          _multibandSplit.low.chain(_this250._lowGain, _this250.output), _this250.
          _multibandSplit.mid.chain(_this250._midGain, _this250.output), _this250.
          _multibandSplit.high.chain(_this250._highGain, _this250.output), Oi(_assertThisInitialized(_this250), [
          "low", "mid", "high", "lowFrequency", "highFrequency"]),
          _this250._internalChannels = [_this250._multibandSplit];return _this250;
        }_createClass(dc, [{ key: "dispose", value: function dispose()









          {
            return _get(_getPrototypeOf(dc.prototype), "dispose", this).call(this), Mi(this, ["low", "mid", "high", "lowFrequency",
            "highFrequency"]),
            this._multibandSplit.dispose(), this.lowFrequency.dispose(),
            this.highFrequency.dispose(), this._lowGain.dispose(), this._midGain.
            dispose(), this._highGain.dispose(), this.low.dispose(), this.mid.
            dispose(), this.high.dispose(), this.Q.dispose(), this;
          } }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { high: 0, highFrequency: 2500, low: 0, lowFrequency: 400, mid: 0 });} }]);return dc;}(io);var

      fc = /*#__PURE__*/function (_io45) {_inherits(fc, _io45);var _super175 = _createSuper(fc);
        function fc() {var _this251;_classCallCheck(this, fc);
          _this251 = _super175.call(this, ui(fc.getDefaults(), arguments, ["url", "onload"])), _this251.name =
          "Convolver", _this251._convolver = _this251.context.createConvolver();
          var t = ui(fc.getDefaults(), arguments, ["url", "onload"]);
          _this251._buffer = new Ri(t.url, function (e) {
            _this251.buffer = e, t.onload();
          }), _this251.input = new ho({
            context: _this251.context }),
          _this251.output = new ho({
            context: _this251.context }),
          _this251._buffer.loaded && (_this251.buffer = _this251._buffer), _this251.
          normalize = t.normalize, _this251.input.chain(_this251._convolver, _this251.
          output);return _this251;
        }_createClass(fc, [{ key: "load", value: function load(






          t) {
            return ni(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee63() {return _regeneratorRuntime.wrap(function _callee63$(_context71) {while (1) {switch (_context71.prev = _context71.next) {case 0:_context71.next = 2;
                      return this._buffer.load(t);case 2:this.buffer = _context71.sent;case 3:case "end":return _context71.stop();}}}, _callee63, this);}));

          } }, { key: "dispose", value: function dispose()

















          {
            return _get(_getPrototypeOf(fc.prototype), "dispose", this).call(this), this._buffer.dispose(), this._convolver.
            disconnect(), this;
          } }, { key: "buffer", get: function get() {return this._buffer.length ? this._buffer : null;}, set: function set(t) {t && this._buffer.set(t), this._convolver.buffer && (this.input.disconnect(), this._convolver.disconnect(), this._convolver = this.context.createConvolver(), this.input.chain(this._convolver, this.output));var e = this._buffer.get();this._convolver.buffer = e || null;} }, { key: "normalize", get: function get() {return this._convolver.normalize;}, set: function set(t) {this._convolver.normalize = t;} }], [{ key: "getDefaults", value: function getDefaults() {return Object.assign(io.getDefaults(), { normalize: !0, onload: Ei });} }]);return fc;}(io);


      function _c() {
        return Vi().now();
      }

      function mc() {
        return Vi().immediate();
      }
      var gc = Vi().transport;

      function vc() {
        return Vi().transport;
      }
      var yc = Vi().destination,
      xc = Vi().destination;

      function wc() {
        return Vi().destination;
      }
      var bc = Vi().listener;

      function Tc() {
        return Vi().listener;
      }
      var Sc = Vi().draw;

      function kc() {
        return Vi().draw;
      }
      var Ac = Vi();

      function Cc() {
        return Ri.loaded();
      }
      var Dc = Ri,
      Oc = wo,
      Mc = Vo;
    }(), n;
  }();
});

/***/ }),

/***/ 15:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 16);

/***/ }),

/***/ 16:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 17);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 17:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 3:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"example","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"example","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"example","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"example","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent']).call(this.$scope, event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 5:
/*!********************************************************!*\
  !*** /Users/ou/Desktop/Vue/Xia/Coves/Coves/pages.json ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 75:
/*!*************************************************************************************************!*\
  !*** /Users/ou/Desktop/Vue/Xia/Coves/Coves/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "id": "2852637",
  "name": "uniui图标库",
  "font_family": "uniicons",
  "css_prefix_text": "uniui-",
  "description": "",
  "glyphs": [
  {
    "icon_id": "25027049",
    "name": "yanse",
    "font_class": "color",
    "unicode": "e6cf",
    "unicode_decimal": 59087 },

  {
    "icon_id": "25027048",
    "name": "wallet",
    "font_class": "wallet",
    "unicode": "e6b1",
    "unicode_decimal": 59057 },

  {
    "icon_id": "25015720",
    "name": "settings-filled",
    "font_class": "settings-filled",
    "unicode": "e6ce",
    "unicode_decimal": 59086 },

  {
    "icon_id": "25015434",
    "name": "shimingrenzheng-filled",
    "font_class": "auth-filled",
    "unicode": "e6cc",
    "unicode_decimal": 59084 },

  {
    "icon_id": "24934246",
    "name": "shop-filled",
    "font_class": "shop-filled",
    "unicode": "e6cd",
    "unicode_decimal": 59085 },

  {
    "icon_id": "24934159",
    "name": "staff-filled-01",
    "font_class": "staff-filled",
    "unicode": "e6cb",
    "unicode_decimal": 59083 },

  {
    "icon_id": "24932461",
    "name": "VIP-filled",
    "font_class": "vip-filled",
    "unicode": "e6c6",
    "unicode_decimal": 59078 },

  {
    "icon_id": "24932462",
    "name": "plus_circle_fill",
    "font_class": "plus-filled",
    "unicode": "e6c7",
    "unicode_decimal": 59079 },

  {
    "icon_id": "24932463",
    "name": "folder_add-filled",
    "font_class": "folder-add-filled",
    "unicode": "e6c8",
    "unicode_decimal": 59080 },

  {
    "icon_id": "24932464",
    "name": "yanse-filled",
    "font_class": "color-filled",
    "unicode": "e6c9",
    "unicode_decimal": 59081 },

  {
    "icon_id": "24932465",
    "name": "tune-filled",
    "font_class": "tune-filled",
    "unicode": "e6ca",
    "unicode_decimal": 59082 },

  {
    "icon_id": "24932455",
    "name": "a-rilidaka-filled",
    "font_class": "calendar-filled",
    "unicode": "e6c0",
    "unicode_decimal": 59072 },

  {
    "icon_id": "24932456",
    "name": "notification-filled",
    "font_class": "notification-filled",
    "unicode": "e6c1",
    "unicode_decimal": 59073 },

  {
    "icon_id": "24932457",
    "name": "wallet-filled",
    "font_class": "wallet-filled",
    "unicode": "e6c2",
    "unicode_decimal": 59074 },

  {
    "icon_id": "24932458",
    "name": "paihangbang-filled",
    "font_class": "medal-filled",
    "unicode": "e6c3",
    "unicode_decimal": 59075 },

  {
    "icon_id": "24932459",
    "name": "gift-filled",
    "font_class": "gift-filled",
    "unicode": "e6c4",
    "unicode_decimal": 59076 },

  {
    "icon_id": "24932460",
    "name": "fire-filled",
    "font_class": "fire-filled",
    "unicode": "e6c5",
    "unicode_decimal": 59077 },

  {
    "icon_id": "24928001",
    "name": "refreshempty",
    "font_class": "refreshempty",
    "unicode": "e6bf",
    "unicode_decimal": 59071 },

  {
    "icon_id": "24926853",
    "name": "location-ellipse",
    "font_class": "location-filled",
    "unicode": "e6af",
    "unicode_decimal": 59055 },

  {
    "icon_id": "24926735",
    "name": "person-filled",
    "font_class": "person-filled",
    "unicode": "e69d",
    "unicode_decimal": 59037 },

  {
    "icon_id": "24926703",
    "name": "personadd-filled",
    "font_class": "personadd-filled",
    "unicode": "e698",
    "unicode_decimal": 59032 },

  {
    "icon_id": "24923351",
    "name": "back",
    "font_class": "back",
    "unicode": "e6b9",
    "unicode_decimal": 59065 },

  {
    "icon_id": "24923352",
    "name": "forward",
    "font_class": "forward",
    "unicode": "e6ba",
    "unicode_decimal": 59066 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrow-right",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrowthinright",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrow-left",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrowthinleft",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrow-up",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrowthinup",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrow-down",
    "unicode": "e6be",
    "unicode_decimal": 59070 },
  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrowthindown",
    "unicode": "e6be",
    "unicode_decimal": 59070 },

  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "bottom",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },
  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "arrowdown",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "right",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "arrowright",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "top",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "arrowup",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "left",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "arrowleft",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923334",
    "name": "eye",
    "font_class": "eye",
    "unicode": "e651",
    "unicode_decimal": 58961 },

  {
    "icon_id": "24923335",
    "name": "eye-filled",
    "font_class": "eye-filled",
    "unicode": "e66a",
    "unicode_decimal": 58986 },

  {
    "icon_id": "24923336",
    "name": "eye-slash",
    "font_class": "eye-slash",
    "unicode": "e6b3",
    "unicode_decimal": 59059 },

  {
    "icon_id": "24923337",
    "name": "eye-slash-filled",
    "font_class": "eye-slash-filled",
    "unicode": "e6b4",
    "unicode_decimal": 59060 },

  {
    "icon_id": "24923305",
    "name": "info-filled",
    "font_class": "info-filled",
    "unicode": "e649",
    "unicode_decimal": 58953 },

  {
    "icon_id": "24923299",
    "name": "reload-01",
    "font_class": "reload",
    "unicode": "e6b2",
    "unicode_decimal": 59058 },

  {
    "icon_id": "24923195",
    "name": "mic_slash_fill",
    "font_class": "micoff-filled",
    "unicode": "e6b0",
    "unicode_decimal": 59056 },

  {
    "icon_id": "24923165",
    "name": "map-pin-ellipse",
    "font_class": "map-pin-ellipse",
    "unicode": "e6ac",
    "unicode_decimal": 59052 },

  {
    "icon_id": "24923166",
    "name": "map-pin",
    "font_class": "map-pin",
    "unicode": "e6ad",
    "unicode_decimal": 59053 },

  {
    "icon_id": "24923167",
    "name": "location",
    "font_class": "location",
    "unicode": "e6ae",
    "unicode_decimal": 59054 },

  {
    "icon_id": "24923064",
    "name": "starhalf",
    "font_class": "starhalf",
    "unicode": "e683",
    "unicode_decimal": 59011 },

  {
    "icon_id": "24923065",
    "name": "star",
    "font_class": "star",
    "unicode": "e688",
    "unicode_decimal": 59016 },

  {
    "icon_id": "24923066",
    "name": "star-filled",
    "font_class": "star-filled",
    "unicode": "e68f",
    "unicode_decimal": 59023 },

  {
    "icon_id": "24899646",
    "name": "a-rilidaka",
    "font_class": "calendar",
    "unicode": "e6a0",
    "unicode_decimal": 59040 },

  {
    "icon_id": "24899647",
    "name": "fire",
    "font_class": "fire",
    "unicode": "e6a1",
    "unicode_decimal": 59041 },

  {
    "icon_id": "24899648",
    "name": "paihangbang",
    "font_class": "medal",
    "unicode": "e6a2",
    "unicode_decimal": 59042 },

  {
    "icon_id": "24899649",
    "name": "font",
    "font_class": "font",
    "unicode": "e6a3",
    "unicode_decimal": 59043 },

  {
    "icon_id": "24899650",
    "name": "gift",
    "font_class": "gift",
    "unicode": "e6a4",
    "unicode_decimal": 59044 },

  {
    "icon_id": "24899651",
    "name": "link",
    "font_class": "link",
    "unicode": "e6a5",
    "unicode_decimal": 59045 },

  {
    "icon_id": "24899652",
    "name": "notification",
    "font_class": "notification",
    "unicode": "e6a6",
    "unicode_decimal": 59046 },

  {
    "icon_id": "24899653",
    "name": "staff",
    "font_class": "staff",
    "unicode": "e6a7",
    "unicode_decimal": 59047 },

  {
    "icon_id": "24899654",
    "name": "VIP",
    "font_class": "vip",
    "unicode": "e6a8",
    "unicode_decimal": 59048 },

  {
    "icon_id": "24899655",
    "name": "folder_add",
    "font_class": "folder-add",
    "unicode": "e6a9",
    "unicode_decimal": 59049 },

  {
    "icon_id": "24899656",
    "name": "tune",
    "font_class": "tune",
    "unicode": "e6aa",
    "unicode_decimal": 59050 },

  {
    "icon_id": "24899657",
    "name": "shimingrenzheng",
    "font_class": "auth",
    "unicode": "e6ab",
    "unicode_decimal": 59051 },

  {
    "icon_id": "24899565",
    "name": "person",
    "font_class": "person",
    "unicode": "e699",
    "unicode_decimal": 59033 },

  {
    "icon_id": "24899566",
    "name": "email-filled",
    "font_class": "email-filled",
    "unicode": "e69a",
    "unicode_decimal": 59034 },

  {
    "icon_id": "24899567",
    "name": "phone-filled",
    "font_class": "phone-filled",
    "unicode": "e69b",
    "unicode_decimal": 59035 },

  {
    "icon_id": "24899568",
    "name": "phone",
    "font_class": "phone",
    "unicode": "e69c",
    "unicode_decimal": 59036 },

  {
    "icon_id": "24899570",
    "name": "email",
    "font_class": "email",
    "unicode": "e69e",
    "unicode_decimal": 59038 },

  {
    "icon_id": "24899571",
    "name": "personadd",
    "font_class": "personadd",
    "unicode": "e69f",
    "unicode_decimal": 59039 },

  {
    "icon_id": "24899558",
    "name": "chatboxes-filled",
    "font_class": "chatboxes-filled",
    "unicode": "e692",
    "unicode_decimal": 59026 },

  {
    "icon_id": "24899559",
    "name": "contact",
    "font_class": "contact",
    "unicode": "e693",
    "unicode_decimal": 59027 },

  {
    "icon_id": "24899560",
    "name": "chatbubble-filled",
    "font_class": "chatbubble-filled",
    "unicode": "e694",
    "unicode_decimal": 59028 },

  {
    "icon_id": "24899561",
    "name": "contact-filled",
    "font_class": "contact-filled",
    "unicode": "e695",
    "unicode_decimal": 59029 },

  {
    "icon_id": "24899562",
    "name": "chatboxes",
    "font_class": "chatboxes",
    "unicode": "e696",
    "unicode_decimal": 59030 },

  {
    "icon_id": "24899563",
    "name": "chatbubble",
    "font_class": "chatbubble",
    "unicode": "e697",
    "unicode_decimal": 59031 },

  {
    "icon_id": "24881290",
    "name": "upload-filled",
    "font_class": "upload-filled",
    "unicode": "e68e",
    "unicode_decimal": 59022 },

  {
    "icon_id": "24881292",
    "name": "upload",
    "font_class": "upload",
    "unicode": "e690",
    "unicode_decimal": 59024 },

  {
    "icon_id": "24881293",
    "name": "weixin",
    "font_class": "weixin",
    "unicode": "e691",
    "unicode_decimal": 59025 },

  {
    "icon_id": "24881274",
    "name": "compose",
    "font_class": "compose",
    "unicode": "e67f",
    "unicode_decimal": 59007 },

  {
    "icon_id": "24881275",
    "name": "qq",
    "font_class": "qq",
    "unicode": "e680",
    "unicode_decimal": 59008 },

  {
    "icon_id": "24881276",
    "name": "download-filled",
    "font_class": "download-filled",
    "unicode": "e681",
    "unicode_decimal": 59009 },

  {
    "icon_id": "24881277",
    "name": "pengyouquan",
    "font_class": "pyq",
    "unicode": "e682",
    "unicode_decimal": 59010 },

  {
    "icon_id": "24881279",
    "name": "sound",
    "font_class": "sound",
    "unicode": "e684",
    "unicode_decimal": 59012 },

  {
    "icon_id": "24881280",
    "name": "trash-filled",
    "font_class": "trash-filled",
    "unicode": "e685",
    "unicode_decimal": 59013 },

  {
    "icon_id": "24881281",
    "name": "sound-filled",
    "font_class": "sound-filled",
    "unicode": "e686",
    "unicode_decimal": 59014 },

  {
    "icon_id": "24881282",
    "name": "trash",
    "font_class": "trash",
    "unicode": "e687",
    "unicode_decimal": 59015 },

  {
    "icon_id": "24881284",
    "name": "videocam-filled",
    "font_class": "videocam-filled",
    "unicode": "e689",
    "unicode_decimal": 59017 },

  {
    "icon_id": "24881285",
    "name": "spinner-cycle",
    "font_class": "spinner-cycle",
    "unicode": "e68a",
    "unicode_decimal": 59018 },

  {
    "icon_id": "24881286",
    "name": "weibo",
    "font_class": "weibo",
    "unicode": "e68b",
    "unicode_decimal": 59019 },

  {
    "icon_id": "24881288",
    "name": "videocam",
    "font_class": "videocam",
    "unicode": "e68c",
    "unicode_decimal": 59020 },

  {
    "icon_id": "24881289",
    "name": "download",
    "font_class": "download",
    "unicode": "e68d",
    "unicode_decimal": 59021 },

  {
    "icon_id": "24879601",
    "name": "help",
    "font_class": "help",
    "unicode": "e679",
    "unicode_decimal": 59001 },

  {
    "icon_id": "24879602",
    "name": "navigate-filled",
    "font_class": "navigate-filled",
    "unicode": "e67a",
    "unicode_decimal": 59002 },

  {
    "icon_id": "24879603",
    "name": "plusempty",
    "font_class": "plusempty",
    "unicode": "e67b",
    "unicode_decimal": 59003 },

  {
    "icon_id": "24879604",
    "name": "smallcircle",
    "font_class": "smallcircle",
    "unicode": "e67c",
    "unicode_decimal": 59004 },

  {
    "icon_id": "24879605",
    "name": "minus-filled",
    "font_class": "minus-filled",
    "unicode": "e67d",
    "unicode_decimal": 59005 },

  {
    "icon_id": "24879606",
    "name": "micoff",
    "font_class": "micoff",
    "unicode": "e67e",
    "unicode_decimal": 59006 },

  {
    "icon_id": "24879588",
    "name": "closeempty",
    "font_class": "closeempty",
    "unicode": "e66c",
    "unicode_decimal": 58988 },

  {
    "icon_id": "24879589",
    "name": "clear",
    "font_class": "clear",
    "unicode": "e66d",
    "unicode_decimal": 58989 },

  {
    "icon_id": "24879590",
    "name": "navigate",
    "font_class": "navigate",
    "unicode": "e66e",
    "unicode_decimal": 58990 },

  {
    "icon_id": "24879591",
    "name": "minus",
    "font_class": "minus",
    "unicode": "e66f",
    "unicode_decimal": 58991 },

  {
    "icon_id": "24879592",
    "name": "image",
    "font_class": "image",
    "unicode": "e670",
    "unicode_decimal": 58992 },

  {
    "icon_id": "24879593",
    "name": "mic",
    "font_class": "mic",
    "unicode": "e671",
    "unicode_decimal": 58993 },

  {
    "icon_id": "24879594",
    "name": "paperplane",
    "font_class": "paperplane",
    "unicode": "e672",
    "unicode_decimal": 58994 },

  {
    "icon_id": "24879595",
    "name": "close",
    "font_class": "close",
    "unicode": "e673",
    "unicode_decimal": 58995 },

  {
    "icon_id": "24879596",
    "name": "help-filled",
    "font_class": "help-filled",
    "unicode": "e674",
    "unicode_decimal": 58996 },

  {
    "icon_id": "24879597",
    "name": "plus-filled",
    "font_class": "paperplane-filled",
    "unicode": "e675",
    "unicode_decimal": 58997 },

  {
    "icon_id": "24879598",
    "name": "plus",
    "font_class": "plus",
    "unicode": "e676",
    "unicode_decimal": 58998 },

  {
    "icon_id": "24879599",
    "name": "mic-filled",
    "font_class": "mic-filled",
    "unicode": "e677",
    "unicode_decimal": 58999 },

  {
    "icon_id": "24879600",
    "name": "image-filled",
    "font_class": "image-filled",
    "unicode": "e678",
    "unicode_decimal": 59000 },

  {
    "icon_id": "24855900",
    "name": "locked-filled",
    "font_class": "locked-filled",
    "unicode": "e668",
    "unicode_decimal": 58984 },

  {
    "icon_id": "24855901",
    "name": "info",
    "font_class": "info",
    "unicode": "e669",
    "unicode_decimal": 58985 },

  {
    "icon_id": "24855903",
    "name": "locked",
    "font_class": "locked",
    "unicode": "e66b",
    "unicode_decimal": 58987 },

  {
    "icon_id": "24855884",
    "name": "camera-filled",
    "font_class": "camera-filled",
    "unicode": "e658",
    "unicode_decimal": 58968 },

  {
    "icon_id": "24855885",
    "name": "chat-filled",
    "font_class": "chat-filled",
    "unicode": "e659",
    "unicode_decimal": 58969 },

  {
    "icon_id": "24855886",
    "name": "camera",
    "font_class": "camera",
    "unicode": "e65a",
    "unicode_decimal": 58970 },

  {
    "icon_id": "24855887",
    "name": "circle",
    "font_class": "circle",
    "unicode": "e65b",
    "unicode_decimal": 58971 },

  {
    "icon_id": "24855888",
    "name": "checkmarkempty",
    "font_class": "checkmarkempty",
    "unicode": "e65c",
    "unicode_decimal": 58972 },

  {
    "icon_id": "24855889",
    "name": "chat",
    "font_class": "chat",
    "unicode": "e65d",
    "unicode_decimal": 58973 },

  {
    "icon_id": "24855890",
    "name": "circle-filled",
    "font_class": "circle-filled",
    "unicode": "e65e",
    "unicode_decimal": 58974 },

  {
    "icon_id": "24855891",
    "name": "flag",
    "font_class": "flag",
    "unicode": "e65f",
    "unicode_decimal": 58975 },

  {
    "icon_id": "24855892",
    "name": "flag-filled",
    "font_class": "flag-filled",
    "unicode": "e660",
    "unicode_decimal": 58976 },

  {
    "icon_id": "24855893",
    "name": "gear-filled",
    "font_class": "gear-filled",
    "unicode": "e661",
    "unicode_decimal": 58977 },

  {
    "icon_id": "24855894",
    "name": "home",
    "font_class": "home",
    "unicode": "e662",
    "unicode_decimal": 58978 },

  {
    "icon_id": "24855895",
    "name": "home-filled",
    "font_class": "home-filled",
    "unicode": "e663",
    "unicode_decimal": 58979 },

  {
    "icon_id": "24855896",
    "name": "gear",
    "font_class": "gear",
    "unicode": "e664",
    "unicode_decimal": 58980 },

  {
    "icon_id": "24855897",
    "name": "smallcircle-filled",
    "font_class": "smallcircle-filled",
    "unicode": "e665",
    "unicode_decimal": 58981 },

  {
    "icon_id": "24855898",
    "name": "map-filled",
    "font_class": "map-filled",
    "unicode": "e666",
    "unicode_decimal": 58982 },

  {
    "icon_id": "24855899",
    "name": "map",
    "font_class": "map",
    "unicode": "e667",
    "unicode_decimal": 58983 },

  {
    "icon_id": "24855825",
    "name": "refresh-filled",
    "font_class": "refresh-filled",
    "unicode": "e656",
    "unicode_decimal": 58966 },

  {
    "icon_id": "24855826",
    "name": "refresh",
    "font_class": "refresh",
    "unicode": "e657",
    "unicode_decimal": 58967 },

  {
    "icon_id": "24855808",
    "name": "cloud-upload",
    "font_class": "cloud-upload",
    "unicode": "e645",
    "unicode_decimal": 58949 },

  {
    "icon_id": "24855809",
    "name": "cloud-download-filled",
    "font_class": "cloud-download-filled",
    "unicode": "e646",
    "unicode_decimal": 58950 },

  {
    "icon_id": "24855810",
    "name": "cloud-download",
    "font_class": "cloud-download",
    "unicode": "e647",
    "unicode_decimal": 58951 },

  {
    "icon_id": "24855811",
    "name": "cloud-upload-filled",
    "font_class": "cloud-upload-filled",
    "unicode": "e648",
    "unicode_decimal": 58952 },

  {
    "icon_id": "24855813",
    "name": "redo",
    "font_class": "redo",
    "unicode": "e64a",
    "unicode_decimal": 58954 },

  {
    "icon_id": "24855814",
    "name": "images-filled",
    "font_class": "images-filled",
    "unicode": "e64b",
    "unicode_decimal": 58955 },

  {
    "icon_id": "24855815",
    "name": "undo-filled",
    "font_class": "undo-filled",
    "unicode": "e64c",
    "unicode_decimal": 58956 },

  {
    "icon_id": "24855816",
    "name": "more",
    "font_class": "more",
    "unicode": "e64d",
    "unicode_decimal": 58957 },

  {
    "icon_id": "24855817",
    "name": "more-filled",
    "font_class": "more-filled",
    "unicode": "e64e",
    "unicode_decimal": 58958 },

  {
    "icon_id": "24855818",
    "name": "undo",
    "font_class": "undo",
    "unicode": "e64f",
    "unicode_decimal": 58959 },

  {
    "icon_id": "24855819",
    "name": "images",
    "font_class": "images",
    "unicode": "e650",
    "unicode_decimal": 58960 },

  {
    "icon_id": "24855821",
    "name": "paperclip",
    "font_class": "paperclip",
    "unicode": "e652",
    "unicode_decimal": 58962 },

  {
    "icon_id": "24855822",
    "name": "settings",
    "font_class": "settings",
    "unicode": "e653",
    "unicode_decimal": 58963 },

  {
    "icon_id": "24855823",
    "name": "search",
    "font_class": "search",
    "unicode": "e654",
    "unicode_decimal": 58964 },

  {
    "icon_id": "24855824",
    "name": "redo-filled",
    "font_class": "redo-filled",
    "unicode": "e655",
    "unicode_decimal": 58965 },

  {
    "icon_id": "24841702",
    "name": "list",
    "font_class": "list",
    "unicode": "e644",
    "unicode_decimal": 58948 },

  {
    "icon_id": "24841489",
    "name": "mail-open-filled",
    "font_class": "mail-open-filled",
    "unicode": "e63a",
    "unicode_decimal": 58938 },

  {
    "icon_id": "24841491",
    "name": "hand-thumbsdown-filled",
    "font_class": "hand-down-filled",
    "unicode": "e63c",
    "unicode_decimal": 58940 },

  {
    "icon_id": "24841492",
    "name": "hand-thumbsdown",
    "font_class": "hand-down",
    "unicode": "e63d",
    "unicode_decimal": 58941 },

  {
    "icon_id": "24841493",
    "name": "hand-thumbsup-filled",
    "font_class": "hand-up-filled",
    "unicode": "e63e",
    "unicode_decimal": 58942 },

  {
    "icon_id": "24841494",
    "name": "hand-thumbsup",
    "font_class": "hand-up",
    "unicode": "e63f",
    "unicode_decimal": 58943 },

  {
    "icon_id": "24841496",
    "name": "heart-filled",
    "font_class": "heart-filled",
    "unicode": "e641",
    "unicode_decimal": 58945 },

  {
    "icon_id": "24841498",
    "name": "mail-open",
    "font_class": "mail-open",
    "unicode": "e643",
    "unicode_decimal": 58947 },

  {
    "icon_id": "24841488",
    "name": "heart",
    "font_class": "heart",
    "unicode": "e639",
    "unicode_decimal": 58937 },

  {
    "icon_id": "24839963",
    "name": "loop",
    "font_class": "loop",
    "unicode": "e633",
    "unicode_decimal": 58931 },

  {
    "icon_id": "24839866",
    "name": "pulldown",
    "font_class": "pulldown",
    "unicode": "e632",
    "unicode_decimal": 58930 },

  {
    "icon_id": "24813798",
    "name": "scan",
    "font_class": "scan",
    "unicode": "e62a",
    "unicode_decimal": 58922 },

  {
    "icon_id": "24813786",
    "name": "bars",
    "font_class": "bars",
    "unicode": "e627",
    "unicode_decimal": 58919 },

  {
    "icon_id": "24813788",
    "name": "cart-filled",
    "font_class": "cart-filled",
    "unicode": "e629",
    "unicode_decimal": 58921 },

  {
    "icon_id": "24813790",
    "name": "checkbox",
    "font_class": "checkbox",
    "unicode": "e62b",
    "unicode_decimal": 58923 },

  {
    "icon_id": "24813791",
    "name": "checkbox-filled",
    "font_class": "checkbox-filled",
    "unicode": "e62c",
    "unicode_decimal": 58924 },

  {
    "icon_id": "24813794",
    "name": "shop",
    "font_class": "shop",
    "unicode": "e62f",
    "unicode_decimal": 58927 },

  {
    "icon_id": "24813795",
    "name": "headphones",
    "font_class": "headphones",
    "unicode": "e630",
    "unicode_decimal": 58928 },

  {
    "icon_id": "24813796",
    "name": "cart",
    "font_class": "cart",
    "unicode": "e631",
    "unicode_decimal": 58929 }] };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map