webpackJsonp([19],{dS8y:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Xxa5"),n=a.n(s),r=a("exGp"),i=a.n(r),o=a("Au9i"),c=a("mtWM"),u=a.n(c),l={name:"associatedFamilyS",data:function(){return{phone:""}},methods:{searchFamily:function(){var e=this;return i()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.phone){t.next=3;break}return Object(o.Toast)({message:"搜索不能为空！",className:"no-results",duration:2e3}),t.abrupt("return");case 3:return t.prev=3,t.next=6,u.a.post("/api/user/info",{phone:e.phone});case 6:"U0017"===(a=t.sent).data.code?Object(o.Toast)({message:"未找到用户",className:"no-results",duration:2e3}):"-1"===a.data.data.resultcode?Object(o.Toast)({message:a.data.data.msg,className:"no-results",duration:2e3}):e.$router.push({path:"/associatedFamilyR/"+e.phone}),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(3),Object(o.Toast)({message:"网络有问题!",className:"no-results",duration:2e3}),console.log("Whoops: ",t.t0);case 14:case"end":return t.stop()}},t,e,[[3,10]])}))()}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page associated-family-s"},[a("div",{staticClass:"container white-bg has-footer"},[a("div",{staticClass:"space"}),e._v(" "),a("div",{staticClass:"search-bar"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"number"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}}),e._v(" "),a("div",{staticClass:"search-btn text-center",on:{click:e.searchFamily}},[a("i",{staticClass:"fa fa-search"})])]),e._v(" "),e._m(0)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"description"},[t("h3",[this._v("功能提示")]),this._v(" "),t("div",{staticClass:"first-text"},[this._v("1，添加友情账号，数据远超实时查看；")]),this._v(" "),t("div",[this._v("2，关爱提醒，实时关爱亲友健康；")])])}]};var h=a("VU/8")(l,d,!1,function(e){a("hTgV")},null,null);t.default=h.exports},hTgV:function(e,t){}});
//# sourceMappingURL=19.e6182a3699f8f6061938.js.map