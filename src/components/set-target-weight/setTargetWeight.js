import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'

export default {
  name: 'set-target-weight',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      weightRange: [],
      weightRangeDesc: [],
      targetWeight: '',
      entryWeight: { // 体重标尺
        slidesPerView: 200,
        centeredSlides: true,
        initialSlide: 700 - 300, // 默认体重
        pagination: {
          el: '.swiper-pagination',
          type: 'custom',
          renderCustom: (swiper, current, total) => {
            let sltNumber = `<div class="slt-ruler">${(current + 300) / 10}</div><div>KG</div>`
            this.targetWeight = (current + 300) / 10
            if (((current + 300) / 10) < this.weightRange[0]) {
              this.$refs.weightScale.style.left = '2.4rem'
            } else if (((current + 300) / 10) > this.weightRange[1]) {
              this.$refs.weightScale.style.left = '11rem'
            } else {
              this.$refs.weightScale.style.left = '50%'
            }
            return sltNumber
          }
        },
        virtual: {
          slides: (function () {
            const slides = []
            for (let i = 300; i < 1200; i++) {
              let ruler = ``
              if ((i + 1) % 50 === 0) {
                ruler = `<span class="ruler-long"></span><span class="ruler-num">${(i + 1) / 10}</span>`
              } else if ((i + 1) % 10 === 0) {
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
    this.initWeightInfo()
    this.$nextTick(function () {
      
      this.$refs.weightSwiper.swiper.virtual.update()
      this.$refs.weightSwiper.update()
    })
  },
  methods: {
    async initWeightInfo () {
      try {
        const result = await axios.get(`/api/weight/info?member_id=${window._member_id}`)
        console.log(result)
        if (result.data.code === 'C0000') {
          this.weightRange = result.data.data.perfect_weight_range
          this.weightRangeDesc = result.data.data.perfect_weight_describe
        }
      } catch (err) {
        console.log('err: ', err)
      }
    },
    async fnInsertData () {
      try {
        let obj = {
          target_weight: this.targetWeight,
          member_id: window._member_id
        }
        let result
        if (window._member_id === '') { // set user target weight
          result = await axios.post('/api/user/update/target', obj)
          if (result.data.code === 'C0000') {
            this.$router.replace({path: '/weight'})
            console.log('success')
          }
        } else {
          result = await axios.post('/api/member/info', obj)
          if (result.data.code === 'C0000') {
            this.$router.replace({path: '/weight'})
            console.log('success')
          }
        }
      } catch (err) {
        console.log('err: ', err)
      }
    },
    cancelInsert () {
      this.$router.replace({path: '/weight'})
    }
  }
}
