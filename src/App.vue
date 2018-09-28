<template>
  <div id="app">
    <div ref="content" v-if="showTitle" class="content">
      <i class="fa fa-times fa-lg" aria-hidden="true" @click="cancleTips()"></i>
      <div class="u-plus-icon"></div>
      <p>打开优家APP，随时随地关注健康信息</p>
      <button class="default-btn" @click="openApp()">立即打开</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config/global.config'

export default {
  name: 'App',
  data () {
    return {
      showTitle: false
    }
  },
  mounted() {
    (async () => {
      const tv_result = await axios.get('/api/tv/login')
      // this.showTitle = tv_result.data.flag
    })()
    const html = document.getElementsByTagName('html')[0];
    const w = document.documentElement.clientWidth || document.body.clientWidth;
    html.style.fontSize = (w / 375) * 20 + "px";
  },
  methods: {
    cancleTips() {
      this.showTitle = false
    },
    openApp() {
      // TODO open u+ app
    }
  }
}
</script>
<style lang="scss" scoped>

  .content {
    height: 4rem;
    width: 100%;
    top: 0;
    background-color: #D5EDFF;
    padding: .5rem .75rem;
    display: flex;
    position: -webkit-sticky;
    position: sticky;
    z-index: 1000;
    i {
      color: #2283E2;
      width: 1rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      margin: auto;
    }
    p {
      font-family: NotoSansCJKsc-Regular;
      font-size: .6rem;
      color: #666666;
      margin: auto;
      line-height: 1rem;
      width: 8rem;
    }
    button {
      height: 1rem;
      margin: auto;
      background: #2283E2;
      border-radius: 8px;
    }
  }
  .u-plus-icon {
    width: 2.5rem;
    background: url('./assets/u-plus-icon.png') no-repeat;
    background-size: contain;
    background-position: center;
    margin: 0 .5rem;
  }
</style>

