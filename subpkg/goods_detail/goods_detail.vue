<template>
  <view>
    <skelton v-if="loading"></skelton>
    <view v-else>
      <!-- 物品详情页面 -->
      <view class="navBar">
        <!-- <uni-nav-bar leftIcon="left" title="帖子详情" backgroundColor="#add3e8" :style="{'font-size': '40rpx'}" shadow="true"
        @clickLeft="back" border="false" height="80"></uni-nav-bar> -->
      </view>
      <!-- 导航栏下方大盒子 -->
      <view class="container">
        <!-- 物品信息 -->
        <view class="goods_box">
          <!-- 上方用户信息 -->
          <view class="userInfo">
            <div class="leftBox">
              <image :src="postInfo.depart_UserID__depart_pictureID__picture_address" mode="aspectFill"></image>
              <div class="infoText">
                <view class="poster">
                  {{postInfo.depart_UserID__name}}
                </view>
                <div class="post-time">
                  <!-- 调用  computed 中的数据 -->
                  {{postTime}}
                </div>
              </div>
            </div>
            <!-- <div class="rightBox">
              <image src="../../static/goods_detail/contact.png" mode=""></image>
              <text>联系TA</text>
            </div> -->
          </view>
          <!-- 物品描述 -->
          <view class="desc">
            {{postInfo.describe}}
          </view>
          <!-- 图片区域 -->
          <view class="imgBox">
            <image :src="item" mode="" v-for="(item, index) in postInfo.post_picture" :key="index" mode="aspectFill"
              @click="previewImg(index)">
            </image>
          </view>
          <!-- 物品详细信息 -->
          <view class="goodsInfo-box">
            <view class="goodsInfo-item">
              <!-- 左侧标题部分 -->
              <text class="title">
                物品名称
              </text>
              <!-- 右侧内容 -->
              <text class="content">
                {{postInfo.name}}
              </text>
            </view>
            <view class="goodsInfo-item">
              <!-- 左侧标题部分 -->
              <text class="title">
                物品颜色
              </text>
              <!-- 右侧内容 -->
              <text class="content">
                {{postInfo.color}}
              </text>
            </view>
            <view class="goodsInfo-item">
              <!-- 左侧标题部分 -->
              <text class="title">
                {{date_type}}
              </text>
              <!-- 右侧内容 -->
              <text class="content">
                {{itemTime}}
              </text>
            </view>
            <view class="goodsInfo-item">
              <!-- 左侧标题部分 -->
              <text class="title">
                {{location_type}}
              </text>
              <!-- 右侧内容 -->
              <text class="content">
                {{postInfo.position}}
              </text>
            </view>
            <view class="goodsInfo-item">
              <!-- 左侧标题部分 -->
              <text class="title">
                备注
              </text>
              <!-- 右侧内容 -->
              <text class="content">
                无
              </text>
            </view>
            <!-- 物品栏底部的评论、转发按钮 -->
            <view class="bottomIconBar">
              <view class="iconfont icon-comment_light" @click="showCommentBar"></view>
              <view class="iconfont icon-forward" @click="share"></view>
            </view>
          </view>
        </view>
      </view>
      <view>
      </view>

      <!-- 评论区-->
      <view class="comment-container">
        <view class="goods_box" @click="commentBoxClick">
          <!-- 评论数 -->
          <view class="com-count">
            共{{postInfo.comment.length}}条评论
          </view>

          <!-- 评论 item 组件 -->
          <!-- 给子组件绑定事件，如果子组件内触发，则返回子评论 的 parentID，则可以和另一个同名事件区分。 -->
          <commentItem :comment="item" v-for="(item, index) in postInfo.comment" :key="index"
            @showCommentBar="showCommentBar" :data-index=index></commentItem>

        </view>

      </view>
      <!-- 分享示例 -->
      <uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
        <uni-popup-share></uni-popup-share>
      </uni-popup>

      <view>
        <!-- 普通弹窗 -->
        <uni-popup ref="commentBar" background-color="#fff" @change="change">
          <view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
            <!-- 下方栏目，包括评论和转发 -->
            <view class="bottom-bar">
              <!-- 底部版心，离左侧30rpx -->
              <view class="bottomContainer">
                <!-- 上方字体图标栏，包括 图片 表情等 -->
                <view class="iconBar">
                  <uni-file-picker :class="isActive==false ? '' : 'fP-active'" returnType="array" limit="1"
                    fileMediatype="image" file-extname="png,jpg" :imageStyles="imageStyles" @select="select"
                    @fail="fail" @delete="fileDelete" ref="filePicker">
                    <view class="iconfont icon-image-fill bottomBar-icon" @click="pickImageHandler"></view>
                  </uni-file-picker>
                </view>
                <view class="commentBar">
                  <!-- 左侧评论 -->
                  <view class="talk">
                    <uni-icons customPrefix="iconfont" type="icon-edit" size="21" class="my-icon-edit"></uni-icons>
                    <input type="text" placeholder="说点什么..." class="input-talk" v-model="myComment" focus="auto">
                  </view>
                  <!-- 右侧转发按钮 的包裹盒子 -->
                  <!-- 右侧转发文字+按钮 -->
                  <!--   <view class="zhuanfaContainer">
          <view class="zhuanfaBox" @click="share">
            <text class="zhuanFaText">转发</text>
            <image src="/static/goods_detail/zhuanfa.png" mode=""></image>
          </view>
        </view> -->
                  <view class="sendBtn" @click="sendClickHandler">
                    发送
                  </view>
                </view>

              </view>
            </view>
          </view>
        </uni-popup>
      </view>
    </view>

    <view>
      <!-- 提示窗示例 -->
      <uni-popup ref="alertDialog" type="dialog">
        <uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="同意" title="通知" :content="content"
          @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
      </uni-popup>
    </view>


  </view>
