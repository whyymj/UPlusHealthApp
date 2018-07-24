export default {
  name: 'chooseDevice',
  mounted () {
    let winH = document.documentElement.clientHeight || document.body.clientHeight;
		let pageTag = document.querySelector('.choose-page')
		pageTag.style.minHeight = winH + 'px'
  },
  methods: {
    addDevice:function(index){
    	console.log(index)
      this.$router.push({path: '/searchDevice/' + index})
    }
  },
  data () {
    return {
      showIndex: this.$route.params.index
    }
  }
}
