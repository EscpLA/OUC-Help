// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 1. 导入 store 的实例对象
import store from './store/store.js'
import {mapState, mapMutations} from 'vuex'
import crypto from 'crypto-js'
import {base64} from 'base-64'

// 按需导入 $http 对象
import {
  $http
} from '@escook/request-miniprogram'
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// 配置请求根路径
$http.baseUrl = "https://ouchelp.yangyq.net"

// 封装拦截器
$http.beforeRequest = (options) => {
  uni.showLoading({
    title: '数据加载中...'
  })
}

$http.afterRequest = () => {
  uni.hideLoading()
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  // 把 store 挂载到 Vue 实例上
  store,
})
app.$mount()
// #endif

// 封装一个弹窗方法
uni.$showMsg = function(title = '数据加载失败!', duration = 1500, icon = 'none') {
  uni.showToast({
    title,
    duration,
    icon
  })
}

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