</template>

<script>
  import commentItem from '@/components/comment-item/comment-item.vue'
  import tools from '@/utils/tools.js'
  import md5 from '@/utils/md5.js'
  import skelton from '@/components/goods_detail_skelton/goods_detail_skelton.vue'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    onShareAppMessage(res) {
      if (res.from === 'button') {
        // 来自页面内分享按钮
        // console.log(res.target);
      }
      return {
        title: 'OUC-Help+', //标题
        path: 'pages/lost/lost?isShared=1&detail_type=' + this.query.detail_type + '&item_id=' + this.query
          .item_id, //可以指定动态路径
        imageUrl: '', //分享图
        desc: this.query.detail_type == 1 ? '请快来帮我找一下我的东西！' : '请来看看这个东西是你的吗？'
      };
    },
    onShareTimeline(res) {

      if (res.from === 'button') {
        // 来自页面内分享按钮
        // console.log(res.target);
      }
      return {
        title: 'OUC-Help+', //标题
        path: 'subpkg/goods_detail/goods_detail?detail_type=' + this.query.detail_type + '&item_id=' + this.query
          .item_id, //可以指定动态路径
        imageUrl: '', //分享图
        desc: this.query.detail_type == 1 ? '请快来帮我找一下我的东西！' : '请来看看这个东西是你的吗？'
      };

    },
    data() {
      return {
        // 页面是否在加载
        loading: true,
        query: {},
        // 本帖子的相关信息
        postInfo: {},
        // 我即将发布的评论
        myComment: '',
        // uni-file-picer 需要的样式 
        imageStyles: {
          width: 40,
          height: 40,
          border: false
        },
        // 表示评论输入框是否显示，用于设置焦点 focus
        // inputShow: false,
        // 用户上传的图片临时地址
        tempFilePaths: [],
        // 用户上传的图片，经过md加密后，得到的文件名
        md5Arr: [],
        // 用户上传到OSS后，图片的访问url
        uploadedImgs: [],
        isActive: false,
        // parentID 用于评论时，判断这条评论的对象，是帖子还是另一条评论？
        // 如果 parentID=-1，则表示评论的是帖子，同时点击评论帖子的按钮应该把 parentID 置为-1；否则置为评论的id
        parentID: -1,
        // 在回复他人的评论时有用，表示他人评论在 comment 数组中的下标
        commentIndex: -1,

        // uni-dialog
        content: '',
        msgType: '',


        // 评论的分页请求数据
        // 要请求哪一页（下一页）
        page: 1,
        pageSize: 6,
        total: 0,

        bottomLoading: false,
      };
    },
    computed: {
      ...mapState('m_user', ['token', 'stuInfo', 'userInfo']),
      // detail_type = 0 则当前页面是失物详情页
      // detail_type = 1 则当前页面是招领详情页
      // 根据 detail_type 动态修改页面元素。
      date_type() {
        if (JSON.stringify(this.query) != '{}') {
          return this.query.detail_type == 1 ? '遗失时间' : '拾到时间'
        }
      },
      location_type() {
        if (JSON.stringify(this.query) != '{}') {
          return this.query.detail_type == 1 ? '遗失地点' : '拾到地点'
        }
      },
      // 帖子的发布时间
      postTime() {
        if (JSON.stringify(this.postInfo) != '{}') {
          // console.log('this.postInfo.post_time: ', this.postInfo.post_time)
          return tools.utcToBeijing(this.postInfo.post_time)
          // return tools.formatTime(this.postInfo.post_time)
        }
      },
      // itemTime，物品的丢失或拾到时间
      itemTime: function() {
        if (JSON.stringify(this.postInfo) != '{}') {
          // 由于实际需要，物品的时间只需要日期即可。
          // console.log('this.postInfo.time: ', this.postInfo.time)
          // return tools.utcToBeijing(this.postInfo.time).split(' ')[0];
          return tools.itemTime(this.postInfo.time);
        }
      },
    },


    methods: {
      // uni-popup的处理函数
      toggle(type) {

        this.type = type
        // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
        this.$refs.popup.open(type)
      },
      // 获取帖子详情
      async getGoodsDetail(cb) {
        const {
          data: res
        } = await uni.$http.post('/posts/', {
          id: this.query.item_id
        })
        // 把帖子信息赋值到本地
        // console.log("res", res);
        this.loading = false;
        if (typeof(cb) == 'function') {
          cb();
        }

        // 如果帖子为空，返回错误信息
        if (JSON.stringify(res.post_information) == '[]') {
          return uni.$showMsg('帖子加载失败！', 1500, 'error')
        }

        this.$data.postInfo = res.post_information[0]
        // console.log(this.$data.postInfo.time.split("T"));
      },
      share() {
        this.$refs.share.open()
      },
      previewImg(index) {
        let photoSrc = this.postInfo.post_picture;
        uni.previewImage({
          current: index,
          urls: photoSrc
        })
      },

      // 点击显示评论框
      showCommentBar(parentID) {

        // 显示评论框前，先判断是否登录
        if (this.token == '' || JSON.stringify(this.stuInfo) == '{}') {
          return this.dialogToggle('error', '您尚未登录，是否跳转到登陆页面？')
        }

        // parentID 的type为 'object'，表示点击帖子
        // type为 'number'，表示为评论
        if (typeof(parentID) == 'number') {
          // console.log('parentID: ', parentID)
          this.parentID = parentID
        } else {
          // 否则把 parentID 重置为 -1
          this.parentID = -1;
        }

        this.$refs.commentBar.open('bottom')
      },
      commentBoxClick(e) {
        // 记录下点击commentItem的index，根据事件委托，得到子元素的传值
        // console.log('e: ', e.target.dataset.index)
        this.commentIndex = e.target.dataset.index

      },
      change() {
        // console.log('我是干啥的？');
        // this.inputShow = !this.inputShow;
      },

      // 发送评论前，如果有图片，先将图片上传到 OSS 上
      async uploadImg() {
        console.log("-----------uploadImg()---------");
        // oss 文件加速访问域名，用于拼接得到图片访问域名。
        const downloadUrl = 'https://dryang-miniapp.oss-accelerate.aliyuncs.com'
        // 请求获得上传到OSS需要的token。
        const {
          data: res
        } = await uni.$http.post('/get_token/');
        // console.log('开始上传图片');
        // OSS 上传需要的参数。
        const host = res.result.host
        const signature = res.result.signature
        const ossAccessKeyId = res.result.AccessKeyId
        const policy = res.result.policy
        console.log('res', res);
        // key 表示文件在 OSS 中的存储路径
        // 标准路径格式如下: ouchelp/md5.png。png等文件后缀这里通过切片获得。
        const key = 'ouchelp/' + this.md5Arr[0] + this.tempFilePaths[0].split('.')[1]
        uni.uploadFile({
          url: host,
          filePath: this.tempFilePaths[0], // 需要存储到 OSS 中的图片的当前路径
          name: 'file', // 必填 file
          formData: {
            key,
            policy,
            ossAccessKeyId,
            signature,
            // 'x-oss-security-token': SecurityToken // 使用STS签名时必传。
          },
          success: (res) => {
            // console.log("res", res);
            if (res.statusCode === 204) {
              // 上传成功，拼接得到 访问url。
              this.uploadedImgs.splice(0, this.uploadedImgs.length)
              this.uploadedImgs.push(downloadUrl + '/' + key)
              console.log('this.uploadedImgs: ', this.uploadedImgs)
            } else {
              console.log("请求成功，但是上传失败！");
              reject('请求成功，但是上传失败！')
            }
          },
          fail: (err) => {
            console.log("请求失败！");
            reject('请求失败！')
          }
        })
      },

      // 发送评论给后端，包括内容和图片。
      async sendComment() {
        // console.log('this.sendComment() ')
        // // 准备请求参数对象
        const commentQuery = {
          openid: this.token,
          commentItem: {
            describe: this.myComment,
            postID: this.query.item_id,
            picture: this.uploadedImgs.length == 0 ? '' : this.uploadedImgs[0],
            /* 由于评论的有可能是帖子，也有可能是评论，因此
              如果评论的是帖子，则 parentID = null
              如果评论的是评论，则 parentID=评论的id */
            parentID: this.parentID == -1 ? null : this.parentID
          }
        }
        console.log('commentQuery: ', commentQuery)
        const {
          data: res
        } = await uni.$http.post('/addComment/', commentQuery)
        console.log('res: ', res)
        if (res.code == 200) {
          // 将评论加入data中的对象，动态显示评论
          // 根据评论的是帖子，还是别的评论，动态添加的地方也不同。
          // 定义一个临时用于显示的评论，以下定义两个评论都有的键值。
          let tempComment = {}
          tempComment['describe'] = commentQuery.commentItem.describe
          // 此处暂时显示 真名。
          tempComment['depart_user__name'] = this.stuInfo.name;
          tempComment['depart_user__depart_pictureID__picture_address'] = this.stuInfo
            .depart_pictureID__picture_address
          if (this.parentID != -1) {
            // 1. 回复评论
            // 根据接口返回值，获取 评论的id
            tempComment['id'] = res.reply[0].id
            tempComment['reply_picture'] = commentQuery.commentItem.picture
            // 默认加到最后
            this.postInfo.comment[this.commentIndex].reply.splice(0, 0, tempComment)
          } else {
            // 2. 评论帖子
            // 根据接口返回值，获取 评论的id
            tempComment['id'] = res.commentItem[0].id
            tempComment['comment_picture'] = commentQuery.commentItem.picture
            // 回复默认是空数组。
            tempComment['reply'] = []
            // 获取当前时间
            let d = new Date();
            let year = d.getUTCFullYear();
            let month = d.getUTCMonth() + 1;
            let day = d.getUTCDate();
            let hour = d.getUTCHours();
            let minute = d.getUTCMinutes();
            let second = d.getUTCSeconds();

            tempComment['time'] = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + '.'
            console.log('tempComment: ', tempComment)
            // 把临时comment，加入 data 对象
            this.postInfo.comment.splice(0, 0, tempComment)
          }

          console.log('评论发布成功*----------------');
          this.clearCommentCache();
          return uni.$showMsg(res.msg, 1500, 'success');
        }

      },
      /* 发送评论按钮的点击事件，调用了 上传图片到OSS 和 上传评论给后端，为了代码的重用性，因此分作三个函数 */
      async sendClickHandler() {

        // uni.$showMsg("评论成功", 1500, 'success')
        // 如果有图片，则先调用函数，将图片上传至OSS,此时阻塞执行之后的向后端上传评论的代码
        if (this.tempFilePaths.length != 0) {
          this.uploadImg();
          let intv = setInterval(check, 500);
          // js中函数嵌套，内层函数 this 指针失灵
          let that = this;

          function check() {

            // '            console.log('that.tempFilePaths[0]: ', that.tempFilePaths[0]) 
            //             console.log('that.uploadedImgs[0]: ', that.uploadedImgs[0])'
            if (that.uploadedImgs.length == that.tempFilePaths.length) {
              console.log('check() -------- 上传结束');
              // 上传结束
              clearInterval(intv);
              // 调用上传评论的函数
              that.sendComment()
            }
          }
        }
        // 否则直接调用上传评论的函数
        else {
          this.sendComment()
        }
      },

      // 评论结束后，调用该函数，用于清空评论缓存，方便再次评论
      clearCommentCache() {
        this.isActive = false;
        this.md5Arr.pop();
        this.tempFilePaths.pop();
        this.uploadedImgs.pop();
        this.myComment = "";
        // 关闭 uni-popup
        this.$refs.commentBar.close();
        // 清空Uni-filer-picker 的选择结果
        this.$refs.filePicker.clearFiles();
        // 更改图片样式为未选中图片
        this.imageStyles.width = 40;
        this.imageStyles.height = 40;
      },

      // 点击选取图片
      pickImageHandler() {
        // console.log("呵呵呵");
      },
      // uni-filepicer 选取图片的函数
      select(e) {
        // 如果选择图片了，e.tempFilePaths 数组长度却为0，这说明图片格式不正确。
        if (e.tempFilePaths.length == 0) {
          return 0;
        }
        // console.log('e.tempFilePaths: ', e.tempFilePaths)
        this.tempFilePaths = e.tempFilePaths;
        this.tempFilePaths.forEach(each => {
          this.md5Arr.push(md5.hex_md5(each));
        })
        // 更改图片样式为选中图片
        this.imageStyles.width = 80;
        this.imageStyles.height = 80;
        this.isActive = true;
      },
      fail() {
        console.log("文件无法上传");
      },
      fileDelete() {
        // 更改图片样式为未选中图片
        this.imageStyles.width = 40;
        this.imageStyles.height = 40;
        this.isActive = false;
        // 删除本地图像列表(都只有一个元素的情况下)
        this.tempFilePaths.pop();
        this.md5Arr.pop();
      },

      // 弹出对话框
      dialogToggle(type, msg) {
        this.msgType = type;
        this.content = msg;
        this.$refs.alertDialog.open()
      },
      dialogConfirm() {
        uni.switchTab({
          url: '/pages/me/me'
        })
      },
      dialogClose() {

      }
    },
    components: {
      commentItem,
      skelton
    },
    onLoad(options) {
      this.query = options
      // 获取帖子详情的函数
      this.getGoodsDetail()
    },
    onReady() {
      // console.log('this.query.detail_type : ', this.query.detail_type)
      // 设置导航栏颜色
      if (this.query.detail_type == 1) {
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

      // uni.hideHomeButton()

    },
    // 下拉刷新
    onPullDownRefresh() {
      // 加载中，显示骨架
      this.loading = true;
      // 清除评论缓存
      this.clearCommentCache()
      // 传入回调函数，需要时调用。
      this.getGoodsDetail(() => {
        console.log('停止下拉刷新');
        uni.stopPullDownRefresh()
      })
    }
  }
