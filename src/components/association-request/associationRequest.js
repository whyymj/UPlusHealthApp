import axios from 'axios'
import { Toast } from 'mint-ui'

export default {
  name: 'associationRequest',
  data () {
    return {
      visible: false,
      characterValue: '',
      message: '',
      pickerValue: {},
      dateSlots: []
    }
  },
  mounted () {
    this.getUserById()
    this.getRelationList()
  },
  methods: {
    async getUserById () {
      try {
        const result = await axios.post('/api/user/info', {phone: ''})
        if (result.data.code === 'C0000') {
          this.message = `我是${result.data.data.nick_name ? result.data.data.nick_name : result.data.data.login_code}`
        }
      } catch (err) {
        console.log('err: ', err)
      }
    },
    async getRelationList () {
      // 获取家庭关系列表
      try {
        const result = await axios.get('/api/relation')
        if (result.data.code === 'C0000') {
          result.data.data.splice(result.data.data.indexOf(result.data.data.map(_ => {
            return _.dict_id === '13'
          }), 1))
          this.dateSlots = [{
            flex: 1,
            values: result.data.data,
            className: 'slot1',
            textAlign: 'center'
          }]
          this.pickerValue = result.data.data[0]
        }
      } catch (err) {
        console.log(err)
      }
    },
    showCharacter () {
      this.visible = true
    },
    onChange (picker, values) {
      this.pickerValue = values[0]
    },
    confirm () {
      this.characterValue = this.pickerValue.dict_name
      this.visible = false
    },
    async sendRequest () {
      if (this.message === '' || this.characterValue === '') {
        Toast({
          message: '信息不全'
        })

        return
      }
      let obj = {
        receive_code: this.$route.params.phone,
        message: this.message,
        association: this.pickerValue.dict_id
      }
      try {
        const result = await axios.post('/api/associate', obj)
        const that = this
        if (result.data.code === 'C0000') {
          Toast({
            message: '请求发送成功',
            duration: 2000
          })
        } else {
          Toast({
            message: result.data.data.msg,
            duration: 2000
          })
        }
        setTimeout(function () {
          that.$router.push({path: '/familyManagement'})
        }, 2000)
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
