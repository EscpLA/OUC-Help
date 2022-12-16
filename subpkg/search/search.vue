<template>
  <view class="search_container">
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar @input="input()" :radius="100" cancelButton="none" :placeholder="myPlaceHolder" v-model="kw"
        bgColor="#eeeeee" :class="this.query.type == 1 ? 'searchBar-blue' : 'searchBar-orange'">
      </uni-search-bar>
    </view>
    <!--  <view class="sugg_list">
      <view class="sugg_item" v-for="(item,index) in searchResult" :key="index" @click="gotoNewsList(item.goods_id)">
        <uni-icons type="search" size="16"></uni-icons>
        <view class="item_name">
          {{item.goods_name}}
        </view>
      </view>
    </view> -->
    <!-- 搜索历史 -->
    <view class="history_container">
      <view class="history_title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="24" @click="trashClickHandler"></uni-icons>
      </view>
      <view class="history_list">
        <view class="tag" v-for="(item ,index) in history" :key="index" v-if="item" @click="historyClickHandler(index)">
          {{item}}
        </view>
      </view>
    </view>
    <!-- 搜索热榜 -->
    <!-- <view class="hot_con">
      <view class="hot_title">
        <uni-icons type="fire-filled" color="#1360B5" size="24"></uni-icons>
        <text>校园热门</text>
      </view>
      <view class="hot_list">
        <view class="hot_item" v-for="(item,index) in hot_list" :key="hot_list">
          <view class="po">

          </view>
          <text>{{item}}</text>
        </view>
      </view>
    </view>
 -->

    <!-- 搜索结果 -->
    <view class="" v-if="searchResult.length != 0">
      <navigator class="goods-container" v-for="(item, i) in searchResult"
        :url="'/subpkg/goods_detail/goods_detail?detail_type=0&item_id=' + item.id" :key="i">
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
              拾到时间：{{item.time.split('T')[0]}}
            </view>
            <!-- 物品地点 -->
            <view class="goods-loca">
              拾到地点：{{item.position}}
            </view>
          </view>
        </view>
      </navigator>

    </view>
    <uniEmpty v-else-if="start_search" text="没有更多数据啦" textColor="#000" bg="#f5f5f5"></uniEmpty>

    <!-- 对话框 dialog -->
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog mode="base" title="清空搜索历史" content="您确认要清除搜索历史吗？" :before-close="true" @close="close"
        @confirm="confirm"></uni-popup-dialog>
    </uni-popup>

  </view>

</template>

