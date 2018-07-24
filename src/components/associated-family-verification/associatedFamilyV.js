import { Toast } from 'mint-ui'
export default {
  name: 'associatedFamilyV',
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
    Toast({
      message: '请求发送成功',
      className: 'request-send-success',
      duration: 2000
    })
  }
}