</script>

<style lang="scss">
  @import "../../static/iconfont.css";

  // @import url('@/static/iconfont.css');
  .container {
    width: 704rpx;
    background-color: #fff;
    margin: 46rpx auto 0rpx;
    border-radius: 20rpx;
    margin-bottom: 40rpx;

    .goods_box {
      width: 672rpx;
      margin: 0 auto;
      padding-top: 12rpx;

      .userInfo {
        display: flex;
        justify-content: space-between;
        padding-right: 16rpx;


        .leftBox {
          display: flex;
          justify-content: flex-start;

          image {
            width: 96rpx;
            height: 96rpx;
            border-radius: 50%;
          }

          .infoText {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            line-height: 1.5;
            padding-left: 12rpx;
            margin-left: 5px;

            .poster {
              font-size: 32rpx;
              color: #605a5a
            }

            .post-time {
              font-size: 28rpx;
              color: #999898
            }
          }
        }

        .rightBox {
          display: flex;
          flex-direction: column;
          align-items: center;

          image {
            width: 60rpx;
            height: 60rpx;
          }

          text {
            font-size: 26rpx;
            color: #5f5f5f;
          }
        }
      }

      .desc {
        margin-top: 30rpx;
        line-height: 1.5;
        font-size: 32rpx;
      }

      .imgBox {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-top: 20rpx;

        image {
          width: 30%;
          height: 216rpx;
          margin-bottom: 20rpx;
          margin-right: 20rpx;
        }
      }

      .goodsInfo-box {
        padding-bottom: 42rpx;

        .goodsInfo-item {
          font-size: 32rpx;
          display: flex;
          justify-content: flex-start;
          margin-top: 42rpx;
          padding-bottom: 42rpx;
          border-bottom: 2rpx #eee solid;

          // 最后一个元素不需要 margin-bottom
          &:last-of-type {
            margin-bottom: 0rpx;
          }

          .title {
            color: #9d9c9c;
            width: 150rpx;
          }

          .content {
            color: #000;
            flex: 1;
          }

        }

        // 底部的评论、转发按钮
        .bottomIconBar {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          .iconfont {
            font-size: 52rpx;
            margin-right: 40rpx;
            padding-top: 30rpx;
          }
        }
      }

    }
  }


  .bottom-bar {
    width: 100%;
    // height: 106rpx;
    position: fixed;
    bottom: 0;
    display: flex;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 20rpx 0rpx;
    border-top: solid 1px #e8e8e8;

    .bottomContainer {
      margin-left: 30rpx;

      // 字体图标bar
      .iconBar {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;

        .bottomBar-icon {
          font-size: 50rpx !important;
          color: #989eb4 !important;
          padding: 10rpx 0rpx;
          padding-right: 20rpx;
        }
      }

      // 评论bar
      .commentBar {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .talk {
          position: relative;

          uni-icons.my-icon-edit {
            position: absolute;
            left: 10rpx;
            top: 50%;
            transform: translateY(-50%);
          }

          input.input-talk {
            width: 450rpx;
            height: 78rpx;
            background-color: #eef2f4;
            border-radius: 166rpx;
            padding-left: 68rpx;
            padding-right: 30rpx;
            word-break: break-all;
          }
        }

        .zhuanfaContainer {

          .zhuanfaBox {
            width: 156rpx;
            display: flex;
            align-items: center;

            .zhuanFaText {
              color: #999898;
              font-size: 28rpx;
            }

            image {
              width: 60rpx;
              height: 60rpx;
            }
          }
        }

        .sendBtn {
          width: 146rpx;
          height: 78rpx;
          line-height: 78rpx;
          border-radius: 39rpx;
          margin-left: 10rpx;
          text-align: center;
          background-color: #add3e8;
        }

      }

    }
  }

  .comment-container {
    width: 704rpx !important;
    background-color: #fff;
    margin: 0 auto;
    margin-bottom: 200rpx;
    padding-bottom: 104rpx;
    border-radius: 20rpx;

    .goods_box {
      width: 672rpx;
      margin: 0 auto;
      padding-top: 12rpx;

      .com-count {
        padding-top: 20rpx;
        padding-bottom: 16rpx;
        border-bottom: #ececec solid 1px;
      }
    }
  }

  .fP-active {
    position: absolute !important;
    left: 0px !important;
    top: 0px !important;
    transform: translateY(-100%) !important;
  }
</style>
