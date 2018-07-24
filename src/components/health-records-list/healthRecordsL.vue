<template>

  <div class="page health-records-list">
    <h-header title="健康档案" :showBack="false"></h-header>
    <i class="fa fa-th-large" @click="goRecordsBody"></i>
    <div class="container has-header has-footer">
      <div class="character-list card-container overflowH">
        <span class="left"></span>
        <span class="right"></span>
        <div class="tab-list">
          <ul class="list">
            <li :class="memberID === '' ? 'active' : ''" @click="switchTab($event, '')">我</li>
            <li v-for="(item, index) in createdList" :key="index" :class="memberID === item.member_id ? 'active' : ''" @click="switchTab($event, item.member_id)">{{item.relation_name}}</li>
          </ul>
        </div>
        <i class="fa icon-home" @click="goFamilyManage"></i>
      </div>
      <div class="health-list card-container">
        <ul>
          <li class="clearfix" v-for="(item, index) in abnormalList" :key="index" @click="goPages(item)">
            <div class="float-left">
              <span v-if="item.moudle_name === '血压'">
                <i class="red icon-pressure"></i>
              </span>
              <span v-else-if="item.moudle_name === '心电'">
                <i class="red icon-ecg"></i>
              </span>
              <span v-else-if="item.moudle_name === '体重'">
                <i class="red icon-weight"></i>
              </span>
              <span v-else-if="item.moudle_name === '血糖'">
                <i class="red icon-blood-sugar"></i>
              </span>
              <span v-else-if="item.moudle_name === '体温'">
                <i class="red icon-temperature"></i>
              </span>
              <span v-else-if="item.moudle_name === '血氧'">
                <i class="red icon-oxygen"></i>
              </span>
            </div>
            <div class="float-right clearfix">
              <div class="title">{{item.moudle_name}}</div>
              <div v-if="item.value !== '0'" class="num">
                {{item.value}}
                <span class="unit" v-if="item.moudle_name === '血压'">mmHg</span>
                <span class="unit" v-if="item.moudle_name === '心电'"></span>
                <span class="unit" v-if="item.moudle_name === '体重'">kg</span>
                <span class="unit" v-if="item.moudle_name === '血糖'">mmol/L</span>
                <span class="unit" v-if="item.moudle_name === '体温'">℃</span>
                <span class="unit" v-if="item.moudle_name === '血氧'">%</span>
              </div>
              <div v-else class="num">

              </div>
              <i class="fa fa-angle-right"></i>
            </div>
          </li>
        </ul>
      </div>

      <div class="health-list card-container">
        <ul>
          <li class="clearfix" v-for="(item, index) in normalList" :key="index" @click="goPages(item)">
            <div class="float-left">
              <span v-if="item.moudle_name === '血压'">
                <i class="normal icon-pressure"></i>
              </span>
              <span v-else-if="item.moudle_name === '心电'">
                <i class="normal icon-ecg"></i>
              </span>
              <span v-else-if="item.moudle_name === '体重'">
                <i class="normal icon-weight"></i>
              </span>
              <span v-else-if="item.moudle_name === '血糖'">
                <i class="normal icon-blood-sugar"></i>
              </span>
              <span v-else-if="item.moudle_name === '体温'">
                <i class="normal icon-temperature"></i>
              </span>
              <span v-else-if="item.moudle_name === '血氧'">
                <i class="normal icon-oxygen"></i>
              </span>
            </div>
            <div class="float-right clearfix">
              <div class="title">{{item.moudle_name}}</div>
              <div v-if="item.value !== '0'" class="num">
                {{item.value}}
                <span class="unit" v-if="item.moudle_name === '血压'">mmHg</span>
                <span class="unit" v-if="item.moudle_name === '心电'"></span>
                <span class="unit" v-if="item.moudle_name === '体重'">kg</span>
                <span class="unit" v-if="item.moudle_name === '血糖'">mmol/L</span>
                <span class="unit" v-if="item.moudle_name === '体温'">℃</span>
                <span class="unit" v-if="item.moudle_name === '血氧'">%</span>
              </div>
              <div v-else class="num">

              </div>
              <i class="fa fa-angle-right"></i>
            </div>
          </li>
        </ul>
      </div>

      <div class="health-list card-container">
        <ul>
          <li class="clearfix" v-for="(item, index) in elseList" :key="index" @click="goPages(item)">
            <div class="float-left">
              <span v-if="item.moudle_name === '血压'">
                <i class="normal icon-pressure"></i>
              </span>
              <span v-else-if="item.moudle_name === '心电'">
                <i class="normal icon-ecg"></i>
              </span>
              <span v-else-if="item.moudle_name === '体重'">
                <i class="normal icon-weight"></i>
              </span>
              <span v-else-if="item.moudle_name === '血糖'">
                <i class="normal icon-blood-sugar"></i>
              </span>
              <span v-else-if="item.moudle_name === '体温'">
                <i class="normal icon-temperature"></i>
              </span>
              <span v-else-if="item.moudle_name === '血氧'">
                <i class="normal icon-oxygen"></i>
              </span>
            </div>
            <div class="float-right clearfix">
              <div class="title">{{item.moudle_name}}</div>
              <div v-if="item.value !== '0'" class="num">
                {{item.value}}
                <span class="unit" v-if="item.moudle_name === '血压'">mmHg</span>
                <span class="unit" v-if="item.moudle_name === '心电'"></span>
                <span class="unit" v-if="item.moudle_name === '体重'">kg</span>
                <span class="unit" v-if="item.moudle_name === '血糖'">mmol/L</span>
                <span class="unit" v-if="item.moudle_name === '体温'">℃</span>
                <span class="unit" v-if="item.moudle_name === '血氧'">%</span>
              </div>
              <div v-else class="num">
                <!-- no date -->
              </div>
              <i class="fa fa-angle-right"></i>
            </div>
          </li>
        </ul>
      </div>

    </div>
    <div class="footer">
      <button class="entry text-center" @click="manualEntry">手动录入</button>
    </div>
  </div>

