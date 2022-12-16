<template>
  <view class="bg-white">
    <!-- 寻物 页面的帖子 -->
    <view class="search-box">
      <mySearch @click="goToSearch" ref="mySearch"></mySearch>
    </view>
    <!-- 版心 -->
    <view class="container">
      <!-- 导航栏 -->
      <!-- <my-cateNav></my-cateNav> -->
      <!-- 每个帖子的容器 -->
      <view class="mid-content-container">
        <view class="left">
          <!-- 种类导航 -->
          <scroll-view class="cat-container" scroll-y :style="{height: wh+'px'}">
            <view class="cat-item" v-for="(item,index1) in leftNav" :key="index1">
              <!-- 一级导航 -->
              <view
                :class="['first-nav-item', index1== firstActive ? (index1 %2 == 0 ? 'firstActive even': 'firstActive odd') : '']"
                @click="firActiveChange(index1)">
                <!-- 动态添加 种类 iconfont -->
                <view :class="['iconfont', 'icon-' + item.icon]">
                </view>
                {{item.text}}
              </view>
              <!-- 二级导航 -->
              <transition name="custom-classes-transition" enter-active-class="animated animate__fadeIn"
                leave-active-class="animated animate__fadeInUp">
                <view
                  :class="['second-nav-item', index2 == secondActive? (index1 % 2 == 0? 'secondActive even' : 'secondActive odd') :'']"
                  @click="secActiveChange(index2)" v-for="(secondItem, index2) in item.children"
                  v-if="index1 == firstActive" :key="index2">
                  {{secondItem.text}}
                </view>

              </transition>
            </view>
          </scroll-view>
        </view>
        <scroll-view class="right" scroll-y :style="{height: wh+'px'}" @scrolltolower="lowerBottom">

          <!-- 筛选栏 -->
          <filterBar ref="filterBar" :filterList="filterList" :leftNavWidth="leftNavWidth" :devWidth="fatherDeviceWidth"
            @syncSelectId="syncSelectId">
          </filterBar>

          <view class="" v-if="goodsList.length != 0">
            <navigator class="goods-container" v-for="(item, i) in goodsList"
              :url="'/subpkg/goods_detail/goods_detail?detail_type=1&item_id=' + item.id" :key="i">
              <!-- 物品信息 -->
              <view class="goods-info">
                <image :src="item.picture_address" mode="aspectFill"></image>
                <view class="goods-desc-box">
                  <!-- 物品描述 -->
                  <view class="goods-desc">
                    {{item.depart_kindID__title + '-' +item.name}}
                  </view>
                  <!-- 物品时间 -->
                  <view class="goods-data">
                    遗失时间：{{itemTime(i)}}
                  </view>
                  <!-- 物品地点 -->
                  <view class="goods-loca">
                    遗失地点：{{item.position}}
                  </view>
                </view>
              </view>
            </navigator>

          </view>
          <uniEmpty v-else text="没有更多数据啦" textColor="#000"></uniEmpty>
        </scroll-view>
      </view>

      <!-- uni-calendar -->
      <view class="example-body">
        <uni-calendar ref="calendar" :wh="'53'" :insert="false" :range="true" @confirm="confirm" :endDate="nowDate" />
      </view>

    </view>
  </view>
</template>

