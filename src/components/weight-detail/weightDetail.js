import axios from 'axios'

export default {
  name: 'weightDetail',
  data () {
    return {
      weightReport: {},
      weightIndex: {},
      seriousIndex: 0,
      dangerIndex: 0,
      normalIndex: 0,
      progessValue: 0,
      option: {
        backgroundColor: '#ffffff',
        title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 60,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: [
              {value: 335, name: '蛋白质(16.2%)', color: '#FF4156'},
              {value: 310, name: '水含量(43.2%)', color: '#00D3E0'},
              {value: 274, name: '脂肪(17.0%)', color: '#AB7EF6'},
              {value: 235, name: '基础代谢(20.5%)', color: '#FF4156'}
            ].sort((a, b) => {
              return a.value - b.value
            }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: this.color
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: this.color
                },
                smooth: 0.2,
                length: 10,
                length2: 10
              }
            },
            itemStyle: {
              normal: {
                color: this.color
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.initDetail()
    this.initReport()
  },
  methods: {
    async initDetail () {
      try {
        const result = await axios.get(`/api/weight/index?weight_id=${this.$route.params.weight_id}`)
        if (result.data.code === 'C0000') {
          this.weightIndex = result.data.data
          if (this.weightIndex.serious_list.length === 0) {
            // 不显示警告指标
            this.$refs.seriousType.style.display = 'none'
          }
          if (this.weightIndex.danger_list.length === 0) {
            // 不显示危险指标
            this.$refs.dangerType.style.display = 'none'
          }
          if (this.weightIndex.normal_list.length === 0) {
            // 不显示正常指标
            this.$refs.normalType.style.display = 'none'
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    async initReport () {
      try {
        const result = await axios.get(`/api/weight/report?weight_id=${this.$route.params.weight_id}`)
        console.log(result)
        this.weightReport = result.data.data
        let diff = (((Math.floor(this.weightReport.need_change)) / this.weightReport.standard_weight) * 100) / 2
        if (diff < -50) {
          diff = -50
        }
        this.progessValue = 50 - diff
      } catch (err) {
        console.log(err)
      }
    },
    openSeriousTips (index) {
      this.seriousIndex = index === this.seriousIndex ? -index : index
    },
    openDangerTips (index) {
      this.dangerIndex = index === this.dangerIndex ? -index : index
    },
    openNormalTips (index) {
      this.normalIndex = index === this.normalIndex ? -index : index
    }
  }
}
