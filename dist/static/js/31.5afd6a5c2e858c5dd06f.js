webpackJsonp([31],{"5/FN":function(t,a){},KV3v:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("Xxa5"),n=e.n(s),i=e("exGp"),r=e.n(i),l=e("mtWM"),c=e.n(l),o=e("Au9i"),u={name:"health-records-list",data:function(){return{createdList:[],abnormalList:[],elseList:[],normalList:[],memberID:""}},created:function(){},mounted:function(){this.memberID=window._member_id,this.getFamilyList(),this.initList()},methods:{getIndex:function(t){for(var a=t.parentNode.children,e=0;e<a.length;e++)if(a[e]==t)return e},switchTab:function(t,a){o.Indicator.open({text:"加载中...",spinnerType:"fading-circle"});for(var e=t.target,s=e.parentNode,n=s.children,i=this.getIndex(e),r=72*(i-2)+27,l=0;l<n.length;l++)n[l].classList.remove("active");if(e.classList.add("active"),s.parentNode.scrollLeft>r&&r>0&&i!=n.length-1&&i!=n.length-2)var c=setInterval(function(){s.parentNode.scrollLeft-=10,s.parentNode.scrollLeft<=r&&(s.parentNode.scrollLeft=r,clearInterval(c))},20);else if(s.parentNode.scrollLeft<r&&r>0&&i!=n.length-1&&i!=n.length-2)var u=setInterval(function(){s.parentNode.scrollLeft+=10,s.parentNode.scrollLeft>=r&&(s.parentNode.scrollLeft=r,clearInterval(u))},20);window._member_id=a,this.initList()},getFamilyList:function(){var t=this;return r()(n.a.mark(function a(){var e;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,c.a.get("/api/family");case 3:"C0000"===(e=a.sent).data.code&&(t.createdList=e.data.data[0]),a.next=10;break;case 7:a.prev=7,a.t0=a.catch(0),console.log(a.t0);case 10:case"end":return a.stop()}},a,t,[[0,7]])}))()},initList:function(){var t=this;return r()(n.a.mark(function a(){var e;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,c.a.get("/api/health/status?member_id="+window._member_id);case 3:"C0000"===(e=a.sent).data.code&&(console.log(e),t.abnormalList=e.data.data.abnormal_list,t.elseList=e.data.data.else_list,t.normalList=e.data.data.normal_list,o.Indicator.close()),a.next=11;break;case 7:a.prev=7,a.t0=a.catch(0),console.log("err: ",a.t0),o.Indicator.close();case 11:case"end":return a.stop()}},a,t,[[0,7]])}))()},goRecordsBody:function(){this.$router.push({path:"/healthRecordsB"})},manualEntry:function(){this.$router.push({path:"/manualEntry"})},goFamilyManage:function(){this.$router.push({path:"/familyManagement"})},goPages:function(t){var a=this;return r()(n.a.mark(function e(){var s;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=t.moudle_name,e.next="血压"===e.t0?3:"心电"===e.t0?6:"体重"===e.t0?9:"血糖"===e.t0?26:"体温"===e.t0?29:"血氧"===e.t0?32:35;break;case 3:return window._pressure_selected_date="",a.$router.push({path:"/pressure"}),e.abrupt("break",35);case 6:return window._ecg_selected_date="",a.$router.push({path:"/ecg"}),e.abrupt("break",35);case 9:if(""!==window._member_id){e.next=22;break}return e.prev=10,e.next=13,c.a.post("/api/user/info",{phone:""});case 13:"C0000"===(s=e.sent).data.code&&(""===s.data.data.target_weight||0===s.data.data.target_weight?a.$router.push({path:"/setTargetWeight"}):a.$router.push({path:"/weight"})),e.next=20;break;case 17:e.prev=17,e.t1=e.catch(10),console.log(e.t1);case 20:e.next=24;break;case 22:1===a.createdList.filter(function(t){return t.member_id===window._member_id})[0].is_first_set_tw?a.$router.push({path:"/setTargetWeight"}):a.$router.push({path:"/weight"});case 24:return window._weight_selected_date="",e.abrupt("break",35);case 26:return window._suger_selected_date="",a.$router.push({path:"/bloodSugar"}),e.abrupt("break",35);case 29:return window._temperature_selected_date="",a.$router.push({path:"/temperature"}),e.abrupt("break",35);case 32:return window._oxygen_selected_date="",a.$router.push({path:"/oxygen"}),e.abrupt("break",35);case 35:case"end":return e.stop()}},e,a,[[10,17]])}))()}}},_={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"page health-records-list"},[e("h-header",{attrs:{title:"健康档案",showBack:!1}}),t._v(" "),e("i",{staticClass:"fa fa-th-large",on:{click:t.goRecordsBody}}),t._v(" "),e("div",{staticClass:"container has-header has-footer"},[e("div",{staticClass:"character-list card-container overflowH"},[e("span",{staticClass:"left"}),t._v(" "),e("span",{staticClass:"right"}),t._v(" "),e("div",{staticClass:"tab-list"},[e("ul",{staticClass:"list"},[e("li",{class:""===t.memberID?"active":"",on:{click:function(a){t.switchTab(a,"")}}},[t._v("我")]),t._v(" "),t._l(t.createdList,function(a,s){return e("li",{key:s,class:t.memberID===a.member_id?"active":"",on:{click:function(e){t.switchTab(e,a.member_id)}}},[t._v(t._s(a.relation_name))])})],2)]),t._v(" "),e("i",{staticClass:"fa icon-home",on:{click:t.goFamilyManage}})]),t._v(" "),e("div",{staticClass:"health-list card-container"},[e("ul",t._l(t.abnormalList,function(a,s){return e("li",{key:s,staticClass:"clearfix",on:{click:function(e){t.goPages(a)}}},[e("div",{staticClass:"float-left"},["血压"===a.moudle_name?e("span",[e("i",{staticClass:"red icon-pressure"})]):"心电"===a.moudle_name?e("span",[e("i",{staticClass:"red icon-ecg"})]):"体重"===a.moudle_name?e("span",[e("i",{staticClass:"red icon-weight"})]):"血糖"===a.moudle_name?e("span",[e("i",{staticClass:"red icon-blood-sugar"})]):"体温"===a.moudle_name?e("span",[e("i",{staticClass:"red icon-temperature"})]):"血氧"===a.moudle_name?e("span",[e("i",{staticClass:"red icon-oxygen"})]):t._e()]),t._v(" "),e("div",{staticClass:"float-right clearfix"},[e("div",{staticClass:"title"},[t._v(t._s(a.moudle_name))]),t._v(" "),"0"!==a.value?e("div",{staticClass:"num"},[t._v("\n              "+t._s(a.value)+"\n              "),"血压"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("mmHg")]):t._e(),t._v(" "),"心电"===a.moudle_name?e("span",{staticClass:"unit"}):t._e(),t._v(" "),"体重"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("kg")]):t._e(),t._v(" "),"血糖"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("mmol/L")]):t._e(),t._v(" "),"体温"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("℃")]):t._e(),t._v(" "),"血氧"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("%")]):t._e()]):e("div",{staticClass:"num"}),t._v(" "),e("i",{staticClass:"fa fa-angle-right"})])])}))]),t._v(" "),e("div",{staticClass:"health-list card-container"},[e("ul",t._l(t.normalList,function(a,s){return e("li",{key:s,staticClass:"clearfix",on:{click:function(e){t.goPages(a)}}},[e("div",{staticClass:"float-left"},["血压"===a.moudle_name?e("span",[e("i",{staticClass:"normal icon-pressure"})]):"心电"===a.moudle_name?e("span",[e("i",{staticClass:"normal icon-ecg"})]):"体重"===a.moudle_name?e("span",[e("i",{staticClass:"normal icon-weight"})]):"血糖"===a.moudle_name?e("span",[e("i",{staticClass:"normal icon-blood-sugar"})]):"体温"===a.moudle_name?e("span",[e("i",{staticClass:"normal icon-temperature"})]):"血氧"===a.moudle_name?e("span",[e("i",{staticClass:"normal icon-oxygen"})]):t._e()]),t._v(" "),e("div",{staticClass:"float-right clearfix"},[e("div",{staticClass:"title"},[t._v(t._s(a.moudle_name))]),t._v(" "),"0"!==a.value?e("div",{staticClass:"num"},[t._v("\n              "+t._s(a.value)+"\n              "),"血压"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("mmHg")]):t._e(),t._v(" "),"心电"===a.moudle_name?e("span",{staticClass:"unit"}):t._e(),t._v(" "),"体重"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("kg")]):t._e(),t._v(" "),"血糖"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("mmol/L")]):t._e(),t._v(" "),"体温"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("℃")]):t._e(),t._v(" "),"血氧"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("%")]):t._e()]):e("div",{staticClass:"num"}),t._v(" "),e("i",{staticClass:"fa fa-angle-right"})])])}))]),t._v(" "),e("div",{staticClass:"health-list card-container"},[e("ul",t._l(t.elseList,function(a,s){return e("li",{key:s,staticClass:"clearfix",on:{click:function(e){t.goPages(a)}}},[e("div",{staticClass:"float-left"},["血压"===a.moudle_name?e("span",[e("i",{staticClass:"normal icon-pressure"})]):"心电"===a.moudle_name?e("span",[e("i",{staticClass:"normal icon-ecg"})]):"体重"===a.moudle_name?e("span",[e("i",{staticClass:"normal icon-weight"})]):"血糖"===a.moudle_name?e("span",[e("i",{staticClass:"normal icon-blood-sugar"})]):"体温"===a.moudle_name?e("span",[e("i",{staticClass:"normal icon-temperature"})]):"血氧"===a.moudle_name?e("span",[e("i",{staticClass:"normal icon-oxygen"})]):t._e()]),t._v(" "),e("div",{staticClass:"float-right clearfix"},[e("div",{staticClass:"title"},[t._v(t._s(a.moudle_name))]),t._v(" "),"0"!==a.value?e("div",{staticClass:"num"},[t._v("\n              "+t._s(a.value)+"\n              "),"血压"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("mmHg")]):t._e(),t._v(" "),"心电"===a.moudle_name?e("span",{staticClass:"unit"}):t._e(),t._v(" "),"体重"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("kg")]):t._e(),t._v(" "),"血糖"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("mmol/L")]):t._e(),t._v(" "),"体温"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("℃")]):t._e(),t._v(" "),"血氧"===a.moudle_name?e("span",{staticClass:"unit"},[t._v("%")]):t._e()]):e("div",{staticClass:"num"}),t._v(" "),e("i",{staticClass:"fa fa-angle-right"})])])}))])]),t._v(" "),e("div",{staticClass:"footer"},[e("button",{staticClass:"entry text-center",on:{click:t.manualEntry}},[t._v("手动录入")])])],1)},staticRenderFns:[]};var d=e("VU/8")(u,_,!1,function(t){e("5/FN")},"data-v-1f6587e2",null);a.default=d.exports}});
//# sourceMappingURL=31.5afd6a5c2e858c5dd06f.js.map