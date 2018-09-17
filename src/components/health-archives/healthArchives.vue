<template>
	<div class='healthArchives' style='background:#fff;position:fixed;height:100%;top:0;left:0;width:100%;'>
		<div class="tabs">
			<!-- 导航条 -->
			<mynav :navigateList='memberlist' :initnum='initnum' @clickNav='clickNav'></mynav>
			<mt-swipe :auto="0" :show-indicators="false" @change="handleChange" :continuous='false' ref='swipe'>
				<!-- 第一页 -->
				<mt-swipe-item>
					<div class=''>
						<ul class='imgContainer'>
							<!-- 左侧的一列 -->
							<li class="col1">
								<div class='row' v-for='(item,index) in showdata[0]' :key='index'>
									<imgbox :meta='item' position='left'></imgbox>
								</div>
							</li>
							<!-- 中间人体图 -->
							<li class="col2">
								<img src="/static/healthArchives/bg-human.png" alt="" v-if='maleShow'>
								<img src="/static/healthArchives/bg-woman.png" alt="" v-else>
								<span v-for='(item,index) in showdata[0]' :key='index+"1"' :style='blink(item)' :class='setClass(item)' @click='scalebox(item)'></span>
								<span v-for='(item,index) in showdata[1]' :key='index+"2"' :style='blink(item)' :class='setClass(item)' @click='scalebox(item)'></span>
							</li>
							<!-- 右侧一列 -->
							<li class="col3">
								<div class='row' v-for='(item,index) in showdata[1]' :key='index'>
									<imgbox :meta='item' position='right'></imgbox>
								</div>
							</li>
						</ul>
					</div>
				</mt-swipe-item>
				<!-- 第二页 -->
				<mt-swipe-item>
					<div class="">
						<ul class='imgContainer'>
							<li class="col1">
								<div class='row' v-for='(item,index) in showdata[2]' :key='index'>
									<imgbox :meta='item' position='left'></imgbox>
								</div>
							</li>
							<li class="col2">
								<img src="/static/healthArchives/bg-human.png" alt="" v-if='maleShow'>
								<img src="/static/healthArchives/bg-woman.png" alt="" v-else>
								<span v-for='(item,index) in showdata[2]' :key='index' :style='blink(item)' :class='setClass(item)' @click='scalebox(item)'></span>
							</li>
						</ul>
					</div>
				</mt-swipe-item>
			</mt-swipe>
			<p class='floatButton' @click="goFamilyManage"><img class='img' src="/static/healthArchives/index8.png" alt=""></p>
		</div>
		<paginator :pagenum='pagenum' :pageindex='pageindex'></paginator>
		<privacy :show="show"></privacy>
		<firstLogin @firstlogin='first_login'></firstLogin>
	</div>
</template>

