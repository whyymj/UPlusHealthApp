<template>
  <div class="page weight">
    <!-- <h-header title="全部数据"></h-header> -->
    <div class="container has-footer">
        <div class="weight-list-c">
          <div v-for="(item, index) in weightRecordData" :key="index"
               :class="['weight-record-list', 'card-container']"
               @click="openHealthTips(item.weight.weight_id)">

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
              <div
                :class="['record-item']">
                <div class="record-mmHg">
                   <div :class="[{'Standard-bg': item.suggestion.level === '1'},
                          {'up-bg': item.suggestion.level === '2' || item.suggestion.level === '3'},
                          {'low-bg': item.suggestion.level === '-2' || item.suggestion.level === '-3'},'icon-weight-c', 'text-center']">
                    <i class="icon-weight"></i>
                  </div>
                  <div class="mmHg">
                    <div>
                      {{item.weight.weight}} <span>kg</span>
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
                    <span>测量时间</span><span>{{item.weight.create_date.split(' ')[1]}}</span>
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
  name: 'weightHistory',
  data() {
      return {
        weightRecordData: [],
      }
  },
  mounted() {
      this.GetAllData()
  },
  methods: {
      async GetAllData() {
          try {
              const result = await axios.get(`/api/weight/three?member_id=${window._member_id}&date=${this.$route.params.date}&limit=N`)
              if (result.data.code === 'C0000') {
                this.weightRecordData = result.data.data
              }
          } catch (err) {
              console.log(err)
          }
      },
      async deleteRecord (index, item) {
        try {
            const result = await axios.post('/api/weight/delete', {weight_id: item.weight.weight_id})
            if (result.data.code === 'C0000') {
                this.GetAllData()
                console.log('delete success')
            }
        } catch (err) {
            console.log('Whoops: ', err)
        }
    },
    openHealthTips (event) {
      this.$router.push({path: `/weightDetail/${event}`})
    },
  }
}
</script>

<style lang="scss">
  @import "./weight.scss";
</style>


