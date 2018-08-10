<template>
  <div>
    camera测试:
    <div>
      <button type="button" @click='getCamera(1)'>相机</button>
      <button type="button" @click='getCamera(0)'>图库</button>
    	<div>
        <img @click="upload()" :src="imgUrl" alt="" class="head_img blackImg">
        <div>
            <p @click="upload()" class="changehead">点击修改头像</p>
        </div>
        <input ref="upload" accept="image/gif,image/jpeg,image/jpg,image/png" @change="show()"
               style="display:none;position:absolute;" type="file" name="" value="点击修改头像">
    	</div>
    </div>

    苹果健康测试:
    <div>
      <button type="button" @click='saveSleepInfo()'>打开苹果健康</button>
    </div>

    音频测试：
    <div>
      <button type="button" id="play">播放</button>
      <button type="button" id="pause">暂定</button>
      <button type="button" id="release">停止</button>
      <button type="button" id="stop">释放</button>
    </div>

    <div id="audio_current"></div>
    <div id="audio_duration"></div>
  </div>
</template>

<script>
  export default {
    name: "test1",
    data() {
      return {
        popupVisible: false,
        startDate: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000 + 456 * 60 * 1000),
        endDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000 + 335 * 60 * 1000),
        my_media: null,
        mediaTimer: null,
        timerDur: null,
        src: "http://music.163.com/#/m/song?id=422960977",
        imgUrl:""
      }
    },
    methods: {
      //相机
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
        alert(imageData)
      },
      onFail(message) {
        alert(message)
      },
			updata(){
				alert(this.imgUrl)
			},
			upload() {
        this.$refs.upload.click();
    	},
    	show(){
    		 let Img = this.$refs.upload.files[0];
    		 let reader = new FileReader();
	       let self = this;
	        reader.onload = function (e) {
	            let ev = e || window.event;
	            let url = ev.target.result;
	            self.formData = url;
	            self.imgUrl = url;
	        }
	        reader.readAsDataURL(Img);
	        
    	},
      //打开苹果健康权限
      getHealth() {
        let supportedTypes = ['HKCategoryTypeIdentifierSleepAnalysis'];
        window.plugins.healthkit.requestAuthorization({
          readTypes: supportedTypes,
        });
      },
      //保存信息
      saveSleepInfo() {
        let _this = this;
        window.plugins.healthkit.monitorSampleType({
          'sampleType': 'HKCategoryTypeIdentifierSleepAnalysis'
        }, function (value) {
          _this.getSleepInfo();
        })
      },
      //获取信息
      getSleepInfo(value1) {
        alert("开始时间：" + this.startDate);
        alert("结束时间：" + this.endDate);
        window.plugins.healthkit.querySampleType({
          'startDate': this.startDate, // 开始时间
          'endDate': this.endDate, // now 结束时间
          'sampleType': 'HKCategoryTypeIdentifierSleepAnalysis',
          'limit': 10,
          'ascending': 'T',
        }, function (value) {
          alert("text+++++" + JSON.stringify(value));
          console.log(value);
        })
      },
      /*************************音频*******************/
      //初始化
      initialize() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
      },
      getId(id) {
        return document.getElementById(id);
      },
      onDeviceReady(){

      },
      mediaSuccess() {
        console.log("Media成功")
      },
      mediaError(err) {
        console.log("Media失败")
      },
      // 开始或恢复播放一个音频文件
      playAudio() {
        debugger;
        if (this.my_media == null) {
          // 初始化Media对象
          this.my_media = new Media(this.src, mediaSuccess, mediaError);
        }
        // 播放音频
        this.my_media.play();
      },
      // 暂停播放音频文件
      pauseAudio() {
        if (this.my_media) {
          this.my_media.pause();
        }
        // 清除定时器对象
        clearInterval(this.mediaTimer);
        this.mediaTimer = null;
      },
      // 释放操作系统底层的音频资源。
      releaseAudio() {
        if (this.my_media) {
          this.my_media.release();
        }

      },
      // 停止播放音频文件
      stopAudio() {
        if (this.my_media) {

        }
        this.my_media.stop();
        // 清除定时器对象
        clearInterval(this.mediaTimer);
        this.mediaTimer = null;
      },
      // 返回在音频文件的当前位置。
      getCurrent() {
        if (this.mediaTimer == null) {
          this.mediaTimer = setInterval(function () {
            this.my_media.getCurrentPosition(
              // success callback
              function (position) {
                if (position > -1) {
                  console.log((position) + " sec");
                }
                document.getElementById('audio_current').innerHTML = position;
              },
              // error callback
              function (e) {
                console.log("Error getting pos=" + e);
              }
            );
          }, 1000);
        }
      },
      // 返回一个音频文件的持续时间。
      getDuration() {
        // Get duration
        let counter = 0;
        let timerDur = setInterval(function () {
          counter = counter + 100;
          if (counter > 2000) {
            clearInterval(this.timerDur);
          }
          var dur = this.my_media.getDuration();
          if (dur > 0) {
            clearInterval(this.timerDur);
            document.getElementById('audio_duration').innerHTML = (dur) + " sec";
          }
        }, 100);
      },
      playMedia(){
        this.playAudio();
        this.getCurrent();
        this.getDuration();
      },
      pauseMedia(){
        this.pauseAudio();
      },
      releaseMedia(){
        this.releaseAudio();
      },
      stopMedia(){
        this.stopAudio();
      },
    },
    mounted() {
      //照相机

      //打开苹果健康权限
      // this.getHealth();

      //初始化音频插件
      this.initialize();
    }

  }
</script>
