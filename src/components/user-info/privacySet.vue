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
					<mt-switch v-model="item.value" @change='change(index)'></mt-switch>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isSelect: false,
				familyData: [{
						name: '张三',
						value: true,
					},
					{
						name: '李四',
						value: false,
					},
					{
						name: '王五',
						value: true,
					},
					{
						name: '赵六',
						value: false,
					},
				]
			}
		},
		methods: {
			changeAll() {
				var mapData = []
				this.familyData.map((item, index) => {
					return mapData.push({
						name: item.name,
						value: this.isSelect
					})
				})
				this.familyData = mapData
			},
			change(index) {
				var singleFalse = this.familyData.some(item => {
					return item.value == false
				});
				if(singleFalse) {
					this.isSelect = false
				}
				var singleTrue = this.familyData.every(item => {
					return item.value == true
				});
				if(singleTrue) {
					this.isSelect = true
				}
			}
		},
		mounted(){
			
		}
	}
</script>

<style lang="scss">
	@import "./userInfo.scss";
</style>