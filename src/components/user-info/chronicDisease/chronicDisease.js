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
				const result = await axios.post('/api/user/info', {
					phone: ''
				})
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
			axios.post('/api/user/update', saveData)
				.then(function(res) {
					console.log(res);
				})
				.catch(function(err) {
					console.log(err);
				})
			//调用接口保存过敏史数据 返回主页面
			this
				.$router
				.replace({
					path: '/userInfo'
				})
		},

	},

}