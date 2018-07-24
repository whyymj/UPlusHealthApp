export default {
  name: 'searchDevice',
  data () {
    return {
      isShow:true,
      popupVisible:false,
      bluetoothVisible:false,
      deviceType: this.$route.params.index,
      deviceName: ''
    }
  },
  mounted () {
  	switch(this.deviceType) {
  		case '1':
  			this.deviceName = '健康小管家'
  			break
  		case '2':
  			this.deviceName = '海尔医疗移动终端'
  			break
  		case '3':
  			this.deviceName = '海尔BPM血压测量器'
  			break
  		case '4':
  			this.deviceName = '海尔体脂称'
  			break
  	}
  },
  methods: {
  	cancelSearch () {
      this.$router.go(-1);
    },
    startSearchDevice () {
      this.bluetoothVisible = true
    },
		openTips () {
			let vm=this
      vm.popupVisible = !vm.popupVisible
		}
  }
}
