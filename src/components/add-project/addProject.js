import axios from 'axios'

export default {
  data () {
    return {
      highlightIndex: '',
      showShake: false,
      replaceItem: [],
      addedList: [],
      effectList: [],
      allList: [
        {
          projectIcon: 'icon-pressure',
          projectName: '血压',
          id: '3'
        },
        {
          projectIcon: 'icon-temperature',
          projectName: '体温',
          id: '2'
        },
        {
          projectIcon: 'icon-ecg',
          projectName: '心电',
          id: '5'
        },
        {
          projectIcon: 'icon-blood-sugar',
          projectName: '血糖',
          id: '4'
        },
        {
          projectIcon: 'icon-oxygen',
          projectName: '血氧',
          id: '6'
        },
        {
          projectIcon: 'icon-weight',
          projectName: '体重',
          id: '1'
        }
        // {
        //   projectIcon: 'icon-bmi',
        //   projectName: 'BMI',
        //   id: '8'
        // },
        // {
        //   projectIcon: 'icon-body-fat-rate',
        //   projectName: '体脂率',
        //   id: '9'
        // },
        // {
        //   projectIcon: 'icon-basal-metabolism',
        //   projectName: '基础代谢',
        //   id: '10'
        // },
        // {
        //   projectIcon: 'icon-fat-weight',
        //   projectName: '脂肪重量',
        //   id: '11'
        // },
        // {
        //   projectIcon: 'icon-visceral-fat',
        //   projectName: '内脏脂肪',
        //   id: '12'
        // },
        // {
        //   projectIcon: 'icon-muscle-weight',
        //   projectName: '肌肉重量',
        //   id: '13'
        // },
        // {
        //   projectIcon: 'icon-muscle-rate',
        //   projectName: '肌肉率',
        //   id: '7'
        // },
        // {
        //   projectIcon: 'icon-water-content',
        //   projectName: '水份',
        //   id: '14'
        // },
        // {
        //   projectIcon: 'icon-water-content-c',
        //   projectName: '水含量',
        //   id: '15'
        // },
        // {
        //   projectIcon: 'icon-protein',
        //   projectName: '蛋白质',
        //   id: '16'
        // },
        // {
        //   projectIcon: 'icon-bone-mass',
        //   projectName: '骨量',
        //   id: '17'
        // }
      ]
    }
  },
  mounted () {
    let winH = document.documentElement.clientHeight || document.body.clientHeight
    let pageTag = document.querySelector('.add-project')
    pageTag.style.minHeight = winH + 'px'
    this.initList()
  },
  methods: {
    async initList () {
      try {
        const result = await axios.get(`/api/health?member_id=${window._member_id}`)
        if (result.data.code === 'C0000') {
          console.log(result)
          if (result.data.data.pro_item.length === 0) {
            // frist enter
            this.effectList = this.allList
          } else {
            this.addedList = JSON.parse(result.data.data.pro_item)
            for (let i = 0; i < this.addedList.length; i++) {
              for (let j = 0; j < this.allList.length; j++) {
                if (this.addedList[i].id === this.allList[j].id) {
                  this.allList.splice(j, 1)
                  break
                }
              }
            }
            this.effectList = this.allList
          }
          if (typeof result.data.data.custom_id === 'string') {
            this.custom_id = result.data.data.custom_id
          } else {
            this.custom_id = ''
          }
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }
    },
    async setList () {
      try {
        let obj = {
          member_id: window._member_id,
          custom_id: this.custom_id,
          pro_item: JSON.stringify(this.addedList)
        }
        const result = await axios.post(`/api/health`, obj)
        if (result.data.code === 'C0000') {
          console.log('success')
          this.custom_id = result.data.data.custom_id
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }
    },
    deleteProject (index) {
      let deleteItem
      if (!this.showShake) {
        deleteItem = this.addedList.slice(index, index + 1)
        this.addedList.splice(index, 1)
        this.effectList.push(deleteItem[0])
      } else {
        deleteItem = this.addedList.splice(index, 1, this.replaceItem[0])
        this.effectList.splice(this.highlightIndex, 1)
        this.effectList.push(deleteItem[0])
        this.showShake = false
        this.highlightIndex = ''
      }
      this.setList()
    },
    addProject (index) {
      let addItem = this.effectList.slice(index, index + 1)
      let listLength = this.addedList.length
      if (listLength < 6) {
        this.highlightIndex = ''
        this.showShake = false
        this.addedList.push(addItem[0])
        this.effectList.splice(index, 1)
      } else {
        this.highlightIndex = index
        this.showShake = true
        this.replaceItem = this.effectList.slice(index, index + 1)
      }
      this.setList()
    }
  }
}
