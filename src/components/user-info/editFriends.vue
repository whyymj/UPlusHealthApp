<template>
	<div class="userInfo">
		<div>
			<!--<div @click="showActionSheet()">-->
			<div>
				<mt-cell class="headerImg" title="头像" is-link>
					<img id="img" :src="headImg" />
				</mt-cell>
			</div>
			<div>
				<mt-cell title="昵称" is-link>
					<span>{{nickName||'请填写昵称'}}</span>
				</mt-cell>
			</div>
			<!-- <div @click="showAdditionInfo()" style='background: #FFFFFF;' class='addtion'>
																<label for="">备注</label>
																<p>{{addition||'请填写备注'}}</p>
																<span class='el-icon-arrow-right'></span>
															</div> -->
		</div>
		<!--上传头像-->
		<div>
			<mt-actionsheet :actions="headerAction" v-model="sheetVisible" cancel-text="取消">
			</mt-actionsheet>
		</div>
		
	</div>
</template>

<script type="text/javascript">
	import webConfig from '../../../config/web.config'
	import {
		MessageBox
	} from 'mint-ui'
	import axios from "axios"
	
	export default {
		data() {
			return {
				headImg: '',
				// action sheet 选项内容
				headerAction: [{
					name: "拍照",
					method: this.openCamera // 调用methods中的函数
				}, {
					name: "从相册中选择",
					method: this.getLibrary // 调用methods中的函数
				}],
				// action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
				sheetVisible: false,
				pickerVisible: false,
				dateSlots: [],
				addition: '',
				valuePicker: null,
				pickerIndex: null,
				nickName: "", //昵称
				sex: "男", //性别
				startDate: new Date('1920-01-01'),
				endDate: new Date(),
				defaultBirthday: "1980-1-1", //默认生日
				birthday: "", //生日
				heightValue: "", //身高
				weightValue: "", //体重
				targetWeightValue: "74kg", //目标体重
				headPic: null, //头像
				disease: null, //慢病
				allergy: null, //过敏
				isDeleteShow: false,
				memberId: '',
				userdisease: '未设置', //选择的慢病
				userallergy: "未设置", //选择的过敏
			}
		},
		created() {
			this.memberId = window._member_id;
		},
		mounted() {
			var query = this.$route.query;
			this.headImg = query.img;
			this.nickName = query.nickname
			this.addition = query.addition;
			var that = this;
			this.route = this.$route.path;
			this.getUserInfo(function() {
				var data = that.$route.query;
				if (window.history.replaceState) {
					window.history.replaceState({
						data: ''
					}, "", "editFriends");
				}
				if (data.name) {
					that[data.name] = data.value;
				}
				if (data.name && data.name != 'allergy' && data.name != 'disease') { //慢病与过敏史直
					that.save(function() {
						if (!window.history.replaceState) {
							var origin = window.location.origin;
							window.location.replace(origin + '/userInfo')
						} else {
							window.history.go(-2)
						}
						// that.getUserInfo();
					});
				}
			});
		},
		methods: {
			//慢病 过敏截取
			sliceStr(data) {
				let str = ""
				if (data) {
					let firstIndex = data.indexOf(",")
					if (firstIndex == -1 && !data) {
						str = '未设置'
					} else {
						let secondIndex = data.indexOf(",", firstIndex + 1)
						if (secondIndex == -1) {
							str = data
						} else {
							let thirdIndex = data.indexOf(",", secondIndex)
							if (thirdIndex == -1) {
								str = data
							} else {
								str = data.substring(0, secondIndex) + "等"
							}
						}
					}
				} else {
					str = "未设置"
				}
				return str
			},
			//删除家人
			openDeleteFamily() {
				this.isDeleteShow = true
			},
			closeDeleteFamily() {
				this.isDeleteShow = false
			},
			deleteFamily() {
				var that = this;
				var memberID = this.$route.params.member_id
				axios.post('/api/member/delete', {
						member_id: memberID
					})
					.then(function(res) {
						console.log(res);
						that.isDeleteShow = false
						that
							.$router
							.replace({
								path: '/familyManagement'
							})
					})
					.catch(function(err) {
						console.log(err);
					})
			},
			showActionSheet: function() {
				// 打开action sheet
				this.sheetVisible = true;
			},
			showNickName: function() {
				var that = this;
				this.$router.push({
					path: '/userInfoNickName',
					query: {
						from: that.route,
						row: "nickName"
					}
				})
			},
			showAdditionInfo() {
				var that = this;
				this.$router.push({
					path: '/additionInfo',
					query: {
						from: that.route,
						row: "addition",
						default: that.addition
					}
				})
			},
			formatDate(date) {
				const y = date.getFullYear();
				let m = date.getMonth() + 1
				m = m < 10 ?
					'0' + m :
					m
				let d = date.getDate()
				d = d < 10 ?
					('0' + d) :
					d
				return y + '-' + m + '-' + d
			},
			openBirthDay(picker) {
				var that = this;
				this.$router.push({
					path: '/userInfoBirthday',
					query: {
						from: that.route,
						row: "birthday"
					}
				})
			},
			handleChangeBD(value) {
				this.birthday = this.formatDate(value);
				this.save()
				//调用生日保存接口
			},
			openPicker(index) {
				var that = this;
				this.pickerVisible = true;
				this.dateSlots = [{
					flex: 1,
					values: [],
					defaultIndex: 0,
					className: 'slot1',
					textAlign: 'center'
				}]
				switch (index) {
					case 1:
						this.$router.push({
							path: '/userInfoHeight',
							query: {
								from: that.route,
								row: "heightValue"
							}
						})
						break
					case 2:
						this.$router.push({
							path: '/userInfoWeight',
							query: {
								from: that.route,
								row: "weightValue"
							}
						})
						break
					case 3:
						this.$router.push({
							path: '/userInfoWeight',
							query: {
								from: that.route,
								row: "targetWeightValue"
							}
						})
						break;
					case 4:
						this.$router.push({
							path: '/userInfoSex',
							query: {
								from: that.route,
								row: "sex",
							}
						})
						break;
				}
				this.pickerIndex = index;
			},
			onChange(picker, values) {
				this.valuePicker = values[0]
			},
			// 确认选择数据并显示
			confirm() {
				switch (this.pickerIndex) {
					case 1:
						this.heightValue = this.valuePicker;
						//调用身高保存接口
						this.save();
						break;
					case 2:
						this.weightValue = this.valuePicker;
						//调用体重保存接口
						this.save();
						break;
					case 3:
						this.targetWeightValue = this.valuePicker;
						//调用目标体重保存接口
						this.save();
						break;
					case 4:
						this.sex = this.valuePicker;
						//调用性别保存接口
						this.save();
						break;
				}
				this.pickerVisible = false
			},
			openCamera: function() {
				console.log("打開攝像頭")
				this.getCamera(1)
			},
			getLibrary: function() {
				console.log("打开相册")
				this.getCamera(0)
			},
			getCamera(type) {
				navigator.camera.getPicture(this.onSuccess, this.onFail, {
					quality: 50,
					destinationType: Camera.DestinationType.DATA_URL,
					encodingType: Camera.EncodingType.JPEG,
					sourceType: type
				})
			},
			onSuccess(imageData) {
				resolve('data:image/jpeg;base64,' + imageData)
				//
				this.headPic = 'data:image/jpeg;base64,' + imageData
				this.save()
			},
			onFail(message) {
				alert(message)
			},
			closeActionSheet: function() {},
			async getUserInfo(fn) {
				try {
					var that = this;
					const result = await axios.post('/api/checkMemberInfo', {
						member_id: window._member_id
					})
					var data = result.data.data;
					if (result.data.code === 'C0000') {
						this.nickName = data.nick_name; //昵称
						this.sex = data.sex == 'female' ? '女' : "男"; //性别
						this.endDate = new Date();
						this.defaultBirthday = '1980年01月01日'; //默认生日
						this.birthday = data.birthday.replace('-', '年').replace('-', '月') + '日'; //生日
						this.heightValue = data.height + '厘米'; //身高
						this.weightValue = data.weight + "公斤"; //体重
						this.targetWeightValue = data.target_weight + "公斤"; //目标体重
						this.headPic = data.head_pic
						this.disease = data.disease //慢病
						this.allergy = data.allergy //过敏
						this.userdisease = this.sliceStr(data.disease)
						this.userallergy = this.sliceStr(data.allergy);
					}
					if (fn) {
						fn();
					}
				} catch (err) {
					if (fn) {
						fn();
					}
					console.log(err)
				}
			},
			//保存
			save(fn) {
				var that = this;
				let saveData = {
					member_id: window._member_id,
					height: parseInt(that.heightValue),
					weight: parseInt(that.weightValue),
					sex: that.sex,
					birthday: that.birthday.replace('年', '-').replace('月', '-').replace('日', ''),
					nick_name: that.nickName,
					target_weight: parseInt(that.targetWeightValue),
					disease: that.disease, //慢病
					allergy: that.allergy, //过敏
				}
				console.log('fasong>>>>', saveData)
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
		}
	}
</script>
<style type="text/css" scoped="scoped" lang='scss'>
	.userInfo {
		.addtion {
			width: 100%;
			height: 2.5rem;
			position: relative;
			label,
			p {
				height: 100%;
				line-height: 2.5rem;
				font-size: 0.75rem;
				font-family: 'PingFangSC-Regular';
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
			label {
				float: left;
				width: 2.5rem;
				text-align: center;
			}
			p {
				text-align: right;
				position: absolute;
				left: 3rem;
				top: 0;
				right: 1.5rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: #999;
				font-size: 0.75rem;
			}
			.el-icon-arrow-right {
				color: #c8c8cd;
				font-size: 0.5rem;
				font-weight: 700;
				position: absolute;
				right: 0.8rem;
				top: 0;
				bottom: 0;
				line-height: 2.5rem;
			}
		}
	}
	.deleteFamily {
		width: 8rem;
		height: 2rem;
		background: rgba(255, 255, 255, 1);
		border-radius: 1rem;
		font-size: 0.8rem;
		font-family: PingFangSC-Regular;
		color: rgba(102, 102, 102, 1);
		line-height: 2rem;
		text-align: center;
		position: fixed;
		bottom: 2rem;
		left: 5.4rem;
	}
	.deleteFamilywrap {
		position: fixed;
		width: 100%;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
	}
	.deleteFamilybox {
		width: 17.15rem;
		margin: 25.1rem auto 0
	}
	.noDelete {
		background: #FFFFFF;
		width: 17.15rem;
		height: 2.35rem;
		line-height: 2.35rem;
		border-radius: 0.4rem;
		margin: 0 auto;
		font-size: 0.75rem;
		font-family: PingFangSC-Regular;
		color: rgba(34, 131, 226, 1);
		margin-top: 0.4rem;
		text-align: center;
	}
	.texttip {
		background: #FFFFFF;
		height: 2.3rem;
		font-size: 0.75rem;
		font-family: PingFangSC-Regular;
		color: rgba(51, 51, 51, 1);
		line-height: 2.3rem;
		text-align: center;
		border-bottom: 1px solid rgba(237, 237, 237, 1);
		border-radius: 0.4rem 0.4rem 0 0;
	}
	.confirmDeleteFamily {
		background: #FFFFFF;
		height: 2.3rem;
		font-size: 0.75rem;
		font-family: PingFangSC-Regular;
		color: rgba(51, 51, 51, 1);
		line-height: 2.3rem;
		text-align: center;
		border-radius: 0 0 0.4rem 0.4rem;
	}
</style>
<style lang="scss">
	@import "./userInfo.scss";
</style>