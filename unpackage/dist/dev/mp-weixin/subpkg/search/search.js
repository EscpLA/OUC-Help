(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/search/search"],{91:function(t,e,n){"use strict";(function(t){n(5);r(n(4));var e=r(n(92));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n(1)["createPage"])},92:function(t,e,n){"use strict";n.r(e);var r=n(93),o=n(95);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n(97);var s,a=n(48),u=Object(a["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],s);u.options.__file="subpkg/search/search.vue",e["default"]=u.exports},93:function(t,e,n){"use strict";n.r(e);var r=n(94);n.d(e,"render",(function(){return r["render"]})),n.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(e,"components",(function(){return r["components"]}))},94:function(t,e,n){"use strict";var r;n.r(e),n.d(e,"render",(function(){return o})),n.d(e,"staticRenderFns",(function(){return s})),n.d(e,"recyclableRender",(function(){return i})),n.d(e,"components",(function(){return r}));try{r={uniSearchBar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar")]).then(n.bind(null,275))},uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,246))},uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,215))},uniPopupDialog:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog")]).then(n.bind(null,254))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var t=this,e=t.$createElement,n=(t._self._c,0!=t.searchResult.length?t.__map(t.searchResult,(function(e,n){var r=t.__get_orig(e),o=e.time.split("T");return{$orig:r,g0:o}})):null);t.$mp.data=Object.assign({},{$root:{l0:n}})},i=!1,s=[];o._withStripped=!0},95:function(t,e,n){"use strict";n.r(e);var r=n(96),o=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},96:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(n(51));function o(t){return t&&t.__esModule?t:{default:t}}function i(t){return c(t)||u(t)||a(t)||s()}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(t,e){if(t){if("string"===typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(t,e):void 0}}function u(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function c(t){if(Array.isArray(t))return l(t)}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function f(t,e,n,r,o,i,s){try{var a=t[i](s),u=a.value}catch(c){return void n(c)}a.done?e(u):Promise.resolve(u).then(r,o)}function p(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function s(t){f(i,r,o,s,a,"next",t)}function a(t){f(i,r,o,s,a,"throw",t)}s(void 0)}))}}var h=function(){Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-empty/components/o-empty/o-empty")]).then(function(){return resolve(n(182))}.bind(null,n)).catch(n.oe)},d={data:function(){return{timer:null,kw:"",searchResult:[],history_list:["唱","跳","rap","篮球"],history:[],query:{},start_search:!1,searchBarBg:"",page:1,pageSize:6,total:0,bottomLoading:!1}},components:{uniEmpty:h},onLoad:function(e){this.history_list=JSON.parse(t.getStorageSync("kw")||"[]"),this.history=this.history_list,this.query=e,this.searchBarBg=1==this.query.type?"#add3e8":"#f5c66aF"},methods:{input:function(t){var e=this;clearTimeout(this.timer),this.timer=setTimeout((function(){e.kw=t,e.page=1,e.getSearchResult()}),500)},saveHistory:function(){var e=new Set(this.history_list);e.delete(this.kw),this.history_list=Array.from(e),this.history_list.unshift(this.kw),this.history=this.history_list,t.setStorageSync("kw",JSON.stringify(this.history_list))},trashClickHandler:function(){this.$refs.popup.open()},clearSearchHistory:function(){return t.setStorageSync("kw","[]"),this.history_list=JSON.parse(t.getStorageSync("kw")||"[]"),this.history=this.history_list,t.$showMsg("清除成功",1500,"success")},historyClickHandler:function(t){this.kw=this.history[t],this.page=1,this.getSearchResult()},getSearchResult:function(){var e=this;return p(r.default.mark((function n(){var o,i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(0!=e.kw.length){n.next=3;break}return e.searchResult=[],n.abrupt("return");case 3:return n.next=5,t.$http.post("/search/",{q:e.kw,type:e.query.type,page:e.page,pageSize:e.pageSize});case 5:if(o=n.sent,i=o.data,200==i.code){n.next=9;break}return n.abrupt("return",t.$showMsg("数据请求失败"));case 9:e.searchResult=i.post_list.list,e.page++,e.total=i.post_list.total,0==e.start_search&&(e.start_search=!0),e.saveHistory();case 14:case"end":return n.stop()}}),n)})))()},close:function(){this.$refs.popup.close()},confirm:function(t){this.$refs.popup.close(),this.clearSearchHistory()}},computed:{myPlaceHolder:function(){var t=1==this.query.type?"您正在搜索失物帖子":"您正在搜索招领帖子";return t},styleVar:function(){return{"--searchBarBg":1==this.query.type?"#add3e8":"#f5c66aF"}}},onReady:function(){1==this.query.type?t.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#add3e8"}):t.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#f5c66a"})},onReachBottom:function(){var e=this;return p(r.default.mark((function n(){var o,s;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!((e.page-1)*e.pageSize>=e.total||1==e.bottomLoading)){n.next=2;break}return n.abrupt("return",0);case 2:return t.showLoading(),e.bottomLoading=!0,n.next=6,t.$http.post("/search/",{q:e.kw,type:e.query.type,page:e.page,pageSize:e.pageSize});case 6:if(o=n.sent,s=o.data,200==s.code){n.next=10;break}return n.abrupt("return",t.$showMsg("数据加载失败",1500,"error"));case 10:console.log(s),e.posts=[].concat(i(e.posts),i(s.post_list.list)),e.page++,e.bottomLoading=!1,t.hideLoading();case 15:case"end":return n.stop()}}),n)})))()}};e.default=d}).call(this,n(1)["default"])},97:function(t,e,n){"use strict";n.r(e);var r=n(98),o=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},98:function(t,e,n){}},[[91,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/search/search.js.map