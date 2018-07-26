import datas from './data'
export default{
  data(){
    return{
      isAllergic:false,
      list:datas.allergicData,
      allergicValue:false,//是否有过敏史
      editText: '保存',
    }
  },
  methods:{
    handleChange(event) {
      this.allergicValue = !event;
    },
    getAllergic(){
      this.list = datas.allergicData;
    }
  },
  mounted(){
    this.getAllergic();
  }

}
