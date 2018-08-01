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
          duration: 2000
        })

        return
      }
      try {
        const result = await axios.post('/api/user/info', {phone: this.phone})
        if (result.data.code === 'C0000') {
          // find family
          this.$router.push({path: `/associatedFamilyR/${this.phone}`})
        } else {
          //  if can't find
          Toast({
            message: '未找到用户',
            duration: 2000
          })
        }
      } catch (err) {
        Toast({
          message: '网络有问题!',
          duration: 2000
        })
        console.log('Whoops: ', err)
      }
    }
  }
}
