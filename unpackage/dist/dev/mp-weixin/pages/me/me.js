(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/me"],{74:function(e,n,t){"use strict";(function(e){t(5);r(t(4));var n=r(t(75));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},75:function(e,n,t){"use strict";t.r(n);var r=t(76),o=t(78);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);t(80);var c,i=t(48),s=Object(i["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],c);s.options.__file="pages/me/me.vue",n["default"]=s.exports},76:function(e,n,t){"use strict";t.r(n);var r=t(77);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},77:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return c})),t.d(n,"recyclableRender",(function(){return u})),t.d(n,"components",(function(){return r}));var o=function(){var e=this,n=e.$createElement,t=(e._self._c,e.token?JSON.stringify(e.stuInfo):null);e.$mp.data=Object.assign({},{$root:{g0:t}})},u=!1,c=[];o._withStripped=!0},78:function(e,n,t){"use strict";t.r(n);var r=t(79),o=t.n(r);for(var u in r)"default"!==u&&function(e){t.d(n,e,(function(){return r[e]}))}(u);n["default"]=o.a},79:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=u(t(51)),o=t(45);function u(e){return e&&e.__esModule?e:{default:e}}function c(e,n,t,r,o,u,c){try{var i=e[u](c),s=i.value}catch(a){return void t(a)}i.done?n(s):Promise.resolve(s).then(r,o)}function i(e){return function(){var n=this,t=arguments;return new Promise((function(r,o){var u=e.apply(n,t);function i(e){c(u,r,o,i,s,"next",e)}function s(e){c(u,r,o,i,s,"throw",e)}i(void 0)}))}}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){f(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function f(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var l=function(){Promise.all([t.e("common/vendor"),t.e("components/me-login/me-login")]).then(function(){return resolve(t(194))}.bind(null,t)).catch(t.oe)},d=function(){Promise.all([t.e("common/vendor"),t.e("components/me-signUp/me-signUp")]).then(function(){return resolve(t(201))}.bind(null,t)).catch(t.oe)},p=function(){Promise.all([t.e("common/vendor"),t.e("components/me-userinfo/me-userinfo")]).then(function(){return resolve(t(208))}.bind(null,t)).catch(t.oe)},m={data:function(){return{}},computed:a({},(0,o.mapState)("m_user",["token","userInfo","isSignUp","stuInfo"])),methods:a({},(0,o.mapMutations)("m_user",["updateStuInfo"])),components:{meUserInfo:p,meSignUp:d,myLogin:l},onLoad:function(){},onPullDownRefresh:function(){var n=this;return i(r.default.mark((function t(){var o,u;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n.token&&"{}"!=JSON.stringify(n.stuInfo)){t.next=4;break}e.stopPullDownRefresh(),t.next=13;break;case 4:return t.next=6,e.$http.post("/getStuInfo/",{openid:n.token});case 6:if(o=t.sent,u=o.data,200==u.code){t.next=10;break}return t.abrupt("return",e.$showMsg("个人信息获取失败",1500,"error"));case 10:n.updateStuInfo(u.stuInfo[0]),e.$showMsg("信息加载成功",1500,"success"),e.stopPullDownRefresh();case 13:case"end":return t.stop()}}),t)})))()}};n.default=m}).call(this,t(1)["default"])},80:function(e,n,t){"use strict";t.r(n);var r=t(81),o=t.n(r);for(var u in r)"default"!==u&&function(e){t.d(n,e,(function(){return r[e]}))}(u);n["default"]=o.a},81:function(e,n,t){}},[[74,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/me/me.js.map