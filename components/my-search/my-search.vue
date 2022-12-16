<template>
  <view class="my-search-container">
    <!-- 使用 view 组件模拟 input 输入框的样式 -->
    <view class="my-search-box" @click="ClickHandler">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">请输入搜索内容</text>
    </view>

    <image src="/static/img/post.png" mode="" @click="toggle('right')" :class="[popShow? 'popRotate': '']"></image>

    <!-- 点击按钮，发布帖子 -->
    <view>
      <!-- 普通弹窗 -->
      <uni-popup ref="popup" background-color="#fff" @change="change" :maskTop="'50'" :contentTop="'50'">
        <view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
          <view class="text-box">
            <view class="text" @click="navigateHandler(1)">发布寻物启事</view>
            <view class="text" @click="navigateHandler(2)">发布招领启事</view>
          </view>
        </view>
      </uni-popup>
    </view>

    <view>
      <!-- 提示窗示例 -->
      <uni-popup ref="alertDialog" type="dialog">
        <uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="同意" title="通知" :content="content"
          @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
      </uni-popup>
    </view>

  </view>
</template>

<script>
  import store from '@/store/module/user.js';
  import {
    mapState
  } from 'vuex';
  export default {
    name: "my-search",
    data() {
      return {
        // 用于表示弹出层是否处于激活状态
        popShow: false,
        // 对话框内容
        content: '',
        // 对话框类型
        msgType: '',

        fatherDeviceWidth: 0,
      };
    },

    computed: {
      ...mapState('m_user', ['token', 'stuInfo'])
    },
    methods: {
      ClickHandler() {
        this.$emit('click')
      },
      toggle(type) {
        this.type = type
        // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
        this.$refs.popup.open(type)
      },
      change(e) {
        console.log('当前模式：' + e.type + ',状态：' + e.show);
        this.popShow = e.show;
      },
      // 导航点击事件
      navigateHandler(type) {

        // 先判断是否登录
        if (this.token == '' || JSON.stringify(this.stuInfo) == '{}') {
          return this.dialogToggle('error', '您尚未登录，是否跳转到登陆页面？')
        }
        uni.redirectTo({
          url: '/subpkg/uploadGoods/uploadGoods?type=' + type
        })
      },
      popUpClose() {
        this.$refs.popup.close();
      },

      // 弹出对话框
      dialogToggle(type, msg) {
        this.msgType = type;
        this.content = msg;
        this.$refs.alertDialog.open()
      },
      dialogConfirm() {
        uni.switchTab({
          url: '/pages/me/me'
        })
      },
      dialogClose() {

      }
    },
    created() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度赋值
      this.fatherDeviceWidth = sysInfo.windowWidth;
      console.log("this.fatherDeviceWidth: ", this.fatherDeviceWidth);
    }
  }
</script>

<style lang="scss">
  // 发布帖子点击 旋转样式
  .popRotate {
    transform: rotate(45deg) scale(1.2);
  }

  .my-search-container {
    background-color: #fff;
    height: 30px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    margin-bottom: 13px;

    image {
      width: 70rpx;
      height: 70rpx;
      transition: all 0.3s;
    }
  }

  .my-search-box {
    height: 36px;
    background-color: #eef4f7;
    border-radius: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 15px;

    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }

  .popup-content {
    border-radius: 20px;

    .text-box {
      border-radius: 20px;
      position: relative;

      .text {
        padding: 20px;


        &::after {
          display: block;
          content: '';
          background-color: #000;
          opacity: 0.5;
          width: 90%;
          height: 1px;
          margin: 0 auto;
          position: absolute;
          top: 50%;
          left: 5%;
        }

        // 消除一个孩子的伪元素
        &:nth-of-type(1)::after {
          display: none;
        }
      }
    }
  }
</style>
