// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import './common/css/reset.css'
import './common/css/global.scss'
import Vue from 'vue'
import App from './App'
import router from './router'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/line' // 折线图
import 'echarts/lib/chart/gauge' // 仪表盘
import 'echarts/lib/chart/pie' // 圆盘图
import 'echarts/lib/chart/scatter' // 柱状图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip' // 提示,需要时再引用
import 'echarts/lib/component/markPoint' // 标记
// import mint ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import axios from 'axios';
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI);
// import vux
import {InlineCalendar, Loading} from 'vux'
Vue.prototype.$axios=axios;

import '../config/user.config'


Vue.config.productionTip = false
Vue.component('h-header', () => import ('./components/common/header.vue'))
Vue.component('e-chart', () => import ('./components/common/eChart'))
Vue.component('chart', () => import ('vue-echarts/components/ECharts'))
Vue.component('inline-calendar', InlineCalendar)
Vue.component('loading', Loading)
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({el: '#app', router, components: {
    App
  }, template: '<App/>'})
