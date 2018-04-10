webpackJsonp([2,0],{0:function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}var a=n(205),o=s(a);n(267);var i=n(303),r=s(i);n(52),o.default.config.ignoredElements=["home","product"],n(268),n(277),window.vm=new o.default({el:"#app",template:"<App/>",components:{App:r.default}})},34:function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(214),o=s(a),i=n(274),r=s(i),u=n(71),c=s(u),l=new c.default,f=void 0;e.default=new o.default(function(t,e){if(f)t(f);else var n=new r.default("MgrApp.db",{adapter:l,autoload:!0,autoloadCallback:function(){f={user:n.getCollection("user")?n.getCollection("user"):n.addCollection("user")},t(f)},autosave:!0,autosaveInterval:1e3})})},52:function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(215),o=s(a),i=n(216),r=s(i),u=n(28),c=(s(u),n(1)),l=(s(c),n(279)),f=s(l),d=n(284),p=s(d),j=n(34),v=(s(j),function(){function t(){(0,o.default)(this,t),this.sock=(0,f.default)(),this.sock.on("connect",this.on_connect.bind(this))}return(0,r.default)(t,[{key:"register_ui_evt",value:function(){var t=this;vm.$on("notify_seller_status",function(e){t.emit("notify_seller_status",e)})}},{key:"on_connect",value:function(){alert("on_connect local nodejs server")}},{key:"on_update_order_state",value:function(t){vm.$emit("update_order_state",t)}},{key:"on_refresh_file_list",value:function(t){vm.$emit("refresh_file_list","")}},{key:"upload_file",value:function(t){var e=p.default.createStream(),n=p.default.createBlobReadStream(t);(0,p.default)(this.sock).emit("upload_file",e,{name:t.name,type:t.type,size:t.size,metadata:""});var s=0;n.on("data",function(e){s+=e.length;var n=Math.floor(s/t.size*100);vm.$emit("on_load_progress",n)}),n.pipe(e)}},{key:"emit",value:function(t,e,n){this.sock&&this.sock.emit(t,e,n)}}]),t}());e.default=new v},209:function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(304),o=s(a),i=n(305),r=s(i);e.default={name:"app",data:function(){return{app:phonon.navigator()}},mounted:function(){var t=this;this.$nextTick(function(){phonon.options({navigator:{defaultPage:"home",animatePages:!0,enableBrowserBackButton:!0},i18n:null}),window.setTimeout(function(){t.app.start()},500)})},components:{Home:o.default,Product:r.default}}},210:function(t,e,n){(function(t){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),o=(s(a),n(28)),i=(s(o),n(191)),r=s(i),u=n(34),c=(s(u),n(52)),l=s(c),f=n(212);s(f);e.default={name:"PhononHomePage",props:{app:{type:Object}},created:function(){var t=this;this.$root.$on("on_load_progress",function(e){t.progress=e})},mounted:function(){this.app.on({page:"home",preventClose:!1,content:null},this)},data:function(){return{progress:0,address:""}},computed:{is_empty:function(){return""}},methods:{upload_file:function(){t('input[type="file"]').click()},processFile:function(t){if(0!=t.target.files.length){var e=t.target.files[0],n=["mp4","png","jpg","gif","bmp"],s=e.name.split(".").pop().toLowerCase(),a=n.indexOf(s)>-1;if(a)l.default.upload_file(e);else var o=new r.default({text:"文件格式错误，只能上传媒体文件。",layout:"center",buttons:[r.default.button("确定","blue lighten-1",function(){console.log("button 2 clicked"),o.close()})]}).show()}},test_sock:function(){l.default.emit("ferret","",function(t){alert(t)})},register_user:function(t){},onReady:function(){}}}}).call(e,n(45))},211:function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(205),o=(s(a),n(1)),i=(s(o),n(28)),r=(s(i),n(34)),u=s(r);e.default={name:"PhononProduct",props:{app:{type:Object}},data:function(){return{products:[],saved:!0}},mounted:function(){this.app.on({page:"product",preventClose:!0},this)},methods:{onReady:function(){this.fill_product()},onClose:function(t){if(this.saved)t.close();else{var e=phonon.confirm("商品信息尚未保存","确认离开吗？",!0,"确认","取消");e.on("confirm",function(){t.close()}),e.on("cancel",function(){})}},onHidden:function(){this.action=!0},onHashChanged:function(t){},save_item:function(t){var e=this;u.default.then(function(n){n.product.findAndUpdate({$loki:t.$loki},function(e){return t}),phonon.alert("商品信息修改成功","保存成功"),e.fill_product()})},delete_item:function(t){var e=this;u.default.then(function(n){n.product.remove(t),e.fill_product()})},fill_product:function(){var t=this;u.default.then(function(e){t.products=e.product.find({})})},add_product:function(){var t=this;u.default.then(function(e){t.products=e.product.insert({name:"测试商品",price:.01}),t.fill_product()})}}}},212:function(t,e,n){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}function a(t){var e="";return t&f.WX_FS&&(e="微信"),t&f.ALI_FS&&(e?e+="/支付宝":e="支付宝"),e}function o(t){return t&f.WX_FS}function i(t){return t&f.ALI_FS}function r(t){return t.split("").map(function(t){return t.charCodeAt(0)}).reduce(function(t,e){return t+((t<<7)+(t<<3))^e}).toString(16)}Object.defineProperty(e,"__esModule",{value:!0});var u=n(191),c=(s(u),n(28)),l=(s(c),n(1)),f=(s(l),{WX_GZH:1,WX_ZS:2,WX_FS:4,WX_H5:8,ALI_WAP:16,ALI_ZS:32,ALI_FS:64,ALI_PAGE:128});e.default={ability_title:a,is_wx_capable:o,is_ali_capable:i,hash_str:r}},267:function(t,e){},268:function(t,e){},269:function(t,e){},270:function(t,e){},271:function(t,e){},275:function(t,e,n){function s(t){return n(a(t))}function a(t){return o[t]||function(){throw new Error("Cannot find module '"+t+"'.")}()}var o={"./af":72,"./af.js":72,"./ar":79,"./ar-dz":73,"./ar-dz.js":73,"./ar-kw":74,"./ar-kw.js":74,"./ar-ly":75,"./ar-ly.js":75,"./ar-ma":76,"./ar-ma.js":76,"./ar-sa":77,"./ar-sa.js":77,"./ar-tn":78,"./ar-tn.js":78,"./ar.js":79,"./az":80,"./az.js":80,"./be":81,"./be.js":81,"./bg":82,"./bg.js":82,"./bm":83,"./bm.js":83,"./bn":84,"./bn.js":84,"./bo":85,"./bo.js":85,"./br":86,"./br.js":86,"./bs":87,"./bs.js":87,"./ca":88,"./ca.js":88,"./cs":89,"./cs.js":89,"./cv":90,"./cv.js":90,"./cy":91,"./cy.js":91,"./da":92,"./da.js":92,"./de":95,"./de-at":93,"./de-at.js":93,"./de-ch":94,"./de-ch.js":94,"./de.js":95,"./dv":96,"./dv.js":96,"./el":97,"./el.js":97,"./en-au":98,"./en-au.js":98,"./en-ca":99,"./en-ca.js":99,"./en-gb":100,"./en-gb.js":100,"./en-ie":101,"./en-ie.js":101,"./en-nz":102,"./en-nz.js":102,"./eo":103,"./eo.js":103,"./es":106,"./es-do":104,"./es-do.js":104,"./es-us":105,"./es-us.js":105,"./es.js":106,"./et":107,"./et.js":107,"./eu":108,"./eu.js":108,"./fa":109,"./fa.js":109,"./fi":110,"./fi.js":110,"./fo":111,"./fo.js":111,"./fr":114,"./fr-ca":112,"./fr-ca.js":112,"./fr-ch":113,"./fr-ch.js":113,"./fr.js":114,"./fy":115,"./fy.js":115,"./gd":116,"./gd.js":116,"./gl":117,"./gl.js":117,"./gom-latn":118,"./gom-latn.js":118,"./gu":119,"./gu.js":119,"./he":120,"./he.js":120,"./hi":121,"./hi.js":121,"./hr":122,"./hr.js":122,"./hu":123,"./hu.js":123,"./hy-am":124,"./hy-am.js":124,"./id":125,"./id.js":125,"./is":126,"./is.js":126,"./it":127,"./it.js":127,"./ja":128,"./ja.js":128,"./jv":129,"./jv.js":129,"./ka":130,"./ka.js":130,"./kk":131,"./kk.js":131,"./km":132,"./km.js":132,"./kn":133,"./kn.js":133,"./ko":134,"./ko.js":134,"./ky":135,"./ky.js":135,"./lb":136,"./lb.js":136,"./lo":137,"./lo.js":137,"./lt":138,"./lt.js":138,"./lv":139,"./lv.js":139,"./me":140,"./me.js":140,"./mi":141,"./mi.js":141,"./mk":142,"./mk.js":142,"./ml":143,"./ml.js":143,"./mr":144,"./mr.js":144,"./ms":146,"./ms-my":145,"./ms-my.js":145,"./ms.js":146,"./mt":147,"./mt.js":147,"./my":148,"./my.js":148,"./nb":149,"./nb.js":149,"./ne":150,"./ne.js":150,"./nl":152,"./nl-be":151,"./nl-be.js":151,"./nl.js":152,"./nn":153,"./nn.js":153,"./pa-in":154,"./pa-in.js":154,"./pl":155,"./pl.js":155,"./pt":157,"./pt-br":156,"./pt-br.js":156,"./pt.js":157,"./ro":158,"./ro.js":158,"./ru":159,"./ru.js":159,"./sd":160,"./sd.js":160,"./se":161,"./se.js":161,"./si":162,"./si.js":162,"./sk":163,"./sk.js":163,"./sl":164,"./sl.js":164,"./sq":165,"./sq.js":165,"./sr":167,"./sr-cyrl":166,"./sr-cyrl.js":166,"./sr.js":167,"./ss":168,"./ss.js":168,"./sv":169,"./sv.js":169,"./sw":170,"./sw.js":170,"./ta":171,"./ta.js":171,"./te":172,"./te.js":172,"./tet":173,"./tet.js":173,"./th":174,"./th.js":174,"./tl-ph":175,"./tl-ph.js":175,"./tlh":176,"./tlh.js":176,"./tr":177,"./tr.js":177,"./tzl":178,"./tzl.js":178,"./tzm":180,"./tzm-latn":179,"./tzm-latn.js":179,"./tzm.js":180,"./uk":181,"./uk.js":181,"./ur":182,"./ur.js":182,"./uz":184,"./uz-latn":183,"./uz-latn.js":183,"./uz.js":184,"./vi":185,"./vi.js":185,"./x-pseudo":186,"./x-pseudo.js":186,"./yo":187,"./yo.js":187,"./zh-cn":188,"./zh-cn.js":188,"./zh-hk":189,"./zh-hk.js":189,"./zh-tw":190,"./zh-tw.js":190};s.keys=function(){return Object.keys(o)},s.resolve=a,t.exports=s,s.id=275},303:function(t,e,n){n(269);var s=n(51)(n(209),n(306),null,null);t.exports=s.exports},304:function(t,e,n){n(270);var s=n(51)(n(210),n(307),"data-v-2afcb124",null);t.exports=s.exports},305:function(t,e,n){n(271);var s=n(51)(n(211),n(308),"data-v-43fcb3ba",null);t.exports=s.exports},306:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("home",{attrs:{app:t.app}}),t._v(" "),n("product",{attrs:{app:t.app}})],1)},staticRenderFns:[]}},307:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("home",{attrs:{"data-page":"true"}},[n("header",{staticClass:"header-bar"},[n("div",{staticClass:"center"},[n("h1",{staticClass:"title"},[t._v("【音乐/书籍】上传")])])]),t._v(" "),n("div",{staticClass:"content"},[n("input",{attrs:{type:"file"},on:{change:function(e){t.processFile(e)}}}),t._v(" "),n("div",{staticStyle:{"justify-content":"space-around","margin-top":"10px"}},[n("button",{staticClass:"btn",staticStyle:{flex:"1","margin-top":"20px"},on:{click:function(e){e.preventDefault(),t.upload_file()}}},[n("h3",{staticStyle:{display:"inline-block",margin:"auto"}},[t._v("\n          上传文件\n        ")])]),t._v(" \n      "+t._s(t.progress)+"\n      "),n("button",{staticClass:"btn",staticStyle:{flex:"1","margin-top":"20px"},on:{click:function(e){e.preventDefault(),t.test_sock()}}},[n("h3",{staticStyle:{display:"inline-block",margin:"auto"}},[t._v("\n          test socket.io\n        ")])])])])])},staticRenderFns:[]}},308:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("product",{attrs:{"data-page":"true"}},[n("header",{staticClass:"header-bar"},[n("div",{staticClass:"center"},[n("button",{staticClass:"btn pull-left icon icon-arrow-back",attrs:{"data-navigation":"$previous-page"}}),t._v(" "),n("h1",{staticClass:"title"},[t._v("商品管理")])])]),t._v(" "),n("div",{staticClass:"content"},[n("div",{staticClass:"padded-full"},[n("ul",{staticClass:"list"},t._l(t.products,function(e){return n("li",[n("div",{staticClass:"item"},[n("div",[n("div",{staticClass:"caption"},[t._v("名称：")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"p.name"}],attrs:{placeholder:"名称"},domProps:{value:e.name},on:{input:function(n){n.target.composing||t.$set(e,"name",n.target.value)}}})]),t._v(" "),n("div",[n("div",{staticClass:"caption"},[t._v("价格(元)：")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.price,expression:"p.price",modifiers:{number:!0}}],attrs:{type:"number",placeholder:"价格(元)",onclick:"this.select()"},domProps:{value:e.price},on:{input:function(n){n.target.composing||t.$set(e,"price",t._n(n.target.value))},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),n("div",{staticClass:"opertion"},[n("button",{staticClass:"btn primary",on:{click:function(n){n.preventDefault(),t.save_item(e)}}},[t._v("保存")]),t._v(" "),n("button",{staticClass:"btn negative",on:{click:function(n){n.preventDefault(),t.delete_item(e)}}},[t._v("删除")])])])])})),t._v(" "),n("button",{staticClass:"btn fit-parent positive",staticStyle:{"margin-top":"15px"},on:{click:function(e){e.preventDefault(),t.add_product()}}},[t._v("添加商品")])])])])},staticRenderFns:[]}},309:function(t,e){},310:function(t,e){},311:function(t,e){}});
//# sourceMappingURL=app.4e2b6807f17e37eb7747.js.map