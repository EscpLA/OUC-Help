<template>
  <view class="me-login-container">
    <!-- 登录父盒子 -->
    <!-- 登录logo -->
    <image src="../../static/img/logo.jpg" mode=""></image>
    <!-- 下方文本盒子 -->
    <view class="me-login-button-box">
      <view class="me-login-button-text">
        登陆方式
      </view>
      <!-- 微信登陆按钮 -->
      <view class="me-login-button" @click="getUserProfile()">
        <uni-icons type="weixin" size="58" color="#5bac3d"></uni-icons>
        <view class="wx-login">微信登陆</view>
      </view>
    </view>
  </view>
</template>

<script>
  import store from '../../store/store.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: "me-login",
    data() {
      return {

      };
    },
    // 计算属性
    computed: {
      ...mapState('m_user', ['userInfo'])
    },
    methods: {
      // 把store中 更新 userInfo 的方法映射到当前页面
      ...mapMutations('m_user', ['updateUserinfo', 'updateStuInfo', 'updateToken']),
      // 存储用户的信息，用于请求
      async getUserProfile(e) {
        // 判断缓存中是否有userinfo，如果没有userinfo
        // 弹出授权窗口，获取用户信息
        let resInfo = {}
        uni.getUserProfile({
          desc: '用于完善用户信息',
          success: (res) => {
            console.log(res);
            // 调用 mutation 方法，更新 userInfo 
            this.updateUserinfo(res.userInfo)
            // 根据 res 获取Token
            this.getToken(res)
          },
          // 如果用户拒绝了登录授权
          fail: () => {
            return uni.$showMsg("您拒绝了登录授权")
          }
        })

      },
      // 
      async getToken(resInfo) {
        // 先根据 userinfo 调用uni.login得到code
        // 再根据code，向后端服务器发起请求，获得token;
        const [err, res] = await uni.login().catch(err => err)
        // 判断是否 uni.login() 调用失败
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        // 准备请求的参数对象：
        console.log("返回值，code", res);
        // 定义请求参数

        const query = {
          code: res.code
        }

        const {
          data: loginRes
        } = await uni.$http.post('/login/', query)
        console.log('loginRes', loginRes)

        // 先记录下 openid(Toekn)
        this.updateToken(loginRes.openid)
        // 如果数据库中没有这个用户
        if (JSON.stringify(loginRes.stuInfo) == '{}') {
          console.log("1111");
        } else {
          // 如果有这个用户
          console.log("2222");
          console.log('sutInfo', loginRes.stuInfo[0]);
          this.updateStuInfo(loginRes.stuInfo[0])
        }
      }
      // // 假设成功获取了Token
      // this.updateToken("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o")


    }
  }
</script>

<style lang="scss">
  .me-login-container {
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    image {
      width: 570rpx;
      height: 404rpx;
      margin-top: -100rpx;
    }

    .me-login-button-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .me-login-button-text {
        color: #101010;
        margin-top: 86rpx;
        text-align: center;

        // 尾元素，下方横线
        &::after {
          content: '';
          display: block;
          background-color: #BBBBBB;
          width: 196rpx;
          height: 1rpx;
          margin-top: 6rpx;
        }
      }

      // 登录按钮
      .me-login-button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 60rpx;

        text.wx-login {
          // line-height: 69rpx;
          margin-left: 13rpx;
          border-bottom: #101010 solid 1rpx;
          padding-bottom: -1rpx;
        }
      }

    }
  }
</style>
