webpackJsonp([28],{G64U:function(s,a){},kVUT:function(s,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("Xxa5"),n=e.n(t),i=e("exGp"),_=e.n(i),r=e("mtWM"),l=e.n(r),p={name:"weightDetail",data:function(){return{weightReport:{},weightIndex:{},seriousIndex:0,dangerIndex:0,normalIndex:0,progessValue:0,option:{backgroundColor:"#ffffff",title:{text:"Customized Pie",left:"center",top:20,textStyle:{color:"#ccc"}},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},visualMap:{show:!1,min:80,max:60,inRange:{colorLightness:[0,1]}},series:[{name:"访问来源",type:"pie",radius:"55%",data:[{value:335,name:"蛋白质(16.2%)",color:"#FF4156"},{value:310,name:"水含量(43.2%)",color:"#00D3E0"},{value:274,name:"脂肪(17.0%)",color:"#AB7EF6"},{value:235,name:"基础代谢(20.5%)",color:"#FF4156"}].sort(function(s,a){return s.value-a.value}),roseType:"radius",label:{normal:{textStyle:{color:this.color}}},labelLine:{normal:{lineStyle:{color:this.color},smooth:.2,length:10,length2:10}},itemStyle:{normal:{color:this.color}},animationType:"scale",animationEasing:"elasticOut",animationDelay:function(s){return 200*Math.random()}}]}}},mounted:function(){this.initDetail(),this.initReport()},methods:{initDetail:function(){var s=this;return _()(n.a.mark(function a(){var e;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,l.a.get("/api/weight/index?weight_id="+s.$route.params.weight_id);case 3:"C0000"===(e=a.sent).data.code&&(s.weightIndex=e.data.data,0===s.weightIndex.serious_list.length&&(s.$refs.seriousType.style.display="none"),0===s.weightIndex.danger_list.length&&(s.$refs.dangerType.style.display="none"),0===s.weightIndex.normal_list.length&&(s.$refs.normalType.style.display="none")),a.next=10;break;case 7:a.prev=7,a.t0=a.catch(0),console.log(a.t0);case 10:case"end":return a.stop()}},a,s,[[0,7]])}))()},initReport:function(){var s=this;return _()(n.a.mark(function a(){var e,t;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,l.a.get("/api/weight/report?weight_id="+s.$route.params.weight_id);case 3:e=a.sent,console.log(e),s.weightReport=e.data.data,(t=Math.floor(s.weightReport.need_change)/s.weightReport.standard_weight*100/2)<-50&&(t=-50),s.progessValue=50-t,a.next=14;break;case 11:a.prev=11,a.t0=a.catch(0),console.log(a.t0);case 14:case"end":return a.stop()}},a,s,[[0,11]])}))()},openSeriousTips:function(s){this.seriousIndex=s===this.seriousIndex?-s:s},openDangerTips:function(s){this.dangerIndex=s===this.dangerIndex?-s:s},openNormalTips:function(s){this.normalIndex=s===this.normalIndex?-s:s}}},c={render:function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("div",{staticClass:"weight-detail"},[e("div",{staticClass:"container",staticStyle:{"padding-top":"1rem"}},[e("div",{staticClass:"weight-detail-header"},[e("div",[e("p",{staticClass:"weight-number"},[s._v(s._s(s.weightReport.weight))]),s._v(" "),e("p",{staticClass:"weight-fla"},[s._v("您当前的体重(KG)")]),s._v(" "),e("p",{staticClass:"weight-header-result weight-header-mar20"},[e("span",{directives:[{name:"show",rawName:"v-show",value:void 0!==s.weightIndex.score&&0!==s.weightIndex.score,expression:"weightIndex.score !== undefined && weightIndex.score !== 0"}]},[e("span",[s._v("身体得分")]),e("span",{staticClass:"weight-header-flg"},[s._v(s._s(s.weightIndex.score))]),s._v("分")]),s._v(" "),e("span",[e("span",[s._v("您的体型")]),e("span",{staticClass:"weight-header-flg"},[s._v(s._s(s.weightIndex.status))])])]),s._v(" "),e("p",{directives:[{name:"show",rawName:"v-show",value:void 0!==s.weightIndex.score&&0!==s.weightIndex.score,expression:"weightIndex.score !== undefined && weightIndex.score !== 0"}],staticClass:"weight-header-result"},[s.weightReport.need_change<0?e("span",[e("span",[e("i",{staticClass:"fa fa-long-arrow-down"}),s._v(" "),e("span",[s._v("达标需减重")]),e("span",[s._v(s._s(Math.abs(s.weightReport.need_change)))]),s._v("kg")])]):e("span",[e("span",[e("i",{staticClass:"fa fa-long-arrow-up"}),s._v(" "),e("span",[s._v("达标需增重")]),e("span",[s._v(s._s(Math.abs(s.weightReport.need_change)))]),s._v("kg")])]),s._v(" "),s.weightReport.weight_change<0?e("span",[e("span",[e("i",{staticClass:"fa fa-long-arrow-up"}),s._v(" "),e("span",[s._v("比上次轻了")]),e("span",[s._v(s._s(Math.abs(s.weightReport.weight_change)))]),s._v("kg")])]):e("span",[e("span",[e("i",{staticClass:"fa fa-long-arrow-up"}),s._v(" "),e("span",[s._v("比上次重了")]),e("span",[s._v(s._s(Math.abs(s.weightReport.weight_change)))]),s._v("kg")])])])])]),s._v(" "),e("div",{ref:"dangerType",staticClass:"no-kpi"},[e("p",{staticClass:"kpi-title"},[s._v("危险指标")]),s._v(" "),s._l(s.weightIndex.danger_list,function(a,t){return e("div",{key:t,staticClass:"kpi-content",on:{click:function(a){s.openDangerTips(t+1)}}},[e("div",[e("div",{staticClass:"left"},[e("div",{staticClass:"kpi-logo"},["Muscle Weight"===a.type?e("span",{staticClass:"icon-weight"}):s._e(),s._v(" "),"体重"===a.name?e("span",{staticClass:"icon-weight"}):s._e(),s._v(" "),"基础代谢"===a.name?e("span",{staticClass:"icon-basal-metabolism"}):s._e(),s._v(" "),"Moisture"===a.type?e("span",{staticClass:"icon-water-content-c"}):s._e(),s._v(" "),"BMI"===a.type?e("span",{staticClass:"icon-bmi"}):s._e(),s._v(" "),"Protein"===a.type?e("span",{staticClass:"icon-protein"}):s._e(),s._v(" "),"Body Fat Rate"===a.type?e("span",[s._v("%")]):s._e(),s._v(" "),"Basal Metabolism"===a.type?e("span",{staticClass:"icon-basal-metabolism"}):s._e(),s._v(" "),"Fat Weight"===a.type?e("span",{staticClass:"icon-fat-weight"}):s._e(),s._v(" "),"Visceral Fat Level"===a.type?e("span",{staticClass:"icon-visceral-fat"}):s._e(),s._v(" "),"Water Content"===a.type?e("span",{staticClass:"icon-water-content"}):s._e(),s._v(" "),"Bone Weight"===a.type?e("span",{staticClass:"icon-bone-mass"}):s._e(),s._v(" "),"fat free weight"===a.type?e("span",{staticClass:"icon-lean-body-weight"}):s._e(),s._v(" "),"Obesity Level"===a.type?e("span",{staticClass:"icon-obesity"}):s._e(),s._v(" "),"Muscle Rate"===a.type?e("span",{staticClass:"icon-muscle-rate"}):s._e()]),s._v(" "),e("span",{staticClass:"kpi-item"},[s._v(s._s(a.name))])]),s._v(" "),e("div",{staticClass:"right"},[e("span",{staticClass:"kpi-number"},[s._v("\n                "+s._s(a.data)+"\n                "),s._v(" "),"Body Fat Rate"===a.type||"Moisture"===a.type||"Protein"===a.type?e("span",[s._v("%")]):s._e(),s._v(" "),"体重"===a.name||"Muscle Weight"===a.type||"Bone Weight"===a.type||"fat free weight"===a.type||"Obesity Level"===a.type||"Muscle Weight"===a.type||"水含量"===a.name||"Fat Weight"===a.type||"Muscle Rate"===a.type?e("span",[s._v("kg")]):s._e(),s._v(" "),"Visceral Fat Level"===a.type?e("span",[s._v("级")]):s._e()]),s._v(" "),"偏胖"===a.status?e("span",{staticClass:"kpi-result chubby-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"肥胖"===a.status?e("span",{staticClass:"kpi-result fat-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"不足"===a.status?e("span",{staticClass:"kpi-result thinnish-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"优"===a.status?e("span",{staticClass:"kpi-result excellent-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"超标"===a.status?e("span",{staticClass:"kpi-result overproof-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"过多"===a.status?e("span",{staticClass:"kpi-result fat-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"未达标"===a.status?e("span",{staticClass:"kpi-result thinnish-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"达标"===a.status?e("span",{staticClass:"kpi-result Standard-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"偏低"===a.status?e("span",{staticClass:"kpi-result thinnish-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"偏高"===a.status?e("span",{staticClass:"kpi-result chubby-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"消瘦"===a.status?e("span",{staticClass:"kpi-result skinny-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"偏瘦"===a.status?e("span",{staticClass:"kpi-result thinnish-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"标准"===a.status?e("span",{staticClass:"kpi-result Standard-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"超重"===a.status?e("span",{staticClass:"kpi-result overweight-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"轻度"===a.status?e("span",{staticClass:"kpi-result mild-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"中度"===a.status?e("span",{staticClass:"kpi-result chubby-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"重度"===a.status?e("span",{staticClass:"kpi-result fat-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),e("i",{class:t+1===s.dangerIndex?"fa fa-angle-down":"fa fa-angle-right",staticStyle:{width:".8rem"}})])]),s._v(" "),e("div",{staticClass:"imb-open",style:{display:t+1===s.dangerIndex?"block":"none"}},["Weight"===a.type||"BMI"===a.type||"Fat Weight"===a.type||"Body Fat Rate"===a.type?e("div",[e("div",{staticClass:"open-icon"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span"),s._v(" "),e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",[s._v(s._s(a.range[0]))]),s._v(" "),e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"chubby-bg open-icon-line"},[e("span",[s._v(s._s(a.range[1]))]),s._v(" "),e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])]),s._v(" "),e("span",{staticClass:"fat-bg open-icon-line"},[e("span",[s._v(s._s(a.range[2]))]),s._v(" "),e("span",{class:a.status===a.range_describe[3]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[3]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Water Content"===a.type||"Muscle Rate"===a.type||"Moisture"===a.type||"Muscle Weight"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon2"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"excellent-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Visceral Fat Level"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon2"},[e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"overproof-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"fat-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Basal Metabolism"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon3"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Protein"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon2"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"chubby-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Bone Weight"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon2"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"excellent-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Obesity Level"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon4"},[e("span",{staticClass:"skinny-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])]),s._v(" "),e("span",{staticClass:"overweight-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[3]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[3]))])]),s._v(" "),e("span",{staticClass:"mild-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[4]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[4]))])]),s._v(" "),e("span",{staticClass:"chubby-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[5]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[5]))])]),s._v(" "),e("span",{staticClass:"fat-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[6]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[6]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):s._e()])])})],2),s._v(" "),e("div",{ref:"normalType",staticClass:"kpi"},[e("p",{staticClass:"kpi-title"},[s._v("正常指标")]),s._v(" "),s._l(s.weightIndex.normal_list,function(a,t){return e("div",{key:t,staticClass:"kpi-content",on:{click:function(a){s.openNormalTips(t+1)}}},[e("div",[e("div",{staticClass:"left"},[e("div",{staticClass:"kpi-logo"},["Muscle Weight"===a.type?e("span",{staticClass:"icon-weight"}):s._e(),s._v(" "),"体重"===a.name?e("span",{staticClass:"icon-weight"}):s._e(),s._v(" "),"基础代谢"===a.name?e("span",{staticClass:"icon-basal-metabolism"}):s._e(),s._v(" "),"Moisture"===a.type?e("span",{staticClass:"icon-water-content-c"}):s._e(),s._v(" "),"BMI"===a.type?e("span",{staticClass:"icon-bmi"}):s._e(),s._v(" "),"Protein"===a.type?e("span",{staticClass:"icon-protein"}):s._e(),s._v(" "),"Body Fat Rate"===a.type?e("span",[s._v("%")]):s._e(),s._v(" "),"Basal Metabolism"===a.type?e("span",{staticClass:"icon-basal-metabolism"}):s._e(),s._v(" "),"Fat Weight"===a.type?e("span",{staticClass:"icon-fat-weight"}):s._e(),s._v(" "),"Visceral Fat Level"===a.type?e("span",{staticClass:"icon-visceral-fat"}):s._e(),s._v(" "),"Water Content"===a.type?e("span",{staticClass:"icon-water-content"}):s._e(),s._v(" "),"Bone Weight"===a.type?e("span",{staticClass:"icon-bone-mass"}):s._e(),s._v(" "),"fat free weight"===a.type?e("span",{staticClass:"icon-lean-body-weight"}):s._e(),s._v(" "),"Obesity Level"===a.type?e("span",{staticClass:"icon-obesity"}):s._e(),s._v(" "),"Muscle Rate"===a.type?e("span",{staticClass:"icon-muscle-rate"}):s._e()]),s._v(" "),e("span",{staticClass:"kpi-item"},[s._v(s._s(a.name))])]),s._v(" "),e("div",{staticClass:"right"},[e("span",{staticClass:"kpi-number"},[s._v("\n                "+s._s(a.data)+"\n                "),s._v(" "),"Body Fat Rate"===a.type||"Moisture"===a.type||"Protein"===a.type?e("span",[s._v("%")]):s._e(),s._v(" "),"体重"===a.name||"Muscle Weight"===a.type||"Bone Weight"===a.type||"fat free weight"===a.type||"Obesity Level"===a.type||"Muscle Weight"===a.type||"水含量"===a.name||"Fat Weight"===a.type||"Muscle Rate"===a.type?e("span",[s._v("kg")]):s._e(),s._v(" "),"Visceral Fat Level"===a.type?e("span",[s._v("级")]):s._e()]),s._v(" "),"偏胖"===a.status?e("span",{staticClass:"kpi-result chubby-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"肥胖"===a.status?e("span",{staticClass:"kpi-result fat-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"不足"===a.status?e("span",{staticClass:"kpi-result thinnish-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"优"===a.status?e("span",{staticClass:"kpi-result excellent-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"超标"===a.status?e("span",{staticClass:"kpi-result overproof-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"过多"===a.status?e("span",{staticClass:"kpi-result fat-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"未达标"===a.status?e("span",{staticClass:"kpi-result thinnish-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"达标"===a.status?e("span",{staticClass:"kpi-result Standard-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"偏低"===a.status?e("span",{staticClass:"kpi-result thinnish-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"偏高"===a.status?e("span",{staticClass:"kpi-result chubby-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"消瘦"===a.status?e("span",{staticClass:"kpi-result skinny-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"偏瘦"===a.status?e("span",{staticClass:"kpi-result thinnish-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"标准"===a.status?e("span",{staticClass:"kpi-result Standard-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"超重"===a.status?e("span",{staticClass:"kpi-result overweight-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"轻度"===a.status?e("span",{staticClass:"kpi-result mild-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"中度"===a.status?e("span",{staticClass:"kpi-result chubby-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"重度"===a.status?e("span",{staticClass:"kpi-result fat-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),e("i",{class:t+1===s.normalIndex?"fa fa-angle-down":"fa fa-angle-right",staticStyle:{width:".8rem"}})])]),s._v(" "),e("div",{staticClass:"imb-open",style:{display:t+1===s.normalIndex?"block":"none"}},["Weight"===a.type||"BMI"===a.type||"Fat Weight"===a.type||"Body Fat Rate"===a.type?e("div",[e("div",{staticClass:"open-icon"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span"),s._v(" "),e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",[s._v(s._s(a.range[0]))]),s._v(" "),e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"chubby-bg open-icon-line"},[e("span",[s._v(s._s(a.range[1]))]),s._v(" "),e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])]),s._v(" "),e("span",{staticClass:"fat-bg open-icon-line"},[e("span",[s._v(s._s(a.range[2]))]),s._v(" "),e("span",{class:a.status===a.range_describe[3]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[3]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Water Content"===a.type||"Muscle Rate"===a.type||"Moisture"===a.type||"Muscle Weight"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon2"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"excellent-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Visceral Fat Level"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon2"},[e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"overproof-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"fat-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Basal Metabolism"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon3"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Protein"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon2"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"chubby-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Bone Weight"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon2"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"excellent-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Obesity Level"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon4"},[e("span",{staticClass:"skinny-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])]),s._v(" "),e("span",{staticClass:"overweight-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[3]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[3]))])]),s._v(" "),e("span",{staticClass:"mild-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[4]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[4]))])]),s._v(" "),e("span",{staticClass:"chubby-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[5]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[5]))])]),s._v(" "),e("span",{staticClass:"fat-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[6]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[6]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):s._e()])])})],2),s._v(" "),e("div",{ref:"seriousType",staticClass:"other-kpi"},[e("p",{staticClass:"kpi-title"},[s._v("警告指标")]),s._v(" "),s._l(s.weightIndex.serious_list,function(a,t){return e("div",{key:t,staticClass:"kpi-content",on:{click:function(a){s.openSeriousTips(t+1)}}},[e("div",[e("div",{staticClass:"left"},[e("div",{staticClass:"kpi-logo"},["Muscle Weight"===a.type?e("span",{staticClass:"icon-weight"}):s._e(),s._v(" "),"体重"===a.name?e("span",{staticClass:"icon-weight"}):s._e(),s._v(" "),"基础代谢"===a.name?e("span",{staticClass:"icon-basal-metabolism"}):s._e(),s._v(" "),"Moisture"===a.type?e("span",{staticClass:"icon-water-content-c"}):s._e(),s._v(" "),"BMI"===a.type?e("span",{staticClass:"icon-bmi"}):s._e(),s._v(" "),"Protein"===a.type?e("span",{staticClass:"icon-protein"}):s._e(),s._v(" "),"Body Fat Rate"===a.type?e("span",[s._v("%")]):s._e(),s._v(" "),"Basal Metabolism"===a.type?e("span",{staticClass:"icon-basal-metabolism"}):s._e(),s._v(" "),"Fat Weight"===a.type?e("span",{staticClass:"icon-fat-weight"}):s._e(),s._v(" "),"Visceral Fat Level"===a.type?e("span",{staticClass:"icon-visceral-fat"}):s._e(),s._v(" "),"Water Content"===a.type?e("span",{staticClass:"icon-water-content"}):s._e(),s._v(" "),"Bone Weight"===a.type?e("span",{staticClass:"icon-bone-mass"}):s._e(),s._v(" "),"fat free weight"===a.type?e("span",{staticClass:"icon-lean-body-weight"}):s._e(),s._v(" "),"Obesity Level"===a.type?e("span",{staticClass:"icon-obesity"}):s._e(),s._v(" "),"Muscle Rate"===a.type?e("span",{staticClass:"icon-muscle-rate"}):s._e()]),s._v(" "),e("span",{staticClass:"kpi-item"},[s._v("\n                 "+s._s(a.name)+"\n               ")])]),s._v(" "),e("div",{staticClass:"right"},[e("span",{staticClass:"kpi-number"},[s._v("\n                "+s._s(a.data)+"\n                "),s._v(" "),"Body Fat Rate"===a.type||"Moisture"===a.type||"Protein"===a.type?e("span",[s._v("%")]):s._e(),s._v(" "),"体重"===a.name||"Muscle Weight"===a.type||"Bone Weight"===a.type||"fat free weight"===a.type||"Obesity Level"===a.type||"Muscle Weight"===a.type||"水含量"===a.name||"Fat Weight"===a.type||"Muscle Rate"===a.type?e("span",[s._v("kg")]):s._e(),s._v(" "),"Visceral Fat Level"===a.type?e("span",[s._v("级")]):s._e()]),s._v(" "),"偏胖"===a.status?e("span",{staticClass:"kpi-result chubby-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"肥胖"===a.status?e("span",{staticClass:"kpi-result fat-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"不足"===a.status?e("span",{staticClass:"kpi-result thinnish-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"优"===a.status?e("span",{staticClass:"kpi-result excellent-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"超标"===a.status?e("span",{staticClass:"kpi-result overproof-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"过多"===a.status?e("span",{staticClass:"kpi-result fat-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"未达标"===a.status?e("span",{staticClass:"kpi-result thinnish-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"达标"===a.status?e("span",{staticClass:"kpi-result Standard-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"偏低"===a.status?e("span",{staticClass:"kpi-result thinnish-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"偏高"===a.status?e("span",{staticClass:"kpi-result chubby-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"消瘦"===a.status?e("span",{staticClass:"kpi-result skinny-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"偏瘦"===a.status?e("span",{staticClass:"kpi-result thinnish-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"标准"===a.status?e("span",{staticClass:"kpi-result Standard-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"超重"===a.status?e("span",{staticClass:"kpi-result overweight-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"轻度"===a.status?e("span",{staticClass:"kpi-result mild-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"中度"===a.status?e("span",{staticClass:"kpi-result chubby-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),"重度"===a.status?e("span",{staticClass:"kpi-result fat-bg"},[e("span",[s._v(s._s(a.status))])]):s._e(),s._v(" "),e("i",{class:t+1===s.seriousIndex?"fa fa-angle-down":"fa fa-angle-right",staticStyle:{width:".8rem"}})])]),s._v(" "),e("div",{staticClass:"imb-open",style:{display:t+1===s.seriousIndex?"block":"none"}},["Weight"===a.type||"BMI"===a.type||"Fat Weight"===a.type||"Body Fat Rate"===a.type?e("div",[e("div",{staticClass:"open-icon"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span"),s._v(" "),e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",[s._v(s._s(a.range[0]))]),s._v(" "),e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"chubby-bg open-icon-line"},[e("span",[s._v(s._s(a.range[1]))]),s._v(" "),e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])]),s._v(" "),e("span",{staticClass:"fat-bg open-icon-line"},[e("span",[s._v(s._s(a.range[2]))]),s._v(" "),e("span",{class:a.status===a.range_describe[3]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[3]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Water Content"===a.type||"Muscle Rate"===a.type||"Moisture"===a.type||"Muscle Weight"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon2"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"excellent-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Visceral Fat Level"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon2"},[e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"overproof-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"fat-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Basal Metabolism"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon3"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Protein"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon2"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"chubby-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Bone Weight"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon2"},[e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"excellent-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):"Obesity Level"===a.type?e("div",[e("div",{staticClass:"open-icon open-icon4"},[e("span",{staticClass:"skinny-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[0]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[0]))])]),s._v(" "),e("span",{staticClass:"thinnish-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[1]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[1]))])]),s._v(" "),e("span",{staticClass:"Standard-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[2]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[2]))])]),s._v(" "),e("span",{staticClass:"overweight-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[3]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[3]))])]),s._v(" "),e("span",{staticClass:"mild-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[4]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[4]))])]),s._v(" "),e("span",{staticClass:"chubby-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[5]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[5]))])]),s._v(" "),e("span",{staticClass:"fat-bg open-icon-line"},[e("span",{class:a.status===a.range_describe[6]?"triangle show":"triangle"}),s._v(" "),e("span",[s._v(s._s(a.range_describe[6]))])])]),s._v(" "),e("div",{staticStyle:{margin:"1rem"}},[s._v("\n                "+s._s(a.suggestion)+"\n              ")])]):s._e()])])})],2),s._v(" "),e("div",{staticClass:"keep-weight"},[e("p",{staticClass:"keep-weight-title"},[s._v("控制体重")]),s._v(" "),e("div",{staticClass:"keep-weight-item"},[e("div",{staticClass:"line-top",staticStyle:{"margin-left":"calc(50% - 2.2rem)"}},[s.weightReport.need_change<0?e("span",{staticClass:"keep-weight-icon  fat-bg"},[e("span",[s._v("需减重")])]):s._e(),s._v(" "),s.weightReport.need_change>0?e("span",{staticClass:"keep-weight-icon thinnish-bg"},[e("span",[s._v("需增重")])]):s._e(),s._v(" "),0===s.weightReport.need_change?e("span",{staticClass:"keep-weight-icon Standard-bg"},[e("span",[s._v("标准")])]):s._e(),s._v(" "),e("span",{staticClass:"keep-weight-number"},[s._v(s._s(Math.abs(s.weightReport.need_change))+"kg")])]),s._v(" "),s.weightReport.need_change<0?e("mt-progress",{staticClass:"fat",attrs:{value:s.progessValue,"bar-height":5}}):s._e(),s._v(" "),s.weightReport.need_change>0?e("mt-progress",{staticClass:"thinnish",attrs:{value:s.progessValue,"bar-height":5}}):s._e(),s._v(" "),0===s.weightReport.need_change?e("mt-progress",{staticClass:"Standard",attrs:{value:s.progessValue,"bar-height":5}}):s._e(),s._v(" "),e("div",{staticClass:"line-bottom"},[e("span",[s._v("体重: "+s._s(s.weightReport.weight)+"kg")]),s._v(" "),e("span",[s._v("标准值: "+s._s(s.weightReport.standard_weight)+"kg")])])],1)])])])},staticRenderFns:[]};var g=e("VU/8")(p,c,!1,function(s){e("G64U")},null,null);a.default=g.exports}});
//# sourceMappingURL=28.0e30ddc2a4441eee69e8.js.map