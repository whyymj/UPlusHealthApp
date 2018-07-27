import webConfig from '../../../config/web.config'
import {MessageBox} from 'mint-ui'
export default{
  name: 'userInfo',
  data(){
    return {
      // action sheet 选项内容
      headerAction: [{
        name: "拍照",
        method: this.getCamera // 调用methods中的函数
      }, {
        name: "从相册中选择",
        method: this.getLibrary // 调用methods中的函数
      },],
      // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
      sheetVisible: false,
      pickerVisible: false,
      dateSlots: [],
      valuePicker: null,
      pickerIndex: null,
      nickName: "nick",//昵称
      sex: "男",//性别
      startDate: new Date('1920-01-01'),
      endDate: new Date(),
      defaultBirthday: "1980-1-1",//默认生日
      birthday: "1980-1-1",//生日
      heightValue: "181cm",//身高
      weightValue: "75kg",//体重
      targetWeightValue: "74kg",//目标体重
    }
  },
  methods: {
    showActionSheet: function () {
      // 打开action sheet
      this.sheetVisible = true;
    },
    showNickName: function () {
      let message = "请输入昵称";
      let title = "";
      let options = {inputPlaceholder: '请输入昵称'};
      MessageBox.prompt(message, title, options).then(({value})=> {
        if (value) {
          //调用昵称保存接口
          this.nickName = value;
        } else {

        }

      });
    },
    formatDate (date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    },
    openBirthDay (picker) {
      this.$refs[picker].open();
    },
    handleChangeBD (value) {
      this.birthday = this.formatDate(value);
      //调用生日保存接口
    },
    openPicker (index) {
      this.pickerVisible = true;
      this.dateSlots = [
        {
          flex: 1,
          values: [],
          defaultIndex: 0,
          className: 'slot1',
          textAlign: 'center'
        }
      ]
      switch (index) {
        case 1:
          this.dateSlots[0].values = webConfig.height;
          this.dateSlots[0].defaultIndex = this.heightValue ? webConfig.height.indexOf(this.heightValue) : webConfig.height.indexOf('178cm');
          this.valuePicker = this.heightValue ? this.heightValue : '178cm';
          break
        case 2:
          this.dateSlots[0].values = webConfig.weight;
          this.dateSlots[0].defaultIndex = this.weightValue ? webConfig.weight.indexOf(this.weightValue) : webConfig.weight.indexOf('80kg');
          this.valuePicker = this.weightValue ? this.weightValue : '80kg';
          break
        case 3:
          this.dateSlots[0].values = webConfig.weight;
          this.dateSlots[0].defaultIndex = this.weightValue ? webConfig.weight.indexOf(this.targetWeightValue) : webConfig.weight.indexOf('80kg');
          this.valuePicker = this.targetWeightValue ? this.targetWeightValue : '80kg';
          break;
        case 4:
          this.dateSlots[0].values = webConfig.sex;
          this.dateSlots[0].defaultIndex = this.sex ? webConfig.weight.indexOf(this.sex) : webConfig.sex.indexOf('男');
          this.valuePicker = this.sex ? this.sex : '男';
          break;
      }
      this.pickerIndex = index;
    },
    onChange (picker, values) {
      this.valuePicker = values[0]
    },
    // 确认选择数据并显示
    confirm () {
      switch (this.pickerIndex) {
        case 1:
          this.heightValue = this.valuePicker;
          //调用身高保存接口
          break
        case 2:
          this.weightValue = this.valuePicker;
          //调用体重保存接口
          break
        case 3:
          this.targetWeightValue = this.valuePicker;
          //调用目标体重保存接口
          break
        case 4:
          this.sex = this.valuePicker;
          //调用性别保存接口
          break
      }

      this.pickerVisible = false
    },
    getCamera: function () {
      console.log("打開攝像頭")
    },
    getLibrary: function () {
      console.log("打开相册")
    },
    closeActionSheet: function () {

    }
  },
}
