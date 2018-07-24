export default {
  name: 'deviceType',
  methods: {
    deviceChoose(index) {
      this.$router.push({path: '/chooseDevice/' + index})
    }
  },
  data () {
    return {
      }
    }
}
