import axios from 'axios'
import myDatePicker from './myDatePicker.vue';
import mycollapse2 from '../sleep-music/mycollapse2.vue';
export default {
  name : 'pressure',
  components : {
    myDatePicker,
    mycollapse2
  },
  data() {
    return {
      showMyLoadingModal: true,
      ChooseTypePopupVisible: false,
      bluetoothVisible: false,
      popupVisible: false,
      bluetoothFail: false,
      popupSuccess: false,
      pressureLevel: '',
      newsResult: [],
      calendarOpen: false,
      pressureRecordData: [],
      recordOptions: [
        '最近七次', '周', '月', '年'
      ],
      selectedRecordOption: '最近七次',
      selectedRecordArgs: 'seven',
      pressureChartsOption: this.getChartsOption([], [], [], []),
      pressureDate: '',
      pressureIndex: 1,
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
      disableDateFunction(date) {
        return false
      }
    }
  },
  mounted() {
    var that = this;
    this.showMyLoadingModal = true
    setTimeout(function () {
      that.showMyLoadingModal = false;

    }, 10000)
    this.$nextTick(function () {
      this.chartOption('seven')

      if (window._pressure_selected_date) {
        this.value = window._pressure_selected_date
      }
    })
    this.initList()
  },
  methods : {
    checkDateData(date) {
      var str = date.year + '-' + (date.month > 9
        ? date.month
        : ('0' + date.month)) + '-' + (date.date > 9
        ? date.date
        : ('0' + date.date));
      this.onChange(str);
    },
    goManualEntry(type) {
      this
        .$router
        .push({path: `/manualEntry/${type}`})
    },
    addNewDevice() {
      this
        .$router
        .push({path: '/deviceType'})
    },
    addRecentlyDevice() {
      this.bluetoothVisible = true
    },
    openBluetooth() {
      this.bluetoothVisible = false
      this.popupVisible = true
    },

    onChange(val) {
      window._pressure_selected_date = val
      this.pressureDate = val
      this.initList()

    },
    switchTab(option) {
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
      this.fadeout(this.$refs.pressure.$el, 150, () => {
        this.chartOption(this.selectedRecordArgs, () => {
          this.fadein(this.$refs.pressure.$el, 300)
        })
      })
    },
    async initNews() {
      try {
        const result = await axios.get(`/api/news?id=3&level=${this.pressureLevel}`)
        console.log('result: ', result)
        this.newsResult = result.data
      } catch (err) {
        console.log('err: ', err)
      }

    },
    async initList() {
      try {
        const result = await axios.get(`/api/pressure/three?member_id=${window._member_id}&date=${this.pressureDate}&limit=N`)

        if (result.data.code === 'C0000') {
          console.log(result)
          if (result.data.data.length === 0) {
            // no record
            this.pressureRecordData = []
            this.$refs.noData.style.display = 'block'
            this.$refs.allData.style.display = 'none'
          } else {
            this.$refs.noData.style.display = 'none'
            if (result.data.data.length > 3) {
              result
                .data
                .data
                .splice(3)
              this.$refs.allData.style.display = 'block'
              this.pressureRecordData = result.data.data
            } else {
              this.$refs.allData.style.display = 'none'
              this.pressureRecordData = result.data.data
            }
            this.pressureLevel = this.pressureRecordData[0].suggestion.level
          }
          this.initNews()
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }
      this.showMyLoadingModal = false
    },
    async chartOption(args, callback) {
      try {
        const result = await axios.get(`/api/pressure/${args}?member_id=${window._member_id}`)

        if (result.data.code === 'C0000') {
          //        let d = result.data.data.diastolic_data        let s =
          // result.data.data.systolic_data        let c = args !== 'seven' ?
          // result.data.data.create_date : result.data.data.create_date.map(_ => {
          //   return _.split(' ')[0]        })        let t = result.data.data.time_list
          let d = args !== 'seven'
            ? result
              .data
              .data
              .map(item => {
                return item.diastolic_data
              })
            : result
              .data
              .data
              .map(item => {
                return [item.diastolic_pressure, item.diastolic_pressure]
              })
          let s = args !== 'seven'
            ? result
              .data
              .data
              .map(item => {
                return item.systolic_data
              })
            : result
              .data
              .data
              .map(item => {
                return [item.systolic_pressure, item.systolic_pressure]
              })
          let c = args !== 'seven'
            ? result
              .data
              .data
              .map(item => {
                return item.time
              })
            : result
              .data
              .data
              .map(item => {
                return item
                  .create_date
                  .split(' ')[0]
              })
          let t = args !== 'seven'
            ? result
              .data
              .data
              .map(item => {
                return item.date
              })
            : result
              .data
              .data
              .map(item => {
                return item.create_date
              })
          // this.$refs.pressure.$children[0] && this.$refs.pressure.$children[0].clear()
          if (d.length === 0 && s.length === 0) {
            if (args === 'seven') {
              this.$refs.noPressure.style.display = 'block'
              this.$refs.pressure.$el.style.display = 'none'
            } else {
              if (this.$refs.noPressure.style.display === 'none') {
                this.pressureChartsOption = this.getChartsOption([], [], [], [])
                // this.$refs.pressure.$children[0].mergeOptions(this.getChartsOption([], [],
                // [], []))
              }
            }
          } else {
            this.$refs.noPressure.style.display = 'none'
            this.$refs.pressure.$el.style.display = 'block'
            this.pressureChartsOption = this.getChartsOption(d, s, c, t)
            // this.$refs.pressure.$children[0] &&
            // this.$refs.pressure.$children[0].mergeOptions(this.getChartsOption(d, s, c,
            // t))
          }
          if (this.$refs.pressure.$children.length !== 0) {
            this
              .$refs
              .pressure
              .$children[0]
              .chart
              ._api
              .getZr()
              .on('mouseup', () => {
                this
                  .$refs
                  .pressure
                  .$children[0]
                  .chart
                  ._api
                  .dispatchAction({type: 'hideTip'})
              })
          }
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }

      callback && callback()
    },
    async deleteRecord(index, item) {
      try {
        const result = await axios.post('/api/pressure/delete', {bloodPressure_id: item.bloodPressure.bloodPressure_id})

        if (result.data.code === 'C0000') {
          this.chartOption(this.selectedRecordArgs)
          this.initList()
          console.log('delete success...')
        } else {
          console.log('delete err')
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }
    },
    getChartsOption(diastolicData, systolicData, createDate, date) {
      let startPoint = [] // 第一范围起始点
      let endPoint = [] // 第一范围结束点
      let startPointTwo = [] // 第二范围起始点
      let endPointTwo = [] // 第二范围结束点
      for (let i = 0; i < systolicData.length; i++) {
        let s1 = systolicData[i][0]
        let s2 = systolicData[i][1]
        let d1 = diastolicData[i][0]
        let d2 = diastolicData[i][1]
        if (s1 > d1) {
          startPoint.push(d1)
          if (s1 > d2) { // 没有交叉的情况
            endPoint.push(d2 - d1)
            startPointTwo.push(s1 - d2)
            endPointTwo.push(s2 - s1)
          } else { // 交叉或者包含
            endPoint.push(Math.max(s2, d2) - d1)
            startPointTwo.push(0) // 用0补位
            endPointTwo.push(0)
          }
        } else {
          startPoint.push(s1)
          if (s2 < d1) { // 没有交叉的情况
            endPoint.push(s2 - s1)
            startPointTwo.push(d1 - s2)
            endPointTwo.push(d2 - d1)
          } else { // 交叉或者包含
            endPoint.push(Math.max(s2, d2) - s1)
            startPointTwo.push(0) // 用0补位
            endPointTwo.push(0)
          }
        }
      }

      let option = {
        grid: {
          left: '0',
          right: '0',
          bottom: '5px',
          top: '25px',
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
            let foo = []
            if (Object.prototype.toString.call(params) === '[object Array]') { // is array
              if (this.selectedRecordArgs !== 'year' && this.selectedRecordArgs !== 'seven') {
                let index = createDate.findIndex(_ => {
                  return _ === params[0].name
                })
                foo[0] = date[index]
              } else {
                foo[0] = params[0].name
              }
              let res = foo[0] + '<br/>'
              if (this.selectedRecordArgs == 'seven') {
                res += params[0].seriesName + ': ' + params[0].value + 'mmHg<br/>' + params[2].seriesName + ': ' + params[2].value + 'mmHg'
              } else {
                for (let i = 0, length = params.length; i < length; i++) {
                  if (i % 2 === 0) {
                    params[i].value = !params[i].value
                      ? '--'
                      : params[i].value + 'mmHg'
                    params[i + 1].value = !params[i + 1].value
                      ? '--'
                      : params[i + 1].value + 'mmHg'
                    res += params[i].seriesName + ': ' + params[i].value + ' ~ ' + params[i + 1].value + '<br/>'
                  }
                }
              }

              return res
            } else {
              if (this.selectedRecordArgs !== 'year' && this.selectedRecordArgs !== 'seven') {
                let index = createDate.findIndex(_ => {
                  return _ === params.name
                })
                foo[0] = date[index]
              } else {
                foo[0] = params.name
              }
              let s = foo[0] + '<br/>'
              s += params.seriesName + ': ' + params.value + 'mmHg'
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
            value: createDate[0],
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
          data: createDate
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
          }
        },
        series: [
          {
            name: '收缩压（高压）',
            type: 'scatter',
            symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAICAYAAADJEc7MAAAAAX' +
                'NSR0IArs4c6QAAAOxJREFUGBljZEAD6kv/dv9nYCiBCzMy/mdkZCy4Gck4CS4GZDDBOA3//zOpL/s7A0' +
                'UTSPL/f8b///5NVF/2vxqmFkQzggiH/f9Znj//t+D/f4ZoEB8XACruvBnNXAGSZ9Re9Z/tz5//K////x' +
                '+ASwOyONCJU69HMeUyqi/9t/M/w383ZEkQm5GBcT+QEgHK6aLLASUXMmHTBNS2RVKK0YuFldGBgZHxFI' +
                'bG/wzx8MCBSTIyMqziVWcMOuDI+ONqGOM7Rm5GF2CoHoTJw2gUjUBN8yIjmSLPmjD+him46c/4WYiF0R' +
                'Po9O0wMRANAJJARcEvG/YSAAAAAElFTkSuQmCC',
            symbolRotate: 180,
            symbolSize: [
              7, 4
            ], // 空心标记的大小
            itemStyle: {
              normal: {
                color: '#26A5FD'
              }
            },
            data: systolicData.map(function (d) {
              return d[0]
            })
          }, {
            name: '收缩压（高压）',
            type: 'scatter',
            symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAICAYAAADJEc7MAAAAAX' +
                'NSR0IArs4c6QAAAOxJREFUGBljZEAD6kv/dv9nYCiBCzMy/mdkZCy4Gck4CS4GZDDBOA3//zOpL/s7A0' +
                'UTSPL/f8b///5NVF/2vxqmFkQzggiH/f9Znj//t+D/f4ZoEB8XACruvBnNXAGSZ9Re9Z/tz5//K////x' +
                '+ASwOyONCJU69HMeUyqi/9t/M/w383ZEkQm5GBcT+QEgHK6aLLASUXMmHTBNS2RVKK0YuFldGBgZHxFI' +
                'bG/wzx8MCBSTIyMqziVWcMOuDI+ONqGOM7Rm5GF2CoHoTJw2gUjUBN8yIjmSLPmjD+him46c/4WYiF0R' +
                'Po9O0wMRANAJJARcEvG/YSAAAAAElFTkSuQmCC',
            symbolRotate: 180,
            symbolSize: [
              7, 4
            ],
            itemStyle: {
              normal: {
                color: '#26A5FD'
              }
            },
            data: systolicData.map(function (d) {
              return d[1]
            })
          }, {
            name: '舒张压（低压）',
            type: 'scatter',
            symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAICAYAAADJEc7MAAAAAX' +
                'NSR0IArs4c6QAAAOxJREFUGBljZEAD6kv/dv9nYCiBCzMy/mdkZCy4Gck4CS4GZDDBOA3//zOpL/s7A0' +
                'UTSPL/f8b///5NVF/2vxqmFkQzggiH/f9Znj//t+D/f4ZoEB8XACruvBnNXAGSZ9Re9Z/tz5//K////x' +
                '+ASwOyONCJU69HMeUyqi/9t/M/w383ZEkQm5GBcT+QEgHK6aLLASUXMmHTBNS2RVKK0YuFldGBgZHxFI' +
                'bG/wzx8MCBSTIyMqziVWcMOuDI+ONqGOM7Rm5GF2CoHoTJw2gUjUBN8yIjmSLPmjD+him46c/4WYiF0R' +
                'Po9O0wMRANAJJARcEvG/YSAAAAAElFTkSuQmCC',
            symbolSize: [
              7, 4
            ],
            itemStyle: {
              normal: {
                color: '#26A5FD'
              }
            },
            data: diastolicData.map(function (d) {
              return d[0]
            })
          }, {
            name: '舒张压（低压）',
            type: 'scatter',
            symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAICAYAAADJEc7MAAAAAX' +
                'NSR0IArs4c6QAAAOxJREFUGBljZEAD6kv/dv9nYCiBCzMy/mdkZCy4Gck4CS4GZDDBOA3//zOpL/s7A0' +
                'UTSPL/f8b///5NVF/2vxqmFkQzggiH/f9Znj//t+D/f4ZoEB8XACruvBnNXAGSZ9Re9Z/tz5//K////x' +
                '+ASwOyONCJU69HMeUyqi/9t/M/w383ZEkQm5GBcT+QEgHK6aLLASUXMmHTBNS2RVKK0YuFldGBgZHxFI' +
                'bG/wzx8MCBSTIyMqziVWcMOuDI+ONqGOM7Rm5GF2CoHoTJw2gUjUBN8yIjmSLPmjD+him46c/4WYiF0R' +
                'Po9O0wMRANAJJARcEvG/YSAAAAAElFTkSuQmCC',
            symbolSize: [
              7, 4
            ],
            itemStyle: {
              normal: {
                color: '#26A5FD'
              }
            },
            data: diastolicData.map(function (d) {
              return d[1]
            })
          }, {
            name: '起始点',
            stack: true,
            type: 'bar',
            barGap: '0',
            barWidth: 7,
            data: startPoint,
            itemStyle: {
              normal: {
                color: 'transparent'
              }
            },
            tooltip: {
              show: false
            }
          }, {
            name: '范围',
            stack: true,
            type: 'bar',
            barGap: '0',
            barWidth: 6,
            data: endPoint,
            itemStyle: {
              normal: {
                color: '#26A5FD',
                opacity: 0.2
              }
            },
            tooltip: {
              show: false
            }
          }, {
            name: '第二范围起始点',
            stack: true,
            type: 'bar',
            barGap: '0',
            barWidth: 7,
            data: startPointTwo,
            itemStyle: {
              normal: {
                color: 'transparent'
              }
            },
            tooltip: {
              show: false
            }
          }, {
            name: '第二段范围',
            stack: true,
            type: 'bar',
            barGap: '0',
            barWidth: 6,
            data: endPointTwo,
            itemStyle: {
              normal: {
                color: '#26A5FD',
                opacity: 0.2
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
    openHealthTips(index) {
      this.pressureIndex = this.pressureIndex === index
        ? -index
        : index
    },
    openDetail(item) {
      this
      .$router
      .push({
        path: '/newsAbout',
        query: {
          url: `http://lifehaier.com/News/Advisory/detail/id/${item.news_id}.html`
        }
      })
    },
    fnGetAllData() {
      if (this.pressureDate === '') {
        let _date = new Date()
        let day = _date.getDate() < 10
          ? '0' + _date.getDate()
          : _date.getDate()
        this.pressureDate = this.year + '-' + this.month + '-' + day
      }
      this
        .$router
        .push({path: `/pressure/history/${this.pressureDate}`})
    },
    setOpacity(ele, opacity) {
      ele.style.opacity = opacity
    },
    fadeout(ele, time, callback) {
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
    fadein(ele, time, callback) {
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
