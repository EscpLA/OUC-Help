<template>
  <!-- 因为用户的微信昵称会被合法检验，如果不通过，会自动清空。
   v-model 的变量是 ''，但输入框仍有值。
   为了解决这个问题，通过 from + @submit；<input name="">；<button form-type='submit'，通过自定义函数获取输入框的内容 >-->
  <form @submit="save">
    <view class="singUp-container">
      <button open-type="chooseAvatar" @chooseavatar="onChooseAvatar" class="clearBtn">
        <image :src="avatarUrl" mode="" class="avater"></image>
      </button>
      <view class="infoBox">
        <view class="nameBox">
          <view class="textbox">
            <text class="infoText">昵称</text>
          </view>
          <input type="nickname" name="nickName" placeholder="请输入昵称" v-model="nickName" @input="getName">
        </view>
        <view class="numberBox">
          <view class="textbox">
            <text class="infoText">学号</text>
          </view>
          <input placeholder="请输入学号" v-model="stuNumber" type="number">
        </view>
        <view class="gradeBox">
          <view class="textbox">
            <text class="infoText">年级专业</text>
          </view>
          <!-- 选择年级 -->
          <uni-data-picker ref="gradePicker" placeholder="20xx" popup-title="请选择年级" :localdata="grades"
            v-model="gradeID" @change="onGradeChange" class="gradePicker uniDataPicker" @clear="onClear" :map="map">
          </uni-data-picker>
          <!-- 选择专业 -->
          <uni-data-picker ref="majorPicker" placeholder="请选择专业" popup-title="请选择专业" :localdata="majors"
            v-model="majorID" @change="onMajorChange" class="majorPicker uniDataPicker">
          </uni-data-picker>
          <!--          <song-data-picker ref="majorPicker" placeholder="请选择专业" popup-title="请选择专业" :localdata="majors"
            v-model="majorID" @change="onMajorChange" class="majorPicker uniDataPicker"></song-data-picker> -->
        </view>

        <view class="teleBox">
          <view class="textbox">
            <text class="infoText">电话</text>
          </view>
          <input placeholder="请输入联系电话" v-model="tele" type="number">
        </view>
      </view>
      <!-- 提交按钮 -->
      <button type="default" class="button" form-type="submit">保存</button>
    </view>
  </form>
</template>

