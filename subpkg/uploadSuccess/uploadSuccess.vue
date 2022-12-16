<template>
  <view class="container">
    <view class="box">
      <text class="top">
        发布成功！
      </text>
      <text class="bottom">
        {{ time }}秒后页面自动跳转
      </text>
    </view>
    <view class="btnBox" @click="btnClickHandler">
      <button class="btn1" data-type="1">查看帖子</button>
      <button class="btn2" data-type="2">回到首页</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        time: 8,
        // 定时器
        timer: null,
        query: {},
      };
    },
    methods: {
      // 计数器函数，每次让倒数 -1
      counter() {
        if (this.time > 1) {
          this.time--;
        } else {
          clearInterval(this.timer)
          this.goToHome()
        }
      },
      // 导航回主页
      goToHome() {
        uni.switchTab({
          url: '/pages/lost/lost'
        })
      },
      // 按钮点击代理事件
      btnClickHandler(e) {
        // 1表示查看帖子，2表示回到首页。
        if (e.target.dataset.type == "1") {
          // 清除定时器
          clearInterval(this.timer)
          uni.redirectTo({
            url: '/subpkg/goods_detail/goods_detail?detail_type=' + this.query.type + '&item_id=' + this.query
              .postId,
          })
        } else {
          this.goToHome()
        }
      }
    },
    onLoad(options) {
      this.query = options;
      // 设置定时器
      this.timer = setInterval(this.counter, 1000)

    },
    onHide(){
      // 清除定时器
      console.log('清除定时器');
      clearInterval(this.timer)
    }
  }
</script>

<style lang="scss">
  .container {
    overflow: hidden;
    width: 247px;
    margin: 0 auto;

    .box {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 270px;
      background-color: #e6eef2;
      margin-top: 95px;
      overflow: hidden;
      border-radius: 20px;

      text.top {
        font-size: 60rpx;
        text-align: center;
        margin-top: 40rpx;
      }

      text.bottom {
        height: 100rpx;
        font-size: 40rpx;
        color: #7d7b7b;
        text-align: center;

        &:before {
          margin-bottom: 35px;
          display: block;
          content: "";
          width: 402rpx;
          height: 2rpx;
          background-color: #bbb;
        }
      }
    }

    .btnBox {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      button {
        margin: 0;
        padding: 0;
        outline: none !important;
        border: none !important;
        border-radius: 20px;
        padding: 5px 15px;

        &::after {
          border: none;
        }
      }

      .btn1 {
        background-color: #add3e8;
        color: #fff;
      }

      .btn2 {
        color: #add3e8;
        border: 1px solid #add3e8 !important;
      }
    }
  }
</style>
