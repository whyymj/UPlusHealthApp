import tagslist from '../../health-entry/health-entry-family/tagsList';
import axios from 'axios';
export default {
	data() {
		return {
			isAllergic: false,
			allergyHistory: true,
			allergy: '',
			allData: {},
			allergylist: [{
				name: '水果',
				selected: false
			}, {
				name: '海鲜',
				selected: false
			}, {
				name: '奶制品',
				selected: false
			}, {
				name: '糖尿病',
				selected: false
			}, {
				name: '坚果类',
				selected: false
			}, {
				name: '豆类',
				selected: false
			}, {
				name: '芝麻',
				selected: false
			}, {
				name: '葵花籽',
				selected: false
			}]
		}
	},
	components: {
		tagslist
	},
	created() {
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
		async getUserInfo() {
			try {
				var that = this;
				const result = await axios.post('/api/user/info', {
					phone: ''
				})
				var allergydata = result.data.data.allergy;
				if(result.data.code === 'C0000') {
					this.allergy = allergydata //慢病
					var newallergylist = this.allergylist
					if(allergydata) {
						allergydata = allergydata.split(",")
						for(let i = 0; i < newallergylist.length; i++) {
							for(let j = 0; j < allergydata.length; j++) {
								if(newallergylist[i].name == allergydata[j]) {
									newallergylist[i].selected = true
								}
							}
						}
					}
					this.allergylist = newallergylist
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
		}
	},

}