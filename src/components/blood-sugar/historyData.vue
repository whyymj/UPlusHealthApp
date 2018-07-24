<template>
  <div class="page suger-page">
        <!-- <h-header title="全部数据"></h-header> -->
        <div class="container has-footer">
            <div class="calendar-below">
                <div class="sugar-record-list-c">
                <div v-for="(item, index) in sugarRecordData" :key="index"
                    :class="['sugar-record-list', 'card-container', {'sugar-toggle': index + 1 === sugarIndex}]">

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
                            <div :class="['icon-sugar-c', 'text-center',{'Standard-bg': item.suggestion.level === '1'},
                            {'up-bg': item.suggestion.level === '2' || item.suggestion.level === '3'},
                            {'low-bg': item.suggestion.level === '-2' || item.suggestion.level === '-3'}]">
                                <i class="icon-blood-sugar"></i>
                            </div>
                        <div class="mmHg">
                            <div>
                            {{item.bloodSugar.glucose_data}} <span>mmol/l</span>
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
                            <span>测量时间</span><span>{{item.bloodSugar.create_date.split(' ')[1]}}</span>
                        </div>
                        </div>
                        <i class="fa fa-angle-right"></i>
                    </div>
                    </mt-cell-swipe>
                    <div class="advise card-container">
                        <h3 class="title">健康建议</h3>
                        <p>{{item.suggestion.suggestion}} {{item.suggestion.suggestion_dict_name}}</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'bloodSugarHistory',
  data() {
      return {
          sugarRecordData: [],
          date: this.$route.params.date,
          sugarIndex: 1
      }
  },
  mounted() {
      this.getAllData()
  },
  methods: {
      async getAllData () {
          try {
            const result = await axios.get(`/api/sugar/three?member_id=${window._member_id}&date=${this.date}&limit=N`)
            if (result.data.code === 'C0000') {
                console.log(result)
                this.sugarRecordData = result.data.data
            }
          } catch (err) {
              console.log(err)
          }
      },
      async deleteRecord (index, item) {
        console.log(item)
        try {
            const result = await axios.post('/api/sugar/delete', {
                bloodsugar_id: item.bloodSugar.bloodSugar_id
            })
            if (result.data.code === 'C0000') {
                this.getAllData()
                console.log('delete success...')
            } else {
                console.log('delete err')
            }
        } catch (err) {
            console.log('Whoops: ', err)
        }
    },
    openHealthTips (index) {
        this.sugarIndex = this.sugarIndex === index ? -index : index
    },
  }
}
</script>

<style lang="scss">
  @import './bloodSugar.scss';
</style>