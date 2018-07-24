import axios from 'axios'

export default {
  name: 'associatedFamilyR',
  data () {
    return {
      name: '',
      phone: '',
      head_img: ''
    }
  },
  methods: {
    associated () {
      this.$router.push({path: `/associationRequest/${this.phone}`})
    }
  },
  created () {
  },
  mounted () {
    (async () => {
      try {
        const result = await axios.post('/api/user/info', {phone: this.$route.params.phone})
        if (result.data.code === 'C0000') {
          this.head_img = result.data.data.head_pic
          this.name = result.data.data.nick_name
          this.phone = result.data.data.login_code
        } else {
          console.log('Failed...')
        }
      } catch (err) {
        console.log('Whoops: ', err)
      }
    })()
  }
}
