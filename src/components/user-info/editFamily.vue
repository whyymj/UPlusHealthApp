<template>
  <div class="userInfo">
    <div>
      <!--<div @click="showActionSheet()">-->
      <div>
        <mt-cell class="headerImg" title="头像" is-link  :to="{ name: 'headerImg' }">
          <img id="img" src="#"/>
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
        <mt-cell title="目标体重" is-link >
          <span>{{targetWeightValue}}</span>
        </mt-cell>
      </div>
    </div>
    <div class="div_magin">
      <mt-cell title="过敏史" is-link :to="{ name: 'allergic' }">
        <span>未设置</span>
      </mt-cell>
      <mt-cell title="慢病史" is-link :to="{ name: 'chronicDisease' }">
        <span>无</span>
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
      <mt-actionsheet
        :actions="headerAction"
        v-model="sheetVisible"
        cancel-text="取消"
      >
      </mt-actionsheet>
    </div>

    <!--修改昵称-->
    <div>

    </div>
	<!--删除家人-->
	    <el-dialog :visible.sync="isDeleteShow" :modal-append-to-body='false'>
            <div class="deletewrap">
            	<div class="texttip">删除后档案数据无法恢复，是否确认删除？</div>
            	<div class="delete" @click="deleteFamily">确认删除</div>
            </div>
            <div class="noDelete" @click="closeDeleteFamily">取消</div>
        </el-dialog>
    <!-- 日期选择 -->
    <div @touchmove.prevent>
      <mt-datetime-picker
        ref="pickerBD"
        type="date"
        v-model="defaultBirthday"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate="startDate"
        :endDate="endDate"
        @confirm="handleChangeBD">
      </mt-datetime-picker>
    </div>
    <!-- 身高体重性别 -->
    <div @touchmove.prevent>
      <mt-popup v-model="pickerVisible" :closeOnClickModal="true" position="bottom" class="mint-datetime">
        <mt-picker
          :slots="dateSlots"
          @change="onChange"
          value-key="dict_name"
          class="mint-datetime-picker"
          show-toolbar>
          <span class="mint-datetime-action mint-datetime-cancel" @click="pickerVisible = false">取消</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确定</span>
        </mt-picker>
      </mt-popup>
    </div>

  </div>
</template>