<script>
	import imgbox from './imgBox';
	import bus from '../eventbus.js';
	import mynav from './myNavigator.vue';
	import myreq from '../../assets/healthSleep/myreq.js';
	import paginator from '../new-add-report/myPagination.vue';
	import config from '../../../config/global.config'
	import colorJudger from './color.js';
	import myloading from '../global/Loading.vue';
	import privacy from '../common/privacy.vue'
	import _ from 'lodash';
	import {
		Indicator
	} from 'mint-ui';
	import firstLogin from './first_login_sleepreport.vue';
	import {
		setTimeout
	} from 'timers';
	export default {
		mixins: [myloading],
		components: {
			imgbox,
			paginator,
			mynav,
			privacy,
			firstLogin
		},
		watch: {
			healthProResult() {
				this.showdata = _.chunk(this.healthProResult, 3);
			}
		},
		data() {
			return {
				show: false,
				initnum: 0, //初始页
				maleShow: true,
				pagenum: 2,
				memberID: '',
				pageindex: 0,
				activeName: '',
				showdata: [], //供展示用的健康参数数据
				healthProResult: [{ //请求到的健康参数
						"value": "",
						"moudle_name": "血压",
						"moudle_name_en": "bloodpressure",
						status: '',
						"level": ""
					},
					{
						"value": "",
						"moudle_name": "睡眠",
						"moudle_name_en": "sleep",
						"level": ""
					},
					{
						"value": "",
						"moudle_name": "体温",
						"moudle_name_en": "temperature",
						"level": ""
					},
					{
						"value": "",
						"moudle_name": "血氧",
						"moudle_name_en": "basal_metabolic",
						"level": ""
					},
					{
						"moudle_name_en": "",
						"value": "0", //value值为"0"时表示此健康模块暂无健康数据
						"moudle_name": "心电",
						"moudle_name_en": "",
						"level": ""
					},
					{
						"moudle_name_en": "",
						"value": "", //value值为"0"时表示此健康模块暂无健康数据
						"moudle_name": "体重",
						"moudle_name_en": "",
						"level": ""
					},
					{
						"moudle_name_en": "",
						"value": "", //value值为"0"时表示此健康模块暂无健康数据
						"moudle_name": "血糖",
						"moudle_name_en": "",
						"level": ""
					}
				],
				myinfo: [{
					"member_id": "",
					"login_code": '',
					"relation": "",
					"relation_name": "我",
					"height": 0,
					"weight": 0,
					"birthday": "",
					"head_pic": "",
					"sex": "male",
					"create_date": "",
					"nick_name": "",
					"target_weight": 0,
					"is_first_set_tw": 0,
					"age": 0
				}],
				memberlist: [{ //成员列表,测试数据
					"member_id": "",
					"login_code": '',
					"relation": "1",
					"relation_name": "我",
					"height": '',
					"weight": '',
					"birthday": "",
					"head_pic": "",
					"sex": "",
					"create_date": "",
					"nick_name": "",
					"target_weight": '',
					"is_first_set_tw": '',
					"age": ''
				}]
			};
		},
		computed: {},
		methods: {
			first_login() {
				window.localStorage.UPlusApp_firstLogin_sleepReport = false;
			},
			scalebox(item) {
				bus.$emit('scalebox', item.moudle_name)
			},
			blink(item) {
				var obj = colorJudger(item.moudle_name, item.level);
				console.log('>>>>>>s', item, obj)
				return {
					background: obj && obj.bg,
					animation: 's-red-animation 1s infinit'
				}
			},
			setClass(item) {
				var that = this;
				if (item.moudle_name == '体重') {
					return {
						"weight-circle-female": that.maleShow,
						"weight-circle": !that.maleShow,
						'normal': item.level <= 2,
						'danger': item.level > 2
					}
				} else if (item.moudle_name == '血糖') {
					return {
						"sugar-circle": that.maleShow,
						"sugar-circle-female": !that.maleShow,
						'normal': item.level <= 2,
						'danger': item.level > 2
					}
				} else if (item.moudle_name == '体温') {
					return {
						"temperature-circle": that.maleShow,
						"temperature-circle-female": !that.maleShow,
						'normal': item.level <= 2,
						'danger': item.level > 2
					}
				} else if (item.moudle_name == '血压') {
					return {
						"pressure-circle": that.maleShow,
						"pressure-circle-female": !that.maleShow,
						'normal': item.level <= 2,
						'danger': item.level > 2
					}
				} else if (item.moudle_name == '心电') {
					return {
						"ecg-circle": that.maleShow,
						"ecg-circle-female": !that.maleShow,
						'normal': item.level <= 2,
						'danger': item.level > 2
					}
				} else if (item.moudle_name == '血氧') {
					return {
						"oxygen-circle": that.maleShow,
						"oxygen-circle-female": !that.maleShow,
						'normal': item.level <= 2,
						'danger': item.level > 2
					}
				} else if (item.moudle_name == '睡眠') {
					return {
						"sleep-circle": that.maleShow,
						"sleep-circle-female": !that.maleShow,
						'normal': item.level < 2,
						'danger': item.level >= 2
					}
				}
			},
			handleChange(index) {
				this.pageindex = index;
			},
			clickNav(index) {
				if (this.pageindex != 0) {
					this.$refs.swipe.prev();
					this.pageindex = 0;
				}
				this.healthProResult = [{ //请求到的健康参数
						"value": "",
						"moudle_name": "血压",
						"moudle_name_en": "bloodpressure",
						"level": "0"
					},
					{
						"value": "",
						"moudle_name": "睡眠",
						"moudle_name_en": "sleep",
						"level": "0"
					},
					{
						"value": "",
						"moudle_name": "体温",
						"moudle_name_en": "temperature",
						"level": "0"
					},
					{
						"value": "",
						"moudle_name": "血氧",
						"moudle_name_en": "basal_metabolic",
						"level": "0"
					},
					{
						"moudle_name_en": "",
						"value": "", //value值为"0"时表示此健康模块暂无健康数据
						"moudle_name": "心电",
						"moudle_name_en": "",
						"level": "0"
					},
					{
						"moudle_name_en": "",
						"value": "", //value值为"0"时表示此健康模块暂无健康数据
						"moudle_name": "体重",
						"moudle_name_en": "",
						"level": "0"
					},
					{
						"moudle_name_en": "",
						"value": "", //value值为"0"时表示此健康模块暂无健康数据
						"moudle_name": "血糖",
						"moudle_name_en": "",
						"level": "0"
					}
				]
				this.showdata = _.chunk(this.healthProResult, 3);
				Indicator.open({
					text: '加载中...',
					spinnerType: 'fading-circle'
				});
				window._member_id = this.memberlist[index].member_id;
				if (window._member_id === '') {
					this.getUserInfo()
				} else {
					this.getMemberInfo()
				}
			},
			getIndex(node) {
				let elems = node.parentNode.children;
				for (let i = 0; i < elems.length; i++) {
					if (elems[i] == node) {
						return i;
					}
				}
			},
			switchTab(e, id) {
				Indicator.open({
					text: '加载中...',
					spinnerType: 'fading-circle'
				});
				clearTimeout(window.animateBubble);
				let target = e.target;
				let parent = target.parentNode;
				let liList = parent.children;
				let index = this.getIndex(target);
				let needScrollLeft = (index - 2) * 72 + 27;
				for (let k = 0; k < liList.length; k++) {
					liList[k].classList.remove('active');
				}
				target.classList.add('active');
				if (parent.parentNode.scrollLeft > needScrollLeft && needScrollLeft > 0 && (index != liList.length - 1 && index != liList.length - 2)) {
					let setIntervalTab1 = setInterval(function() {
						parent.parentNode.scrollLeft -= 10;
						if (parent.parentNode.scrollLeft <= needScrollLeft) {
							parent.parentNode.scrollLeft = needScrollLeft;
							clearInterval(setIntervalTab1)
						}
					}, 20)
				} else if (parent.parentNode.scrollLeft < needScrollLeft && needScrollLeft > 0 && (index != liList.length - 1 && index != liList.length - 2)) {
					let setIntervalTab2 = setInterval(function() {
						parent.parentNode.scrollLeft += 10;
						if (parent.parentNode.scrollLeft >= needScrollLeft) {
							parent.parentNode.scrollLeft = needScrollLeft;
							clearInterval(setIntervalTab2)
						}
					}, 20)
				}
				window._member_id = id
				if (id === '') {
					this.getUserInfo()
				} else {
					this.getMemberInfo()
				}
			},
			twinkleBubble(e, item, index) {
				let target = e.target;
				window.animateBubble = window.animateBubble || 0;
				let allBody = document.getElementsByClassName('body');
				let allBodyLen = allBody.length;
				let allBubble = document.getElementsByClassName('bubble-icon');
				let allBubbleLen = allBubble.length;
				let allTips = document.getElementsByClassName('tips');
				let allTipsLen = allTips.length;
				let targetClassName = target.className;
				clearTimeout(window.animateBubble);
				for (let i = 0; i < allBodyLen; i++) {
					allBody[i].classList.remove('s-normal-animate');
				}
				for (let j = 0; j < allBubbleLen; j++) {
					allBubble[j].classList.remove('b-animate');
				}
				for (let k = 0; k < allTipsLen; k++) {
					allTips[k].classList.remove('tips-open');
				}
				if (targetClassName.indexOf('normal') > -1) {
					target.classList.add('s-normal-animate');
				}
				//big bubble and tips
				switch (item.moudle_name) {
					case '体重':
						this.$refs.weight[0].classList.add('b-animate')
						if (item.level === '') { // empty
							this.$refs.weightEmpty[0].classList.add('tips-open')
						} else if (item.level === '1') { // normal
							this.$refs.weightNormal[0].classList.add('tips-open')
						} else { // abnormal
							this.$refs.weightAbnormal[0].classList.add('tips-open')
						}
						break
					case '血糖':
						this.$refs.sugar[0].classList.add('b-animate')
						if (item.level === '') { // empty
							this.$refs.sugarEmpty[0].classList.add('tips-open')
						} else if (item.level === '1') { // normal
							this.$refs.sugarNormal[0].classList.add('tips-open')
						} else { // abnormal
							this.$refs.sugarAbnormal[0].classList.add('tips-open')
						}
						break
					case '体温':
						this.$refs.temperature[0].classList.add('b-animate')
						if (item.level === '') { // empty
							this.$refs.temperatureEmpty[0].classList.add('tips-open')
						} else if (item.level === '1') { // normal
							this.$refs.temperatureNormal[0].classList.add('tips-open')
						} else { // abnormal
							this.$refs.temperatureAbnormal[0].classList.add('tips-open')
						}
						break
					case '血压':
						this.$refs.pressure[0].classList.add('b-animate')
						if (item.level === '') {
							this.$refs.pressureEmpty[0].classList.add('tips-open')
						} else if (item.level === '1') {
							this.$refs.pressureNormal[0].classList.add('tips-open')
						} else {
							this.$refs.pressureAbnormal[0].classList.add('tips-open')
						}
						break
					case '心电':
						this.$refs.ecg[0].classList.add('b-animate')
						if (item.level === '') {
							this.$refs.ecgEmpty[0].classList.add('tips-open')
						} else if (item.level === '1') {
							this.$refs.ecgNormal[0].classList.add('tips-open')
						} else {
							this.$refs.ecgAbnormal[0].classList.add('tips-open')
						}
						break
					case '血氧':
						this.$refs.oxygen[0].classList.add('b-animate')
						if (item.level === '') {
							this.$refs.oxygenEmpty[0].classList.add('tips-open')
						} else if (item.level === '1') {
							this.$refs.oxygenNormal[0].classList.add('tips-open')
						} else {
							this.$refs.oxygenAbnormal[0].classList.add('tips-open')
						}
						break
				}
				window.animateBubble = setTimeout(function() {
					for (let j = 0; j < allBubbleLen; j++) {
						allBubble[j].classList.remove('b-animate');
					}
					for (let k = 0; k < allTipsLen; k++) {
						allTips[k].classList.remove('tips-open');
					}
				}, 1500);
			},
			async getUserInfo() {
				try {
					const result = await this.$axios.post('/api/user/info', {
						phone: ''
					})
					result.data.data.relation_name = '我';
					result.data.data.member_id = '';
					this.myinfo = [result.data.data];
					if (result.data.code === 'C0000') {
						result.data.data.relation_name = '我';
						result.data.data.member_id = '';
						this.myinfo = [result.data.data];
						this.initList();
						// this.$refs.footer.style.display = 'block'
						if (result.data.data.sex === 'male') {
							this.BGSVGIMG = {
								src: require('../../assets/BG-human.svg')
							}
							this.maleShow = true
						} else {
							this.BGSVGIMG = {
								src: require('../../assets/BG-woman.svg')
							}
							this.maleShow = false
						}
					}
				} catch (err) {
					console.log(err)
				}
			},
			async getMemberInfo() {
				try {
					const result = await this.$axios.get(`/api/member?member_id=${window._member_id}`)
					if (result.data.code === 'C0000') {
						this.initList();
						// this.$refs.footer.style.display = 'block'
						if (result.data.data.sex === 'male') {
							this.BGSVGIMG = {
								src: require('../../assets/BG-human.svg')
							}
							this.maleShow = true
						} else {
							this.BGSVGIMG = {
								src: require('../../assets/BG-woman.svg')
							}
							this.maleShow = false
						}
					}
				} catch (err) {
					console.log(err)
				}
			},
			async getFamilyList() {
				try {
					var that = this;
					const result = await this.$axios.get('/api/family');
					if (result.data.code === 'C0000') {
						this.createdList = result.data.data[0];
						this.memberlist = this.myinfo.concat(this.createdList.map(function(item) {
							var newitem = item;
							newitem.relation_name = item.nick_name;
							return newitem;
						}));
						if (window._member_id === '') {
							this.pageindex = this.initnum = 0;
						} else {
							this.memberlist.map(function(item, index) {
								if (item.member_id == window._member_id) {
									that.initnum = that.pageindex = index;
								}
							})
						}
					} else {
						this.createdList = [];
					}
					this.$axios.get('/api/getUHomeFamilyMember').then(function(res) {
						if (res.data.code == 'C0000') {
							var arr = res.data.data.UHomeList.filter(function(item) {
								return (typeof item.unHealthUser == 'string') && item.unHealthUser != 'Y'
							}).map(function(item, index) {
								return {
									"member_id": item.mobile,
									"login_code": item.mobile,
									"relation": "13",
									"relation_name": "朋友",
									"height": item.height,
									"weight": item.weight,
									"birthday": item.birthday,
									"head_pic": item.avatarUrl,
									"sex": item.gender,
									"create_date": "",
									"nick_name": item.nickname,
									"target_weight": '',
									"is_first_set_tw": 1,
									"age": '',
									"unHealthUser": item.unHealthUser || 'Y'
								}
							});
							this.createdList = this.createdList.concat(arr);
						}
					}).catch(function(res) {})
				} catch (err) {
					if (process.env.NODE_ENV == 'development') {}
				}
			},
			async initList() { //获取成员的健康指标列表
				var that = this;
				try {
					var alllist = [{ //请求到的健康参数
							"value": "",
							"moudle_name": "血压",
							"moudle_name_en": "bloodpressure",
							"level": "0"
						},
						{
							"value": "",
							"moudle_name": "睡眠",
							"moudle_name_en": "sleep",
							"level": "0"
						},
						{
							"value": "",
							"moudle_name": "体温",
							"moudle_name_en": "temperature",
							"level": "0"
						},
						{
							"value": "",
							"moudle_name": "血氧",
							"moudle_name_en": "basal_metabolic",
							"level": "0"
						},
						{
							"value": "", //value值为"0"时表示此健康模块暂无健康数据
							"moudle_name": "心电",
							"moudle_name_en": "",
							"level": "0"
						},
						{
							"value": "", //value值为"0"时表示此健康模块暂无健康数据
							"moudle_name": "体重",
							"moudle_name_en": "",
							"level": "0"
						},
						{
							"value": "", //value值为"0"时表示此健康模块暂无健康数据
							"moudle_name": "血糖",
							"moudle_name_en": "",
							"level": "0"
						}
					];
					this.healthProResult = alllist;
					const result = await this.$axios.post(`/api/getHealthIndexInfo?member_id=${window._member_id}`, {
						member_id: window._member_id
					})
					var tmp;
					if (result.data.code === 'C0000') {
						tmp = result.data.data.typeList.map(function(item, index) {
							return {
								"value": item.index_value, //value值为"0"时表示此健康模块暂无健康数据
								"moudle_name": item.index_name,
								"moudle_name_en": '',
								"level": item.level
							}
						});
						var hasSleep = false;
						var len = tmp.length;
						var need = [];
						alllist.map(function(item) {
							hasSleep = false;
							for (var i = 0; i < len; i++) {
								if (tmp[i].moudle_name == item.moudle_name) {
									hasSleep = true;
									break;
								}
							}
							if (!hasSleep) { //判斷已有的
								need.push(item);
							}
						})
						that.healthProResult = tmp.concat(need);
						// 新用户引导页
						if (!window.localStorage.getItem('fEntry')) {
							this.isModel = true;
							window.localStorage.setItem('fEntry', '1');
						} else {
							this.isModel = false;
						}
						Indicator.close();
					}
				} catch (err) {
					Indicator.close();
				}
			},
			goRecordsList() {
				this.$router.push({
					path: '/healthRecordsL'
				})
			},
			edit() {
				this.$router.push({
					path: '/addProject'
				})
			},
			manualEntry() {
				this.$router.push({
					path: '/manualEntry'
				})
			},
			goFamilyManage() {
				this.$router.push({
					path: '/familyManagement'
				})
			}
		},
		mounted() {
			window.localStorage.uplus_sleep_user_info_cache = ''; //个人信息存储清空
			if (window.localStorage.UPlusAPP_agree_privacyPlan && (window.localStorage.UPlusAPP_agree_privacyPlan == 'true' || window.localStorage.UPlusAPP_agree_privacyPlan == true)) { //存储获取苹果健康数据的权限
				this.show = false;
			} else {
				this.show = true;
			}
			var that = this;
			setTimeout(function() {
				that.loadingmodal.close();
			}, 100000)
			this.showdata = _.chunk(this.healthProResult, 3);
			if (window._member_id === '') {
				this.pageindex = this.initnum = 0;
			} else {
				this.memberlist.map(function(item, index) {
					if (item.member_id == window._member_id) {
						that.initnum = that.pageindex = index;
					}
				})
			}
			//如果是首次登录  则调用免登陆接口 否则调用/api/user/info根据id查询用户信息
			(async() => {
				let obj = {
					code: this.$route.query.code || window.location.href.substring(window.location.href.indexOf('=') + 1, window.location.href.indexOf('&')),
					url: config.url
				}
				if (obj.code !== '') {
					try {
						const result = await this.$axios.post('/api/info', obj)
						if (result.data.code == 'C0000') {
							window.localStorage.uplus_sleep_user_id = result.data.data.login_code; //暂存个人id
							window.localStorage.uplus_sleep_user_disease = result.data.data.disease; //暂存个人慢病
							window.localStorage.uplus_sleep_user_allergy = result.data.data.allergy; //暂存个人过敏
							window.localStorage.uplus_sleep_user_info = JSON.stringify({
								sex: result.data.data.sex,
								birthday: result.data.data.birthday,
								height: result.data.data.height,
								weight: result.data.data.weight
							});
						}
						if (result.data.data && result.data.data.need_guide == 'Y') {
							this.$router.push({
								path: '/newAddReport',
								// query: {
								// code: that.$route.query.code
								// }
							})
						}
						if (result.data.data.user_flag === 'Y') { // new user
							this.$router.replace({
								path: '/introduction'
							}) // 介绍页面
						} else {
							this.memberID = window._member_id
							if (window._member_id === '') {
								this.getUserInfo() //获取用户信息，判断性别，获取健康数据
							} else {
								this.getMemberInfo() //获取家庭成员信息，判断性别，获取健康数据
							}
							this.getFamilyList() //请求全部家庭成员列表
						}
						that.$router.replace({
							path: '/healthRecordsB'
						}) // 介绍页面
						
					} catch (err) {
						that.loadingmodal.close();
					}
				} else {
					that.loadingmodal.close();
					this.memberID = window._member_id
					if (window._member_id === '') {
						this.getUserInfo()
					} else {
						this.getMemberInfo()
					}
					this.getFamilyList()
				}
			})()
		},
	}
