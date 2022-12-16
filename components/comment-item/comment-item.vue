<!-- 需要修改，用户头像，用户图片列表 
默认图片-->
<template>
  <view class="container">
    <view class="left">
      <image :src="comment.depart_user__depart_pictureID__picture_address" mode=""></image>
    </view>
    <view class="right" @click="onClick">
      <view class="name">
        {{comment.depart_user__name}}
      </view>
      <view class="content">
        {{comment.describe}}
      </view>
      <!-- 图片列表 -->
      <view class="img-box" v-if="comment.comment_picture != null && comment.comment_picture != ''">
        <!--   <image v-for="(item, index) in comment.picture" :key="index" :src="item" mode="aspectFill"
          @error="imageError(index)"></image> -->
        <!-- 默认显示一张图片 -->
        <!-- <image v-for="(item, index) in comment.comment_picture" :key="index" :src="item" mode="" @click="onClick"> -->
        <image :src="comment.comment_picture" mode="widthFix" :data-type="'comment'">
        </image>
        </image>
      </view>
      <!-- 评论时间 -->
      <view class="time">
        {{postTime}}
      </view>
      <!-- 评论回复列表 -->
      <view class="reply-box">
        <view class="reply-item" v-for="(replyItem, index) in comment.reply" :key="index">
          <!-- 上方文字 -->
          <view class="textBox">
            <text class="name">{{replyItem.depart_user__name}}：</text>
            <text class="content">{{replyItem.describe}}</text>
          </view>
          <!-- 下方图片 -->
          <image :src="replyItem.reply_picture" mode="widthFix" v-if="replyItem.reply_picture!=''" :data-type="'reply'"
            :data-index="index">
          </image>
        </view>
      </view>
      <!-- 回复该评论的按钮 -->
      <view class="goToReply-box" @click="replyClickHandler">
        <view class="iconfont icon-message-fill">
        </view>
        回复评论
      </view>

    </view>
  </view>
</template>

<script>
  import Vue from 'vue'
  import tools from '@/utils/tools.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: "comment-item",
    data() {
      return {};
    },
    props: {
      comment: {}
    },
    computed: {

      // // 帖子发布的日期
      // postDate() {
      //   if (this.comment.time != undefined) {
      //     return this.comment.time.split('T')[0]
      //   }
      // },
      // // 贴子发布的时间
      // postClock: function() {
      //   if (this.comment.time != undefined) {
      //     return this.comment.time.split('T')[1].slice(0, -1)
      //   }
      // },

      // 帖子的发布时间
      postTime() {
        if (JSON.stringify(this.comment) != '{}') {
          console.log('this.comment.time: ', this.comment.time)
          return tools.utcToBeijing(this.comment.time)
        }
      },
    },
    methods: {
      // 当评论图片加载失败, 则修改评论图片的 url,使其显示默认图片
      imageError(index) {
        console.log("图片加载失败");
        // // this.xiangqingUrl.splice(index, 1)
        // // this.xiangqingUrl.splice(index, 0, '/static/img/noimg.png')
        // // Vue.set(this.comment.comment_picture, index, "../../static/goods_detail/default-img.png"+new Date().getTime())
        // this.comment.comment_picture[index] = "/static/goods_detail/default-img.png?time=" + new Date().getTime()
        // // console.log(this.comment.comment_picture[index]);
        // // this.comment.comment_picture.splice(index, 1);
        // // this.comment.comment_picture.splice(index, 0, "../../static/goods_detail/default-img.png")
        // console.log(this.comment.comment_picture);
      },
      // 右侧区域点击事件的代理函数，通过 :data- 传参。支持传多个参数
      // 如果是预览comment 的img，传参 "comment"
      // 如果是预览reply 的img，传参 "reply"
      onClick(e) {
        // console.log('e.target.dataset: ', e.target.dataset)
        let query = e.target.dataset;
        console.log('query: ', query)
        let photoSrc = [];
        if (query.type == 'comment') {
          photoSrc.push(this.comment.comment_picture)
        } else if (query.type == 'reply') {
          console.log('???');
          // index表示这条回复评论的下标
          // console.log('this.comment.reply[query.index].reply_picture: ', this.comment.reply[query.index].reply_picture)
          photoSrc.push(this.comment.reply[query.index].reply_picture)
        }
        console.log('photoSrc: ', photoSrc)
        uni.previewImage({
          current: 0,
          urls: photoSrc
        })
      },
      // 点击回复按钮，调用父组件的 showCommentBar() 函数
      replyClickHandler() {
        this.$emit('showCommentBar', this.comment.id);
      }
    },
    onLoad() {
      console.log('comment', comment);
    }
  }
</script>

<style lang="scss">
  .container {
    display: flex;
    width: 672rpx !important;

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
  }
</style>
