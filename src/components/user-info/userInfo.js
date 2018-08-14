import webConfig from '../../../config/web.config'
import { MessageBox } from 'mint-ui'
import axios from "axios"
// import new from './../../assets/healthSleep/bus';
export default {
	name: 'userInfo',
	data() {
		return {
			// action sheet 选项内容
			headerAction: [{
				name: "拍照",
				method: this.openCamera // 调用methods中的函数
			}, {
				name: "从相册中选择",
				method: this.getLibrary // 调用methods中的函数
			}],
			// action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
			sheetVisible: false,
			pickerVisible: false,
			dateSlots: [],
			valuePicker: null,
			pickerIndex: null,
			nickName: "nick", //昵称
			sex: "男", //性别
			startDate: new Date('1920-01-01'),
			endDate: new Date(),
			defaultBirthday: "1980-1-1", //默认生日
			birthday: "1980-1-1", //生日
			heightValue: "181cm", //身高
			weightValue: "75kg", //体重
			targetWeightValue: "74kg", //目标体重
			headPic:null,//头像
			disease:null,//慢病
			allergy:null,//过敏
			userdisease:'未设置',//选择的慢病
			userallergy:"未设置",//选择的过敏
		}
	},
	mounted() {
		this.getUserInfo();
	},

	methods: {
		//慢病 过敏截取
		sliceStr(data){
			let str =""
			let firstIndex = data.indexOf(",")
			if(firstIndex==-1&&!data){
				str = '未设置'
			}else{
				let secondIndex = data.indexOf(",",firstIndex+1)
				if(secondIndex==-1){
					str = data
				}else{
					let thirdIndex = data.indexOf(",",secondIndex)
					if(thirdIndex==-1){
						str = data
					}else{
						str = data.substring(0,secondIndex) + "等"
					}
				}
			}	
			return str
		},
		showActionSheet: function() {
			// 打开action sheet
			this.sheetVisible = true;
		},
		showNickName: function() {
			let message = "请输入昵称";
			let title = "";
			let options = {
				inputPlaceholder: '请输入昵称'
			};
			MessageBox
				.prompt(message, title, options)
				.then(({
					value
				}) => {
					if(value&&value.length<17) {
						//调用昵称保存接口
						
						this.nickName = value;
						this.save()
					} else {
						MessageBox('提示', '昵称不能超过16个字符');
					}

				});
		},
		formatDate(date) {
			const y = date.getFullYear();
			let m = date.getMonth() + 1
			m = m < 10 ?
				'0' + m :
				m
			let d = date.getDate()
			d = d < 10 ?
				('0' + d) :
				d
			return y + '-' + m + '-' + d
		},
		openBirthDay(picker) {
			this
				.$refs[picker]
				.open();
		},
		handleChangeBD(value) {
			this.birthday = this.formatDate(value);
			this.save()
			//调用生日保存接口
		},
		openPicker(index) {
			this.pickerVisible = true;
			this.dateSlots = [{
				flex: 1,
				values: [],
				defaultIndex: 0,
				className: 'slot1',
				textAlign: 'center'
			}]
			switch(index) {
				case 1:
					this.dateSlots[0].values = webConfig.height;
					this.dateSlots[0].defaultIndex = this.heightValue ?
						webConfig
						.height
						.indexOf(this.heightValue) :
						webConfig
						.height
						.indexOf('178cm');
					this.valuePicker = this.heightValue ?
						this.heightValue :
						'178cm';
					break
				case 2:
					this.dateSlots[0].values = webConfig.weight;
					this.dateSlots[0].defaultIndex = this.weightValue ?
						webConfig
						.weight
						.indexOf(this.weightValue) :
						webConfig
						.weight
						.indexOf('80kg');
					this.valuePicker = this.weightValue ?
						this.weightValue :
						'80kg';
					break
				case 3:
					this.dateSlots[0].values = webConfig.weight;
					this.dateSlots[0].defaultIndex = this.weightValue ?
						webConfig
						.weight
						.indexOf(this.targetWeightValue) :
						webConfig
						.weight
						.indexOf('80kg');
					this.valuePicker = this.targetWeightValue ?
						this.targetWeightValue :
						'80kg';
					break;
				case 4:
					this.dateSlots[0].values = webConfig.sex;
					this.dateSlots[0].defaultIndex = this.sex ?
						webConfig
						.weight
						.indexOf(this.sex) :
						webConfig
						.sex
						.indexOf('男');
					this.valuePicker = this.sex ?
						this.sex :
						'男';
					break;
			}
			this.pickerIndex = index;
		},
		onChange(picker, values) {
			this.valuePicker = values[0]
		},
		// 确认选择数据并显示
		confirm() {
			switch(this.pickerIndex) {
				case 1:
					this.heightValue = this.valuePicker;
					//调用身高保存接口
					this.save()
					break
				case 2:
					this.weightValue = this.valuePicker;
					//调用体重保存接口
					this.save()
					break
				case 3:
					this.targetWeightValue = this.valuePicker;
					//调用目标体重保存接口
					this.save()
					break
				case 4:
					this.sex = this.valuePicker;
					//调用性别保存接口
					this.save()
					break
			}

			this.pickerVisible = false
		},
		openCamera: function() {
			console.log("打開攝像頭")
			this.getCamera(1)
		},
		getLibrary: function() {
			console.log("打开相册")
			this.getCamera(0)
		},
		getCamera(type) {
			navigator.camera.getPicture(this.onSuccess, this.onFail, {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				encodingType: Camera.EncodingType.JPEG,
				sourceType: type
			})
		},
		onSuccess(imageData) {
			resolve('data:image/jpeg;base64,' + imageData)
			//
			this.headPic='data:image/jpeg;base64,' + imageData
			this.save()
		},
		onFail(message) {
			alert(message)
		},
		closeActionSheet: function() {},
		async getUserInfo() {
			try {
				var that = this;
				//根据id获取个人信息
				const result = await axios.post('/api/user/info', {
					user_id:''
				})
				var data = result.data.data;
				if(result.data.code === 'C0000') {
					this.nickName = data.nick_name; //昵称
					this.sex = data.sex == 'female' ? '女' : "男"; //性别
					this.endDate = new Date();
					this.defaultBirthday = '1980-01-01'; //默认生日
					this.birthday = data.birthday; //生日
					this.heightValue = data.height + 'cm'; //身高
					this.weightValue = data.weight + "kg"; //体重
					this.targetWeightValue = data.target_weight + "kg"; //目标体重
					this.headPic = data.head_pic
					this.diseas=data.diseas//慢病
					this.allergy=data.allergy//过敏
					this.userdisease=this.sliceStr(data.diseas)
					this.userallergy=this.sliceStr(data.userallergy)
				}
			} catch(err) {
				console.log(err)
			}
		},
		//保存
		save() {
			let saveData = {
				height: this.heightValue,
				weight: this.weightValue,
				sex: this.sex,
				birthday: this.birthday,
				nick_name: this.nickName,
				headPic:this.headPic,
				target_weight: this.targetWeightValue,
				diseas:this.diseas,//慢病
				allergy:this.allergy,//过敏
			}
			//用户信息更改
			axios.post('/api/user/update', saveData)
				.then(function(res) {
					console.log(res);
				})
				.catch(function(err) {
					console.log(err);
				})
		}
	}
}