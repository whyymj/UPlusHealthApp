import tagslist from '../../health-entry/health-entry-family/tagsList';
import axios from "axios"
export default {
	components: {
		tagslist
	},
	data() {
		return {
			isAllergic: false,
			//    list: datas.allergicData, allergicValue: false, //是否有过敏史
			editText: '保存',
			chronicHistory: true,
			disease: '',
			memberId:null,
			allData: {},
			chromiclist: [{
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
				selected: false
			}, {
				name: '关节炎',
				selected: false
			}, {
				name: '高血压',
				selected: false
			}, {
				name: '偏头痛',
				selected: false
			}, {
				name: '低血糖',
				selected: false
			}]
		}
	},
	created() {
		this.memberId = this.$route.params.member_id
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
			this.disease = dataSelected.join(",")
			this.allData.disease = this.disease
		},
		async getUserInfo() {
			try {
				var that = this;
				//获取慢病标签
				var getDiseaseList=await axios.post('/api/getDiseaseList', {
					//phone: ''
					openId:that.memberId
				})
				that.chromiclist=getDiseaseList.data.data.map((item)=>{
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
				
				
				let result=null
				//获取个人的信息
				if(!this.memberId){
					 result=await axios.post('/api/user/info', {
					user_id:''
					})
				}else{//获取家庭成员的信息
					result=await axios.post('/api/member', {
					member_id:that.memberId
					})
				}
				this.allData=result.data.data
				var diseasedata = result.data.data.disease;
				if(result.data.code === 'C0000') {
					this.disease = diseasedata //慢病
					var newchromiclist = this.chromiclist
					if(diseasedata) {
						diseasedata = diseasedata.split(",")
						for(let i = 0; i < newchromiclist.length; i++) {
							for(let j = 0; j < diseasedata.length; j++) {
								if(newchromiclist[i].name == diseasedata[j]) {
									newchromiclist[i].selected = true
								}
							}
						}
					}
					this.chromiclist = newchromiclist
				}
			} catch(err) {
				console.log(err)
			}
		},
		save() {
			let saveData = this.allData
			console.log(this.member)
			console.log(saveData)
			//保存个人
			if(!this.memberId){
				axios.post('/api/user/update', saveData)
				.then(function(res) {
					console.log(res);
				})
				.catch(function(err) {
					console.log(err);
				})
			}else{
				//保存家庭成员信息
				axios.post('/api/member/info', saveData)
				.then(function(res) {
					console.log(res);
				})
				.catch(function(err) {
					console.log(err);
				})
			}
			//调用接口保存过敏史数据 返回主页面
			this
				.$router
				.replace({
					path: '/userInfo'
				})
		},

	},

}