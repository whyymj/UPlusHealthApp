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
			allergylist: []
		}
	},
	components: {
		tagslist
	},
	created() {
		this.memberId = this.$route.params.member_id;
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
		async getUserInfo() {
			try {
				var that = this;
				//获取过敏标签
				try{
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

				}catch(e){
					if (process.env.NODE_ENV == 'development') {
						that.$axios.get('/static/testData/getAllergyList.json').then(function(res){
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


						var allergydata=window.localStorage.uplus_sleep_user_allergy;
						that.allergy = allergydata;
						var newallergylist = that.allergylist
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
				}
				
				let result = null;
				var allergydata ;
				//获取个人的信息
				if(!this.memberId) {
					allergydata=window.localStorage.uplus_sleep_user_allergy;
					
				} else { //获取家庭成员的信息
					result = await axios.post('/api/member', {
						member_id: that.memberId
					})
					allergydata = result.data.data.allergy;
				}
						this.allergy = allergydata;
						var newallergylist = this.allergylist
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
						this.allergylist = newallergylist
					
			} catch(err) {
				
			
			}
		},
		save() {
			var that=this;
			//保存个人
			if(!this.memberId) {
				axios.post('/api/user/update', {
					allergy:that.allergy
				})
					.then(function(res) {
						console.log(res);
					})
					.catch(function(err) {
						console.log(err);
					})
			} else {
				//保存家庭成员信息
				axios.post('/api/member/info', {
					allergy:that.allergy,
					member_id:that.memberId
				})
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
					path: that.route
				})
		}
	},

}