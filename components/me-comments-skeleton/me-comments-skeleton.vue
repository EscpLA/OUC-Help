<template name="skeleton">
  <view class="sk-container">
    <view>
      <view class="switchBox">
        <view class="case1 curCase sk-transparent sk-text-14-2857-287 sk-text" style="background-position-x:50%;"
          data-event-opts="tap,goToCase,1">收到的评论和@</view>
        <view class="case2 sk-transparent sk-text-14-2857-558 sk-text" style="background-position-x:50%;"
          data-event-opts="tap,goToCase,2">我发出的</view>
      </view>
      <view class="container component--container">
        <view class="comment-box component--comment-box">
          <view class="left component--left" data-event-opts="tap,goToGoodsDetail,$event">
            <image class="sk-image" style="height:44px;" mode="widthFix"></image>
          </view>
          <view class="right component--right" data-event-opts="tap,onClick,$event">
            <view class="name component--name sk-transparent sk-text-14-2857-216 sk-text">陈李焘</view>
            <view class="info component--info"><text
                class="time component--time sk-transparent sk-text-14-2857-956 sk-text">2022-11-11 20:44:26</text>
              <view class="sk-transparent sk-text-14-2857-921 sk-text">评论了你的帖子</view>
            </view>
            <view class="content component--content"></view>
            <view class="img-box component--img-box">
              <image class="sk-image" style="height:60.5976px;" data-commentindex="0" data-type="comment"
                mode="widthFix"></image>
            </view>
            <view class="reply-box component--reply-box"></view>
            <view class="goToReply-box component--goToReply-box sk-transparent"
              data-event-opts="tap,goToGoodsDetail,$event">
              <view
                class="iconfont component--iconfont icon-message-fill component--icon-message-fill sk-pseudo sk-pseudo-circle">
              </view>回复评论
            </view>
          </view>
          <view class="right-img component--right-img" data-event-opts="tap,goToGoodsDetail,$event">
            <image class="sk-image" mode="aspectFill"></image>
          </view>
        </view>
        <view class="comment-box component--comment-box">
          <view class="left component--left" data-event-opts="tap,goToGoodsDetail,$event">
            <image class="sk-image" style="height:44px;" mode="widthFix"></image>
          </view>
          <view class="right component--right" data-event-opts="tap,onClick,$event">
            <view class="name component--name sk-transparent sk-text-14-2857-32 sk-text">陈李焘</view>
            <view class="info component--info"><text
                class="time component--time sk-transparent sk-text-14-2857-925 sk-text">2022-11-10 00:38:08</text>
              <view class="sk-transparent sk-text-14-2857-864 sk-text">评论了你的帖子</view>
            </view>
            <view class="content component--content sk-transparent sk-text-14-2857-127 sk-text">笨蛋</view>
            <view class="reply-box component--reply-box">
              <view class="reply-item component--reply-item">
                <view class="textBox component--textBox"><text
                    class="name component--name sk-transparent sk-text-14-2857-46 sk-text">申屠冯靓：</text><text
                    class="content component--content sk-transparent sk-opacity">…</text></view>
              </view>
              <view class="reply-item component--reply-item">
                <view class="textBox component--textBox"><text
                    class="name component--name sk-transparent sk-text-14-2857-802 sk-text">陈李焘：</text><text
                    class="content component--content sk-transparent sk-text-14-2857-914 sk-text">你是笨蛋</text></view>
              </view>
              <view class="reply-item component--reply-item">
                <view class="textBox component--textBox"><text
                    class="name component--name sk-transparent sk-text-14-2857-519 sk-text">金知霖：</text><text
                    class="content component--content sk-transparent sk-text-14-2857-931 sk-text">嘻嘻</text></view>
                <image class="sk-image" style="height:100px;" data-commentindex="1" data-replyindex="2"
                  data-type="reply" mode="widthFix"></image>
              </view>
            </view>
          </view>
          <view class="right-img component--right-img" data-event-opts="tap,goToGoodsDetail,$event">
            <image class="sk-image" mode="aspectFill"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>



<script>
  export default {
    name: "me-comments-skeleton",
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  /*
此文件为开发者工具生成，生成时间: 2022/11/12下午12:24:34

在 C:\Users\hp\Documents\HBuilderProjects\OUC_help\unpackage\dist\dev\mp-weixin\subpkg\me-comments\me-comments.wxss 中引入样式
```
@import "./me-comments.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
  .sk-transparent {
    color: transparent !important;
  }

  .sk-text-14-2857-345 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 56.0000rpx;
    position: relative !important;
  }

  .sk-text {
    background-origin: content-box !important;
    background-clip: content-box !important;
    background-color: transparent !important;
    color: transparent !important;
    background-repeat: repeat-y !important;
  }

  .sk-text-14-2857-13 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 56.0000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-247 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 56.0000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-289 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 56.0000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-887 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 42.0000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-863 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 33.6000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-122 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.4000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-968 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 42.0000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-593 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 33.6000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-761 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 36.4000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-245 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 44.8000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-726 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 42.0000rpx;
    position: relative !important;
  }

  .sk-opacity {
    opacity: 0 !important;
  }

  .sk-text-14-2857-954 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 42.0000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-455 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 44.8000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-913 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 42.0000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-793 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 44.8000rpx;
    position: relative !important;
  }

  .sk-image {
    background: #EFEFEF !important;
  }

  .sk-pseudo::before,
  .sk-pseudo::after {
    background: #EFEFEF !important;
    background-image: none !important;
    color: transparent !important;
    border-color: transparent !important;
  }

  .sk-pseudo-rect::before,
  .sk-pseudo-rect::after {
    border-radius: 0 !important;
  }

  .sk-pseudo-circle::before,
  .sk-pseudo-circle::after {
    border-radius: 50% !important;
  }

  .sk-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: transparent;
  }
</style>
