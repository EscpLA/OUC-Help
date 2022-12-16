<template>
  <view>
    <view class="switchBox">
      <view :class="['case1', curCase == 1? 'curCase' :'']" @click="goToCase(1)">
        收到的评论和@
      </view>
      <view :class="['case2', curCase == 2? 'curCase' :'']" @click="goToCase(2)">
        我发出的
      </view>
    </view>
    <!-- 展示我的评论，包括 收到的评论和发布的评论 -->
    <!--   <meReceivedComments v-if="curCase==1"></meReceivedComments>
    <meSendComments v-else></meSendComments> -->
    <meCommentsSkeleton v-if="loading == true"></meCommentsSkeleton>
    <meCommentsComponent v-else-if="curCase==1" :comments="Mycomments" :info="infoText" :curCase="1">
    </meCommentsComponent>
    <meCommentsComponent v-else :comments="Mycomments" :info="infoText" :curCase="2"></meCommentsComponent>
  </view>
</template>

<script>
  import store from '../../store/module/user.js'
  // 我收到的评论
  // import meReceivedComments from '../../components/me-received-comments/me-received-comments.vue'
  // import meSendComments from '../../components/me-send-comments/me-send-comments.vue'
  import meCommentsComponent from '@/components/me-comments-component/me-comments-component.vue'
  import meCommentsSkeleton from '@/components/me-comments-skeleton/me-comments-skeleton.vue'
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        // 表示当前页面展示的是 case1 还是 case2
        curCase: 1,
        // 表示提示信息
        infoText: '',
        // 请求的url，根据 curCase 而定
        requestUrl: '',
        // 正在加载数据，显示骨架屏
        loading: true,
        Mycomments: [],

        // 分页请求数据
        // 要请求哪一页（下一页）
        page: 1,
        pageSize: 6,
        total: 0,
        bottomLoading: false,
      };
    },
    computed: {
      ...mapState('m_user', ['token']),
      // 评论的发布时间
      postTime() {
        // console.log('postTime');
        if (JSON.stringify(this.comments) != '[]') {
          return ((time) => {
            // console.log('time: ', time)
            return tools.utcToBeijing(time)
          })
        }
      },
    },

    methods: {
      goToCase(index) {
        // 如果需要切换，就切换。
        if (index != this.curCase) {
          this.curCase = index;
          // 修改 requesUrl
          this.requestUrl = this.curCase == 1 ? '/ReceiveComment/' : '/MyComment/'
          // 修改提示语句
          this.infoText = this.curCase == 1 ? '评论了你的帖子' : '评论了Ta的帖子';
          // 将page置为1，重新请求
          this.page = 1;
          this.getComments();
        }
      },

      // 获取评论
      async getComments(cb) {
        // console.log('this.token', this.token);
        const {
          data: res
        } = await uni.$http.post(this.requestUrl, {
          openid: this.token,
          page: this.page,
          pageSize: this.pageSize
        })
        if (res.code != 200) {
          return uni.$showMsg('数据加载失败', 1500, 'error')
        }
        this.total = res.myComment.total;
        this.Mycomments = res.myComment.list;
        this.page++;


        this.loading = false;
        // 执行回调函数
        if (typeof(cb) == 'function') {
          cb();
        }
        // console.log('this.comments', this.comments);
      },
    },
    components: {
      // meReceivedComments,
      // meSendComments,
      meCommentsComponent,
      meCommentsSkeleton
    },
    onLoad() {
      // 修改请求 url
      this.requestUrl = this.curCase == 1 ? '/ReceiveComment/' : '/MyComment/';
      this.infoText = this.curCase == 1 ? '评论了你的帖子' : '评论了Ta的帖子';
      this.loading = true;
      this.getComments()
    },
    // 上拉触底
    async onReachBottom() {
      // 当 当前页码值*每页显示数据个数 >= 总数据个数，则下一页无数据
      // 正在进行数据请求，也不再请求
      if ((this.page - 1) * this.pageSize >= this.total || this.bottomLoading == true) {
        return 0;
      }
      // 加载更多
      uni.showLoading()
      this.bottomLoading = true;

      const {
        data: res
      } = await uni.$http.post(this.requestUrl, {
        openid: this.token,
        page: this.page,
        pageSize: this.pageSize
      })
      if (res.code != 200) {
        return uni.$showMsg('数据加载失败', 1500, 'error')
      }
      this.total = res.myComment.total;
      this.Mycomments = [...this.Mycomments, ...res.myComment.list];
      this.page++;
      this.bottomLoading = false;
      uni.hideLoading()

    },

    onPullDownRefresh() {
      this.page = 1;
      // curCase不变，重新请求数据即可
      this.getComments(() => {
        uni.stopPullDownRefresh()
      })
    }
  }
</script>

<style lang="scss">
  .curCase {
    color: #ee9529;
    border-bottom: #ee9529 solid 3px;
  }

  .switchBox {
    font-size: 40rpx;
    color: #9a9a9a;
    display: flex;
    justify-content: space-between;
    margin: 20rpx auto;
    margin-bottom: 40rpx;
    width: 80%;
    transision: all 0.5s;

    .case1 {
      // width: 60%;
      text-align: center;
      padding-bottom: 10rpx;
      transition: color 0.5s;
    }

    .case2 {
      // width: 39%;
      text-align: center;
      padding-bottom: 10rpx;
      transition: color 0.5s;
    }
  }
</style>
