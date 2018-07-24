import { Toast } from 'mint-ui'
import axios from 'axios'

export default {
  name: 'associatedFamilyS',
  data () {
    return {
      phone: ''
    }
  },
  methods: {
    async searchFamily () {
      if (!this.phone) {
        Toast({
          message: '搜索不能为空！',
          className: 'no-results',
          duration: 2000
        })

        return
      }
      try {
        const result = await axios.post('/api/user/info', {phone: this.phone})
        if (result.data.code === 'U0017') {
          //  if can't find
          Toast({
            message: '未找到用户',
            className: 'no-results',
            duration: 2000
          })
        } else if (result.data.data.resultcode === '-1') {
          Toast({
            message: result.data.data.msg,
            className: 'no-results',
            duration: 2000
          })
        } else {
          // find family
          this.$router.push({path: `/associatedFamilyR/${this.phone}`})
        }
      } catch (err) {
        Toast({
          message: '网络有问题!',
          className: 'no-results',
          duration: 2000
        })
        console.log('Whoops: ', err)
      }
    }
  }
}
