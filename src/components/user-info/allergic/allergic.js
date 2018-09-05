import tagslist from '../../health-entry/health-entry-family/tagsList';
import axios from 'axios';
export default {
	watch:{
		allergyHistory(){
			this.clearAllergyHistory=this.allergyHistory;
			if(this.clearAllergyHistory){
			this.allergy='';
			}
		}
	},
	data() {
		return {
			route:'',
			clearAllergyHistory:true,
			isAllergic: false,
			allergyHistory: false,
			allergy: '',
			allData: {},
			memberId:null,
			allergylist: [],
			height:'',
			weight:'',
			sex: '',
			birthday: '',
			nickName: '',
			target_weight: '',
			disease: '', //慢病
			allergy: '', //过敏
			endDate:'',
			defaultBirthday:'',
			heightValue:'',
			weightValue:'',
			targetWeightValue:'',
			headPic:'',
			userdisease:'',
			userallergy:''
		}
	},
	components: {
		tagslist
	},
	created() {
		this.memberId = window._member_id;
		this.route=this.$route.query.from;
		this.getUserInfo();
	},
	methods: {
		chooseAllergy(data) {
			var dataSelected = []
			for(var ii = 0; ii < data.tags.length; ii++) {
				if(data.tags[ii].selected == true) {
					dataSelected.push(data.tags[ii].name)
				}
			}
			this.allergy = dataSelected.join(",")
			this.allData.allergy = this.allergy
		},
		 getUserInfo() {
				var that = this;
				//获取过敏标签
				this.$axios.post('/api/getAllergyList', {
						//phone: ''
					}).then(function(res){
						that.allergylist = res.data.data.map((item) => {
							return {
								name: item.dict_name,
								selected: false,
								"dict_id": item.dict_id,
								"dict_name": item.dict_name,
								"dict_name_en": item.dict_name_en,
								"dict_type_id": item.dict_type_id,
								"status": item.status,
								"note": item.note
							}
						})

	
						var allergydata ;
						//获取个人的信息
						if(!window._member_id) {
							allergydata=window.localStorage.uplus_sleep_user_allergy;
							var newallergylist = that.allergylist;
							that.allergylist={};
							if(allergydata) {
								allergydata = allergydata.split(",")
								for(let i = 0; i < newallergylist.length; i++) {
									for(let j = 0; j < allergydata.length; j++) {
										if(newallergylist[i].name == allergydata[j]) {
											that.allergyHistory=true;
											newallergylist[i].selected = true;
										}
									}
								}
							}
							that.allergylist = newallergylist


						} else { //获取家庭成员的信息
							that.$axios.post('/api/checkMemberInfo', {
								member_id: window._member_id
							}).then(function(result){
								allergydata = result.data.data.allergy;
								var data = result.data.data;
								that.nickName = data.nick_name; //昵称
								that.sex = data.sex == 'female' ? '女' : "男"; //性别
								that.endDate = new Date();
								that.defaultBirthday = '1980年01月01日'; //默认生日
								that.birthday = data.birthday.replace('-', '年').replace('-', '月') + '日'; //生日
								that.heightValue = data.height + '厘米'; //身高
								that.weightValue = data.weight + "公斤"; //体重
								that.targetWeightValue = data.target_weight + "公斤"; //目标体重
								that.headPic = data.head_pic
								that.disease = data.disease //慢病

								that.allergy = allergydata;
								var newallergylist = that.allergylist;
								that.allergylist={};
								if(allergydata) {
									allergydata = allergydata.split(",")
									for(let i = 0; i < newallergylist.length; i++) {
										for(let j = 0; j < allergydata.length; j++) {
											if(newallergylist[i].name == allergydata[j]) {
												that.allergyHistory=true;
												newallergylist[i].selected = true;
											}
										}
									}
								}
								that.allergylist = newallergylist
							})
						
						}
					
					
					})
		},
		//保存
		save() {
			var that=this;
			//保存个人
			if(!window._member_id) {
				window.localStorage.uplus_sleep_user_allergy=this.allergy;
			} else {
				//保存家庭成员信息
				let saveData = {
					member_id: window._member_id,
					height: parseInt(that.heightValue),
					weight: parseInt(that.weightValue),
					sex: that.sex,
					birthday: that.birthday.replace('年', '-').replace('月', '-').replace('日', ''),
					nick_name: that.nickName,
					target_weight: parseInt(that.targetWeightValue),
					disease: that.disease, //慢病
					allergy: that.clearAllergyHistory?that.allergy:'', //过敏
				}
				axios.post('/api/changeMemberInfo', saveData)
					.then(function(res) {
						console.log(res);
						if (fn) {
							fn();
						}
					})
					.catch(function(err) {
						console.log(err);
						if (fn) {
							fn();
						}
					})
			}
			//调用接口保存过敏史数据 返回主页面
			console.log('allergy>>',that.allergy);
			this
				.$router
				.replace({
					path: that.route,
					query:{
						value:that.allergy,
						name:'allergy'
					}
				})
		}
	},

}