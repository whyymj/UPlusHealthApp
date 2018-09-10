import tagslist from '../../health-entry/health-entry-family/tagsList';
import axios from "axios"
export default {
	components: {
		tagslist
	},
	watch:{
		chronDiseaseHistory(){
			this.clearChronDiseaseHistory=this.chronDiseaseHistory;//是否清空列表，过滤掉第一次
			if(!this.clearChronDiseaseHistory){
				this.disease='';
			}
		}
	},
	data() {
		return {
			clearChronDiseaseHistory:true,
			chronDiseaseHistory:false,
			route:'',
			isAllergic: false,
			//    list: datas.allergicData, allergicValue: false, //是否有过敏史
			editText: '保存',
			chronicHistory: true,
			disease: '',
			memberId:null,
			allData: {},
			chromiclist: [],
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
	mounted() {
		this.memberId = window._member_id;
		this.route=this.$route.query.from;
		this.getUserInfo();
	},
	methods: {
		chooseChronic(data) {
			var dataSelected = []
			for(var ii = 0; ii < data.tags.length; ii++) {
				if(data.tags[ii].selected == true) {
					dataSelected.push(data.tags[ii].name)
				}
			}
			this.disease = dataSelected.join(",");
			this.allData.disease = this.disease
		},
		 getUserInfo() {
				var that = this;
				//获取慢病标签
			
				this.$axios.post('/api/getDiseaseList', {
							//phone: ''
				}).then(function(res){

					that.chromiclist=res.data.data.map((item)=>{
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

					var diseasedata ;
					//获取个人的信息
					if(!that.memberId){
						diseasedata= window.localStorage.uplus_sleep_user_disease;
						var newchromiclist = that.chromiclist;
						that.chromiclist={};
						if(typeof diseasedata=='string') {
							diseasedata = diseasedata.split(",")
							for(let i = 0; i < newchromiclist.length; i++) {
								for(let j = 0; j < diseasedata.length; j++) {
									if(newchromiclist[i].name == diseasedata[j]) {
										newchromiclist[i].selected = true;
										that.chronDiseaseHistory=true;
									}
								}
							}
						}

						that.chromiclist = newchromiclist;
					}else{//获取家庭成员的信息
						that.$axios.post('/api/checkMemberInfo', {
							member_id:that.memberId
						}).then(function(res){

							var data=that.allData=res.data.data;
								diseasedata = res.data.data.disease;
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
								that.allergy=data.allergy;
								that.disease = diseasedata||'' //慢病
							var newchromiclist = that.chromiclist;
							that.chromiclist={};
							if(typeof diseasedata=='string') {
								diseasedata = diseasedata.split(",")
								for(let i = 0; i < newchromiclist.length; i++) {
									for(let j = 0; j < diseasedata.length; j++) {
										if(newchromiclist[i].name == diseasedata[j]) {
											newchromiclist[i].selected = true;
											that.chronDiseaseHistory=true;
										}
									}
								}
							}

							that.chromiclist = newchromiclist;
							})

							

						}

					})
			
		},
		save() {
			var that=this;
			//保存个人
			if(!this.memberId){
				window.localStorage.uplus_sleep_user_disease=this.disease;
			}else{
				//保存家庭成员信息
				let saveData = {
					member_id: window._member_id,
					height: parseInt(that.heightValue),
					weight: parseInt(that.weightValue),
					sex: that.sex,
					birthday: that.birthday.replace('年', '-').replace('月', '-').replace('日', ''),
					nick_name: that.nickName,
					target_weight: parseInt(that.targetWeightValue),
					disease: that.chronDiseaseHistory?that.disease:'', //慢病
					allergy: that.allergy, //过敏
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
			this
				.$router
				.replace({
					path: that.route,
					query:{
						value:that.disease,
						name:'disease'
					}
				})
		},

	},

}