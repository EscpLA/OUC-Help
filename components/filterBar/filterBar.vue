<!-- 筛选、排序栏 -->
<template>
  <view class="fliterBar-container">
    <view class="filer-text filter-item-box">
      筛选
      <view class="iconfont icon-filter"></view>
    </view>
    <!-- @click="filterClick(item.type)" 上方筛选类型-->
    <view class="filer-btn filter-item-box" v-for="(item, index) in filterList" :key="index"
      @click="toggle('top', index)">
      {{item.secondList[active].value}}

      <view class="iconfont icon-arrow-sortdown-smal"></view>
    </view>

    <!-- 点击按钮，发布帖子 -->
    <view>
      <!-- 普通弹窗 ，显示具体如何筛选-->
      <uni-popup ref="popup" background-color="#fff" :leftNavWidth="leftNavWidth" :devWidth="devWidth">
        <view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
          <view class="filterList">
            <view :class="['filterItem', active == index ? 'activeItem': '']" v-for="(item, index) in curSecondList"
              :key="index" @click="timeFilterCLick(index)">
              {{item.value}}
              <view class="iconfont icon-gouxuan" v-if="index == active">
              </view>
              <!-- 普通 fitler 项 -->
              <!--  <view v-if="index != 2" class="norm-filterItem">
                {{item.value}}
                <view class="iconfont icon-gouxuan" v-if="index == active">
                </view>
              </view> -->
              <!-- 日期选择filter项 -->
              <!--  <uni-datetime-picker v-else v-model="range" type="daterange" @maskClick="maskClick">

                <view class="norm-filterItem">
                  {{item.value}}
                  <view class="iconfont icon-gouxuan" v-if="index == active">
                  </view>
                </view>

              </uni-datetime-picker>
            -->
            </view>
          </view>
        </view>
      </uni-popup>
    </view>



  </view>
</template>

<script>
  export default {
    name: "filterBar",
    data() {
      return {
        curIndex: -1,
        curSecondList: [],
        active: 0,
      };
    },
    props: {
      filterList: [],
      leftNavWidth: 0,
      devWidth: 0,
    },
    methods: {
      toggle(type, curIndex) {
        this.type = type
        // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
        this.$refs.popup.open(type)
        // 修改筛选栏
        this.curIndex = curIndex;
        this.curSecondList = this.filterList[this.curIndex].secondList
      },
      popUpClose() {
        this.$refs.popup.close();
      },
      // 时间筛选选项点击时间
      timeFilterCLick(index) {
        this.active = index
        // SlectID为空或=1：按最新排序 =2：按最早排序 =3：按指定日期最新排序，接收start, end参数

        this.$emit('syncSelectId', {
          selectID: index + 1
        })
      },

      maskClick(e) {
        console.log('maskClick事件:', e);
      }
    }
  }
</script>

<style lang="scss">
  .uni-date {
    position: fixed !important;
  }

  // 选中筛选项的样式
  .activeItem {
    color: #e99d42;
  }

  .fliterBar-container {
    display: flex;
    justify-content: flex-end;
    padding-right: 30rpx;

    .filter-item-box {
      margin-left: 40rpx;
      display: flex;
      align-items: center;

      .iconfont {
        margin-left: 15rpx;
      }
    }

    .filer-text {
      color: #4095E5 !important;
    }

    .filer-btn {
      margin-left: 40rpx;
    }

    .filterList {
      width: 100%;
      // border-radius: 20px;
    }

    .filterItem {
      width: 80%;
      margin: 0 auto;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #efefef;
      // border-radius: 20px;
      display: flex;


      // flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .norm-filterItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .iconfont {
        font-size: 48rpx;
        color: #e99d42;
      }
    }

  }

  .uni-popup .uni-popup__wrapper {
    // border-radius: 0 0 15px 15px !important;
    width: 100%;
  }
</style>