<script>
  import store from '../../store/store.js'
  // md5 加密文件
  import md5 from '../../utils/md5.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    name: "me-signUp",
    data() {
      return {
        // 用户的头像（默认头像）
        avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        // 临时头像
        tempAvatarUrl: '',
        // 用户上传的图片经过 md5 加密，生成一个字符串，以此作为图片名称，上传到 oss 平台
        md5Arr: [],

        nickName: '',
        stuNumber: '',
        grade: '',
        major: '',
        tele: '',
        // 年级列表
        grades: [{
            value: 1,
            text: 2019 + '级'
          },
          {
            value: 2,
            text: 2020 + '级'
          },
          {
            value: 3,
            text: 2021 + '级'
          },
          {
            value: 4,
            text: 2022 + '级'
          }
        ],
        // 专业列表
        majors: [{
          value: 0,
          text: '数据科学与大数据i技术'
        }],
        // 用户的年级 ID
        gradeID: -1,
        // 用户的专业 ID
        majorID: -1,

        // 用于 uni-data-picker 中 value 和 text 字段名的映射
        map: {
          text: 'grade',
          value: 'id'
        }
      };
    },
    computed: {
      ...mapState('m_user', ['token'])
    },
    methods: {
      ...mapMutations('m_user', ['updateSignUp', 'updateStuInfo', 'updateMandG']),

      // 调用接口，获取年级专业
      async getGradeAndMajor() {
        const {
          data: res
        } = await uni.$http.post('/GradeAndMajor/');
        console.log('res', res);
        this.$data.grades = res.grade;
        this.$data.majors = res.majorlist;
        this.updateMandG(res)


      },

      // 保存点击事件
      save(e) {

        // 本地存储昵称
        this.nickName = e.detail.value.nickName

        // 正则表达式校验输入
        let reg_stuNum = /^\d{8,12}$/
        let reg_tele = /^([1][3,4,5,6,7,8,9])\d{9}$/
        // 更改头像
        if (this.tempAvatarUrl == '') {
          return uni.$showMsg("请选择头像")
        }
        // 请输入昵称
        if (this.nickName == '') {
          return uni.$showMsg("请输入昵称")
        }
        // 学号不符合规范
        if (reg_stuNum.test(this.stuNumber) == false)
          return uni.$showMsg("学号不符合规范")
        // 请输入合法的电话号码
        if (reg_tele.test(this.tele) == false)
          return uni.$showMsg('请输入合法的电话号码')


        // 上传头像，上传成功后，在回调函数中，调用 submit 
        this.uploadImg();

        // 请后端发起 post 请求。
        // 将用户的 isSignUp 设置为true
        // this.updateSignUp(true)
      },

      // 提交个人信息
      async submit() {
        // 准备请求参数
        const query = {
          nickName: this.$data.nickName,
          phone: this.$data.tele,
          student_number: this.$data.stuNumber,
          openid: this.token,
          depart_majorID: this.$data.majorID + "",
          depart_gradeID: this.$data.gradeID + "",
          depart_picture: this.avatarUrl
        }
        console.log('query', query);
        const {
          data: res
        } = await uni.$http.post('/register/', query)
        console.log('res', res);
        if (res.code === 200) {
          // 注册成功
          // 更新当前学生信息
          this.updateStuInfo(res.stuInfo[0])
          console.log('res.stuInfo[0]: ', res.stuInfo[0])
          return uni.$showMsg(res.msg)
        } else {
          return uni.$showMsg(res.msg)
        }
      },

      // 年级选择时间
      onGradeChange(e) {
        // 如果是 点击清空按钮
        if (e.detail.value[0] == undefined) {
          this.$data.gradeID = -1;
        } else {
          if (this.$data.majorID == -1) {
            // 如果此时用户没有选择专业，则自动打开专业选择picker
            this.$refs.majorPicker.show();

          }
        }
        console.log('gradeId', this.$data.gradeID);
      },
      onMajorChange(e) {
        if (e.detail.value[0] == undefined) {
          this.$data.majorID = -1;
        }
      },
      onChooseAvatar(e) {
        const {
          avatarUrl
        } = e.detail;
        this.avatarUrl = avatarUrl;
        this.tempAvatarUrl = avatarUrl;
        this.md5Arr.push(md5.hex_md5(this.tempAvatarUrl))
        console.log('this.md5Arr: ', this.md5Arr)
        console.log('this.tempAvatarUrl: ', this.tempAvatarUrl)

      },
      // 先将头像上传到 OSS 上
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
        const key = 'ouchelp/' + this.md5Arr[0] + this.tempAvatarUrl.split('.')[1]
        uni.uploadFile({
          url: host,
          filePath: this.tempAvatarUrl, // 需要存储到 OSS 中的图片的当前路径
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
              // this.uploadedImgs.splice(0, this.uploadedImgs.length)
              // this.uploadedImgs.push(downloadUrl + '/' + key)
              this.avatarUrl = downloadUrl + '/' + key
              console.log('this.avatarUrl: ', this.avatarUrl)
              // console.log('this.uploadedImgs: ', this.uploadedImgs)
              // 头像上传成功后，像后端发送数据
              // 调用提交函数
              this.submit();
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

    },
    created() {
      this.getGradeAndMajor();
    }
  }
</script>

<style lang="scss">
  // 下拉菜单的样式
  .uniDataPicker {
    // width: 65%;
    // height: 100px;
    padding-left: 10px;

    // padding: 20rpx 0;
    text {
      font-size: 16px !important;
    }
  }

  .gradePicker {
    max-width: 88px;
  }

  .majorPicker {
    max-width: 120px;
  }

  .singUp-container {
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .avater {
      width: 212rpx;
      height: 212rpx;
      margin-top: 86rpx;
    }

    .infoBox {
      width: 680rpx;
      // height: 368rpx;
      background-color: #eef4f7;
      border-radius: 10px 10px 10px 10px;
      margin-top: 26rpx;

      .nameBox,
      .numberBox,
      .teleBox,
      .gradeBox {
        margin: 36rpx 0rpx;
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .textbox {
          width: 90px;
          display: flex;

          .infoText {
            font-size: 36rpx;
            margin-left: 36rpx;
            color: #000;
          }
        }

        input {
          padding-left: 15px;
          font-size: 36rpx;
        }

        &::after {
          content: '';
          display: block;
          width: 604rpx;
          height: 1px;
          background-color: #bbb;
          position: absolute;
          top: 40px;
          left: 15px;
        }
      }

      .numberBox,
      .teleBox,
      .gradeBox {
        margin-top: 72rpx;
      }

      .gradeBox {
        display: flex;

        .infoText {
          font-size: 36rpx;
          color: #000;
        }

        .input-1 {
          flex: 0.3;
          // border-right: 1px solid #e5e5e5;
        }

        .input-2 {
          flex: 0.5;
        }
      }

      .teleBox::after {
        display: none;
      }
    }

    .button {
      width: 254rpx;
      height: 68rpx;
      background-color: #f5c66a;
      line-height: 68rpx;
      margin-top: 56rpx;
      font-weight: bold;
    }
  }
</style>
