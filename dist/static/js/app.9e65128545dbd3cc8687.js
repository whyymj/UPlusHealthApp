webpackJsonp([38],{"3sRD":function(t,e){},HdoX:function(t,e){},Kysl:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("tb/R"),n("Kysl");var a=n("7+uW"),i=n("Xxa5"),s=n.n(i),r=n("exGp"),o=n.n(r),h=n("mtWM"),c=n.n(h),l={name:"App",data:function(){return{showTitle:!1}},mounted:function(){var t=this;o()(s.a.mark(function e(){var n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.get("/api/tv/login");case 2:n=e.sent,t.showTitle=n.data.flag;case 4:case"end":return e.stop()}},e,t)}))();var e=document.getElementsByTagName("html")[0],n=document.documentElement.clientWidth||document.body.clientWidth;e.style.fontSize=n/375*20+"px"},methods:{cancleTips:function(){this.showTitle=!1},openApp:function(){}}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[t.showTitle?n("div",{ref:"content",staticClass:"content"},[n("i",{staticClass:"fa fa-times fa-lg",attrs:{"aria-hidden":"true"},on:{click:function(e){t.cancleTips()}}}),t._v(" "),n("div",{staticClass:"u-plus-icon"}),t._v(" "),n("p",[t._v("打开优家APP，随时随地关注健康信息")]),t._v(" "),n("button",{staticClass:"default-btn",on:{click:function(e){t.openApp()}}},[t._v("立即打开")])]):t._e(),t._v(" "),n("router-view")],1)},staticRenderFns:[]};var d=n("VU/8")(l,u,!1,function(t){n("3sRD")},"data-v-e532e064",null).exports,m=n("/ocq");a.default.use(m.a);var p=new m.a({mode:"history",routes:[{path:"*",redirect:"/"},{path:"/",redirect:"login"},{path:"/test",name:"test",component:function(t){return n.e(34).then(function(){var e=[n("EXDq")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/login",name:"login",meta:{title:"海尔健康"},component:function(t){return n.e(13).then(function(){var e=[n("EV1k")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/introduction",name:"introduction",meta:{title:"海尔健康"},component:function(t){return n.e(9).then(function(){var e=[n("h9+1")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/createCharacter",name:"createCharacter",meta:{title:"健康档案"},component:function(t){return n.e(4).then(function(){var e=[n("VFto")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/createFamily",name:"createFamily",meta:{title:"创建家人"},component:function(t){return n.e(2).then(function(){var e=[n("J4KU")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/healthRecordsB",name:"healthRecordsB",meta:{title:"健康档案"},component:function(t){return n.e(3).then(function(){var e=[n("CyK6")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/healthRecordsL",name:"healthRecordsL",meta:{title:"健康档案"},component:function(t){return n.e(31).then(function(){var e=[n("KV3v")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/addProject",name:"addProject",meta:{title:"添加项目"},component:function(t){return n.e(15).then(function(){var e=[n("iUAG")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/manualEntry/:type?",name:"manualEntry",meta:{title:"手动录入"},component:function(t){return n.e(7).then(function(){var e=[n("8mMp")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/familyManagement",name:"familyManagement",meta:{title:"家人管理"},component:function(t){return n.e(10).then(function(){var e=[n("30pd")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/associatedFamilyS",name:"associatedFamilyS",meta:{title:"关联家人"},component:function(t){return n.e(18).then(function(){var e=[n("dS8y")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/associatedFamilyR/:phone",name:"associatedFamilyR",meta:{title:"关联家人"},component:function(t){return n.e(14).then(function(){var e=[n("rJGB")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/associationRequest/:phone",name:"associationRequest",meta:{title:"关联请求"},component:function(t){return n.e(29).then(function(){var e=[n("lapH")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/associatedFamilyV",name:"associatedFamilyV",component:function(t){return n.e(30).then(function(){var e=[n("8Iaj")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/pressure",name:"pressure",meta:{title:"血压"},component:function(t){return Promise.all([n.e(0),n.e(19)]).then(function(){var e=[n("ASwm")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/pressure/history/:date",name:"pressureHistory",meta:{title:"全部数据"},component:function(t){return n.e(35).then(function(){var e=[n("y/ES")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/bloodSugar",name:"bloodSugar",meta:{title:"血糖"},component:function(t){return Promise.all([n.e(0),n.e(32)]).then(function(){var e=[n("RtZu")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/bloodSugar/history/:date",name:"bloodSugarHistory",meta:{title:"全部数据"},component:function(t){return n.e(26).then(function(){var e=[n("BP6S")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/oxygen",name:"oxygen",meta:{title:"血氧"},component:function(t){return Promise.all([n.e(0),n.e(20)]).then(function(){var e=[n("f633")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/oxygen/history/:date",name:"oxygenHistory",meta:{title:"全部数据"},component:function(t){return n.e(36).then(function(){var e=[n("Iu6z")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/ecg",name:"ecg",meta:{title:"心电"},component:function(t){return Promise.all([n.e(0),n.e(11)]).then(function(){var e=[n("8CK/")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/ecg/history/:date",name:"ECGHistory",meta:{title:"全部数据"},component:function(t){return n.e(23).then(function(){var e=[n("OxxE")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/temperature",name:"temperature",meta:{title:"体温"},component:function(t){return Promise.all([n.e(0),n.e(22)]).then(function(){var e=[n("wgLe")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/temperature/history/:date",name:"temperatureHistory",meta:{title:"全部数据"},component:function(t){return n.e(33).then(function(){var e=[n("Etkf")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/weight",name:"weight",meta:{title:"体重"},component:function(t){return Promise.all([n.e(0),n.e(16)]).then(function(){var e=[n("/Qo6")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/weight/history/:date",name:"weightHistory",meta:{title:"全部数据"},component:function(t){return n.e(21).then(function(){var e=[n("n4NL")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/weightDetail/:weight_id",name:"weightDetail",meta:{title:"体重"},component:function(t){return n.e(28).then(function(){var e=[n("kVUT")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/setTargetWeight",name:"setTargetWeight",meta:{title:"设置目标体重"},component:function(t){return n.e(8).then(function(){var e=[n("pmRm")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/chooseDevice/:index",name:"chooseDevice",meta:{title:"选择设备"},component:function(t){return n.e(5).then(function(){var e=[n("yZQi")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/deviceType",name:"deviceType",meta:{title:"选择设备"},component:function(t){return n.e(24).then(function(){var e=[n("A/GX")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/searchDevice/:index",name:"searchDevice",meta:{title:"选择设备"},component:function(t){return n.e(6).then(function(){var e=[n("U4ta")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/noSearchDevice/:index?",name:"noSearchDevice",meta:{title:"选择设备"},component:function(t){return n.e(12).then(function(){var e=[n("awfA")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/startTest",name:"startTest",meta:{title:"健康监测"},component:function(t){return n.e(27).then(function(){var e=[n("UVna")];t.apply(null,e)}.bind(this)).catch(n.oe)}}]});p.beforeEach(function(t,e,n){t.meta.title&&(document.title=t.meta.title),n()});var f=p,v=(n("4UDB"),n("87tG"),n("Vb+l"),n("u9yV"),n("GbHy"),n("Oq2I"),n("2tOJ"),n("Au9i")),y=n.n(v),w=(n("d8/S"),n("bOdI")),b=n.n(w),g=n("mvHQ"),D=n.n(g),x=n("ghQH"),_=n("1bLG"),V=n("0sN4"),C=n("o6oK"),T=(C.a,Object(V.a)(),{name:"inline-calendar",mixins:[C.a],props:Object(V.a)(),data:function(){return{multi:!1,year:0,month:0,days:[],today:Object(x.a)(new Date,"YYYY-MM-DD"),months:["1","2","3","4","5","6","7","8","9","10","11","12"],currentValue:"",viewChangeEventCount:-1}},created:function(){if(this.currentValue=this.value,this.multi="[object Array]"===Object.prototype.toString.call(this.currentValue),this.multi)for(var t=0;t<this.currentValue.length;t++)this.$set(this.currentValue,t,this.convertDate(this.currentValue[t]));else this.currentValue=this.convertDate(this.currentValue);this.render(this.renderMonth[0],this.renderMonth[1]-1)},computed:{_weeksList:function(){return this.weeksList&&this.weeksList.length?this.weeksList:this.weeksList&&this.weeksList.length?void 0:["日","一","二","三","四","五","六"]},_replaceTextList:function(){var t={};for(var e in this.replaceTextList)t[this.convertDate(e)]=this.replaceTextList[e];return t},currentYearMonth:function(){return this.year+this.month}},watch:{value:function(t){this.currentValue=this.multi?t:this.convertDate(t)},currentValue:function(t,e){if(this.$emit("input",this.currentValue),this.$emit("on-change",this.currentValue),this.renderOnValueChange){if(t&&e&&t.slice(0,7)===e.slice(0,7))return;this.render(null,null,"value change")}},renderFunction:function(){this.render(this.year,this.month,this.currentValue)},renderMonth:function(t){t&&2===t.length&&this.render(t[0],t[1]-1)},returnSixRows:function(t){this.render(this.year,this.month)},startDate:function(t){this.render(this.year,this.month)},endDate:function(t){this.render(this.year,this.month)},disablePast:function(){this.render(this.year,this.month)},disableFuture:function(){this.render(this.year,this.month)},currentYearMonth:function(){var t=this.days[this.days.length-1],e=t[t.length-1],n=[];this.days.forEach(function(t){n=n.concat(t)}),n=n.filter(function(t){return!t.isLastMonth&&!t.isNextMonth}),this.viewChangeEventCount++,this.$emit("on-view-change",{year:this.year,month:this.month+1,firstDate:this.days[0][0].formatedDate,lastDate:e.formatedDate,firstCurrentMonthDate:n[0].formatedDate,lastCurrentMonthDate:n[n.length-1].formatedDate,allDates:this.days},this.viewChangeEventCount)}},methods:{processDateItem:function(t){var e=JSON.parse(D()(t));return e.isDisabled=this.isDisabled(t),e.isBetween=this.isBetween(t.formatedDate),e},isBetween:function(t){return Object(_.b)(t,this.disablePast,this.disableFuture,this.startDate,this.endDate)},isDisabled:function(t){var e=!this.isBetween(t.formatedDate);if(e=(e=e||t.isWeekend&&this.disableWeekend)||t.isNextMonth||t.isLastMonth,this.disableDateFunction){var n=this.disableDateFunction(t);return void 0===n?e:n}return e},switchViewToToday:function(){var t=new Date;this.render(t.getFullYear(),t.getMonth())},switchViewToCurrentValue:function(){if(this.currentValue&&(!this.multi||this.currentValue.length)){var t,e,n=("string"==typeof this.currentValue?this.currentValue:this.currentValue[0]).split("-");t=parseInt(n[0],10),e=parseInt(n[1],10),this.switchViewToMonth(t,e)}},switchViewToMonth:function(t,e){if(!t||!e)return this.switchViewToToday();this.render(t,e-1)},getDates:function(){return this.days},replaceText:function(t,e){var n=this._replaceTextList[e];return n||void 0!==n?n:t},convertDate:function(t){return"TODAY"===t?this.today:t},buildClass:function(t,e){var n=!1;return e.isLastMonth||e.isNextMonth||(n=this.multi&&this.currentValue.length>0?this.currentValue.indexOf(this.formatDate(this.year,this.month,e))>-1:this.currentValue===this.formatDate(this.year,this.month,e)),b()({current:n,"is-disabled":this.isDisabled(e),"is-today":e.isToday},"is-week-"+t,!0)},render:function(t,e){var n,a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=this.multi?this.currentValue[this.currentValue.length-1]:this.currentValue;n=Object(_.a)({year:t,month:e,value:i,rangeBegin:this.convertDate(this.startDate),rangeEnd:this.convertDate(this.endDate),returnSixRows:this.returnSixRows,disablePast:this.disablePast,disableFuture:this.disableFuture}),(this.year!==n.year||this.month!==n.month||a)&&(this.year=n.year,this.month=n.month,this.days=n.days)},formatDate:function(t,e,n){return[t,Object(_.c)(n.month+1),Object(_.c)(n.day)].join("-")},prev:function(){0===this.month?(this.month=11,this.year=this.year-1):this.month=this.month-1,this.render(this.year,this.month,!0)},next:function(){11===this.month?(this.month=0,this.year=this.year+1):this.month=this.month+1,this.render(this.year,this.month,!0)},go:function(t,e){this.render(t,e,!0)},select:function(t,e,n){if((!n.isLastMonth||this.showLastMonth)&&(!n.isNextMonth||this.showNextMonth)&&this.isBetween(n.formatedDate)){if(this.isDisabled(n)){if(!this.isBetween(n.formatedDate))return;if(this.disableDateFunction&&this.disableDateFunction(n))return;if(n.isWeekend&&this.disableWeekend)return}var a=null;if(n.isLastMonth||n.isNextMonth?a=[n.year,Object(_.c)(n.month+1),Object(_.c)(n.day)].join("-"):(this.days[t][e].current=!0,a=[this.year,Object(_.c)(this.month+1),Object(_.c)(this.days[t][e].day)].join("-")),this.multi){var i=this.currentValue.indexOf(a);i>-1?this.currentValue.splice(i,1):this.currentValue.push(a)}else this.currentValue=a,this.$emit("on-select-single-date",this.currentValue);if(this.multi)for(var s=0;s<this.currentValue.length;s++)this.$set(this.currentValue,s,this.convertDate(this.currentValue[s]));else this.currentValue=this.convertDate(this.currentValue);this.renderOnValueChange&&this.render(null,null)}},showChild:function(t,e,n){return!!this.replaceText(n.day,this.formatDate(t,e,n))&&(!n.isLastMonth&&!n.isNextMonth||n.isLastMonth&&this.showLastMonth||n.isNextMonth&&this.showNextMonth)}}}),M={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"inline-calendar",class:{"is-weekend-highlight":t.highlightWeekend}},[n("div",{directives:[{name:"show",rawName:"v-show",value:!t.hideHeader,expression:"!hideHeader"}],staticClass:"calendar-header"},[n("div",{staticClass:"calendar-year"},[n("span",{on:{click:function(e){t.go(t.year-1,t.month)}}},[n("a",{staticClass:"year-prev vux-prev-icon",attrs:{href:"javascript:"}})]),t._v(" "),n("a",{staticClass:"calendar-year-txt calendar-title",attrs:{href:"javascript:"}},[t._v(t._s(t.year))]),t._v(" "),n("span",{staticClass:"calendar-header-right-arrow",on:{click:function(e){t.go(t.year+1,t.month)}}},[n("a",{staticClass:"year-next vux-next-icon",attrs:{href:"javascript:"}})])]),t._v(" "),n("div",{staticClass:"calendar-month"},[n("span",{on:{click:t.prev}},[n("a",{staticClass:"month-prev vux-prev-icon",attrs:{href:"javascript:"}})]),t._v(" "),n("a",{staticClass:"calendar-month-txt calendar-title",attrs:{href:"javascript:"}},[t._v(t._s(t.months[t.month]))]),t._v(" "),n("span",{staticClass:"calendar-header-right-arrow",on:{click:t.next}},[n("a",{staticClass:"month-next vux-next-icon",attrs:{href:"javascript:"}})])])]),t._v(" "),n("table",[n("thead",{directives:[{name:"show",rawName:"v-show",value:!t.hideWeekList,expression:"!hideWeekList"}]},[n("tr",t._l(t._weeksList,function(e,a){return n("th",{staticClass:"week",class:"is-week-list-"+a},[t._v(t._s(e||e))])}))]),t._v(" "),n("tbody",t._l(t.days,function(e,a){return n("tr",t._l(e,function(e,i){return n("td",{class:t.buildClass(i,e),attrs:{"data-date":t.formatDate(t.year,t.month,e),"data-current":t.currentValue},on:{click:function(n){t.select(a,i,e)}}},[t._t("each-day",[n("span",{directives:[{name:"show",rawName:"v-show",value:t.showChild(t.year,t.month,e),expression:"showChild(year, month, child)"}],staticClass:"vux-calendar-each-date",style:t.getMarkStyle(e)},[t._v("\n              "+t._s(t.replaceText(e.day,t.formatDate(t.year,t.month,e)))+"\n              "),t.isShowTopTip(e)?n("span",{staticClass:"vux-calendar-top-tip",style:t.isShowTopTip(e,"style")},[n("span",[t._v(t._s(t.isShowTopTip(e,"text")))])]):t._e()]),t._v(" "),t.isShowBottomDot(e)?n("span",{staticClass:"vux-calendar-dot"}):t._e(),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showChild(t.year,t.month,e),expression:"showChild(year, month, child)"}],domProps:{innerHTML:t._s(t.renderFunction(a,i,e))}})],{year:t.year,month:t.month,child:t.processDateItem(e),date:t.processDateItem(e),className:"vux-calendar-each-date",row:a,col:i,rawDate:t.formatDate(t.year,t.month,e),showDate:t.replaceText(e.day,t.formatDate(t.year,t.month,e)),isShow:t.showChild(t.year,t.month,e)})],2)}))}))])])},staticRenderFns:[]};var k=n("VU/8")(T,M,!1,function(t){n("TuTz")},null,null).exports,S=(Boolean,String,String,String,{name:"loading",model:{prop:"show",event:"change"},props:{show:Boolean,text:String,position:String,transition:{type:String,default:"vux-mask"}},watch:{show:function(t){this.$emit("update:show",t)}}}),L={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:t.transition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast vux-loading"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]};var j=n("VU/8")(S,L,!1,function(t){n("HdoX")},null,null).exports;window._member_id="";a.default.config.productionTip=!1,a.default.component("h-header",function(){return n.e(17).then(n.bind(null,"Mitt"))}),a.default.component("e-chart",function(){return n.e(25).then(n.bind(null,"a99g"))}),a.default.component("chart",function(){return n.e(1).then(n.bind(null,"sE1n"))}),a.default.component("inline-calendar",k),a.default.component("loading",j),a.default.use(y.a),new a.default({el:"#app",router:f,components:{App:d},template:"<App/>"})},TuTz:function(t,e){},"d8/S":function(t,e){},"tb/R":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.9e65128545dbd3cc8687.js.map