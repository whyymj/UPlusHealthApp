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
			chromiclist: []
		}
	},
	created() {
		this.memberId = this.$route.query.member_id;
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
		async getUserInfo() {
			try {
				var that = this;
				//获取慢病标签
				try{
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
				}catch(e){
					if (process.env.NODE_ENV == 'development') {
						this.$axios.get('/static/testData/getDiseaseList.json').then(function(res){
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
						   var   diseasedata= window.localStorage.uplus_sleep_user_disease;
						   that.disease = diseasedata||'' //慢病
						   var newchromiclist = that.chromiclist;
						   if(typeof diseasedata=='string') {
							   diseasedata = diseasedata.split(",")
							   for(let i = 0; i < newchromiclist.length; i++) {
								   for(let j = 0; j < diseasedata.length; j++) {
									   if(newchromiclist[i].name == diseasedata[j]) {
										   that.chronDiseaseHistory=true;
										   
										   newchromiclist[i].selected = true;
									   }
								   }
							   }
						   }
						   that.chromiclist = newchromiclist;
						})
					
					}
				}
			
				
				
				let result=null;
				var diseasedata ;
				//获取个人的信息
				if(!this.memberId){
					diseasedata= window.localStorage.uplus_sleep_user_disease;
				}else{//获取家庭成员的信息
					result=await axios.post('/api/member', {
						member_id:that.memberId
					})

					this.allData=result.data.data
					 diseasedata = result.data.data.disease;
					
				}
						this.disease = diseasedata||'' //慢病
						var newchromiclist = this.chromiclist;
						if(typeof diseasedata=='string') {
							diseasedata = diseasedata.split(",")
							for(let i = 0; i < newchromiclist.length; i++) {
								for(let j = 0; j < diseasedata.length; j++) {
									if(newchromiclist[i].name == diseasedata[j]) {
										newchromiclist[i].selected = true;
									}
								}
							}
						}
						this.chromiclist = newchromiclist;
			} catch(err) {
			
			}
		},
		save() {
			var that=this;
			//保存个人
			if(!this.memberId){
				axios.post('/api/user/update', {
					disease:that.chronDiseaseHistory?that.disease:''
				})
				.then(function(res) {
					console.log(res);
				})
				.catch(function(err) {
					console.log(err);
				})
			}else{
				//保存家庭成员信息
				axios.post('/api/member/info', {
					member_id:that.memberId,
					disease:that.chronDiseaseHistory?that.disease:''
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
		},

	},

}