<script>
  import mySearch from '../../components/my-search/my-search.vue'
  import filterBar from '@/components/filterBar/filterBar.vue'
  import store from '../../store/module/user.js'
  import uniEmpty from '../../uni_modules/uni-empty/components/o-empty/o-empty.vue'
  import tools from '@/utils/tools.js'

  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {

        // 分页请求数据
        // 要请求哪一页（下一页）
        page: 1,
        pageSize: 6,
        total: 0,

        // 首页帖子类型，1 表示失物， 2 表示招领
        type: 1,

        // 屏幕可用高度 = 屏幕高度 - tabbar高度 - navigationbar 高度 - 搜索栏高度（53px）。
        wh: 0,
        // 请求左侧种类导航得到的种类数组（原始数据）
        kindList: [],

        // 导航栏的激活项
        // 一级激活项
        firstActive: 0,
        // 二级激活项
        secondActive: 0,

        // 物品列表
        goodsList: [],

        // 筛选列表
        filterList: [{
          // 筛选类型，2表示按时间筛选
          type: 2,
          value: '时间',
          // 点击显示的筛选项
          secondList: [{
            kind: 1,
            value: '最新的'
          }, {
            kind: 2,
            value: '最早的'
          }, {
            kind: 3,
            value: '指定的时间区间'
          }, ]
        }],
        // 左侧宽度
        leftNavWidth: 0,

        // 定时器，用于函数间传递定时器。
        intv: null,

        // 表示筛选类型，为空或=1：按最新排序 =2：按最早排序 =3：按指定日期最新排序，接收start, end参数
        selectID: 1,

        // 今日时间
        nowDate: '',
        // 用户选择的时间范围
        dateRange: {},

        // 上拉触底，正在进行网络请求
        lowerLoading: false,

        fatherDeviceWidth: 0,
      };
    },

    computed: {
      ...mapState('m_user', ['leftNav']),
      // 帖子的发布时间
      postTime() {
        return index => {
          return tools.utcToBeijing(this.posts[index].post_time)
        }
      },
      // itemTime，物品的丢失或拾到时间
      itemTime: function() {
        // 由于实际需要，物品的时间只需要日期即可。
        return index => {
          return tools.itemTime(this.goodsList[index].time)
          // return tools.utcToBeijing(this.goodsList[index].time).split(' ')[0].replace(/-/g, '/');
        };
      },
    },
    methods: {

      ...mapMutations('m_user', ['updateLeftNav']),

      // 获取左侧种类导航的数据
      async getCatNav() {
        const {
          data: res
        } = await uni.$http.post('/Menus/')
        console.log(res);
        // this.leftNav = res.kind

        // 更新全局变量 LeftNav
        this.updateLeftNav(res.kind)

      },

      // 获取帖子数据的方法
      async getGoodsList(cb) {
        // 调用接口，将接口中 data 属性重命名为 res。
        // 如果leftNav还未获取到，则应等待leftNav的获取。
        console.log('JSON.stringify(this.leftNav)', JSON.stringify(this.leftNav) == '[] ');
        let that = this;
        if (JSON.stringify(this.leftNav) == '[]') {
          // 每500s执行一次check函数
          this.intv = setInterval(check, 500);
        } else {
          // 直接请求
          const {
            data: res
          } = await uni.$http.post('/PostList/', {
            // 第一次请求，默认请求第一个一级导航的所有帖子数据，因此 kind 默认是1
            type: that.type,
            kind: that.leftNav[0].children[0].value,
            selectID: that.selectID,
            page: that.page,
            pageSize: that.pageSize
          })

          if (res.code != 200) {
            return uni.$shoMsg('数据加载失败', 1500, 'error')
          }

          that.total = res.post_list.total
          that.goodsList = res.post_list.list;
          this.page++;


          if (typeof(cb) == 'function') {
            cb();
          }

        }
        // check函数要复用，区别就是是否需要清除定时器，因此传入需要清除定时器的回调函数。
        async function check() {
          if (JSON.stringify(that.leftNav) != '[]') {
            // 如果 leftNav 已经请求到了
            clearInterval(that.intv)
            const {
              data: res
            } = await uni.$http.post('/PostList/', {
              // 第一次请求，默认请求第一个一级导航的所有帖子数据，因此 kind 默认是1
              type: that.type,
              kind: that.leftNav[0].children[0].value,
              selectID: that.selectID,
              page: that.page,
              pageSize: that.pageSize
            })
            if (res.code != 200) {
              return uni.$shoMsg('数据加载失败', 1500, 'error')
            }

            that.total = res.post_list.total
            that.goodsList = res.post_list.list;
            this.page++;
          }
        }

        // console.log(res);
      },

      // 点击左侧导航栏，重新请求右侧数据
      async changeGoodsList() {
        // 点击左侧导航栏后，默认请求第一页数据。
        this.page = 1;

        // 获取kind
        let secNav = 0
        // 如果 children 没有任何二级导航，则请求 id 为一级导航的 id
        if (this.leftNav[this.firstActive].children.length == 0) {
          secNav = this.leftNav[this.firstActive].value
        } else {
          secNav = this.leftNav[this.firstActive].children[this.secondActive].value
        }
        // 请求参数
        let query = {
          type: this.type,
          kind: secNav,
          selectID: this.selectID,
          page: this.page,
          pageSize: this.pageSize
        }
        // 如果用户按照日期范围筛选，需要增加属性
        if (this.selectID == 3) {
          query['start'] = this.dateRange.before;
          query['end'] = this.dateRange.after;
        }
        const {
          data: res
        } = await uni.$http.post('/PostList/', query)
        if (res.code != 200) {
          return uni.$shoMsg('数据加载失败', 1500, 'error')
        }
        // console.log(res);
        this.total = res.post_list.total
        this.goodsList = res.post_list.list;
        this.page++;

      },

      // 搜索框点击函数
      goToSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search?type=1'
        })
      },
      // 点击改变激活项
      firActiveChange(index) {
        this.firstActive = index
        this.secondActive = 0
        this.changeGoodsList()
      },
      secActiveChange(index) {
        this.secondActive = index,
          // 重新请求物品列表
          this.changeGoodsList()
      },

      // 子组件向父组件传值
      syncSelectId(e) {
        console.log('e', e);
        this.selectID = e.selectID
        // 重新请求物品列表
        if (this.selectID != 3) {
          this.changeGoodsList()
          this.$refs.filterBar.popUpClose();
        } else {
          // 获取当前日期，用于日期选择
          this.nowDate = tools.nowDate();
          this.$refs.filterBar.popUpClose();
          this.$refs.calendar.open();
        }
      },

      // 日历确定函数
      confirm(e) {
        this.dateRange = e.range;
        this.changeGoodsList();
      },


      // scroll-view 上拉触底
      async lowerBottom() {
        // 当 当前页码值*每页显示数据个数 >= 总数据个数，则下一页无数据
        // 正在进行数据请求，也不再请求
        if ((this.page - 1) * this.pageSize >= this.total || this.lowerLoading == true) {
          return 0;
        }
        // 加载更多
        uni.showLoading()
        this.lowerLoading = true;

        let secNav = this.leftNav[this.firstActive].children[this.secondActive].value
        // 请求参数
        let query = {
          type: this.type,
          kind: secNav,
          selectID: this.selectID,
          page: this.page,
          pageSize: this.pageSize
        }
        // 如果用户按照日期范围筛选，需要增加属性
        if (this.selectID == 3) {
          query['start'] = this.dateRange.before;
          query['end'] = this.dateRange.after;
        }
        const {
          data: res
        } = await uni.$http.post('/PostList/', query)
        if (res.code != 200) {
          return uni.$shoMsg('数据加载失败', 1500, 'error')
        }
        if (res.code != 200) {
          return uni.$shoMsg('数据加载失败', 1500, 'error')
        }
        // console.log(res);
        this.goodsList = [...this.goodsList, ...res.post_list.list];
        this.page++;
        this.lowerLoading = false;
        uni.hideLoading()
      },
    },

    components: {
      mySearch,
      uniEmpty,
      filterBar
    },

    // 如果是分享页，则会先跳转到首页并传参，接下来获取这个参数做判断。
    onLoad(options) {

      // 如果未获取过左侧导航栏的数据，就重新请求左侧导航栏。


      if (JSON.stringify(this.leftNav) == '[]') {

        // 请求左侧导航数据
        this.getCatNav()
      }

      // 请求首页数据
      this.getGoodsList()

      // isShared 表示首页是被向后进入的，因此要跳转到信息页
      if (options.isShared == 1) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?detail_type=' + options.detail_type + '&item_id=' + options
            .item_id
        })
      }
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度赋值
      this.wh = sysInfo.windowHeight - 53;
      this.fatherDeviceWidth = sysInfo.windowWidth;

      // 获取左侧导航栏宽度
      // select中的参数就如css选择器一样选择元素
      let info = uni.createSelectorQuery().in(this).select(".left");
      let that = this;
      info.boundingClientRect(function(data) {
        //	data - 包含元素的高度等信息
        that.leftNavWidth = data.width
      }).exec(function(res) {
        // 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
      });
    },
    onReady() {
      uni.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#add3e8'
      })
    },
    onShow() {},
    onHide() {
      this.$refs.mySearch.popUpClose()
    },
    // 下拉刷新
    onPullDownRefresh() {
      // 重置左侧导航栏激活项
      this.firstActive = 0;
      this.secondActive = 0;
      // 重置筛选项。
      this.selectID = 1;
      this.$refs.filterBar.active = 0;
      // 重新请求第一页的数据
      this.page = 1;
      // 重新加载数据
      this.getGoodsList(() => {
        console.log('关闭下拉刷新');
        uni.stopPullDownRefresh()
      })
    }
  }
