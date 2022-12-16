<template>
  <view class="container">
    <view>
      <!-- 提示窗示例 -->
      <uni-popup ref="alertDialog" type="dialog" :maskTop="'0'">
        <uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="退出登录" content="您确定要退出登录吗?"
          @confirm="dialogConfirm" @close="dialogClose"> </uni-popup-dialog>
      </uni-popup>
    </view>
    <button class="btn" @click="[dialogToggle('error')]">
      退出登录
    </button>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import store from '../../store/module/user.js'
  export default {
    data() {
      return {
        msgType: 'success',

      }
    },
    methods: {
      ...mapMutations('m_user', ['logOut']),
      myLogOut() {
        this.logOut()
        uni.switchTab({
          url: '/pages/me/me'
        })
      },
      dialogToggle(type) {
        this.msgType = type
        this.$refs.alertDialog.open()
      },
      dialogConfirm() {
        this.myLogOut()
      },
      dialogClose() {},
    },
  }
</script>

<style lang="scss">
  page {
    height: 100%;
    background-color: #fff !important;
  }

  .container {
    width: 702rpx;
    margin: 0 auto;
    height: 100%;
    padding-top: 50rpx;

    .box {
      background-color: #eef4f7;
      padding: 20rpx 0rpx;
      padding-left: 40rpx;
      margin-bottom: 40rpx;
      border-radius: 20rpx;

      .box-item {
        font-size: 40rpx;
        padding: 12rpx 0rpx;

        &:first-of-type::after {
          content: "";
          display: block;
          background-color: #bbb;
          opacity: 0.55;
          width: 576rpx;
          height: 2rpx;
          margin-top: 15px;
        }
      }
    }

    .btn {
      height: 88rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none;
      border: none;
      color: #fff;
      background-color: #95c8e3;
      font-size: 35rpx;
    }
  }
</style>
