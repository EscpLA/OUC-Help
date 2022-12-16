<script>
  import {
    crypto
  } from 'crypto-js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    onLaunch: function() {
      // console.log('App Launch')
    },
    onShow: function() {
      // console.log('App Show')
    },
    onHide: function() {
      // console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  @import '@/uni_modules/uni-scss/index.scss';
  /* #ifndef APP-NVUE */
  @import '@/static/customicons.css';
  @import 'static/font/iconfont.css';

  // 设置整个项目的背景色
  page {
    background-color: #f5f5f5;
  }

  /* #endif */
  .example-info {
    font-size: 14px;
    color: #333;
    padding: 10px;
  }

  .bg-white {
    background-color: #fff;
  }

  .clearBtn {
    margin: 0;
    padding: 0;
    line-height: 1;
    background-color: #FFFFFF;
  }

  .clearBtn::after {
    position: unset !important;
    border: unset;
  }

</style>
