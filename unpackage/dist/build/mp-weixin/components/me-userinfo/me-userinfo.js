(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/me-userinfo/me-userinfo"],{"034c":function(t,e,n){"use strict";n.r(e);var o=n("2cc4"),i=n("629e");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("aae1");var u,c=n("f0c5"),a=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=a.exports},"23f9":function(t,e,n){},"2cc4":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var o={uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"072f"))},uniPopupDialog:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog")]).then(n.bind(null,"1bf5"))}},i=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"507c":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;i(n("861e"));var o=n("26cb");function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var a={name:"me-userinfo",data:function(){return{msgType:"success",dialogContent:"打开该设置后，如果有用户上传了您丢失的校园卡，小程序将为您发送推送提醒。",tmplId:["qm6d58WUSfME2bxsxhWsQb1WBQEQVlyxThDADJJdh5c"],allowNotification:t.getStorageSync("allowNotification")||!1}},methods:{goToSettings:function(){t.navigateTo({url:"/subpkg/settings/settings"})},goToSetProfile:function(){t.navigateTo({url:"/subpkg/editProfile/editProfile"})},goToMeComemnt:function(){t.navigateTo({url:"/subpkg/me-comments/me-comments"})},goToMePosts:function(){t.navigateTo({url:"/subpkg/me-posts/me-posts"})},getGradeAndMojor:function(){},feedBackClick:function(){wx.openEmbeddedMiniProgram({appId:"wx8abaf00ee8c3202e",extraData:{id:"454856",customData:{clientInfo:"iPhone OS 10.3.1 / 3.2.0.43 / 0"}}})},switchChange:function(e){console.log(e.detail),0==this.allowNotification?this.$refs.alertDialog.open():(this.allowNotification=!1,t.setStorageSync("allowNotification",this.allowNotification))},dialogConfirm:function(){var e=this;wx.requestSubscribeMessage({tmplIds:e.tmplId,success:function(n){console.log("res: ",n),console.log("res[that.tmplId[0]]: ",n[e.tmplId[0]]),"accept"==n[e.tmplId[0]]?(e.allowNotification=!0,t.setStorageSync("allowNotification",e.allowNotification)):"reject"==n[e.tmplId[0]]&&console.log("拒绝")}})},dialogClose:function(){}},computed:u({},(0,o.mapState)("m_user",["userInfo","stuInfo","majorAndGrade"])),onShow:function(){console.log(this.userInfo)}};e.default=a}).call(this,n("543d")["default"])},"629e":function(t,e,n){"use strict";n.r(e);var o=n("507c"),i=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=i.a},aae1:function(t,e,n){"use strict";var o=n("23f9"),i=n.n(o);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/me-userinfo/me-userinfo-create-component',
    {
        'components/me-userinfo/me-userinfo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("034c"))
        })
    },
    [['components/me-userinfo/me-userinfo-create-component']]
]);
