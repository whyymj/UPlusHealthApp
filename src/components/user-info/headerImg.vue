<template>
	<div class="uploadimg">
		<el-upload class="avatar-uploader" headers='{method:"POST"}' :action="uploadimg" name="file" :data="data" :with-credentials=true :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
			<img v-if="imageUrl" :src="imageUrl" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
	</div>
</template>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	
	.uploadimg {
		text-align: center;
		margin-top: 3rem
	}
</style>

<script>
	import axios from "axios"
	export default {
		data() {
			return {
				imageUrl: '',
				data: {
					memberId: '',
					openId:'',
					loginCode:''
				},
				router: '',
				uploadimg:'http://123.103.113.201:8085/api/uploadPic'
			};
		},
		created() {
			this.data.member_id = this.$route.params.member_id
			this.router = this.$route.params.from
		},
		mounted() {
			this.getUserInfo()
		},
		methods: {
				async getUserInfo() {
				try {
					var that = this;
					var result = {};
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
					that.imageUrl = result.data.data.head_pic
					that.openId = result.data.openId
					that.loginCode = result.data.data.login_code
				} catch(err) {
					console.log(err)
				}
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				this
					.$router
					.replace({
						path: this.router
					})
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg'
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG,gif,png 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;

			}
		}
	}
</script>