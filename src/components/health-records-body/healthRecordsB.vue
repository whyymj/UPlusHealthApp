<template>

  <div class="page health-records">
    <!--first enter-->
    <div class="model" v-show="isModel" @click="isModel = !isModel">
      <img id="tips1" src="../../assets/health-records-model1.png" alt="">
      <img id="tips2" src="../../assets/health-records-model2.png" alt="">
      <img id="tips3" src="../../assets/health-records-model3.png" alt="">
    </div>
    <!---->
    <!-- <h-header title="健康档案" :showBack="false"></h-header> -->
    <!-- <i class="fa icon-list-view" @click="goRecordsList"></i> -->
    <div class="container has-footer">
      <div class="character-list">
        <span class="left"></span>
        <span class="right"></span>
        <div class="tab-list">
          <ul class="list">
            <li :class="currentID === '' ? 'active' : ''" @click="switchTab($event, '')">我</li>
            <li v-for="(item, index) in createdList" :key="index" :class="currentID === item.member_id ? 'active' : ''" @click="switchTab($event, item.member_id)">{{item.relation_name}}</li>
          </ul>
        </div>
        <i class="fa icon-home" @click="goFamilyManage"></i>
      </div>
      <div class="health-body text-center">
        <div v-for="(item, index) in healthProResult" :key="index">
          <div v-if="item.moudle_name === '体重'">
            <div :class="[{'body': true}, {'weight-circle empty': item.level === ''},
                          {'weight-circle normal': item.level === '1'},
                          {'weight-circle orange s-red-animate': item.level === '2' || item.level === '-2'},
                          {'weight-circle red s-red-animate': item.level === '3' || item.level === '-3'}]"
                          @click="twinkleBubble($event, item, index)">
            </div>
          </div>
          <div v-else-if="item.moudle_name === '血压'">
            <div v-if="maleShow">
              <div :class="[{'body': true}, {'pressure-circle empty': item.level === ''},
                          {'pressure-circle normal': item.level === '1'},
                          {'pressure-circle orange s-red-animate': item.level === '2' || item.level === '-2'},
                          {'pressure-circle red s-red-animate': item.level === '3' || item.level === '-3'}]"
                          @click="twinkleBubble($event, item, index)">
              </div>
            </div>
            <div v-else>
              <div :class="[{'body': true}, {'pressure-circle-female empty': item.level === ''},
                          {'pressure-circle-female normal': item.level === '1'},
                          {'pressure-circle-female orange s-red-animate': item.level === '2' || item.level === '-2'},
                          {'pressure-circle-female red s-red-animate': item.level === '3' || item.level === '-3'}]"
                          @click="twinkleBubble($event, item, index)">
              </div>
            </div>
          </div>
          <div v-else-if="item.moudle_name === '血糖'">
            <div v-if="maleShow">
              <div :class="[{'body': true}, {'sugar-circle empty': item.level === ''},
                            {'sugar-circle normal': item.level === '1'},
                            {'sugar-circle orange s-red-animate': item.level === '2' || item.level === '-2'},
                            {'sugar-circle red s-red-animate': item.level === '3' || item.level === '-3'}]"
                            @click="twinkleBubble($event, item, index)">
              </div>
            </div>
            <div v-else>
              <div :class="[{'body': true}, {'sugar-circle-female empty': item.level === ''},
                            {'sugar-circle-female normal': item.level === '1'},
                            {'sugar-circle-female orange s-red-animate': item.level === '2' || item.level === '-2'},
                            {'sugar-circle-female red s-red-animate': item.level === '3' || item.level === '-3'}]"
                            @click="twinkleBubble($event, item, index)">
              </div>
            </div>
          </div>
          <div v-else-if="item.moudle_name === '体温'">
            <div v-if="maleShow">
              <div :class="[{'body': true}, {'temperature-circle empty': item.level === ''},
                          {'temperature-circle normal': item.level === '1'},
                          {'temperature-circle orange s-red-animate': item.level === '2' || item.level === '-2'},
                          {'temperature-circle red s-red-animate': item.level === '3' || item.level === '-3'}]"
                          @click="twinkleBubble($event, item, index)">
              </div>
            </div>
            <div v-else>
              <div :class="[{'body': true}, {'temperature-circle-female empty': item.level === ''},
                            {'temperature-circle-female normal': item.level === '1'},
                            {'temperature-circle-female orange s-red-animate': item.level === '2' || item.level === '-2'},
                            {'temperature-circle-female red s-red-animate': item.level === '3' || item.level === '-3'}]"
                            @click="twinkleBubble($event, item, index)">
              </div>
            </div>
          </div>
          <div v-else-if="item.moudle_name === '心电'">
            <div :class="[{'body': true}, {'ecg-circle empty': item.level === ''},
                          {'ecg-circle normal': item.level === '1'},
                          {'ecg-circle orange s-red-animate': item.level === '2'},
                          {'ecg-circle red s-red-animate': item.level === '3'}]"
                          @click="twinkleBubble($event, item, index)">
            </div>
          </div>
          <div v-else-if="item.moudle_name === '血氧'">
            <div :class="[{'body': true}, {'oxygen-circle empty': item.level === ''},
                          {'oxygen-circle normal': item.level === '1'},
                          {'oxygen-circle orange s-red-animate': item.level === '2'},
                          {'oxygen-circle red s-red-animate': item.level === '3'}]"
                          @click="twinkleBubble($event, item, index)">
            </div>
          </div>
        </div>
        <img ref="BGSVG" :src="BGSVGIMG.src" alt="">
        <div v-for="(item, index) in healthProResult" :key="index">
          <div :class="[`bubble-${index + 1}`, item.level === '1' ? 'normal' : item.level === '2' || item.level === '-2' ? 'orange' : item.level === '3' || item.level === '-3' ? 'red' : 'empty']"
                @click="goPages(item)" >
            <div v-if="item.moudle_name === '体重'">
              <div ref="weight" class="bubble-icon weight">
                <i class="icon-weight"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">KG</span>
              </div>

              <div ref="weightNormal" :class="[index <= 2 ? 'weight-tips-left' : 'weight-tips-right', 'tips']" v-if="item.level === '1'">指标完全正常，请继续保持！</div>
              <div ref="weightAbnormal" :class="[index <= 2 ? 'weight-tips-left' : 'weight-tips-right', 'tips']" v-if="item.level !== '1' && item.level !== ''">体重{{item.status}}，请注意！</div>
              <div ref="weightEmpty" :class="[index <= 2 ? 'weight-tips-left' : 'weight-tips-right', 'tips']" v-if="item.level === ''">还没数据，快去记录吧</div>
            </div>
            <div v-else-if="item.moudle_name === '血糖'">
              <div ref="sugar" class="bubble-icon sugar">
                <i class="icon-blood-sugar"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">mmol/L</span>
              </div>

              <div ref="sugarNormal" :class="[index <= 2 ? 'sugar-tips-left' : 'sugar-tips-right', 'tips']" v-if="item.level === '1'">指标完全正常，请继续保持！</div>
              <div ref="sugarAbnormal" :class="[index <= 2 ? 'sugar-tips-left' : 'sugar-tips-right' ,'tips']" v-if="item.level !== '1' && item.level !== ''">血糖异常，建议去医院检查！</div>
              <div ref="sugarEmpty" :class="[index <= 2 ? 'sugar-tips-left' : 'sugar-tips-right', 'tips']" v-if="item.level === ''">还没数据，快去记录吧</div>

            </div>
            <div v-else-if="item.moudle_name === '体温'">
              <div ref="temperature" class="bubble-icon temperature">
                <i class="icon-temperature"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">℃</span>
              </div>

              <div ref="temperatureNormal" :class="[index <= 2 ? 'temperature-tips-left' : 'temperature-tips-right', 'tips']" v-if="item.level === '1'">指标完全正常，请继续保持！</div>
              <div ref="temperatureAbnormal" :class="[index <= 2 ? 'temperature-tips-left' : 'temperature-tips-right' ,'tips']" v-if="item.level !== '1' && item.level !== ''">体温异常，建议去医院检查！</div>
              <div ref="temperatureEmpty" :class="[index <= 2 ? 'temperature-tips-left' : 'temperature-tips-right', 'tips']" v-if="item.level === ''">还没数据，快去记录吧</div>

            </div>
            <div v-else-if="item.moudle_name === '血氧'">
              <div ref="oxygen" class="bubble-icon oxygen">
                <i class="icon-oxygen"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">%</span>
              </div>

              <div ref="oxygenNormal" :class="[index <= 2 ? 'oxygen-tips-left' : 'oxygen-tips-right', 'tips']" v-if="item.level === '1'">指标完全正常，请继续保持！</div>
              <div ref="oxygenAbnormal" :class="[index <= 2 ? 'oxygen-tips-left' : 'oxygen-tips-right' ,'tips']" v-if="item.level !== '1' && item.level !== ''">血氧异常，建议去医院检查！</div>
              <div ref="oxygenEmpty" :class="[index <= 2 ? 'oxygen-tips-left' : 'oxygen-tips-right', 'tips']" v-if="item.level === ''">还没数据，快去记录吧</div>

            </div>
            <div v-else-if="item.moudle_name === '血压'">
              <div ref="pressure" class="bubble-icon pressure">
                <i class="icon-pressure"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">mmHg</span>
              </div>

              <div ref="pressureNormal" :class="[index <= 2 ? 'pressure-tips-left' : 'pressure-tips-right', 'tips']" v-if="item.level === '1'">指标完全正常，请继续保持！</div>
              <div ref="pressureAbnormal" :class="[index <= 2 ? 'pressure-tips-left' : 'pressure-tips-right' ,'tips']" v-if="item.level !== '1' && item.level !== ''">血压异常，建议去医院检查！</div>
              <div ref="pressureEmpty" :class="[index <= 2 ? 'pressure-tips-left' : 'pressure-tips-right', 'tips']" v-if="item.level === ''">还没数据，快去记录吧</div>

            </div>
            <div v-else-if="item.moudle_name === '心电'">
              <div ref="ecg" class="bubble-icon ecg">
                <i class="icon-ecg"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span class="abnormal">{{item.value}}</span>
              </div>

              <div ref="ecgNormal" :class="[index <= 2 ? 'ecg-tips-left' : 'ecg-tips-right', 'tips']" v-if="item.level === '1'">指标完全正常，请继续保持！</div>
              <div ref="ecgAbnormal" :class="[index <= 2 ? 'ecg-tips-left' : 'ecg-tips-right' ,'tips']" v-if="item.level !== '1' && item.level !== ''">心电异常，建议去医院检查！</div>
              <div ref="ecgEmpty" :class="[index <= 2 ? 'ecg-tips-left' : 'ecg-tips-right', 'tips']" v-if="item.level === ''">还没数据，快去记录吧</div>

            </div>
            <div v-else-if="item.moudle_name === 'BMI'">
              <div class="bubble-icon">
                <i class="icon-bmi"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub"></span>
              </div>
            </div>
            <div v-else-if="item.moudle_name === '体脂率'">
              <div class="bubble-icon">
                <i class="icon-body-fat-rate"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">%</span>
              </div>

            </div>
            <div v-else-if="item.moudle_name === '基础代谢'">
              <div class="bubble-icon">
                <i class="icon-basal-metabolism"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">Kcal</span>
              </div>
            </div>
            <div v-else-if="item.moudle_name === '脂肪重量'">
              <div class="bubble-icon">
                <i class="icon-fat-weight"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">KG</span>
              </div>
            </div>
            <div v-else-if="item.moudle_name === '内脏脂肪等级'">
              <div class="bubble-icon">
                <i class="icon-visceral-fat"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">级</span>
              </div>
            </div>
            <div v-else-if="item.moudle_name === '肌肉重量'">
              <div class="bubble-icon">
                <i class="icon-muscle-weight"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">KG</span>
              </div>
            </div>
            <div v-else-if="item.moudle_name === '肌肉率'">
              <div class="bubble-icon">
                <i class="icon-muscle-rate"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">%</span>
              </div>
            </div>
            <div v-else-if="item.moudle_name === '水份'">
              <div class="bubble-icon">
                <i class="icon-water-content"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">KG</span>
              </div>
            </div>
            <div v-else-if="item.moudle_name === '水含量'">
              <div class="bubble-icon">
                <i class="icon-water-content-c"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">%</span>
              </div>
            </div>
            <div v-else-if="item.moudle_name === '蛋白质'">
              <div class="bubble-icon">
                <i class="icon-protein"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">%</span>
              </div>
            </div>
            <div v-else-if="item.moudle_name === '骨量'">
              <div class="bubble-icon">
                <i class="icon-bone-mass"></i>
                <span class="text">{{item.moudle_name}}</span>
              </div>
              <div class="bubble-value">
                <span v-if="item.level !== ''">{{item.value}}</span>
                <span v-if="item.level !== ''" class="sub">KG</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref="footer" class="footer" style="display: none">
        <button class="edit text-center" @click="edit">编辑</button>
        <button class="entry text-center" @click="manualEntry">手动录入</button>
      </div>
    </div>

  </div>

