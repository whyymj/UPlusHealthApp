import axios from 'axios'

export default {
  name: 'sugar',
  data () {
    return {
      ChooseTypePopupVisible: false,
      bluetoothVisible: false,
      popupSuccess: false,
      popupVisible: false,
      bluetoothFail: false,
      sugarLevel: '',
      newsResult: [],
      calendarOpen: false,
      sugarRecordData: [],
      recordOptions: ['最近七次', '周', '月', '年'],
      selectedRecordOption: '最近七次',
      selectedRecordArgs: 'seven',
      sugarChartsOption: this.getLastSevenChart([], []),
      sugarDate: '',
      sugarIndex: 1,
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
      this.chartOption('seven')
      document.getElementsByClassName('calendar-header')[0].style.display = 'none'
      if (window._suger_selected_date) {
        this.value = window._suger_selected_date
        this.toggleOpenCalendar()
      }
    })
  },
  methods: {
    goManualEntry (type) {
      this.$router.push({path: `/manualEntry/${type}`})
    },
    addNewDevice () {
      this.$router.push({
        path: '/deviceType'
      })
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
      window._suger_selected_date = val
      this.sugarDate = val
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
    switchTab (option) {
      // 切换图表标签页
      this.selectedRecordOption = option
      switch (option) {
        case '最近七次':
          this.selectedRecordArgs = 'seven'
          break
        case '周':
          this.selectedRecordArgs = 'week'
          break
        case '月':
          this.selectedRecordArgs = 'month'
          break
        case '年':
          this.selectedRecordArgs = 'year'
          break
        default:
          break
      }

      this.fadeout(this.$refs.sugar.$el, 150, () => {
        this.chartOption(this.selectedRecordArgs, () => {
          this.fadein(this.$refs.sugar.$el, 300)
        })
      })
    },
    async initNews () {
      try {
        const result = await axios.get(`/api/news?id=4&level=${this.sugarLevel}`)
        console.log(result)
        this.newsResult = result.data
      } catch (err) {
        console.log('err: ', err)
      }
    },
    async initList () {
      try {
        const result = await axios.get(`/api/sugar/three?member_id=${window._member_id}&date=${this.sugarDate}&limit=N`)
        if (result.data.code === 'C0000') {
          console.log(result)
          if (result.data.data.length === 0) {
            this.sugarRecordData = []
            this.$refs.noData.style.display = 'block'
            this.$refs.allData.style.display = 'none'
          } else {
            this.$refs.noData.style.display = 'none'
            if (result.data.data.length > 3) {
              result.data.data.splice(3)
              this.$refs.allData.style.display = 'block'
              this.sugarRecordData = result.data.data
            } else {
              this.$refs.allData.style.display = 'none'
              this.sugarRecordData = result.data.data
            }
            this.sugarLevel = this.sugarRecordData[0].suggestion.level
          }
          this.initNews()
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }
    },
    async initDateList () {
      try {
        const result = await axios.get(`/api/health/list?member_id=${window._member_id}&flag=4&begin=${this.firstDate}&end=${this.lastDate}`)
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
    async chartOption (args, callback) {
      try {
        const result = await axios.get(`/api/sugar/${args}?member_id=${window._member_id}`)
        if (result.data.code === 'C0000') {
          let s = args === 'seven' ? result.data.data.map((_, i) => {
            return [i, +_[1], _[2]]
          }) : result.data.data
          let d = args === 'seven' ? result.data.data.map((_, i) => {
            return _[0].split(' ')[0]
          }) : result.data.data
          this.$refs.sugar.$children[0] && this.$refs.sugar.$children[0].clear()
          if (d.length === 0 && s.length === 0) {
            // TODO: no record
            if (args === 'seven') {
              this.$refs.noSugar.style.display = 'block'
              this.$refs.sugar.$el.style.display = 'none'
            } else {
              if (this.$refs.noSugar.style.display === 'none') {
                this.$refs.sugar.$children[0].mergeOptions(args === 'seven' ? this.getLastSevenChart([], []) : this.getChartsOption([]))
              }
            }
          } else {
            this.$refs.noSugar.style.display = 'none'
            this.$refs.sugar.$el.style.display = 'block'
            this.$refs.sugar.$children[0] && this.$refs.sugar.$children[0].mergeOptions(args === 'seven' ? this.getLastSevenChart(d, s) : this.getChartsOption(d))
          }
          if (this.$refs.sugar.$children.length !== 0) {
            this.$refs.sugar.$children[0].chart._api.getZr().on('mouseup', () => {
              this.$refs.sugar.$children[0].chart._api.dispatchAction({
                type: 'hideTip'
              })
            })
          }
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }

      callback && callback()
    },
    async deleteRecord (index, item) {
      console.log(item)
      try {
        const result = await axios.post('/api/sugar/delete', {
          bloodsugar_id: item.bloodSugar.bloodSugar_id
        })
        if (result.data.code === 'C0000') {
          this.chartOption(this.selectedRecordArgs)
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
    getLastSevenChart (x, data) {
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
                // params[i].value = params[i].value === '' ? '--' : params[i].value + 'mmol/L'
                res += `${params[i].seriesName}(${params[i].data[2]}):${params[i].data[1]}mmol/L<br/>`
              }
              return res
            } else {
              let s = params.name + '<br/>'
              s += `${params.seriesName}(${params.data[2]}):${params.data[1]}mmol/L`
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
          data: x,
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLine: {
            show: false
          },
          axisPointer: {
            show: true,
            value: x[0],
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
          },
          boundaryGap: [0, '50%'],
          min: 0,
          max: 15,
          minInterval: 5,
          maxIntervaL: 5,
          axisLine: {
            show: false
          },
          axisTick: {
            length: 8
          }
        },
        series: [{
          name: '血糖',
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
          data: data
        }]
      }

      return option
    },
    getChartsOption (data) {
      let option = {
        grid: {
          left: '0',
          right: '0',
          bottom: '5px',
          top: '30px',
          containLabel: true
        },
        textStyle: {
          color: '#aaa'
        },
        tooltip: {
          alwaysShowContent: false,
          backgroundColor: '#26A5FD',
          confine: true,
          formatter: (params) => {
            let foo = [{}]
            if (Object.prototype.toString.call(params) === '[object Array]') { // is array
              if (this.selectedRecordArgs !== 'year') {
                foo = data.filter(_ => {
                  return _.time === params[0].name
                })
              } else {
                foo[0].date = params[0].name
              }
              let res = foo[0].date + '<br/>'
              for (let i = 0, length = params.length; i < length; i++) {
                params[i].value = params[i].value === '' ? '--' : params[i].value + 'mmol/L'
                res += params[i].seriesName + ': ' + params[i].value + '<br/>'
              }
              return res
            } else {
              if (this.selectedRecordArgs !== 'year') {
                foo = data.filter(_ => {
                  return _.time === params.name
                })
              } else {
                foo[0].date = params.name
              }
              let s = foo[0].date + '<br/>'
              s += params.seriesName + ': ' + params.value + 'mmol/L'
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
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#efefef'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#efefef',
              type: 'dashed'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#3c3939'
            }
          },
          axisPointer: {
            show: true,
            value: data[0].time,
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
          },
          data: data.map(_ => { return _.time })
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#efefef',
              type: 'dashed'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#efefef'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#3c3939'
            }
          },
          min: () => {
            let minNum = data.map(_ => {
              return _.min
            })
            let minLine = Math.min.apply(null, minNum) - 2
            return Math.round(minLine) > 0 ? Math.round(minLine) : 0
          }
        },
        series: [
          {
            name: '最低',
            type: 'scatter',
            symbolSize: 6, // 空心标记的大小
            itemStyle: {
              normal: {
                color: '#26A5FD'
              }
            },
            markPoint: {
              symbol: 'circle',
              symbolSize: 3,
              itemStyle: {
                normal: {
                  color: '#fff'
                }
              },
              label: {
                position: 'bottom',
                color: '#26A5FD',
                formatter: (params) => {
                  return '最低' + '\n' + params.value
                }
              },
              data: [{
                type: 'min',
                name: '最低'
              }]
            },
            data: data.map(d => {
              return d.min
            })
          },
          {
            name: '最高',
            type: 'scatter',
            symbolSize: 6, // 空心标记的大小
            itemStyle: {
              normal: {
                color: '#26A5FD'
              }
            },
            markPoint: {
              symbol: 'circle',
              symbolSize: 3,
              itemStyle: {
                normal: {
                  color: '#fff'
                }
              },
              label: {
                position: 'top',
                color: '#26A5FD',
                formatter: (params) => {
                  return '最高' + '\n' + params.value
                }
              },
              data: [{
                type: 'max',
                name: '最高'
              }]
            },
            data: data.map(d => {
              return d.max
            })
          },
          {
            name: '起始点',
            stack: true,
            type: 'bar',
            barGap: '0',
            barWidth: 6,
            data: data.map(d => { return d.min }),
            itemStyle: {
              normal: {
                color: 'transparent'
              }
            },
            tooltip: {
              show: false
            }
          },
          {
            name: '范围',
            stack: true,
            type: 'bar',
            barGap: '0',
            barWidth: 7,
            data: data.map(d => {
              if (d.min === d.max) {
                return 0
              } else {
                return d.max - d.min
              }
            }),
            itemStyle: {
              normal: {
                color: '#26A5FD'
              }
            },
            tooltip: {
              show: false
            }
          }
        ]
      }

      return option
    },
    openHealthTips (index) {
      this.sugarIndex = this.sugarIndex === index ? -index : index
    },
    openDetail (item) {
      window.open(`http://lifehaier.com/News/Advisory/detail/id/${item.news_id}.html`)
    },
    fnGetAllData () {
      if (this.sugarDate === '') {
        let _date = new Date()
        let day = _date.getDate() < 10 ? '0' + _date.getDate() : _date.getDate()
        this.sugarDate = this.year + '-' + this.month + '-' + day
      }
      this.$router.push({ path: `/bloodSugar/history/${this.sugarDate}` })
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