<script type="text/javascript" src="./userInfo.js"></script>
<script type="text/javascript">
import webConfig from '../../../config/web.config'
import { MessageBox } from 'mint-ui'
import axios from "axios"
// import new from './../../assets/healthSleep/bus';
export default {
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
			headPic:null,//头像
			disease:null,//慢病
			allergy:null,//过敏
			isDeleteShow:false,
		}
	},
	mounted() {
		this.getUserInfo();
	},

	methods: {
		//删除家人
		openDeleteFamily(){
			this.isDeleteShow=true
		},
		closeDeleteFamily(){
			this.isDeleteShow=false
		},
		deleteFamily(){
			axios.post('/api/member/delete', {
				member_id:member_id
			})
				.then(function(res) {
					console.log(res);
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
			let message = "请输入昵称";
			let title = "";
			let options = {
				inputPlaceholder: '请输入昵称'
			};
			MessageBox
				.prompt(message, title, options)
				.then(({
					value
				}) => {
					if(value) {
						//调用昵称保存接口
						this.nickName = value;
						this.save()
					} else {}

				});
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
			this
				.$refs[picker]
				.open();
		},
		handleChangeBD(value) {
			this.birthday = this.formatDate(value);
			this.save()
			//调用生日保存接口
		},
		openPicker(index) {
			this.pickerVisible = true;
			this.dateSlots = [{
				flex: 1,
				values: [],
				defaultIndex: 0,
				className: 'slot1',
				textAlign: 'center'
			}]
			switch(index) {
				case 1:
					this.dateSlots[0].values = webConfig.height;
					this.dateSlots[0].defaultIndex = this.heightValue ?
						webConfig
						.height
						.indexOf(this.heightValue) :
						webConfig
						.height
						.indexOf('178cm');
					this.valuePicker = this.heightValue ?
						this.heightValue :
						'178cm';
					break
				case 2:
					this.dateSlots[0].values = webConfig.weight;
					this.dateSlots[0].defaultIndex = this.weightValue ?
						webConfig
						.weight
						.indexOf(this.weightValue) :
						webConfig
						.weight
						.indexOf('80kg');
					this.valuePicker = this.weightValue ?
						this.weightValue :
						'80kg';
					break
				case 3:
					this.dateSlots[0].values = webConfig.weight;
					this.dateSlots[0].defaultIndex = this.weightValue ?
						webConfig
						.weight
						.indexOf(this.targetWeightValue) :
						webConfig
						.weight
						.indexOf('80kg');
					this.valuePicker = this.targetWeightValue ?
						this.targetWeightValue :
						'80kg';
					break;
				case 4:
					this.dateSlots[0].values = webConfig.sex;
					this.dateSlots[0].defaultIndex = this.sex ?
						webConfig
						.weight
						.indexOf(this.sex) :
						webConfig
						.sex
						.indexOf('男');
					this.valuePicker = this.sex ?
						this.sex :
						'男';
					break;
			}
			this.pickerIndex = index;
		},
		onChange(picker, values) {
			this.valuePicker = values[0]
		},
		// 确认选择数据并显示
		confirm() {
			switch(this.pickerIndex) {
				case 1:
					this.heightValue = this.valuePicker;
					//调用身高保存接口
					this.save()
					break
				case 2:
					this.weightValue = this.valuePicker;
					//调用体重保存接口
					this.save()
					break
				case 3:
					this.targetWeightValue = this.valuePicker;
					//调用目标体重保存接口
					this.save()
					break
				case 4:
					this.sex = this.valuePicker;
					//调用性别保存接口
					this.save()
					break
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
			this.headPic='data:image/jpeg;base64,' + imageData
			this.save()
		},
		onFail(message) {
			alert(message)
		},
		closeActionSheet: function() {},
		async getUserInfo() {
			try {
				var that = this;
				const result = await axios.post('api/member', {
//					phone: ''
						member_id:req.session.token
				})
				var data = result.data.data;
				if(result.data.code === 'C0000') {
					this.nickName = data.nick_name; //昵称
					this.sex = data.sex == 'female' ? '女' : "男"; //性别
					this.endDate = new Date();
					this.defaultBirthday = '1980年01月01日'; //默认生日
					this.birthday = new Date(data.birthday); //生日
					this.heightValue = data.height + 'cm'; //身高
					this.weightValue = data.weight + "kg"; //体重
					this.targetWeightValue = data.target_weight + "kg"; //目标体重
					this.headPic = data.head_pic
					this.diseas=data.diseas//慢病
					this.allergy=data.allergy//过敏
				}
			} catch(err) {
				console.log(err)
			}
		},
		//保存
		save() {
			let saveData = {
				height: this.heightValue,
				weight: this.weightValue,
				sex: this.sex,
				birthday: this.birthday,
				nick_name: this.nickName,
				target_weight: this.targetWeightValue,
				diseas:this.diseas,//慢病
				allergy:this.allergy,//过敏
			}
			axios.post('api/member/info', saveData)
				.then(function(res) {
					console.log(res);
				})
				.catch(function(err) {
					console.log(err);
				})
		}
	}
}
</script>
<style lang="scss">
  @import "./userInfo.scss";
  .deleteFamily{
  	width:8rem;
	height:2rem;
	background:rgba(255,255,255,1);
	border-radius:1rem;
	font-size:0.8rem;
	font-family:PingFangSC-Regular;
	color:rgba(102,102,102,1);
	line-height:2rem;
	text-align: center;
	position: fixed;
	bottom:2rem;
	left: 5.4rem;
  }
.el-dialog {
	background: rgba(0, 0, 0, 0);
	width: 95%;
	position:absolute;
	bottom: 0.4rem;
	text-align: center;
	.el-dialog__header{
		height: 0;
	}
	.deletewrap{
		background: #FFFFFF;
		width:17.15rem;
		border-radius:0.4rem;
		margin:0 auto;
	}
	.noDelete{
		background: #FFFFFF;
		width:17.15rem;
		height:2.35rem;
		line-height: 2.35rem;
		border-radius:0.4rem;
		margin:0 auto;
		font-size:0.75rem;
		font-family:PingFangSC-Regular;
		color:rgba(34,131,226,1);
		margin-top:0.4rem
	}
	.el-dialog__headerbtn{
		display: none;
	}
	.texttip{
		height:2.3rem;
		font-size:0.75rem;
		font-family:PingFangSC-Regular;
		color:rgba(51,51,51,1);
		line-height:2.3rem;
		text-align: center;
		border-bottom: 1px solid rgba(237,237,237,1);
	}
	.delete{
		height:2.3rem;
		font-size:0.75rem;
		font-family:PingFangSC-Regular;
		color:rgba(51,51,51,1);
		line-height:2.3rem;
		text-align: center;
	}
}         
</style>
