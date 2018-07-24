<template>
  <div class="page oxygen-page">
        <!-- <h-header title="全部数据"></h-header> -->
        <div class="container has-footer">
        <div class="oxygen-record-list-c">
          <div v-for="(item, index) in oxygenRecordData" :key="index"
               :class="['oxygen-record-list', 'card-container', {'oxygen-toggle': index + 1 === oxygenIndex}]">

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
                  <div :class="['icon-oxygen-c', 'text-center', {'Standard-bg': item.suggestion.level === '1'},
                        {'low-bg': item.suggestion.level === '-2' || item.suggestion.level === '-3'}]">
                    <i class="icon-oxygen"></i>
                  </div>
                  <div class="mmHg">
                    <div>
                      {{item.oxygen.oxygen}} <span>%</span>
                    </div>
                  </div>
                </div>
                <div class="record-heart text-right">
                  <div class="record-heart-value">
                    <span :class="[{'Standard-bg': item.suggestion.level === '1'},
                            {'low-bg': item.suggestion.level === '-2' || item.suggestion.level === '-3'}]">
                      {{item.suggestion.symptom}}
                    </span>
                  </div>
                  <div class="record-heart-time">
                    <span>测量时间</span><span>{{item.oxygen.create_date.split(' ')[1]}}</span>
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
  name: 'oxygenHistory',
  data() {
      return {
        oxygenRecordData: [],
        date: this.$route.params.date,
        oxygenIndex: 1
      }
  },
  mounted() {
      this.GetAllData()
  },
  methods: {
    async GetAllData () {
        try {
            const result = await axios.get(`/api/oxygen/three?member_id=${window._member_id}&date=${this.date}&limit=N`)
            if (result.data.code === 'C0000') {
                this.oxygenRecordData = result.data.data
            }
        } catch (err) {
            console.log(err)
        }
    },
    async deleteRecord (index, item) {
      try {
        const result = await axios.post('/api/oxygen/delete', {oxygen_id: item.oxygen.oxygen_id})
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
      this.oxygenIndex = this.oxygenIndex === index ? -index : index
    },
  }
}
</script>

<style lang="scss">
  @import './oxygen.scss';
</style>