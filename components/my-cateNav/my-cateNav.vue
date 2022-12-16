<template>
  <view>
    <view class="nav-bar">
      <!-- 种类导航 -->
      <view :class="['nav-item', drawerOpen == 1 ? 'drawerOpen-active-first': '']" @click="openDrower('showLeft')">
        <image src="/static/img/nav-cate.png" mode="" class="nav-item-cata"></image>
        种类导航
      </view>
      <uni-drawer ref="showLeft" mode="left" :width="200" @my_change='syncDrawerOpen'>
        <view class="drawerContent">
          <view class="content-top" @click="closeDrawer('showLeft')">
            确定
          </view>
          <view class="content-bottom">
            <view class="content-left">
              <view class="content-item" v-for="(item1, i1) in cateNav" :key="i1" @click="firstNavClickHandler(i1)">
                <text :class="['content-text', i1 == firstActive ? 'firstNavActive' : '']">
                  {{item1.firstNav}}
                </text>
              </view>
            </view>
            <view class="content-right">
              <view class="content-item" v-for="(item2, i2) in cateSecondNav" :key="i2"
                @click="secondNavClickHandler(i2)">
                <text :class="['content-text', i2 == secondActive ? 'secondNavActive' : '']">
                  {{item2}}
                </text>
              </view>
            </view>
          </view>
        </view>
      </uni-drawer>
      <view :class="['nav-item', drawerOpen == 1 ? 'drawerOpen-active': '']">
        地点
        <uni-icons type="bottom" size="14"></uni-icons>
      </view>
      <view :class="['nav-item', drawerOpen == 1 ? 'drawerOpen-active': '']">
        时间
        <uni-icons type="bottom" size="14"></uni-icons>
      </view>
      <view :class="['nav-item', drawerOpen == 1 ? 'drawerOpen-active': '']">
        颜色
        <uni-icons type="bottom" size="14"></uni-icons>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    name: "cateNav",
    data() {
      return {

        // 种类导航信息，左侧一级导航
        cateNav: [{
            firstNav: '数码设备',
            secondNav: ['手机', '电脑', '耳机', '其他']
          },
          {
            firstNav: '证件',
            secondNav: ['校园卡', '身份证', '银行卡', '其他']
          },
          {
            firstNav: '学习用品',
            secondNav: ['校园卡', '身份证', '银行卡', '其他']
          },
          {
            firstNav: '生活用品',
            secondNav: ['校园卡', '身份证', '银行卡', '其他']
          }
        ],
        // 右侧二级导航1. 种类导航 点击类目时，滑块跟着移动
        cateSecondNav: ['手机', '电脑', '耳机', '其他'],
        // 激活项 ，分别表示一级导航的激活项
        firstActive: 0,
        // 二级导航的激活项
        secondActive: 0,
        // 用于记录 抽屉的状态
        // 0 表示关闭， 1 表示开启
        drawerOpen: 0,
      };
    },
    methods: {

      // drawer 操作函数
      openDrower(e) {
        this.$refs[e].open();
        this.$data.drawerOpen = 1;
      },
      closeDrawer(e) {
        this.$refs[e].close();
        this.$data.drawerOpen = 0;
        // 调用 确定的点击事件
        this.cateConfirm()
      },
      // 种类导航 确定按钮 点击事件
      cateConfirm() {
        uni.$showMsg("您选择了：" + this.cateNav[this.firstActive].firstNav + "," + this.cateSecondNav[this.secondActive])
      },
      // 同步事件，用于 子组件关闭 drawer 时，同步更新父组件的 drawerOpen
      syncDrawerOpen() {
        this.$data.drawerOpen = 0;
      },

      // 一级导航点击事件
      firstNavClickHandler(i1) {
        // 修改一级导航激活项
        this.firstActive = i1;
        // 修改二级导航内容
        // console.log(this.firstNav[i1]);
        this.cateSecondNav = this.cateNav[i1].secondNav
        // 二级导航激活项 回到0
        this.secondActive = 0
      },
      // 二级导航点击事件
      secondNavClickHandler(i2) {
        this.secondActive = i2;
      }
    }
  }
</script>

<style lang="scss">
  // 导航栏激活项样式
  .firstNavActive {
    background-color: #b2d7eb;
  }

  .secondNavActive {
    background-color: #ffd6b9;
  }

  // 抽屉打开和关闭时的样式
  .drawerOpen-active {
    margin-top: 5px;
    margin-right: 5px;
  }

  .drawerOpen-active-first {
    background-color: #fff !important;
  }

  // 导航栏
  .nav-bar {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    font-weight: bold;
    padding-top: 12px;

    .nav-item {
      display: flex;
      padding: 5px 15px;
      background-color: #eef4f7;
      border-radius: 14px;
      transition: all 0.5s;
      margin-right: 10px;

      image.nav-item-cata {
        width: 19px;
        height: 19px;
        margin-right: 5px;
      }

      // 第一个孩子的背景色不同
      &:nth-of-type(1) {
        background-color: #fff0e3;
        // 始终顶层显示
        z-index: 1000;
        margin-right: 0px;
      }
    }

    .drawerContent {
      padding: 0px 10px;
      height: 100%;

      .content-top {
        padding-right: 10px;
        border-bottom: 1px solid #000;
        height: 48px;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        margin-top: 3px;
      }

      .content-bottom {
        display: flex;
        height: 100%;
        padding-bottom: 10px;

        .content-left {
          width: 49%;
          border-right: 1px solid #000;
          padding-bottom: 10px;
        }

        .content-right {
          width: 50%;

          // 右侧的盒子 jc 有所改变
          .content-item {
            justify-content: flex-end;

            text {
              text-align: center;
              padding: 0;
              padding: 0 20px;
            }
          }
        }

        .content-item {
          border-bottom: 1px solid #000;
          height: 40px;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          text {
            padding-left: 10px;
            height: 25px;
            line-height: 25px;
            border-radius: 15px;
          }

          &:last-of-type {
            border-bottom: none;
          }
        }
      }
    }
  }
</style>
