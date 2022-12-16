<template>
  <view class="container">
    <!-- 我的评论页面，收到的评论 -->
    <!-- 每一个评论盒子 -->
    <view class="comment-box" v-for="(item, commentIndex) in comments" :key="commentIndex">
      <view class="left" @click="goToGoodsDetail">
        <image :src="item.depart_user__depart_pictureID__picture_address" mode="aspectFill"></image>
      </view>
      <view class="right" @click="onClick">
        <view class="name">
          {{item.depart_user__name}}
        </view>

        <!-- info 包括是 @ 还是评论，及评论时间 -->
        <view class="info">
          <text class="time">
            {{postTime(item.time)}}
          </text>
          <view>
            {{info}}
          </view>
        </view>

        <view class="content">
          {{item.describe}}
        </view>



        <!-- 图片列表 -->
        <view class="img-box" v-if="item.comment_picture != null && item.comment_picture != ''">
          <image :key="commentIndex" :src="item.comment_picture" mode="widthFix" :data-type="'comment'"
            :data-commentIndex="commentIndex"></image>
        </view>


        <!-- 他人的回复评论回复盒子 -->
        <!--    <view class="reply-box" v-if="item.reply">
          <view class="reply-item" v-for="(replyItem, index) in item.reply" :key="index">
            <text class="name">{{replyItem.depart_user__name}}：</text>
            <text class="content">{{replyItem.describe}}</text>
          </view>
        </view>
 -->
        <!-- 回复他人 -->
        <!-- <view class="goToReply-box">
          <view class="iconfont icon-message-fill">
          </view>
          回复评论
        </view> -->

        <!-- 评论回复列表 -->
        <view class="reply-box">
          <view class="reply-item" v-for="(replyItem, replyIndex) in item.reply" :key="replyIndex">
            <!-- 上方文字 -->
            <view class="textBox">
              <text class="name">{{replyItem.depart_user__name}}：</text>
              <text class="content">{{replyItem.describe}}</text>
            </view>
            <!-- 下方图片 -->
            <image :src="replyItem.reply_picture" mode="widthFix" v-if="replyItem.reply_picture!=''"
              :data-type="'reply'" :data-commentIndex="commentIndex" :data-replyIndex="replyIndex">
            </image>
          </view>
        </view>
        <!-- 回复该评论的按钮 -->
        <view class="goToReply-box" data-type='navigate' :data-commentIndex="commentIndex">
          <view class="iconfont icon-message-fill">
          </view>
          回复评论
        </view>

      </view>
      <view class="right-img">
        <image :src="item.post_picture" mode="aspectFill"></image>
      </view>

    </view>

  </view>
</template>

<script>
  import store from '../../store/module/user.js'
  import tools from '../../utils/tools.js'
  import {
    mapState
  } from 'vuex'
  export default {
    name: "me-received-comments",
    data() {
      return {
        // 分页请求数据
        // 要请求哪一页（下一页）
        page: 1,
        pageSize: 6,
        total: 0,
      };
    },
    props: {
      // 评论区 评论
      comments: null,
      // 表示是发送的评论还是发送的评论
      curCase: '',
      info: '',

    },
    computed: {
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
      // 右侧区域点击事件的代理函数，通过 :data- 传参。支持传多个参数
      // 如果是预览comment 的img，传参 "comment"
      // 如果是预览reply 的img，传参 "reply"
      onClick(e) {
        // console.log('e.target.dataset: ', e.target.dataset)
        let query = e.target.dataset;
        console.log('query: ', query)
        console.log('this.comments', this.comments);
        let photoSrc = [];
        // console.log('this.comments[query.commentindex]: ', this.comments[query.commentindex])
        if (query.type == 'comment') {
          photoSrc.push(this.comments[query.commentindex].comment_picture)
        } else if (query.type == 'reply') {
          console.log('???');
          photoSrc.push(this.comments[query.commentindex].reply[query.replyindex].reply_picture)
        } else if (query.type = 'navigate') {
          // 跳转页面
          this.goToGoodsDetail(query.commentindex)
        }
        // console.log('photoSrc: ', photoSrc)
        uni.previewImage({
          current: 0,
          urls: photoSrc
        })
      },
      // 点击评论去往帖子
      goToGoodsDetail(commentindex) {
        // console.log('commentIndex', commentIndex);
        // console.log("this.comments: ", this.comments);
        console.log('goToGoodsDetail');
        uni.navigateTo({
          // url: '/sub' + this.comments[commentindex].depart_post__type +
          //   '&item_id=' + this.comments[commentindex].depart_post_id,
          url: '/subpkg/goods_detail/goods_detail?' + this.comments[commentindex].depart_post__type + '&item_id=' +
            this.comments[commentindex].depart_post_id,
        })
        console.log('goToGoodsDetail');
      }
    },
  }
</script>

<style lang="scss">
  page {
    background-color: #fff;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 662rpx;
    margin: 0 auto;
  }

  .comment-box {
    display: flex;
    margin-bottom: 50rpx;

    .left {
      width: 88rpx;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      image {
        width: 88rpx;
        height: 88rpx;
        border-radius: 50%;
      }
    }



    .right {
      // 宽度填充
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 20rpx;
      padding-bottom: 20rpx;
      border-bottom: #ececec solid 1px;

      .name {
        padding-top: 10rpx;
        font-size: 30rpx;
      }

      .info {
        color: #bebebe;
        font-size: 28rpx;
        padding: 10rpx 0rpx;

        text.time {
          margin-left: 10rpx;
        }
      }

      .content {
        padding-top: 10rpx;
        font-size: 32rpx;
      }

      .img-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-top: 40rpx;

        image {
          width: 40%;
          height: 298rpx;
          margin-bottom: 20rpx;
          margin-right: 20rpx;
        }
      }

      .reply-box {
        display: flex;
        flex-direction: column;
        background-color: #eef2f4;
        width: 95%;

        .reply-item {
          padding: 20rpx;
          padding-bottom: 0rpx;
          font-size: 28rpx;

          &:last-of-type {
            padding-bottom: 20rpx;
          }

          .name {
            color: #6c6c6c;
          }

          .content {}

          image {
            width: 100px;
            height: 100px;
            padding-top: 20rpx;
          }
        }
      }

      .time {
        padding-top: 30rpx;
        padding-bottom: 30rpx;
        font-size: 24rpx;
      }

      .goToReply-box {
        display: inline-block;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 15rpx;
        background-color: #eef2f4;
        font-size: 32rpx;
        width: 192rpx;
        // padding: 0rpx 10rpx;
        border-radius: 30rpx;
        margin-top: 20rpx;
        background-color: #eef2f4;

        .iconfont {
          font-size: 32rpx;
          margin-right: 10rpx;
          color: #5697c6;
        }
      }

    }

    .right-img {
      image {
        width: 150rpx;
        height: 150rpx;
        border-radius: 16rpx;
      }
    }
  }
</style>
