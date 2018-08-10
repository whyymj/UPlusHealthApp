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
			diseas: '',
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
			this.diseas = dataSelected.join(",")
			this.allData.diseas = this.diseas
		},
		async getUserInfo() {
			try {
				var that = this;
				//获取慢病标签
				var getDiseaseList=await axios.post('/api/getDiseaseList', {
					//phone: ''
					openId:req.session.loginCode
				})
				getDiseaseList.data.data.map((item)=>{
					return item.selected=false
				})
				this.chromiclist = getDiseaseList.data.data
				
				
				let result=null
				//获取个人的信息
				if(location.search.slice(6)==0){
					 result=await axios.post('/api/user/info', {
					//phone: ''
					user_id:req.session.loginCode
					})
				}else{//获取家庭成员的信息
					result=await axios.post('/api/member', {
					//phone: ''
					member_id:req.session.token
					})
				}
				this.allData=result.data.data
				var diseasdata = result.data.data.diseas;
				if(result.data.code === 'C0000') {
					this.diseas = diseasdata //慢病
					var newchromiclist = this.chromiclist
					if(diseasdata) {
						diseasdata = diseasdata.split(",")
						for(let i = 0; i < newchromiclist.length; i++) {
							for(let j = 0; j < diseasdata.length; j++) {
								if(newchromiclist[i].name == diseasdata[j]) {
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
			//保存个人
			if(location.search.slice(6)==0){
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