</script>

<style lang='scss'>
	@import '../../assets/healthSleep/icomoon/style.css';
	.healthArchives {
		.dialog-demo {
			.dialog-content {
				overflow: hidden;
			}
			h2 {
				font-size: 20px;
				font-weight: bold
			}
			p {
				margin: 5px;
				text-align: justify
			}
		}
		.tabs {
			position: relative;
			.floatButton {
				position: fixed;
				width: 2.5rem;
				height: 2.5rem;
				background: rgba(34, 131, 226, 1);
				box-shadow: 0rem 0.4rem 0.8rem 0rem rgba(34, 131, 226, 0.32);
				right: 1rem;
				bottom: 2rem;
				border-radius: 50%;
				.img {
					width: 1.5rem;
					height: 1.5rem;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
				}
			}
			.navigations {
				width: 100%;
				height: 2rem;
				li {
					width: 20%;
				}
			}
			.mint-swipe {
				overflow: hidden;
				height: 28rem;
			}
			.el-tabs__nav-wrap::after {
				background: #fff;
			}
			.el-tabs__nav {
				display: inline-block;
				margin: auto;
				float: unset;
				text-align: center;
				left: 50%;
				transform: translate(-50%, 0)!important
			}
			.el-tabs__item {
				display: inline-block;
			}
		}
		.imgContainer {
			height: 19.12rem;
			width: 100%;
			position: relative;
			margin: 2rem 0;
			li {
				position: absolute;
				width: 33.33%;
				height: 100%;
				top: 0;
			}
			.col1 {
				left: 0;
			}
			.col2 {
				left: 33.33%;
				position: relative;
				span {
					position: absolute;
					width: 0.5rem;
					height: 0.5rem;
					background: rgba(51, 51, 51, .17);
					box-shadow: 0 0 0 8px rgba(51, 51, 51, .05);
					border-radius: 50%;
				}
				img {
					width: 100%;
					height: 100%;
				}
			}
			.col3 {
				left: 66.66%;
			}
			.row {
				height: 33.33%;
				width: 100%;
			}
		}
		.weight-circle {
			top: 17.5rem;
			left: 3.5rem;
		}
		.normal {
			animation: s-normal-animation 2s linear infinite;
		}
		.danger {
			animation: s-red-animation 2s linear infinite;
		}
		.weight-circle-female {
			top: 17rem;
			left: 3.5rem;
		}
		.sugar-circle {
			top: 11rem;
			left: 0.2rem;
		}
		.sugar-circle-female {
			top: 10.5rem;
			left: 0.5rem;
		}
		.temperature-circle {
			top: 5.5rem;
			left: 1.2rem;
		}
		.temperature-circle-female {
			top: 4.6rem;
			left: 1.2rem;
		}
		.pressure-circle {
			top: 9rem;
			left: 5.6rem;
		}
		.pressure-circle-female {
			top: 9rem;
			left: 5.5rem;
		}
		.ecg-circle {
			top: 4.5rem;
			left: 4rem;
		}
		.ecg-circle-female {
			top: 4.5rem;
			left: 4rem;
		}
		.oxygen-circle {
			top: 14rem;
			left: 2rem;
		}
		.oxygen-circle-female {
			top: 14rem;
			left: 2rem;
		}
		.sleep-circle {
			top: 0.5rem;
			left: 50%;
			transform: translate(-50%, 0);
		}
		.sleep-circle-female {
			top: 0.5rem;
			left: 50%;
			transform: translate(-50%, 0);
		}
	}
	@keyframes s-red-animation {
		0% {
			box-shadow: 0 0 0 0 rgba(255, 71, 93, .1);
		}
		50% {
			box-shadow: 0 0 0 8px rgba(255, 71, 93, .1);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(255, 71, 93, .1);
		}
	}
	@-webkit-keyframes s-normal-animation {
		0% {
			box-shadow: 0 0 0 0 rgba(38, 166, 255, .1);
		}
		50% {
			box-shadow: 0 0 0 8px rgba(38, 166, 255, .1);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(38, 166, 255, .1);
		}
	}
	@keyframes s-normal-animation {
		0% {
			box-shadow: 0 0 0 0 rgba(38, 166, 255, .1);
		}
		50% {
			box-shadow: 0 0 0 8px rgba(38, 166, 255, .1);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(38, 166, 255, .1);
		}
	}
	@-webkit-keyframes s-red-animation {
		0% {
			box-shadow: 0 0 0 0 rgba(255, 71, 93, .1);
		}
		50% {
			box-shadow: 0 0 0 8px rgba(255, 71, 93, .1);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(255, 71, 93, .1);
		}
	}
</style>