</template>

<script type="text/javascript">
  import axios from 'axios'
  import { Indicator } from 'mint-ui';

  export default {
    name: 'health-records-list',
    data() {
      return {
        createdList: [],
        abnormalList: [],
        elseList: [],
        normalList: [],
        memberID: ''
      }
    },
    created() {
    },
    mounted() {
      this.memberID = window._member_id
      this.getFamilyList()
      this.initList()
    },
    methods: {
      getIndex(node) {
        let elems = node.parentNode.children;
        for(let i=0;i<elems.length;i++){
          if( elems[i] == node ){
            return i;
          }
        }
      },
      switchTab(e, id) {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        let target = e.target
        let parent = target.parentNode
        let liList = parent.children
        let index = this.getIndex(target)
        let needScrollLeft = (index-2)*72 + 27
        for (let k = 0; k < liList.length; k++) {
          liList[k].classList.remove('active')
        }
        target.classList.add('active')
        if (parent.parentNode.scrollLeft > needScrollLeft && needScrollLeft > 0 && (index != liList.length-1 && index != liList.length-2)) {
          let setIntervalTab1 = setInterval(function () {
            parent.parentNode.scrollLeft -= 10;
            if (parent.parentNode.scrollLeft <= needScrollLeft) {
              parent.parentNode.scrollLeft = needScrollLeft;
              clearInterval(setIntervalTab1)
            }
          }, 20)
        } else if (parent.parentNode.scrollLeft < needScrollLeft && needScrollLeft > 0 && (index != liList.length-1 && index != liList.length-2)) {
          let setIntervalTab2 = setInterval(function () {
            parent.parentNode.scrollLeft += 10;
            if (parent.parentNode.scrollLeft >= needScrollLeft) {
              parent.parentNode.scrollLeft = needScrollLeft;
              clearInterval(setIntervalTab2)
            }
          }, 20)
        }
        window._member_id = id
        this.initList()
      },
      async getFamilyList () {
        try {
          const result = await axios.get('/api/family')
          if (result.data.code === 'C0000') {
            this.createdList = result.data.data[0]
          }
        } catch (err) {
          console.log(err)
        }
      },
      async initList () {
        try {
          const result = await axios.get(`/api/health/status?member_id=${window._member_id}`)
          if (result.data.code === 'C0000') {
            console.log(result)
            this.abnormalList = result.data.data.abnormal_list
            this.elseList = result.data.data.else_list
            this.normalList = result.data.data.normal_list
            Indicator.close();
          }
        } catch (err) {
          console.log('err: ', err)
          Indicator.close();
        }
      },
      goRecordsBody() {
        this.$router.push({path: '/healthRecordsB'})
      },
      manualEntry() {
        this.$router.push({path: '/manualEntry'})
      },
      goFamilyManage() {
        this.$router.push({path: '/familyManagement'})
      },
      async goPages(args) {
        switch (args.moudle_name) {
          case '血压':
          	window._pressure_selected_date = ''
            this.$router.push({path: '/pressure'})
            break
          case '心电':
          	window._ecg_selected_date = ''
            this.$router.push({path: '/ecg'})
            break
          case '体重':
            if (window._member_id === '') {// user
              try {
                 const result = await axios.post('/api/user/info', {phone: ''})
                if (result.data.code === 'C0000') {
                  if (result.data.data.target_weight === '' || result.data.data.target_weight === 0) {// new user
                    this.$router.push({path: '/setTargetWeight'})
                  } else {
                    this.$router.push({path: '/weight'})
                  }
                }
              } catch (err) {
                console.log(err)
              }
            } else {// member
              let res = this.createdList.filter(_ => {
                return _.member_id === window._member_id
              })
              if (res[0].is_first_set_tw === 1) {// 未设置目标体重
                this.$router.push({path: '/setTargetWeight'})
              } else {
                this.$router.push({path: '/weight'})
              }
            }
          	window._weight_selected_date = ''
            break
          case '血糖':
          	window._suger_selected_date = ''
            this.$router.push({path: '/bloodSugar'})
            break
          case '体温':
          	window._temperature_selected_date = ''
            this.$router.push({path: '/temperature'})
            break
          case '血氧':
          	window._oxygen_selected_date = ''
            this.$router.push({path: '/oxygen'})
            break
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./healthRecordsL.scss";
</style>
