<template>
	<div class="uploadimg">
		<img @click="upload()" :src="imgUrl" alt="" class="head_img blackImg" v-bind:style="{'display':imgUrl? 'block':'none'}">
		<div>
			<p @click="upload()" class="imgText" v-bind:style="{'display':imgUrl? 'none':'block'}">点击上传头像</p>
		</div>
		<input ref="upload" accept="image/gif,image/jpeg,image/jpg,image/png" @change="show()" style="display:none;position:absolute;" type="file" name="" value="点击上传头像">
		<button @click="uploadImg" class="imgText saveImg" v-bind:style="{'display':imgUrl? 'block':'none'}">确认</button>
	</div>
</template>

<script>
	import { Indicator,Toast } from 'mint-ui';
	import axios from 'axios'
	export default {
		data() {
			return {
				imgUrl: null,
				allData: {},
				memberId: '',
				upimgUrl: null,
			}
		},
		created() {
			this.memberId = this.$route.params.member_id
		},
		mounted(){
			this.getUserInfo()
		},
		methods: {
			//相机
			async getUserInfo() {
				try {
					var that = this;
					var result = null
					//获取个人的信息
					if(!that.memberId) {
						result = await axios.post('/api/user/info', {
							user_id: ''
						})
					} else { //获取家庭成员的信息
						result = await axios.post('/api/member', {
							member_id: that.memberId
						})
					}
					console.log(result)
					that.allData = result.data.data
					that.imgUrl = result.data.data.head_pic
				} catch(err) {
					console.log(err)
				}
			},
//			getCamera(type) {
//				navigator.camera.getPicture(this.onSuccess, this.onFail, {
//					quality: 50,
//					destinationType: Camera.DestinationType.DATA_URL,
//					encodingType: Camera.EncodingType.JPEG,
//					sourceType: type
//				})
//			},
//			onSuccess(imageData) {
//				resolve('data:image/jpeg;base64,' + imageData)
//			},
//			onFail(message) {
//				alert(message)
//			},
//			updata() {
//				alert(this.imgUrl)
//			},
			upload() {
				this.$refs.upload.click();
			},
			show() {
				let Img = this.$refs.upload.files[0];
				let formData = new FormData();
				formData.append('file', Img);
//				formData.append('member_id', this.memberId);

				this.upimgUrl = formData
				//base64图片
				let reader = new FileReader();
				let self = this;
				reader.onload = function(e) {
					let ev = e || window.event;
					let url = ev.target.result;
					self.formData = url;
					self.imgUrl = url;
				}
				reader.readAsDataURL(Img);
			},
			uploadImg() {
				Indicator.open({
				  text: '上传中...',
				  spinnerType: 'fading-circle'
				});
//				//添加请求头
//				let config = {
//					headers: {
//						'Content-Type': 'multipart/form-data'
//					}
//				}; 
				let saveData = {
					imgFile: this.upimgUrl,
					member_id: this.memberId
				}
//				let saveData = this.upimgUrl
				axios.post('/api/uploadPic', saveData)
					.then(function(res) {
						console.log(res);
						Indicator.close();
						Toast('上传成功');

					})
					.catch(function(err) {
						console.log(err);
						Indicator.close();
						Toast('上传失败');
					})
				this
					.$router
					.replace({
						path: '/userInfo'
					})
			}
		}
	}
</script>

<style lang='scss'>
	* {
		margin: 0;
		padding: 0
	}
	
	.uploadimg {
		text-align: center;
		img {
			width: 12rem;
			height: 12rem;
			margin: 5rem auto;
		}
		.imgText {
			width: 100%;
			height: 2.6rem;
			background: rgba(38, 166, 255, 1);
			font-size: 0.8rem;
			font-family: PingFangSC-Regular;
			color: rgba(255, 255, 255, 1);
			line-height: 2.6rem;
		}
		.saveImg {
			position: fixed;
			bottom: 0
		}
	}
</style>