import axios from 'axios'
import {Loading} from 'element-ui';
import myDatePicker from '../pressure/myDatePicker.vue';
import mycollapse2 from '../sleep-music/mycollapse2.vue';
export default {
  name: 'temperature',
  components: {
    myDatePicker,
    mycollapse2,
    Loading
  },
  data () {
    return {
      loadingmodal: '',
      ChooseTypePopupVisible: false,
      bluetoothVisible: false,
      popupSuccess: false,
      popupVisible: false,
      bluetoothFail: false,
      temperatureLevel: '',
      newsResult: [],
      calendarOpen: false,
      temperatureRecordData: [],
      recordOptions: ['最近七次', '周', '月', '年'],
      selectedRecordOption: '最近七次',
      selectedRecordArgs: 'seven',
      temperatureType: ['体温', '持续体温'],
      selectTemperature: '体温',
      temperatureChartsOption: this.getLastSevenChart([], []),
      temperatureDate: '',
      temperatureIndex: 1,
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
    var that = this;
    this.loadingmodal = Loading.service({fullscreen: true, background: 'rgba(0, 0, 0, 0.7)', lock: true, text: 'Loading', spinner: 'el-icon-loading'});
    setTimeout(function () {
      that
        .loadingmodal
        .close();
    }, 10000)
    this.initList()
    this.$nextTick(function () {
      this.chartOption('seven')
      document.getElementsByClassName('calendar-header')[0].style.display = 'none'
      if (window._temperature_selected_date) {
        this.value = window._temperature_selected_date
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
    onChange (val) {
      console.log('on-change', val)
      window._temperature_selected_date = val
      this.temperatureDate = val
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
    toggleTemperature (option) {
      this.selectTemperature = option
      if (option === '体温') {
        console.log(1, this.selectedRecordOption)
        this.fadeout(this.$refs.temperature.$el, 150, () => {
          this.chartOption(this.selectedRecordArgs, () => {
            this.fadein(this.$refs.temperature.$el, 300)
          })
        })
        // this.chartOption(this.selectedRecordArgs)
        this.$refs.chartOption.style.visibility = 'visible'
      } else {
        console.log(2)
        this.fadeout(this.$refs.temperature.$el, 150, () => {
          this.$refs.temperature.$children[0].mergeOptions(this.getContinueChart(() => {
            this.fadein(this.$refs.temperature.$el, 300)
          }))
        })
        // this.$refs.temperature.$children[0].mergeOptions(this.getContinueChart())
        this.$refs.chartOption.style.visibility = 'hidden'
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
      // this.chartOption(this.selectedRecordArgs)
      this.fadeout(this.$refs.temperature.$el, 150, () => {
        this.chartOption(this.selectedRecordArgs, () => {
          this.fadein(this.$refs.temperature.$el, 300)
        })
      })
    },
    async initNews () {
      try {
        const result = await axios.get(`/api/news?id=2&level=${this.temperatureLevel}`)
        console.log(result)
        this.newsResult = result.data
      } catch (err) {
        console.log('err: ', err)
      }
    },
    async initList () {
      try {
        const result = await axios.get(`/api/temperature/three?member_id=${window._member_id}&date=${this.temperatureDate}&limit=N`)
        if (result.data.code === 'C0000') {
          console.log(result)
          if (result.data.data.length === 0) {
            this.temperatureRecordData = []
            this.$refs.noData.style.display = 'block'
            this.$refs.allData.style.display = 'none'
          } else {
            this.$refs.noData.style.display = 'none'
            if (result.data.data.length > 3) {
              result.data.data.splice(3)
              this.$refs.allData.style.display = 'block'
              this.temperatureRecordData = result.data.data
            } else {
              this.$refs.allData.style.display = 'none'
              this.temperatureRecordData = result.data.data
            }
            this.temperatureLevel = this.temperatureRecordData[0].suggestion.level
          }
          this.initNews()
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }
      this
      .loadingmodal
      .close();
    },
    async chartOption (args, callback) {
      try {
        const result = await axios.get(`/api/temperature/${args}?member_id=${window._member_id}`)
        if (result.data.code === 'C0000') {
          let s = args === 'seven' ? result.data.data.map((_, i) => {
            return +_[1]
          }) : result.data.data
          let d = args === 'seven' ? result.data.data.map((_, i) => {
            return _[0].split(' ')[0]
          }) : result.data.data
          console.log('args: ', result)
          // this.$refs.temperature.$children[0] && this.$refs.temperature.$children[0].clear()
          if (s.length === 0) {
            // TODO: no record
            if (args === 'seven') {
              this.$refs.noTemperature.style.display = 'block'
              this.$refs.temperature.$el.style.display = 'none'
            } else {
              if (this.$refs.noTemperature.style.display === 'none') {
                this.temperatureChartsOption = args === 'seven' ? this.getLastSevenChart([], []) : this.getChartsOption(d)
                // this.$refs.temperature.$children[0].mergeOptions(args === 'seven' ? this.getLastSevenChart([], []) : this.getChartsOption(d))
              } else {
                this.$refs.noTemperature.style.display = 'block'
                this.$refs.temperature.$el.style.display = 'none'
              }
            }
          } else {
            this.temperatureChartsOption = args === 'seven' ? this.getLastSevenChart(d, s) : this.getChartsOption(d)
            // this.$refs.temperature.$children[0] && this.$refs.temperature.$children[0].mergeOptions(args === 'seven' ? this.getLastSevenChart(d, s) : this.getChartsOption(d))
          }
          if (this.$refs.temperature.$children.length !== 0) {
            this.$refs.temperature.$children[0].chart._api.getZr().on('mouseup', () => {
              this.$refs.temperature.$children[0].chart._api.dispatchAction({
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
    async initDateList () {
      try {
        const result = await axios.get(`/api/health/list?member_id=${window._member_id}&flag=2&begin=${this.firstDate}&end=${this.lastDate}`)
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
      console.log(item)
      try {
        const result = await axios.post('/api/temperature/delete', {temperature_id: item.temperature.temperature_id})
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
                params[i].value = params[i].value === '' ? '--' : params[i].value + '℃'
                res += params[i].seriesName + ': ' + params[i].value + '<br/>'
              }
              return res
            } else {
              let s = params.name + '<br/>'
              s += params.seriesName + ': ' + params.value + '℃'
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
          min: 35,
          max: 42,
          axisLine: {
            show: false
          },
          axisTick: {
            length: 8
          }
        },
        series: [{
          name: '体温',
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
            if (Object.prototype.toString.call(params) === '[object Array]') {
              if (this.selectedRecordArgs !== 'year') {
                foo = data.filter(_ => {
                  return _.time === params[0].name
                })
              } else {
                foo[0].date = params[0].name
              }
              let res = foo[0].date + '<br/>'
              for (let i = 0, length = params.length; i < length; i++) {
                params[i].value = params[i].value === '' ? '--' : params[i].value + '℃'
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
              s += params.seriesName + ': ' + params.value + '℃'
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
    getContinueChart (callback) {
      /* 持续体温 */
      this.$refs.temperature.$children[0].clear()
      let date = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
      let data = [
        0, 0, 0, 0, 0, 0, 0, 0,
        38.5,
        {
          value: 39.2,
          symbol: 'emptyCircle',
          symbolSize: 8,
          itemStyle: {
            normal: {
              borderColor: '#FF475D'
            }
          }
        },
        39.5,
        0, 0, 0, 0, 0, 0, 0, 0, 0]
      let option = {
        animation: false,
        grid: {
          left: '0',
          right: '20px',
          bottom: '5px',
          top: '25px',
          containLabel: true
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        series: [
          {
            name: '模拟数据',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              normal: {
                color: '#1495eb'
              }
            },
            areaStyle: {
              normal: {
                type: 'solid',
                color: '#1495eb',
                opacity: '0.2'
              }
            },
            markPoint: {
              symbol: 'roundRect',
              symbolSize: [36, 20],
              symbolOffset: ['-50%', '-100%'],
              data: [
                {
                  type: 'max',
                  name: '最大值',
                  itemStyle: {
                    normal: {
                      color: '#FF475D'
                    }
                  }
                }
              ]
            },
            data: data
          }
        ]
      }

      callback && callback()
      return option
    },
    openHealthTips (index) {
      this.temperatureIndex = this.temperatureIndex === index ? -index : index
    },
    openDetail (item) {
      window.open(`http://lifehaier.com/News/Advisory/detail/id/${item.news_id}.html`)
    },
    fnGetAllData () {
      if (this.temperatureDate === '') {
        let _date = new Date()
        let day = _date.getDate() < 10 ? '0' + _date.getDate() : _date.getDate()
        this.temperatureDate = this.year + '-' + this.month + '-' + day
      }
      this.$router.push({ path: `/temperature/history/${this.temperatureDate}` })
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
