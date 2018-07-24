export default {
  name: 'searchDevice',
  data () {
    return {
      isShow:true,
      isHeaderShow:false,
      popupVisible:false,
      linkSuccessful: false,
      showIndex: this.$route.params.index,
      searchTitle: '请开始搜索设备'
    }
  },
  mounted () {
  	let winH = document.documentElement.clientHeight || document.body.clientHeight;
		let pageTag = document.querySelector('.search-device-page')
		pageTag.style.minHeight = winH + 'px'
  },
  methods: {
    cancelSearch() {
      this.$router.go(-1);
    },
    startSearchDevice () {
      this.popupVisible = true
      this.isShow = !this.isShow;
//    this.isHeaderShow=!this.isHeaderShow
      switch (this.showIndex) {
      	case '1':
      		this.searchTitle = '正在搜索健康小管家'
      		break
      	case '2':
      		this.searchTitle = '正在搜索海尔医疗移动终端'
      		break
      	case '3':
      		this.searchTitle = '正在搜索海尔BPM血压测量器'
      		break
      	case '4':
      		this.searchTitle = '正在搜索海尔体脂称'
      		break
      }
      
      //如果没有找到设备，将跳转到下面这个页面
      //this.$router.push({path: '/noSearchDevice/' + this.showIndex})
    }
  }
}
