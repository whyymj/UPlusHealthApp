import axios from 'axios'
import myDatePicker from '../pressure/myDatePicker.vue';
import mycollapse2 from '../sleep-music/mycollapse2.vue';
export default {
  name: 'weight',
  components : {
    myDatePicker,
    mycollapse2
  },
  data () {
    return {
      ChooseTypePopupVisible: false,
      weightRecordData: [],
      weightLevel: '',
      newsResult: [],
      calendarOpen: false,
      bluetoothVisible: false,
      popupSuccess: false,
      popupVisible: false,
      bluetoothFail: false,
      recordOptions: ['BMI', '体重'],
      selectedRecordOption: '体重',
      weightChartsOption: this.getChartsOption([], [], ''),
      weightDate: '',
      month: '',
      year: '',
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
      this.chartOption()
      document.getElementsByClassName('calendar-header')[0].style.display = 'none'
      if (window._weight_selected_date) {
        this.value = window._weight_selected_date
        this.toggleOpenCalendar()
      }
    })
  },
  methods: {
    checkDateData(date) {
      var str = date.year + '-' + (date.month > 9
        ? date.month
        : ('0' + date.month)) + '-' + (date.date > 9
        ? date.date
        : ('0' + date.date));
      this.onChange(str);
    },
    goManualEntry (type) {
      this.$router.push({path: `/manualEntry/${type}`})
    },
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
    async initNews () {
      try {
        const result = await axios.get(`/api/news?id=1&level=${this.weightLevel}`)
        console.log('result: ', result)
        this.newsResult = result.data
      } catch (err) {
        console.log('err: ', err)
      }
    },
    async initList () {
      try {
        const result = await axios.get(`/api/weight/three?member_id=${window._member_id}&date=${this.weightDate}&limit=N`)
        if (result.data.code === 'C0000') {
          if (result.data.data.length === 0) {
            this.weightRecordData = []
            this.$refs.noData.style.display = 'block'
            this.$refs.allData.style.display = 'none'
          } else {
            this.$refs.noData.style.display = 'none'
            if (result.data.data.length > 3) {
              result.data.data.splice(3)
              this.$refs.allData.style.display = 'block'
              this.weightRecordData = result.data.data
            } else {
              this.$refs.allData.style.display = 'none'
              this.weightRecordData = result.data.data
            }
            this.weightLevel = this.weightRecordData[0].suggestion.level
          }
          this.initNews()
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }
    },
    async initDateList () {
      try {
        const result = await axios.get(`/api/health/list?member_id=${window._member_id}&flag=1&begin=${this.firstDate}&end=${this.lastDate}`)
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
    async chartOption (callback) {
      // 渲染图表
      try {
        const result = await axios.get(`/api/weight/type?member_id=${window._member_id}&date=${this.weightDate}`)
        if (result.data.code === 'C0000') {
          if (result.data.data.length === 0) {
            // no data
            this.$refs.noWeight.style.display = 'block'
            this.$refs.weight.$el.style.display = 'none'
          } else {
            this.$refs.noWeight.style.display = 'none'
            this.$refs.weight.$el.style.display = 'block'
            let d = result.data.data.map(_ => {
              return _.create_date
            })
            let type
            switch (this.selectedRecordOption) {
              case '水分':
                type = result.data.data.map(_ => {
                  return _.water_percent
                })
                break
              case '肌肉率':
                type = result.data.data.map(_ => {
                  return _.muscle_percent
                })
                break
              case '体重':
                type = result.data.data.map(_ => {
                  return _.weight
                })
                break
              case '体脂率':
                type = result.data.data.map(_ => {
                  return _.axunge_percent
                })
                break
              case 'BMI':
                type = result.data.data.map(_ => {
                  return _.bmi
                })
                break
              case '基础代谢':
                type = result.data.data.map(_ => {
                  return _.basal_metabolic
                })
                break
              case '水含量':
                type = result.data.data.map(_ => {
                  return _.water
                })
                break
              case '骨量':
                type = result.data.data.map(_ => {
                  return _.bone
                })
                break
              case '身体年龄':
                type = result.data.data.map(_ => {
                  return _.body_age
                })
                break
              case '内脏脂肪等级':
                type = result.data.data.map(_ => {
                  return _.viscera
                })
                break
              case '脂肪重量':
                type = result.data.data.map(_ => {
                  return _.axunge
                })
                break
              case '肌肉重量':
                type = result.data.data.map(_ => {
                  return _.muscle
                })
                break
              case '肥胖度':
                type = result.data.data.map(_ => {
                  return _.obesity
                })
                break
              case '去脂体重':
                type = result.data.data.map(_ => {
                  return _.fat_free_weight
                })
                break
              case '蛋白质':
                type = result.data.data.map(_ => {
                  return _.protein
                })
                break
            }
            this.weightChartsOption = this.getChartsOption(d, type, this.selectedRecordOption)
            if (this.$refs.weight.$children.length !== 0) {
              this.$refs.weight.$children[0].chart._api.getZr().on('mouseup', () => {
                this.$refs.weight.$children[0].chart._api.dispatchAction({
                  type: 'hideTip'
                })
              })
            }
          }
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }
      callback && callback()
    },
    changeOption (params) {
      console.log(params)
      this.selectedRecordOption = params
      this.fadeout(this.$refs.weight.$el, 150, () => {
        this.chartOption(() => {
          this.fadein(this.$refs.weight.$el, 300)
        })
      })
    },
    async deleteRecord (index, item) {
      // 删除健康档案记录
      try {
        const result = await axios.post('/api/weight/delete', {weight_id: item.weight.weight_id})
        if (result.data.code === 'C0000') {
          this.chartOption()
          this.initList()
          this.initDateList()
          console.log('delete success')
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }
    },
    onChange (val) {
      console.log('on-change', val)
      window._weight_selected_date = val
      this.weightDate = val
      this.initList()
      this.chartOption()
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
    getChartsOption (data, weight, args) {
      let option = {
        grid: {
          left: '0',
          right: '20px',
          bottom: '5px',
          top: '25px',
          containLabel: true
        },
        tooltip: {
          alwaysShowContent: false,
          backgroundColor: '#26A5FD',
          confine: true,
          formatter: (params) => {
            if (Object.prototype.toString.call(params) === '[object Array]') { // is array
              let res = params[0].name + '<br/>'
              for (let i = 0, length = params.length; i < length; i++) {
                params[i].value = params[i].value === '' ? '--' : params[i].value
                if (this.selectedRecordOption === 'BMI') { // 控制显示单位
                  res += params[i].seriesName + ': ' + params[i].value + '<br/>'
                } else {
                  res += params[i].seriesName + ': ' + params[i].value + 'kg<br/>'
                }
              }
              return res
            } else {
              let s = params.name + '<br/>'
              if (this.selectedRecordOption === 'BMI') { // 显示单位
                s += params.seriesName + ': ' + params.value
              } else {
                s += params.seriesName + ': ' + params.value + 'kg'
              }
              return s
            }
          },
          position: (point, params, dom, rect, size) => {
            // 固定在顶部
            return [point[0], '0%']
          },
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
        },
        xAxis: {
          data: data,
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLine: {
            show: true
          },
          axisPointer: {
            show: true,
            value: data[0],
            snap: true,
            label: {
              show: true,
              formatter: (params) => {
                return params.value
              },
              backgroundColor: '#26A5FD'
            },
            lineStyle: {
              color: '#26A5FD',
              width: 2,
              opacity: 0.5
            },
            handle: {
              show: true,
              color: '#26A5FD'
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'solid'
            }
          }
        },
        series: [{
          name: args,
          type: 'scatter',
          itemStyle: {
            normal: {
              color: '#26A5FD'
            }
          },
          label: {
            emphasis: {
              show: false,
              position: 'left',
              textStyle: {
                color: 'blue',
                fontSize: 16
              }
            }
          },
          data: weight
        }]
      }

      return option
    },
    openHealthTips (event) {
      this.$router.push({path: `/weightDetail/${event}`})
    },
    openDetail (item) {
      window.open(`http://lifehaier.com/News/Advisory/detail/id/${item.news_id}.html`)
    },
    fnGetAllData () {
      if (this.weightDate === '') {
        let _date = new Date()
        let day = _date.getDate() < 10 ? '0' + _date.getDate() : _date.getDate()
        this.weightDate = this.year + '-' + this.month + '-' + day
      }
      this.$router.push({ path: `/weight/history/${this.weightDate}` })
    },
    setOpacity (ele, opacity) {
      ele.style.opacity = opacity
    },
    fadeout (ele, time, callback) {
      window.fadeTimer = window.fadeTimer || 0
      clearInterval(window.fadeTimer)
      if (ele) {
        let v = 1
        let opacity = 1

        var count = time / 50
        var avg = opacity / count
        window.fadeTimer = setInterval(() => {
          if (v > 0) {
            v -= avg
            this.setOpacity(ele, v)
          } else {
            this.setOpacity(ele, 0)
            clearInterval(window.fadeTimer)
            callback && callback()
          }
        }, 50)
      }
    },
    fadein (ele, time, callback) {
      window.fadeTimer = window.fadeTimer || 0
      clearInterval(window.fadeTimer)
      if (ele) {
        let v = 0
        let opacity = 1

        var count = time / 50
        var avg = opacity / count
        window.fadeTimer = setInterval(() => {
          if (v < opacity) {
            v += avg
            this.setOpacity(ele, v)
          } else {
            this.setOpacity(ele, opacity)
            clearInterval(window.fadeTimer)
            callback && callback()
          }
        }, 50)
      }
    }
  }
}
