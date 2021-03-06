import webConfig from '../../../config/web.config'
import { MessageBox } from 'mint-ui'
import axios from "axios"

export default {
	name: 'userInfo',
	data() {
		return {
			showMyLoadingModal:true,
			isDeleteShow:false,
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
			defaultBirthday: "1980年1月1日", //默认生日
			birthday: "1980年1月1日", //生日
			heightValue: "181厘米", //身高
			weightValue: "75公斤", //体重
			targetWeightValue: "74公斤", //目标体重
			headPic:null,//头像
			disease:null,//慢病
			allergy:null,//过敏
			userdisease:'未设置',//选择的慢病
			userallergy:"未设置",//选择的过敏
			route:''
		}
	},
	mounted() {		
		var that=this;
		this.route=this.$route.path;
		this.showMyLoadingModal=true;
		this.getUserInfo(function(){
			that.showMyLoadingModal=false;
			 var data=that.$route.query;
			 
			 if (window.history.replaceState) {
				window.history.replaceState({
					data: ''
				}, "", "userInfo");
			}
			
			 if (data.name) {
				that[data.name] = data.value;
			}
			if (data.name && data.name != 'allergy' && data.name != 'disease') { //慢病与过敏史直接在对应选择页面保存
			 that.save(function(){
			
				if(!window.history.replaceState){
					var origin=window.location.origin;
					window.location.replace(origin+'/userInfo')
				}else{
						window.history.go(-2);
				}
			 });
			}
		});
		
	
	},

	methods: {
		toAllergy(){
			var that=this;
			this.$router.push({
				path:'allergic',
				query:{
					height:(typeof that.heightValue=='string')?that.heightValue.split('厘米')[0]:'',
					weight:(typeof that.weightValue=='string')?that.weightValue.split('公斤')[0]:'',
					birthday:(typeof that.birthday=='string')?that.birthday.replace('年','-').replace('月','-').replace('日',''):'',
					sex:that.sex=='男'?"male":'female',
					disease:that.disease||"",
					from:'/userInfo',
					member_id:''
				}
			})
		},
		toDisease(){
			var that=this;
			this.$router.push({
				path:'chronicDisease',
				query:{
					height:(typeof that.heightValue=='string')?that.heightValue.split('厘米')[0]:'',
					weight:(typeof that.weightValue=='string')?that.weightValue.split('公斤')[0]:'',
					birthday:(typeof that.birthday=='string')?that.birthday.replace('年','-').replace('月','-').replace('日',''):'',
					sex:that.sex=='男'?"male":'female',
					allergy:that.allergy||"",
					from:'/userInfo',
					member_id:''
				}
			})
		},
		//删除家人
		openDeleteFamily() {
			this.isDeleteShow = true
		},
		//慢病 过敏截取
		sliceStr(data) {
			let str = ""
			if(data) { 
				let firstIndex = data.indexOf(",")
				if(firstIndex == -1) { 
					str = data
				} else { 
					let secondIndex = data.indexOf(",", firstIndex + 1)
					if(secondIndex == -1) { 
						if(firstIndex > 3) {
							str = data.substring(0, firstIndex) + "等"
						} else {
							if(data.length - firstIndex - 1 > 3) {
								str = data.substring(firstIndex + 1) + "等"
							} else {
								str = data
							}
						}
					} else { 
						if(firstIndex > 3) {
							str = data.substring(0, firstIndex) + "等"
						} else {
							if(secondIndex - firstIndex - 1 > 3) {
								str = data.substring(firstIndex + 1, secondIndex) + "等"
							} else {
								str = data.substring(0, secondIndex) + "等"
							}
						}
					}
				}
			} else {
				str = '无'
			}
			return str
		},
		showActionSheet: function() {
			// 打开action sheet
			this.sheetVisible = true;
		},
		showNickName: function() {
			var that=this;
			this.$router.push({
				path:'/userInfoNickName',
				query:{
					from :that.route,
					row:"nickName",
					val:that.nickName
				}
			})
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
		openBirthDay() {
			var that=this;
			this.$router.push({
				path:'/userInfoBirthday',
				query:{
					from:that.route,
					row:"birthday",
					val:that.birthday
				}
			})
		},
		handleChangeBD(value) {
			this.birthday = this.formatDate(value);
			this.save()
			//调用生日保存接口
		},
		openPicker(index) {
			var that=this;
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
				this.$router.push({
					path:'/userInfoHeight',
					query:{
						from:that.route,
						row:"heightValue",
						val:that.heightValue
					}
				})
					break
				case 2:
				this.$router.push({
					path:'/userInfoWeight',
					query:{
						from:that.route,
						row:"weightValue",
						val:that.weightValue
					}
				})
					break
				case 3:
				this.$router.push({
					path:'/userInfoWeight',
					query:{
						from:that.route,
						row:"targetWeightValue",
						val:that.targetWeightValue
					}
				})
					break;
				case 4:
					this.$router.push({
						path:'/userInfoSex',
						query:{
							from:that.route,
							row:"sex",
							val:that.sex
						}
					})
					break;
			}
			this.pickerIndex = index;
		},
		onChange(picker, values) {
			this.valuePicker = values[0]
		},
		// 确认选择数据并显示
	
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
		async getUserInfo(fn) {
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
					this.defaultBirthday = '1980年01月01日'; //默认生日
					this.birthday = data.birthday.replace('-','年').replace('-','月')+'日'; //生日
					this.heightValue = data.height + '厘米'; //身高
					this.weightValue = data.weight + "公斤"; //体重
					this.targetWeightValue = data.target_weight + "公斤"; //目标体重
					this.headPic = data.head_pic
					this.disease=data.disease//慢病
					this.allergy=data.allergy//过敏
					this.userdisease=this.sliceStr(data.disease)
					this.userallergy=this.sliceStr(data.allergy);
					
				}
				if(fn){
						fn();
					}
			} catch(err) {
				if(fn){
					fn();
				}
			}
		},
		//保存
		save(fn) {
			var that=this;	
			let saveData = {
				height: parseInt(that.heightValue),
				weight: parseInt(that.weightValue),
				sex: that.sex=='男'?'male':'female',
				birthday: that.birthday.replace('年','-').replace('月','-').replace('日',''),
				nick_name: that.nickName,
				// headPic:that.headPic,
				target_weight:parseInt(that.targetWeightValue),
				disease:that.disease,//慢病
				allergy:that.allergy,//过敏
			}
	
		
			//用户信息更改
			axios.post('/api/user/update', saveData)
				.then(function(res) {
					console.log(res);
					if(fn){
						fn();
					}
				})
				.catch(function(err) {
					console.log(err);
					if(fn){
						fn();
					}
				})
		}
	}
}