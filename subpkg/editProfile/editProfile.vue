<!-- 编辑资料页 -->
<template>
  <view class="container">
    <view class="avatar" @click="changePhoto">
      <img :src="newAvatarUrl ? newAvatarUrl : stuInfo.depart_pictureID__picture_address" alt="">
      <view class="camera-box">
        <uni-icons type="camera-filled" size="25"></uni-icons>
      </view>
    </view>
    <view class="profile-item" @click="goToEdit('nickName')">
      <view class="key">
        <text>
          昵称
        </text>
      </view>
      <view class="value">
        <text>
          {{stuInfo.name}}
        </text>
        <uni-icons type="forward" size="20" color="#9b9494"></uni-icons>
      </view>
    </view>

    <view class="profile-item" @click="goToEdit('stuNum')">
      <view class="key">
        <text>
          学号
        </text>
      </view>
      <view class="value">
        <text>
          {{stuInfo.student_number}}
        </text>
        <uni-icons type="forward" size="20" color="#9b9494"></uni-icons>
      </view>
    </view>
    <view class="profile-item">
      <view class="key">
        <text>
          年级专业
        </text>
      </view>
      <view class="dataPickerBox">
        <!-- 选择年级 -->
        <uni-data-picker ref="gradePicker" placeholder="20xx" popup-title="请选择年级" :localdata="grades" v-model="gradeID"
          @change="onGradeChange" class="gradePicker uniDataPicker" @clear="onClear" :map="map">
        </uni-data-picker>
        <!-- 选择专业 -->
        <uni-data-picker ref="majorPicker" placeholder="请选择专业" popup-title="请选择专业" :localdata="majors" v-model="majorID"
          @change="onMajorChange" class="majorPicker uniDataPicker">
        </uni-data-picker>
      </view>
      <!-- <view class="value">
        <text>
          {{stuInfo.depart_gradeID__grade}}
        </text>
        <uni-icons type="forward" size="20" color="#9b9494"></uni-icons>
      </view> -->
    </view>

    <view class="profile-item" @click="goToEdit('tele')">
      <view class="key">
        <text>
          电话
        </text>
      </view>
      <view class="value">
        <text>
          {{stuInfo.phone}}
        </text>
        <uni-icons type="forward" size="20" color="#9b9494"></uni-icons>
      </view>
    </view>

  </view>
</template>

<script>
  import store from '../../store/module/user.js'
  // md5 加密文件
  import md5 from '../../utils/md5.js'
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        // 用户更新后的头像
        newAvatarUrl: '', // 用户上传的图片经过 md5 加密，生成一个字符串，以此作为图片名称，上传到 oss 平台
        md5Arr: [],
        majors: [],
        grades: [],
        // 用户的年级 ID
        gradeID: -1,
        // 用户的专业 ID
        majorID: -1,

        // 用于 uni-data-picker 中 value 和 text 字段名的映射
        map: {
          text: 'grade',
          value: 'id'
        },
        tempFilePaths: [],
        avatarUrl: ''
      }
    },
    computed: {
      ...mapState('m_user', ['token', 'userInfo', 'stuInfo', 'leftNav', 'majorAndGrade'])
    },
    methods: {
      ...mapMutations('m_user', ['updateStuInfo', 'updateMandG']),
      // 用户更换头像
      changePhoto() {
        let that = this;
        uni.chooseImage({
          count: 1,
          success: (res) => {
            that.tempFilePaths = res.tempFilePaths //图片临时数组
            // 修改本页显示的头像
            that.newAvatarUrl = that.tempFilePaths[0]
            console.log('that.tempFilePaths', that.tempFilePaths);
            that.md5Arr.push(md5.hex_md5(that.tempFilePaths))
            this.uploadImg()
          }
        })
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
              // this.uploadedImgs.splice(0, this.uploadedImgs.length)
              // this.uploadedImgs.push(downloadUrl + '/' + key)
              this.newAvatarUrl = downloadUrl + '/' + key
              console.log('this.newAvatarUrl: ', this.newAvatarUrl)
              this.updateAvatar();
              // console.log('this.uploadedImgs: ', this.uploadedImgs)
              // 头像上传成功后，像后端发送数据
            } else {
              console.log("请求成功，但是上传失败！")
            }
          },
          fail: (err) => {
            console.log("请求失败！");
            reject('请求失败！')
          }
        })
      },

      // 更新头像 
      async updateAvatar() {
        // 修改头像。type=1
        const {
          data: res
        } = await uni.$http.post('/ChangeInfo/', {
          openid: this.token,
          type: 1,
          picture: this.newAvatarUrl
        })
        if (res.code != '200') {
          return uni.$showMsg('请稍后重试', 1500, 'error');
        }
        // 将修改后的个人信息持久化存储
        let tempStuInfo = this.stuInfo;
        tempStuInfo.depart_pictureID__picture_address = this.newAvatarUrl;
        this.updateStuInfo(tempStuInfo)

        return uni.$showMsg('修改成功', 1500, 'success');
      },

      goToEdit(arg) {
        uni.navigateTo({
          url: '/subpkg/edit/edit?type=' + arg
        })
      }, // 调用接口，获取年级专业
      async getGradeAndMajor() {
        const {
          data: res
        } = await uni.$http.post('/GradeAndMajor/');
        console.log('res', res);
        this.grades = res.grade;
        this.majors = res.majorlist;
        this.updateMandG(res)
      }, // 年级选择时间
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
        // 修改年级专业
        this.changeMajAndGrd();
      },
      // 1：头像   2：姓名   3：学号   4: 年级专业   5：电话
      async changeMajAndGrd() {
        const {
          data: res
        } = await uni.$http.post('/ChangeInfo/', {
          openid: this.token,
          type: 4,
          gradeID: this.gradeID,
          majorID: this.majorID
        })
        if (res.code != 200) {
          return uni.$showMsg('请稍后重试', 1500, 'error');
        }
        return uni.$showMsg('修改成功', 1500, 'success');
      }
    },
    onLoad() {
      // 如果没有 年级专业信息，请求
      if (JSON.stringify(this.majorAndGrade) == '{}') {
        this.getGradeAndMajor();
      } else {
        this.grades = this.majorAndGrade.grade;
        this.majors = this.majorAndGrade.majorlist;
      }
    },
    onShow() {
      console.log(this.userInfo);
      console.log(this.leftNav);
    }
  }
</script>

<style lang="scss">
  page {
    height: 100%;
    background-color: #fff;
  }

  .container {
    height: 100%;
    width: 704rpx;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .avatar {
      margin-top: 66rpx;
      position: relative;

      image {
        width: 212rpx;
        height: 212rpx;
        border-radius: 50%;
      }

      .camera-box {
        position: absolute;
        bottom: 0;
        right: 20rpx;
        width: 60rpx;
        height: 60rpx;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgba(187, 187, 187, 100);
        border-radius: 50%;
      }
    }

    .profile-item {
      width: 95%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: #ededed 1px solid;
      padding: 30rpx 0rpx;

      // 第一条的上边距
      &:first-of-type {
        margin-top: 56rpx;
      }

      .key {
        background-color: #eef4f7;
        padding: 10rpx 20rpx;
        border-radius: 20rpx;
      }

      .value {
        text {
          padding-right: 10rpx;
        }
      }

      .dataPickerBox {
        display: flex;

        .gradePicker {
          max-width: 88px;
          margin-right: 30rpx;
        }

        .majorPicker {
          max-width: 120px;
        }
      }
    }
  }
</style>
