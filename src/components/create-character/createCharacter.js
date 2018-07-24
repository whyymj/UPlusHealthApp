import axios from 'axios'
import { Toast } from 'mint-ui'
import webConfig from '../../../config/web.config'

export default {
  name: 'createCharacter',
  data () {
    return {
      sexValue: '',
      maleImg: {src: require('../../assets/male-head.png')},
      femaleImg: {src: require('../../assets/female-head.png')},
      visible: false,
      dateSlots: [],
      valuePicker: null,
      pickerIndex: null,
      birthDayValue: '',
      defaultBirthday: '1980-01-01',
      startDate: new Date('1920-01-01'),
      endDate: new Date(),
      heightValue: '',
      weightValue: '',
      relationshipValue: '',
      relationList: [],
      relationObj: {},
      // popup parameter
      popupVisible: false,
      icon: '',
      title: '',
      msg: '',
      createFailed: false
    }
  },
  mounted () {
    this.getRelationList()
  },
  methods: {
    cancelCreate () {
      this.$router.go(-1)
    },
    async getRelationList () {
      // 获取家庭关系列表
      try {
        const result = await axios.get('/api/relation')
        if (result.data.code === 'C0000') {
          this.relationList = result.data.data
          this.relationList.splice(this.relationList.indexOf(this.relationList.map(_ => {
            return _.dict_id === '13'
          }), 1))
        } else {
          console.log('failed...')
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }
    },
    switchCharacter (index) {
      if (index) {
        this.maleImg = {src: require('../../assets/male-head.png')}
        this.femaleImg = {src: require('../../assets/female-head-selected.png')}
        this.sexValue = 'female'
      } else {
        this.maleImg = {src: require('../../assets/male-head-selected.png')}
        this.femaleImg = {src: require('../../assets/female-head.png')}
        this.sexValue = 'male'
      }
    },
    /**
     * format birthday date
     * @param date
     * @returns {string}
     */
    formatDate (date) {
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    },

    openBirthDay (picker) {
      this.$refs[picker].open()
    },
    handleChangeBD (value) {
      this.birthDayValue = this.formatDate(value)
    },
    /**
     * open height weight relationship picker vsa index
     * @param index
     */
    openPicker (index) {
      this.visible = true
      this.dateSlots = [
        {
          flex: 1,
          values: [],
          defaultIndex: 0,
          className: 'slot1',
          textAlign: 'center'
        }
      ]
      switch (index) {
        case 1:
          this.dateSlots[0].values = webConfig.height
          this.dateSlots[0].defaultIndex = this.heightValue ? webConfig.height.indexOf(this.heightValue) : webConfig.height.indexOf('178cm')
          this.valuePicker = this.heightValue ? this.heightValue : '178cm'
          break
        case 2:
          this.dateSlots[0].values = webConfig.weight
          this.dateSlots[0].defaultIndex = this.weightValue ? webConfig.weight.indexOf(this.weightValue) : webConfig.weight.indexOf('80kg')
          this.valuePicker = this.weightValue ? this.weightValue : '80kg'
          break
        case 3:
          this.dateSlots[0].values = this.relationList
          this.valuePicker = this.relationList[0]
          break
      }
      this.pickerIndex = index
    },

    onChange (picker, values) {
      this.valuePicker = values[0]
    },
    // 确认选择数据并显示
    confirm () {
      switch (this.pickerIndex) {
        case 1:
          this.heightValue = this.valuePicker
          break
        case 2:
          this.weightValue = this.valuePicker
          break
        case 3:
          this.relationshipValue = this.valuePicker.dict_name
          this.relationObj = this.valuePicker
          break
      }

      this.visible = false
    },
    async createProfile () {
      // 创建健康档案
      let data = {
        sex: this.sexValue,
        height: this.heightValue.substring(0, this.heightValue.length - 2),
        weight: this.weightValue.substring(0, this.weightValue.length - 2),
        birthday: this.birthDayValue
      }
      console.log(data)
      if (this.sexValue === '' || this.heightValue === '' || this.weightValue === '' || this.birthDayValue === '') {
        Toast({
          message: '信息不全'
        })
      } else {
        try {
          const result = await axios.post('/api/user', data)
          if (result.data.code === 'C0000') {
            this.popupVisible = true
            this.icon = 'fa fa-check-circle-o'
            this.title = `创建人物-${result.data.data.nick_name ? result.data.data.nick_name : result.data.data.login_code} 成功`
            this.msg = '可以开始管理亲友健康啦！'
            this.createFailed = false
          } else {
            this.popupVisible = true
            this.icon = 'fa fa-close'
            this.title = `创建人物 失败`
            this.msg = '请重试'
            this.createFailed = true
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
    },
    closePopup () {
      if (this.createFailed) {
        this.popupVisible = false
        this.createFailed = false
      } else {
        this.$router.push({path: '/healthRecordsB'})
      }
    }
  }
}
