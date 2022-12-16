<template>
  <!-- 拾到时间 和 贴子发布时间的区分 -->
  <view class="container">
    <view class="post-item" v-for="(item, index) in posts" :key="item.id">
      <!-- 顶部标题 -->
      <view class="post-title">
        <view class="left">
          <image :src="item.type_id == 1 ? '../../static/tabBarIcon/search.png' : '../../static/tabBarIcon/shop.png'"
            mode=""></image>
          {{item.type_id == 1 ? "寻物" : "招领"}}
        </view>
        <view class="right">
          <view class="postTime">
            {{postTime(index)}}
          </view>
          <span class="iconfont icon-delete" @click="deleteHandler(item.id, index)"></span>
        </view>
      </view>
      <!-- 帖子内容预览 -->
      <view class="post-content" @click="itemClickHandler(index)">
        <view class="left">
          <image :src="item.picture_address[0]" mode="aspectFill"></image>
        </view>
        <view class="right">
          <view class="title">
            {{item.name}}
          </view>
          <view class="time">
            {{item.type_id==1?"遗失时间":"拾到时间"}}:&nbsp;{{ itemTime(index) }}
          </view>
          <view class="location">
            {{item.type_id==1?"遗失地点":"拾到地点"}}:{{item.position}}
          </view>
        </view>
      </view>
    </view>

    <!-- uni 弹出层和empty -->
    <!-- <uniEmpty v-else-if="start_search" text="没有更多数据啦" textColor="#000" bg="#f5f5f5"></uniEmpty> -->

    <!-- 对话框 dialog -->
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog mode="base" title="删除帖子" content="您确认要删除帖子吗？" :before-close="true" @close="close"
        @confirm="confirm"></uni-popup-dialog>
    </uni-popup>

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import tools from '../../utils/tools.js';
  export default {
    data() {
      return {
        posts: [],
        myDeletePost: {
          // 用户想要删除的帖子id
          deletePostId: -1,
          // 用户想要删除的帖子在data数组中的下标
          deletePostIndex: -1,

        }, // 分页请求数据
        // 要请求哪一页（下一页）
        page: 1,
        pageSize: 6,
        total: 0,

        bottomLoading: false,
      };
    },
    computed: {
      ...mapState('m_user', ['token']),
      // // 帖子发布的日期
      // postDate() {
      //   return index => {
      //     return this.posts[index].post_time.split('T')[0]
      //   }
      // },
      // // 贴子发布的时间
      // postClock: function() {
      //   return index => {
      //     // 2022-08-05T08:08:53.450Z
      //     // 使用 howmany 参数，返回前几个。
      //     let clock = this.posts[index].post_time.split('T')[1];
      //     return clock.split(':', 2).join(":");
      //   }
      // },
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
          console.log(tools.utcToBeijing(this.posts[index].post_time));
          return tools.itemTime(this.posts[index].time)
          // return tools.utcToBeijing(this.posts[index].time).split(' ')[0];
        };
      },
    },
    methods: {
      // 获取我发出的帖子列表
      async getPostList() {
        console.log(this.token);
        const {
          data: res
        } = await uni.$http.post('/MyPostList/', {
          openid: this.token,
          page: this.page,
          pageSize: this.pageSize
        })


        if (res.code != 200) {
          return uni.$showMsg('数据加载失败', 1500, 'error')
        }
        console.log(res);
        this.posts = res.myPost.list;
        this.total = res.myPost.total;
        this.page++;

        console.log('this.posts', this.posts);
      },
      // 点击帖子事件
      itemClickHandler(index) {
        uni.navigateTo({
          // detail_type=1&item_id=105
          url: '/subpkg/goods_detail/goods_detail?detail_type=' + this.posts[index].type_id + '&item_id=' +
            this
            .posts[index].id,
        })
      },
      // 删除按钮的点击事件
      deleteHandler(itemID, itemIndex) {
        this.myDeletePost.deletePostId = itemID;
        this.myDeletePost.deletePostIndex = itemIndex;
        this.$refs.popup.open();
      },

      // 删除帖子函数
      async deletePost() {
        // deletePostId，要删除的帖子id
        // showLoading 
        // https://uniapp.dcloud.net.cn/api/ui/prompt.html#showloading


        uni.showLoading({
          title: '请稍候......'
        })
        const {
          data: res
        } = await uni.$http.post('/deletePost/', {
          id: this.myDeletePost.deletePostId
        });
        console.log(res);
        if (res.code == 200) {
          console.log("删除成功");
          // 无感刷新，直接删除data中的数据，避免了重新刷新。
          this.posts.splice(this.myDeletePost.deletePostIndex, 1);
        }


      },

      // uni-dialog 处理函数
      close() {
        // TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
        // ...
        this.$refs.popup.close()
      },
      confirm(value) {
        this.$refs.popup.close()
        this.deletePost()
      }


    },
    onLoad() {
      this.getPostList()
      // console.log(tools.utcToBeijing('2022-10-26T12:31:31.907Z'));
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
      } = await uni.$http.post('/MyPostList/', {
        openid: this.token,
        page: this.page,
        pageSize: this.pageSize
      })

      if (res.code != 200) {
        return uni.$showMsg('数据加载失败', 1500, 'error')
      }
      console.log(res);
      // 拼接
      this.posts = [...this.posts, ...res.myPost.list];
      this.page++;
      this.bottomLoading = false;
      uni.hideLoading();

    }
  }
</script>

<style lang="scss">
  .container {

    .post-item {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      background-color: #fff;
      padding-bottom: 40rpx;
      margin-bottom: 30rpx;

      .post-title {
        width: 98%;
        // height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // padding-bottom: 5rpx;
        margin-bottom: 25rpx;
        border-bottom: #bebebe solid 2rpx;
        padding: 8px 0px;

        .left {
          font-size: 30rpx;
          display: flex;
          align-items: center;

          image {
            width: 60rpx;
            height: 60rpx;
          }
        }

        .right {
          display: flex;
          padding-right: 15px;

          .postTime {
            font-size: 30rpx;
            color: #bebebe;
            padding-right: 30rpx;
          }
        }
      }

      .post-content {
        width: 95%;
        display: flex;
        background-color: #f7f7f7;

        .left {
          image {
            width: 222rpx;
            height: 222rpx;
          }
        }

        .right {
          margin-left: 24rpx;

          .title {
            font-size: 32rpx;
            margin-top: 30rpx;
          }

          .time {
            font-size: 24rpx;
            color: #6A6969;
            margin-top: 10rpx;
          }

          .location {
            font-size: 24rpx;
            color: #6A6969;
            margin-top: 10rpx;
          }
        }
      }
    }
  }
</style>
