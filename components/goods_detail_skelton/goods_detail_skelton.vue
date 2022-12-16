<template name="skeleton">
  <view class="sk-container">
    <view>
      <view focus="true" selection-start="-1" selection-end="-1" cursor="-1" class="sk-image"></view>
      <view class="navBar"></view>
      <view class="container">
        <view class="goods_box">
          <view class="userInfo">
            <view class="leftBox _div">
              <image mode="true" class="sk-image"></image>
              <view class="infoText _div">
                <view class="poster sk-transparent sk-text-16-6667-81 sk-text">lisa</view>
                <view class="post-time _div sk-transparent sk-text-16-6667-763 sk-text">2022-08-05 16:08:53</view>
              </view>
            </view>
            <view class="rightBox _div">
              <image mode="true" class="sk-image"></image>
              <text class="sk-transparent sk-text-14-2857-784 sk-text">联系TA</text>
            </view>
          </view>
          <view class="desc sk-transparent sk-text-16-6667-872 sk-text">
            物品描述...物品描述...物品描述...物品描述...物品描述...物品描述...物品描述...</view>
          <view class="imgBox">
            <image data-event-opts="tap,previewImg,0" mode="aspectFill" class="sk-image"></image>
          </view>
          <view class="goodsInfo-box">
            <view class="goodsInfo-item">
              <text class="title sk-transparent sk-text-14-2857-403 sk-text">物品名称</text>
              <text class="content sk-transparent sk-text-14-2857-671 sk-text">银行卡</text>
            </view>
            <view class="goodsInfo-item">
              <text class="title sk-transparent sk-text-14-2857-451 sk-text">物品颜色</text>
              <text class="content sk-transparent sk-text-14-2857-748 sk-text">白色</text>
            </view>
            <view class="goodsInfo-item">
              <text class="title sk-transparent sk-text-14-2857-372 sk-text">拾到时间</text>
              <text class="content sk-transparent sk-text-14-2857-640 sk-text">2022-07-18</text>
            </view>
            <view class="goodsInfo-item">
              <text class="title sk-transparent sk-text-14-2857-881 sk-text">拾到地点</text>
              <text class="content sk-transparent sk-text-14-2857-5 sk-text">食堂</text>
            </view>
            <view class="goodsInfo-item">
              <text class="title sk-transparent sk-text-14-2857-696 sk-text">备注</text>
              <text class="content sk-transparent sk-text-14-2857-539 sk-text">无</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
z
<script>
  export default {
    name: "goods_detail_skelton",
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  /*
此文件为开发者工具生成，生成时间: 2022/11/7下午2:11:24

在 C:\Users\hp\Documents\HBuilderProjects\OUC_help\unpackage\dist\dev\mp-weixin\subpkg\goods_detail\goods_detail.wxss 中引入样式
```
@import "./goods_detail.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
  .sk-transparent {
    color: transparent !important;
  }

  .sk-text-16-6667-81 {
    background-image: linear-gradient(transparent 16.6667%, #EEEEEE 0%, #EEEEEE 83.3333%, transparent 0%) !important;
    background-size: 100% 48.0000rpx;
    position: relative !important;
  }

  .sk-text {
    background-origin: content-box !important;
    background-clip: content-box !important;
    background-color: transparent !important;
    color: transparent !important;
    background-repeat: repeat-y !important;
  }

  .sk-text-16-6667-763 {
    background-image: linear-gradient(transparent 16.6667%, #EEEEEE 0%, #EEEEEE 83.3333%, transparent 0%) !important;
    background-size: 100% 39.0000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-784 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 33.6000rpx;
    position: relative !important;
  }

  .sk-text-16-6667-872 {
    background-image: linear-gradient(transparent 16.6667%, #EEEEEE 0%, #EEEEEE 83.3333%, transparent 0%) !important;
    background-size: 100% 48.0000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-403 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 44.8000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-671 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 44.8000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-451 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 44.8000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-748 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 44.8000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-372 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 44.8000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-640 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 44.8000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-881 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 44.8000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-5 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 44.8000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-696 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 44.8000rpx;
    position: relative !important;
  }

  .sk-text-14-2857-539 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 44.8000rpx;
    position: relative !important;
  }

  .sk-image {
    background: #EFEFEF !important;
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
