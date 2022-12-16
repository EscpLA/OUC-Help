<template>
  <view class="container">
    <!-- me页面 -->
    <!-- 登录页面 -->
    <myLogin v-if="!token" ref="myLoginRef">
    </myLogin>
    <!-- 注册页面 -->
    <meSignUp v-else-if="JSON.stringify(stuInfo) == '{}'">
    </meSignUp>

    <!-- 用户信息页面 -->
    <meUserInfo v-else>
    </meUserInfo>

  </view>
</template>

<script>
  import myLogin from '@/components/me-login/me-login.vue'
  import meSignUp from '@/components/me-signUp/me-signUp.vue'
  import meUserInfo from '@/components/me-userinfo/me-userinfo.vue'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {};
    },
    // 计算属性
    computed: {
      // 利用 mapState函数，把 m_user 中的数据映射到本页面
      ...mapState('m_user', ['token', 'userInfo', 'isSignUp', 'stuInfo']),
    },
    methods: {
      ...mapMutations('m_user', ['updateStuInfo'])
    },
    components: {
      meUserInfo,
      meSignUp,
      myLogin
    },

    onLoad() {
      // console.log("stuInfo: ", this.stuInfo);
      // console.log('stuInfo', JSON.stringify(this.stuInfo) == '{}');
    },
    async onPullDownRefresh() {
      // this.$refs.myLoginRef
      // console.log('this.$refs.myLoginRef: ', this.$refs.myLoginRef)
      // 当且仅当是个人信息页，才有下拉刷新，否则立刻停止
      if (!this.token || JSON.stringify(this.stuInfo) == '{}') {
        uni.stopPullDownRefresh()
      } else {
        // 重新加载用户个人信息
        const {
          data: res
        } = await uni.$http.post('/getStuInfo/', {
          openid: this.token
        })
        if (res.code != 200) {
          return uni.$showMsg('个人信息获取失败', 1500, 'error');
        }
        // 刷新成功，将结果持久化存储
        this.updateStuInfo(res.stuInfo[0])
        
        uni.$showMsg('信息加载成功', 1500, 'success');
        uni.stopPullDownRefresh()
      }
    }
  }
</script>

<style lang="scss">
  page {
    height: 100%;
  }

  .container {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
