export default {
  name: 'startTest',
  data () {
    return {
      popupVisible:false,
      popupSuccess:false,
      bluetoothVisible:false
    }
  },
  methods: {
    generateReport:function(){
    	window._pressure_selected_date = ''
      this.$router.push({path: '/pressure'})
    }
  }
}
