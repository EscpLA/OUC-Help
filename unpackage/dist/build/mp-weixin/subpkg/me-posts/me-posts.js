(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/me-posts/me-posts"],{"4df8":function(t,e,n){"use strict";n.r(e);var o=n("704e"),r=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=r.a},"704e":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=u(n("a34a")),r=n("26cb"),i=u(n("360d"));function u(t){return t&&t.__esModule?t:{default:t}}function s(t){return p(t)||l(t)||c(t)||a()}function a(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,e){if(t){if("string"===typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}function l(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function p(t){if(Array.isArray(t))return f(t)}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function d(t,e,n,o,r,i,u){try{var s=t[i](u),a=s.value}catch(c){return void n(c)}s.done?e(a):Promise.resolve(a).then(o,r)}function m(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var i=t.apply(e,n);function u(t){d(i,o,r,u,s,"next",t)}function s(t){d(i,o,r,u,s,"throw",t)}u(void 0)}))}}function g(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function b(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?g(Object(n),!0).forEach((function(e){h(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function h(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var v={data:function(){return{posts:[],myDeletePost:{deletePostId:-1,deletePostIndex:-1},page:1,pageSize:6,total:0,bottomLoading:!1}},computed:b(b({},(0,r.mapState)("m_user",["token"])),{},{postTime:function(){var t=this;return function(e){return i.default.utcToBeijing(t.posts[e].post_time)}},itemTime:function(){var t=this;return function(e){return console.log(i.default.utcToBeijing(t.posts[e].post_time)),i.default.itemTime(t.posts[e].time)}}}),methods:{getPostList:function(){var e=this;return m(o.default.mark((function n(){var r,i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log(e.token),n.next=3,t.$http.post("/MyPostList/",{openid:e.token,page:e.page,pageSize:e.pageSize});case 3:if(r=n.sent,i=r.data,200==i.code){n.next=7;break}return n.abrupt("return",t.$showMsg("数据加载失败",1500,"error"));case 7:console.log(i),e.posts=i.myPost.list,e.total=i.myPost.total,e.page++,console.log("this.posts",e.posts);case 12:case"end":return n.stop()}}),n)})))()},itemClickHandler:function(e){t.navigateTo({url:"/subpkg/goods_detail/goods_detail?detail_type="+this.posts[e].type_id+"&item_id="+this.posts[e].id})},deleteHandler:function(t,e){this.myDeletePost.deletePostId=t,this.myDeletePost.deletePostIndex=e,this.$refs.popup.open()},deletePost:function(){var e=this;return m(o.default.mark((function n(){var r,i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading({title:"请稍候......"}),n.next=3,t.$http.post("/deletePost/",{id:e.myDeletePost.deletePostId});case 3:r=n.sent,i=r.data,console.log(i),200==i.code&&(console.log("删除成功"),e.posts.splice(e.myDeletePost.deletePostIndex,1));case 7:case"end":return n.stop()}}),n)})))()},close:function(){this.$refs.popup.close()},confirm:function(t){this.$refs.popup.close(),this.deletePost()}},onLoad:function(){this.getPostList()},onReachBottom:function(){var e=this;return m(o.default.mark((function n(){var r,i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!((e.page-1)*e.pageSize>=e.total||1==e.bottomLoading)){n.next=2;break}return n.abrupt("return",0);case 2:return t.showLoading(),e.bottomLoading=!0,n.next=6,t.$http.post("/MyPostList/",{openid:e.token,page:e.page,pageSize:e.pageSize});case 6:if(r=n.sent,i=r.data,200==i.code){n.next=10;break}return n.abrupt("return",t.$showMsg("数据加载失败",1500,"error"));case 10:console.log(i),e.posts=[].concat(s(e.posts),s(i.myPost.list)),e.page++,e.bottomLoading=!1,t.hideLoading();case 15:case"end":return n.stop()}}),n)})))()}};e.default=v}).call(this,n("543d")["default"])},9206:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"072f"))},uniPopupDialog:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog")]).then(n.bind(null,"1bf5"))}},r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.posts,(function(e,n){var o=t.__get_orig(e),r=t.postTime(n),i=t.itemTime(n);return{$orig:o,m0:r,m1:i}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},i=[]},"9a69":function(t,e,n){"use strict";n.r(e);var o=n("9206"),r=n("4df8");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("dbd2");var u,s=n("f0c5"),a=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=a.exports},dbd2:function(t,e,n){"use strict";var o=n("e1ee"),r=n.n(o);r.a},e1ee:function(t,e,n){},e8ff:function(t,e,n){"use strict";(function(t){n("6e5e");o(n("66fd"));var e=o(n("9a69"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])}},[["e8ff","common/runtime","common/vendor"]]]);