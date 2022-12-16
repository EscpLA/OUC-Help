// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 导入用户信息module
import moduleUser from './module/user.js'

// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

// 3. 创建 Store 的实例对象
const store = new Vuex.Store({
  // 状态
  state() {
    return {}
  },
  // 改变方法
  mutations: {},
  modules: {
    m_user: moduleUser
  }
})

// 4. 向外共享 Store 的实例对象
export default store
