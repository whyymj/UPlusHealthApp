import { Switch } from 'mint-ui';
export default{
  data(){
    return{
      isAllergic:false,
    }
  },
  methods:{
    handleChange(event) {
      console.log(event);
    }
  }

}
