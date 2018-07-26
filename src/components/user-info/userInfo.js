import {Actionsheet} from 'mint-ui'
export default{
  name: 'userInfo',
  data(){
    return{
      // action sheet 选项内容
      headerAction:[{
        name:"拍照",
        method:this.getCamera // 调用methods中的函数
      },{
        name:"从相册中选择",
        method:this.getLibrary // 调用methods中的函数
      }],
      // headerAction:[],
      // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
      sheetVisible: false
    }
  },
  methods:{
    showActionSheet: function(){
      // 打开action sheet
      this.sheetVisible = true;
    },
    getCamera: function(){
      console.log("打开照相机")
    },
    getLibrary: function(){
      console.log("打开相册")
    }
  },
}
