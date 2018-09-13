<template>

	<div>
		<div class="mint-cell">
			<div class="mint-cell-wrapper">
				<div class="mint-cell-title">
					<span class="mint-cell-text">允许谁查看我的健康档案</span>
				</div>
				<div class="mint-cell-value">
					<mt-switch v-model="isSelect" @change="changeAll"></mt-switch>
				</div>
			</div>
		</div>
		<div class="mint-cell" v-for='(item,index) in familyData' :key='index'>
			<div class="mint-cell-wrapper">
				<div class="mint-cell-title">
					<span class="mint-cell-text">{{item.name}}</span>
				</div>
				<div class="mint-cell-value">
					<mt-switch v-model="item.isSee" @change='change(item.mobile,item.isSee)'></mt-switch>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				isSelect: false,
				familyData: []
			}
		},
		created() {
			this.getUHomeFamily()
		},
		methods: {
			//获取关联人员信息
			async getUHomeFamily() {
				let result = {}
				try {
					result = await axios.post('/api/user/getUHomeFamilyMember', {})
				} catch(err) {
					console.log(err)
				}
				var data = result.data.data;
				if(result.data.code === 'C0000' && data.UHomeList && data.UHomeList.length) {
					this.familyData = data.UHomeList.map(item => {
						return {
							name: item.givenName ? item.givenName : item.nickname,
							isSee: item.havaAuth == 'Y' ? true : false,
							mobile: item.mobile
						}
					})
				}
			},
			setPrivacy(param) {
				axios.post('/api/user/grantUserInfoAuthority', param)
					.then(function(res) {
						console.log(res)
					})
					.catch(function(err) {
						console.log(err)
					})
			},
			changeAll() {
				var mapData = []
				this.familyData.map(item => {
					//调用隐私设置方法
					let param = {
						mobile: item.mobile,
						flag: this.isSelect == true ? '' : 'screen'
					}
					this.setPrivacy(param)
					return mapData.push({
						...item,
						isSee: this.isSelect,
					})
				})
				this.familyData = mapData
			},
			change(mobile, isSee) {
				let param = {
					mobile: mobile,
					flag: isSee == true ? '' : 'screen'
				}
				this.setPrivacy(param)

				var singleFalse = this.familyData.some(item => {
					return item.isSee == false
				});
				if(singleFalse) {
					this.isSelect = false
				}
				var singleTrue = this.familyData.every(item => {
					return item.isSee == true
				});
				if(singleTrue) {
					this.isSelect = true
				}
			}
		},
	}
</script>

<style lang="scss">
	@import "./userInfo.scss";
</style>