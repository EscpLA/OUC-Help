<template>
  <view class="container">
    <view class="infoBox">
      <!-- 物品类型 -->
      <view class="goodsTypeBox infoBoxItem">
        <view class="textbox">
          <text class="infoText">物品类型</text>
        </view>
        <view class="uniDataPicker">
          <uni-data-picker placeholder="请选择物品类型" popup-title="请选择物品类型" :localdata="dataTree" v-model="classes"
            @change="onchange" class="uniDataPicker" :placeholderSize="16">
          </uni-data-picker>
        </view>
      </view>
      <!-- 物品名称 -->
      <view class="goodsNameBox infoBoxItem">
        <view class="textbox">
          <text class="infoText">物品名称</text>
        </view>
        <input placeholder="请输入物品名称" v-model="itemName" type="text">
      </view>
      <!-- 物品描述 -->
      <view class="goodsDescBox infoBoxItem">
        <view class="textbox">
          <text class="infoText">物品描述</text>
        </view>
        <input placeholder="请输入物品描述" v-model="description" type="text">
      </view>
      <!-- 选择图片 -->
      <view class="goodsDescBox infoBoxItem">
        <view class="textbox">
          <text class="infoText">选择图片</text>
        </view>
        <view class="fileUpload" @click="uniFilePickerCLick">
          <uni-file-picker v-model="uploadImgs" returnType="array" title="最多选择6张图片" limit="6" fileMediatype="image"
            file-extname="png,jpg" :imageStyles="imageStyles" @select="select" @delete="fileDelete"></uni-file-picker>
        </view>
      </view>

      <!-- 物品颜色 -->
      <view class="goodsDescBox infoBoxItem">
        <view class="textbox">
          <text class="infoText">物品颜色</text>
        </view>
        <input placeholder="请输入物品颜色" v-model="itemColor">
      </view>

      <!-- 遗失时间 -->
      <view class="goodsDescBox infoBoxItem">
        <view class="textbox">
          <text class="infoText">{{query.type == 1 ? '遗失' : '拾到'}}时间</text>
        </view>
        <uni-datetime-picker type="date" v-model="time" @maskClick="maskClick" :end="nowDate" />
      </view>

      <!-- 遗失地点 -->
      <view class="goodsDescBox infoBoxItem">
        <view class="textbox">
          <view class="infoText">{{query.type == 1 ? '遗失' : '拾到'}}地点 &nbsp; <view class="smallText">(可省略)</view>
          </view>
        </view>
        <input :placeholder="`请输入${query.type==1 ? '遗失' : '拾到' }地点`" v-model="position" @click="addressClickHandler">
      </view>

      <!-- 备注 -->
      <!-- <view class="goodsDescBox infoBoxItem">
        <view class="textbox">
          <text class="infoText">备注</text>
        </view>
        <input placeholder="请输入备注" v-model="description">
      </view> -->
    </view>
    <button class="upBtn" @click="MyUpload">
      <text class>发布</text>
    </button>
  </view>
</template>

