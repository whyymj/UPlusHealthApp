import tagslist from '../../health-entry/health-entry-family/tagsList';
import axios from 'axios';
export default {
	data() {
		return {
			isAllergic: false,
			allergyHistory: true,
			allergy: '',
			allData: {},
			memberId:null,
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
		this.memberId = this.$route.params.member_id
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
				//获取过敏标签
				var getAllergylist = await axios.post('/api/getAllergyList', {
					//phone: ''
					openId: that.memberId
				})
				that.allergylist = getAllergylist.data.data.map((item) => {
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

				let result = null
				//获取个人的信息
				if(!this.memberId) {
					result = await axios.post('/api/user/info', {
						user_id: ''
					})
				} else { //获取家庭成员的信息
					result = await axios.post('/api/member', {
						member_id: that.memberId
					})
				}
				this.allData = result.data.data
				var allergydata = result.data.data.allergy;
				if(result.data.code === 'C0000') {
					this.allergy = allergydata
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
			//保存个人
			if(!this.memberId) {
				axios.post('/api/user/update', saveData)
					.then(function(res) {
						console.log(res);
					})
					.catch(function(err) {
						console.log(err);
					})
			} else {
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
		}
	},

}