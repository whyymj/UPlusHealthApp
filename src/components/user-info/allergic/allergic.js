import tagslist from '../../health-entry/health-entry-family/tagsList';
export default {
  data() {
    return {
      isAllergic: false,
      allergyHistory: true,
      allergylist: [
        {
          name: '水果',
          selected: false
        }, {
          name: '海鲜',
          selected: false
        }, {
          name: '奶制品',
          selected: false
        }, {
          name: '糖尿病',
          selected: false
        }, {
          name: '坚果类',
          selected: false
        }, {
          name: '豆类',
          selected: true
        }, {
          name: '芝麻',
          selected: false
        }, {
          name: '葵花籽',
          selected: false
        }
      ]
    }
  },
  components : {
    tagslist
  },
  methods : {
    chooseAllergy(data) {},
    save() {
      //调用接口保存过敏史数据 返回主页面
      this
        .$router
        .replace({path: '/userInfo'})
    }
  },
  mounted() {}

}
