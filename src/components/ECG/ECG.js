import axios from 'axios'
import LZString from 'lz-string'

export default {
  name: 'ecg',
  data () {
    return {
      ChooseTypePopupVisible: false,
      bluetoothVisible: false,
      popupSuccess: false,
      popupVisible: false,
      bluetoothFail: false,
      ecgLevel: '',
      newsResult: [],
      calendarOpen: false,
      ecgRecordData: [],
      ecgChartsOption: this.getChartsOption([]),
      ecgDate: '',
      ecgIndex: 1,
      month: '',
      year: '',
      firstDate: '',
      lastDate: '',
      show: true,
      value: '',
      range: false,
      showLastMonth: true,
      showNextMonth: true,
      highlightWeekend: false,
      return6Rows: true,
      hideHeader: false,
      hideWeekList: false,
      replaceTextList: {},
      replace: false,
      changeWeeksList: false,
      weeksList: [],
      useCustomFn: false,
      buildSlotFn: () => '',
      disablePast: false,
      disableFuture: true,
      disableWeekend: false,
      disableDateFunction (date) {
        return false
      }
    }
  },
  mounted () {
    this.initList()
    this.$nextTick(function () {
      document.getElementsByClassName('calendar-header')[0].style.display = 'none'
      if (window._ecg_selected_date) {
        this.value = window._ecg_selected_date
        this.toggleOpenCalendar()
      }
    })
  },
  methods: {
    addNewDevice () {
      this.$router.push({path: '/deviceType'})
    },
    addRecentlyDevice () {
      this.bluetoothVisible = true
    },
    openBluetooth () {
      this.bluetoothVisible = false
      this.popupVisible = true
    },
    toggleOpenCalendar () {
      this.calendarOpen = !this.calendarOpen
      if (document.getElementsByClassName('calendar-header')[0].style.display === 'none') {
        document.getElementsByClassName('calendar-header')[0].style.display = 'block'
      } else {
        document.getElementsByClassName('calendar-header')[0].style.display = 'none'
      }
      setTimeout(() => {
        this.onlyShowCurrentOrToday(this.calendarOpen)
      }, 0)
    },
    onChange (val) {
      console.log('on-change', val)
      window._ecg_selected_date = val
      this.ecgDate = val
      this.initList()
      document.getElementById('calendarTop').classList.remove('open')
      document.getElementById('calendarBg').classList.remove('open')
      document.getElementById('calendarBelow').classList.remove('open')
      this.calendarOpen = !this.calendarOpen
      if (document.getElementsByClassName('calendar-header')[0].style.display === 'none') {
        document.getElementsByClassName('calendar-header')[0].style.display = 'block'
      } else {
        document.getElementsByClassName('calendar-header')[0].style.display = 'none'
      }
      setTimeout(() => {
        this.onlyShowCurrentOrToday(this.calendarOpen)
      }, 0)
    },
    onViewChange (val, count) {
      console.log('on view change', val, count)
      this.firstDate = val.firstDate
      this.lastDate = val.lastDate
      this.month = val.month < 10 ? '0' + val.month : val.month
      this.year = val.year
      setTimeout(() => {
        this.initDateList()
        this.onlyShowCurrentOrToday(this.calendarOpen)
        this.setTomorrowColor()
      }, 150)
    },
    setTomorrowColor () {
      let dayNum = new Date().getDate()
      let dayStr = dayNum < 10 ? '0' + dayNum : '' + dayNum
      let monthNum = new Date().getMonth() + 1
      let monthStr = monthNum < 10 ? '0' + monthNum : '' + monthNum
      let yearStr = new Date().getFullYear()
      let todayV = yearStr + '' + monthStr + '' + dayStr
      let nodes = document.getElementsByTagName('td')
      let nodesLen = nodes.length

      for (let i = 0; i < nodesLen; i++) {
        nodes[i].style.color = '#444'
        if (parseInt(nodes[i].getAttribute('data-date').replace(/-/g, '')) > parseInt(todayV)) {
          nodes[i].style.color = '#ccc'
        }
      }
    },
    onlyShowCurrentOrToday (isShow) {
      if (isShow) {
        for (let tr of document.querySelectorAll('.inline-calendar.inline-calendar-demo tbody tr')) {
          tr.style.display = ''
        }
      } else {
        let className = null
        if (document.querySelectorAll('.inline-calendar.inline-calendar-demo .current').length > 0) {
          className = 'current'
        } else if (document.querySelectorAll('.inline-calendar.inline-calendar-demo .is-today').length > 0) {
          className = 'is-today'
        }

        if (!className) {
          return
        }

        for (let tr of document.querySelectorAll('.inline-calendar.inline-calendar-demo tbody tr')) {
          let hasSelected = false
          for (let td of tr.querySelectorAll('td')) {
            if (td.getAttribute('class').indexOf(className) >= 0) {
              hasSelected = true
              break
            }
          }
          if (!hasSelected) {
            tr.style.display = 'none'
          }
        }
      }
    },
    async initNews () {
      try {
        const result = await axios.get(`/api/news?id=5&level=${this.ecgLevel}`)
        console.log(result)
        this.newsResult = result.data
      } catch (err) {
        console.log('err: ', err)
      }
    },
    async initList () {
      try {
        const result = await axios.get(`/api/ecg/three?member_id=${window._member_id}&date=${this.ecgDate}&limit=N`)
        if (result.data.code === 'C0000') {
          if (result.data.data.length === 0) {
            this.ecgRecordData = []
            this.$refs.noData.style.display = 'block'
            this.$refs.allData.style.display = 'none'
            this.$refs.noEcg.style.display = 'block'
            this.$refs.ecg.$el.style.display = 'none'
          } else {
            this.$refs.noData.style.display = 'none'
            if (result.data.data.length > 3) {
              result.data.data.splice(3)
              this.$refs.allData.style.display = 'block'
              this.ecgRecordData = result.data.data
            } else {
              this.$refs.allData.style.display = 'none'
              this.ecgRecordData = result.data.data
            }
            this.ecgLevel = this.ecgRecordData[0].suggestion.level
            this.getECGDetail()
          }
          this.initNews()
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }
    },
    async getECGDetail (id) {
      try {
        const result = await axios.get(`/api/cardiogram/detail?cardiogram_id=${id}`)
        if (result.data.code === 'C0000') {
          this.$refs.noEcg.style.display = 'none'
          this.$refs.ecg.$el.style.display = 'block'
          let obj = JSON.parse(result.data.data.cardiogram.cardiogram)
          let num = ''
          for (let i in obj) {
            num = num + obj[i] + ','
          }
          num = num.substring(0, num.length - 1)
          num = num.split(',').map(n => { // 将数组中的值转为 number
            return +n
          })
          let dataArray = LZString.decompressFromUint8Array(num)
          this.$refs.ecg.$children[0].mergeOptions(this.getChartsOption(JSON.parse(dataArray)))
        }
      } catch (err) {
        console.log(err)
      }
    },
    async initDateList () {
      try {
        const result = await axios.get(`/api/health/list?member_id=${window._member_id}&flag=5&begin=${this.firstDate}&end=${this.lastDate}`)
        if (result.data.code === 'C0000') {
          console.log(result)
          let _result = result.data.data.date_list
          let nodes = document.getElementsByTagName('td')
          let nodesLen = nodes.length

          let calendarData = document.getElementsByClassName('calendar-data')
          let calendarDataLen = calendarData.length
          for (let i = 0; i < calendarDataLen; i++) {
            calendarData[0].parentNode.removeChild(calendarData[0])
          }
          for (let j = 0; j < _result.length; j++) {
            for (let i = 0; i < nodesLen; i++) {
              let span = document.createElement('span')
              span.classList.add('calendar-data')
              if (nodes[i].getAttribute('data-date') === _result[j]) {
                nodes[i].appendChild(span)
                break
              }
            }
          }
        }
      } catch (err) {
        console.log('err: ', err)
      }
    },
    async deleteRecord (index, item) {
      try {
        const result = await axios.post('/api/cardiogram/delete', {cardiogram_id: item.cardiogram.cardiogram_id})
        if (result.data.code === 'C0000') {
          this.initDateList()
          this.initList()
          console.log('delete success...')
        } else {
          console.log('delete err')
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }
    },
    getChartsOption (data) {
      let option = {
        visualMap: [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 250,
            color: ['#FFBE40', '#7A98FA']
          }],
        tooltip: {
          trigger: 'axis'
        },
        grid: [{
          top: '10',
          bottom: '10',
          right: '5',
          left: '30'
        }],
        xAxis: [{
          show: false,
          data: []
        }],
        yAxis: [{
          min: 0,
          max: 250,
          type: 'value',
          data: ['0', '50', '100'],
          interval: 50,
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          axisTick: {
            length: 0
          }
        }],
        series: [{
          type: 'line',
          symbol: 'circle',
          symbolSize: 10,
          showSymbol: true,
          smooth: true,
          itemStyle: {
            normal: {
              color: '#26A5FD'
            }
          },
          data: data
        }]
      }

      return option
    },
    openHealthTips (index) {
      this.ecgIndex = this.ecgIndex === index ? -index : index
    },
    openDetail (item) {
      window.open(`http://lifehaier.com/News/Advisory/detail/id/${item.news_id}.html`)
    },
    fnGetAllData () {
      if (this.ecgDate === '') {
        let _date = new Date()
        let day = _date.getDate() < 10 ? '0' + _date.getDate() : _date.getDate()
        this.ecgDate = this.year + '-' + this.month + '-' + day
      }
      this.$router.push({ path: `/ecg/history/${this.ecgDate}` })
    }
  }
}
