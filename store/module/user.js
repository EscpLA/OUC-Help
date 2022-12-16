export default {
  // 开启命名空间，所有的state和Mutations 需要指定模块名才可调用
  namespaced: true,

  //状态
  state: {
    // 用户个人信息,先获取 内存中是否有 userInfo ，如果没有则为空对象，因为是字符串，故需要 JSON.parse 为真正的对象。
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),

    // 学生信息，存放学号、专业、年纪等
    stuInfo: JSON.parse(uni.getStorageSync('stuInfo') || '{}'),

    // 用户令牌，登陆后为用户唯一的凭证(字符串类型)
    token: uni.getStorageSync('token') || '',
    // 存储用户是否已经注册（输入学号等个人信息）
    isSignUp: uni.getStorageSync('isSignUp') || false,

    // 首页左侧导航栏，即物品种类。
    leftNav: JSON.parse(uni.getStorageSync('leftNav') || '[]'),

    // 年级、专业列表
    majorAndGrade: JSON.parse(uni.getStorageSync('majorAndGrade') || '{}')
  },

  // 改变方法
  mutations: {
    // 更新用户信息
    updateUserinfo(state, userInfo) {
      state.userInfo = userInfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    // 把用户信息持久化存储到本地，以便自动登录。
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },

    //更新token
    updateToken(state, token) {
      state.token = token
      console.log(token);
      this.commit('m_user/saveTokenToStorage')
    },
    // 将token持久化存储到本地
    saveTokenToStorage(state, token) {
      uni.setStorageSync('token', state.token)
    },

    // 更新用户注册状态
    updateSignUp(state, payload) {
      state.isSignUp = payload
      console.log(state.isSignUp);
      this.commit('m_user/saveSignUpToStorage')
    },
    // 把isSignUp持久化存储到本地
    saveSignUpToStorage(state) {
      uni.setStorageSync('isSignUp', state.isSignUp)
    },

    updateStuInfo(state, stuInfo) {
      state.stuInfo = stuInfo
      this.commit('m_user/saveStuInfoToStorage')
    },
    saveStuInfoToStorage(state) {
      uni.setStorageSync('stuInfo', JSON.stringify(state.stuInfo))
    },

    // 更新物品种类
    updateLeftNav(state, leftNav) {
      state.leftNav = leftNav
      this.commit('m_user/saveLeftNavToStorage')
    },
    // 将物品种类持久存储
    saveLeftNavToStorage(state) {
      uni.setStorageSync('leftNav', JSON.stringify(state.leftNav))
    },

    // 更新年级专业列表
    updateMandG(state, MandG) {
      state.majorAndGrade = MandG;
      this.commit('m_user/saveMandGToStorage')
    },
    // 将年级专业列表持久化存储
    saveMandGToStorage(state) {
      uni.setStorageSync('majorAndGrade', JSON.stringify(state.majorAndGrade))
    },

    // 退出登录，修改 token 和 userInfo
    logOut(state) {
      // 置空 token
      state.token = ""
      uni.removeStorageSync('token')
      state.userInfo = ""
      uni.removeStorageSync("userInfo")
    }
  },

  // Actions 包含异步方法
  actions: {
    // 上传到 OSS 平台前，获取用户的 signature, policy, AccessKeyID, AccessKeySecret, securityToken 等数据。
    async getOSSToken({
      commit,
      state
    }) {
      let base64 = require('base-64')
      let crypto = require('crypto-js')
      console.log("getOssToken, used");
      // 计算签名。
      function computeSignature(accessKeySecret, canonicalString) {
        return crypto.enc.Base64.stringify(crypto.HmacSHA1(canonicalString, accessKeySecret));
      }

      const date = new Date();
      date.setHours(date.getHours() + 1);
      const policyText = {
        expiration: date.toISOString(), // 设置policy过期时间。
        conditions: [
          // 限制上传大小。
          ["content-length-range", 0, 1024 * 1024 * 1024],
        ],
      };

      // 接下来访问后端接口，获取上述内容
      // 1. 参数准备：需要用户的 token
      // let data = {
      //   token: state.token
      // }
      // 修改 1
      // 2. 访问接口, 这里用 http 请求，data 是请求参数
      let res = await uni.$http.post('/get_token/')
      console.log(res);
      const policy = base64.encode(JSON.stringify(policyText))
      console.log("res.data.result.AccessKeySecret, policy", res.data.result.AccessKeySecret, policy);
      const signature = computeSignature(res.data.result.AccessKeySecret, policy)

      // 准备函数的返回值。修改 2
      const formData = {
        OSSAccessKeyId: res.data.result.AccessKeyId,
        signature,
        policy,
        SecurityToken: res.data.result.SecurityToken,
        OSSFileName: res.data.result.OSSFileName
      }
      console.log(formData);
      return formData
    }
  }
}
