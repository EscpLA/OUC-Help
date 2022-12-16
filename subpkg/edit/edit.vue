<template>
  <view class="container">
    <!-- 提示信息弹窗 -->
    <uni-popup ref="message" type="message">
      <uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
    </uni-popup>

    <input type="text" class="edit" v-model="newVal">
    <view class="tips">
      {{tips}}
    </view>
    <button class="editSave" @click="editSave">保存</button>
  </view>
</template>

<script>
  import store from '../../store/module/user.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        query: {},
        tips: "请输入真实姓名噢~",
        oldVal: '',
        newVal: '',
        type: 'center',
        msgType: 'success',
        messageText: '这是一条成功提示',
        value: ''
      };
    },
    computed: {
      ...mapState('m_user', ['userInfo', 'stuInfo', 'token'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserinfo', 'updateStuInfo']),
      async editSave() {
        if (this.oldVal == this.newVal) {
          console.log('无需更改');
        } else {
          // 判断是修改 userInfo 还是修改 stuInfo
          if (this.query.type == 'nickName') {
            this.stuInfo.name = this.newVal
            this.updateUserinfo(this.stuInfo)
          } else {
            this.stuInfo[this.query.type] = this.newVal
            this.updateStuInfo(this.stuInfo)
          }
        }

        let type = -1;
        let key = '';
        // 修改的类型 2： 姓名，3： 学号，6： 电话
        switch (this.query.type) {
          case 'nickName':
            type = 2;
            key = 'name'
            break;
          case 'stuNum':
            type = 3;
            key = 'student_number'
            break;
          case 'tele':
            type = 6;
            key = 'phone'
            break;
          default:
            break;
        }
        
        // 根据接口文档，动态确定请求对象的属性 key
        let myQuery = {}
        myQuery['openid'] = this.token;
        myQuery['type'] = type;
        myQuery[key] = this.newVal;
        console.log("myQuery: ", myQuery);
        const {
          data: res
        } = await uni.$http.post('/ChangeInfo/', myQuery)

        console.log("res: ", res);
        if (res.code != 200) {
          return uni.$showMsg('修改失败，请稍后再试', 1500, 'erroe')
        }

        uni.$showMsg('修改成功！', 1500, 'success')
        // 将修改结果本地化存储
        let localStuInfo = this.stuInfo;
        localStuInfo[key] = this.newVal;
        this.updateStuInfo(localStuInfo);

        setTimeout(() => {
          uni.navigateBack()
        }, 1500);
      },
      messageToggle(type) {
        this.msgType = type
        this.messageText = `修改成功！`
        this.$refs.message.open()
      }
    },
    onLoad(options) {
      this.query = options
      switch (this.query.type) {
        case 'nickName':
          this.oldVal = this.stuInfo.name
          this.tips = '请设置2-24个字符，不包括@<>/等无效字符哦'
          uni.setNavigationBarTitle({
            title: '编辑' + '昵称'
          })
          break;
        case 'stuNum':
          this.oldVal = this.stuInfo.student_number
          this.tips = "请输入真实学号噢~"
          uni.setNavigationBarTitle({
            title: '编辑' + '学号'
          })
          break;
        case 'grade':
          this.oldVal = this.stuInfo.grade
          this.tips = "请输入真实年级噢~"
          uni.setNavigationBarTitle({
            title: '编辑' + '年级'
          })
          break;
        case 'major':
          this.oldVal = this.stuInfo.major
          this.tips = "请输入真实专业噢~"
          uni.setNavigationBarTitle({
            title: '编辑' + '专业'
          })
          break;
        case 'tele':
          this.oldVal = this.stuInfo.tele
          this.tips = "请输入真实电话噢~"
          uni.setNavigationBarTitle({
            title: '编辑' + '电话'
          })
          break;

        default:
          break;
      }
      this.newVal = this.oldVal
    },
    onReady() {}
  }
</script>

<style lang="scss">
  .container {
    width: 704rpx;
    margin: 0 auto;
    // position: relative;

    input.edit {
      font-size: 32rpx;
      height: 88rpx;
      background-color: #e1edf4;
      border-radius: 20rpx;
      margin-top: 50rpx;
      padding-left: 32rpx;

    }

    .tips {
      margin-top: 30rpx;
    }

    .editSave {
      position: absolute;
      bottom: 200rpx;
      // 水平居中
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      font-size: 40rpx;
      font-weight: bold;
      padding-top: 8rpx;
      padding-bottom: 8rpx;
      border: none;
      outline: none;
      background-color: #95c8e3;
      color: #fff;
    }
  }
</style>