</script>

<style lang="scss">
  // 搜索框吸顶（粘性定位）
  .search-box {
    // 设置定位效果为“吸顶”
    position: sticky;
    // 吸顶的“位置”
    top: 0;
    // 提高层级，防止被轮播图覆盖
    z-index: 1500;
    transition: all 0.5s;
    padding-top: 10px;
  }

  // 激活效果
  .firstActive {
    background-color: #fff !important;
    font-weight: bold;
    color: #4095e5;
  }

  .secondActive {
    font-weight: bold;
    color: #000 !important;
  }

  .even {
    color: #4095e5;
    background-color: #d9eafa;
  }

  .odd {
    background-color: #f2d6d3;
    color: #de868f;
  }

  .container {
    width: 740rpx;
    // color: $grey-color;
    margin-top: 40rpx;


    .mid-content-container {
      display: flex;

      .left {
        z-index: 999;

        .cat-container {
          width: 212rpx;
          background-color: #f7f8fa;

          .cat-item {
            color: #000;

            .first-nav-item {
              display: flex;
              font-size: 32rpx !important;
              padding-top: 26rpx;
              padding-bottom: 26rpx;
              padding-left: 14rpx;
              transition: all 0.5s;

              .iconfont {
                font-size: 40rpx !important;
                margin-right: 14rpx;
              }
            }

            .second-nav-item {
              font-size: 34rpx;
              text-align: center;
              padding: 30rpx 0rpx;
              transition: all 0.5s;
            }
          }
        }
      }

      .right {

        // padding-top: 20rpx;
        .goods-container {
          // display: none !important;

          &:first-of-type {
            margin-top: 20rpx;
          }

          // width: 732rpx;
          height: 252rpx;
          border-radius: 30rpx;
          background-color: rgba(255, 255, 255, 100);
          box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          justify-content: center;
          // align-items: center;
          margin-bottom: 40rpx;
          margin-left: 16rpx;
          margin-right: 16rpx;

          &:nth-of-type(1) {
            // margin-top: 40rpx;
          }

          // .goods-cate {
          //   padding-left: 34rpx;
          //   margin-bottom: 24rpx;
          //   font-size: 28rpx;

          //   &::after {
          //     display: block;
          //     content: '';
          //     width: 656rpx;
          //     height: 2rpx;
          //     margin-top: 10rpx;
          //     background-color: #BBBBBB;
          //   }
          // }

          .goods-info {
            display: flex;


            image {
              width: 160rpx;
              height: 160rpx;
              border-radius: 30rpx;
              margin-left: 10rpx;
            }

            .goods-desc-box {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              margin-left: 20rpx;
              font-size: 28rpx;

              .goods-desc {
                font-size: 36rpx;
                color: #000000;
              }
            }
          }
        }

      }
    }
  }
</style>
