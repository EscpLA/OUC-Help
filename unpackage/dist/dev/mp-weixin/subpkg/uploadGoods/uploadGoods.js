(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/uploadGoods/uploadGoods"],{100:function(e,t,n){"use strict";n.r(t);var r=n(101),o=n(103);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n(105);var c,i=n(48),s=Object(i["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],c);s.options.__file="subpkg/uploadGoods/uploadGoods.vue",t["default"]=s.exports},101:function(e,t,n){"use strict";n.r(t);var r=n(102);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},102:function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return o})),n.d(t,"staticRenderFns",(function(){return c})),n.d(t,"recyclableRender",(function(){return a})),n.d(t,"components",(function(){return r}));try{r={uniDataPicker:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker")]).then(n.bind(null,286))},uniFilePicker:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker")]).then(n.bind(null,234))},uniDatetimePicker:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker")]).then(n.bind(null,294))}}}catch(i){if(-1===i.message.indexOf("Cannot find module")||-1===i.message.indexOf(".vue"))throw i;console.error(i.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,t=e.$createElement;e._self._c},a=!1,c=[];o._withStripped=!0},103:function(e,t,n){"use strict";n.r(t);var r=n(104),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a},104:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=c(n(51)),o=c(n(88)),a=n(45);c(n(49)),c(n(9)),c(n(54));function c(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,r,o,a,c){try{var i=e[a](c),s=i.value}catch(u){return void n(u)}i.done?t(s):Promise.resolve(s).then(r,o)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function c(e){i(a,r,o,c,s,"next",e)}function s(e){i(a,r,o,c,s,"throw",e)}c(void 0)}))}}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f={data:function(){return{classes:0,query:{},uploadImgs:[],itemName:"",itemColor:"",time:"",position:"",description:"",imageStyles:{height:75,width:75,border:{color:"#eee",width:"1px",style:"solid",radius:"15px"}},md5Arr:[],tempPaths:[],ocring:null,ocrResStuNum:"",ocrResName:"",stuCardText:"在上传校园卡的照片时，请将有信息的图片置于第一张。",nowDate:"",dataTree:[],uploading:!1}},methods:l(l({},(0,a.mapActions)("m_user",["getOSSToken"])),{},{uniFilePickerCLick:function(){},select:function(e){var t=this;e.tempFilePaths.forEach((function(e){t.$data.md5Arr.push(o.default.hex_md5(e)),t.$data.tempPaths.push(e)}))},fileDelete:function(e){console.log(e);var t=e.tempFilePath,n=0;while(this.$data.tempPaths[n]!=t)n++;this.$data.tempPaths.splice(n,1),this.$data.md5Arr.splice(n,1)},uploadImg:function(t,n,r,o){return new Promise((function(a,c){var i=t.result.host,s=t.result.signature,u=t.result.AccessKeyId,l=t.result.policy,d="ouchelp/"+n+"."+o;e.uploadFile({url:i,filePath:r,name:"file",formData:{key:d,policy:l,ossAccessKeyId:u,signature:s},success:function(e){204===e.statusCode?a(d):(console.log("请求成功，但是上传失败！"),c("请求成功，但是上传失败！"))},fail:function(e){console.log("请求失败！"),c("请求失败！")}})}))},uploadToOSS:function(){var t=this;return s(r.default.mark((function n(){var o,a,c,i,s;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o="https://dryang-miniapp.oss-accelerate.aliyuncs.com",(new Date).getTime(),n.next=4,e.$http.post("/get_token/");case 4:for(a=n.sent,c=a.data,i=[],s=0;s<t.$data.md5Arr.length;s++)i.push(t.uploadImg(c,t.$data.md5Arr[s],t.$data.tempPaths[s],t.$data.tempPaths[s].split(".")[1]));Promise.all(i).then((function(e){e.forEach((function(e){t.$data.uploadImgs.push(o+"/"+e)}))})).catch((function(e){}));case 9:case"end":return n.stop()}}),n)})))()},getOcr:function(){var e=this;return s(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.ocring=!0,console.log("getOcr"),wx.serviceMarket.invokeService({service:"wx79ac3de8be320b71",api:"OcrAllInOne",data:{img_url:e.uploadImgs[0],data_type:3,ocr_type:8}}).then((function(t){console.log("invokeService success",t);var n=t.data.ocr_comm_res.items;console.log("ocrRes: ",n);var r=n.filter((function(e){return-1!=e.text.indexOf("学工号")})),o=-1;n.forEach((function(e,t){e.text==r[0].text&&(o=t)})),console.log("stuNumIndex: ",o),e.ocrResStuNum=r[0].text.split(":")[1],console.log("this.ocrResStuNum: ",e.ocrResStuNum),e.ocrResName=n[o-1].text,console.log("this.ocrResName: ",e.ocrResName),e.ocring=!1})).catch((function(e){console.error("invokeService fail",e),wx.showModal({title:"fail",content:e+""})}));case 3:case"end":return t.stop()}}),t)})))()},MyUpload:function(){var t=this;return s(r.default.mark((function n(){var o,a,c,i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(i=function(){return i=s(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a.uploadImgs.length===a.$data.tempPaths.length&&(console.log("上传完成"),9==a.classes&&0==a.ocring&&(console.log("that.ocring: ",a.ocring),console.log("ocrResStuNum",a.ocrResStuNum),clearInterval(o),a.uploadPost()),9==a.classes&&null==a.ocring?(console.log("that.ocring: ",a.ocring),a.getOcr()):9!=a.classes&&(clearInterval(o),a.uploadPost()));case 1:case"end":return e.stop()}}),e)}))),i.apply(this,arguments)},c=function(){return i.apply(this,arguments)},1!=t.uploading){n.next=4;break}return n.abrupt("return");case 4:if(0!=t.classes){n.next=8;break}return n.abrupt("return",e.$showMsg("请选择物品类型"));case 8:if(""!=t.itemName){n.next=12;break}return n.abrupt("return",e.$showMsg("请输入物品名称"));case 12:if(""!=t.description){n.next=16;break}return n.abrupt("return",e.$showMsg("为了更快地找到".concat(1==t.query.type?"物品":"失主",",请输入必要的描述信息")));case 16:if(""!=t.time){n.next=18;break}return n.abrupt("return",e.$showMsg("请输入".concat(1==t.query.type?"遗失":"拾到","时间")));case 18:t.uploading=!0,0!=t.md5Arr.length&&t.uploadToOSS(),o=setInterval(c,500),a=t;case 22:case"end":return n.stop()}}),n)})))()},uploadPost:function(){var t=this;return s(r.default.mark((function n(){var o,a,c,i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o={},o.type=t.query.type,o.name=t.itemName,o.time=t.time,o.position=t.position,o.color=""==t.itemColor?"无":t.itemColor,o.describe=t.description,o.kindID=t.classes,o.openid=t.token,o.picture_address=t.uploadImgs,a=null,9==t.classes&&(a={},a["stuNum"]=t.ocrResStuNum,a["stuName"]=t.ocrResName),n.next=14,e.$http.post("/addposts/",{postitem:o,query:a});case 14:c=n.sent,i=c.data,console.log("res",i),t.uploading=!1,200==i.code&&e.redirectTo({url:"/subpkg/uploadSuccess/uploadSuccess?type="+i.type+"&postId="+i["post_ID"]}).catch((function(){return e.$showMsg(err)}));case 19:case"end":return n.stop()}}),n)})))()},selectChange:function(e){console.log(e)},onchange:function(t){console.log("onchange:",t),9==this.classes&&e.showModal({title:"提示",content:this.stuCardText,showCancel:!1,success:function(e){e.confirm&&console.log("用户点击确定")}})},addressClickHandler:function(){}}),computed:l({},(0,a.mapState)("m_user",["leftNav","stuInfo","token"])),onLoad:function(t){this.query=t;var n=new Date,r=n.getFullYear(),o=n.getMonth()+1,a=n.getDate();this.$data.nowDate=r+"-"+o+"-"+a,1==this.query.type?e.setNavigationBarTitle({title:"发布寻物启事"}):e.setNavigationBarTitle({title:"发布招领启事"}),this.dataTree=this.leftNav},onReady:function(){1==this.query.type?e.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#add3e8"}):e.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#f5c66a"})}};t.default=f}).call(this,n(1)["default"])},105:function(e,t,n){"use strict";n.r(t);var r=n(106),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a},106:function(e,t,n){},99:function(e,t,n){"use strict";(function(e){n(5);r(n(4));var t=r(n(100));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(1)["createPage"])}},[[99,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/uploadGoods/uploadGoods.js.map