<script>
  import uniEmpty from '../../uni_modules/uni-empty/components/o-empty/o-empty.vue'
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchResult: [],
        history_list: ['唱', '跳', 'rap', '篮球'],
        history: [],
        // hot_list: ["习近平走进中国海洋大学三亚研究院", "“海樱使者”招募啦", "  五一劳动节放假安排", "花开海大，等你赴约", "教务处四六级通知"]
        query: {},
        // 用以表示用户是否开始了第一次的搜索
        start_search: false,

        searchBarBg: '',

        // 分页请求数据
        // 要请求哪一页（下一页）
        page: 1,
        pageSize: 6,
        total: 0,

        bottomLoading: false,
      };
    },

    components: {
      uniEmpty
    },
    onLoad(query) {
      this.history_list = JSON.parse(uni.getStorageSync('kw') || '[]');
      this.history = this.history_list;
      this.query = query;
      this.searchBarBg = this.query.type == 1 ? '#add3e8' : '#f5c66aF'
    },
    methods: {
      input(e) {
        // e.value 是最新的搜索内容
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.kw = e;
          // 重置 page =1;
          this.page = 1;
          this.getSearchResult();
        }, 500)
      },

      // gotoNewsList(id) {
      //   // console.log(id)
      //   uni.navigateTo({
      //     url: '../newsList/newsList?news_list=' + id,
      //   })
      // },
      // 保存搜索历史
      saveHistory() {
        const set_arr = new Set(this.history_list);
        set_arr.delete(this.kw);
        // console.log(set_arr);
        this.history_list = Array.from(set_arr);
        this.history_list.unshift(this.kw);
        this.history = this.history_list;
        uni.setStorageSync('kw', JSON.stringify(this.history_list))
      },
      // 清除历史记录，显示对话框
      trashClickHandler() {
        this.$refs.popup.open();
      },
      // 清除搜索历史
      clearSearchHistory() {
        uni.setStorageSync('kw', "[]");
        this.history_list = JSON.parse(uni.getStorageSync('kw') || '[]');
        this.history = this.history_list;
        return uni.$showMsg('清除成功', 1500, 'success')
      },
      // 搜索历史，点击搜索功能
      historyClickHandler(index) {
        this.kw = this.history[index];
        // 重置page=1
        this.page = 1;
        this.getSearchResult();
      },

      async getSearchResult() {
        if (this.kw.length == 0) {
          this.searchResult = [];
          return;
        }
        const {
          data: res
        } = await uni.$http.post('/search/', {
          q: this.kw,
          type: this.query.type,
          page: this.page,
          pageSize: this.pageSize
        })
        // console.log(res);
        if (res.code != 200) return uni.$showMsg('数据请求失败')

        this.searchResult = res.post_list.list;
        this.page++;
        this.total = res.post_list.total

        // 表示用户开始搜索了。
        if (this.start_search == false) {
          this.start_search = true;
        }
        this.saveHistory();
      },

      // uni-dialog 处理函数
      close() {
        // TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
        // ...
        this.$refs.popup.close()
      },
      confirm(value) {
        this.$refs.popup.close()
        this.clearSearchHistory()
      },
    },
    computed: {
      myPlaceHolder() {
        let ph = this.query.type == 1 ? '您正在搜索失物帖子' : '您正在搜索招领帖子';
        return ph;
      },
      styleVar() {
        return {
          '--searchBarBg': this.query.type == 1 ? '#add3e8' : '#f5c66aF'
        }
      }
    },
    onReady() {

      // 设置导航栏颜色
      if (this.query.type == 1) {
        uni.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#add3e8'
        })
      } else {
        uni.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#f5c66a'
        })
      }
    },
    async onReachBottom() {

      // 当 当前页码值*每页显示数据个数 >= 总数据个数，则下一页无数据
      // 正在进行数据请求，也不再请求
      if ((this.page - 1) * this.pageSize >= this.total || this.bottomLoading == true) {
        return 0;
      }
      // 加载更多，发起请求
      uni.showLoading()
      this.bottomLoading = true;

      const {
        data: res
      } = await uni.$http.post('/search/', {
        q: this.kw,
        type: this.query.type,
        page: this.page,
        pageSize: this.pageSize
      })

      if (res.code != 200) {
        return uni.$showMsg('数据加载失败', 1500, 'error')
      }
      console.log(res);
      // 拼接
      this.posts = [...this.posts, ...res.post_list.list];
      this.page++;
      this.bottomLoading = false;
      uni.hideLoading();
    }

  }
</script>

<style lang="scss" vars="{searchBarBg}">
  .searchBar-blue {
    background-color: #add3e8;
  }

  .searchBar-orange {
    background-color: #f5c66a;
  }

  .hot_con {
    margin-top: 12px;

    .hot_title {
      display: flex;
      align-items: center;

      text {
        font-size: 17px;
        margin-right: 5px;
      }
    }

    .hot_list {
      .hot_item {
        padding-left: 9px;
        height: 25px;
        display: flex;
        align-items: center;
        font-size: 15px;
        margin-top: 11px;

        .po {
          width: 5px;
          border-radius: 50%;
          background-color: black;
          height: 5px;
          margin-right: 15px;
        }
      }
    }
  }

  .history_container {
    padding: 0 5px;
    border-bottom: 1px solid #efefef;
    padding-bottom: 12px;

    .history_title {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 13px;
    }

    .history_list {
      display: flex;
      flex-wrap: wrap;

      .tag {
        margin-top: 7px;
        margin-right: 7px;
        background-color: #90c7df !important;
        color: white;
        padding: 4px 6px;
        font-size: 14px;
        border-radius: 5px;
      }
    }
  }

  .sugg_list {
    padding: 0 5px;

    .sugg_item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;

      .item_name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 5px;
        font-size: 12px;
      }
    }
  }

  .uni-searchbar {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    position: relative;
    padding: 16rpx;
    /* 将默认的 #FFFFFF 改为 #C00000 */

    background-color: var(--searchBarBg);
  }

  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  // 搜索结果
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
        margin-left: 20rpx;
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
</style>