<script>
  // md5 加密文件
  import md5 from '../../utils/md5.js'
  import {
    mapActions,
    mapState
  } from 'vuex'
  import store from '../../store/store.js'
  import crypto from 'crypto-js'
  import base64 from 'base-64'
  export default {
    data() {
      return {
        // 物品类型选择的 id，和输入框双向数据绑定
        classes: 0,

        //用户传参
        query: {},

        // 用户上传的图像数据：
        uploadImgs: [],
        // 物品名称
        itemName: "",
        // 物品颜色
        itemColor: "",
        time: "",
        position: "",
        description: "",

        // 上传的图片的样式 
        imageStyles: {
          "height": 75, // 边框高度
          "width": 75, // 边框宽度
          "border": { // 如果为 Boolean 值，可以控制边框显示与否
            "color": "#eee", // 边框颜色
            "width": "1px", // 边框宽度
            "style": "solid", // 边框样式
            "radius": "15px" // 边框圆角，支持百分比
          }
        },

        md5Arr: [],
        // file-picker 产生的图片临时地址
        tempPaths: [],

        // 表示图片是否正在进行ocr识别
        ocring: null,
        // ocr识别出来的学号结果
        ocrResStuNum: '',
        // ocr识别出来的姓名结果 
        ocrResName: '',
        // 用户选择校园卡时，提示的文字
        stuCardText: '在上传校园卡的照片时，请将有信息的图片置于第一张。',

        // 今日时间
        nowDate: "",
        dataTree: [],
        // 表示帖子正在上传中，用于组织用户多次点击按钮，之发送一次请求。
        uploading: false,
      };
    },
    methods: {

      // 映射 Actions 方法
      ...mapActions('m_user', ['getOSSToken']),

      uniFilePickerCLick() {},

      // 图片选取
      select(e) {
        e.tempFilePaths.forEach((each) => {
          this.$data.md5Arr.push(md5.hex_md5(each))
          this.$data.tempPaths.push(each)
        })
        // this.getSignature()
      },

      // 图片删除
      fileDelete(e) {
        console.log(e);
        // 获取被删除图片的path
        var del_path = e.tempFilePath;
        var i = 0;
        // 寻找被删除图片的在 md5Arr 中的下标
        while (this.$data.tempPaths[i] != del_path) {
          i++
        }
        // console.log(i);
        // 删除数组该下标处的元素
        this.$data.tempPaths.splice(i, 1)
        this.$data.md5Arr.splice(i, 1)
      },

      // 上传图片，返回 promise 对象，方便 for 循环调用
      // path 为文件名 ，ext为扩展名
      uploadImg(res, path, filePath, ext) {
        return new Promise(function(resolve, reject) {
          // console.log('开始上传图片');
          // OSS 上传地址
          const host = res.result.host
          const signature = res.result.signature
          const ossAccessKeyId = res.result.AccessKeyId
          const policy = res.result.policy
          // key 表示文件在 OSS 中的存储路径
          // 标准路径格式如下: ouchelp/md5.png
          var key = "ouchelp/" + path + '.' + ext;
          // console.log("key", key);
          // 1. 把图片上传到 OSS 中。
          uni.uploadFile({
            url: host,
            filePath: filePath, // 需要存储到 OSS 中的图片的当前路径
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
                // console.log("图片下标" + i + "上传成功，其文件路径：", key)
                resolve(key)
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
        })
      },

      // 将经过 md5 加密后的图片上传到 OSS 平台和服务器。
      async uploadToOSS() {

        // oss 文件加速访问域名
        const downloadUrl = 'https://dryang-miniapp.oss-accelerate.aliyuncs.com'
        // 创建时间戳，可以用于作为文件夹
        let timeStamp = new Date().getTime()
        const {
          data: res
        } = await uni.$http.post('/get_token/')
        // console.log('/get_token/', res);
        // 用 uni.uploadFile 把图片上传到 OSS 中，每次 uni.uploadFile 只能上传一张图片，因此这里用 for 循环调用 uni.uploadFile 接口，上传多张图片。
        // promise 任务数组
        let promiseTasks = []
        // 向 promise 数组中push入promise 对象
        for (var i = 0; i < this.$data.md5Arr.length; i++) {
          promiseTasks.push(this.uploadImg(res, this.$data.md5Arr[i], this.$data.tempPaths[i], this.$data.tempPaths[i]
            .split('.')[1]))
        }
        Promise.all(promiseTasks).then(key => {
          // key 是一个数组
          // console.log('promise执行顺序下：', key);
          key.forEach(each => {
            this.$data.uploadImgs.push(downloadUrl + '/' + each)
          })
        }).catch((err) => {
          // console.log("err:", err);
        })
      },

      // 如果用户的图片类型为校园卡，则调用下面的 ocr 识别算法，识别学号

      async getOcr() {
        this.ocring = true;
        console.log('getOcr');
        wx.serviceMarket.invokeService({
          service: 'wx79ac3de8be320b71', // '固定为服务商OCR的appid，非小程序appid',
          api: 'OcrAllInOne',
          data: {
            img_url: this.uploadImgs[0],
            data_type: 3,
            ocr_type: 8,
          },
        }).then(res => {
          console.log('invokeService success', res)
          // 将ocr识别结果赋值到本地
          let ocrRes = res.data.ocr_comm_res.items;
          console.log('ocrRes: ', ocrRes)
          // console.log('ocrRes: ', ocrRes)
          // filter 返回包含学工号的对象的，一个 数组
          let objs = ocrRes.filter(item => {
            return item.text.indexOf('学工号') != -1;
          })
          // 寻找学工号的下标，进而确定姓名的下标
          let stuNumIndex = -1;
          ocrRes.forEach((each, index) => {
            if (each.text == objs[0].text) {
              stuNumIndex = index
            }
          })
          console.log('stuNumIndex: ', stuNumIndex)
          // obj={text:'学工号:20020007003'}
          this.ocrResStuNum = objs[0].text.split(':')[1];
          console.log('this.ocrResStuNum: ', this.ocrResStuNum)
          this.ocrResName = ocrRes[stuNumIndex - 1].text;
          console.log('this.ocrResName: ', this.ocrResName)
          // console.log('this.ocrResStuNum: ', this.ocrResStuNum)
          // ocr识别结束，将变量置为false
          this.ocring = false;

        }).catch(err => {
          console.error('invokeService fail', err)
          wx.showModal({
            title: 'fail',
            content: err + '',
          })
        })
      },

      // 发布按钮点击事件
      async MyUpload() {
        // 如果正在发布，等待。
        if (this.uploading == true) {
          return;
        }

        // 先验证信息是否输入完整，暂时注释
        if (this.classes == 0) {
          return uni.$showMsg('请选择物品类型')
        } else if (this.itemName == '') {
          return uni.$showMsg('请输入物品名称')
        } else if (this.description == '') {
          return uni.$showMsg(`为了更快地找到${this.query.type == 1 ? '物品' : '失主'},请输入必要的描述信息`)
        } else if (this.time == '') {
          return uni.$showMsg(`请输入${this.query.type == 1 ? '遗失' : '拾到'}时间`)
        }

        this.uploading = true;

        // 如果没有图片，则不执行以下函数
        if (this.md5Arr.length != 0) {
          // 上传图片到 OSS
          // 显示加载中
          // uni.showLoading({
          //   title: '上传图片中'
          // })
          this.uploadToOSS()
        }

        // 图片的上传需要时间
        // 设置定时器，每隔一段时间判断图片是否上传完成
        let intv = setInterval(check, 500);

        let that = this;

        async function check() {
          if (that.uploadImgs.length === that.$data.tempPaths.length) {
            // clearInterval(intv);
            console.log("上传完成");
            // 关闭加载动画
            // uni.hideLoading();

            // 判断是否需要OCR，如果需要，则上传并继续等待。
            // 需要ocr，并且已经 ocr 完成
            if (that.classes == 9 && that.ocring == false) {
              console.log('that.ocring: ', that.ocring)
              console.log('ocrResStuNum', that.ocrResStuNum);

              // 关闭 ocr 加载动画
              // uni.hideLoading()

              clearInterval(intv);
              that.uploadPost();
            }
            // 需要ocr，并且已经 ocr== null，表示还未开始
            if (that.classes == 9 && that.ocring == null) {
              console.log('that.ocring: ', that.ocring)
              // 启动加载动画
              // uni.showLoading({
              //   title: 'ocr识别中...'
              // })
              that.getOcr();
            }
            // 如果 ocr==true，表示正在ocr，什么也不做。
            // 不需要进行 ocr 识别
            else if (that.classes != 9) {
              // 清除定时器
              clearInterval(intv);
              // 直接上传帖子
              that.uploadPost();
            }

          }
        }





      },

      // 向后端传递帖子，仅仅包含上传帖子的代码
      async uploadPost() {

        // uni.showLoading({
        //   title: '上传帖子中'
        // })
        // 发送上传帖子的请求：        
        // 定义请求参数
        let postItem = {}
        postItem.type = this.query.type;
        postItem.name = this.itemName;
        postItem.time = this.time;
        postItem.position = this.position;
        // color默认无。
        postItem.color = this.itemColor == '' ? '无' : this.itemColor;
        postItem.describe = this.description;
        postItem.kindID = this.classes;
        postItem.openid = this.token;
        postItem.picture_address = this.uploadImgs;

        let query = null;
        // 如果是校园卡，则额外上传 query，表示校园卡的姓名和学号
        if (this.classes == 9) {
          query = {};
          query['stuNum'] = this.ocrResStuNum;
          query['stuName'] = this.ocrResName;
        }

        const {
          data: res
        } = await uni.$http.post('/addposts/', {
          postitem: postItem,
          query: query
        })
        console.log('res', res);
        // 关闭上传状态
        this.uploading = false;

        if (res.code == 200) {
          // return uni.$showMsg('上传帖子成功！', 1500, 'success')
          // // 跳转到发布成功页面
          uni.redirectTo({
            // url: '/subpkg/uploadSuccess/uploadSuccess'
            url: '/subpkg/uploadSuccess/uploadSuccess?type=' + res.type + '&postId=' + res['post_ID']
          }).catch(() => {
            return uni.$showMsg(err)
          })
        }
      },

      // 物品类型选择，kind 表示是第几级类型
      selectChange(event) {
        console.log(event);
        // 如果一级导航 不是其他，则需要显示二级导航
        // if (kind == 1 && this.curFstID) {

        // } else {

        // }
      },
      onchange(e) {
        console.log('onchange:', e);
        // 判断是否是校园卡，如果是，就显示弹窗，提示用户
        // 上传图片的注意事项
        if (this.classes == 9) {
          uni.showModal({
            title: '提示',
            content: this.stuCardText,
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定');
              }
            }
          });
        }
      },

      // 选择地点点击事件
      addressClickHandler() {
        // 获取位置
        // uni.chooseLocation({
        //   success: function(res) {
        //     console.log('位置名称：' + res.name);
        //     console.log('详细地址：' + res.address);
        //     console.log('纬度：' + res.latitude);
        //     console.log('经度：' + res.longitude);
        //   }
        // })
      }

    },
    computed: {
      // 物品类型导航
      ...mapState('m_user', ['leftNav', 'stuInfo', 'token']),
    },
    // 显示页面顶部标题
    onLoad(options) {
      this.query = options;
      // 获取当日时间，用于时间选取
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let date = d.getDate();
      this.$data.nowDate = year + '-' + month + '-' + date;
      // this.$data.nowDate
      // 在onLoad() 函数中修改。
      if (this.query.type == 1) {
        uni.setNavigationBarTitle({
          title: '发布寻物启事'
        })
      } else {
        uni.setNavigationBarTitle({
          title: '发布招领启事'
        })
      }
      this.dataTree = this.leftNav;
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
  }
</script>

<style lang="scss">
  // 下拉菜单的样式
  .uniDataPicker {
    width: 100%;
    // padding: 20rpx 0;
  }

  .input-value {
    padding: 5px 10px !important;
  }

  // 高度撑满 
  page {
    height: 100%;
  }

  .container {
    background-color: #eef2f4;
    // height: 100%;
    padding-bottom: 100px;

    .infoBox {
      width: 700rpx;
      background-color: #eef4f7;
      border-radius: 20rpx 20rpx 20rpx 20rpx;
      margin: 0 auto;
      padding-top: 60rpx;

      .infoBoxItem {
        margin-bottom: 40rpx;
        border-radius: 20rpx;
        padding: 36rpx 0rpx;
        padding-right: 30px;
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: #fff;

        .textbox {
          min-width: 220rpx;
          display: flex;

          .infoText {
            font-size: 30rpx;
            font-family: PingFangSC-light;
            margin-left: 36rpx;
            color: #000;

            .smallText {
              font-size: 28rpx;
            }
          }
        }

        input {
          font-size: 32rpx;
          font-family: PingFangSC-light;
        }
      }

      .teleBox::after {
        display: none;
      }

      // 文件上传盒子
      .uni-file-picker {
        // width: 450rpx;
      }
    }

    .upBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 127px;
      // height: 34px;
      background-color: #f3d18b;
      // line-height: 34px;
      margin-top: 30px;
      border-radius: 20px;
      border: none;
      outline: none;
      // padding: 8px 0px;

      text {
        font-size: 20px;
        color: #101010;
      }
    }
  }
</style>
