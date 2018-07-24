<template>
  <div class="page temperature-page">
    <!-- <h-header title="体温"></h-header> -->
    <div class="container has-footer">
        <div class="temperature-record-list-c">
          <div v-for="(item, index) in temperatureRecordData" :key="index"
               :class="['temperature-record-list', 'card-container', {'temperature-toggle': index + 1 === temperatureIndex}]">

            <mt-cell-swipe
              :right="[
                {
                    content: '<div class='+'record-delete'+'>'+
                              '<i class='+'icon-delete'+'></i>'+
                              '<span>不可恢复</span>'+
                            '</div>',
                    style: { background: '#FF475D', color: '#fff'},
                    handler: () => deleteRecord(index, item)
                }
            ]">
              <div @click="openHealthTips(index + 1)"
                :class="['record-item']">
                <div class="record-mmHg">
                  <div :class="['icon-temperature-c', 'text-center',{'Standard-bg': item.suggestion.level === '1'},
                          {'up-bg': item.suggestion.level === '2' || item.suggestion.level === '3'},
                          {'low-bg': item.suggestion.level === '-2' || item.suggestion.level === '-3'}]">
                    <i class="icon-temperature"></i>
                  </div>
                  <div class="mmHg">
                    <div>
                      {{item.temperature.temperature_data}} <span>℃</span>
                    </div>
                  </div>
                </div>
                <div class="record-heart text-right">
                  <div class="record-heart-value">
                    <span :class="[{'Standard-bg': item.suggestion.level === '1'},
                          {'up-bg': item.suggestion.level === '2' || item.suggestion.level === '3'},
                          {'low-bg': item.suggestion.level === '-2' || item.suggestion.level === '-3'}]">
                      {{item.suggestion.symptom}}
                    </span>
                  </div>
                  <div class="record-heart-time">
                    <span>测量时间</span><span>{{item.temperature.create_date.split(' ')[1]}}</span>
                  </div>
                </div>
                <i class="fa fa-angle-right"></i>
              </div>
            </mt-cell-swipe>
            <div class="advise card-container">
              <h3 class="title">健康建议</h3>
              <p>{{item.suggestion.suggestion}}</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'temperatureHistory',
  data() {
      return {
          temperatureRecordData: [],
          date: this.$route.params.date,
          temperatureIndex: 1
      }
  },
  mounted() {
      this.GetAllData()
  },
  methods: {
      async GetAllData () {
          try {
              const result = await axios.get(`/api/temperature/three?member_id=${window._member_id}&date=${this.date}&limit=N`)
              if (result.data.code === 'C0000') {
                this.temperatureRecordData = result.data.data
              }
          } catch (err) {
              console.log(err)
          }
      },
      async deleteRecord (index, item) {
        try {
            const result = await axios.post('/api/temperature/delete', {temperature_id: item.temperature.temperature_id})
            if (result.data.code === 'C0000') {
                this.GetAllData()
                console.log('delete success...')
            } else {
                console.log('delete err')
            }
        } catch (err) {
            console.log('Whoops: ', err)
        }
    },
    openHealthTips (index) {
      this.temperatureIndex = this.temperatureIndex === index ? -index : index
    },
  }
}
</script>

<style lang="scss">
  @import './temperature.scss';
</style>

