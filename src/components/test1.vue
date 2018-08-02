<template>
  <div>
    camera测试:
    <div>
      <button type="button" @click='getCamera(1)'>相机</button>
      <button type="button" @click='getCamera(0)'>图库</button>
    </div>

    苹果健康测试:
    <div>
      <button type="button" @click='saveSleepInfo()'>打开苹果健康</button>
    </div>
  </div>
</template>

<script>
  //  import VueCordova from 'vue-cordova'
  export default {
    name: "test1",
    data(){
      return {
        popupVisible: false,
        startDate: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000+456*60*1000),
        endDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000+335*60*1000),
      }
    },
    methods: {
      //相机
      getCamera(type){
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          encodingType: Camera.EncodingType.JPEG,
          sourceType: type
        })
      },
      onSuccess(imageData){
        resolve('data:image/jpeg;base64,' + imageData)
      },
      onFail(message){
        alert(message)
      },
      //打开苹果健康权限
      getHealth(){
        let supportedTypes = ['HKCategoryTypeIdentifierSleepAnalysis'];
        window.plugins.healthkit.requestAuthorization({
          readTypes: supportedTypes,
        });
      },
      //保存信息
      saveSleepInfo(){
        let _this = this;
        window.plugins.healthkit.monitorSampleType({
          'sampleType': 'HKCategoryTypeIdentifierSleepAnalysis'
        }, function (value) {
            _this.getSleepInfo();
        })
      },
      //获取信息
      getSleepInfo(value1){
        alert("开始时间："+this.startDate);
        alert("结束时间："+this.endDate);
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
      }
    },
    mounted(){
      //照相机

      //打开苹果健康权限
      this.getHealth();

    }

  }
</script>
