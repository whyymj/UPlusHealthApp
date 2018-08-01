webpackJsonp([16],{"/Qo6":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("BO1k"),i=a.n(n),s=a("Xxa5"),r=a.n(s),o=a("exGp"),l=a.n(o),c=a("mtWM"),d=a.n(c),u={name:"weight",data:function(){return{ChooseTypePopupVisible:!1,weightRecordData:[],weightLevel:"",newsResult:[],calendarOpen:!1,bluetoothVisible:!1,popupSuccess:!1,popupVisible:!1,bluetoothFail:!1,recordOptions:["BMI","体重"],selectedRecordOption:"体重",weightChartsOption:this.getChartsOption([],[],""),weightDate:"",month:"",year:"",show:!0,value:"",range:!1,showLastMonth:!0,showNextMonth:!0,highlightWeekend:!1,return6Rows:!0,hideHeader:!1,hideWeekList:!1,replaceTextList:{},replace:!1,changeWeeksList:!1,weeksList:[],useCustomFn:!1,buildSlotFn:function(){return""},disablePast:!1,disableFuture:!0,disableWeekend:!1,disableDateFunction:function(e){return!1}}},mounted:function(){this.initList(),this.$nextTick(function(){this.chartOption(),document.getElementsByClassName("calendar-header")[0].style.display="none",window._weight_selected_date&&(this.value=window._weight_selected_date,this.toggleOpenCalendar())})},methods:{goManualEntry:function(e){this.$router.push({path:"/manualEntry/"+e})},addNewDevice:function(){this.$router.push({path:"/deviceType"})},addRecentlyDevice:function(){this.bluetoothVisible=!0},openBluetooth:function(){this.bluetoothVisible=!1,this.popupVisible=!0},toggleOpenCalendar:function(){var e=this;this.calendarOpen=!this.calendarOpen,"none"===document.getElementsByClassName("calendar-header")[0].style.display?document.getElementsByClassName("calendar-header")[0].style.display="block":document.getElementsByClassName("calendar-header")[0].style.display="none",setTimeout(function(){e.onlyShowCurrentOrToday(e.calendarOpen)},0)},initNews:function(){var e=this;return l()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.get("/api/news?id=1&level="+e.weightLevel);case 3:a=t.sent,console.log("result: ",a),e.newsResult=a.data,t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log("err: ",t.t0);case 11:case"end":return t.stop()}},t,e,[[0,8]])}))()},initList:function(){var e=this;return l()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.get("/api/weight/three?member_id="+window._member_id+"&date="+e.weightDate+"&limit=N");case 3:"C0000"===(a=t.sent).data.code&&(0===a.data.data.length?(e.weightRecordData=[],e.$refs.noData.style.display="block",e.$refs.allData.style.display="none"):(e.$refs.noData.style.display="none",a.data.data.length>3?(a.data.data.splice(3),e.$refs.allData.style.display="block",e.weightRecordData=a.data.data):(e.$refs.allData.style.display="none",e.weightRecordData=a.data.data),e.weightLevel=e.weightRecordData[0].suggestion.level),e.initNews()),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log("Whoops: ",t.t0);case 10:case"end":return t.stop()}},t,e,[[0,7]])}))()},initDateList:function(){var e=this;return l()(r.a.mark(function t(){var a,n,i,s,o,l,c,u,p,h;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.a.get("/api/health/list?member_id="+window._member_id+"&flag=1&begin="+e.firstDate+"&end="+e.lastDate);case 3:if("C0000"!==(a=t.sent).data.code){t.next=27;break}for(console.log(a),n=a.data.data.date_list,i=document.getElementsByTagName("td"),s=i.length,o=document.getElementsByClassName("calendar-data"),l=o.length,c=0;c<l;c++)o[0].parentNode.removeChild(o[0]);u=0;case 13:if(!(u<n.length)){t.next=27;break}p=0;case 15:if(!(p<s)){t.next=24;break}if((h=document.createElement("span")).classList.add("calendar-data"),i[p].getAttribute("data-date")!==n[u]){t.next=21;break}return i[p].appendChild(h),t.abrupt("break",24);case 21:p++,t.next=15;break;case 24:u++,t.next=13;break;case 27:t.next=32;break;case 29:t.prev=29,t.t0=t.catch(0),console.log("err: ",t.t0);case 32:case"end":return t.stop()}},t,e,[[0,29]])}))()},chartOption:function(e){var t=this;return l()(r.a.mark(function a(){var n,i,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,d.a.get("/api/weight/type?member_id="+window._member_id+"&date="+t.weightDate);case 3:if("C0000"!==(n=a.sent).data.code){a.next=49;break}if(0!==n.data.data.length){a.next=10;break}t.$refs.noWeight.style.display="block",t.$refs.weight.$el.style.display="none",a.next=49;break;case 10:t.$refs.noWeight.style.display="none",t.$refs.weight.$el.style.display="block",t.$refs.weight.$children[0]&&t.$refs.weight.$children[0].clear(),i=n.data.data.map(function(e){return e.create_date}),s=void 0,a.t0=t.selectedRecordOption,a.next="水分"===a.t0?18:"肌肉率"===a.t0?20:"体重"===a.t0?22:"体脂率"===a.t0?24:"BMI"===a.t0?26:"基础代谢"===a.t0?28:"水含量"===a.t0?30:"骨量"===a.t0?32:"身体年龄"===a.t0?34:"内脏脂肪等级"===a.t0?36:"脂肪重量"===a.t0?38:"肌肉重量"===a.t0?40:"肥胖度"===a.t0?42:"去脂体重"===a.t0?44:"蛋白质"===a.t0?46:48;break;case 18:return s=n.data.data.map(function(e){return e.water_percent}),a.abrupt("break",48);case 20:return s=n.data.data.map(function(e){return e.muscle_percent}),a.abrupt("break",48);case 22:return s=n.data.data.map(function(e){return e.weight}),a.abrupt("break",48);case 24:return s=n.data.data.map(function(e){return e.axunge_percent}),a.abrupt("break",48);case 26:return s=n.data.data.map(function(e){return e.bmi}),a.abrupt("break",48);case 28:return s=n.data.data.map(function(e){return e.basal_metabolic}),a.abrupt("break",48);case 30:return s=n.data.data.map(function(e){return e.water}),a.abrupt("break",48);case 32:return s=n.data.data.map(function(e){return e.bone}),a.abrupt("break",48);case 34:return s=n.data.data.map(function(e){return e.body_age}),a.abrupt("break",48);case 36:return s=n.data.data.map(function(e){return e.viscera}),a.abrupt("break",48);case 38:return s=n.data.data.map(function(e){return e.axunge}),a.abrupt("break",48);case 40:return s=n.data.data.map(function(e){return e.muscle}),a.abrupt("break",48);case 42:return s=n.data.data.map(function(e){return e.obesity}),a.abrupt("break",48);case 44:return s=n.data.data.map(function(e){return e.fat_free_weight}),a.abrupt("break",48);case 46:return s=n.data.data.map(function(e){return e.protein}),a.abrupt("break",48);case 48:0!==t.$refs.weight.$children.length&&(t.$refs.weight.$children[0].mergeOptions(t.getChartsOption(i,s,t.selectedRecordOption)),t.$refs.weight.$children[0].chart._api.getZr().on("mouseup",function(){t.$refs.weight.$children[0].chart._api.dispatchAction({type:"hideTip"})}));case 49:a.next=54;break;case 51:a.prev=51,a.t1=a.catch(0),console.log("Whoops: ",a.t1);case 54:e&&e();case 55:case"end":return a.stop()}},a,t,[[0,51]])}))()},changeOption:function(e){var t=this;console.log(e),this.selectedRecordOption=e,this.fadeout(this.$refs.weight.$el,150,function(){t.chartOption(function(){t.fadein(t.$refs.weight.$el,300)})})},deleteRecord:function(e,t){var a=this;return l()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.post("/api/weight/delete",{weight_id:t.weight.weight_id});case 3:"C0000"===e.sent.data.code&&(a.chartOption(),a.initList(),a.initDateList(),console.log("delete success")),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("Whoops: ",e.t0);case 10:case"end":return e.stop()}},e,a,[[0,7]])}))()},onChange:function(e){var t=this;console.log("on-change",e),window._weight_selected_date=e,this.weightDate=e,this.initList(),document.getElementById("calendarTop").classList.remove("open"),document.getElementById("calendarBg").classList.remove("open"),document.getElementById("calendarBelow").classList.remove("open"),this.calendarOpen=!this.calendarOpen,"none"===document.getElementsByClassName("calendar-header")[0].style.display?document.getElementsByClassName("calendar-header")[0].style.display="block":document.getElementsByClassName("calendar-header")[0].style.display="none",setTimeout(function(){t.onlyShowCurrentOrToday(t.calendarOpen)},0)},onViewChange:function(e,t){var a=this;console.log("on view change",e,t),this.firstDate=e.firstDate,this.lastDate=e.lastDate,this.month=e.month<10?"0"+e.month:e.month,this.year=e.year,setTimeout(function(){a.initDateList(),a.onlyShowCurrentOrToday(a.calendarOpen),a.setTomorrowColor()},150)},setTomorrowColor:function(){for(var e=(new Date).getDate(),t=e<10?"0"+e:""+e,a=(new Date).getMonth()+1,n=a<10?"0"+a:""+a,i=(new Date).getFullYear()+""+n+t,s=document.getElementsByTagName("td"),r=s.length,o=0;o<r;o++)s[o].style.color="#444",parseInt(s[o].getAttribute("data-date").replace(/-/g,""))>parseInt(i)&&(s[o].style.color="#ccc")},onlyShowCurrentOrToday:function(e){if(e){var t=!0,a=!1,n=void 0;try{for(var s,r=i()(document.querySelectorAll(".inline-calendar.inline-calendar-demo tbody tr"));!(t=(s=r.next()).done);t=!0){s.value.style.display=""}}catch(e){a=!0,n=e}finally{try{!t&&r.return&&r.return()}finally{if(a)throw n}}}else{var o=null;if(document.querySelectorAll(".inline-calendar.inline-calendar-demo .current").length>0?o="current":document.querySelectorAll(".inline-calendar.inline-calendar-demo .is-today").length>0&&(o="is-today"),!o)return;var l=!0,c=!1,d=void 0;try{for(var u,p=i()(document.querySelectorAll(".inline-calendar.inline-calendar-demo tbody tr"));!(l=(u=p.next()).done);l=!0){var h=u.value,v=!1,g=!0,f=!1,w=void 0;try{for(var m,b=i()(h.querySelectorAll("td"));!(g=(m=b.next()).done);g=!0){if(m.value.getAttribute("class").indexOf(o)>=0){v=!0;break}}}catch(e){f=!0,w=e}finally{try{!g&&b.return&&b.return()}finally{if(f)throw w}}v||(h.style.display="none")}}catch(e){c=!0,d=e}finally{try{!l&&p.return&&p.return()}finally{if(c)throw d}}}},getChartsOption:function(e,t,a){return{grid:{left:"0",right:"20px",bottom:"5px",top:"25px",containLabel:!0},tooltip:{alwaysShowContent:!1,backgroundColor:"#26A5FD",confine:!0,formatter:function(e){if("[object Array]"===Object.prototype.toString.call(e)){for(var t=e[0].name+"<br/>",a=0,n=e.length;a<n;a++)e[a].value=""===e[a].value?"--":e[a].value,t+=e[a].seriesName+": "+e[a].value+"<br/>";return t}var i=e.name+"<br/>";return i+=e.seriesName+": "+e.value},position:function(e,t,a,n,i){return[e[0],"0%"]},extraCssText:"box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);"},xAxis:{data:e,splitLine:{lineStyle:{type:"dashed"}},axisLine:{show:!0},axisPointer:{show:!0,value:e[0],snap:!0,label:{show:!0,formatter:function(e){return e.value},backgroundColor:"#26A5FD"},lineStyle:{color:"#26A5FD",width:2,opacity:.5},handle:{show:!0,color:"#26A5FD"}}},yAxis:{type:"value",splitLine:{lineStyle:{type:"solid"}}},series:[{name:a,type:"scatter",itemStyle:{normal:{color:"#26A5FD"}},label:{emphasis:{show:!1,position:"left",textStyle:{color:"blue",fontSize:16}}},data:t}]}},openHealthTips:function(e){this.$router.push({path:"/weightDetail/"+e})},openDetail:function(e){window.open("http://lifehaier.com/News/Advisory/detail/id/"+e.news_id+".html")},fnGetAllData:function(){if(""===this.weightDate){var e=new Date,t=e.getDate()<10?"0"+e.getDate():e.getDate();this.weightDate=this.year+"-"+this.month+"-"+t}this.$router.push({path:"/weight/history/"+this.weightDate})},setOpacity:function(e,t){e.style.opacity=t},fadeout:function(e,t,a){var n=this;if(window.fadeTimer=window.fadeTimer||0,clearInterval(window.fadeTimer),e){var i=1,s=1/(t/50);window.fadeTimer=setInterval(function(){i>0?(i-=s,n.setOpacity(e,i)):(n.setOpacity(e,0),clearInterval(window.fadeTimer),a&&a())},50)}},fadein:function(e,t,a){var n=this;if(window.fadeTimer=window.fadeTimer||0,clearInterval(window.fadeTimer),e){var i=0,s=1/(t/50);window.fadeTimer=setInterval(function(){i<1?(i+=s,n.setOpacity(e,i)):(n.setOpacity(e,1),clearInterval(window.fadeTimer),a&&a())},50)}}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page weight"},[n("div",{staticClass:"container has-footer"},[n("div",{class:["calendar-model",{open:e.calendarOpen}],attrs:{id:"calendarTop"}},[n("inline-calendar",{ref:"calendar",staticClass:"inline-calendar-demo",attrs:{show:e.show,"start-date":"2016-04-01","end-date":"2020-05-30",range:e.range,"show-last-month":e.showLastMonth,"show-next-month":e.showNextMonth,"highlight-weekend":e.highlightWeekend,"return-six-rows":e.return6Rows,"hide-header":e.hideHeader,"hide-week-list":e.hideWeekList,"replace-text-list":e.replaceTextList,"weeks-list":e.weeksList,"render-function":e.buildSlotFn,"disable-past":e.disablePast,"disable-future":e.disableFuture,"disable-weekend":e.disableWeekend,"disable-date-function":e.disableDateFunction},on:{"on-change":e.onChange,"on-view-change":e.onViewChange,"update:show":function(t){e.show=t}},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}}),e._v(" "),n("div",{staticClass:"down-up-icon",on:{click:e.toggleOpenCalendar}},[n("i",{directives:[{name:"show",rawName:"v-show",value:!e.calendarOpen,expression:"!calendarOpen"}],staticClass:"fa fa-angle-down"}),e._v(" "),n("i",{directives:[{name:"show",rawName:"v-show",value:e.calendarOpen,expression:"calendarOpen"}],staticClass:"fa fa-angle-up"})])],1),e._v(" "),n("div",{class:["background",{open:e.calendarOpen}],attrs:{id:"calendarBg"},on:{click:e.toggleOpenCalendar}}),e._v(" "),n("div",{class:["calendar-below",{open:e.calendarOpen}],attrs:{id:"calendarBelow"}},[n("div",{ref:"noData",staticClass:"weight-record no-record card-container"},[n("div",[n("span",[e._v("暂无数据，点击按钮去添加吧。")]),e._v(" "),n("button",{staticClass:"default-btn record-btn",on:{click:function(t){e.goManualEntry("entry-weight")}}},[e._v("去添加")])])]),e._v(" "),n("div",{staticClass:"weight-list-c"},[e._l(e.weightRecordData,function(t,a){return n("div",{key:a,class:["weight-record-list","card-container"],on:{click:function(a){e.openHealthTips(t.weight.weight_id)}}},[n("mt-cell-swipe",{attrs:{right:[{content:"<div class=record-delete><i class=icon-delete></i><span>不可恢复</span></div>",style:{background:"#FF475D",color:"#fff"},handler:function(){return e.deleteRecord(a,t)}}]}},[n("div",{class:["record-item"]},[n("div",{staticClass:"record-mmHg"},[n("div",{class:[{"Standard-bg":"1"===t.suggestion.level},{"up-bg":"2"===t.suggestion.level||"3"===t.suggestion.level},{"low-bg":"-2"===t.suggestion.level||"-3"===t.suggestion.level},"icon-weight-c","text-center"]},[n("i",{staticClass:"icon-weight"})]),e._v(" "),n("div",{staticClass:"mmHg"},[n("div",[e._v("\n                      "+e._s(t.weight.weight)+" "),n("span",[e._v("kg")])])])]),e._v(" "),n("div",{staticClass:"record-heart text-right"},[n("div",{staticClass:"record-heart-value"},[n("span",{class:[{"Standard-bg":"1"===t.suggestion.level},{"up-bg":"2"===t.suggestion.level||"3"===t.suggestion.level},{"low-bg":"-2"===t.suggestion.level||"-3"===t.suggestion.level}]},[e._v("\n                      "+e._s(t.suggestion.symptom)+"\n                    ")])]),e._v(" "),n("div",{staticClass:"record-heart-time"},[n("span",[e._v("测量时间")]),n("span",[e._v(e._s(t.weight.create_date.split(" ")[1]))])])]),e._v(" "),n("i",{staticClass:"fa fa-angle-right"})])]),e._v(" "),n("div",{staticClass:"advise card-container"},[n("h3",{staticClass:"title"},[e._v("健康建议")]),e._v(" "),n("p",[e._v(e._s(t.suggestion.suggestion))])])],1)}),e._v(" "),n("div",{ref:"allData",staticClass:"weight-record-list card-container",staticStyle:{display:"none","min-height":"0"},on:{click:function(t){e.fnGetAllData()}}},[n("p",{staticStyle:{"text-align":"center",padding:".5rem",color:"#b5b5b5"}},[e._v("\n              查看全部数据\n            ")])])],2),e._v(" "),n("div",{staticClass:"card-container weight-chart"},[n("h2",[e._v("趋势图")]),e._v(" "),n("div",{staticClass:"chart-button-container clearfix"},e._l(e.recordOptions,function(t,a){return n("span",{key:a},[n("button",{class:{active:t===e.selectedRecordOption},on:{click:function(a){e.changeOption(t)}}},[e._v(e._s(t))])])})),e._v(" "),n("div",{staticClass:"chart"},[n("e-chart",{ref:"weight",attrs:{options:e.weightChartsOption,autoResize:!0}}),e._v(" "),n("div",{ref:"noWeight",staticClass:"no-result-chart",staticStyle:{display:"none"}},[n("img",{attrs:{src:a("foz4"),alt:""}}),e._v(" "),n("div",{staticClass:"title"},[e._v("记录体重后将在此看到变化曲线")])])],1)]),e._v(" "),0!==e.newsResult.length?n("div",{staticClass:"card-container news"},[n("h3",{staticClass:"title"},[e._v("相关资讯")]),e._v(" "),e._l(e.newsResult,function(t,a){return n("div",{key:a,staticClass:"img-container",on:{click:function(a){e.openDetail(t)}}},[n("img",{attrs:{src:"http://lifehaier.com"+t.news_cover,alt:""}}),e._v(" "),n("div",{staticClass:"description"},[n("p",[e._v(e._s(t.news_title))]),e._v(" "),n("div",e._l(t.news_keywords.split(","),function(t,a){return n("span",{key:a},[e._v(e._s(t))])}))])])})],2):e._e()])]),e._v(" "),n("div",{staticClass:"popup-model concat"},[n("mt-popup",{model:{value:e.ChooseTypePopupVisible,callback:function(t){e.ChooseTypePopupVisible=t},expression:"ChooseTypePopupVisible"}},[n("div",{staticClass:"add-new-device",on:{click:e.addNewDevice}},[n("i",{staticClass:"icon-add-device"}),e._v(" "),n("span",[e._v("添加新设备")])]),e._v(" "),n("div",{staticClass:"add-recently-device",on:{click:e.addRecentlyDevice}},[n("i",{staticClass:"icon-recently-add-device"}),e._v(" "),n("span",[e._v("最近添加设备")])])])],1),e._v(" "),n("div",{staticClass:"popup-model bluetooth"},[n("mt-popup",{model:{value:e.bluetoothVisible,callback:function(t){e.bluetoothVisible=t},expression:"bluetoothVisible"}},[n("div",{staticClass:"popup-bluetooth"},[n("div",{staticClass:"bluetooth-flg"},[n("div",[n("span",{staticClass:"icon-blue"})])]),e._v(" "),n("p",{staticClass:"bluetooth-title"},[e._v("请开启手机蓝牙")]),e._v(" "),n("button",{on:{click:e.openBluetooth}},[e._v("开启蓝牙")]),e._v(" "),n("p",{staticClass:"bluetooth-cancel",on:{click:function(t){e.bluetoothVisible=!1}}},[n("span",[e._v("取消")])])])])],1),e._v(" "),n("div",{staticClass:"popup-model concat"},[n("mt-popup",{model:{value:e.popupVisible,callback:function(t){e.popupVisible=t},expression:"popupVisible"}},[n("div",{staticClass:"popup-img concat-pad"},[n("i",{staticClass:"icon-blue"})]),e._v(" "),n("p",{staticClass:"popup-tip"},[e._v("正在与设备进行连接......")])])],1),e._v(" "),n("div",{staticClass:"popup-model defeated"},[n("mt-popup",{model:{value:e.bluetoothFail,callback:function(t){e.bluetoothFail=t},expression:"bluetoothFail"}},[n("div",{staticClass:"popup-defeated"},[n("p",{staticClass:"defeated-title"},[e._v("连接失败")]),e._v(" "),n("p",{staticClass:"defeated-tip"},[e._v("未找到设备")]),e._v(" "),n("button",[e._v("开启蓝牙")]),e._v(" "),n("p",{staticClass:"bluetooth-cancel",on:{click:function(t){e.bluetoothFail=!1}}},[n("span",[e._v("取消")])])])])],1),e._v(" "),n("div",{staticClass:"popup-model concat"},[n("mt-popup",{model:{value:e.popupSuccess,callback:function(t){e.popupSuccess=t},expression:"popupSuccess"}},[n("div",{staticClass:"popup-img popup-bg"},[n("i",{staticClass:"icon-success popup-size"})]),e._v(" "),n("p",{staticClass:"popup-tip"},[e._v("连接成功")])])],1),e._v(" "),n("footer",{staticClass:"footer"},[n("button",{staticClass:"manual-input",on:{click:function(t){e.goManualEntry("entry-weight")}}},[e._v("手动录入")])])])},staticRenderFns:[]};var h=a("VU/8")(u,p,!1,function(e){a("R7Ii")},null,null);t.default=h.exports},R7Ii:function(e,t){}});
//# sourceMappingURL=16.557b01594c5528ac2d66.js.map