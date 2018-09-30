// fix android 4.4 issue
import '@babel/polyfill'

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
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import axios from 'axios'
// import vux
import {InlineCalendar, Loading} from 'vux'

import '../config/user.config'

Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.prototype.$axios = axios
// 添加响应拦截器
axios
  .interceptors
  .response
  .use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    console.log('请求错误啦！！！', error.response.status);
    if (process.env.NODE_ENV !== 'development') {
      if (error.response.status >= 500) {
        router.push('/serverError');
      } else if (error.response.status >= 400) {
        router.push('/errorMessage');
      }
    }

    return Promise.reject(error);
  });

Vue.config.productionTip = false
Vue.component('myLoadingModal', () => import ('./components/global/myLoading.vue'))
Vue.component('h-header', () => import ('./components/common/header.vue'))
Vue.component('e-chart', () => import ('./components/common/eChart'))
Vue.component('chart', () => import ('vue-echarts/components/ECharts'))
Vue.component('inline-calendar', InlineCalendar)
Vue.component('loading', Loading)
Vue.use(MintUI)

// 添加拦截器
axios
  .interceptors
  .request
  .use(function (config) {
    return config
  }, function (err) {
    return Promise.reject(err)
  })
axios
  .interceptors
  .response
  .use(function (response) {
    console.log('response', response)
    return response
  }, function (err) {
    return Promise.reject(err)
  })

/* eslint-disable no-new */
new Vue({el: '#app', router, components: {
    App
  }, template: '<App/>'})
