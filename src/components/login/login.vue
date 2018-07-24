<template>

</template>

<script type="text/javascript">
  import config from '../../../config/global.config'
  import axios from 'axios'

  export default {
    name: 'introduction',
    created () {
    },
    mounted () {
      if (window.location.search) {
        // 扫描二维码打开
        axios.post('/api/tv/login', {code: 'true'})
          .then(res => {
            window.location.replace(`https://taccount.haier.com/oauth/authorize?client_id=jiangkangyun&response_type=code&state=qazwsx&redirect_uri=${config.url}`) // 测试环境
            // window.location.replace(`https://account.haier.com/oauth/authorize?client_id=jiangkangyun&response_type=code&state=qazwsx&redirect_uri=${config.url}`)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        // 直接打开
        axios.post('/api/tv/login', {code: 'false'})
        .then(res => {
          window.location.replace(`https://taccount.haier.com/oauth/authorize?client_id=jiangkangyun&response_type=code&state=qazwsx&redirect_uri=${config.url}`) // 测试环境
          // window.location.replace(`https://account.haier.com/oauth/authorize?client_id=jiangkangyun&response_type=code&state=qazwsx&redirect_uri=${config.url}`)
        })
        .catch(err => {
          console.log(err)
        })
      }

    },
    methods: {
    }
  }

</script>

<style lang="scss" scoped>
</style>