</template>

<script type="text/javascript">
  import axios from 'axios'
  import config from '../../../config/global.config'
  import { Indicator } from 'mint-ui';

  export default {
    name: 'health-records',
    data() {
      return {
        maleShow: true,
        isModel: null,
        healthProResult: [],
        createdList: [],
        memberID: '',
        currentID: window._member_id,
        BGSVGIMG: {
          src: ''
        }
      }
    },
    created() {

    },
    mounted() {
      (async () => {
        let obj = {
          code: window.location.href.substring(window.location.href.indexOf('=') + 1, window.location.href.indexOf('&')),
          url: config.url
        }
        if (obj.code !== '') {
          try {
            const result = await axios.post('/api/info', obj)
            if (result.data.data.user_flag === 'Y') { // new user
              this.$router.replace({path: '/introduction'}) // 介绍页面
            } else {
              this.$router.replace({path: '/healthRecordsB'})
              this.memberID = window._member_id
              if (window._member_id === '') {
                this.getUserInfo()
              } else {
                this.getMemberInfo()
              }
              this.getFamilyList()
            }
          } catch (err) {
            console.log(err)
          }
        } else {
          this.memberID = window._member_id
          if (window._member_id === '') {
            this.getUserInfo()
          } else {
            this.getMemberInfo()
          }
          this.getFamilyList()
        }
      })()

      this.$nextTick(function () {
      	let winH = document.documentElement.clientHeight || document.body.clientHeight;
				let pageTag = document.querySelector('.health-records')
				pageTag.style.minHeight = winH + 'px'
      })
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
        clearTimeout(window.animateBubble);
        let target = e.target;
        let parent = target.parentNode;
        let liList = parent.children;
        let index = this.getIndex(target);
        let needScrollLeft = (index-2)*72 + 27;
        for (let k = 0; k < liList.length; k++) {
          liList[k].classList.remove('active');
        }
        target.classList.add('active');
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
        if (id === '') {
          this.getUserInfo()
        } else {
          this.getMemberInfo()
        }
      },
      twinkleBubble(e, item, index) {
        let target = e.target;
        window.animateBubble = window.animateBubble || 0;
        let allBody = document.getElementsByClassName('body');
        let allBodyLen = allBody.length;
        let allBubble = document.getElementsByClassName('bubble-icon');
        let allBubbleLen = allBubble.length;
        let allTips = document.getElementsByClassName('tips');
        let allTipsLen = allTips.length;
        let targetClassName = target.className;
        clearTimeout(window.animateBubble);
        for (let i = 0 ; i < allBodyLen ; i++) {
          allBody[i].classList.remove('s-normal-animate');
        }
        for (let j = 0 ; j < allBubbleLen ; j++) {
          allBubble[j].classList.remove('b-animate');
        }
        for (let k = 0 ; k < allTipsLen ; k++) {
          allTips[k].classList.remove('tips-open');
        }

        if (targetClassName.indexOf('normal') > -1) {
          target.classList.add('s-normal-animate');
        }
        //big bubble and tips
        switch (item.moudle_name) {
          case '体重':
            this.$refs.weight[0].classList.add('b-animate')
            if (item.level === '') {// empty
              this.$refs.weightEmpty[0].classList.add('tips-open')
            } else if (item.level === '1') {// normal
              this.$refs.weightNormal[0].classList.add('tips-open')
            } else {// abnormal
              this.$refs.weightAbnormal[0].classList.add('tips-open')
            }
            break
          case '血糖':
            this.$refs.sugar[0].classList.add('b-animate')
            if (item.level === '') {// empty
              this.$refs.sugarEmpty[0].classList.add('tips-open')
            } else if (item.level === '1') {// normal
              this.$refs.sugarNormal[0].classList.add('tips-open')
            } else {// abnormal
              this.$refs.sugarAbnormal[0].classList.add('tips-open')
            }
            break
          case '体温':
            this.$refs.temperature[0].classList.add('b-animate')
            if (item.level === '') {// empty
              this.$refs.temperatureEmpty[0].classList.add('tips-open')
            } else if (item.level === '1') {// normal
              this.$refs.temperatureNormal[0].classList.add('tips-open')
            } else {// abnormal
              this.$refs.temperatureAbnormal[0].classList.add('tips-open')
            }
            break
          case '血压':
            this.$refs.pressure[0].classList.add('b-animate')
            if (item.level === '') {
              this.$refs.pressureEmpty[0].classList.add('tips-open')
            } else if (item.level === '1') {
              this.$refs.pressureNormal[0].classList.add('tips-open')
            } else {
              this.$refs.pressureAbnormal[0].classList.add('tips-open')
            }
            break
          case '心电':
            this.$refs.ecg[0].classList.add('b-animate')
            if (item.level === '') {
              this.$refs.ecgEmpty[0].classList.add('tips-open')
            } else if (item.level === '1') {
              this.$refs.ecgNormal[0].classList.add('tips-open')
            } else {
              this.$refs.ecgAbnormal[0].classList.add('tips-open')
            }
            break
          case '血氧':
            this.$refs.oxygen[0].classList.add('b-animate')
            if (item.level === '') {
              this.$refs.oxygenEmpty[0].classList.add('tips-open')
            } else if (item.level === '1') {
              this.$refs.oxygenNormal[0].classList.add('tips-open')
            } else {
              this.$refs.oxygenAbnormal[0].classList.add('tips-open')
            }
            break
        }

        window.animateBubble = setTimeout(function () {
          for (let j = 0 ; j < allBubbleLen ; j++) {
            allBubble[j].classList.remove('b-animate');
          }
          for (let k = 0 ; k < allTipsLen ; k++) {
            allTips[k].classList.remove('tips-open');
          }
        }, 1500);
      },
      async getUserInfo () {
        try {
          const result = await axios.post('/api/user/info', {phone: ''})
          if (result.data.code === 'C0000') {
            this.initList()
            this.$refs.footer.style.display = 'block'
            if (result.data.data.sex === 'male') {
              this.BGSVGIMG = {src: require('../../assets/BG-human.svg')}
              this.maleShow = true
            } else {
              this.BGSVGIMG = {src: require('../../assets/BG-woman.svg')}
              this.maleShow = false
            }
          }
        } catch (err) {
          console.log(err)
        }
      },
      async getMemberInfo () {
        try {
          const result = await axios.get(`/api/member?member_id=${window._member_id}`)
          if (result.data.code === 'C0000') {
            this.initList()
            this.$refs.footer.style.display = 'block'
            if (result.data.data.sex === 'male') {
              this.BGSVGIMG = {src: require('../../assets/BG-human.svg')}
              this.maleShow = true
            } else {
              this.BGSVGIMG = {src: require('../../assets/BG-woman.svg')}
              this.maleShow = false
            }
          }
        } catch (err) {
          console.log(err)
        }
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
         const result = await axios.get(`/api/health/result?member_id=${window._member_id}`)
         if (result.data.code === 'C0000') {
            console.log(result)
            this.healthProResult = result.data.data.healthProResult
            // 新用户引导页
            if (!window.localStorage.getItem('fEntry')) {
              this.isModel = true;
              window.localStorage.setItem('fEntry', '1');
            } else {
              this.isModel = false;
            }
           Indicator.close();
         }
        } catch (err) {
          console.log('err: ', err)
          Indicator.close();
        }
      },
      async goPages(item) {
        switch (item.moudle_name) {
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
          case 'BMI':
          case '体脂率':
          case '基础代谢':
          case '脂肪重量':
          case '内脏脂肪等级':
          case '肌肉重量':
          case '肌肉率':
          case '水份':
          case '水含量':
          case '蛋白质':
          case '骨量':
          	window._weight_selected_date = ''
            this.$router.push({path: '/weight'})
            break
          case '血压':
          	window._pressure_selected_date = ''
            this.$router.push({path: '/pressure'})
            break
          case '血糖':
          	window._suger_selected_date = ''
            this.$router.push({path: '/bloodSugar'})
            break
          case '体温':
          	window._temperature_selected_date = ''
            this.$router.push({path: '/temperature'})
            break
          case '心电':
          	window._ecg_selected_date = ''
            this.$router.push({path: '/ecg'})
            break
          case '血氧':
          	window._oxygen_selected_date = ''
            this.$router.push({path: '/oxygen'})
            break
        }
      },
      goRecordsList() {
        this.$router.push({path: '/healthRecordsL'})
      },
      edit() {
        this.$router.push({path: '/addProject'})
      },
      manualEntry() {
        this.$router.push({path: '/manualEntry'})
      },
      goFamilyManage() {
        this.$router.push({path: '/familyManagement'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./healthRecordsB.scss";
</style>
