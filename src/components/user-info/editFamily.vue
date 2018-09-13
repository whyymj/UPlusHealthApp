<template>
	<div class="userInfo">
		<div>
			<!--<div @click="showActionSheet()">-->
			<div>
				<mt-cell class="headerImg" title="头像" is-link :to="{ name: 'headerImg',params:{member_id:memberId,from:'/editFamily'}}">
					<img id="img" :src="headPic" />
				</mt-cell>
			</div>
			<div @click="showNickName()">
				<mt-cell title="昵称" is-link>
					<span>{{nickName}}</span>
				</mt-cell>
			</div>
			<!--<div @click="openPicker(4)">
					        <mt-cell title="性别" is-link>
					          <span>{{sex}}</span>
					        </mt-cell>
					      </div>-->
			<div @click="openBirthDay('pickerBD')">
				<mt-cell title="生日" is-link>
					<span>{{birthday}}</span>
				</mt-cell>
			</div>
		</div>
		<div class="div_magin">
			<div @click="openPicker(1)">
				<mt-cell title="身高" is-link>
					<span>{{heightValue}}</span>
				</mt-cell>
			</div>
			<div @click="openPicker(2)">
				<mt-cell title="体重" is-link>
					<span>{{weightValue}}</span>
				</mt-cell>
			</div>
			<div @click="openPicker(3)">
				<mt-cell title="目标体重" is-link>
					<span>{{targetWeightValue||'请设置目标体重'}}</span>
				</mt-cell>
			</div>
		</div>
		<div class="div_magin">
			<mt-cell title="过敏史" is-link :to="{ name: 'allergic',query:{member_id:memberId,from:'/editFamily'} }">
				<span>{{userallergy}}</span>
			</mt-cell>
			<mt-cell title="慢病史" is-link :to="{ name: 'chronicDisease' ,query:{member_id:memberId,from:'/editFamily'}}">
				<span>{{userdisease}}</span>
			</mt-cell>
		</div>
		<!--<div class="div_magin">
					      <mt-cell title="隐私设置" is-link :to="{ name: 'privacySet' }"/>
					    </div>-->
		<div class="deleteFamily" @click="openDeleteFamily">
			删除家人
		</div>
		<!--上传头像-->
		<div>
			<mt-actionsheet :actions="headerAction" v-model="sheetVisible" cancel-text="取消">
			</mt-actionsheet>
		</div>
		<!--修改昵称-->
		<div>
		</div>
		<!--删除家人-->
		<div v-bind:style="{'display':isDeleteShow? 'block':'none'}" class="deleteFamilywrap">
			<div class="deleteFamilybox">
				<div class="texttip">删除后档案数据无法恢复，是否确认删除？</div>
				<div class="confirmDeleteFamily" @click="deleteFamily">确认删除</div>
			</div>
			<div class="noDelete" @click="closeDeleteFamily">取消</div>
		</div>
		<!-- 日期选择 -->
		<div @touchmove.prevent>
			<mt-datetime-picker ref="pickerBD" type="date" v-model="defaultBirthday" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :startDate="startDate" :endDate="endDate" @confirm="handleChangeBD">
			</mt-datetime-picker>
		</div>
		<!-- 身高体重性别 -->
		<div @touchmove.prevent>
			<mt-popup v-model="pickerVisible" :closeOnClickModal="true" position="bottom" class="mint-datetime">
				<mt-picker :slots="dateSlots" @change="onChange" value-key="dict_name" class="mint-datetime-picker" show-toolbar>
					<span class="mint-datetime-action mint-datetime-cancel" @click="pickerVisible = false">取消</span>
					<span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span>
				</mt-picker>
			</mt-popup>
		</div>
	</div>
</template>

<script type="text/javascript">
	import webConfig from '../../../config/web.config';
	import myloading from '../global/Loading.vue';
	import {
		MessageBox
	} from 'mint-ui'
	import axios from "axios"
	// import new from './../../assets/healthSleep/bus';
	export default {
		mixins: [myloading],
		data() {
			return {
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
				valuePicker: null,
				pickerIndex: null,
				nickName: "nick", //昵称
				sex: "男", //性别
				startDate: new Date('1920-01-01'),
				endDate: new Date(),
				defaultBirthday: "1980-1-1", //默认生日
				birthday: "1980-1-1", //生日
				heightValue: "181cm", //身高
				weightValue: "75kg", //体重
				targetWeightValue: "74kg", //目标体重
				headPic: '', //头像
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
			// document.getElementsByTagName('title')[0].innerHTML=''
			var that = this;
			this.route = this.$route.path;
			this.memberId = window._member_id;
			this.getUserInfo(function() {
				that.loadingmodal.close();
				var data = that.$route.query;
				that[data.name] = data.value;
				if (data.name != 'allergy' && data.name != 'disease') { //慢病与过敏史直接在对应选择页面保存
					that.save(function() {
						that.getUserInfo();
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
					if (firstIndex == -1) {
						str = data
					} else {
						let secondIndex = data.indexOf(",", firstIndex + 1)
						if (secondIndex == -1) {
							if (firstIndex > 3) {
								str = data.substring(0, firstIndex) + "等"
							} else {
								if (data.length - firstIndex - 1 > 3) {
									str = data.substring(firstIndex + 1) + "等"
								} else {
									str = data
								}
							}
						} else {
							if (firstIndex > 3) {
								str = data.substring(0, firstIndex) + "等"
							} else {
								if (secondIndex - firstIndex - 1 > 3) {
									str = data.substring(firstIndex + 1, secondIndex) + "等"
								} else {
									str = data.substring(0, secondIndex) + "等"
								}
							}
						}
					}
				} else {
					str = '无'
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
				var memberID = window._member_id
				axios.post('/api/member/delete', {
						member_id: memberID
					})
					.then(function(res) {
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
								row: "sex"
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
						this.targetWeightValue =( data.target_weight == null )? '' : (data.target_weight + "公斤"); //目标体重
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
<style type="text/css" scoped="scoped">
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