
import tagslist from '../../health-entry/health-entry-family/tagsList';
export default {
  components:{
    tagslist
  },
  data() {
    return {
      isAllergic: false, list: datas.allergicData, allergicValue: false, //是否有过敏史
      editText: '保存',
      chronicHistory: true,
      chromiclist: [
        {
          name: '心脏病',
          selected: false
        }, {
          name: '鼻炎',
          selected: false
        }, {
          name: '痛风',
          selected: false
        }, {
          name: '糖尿病',
          selected: true
        }, {
          name: '关节炎',
          selected: false
        }, {
          name: '高血压',
          selected: true
        }, {
          name: '偏头痛',
          selected: false
        }, {
          name: '低血糖',
          selected: false
        }
      ]
    }
  },
  methods : {
    chooseChronic(data) {
     
    },
    save() {
      //调用接口保存过敏史数据 返回主页面
      this
        .$router
        .replace({path: '/userInfo'})
    }
  },
  mounted() {
    this.getAllergic();
  }

}
