<template>
  <div class="page pressure-page">
	<!-- <h-header title="血压"></h-header> -->
    <div class="container has-footer">
        <div class="pressure-record-list-c">
          <div v-for="(item, index) in pressureRecordData" :key="index"
               :class="['pressure-record-list', 'card-container', {'pressure-toggle': index + 1 === pressureIndex}]">

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
                  <div :class="['icon-pressure-c', 'text-center', {'Standard-bg': item.suggestion.level === '1'},
                          {'up-bg': item.suggestion.level === '2' || item.suggestion.level === '3'},
                          {'low-bg': item.suggestion.level === '-2' || item.suggestion.level === '-3'}]">
                    <i class="icon-pressure"></i>
                  </div>
                  <div class="mmHg">
                    <div>
                      {{item.bloodPressure.systolic_pressure}}/{{item.bloodPressure.diastolic_pressure}} <span>mmHg</span>
                      <div
                        :class="[{'Standard-bg': item.suggestion.level === '1'},
                          {'up-bg': item.suggestion.level === '2' || item.suggestion.level === '3'},
                          {'low-bg': item.suggestion.level === '-2' || item.suggestion.level === '-3'},'pressure-warning', 'text-center', {'hidden': item.suggestion.level === '1'}]">
                        {{item.bloodPressure.status}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="record-heart text-right">
                  <div v-if="item.bloodPressure.heart_rate !== ''" class="record-heart-value">
                    <span>心率</span><span>{{item.bloodPressure.heart_rate}}</span>
                  </div>
                  <div class="record-heart-time">
                    <span>测量时间</span><span>{{item.bloodPressure.create_date.split(' ')[1]}}</span>
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
  name: 'pressureHistory',
  data() {
      return {
          pressureRecordData: [],
          date: this.$route.params.date,
          pressureIndex: 1
      }
  },
  mounted() {
      this.GetAllData()
  },
  methods: {
      async GetAllData () {
          try {
              const result = await axios.get(`/api/pressure/three?member_id=${window._member_id}&date=${this.date}&limit=N`)
              if (result.data.code === 'C0000') {
                this.pressureRecordData = result.data.data
              }
          } catch (err) {
              console.log(err)
          }
      },
      async deleteRecord (index, item) {
        try {
            const result = await axios.post('/api/pressure/delete', {
                bloodPressure_id: item.bloodPressure.bloodPressure_id
            })
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
      this.pressureIndex = this.pressureIndex === index ? -index : index
    },
  }
}
</script>
<style lang="scss">
	@import './pressure.scss';
</style>

