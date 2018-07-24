<template>
  <div class="page ecg-page">
    <!-- <h-header title="心电"></h-header> -->
    <div class="container has-footer">
        <div class="ecg-record-list-c">
          <div v-for="(item, index) in ecgRecordData" :key="index"
               :class="['ecg-record-list', 'card-container', {'ecg-toggle': index + 1 === ecgIndex}]">

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
                  <div :class="['icon-ecg-c', 'text-center',{'Standard-bg': item.suggestion.level === '1'},
                            {'up-bg': item.suggestion.level === '2' || item.suggestion.level === '3'}]">
                    <i class="icon-ecg"></i>
                  </div>
                  <div class="mmHg">
                    {{item.cardiogram.status}}
                  </div>
                </div>
                <div class="record-heart text-right">
                  <div class="record-heart-value">
                    <span :class="[{'Standard-bg': item.suggestion.level === '1'},
                            {'up-bg': item.suggestion.level === '2' || item.suggestion.level === '3'}]">
                      {{item.suggestion.symptom}}
                    </span>
                  </div>
                  <div class="record-heart-time">
                    <span>测量时间</span><span>{{item.cardiogram.create_date.split(' ')[1]}}</span>
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
  name: 'ECGHistory',
  data() {
      return {
        ecgRecordData: [],
        date: this.$route.params.date,
        ecgIndex: 1
      }
  },
  mounted() {
      this.GetAllData()
  },
  methods: {
    async GetAllData () {
        try {
            const result = await axios.get(`/api/ecg/three?member_id=${window._member_id}&date=${this.date}&limit=N`)
            if (result.data.code === 'C0000') {
                this.ecgRecordData = result.data.data
            }
        } catch (err) {
            console.log(err)
        }
    },
    async deleteRecord (index, item) {
      try {
        const result = await axios.post('/api/cardiogram/delete', {cardiogram_id: item.cardiogram.cardiogram_id})
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
      this.ecgIndex = this.ecgIndex === index ? -index : index
    },
  }
}
</script>

<style lang="scss">
  @import './ECG.scss';
</style>

