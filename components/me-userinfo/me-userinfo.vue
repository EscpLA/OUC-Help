<template>
  <view class="userInfo-container">
    <!-- 用户信息页面 -->
    <!-- 上方的用户信息 -->
    <view class="topBox">
      <!-- 左侧的头像、昵称和微信号 -->
      <view class="leftBox">
        <image :src="stuInfo.depart_pictureID__picture_address" mode="aspectFill" class="avater"></image>
        <view class="infoText">
          <view class="nickName">{{stuInfo.name}}</view>
          <!-- <view class="wxId">微信号：xxxxxxx</view> -->
        </view>
      </view>
      <!-- 编辑资料 -->
      <view class="rightBox">
        <!-- 二维码照片 -->
        <view class="erWeiMaBox">
          <image src="../../static/img/erweima.png" mode="" class="erWeiMa"></image>
        </view>
        <!-- 编辑资料 -->
        <view class="setProfile" @click="goToSetProfile">
          编辑资料
        </view>
      </view>
    </view>

    <!-- 下方列表部分 -->
    <view class="list-box">
      <view class="list-item">
        <view class="icon-box">
          <view class="iconfont icon-academic-cap_brief"></view>
        </view>
        <view class="text">
          {{stuInfo.depart_gradeID__grade}} 级 {{stuInfo.depart_majorID__major}} 专业
        </view>
      </view>
      <view class="list-item">
        <view class="icon-box">
          <view class="iconfont icon-send"></view>
        </view>
        <view class="text" @click="goToMePosts">
          我的帖子
        </view>
      </view>
      <view class="list-item">
        <view class="icon-box">
          <view class="iconfont icon-comments"></view>
        </view>
        <view class="text" @click="goToMeComemnt">
          我的评论
        </view>
      </view>
      <view class="list-item">
        <view class="icon-box">
          <view class="iconfont icon-feedback-fill"></view>
        </view>
        <view class="text" @click="feedBackClick">
          用户反馈
        </view>
      </view>
      <view class="list-item">
        <view class="icon-box">
          <view class="iconfont icon-notification-filling"></view>
        </view>
        <view class="messageBox text">
          消息推送
          <switch :checked="allowNotification" @change="switchChange" />
        </view>
      </view>


      <view class="list-item">
        <view class="icon-box">
          <view class="iconfont icon-settings"></view>
        </view>
        <view class="text" @click="goToSettings">
          设置
        </view>
      </view>

      <view>
        <!-- 提示窗示例 -->
        <uni-popup ref="alertDialog" type="dialog">
          <uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="同意" title="通知" :content="dialogContent"
            @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
        </uni-popup>
      </view>

    </view>
  </view>
</template>

<script>
  import store from '../../store/store.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: "me-userinfo",
    data() {
      return {
        msgType: 'success',
        dialogContent: '打开该设置后，如果有用户上传了您丢失的校园卡，小程序将为您发送推送提醒。',
        // 小程序消息模板
        tmplId: ['qm6d58WUSfME2bxsxhWsQb1WBQEQVlyxThDADJJdh5c'],
        allowNotification: uni.getStorageSync('allowNotification') || false
      };
    },
    methods: {
      goToSettings() {
        uni.navigateTo({
          url: '/subpkg/settings/settings'
        })
      },
      goToSetProfile() {
        uni.navigateTo({
          url: '/subpkg/editProfile/editProfile'
        })
      },
      // 跳转到我的评论
      goToMeComemnt() {
        uni.navigateTo({
          url: '/subpkg/me-comments/me-comments'
        })
      },
      // 跳转到 我的帖 子
      goToMePosts() {
        uni.navigateTo({
          url: '/subpkg/me-posts/me-posts'
        })
      },
      // 根据 localStorage，获取年级专业
      getGradeAndMojor() {

      },
      feedBackClick() {
        wx.openEmbeddedMiniProgram({
          appId: "wx8abaf00ee8c3202e",
          extraData: {
            // 把1368数字换成你的产品ID，否则会跳到别的产品
            id: "454856",
            // 自定义参数，具体参考文档
            customData: {
              clientInfo: `iPhone OS 10.3.1 / 3.2.0.43 / 0`,
            }
          }
        })
      },
      // 用户点击选择开关
      switchChange(e) {
        console.log(e.detail);
        if (this.allowNotification == false) {
          this.$refs.alertDialog.open()
        } else {
          // 关闭通知，并持久化存储
          this.allowNotification = false;
          uni.setStorageSync('allowNotification', this.allowNotification)
        }
      },
      dialogConfirm() {
        // 拉出允许发送通知的弹窗
        let that = this;
        wx.requestSubscribeMessage({
          tmplIds: that.tmplId,
          success(res) {
            console.log("res: ", res);
            console.log('res[that.tmplId[0]]: ', res[that.tmplId[0]])
            // 操作成功之后的回调函数，根据实际情况判断是否接收
            if (res[that.tmplId[0]] == 'accept') {
              that.allowNotification = true;
              uni.setStorageSync('allowNotification', that.allowNotification)
            } else if (res[that.tmplId[0]] == 'reject') {
              console.log('拒绝');
            }
          }
        })

      },
      dialogClose() {

      }
    },
    computed: {
      ...mapState('m_user', ['userInfo', 'stuInfo', 'majorAndGrade'])
    },
    onShow() {
      console.log(this.userInfo);
    }
  }
</script>

<style lang="scss">
  .userInfo-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .topBox {
      height: 142px;
      background-color: #95c8e3;
      // 上方盒子的字体颜色为白色,
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .leftBox {
        display: flex;
        align-items: center;
        margin-left: 14px;

        .avater {
          width: 61px;
          height: 61px;
          // height: 56px;
          border-radius: 50%;
        }

        .infoText {
          display: flex;
          flex-direction: column;
          margin-left: 18px;
          line-height: 1.5;

          .nickName {
            font-size: 16px;
          }

          .wxId {
            font-size: 13px;
            color: #eef4f7;
          }
        }
      }

      .rightBox {
        margin-right: 33px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .erWeiMa {
          width: 24px;
          height: 24px;
        }

        .setProfile {
          border: solid 1px #fff;
          border-radius: 12px;
          padding: 4px;
          margin-top: 3px;
        }
      }
    }

    .list-box {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      // height: 100%;
      // 主轴上宽度自适应。  
      flex: 1;

      .list-item {
        font-size: 14px;
        color: #000;
        display: flex;
        padding-left: 5px;

        .icon-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;

          .iconfont {
            font-size: 48rpx;
            color: #5697c6;
          }

          // .icon-feedback-copy {
          //   font-size: 48rpx;
          //   color: #5798c6 !important;
          // }
        }

        .text {
          // margin: 14px 0px;
          margin-top: 14px;
          margin-left: 10px;
          flex: 1;
          padding-bottom: 14px;
          border-bottom: 1px #e5e5e5 solid;

          // &::after {
          //   content: '';
          //   display: block;
          //   background-color: $grey-color;
          //   // width: 100%;
          //   height: 1px;
          // }
        }

        .messageBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 30rpx;
        }
      }
    }
  }
</style>
