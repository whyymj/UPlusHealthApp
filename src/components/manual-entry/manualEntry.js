import axios from 'axios'
import { Toast } from 'mint-ui'
import 'swiper/dist/css/swiper.css'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'

export default {
  name: 'manual-entry',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      sugar: '',
      systolic: '',
      diastolic: '',
      temperature: '',
      weight: '',
      measureDefaultDay: new Date(),
      measureDefaultTime: this.formatTime(new Date()),
      pressureDefaultDay: new Date(),
      pressureDefaultTime: this.formatTime(new Date()),
      temperatureDefaultDay: new Date(),
      temperatureDefaultTime: this.formatTime(new Date()),
      weightDefaultDay: new Date(),
      hasTabHeader: this.$route.params.type,
      showType: '',
      weightDefaultTime: this.formatTime(new Date()),
      endHour: new Date().getHours(),
      measureDay: this.formatDate(new Date()), // 血糖默认测量日期
      measureTime: this.formatTime(new Date()), // 血糖默认测量时间
      pressureDay: this.formatDate(new Date()), // 血压默认测量日期
      pressureTime: this.formatTime(new Date()), // 血压默认测量时间
      temperatureDay: this.formatDate(new Date()), // 体温默认测量日期
      temperatureTime: this.formatTime(new Date()), // 体温默认测量时间
      weightDay: this.formatDate(new Date()), // 体重默认测量日期
      weightTime: this.formatTime(new Date()), // 体重默认测量时间
      measurePeriod: {id: '1', name: '餐前'}, // 血压测量时段
      dateSlots: [{
        flex: 1,
        values: [{id: '1', name: '餐前'}, {id: '2', name: '餐后'}],
        className: 'slot1',
        textAlign: 'center'
      }],
      periodValue: {},
      openPeriod: false,
      rulerOption: { // 血糖标尺
        slidesPerView: 25,
        centeredSlides: true,
        initialSlide: 63 - 11,
        pagination: {
          el: '.swiper-pagination',
          type: 'custom',
          renderCustom: (swiper, current, total) => {
            let sltNumber = `<div class="slt-ruler">${(current + 10) / 10}</div><div>mmol/L</div>`
            this.sugar = (current + 10) / 10
            return sltNumber
          }
        },
        virtual: {
          cache: true,
          slides: (function () {
            const slides = []
            for (let i = 10; i < 330; i++) {
              let ruler = ``
              if ((i + 1) % 5 === 0) {
                ruler = `<span class="ruler-long"></span><span class="ruler-num">${(i + 1) / 10}</span>`
              } else {
                ruler = `<span class="ruler-short"></span>`
              }
              slides.push(ruler)
            }
            return slides
          }())
        }
      },
      diastolicPressure: { // 舒张压（低压）标尺
        slidesPerView: 50,
        centeredSlides: true,
        initialSlide: 90 - 59,
        pagination: {
          el: '.swiper-pagination',
          type: 'custom',
          renderCustom: (swiper, current, total) => {
            var sltNumber = `<div class="slt-ruler">${current + 59}</div><div>mmHg</div>`
            this.systolic = current + 59
            return sltNumber
          }
        },
        virtual: {
          cache: true,
          slides: (function () {
            const slides = []
            for (let i = 59; i < 180; i++) {
              let ruler = ``
              if ((i + 1) % 10 === 0) {
                ruler = `<span class="ruler-long"></span><span class="ruler-num">${(i + 1)}</span>`
              } else {
                ruler = `<span class="ruler-short"></span>`
              }
              slides.push(ruler)
            }
            return slides
          }())
        }
      },
      systolicPressure: { // 收缩压（高压）标尺
        slidesPerView: 50,
        centeredSlides: true,
        initialSlide: 70 - 49,
        pagination: {
          el: '.swiper-pagination',
          type: 'custom',
          renderCustom: (swiper, current, total) => {
            var sltNumber = `<div class="slt-ruler">${current + 49}</div><div>mmHg</div>`
            this.diastolic = current + 49
            return sltNumber
          }
        },
        virtual: {
          cache: true,
          slides: (function () {
            const slides = []
            for (let i = 49; i < 150; i++) {
              let ruler = ``
              if ((i + 1) % 10 === 0) {
                ruler = `<span class="ruler-long"></span><span class="ruler-num">${(i + 1)}</span>`
              } else {
                ruler = `<span class="ruler-short"></span>`
              }
              slides.push(ruler)
            }
            return slides
          }())
        }
      },
      entryTemperature: { // 体温标尺
        slidesPerView: 25,
        centeredSlides: true,
        initialSlide: 375 - 349,
        pagination: {
          el: '.swiper-pagination',
          type: 'custom',
          renderCustom: (swiper, current, total) => {
            var sltNumber = `<div class="slt-ruler">${(current + 349) / 10}</div><div>℃</div>`
            this.temperature = (current + 349) / 10
            return sltNumber
          }
        },
        virtual: {
          cache: true,
          slides: (function () {
            const slides = []
            for (let i = 349; i < 420; i++) {
              let ruler = ``
              if ((i + 1) % 5 === 0) {
                ruler = `<span class="ruler-long"></span><span class="ruler-num">${(i + 1) / 10}</span>`
              } else {
                ruler = `<span class="ruler-short"></span>`
              }
              slides.push(ruler)
            }
            return slides
          }())
        }
      },
      entryWeight: { // 体重标尺
        slidesPerView: 200,
        centeredSlides: true,
        initialSlide: 700 - 300,
        pagination: {
          el: '.swiper-pagination',
          type: 'custom',
          renderCustom: (swiper, current, total) => {
            var sltNumber = `<div class="slt-ruler">${(current + 300) / 10}</div><div>KG</div>`
            this.weight = (current + 300) / 10
            return sltNumber
          }
        },
        virtual: {
          cache: true,
          slides: (function () {
            const slides = []
            for (let i = 300; i < 1200; i++) {
              let ruler = ``
              if ((i + 1) % 50 === 0) {
                ruler = `<span class="ruler-long"></span><span class="ruler-num">${(i + 1) / 10}</span>`
              } else if (((i + 1) % 10 === 0) && ((i + 1) % 50 !== 0)) {
                ruler = `<span class="ruler-short"></span>`
              }
              slides.push(ruler)
            }
            return slides
          }())
        }
      }
    }
  },
  mounted () {
    let winH = document.documentElement.clientHeight || document.body.clientHeight
    let pageTag = this.$refs.manualEntry
    pageTag.style.minHeight = winH + 'px'
    this.showType = this.hasTabHeader ? this.hasTabHeader : 'entry-sugar'
    if (this.showType === 'entry-sugar' && !this.hasTabHeader) {
      pageTag.style.marginBottom = '2.5rem'
    } else {
      pageTag.style.marginBottom = '0'
    }
  },
  methods: {
    cancelEntry () {
      this.$router.go(-1)
    },
    changeTab (event) {
      let tag = event.currentTarget
      this.showType = tag.dataset.tabs
      switch (this.showType) {
        case 'entry-sugar':
          this.$refs.manualEntry.style.marginBottom = '2.5rem'
          this.$refs.sugerSwiper.update()
          break
        case 'entry-pressure':
          this.$refs.manualEntry.style.marginBottom = '2.5rem'
          this.$refs.diastolicSwiper.update()
          this.$refs.systolicSwiper.update()
          break
        case 'entry-temperature':
          this.$refs.manualEntry.style.marginBottom = '0'
          this.$refs.temperatureSwiper.update()
          break
        case 'entry-weight':
          this.$refs.manualEntry.style.marginBottom = '0'
          this.$refs.weightSwiper.update()
          break
      }
    },
    async fnInsertData () {
      switch (this.showType) {
        case 'entry-sugar': // 血糖手动录入
          let sugarData = {
            member_id: window._member_id,
            glucose_data: this.sugar,
            create_date: this.measureDay + ' ' + this.measureTime,
            time_point: this.measurePeriod.id
          }
          try {
            const result = await axios.post('/api/sugar', sugarData)
            if (result.data.code === 'C0000') {
              this.$router.go(-1)
              console.log(result)
            } else {
              Toast({
                message: result.data.msg,
                className: 'wrong-results',
                duration: 2000
              })
            }
          } catch (err) {
            Toast({
              message: '网络有问题!',
              className: 'wrong-results',
              duration: 2000
            })
            console.log('err: ', err)
          }
          break
        case 'entry-pressure': // 血压手动录入
          console.log(this.systolic, this.diastolic)
          let pressureData = {
            member_id: window._member_id,
            systolic_pressure: this.systolic, // 收缩压(高压)
            diastolic_pressure: this.diastolic, // 舒张压(低压)
            create_date: this.pressureDay + ' ' + this.pressureTime
          }
          try {
            const result = await axios.post('/api/pressure', pressureData)
            if (result.data.code === 'C0000') {
              this.$router.go(-1)
              console.log('success')
            } else {
              Toast({
                message: result.data.msg,
                className: 'wrong-results',
                duration: 2000
              })
            }
          } catch (err) {
            Toast({
              message: '网络有问题!',
              className: 'wrong-results',
              duration: 2000
            })
            console.log('err: ', err)
          }
          break
        case 'entry-temperature': // 体温手动录入
          let temperatureData = {
            member_id: window._member_id,
            temperature_data: this.temperature,
            create_date: this.temperatureDay + ' ' + this.temperatureTime
          }
          try {
            const result = await axios.post('/api/temperature', temperatureData)
            if (result.data.code === 'C0000') {
              this.$router.go(-1)
              console.log('success')
            } else {
              Toast({
                message: result.data.msg,
                className: 'wrong-results',
                duration: 2000
              })
            }
          } catch (err) {
            Toast({
              message: '网络有问题!',
              className: 'wrong-results',
              duration: 2000
            })
            console.log('err: ', err)
          }
          break
        case 'entry-weight': // 体重手动录入
          let weightData = {
            member_id: window._member_id,
            weight: this.weight,
            create_date: this.weightDay + ' ' + this.weightTime
          }
          try {
            const result = await axios.post('/api/weight', weightData)
            if (result.data.code === 'C0000') {
              this.$router.go(-1)
              console.log('success')
            } else {
              Toast({
                message: result.data.msg,
                className: 'wrong-results',
                duration: 2000
              })
            }
          } catch (err) {
            Toast({
              message: '网络有问题!',
              className: 'wrong-results',
              duration: 2000
            })
            console.log('err: ', err)
          }
          break
      }
    },
    formatDate (date) {
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    },
    formatTime (date) {
      const h = date.getHours()
      let m = date.getMinutes()
      m = m < 10 ? '0' + m : m
      return h + ':' + m
    },
    openMeasureDate (picker) {
      switch (picker) {
        case 'measureTime':// 血糖
          if (this.measureDay === this.formatDate(new Date())) {
            this.endHour = new Date().getHours()
          } else {
            this.endHour = 23
          }
          break
        case 'pressureTime':// 血压
          if (this.pressureDay === this.formatDate(new Date())) {
            this.endHour = new Date().getHours()
          } else {
            this.endHour = 23
          }
          break
        case 'temperatureTime':// 体温
          if (this.temperatureDay === this.formatDate(new Date())) {
            this.endHour = new Date().getHours()
          } else {
            this.endHour = 23
          }
          break
        case 'weightTime':// 体重
          if (this.weightDay === this.formatDate(new Date())) {
            this.endHour = new Date().getHours()
          } else {
            this.endHour = 23
          }
          break
        default:
          break
      }
      this.$refs[picker].open()
    },
    handleMeasureDay (value) {
      // 血糖测量日期
      this.measureDay = this.formatDate(value)
      if (this.measureDay === this.formatDate(new Date())) {
        this.measureTime = this.formatTime(new Date())
        this.measureDefaultTime = this.formatTime(new Date())
      }
    },
    handleMeasureTime (value) {
      // 血糖测量时间
      this.measureTime = value
    },
    handlePressureDay (value) {
      // 血压测量日期
      this.pressureDay = this.formatDate(value)
      if (this.pressureDay === this.formatDate(new Date())) {
        this.pressureTime = this.formatTime(new Date())
        this.pressureDefaultTime = this.formatTime(new Date())
      }
    },
    handlePressureTime (value) {
      // 血压测量时间
      this.pressureTime = value
    },
    handleTemperatureDay (value) {
      // 体温测量日期
      this.temperatureDay = this.formatDate(value)
      if (this.temperatureDay === this.formatDate(new Date())) {
        this.temperatureTime = this.formatTime(new Date())
        this.temperatureDefaultTime = this.formatTime(new Date())
      }
    },
    handleTemperatureTime (value) {
      // 体温测量时间
      this.temperatureTime = value
    },
    handleWeightDay (value) {
      // 体重测量日期
      this.weightDay = this.formatDate(value)
      if (this.weightDay === this.formatDate(new Date())) {
        this.weightTime = this.formatTime(new Date())
        this.weightDefaultTime = this.formatTime(new Date())
      }
    },
    handleWeightTime (value) {
      // 体重测量时间
      this.weightTime = value
    },
    openMeasurePeriod () {
      this.openPeriod = true
    },
    periodChange (picker, values) {
      this.periodValue = values[0]
    },
    handleMeasurePeriod (value) {
      // 血糖测量时段
      this.measurePeriod = this.periodValue
      this.openPeriod = false
    }
  }
}
